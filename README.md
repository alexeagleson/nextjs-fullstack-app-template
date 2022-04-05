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

Also recommended to run

```
yarn build
```

To ensure you can successfully do a production build of the project. It's recommended (but not required) to close your dev server when running a NextJs build. Most of the time there is no issue but occasionally the build can put your dev server in a weird state that requires a restart.

You should get a nice little report on the command line of all the pages built with green coloured text implying they are small and efficient. We'll try to keep them that way as we develop the project.

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
    "node": ">=16.0.0",
    "yarn": ">=1.22.0",
    "npm": "please-use-yarn"
  },
  ...
```

The `engines` field is where you specify the specific versions of the tools you are using. You can also fill in your personal details if you choose.

## Git Setup

This would be a good time to make our first commit to our remote repo, to make sure our changes are backed up, and to follow best practices for keeping related changes grouped within a single commit before moving to something new.

By default your NextJs project will already have a repo initialized. You can check what branch you are on with `git status`. It should say something like:

```
On branch main
Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git restore <file>..." to discard changes in working directory)
        modified:   README.md

Untracked files:
  (use "git add <file>..." to include in what will be committed)
        .npmrc
        .nvmrc
```

This tells us we are on the `main` branch and we have not staged or made any commits yet.

Let's commit our changes so far.

```
git add .

git commit -m 'project initialization'
```

The first command will add and stage all files in your project directory that aren't ignored in `.gitignore`. The second will make a commit of the state of your current project with the message we wrote after the `-m` flag.

Hop over to your preferred git hosting provider ([Github](https://github.com) for example) and create a new repository to host this project. Make sure the default branch is se tto the same name as the branch on your local machine to avoid any confusion.

On Github you can change yur global default branch name to whatever you like by going to:

```
Settings -> Repositories -> Repository default branch
```

Now you are ready to add the remote origin of your repository and push. Github will give you the exact instructions when you create it. Your syntax may be a little different than mine depending on if you are using HTTPS rather than SSH.

```
git remote add origin git@github.com:{YOUR_GITHUB_USERNAME}/{YOUR_REPOSITORY_NAME}.git

git push -u origin {YOUR_BRANCH_NAME}
```

Note that from this point on we will be using the [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/#summary) standard and specifically the Angular convention [described here](https://github.com/angular/angular/blob/22b96b9/CONTRIBUTING.md#type)

The reason being like many other features in this project to simply set a **consistent** standard for all developers to use to minimize train-up time when contributing to the project. I personally have very little concern as to what standard is chosen, as long as everyone agrees to follow it that is the most important thing.

Consistency is everything!

## Code Formatting and Quality Tools

In order to set a standard that will be used by all contributors to the project to keep the code style consistent and basic best practices followed we will be implementing two tools:

- [eslint](https://eslint.org/) - For best practices on coding standards
- [prettier](https://prettier.io/) - For automatic formatting of code files

### ESLint

We'll begin with ESLint, which is easy because it automatically comes installed and pre-configured with NextJs projects.

We are just going to add a little bit of extra configuration and make it a bit stricter than it is by default. If you disagree with any of the rules it sets, no need to worry, it's very easy to disable any of them manually. We configure everything in `.eslintrc.json` which should already exist in your root directory:

`.eslintrc.json`

```json
{
  "extends": ["next", "next/core-web-vitals", "eslint:recommended"],
  "globals": {
    "React": "readonly"
  },
  "rules": {
    "no-unused-vars": [1, { "args": "after-used", "argsIgnorePattern": "^_" }]
  }
}
```

In the above small code example we have added a few additional defaults, we have said that `React` will always be defined even if we don't specifically import it, and I have added a personal custom rule that I like which allows you to prefix variables with an underscore \_ if you have declared them but not used them in the code.

I find that scenario comes up often when you are working on a feature and want to prepare variables for use later, but have not yet reached the point of implementing them.

You can test out your config by running:

```
yarn lint
```

You should get a message like:

```
✔ No ESLint warnings or errors
Done in 1.47s.
```

If you get any errors then ESLint is quite good at explaining clearly what they are. If you encounter a rule you don't like you can disable it in "rules" by simply setting it to 1 (warning) or 0 (ignore) like so:

```json
  "rules": {
    "no-unused-vars": 0, // As example: Will never bug you about unused variables again
  }
```

Let's make a commit at this point with the message `build: configure eslint`

### Prettier

Prettier will take care of automatically formatting our files for us. Let's add it to the project now.

It's only needed during development, so I'll add it as a `devDependency` with `-D`

```
yarn add -D prettier
```

I also recommend you get the [Prettier VS Code extension](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) so that VS Code can handle the formatting of the files for you and you don't need to rely on the command line tool. Having it installed and configured in your project means that VSCode will use your project's settings, so it's still necessary to add it here.

We'll create two files in the root:

`.prettierrc`
```.prettierrc
{
  "trailingComma": "es5",
  "tabWidth": 2,
  "semi": true,
  "singleQuote": true
}
```

Those values are entirely at your discretion as to what is best for your team and project.

`.prettierignore`
```
.yarn
.vscode
.next
dist
node_modules
*.md
```

In that file I've placed a list of directories that I don't want Prettier to waste any resources working on.  You can also use patterns like *.html to ignore groups of types of files if you choose.

Now we add a new script to `package.json` so we can run Prettier:

`package.json`
```
  ...
  "scripts: {
    ...
    "prettier": "prettier --write ."
  }
```

You can now run

```
yarn prettier
```

to automatically format, fix and save all files in your project you haven't ignored.  By default my formatter updated about 5 files.  You can see them in your list of changed files in the source control tab on the left of VS Code.

Let's make another commit with `build: implement prettier`.

## Git Hooks

One more section on configuration before we start getting into component development.  Remember you're going to want this project to be as rock solid as possible if you're going to be building on it in the long term, particularly with a team of other developers.  It's worth the time to get it right at the start.

We are going to implement a tool called [Husky](https://typicode.github.io/husky/#/)

Husky is a tool for running scripts at different stages of the git process, for example add, commit, push, etc.  We would like to be able to set certain conditions, and only allow things like commit and push to succeed if our code meets those conditions, presuming that it indicates our project is of acceptable quality.

To install Husky run

```
yarn add -D husky

npx husky install
```

The second command will create a `.husky` directory in your project.  This is where your hooks will live.  Make sure this directory is included in your code repo as it's intended for other developers as well, not just yourself.

Add the following script to your `package.json` file:

`package.json`
```
  ...
  "scripts: {
    ...
    "prepare": "husky install"
  }
```

This will ensure Husky gets installed automatically when other developers run the project.  

To create a hook run

```
npx husky add .husky/pre-commit "yarn lint"
```

The above says that in order for our commit to succeed, the `yarn lint` script must first run and succeed.  "Succeed" in this context means no errors.  It will allow you to have warnings (remember in the ESLint config a setting of 1 is a warning and 2 is an error in case you want to adjust settings).

Let's create a new commit with the message `ci: implement husky`.  If all has been setup properly your lint script should run before the commit is allowed to occur.

We're going to add another one:

```
npx husky add .husky/pre-push "yarn build"
```

The above ensures that we are not allowed to push to the remote repository unless our code can successfully build.  That seems like a pretty reasonable condition doesn't it?  Feel free to test it by committing this change and trying to push.

---

Lastly we are going to add one more tool.  We have been following a standard convention for all our commit messages so far, let's ensure that everyone on the team is following them as well (including ourselves!).  We can add a linter for our commit messages:

```
yarn add -D @commitlint/config-conventional @commitlint/cli
```

To configure it we will be using a set of standard defaults, but I like to include that list explicitly in a `commitlint.config.js` file since I sometimes forget what prefixes are available:

`commitlint.config.js`
```js
// build: Changes that affect the build system or external dependencies (example scopes: gulp, broccoli, npm)
// ci: Changes to our CI configuration files and scripts (example scopes: Travis, Circle, BrowserStack, SauceLabs)
// docs: Documentation only changes
// feat: A new feature
// fix: A bug fix
// perf: A code change that improves performance
// refactor: A code change that neither fixes a bug nor adds a feature
// style: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)
// test: Adding missing tests or correcting existing tests

module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'body-leading-blank': [1, 'always'],
    'body-max-line-length': [2, 'always', 100],
    'footer-leading-blank': [1, 'always'],
    'footer-max-line-length': [2, 'always', 100],
    'header-max-length': [2, 'always', 100],
    'scope-case': [2, 'always', 'lower-case'],
    'subject-case': [
      2,
      'never',
      ['sentence-case', 'start-case', 'pascal-case', 'upper-case'],
    ],
    'subject-empty': [2, 'never'],
    'subject-full-stop': [2, 'never', '.'],
    'type-case': [2, 'always', 'lower-case'],
    'type-empty': [2, 'never'],
    'type-enum': [
      2,
      'always',
      [
        'build',
        'chore',
        'ci',
        'docs',
        'feat',
        'fix',
        'perf',
        'refactor',
        'revert',
        'style',
        'test',
        'translation',
        'security',
        'changeset',
      ],
    ],
  },
};
```

Feel free to try some commits that *don't* follow the rules and see how they are not accepted, and you receive feedback that is designed to help you correct them.

I'm going to create a new commit now with the message `ci: implement commitlint`.

You can see the result of the complete culmination of this setup in the screenshot below, hopefully yours looks similar:

![Dev Experience](https://res.cloudinary.com/dqse2txyi/image/upload/v1649129725/blogs/nextjs-fullstack-app-template/dev-experience_wznie9.png)

## Setting up Directory Structure

This section is now going to cover setting up the folder structure in our project.  This is one of those topics that many people will have *extremely strong opinions about*, and for good reason!  Directory structure can really make or break a project in the long term when it gets out of control, especially when fellow team members have to spend unnecessary time trying to guess where to put things (or find things).

I personally like to take a fairly simplistic approach, keep things separated basically in a class model/view style.  We will be using three primary folders:

```
/components
/lib
/pages
```

- `component` - The individual UI components that make up the app will live in here
- `lib` - Business/app/domain logic will live in here.
- `pages` - Will be the actual routes/pages as per the required NextJs structure.  

We will have other folders in addition to this to support the project, but the core of almost everything that makes up the unique app that we are building will be housed in these three directories.

Within `components` we will have subdirectories that kind of group similar types of components together.  You can use any method you prefer to do this.  I have used the MUI library quite a bit in my time, so I tend to follow the same organization they use for components in [their documentation](https://mui.com/getting-started/installation/)

For example inputs, surfaces, navigation, utils, layout etc.  

You don't need to create these directories in advance and leave them empty.  I would just create them as you go while building your components.  

This section is simply designed to explain how I will be setting up this project, there are many other ways you might choose to organize yours and I would encourage you to choose whatever works best for you and your team.  

At this point I will be making a commit with message `rfc: create directory structure`

## Adding Storybook

One of the great modern tools available to us if you aren't already familiar with it is called [Storybook](https://storybook.js.org/).

Storybook gives us an environment to show off and test the React components we are building outside of the application we are using them in.  It's  great tool to connect developers with designers and be able to verify components we have developed look and function as per design requirements in an isolated environment without the overhead of the rest of the app.

Note that Storybook is meant as a visual testing tool, we will be implementing other tools later for functional unit testing and end-to-end testing.  

The best way to learn how to use Storybook is installing it and trying it out!

```
npx sb init --builder webpack5
```

We'll be using the webpack5 version to stay up to date with the latest version of webpack (I'm unsure why it is still not yet the default.  Maybe it will be by the time you are using this tutorial).

When Storybook installs it automatically detects a lot of things about your project, like how it is a React app, and other tools you are using.  It should take care fo all that configuration itself.  

If you get a prompt about the eslintPlugin, you can say "yes".  We are going to configure it manually though, so no worries if you get a message saying it didn't auto-configure.

Open up `.eslintrc.json` and update it to the following:

`.eslintrc.json`
```json
{
  "extends": [
    "plugin:storybook/recommended", // New
    "next",
    "next/core-web-vitals",
    "eslint:recommended"
  ],
  "globals": {
    "React": "readonly",
  },
  // New
  "overrides": [
    {
      "files": ["*.stories.@(ts|tsx|js|jsx|mjs|cjs)"],
      "rules": {
        // example of overriding a rule
        "storybook/hierarchy-separator": "error"
      }
    }
  ],
  "rules": {
    "no-unused-vars": [1, { "args": "after-used", "argsIgnorePattern": "^_" }]
  }
}
```

I have added `// New` to mark the two new sections and lines that are Storybook specific.  

You'll notice that Storybook has also added as `/stories` directory to the root of your project with a number of examples in.  If you are new to Storybook I highly recommend you look through them and leave them there until you are comfortable creating your own without the templates.  

Before we run it we need to make sure we are using webpack5.  Add the following to your `package.json` file:

`package.json`
```json
{
  ...
  "resolutions": {
    "webpack": "^5"
  }
}
```

Then run

```
yarn install
```

To ensure webpack5 is installed.


Lastly, just before we run Storybook itself, we have to update the `.storybook/main.js` file:

`storybook/main.js`
```js
module.exports = {
  stories: ['../**/*.stories.mdx', '../**/*.stories.@(js|jsx|ts|tsx)'],
  /** Expose public folder to storybook as static */
  staticDirs: ['../public'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
  ],
  framework: '@storybook/react',
  core: {
    builder: '@storybook/builder-webpack5',
  },
};
```

Here we have changed the pattern for stories files so that it will pick up any `.stories` files inside our components (or other) directories.  

We have also exposed NextJs's "public" folder as a static directory so we can test things like images, media, etc in Storybook.

Now we are ready to test it.  Run:

```
yarn storybook
```

If all goes well you'll see a message in your console that looks like:

![Storybook Started](https://res.cloudinary.com/dqse2txyi/image/upload/v1649131564/blogs/nextjs-fullstack-app-template/storybook-started_ydsrdg.png)

And you'll be able to access it on [http://localhost:6006](http://localhost:6006)

![Storybook Main](https://res.cloudinary.com/dqse2txyi/image/upload/v1649131644/blogs/nextjs-fullstack-app-template/storybook-main_yktgqh.png)

I would encourage you to play around and get familiar with the examples if you've never used it before.  

At this stage I'll be making a commit with message `build: implement storybook`.

## Creating Our Component Template

It's time to bring together all the configuration we have done and look at how we might create and implement our first component using the standards we have set for ourselves.  

We'll just create a simple card.  Create the following directory structure:

`/components/templates/base`

And inside that directory we'll create `BaseTemplate.tsx`.  This will follow a standard pattern of filename matching the directories leading up to it.  This allows us for example to have other types of cards in the `cards` directory like `PhotoCard` or `TextCard` etc.

`BaseTemplate.tsx`
```tsx
export interface IBaseTemplate {}

const BaseTemplate: React.FC<IBaseTemplate> = () => {
  return <div>Hello world!</div>;
};

export default BaseTemplate;
```

Every single one of our components is going to follow this exact structure.  Even if it does not use props it will still export an empty props interface for the component.  The reason for this is it will allow us to replicate this exact structure across many components and files, and interchange components/imports using the same expected pattern and just find/replace the names of the components.  

When you begin working with the stories and mock props etc it will become quickly apparent how convenient and powerful it is to maintain a consistent naming scheme and interface for all your component files.

This goes back to the **consistency is everything** point we made earlier.  

Next I am going to make a style module file that lives next to the component.  By default NextJs gives you a `/styles` directory which I personally do not use, but if you prefer to keep all your styles in the same place that's a fine choice.  I just prefer to keep them with the components.

`BaseTemplate.module.css`
```css
.component {
}
```

As a standard empty template for where your top level styles will go on your component.  You can update your `BaseTemplate` as follows:

`BaseTemplate.tsx`
```tsx
import styles from './BaseTemplate.module.css';

export interface IBaseTemplate {}

const BaseTemplate: React.FC<IBaseTemplate> = () => {
  return <div className={styles.container}>Hello world!</div>;
};

export default BaseTemplate;
```

Now we have a clean template for our styling.

Let's add an example prop to our template so we can handle the standard we'll be using for components props:

`BaseTemplate.tsx`
```tsx
import styles from './BaseTemplate.module.css';

export interface IBaseTemplate {
  sampleTextProp: string;
}

const BaseTemplate: React.FC<IBaseTemplate> = ({ sampleTextProp }) => {
  return <div className={styles.container}>{sampleTextProp}</div>;
};

export default BaseTemplate;
```

With each component we create we're going to want a very quick and easy way to test it in different environments (Storybook for examaple, but also the app, and maybe our unit tests).  It will be handy to have quick access to data to render the component.  

Let's create a file to store some mock data for this component to use for testing:

`BaseTemplate.mocks.ts`
```ts
import { IBaseTemplate } from './BaseTemplate';

const base: IBaseTemplate = {
  sampleTextProp: 'Hello world!',
};

export const mockBaseTemplateProps = {
  base,
};
```

This structure may seem a bit convoluted, but we'll see the benefits soon.  I am using very intentional consistent naming patterns so this template is very easy to copy and paste to each new component you create.

Now let's create a  create a story for this component:

`BaseTemplate.stories.tsx`
```tsx
import { ComponentStory, ComponentMeta } from '@storybook/react';
import BaseTemplate, { IBaseTemplate } from './BaseTemplate';
import { mockBaseTemplateProps } from './BaseTemplate.mocks';

export default {
  title: 'templates/base',
  component: BaseTemplate,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
} as ComponentMeta<typeof BaseTemplate>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof BaseTemplate> = (args) => (
  <BaseTemplate {...args} />
);

export const Base = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args

Base.args = {
  ...mockBaseTemplateProps.base,
} as IBaseTemplate;
```

I'm not going to get into all the details of what each different part of a `stories` file entails, for that your best resource is the official Storybook documentation.

The goal here is to create a consistent easily copy/paste-able pattern of component building and testing.  

Let's try this one out.  Run:

```
yarn storybook
```

If all goes well you will be greeted by your fine looking base component (if not I encourage you to revisit the previous section and check if you missed any of the configurations).

![Storybook Base Template](https://res.cloudinary.com/dqse2txyi/image/upload/v1649133832/blogs/nextjs-fullstack-app-template/storybook-base-template_uwna7h.png)

Now I will make a commit with message `build: create BaseTemplate component`