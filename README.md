<h1 align="center">Find a Friend API</h1>

<p align="center"> This is an API for a application that allows general users to find pets to adopt. 
    <br> 
</p>

## 📝 Table of Contents

- [About](#about)
- [Getting Started](#getting_started)
- [Usage](#usage)
- [Structure](#structure)
- [Features](#features)
- [Built Using](#built_using)

## 🧐 About <a name = "about"></a>
- This is an API for a application that allows general users to find pets to adopt.
- It allows organizations to register pets for adoption, and users to search for pets to adopt.
- The API allows users search for pets by city and it's characteristics
- The API is built using Node.js, Fastify, Prisma, and PostgreSQL, using SOLID principles and TDD. 

## 🏁 Getting Started <a name = "getting_started"></a>

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites
You will need to have the following installed on your machine:
- [Node.js](https://nodejs.org/en/)
- Package manager: [npm](https://www.npmjs.com/), [yarn](https://yarnpkg.com/) or [pnpm](https://pnpm.io/). I'm using pnpm in this project.
- [Docker](https://www.docker.com/)

### Installing
With the prerequisites installed, and with docker running, you can run the following commands to get the project up and running:

1. Clone the repository or download the zip file and extract it:
```bash
git clone https://github.com/LeonardoSPereira/Find-a-Friend.git
```

2. Install the dependencies:
```bash
npm install

# or

pnpm install
```

3. Create a `.env` file in the root of the project with the following content:
```env
NODE_ENV=dev

PORT=

DATABASE_URL="postgresql://docker:docker@localhost:5432/findafriendapi?schema=public"

JWT_SECRET=appjwtsecret
```

4. Start the database:
```bash
docker-compose up -d
```

5. Run the migrations:
```bash
npx prisma migrate dev

# or

pnpm prisma migrate dev
```

6. Start the server:
```bash
npm run dev

# or

pnpm run dev
```

## 🏗️ Structure <a name = "structure"></a>
The project is structured as follows:
```
├── prisma: folder where the Prisma configuration files are located, with the schema and migrations.

├── src: folder where application files are located.

│   ├── @types: folder where jwt types are located.

│   ├── env: folder where environment variables are located.

│   ├── http: folder where are located the folders that contain the routes, controllers with it's e2e tests, and the middlewares. 

│   ├── lib: folder where the files that contain the configuration of the dependencies used in the application are located.

│   ├── repositories: folder where the folders that contain the interfaces, implementations, and the in-memory implementation of the repositories are located.

│   ├── use-cases: folder where are located the application's use cases with it's unit tests, the errors handlers an the factories, that are responsible for abstracting the creation of the use cases.

│   ├──  utils: folder where the files that contain utility functions are located.

│   ├── app.ts: file that contains the application configuration.

│   └── server.ts: file that contains the server configuration.

└── vitest-environment: folder where the environment configuration for the e2e tests is located.

```

## 🔧 Running the tests <a name = "tests"></a>
The tests are divided into unit tests and e2e tests. To run the tests, you can run the following commands:

1. To run the unit tests:
```bash
npm run test

# or

pnpm test
```

2. To run the e2e tests:
```bash
npm run test:e2e

# or

pnpm test:e2e
```
*Remember that to run the e2e tests, the database must be running.*

- To run the tests with coverage, you can run the following commands:
```bash
npm run test:coverage

# or

pnpm test:coverage
```

### Break down into end to end tests
The e2e tests test the application's routes, controllers, and middlewares, simulating the user's interaction with the application.

## 🎈 Features <a name = "features"></a>

### Application Rules

- [x] It must be possible to register a pet.
- [x] It must be possible to list all pets available for adoption in a city.
- [x] It must be possible to filter pets by their characteristics.
- [x] It must be possible to view details of a pet available for adoption.
- [x] It must be possible to register as an organization (ORG).
- [x] It must be possible to log in as an organization (ORG).

### Business Rules

- [x] To list the pets, it is mandatory to inform the city.
- [x] An organization (ORG) must have an address and a WhatsApp number.
- [x] A pet must be associated with an organization (ORG).
- [x] The user who wants to adopt will contact the organization (ORG) via WhatsApp.
- [x] All filters, besides the city, are optional.
- [x] For an organization (ORG) to access the application as an admin, it must be logged in.

## 🎈 Usage <a name="usage"></a>
To use the API, you can use the following routes:

### Orgs Routes
```
POST /orgs - Register an organization

POST /sessions - Authenticate a org

PATCH /token/refresh - Refresh the org's JWT token
```

### Pets Routes
```
POST /pets - Register a pet (only for logged-in orgs)

GET /pets/:id - Retrieve a pet by id
  - Params: petId 

GET /gyms/:city/:state - Retrieve a list of gyms by name
  - Params: city, state
  - Query:
    - age (optional): pet's age
    - energy_level (optional): pet's energy level (LOW, MEDIUM, HIGH)
    - size (optional): pet's size (SMALL, MEDIUM, LARGE)
    - environment (optional): pet's environment

```

## ⛏️ Built Using <a name = "built_using"></a>
- [TypeScript](https://www.typescriptlang.org/)
- [Node.js](https://nodejs.org/en/)
- [Fastify](https://www.fastify.io/)
- [Prisma](https://www.prisma.io/)
- [PostgreSQL](https://www.postgresql.org/)
- [Docker](https://www.docker.com/)
- [Zod](https://zod.dev/)
- [Vitest](https://vitest.dev/)



