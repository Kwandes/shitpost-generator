# Shitpost Generator

## About The Project

Ever want to make valulable contributions on your favourite social media?\
Do you find yourself lacking ideas for names?\
**Look no further, this app has it all!**

### Built With

- [NestJs](https://nestjs.com/) - api
- [Angular](https://angular.io/) - frontend
- [NX](https://nx.dev/) - repository structure as a monorepo
- [MySql](mysql.com) - data persistance
- [MongoDB](https://www.mongodb.com/) - data persistance but different
- [Neo4J](https://neo4j.com/) - data persistance but more visual
- And love 💖

#### Configuration

The services are configured via a `.env` file, which is gitignored.\
If you wish to connect to a database other than a locally hosted one, create a `.env` file based on the [.env.template](.env.template) and store your data there.

```sh
cp .env.template .env
```

## Getting Started

### Prerequisites

Before you can run this project, you need to have the following things installed:

- Npm and Node - we recommend using [NVM (Linux, MacOS)](https://github.com/nvm-sh/nvm#about) or [NVM-Windows (Windows)](https://github.com/coreybutler/nvm-windows#node-version-manager-nvm-for-windows)

  > Use Node version `v16.14.0+`

- nx

```sh
npm install -g nx
```

> if you don't want to install NX globally, every NX command will have to be run through npx

> We try to use the latest version of NX, but it is under active development and gets updated often. If the latest version of NX doesn't work, try an older version and submit a bug report.\
> Current NX version used by the project can be found in the [package.json](package.json) under any of the `nrwl/` dev dependencies

### Installation

1. Clone the repo

```sh
git clone https://github.com/Kwandes/shitpost-generator.git
```

2. Install NPM packages

```sh
npm install
```

3. Configure the app

Update the `.env` file if needed, or leave it empty and use the default cvalues (found in `env.template`).

There are multiple backend apps, each requirering its own database instance.

- `api` uses MySQL
- `api-mongo` uses MongoDb
- `api-neo` uses Neo4j

Each app expects a schema/colleciton called `shitpost_generator`,

You can run each database locally via docker with the following commands:

##### MySQL

```docker
docker run --name mysql --restart unless-stopped -e MYSQL_ROOT_PASSWORD=root -e MYSQL_DATABASE=shitpost_generator -p 3306:3306 -d mysql
```

##### MongoDb

```docker
docker run --name mongodb --restart unless-stopped -e MONGO_INITDB_ROOT_USERNAME=root -e MONGO_INITDB_ROOT_PASSWORD=root -dp 27017:27017 mongo
```

##### Neo4J

```docker
docker run --name neo4j --restart unless-stopped -e NEO4J_AUTH=neo4j/root -d -p 7474:7474 -p 7687:7687 neo4j
```

4. _[Optional]_ Populate (seed) the database with example data

- Populate all databases (need ot be running or it will fail)

```sh
npm run seed
```

- Populate specific database type

```sh
npm run seed:mysql
npm run seed:mongo
```

Unfortunetely there is currently no option to populate the Neo4j through the seeder service. Instead you can use the [seed-data.cypher](apps\seeder\src\neo\seed-data.cypher) to populate the database manually.\
WARNING: it will remove other existing nodes and relationships.

5. Serve the apps

The system is composed of multiple apps, to get access to all of the functionalty all of them need to be running.

#### NX serve

You can either serve apps individually with:

```sh
nx serve api
nx serve api-mongo
nx serve api-neo
nx serve shitpost-generator
```

or serve multiple apps using:

```sh
nx run-many --maxParallel 4 --parallel true --projects api, api-mongo, api-neo, shitpost-generator --target serve
```

Find out more about how to use NX [here](https://nx.dev/latest/angular/getting-started/nx-cli)

#### Deployment

If you wish, you canbuild the appplications as well and use that for deployment.
You can either build the apps invidually using the dockerfiles, or use the Docker-compose

MySQL backend:

```sh
docker build -t shit-api -f .deploy/dockerfiles/MYSQL_API_Dockerfile .
docker run --name shit-api -e MYSQL_HOST=localhost -e MYSQL_PORT=3306 -e MYSQL_USER=root -e MYSQL_PASSWORD=root -e MYSQL_DATABASE=shitpost_generator  -p 3333:3333 shit-api

```

MongoDb backend:

```sh
docker build -t shit-api-mongo -f .deploy/dockerfiles/MONGO_API_Dockerfile .
docker run --name shit-api-mongo -e MONGO_HOST=localhost -e MONGO_PORT=27017 -e MONGO_USER=root -e MONGO_PASSWORD=root -e MONGO_DATABASE=shitpost_generator  -p 3334:3334 shit-api-mongo

```

Neo4j backend:

```sh
docker build -t shit-api-neo -f .deploy/dockerfiles/NEO_API_Dockerfile .
docker run --name shit-api-neo -e NEO4J_HOST=localhost -e NEO4j_PORT=7687 -e NEO4j_USER=neo4j -e NEO4j_PASSWORD=root -e NEO4j_DATABASE=shitpost_generator  -p 3335:3335 shit-api-neo

```

#### Documentation

The API is documented using SwaggerUi, which you can access by runnign the api and navigating to [localhost:3333/api](http://localhost:3333/api)

The documentation contains all of the available endpoints as well as how to call them and what they return.

## License

Distributed under the MIT License. See [`LICENSE`](./LICENSE) for more information.
