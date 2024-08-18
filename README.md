# ipfsEth_fileManagement
A DApp that allows users to manage personal files on the IPFS network, using an Ethereum smart contract to index the hosted files' metadata.

# Installation / setup
The following guide will prepare the DApp for use with the Sepolia test network.

If another network is preferred instead (e.g. a local network launched with the command
"npx hardhat node"), some steps can be easily changed / adapted / skipped, perhaps with some
help from Google and/or the Hardhat documentation.

## Prerequisites
- A web browser with an **Ethereum wallet** extension (e.g. MetaMask)
- **Infura API key** (optional; it's necessary only for non-local contract deployment)
- **Pinata API key** and **dedicated gateway**
- **Node.JS** (a recent version; for reference, this project was developed with version 20.15.0)


## Setup steps

### Installation
Open a terminal, move in the project root folder and install the Hardhat framework by entering the command:

	npm install
Then, do the same in the subfolder **ipfs_mgmt_frontend** to install the React frontend.


### Hardhat variables' setup for deployment
Move back to the project root folder, and set up two Hardhat variables with the following two commands:

	npx hardhat vars set INFURA_API_KEY
	npx hardhat vars set SEPOLIA_PRIVATE_KEY
	
You will be prompted to insert a value for the variable after each command:
- INFURA_API_KEY is self-explanatory;
- SEPOLIA_PRIVATE_KEY is the private key of the account you use in the Sepolia
test network that will be used to deploy the contract (and therefore it's the account
that will become the contract owner).


### Deployment
From the project root folder, enter the following command:

	npx hardhat ignition deploy ./ignition/modules/IPFS_Management.js --network sepolia

Check out the output messages to make sure everything went fine.


### Frontend setup

#### ABI and contract's address
Once the deployment is done, we need to make the ABI and contract's address
files accessible to the React frontend.

Open a terminal in the project root folder and enter the following commands:

	mkdir ./ipfs_mgmt_frontend/src/contracts
	cp ./ignition/deployments/chain-11155111/artifacts/IPFS_Management_Module#IPFS_Management.json ./ipfs_mgmt_frontend/src/contracts/
	cp ./ignition/deployments/chain-11155111/deployed_addresses.json ./ipfs_mgmt_frontend/src/contracts/
	
#### Pinata API key and dedicated gateway
Create a file named ".env" in the subfolder "ipfs_mgmt_frontend" and paste the following lines in it:

	REACT_APP_PINATA_JWT=<Your PINATA private key as a JWT token>
	REACT_APP_PINATA_GATEWAY=<Your Pinata gateway, e.g. https://<your-gateway-domain>.mypinata.cloud>

## Launching the DApp
Open a terminal in the subfolder "ipfs_mgmt_frontend" and enter the command

	npm start

If you executed all the previous steps correctly, your default browser will start up automatically with the
DApp screen on it (if not, it should be accessible by inserting **localhost:3000** in the address bar)
and the DApp is now ready to be used.

If you want other users to use the DApp by connecting to the same smart contract you deployed,
you should let them install/configure only the frontend (see the **Installation** and **Frontend setup** sections above), sending them
the ABI and contract address files to be placed in the subfolder

**./ipfs_mgmt_frontend/src/contracts/**
