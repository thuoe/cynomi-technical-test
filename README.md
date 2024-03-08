<h1 align="center">Cynomi Technical Test</h1>

- [Prerequisites](#prerequisites)
- [Get Started (Local Development)](#get-started-local-development)
- [View persisted data](#view-persisted-data)
- [Demo](#demo)

Estimated Time Taken: 2-3 days


# Prerequisites

Please install [Docker](https://www.docker.com/) if you haven't already have done so on your local machine. This is required in order to spin up a container for PostgreSQL server to persist local data.

Please run the command to achieve this:

```sh
docker-compose up -d
```

Next, inside the `src/apps/server` amend the `.env.example` file name to be `.env`. This env varaible is used to establish a connection for the server

# Get Started (Local Development)

**These commands should all be peformed in the root of the monorepo!**

Install dependencies:

```sh
npm install
```

Populate the DB locally by seeding your DB with some dummy user data:

```sh
npm run reset
```

Next to serve the client side application coupled with the Nest.js server, simply run this script:

```sh
npm run dev
```

You can access the application locally via <http://localhost:5173/>

# View persisted data

If you wish to explore the DB to view newly persisted user data after submitting into the form, you can do
so by running `npx prisma studio` in `src/apps/server` which should present a link to a GUI.

Alternatively you can also use a third party GUI to view the DB such as (DBeaver)[https://dbeaver.io/]

# Demo

Here is a video of a working implementation:

https://github.com/thuoe/cynomi-technical-test/assets/15982721/86f806a5-035a-4467-a861-9e34cf690c9f


