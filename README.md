# Vite + React + TypeScript + Zustand + Tailwind

## Introduction
This project was bootstrapped with [Vite react-ts](https://vitejs.dev/guide/#trying-vite-online).

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Connected packages
- [React](https://react.dev/)
- [Axios](https://www.npmjs.com/package/axios)
- [Lodash](https://lodash.com/docs)
- [Tailwindcss](https://tailwindcss.com/docs/installation)
- [NextUI](https://nextui.org/docs/guide/installation)
- [headlessui/react](https://headlessui.com/)
- [heroicons](https://heroicons.com/)
- [zustand](https://github.com/pmndrs/zustand)
- [react-router](https://reacttraining.com/react-router/web/example/basic)
- [react-hook-form](https://www.react-hook-form.com/)

## Install dependencies.
```
> npm install
```

## Available Scripts

In the project directory, you can run:

### Run
```
> npm run start
```

### Run with *`env.local`* file
```
> npm run start:local
```

Runs the app in the development mode.\
Open [http://localhost:5173](http://localhost:5173) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### Build
```
> npm run build
```

Builds the app for production to the `dist` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.


## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
  },
}
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list

## Locally-trusted development certificates
For making locally-trusted development certificates we use ```mkcert```
- [https://github.com/FiloSottile/mkcert](https://github.com/FiloSottile/mkcert)

```
> mkcert -key-file ./.cert/key.pem -cert-file ./.cert/cert.pem local.domain.com 127.0.0.1 ::1
```

Please updated ```.env.local``` file
```
GENERATE_SOURCEMAP=true
HOST=local.domain.com
PORT=8080 // what ever you want
HTTPS=true
SSL_CRT_FILE=./.cert/cert.pem
SSL_KEY_FILE=./.cert/key.pem
```
