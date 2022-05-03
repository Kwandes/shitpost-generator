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

Update the `.env` file if needed.

The app requires a MySQL database instance to connect to with an existing schema `shitpost_generator`

You can run one locally via Docker with:

```docker
docker run --name mysql --restart unless-stopped -e MYSQL_ROOT_PASSWORD=root -e MYSQL_DATABASE=shitpost_generator -p 3306:3306 -d mysql
```

4. _[Optional]_ Populate (seed) the database with example data

```sh
npm run seed
```

5. Serve the apps

The system is composed of multiple apps, to get access to all of the functionalty all of them need to be running.

#### NX serve

You can either serve apps individually with:

```sh
nx serve api
nx serve shitpost-generator
```

or serve multiple apps using:

```sh
nx run-many --maxParallel 2 --parallel true --projects api, shitpost-generator --target serve
```

Find out more about how to use NX [here](https://nx.dev/latest/angular/getting-started/nx-cli)

#### Documentation

The API is documented using SwaggerUi, which you can access by runnign the api and navigating to [localhost:3333/api](http://localhost:3333/api)

The documentation contains all of the available endpoints as well as how to call them and what they return.

## License

Distributed under the MIT License. See [`LICENSE`](./LICENSE) for more information.
