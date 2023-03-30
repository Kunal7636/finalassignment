const { expect } = require('chai');
const { ethers } = require('hardhat');

describe('Wrestlers', function () {
  let contract;
  let owner;

  beforeEach(async function () {
    const Contract = await ethers.getContractFactory('Wrestlers');
    contract = await Contract.deploy();
    await contract.deployed();
    owner = await contract.owner();
  });

  describe('mint', function () {
    it('should mint a new wrestler and increase the wrestler count', async function () {
      const name = 'John Cena';
      const strength = 90;
      await contract.connect(owner).mint(name, strength);

      expect(await contract.totalSupply()).to.equal(1);
      expect(await contract.getWrestler(0)).to.deep.equal({
        name: name,
        strength: strength,
        wins: 0,
        losses: 0,
      });
    });

    it('should not allow non-owners to mint wrestlers', async function () {
      const nonOwner = ethers.provider.getSigner(1);
      const name = 'John Cena';
      const strength = 90;

      await expect(contract.connect(nonOwner).mint(name, strength)).to.be.revertedWith('Ownable: caller is not the owner');
      expect(await contract.totalSupply()).to.equal(0);
    });
  });

  describe('updateStrength', function () {
    it('should update the strength of an existing wrestler', async function () {
      const name = 'John Cena';
      const strength = 90;
      const newStrength = 100;

      await contract.connect(owner).mint(name, strength);
      await contract.connect(owner).updateStrength(0, newStrength);

      expect(await contract.getWrestler(0)).to.deep.equal({
        name: name,
        strength: newStrength,
        wins: 0,
        losses: 0,
      });
    });

    it('should not allow non-owners to update wrestler strength', async function () {
      const nonOwner = ethers.provider.getSigner(1);
      const name = 'John Cena';
      const strength = 90;
      const newStrength = 100;

      await contract.connect(owner).mint(name, strength);

      await expect(contract.connect(nonOwner).updateStrength(0, newStrength)).to.be.revertedWith('Ownable: caller is not the owner');
      expect(await contract.getWrestler(0)).to.deep.equal({
        name: name,
        strength: strength,
        wins: 0,
        losses: 0,
      });
    });

    it('should revert if wrestler does not exist', async function () {
      const name = 'John Cena';
      const strength = 90;
      const newStrength = 100;

      await expect(contract.connect(owner).updateStrength(0, newStrength)).to.be.revertedWith('Wrestler does not exist');
    });
  });

});