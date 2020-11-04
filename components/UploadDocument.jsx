import styles from '../styles/Document.module.css';
import { useState } from 'react';

export const UploadDocument = ({ onFileChange, errors, files, setFiles, addDocument }) => {

    return (
        <div className={styles.uploadDocumentContainer}>
            <h2>Upload new file</h2>
            <input type="file" onChange={(onFileChange)} id="selectedFile" style={{ display: "none" }}></input>
            {files.length < 1 ?
                <button className={styles.selectFileButton} onClick={() => document.getElementById('selectedFile').click()}><p>Select File</p> </button>
                : undefined}
            {errors.map(e => <p style={{ color: "red" }}>{e}</p>)}
            {files.map(f =>
                <div className={styles.uploadContainer}>
                    <div style={{ display: "flex" }}>
                        <p>
                            {f.fileName}
                        </p>
                        <img style={{ width: "20px", height: "20px", marginTop: "15px", paddingLeft: "6px" }} onClick={() => setFiles([])} src="/close.png" />
                    </div>
                    <button className={styles.upLoadButton} onClick={() => {
                        addDocument({ dataUrl: f.dataUrl, fileName: f.fileName, fileSize: f.fileSize });
                        setFiles([])
                    }}>
                        <p>Upload</p>
                    </button>
                </div>)}
        </div>
    );
};
