FROM quay.io/keycloak/keycloak:21.0.2 as base

FROM base as builder

WORKDIR /opt/keycloak

COPY themes/keycloakify-starter-keycloak-theme-4.5.1.jar /opt/keycloak/providers/

RUN /opt/keycloak/bin/kc.sh build

FROM base as dev

COPY --from=builder /opt/keycloak /opt/keycloak

ENTRYPOINT ["/opt/keycloak/bin/kc.sh", "start-dev"]

FROM base as prod

COPY --from=builder /opt/keycloak /opt/keycloak

ENTRYPOINT ["/opt/keycloak/bin/kc.sh", "start"]
