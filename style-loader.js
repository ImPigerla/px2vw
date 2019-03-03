const loaderUtils = require('loader-utils')
const Px2vw = require('./lib/px2vw-style.js')

module.exports = function (source) {
    let options = loaderUtils.getOptions(this),
        px2vwInstance = new Px2vw(options)

    return px2vwInstance.generateVw(source)
}
