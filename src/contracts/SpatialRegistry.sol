// SPDX-FileCopyrightText: ©️ 2024 Astral Protocol

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.25;

import { ERC721, IERC165, ERC721Enumerable } from "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import { ISpatialRegistry } from "@interface/ISpatialRegistry.sol";

/**
 * @title SpatialRegistry
 * @author The Astral Protocol team
 */
contract SpatialRegistry is ISpatialRegistry, ERC721 {
    address owner;
    uint256 private currentTokenId = 0;
    uint256 private currentcoordId = 0;
    /* All coords in the registry (of multiple registryAssets) */
    mapping(uint256 => geoJsonCoord) public coordId;

    // TODO: add reentrancy, pausable, accessControl..

    constructor(address) ERC721("AstralRegistry", "AST") {
        owner = _msgSender();
    }

    /**
     * @inheritdoc ISpatialRegistry
     * @dev (needed for compiler https://github.com/ethereum/solidity/issues/14397)
     */
    function mintGISPoint(geoJsonCoord calldata lat, geoJsonCoord calldata long) external onlyOwner {
        currentTokenId++;
        currentcoordId++;

        _safeMint(owner, currentTokenId);
    }

    /**
     * @inheritdoc ISpatialRegistry
     * @dev (needed for compiler https://github.com/ethereum/solidity/issues/14397)
     */
    function mintGISFeature(
        uint256 coordsCount,
        geoJsonCoord calldata lat1,
        geoJsonCoord calldata long1,
        geoJsonCoord calldata lat2,
        geoJsonCoord calldata long2,
        geoJsonCoord calldata lat3,
        geoJsonCoord calldata long3,
        geoJsonCoord calldata lat4,
        geoJsonCoord calldata long4
    )
        external
        override
    { }

    /**
     * @inheritdoc ISpatialRegistry
     * @dev (needed for compiler https://github.com/ethereum/solidity/issues/14397)
     */
    function mintGISFeature(
        uint256 coordsCount,
        geoJsonCoord calldata lat1,
        geoJsonCoord calldata long1,
        geoJsonCoord calldata lat2,
        geoJsonCoord calldata long2,
        geoJsonCoord calldata lat3,
        geoJsonCoord calldata long3,
        geoJsonCoord calldata lat4,
        geoJsonCoord calldata long4,
        geoJsonCoord calldata lat5,
        geoJsonCoord calldata long5,
        geoJsonCoord calldata lat6,
        geoJsonCoord calldata long6,
        geoJsonCoord calldata lat7,
        geoJsonCoord calldata long7,
        geoJsonCoord calldata lat8,
        geoJsonCoord calldata long8,
        geoJsonCoord calldata lat9,
        geoJsonCoord calldata long9,
        geoJsonCoord calldata lat10,
        geoJsonCoord calldata long10,
        geoJsonCoord calldata lat11,
        geoJsonCoord calldata long11,
        geoJsonCoord calldata lat12,
        geoJsonCoord calldata long12
    )
        external
        override
    { }

    /**
     * @inheritdoc ERC721
     * @dev (needed for compiler https://github.com/ethereum/solidity/issues/14397)
     */
    function _safeMint(address to, uint256 tokenId) override internal onlyOwner {
        _safeMint(to, tokenId);
    }

    /**
     * @inheritdoc ERC721
     * @dev (needed for compiler https://github.com/ethereum/solidity/issues/14397)
     */
    function supportsInterface(bytes4 interfaceId) public view override(ERC721, IERC165) returns (bool) {
        return super.supportsInterface(interfaceId);
    }

    /**
     * @inheritdoc ERC721
     * @dev (needed for compiler https://github.com/ethereum/solidity/issues/14397)
     */
    function totalSupply() public view override returns (uint256) {
        totalSupply();
    }
    /**
     * @inheritdoc ERC721
     * @dev (needed for compiler https://github.com/ethereum/solidity/issues/14397)
     */
    function tokenOfOwnerByIndex(address _owner, uint256 index) public view override returns (uint256) {
        tokenOfOwnerByIndex(_owner, index);
    }
    /**
     * @inheritdoc ERC721
     * @dev (needed for compiler https://github.com/ethereum/solidity/issues/14397)
     */
    function tokenByIndex(uint256 index) public view override returns (uint256) {
        tokenByIndex(index);
    }

    /**
     * @inheritdoc ERC721
     * @dev (needed for compiler https://github.com/ethereum/solidity/issues/14397)
     */
    modifier onlyOwner() {
        require(msg.sender == owner);
        _;
    }
}
