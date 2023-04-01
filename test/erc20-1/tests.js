const { ethers } = require('hardhat');
const { expect } = require('chai');
const { BigNumber } = require("ethers");
const { parseEther } = require("ethers/lib/utils")
const { formatEther } = require("ethers/lib/utils")


describe('ERC20 Tokens Exercise 1', function () {

    let deployer, user1, user2, user3;
    let contract;

    // Constants 
    const DEPLOYER_MINT = ethers.utils.parseEther('100000');
    const USERS_MINT = ethers.utils.parseEther('5000');
    const FIRST_TRANSFER = ethers.utils.parseEther('100');
    const SECOND_TRANSFER = ethers.utils.parseEther('1000');

    before(async function () {
        /** Deployment and minting tests */

        [deployer, user1, user2, user3] = await ethers.getSigners();

        // TODO: Contract deployment
        const contractFactory = await ethers.getContractFactory("SimpleTokenERC");
        contract = await contractFactory.deploy();
        await contract.deployed();

        // TODO: Minting

        let mintingToMe = await contract.connect(deployer).mint(deployer.address, DEPLOYER_MINT);
        await mintingToMe.wait();


        let mintingToUser1 = await contract.connect(deployer).mint(user1.address, USERS_MINT);
        await mintingToUser1.wait();

        let mintingToUser2 = await contract.connect(deployer).mint(user2.address, USERS_MINT);
        await mintingToUser2.wait();

        let mintingToUser3 = await contract.connect(deployer).mint(user3.address, USERS_MINT);
        await mintingToUser3.wait();



        // TODO: Check Minting
        expect(await contract.balanceOf(deployer.address)).to.equal(DEPLOYER_MINT)
        expect(await contract.balanceOf(user1.address)).to.equal(USERS_MINT)
        expect(await contract.balanceOf(user2.address)).to.equal(USERS_MINT)
        expect(await contract.balanceOf(user3.address)).to.equal(USERS_MINT)

    });

    it('Transfer tests', async function () {
        /** Transfers Tests */


        // TODO: First transfer

        let firstTransfer = await contract.connect(user2).transfer(user3.address, FIRST_TRANSFER);
        await firstTransfer.wait();

        expect(await contract.balanceOf(user3.address)).to.equal(parseEther("5100"))


        // TODO: Approval & Allowance test

        let approvalFromUser3toUser1 = await contract.connect(user3).approve(user1.address, SECOND_TRANSFER);
        await approvalFromUser3toUser1.wait();

        expect(await contract.allowance(user3.address, user1.address)).to.equal(SECOND_TRANSFER)

        console.log(`${formatEther(await contract.allowance(user3.address, user1.address))}`);

        // TODO: Second transfer

        let user3TransferFrom = await contract.connect(user1).transferFrom(user3.address, user1.address, SECOND_TRANSFER)

        await user3TransferFrom.wait();

        // // TODO: Checking balances after transfer

        expect(await contract.balanceOf(user1.address)).to.equal(parseEther("6000"));
        expect(await contract.balanceOf(user3.address)).to.equal(parseEther("4100"));



    });
});
