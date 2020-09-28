// based on https://github.com/m-mohr/stac-node-validator
// transformed into a node package for easier consumption

const RefParser = require("@apidevtools/json-schema-ref-parser");
const Ajv = require("ajv");
const fs = require("fs-extra");
const klaw = require("klaw");
const path = require("path");
const compareVersions = require("compare-versions");

let COMPILED = {};
let ajv = new Ajv({
  allErrors: true,
  missingRefs: "ignore",
});

module.exports = async function validate(file) {
  try {
    // Read STAC file
    let json;
    try {
      json = await fs.readJson(file);
    } catch (error) {
      console.error("-- " + error.message);
    }

    let isApiList = false;
    let entries;
    if (Array.isArray(json.collections)) {
      entries = json.collections;
      isApiList = true;
      console.log(
        file +
          " is a /collections endpoint. Validating all " +
          entries.length +
          " collections, but ignoring the other parts of the response.\n"
      );
    } else if (Array.isArray(json.features)) {
      entries = json.features;
      isApiList = true;
      console.log(
        file +
          " is a /collections/:id/items endpoint. Validating all " +
          entries.length +
          " items, but ignoring the other parts of the response.\n"
      );
    } else {
      entries = [json];
    }

    let fileValid = true;
    for (let data of entries) {
      let id = file;
      if (isApiList) {
        id += " -> " + data.id;
      }
      if (typeof data.stac_version !== "string") {
        console.error("-- " + id + ": Skipping; No STAC version found\n");
        fileValid = false;
        continue;
      } else if (compareVersions(data.stac_version, "1.0.0-beta.2", "<")) {
        console.error(
          "-- " +
            id +
            ": Skipping; Can only validate STAC version >= 1.0.0-beta.2\n"
        );
        continue;
      } else {
        console.log("-- " + id + "  (" + data.stac_version + ")");
      }

      let type;
      if (typeof data.type !== "undefined") {
        if (data.type === "Feature") {
          type = "item";
        } else if (data.type === "FeatureCollection") {
          // type = 'itemcollection';
          console.warn(
            "-- " + id + ": Skipping; STAC ItemCollections not supported yet\n"
          );
          continue;
        } else {
          console.error(
            "-- " + id + ": `type` is invalid; must be `Feature`\n"
          );
          fileValid = false;
          continue;
        }
      } else {
        if (
          typeof data.extent !== "undefined" ||
          data.license !== "undefined"
        ) {
          type = "collection";
        } else {
          type = "catalog";
        }
      }

      // Get all schema to validate against
      let schemas = [type];
      if (Array.isArray(data.stac_extensions)) {
        schemas = schemas.concat(data.stac_extensions);
      }

      for (let schema of schemas) {
        try {
          let loadArgs = isUrl(schema)
            ? [schema]
            : // removed schemaFolder and replaced with null
              [null, data.stac_version, schema];
          let validate = await loadSchema(...loadArgs);
          let valid = validate(data);
          if (!valid) {
            console.log("---- " + schema + ": invalid");
            console.warn(validate.errors);
            console.log("\n");
            fileValid = false;
            if (schema === "core") {
              console.info(
                "--- Validation error in core, skipping extension validation"
              );
              break;
            }
          } else {
            console.info("---- " + schema + ": valid");
          }
        } catch (error) {
          fileValid = false;
          console.error("---- " + schema + ": " + error.message);
        }
      }
      console.log("\n");
    }

    return fileValid;
  } catch (error) {
    console.error(error);
  }
};

const SUPPORTED_PROTOCOLS = ["http", "https"];

function isUrl(uri) {
  let part = uri.match(/^(\w+):\/\//i);
  if (part) {
    if (!SUPPORTED_PROTOCOLS.includes(part[1].toLowerCase())) {
      throw new Error('Given protocol "' + part[1] + '" is not supported.');
    }
    return true;
  }
  return false;
}

async function readExamples(folder) {
  var files = [];
  for await (let file of klaw(folder)) {
    let relPath = path.relative(folder, file.path);
    if (
      relPath.includes(path.sep + "examples" + path.sep) &&
      path.extname(relPath) === ".json"
    ) {
      files.push(file.path);
    }
  }
  return files;
}

async function loadSchema(baseUrl = null, version = null, shortcut = null) {
  version = typeof version === "string" ? "v" + version : "unversioned";

  if (typeof baseUrl !== "string") {
    baseUrl = "https://schemas.stacspec.org/" + version;
  }

  let url;
  if (
    shortcut === "item" ||
    shortcut === "catalog" ||
    shortcut === "collection"
  ) {
    url = baseUrl + "/" + shortcut + "-spec/json-schema/" + shortcut + ".json";
  } else if (typeof shortcut === "string") {
    url = baseUrl + "/extensions/" + shortcut + "/json-schema/schema.json";
  } else {
    url = baseUrl;
  }

  if (typeof COMPILED[url] !== "undefined") {
    return COMPILED[url];
  } else {
    let fullSchema = await RefParser.dereference(url, {
      dereference: {
        circular: "ignore",
      },
    });
    COMPILED[url] = ajv.compile(fullSchema);
    return COMPILED[url];
  }
}
