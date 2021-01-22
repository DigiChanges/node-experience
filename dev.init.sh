#!/usr/bin/env bash

node dist/src/command.js addUserRole --role Admin --email user@node.com --firstName node --lastName node --password 12345678 --isSuperAdmin false
node dist/src/command.js addUserRole --role SuperAdmin --email superadmin@node.com --firstName super --lastName admin --password 12345678 --isSuperAdmin true
node dist/src/command.js syncRolesPermission
node dist/src/command.js createBucket --bucketName experience --region us-east-1
