# Book List - List of my favourite books.

### A single page web application developed to demonstrate the full stack architecture using React, Node JS and Express. As of now, the data (books list) is stored in-memory.

## More details on the source code structure:

1. The sources of both the client and server are placed within the **src** folder.
   - The client-side are available within the **src\components** folder.
   - The server-side are available within the **src\server** folder.
2. Client-side code organization:
   - All the components are placed within their respective folder to have a clear separation.
   - Components, constants referred in other components are placed within the **common** folder.
   - Few notable libraries used:
   -- Axios: Library for interacting with the server-side for fetching data.
   -- Bootstrap: CSS Framework for styles and responsive design.
3. Server-side code organization:
   - The data is stored in-memory to be keep the solution simple.
   - BooksServices.js provides the necessary api for fetching data from the client-side.
     - The images are placed separately in the public folder and served using express.static functionlity.
     - Express provides the server functionality and listens on the configured port.

## SETUP

1. **Install [Latest version of Node](https://nodejs.org)** if not already installed. Node version starting from 8 and greater should be fine.
2. Install the node packages as follows:
   - **Navigate to this project's root directory on the command line.**
   - **Type** - `npm install` - this should install all the dependencies.

## Running the application:

1. Navigate to this project root folder if you're not already in that location.
2. To run in **development mode**, do the following:
   - Type **npm run start** and press enter. This commands in parallel builds the application and starts the node server.
   - In the browser, in a new tab, type "http://localhost:3000" and press enter.
   - By now, the home page should be visible, link on the menus at the top to navgiate through the application.
3. To run in **production mode**, do the following:
   - Type **npm run build** and press enter. This commands in parallel builds the application and starts the node server.
   - In the browser, in a new tab, type "http://localhost:3000" and press enter.
   - By now, the home page should be visible, link on the menus at the top to navgiate through the application.

_Note: The data required for the application are in-memory. There are no external test data at this moment._

## Future improvements:

1. The server side will be replaced by spring-boot.
2. The mongodb will be used for storing the data.

## Dependencies

### Production Dependencies

| **Dependency**   | **Use**                                              |
| ---------------- | ---------------------------------------------------- |
| bootstrap        | CSS Framework                                        |
| prop-types       | Declare types for props passed into React components |
| react            | React library                                        |
| react-dom        | React library for DOM rendering                      |
| react-router-dom | React library for routing                            |
| express          | API and serves static files                          |
| cors             | To enable cross-origin requests                      |
| body-parser      | Node.js Body parsing middleware                      |

### Development Dependencies

| **Dependency**          | **Use**                                                          |
| ----------------------- | ---------------------------------------------------------------- |
| @babel/core             | Transpiles modern JavaScript so it runs cross-browser            |
| babel-eslint            | Lint modern JavaScript via ESLint                                |
| babel-loader            | Add Babel support to Webpack                                     |
| babel-preset-react-app  | Babel preset for working in React. Used by create-react-app too. |
| css-loader              | Read CSS files via Webpack                                       |
| cssnano                 | Minify CSS                                                       |
| eslint                  | Lints JavaScript                                                 |
| eslint-loader           | Run ESLint via Webpack                                           |
| eslint-plugin-import    | Advanced linting of ES6 imports                                  |
| eslint-plugin-react     | Adds additional React-related rules to ESLint                    |
| html-webpack-plugin     | Generate HTML file via webpack                                   |
| http-server             | Lightweight HTTP server to serve the production build locally    |
| mini-css-extract-plugin | Extract imported CSS to a separate file via Webpack              |
| npm-run-all             | Display results of multiple commands on single command line      |
| postcss-loader          | Post-process CSS via Webpack                                     |
| rimraf                  | Delete files and folders                                         |
| style-loader            | Insert imported CSS into app via Webpack                         |
| webpack                 | Bundler with plugin ecosystem and integrated dev server          |
| webpack-bundle-analyzer | Generate report of what's in the app's production bundle         |
| webpack-cli             | Run Webpack via the command line                                 |
| webpack-dev-server      | Serve app via Webpack                                            |
