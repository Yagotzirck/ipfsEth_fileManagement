import { ethers } from "ethers"

// The files in the "contracts" folder must be manually copied
// from the ignition/deployments folder: ignition doesn't have any
// way to automatically copy them in there, apparently
import contract_artifact from "./contracts/IPFS_Management_Module#IPFS_Management.json"
import contract_address  from "./contracts/deployed_addresses.json"

import "./App.css"


function InitDApp( {setState, resetState} ){

    async function init(){

        // Create a provider using the user's wallet (window.ethereum)
        const provider = new ethers.BrowserProvider(window.ethereum);
        // It will prompt user for account connections if it isnt connected
        const signer = await provider.getSigner();
        const userAddr = await signer.getAddress();
        
        // Initialize the contract using that provider and the token's
        // artifact
        const sc = new ethers.Contract(
            contract_address["IPFS_Management_Module#IPFS_Management"],
            contract_artifact.abi,
            signer
        );

        // Initialize the DApp's state
        setState({
            isAuthorized:   await sc.isAuthorized(),
            isAdmin:        await sc.isAdmin(),
            userAddress:    userAddr,
            contract:       sc
        });

        // If the user changes account on his wallet, reset the state
        window.ethereum.on("accountsChanged", ([newAddress]) => {
            return resetState();
        });
    }
    
    return (
        <>
        {
            window.ethereum ?
                <button onClick={init}>Initialize DApp</button>
            :
                <p className="error">
                    You need an Ethereum wallet (i.e. MetaMask)
                    in order to use this app.
                </p>
        }
        </>
    );

}

export default InitDApp;