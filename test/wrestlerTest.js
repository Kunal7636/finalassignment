const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Battles contract", function () {
  let battlesContract;
  let wrestlersContract;
  let owner;
  let player1;
  let player2;

  before(async () => {
    // Deploy the Wrestlers and Battles contracts
    const Wrestlers = await ethers.getContractFactory("Wrestlers");
    wrestlersContract = await Wrestlers.deploy();
    await wrestlersContract.deployed();

    const Battles = await ethers.getContractFactory("Battles");
    battlesContract = await Battles.deploy(wrestlersContract.address);
    await battlesContract.deployed();

    // Get the owner and two players' addresses
    [owner, player1, player2] = await ethers.getSigners();
  });

  it("should start the game as the owner", async function () {
    await battlesContract.startGame();
    const state = await battlesContract.state();
    expect(state).to.equal(1); // GameState.PLAYING
  });

  it("should create a new battle", async function () {
    // Mint two wrestlers for each player
    await wrestlersContract.connect(player1).mint("Wrestler 1", 10);
    await wrestlersContract.connect(player1).mint("Wrestler 2", 20);
    await wrestlersContract.connect(player2).mint("Wrestler 3", 15);
    await wrestlersContract.connect(player2).mint("Wrestler 4", 25);

    // Create a new battle with wrestler 1 of player 1 and wrestler 3 of player 2
    await battlesContract.createBattle(0, 0, player1.address, player2.address);

    // Check that the battle was created
    const battle = await battlesContract.battles(0);
    expect(battle.battleId).to.equal(0);
    expect(battle.wrestler1Index).to.equal(0);
    expect(battle.wrestler2Index).to.equal(0);
    expect(battle.player1).to.equal(player1.address);
    expect(battle.player2).to.equal(player2.address);
    expect(battle.resolved).to.equal(false);
  });

  it("should resolve the battle with a winner", async function () {
    // Resolve the battle with wrestler 2 of player 1 and wrestler 4 of player 2
    await battlesContract.resolveBattle(0);

    // Check that the battle was resolved and wrestler 2 of player 1 won
    const battle = await battlesContract.battles(0);
    expect(battle.resolved).to.equal(true);
    expect(await wrestlersContract.ownerOf(1)).to.equal(player1.address);
    expect(await wrestlersContract.ownerOf(3)).to.equal(player2.address);
    expect(await wrestlersContract.ownerOf(2)).to.equal(player1.address);
  });

  it("should not create a new battle with an invalid wrestler", async function () {
    // Try to create a new battle with an invalid wrestler index
    await expect(battlesContract.createBattle(2, 0, player1.address, player2.address)).to.be.revertedWith("Invalid wrestler");
  });

  it("should not create a new battle with the same player", async function () {
    // Try to create a new battle with the same player
    await expect(battlesContract.createBattle(0, 1, player1.address, player1.address)).to.be.revertedWith("Cannot battle yourself");
  });

  it("should not resolve an already resolved battle", async function () {
    {
      // Create a new instance of the contract
      const battlesInstance = await Battles.new(wrestlersContract.address);
    
      // Start the game
      await battlesInstance.startGame({ from: owner });
    
      // Create a new battle
      await battlesInstance.createBattle(0, 1, player1, player2, { from: owner });
    
      // Resolve the battle
      await battlesInstance.resolveBattle(0, { from: player1 });
    
      // Try to resolve the same battle again
      await expectRevert(
        battlesInstance.resolveBattle(0, { from: player2 }),
        "Battle is already resolved"
      );
    };
  })
})