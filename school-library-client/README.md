# Todo App Client

### Technology Used:

* Language: Typescript
* Framework: React JS
* Tool: Vite
* UI: Tailwind css
* Http request: Axios

### Project Folder Structure:

```
├── public                   # To save public file
├── src
│    ├── assets/             # Used to save asset like font, image, etc
│    ├── components/         # Used to store small components and their use is global.
│    ├── lib/                # Used to store utilities that can be useful, such as date time format, custom hooks, ErrorUtils for error handling, etc.
│    ├── pages/              # Used to combine several components in the parts folder and perform some global logic which will later be used in the setup in navigation.
│    ├── route/              # Used to store app routing 
│    ├── store/              # Used to store global state that needed in global component
│    ├── index.css
│    ├── main.tsx
│    └── typing.d.ts         # Declare some types
│
├── prettierrc.json          # Prettier configuration to maintain code format consistency.
├── Dockerfile               # Instructions for building this React app Docker image.
├── eslint.config.js         # ESLint rules for JavaScript/TypeScript linting.
├── nginx.conf               # Configure NGINX for serving applications during deployment (in containers).
└── package.json             # Management of dependencies and scripts used for development, build, etc.
```

### How to Run

#### 1. Make sure nodejs is installed in your machine (minimum Nodejs version is v22.17.0)

#### 2. Install dependency

```shell
yarn install
```

#### 3, Make sure your API BaseURL is correct on `todo-app-client/src/lib/api/api.ts` adjust to your API server url

#### 4. Run the application in dev mode

```shell
yarn dev
```

#### 5. open web app on http://localhost:5173/

If you use `docker` and `docker-compose`, you can run a single package project and its server application with a single
command without the hassle of running the client and server applications individually. Follow the guide here: [Run Application Using docker-compose](https://github.com/tri-hariyadi/test_upscale/blob/master/README.md)

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md)
  uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast
  Refresh
