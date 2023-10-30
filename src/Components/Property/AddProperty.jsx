import React, { useState } from 'react';
import Web3 from 'web3'; // Import the Web3 library
import abi from '../LandAbi.json'; // Replace with your contract's ABI
import { Web3Button, useAccounts } from "@thirdweb-dev/react"; // Import any Web3 hooks you're using


function AddProperty() {
  const { accounts } = useAccounts();
  const [area, setArea] = useState(0);
  const [address, setAddress] = useState('');
  const [landPrice, setLandPrice] = useState(0);
  const [allLatiLongi, setAllLatiLongi] = useState('');
  const [propertyPID, setPropertyPID] = useState(0);
  const [surveyNum, setSurveyNum] = useState('');
  const [document, setDocument] = useState('');
  const [isUserVerified, setIsUserVerified] = useState(false);
  const [landList, setLandList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const contractAddress = '0xd099a2d442E629693094e7dc904Eae4aFca930Bc'; // Replace with your contract's address
  const contractAbi = abi; // Replace with your contract's ABI

  

  const handleAddLand = async () => {
    try {
      const web3 = new Web3(window.ethereum);
      const contract = new web3.eth.Contract(contractAbi, contractAddress);

      // Ensure the user is verified (you may have your own verification logic)
      if (isUserVerified(accounts[0])) {
        // Call the addLand function
        await contract.methods.addLand(
          area,
          address,
          landPrice,
          allLatiLongi,
          propertyPID,
          surveyNum,
          document
        ).send({ from: "" });

        // You can add further logic here, e.g., show a success message
        alert('Land added successfully!');
      } else {
        alert('User is not verified.');
      }
    } catch (error) {
      console.error('Error adding land:', error);
      alert('Error adding land. Please check the console for details.');
    }
  };

  const fetchLand = async () => {
    setIsLoading(true);

    try {
      const web3 = new Web3(window.ethereum);
      const contract = new web3.eth.Contract(contractAbi, contractAddress);

      // Assuming your contract has a function named "ReturnAllUserList" to fetch user details
      const userAddresses = await contract.methods.ReturnAllLandList().call();

      const landDetails = [];

      for (const userAddress of userAddresses) {
        // Call UserMapping to get user details for each address
        const landDetail = await contract.methods.lands(userAddress).call();
        landDetails.push(landDetail);
      }
      
      // "result" should contain an array of user details
      setLandList(landDetails);

      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching user list:", error);
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h2>Land Registration</h2>
      <label>Area: </label>
      <input type="number" value={area} onChange={(e) => setArea(e.target.value)} />
      <label>address: </label>
      <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} />
     
      <label>landPrice: </label>
      <input type="number" value={landPrice} onChange={(e) => setLandPrice(e.target.value)} />

      <label>allLatiLongi: </label>
      <input type="text" value={allLatiLongi} onChange={(e) => setAllLatiLongi(e.target.value)} />

      <label>propertyPID: </label>
      <input type="text" value={propertyPID} onChange={(e) => setPropertyPID(e.target.value)} />

      <label>surveyNum: </label>
      <input type="text" value={surveyNum} onChange={(e) => setSurveyNum(e.target.value)} />

      <label>document: </label>
      <input type="text" value={document} onChange={(e) => setDocument(e.target.value)} />
      {/* Add input fields for other parameters */}
      {/* <button onClick={handleAddLand}>Add Land</button>*/}

      <Web3Button
      contractAddress={contractAddress}
      contractAbi={abi}
      // action={handleAddLand}
      action={(contract)=>contract.call(
        "addLand",
        [
          area,
          address,
          landPrice,
          allLatiLongi,
          propertyPID,
          surveyNum,
          document
        ]
      )}
      // onSuccess={alert("success")}
      >
        Add Land
      </Web3Button>
      <Web3Button
      contractAddress={contractAddress}
      contractAbi={abi}
      // action={(contract)=>contract.call(
      //   "ReturnAllLandList",
      //   []
      // )}
      action={fetchLand}
      >
        My lands
      </Web3Button>
      {isLoading ? (
        <p>Loading land details...</p>
      ) : (
        <ul>
          {landList.map((land, index) => (
            <li key={index}>
              <strong>area: </strong>{land.area}
              <br />
             {/* <strong>Age: </strong>{user.age}
             <br /> */}
             <strong>address:</strong>{land.address}
             <br />
             <strong>landPrice:</strong>{land.landPrice}
             <br />
             {/* <strong>PanNumber: </strong>{user.panNumber}
             <br />
             <strong>Email :</strong>{user.email} */}
            </li>
          ))}
        </ul>
      )}
     
    </div>
  );
}

export default AddProperty;
