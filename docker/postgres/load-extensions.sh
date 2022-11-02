#!/bin/sh

# You could probably do this fancier and have an array of extensions
# to setPayload, but this is mostly an illustration of what can be done

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" <<EOF
create extension unaccent;
create extension "uuid-ossp";
select * FROM pg_extension;
EOF
