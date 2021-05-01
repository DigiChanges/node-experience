#!/usr/bin/env bash

node dist/src/command.js addUserRole --role Admin --email user@node.com --firstName node --lastName node --password 12345678 --documentType DNI --documentNumber 12345678 --gender m --phone 541112345678 --country AR --address av.1234 --isSuperAdmin false
node dist/src/command.js addUserRole --role SuperAdmin --email superadmin@node.com --firstName super --lastName admin --documentType DNI --documentNumber 12345678 --gender m --phone 541112345678 --country AR --address av.1234 --password 12345678 --isSuperAdmin true
node dist/src/command.js syncRolesPermission
node dist/src/command.js createBucket --bucketName experience --region us-east-1
