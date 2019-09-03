'use strict';

import pkg from './package.json';
import typescript from 'rollup-plugin-typescript';
import resolve from 'rollup-plugin-node-resolve';

export default {
  input: 'src/index.ts',
  output: {
    file: 'dist/' + pkg.main,
    format: 'cjs',
    sourcemap: true,
  },
  plugins: [
    resolve(),
    typescript({ typescript: require('typescript') }),
  ],
}