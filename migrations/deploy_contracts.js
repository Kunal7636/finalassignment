const HDWalletProvider = require('@truffle/hdwallet-provider');
const fs = require('fs');
const path = require('path');

const MNEMONIC = 'faint super canyon top stamp result foam churn mad vacant drill someone';
const INFURA_API_KEY = 'wss://sepolia.infura.io/ws/v3/4074e27ec5d44c008157d3e11d4adedc';

module.exports = {
  networks: {
    // Use this network configuration when deploying to the mainnet
    mainnet: {
      provider: function() {
        return new HDWalletProvider(
          MNEMONIC,
          `https://mainnet.infura.io/v3/${INFURA_API_KEY}`
        );
      },
      network_id: 1,
      gasPrice: 10000000000, // 10 GWei
      gas: 5000000
    },

    // Use this network configuration when deploying to the Rinkeby testnet
    rinkeby: {
      provider: function() {
        return new HDWalletProvider(
          MNEMONIC,
          `https://rinkeby.infura.io/v3/${INFURA_API_KEY}`
        );
      },
      network_id: 4,
      gasPrice: 10000000000, // 10 GWei
      gas: 5000000
    }
  },

  compilers: {
    solc: {
      version: "0.8.0",
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },

  // Add the following 'after' hook to print the contract address or number to the console after deployment
  // The contract address or number can be obtained from the 'networks' object
  // Note that the contract name and path should be updated to match your contract file
  plugins: [
    'truffle-plugin-verify',
    'truffle-plugin-console'
  ],

  hooks: {
    'truffle-plugin-console': {
      actions: {
        // Define a custom action to print the contract address or number to the console
        printContractAddress: {
          description: 'Prints the contract address or number to the console',
          // Use the 'networks' object to get the contract address or number
          // Replace 'MyContract' with the name of your contract
          // Replace 'MyContract.sol' with the path to your contract file
          // Replace 'rinkeby' with the network you want to print the address or number for
          // If your contract has multiple deployments on the same network, you can access them using the array index
          // For example, if you have deployed your contract twice on Rinkeby, you can access the second deployment using 'rinkeby[1]'
          action: async function (web3, network) {
            console.log(`Executing 'printContractAddress' action on ${network} network...`);
            const contract = artifacts.require('MyContract.sol');
            console.log(`Retrieving contract instance for 'MyContract'...`);
            const instance = await contract.deployed();
            const address = instance.address;
            console.log(`The contract address or number for 'MyContract' on ${network} is ${address}`);
          }
        }
      }
    }
  }
};