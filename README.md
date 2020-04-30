# Welcome to Node Experience!

Hi! Node experience it's a set of tools together for a simple projects with an architecture like an MVC.

**Technologies:**
* NodeJS 10v
* Express
* Express Validator
* Dotenv
* Config
* TypeORM
* InversifyJS
* Bcrypt
* Typescript
* Postgres
* MongoDB
* SocketIO
* Npx
* CommanderJS
* Ts-node
* Moment
* Nodemailer
* Compression
* Helmet

- docker-compose up
- docker exec -it experience_node_1 bash

- yarn
- yarn run dev

OR 

- docker-compose exec app yarn dev

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

Commands Available:
 * npx ts-node src/command.ts addUserRole --role Admin --email node@node.com --firstName node --lastName node --password 12345678
 * npx ts-node src/Commands/command.ts addRole --name Admin --slug admin
 * npx ts-node src/Commands/command.ts addUser --name Admin --slug admin --email node@node.com --firstName node --lastName node --password 12345678