# GeoDID Method Specification (Alpha - WIP)

## Author

-   AstralDAO Team: <https://astraldao.org/>

## Preface

The geoDID method specification conforms to the requirements specified in
the [DID specification](https://w3c-ccg.github.io/did-core/), currently published by the
W3C Credentials Community Group. For more information about DIDs and DID method specifications,
please see the [DID Primer](https://github.com/WebOfTrustInfo/rebooting-the-web-of-trust-fall2017/blob/master/topics-and-advance-readings/did-primer.md)

## Abstract

Decentralized Identifiers (DIDs, see [1]) are designed to be compatible with any distributed ledger or network.

The described DID method allows us to register spacial data.
An identity needs no registration. In the case that key management or additional
attributes such as "service endpoints" are required:

### Identity Controller
By default, each identity is controlled by itself. Each identity can only be controlled by a single
address at any given time. By default, this is the address of the identity itself.

## Target System

### Advantages

## JSON-LD Context Definition


## DID Method Name

The namestring that shall identify this DID method is: `geo`

A DID that uses this method MUST begin with the following prefix: `did:geo`. Per the DID specification, this string
MUST be in lowercase. The remainder of the DID, after the prefix, is specified below.

## Method Specific Identifier

## CRUD Operation Definitions

### Create (Register)

In order to create a `geo` DID, an Ethereum address, i.e., key pair, needs to be generated.

### Read (Resolve)

The DID document is built by using read only functions and contract events on the ERC1056 registry.

#### Controller Address

Each identity always has a controller address.

#### Events to build the DID Document

#### Delegate Keys

#### Public Keys

#### Service Endpoints

### Update

### Delete (Revoke)

## Reference Implementations

## References

 **[1]** <https://w3c-ccg.github.io/did-core/>