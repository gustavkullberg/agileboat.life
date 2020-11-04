import styles from '../styles/Document.module.css';
import { StoredDocumentList } from "../components/StoredDocumentList"
import { UploadDocument } from "../components/UploadDocument"
import { useState } from 'react';
const maxBytesPerFile = 1 * 1024 * 1024

export const DocumentComponent = ({ storedDocuments, addDocument, accessToken }) => {
    const [files, setFiles] = useState([]);
    const [fileAreaOpen, setFileAreaOpen] = useState(false);
    const [errors, setErrors] = useState([]);


    const toBase64 = (file) => {
        const reader = new FileReader();
        return new Promise((resolve, reject) => {
            if (!file) {
                reject('no file');
            }
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
        });
    };

    const isValidFile = (dataUrl) => {
        const [fileInfo, base64File] = dataUrl.split(',');
        const format = fileInfo.split('data:')[1].split(';')[0];
        const lengthInBytes = new Buffer(base64File, 'base64').length;
        if (!fileInfo.includes('data:') || !fileInfo.includes(';')) {
            setErrors(['Ogiltig fil.']);
            return false;
        }
        if (lengthInBytes > maxBytesPerFile) {
            setErrors([
                `Du kan inte ladda upp en fil större än ${(maxBytesPerFile / (1024 * 1024)).toFixed(
                    maxBytesPerFile % 2 === 0 ? 0 : 1
                )} MB.`,
            ]);
            return false;
        }
        return true;
    };


    const onFileChange = (event) => {
        if (event && event.target && event.target.files) {
            const file = event.target.files[0];
            if (!files.some(item => item.fileName === file?.name)) {
                toBase64(file).then((dataUrl) => {
                    if (isValidFile(dataUrl)) {
                        const newFilesNames = [...files];
                        const newFile = {
                            fileName: file.name,
                            fileSize:
                                file.size >= 1024 * 1024
                                    ? `(${(file.size / (1024 * 1024)).toFixed(2)} MB)`
                                    : file.size >= 1024
                                        ? `(${(file.size / 1024).toFixed(2)} KB)`
                                        : `(${file.size} B)`,
                            dataUrl,
                        };
                        setFiles([newFile]);
                        setErrors([]);
                    }
                });
            } else {
                setErrors([`Du har redan laddat upp filen: ${file.name}`]);
            }
        }
    };


    const downloadFile = ({ id }) => {
        fetch(`/api/document/${id}`, { headers: { authorization: `Bearer ${accessToken}` } })
            .then(response => response.json())
            .then(doc => {
                const a = document.createElement('a');
                a.href = doc.dataUrl;
                a.download = doc.fileName
                a.click();
            })
            .catch(err => console.log(err));
    };

    return (
        <div className={styles.container}>
            <h1>Files</h1>
            {fileAreaOpen ? <div className={styles.documentListContainer}>
                <UploadDocument onFileChange={onFileChange} errors={errors} files={files} addDocument={addDocument} setFiles={setFiles} />
                <StoredDocumentList storedDocuments={storedDocuments} downloadFile={downloadFile} />

            </div> : undefined}
            <img onClick={() => setFileAreaOpen(!fileAreaOpen)} style={{ transform: `rotate(${fileAreaOpen ? "180" : "0"}deg)` }} className={styles.arrow} src="/downArrow.png"></img>
        </div>

    );
};
