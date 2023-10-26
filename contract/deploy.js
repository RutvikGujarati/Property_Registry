// const Web3 = require('web3');
// const solc = require('solc'); // For compiling Solidity code
// const fs = require('fs');

// const web3 = new Web3('https://mainnet.infura.io/v3/YOUR_INFURA_PROJECT_ID'); // Replace with your Infura project ID

// // Compile your Solidity contract
// const input = fs.readFileSync('YourContract.sol', 'utf8'); // Replace with your contract file
// const output = solc.compile(input, 1);
// const bytecode = output.contracts[':YourContract'].bytecode;
// const abi = JSON.parse(output.contracts[':YourContract'].interface);

// // Create an Ethereum account using your private key (ensure you keep your private key secure)
// const privateKey = '0xdf57089febbacf7ba0bc227dafbffa9fc08a93fdc68e1e42411a14efcf23656e'; // Replace with your private key
// const account = web3.eth.accounts.privateKeyToAccount(privateKey);

// // Deploy the contract
// const deploy = async () => {
//   try {
//     const contract = new web3.eth.Contract(abi);

//     // Build the deployment transaction
//     const deployTransaction = contract.deploy({
//       data: '0x' + bytecode,
//       arguments: [constructorArg1, constructorArg2] // Replace with your constructor arguments
//     });

//     // Sign and send the transaction
//     const options = {
//       data: deployTransaction.encodeABI(),
//       gas: await deployTransaction.estimateGas({ from: account.address }),
//       gasPrice: await web3.eth.getGasPrice()
//     };

//     const signedTx = await web3.eth.accounts.signTransaction(options, privateKey);
//     const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
//     console.log('Contract deployed at address:', receipt.contractAddress);
//   } catch (error) {
//     console.error('Error deploying contract:', error);
//   }
// };

// deploy();
