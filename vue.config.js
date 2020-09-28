// function mock(app, url, data) {
//     app.get(url, (request, response) => {
//       response.json(data)
//     })
//   }
//   const homeData = require('./src/mock/bookHome')
//   const shelfData = require('./src/mock/bookShelf')
//   const listData = require('./src/mock/bookList')
//   const flatListData = require('./src/mock/bookFlatList')
//mock不支持二进制，所以下载之类的操作不能用，自己写
module.exports={
    lintOnSave: false,
    publicPath:process.env.NODE_ENV === 'production',
    ? './'
    : '/',
    devServer: {
       
        // before(app) {
        //   mock(app, '/book/home', homeData)
        //   mock(app, '/book/shelf', shelfData)
        //   mock(app, '/book/list', listData)
        //   mock(app, '/book/flat-list', flatListData)
        // }
        
      },
      configureWebpack: {
        performance: {
          hints: 'warning',
          maxAssetSize: 524288 * 10,
          maxEntrypointSize: 524288 * 10
        }
      }
}