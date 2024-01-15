require("@nomicfoundation/hardhat-toolbox");
require("@nomicfoundation/hardhat-verify");
require("@nomiclabs/hardhat-ethers");
require("@nomiclabs/hardhat-waffle");
require("dotenv").config();
require("hardhat-deploy");
require("hardhat-gas-reporter");
require("solidity-coverage");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  // solidity: "0.8.8",
  solidity: {
    compilers: [{ version: "0.8.8" }, { version: "0.6.6" }],
  },
  networks: {
    sepolia: {
      url: process.env.SEPOLIA_URL || "",
      chainId: 11155111,
      accounts: [process.env.PRIVATE_KEY],
    },
  },
  namedAccounts: {
    deployer: {
      default: 0,
    },
  },
  gasReporter: {
    enabled: false, //set true if you want to use gas reporter
    outputFile: "gas-report.txt",
    noColors: true,
    currency: "USD",
    coinmarketcap: process.env.COINMARKETCAP_API_KEY,
    token: "MATIC", // polygon
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY,
  },
};
