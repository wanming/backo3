# backo3

  Simple exponential backoff because the others seem to have weird abstractions.
  
  It's based on [backo2](https://github.com/mokesmokes/backo), The difference is as follows.
  
  1. Rewrite with TypeScript
  1. Fixed the bug that duration() might return 0 when called many times with jitter parameters

## Installation

```bash
$ npm install backo3
```

## Options

 - `min` initial timeout in milliseconds [100]
 - `max` max timeout [10000]
 - `jitter` [0]
 - `factor` [2]

## Example

```js
var Backoff = require('backo3');
var backoff = new Backoff({ min: 100, max: 20000 });

setTimeout(function(){
  something.reconnect();
}, backoff.duration());

// later when something works
backoff.reset()
```

## License

MIT
