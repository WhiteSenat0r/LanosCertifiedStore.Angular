export const environment = {
  production: false,
  apiUrl: 'https://localhost:5001/api/',
  keycloak: {
    // Keycloak configuration
    url: 'https://localhost:8843', // Replace with your Keycloak server URL
    realm: 'lsc',
    clientId: 'lsc-public-auth-client',
  },
};
