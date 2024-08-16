import { useState, useRef } from "react"
import { isAddress } from "ethers"

import "./App.css"

function AddUser( {state} ){
    const inputAddr = useRef("");

    const [txProgressMsg, setTxProgressMsg] = useState("");
    const [errMessage, setErrMessage] = useState("");

    function setMsg(m, displayTime_ms){
        console.log(m);
        setTxProgressMsg(m);

        // if set, remove the message after displayTime_ms milliseconds
        if(displayTime_ms)
            setTimeout(
                () => { setTxProgressMsg(""); },
                displayTime_ms
            );
    }

    function setErrMsg(error, displayTime_ms){
        console.error(error);
        setErrMessage(error.toString());

        // if set, remove the message after displayTime_ms milliseconds
        if(displayTime_ms)
            setTimeout(
                () => { setErrMessage(""); },
                displayTime_ms
            );
    }

    function changeInputAddr(event){
        inputAddr.current = event.target.value;
    }

    async function addUser(){
        if(!isAddress(inputAddr.current)){
            setErrMsg(
                "The inserted value isn't a valid ETH address.",
                2000
            );
            return;
        }

        setMsg("Sending transaction to the blockchain...");

        try{
            const tx = await state.contract.addUser(inputAddr.current);
        
            setMsg("Waiting for the transaction to be mined...");
            const receipt = await tx.wait();
            if(receipt.status === 0)
                throw new Error("Transaction failed");
        } catch(error){
            setMsg("");
            setErrMsg(error, 5000);
            return;
        }

        setMsg(
            "Transaction for addUser('" + inputAddr.current +
            "') has been mined.",
            5000
        );

    }
    
    if(!state.isAdmin)
        return(
            <p className="error">
                Only the contract owner can authorize new users.
            </p>
        );
    else
        return (
            <>
            <h3>Insert the user's ETH address to authorize:</h3>
            <input
                className="resizedTextBox"
                type="text"
                onChange={changeInputAddr}
            />
            <button onClick={addUser}>Add user</button>

            { txProgressMsg && <p className="message">{txProgressMsg}</p> }
            { errMessage && <p className="error">{errMessage}</p> }
            </>
        );
}

export default AddUser;