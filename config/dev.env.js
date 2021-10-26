'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = (function() {
  if (process.env.requestEnv) {
      return {
          NODE_ENV: '"development"',
          __SERVICE__: '"https://testnet2.gxchain.org"',
          network:{
            blockchain: '"gxc"',
            protocol: '"https"',
            host: '"testnet.gxchain.org"',
            port: 443,
            chainId: '"c2af30ef9340ff81fd61654295e98a1ff04b23189748f86727d0b26b40bb0ff4"'
          },
          contractName: '"bjnvoting"',
      }
  };
  return merge(prodEnv, {
      NODE_ENV: '"development"',
      __SERVICE__: '"https://testnet2.gxchain.org"',
      network:{
        blockchain: '"gxc"',
        protocol: '"https"',
        host: '"testnet.gxchain.org"',
        port: 443,
        chainId: '"c2af30ef9340ff81fd61654295e98a1ff04b23189748f86727d0b26b40bb0ff4"'
      },
      contractName: '"bjnvoting"',
  });
})();
