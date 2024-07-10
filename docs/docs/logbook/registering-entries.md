# Registering Log Entries

To register a log entry, you'll need the ability to interact with dapps built on Arbitrum and Celo. This means having a wallet configured to
connect to these networks, with an account funded to pay gas fees.

To learn how to set up a wallet and use Web3 applications, we recommend
[this guide](https://www.coingecko.com/learn/how-to-use-rabby-wallet).

## Connecting

Load logbook.astral.global/register and connect your wallet, making sure the correct network is selected. This is the page where you'll
input the entry details.

## Log Entry Fields

The Logbook provides a UI for you to add relevant data to a log entry. These fields align with the EAS location proof schema described
[here](../location-proof-protocol/eas-schema.md).

<div style={{ display: 'flex', justifyContent: 'space-between' }}>
  <img src={require('./media/register-entry-1.png').default} alt="Register Entry 1" style={{ width: '38%' }} />
  <img src={require('./media/register-entry-2.png').default} alt="Register Entry 2" style={{ width: '38%' }} />
</div>

### Location

Every log entry needs a location. For v0.1, locations are represented as WGS84 (TODO: is this it?) decimal degree coordinates, ordered
`[longitude, latitude]`, aligned with the [GeoJSON](https://www.google.com/search?q=geojson+standard) convention.

To add a location to a log entry, in the Register Entry page pan + zoom the map to the spot you want to anchor the entry, and tap. On tap, a
form should appear, and a marker should be added to the map. To adjust the location, simply tap elsewhere on the map — the coordinates in
the form field boxes will update.

### Date + time

Use the datetime picker popup to choose the date and time of the event being recorded.

### Memo

Input any string in the Memo field — get creative here! You can also include emojis and hashtags. Memos are limited to TODO x characters.

### Media

Attach any media to log entries using the Media Upload feature. For now, images are supported and can be viewed in our front end, but data
in any format can be attached. Media files are stored on IPFS.

## Broadcasting the log entry

Once you've input the log entry data, tap or click "Record Log Entry". This will trigger your wallet to open and prompt you to sign a
transaction.

This transaction registers the data you input as an attestation on the Ethereum Attestation Service (EAS).

Transactions should be addressed to:

- 0xbD75f629A22Dc1ceD33dDA0b68c546A1c035c458 on Arbitrum
  - [EAS docs](https://github.com/ethereum-attestation-service/eas-contracts?tab=readme-ov-file#arbitrum-one)
  - [Arbiscan](https://arbiscan.io/address/0xbD75f629A22Dc1ceD33dDA0b68c546A1c035c458)
- 0x on Celo
  - [EAS docs](https://github.com/ethereum-attestation-service/eas-contracts?tab=readme-ov-file#celo)
  - [Celoscan](https://celoscan.io/address/0x72E1d8ccf5299fb36fEfD8CC4394B8ef7e98Af92)

Confirm that everything looks right and sign the transaction. Your wallet will broadcast it to the network.

Once your tx is validated, the dapp should automatically progress to the [Log Entry Details page](./viewing-entries.md) for the entry you
just registered. Congratulations! ✨
