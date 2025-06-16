'use client'
import logo from './logo.svg';
import { useKeycloak } from "@react-keycloak/web";

import './App.css';
import { useState, useEffect } from 'react';
function ModeratorPanel() {
  const {keycloak, initialized} = useKeycloak();
    const [isAdmin, setIsAdmin] = useState(false);
    const [isMod, setIsAMod] = useState(false);
    const [role,setRole] = useState()
    async function sendData() {
    const tytul = document.getElementById('tytul').value;
    const tresc = document.getElementById('tresc').value;
  const response = await fetch('http://localhost:3000/admin', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${keycloak.token}`,
    },
    body: JSON.stringify({
      poster: keycloak.tokenParsed.preferred_username,
      tytul: tytul,
      tresc: tresc
    })
  });
}
    useEffect(() => {
        document.title = "Moderator Panel"
        if (initialized && keycloak?.authenticated) {
            setRole(keycloak.tokenParsed?.realm_access?.roles[1])
          const isUserAdmin = keycloak.hasRealmRole("admin");
          const isModerator = keycloak.hasRealmRole("moderator");
          setIsAMod(isModerator);
          setIsAdmin(isUserAdmin);
        }
      }, [initialized, keycloak]);
  if(!initialized) {
    return <div>Loading...</div>;
  }
  return (
    <div className="App">
      <header className="App-header">
        {isAdmin || isMod ? (
          <>
          <p>Welcome {role}, {keycloak.tokenParsed?.preferred_username}!</p>
            <input type="text" id="tytul" placeholder="Tytuł" />
            <input type="text" id="tresc" placeholder="Treść" />
            <button id="myButton2" onClick={sendData}>Wyślij</button>
          </>
        ):(
          <>
          <p>You are not an admin or a moderator.</p>
          </>
        )}
      </header>
    </div>
  );
}

export default ModeratorPanel