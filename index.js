import Keywords from './src/Keywords.js'
import stopWords from './src/stopwords/index.js'

export default (str, options = {}) => Object.freeze(
  new Keywords(str, stopWords, options)
)
