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

**NOTE**: if you want to connect to a contract already deployed by another user, skip to the section
**Frontend setup**.

## Backend setup and contract deployment

### Hardhat framework - Installation
Open a terminal, move in the project root folder and install the Hardhat framework by entering the command:

	npm install

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


## Frontend setup
Once the deployment is done, we can proceed to the configuration of the React frontend.

 #### React frontend - Installation
Open a terminal in the subfolder **ipfs_mgmt_frontend** and install the React frontend by entering the command:

	npm install

#### ABI and contract's address
We need to make the ABI and contract's address files accessible to the React frontend.

If you deployed the contract, open a terminal in the project root folder and enter the following commands:

	mkdir ./ipfs_mgmt_frontend/src/contracts
	cp ./ignition/deployments/chain-11155111/artifacts/IPFS_Management_Module#IPFS_Management.json ./ipfs_mgmt_frontend/src/contracts/
	cp ./ignition/deployments/chain-11155111/deployed_addresses.json ./ipfs_mgmt_frontend/src/contracts/

Alternatively, if you just want to connect to a Smart Contract deployed by another user, ask the Smart Contract owner to be added
to the list of authorized users by giving him your account's public address; also, ask him to give you the ABI and contract address
files to be placed in the subfolder

**./ipfs_mgmt_frontend/src/contracts/**

More precisely, he should provide you with the files
- IPFS_Management_Module#IPFS_Management.json
- deployed_addresses.json
	
#### Pinata API key and dedicated gateway
Create a file named ".env" in the subfolder "ipfs_mgmt_frontend" and paste the following lines in it:

	REACT_APP_PINATA_JWT=<Your PINATA private key as a JWT token>
	REACT_APP_PINATA_GATEWAY=<Your Pinata gateway, e.g. https://<your-gateway-domain>.mypinata.cloud>

 By default, the private gateway is restricted to download only the files pinned / uploaded by the account associated to that gateway; in order to remove that restriction for yourself, open [Pinata's Access Controls](https://app.pinata.cloud/developers/gateway-settings/) and add your IP (*which you can retrieve [here](https://www.ipaddress.com/), for instance*) to the **IP Addresses** section.

## Launching the DApp
Open a terminal in the subfolder "ipfs_mgmt_frontend" and enter the command

	npm start

If you executed all the previous steps correctly, your default browser will start up automatically with the
DApp screen on it (if not, it should be accessible by inserting **localhost:3000** in the address bar)
and the DApp is now ready to be used.
