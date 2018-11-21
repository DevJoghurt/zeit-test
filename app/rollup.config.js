import riot from 'rollup-plugin-riot'
import buble from 'rollup-plugin-buble'
import commonjs from 'rollup-plugin-commonjs'
import nodeResolve from 'rollup-plugin-node-resolve'
import json from 'rollup-plugin-json'

export default [{
    input: 'src/index.js',
    output: {
        file: 'build.js',
        format: 'cjs'
    },
    plugins: [
        riot(),
        buble({
            exclude: 'node_modules/**'
        })
    ]
}]