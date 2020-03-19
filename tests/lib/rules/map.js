"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const rule = require("../../../lib/rules/map");
const RuleTester = require("eslint").RuleTester;

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester();

ruleTester.run("map", rule, {
    valid: [
        {
            code: '_.map({}, fn);',
        },
        {
            code: '_.map({}, function() {})'
        },
        {
            code: 'underscore.map([1, 2, 3], fn);'
        },
        {
            code: 'Array.isArray([1, 2, 3]) ? [1, 2, 3].map(function() {}) : _.map([1, 2, 3], function() {})'
        },
    ],
    invalid: [

        {
            code: "_.map(arr, fn);",
            errors: 1,
            output: "(Array.isArray(arr)) ? arr.map(fn) : _.map(arr, fn);"
        }, {
            code: "var _ = require('lodash'); _.map([1, 2, 3], fn);",
            errors: 1,
            output: "var _ = require('lodash'); [1, 2, 3].map(fn);"
        }, {
            code: "var _ = require('lodash'); _.map([1, 2, 3], fn); _ = function() {}; _.map([3, 4], fn2);",
            errors: 1,
            output: "var _ = require('lodash'); [1, 2, 3].map(fn); _ = function() {}; _.map([3, 4], fn2);"
        }, {
            code: "_.map([1, 2, 3], fn);",
            errors: 1,
            output: "[1, 2, 3].map(fn);"
        }
    ],
});