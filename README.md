# Welcome to Node Experience!

Hi! Node experience it's a boilerplate with many tools together for a simple basic project inspired on Clean Architectures.

**Tools:**
* Bcrypt
* CommanderJS
* Compression
* Config
* Cors
* Dotenv
* Envalid
* Express
* Express Validator
* Express Winston
* Helmet
* InversifyJS
* Jsonwebtoken
* Moment
* MongoDB
* NodeJS 12v
* Nodemailer
* Npx
* PM2
* PostgresSQL
* SocketIO
* TypeORM
* Typescript
* Ts-node
* Winston

Execute DEV Environment
- **docker-compose up --build -d**
- Also, you could use **make dev**
- docker-compose exec node bash dev.init.sh

Minio Browser
- http://127.0.0.1:9002/minio/
- Create Bucket experience

Execute PROD Environment
- docker-compose -f docker-compose.prod.yml up --build

Execute TEST Environment (Experimental)
- **make test**

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

How to use TypeORM:
Node experience comes integrated with Mongoose as the default ORM. It also has TypeORM integrated to use any SQL engine that is required.

To change from Mongoose to TypeORM the following steps must be followed:
     
     To take an example we are going to use Postgres.
     
     1. Environment variables have to be changed.
        a. DB_PORT=27017 -> DB_PORT=5432
        b. DB_TYPE_DEFAULT=Mongoose -> DB_TYPE_DEFAULT=TypeORM
    
    
     2. We have a command with Makefile to lift the corresponding containers.
        a. make dev_sql
        b. The command with docker compose would be:
                
                docker-compose -f docker-compose.yml -f docker-compose.sql.yml up --build -d
           
           This above command replaces the mongo container with the postgres container.
    
    3. Finally, in the inversify configuration, the SQL repositories must be binded.
        container.bind<IItemRepository>(REPOSITORIES.IItemRepository).to(ItemSqlRepository);
        container.bind<IUserRepository>(REPOSITORIES.IUserRepository).to(UserSqlRepository);
        container.bind<IRoleRepository>(REPOSITORIES.IRoleRepository).to(RoleSqlRepository);
        container.bind<IFileRepository>(REPOSITORIES.IFileRepository).to(FileSqlRepository);
    
    4. Important note. The filters and sorting files of each entity should also have a change depending on the relationship.
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
       5. Finally, you need to change the methods of all domain entities to array functions so that
          TypeORM can access those methods.
       
Commands Available:
 * npx ts-node src/command.ts addUserRole --role Admin --email user@node.com --firstName node --lastName node --password 12345678
 * npx ts-node src/Commands/command.ts addRole --name Admin --slug admin
 * npx ts-node src/Commands/command.ts addUser --name Admin --slug admin --email user@node.com --firstName node --lastName node --password 12345678
