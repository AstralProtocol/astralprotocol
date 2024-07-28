#!/bin/bash

# Arrays to define the directory structure and files
files=(
  "docs/introducing-astral.md"
  "docs/core-concepts/what-is-spatial-data.md"
  "docs/core-concepts/location-proofs.md"
  "docs/core-concepts/onchain-geospatial.md"
  "docs/core-concepts/decentralized-spatial-data.md"
  "docs/location-proof-protocol/architecture.md"
  "docs/location-proof-protocol/eas-schema.md"
  "docs/location-proof-protocol/location-types.md"
  "docs/location-proof-protocol/strategies-recipes.md"
  "docs/location-proof-protocol/media-types.md"
  "docs/spatial-registries/spatial-sol.md"
  "docs/spatial-registries/logbook.md"
  "docs/developer-resources/quickstart.md"
  "docs/developer-resources/spatial-registries.md"
  "docs/developer-resources/location-attestations.md"
  "docs/examples.md"
)

content="# Content goes here..."

# Create the directory structure and files
for filepath in "${files[@]}"; do
  mkdir -p "$(dirname "$filepath")"
  echo -e "${content}" > "$filepath"
done

# Create the sidebar.ts file
cat <<EOL > sidebars.ts
const sidebars = {
  docs: [
    {
      type: 'category',
      label: 'What is Astral?',
      items: ['introducing-astral'],
    },
    {
      type: 'category',
      label: 'Core Concepts',
      items: [
        'core-concepts/what-is-spatial-data',
        'core-concepts/location-proofs',
        'core-concepts/onchain-geospatial',
        'core-concepts/decentralized-spatial-data',
      ],
    },
    {
      type: 'category',
      label: 'Location Proof Protocol',
      items: [
        'location-proof-protocol/architecture',
        'location-proof-protocol/eas-schema',
        'location-proof-protocol/location-types',
        'location-proof-protocol/strategies-recipes',
        'location-proof-protocol/media-types',
      ],
    },
    {
      type: 'category',
      label: 'Spatial Registries',
      items: [
        'spatial-registries/spatial-sol',
        'spatial-registries/logbook',
      ],
    },
    {
      type: 'category',
      label: 'Developer Resources',
      items: [
        'developer-resources/quickstart',
        'developer-resources/spatial-registries',
        'developer-resources/location-attestations',
      ],
    },
    'examples',
  ],
};

module.exports = sidebars;
EOL

echo "Directory structure and files created successfully."