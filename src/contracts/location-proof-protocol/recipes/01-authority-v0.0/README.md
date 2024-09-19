# Location Proof Recipe 001: Authority-based verification

This recipe requires some whitelisted address to verify the validity of a location attestation created by some prover. This is a simple,
trust-dependent verification strategy that relies on known verifiers. For example, conference check-in staff might approve attendees as they
arrive by verifying the location attestations they create.

In this strategy:

- The owner creates an allowlist by registering a set of addresses in a smart contracted as having verification privileges. These addresses
  are accounts controlled by trusted verifiers. In principle this allowlist could be formed of any identity attributes readable onchain (or
  available anywhere online), such as NFT possession, account balances, in a csv hosted on GitHub etc. Verifier accounts can be either
  externally-owned accounts or contract accounts — all they will need to do is sign attestations based on the verification EAS schema, and
  optionally register them onchain.
- The prover arrives at a location and generates a location claim on EAS, either through the [Logbook](https://logbook.astral.global) dapp
  or via some other client interface.
- The verifier verifies the accuracy of the details registered in the attestation, then issues a verification attestation referencing the
  UID of the original location claim.
- At this point, all information required to check that a prover's location attestation has been verified by an authorized account holder is
  available.

## Requirements

### User Roles

- Owner: Initializes and manages the allowlist of verifiers
- Verifier: Authorized to verify location attesations
- Prover: Creates location attesatations to be verified

Each of these must have EVM-compatible wallets, though it should be noted that EAS support offchain, private attestations and referenced
attestations, so this strategy does not necessarily require the public disclosure of personal identifying information. We use the term
"Users" because each of these roles could be played by a person or by some other agent, like an organization, user role, etc.

### Client Interfaces

- Owner Interface: For managing the allowlist
- Verifier Interface: For reviewing location claims and issuing verification attestations
- Prover Interface: For creating (unverified) location attestations
- General User Interface: For querying attestations and allowlists

### Verification System

- Can be implemented onchain (i.e. in a smart contract) or offchain (i.e. in a client library)
- Checks the validity of verified location proofs
- Logic: fetches
  - location attestation details
  - verification attestation details
  - the verifier accounts allowlist status

### Onchain

- A smart contract supporting the creation and management of allowlists. (This is probably possible to do privately, but that's beyond the
  scope of this recipe.)
- An EAS contract with:
  - a location attestation schema, such as the one described [here](https://docs.astral.global/docs/location-proof-protocol/eas-schema).
  - a verification attestation schema, a field for verifiers to indicate whether a location attestation is `true` — yet to be designed. (The
    ability to reference another attestation is native to EAS.)
    > Note that we see no reason why unverified location attestations and verification attestations would need to be registered on the same
    > blockchain, but it would certainly minimize complexity, especially for onchain verifications.

## Detailed Component Specifications

### Allowlist Contract

#### Functions:

- `initializeAllowlist(address[] memory _initialVerifiers)`
- `addVerifier(address _verifier)`
- `removeVerifier(address _verifier)`
- `isVerifier(address _address) returns (bool)`
- `getAllVerifiers() returns (address[] memory)`

#### Events:

- `VerifierAdded(address indexed verifier)`
- `VerifierRemoved(address indexed verifier)`

### EAS Schemas

#### Location Attestation Schema

- `uint256 eventTimestamp`
- `string srs`
- `string locationType`
- `string location`
- `string[] recipeType`
- `bytes[] recipePayload`
- `string[] mediaType`
- `string[] mediaData`
- `string memo`
- More details [here](https://docs.astral.global/docs/location-proof-protocol/eas-schema)

#### Verification Attestation Schema

- `refUID` (native to EAS)
- `bool isValid`
- `string comments`

### Client Interfaces

#### Owner Interface

- Initialize allowlist
- Add/remove verifiers
- View current allowlist

#### Verifier Interface

- View pending location attestations
- Create verification attestations
- View verification history

#### Prover Interface:

- Create location attestations
- View own attestation history
- Request verification

#### General User Interface:

- Query location attestations
- Query verification attestations
- Check allowlist status of addresses

### Verification System

#### Inputs

- Location attestation UID
- Verification attestation UID
- Verifier address

#### Process

1. Fetch location attestation details
2. Fetch verification attestation details
3. Check if verifier is on the allowlist
4. Validate the verification attestation references the correct location attestation
5. Return verification result

## Limitations (Incomplete)

- No checks to ensure that the verifier was physically present with the prover
- No mechanisms to prevent collusion or invalid assertions — verifiers must be trusted.

## Security Considerations

- Implement access controls on the allowlist contract, or use established + audited allowlist contracts
- Use secure random number generation for any randomized processes
- Implement rate limiting to prevent spam attestations
- Consider privacy implications of public attestations, and zero-knowledge or shielded location attestations, verification attestations and
  allowlists
- Implement upgradability patterns for smart contracts

## Testing Strategy

- Unit tests for all smart contract functions
- Integration tests for the entire verification flow
- Stress tests to ensure system stability under load
- Security audits of smart contracts and client interfaces

## Scalability Considerations

- Use efficient data structures in smart contracts
- Consider Layer 2 solutions for high-volume attestations
- Implement caching mechanisms in client interfaces

## Additional Considerations

- **Error Handling:** Implement comprehensive error handling in both smart contracts and client-side code to gracefully manage unexpected
  situations. Gas Optimization: For the Allowlist Contract, consider using more gas-efficient data structures or patterns, especially if you
  expect a large number of verifiers.
- **Upgradeability:** Consider implementing upgradeability patterns for your smart contracts to allow for future improvements without losing
  data.
- **Privacy:** The current design makes all attestations public. Consider implementing zero-knowledge proofs or other privacy-preserving
  techniques if location data confidentiality is a concern.
- **Decentralization:** The current design relies on a single owner for the allowlist. Consider implementing a more decentralized governance
  model for managing verifiers.
- **Incentives:** Think about incorporating incentive mechanisms for verifiers to encourage honest behavior and active participation in the
  network.
- **Scalability:** As the system grows, you might need to consider layer 2 solutions or sharding to handle a high volume of attestations.
  Cross-chain Compatibility: Consider how your protocol might work across different blockchain networks.
- **Time Sensitivity:** Implement mechanisms to handle time-sensitive verifications, such as expiration times for location proofs.
- **Metadata Standards:** Define clear standards for the `locationType`, `mediaType` and `recipeType` in the Location Attestation Schema to
  ensure consistency across different implementations.

## Possible Future Enhancements

- Multi-sig allowlist management
- Reputation system for verifiers
- Integration with decentralized identity systems
- Cross-chain verification support

## Conclusion

This is a simple pattern to provide a thin layer of evidence supporting a verifier's claim to have been at a particular place at a
particular time, and perhaps that attached media data is credible.
