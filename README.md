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

### Battles Contract
##### createBattle(uint256 wrestler1Id, uint256 wrestler2Id): This function is used by any user to create a new battle by providing the IDs of two Wrestler NFTs to compete. It benefits users by allowing them to initiate battles and potentially win the set prize.

endBattle(uint256 battleId, uint256 winnerId): This function is used by the contract owner to end a specific battle by providing the ID of the battle and the ID of the winning Wrestler NFT. It benefits the owner by allowing them to determine the winner of a specific battle and award the set prize to the winner.

getBattle(uint256 battleId): This function is used to retrieve the information of a specific battle, such as the IDs of the competing Wrestler NFTs and the prize amount. It benefits users by allowing them to view the information of a specific battle they participated in or are interested in.

getAllBattles(): This function is used to retrieve the information of all battles that have been created. It benefits users by allowing them to view the list of all battles and their details.

getBattlesByOwner(address owner): This function is used to retrieve the information of all battles created by a specific owner. It benefits users by allowing them to view the list of battles created by a specific user.

setPrize(uint256 prizeAmount): This function is used by the contract owner to set the prize amount for each battle. It benefits the owner by allowing them to adjust the prize amount based on the popularity of the battles and the number of participants.

#### The contract uses the ERC721 standard for non-fungible tokens and OpenZeppelin's Ownable contract for access control. The contract has a state variable state of type GameState that represents the current state of the game. The possible states are IDLE, PLAYING, and FINISHED. The contract owner can start the game by calling the startGame function, which sets the state to PLAYING.

Unique feature of this contract is that it allows players to battle their wrestlers against each other, creating a competitive and interactive game experience. The contract also ensures that only valid battles can be created, as each wrestler can only be owned by one player and players cannot battle their own wrestlers. Additionally, the contract implements access control to ensure that only the contract owner can start the game and resolve battles.

#TEST CASES

The following test cases are included:

Verify the ability to mint a new wrestler and increase the wrestler count
This test case verifies that the mint function can be used to mint a new wrestler and increase the total wrestler count. It also checks that the new wrestler has the correct name, strength, wins, and losses.

Verify that non-owners cannot mint wrestlers
This test case verifies that non-owners cannot call the mint function to mint new wrestlers. It checks that the total wrestler count remains at 0.

Verify the ability to update the strength of an existing wrestler
This test case verifies that the updateStrength function can be used to update the strength of an existing wrestler. It also checks that the wrestler's other attributes remain unchanged.

Verify that non-owners cannot update wrestler strength
This test case verifies that non-owners cannot call the updateStrength function to update wrestler strength. It checks that the wrestler's strength remains unchanged.

Verify that an error is thrown if the wrestler does not exist
This test case verifies that an error is thrown if the updateStrength function is called with an index that does not correspond to an existing wrestler. It checks that the wrestler count remains at 0.

### Battles
##### Verify the ability to create a new battle
This test case checks that a new battle can be created with valid parameters and that it is correctly recorded in the contract. It can include checks such as verifying the battle ID, wrestler indices, and player addresses.

Verify the ability to resolve a battle with a winner
This test case verifies that a battle can be resolved with a winner and that the ownership of the wrestlers involved in the battle is correctly updated. It can include checks such as verifying the winner and loser of the battle and the updated ownership of the wrestlers.

Verify that a battle cannot be created with an invalid wrestler index
This test case checks that attempting to create a battle with an invalid wrestler index results in an error. It can include checks such as verifying that the correct error message is returned.

Verify that a battle cannot be created with the same player
This test case checks that attempting to create a battle with the same player results in an error. It can include checks such as verifying that the correct error message is returned.

Verify that an already resolved battle cannot be resolved again
This test case checks that attempting to resolve an already resolved battle results in an error. It can include checks such as verifying that the correct error message is returned.

Verify the ability to mint a new wrestler and increase the wrestler count
This test case verifies that the mint function can be used to mint a new wrestler and increase the total wrestler count. It can include checks such as verifying that the new wrestler has the correct name, strength, wins, and losses.

Verify that a wrestler's name can be updated
This test case checks that a wrestler's name can be updated and that the updated name is correctly recorded in the contract. It can include checks such as verifying that the updated name is returned correctly.

Verify that a wrestler's strength can be updated
This test case checks that a wrestler's strength can be updated and that the updated strength is correctly recorded in the contract. It can include checks such as verifying that the updated strength is returned correctly.

Verify that a wrestler's wins and losses can be updated
This test case checks that a wrestler's wins and losses can be updated and that the updated values are correctly recorded in the contract. It can include checks such as verifying that the updated values are returned correctly.

Verify that the owner of a wrestler can transfer ownership to another address
This test case checks that the owner of a wrestler can transfer ownership to another address and that the ownership is correctly updated in the contract. It can include checks such as verifying that the ownership transfer was successful and that the new owner is returned correctly.


