const { network } = require("hardhat");

const {
  neworkConfig,
  networkConfig,
  developmentChains,
} = require("../helper-hardhat-config");
const { verify } = require("../hardhat.config");

module.exports = async ({ getNamedAccounts, deployments }) => {
  // hre.getNamedAccounts
  // hre.deployment

  const { deploy, log, get } = deployments;
  const { deployer } = await getNamedAccounts();
  const chainId = network.config.chainId;
  // const ethUsdPriceFeedAddress = networkConfig[chainId]["ethUsdPriceFeed"]

  let ethUsdPriceFeedAddress;
  if (developmentChains.includes(network.name)) {
    const ethUsdAggregator = await get("MockV3Aggregator");
    ethUsdPriceFeedAddress = ethUsdAggregator.address;
  } else {
    ethUsdPriceFeedAddress = networkConfig[chainId]["ethUsdPriceFeed"];
  }
  let args = [ethUsdPriceFeedAddress];
  const fundMe = await deploy("FundMe", {
    from: deployer,
    args: args,
    log: true,
    waitConfirmations: network.config.blockConfirmations || 1,
  });

  // if (
  //   !developmentChains.includes(network.name && process.env.ETHERSCAN_API_KEY)
  // ) {
  //   await verify(fundMe.address, args);
  // }

  log("_____________________________");
};

module.exports.tags = ["all", "fundme"];
