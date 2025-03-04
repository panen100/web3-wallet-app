# web3-wallet-app

## Project setup

```
yarn install
```

### Compiles and hot-reloads for development

```
yarn serve
```

### Compiles and minifies for production

```
yarn build
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).

### 用 vue3+cli 开发前端项目，导入 ethereumjs-wallet,浏览器报错 Uncaught ReferenceError: process is not defined

解决办法：

- npm install process stream-browserify crypto-browserify --save
- 配置 vue.config.js 文件
