import { ConnectWallet } from "@thirdweb-dev/react";
import React from "react";
import { Link, NavLink } from "react-router-dom/dist";
import LoginUser from "./LoginUser";

const Front = () => {
  return (
    <div>
      {/* Navigation Bar */}
      <nav>
        <ul>
          <li>
            <Link to="/Home">Window</Link>
          </li>
          <li>
            <Link to="/user">User</Link>
          </li>
          <li>
            <Link to="/land-inspector">Land Inspector</Link>
          </li>
          <li>
            <Link to="/contract-owner">Contract Owner</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <Link to="/loginUser">{<LoginUser />}</Link>
         
        </ul>
      </nav>
      
    </div>
  );
};

export default Front;
