# px2vw-loader

Transform 'px' into 'vw' or 'rem'

## Demo

![px2vw-demo.jpg](./assets/px2vw-demo.jpg)

## Usage

### Install package

```bash
npm install --save-dev @pigerla/px2vw-loader
```

### Configuration

You can make some configuration in your `webpack.config.js` or `webpack.base.config.js` file optionally.

```js

// REMARK: '...' below means 'other configurations'

...
{
    test: /\.scss$/,
    ...,
    use: [
        ...,
        'css-loader',
        '@pigerla/px2vw-loader',  // 1. config here，optional
        ...
    ]
},
{
    test: /\.css$/,
    ...,
    use: [
        ...,
        'css-loader',
        '@pigerla/px2vw-loader',  // 2. config here，optional
        ...
    ]
}, 
{
    test: /\.vue$/,
    ...,
    loader: [
        'vue-loader', 
        '@pigerla/px2vw-loader/inline-style-loader.js' // 3. config here，optional
    ]
}
...
```

### Options

```js

// default options below
{
    // design size: 750px
    // 一般设计图尺寸
    datum: 750,
    
    // multiple of outputUnit
    // 缩放倍数
    multiple: 100,

    // the unit of output
    // 转为目标单位
    outputUnit: 'vw',

    // precision
    // 四舍五入小数点后6位
    precision: 6,

    // ignore keyword, like /* no */ in Sass or Less
    // 忽略转化的属性
    ignoreComment: 'no'
}
```


Good practice for then 'rem' unit's configuration

```js
{
    // recommend
    // 推荐
    multiple: 10,
    
    // 'rem' unit
    outputUnit: 'rem'
}
```

## Example

Example is here: [https://github.com/ImPigerla/prerender-mobile-app](https://github.com/ImPigerla/prerender-mobile-app)
