## Project Setup

We'll begin by creating a default NextJs application with a Typescript template.

```bash
npx create-next-app --ts nextjs-fullstack-app-template

cd nextjs-fullstack-app-template
```

First we will test to make sure the app is working. We're going to be using `yarn` for this example, but you could just as easily use NPM if you choose.

```
yarn install

yarn dev
```

You should see the demo app available on [http://localhost:3000](http://localhost:3000)

![First Page Load](https://res.cloudinary.com/dqse2txyi/image/upload/v1649125549/blogs/nextjs-fullstack-app-template/first-load_sm29jf.png)

## Engine Locking

We would like for all developers working on this project to use the same Node engine and package manager we are using. TO do that we create two new files:

- `.nvmrc` -- Will tell other uses of the project which version of Node is used
- `.npmrc` - WIll tell other users of the project which package manager is used

We are using `Node v16 Gallium` and `yarn` for this project so we set those values like so:

`.nvmrc`

```.nvmrc
lts/gallium
```

`.npmrc`

```
engine-strict=true
```

You can check your version of Node with `node --version` and make sure you are setting the correct one. A list of Node version codenames can be found [here](https://github.com/nodejs/Release/blob/main/CODENAMES.md)

Note that the use of `engine-strict` didn't specifically say anything about `yarn`, we do that in `package.json`:

`package.json`

```json
  "name": "nextjs-fullstack-app-template",
  "author": "Alex Eagleson",
  "description": "A tutorial and template for creating a production-ready fullstack NextJs application",
  "version": "0.1.0",
  "private": true,
  "license" : "MIT"
  "homepage": "https://github.com/alexeagleson/nextjs-fullstack-app-template"
  "engines": {
    "node": ">=14.0.0",
    "yarn": ">=1.22.0",
    "npm": "please-use-yarn"
  },
  ...
```
