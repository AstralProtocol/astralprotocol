// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// An example implementation of a contract that manages a list of verifiers — untested and undeployed!
contract VerifierAllowlist {
    address public owner;
    mapping(address => bool) public isVerifier;
    address[] public verifiers;

    event VerifierAdded(address indexed verifier);
    event VerifierRemoved(address indexed verifier);

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this function");
        _;
    }

    function initializeAllowlist(address[] memory _initialVerifiers) public onlyOwner {
        for (uint i = 0; i < _initialVerifiers.length; i++) {
            addVerifier(_initialVerifiers[i]);
        }
    }

    function addVerifier(address _verifier) public onlyOwner {
        require(!isVerifier[_verifier], "Address is already a verifier");
        isVerifier[_verifier] = true;
        verifiers.push(_verifier);
        emit VerifierAdded(_verifier);
    }

    function removeVerifier(address _verifier) public onlyOwner {
        require(isVerifier[_verifier], "Address is not a verifier");
        isVerifier[_verifier] = false;
        for (uint i = 0; i < verifiers.length; i++) {
            if (verifiers[i] == _verifier) {
                verifiers[i] = verifiers[verifiers.length - 1];
                verifiers.pop();
                break;
            }
        }
        emit VerifierRemoved(_verifier);
    }

    function getAllVerifiers() public view returns (address[] memory) {
        return verifiers;
    }
}