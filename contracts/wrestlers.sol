// SPDX-License-Identifier: MIT
pragma solidity ^0.8.1;

import "@openzeppelin/contracts/token/ERC721/extensions/IERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";


contract Wrestlers is ERC721, IERC721Enumerable, Ownable{
    struct Wrestler {
        string name;
        uint256 strength;
        uint256 wins;
        uint256 losses;
    }
    mapping (uint256 => Wrestler) private wrestlers;
    uint256 private wrestlerCount;
    
    constructor() ERC721("Wrestlers", "WRS") {}
    
    function mint(string memory name, uint256 strength) external onlyOwner {
        uint256 tokenId = wrestlerCount;
        wrestlers[tokenId] = Wrestler(name, strength, 0, 0);
        wrestlerCount++;
        _mint(msg.sender, tokenId);
    }
    
    function getWrestler(uint256 tokenId) public view returns (Wrestler memory) {
        require(_exists(tokenId), "Wrestler does not exist");
        return wrestlers[tokenId];
    }
    
    function updateStrength(uint256 tokenId, uint256 newStrength) external onlyOwner {
        require(_exists(tokenId), "Wrestler does not exist");
        wrestlers[tokenId].strength = newStrength;
    }
    
    function recordWin(uint256 tokenId) external onlyOwner {
        require(_exists(tokenId), "Wrestler does not exist");
        wrestlers[tokenId].wins++;
    }
    
    function recordLoss(uint256 tokenId) external onlyOwner {
        require(_exists(tokenId), "Wrestler does not exist");
        wrestlers[tokenId].losses++;
    }
    
    function totalSupply() public view virtual override returns (uint256) {
        return wrestlerCount;
    }

    function tokenByIndex(uint256 index) public view virtual override returns (uint256) {
        require(index < wrestlerCount, "Index out of bounds");
        return index;
    }

    function tokenOfOwnerByIndex(address owner, uint256 index) public view virtual override returns (uint256) {
        require(index < balanceOf(owner), "Index out of bounds");
        return tokenOfOwnerByIndex(owner, index);
    }

    function belongsTo(address owner, uint256 tokenId) public view returns (bool) {
        return ownerOf(tokenId) == owner;
    }
}