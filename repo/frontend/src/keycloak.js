import Keycloak from 'keycloak-js';

const keycloak = new Keycloak({
  url: 'http://localhost:8080',
  realm: 'projekt',
  clientId: 'myclient',
});

const keycloakInitOptions = {
  pkceMethod: 'S256',
  onLoad: 'login-required',
};

export { keycloak, keycloakInitOptions };
