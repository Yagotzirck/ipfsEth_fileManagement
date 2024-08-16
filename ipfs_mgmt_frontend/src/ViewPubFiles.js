import { useState, useEffect } from "react"

import "./App.css"

function ViewPubFiles( {state} ){
    const [refresh, setRefresh] = useState(false);
    const [fileList, setFileList] = useState(undefined);
    const [errMessage, setErrMessage] = useState("");

    const ipfsGatewayBaseUrl = process.env.REACT_APP_PINATA_GATEWAY + "/ipfs/";

    useEffect(
        () => {
            setErrMessage("");

            state.contract.queryFilter('PublicFile')
                .then(
                    (res) => setFileList(
                            res.map( (elem) => ({
                                uploader:   elem.args[0],
                                fileId:     Number(elem.args[1]),
                                fileName:   elem.args[2],
                                cid:        elem.args[3]
                            }))
                    )
                )
                .catch( (err) => setErrMessage(err.toString()) );
        },
        [refresh]
    );

    function refreshButton() {
        setFileList(undefined);
        setErrMessage("");
        setRefresh(!refresh);
    } 


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
                There are no public files associated to this contract.
            </p>
        );
    else
        return (
           <>
           <h3>Public files' list:</h3>
           <button onClick={refreshButton}>Refresh</button>


           <table>
            <thead>
            <tr>
                <th>Uploader</th>
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
                            <td>{fileItem.uploader}</td>
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

export default ViewPubFiles;