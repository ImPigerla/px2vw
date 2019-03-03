'use strict'

const Px2vw = require('./px2vw')

const template = /<template>([\s\S]+)<\/template>/gi

class Px2vwStyle extends Px2vw {
    generateVw (vueText) {
        let config = this.config
        if (template.test(vueText) && config.regExp.test(vueText)) {
            return vueText.replace(template, this.calculateValue('vw', vueText.match(template)[0]))
        } else {
            return vueText
        }
    }
}

module.exports = Px2vwStyle
