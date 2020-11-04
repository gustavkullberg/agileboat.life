import {Login} from "../components/Login"
import styles from '../styles/Home.module.css';
import { useState, useEffect } from 'react';
import { checkAccessTokenExpiry } from "../utils/checkAccessTokenExpiry"
import {checkAccessTokenRoles} from "../utils/checkAccessTokenRoles"
import { DocumentComponent } from '../components/DocumentComponent';
import { KeyKeeperComponent } from "../components/KeyKeeperComponent"

export default function CaptainsCabin() {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [hasCaptainRole, setHasCaptainRole] = useState(false);
  const [storedDocuments, setStoredDocuments] = useState([]);
  const [kullbergIsKeyper, setKullbergIsKeyper] = useState(true);

  const addDocument = ({ dataUrl, fileName, fileSize }) => {
    fetch(`/api/document/`, { method: 'POST',  headers: { authorization: `Bearer ${localStorage.getItem("accessToken")}` }, body: JSON.stringify({ dataUrl, fileName, fileSize })})
      .then(response => response.json())
      .then(() => {
        reload();
      })
      .catch(err => console.log(err));
  }

  const reload = async () => {
    fetch(`/api/document/`, { headers: { authorization: `Bearer ${localStorage.getItem("accessToken")}` }})
      .then(response => response.json())
      .then(sortedData => setStoredDocuments(sortedData))
      .catch(err => console.log(err));
  };

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    const { isValid } = checkAccessTokenExpiry({ accessToken });
    const { hasAuthorization } = checkAccessTokenRoles({ accessToken, roleToValidate: "captain" });
    if (hasAuthorization) {
      setHasCaptainRole(true)
    }
    

    if (isValid) {
      setIsAuthorized(true);
      fetch(`/api/document`, { headers: { authorization: `Bearer ${accessToken}` } })
        .then(response => response.json())
        .then(sortedData => setStoredDocuments(sortedData))
        .catch(err => console.log(err));
      
        fetch(`/api/keyper`, { headers: { authorization: `Bearer ${accessToken}` } })
        .then(response => response.json())
        .then(json => setKullbergIsKeyper(json.kullbergIsKeyper))
        .catch(err => console.log(err));
    }
  }, [])

  return <div style={{width:"100%", marginTop:"100px", display:"flex", flexDirection: "column",justifyItems:"center"}}>
    {isAuthorized ?
      hasCaptainRole ?
        <div >
          <KeyKeeperComponent kullbergIsKeyper={kullbergIsKeyper} setKullbergIsKeyper={setKullbergIsKeyper}/>
          <DocumentComponent storedDocuments={storedDocuments} addDocument={addDocument} accessToken={localStorage.getItem("accessToken")} />
          <div className={styles.logoutButtonWrapper}>
            <button className={styles.logoutButton} onClick={() => {
              localStorage.removeItem("accessToken");
              setIsAuthorized(false);
              setHasCaptainRole(false);
            }}>
                Captain's exit
            </button>
            </div>
        </div>
        : <div>
          <p>Sorry, You are not a captain.</p>
          <button onClick={() => {
            localStorage.removeItem("accessToken");
            setIsAuthorized(false);
            setHasCaptainRole(false);
          }}>
            Logout
          </button>        
        </div>
      : <Login setIsAuthorized={setIsAuthorized} setHasCaptainRole={setHasCaptainRole} reload={reload}/>}
    </div>
}
