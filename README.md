# sw-extract 
[![NPM](https://nodei.co/npm/sw-extract.png)](https://nodei.co/npm/sw-extract/)

[![Build Status](https://travis-ci.com/AmineYagoub/sw-extract.svg?branch=master)](https://travis-ci.com/AmineYagoub/sw-extract)
[![Coverage Status](https://coveralls.io/repos/github/AmineYagoub/sw-extract/badge.svg?branch=master)](https://coveralls.io/github/AmineYagoub/sw-extract?branch=master)
![node-current](https://img.shields.io/node/v/sw-extract?style=flat)
> A simple javascript stopwords extractor with 0 dependencies. [demo](https://amineyagoub.github.io/sw-extract-demo/)
# Installation

### NPM

```bash
npm install sw-extract --save
```

### CDN
`https://unpkg.com/sw-extract@latest/dist/sw-extract.umd.min.js`

### Usage with a bundler
To use sw-extract with Webpack, Parcel or other bundler

```js
import Keywords from 'sw-extract';

const text = 'Your Text...'
const options = {...}
const result = Keywords(text, options).toArray();
```

### Usage in Browser directly
```html
<script src="https://unpkg.com/sw-extract@latest/dist/sw-extract.umd.min.js"></script>
<body>
  ...
</body>
<script>
  const text = 'Your Text...'
  const options = {...}
  const result = Keywords(text, options).toArray();
</script>
```
### Using Options
```javascript
{
    lang: 'en',          // Use english stopwords list (available languages: ar, en, fr)
    length: null,        // Set the length of the returned result (default return all result)
    wordLength: 3,       // Set the length of the returned words (default is <= 3 chars)
    unique: true,        // Removes the duplicate keywords if set to true
    digits: false,       // Includes all digits if set to true
    toLower: false,      // Lower-cased all extracted keywords if set to true
    onlyDuplicate: false // Return only duplicated keywords if set to true
}
```
## Credits

**The Stopwords sources:**

- [Arabic](https://github.com/6/stopwords-json)
- [English](https://dev.mysql.com/doc/refman/8.0/en/fulltext-stopwords.html)
- [French](https://github.com/6/stopwords-json)

# License

### MIT

Use and abuse at your own risk.