const sidebars = {
  docs: [
    {
      type: 'category',
      label: 'Astral',
      items: ['introduction'],
    },
    // {
    //   type: 'category',
    //   label: 'Core Concepts',
    //   items: [
    //     'core-concepts/what-is-spatial-data',
    //     'core-concepts/location-proofs',
    //     'core-concepts/onchain-geospatial',
    //     'core-concepts/decentralized-spatial-data',
    //   ],
    // },
    {
      type: 'category',
      label: 'Location Proof Protocol',
      items: [
        'location-proof-protocol/introduction',
        'location-proof-protocol/rationale',
        'location-proof-protocol/architecture',
        'location-proof-protocol/eas-schema',
        'location-proof-protocol/location-types',
        'location-proof-protocol/strategies-recipes',
        'location-proof-protocol/media-types',
      ],
    },
    {
      type: 'category',
      label: 'Logbook',
      items: [
        'logbook/introduction',
        'logbook/registering-entries',
        'logbook/viewing-entries',
        'logbook/multi-entry-views',
        'logbook/frames',
        'logbook/developers',
        'logbook/contributing',
      ],
    },
    // {
    //   type: 'category',
    //   label: 'Spatial Registries',
    //   items: [
    //     'spatial-registries/spatial-sol',
    //     'spatial-registries/logbook',
    //   ],
    // },
    // {
    //   type: 'category',
    //   label: 'Developer Resources',
    //   items: [
    //     'developer-resources/quickstart',
    //     'developer-resources/spatial-registries',
    //     'developer-resources/location-attestations',
    //   ],
    // },
  ],
};

module.exports = sidebars;