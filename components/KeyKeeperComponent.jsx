import styles from '../styles/KeyKeeper.module.css';
import { useState } from 'react';
import Switch from "react-switch";


export const KeyKeeperComponent = ({ kullbergIsKeyper, setKullbergIsKeyper }) => {

    const onChange = (kullbergHasKey) => {

        fetch(`/api/keyper`, { method: "POST", body: JSON.stringify({ kullbergIsKeyper: kullbergHasKey }), headers: { authorization: `Bearer ${localStorage.getItem("accessToken")}` } })
            .then(response => response.json())
            .then(json => setKullbergIsKeyper(json.kullbergIsKeyper))
            .catch(err => console.log(err));
    }
    return (
        <div className={styles.container}>
            <h1>Keyper</h1>
            <div className={styles.switchContainer}>
                <h2 style={{ color: `${!kullbergIsKeyper ? 'green' : "black"}` }}>Max</h2>
                <Switch onChange={() => onChange(!kullbergIsKeyper)} checked={kullbergIsKeyper} checkedIcon={false} uncheckedIcon={false} onColor="#888" offColor="#888" />
                <h2 style={{ color: `${kullbergIsKeyper ? 'green' : "black"}` }}>Kullberg</h2>
            </div>
        </div>
    );
};
