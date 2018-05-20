[![npm version](https://badge.fury.io/js/rivets-utilify.svg)](https://badge.fury.io/js/rivets-utilify)
[![David](https://david-dm.org/zeindelf/rivets-utilify.svg)](https://github.com/Zeindelf/rivets-utilify)

# RivetsUtilify

Rivets formatters based on [RivetsStdlib](https://github.com/matthieuriolo/rivetsjs-stdlib) for using with [UtilifyJS](https://github.com/Zeindelf/utilify-js)

## Table of contents

- [Main](#main)
- [Getting started](#getting-started)
- [Formatters](#formatters)
- [License](#license)
- [Dependencies](#dependencies)
- [Credits](#credits)

## Main

```text
dist/
├── rivets-utilify.js        (UMD)
├── rivets-utilify.min.js    (UMD, compressed)
├── rivets-utilify.common.js (CommonJS, default)
└── rivets-utilify.esm.js    (ES Module)
```

## Getting started

### Direct download

Download the script [here](https://github.com/Zeindelf/rivets-utilify-js/blob/master/dist/rivets-utilify.min.js) and include it.

```html
<script type="text/javascript" src="//cdnjs.cloudflare.com/ajax/libs/rivets/0.9.6/rivets.bundled.min.js"></script>
<script type="text/javascript" src="utilify.min.js"></script>
<script type="text/javascript" src="rivets-utilify.min.js"></script>
```

### Package Managers

RivetsUtilify supports [npm](https://www.npmjs.com/package/rivets-utilify) under the name `rivets-utilify`.

```shell
npm install rivets-utilify --save
```

### Module Loaders

RivetsUtilify can also be loaded as an CommonJS or ES6 module (recomended).

```js
// CommomJS
var RivetsUtilify = require('rivets-utilify');

// ES6 module
import RivetsUtilify from 'rivets-utilify';
```

### Usage

With UMD (Universal Module Definition), the package is available on global var `RivetsUtility`.

```js
// Initialize UtilifyJS
var utilify = new UtilifyJS();

// Initialize RivetsUtilify
var rivetsUtilify = new RivetsUtilify(utilify)
```

## Formatters

Formatters docs can be found on original [RivetsStdlib](https://github.com/matthieuriolo/rivetsjs-stdlib)


## License

RivetsUtilify is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).


## Dependencies

Rivets.js 0.9.6+

UtilifyJS 0.3.5+


## Credits

Special thanks to [Matthieu Riolo](https://github.com/matthieuriolo) and all contributors of RivetsStdlib