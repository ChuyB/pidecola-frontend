# PideCola Web Client

This repository contains the code for the web client of the PideCola project. It is written with `NextJS` and `TypeScript`.

## Deploy

Executing `docker compose up` at the root directory of the project should instantiate a docker container with a production build of the web app.

## Development environment setup

### Requirements

To set up the development environment, you'll need:

- NodeJS (recommended version 20).
- NPM.
- Connection to the PideCola API.

### Installation

Clone the repository and install the dependencies using `npm`:

```sh
git clone https://github.com/PideCola/pidecola-frontend
```

```sh
cd pidecola-frontend
```

```sh
npm install
```

### Service local deployment

Before running `npm run dev`, it's essential to configure the environment variables. The `.env.local.example` file contains the necessary environment variables, which include:

- `NEXT_PUBLIC_API_URL`: URL of the PideCola API.

In the local development environment, these variables should be placed in a file named `.env.local`.

Once the environment variables are correctly configured, you can start the service using either:

```sh
npm run dev
```

```sh
npm run build && npm start
```
