import { ConnectWallet } from "@thirdweb-dev/react";
import React from "react";
import { Link, NavLink } from "react-router-dom/dist";
// import LoginUser from "../Components/LoginUser";

const Front = () => {
  return (
    <div>
      {/* Navigation Bar */}
      <nav>
        <ul>
          {/* <li>
            <Link to="/Home">Window</Link>
          </li> */}
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/user">User</Link>
          </li>
          <li>
            <Link to="/land-inspector">Land Inspector</Link>
          </li>
          <li>
            <Link to="/owner">Contract Owner</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          
          {/* <Link to="/loginUser">{<LoginUser />}</Link> */}
         
        </ul>
      </nav>
      <div className="main-content">
        <h1>Welcome to Land Registration</h1>
        <p>Effortless land registration with blockchain technology.</p>
      </div>
    </div>
  );
};

export default Front;
