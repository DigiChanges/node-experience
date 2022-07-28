FROM postgres:11

ONBUILD RUN psql -U experience -d experience -c "get extension \"unaccent\";"
ONBUILD RUN psql -U experience -d experience -c "get extension \"uuid-ossp\";"
