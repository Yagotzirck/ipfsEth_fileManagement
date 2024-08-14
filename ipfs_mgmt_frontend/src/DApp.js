import { useState } from "react"
import "./App.css"

function DApp( {state} ){
   const [dappAction, setDappAction] = useState("");

   function dappActionUserChoice(event){
        setDappAction(event.target.value);
   }

   // Radio button style taken from:
   // https://uiverse.io/spj2401Dev/lucky-moth-60

   return (
    <>
    <h2>Welcome, {state.userAddress}</h2>

    <fieldset>
    <legend>What do you want to do with the DApp?</legend>

    <div className="button-group">
        <input
            type="radio"
            id="uploadFile"
            value="UploadFile"
            name="dappAction"
            checked={dappAction==="UploadFile"}
            onChange={dappActionUserChoice}
        />
        <label htmlFor="uploadFile">Upload a file</label>
    </div>

    <div className="button-group">
        <input
            type="radio"
            id="addUser"
            value="AddUser"
            name="dappAction"
            checked={dappAction==="AddUser"}
            onChange={dappActionUserChoice}
        />
        <label htmlFor="addUser">Add an user account</label>
    </div>

    <div className="button-group">
        <input
            type="radio"
            id="viewPrivFiles"
            value="ViewPrivFiles"
            name="dappAction"
            checked={dappAction==="ViewPrivFiles"}
            onChange={dappActionUserChoice}
        />
        <label htmlFor="viewPrivFiles">View your private files</label>
    </div>

    <div className="button-group">
        <input
            type="radio"
            id="viewPubFiles"
            value="ViewPubFiles"
            name="dappAction"
            checked={dappAction==="ViewPubFiles"}
            onChange={dappActionUserChoice}
        />
        <label htmlFor="viewPubFiles">View public files</label>
    </div>
    </fieldset>

    {
        (() => {
            switch(dappAction){
                // case "UploadFile": return <UploadFile state={state} />;
                case "UploadFile": return (<p>UploadFile selected</p>);
                case "AddUser": return (<p>AddUser selected</p>);
                case "ViewPrivFiles": return (<p>ViewPrivFiles selected</p>);
                case "ViewPubFiles": return (<p>ViewPubFiles selected</p>);
            }
        })()
    }
    </>
   );
}

export default DApp;