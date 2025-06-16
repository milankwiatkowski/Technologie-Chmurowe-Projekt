'use client'
import logo from './logo.svg';
import { useKeycloak } from "@react-keycloak/web";
import { useLayoutEffect } from 'react';
import './App.css';
import { useState, useEffect } from 'react';
function Posts() {
  const {keycloak, initialized} = useKeycloak();
    const [isAdmin, setIsAdmin] = useState(false);
    const [isMod, setIsAMod] = useState(false);
    const [role,setRole] = useState()
    const [posts, setPosts] = useState([]);
    useEffect(() => {
        document.title = "Posts"
        if (initialized && keycloak?.authenticated) {
          setRole(keycloak.tokenParsed?.realm_access?.roles[1])
          const isUserAdmin = keycloak.hasRealmRole("admin");
          const isModerator = keycloak.hasRealmRole("moderator");
          setIsAMod(isModerator);
          setIsAdmin(isUserAdmin);
        }
      }, [initialized, keycloak]);
      useEffect(() => {
        async function fetchdata(){
            const response = await fetch('http://localhost:5000/admin', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${keycloak.token}`}
            });
            const responseData = await response.json();
            setPosts(responseData);
        }
        fetchdata();
    },[]);
  if(!initialized) {
    return <div>Loading...</div>;
  }
  return (
    <div className="App">
      <header className="App-header">
        {initialized ? (
          <>
          <p>Welcome {role}, {keycloak.tokenParsed?.preferred_username}!</p>
          {posts!=undefined ? (
            <div>
              {posts.map((post, index) => (
                <div key={index}>
                  <h2>{post.tytul}</h2>
                  <p>{post.tresc}</p>
                  <p>Poster: {post.poster}</p>
                </div>
              ))}
            </div>
          ) : (
            <p>No posts available.</p>
          )}
          </>
        ):(
          <>
          <p>You are not logged in.</p>
          </>
        )}
      </header>
    </div>
  );
}

export default Posts