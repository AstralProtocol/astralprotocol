# EAS Schema

## Location Proof Protocol: Core Schema v0.1

### Deployments

The core layer of the Location Proof Protocol includes a standard data model. v0.1 of the data model is described in this document.

the v0.1 schema UID is`0xba4171c92572b1e4f241d044c32cdf083be9fd946b8766977558ca6378c824e2` across all chains.

Raw schema: `uint256 eventTimestamp,string srs,string locationType,string location,string[] recipeType,bytes[] recipePayload,string[] mediaType,string[] mediaData,string memo`

The current working schema is deployed on:

- **Arbitrum One mainnet**, Schema 228 — [view on Arbitrum EASScan](https://arbitrum.easscan.org/schema/view/0xba4171c92572b1e4f241d044c32cdf083be9fd946b8766977558ca6378c824e2)
- **Celo mainnet**, Schema 59 — [view on Celo EASScan](https://celo.easscan.org/schema/view/0xba4171c92572b1e4f241d044c32cdf083be9fd946b8766977558ca6378c824e2)
- **Ethereum Sepolia testnet**, Schema 2266 — [view on Sepolia EASScan](https://sepolia.easscan.org/schema/view/0xba4171c92572b1e4f241d044c32cdf083be9fd946b8766977558ca6378c824e2)
- **Base mainnet**, Schema 544 — [view on Base EASScan](https://base.easscan.org/schema/view/0xba4171c92572b1e4f241d044c32cdf083be9fd946b8766977558ca6378c824e2)

### Schema Details

| Field                    | Description                                                                                                                                                                                                                 | Key              | Data Type  | Source                                                                                                           |
| ------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------- | ---------- | ---------------------------------------------------------------------------------------------------------------- |
| Identifier               | Unique ID for the location proof.                                                                                                                                                                                           | `uid`            | `bytes32`  | EAS provides this                                                                                                |
| Prover Address           | Address of the prover.                                                                                                                                                                                                      | `from`           | `address`  | Sender address, as specified by EAS                                                                              |
| Subject Identifier       | Unique ID for the subject/event.                                                                                                                                                                                            | `subject`        | `address`  | EAS provides this, however future iterations may require IDs that are not Ethereum addresses (DIDs, for example) |
| Timestamp                | Time the location proof was created.                                                                                                                                                                                        | `timestamp`      | `uint256`  | EAS                                                                                                              |
| Event Timestamp          | Time of the event referenced by the location proof.                                                                                                                                                                         | `eventTimestamp` | `uint256`  | User input                                                                                                       |
| Spatial Reference System | Coordinate system within which the object is positioned.                                                                                                                                                                    | `srs`            | `string`   | in v0.1, hard coded to "EPSG:4326"                                                                               |
| Location Type            | A string defining how the location field is structured.                                                                                                                                                                     | `locationType`   | `string`   | Depends on the `recipe` / strategy, or user input                                                                |
| Location                 | The location of the object/event.                                                                                                                                                                                           | `location`       | `string`   | Depends on the `recipe` / strategy, or user input                                                                |
| Proof Recipe Identifier  | Indicates the proof recipe used.                                                                                                                                                                                            | `recipeType`     | `string[]` | Defined from a set of registered recipes, to be stored in the @/recipes directory                                |
| Proof Recipe Payload     | Encoded data specific to the proof recipe, which could include encrypted location data, a zero-knowledge proof, or references to other verification data.                                                                   | `recipePayload`  | `bytes[]`  | Specified in recipe definition                                                                                   |
| Media Type               | A unique string referring to the media to be included in a `bytes` field, Media Data. This pattern is similar to OpenGraph Protocol’s `type` definition.                                                                    | `mediaType`      | `string[]` | Defined from a set of supported media types, to be stored in the @/media directory                               |
| Media Data               | A `string` field allowing the attachment of arbitrary data to a location proof, referenced by CID. This data is intended to be irrelevant to the location proof and not required/utilized in the proof recipe verification. | `mediaData`      | `string[]` | Attached by user                                                                                                 |
| Memo                     | An arbitrary message                                                                                                                                                                                                        | `memo`           | `string`   | User input                                                                                                       |

Note that this design supports location proofs that include multiple recipe types / recipe payloads and media type / media data.
