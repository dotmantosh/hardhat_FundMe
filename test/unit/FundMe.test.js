const { deployments, ethers, getNamedAccounts } = require("hardhat");
const { assert, expect } = require("chai");
describe("FundMe", async function () {
  let fundMe;
  let deployer;
  let MockV3Aggregator;
  beforeEach(async function () {
    deployer = (await getNamedAccounts()).deployer;
    await deployments.fixture(["all"]);
    fundMe = await ethers.getContract("FundMe", deployer);
    MockV3Aggregator = await ethers.getContract("MockV3Aggregator", deployer);
  });

  describe("Constructor", async function () {
    it("sets the aggregator address correctly", async function () {
      const response = await fundMe.priceFeed();
      assert.equal(response, await MockV3Aggregator.getAddress());
    });
  });

  describe("Fund", async function () {
    it("Fails if you don't spend enough Eth", async () => {
      await expect(fundMe.fund()).to.be.revertedWith(
        "You need to spend more eth"
      );
    });
  });

  describe("Withdraw", async function () {
    beforeEach(async () => {
      await fundMe.fund({ value: sendValue });
    });

    it("should withdraw eth from a single founder", async () => {
      // Arrange
      const startingFundMeBalance = await fundMe.provider.getBalance(
        await fundMe.getAddress()
      );
      const startingDeployerBalance = await fundMe.provider.getBalance(
        deployer
      );
      // Act
      const transactionResponse = await fundMe.withdraw();
      const transactionReceipt = await transactionResponse.wait(1);

      const endingFundMeBalance = await fundMe.provider.getBalance(
        await fundMe.getAddress()
      );
      const endingDeployerBalance = await fundMe.provider.getBalance(deployer);
      // Assert
      assert.equal(endingFundMeBalance, 0);
    });
  });
});
