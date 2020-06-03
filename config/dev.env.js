var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

// module.exports = merge(prodEnv, {
//   NODE_ENV: '"development"'
// })

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',

  // 添加下面这行代码: 表示在开发环境下请求的服务器端接口  
 API_ROOT: ' "http://localhost:8009" '   
})
