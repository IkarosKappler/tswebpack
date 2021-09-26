# tswebpack
A basic typescript and webpack setup with cjs and esm target bundling.

## TypeScript or Babel?
Both, the official TypeScript compiler `tsc` and Babel transpile TypeScript files `*.ts` to JavaScript. I decide
to use `tsc` as this is the official transpiler by the maintainer Microsoft.

If you prefer to use Babel I recommend to take a look at this quick tutorial:
https://dev.to/remshams/rolling-up-a-multi-module-system-esm-cjs-compatible-npm-library-with-typescript-and-babel-3gjg


## Install Typescript
```
npm install typescript
```

## Configure TypeScript
```tsconfig.json
{
    "compilerOptions": {
        "target": "es5",
        "module": "commonjs",
		"lib": [ "es2015", "dom" ],
		
		"sourceMap": true,
		"declaration": true,

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
```
tsc -p tsconfig.json
```

This will transpile your `.ts` files to JavaScript files in `./src/cjs/`. Note that these are CommonJS (`cjs`) modules.

If you want to create, let's say `esm` modules, you may change the `target` option to `"ES2015"` and `module` option
to `"ESNext"`. This is also possible to override the settings in the `tsc` command:
```
tsc -p tsconfig.json --target ES2015 --module ESNext --outdir src/esm/ --moduleResolution node
```


## Bundling: why?
Bundling your project means to pack all your generated files up into one single JavaScript library file.
Some people still like to load the `cjs` version (which is the web browser compatible version) directly
into their HTML file using `<script src="...">` tags.

I have seen people who add the bundle into their repository, some don't.

It's up to you, but imagine that not everone has a build chain set up and ready and maybe just want
to have a peek into your library. Imagine there is a bundled file that's ready to be used out of the box.

So let's bundle our project.


## Bundling: Rollup or webpack
Even though I had a good resultss with Rollup.js I am somehow more familiar with webpack and prefer
to use that one.

```
npm install webpack webpack-cli terser-webpack-plugin
```
Note: let's also install the terser plugin which gives us a bit more control over the generated output.


```
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

## Scripts
```
npm run compile:cjs
```
Emits the CommonJs `cjs` Javascript files into the `./src/cjs/` directory.

```
npm run compile:esm
```
Emits the ES2016 module `esm` Javascript files into the `./src/esm/` directory.

```
npm run webpack:dev
```
Bundles the `cjs` files into a development package (non minified) into `./dist/tswebpack.js`. Note that
`tswebpack` is the package name from the `package.json` file.

```
npm run webpack:prod
```
Bundles the `cjs` files into a production package (minified=all unneeded whitespace removed) into 
`./dist/tswebpack.min.js`.



### Current versions
At the time of writing this these are the versions I used:
```
...
"typescript": "^4.4.3"
"webpack": "^5.54.0",
"webpack-cli": "^4.8.0"
...
```
