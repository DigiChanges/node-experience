# Welcome to Node Experience!

[![CircleCI](https://circleci.com/gh/DigiChanges/node-experience/tree/master.svg?style=svg)](https://circleci.com/gh/DigiChanges/node-experience/tree/master)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](https://github.com/DigiChanges/node-experience/blob/master/LICENSE)

## Basic Description
Hello! **NExp** *(Node Experience)* is a boilerplate for [**Node**](https://nodejs.org/en/), which makes use of a Hexagonal architecture and clean architecture with some of DDD principles, in addition to all the power of [**TypeScript**](https://www.typescriptlang.org/) that combined allow a perfect cohesion thus achieving a clean and at the same time very powerful implementation.

### Boilerplate Documentation

[Boilerplate Documentation](https://nexp.digichanges.com)

Each module is divided by business domain:

- Auth
    - Authentication / Authorization
    - Role
    - User
- Item
- Notification
- File

There are also two particular cases:

- Config
- Shared

The directory structures for business domains are as follows: 

**Folder structure of a module**

```sh 
├── Domain
│   ├── Entities
│   ├── Exceptions
│   └── Services
│   └── UseCases
│   └── Payloads
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
│   ├── Validations
│   └── Transformers
├── Tests
 ```

---

> **Tip** I know it may sound repetitive, but it is not a framework. NExp is a set of tools or libraries working together through a common structure. All structural code within this project is not fixed and can be changed freely.

## Advantages

The advantages of using this boilerplate is to save time thinking about certain basic structures common to any project to make an API without having to get everything from scratch. 

As it is only a boilerplate, you have the freedom to structure the code whatever you want.

Common structures found within this project are: 

- Basic authentication and authorization.
- Filesystem with minIO, 100% S3 compatible.
- Basic push Notification and Email.
- TypeORM, MikroORM and Mongoose Integration.
- Express and Koa integration.
- Business logic independent of the HTTP and persistence libraries. 
- Esbuild compiler. 

## Docs

## License

**NExp** is [MIT licensed](LICENSE).
