# Welcome to Node Experience!

[![Sonarcloud Status](https://sonarcloud.io/api/project_badges/measure?project=DigiChanges_node-experience&metric=alert_status)](https://sonarcloud.io/dashboard?id=Your_Project_Key)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](https://github.com/DigiChanges/node-experience/blob/master/LICENSE)

<div style="text-align:center">
    <img width="125" src="nexp.svg" alt="logo NExp">
</div>

## Basic Description
Hello! **NExp** *(Node Experience)* is a boilerplate for [**Node**](https://nodejs.org/en/), which makes use of a Clean Architecture + DDD, with [**TypeScript**](https://www.typescriptlang.org/) that combined allow a perfect cohesion thus achieving a clean and at the same time very powerful implementation.

## Base project

https://github.com/DigiChanges/node-experience

## Docs

### Boilerplate Documentation

[Boilerplate Documentation](https://digichanges.github.io/nexp-docs)

*NOTE*: The v1 it's deprecated and don't have support in the future.

## Quick Start

We can run the project directly with docker compose and then bash where the basic commands to feed the database are located.

1. git clone https://github.com/DigiChanges/node-experience
2. Create a folder on project root call it `dist`.
3. Install dependencies. `pnpm install`.
4. Copy `.env.dev` file to `.env`. (**.env.dev** it's an environment example file)
5. Then execute `STAGE=dev docker-compose up --build` to up all containers.

`docker-compose exec node bash dev.init.sh`

## Installation

First, install nexp-cli using [npm](https://www.npmjs.com/) (we assume you have pre-installed [node.js](https://nodejs.org/)).

```bash
npm install -g nexp-cli
```

Then generate your new project:

```bash
nexp-cli create
```

Each module is divided by business domain:

- Item
- Notification

There are also two particular cases:

- Config
- Shared

The directory structures for business domains are as follows: 

**Folder structure of a domain (business logic)**

```sh 
├── Domain
│   ├── Entities
│   ├── Exceptions
│   └── Services
│   └── UseCases
├── Infrastructure
│   ├── Repositories
│   ├── Schema
│   └── Seeds
├── Presentation
│   ├── Commands
│   ├── Controllers
│   ├── Criterias
│   ├── Exceptions
│   ├── Handlers
│   ├── Middlewares
│   ├── Requests
│   └── Transformers
├── Tests
│   ├── Fixtures
 ```

---

> **Tip** I know it may sound repetitive, but it is not a framework. NExp is a set of tools or libraries working together through a common structure. All structural code within this project is not fixed and can be changed freely.

### Supabase integration

In the infrastructure folder there is a file called `supabase_permissions.sql` this file is used to manage permissions 
with these tables.

* roles
* permissions
* users_has_roles
* roles_has_permissions

And a function call `get_authorization`.

## Advantages

The advantages of using this boilerplate are
to save time thinking about certain basic structures common to any project to make an API
without having to get everything from scratch. 

As it is only a boilerplate, you have the freedom to structure the code whatever you want.

Common structures found within this project are: 

- Fastify's integration.
- MikroORM and Mongoose Integration.
- Basic push Notification and Email with nodemailer.
- Business logic independent of the HTTP and persistence libraries.
- Supabase integration middleware.

## Docs
[POSTMAN Documentation](https://documenter.getpostman.com/view/22552353/2s9YeBftt9)

## License

**NExp** is [MIT licensed](LICENSE).
