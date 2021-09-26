# tswebpack
A basic typescript and webpack setup with cjs and esm target bundling.

## TypeScript or Babel?
Both, the official TypeScript compiler `tsc` and Babel transpile TypeScript files `*.ts` to JavaScript. I decide
to use `tsc` as this is the official transpiler by the maintainer Microsoft.

If you prefer to use Babel I recommend to take a look at this quick tutorial:
https://dev.to/remshams/rolling-up-a-multi-module-system-esm-cjs-compatible-npm-library-with-typescript-and-babel-3gjg


## Install Typescript
```bash
npm install typescript
```

## Configure TypeScript
Create a file `tsconfig.json` in your project's root directory.
```json5
{
    "compilerOptions": {
        "target": "es5",
        "module": "commonjs",
		"lib": [ "es2015", "dom" ],
		
		"sourceMap": true,
		"declaration": true,

        // Additional settings to your fancy
		"allowJs": false,
		"forceConsistentCasingInFileNames": true,
		"noImplicitReturns": false,
		"noImplicitThis": false,
		"noImplicitAny": false,
		"strictNullChecks": false,
		"suppressImplicitAnyIndexErrors": true,
		"noUnusedLocals": false,
		"noUnusedParameters": false
    },
    "include": ["./src/ts/**/*.ts"],
    "exclude": ["./dist", "node_modules"],
    "removeComments": false
}
```

## Run `tsc`
```bash
tsc -p tsconfig.json
```

This will transpile your `.ts` files to JavaScript files in `./src/cjs/`. Note that these are CommonJS (`cjs`) modules.

If you want to create, let's say `esm` modules, you may change the `target` option to `"ES2015"` and `module` option
to `"ESNext"`. This is also possible by overriding the settings in the `tsc` command itself, so you don't need two 
separated config files:
```bash
tsc -p tsconfig.json --target ES2015 --module ESNext --outdir src/esm/ --moduleResolution node
```

Take a look a the demo files in `./src/ts/`:
* `index.ts` (exports all your stuff that should be exposed)
* `myclasses.ts` (a class demo)
* `myconstants.ts` (some constants)
* `myfunction.ts` (two functions, a basic one and a secoond one that uses an external function from node_modules)

Afer the `tsc` command was run the `./src/ts/*.ts` TypeScript files have been transpiled to JavaScript files
in `./src/cjs/*.js`.


## Bundling: why?
To bundle your project means to pack all your generated files up into one single JavaScript library file.
Some people still like to load the `cjs` version (which is the web browser compatible version) directly
into their HTML document using `<script src="...">` tags.

I have seen people who add the bundle into their repository, some don't.

It's up to you, but imagine that not everyone has a build chain set up and ready and maybe just want
to have a peek into your library. Imagine there is a bundled file that's ready to be used out of the box.

So let's bundle our project.


## Bundling: Rollup or webpack
Even though I had good results with Rollup.js I am somehow more familiar with webpack and prefer
to use that one.

```bash
npm install webpack webpack-cli terser-webpack-plugin
```
Note: let's also install the terser plugin which gives us a bit more control over the generated output.


### Create the webpack config
Create the file `webpack.config.js`. Note that this webpack config is a bit dynamic
as is reacts on the `env` settings (`development` or `production`). We use this switch
to emit different builds for the dev environment (non-minified, larger file size) and the 
production environment (minified, small file size).
```js
const path = require('path');
const TerserPlugin = require("terser-webpack-plugin");
const { name } = require("./package.json");

module.exports = ({
  return {
    entry: './src/cjs/entry.js',
    mode: env.development ? "development" : "production",
    output: {
      filename: name + (env.development ? '' : '.min') + '.js',
      path: path.resolve(__dirname, 'dist'),
    },
    // Add this line to get the ./dist/build.js.map file
    devtool: "source-map",
    optimization: {
      minimize: !env.development,
      minimizer: [
          // extractComment=false to prevent the generation of License.txt
          new TerserPlugin({extractComments: false})
      ],
    }
  }
});
```

### Webpack's entry point
Take a look at the `./src/cjs/entry.js` file:
```js
// Expose all your components to the global scope here.

globalThis.MyClass = require("./myclasses").MyClass;
```
This file is not generated, you will have to maintain it manually each time you add new components.

In this file you should bind all components/classes/functions/constants to the global scope which 
your global app needs. The global scope which is `window` in the browser, or in a more general 
case `globalThis` (keep compatible with node environments which do not know the `window` instance).



### Running webpack
```bash 
npx webpack --config webpack.config.js
```


## Scripts
```bash
npm run compile:cjs
```
Emits the CommonJs `cjs` Javascript files into the `./src/cjs/` directory.

```bash
npm run compile:esm
```
Emits the ES2016 module `esm` Javascript files into the `./src/esm/` directory.

```bash
npm run webpack:dev
```
Bundles the `cjs` files into a development package (non minified) into `./dist/tswebpack-main.js`. Note that
`tswebpack` is the package name from the `package.json` file.

```bash
npm run webpack:prod
```
Bundles the `cjs` files into a production package (minified=all unneeded whitespace removed) into 
`./dist/tswebpack-main.min.js`.


## Code splitting and the `vendor` chunk
There is a caveat you will notice when you use external libraries (usually from the `node_modules`
directory): *webpack will bundle these libraries into your build, too!* This will blow
up your code and harbours the danger of duplicate libraries being loaded if a different
script includes the same libs.

One the one hand this js totally legitimate, because these parts are required to get your code
running, and maybe you only have one single build containing everything you'll need, which
is typical for larger web applications.

On the other hand you might wish to have shared libraries installed by your own (like a global jQuery, 
Axios, Bootstrap, Three, Paperjs, Twojs, TweenMax, ...), because they might be used by other code fragments 
too which are not bundled here.

The solution for this is: code chunking.

Add this to the `optimization` part:
```json5
optimization {
    // ...
    splitChunks: {
        cacheGroups: {
          vendor: {
            test: /node_modules/,
            chunks: 'initial',
            name: 'vendor',
            enforce: true
          },
        }
    } 
    // ...
}
```

This will result in two separate files being emitted into `./dist/`:
* tswebpack-main.js
    * Containing your code only
* tswebpack-vendor.js
    * Containing the code that's required from your `./node_modules/`


### Current versions
At the time of writing this these are the versions I used:
```
...
"typescript": "^4.4.3"
"webpack": "^5.54.0",
"webpack-cli": "^4.8.0"
...
```


Have fun and don't forget to support your friends!
