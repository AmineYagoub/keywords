# sw-extract 
[![Build Status](https://travis-ci.com/AmineYagoub/keywords-extract.svg?branch=master)](https://travis-ci.com/AmineYagoub/keywords-extract)
[![Coverage Status](https://coveralls.io/repos/github/AmineYagoub/keywords-extract/badge.svg?branch=master)](https://coveralls.io/github/AmineYagoub/keywords-extract?branch=master)
> A simple javascript stopwords extractor with 0 dependencies. [demo](https://amineyagoub.github.io/keywords-extract-demo/)
# Installation

### NPM

```bash
npm install sw-extract --save
```

### CDN
`https://unpkg.com/sw-extract@1.0.0/dist/sw-extract.umd.min.js`

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
    length: null,        // Set the length of the returned result (if null return all result)
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