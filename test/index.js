const session = require('express-session');
const Keycloak = require('keycloak-connect');
const express = require('express');
const memoryStore = new session.MemoryStore();

const kcConfig = {
    clientId: 'experience',
    clientSecret: '1hg2w2Ae82i5crSqYSGieTDYBl8v3I9i',
    bearerOnly: true,
    serverUrl: 'http://localhost:8080',
    realm: 'digichanges',
    realmPublicKey: 'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAqBI4HhTel55ds3l9RSyXeQq2yHxSsXeMB9eF8Dda8i0DsV46qeEtYX8IAtVDnQ6f9veORT9APZ45cCSXmb3NTIxIk/8seIJAQ/CxYXuWzGNm+a9xzIuWpe1rnBQETQ+pejB4LOh2NxY+OvnshyUVTHVMURjqsYz+7qrdcOBpJ+7ffdDqHq7U48Le1wQnqR5IFVBpUse3ZCHGBu07ljPASnUApwOckoqllE+qe4wmNRUd+IGSDbMiBXvVXynXgk3pzj6YXqgKOcywBB2V9iP67/1oMEIWycw53rIDWqDYVpyRVehXqfX8VXM5PQrDE1xnKGvlwNi7JXjhxR4Q5SmEQwIDAQAB'
};

const keycloak = new Keycloak({ store: memoryStore, scope: "offline_access" }, kcConfig);

const app = express();
app.use( keycloak.middleware() );

app.get( '/complain', keycloak.protect(), (req, res, next) => {
  console.log("complain")
});

app.get( '/special', keycloak.protect('special'), (req, res, next) => {
  console.log("special")
});

app.get( '/extra-special', keycloak.protect('other-app:special'), (req, res, next) => {
  console.log("extra-special")
} );

app.get( '/admin', keycloak.protect( 'realm:admin' ),  (req, res, next) => {
  console.log("admin")
}  );

app.listen(3000, function () {
    console.log('App listening on port 3000');
});
