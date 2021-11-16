# Coming Soon

## Postman Documentation

https://documenter.getpostman.com/view/10426172/Tz5je15Z

## Execute DEV Environment

We can run the project directly with docker compose and then bash where the basic commands to feed the database are located.

Basically generates an admin user, add roles with permission and create a bucket for minIO.

```bash
docker-compose up --build -d
docker-compose exec node bash dev.init.sh
```

Bash dev.init.sh Content
```bash
#!/usr/bin/env bash

npx ts-node src/command.ts addUserRole --role Admin --email user@node.com --firstName node --lastName node --password 12345678 --documentType DNI --documentNumber 12345678 --gender male --phone 541112345678 --country AR --address av.1234 --isSuperAdmin false --birthday 04/07/1990
npx ts-node src/command.ts addUserRole --role SuperAdmin --email superadmin@node.com --firstName super --lastName admin --documentType DNI --documentNumber 12345679 --gender male --phone 541112345678 --country AR --address av.1234 --password 12345678 --birthday 05/07/1990 --isSuperAdmin true
npx ts-node src/command.ts syncRolesPermission
npx ts-node src/command.ts createBucket --bucketName experience --region us-east-1
```

Create Push Notifications Keys
- ```docker-compose exec node npx ts-node src/command.ts createVapID```

Minio Browser
- http://localhost:9002/minio

## Execute PROD Environment
- ```docker-compose -f docker-compose.prod.yml up --build```

## Execute TEST Environment
- ```yarn test```
- ```make test```

## Test and watch one file
- ```make exec```
- ```yarn test-watch src/[Module]/Tests/[test-name].spec.ts```

TODO: Started

TODO: Handlers

TODO: Transformers

TODO: Entities

TODO: Services

TODO: Repositories

TODO: Commands

TODO: Middlewares

TODO: Lib

TODO: Config

TODO: Future


## Optimized Transpilation 

There is a hot reloading using bash and git files. With this mechanism we can transpile only the files
that are necessary to transpile, in addition there are also files to take care of eliminating the transpiled files
that they are not in the project in case of deleting them, when that happens, as nodemon is used for the refresh, in the
case of the remove files does not restart and in that specific case it should be restarted manually. Although in the 
normal development process. It would not be necessary since eventually you would be modifying another file and it 
would automatically transpile that file and delete the file that was deleted.

As it is still in the experimentation phase, the process may fail. In the event of failure, you can choose to manually 
compile the file that failed to compile or directly execute ```yarn tsc``` to compile everything again. 

## How to use TypeORM:

Node experience comes integrated with Mongoose as the default ORM. It also has TypeORM integrated to use any SQL engine 
that is required.

To change from Mongoose to TypeORM the following steps must be followed:
     
     To take an example we are going to use Postgres.
     
     1. Environment variables have to be changed.
        a. DB_PORT=27017 -> DB_PORT=5432
        b. DB_TYPE_DEFAULT=Mongoose -> DB_TYPE_DEFAULT=TypeORM
    
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
       
## Commands Available

 * ```npx ts-node src/command.ts addUserRole --role Admin --email user@node.com --firstName node --lastName node --password 12345678 --isSuperAdmin false```
 * ```npx ts-node src/command.ts addUserRole --role SuperAdmin --email superadmin@node.com --firstName super --lastName admin --password 12345678 --isSuperAdmin true```
 * ```npx ts-node src/command.ts syncRolesPermission```
 * ```npx ts-node src/command.ts createBucket --bucketName experience --region us-east-1```
 * ```npx ts-node src/command.ts createVapID```
