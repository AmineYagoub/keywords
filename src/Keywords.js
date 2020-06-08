export default class Keywords {
#supportedLang = ['arabic', 'english', 'french'];
#stopWords;
#str;
#options;

/**
* Keywords constructor.
*
* @param str
* @param stopWords
* @param options
*/
constructor (str, stopWords, options = {}) {
  this.#stopWords = stopWords
  this.#str = str
  this.#options = {
    ...{
      lang: 'en',
      length: null,
      unique: true,
      digits: false,
      toLower: false,
      onlyDuplicate: false
    },
    ...options
  }
}

/**
* Get keywords as array.
*
* @returns Array
*/
toArray () {
  return (typeof this.#str !== 'string' || !this.#str.trim().length)
    ? []
    : this.stripStopWords(this.stripNonAlphaNum().split(/\s/))
}

/**
* Strip HTML Tags and non AlphaNum.
*
* @returns String
*/
stripNonAlphaNum () {
  return this.#str
    .replace(/(<([^>]+)>)/ig, '')
    .replace(/[^٠١٢٣٤٥٦٧٨٩0-9A-ZÀÂÆÇÉÈÊËÏÎÔŒÙÛÜŸءآأؤإئابةتثجحخدذرزسشصضطظعغفقكلمنهوىيًٌٍَُِّْٰ]+/ig, ' ')
}

/**
* Strip stop words.
*
* @param target
*
* @returns Array
*/
stripStopWords (target) {
  const { lang } = this.#options
  const words = this.#stopWords[lang]
  if (!Array.isArray(words)) {
    throw new Error(`Language must be one of: "${this.#supportedLang.join(', ')}"`)
  }
  const result = target.filter(
    word => words.filter(v => v.localeCompare(word, lang, { sensitivity: 'base' }) === 0).length === 0
  )
  return this.applyOptions(result)
}

/**
*
* @param target
*
* @returns Array
*/
applyOptions (target) {
  const { toLower, unique, onlyDuplicate, digits, length } = this.#options
  if (toLower) {
    target = target.map(val => val.toLocaleLowerCase())
  }
  if (onlyDuplicate) {
    target = this.getDuplicateOnly(target)
  }
  if (unique) {
    target = Array.from(new Set(target))
  }
  if (!digits) {
    target = target.filter(val => isNaN(val))
  }
  target = target.filter(val => !!val)
  if (length && target.length > Number(length)) {
    target.length = Number(length)
  }
  return target
}

/**
* Return only duplicated words.
*
* @param target
*
* @returns Array
*/
getDuplicateOnly (target) {
  const duplicate = []
  for (const el of target) {
    let first = null
    if (!duplicate.includes(el)) {
      first = el
      let idx = target.indexOf(el)
      while (idx !== -1) {
        if (idx !== target.indexOf(el)) {
          duplicate.push(el)
        }
        idx = target.indexOf(el, idx + 1)
      }
    }
    if (duplicate.includes(first)) {
      duplicate.push(first)
    }
  }
  return duplicate
}
}
