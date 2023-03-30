# Wrestling Card Game on Blockchain
##### This is a simple wrestling card game created on the blockchain using non-fungible tokens (NFTs). The objective of the game is to defeat your opponent and collect all of their wrestlers by winning battles.
# How it works
##### The application allows users to mint and trade wrestlers (ERC-721 tokens) on the Ethereum blockchain. Each wrestler has a name, strength, and win/loss record. The wrestlers can be used to participate in battles, which are initiated by transferring wrestlers to a battle contract. The battle contract selects a random wrestler from each participant and compares their strengths to determine the winner. The winner receives the opponent's wrestler as a prize. The contract also allows the owner to update wrestler strength and record wins/losses.
# Functions
### Wrestlers contract:

##### mint(string memory name, uint256 strength): This function is used by the contract owner to create new Wrestler NFTs by providing a name and strength. It benefits the owner by allowing them to create new NFTs for the community to collect and trade.

getWrestler(uint256 tokenId): This function is used to retrieve the information of a specific Wrestler NFT, such as its name, strength, wins and losses. It benefits users by allowing them to view the information of a specific NFT they own or are interested in.

updateStrength(uint256 tokenId, uint256 newStrength): This function is used by the contract owner to update the strength of a specific Wrestler NFT. It benefits the owner by allowing them to adjust the stats of a specific NFT to reflect its performance.

recordWin(uint256 tokenId): This function is used by the contract owner to record a win for a specific Wrestler NFT. It benefits the owner by allowing them to keep track of the performance of a specific NFT and adjust its stats accordingly.

recordLoss(uint256 tokenId): This function is used by the contract owner to record a loss for a specific Wrestler NFT. It benefits the owner by allowing them to keep track of the performance of a specific NFT and adjust its stats accordingly.
