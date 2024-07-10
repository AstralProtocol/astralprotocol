# Registering Log Entries

To register a log entry, you'll need the ability to interact with dapps built on Arbitrum and Celo. This means having a wallet configured to
connect to these networks, with an account funded to pay gas fees.

To learn how to set up a wallet and use Web3 applications, we recommend [this guide](TODO).

## Connecting

Load logbook.astral.global and connect your wallet, making sure the correct network is selected.

Then, click the "Register entry" button to load the page where you'll input the entry details.

## Log Entry Fields

The Logbook provides a UI for you to add relevant data to a log entry. These fields align with the EAS location proof schema described
[here](../location-proof-protocol/eas-schema.md).

TODO: screenshot

### Location

Every log entry needs a location. For v0.1, locations are represented as WGS84 (TODO: is this it?) coordinates, ordered
`[longitude, latitude]`, aligned with the [GeoJSON](https://www.google.com/search?q=geojson+standard) convention.

To add a location to a log entry, in the Register Entry page pan + zoom the map to the spot you want to anchor the entry, and tap. On tap, a
form should appear, and a marker should be added to the map. To adjust the location, simply tap elsewhere on the map — the coordinates in
the form field boxes will update.

TODO: Can users manually input coordinates?

### Date + time

Use the datetime picker popup to choose the date and time of the event being recorded.

### Memo

Input any string in the Memo field — get creative here! You can also include emojis and hashtags. Memos are limited to TODO x characters.

### Media

Attach any media to log entries using the Media Upload feature. For now, images are supported and can be viewed in our front end, but data
in any format can be attached. Media files are stored on IPFS.

## Broadcasting the log entry

Once you've input the log entry data, tap or click "Register entry". This will trigger your wallet to open and prompt you to sign a
transaction.

This transaction registers the data you input as an attestation on the Ethereum Attestation Service (EAS).

Transactions should be addressed to:

- 0x... on Arbitrum
  - EAS docs
  - Arbiscan
- 0x on Celo
  - EAS docs
  - Celoscan

Confirm that everything looks right and sign the transaction. Your wallet will broadcast it to the network.

Once your tx is validated, the dapp should automatically progress to the [Log Entry Details page](./viewing-entries.md) for the entry you
just registered. Congratulations! ✨
