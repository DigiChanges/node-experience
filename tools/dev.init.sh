#!/usr/bin/env bash

pnpm command syncRolesPermission
pnpm sync:db
pnpm command addUser --role Admin --email admin@node.com --firstName super --lastName admin --gender M --phone 541112345678 --country AR --password 12345678 --birthdate 1990-07-01
pnpm command addUser --role Operator --email user@node.com --firstName node --lastName node --gender M --phone 541112345678 --country AR --password 12345678 --birthdate 1990-07-20
pnpm command createBucket --name experience --region us-east-1