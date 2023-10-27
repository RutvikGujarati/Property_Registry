import { Web3Button , useAddress} from '@thirdweb-dev/react'
import React, { useState } from 'react'
import abi from "../LandAbi.json"
import Web3 from 'web3'

// import { contract } from 'web3/lib/commonjs/eth.exports'

const UserLogin = () => {
  const address = useAddress()
  const [userList, setUserList] = useState("");
  const [isLoading , setIsLoading] =useState(true);

  const contractAddress = "0xe8Ae8d8cDc88BD818a1065a15966Bcc0F407dD2B"; 
  const contractAbi = abi;
  const fetchUserList = async () => {
    setIsLoading(true);

    try {
      const web3 = new Web3(window.ethereum);
      const contract = new web3.eth.Contract(contractAbi, contractAddress);

      // Assuming your contract has a function named "ReturnAllUserList" to fetch user details
      const userAddresses = await contract.methods.ReturnAllUserList().call();

      const userDetails = [];

      for (const userAddress of userAddresses) {
        // Call UserMapping to get user details for each address
        const userDetail = await contract.methods.UserMapping(userAddress).call();
        userDetails.push(userDetail);
      }
      
      // "result" should contain an array of user details
      setUserList(userDetails);

      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching user list:", error);
      setIsLoading(false);
    }
  };

  return (
    <div>
     <Web3Button
        contractAddress="0xe8Ae8d8cDc88BD818a1065a15966Bcc0F407dD2B"
        contractAbi={contractAbi} 
        action={fetchUserList}
        
        //ReturnAllUserList
        >Fetch users</Web3Button>
         {isLoading ? (
        <p>Loading user list...</p>
      ) : (
        <ul>
          {userList.map((user, index) => (
            <li key={index}>
              <strong>Name: </strong>{user.name}
              <br />
             <strong>Age: </strong>{user.age}
             <br />
             <strong>City:</strong>{user.city}
             <br />
             <strong>AadharNumber:</strong>{user.aadharNumber}
             <br />
             <strong>PanNumber: </strong>{user.panNumber}
             <br />
             <strong>Email :</strong>{user.email}
            </li>
          ))}
        </ul>
      )}
  </div>
  )
}

export default UserLogin
