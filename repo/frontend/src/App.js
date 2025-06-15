'use client'
import { useKeycloak } from "@react-keycloak/web";
import { useNavigate, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import "./App.css";
import AdminPanel from "./Admin-Panel";
import ModeratorPanel from "./Moderator-Panel";
import Posts from "./Posty";
function App() {
  const navigate = useNavigate();
  const { keycloak, initialized } = useKeycloak();
  useEffect(()=>{
      document.title = "Main Page"
  })
  if (!initialized) {
    return <div>Loading...</div>;
  }

  return (
    <div className="App">
      <header className="App-header">
        <Routes>
          <Route
            path="/"
            element={
              keycloak.authenticated ? (
                <>
                  <p>Welcome, {keycloak.tokenParsed?.preferred_username}!</p>
                  <button className="App-button" onClick={() => navigate("/admin-panel")}>Panel Administratorski</button>
                  <button className="App-button" onClick={() => navigate("/moderator-panel")}>Panel Moderatora</button>
                  <button className="App-button" onClick={() => navigate("/posts")}>Posty</button>
                  <button className="App-button" onClick={() => keycloak.logout()}>Wyloguj się</button>
                </>
              ) : (
                <>
                  <p>You are not logged in!</p>
                  <button className="App-button" onClick={() => keycloak.login()}>Login</button>
                  <button className="App-button" onClick={()=>keycloak.register()}>Register</button>
                </>
              )
            }
          />
          <Route
            path="/admin-panel"
            element={
              keycloak.authenticated ? (
                <AdminPanel />
              ) : (
                <>
                <p>Brak dostępu — zaloguj się!</p>
                </>
              )
            }
          />
          <Route
            path="/moderator-panel"
            element={
              keycloak.authenticated ? (
                <ModeratorPanel />
              ) : (
                <>
                <p>Brak dostępu — zaloguj się!</p>
                </>
              )
            }
          />
          <Route
            path="/posts"
            element={
              keycloak.authenticated ? (
                <Posts />
              ) : (
                <>
                <p>Brak dostępu — zaloguj się!</p>
                </>
              )
            }
          />
        </Routes>
      </header>
    </div>
  );
}

export default App;