pragma solidity 0.6.12;

// SPDX-License-Identifier: Apache-2.0

contract SpatialAssetRegistrar {
    //----------------- Storage -----------------

    mapping(address => address) public owners;
    mapping(address => mapping(bytes32 => mapping(address => uint))) public delegates;
    mapping(address => uint) public changed;
    mapping(address => uint) public nonce;

    //---------------- Modifiers -----------------

    modifier onlyOwner(address identity, address actor) {
        require (actor == identityOwner(identity));
        _;
    }

    //----------------- Events ------------------   

    event geoDIDOwnerChanged(
        address indexed identity,
        address owner,
        uint previousChange
    );

    event geoDIDDelegateChanged(
        address indexed identity,
        bytes32 delegateType,
        address delegate,
        uint validTo,
        uint previousChange
    );

    event geoDIDAttributeChanged(
        address indexed identity,
        bytes32 name,
        bytes value,
        uint validTo,
        uint previousChange
    );

    //---------------- Public view functions -----------------

    function identityOwner(address identity) public view returns(address) {
        address owner = owners[identity];
        if (owner != address(0)) {
            return owner;
        }
        return identity;
    }

    function validDelegate(address identity, bytes32 delegateType, address delegate) public view returns(bool) {
        uint validity = delegates[identity][keccak256(abi.encodePacked(delegateType))][delegate];
        return (validity > now);
    }

    //---------------- Public state change functions -----------------

    function changeOwner(address identity, address newOwner) public {
        _changeOwner(identity, msg.sender, newOwner);
    }

    function changeOwnerSigned(address identity, uint8 sigV, bytes32 sigR, bytes32 sigS, address newOwner) public {
        bytes32 hash = keccak256(abi.encodePacked(byte(0x19), byte(0), this, nonce[identityOwner(identity)], identity, "changeOwner", newOwner));
        _changeOwner(identity, _checkSignature(identity, sigV, sigR, sigS, hash), newOwner);
    }

    function addDelegate(address identity, bytes32 delegateType, address delegate, uint validity) public {
        _addDelegate(identity, msg.sender, delegateType, delegate, validity);
    }

    function addDelegateSigned(address identity, uint8 sigV, bytes32 sigR, bytes32 sigS, bytes32 delegateType, address delegate, uint validity) public {
        bytes32 hash = keccak256(abi.encodePacked(byte(0x19), byte(0), this, nonce[identityOwner(identity)], identity, "addDelegate", delegateType, delegate, validity));
        _addDelegate(identity, _checkSignature(identity, sigV, sigR, sigS, hash), delegateType, delegate, validity);
    }
  
    function revokeDelegate(address identity, bytes32 delegateType, address delegate) public {
        _revokeDelegate(identity, msg.sender, delegateType, delegate);
    }

    function revokeDelegateSigned(address identity, uint8 sigV, bytes32 sigR, bytes32 sigS, bytes32 delegateType, address delegate) public {
        bytes32 hash = keccak256(abi.encodePacked(byte(0x19), byte(0), this, nonce[identityOwner(identity)], identity, "revokeDelegate", delegateType, delegate));
        _revokeDelegate(identity, _checkSignature(identity, sigV, sigR, sigS, hash), delegateType, delegate);
    }

    function setAttribute(address identity, bytes32 name, bytes memory value, uint validity) public {
        _setAttribute(identity, msg.sender, name, value, validity);
    }

    function setAttributeSigned(address identity, uint8 sigV, bytes32 sigR, bytes32 sigS, bytes32 name, bytes memory value, uint validity) public {
        bytes32 hash = keccak256(abi.encodePacked(byte(0x19), byte(0), this, nonce[identityOwner(identity)], identity, "setAttribute", name, value, validity));
        _setAttribute(identity, _checkSignature(identity, sigV, sigR, sigS, hash), name, value, validity);
    }

    function revokeAttribute(address identity, bytes32 name, bytes memory value) public {
        _revokeAttribute(identity, msg.sender, name, value);
    }

    function revokeAttributeSigned(address identity, uint8 sigV, bytes32 sigR, bytes32 sigS, bytes32 name, bytes memory value) public {
        bytes32 hash = keccak256(abi.encodePacked(byte(0x19), byte(0), this, nonce[identityOwner(identity)], identity, "revokeAttribute", name, value)); 
        _revokeAttribute(identity, _checkSignature(identity, sigV, sigR, sigS, hash), name, value);
    }

    //---------------- Internal functions -----------------

    function _checkSignature(address identity, uint8 sigV, bytes32 sigR, bytes32 sigS, bytes32 hash) internal returns(address) {
        address signer = ecrecover(hash, sigV, sigR, sigS);
        require(signer == identityOwner(identity));
        nonce[signer]++;
        return signer;
    }

    function _changeOwner(address identity, address actor, address newOwner) internal onlyOwner(identity, actor) {
        owners[identity] = newOwner;
        emit geoDIDOwnerChanged(identity, newOwner, changed[identity]);
        changed[identity] = block.number;
    }

    function _addDelegate(address identity, address actor, bytes32 delegateType, address delegate, uint validity) internal onlyOwner(identity, actor) {
        delegates[identity][keccak256(abi.encodePacked(delegateType))][delegate] = now + validity;
        emit geoDIDDelegateChanged(identity, delegateType, delegate, now + validity, changed[identity]);
        changed[identity] = block.number;
    }

    function _revokeDelegate(address identity, address actor, bytes32 delegateType, address delegate) internal onlyOwner(identity, actor) {
        delegates[identity][keccak256(abi.encodePacked(delegateType))][delegate] = now;
        emit geoDIDDelegateChanged(identity, delegateType, delegate, now, changed[identity]);
        changed[identity] = block.number;
    }

    function _setAttribute(address identity, address actor, bytes32 name, bytes memory value, uint validity ) internal onlyOwner(identity, actor) {
        emit geoDIDAttributeChanged(identity, name, value, now + validity, changed[identity]);
        changed[identity] = block.number;
    }

    function _revokeAttribute(address identity, address actor, bytes32 name, bytes memory value ) internal onlyOwner(identity, actor) {
        emit geoDIDAttributeChanged(identity, name, value, 0, changed[identity]);
        changed[identity] = block.number;
    }

}
