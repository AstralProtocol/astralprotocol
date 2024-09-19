# Example verification script — untested!
import requests
from web3 import Web3

class LocationProofVerifier:
    def __init__(self, allowlist_contract_address, eas_contract_address, rpc_url):
        self.w3 = Web3(Web3.HTTPProvider(rpc_url))
        self.allowlist_contract = self.w3.eth.contract(address=allowlist_contract_address, abi=ALLOWLIST_ABI)
        self.eas_contract = self.w3.eth.contract(address=eas_contract_address, abi=EAS_ABI)

    def verify_location_proof(self, location_attestation_uid, verification_attestation_uid, verifier_address):
        # Step 1: Fetch location attestation details
        location_attestation = self.eas_contract.functions.getAttestation(location_attestation_uid).call()

        # Step 2: Fetch verification attestation details
        verification_attestation = self.eas_contract.functions.getAttestation(verification_attestation_uid).call()

        # Step 3: Check if verifier is on the allowlist
        is_verifier = self.allowlist_contract.functions.isVerifier(verifier_address).call()

        if not is_verifier:
            return False, "Verifier is not on the allowlist"

        # Step 4: Validate the verification attestation references the correct location attestation
        if verification_attestation['data']['originalAttestationUID'] != location_attestation_uid:
            return False, "Verification attestation does not reference the correct location attestation"

        # Step 5: Check if the verification attestation confirms the location
        if not verification_attestation['data']['isValid']:
            return False, "Location not verified by the verifier"

        return True, "Location proof verified successfully"

# Usage example
verifier = LocationProofVerifier(
    allowlist_contract_address="0x...",
    eas_contract_address="0x...",
    rpc_url="https://sepolia.infura.io/v3/YOUR-PROJECT-ID"
)

result, message = verifier.verify_location_proof(
    location_attestation_uid="0x...",
    verification_attestation_uid="0x...",
    verifier_address="0x..."
)

print(f"Verification result: {result}")
print(f"Message: {message}")