// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "./wrestlers.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/IERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Battles is Ownable {
    enum GameState { IDLE, PLAYING, FINISHED }
    Wrestlers private wrestlersContracts;
    
    struct Battle {
        uint256 battleId;
        uint256 wrestler1Index;
        uint256 wrestler2Index;
        address player1;
        address player2;
        bool resolved;
    }
    
    Battle[] private battles;
    IERC721Enumerable private wrestlersContract;
    uint256 private battleIndex;
    GameState private state = GameState.IDLE;
    
    event NewBattle(uint256 battleIndex, uint256 wrestler1Index, uint256 wrestler2Index, address player1, address player2);
    event BattleResolved(uint256 battleIndex, address winner);
    
    constructor(address _wrestlersContractAddress) {
        wrestlersContracts = Wrestlers(_wrestlersContractAddress);
       // wrestlersContract = IERC721Enumerable(_wrestlersContractAddress);
    }
    
    function startGame() external onlyOwner {
        require(state == GameState.IDLE, "Game is not idle");
        state = GameState.PLAYING;
        battleIndex = 0;
    }
    
    function createBattle(uint256 wrestler1Index, uint256 wrestler2Index, address player1, address player2) external onlyOwner {
        require(state == GameState.PLAYING, "Game is not playing");
        require(wrestlersContract.ownerOf(wrestlersContract.tokenOfOwnerByIndex(player1, wrestler1Index)) == player1, "Invalid wrestler");
        require(wrestlersContract.ownerOf(wrestlersContract.tokenOfOwnerByIndex(player2, wrestler2Index)) == player2, "Invalid wrestler");
        require(player1 != player2, "Cannot battle yourself");
        battles.push(Battle(battleIndex, wrestler1Index, wrestler2Index, player1, player2, false));
        emit NewBattle(battleIndex, wrestler1Index, wrestler2Index, player1, player2);
        battleIndex++;
    }
    
    function resolveBattle(uint256 _battleIndex) external {
        require(state == GameState.PLAYING, "Game is not playing");
        require(battles[_battleIndex].resolved == false, "Battle is already resolved");
        uint256 wrestler1Strength = wrestlersContracts.balanceOf(battles[_battleIndex].player1) > battles[_battleIndex].wrestler1Index ? wrestlersContracts.getWrestler(wrestlersContracts.tokenOfOwnerByIndex(battles[_battleIndex].player1, battles[_battleIndex].wrestler1Index)).strength : 0;
        uint256 wrestler2Strength = wrestlersContracts.balanceOf(battles[_battleIndex].player2) > battles[_battleIndex].wrestler2Index ? wrestlersContracts.getWrestler(wrestlersContracts.tokenOfOwnerByIndex(battles[_battleIndex].player2, battles[_battleIndex].wrestler2Index)).strength : 0;
        if (wrestler1Strength > wrestler2Strength) {
            // Player 1 wins the battle
            // Transfer the wrestler from player 2 to player 1
            wrestlersContract.transferFrom(battles[_battleIndex].player2, battles[_battleIndex].player1, wrestlersContract.tokenOfOwnerByIndex(battles[_battleIndex].player2, battles[_battleIndex].wrestler2Index));
            emit BattleResolved(_battleIndex, battles[_battleIndex].player1);
        } else if (wrestler1Strength < wrestler2Strength) {
            // Player 2 wins the battle
            // Transfer the wrestler from player 1 to player 2
            wrestlersContract.transferFrom(battles[_battleIndex].player1, battles[_battleIndex].player2, wrestlersContract.tokenOfOwnerByIndex(battles[_battleIndex].player1, battles[_battleIndex].wrestler1Index));
            emit BattleResolved(_battleIndex, battles[_battleIndex].player2);
        } else {
            // It's a tie, just emit the event without transferring the wrestler
            emit BattleResolved(_battleIndex, address(0));
        }

        // Mark the battle as resolved
        battles[_battleIndex].resolved = true;
    }
}