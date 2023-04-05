// SCH Course Copyright Policy (C): DO-NOT-SHARE-WITH-ANYONE
// https://smartcontractshacking.com/#copyright-policy
pragma solidity ^0.7.0;

library SafeMath {
  function sub(uint256 a, uint256 b) internal pure returns (uint256) {
    assert(b <= a);
    return a - b;
  }
}

/**
 * @title SimpleToken
 * @author JohnnyTime (https://smartcontractshacking.com)
 */
contract SimpleToken {
  address public minter;
  mapping(address => uint) public getBalance;
  uint public totalSupply;

  constructor() {
    minter = msg.sender;
  }

  function mint(address _to, uint _amount) external {
    require(msg.sender == minter, "not minter");
    getBalance[_to] += _amount;
  }

  function transfer(address _to, uint _value) public returns (bool) {
    require(
      getBalance[msg.sender] - _value >= 0,
      "You Don't Have enought fund to send "
    );
    getBalance[msg.sender] = SafeMath.sub(getBalance[msg.sender], _value);
    getBalance[_to] += _value;
    return true;
  }
}
