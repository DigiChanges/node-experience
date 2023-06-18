FROM quay.io/keycloak/keycloak:21.0.2 as dev

WORKDIR /opt/keycloak

#COPY themes /opt/jboss/keycloak/themes/myTheme
COPY themes/base /opt/keycloak/themes/base
COPY themes/keycloak /opt/keycloak/themes/keycloak
COPY themes/keycloak.v2 /opt/keycloak/keycloak/keycloak.v2
COPY themes/test /opt/keycloak/themes/test

ENTRYPOINT ["/opt/keycloak/bin/kc.sh", "start-dev"]
