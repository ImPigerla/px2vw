const loaderUtils = require('loader-utils')
const Px2vwInlineStyle = require('./lib/px2vw-inline-style.js')

module.exports = function (source) {
    let options = loaderUtils.getOptions(this),
        px2vwInstance = new Px2vwInlineStyle(options)

    return px2vwInstance.generateVw(source)
}
