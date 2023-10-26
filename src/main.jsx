import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { MetaMaskWallet, ThirdwebProvider } from "@thirdweb-dev/react";
import "./styles/globals.css";

// This is the chain your dApp will work on.
// Change this to the chain your app is built for.
// You can also import additional chains from `@thirdweb-dev/chains` and pass them directly.
const activeChain = "mumbai";

// const metaWallet = MetaMaskWallet({recommended: true});

// metaWallet.meta.name = "FOX";

const container = document.getElementById("root");
const root = createRoot(container);


root.render(
  <React.StrictMode>
    <ThirdwebProvider
      clientId={import.meta.env.VITE_TEMPLATE_CLIENT_ID}
      activeChain={activeChain}
      // supportedWallets={[ metaWallet]}
    >
      <App />
    </ThirdwebProvider>
  </React.StrictMode>
);
