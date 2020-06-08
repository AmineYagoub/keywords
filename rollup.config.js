import resolve from '@rollup/plugin-node-resolve'
import babel from '@rollup/plugin-babel'
import { terser } from 'rollup-plugin-terser'

const format = format => `dist/sw-extract.${format}.min.js`
export default {
  input: 'index.js',
  output: [
    {
      file: format('umd'),
      format: 'umd',
      name: 'Keywords'
    },
    {
      file: format('ems'),
      format: 'esm'
    },
    {
      file: format('cjs'),
      format: 'cjs'
    }
  ],
  plugins: [
    resolve(),
    babel({
      babelHelpers: 'bundled',
      exclude: 'node_modules/**'
    }),
    terser()
  ]
}
