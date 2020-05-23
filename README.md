# Welcome to Node Experience!

Hi! Node experience it's a boilerplate with many tools together for a simple basic project with an architecture like an MVC and Clean Architectures like Hexagonal.

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

Commands Available:
 * npx ts-node src/command.ts addUserRole --role Admin --email user@node.com --firstName node --lastName node --password 12345678
 * npx ts-node src/Commands/command.ts addRole --name Admin --slug admin
 * npx ts-node src/Commands/command.ts addUser --name Admin --slug admin --email user@node.com --firstName node --lastName node --password 12345678