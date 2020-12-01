'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  Mock: true,
  NODE_ENV: '"development"',
  BASE_API:'"/dev-api"',
})
