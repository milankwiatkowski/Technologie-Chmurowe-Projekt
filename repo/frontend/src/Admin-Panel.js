'use client'

import { useKeycloak } from "@react-keycloak/web";
import './App.css';
import { useState, useEffect } from 'react';

function AdminPanel() {
  const { keycloak, initialized } = useKeycloak();
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    document.title = "Admin Panel";
    if (initialized && keycloak?.authenticated) {
      const isUserAdmin = keycloak.hasRealmRole("admin");
      setIsAdmin(isUserAdmin);
    }
  }, [initialized, keycloak]);

  async function sendData() {
    const tytul = document.getElementById('tytul').value;
    const tresc = document.getElementById('tresc').value;
  const response = await fetch('http://localhost:5000/admin', {
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


  if (!initialized) {
    return <div>Loading...</div>;
  }

  return (
    <div className="App">
      <header className="App-header">
        {isAdmin ? (
          <>
            <p>Welcome Admin, {keycloak.tokenParsed?.preferred_username}!</p>
            <input type="text" id="tytul" placeholder="Tytuł" />
            <input type="text" id="tresc" placeholder="Treść" />
            <button id="myButton2" onClick={sendData}>Wyślij</button>
          </>
        ) : (
          <p>You are not an admin.</p>
        )}
      </header>
    </div>
  );
}

export default AdminPanel;
