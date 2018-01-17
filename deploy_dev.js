const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const { interface, bytecode } = require('./compile');

const provider = new HDWalletProvider(
    'ACCOUNT_MNEMONIC',
    'INFURA_RINKEBY_NETWORK_LINK'
);

const web3 = new Web3(provider);

const deploy = async () => {
    const accounts = await web3.eth.getAccounts();

    const result = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({ data: bytecode, arguments: ['Hello'] })
    .send({ gas: '1000000', from: accounts[0] });

    console.log('Address deployed to:', result.options.address);
};

deploy();
