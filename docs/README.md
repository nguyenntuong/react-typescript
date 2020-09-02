This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).<br />
More feature details in [FEATURES.md](./FEATURES.md).<br />
Tools recommended details in [TOOLS.md](./TOOLS.md).<br />

## Getting started

If you want push to a new repository. In the project directory:

-   `rm .git`. To remove this repo and also remove all commit history.
-   `git init`. To add your own repo for this project.
-   `npm i`. To install all deps if not dot it yet.
-   `npx husky`. To init pre-commit features was configed for this project, this command make that feature work again.
-   Finally, you can push all this code to your new remote repository.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

##### Debugging ( only on Visual Studio Code feature )

-   When run `npm start` you can debugging inside the editor without using the browser.
-   Make sure `npm start` was ran first after that, press `F5` to start a debugging session or `Ctrl + Shift + D` for debug mode selection, if debugging mode can't start, please select your browser you using in debug `RUN` dropdown and try again, currently just support for `Chrome` , `MSEdge [Chromiun]` and `Firefox`.

### `npm run start:prod`

Runs the app in the production build.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `npm run start:prod:prof`

Runs the app in the production build and support react profiler.<br />
Open [http://localhost:3000](http://localhost:3000) to view and profiler it in the browser with [React Developer Tools](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi) was installed.

### `npm run test`

Launches all test runner and generate the coverage report for whole project.<br />

### `npm run test:watch`

Launches the test runner in the interactive watch mode, any change will rerun the test.<br />

### `npm run test:debug`

Launches the test runner in the interactive debug mode.<br />
You can also use this mode in menu debugging of Visual Studio Code when run a normal test press `Ctrl + Shift + D` for selection.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run test:update`

Update your snapshot test

### `npm run lint`

Lint all the code misstask in the project file include `css`, `scss`, `sass`, `js`, `jsx`, `ts`, `tsx`. <br />
Support for precondition check before a new change will commit by developer.

### `npm run lint:fix`

Lint and fix all the fixable code misstask in the project file include `css`, `scss`, `sass`, `js`, `jsx`, `ts`, `tsx`. <br />
Support for manualy run or auto run before a new change will commit by developer.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run analyze`

Analyze the source code after production build in details.

### `npm run build:analyze`

Combie Build and Analyze the source code after production build in details.

## Deploy

The source code after run `npm run build` will avaiable in `/build` folder and ready for deploy. Just put it in the web root folder of server. Ex: `wwwroot`

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
