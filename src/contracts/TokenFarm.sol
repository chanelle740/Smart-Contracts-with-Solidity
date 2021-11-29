pragma solidity ^0.5.0;

import "./DappToken.sol";
import "./DaiToken.sol";

contract TokenFarm{
    //All  codes 
    string public name = "Dapp Token Farm";

    DappToken public dappToken;
    DaiToken public daiToken;

    constructor(DappToken _dappToken, DaiToken _daiToken) public{
        dappToken = _dappToken;
        daiToken = _daiToken;
        
    }

    //1. Stakes Tokens(Deposit)

    function stakeTokens(uint _amount) public{
        daiToken.transferFrom(msg.sender, address(this), _amount  )

    }

    //2. Unstaking Tokens(Withdraw)

    //3. Issuing Tokens

}