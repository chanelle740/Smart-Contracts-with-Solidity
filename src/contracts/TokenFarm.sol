pragma solidity ^0.5.0;

import "./DappToken.sol";
import "./DaiToken.sol";

contract TokenFarm{
    //All  codes 
    string public name = "Dapp Token Farm";

    DappToken public dappToken;
    DaiToken public daiToken;

    address[] public stakers;
    mapping(address => uint) public stakingBalance;
    mapping(address => bool) public hasStaked;
    mapping(address => bool) public isStacking;


    constructor(DappToken _dappToken, DaiToken _daiToken) public{
        dappToken = _dappToken;
        daiToken = _daiToken;
        
    }

    //1. Stakes Tokens(Deposit)

    function stakeTokens(uint _amount) public{
        
        //Transfer Mock Dai tokens to this contract for staking.

        daiToken.transferFrom(msg.sender, address(this), _amount);


        //Update Staking balance.

        stakingBalance[msg.sender] = stakingBalance[msg.sender] + _amount;

      if(!hasStaked[msg.sender]){
          stakers.push(msg.sender);
      }


        // update stacking status
        isStacking[msg.sender] = true;
        hasStaked[msg.sender] = true;

    
    }

    //2. Unstaking Tokens(Withdraw)

    //3. Issuing Tokens

}