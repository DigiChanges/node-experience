# Quick Start

## Postman Documentation

[API Documentation](https://documenter.getpostman.com/view/10426172/Tz5je15Z)

## Execute DEV Environment

We can run the project directly with docker compose and then bash where the basic commands to feed the database are located.

Basically generates an admin user, add roles with permission and create a bucket for minIO.

```bash
docker-compose up --build -d
docker-compose exec node bash dev.init.sh
```

Remember to generate the .env file for the system environment variables. You can take the .env.dev file as an example without any problems.

## Bash dev.init.sh Content
```bash
#!/usr/bin/env bash

yarn command addUserRole --role Admin --email user@node.com --firstName node --lastName node --password 12345678 --documentType DNI --documentNumber 12345678 --gender male --phone 541112345678 --country AR --address av.1234 --isSuperAdmin false --birthday 04/07/1990
yarn command addUserRole --role SuperAdmin --email superadmin@node.com --firstName super --lastName admin --documentType DNI --documentNumber 12345679 --gender male --phone 541112345678 --country AR --address av.1234 --password 12345678 --birthday 05/07/1990 --isSuperAdmin true
yarn command syncRolesPermission
yarn command createBucket --name experience --region us-east-1
```

## Create Push Notifications Keys

```bash
yarn docker:command createVapID
```

## Minio Browser

[http://localhost:9002/minio](http://localhost:9002/minio)


## Execute TEST Environment
```bash
yarn test
```

## Test and watch one file

```bash
yarn test-watch src/[Module]/Tests/[test-name].spec.ts
```

Example Unique Test

```bash
yarn test-watch src/Item/Tests/item.handler.spec.ts
```

## How to use TypeORM:

Node experience comes integrated with Mongoose as the default ORM. It also has TypeORM integrated to use any SQL engine 
that is required.

To change from Mongoose to TypeORM the following steps must be followed:
     
     To take an example we are going to use Postgres.
     
     1. Environment variables have to be changed.
        a. DB_PORT=27017 -> DB_PORT=5432
        b. DB_TYPE_DEFAULT=Mongoose -> DB_TYPE_DEFAULT=TypeORM
        c. DB_TYPE=postgresql -> DB_TYPE=postgres
    
    2. Important note. The filters and sorting files of each entity should also have a change depending on the relationship.
        For example UserSort has
       
       class UserSort extends Sort
       {
            static readonly EMAIL: string = 'email';
            static readonly CREATED_AT: string = 'createdAt';
       ...
       
       This should change to
       
       class UserSort extends Sort
       {
            static readonly EMAIL: string = 'i.email';
            static readonly CREATED_AT: string = 'i.createdAt';
       ...
       
           This is because typeORM and SQL aliases are used and in this case it is necessary for you to 
           understand each filter and each order that we need to add.
     3. Finally, we have a command with Makefile to lift the corresponding containers.
        a. make dev_sql
        b. The command with docker compose would be:
                
                docker-compose -f docker-compose.yml -f docker-compose.sql.yml up --build -d
           
           This above command replaces the mongo container with the postgres container.


## How to use Mikro-ORM:

To change to Mikro-ORM the following steps must be followed:
     
     To take an example we are going to use Postgres.
     
     1. Environment variables have to be changed.
        a. DB_PORT=27017 -> DB_PORT=5432
        b. DB_TYPE_DEFAULT=Mongoose -> DB_TYPE_DEFAULT=MikroORM
        c. DB_TYPE=postgresql
    
     2. Finally, we have a command with Makefile to lift the corresponding containers.
        a. make dev_sql
        b. The command with docker compose would be:
                
                docker-compose -f docker-compose.yml -f docker-compose.sql.yml up --build -d
           
           This above command replaces the mongo container with the postgres container.

```bash
docker-compose exec db psql -d experience -U experience -W
create extension "uuid-ossp";
```

```bash
docker-compose exec node bash
yarn run sync-db
```
