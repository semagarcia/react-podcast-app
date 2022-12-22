# Podcaster

This application will show the list of the most famous podcasts (according iTunes) and listening their episodes.
The app is built with React plus a set of different tools (for styling, documentation, etc.); that and other
information of interest will be described in the following sections.

## Environment

This app has been developed using NodeJS v14.X.X as runtime. In higher versions it could works, but it's not guaranteed.

## How execute the app

For serving locally the app (assuming the repo has been cloned), you should follow these steps:
1. Install dependencies: `npm i` or `yarn`
2. Launch the app: `npm start`
3. The app will be opened automatically in your default browser; otherwise, if none errors appear in the console,
the app can be found on `http://localhost:3000` (check the port 3000 is not in use)

#### **Important note**
Due to the lack of header CORS in our requests, we need to use some external service which allow us to consume
iTunes endpoints. In order to do that, all HTTP requests will be bypassed through an Heroku app; however, this
step requires to visit [this site](https://cors-anywhere.herokuapp.com/corsdemo) and request a temporary access
in order to enable it.


## How to build the app
We can build the app in two different ways.

### Development mode
It's the same build that's used for serving locally the app.
```
npm run build:dev
```
By the default, the app is always run in the development mode. That means:
- Any kind of optimizations (code, assets...)
- Local server with HTTP1.1 & HTTP (non secure transport)
- An analysis of the bundle in terms of modules & dependencies weights (using a visual HTML file in a local server)

### Production mode
This compilation way is intented for deploying the app to the end-user and publishing it
```
npm run build:prod
```
That mode means:
- A bundle with third-party dependencies is generated in order to take advantage of some techniques, like client-side
browser caching, avoid re-generation (if deps don't change or their versions are not updated)
- SourceMaps generated with high-quality for debugging built code with original files (those source maps should be
deployed internally for avoiding non-desired debugging activies or source inspections)
- SCSS preprocessing, concatenation and optimization (like removing comments)
- Bundle stats generation, in order to analyse the weight of the app (own code and 3rd party code) in JSON format
(embeddable in CI pipelines and monitorized)
- A check of performance metrics, like max file size, throwing an error if the limit is reached, stopping the build process


## How to test de app
WIP (unit testing + coverage + e2e + A11Y + snapshots)
```
npm run test
npm run test:watch
npm run test:coverage
npm run test:e2e
npm run test:accessibility
npm run test:snapshots
```


## How to work with the repo and contribute
You can contribute to the repo and improve its functionality. In order to do that, you should have in mind that there's
some checks that are applied before merging the code.

### Git checks
There are three main hooks used for performing checks, like:
- The code is added / staged: lint and prettier the code (older and new)
- The code is committed: the message used in the commit to guarantee an standard and facilitate changelog generation
- The code is pushed: so, we need before to assert that code will continue being valid prior to be merged with the
stable one (upper branches)

### Linting
Linting is the automated checking of your source code for programmatic and stylistic errors. This is done by using
a lint tool (otherwise known as linter). It's important to reduce errors and improve the overall quality of your code.
Using lint tools can help you accelerate development and reduce costs by finding errors earlier.

This action is performed automatically when the code will be committed, but it can also be checked executing:
```
npm run lint
```

### Coding style (code formatting)
It helps to reduce all the original and personal code styling in order to ensures that all the outputted code
conforms to a consistent style.
```
npm run format
```

### Git messages
The Conventional Commits specification is a lightweight convention on top of commit messages. It provides an
easy set of rules for creating an explicit commit history; which makes it easier to write automated tools on
top of. This convention dovetails with SemVer, by describing the features, fixes, and breaking changes made in
commit messages.

### Editor configuration
EditorConfig helps maintain consistent coding styles for multiple developers working on the same project across
various editors and IDEs. The EditorConfig project consists of a file format for defining coding styles and a
collection of text editor plugins that enable editors to read the file format and adhere to defined styles.
EditorConfig files are easily readable and they work nicely with version control systems.

The repo is configured with a set of editor's rules and configuration, in order to allow developers have the
same setup just installing an IDE-extension. Other useful extensions could be for automatic linting and formatting
(among others).

### Releasing new version
In systems with many dependencies, releasing new package versions can quickly become a nightmare. If the
dependency specifications are too tight, you are in danger of version lock (the inability to upgrade a package
without having to release new versions of every dependent package). If dependencies are specified too loosely,
you will inevitably be bitten by version promiscuity (assuming compatibility with more future versions than is
reasonable). Dependency hell is where you are when version lock and/or version promiscuity prevent you from easily
and safely moving your project forward.

As a solution to this problem, we propose a simple set of rules and requirements that dictate how version numbers
are assigned and incremented considering a version format of X.Y.Z (major.minor.patch), taking care of
- Patches and bug fixes that implies no API changes (increment of patch version)
- Backwards compatibility API additions/changes (increment of minor version)
- Backwards incompatible API changes increment (increment of major version)


## Code documentation
### Visual / UI Components
In most cases, the common visual components are developed, tested and released as an independent library, to be
consumed as a dependency. In this repo, those components are together, but we could check a very realistic approach
thanks to `storybook`, a tool that acts like a workshop, providing an isolated iframe where render components
without interference from app business logic and context. That helps you focus development on each variation of a
component, even the hard-to-reach edge cases.

In order to interact with that "visual library", you can execute the following command in order to open a new
browser window with a basic implementation:

```
npm run storybook
```

In case of CI terms, we can execute the `npm run storybook:build` for building a static version of the storybook, which
could be deployed in a shared server for developer community.

### Technical components / libraries / architectural parts
There are a lot of other components that worth to be documented, but in that case, we have a huge possibilities. Even
we could implement our own custom developer platform for documentation purposes.

## Other improvements
### Babel integration and support
Babel is a toolchain that is mainly used to convert ECMAScript 2015+ code into a backwards compatible version of
JavaScript in current and older browsers or environments. The target will be the last version of Chrome, so, we
can get the benefits of Babel for transforming new ES syntax and source code transformations.

### I18N capabilities
At this moment, the application doesn't offer this functionality. In case of that need, we could evaluate
libraries, like `i18next` (among others).

### Corporate Design System
SCSS preprocessor has been implemented in order to take advantages of design systems, like the use of tokens (such
as colors, sizes -margins, paddings-, typographies, etc.)

UX team usually release those token definitions, and with the help of a dev team, a NPM library could be implemented
and released to be consumed by front-end projects. This library will have variables that represents those tokens along
as other utils, like converting *rem* into *px* units for instance.

The tokens can be implemented through *SCSS variables* or *CSS Custom Properties*, according to other architectural
decisions. In this repo, you can find a couple of examples of that variables using SCSS.


## Thinking on the DX: How to configure environment (Developer eXperience)
We cannot forgot a basic pillar in the development process: the developer. We want to improve its experience using
some IDE well-known extensions, according to the used or choosen editor. For most used one, Visual Studio Code, we
suggest:
- EditorConfig
- ESLint
- Prettier
- GitLens, Git Graph & Git History
- Thunder Client
- Simple React Snippets
- Trailing Spaces
