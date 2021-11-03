#!/usr/bin/env bash

npx ts-node src/command.ts addUserRole --role Admin --email user@node.com --firstName node --lastName node --password 12345678 --documentType DNI --documentNumber 12345678 --gender male --phone 541112345678 --country AR --address av.1234 --isSuperAdmin false --birthday 04/07/1990
npx ts-node src/command.ts addUserRole --role SuperAdmin --email superadmin@node.com --firstName super --lastName admin --documentType DNI --documentNumber 12345679 --gender male --phone 541112345678 --country AR --address av.1234 --password 12345678 --birthday 05/07/1990 --isSuperAdmin true
npx ts-node src/command.ts syncRolesPermission
npx ts-node src/command.ts createBucket --bucketName experience --region us-east-1
