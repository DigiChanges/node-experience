#!/usr/bin/env bash

node dist/command.js addUserRole --role Admin --email user@node.com --firstName node --lastName node --password 12345678 --isSuperAdmin false
node dist/command.js addUserRole --role SuperAdmin --email superadmin@node.com --firstName super --lastName admin --password 12345678 --isSuperAdmin true
node dist/command.js syncRolesPermission
node dist/command.js createBucket --bucketName experience --region us-east-1
