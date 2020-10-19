// SPDX-License-Identifier: APACHE OR MIT
pragma solidity ^0.6.0;

import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/GSN/Context.sol";
import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";

/**
 * @dev {ERC1155} token, including:
 *
 *  - ability for holders to burn (destroy) their tokens
 *  - a minter role that allows for token minting (creation)
 *
 * This contract uses {AccessControl} to lock permissioned functions using the
 * different roles - head to its documentation for details.
 *
 * The account that deploys the contract will be granted the minter as well as the default admin role, which will let it grant
 * minter roles to other accounts
 */
contract SpatialAssets is Context, AccessControl, ERC1155 {
    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");

    // Mapping from id to active status
    mapping (uint256 => bool) private _activeIds;

    /**
     * @dev Grants `DEFAULT_ADMIN_ROLE`, `MINTER_ROLE` to the account that
     * deploys the contract.
     */
    constructor() public ERC1155("did:geo:{id}") {
        _setupRole(DEFAULT_ADMIN_ROLE, _msgSender());

        _setupRole(MINTER_ROLE, _msgSender());

    }

    /**
     * @dev Creates `amount` new tokens for `to`, of token type `id`.
     *
     * See {ERC1155-_mint}.
     *
     * Requirements:
     *
     * - the caller must have the `MINTER_ROLE`.
     */
    function mint(address to, uint256 id, uint256 amount, bytes memory data) public virtual {
        require(hasRole(MINTER_ROLE, _msgSender()), "SpatialAssets: must have minter role to mint");
        require(_activeIds[id]==false, "Id exists, aborting");
        _mint(to, id, amount, data);

        _activeIds[id]=true;
    }

     function burn(address account, uint256 id, uint256 value) public virtual {
        require(
            account == _msgSender() || isApprovedForAll(account, _msgSender()),
            "ERC1155: caller is not owner nor approved"
        );
        require(_activeIds[id]==false, "Id does not exist, aborting");

        _burn(account, id, value);

        _activeIds[id]=false;
    }
  

    function _beforeTokenTransfer(
        address operator,
        address from,
        address to,
        uint256[] memory ids,
        uint256[] memory amounts,
        bytes memory data
    )
        internal virtual override(ERC1155)
    {
        super._beforeTokenTransfer(operator, from, to, ids, amounts, data);
    }
}
