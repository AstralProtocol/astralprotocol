# Quickstart

Building with Astral Location Proofs is easy.

- Create location proofs using the EAS SDK and the Location Proof Protocol schema
- Resolve location proofs using the EAS SDK

The EAS SDK is documented [here](https://docs.attest.org/docs/welcome) — below we put together the workflow in javascript — copy and adapt as needed. [Here is a current version of EAS.config.](https://github.com/AstralProtocol/logbook/blob/main/packages/nextjs/EAS.config.ts)

## Create a location attestation

This is deployed on the Logbook, specifically in the [CheckinForm component](https://github.com/AstralProtocol/logbook/blob/main/packages/nextjs/components/CheckinForm.tsx).

```javascript
import { EAS, SchemaEncoder } from "@ethereum-attestation-service/eas-sdk";
import { ethers } from "ethers";
import easConfig from "~~/EAS.config";

const rpcUrl = `<your rpc url + api key here>`;

// Instantiate EAS with the appropriate provider
const provider = new ethers.providers.JsonRpcProvider(rpcUrl); // Replace with your RPC URL
const eas = new EAS(easConfig.chains["42161"].easContractAddress);
eas.connect(provider);

// Initialize SchemaEncoder with the raw schema string
const schemaRawString = easConfig.schema.rawString;
const schemaEncoder = new SchemaEncoder(schemaRawString);

// Dynamic values are:
const longitude = "-9.3539"; // decimal degrees, formatted as strings
const latitude = "51.4747";
const mediaLink = "<IPFS CID, or a URL>";
const memo = "Your memo";

// Define encodeData function to structure the data for attestation
const encodedData = schemaEncoder.encodeData([
  { name: "eventTimestamp", value: Math.floor(Date.now() / 1000), type: "uint256" },
  { name: "srs", value: "EPSG:4326", type: "string" },
  { name: "locationType", value: "DecimalDegrees<string>", type: "string" },
  { name: "location", value: `${longitude}, ${latitude}`, type: "string" },
  { name: "recipeType", value: ["Type1", "Type2"], type: "string[]" },
  { name: "recipePayload", value: [ethers.toUtf8Bytes("Payload1")], type: "bytes[]" },
  { name: "mediaType", value: ["image/jpeg"], type: "string[]" },
  { name: "mediaData", value: ["CID1", "CID2"], type: "string[]" },
  { name: "memo", value: "Test memo", type: "string" },
]);

// Attest using EAS
const schemaUID = easConfig.chains["42161"].schemaUID; // Adjust for your chain ID
const attestationTx = await eas.attest({
  schema: schemaUID,
  data: {
    recipient: "0xRecipientAddress", // Replace with recipient address
    expirationTime: 0n, // No expiration
    revocable: true,
    data: encodedData,
  },
});

const attestationResult = await attestationTx.wait();
console.log(`Attestation complete with UID: ${attestationResult.attestationUID}`);
```

## Resolve a location attestation

Resolution uses the EAS SDK, you can find our current implementation in the Logbook source code [here](https://github.com/AstralProtocol/logbook/blob/main/packages/nextjs/app/attestation/%5B%5B...slug%5D%5D/page.tsx).

```javascript
import { EAS, SchemaEncoder } from "@ethereum-attestation-service/eas-sdk";
import { ethers } from "ethers";
import easConfig from "~~/EAS.config";

// Placeholder declarations for variables
const attestationUid = "0xAttestationUid"; // Replace with actual attestation UID

// Instantiate EAS
const provider = new ethers.providers.JsonRpcProvider(easConfig.rpcUrl); // Replace with your RPC URL
const eas = new EAS(easConfig.chains["42161"].easContractAddress); // Chain ID must be where the attestation is registered!
eas.connect(provider);

// Resolve the attestation with async/await
async function getAttestationData(attestationUid) {
  try {
    const res = await eas.getAttestation(attestationUid);

    const [attestationId, schemaUID, expirationTime, revocable, refUID, initData, recipient, attester, completed, dataField] = res; // Destructure response

    const schema = easConfig.schema.rawString;
    const schemaEncoder = new SchemaEncoder(schema);

    // Decode data using the SchemaEncoder
    const attestationData = schemaEncoder.decodeData(dataField);

    // Add additional fields to the extracted data
    const completeData = {
      attestationId,
      schemaUID,
      expirationTime,
      revocable,
      refUID,
      initData,
      recipient,
      attester,
      completed,
      attestationData,
    };

    // Return or log the complete attestation data
    console.log(completeData);
    return completeData;
  } catch (err) {
    console.error("Error fetching or decoding attestation data:", err);
  }
}

// Call the async function
getAttestationData(attestationUid);
```
