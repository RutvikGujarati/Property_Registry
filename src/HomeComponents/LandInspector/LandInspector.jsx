import React, { useState } from 'react';
import ABI from '../../Components/LandAbi.json'; // Import your contract ABI
import Web3 from 'web3';
import { Web3Button } from '@thirdweb-dev/react';
// import { abi, contract } from 'web3/lib/commonjs/eth.exports';

const LandInspector = () => {
  const contractAddress = '0xd099a2d442E629693094e7dc904Eae4aFca930Bc'; // Replace with your contract address
  const contractAbi = ABI; // Your contract ABI

  const [userAddress, setUserAddress] = useState(''); // Input field to enter user's address

  const verifyUser = async () => {
    const web3 = new Web3(window.ethereum);
    const contract = new web3.eth.Contract(contractAbi, contractAddress);

    try {
      // Verify the user using the contract function
      await contract.methods.verifyUser(userAddress).send({ from: "0x0f57Bd2d2645D12A11D0085F70C49C3d4E3Dee75"});
      alert('User has been verified.');
    } catch (error) {
      console.error('Error verifying user:', error);
      alert('Error verifying user.');
    }
  };

  return (
    <div>
      <h1>Land Inspector Page</h1>
      <input
        type="text"
        placeholder="Enter User's Address"
        value={userAddress}
        onChange={(e) => setUserAddress(e.target.value)}
      />
      {/* <button onClick={verifyUser}>Verify User</button> */}
      <Web3Button 
      contractAddress={contractAddress}
      contractAbi={contractAbi}
      action={(contract)=>contract.call(
        "verifyUser",
        [
          userAddress
        ]
      )}
      // action={verifyUser}
      // onSuccess={console.log("Verified user")}
      >
        Verify User
      </Web3Button>
    </div>
  );
};

export default LandInspector;
