'use strict'

const css = require('css')

// default config
const defaultConfig = {
    // base UI design width 750px
    datum: 750,

    multiple: 100,

    outputUnit: 'vw',

    // type
    processType: ['keyframe', 'rule'],

    // precision
    precision: 6,

    // ignore keyword
    ignoreComment: 'no',

    // RegExp of processing data
    regExp: /\b(\d+(\.\d+)?)px\b/
}

class Px2vw {
    constructor (options) {
        this.config = Object.create(null)
        Object.assign(this.config, defaultConfig, options)
    }

    // transform px-unit into vm-unit
    generateVw (cssText) {
        let self = this,
            config = this.config,
            astObj = css.parse(cssText)

        function processRules (rules) {
            for (let ruleIndex = 0; ruleIndex < rules.length; ruleIndex++) {
                let item = rules[ruleIndex], declarations = item.declarations
                if (item.type === 'media') {
                    processRules(item.rules)
                    continue
                } else if (item.type === 'keyframes') {
                    processRules(item.keyframes)
                    continue
                } else if (!config.processType.includes(item.type)) {
                    continue
                }

                for (let index = 0; index < declarations.length; index++) {
                    let declaration = declarations[index]
                    if (declaration.type === 'declaration' && config.regExp.test(declaration.value)) {
                        let nextIndex = index + 1, nextNode = declarations[nextIndex]

                        // width: 12px /*no*/
                        if (nextNode && nextNode.type === 'comment') {
                            if (nextNode.comment.trim() === config.ignoreComment) {
                                // delete nextNode
                                declarations.splice(nextIndex, 1);
                                continue;
                            }
                        }

                        if (declaration.value === `0px`) {
                            declaration.value = '0'
                        } else {
                            declaration.value = self.calculateValue(config.outputUnit, declaration.value)
                        }
                    }
                }

                // if rule has no declarations, delete it
                if (!declarations.length) {
                    rules.splice(ruleIndex, 1)
                    ruleIndex--
                }
            }
        }

        processRules(astObj.stylesheet.rules)

        return css.stringify(astObj)
    }

    calculateValue (type, value) {
        let config = this.config,
            regExpGlobal = new RegExp(config.regExp.source, 'g'),
            multipleNumber = config.multiple


        function getValue (val) {
            val = parseFloat(val.toFixed(config.precision))
            return val === 0 ? val : `${val}${type}`
        }

        return value.replace(regExpGlobal, function ($0, $1) {
            return getValue(config.outputUnit === 'rem' ? ($1 / multipleNumber) : ($1 * multipleNumber / config.datum))
        })
    }
}


module.exports = Px2vw
