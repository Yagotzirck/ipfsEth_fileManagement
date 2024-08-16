import { useState, useEffect } from "react"

import "./App.css"

function ViewPrivFiles( {state} ){
    const [fileList, setFileList] = useState(undefined);
    const [errMessage, setErrMessage] = useState("");

    const ipfsGatewayBaseUrl = process.env.REACT_APP_PINATA_GATEWAY + "/ipfs/";

    useEffect(
        () => {
            setErrMessage("");

            state.contract.viewFiles()
                .then(
                    (res) => setFileList(
                            res.map( (elem) => ({
                                fileId:     Number(elem[0]),
                                fileName:   elem[1],
                                cid:        elem[2]
                            }))
                    )
                )
                .catch( (err) => setErrMessage(err.toString()) );
        },
        []
    );


    if(!fileList && !errMessage)
        return (
            <p className="message">
                Fetching the files list from the blockchain...
            </p>
        );
    else if(errMessage)
        return (
            <p className="error">
                {errMessage}
            </p>
        );
    else if(fileList.length === 0)
        return(
            <p className="error">
                You have no private files associated to your account.
            </p>
        );
    else
        return (
           <>
           <h3>Private files' list:</h3>

           <table>
            <thead>
            <tr>

                <th>File ID</th>
                <th>File name</th>
                <th>CID</th>
            </tr>
            </thead>

            <tbody>
            {
                fileList.map( (fileItem) => {
                    var cidLink =
                            ipfsGatewayBaseUrl +
                            fileItem.cid +
                            "/?filename=" +
                            fileItem.fileName;

                    return (
                        <tr key={fileItem.fileId}>
                            <td>{fileItem.fileId}</td>
                            <td>{fileItem.fileName}</td>
                            <td>
                                <a
                                    href={cidLink}
                                    target="_blank"
                                >
                                    {fileItem.cid}
                                </a>
                            </td>
                        </tr>
                    );
                })
            }
            </tbody>

           </table>

           
           </> 
        );
}

export default ViewPrivFiles;
    
