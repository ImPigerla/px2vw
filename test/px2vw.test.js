'use strict';

const assert = require('power-assert');
const Px2vw = require('../lib/px2vw');

describe('lib/px2vw.js', () => {

    it('should be constructor', () => {
        assert(Px2vw.prototype.constructor === Px2vw)
    });
});
