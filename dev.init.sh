#!/usr/bin/env bash

pnpm sync:db
pnpm command addUser        --email superadmin@node.com --firstName super --lastName admin --documentType DNI --documentNumber 12345679 --gender male --phone 541112345678 --country AR --address av.1234 --password 12345678 --birthday 05/07/1990 --isSuperAdmin true
pnpm command addUserRole    --role Admin --email user@node.com --firstName node --lastName node --password 12345678 --documentType DNI --documentNumber 12345678 --gender male --phone 541112345678 --country AR --address av.1234 --isSuperAdmin false --birthday 04/07/1990
pnpm command activeUser     --email superadmin@node.com
pnpm command activeUser     --email user@node.com
pnpm command syncRolesPermission
pnpm command createBucket   --name experience --region us-east-1
