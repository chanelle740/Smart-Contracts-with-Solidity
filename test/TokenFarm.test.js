const { assertTryStatement } = require('@babel/types');
const { assert } = require('chai');

const DaiToken = artifacts.require('DaiToken');
const DappToken = artifacts.require('DappToken');
const TokenFarm = artifacts.require('TokenFarm');

require('chai')
.use(require('chai-as-promised'))
.should()

 function tokens(n){
     return web3.utils.toWei(n,'ether');
 }

contract('TokenFarm', ([owner, investor]) =>{
    let daiToken, dappToken, tokenFarm

    before(async () => {
        //Load Contracts
        daiToken = await DaiToken.new()
        dappToken = await DappToken.new()
        tokenFarm = await TokenFarm.new(dappToken.address, daiToken.address)
    
        // Transfer all Dapp tokens to farm(1 million)

    await dappToken.transfer(tokenFarm.address, tokens('1000000'))

    //send tokens to investor
    await daiToken.transfer(investor, tokens('100'), {from: owner});

    })
    //Tests
    describe('Dapp Token Deployment' , async() =>{
        it('has a name', async() => {
            let daiToken = await DaiToken.new()
            const name = await daiToken.name()
            assert.equal(name, 'Mock DAI Token')
        })
    })

    describe('Dapp Token Deployment' , async() =>{
        it('has a name', async() => {
            const name = await dappToken.name()
            assert.equal(name, 'DApp Token')
        })
    })

    describe('Token Farm Deployment' , async() =>{
        it('has a name', async() => {
            const name = await tokenFarm.name()
            assert.equal(name, 'Dapp Token Farm')
        })

        it('contracts has tokens', async() => {
            let balance = await dappToken.balanceOf(tokenFarm.address)
            assert.equal(balance.toString(), tokens('1000000'))
        })
    })

    describe('Farming tokens', async() =>{
       it('rewards investors for staking mDai tokens', async()=>{
           let result;

           //check investor balance before stacking
           
           result = await daiToken.balanceOf(investor)
           assert.equal(result.toString(), tokens('100'), 'investor Mock DAI wallet balance correct before stacking')
       
           //Stake Mock DAI Tokens

           await daiToken.approve(tokenFarm.address, tokens('100'),{from : investor})
           await tokenFarm.stakeTokens(tokens('100'),{from : investor})

           // Check staking result

           result = await daiToken.balanceOf(investor)
           assert.equal(result.toString(), tokens('0'), 'investor Mock DAI wallet balance correct after staking')

           result = await daiToken.balanceOf(tokenFarm.address)
           assert.equal(result.toString(), tokens('100'), 'Token Farm Mock DAI balance correct after staking')

           result = await tokenFarm.stakingBalance(investor)
           assert.equal(result.toString(), tokens('100'), 'investor staking balance correct after staking')

           result = await tokenFarm.isStacking(investor)
           assert.equal(result.toString(), 'true', 'investor staking balance correct after staking')
           
           await tokenFarm.issueTokens({from : owner})

           result = await dappToken.balanceOf(investor)
           assert.equal(result.toString(), tokens('100'), 'investor DApp Tokens wallet balance correct after issuance')

           await tokenFarm.issueTokens({from : investor}).should.be.rejected;

           await tokenFarm.unstakeTokens({from : investor})

           //chekc results after unstaking
           result = await daiToken.balanceOf(investor)
           assert.equal(result.toString(), tokens('100'), 'investor Mock DAI wallet balance correct after staking')

           result = await daiToken.balanceOf(tokenFarm.address)
           assert.equal(result.toString(), tokens('0'), 'Token Farm Mock DAI balance correct after staking')
        }) 
    })

})
