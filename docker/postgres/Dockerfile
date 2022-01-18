FROM postgres:11

ONBUILD RUN psql -U experience -d experience -c "create extension unaccent;"
ONBUILD RUN psql -U experience -d experience -c "create extension uuid-ossp;"
