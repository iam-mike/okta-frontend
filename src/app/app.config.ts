const { CLIENT_ID, ISSUER, OKTA_TESTING_DISABLEHTTPSCHECK } = process.env;

export default {
  oidc: {
    clientId: CLIENT_ID,
    issuer: ISSUER,
    redirectUri: 'http://localhost:4200/login/callback',
    //redirectUri: 'https://okta-frontend.herokuapp.com/login/callback',
    scopes: ['openid', 'profile', 'email'],
    testing: {
      disableHttpsCheck: `${OKTA_TESTING_DISABLEHTTPSCHECK}`
    }
  },
  resourceServer: {
    messagesUrl: 'https://okta-backend.herokuapp.com/api/messages',
  },
};
