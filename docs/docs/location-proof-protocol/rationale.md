# Rationale

We are developing a protocol that accommodates various proof strategies while maintaining a standard data model and tools for creating and
verifying location proofs.

- Locations can be represented in a range of ways, within a range of different spatial reference systems
- There are many different possible strategies for proving location in trust-minimized environments — different use cases will require
  different levels of precision, confidence, cost, privacy etc
- Users will want to attach all sorts of different media to proofs, from photos and videos to LIDAR scans to URLs

Our design is intended to flexibly serve all of these use cases, while provided a common format to talk about verifiable location on the
decentralized web. By converging on this standard we hope location proofs will be composable and interoperable.
