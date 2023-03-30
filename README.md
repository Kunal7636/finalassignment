# Wrestling Card Game on Blockchain
##### This is a simple wrestling card game created on the blockchain using non-fungible tokens (NFTs). The objective of the game is to defeat your opponent and collect all of their wrestlers by winning battles.
# How it works
##### The application allows users to mint and trade wrestlers (ERC-721 tokens) on the Ethereum blockchain. Each wrestler has a name, strength, and win/loss record. The wrestlers can be used to participate in battles, which are initiated by transferring wrestlers to a battle contract. The battle contract selects a random wrestler from each participant and compares their strengths to determine the winner. The winner receives the opponent's wrestler as a prize. The contract also allows the owner to update wrestler strength and record wins/losses.
# Functions
### Wrestlers contract:

##### 1)mint(string memory name, uint256 strength): This function is used by the contract owner to create new Wrestler NFTs by providing a name and strength. It benefits the owner by allowing them to create new NFTs for the community to collect and trade.

2)getWrestler(uint256 tokenId): This function is used to retrieve the information of a specific Wrestler NFT, such as its name, strength, wins and losses. It benefits users by allowing them to view the information of a specific NFT they own or are interested in.

3)updateStrength(uint256 tokenId, uint256 newStrength): This function is used by the contract owner to update the strength of a specific Wrestler NFT. It benefits the owner by allowing them to adjust the stats of a specific NFT to reflect its performance.

4)recordWin(uint256 tokenId): This function is used by the contract owner to record a win for a specific Wrestler NFT. It benefits the owner by allowing them to keep track of the performance of a specific NFT and adjust its stats accordingly.

5)recordLoss(uint256 tokenId): This function is used by the contract owner to record a loss for a specific Wrestler NFT. It benefits the owner by allowing them to keep track of the performance of a specific NFT and adjust its stats accordingly.

#### NFT
##### The ERC721 standard is a widely-used protocol for creating unique and non-fungible tokens on the Ethereum blockchain. It provides a set of functions and events that allow developers to create, manage, and transfer NFTs.
The Wrestlers smart contract inherits from the ERC721 contract and implements the IERC721Enumerable and Ownable interfaces. This allows the contract to create unique NFTs that can be owned and transferred by different addresses.
The mint function is used to create a new NFT. It takes two parameters, name and strength, which are used to define the name and strength of the wrestler respectively. The function then creates a new wrestler object and assigns it a unique token ID. The token ID is incremented by one after each new NFT is minted. The _mint function is then called to assign ownership of the NFT to the address that called the mint function.
The updateStrength, recordWin, and recordLoss functions are used to update the strength, wins, and losses of a wrestler respectively. These functions can only be called by the owner of the contract.
The totalSupply, tokenByIndex, tokenOfOwnerByIndex, and belongsTo functions are used to get information about the NFTs created by the contract. These functions are part of the IERC721Enumerable interface and allow developers to retrieve data about the NFTs and their ownership.
