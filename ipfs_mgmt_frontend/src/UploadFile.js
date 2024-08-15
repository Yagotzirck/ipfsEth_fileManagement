import { useState } from "react"
import { PinataSDK } from "pinata";
import "./App.css"

function UploadFile( {state} ){

    const [selectedFile, setSelectedFile] = useState();
    const [isPublic, setIsPublic] = useState(false);

    const [txProgressMsg, setTxProgressMsg] = useState("");
    const [errMessage, setErrMessage] = useState("");

    function setMsg(m){
        console.log(m);
        setTxProgressMsg(m);
    }
    function setErrMsg(error){
        console.error(error);
        setErrMessage(error.toString());
    }


    async function uploadFileAndSendTransaction(){
        const pinata = new PinataSDK({
            pinataJwt:      process.env.REACT_APP_PINATA_JWT,
            pinataGateway:  process.env.REACT_APP_PINATA_GATEWAY
        });

        setMsg("");
        setErrMsg("");
        if(!selectedFile){
            setErrMsg("You need to select a file first.");
            return;
        }

        setMsg("Uploading file to Pinata IPFS...");
        
        const fileName =    selectedFile.name;

        try{
            const upload = await pinata.upload.file(selectedFile);
  
            const cid =         upload.IpfsHash;

            setMsg("Sending metadata to the blockchain...");

            if(isPublic)
                var tx = await state.contract.addPublicFile(fileName, cid);
            else
                var tx = await state.contract.addFile(fileName, cid);
           

            setMsg("Waiting for the transaction to be mined...");

            const receipt = await tx.wait();
            if(receipt.status === 0)
                throw new Error("Transaction failed");

        } catch(error){
            setMsg("");
            setErrMsg(error.message);
            return;
        }

        setMsg("Transaction for file " + fileName + " has been mined.");
    }


    function handleChangeSelectedFile(event) {
        setSelectedFile(event.target.files[0]);
    }

    function handleChangePublicCheckbox(event){
        setIsPublic(event.target.checked);
    }


    return (
        <>
        <form className="upload">
        <label>Select a file:
        <input 
            type="file" 
            name="selectedFile" 
            onChange={handleChangeSelectedFile}
        />
        </label>
        <label>Public file
            <input 
            type="checkbox" 
            name="isPublic" 
            checked={isPublic}
            onChange={handleChangePublicCheckbox}
            />
            </label>
        </form>

        <button onClick={uploadFileAndSendTransaction}>Upload file</button>

        { txProgressMsg && <p className="message">{txProgressMsg}</p> }
        { errMessage && <p className="error">{errMessage}</p> }

        </>

    )
}

export default UploadFile;