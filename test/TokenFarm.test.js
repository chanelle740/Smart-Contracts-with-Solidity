
const DaiToken = artifacts.require('DaiToken');
const DappToken = artifacts.require('DappToken');
const TokenFarm = artifacts.require('TokenFarm');

require('chai')
.use(require('chai-as-promised'))
.should()

 function tokens(n){
     return web3.utils.toWei(n,'ether');
 }

contract('TokenFarm', (accounts) =>{
    let daiToken, dappToken, tokenFarm

    before(async () => {
        //Load Contracts
        daiToken = await DaiToken.new()
        dappToken = await DappToken.new()
        tokenFarm = await TokenFarm.new(dappToken.address, daiToken.address)
    
        // Transfer all Dapp tokens to farm(1 million)

    await dappToken.transfer(tokenFarm.address, tokens('1000000'))

    //send tokens to investor
    await daiToken.transfer(accounts[1], tokens('100'), {from: accounts[0]});

    })
    //Tests
    describe('Mock Dai Deployment' , async() =>{
        it('has a name', async() => {
            let daiToken = await DaiToken.new()
            const name = await daiToken.name()
            assert.equal(name, 'Mock DAI Token')
        })
    })


})
