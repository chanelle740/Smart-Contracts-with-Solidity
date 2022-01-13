pragma solidity ^ 0.5 .0;

import "./DappToken.sol";
import "./DaiToken.sol";

contract TokenFarm {
    //All  codes 
    string public name = "Dapp Token Farm";
    address public owner;

    DappToken public dappToken;
    DaiToken public daiToken;


    address[] public stakers;
    mapping(address => uint) public stakingBalance;
    mapping(address => bool) public hasStaked;
    mapping(address => bool) public isStacking;


    constructor(DappToken _dappToken, DaiToken _daiToken) public {
        dappToken = _dappToken;
        daiToken = _daiToken;
        owner = msg.sender;

    }

    function stakeTokens(uint _amount) public {

        //Requiere amount greater than 0
        require(_amount > 0 , "amount cannot be 0");

        //Transfer Mock Dai tokens to this contract for staking.

        daiToken.transferFrom(msg.sender, address(this), _amount);

        //Update Staking balance.

        stakingBalance[msg.sender] = stakingBalance[msg.sender] + _amount;

        if (!hasStaked[msg.sender]) {
            stakers.push(msg.sender);
        }

        // update stacking status
        isStacking[msg.sender] = true;
        hasStaked[msg.sender] = true;

    }

    // Issuing Tokens

    function issueTokens() public {
    require(msg.sender == owner, "caller must be the owner");

    //Issuing tokens to all stakers
        for (uint i = 0; i < stakers.length; i++) {
            address recipient = stakers[i];
            uint balance = stakingBalance[recipient];
            if (balance > 0) {
                dappToken.transfer(recipient, balance);
            }
        }

    }


    // Unstaking Tokens(Withdraw)

    function unstakeTokens() public{
        //Fetch staking balance
        uint balance = stakingBalance[msg.sender];

        require(balance > 0 , "staking balance cannot be 0");

        daiToken.transfer(msg.sender, balance);

        stakingBalance[msg.sender] = 0;

        isStacking[msg.sender] = false;

        
    }






}