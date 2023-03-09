FROM quay.io/keycloak/keycloak:19.0.0 as dev

WORKDIR /opt/keycloak

# Enable health and metrics support
ENV KC_HEALTH_ENABLED=true
ENV KC_METRICS_ENABLED=true
ENV KEYCLOAK_ADMIN_THEME=base
ENV KEYCLOAK_ADMIN=superadmin@node.com
ENV KEYCLOAK_ADMIN_PASSWORD=db_experience123
ENV KC_DB=postgres
ENV KC_DB_URL=jdbc:postgresql://db_sql:5432/experience?user=experience&password=experience&charSet=UTF-8
#ENV KC_DB_URL="jdbc:postgresql://db_sql:5432/experience?user=experience&password=experience&charSet=UTF-8"

ENV WAIT_FOR_DB=true
ENV KC_HOSTNAME=localhost

# for demonstration purposes only, please make sure to use proper certificates in production instead
RUN keytool -genkeypair -storepass password -storetype PKCS12 -keyalg RSA -keysize 2048 -dname "CN=server" -alias server -ext "SAN:c=DNS:localhost,IP:127.0.0.1" -keystore conf/server.keystore

ENTRYPOINT ["/opt/keycloak/bin/kc.sh", "start-dev", "--features=admin-fine-grained-authz"]

#FROM quay.io/keycloak/keycloak:18.0.2 AS build
#
## Enable health and metrics support
#ENV KC_HEALTH_ENABLED=true
#ENV KC_METRICS_ENABLED=true
#
## Configure a database vendor
#ENV KC_DB=postgres
#
#WORKDIR /opt/keycloak
## for demonstration purposes only, please make sure to use proper certificates in production instead
#RUN keytool -genkeypair -storepass password -storetype PKCS12 -keyalg RSA -keysize 2048 -dname "CN=server" -alias server -ext "SAN:c=DNS:localhost,IP:127.0.0.1" -keystore conf/server.keystore
#RUN /opt/keycloak/bin/kc.sh build
#
#FROM quay.io/keycloak/keycloak:latest AS prod
#COPY --from=build /opt/keycloak/ /opt/keycloak/
#
## change these values to point to a running postgres instance
#ENV DB_VENDOR=postgres
#ENV DB_ADDR=database
#ENV DB_PORT=5432
#ENV DB_HOST=db_sql
#ENV DB_DATABASE=experience
#ENV DB_USER=experience
#ENV DB_PASSWORD=experience
#ENV WAIT_FOR_DB=true
#ENV KC_HOSTNAME=localhost
#ENV KEYCLOAK_ADMIN=superadmin@node.com
#ENV KEYCLOAK_ADMIN_PASSWORD=db_experience123
#
#ENTRYPOINT ["/opt/keycloak/bin/kc.sh", "start", "--features=admin-fine-grained-authz"]
