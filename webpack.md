## 参考
[Webpack DOC](https://webpack.github.io/docs/l)

[Webpack DOC2.2中文版](http://www.css88.com/doc/webpack2/)

[Webpack常用插件](https://github.com/webpack/docs/wiki/)

## 提高构建速度
当我们配置好所有的配置，应用跑起来的时候，我们可能会头疼于构建速度。下面介绍几种方式来处理这个问题。
### DllReferencePlugin(webpack自带)

`DllReferencePlugin`是一个终极大招，也是必备的技能。他绝对能显著的提升我们构建的速度。

当我们写`import 'vue'; import 'angular'; import 'react'` 类似的代码时，webpack 在编译时也会寻找并把它们打包出来，通过将这类变动不频繁的包分离出来可以显著提高 webpack build 的速度（另外，可以将多个项目相同的技术栈抽取出同一个配置文件，共同引用这一个文件）

1.首先配置`webpack.dll.config.js`
```js
const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: {
    vendor: ['react', 'react-dom']
  },
  output: {
    path: path.join(__dirname, 'dll'),
    filename: '[name].dll.js',
    library: '[name]_library'
  },
  plugins: [
    new webpack.DllPlugin({
      path: path.join(__dirname, 'dll', '[name]-manifest.json'),
      name: '[name]_library'
    })
  ]
};

```
最早接触到这个方法是在一个`日本人`的博客上。具体见:

进行打包
```
$  webpack --config webpack.dll.config.js
Hash: 01aa15fd43e78e056f0f
Version: webpack 1.14.0
Time: 698ms
        Asset    Size  Chunks             Chunk Names
vendor.dll.js  740 kB       0  [emitted]  vendor
   [0] dll vendor 12 bytes {0} [built]
    + 177 hidden modules
```

2.dll目录下的两个文件引入
webpack.config.js
```js
//配置vendor-manifest.json文件
plugins: [      
        new webpack.DllReferencePlugin({
            context: __dirname,
            manifest: require('./dll/vendor-manifest.json')
        })
    ]
    
//配置vendor.dll文件
<script src="dll/vendor.dll.js"></script>
```

2.抽离类似jquery之类的公共代码
webpack.config.js
```js
entry: {
        vendor:['./node_modules/jquery/dist/jquery.min.js'],
        app: ['./app.js']
    },
...

plugins: [
      new webpack.optimize.CommonsChunkPlugin({
          name: "vendor",
          filename:"vendor.js",
          minChunks: Infinity
        })
    ]
```
```
                             Asset       Size  Chunks             Chunk Names
    bundle.c130623d1cd38db60033.js    83.2 kB       0  [emitted]  app
                         vendor.js     112 kB       1  [emitted]  vendor
bundle.c130623d1cd38db60033.js.map    99.7 kB       0  [emitted]  app
                     vendor.js.map     115 kB       1  [emitted]  vendor
                        index.html  328 bytes          [emitted]
chunk    {0} bundle.c130623d1cd38db60033.js, bundle.c130623d1cd38db60033.js.map (app) 77.2 kB {1} [rendered]
```
将jquery之类的公共代码抽离进vendor.js中,并单独在页面引入。
