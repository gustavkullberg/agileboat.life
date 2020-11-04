import styles from '../styles/Document.module.css';

export const StoredDocumentList = ({ storedDocuments, downloadFile }) => {
    return (
        <div className={styles.documentListContainer}>
            <h2>Stored files</h2>
            {storedDocuments.map(sf => (
                <div className={styles.storedDocument}>
                    <div className={styles.documentTextWrapper}>
                        <h2>{sf.fileName.length > 15 ? sf.fileName.substring(0, 15) : sf.fileName}</h2>
                    </div>
                    <button className={styles.downloadButton} onClick={() => downloadFile({ id: sf.id })}><img className={styles.downloadIcon} src="/download.png"></img></button>
                </div>))}

        </div>
    );
};
