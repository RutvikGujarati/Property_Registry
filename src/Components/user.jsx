import React from 'react'

const user = () => {
  return (
    <ConnectWallet
    dropdownPosition={{
      side: "bottom",
      align: "center",
    }}
    btnTitle="Login"
    className="LoginButton"

    theme={customTheme}

    modalTitle="Login With Any Wallet"
     welcomeScreen={{}}
  />
  )
}

export default user
