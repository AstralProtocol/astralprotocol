// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "forge-std/Script.sol";
import "eas-contracts/contracts/EAS.sol";
import "eas-contracts/contracts/SchemaRegistry.sol";
import "eas-contracts/contracts/ISchemaRegistry.sol";

contract DeployEASSchema is Script {
    // EAS contract address (replace with the correct address for your target network)
    address constant EAS_CONTRACT_ADDRESS = 0x0a7E2Ff54e76B8E6659aedc9103FB21c038050D0; // Sepolia SchemaRegistry

    function run() public {
        // Start broadcasting transactions
        vm.startBroadcast();

        // Get the SchemaRegistry contract address from EAS
        ISchemaRegistry schemaRegistry = ISchemaRegistry(EAS_CONTRACT_ADDRESS);

        // Define the schema string
        string memory schema = "uint256 eventTimestamp,string srs,string locationType,string location,string[] recipeType,bytes[] recipePayload,string[] mediaType,string[] mediaData,string memo";

        // Register the schema
        bytes32 schemaId = schemaRegistry.register(schema, ISchemaResolver(address(0)), true);

        // Log the schema ID
        console.log("Schema registered with ID:", vm.toString(schemaId));

        // Stop broadcasting transactions
        vm.stopBroadcast();
    }
}


/* Setup Instructions:

1. Initialize a new Foundry project (if not already done):
   forge init my_eas_project
   cd my_eas_project

2. Install dependencies:
   forge install foundry-rs/forge-std
   forge install ethereum-attestation-service/eas-contracts

3. Create a remappings.txt file in your project root with the following content:
   forge-std/=lib/forge-std/src/
   @ethereum-attestation-service/eas-contracts/=lib/eas-contracts/contracts/

4. Update foundry.toml (create if it doesn't exist) in your project root:
   [profile.default]
   src = 'src'
   out = 'out'
   libs = ['lib']
   remappings = [
       'forge-std/=lib/forge-std/src/',
       '@ethereum-attestation-service/eas-contracts/=lib/eas-contracts/contracts/'
   ]

5. Save this script as `script/DeployEASSchema.s.sol`

6. Compile the project:
   forge build

7. Run the script:
   forge script script/DeployEASSchema.s.sol:DeployEASSchema --rpc-url <your-rpc-url> --private-key <your-private-key>

Replace <your-rpc-url> and <your-private-key> with appropriate values.
*/