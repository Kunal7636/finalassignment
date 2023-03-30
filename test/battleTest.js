// SPDX-License-Identifier: MIT
const { expect } = require("chai");
const { ethers } = require("hardhat");

const GameState = { IDLE: 0, PLAYING: 1, FINISHED: 2 };

describe("Battles contract", function () {
  let owner, player1, player2;
  let battlesContract, wrestlersContract;

  before(async function () {
    [owner, player1, player2] = await ethers.getSigners();

    const Wrestlers = await ethers.getContractFactory("Wrestlers");
    wrestlersContract = await Wrestlers.deploy();
    await wrestlersContract.deployed();

    const Battles = await ethers.getContractFactory("Battles");
    battlesContract = await Battles.deploy(wrestlersContract.address);
    await battlesContract.deployed();
  });

  describe("startGame function", function () {
    it("should set the state to PLAYING", async function () {
      await battlesContract.startGame();
      const state = await battlesContract.state();
      expect(state).to.equal(GameState.PLAYING);
    });

    it("should revert if not called by the owner", async function () {
      await expect(battlesContract.connect(player1).startGame()).to.be.revertedWith(
        "Ownable: caller is not the owner"
      );
    });

    it("should revert if the game is not in IDLE state", async function () {
      await battlesContract.startGame();
      await expect(battlesContract.startGame()).to.be.revertedWith("Game is not idle");
    });
  });

  describe("createBattle function", function () {
    beforeEach(async function () {
      await battlesContract.startGame();
    });

    it("should create a new battle", async function () {
      const wrestler1Index = 0;
      const wrestler2Index = 0;
      const tx = await battlesContract.createBattle(wrestler1Index, wrestler2Index, player1.address, player2.address);
      const { battleIndex, wrestler1Index: createdWrestler1Index, wrestler2Index: createdWrestler2Index, player1: createdPlayer1, player2: createdPlayer2 } = await battlesContract.battles(tx.events[0].args.battleIndex);

      expect(createdWrestler1Index).to.equal(wrestler1Index);
      expect(createdWrestler2Index).to.equal(wrestler2Index);
      expect(createdPlayer1).to.equal(player1.address);
      expect(createdPlayer2).to.equal(player2.address);
    });

    it("should emit a NewBattle event", async function () {
      const wrestler1Index = 0;
      const wrestler2Index = 0;
      const tx = await battlesContract.createBattle(wrestler1Index, wrestler2Index, player1.address, player2.address);
      expect(tx.events[0].event).to.equal("NewBattle");
      expect(tx.events[0].args.battleIndex.toNumber()).to.equal(0);
      expect(tx.events[0].args.wrestler1Index.toNumber()).to.equal(wrestler1Index);
      expect(tx.events[0].args.wrestler2Index.toNumber()).to.equal(wrestler2Index);
      expect(tx.events[0].args.player1).to.equal(player1.address);
      expect(tx.events[0].args.player2).to.equal(player2.address);
    });
    it("should revert if the game is not in PLAYING state", async function () {
        // Arrange
        const [owner, player1, player2] = await ethers.getSigners();
        const wrestlersContract = await deployContract("Wrestlers", []);
        const battlesContract = await deployContract("Battles", [wrestlersContract.address]);
      
        // Act
        const invalidState = 0; // IDLE state
        await battlesContract.createBattle(0, 0, player1.address, player2.address);
        await battlesContract.resolveBattle(0);
      
        // Assert
        await expect(battlesContract.resolveBattle(0)).to.be.revertedWith("Game is not playing");
        await expect(battlesContract.resolveBattle(1)).to.be.revertedWith("Game is not playing");
        await expect(battlesContract.resolveBattle(2)).to.be.revertedWith("Game is not playing");
      });
      
      it("should resolve the battle and transfer the wrestler to the winner", async function () {
        // Arrange
        const [owner, player1, player2] = await ethers.getSigners();
        const wrestlersContract = await deployContract("Wrestlers", []);
        const battlesContract = await deployContract("Battles", [wrestlersContract.address]);
      
        // Create wrestlers
        await wrestlersContract.connect(player1).createWrestler("Player 1 wrestler", 100);
        await wrestlersContract.connect(player1).createWrestler("Player 1 wrestler 2", 50);
        await wrestlersContract.connect(player2).createWrestler("Player 2 wrestler", 75);
        await wrestlersContract.connect(player2).createWrestler("Player 2 wrestler 2", 60);
      
        // Start the game and create a battle
        await battlesContract.startGame();
        await battlesContract.connect(owner).createBattle(0, 0, player1.address, player2.address);
      
        // Resolve the battle
        await battlesContract.connect(player2).resolveBattle(0);
      
        // Assert
        expect(await wrestlersContract.balanceOf(player1.address)).to.equal(2);
        expect(await wrestlersContract.balanceOf(player2.address)).to.equal(1);
        expect(await wrestlersContract.ownerOf(0)).to.equal(player1.address);
        expect(await wrestlersContract.ownerOf(1)).to.equal(player1.address);
        expect(await wrestlersContract.ownerOf(2)).to.equal(player2.address);
      });
      
      it("should revert if the battle is already resolved", async function () {
        // Arrange
        const [owner, player1, player2] = await ethers.getSigners();
        const wrestlersContract = await deployContract("Wrestlers", []);
        const battlesContract = await deployContract("Battles", [wrestlersContract.address]);
      
        // Create wrestlers
        await wrestlersContract.connect(player1).createWrestler("Player 1 wrestler", 100);
        await wrestlersContract.connect(player2).createWrestler("Player 2 wrestler", 75);
      
        // Start the game and create a battle
        await battlesContract.startGame();
        await battlesContract.connect(owner).createBattle(0, 0, player1.address, player2.address);
      
        // Resolve the battle
        await battlesContract.connect(player2).resolveBattle(0);
      
        // Assert
        await expect(battlesContract.connect(player2).resolveBattle(0)).to.be.revertedWith("Battle is already resolved");
      });
      it("should revert if the wrestlers are invalid", async function () {
        // Arrange
        const [owner, player1, player2] = await ethers.getSigners();
        await battlesContract.startGame();
        await wrestlersContract.mint(player1.address, "Hulk Hogan", 100, "USA", "HHH");
        await wrestlersContract.mint(player1.address, "The Rock", 90, "USA", "TR");
        await wrestlersContract.mint(player2.address, "John Cena", 95, "USA", "JC");
        
        // Act & Assert
        await expect(battlesContract.createBattle(1, 2, player1.address, player2.address))
          .to.be.revertedWith("Invalid wrestler");
      });
  })
})
 



      