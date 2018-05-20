
/*!!
 * Boilerplate.js v0.0.1
 * https://github.com/zeindelf/rivets-utilify
 *
 * Copyright (c) 2017-2018 Zeindelf
 * Released under the MIT license
 *
 * Date: 2018-05-20T21:21:11.186Z
 */

'use strict';

var utilifyVersion = '0.3.5';

var CONSTANTS = {
    MESSAGES: {
        utilify: 'Utilify.js is required and must be an instance. Download it from https://www.npmjs.com/package/utilify-js',
        utilifyVersion: utilifyVersion,
        vtexUtilsVersionMessage: 'Utilify version must be higher than ' + utilifyVersion + '. Download last version on https://www.npmjs.com/package/utilify'
    }
};

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};

var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var rivetsUtilifyMethods = {
    init: function init(globalHelpers) {
        var _this = this;

        if ((typeof window === 'undefined' ? 'undefined' : _typeof(window)) !== 'object') {
            global.window = global;
            global.window.navigator = {};
        }

        if ('rivets' in window) {
            rivets.stdlib = {
                defaultDateFormat: 'DD/MM/YYYY',
                defaultTimeFormat: 'HH:mm:ss',
                defaultDatetimeFormat: 'YYYY-MM-DD HH:mm:ss'
            };

            /*
             * Basic formatters for rivets
             */

            /* General */
            rivets.formatters.log = function (target) {
                return console.log(target);
            };
            rivets.formatters.default = function (target, val) {
                return !rivets.formatters.isEmpty(target) ? target : val;
            };
            rivets.formatters.add = function (target, val) {
                return target + val;
            };
            rivets.formatters.sub = function (target, val) {
                return target - val;
            };

            /* Check JS types */
            rivets.formatters.isBoolean = function (target) {
                return typeof target == 'boolean';
            };
            rivets.formatters.isNumeric = function (target) {
                return !isNaN(target);
            };

            rivets.formatters.isNaN = function (target) {
                if (rivets.formatters.isArray(target)) {
                    return true;
                }

                return isNaN(target);
            };

            /**
             * Thanks a lot to Dagg Nabbit
             * http://stackoverflow.com/questions/3885817/how-to-check-if-a-number-is-float-or-integer
             */
            rivets.formatters.isInteger = function (n) {
                return n === +n && n === (n | 0);
            };

            /**
             * Thanks a lot to Dagg Nabbit
             * http://stackoverflow.com/questions/3885817/how-to-check-if-a-number-is-float-or-integer
             */
            rivets.formatters.isFloat = function (n) {
                return Infinity !== n && n === +n && n !== (n | 0);
            };
            rivets.formatters.isNumber = function (target) {
                return rivets.formatters.isFloat(target) || rivets.formatters.isInteger(target);
            };
            rivets.formatters.isObject = function (target) {
                return rivets.formatters.toBoolean(target) && (typeof target === 'undefined' ? 'undefined' : _typeof(target)) === 'object' && !rivets.formatters.isArray(target);
            };
            rivets.formatters.isFunction = function (target) {
                return typeof target === 'function';
            };
            rivets.formatters.isArray = function (target) {
                return rivets.formatters.isFunction(Array.isArray) ? Array.isArray(target) : target instanceof Array;
            };
            rivets.formatters.isString = function (target) {
                return typeof target == 'string' || target instanceof String;
            };
            rivets.formatters.isInfinity = function (target) {
                return target === Infinity;
            };

            /* Convert JS types */
            rivets.formatters.toBoolean = function (target) {
                return !!target;
            };

            rivets.formatters.toInteger = function (target) {
                var ret = parseInt(target * 1, 10);

                return isNaN(ret) ? 0 : ret;
            };

            rivets.formatters.toFloat = function (target) {
                var ret = parseFloat(target * 1.0);

                return isNaN(ret) ? 0.0 : ret;
            };

            rivets.formatters.toDecimal = function (target) {
                var retI = rivets.formatters.toInteger(target * 1);
                var retF = rivets.formatters.toFloat(target);

                return retI == retF ? retI : retF;
            };

            rivets.formatters.toArray = function (target) {
                if (rivets.formatters.isArray(target)) {
                    return target;
                } else if (rivets.formatters.isObject(target)) {
                    return rivets.formatters.values(target);
                }

                return [target];
            };

            rivets.formatters.toString = function (target) {
                return target ? target.toString() : '';
            };

            rivets.formatters.integer = {
                read: function read(target) {
                    return rivets.formatters.toInteger(target);
                },
                publish: function publish(target) {
                    return rivets.formatters.toInteger(target);
                }
            };

            /* Math functions */
            rivets.formatters.sum = function (target, val) {
                return 1 * target + 1 * val;
            };
            rivets.formatters.substract = function (target, val) {
                return 1 * target - 1 * val;
            };
            rivets.formatters.multiply = function (target, val) {
                return 1 * target * (1 * val);
            };
            // rivets.formatters.crossMultiplication = (target, base, total) => (target / base) * total;
            // rivets.formatters.percents = (target, base, total) => rivets.formatters.crossMultiplication(target, base, total) + '%';
            rivets.formatters.divide = function (target, val) {
                return 1 * target / (1 * val);
            };
            rivets.formatters.min = function () {
                return Math.min.apply(Math, arguments);
            };
            rivets.formatters.max = function () {
                return Math.max.apply(Math, arguments);
            };

            /* Comparisons */
            rivets.formatters.isEqual = function (target, val) {
                return target === val;
            };
            rivets.formatters.isNotEqual = function (target, val) {
                return target !== val;
            };
            rivets.formatters.isLess = function (target, val) {
                return target * 1 < val * 1;
            };
            rivets.formatters.isGreater = function (target, val) {
                return target * 1 > val * 1;
            };
            rivets.formatters.isLessEqual = function (target, val) {
                return target * 1 <= val * 1;
            };
            rivets.formatters.isGreaterEqual = function (target, val) {
                return target * 1 >= val * 1;
            };

            /* Logical functions */
            rivets.formatters.or = function () {
                for (var i = 0, len = arguments.length; i < len; i += 1) {
                    if (rivets.formatters.toBoolean(arguments.length <= i ? undefined : arguments[i])) {
                        return true;
                    }
                }

                return false;
            };

            rivets.formatters.and = function () {
                for (var i = 0, len = arguments.length; i < len; i += 1) {
                    if (!rivets.formatters.toBoolean(arguments.length <= i ? undefined : arguments[i])) {
                        return false;
                    }
                }

                return true;
            };

            rivets.formatters.negate = function (target) {
                return !rivets.formatters.toBoolean(target);
            };
            rivets.formatters.if = function (target, trueCase, falseCase) {
                return rivets.formatters.toBoolean(target) ? trueCase : falseCase;
            };

            /* Date functions */
            if ('moment' in window) {
                rivets.formatters.date = function (target) {
                    return moment(target).format(rivets.stdlib.defaultDateFormat);
                };
                rivets.formatters.time = function (target) {
                    return moment(target).format(rivets.stdlib.defaultTimeFormat);
                };
                rivets.formatters.datetime = function (target) {
                    return moment(target).format(rivets.stdlib.defaultDatetimeFormat);
                };
                rivets.formatters.toTimestamp = function (target) {
                    return moment(target).format('X');
                };
                rivets.formatters.toDate = function (target) {
                    return moment.unix(target).toDate();
                };
                rivets.formatters.toMoment = function (target) {
                    return moment(target);
                };

                /**
                 * The date formatter returns a formatted date string according to the moment.js
                 * formatting syntax.
                 *
                 * ```html
                 * <span rv-value="model:date | date 'dddd, MMMM Do'"></span>
                 * ```
                 *
                 * @see {@link http://momentjs.com/docs/#/displaying} for format options.
                 */
                rivets.formatters.dateFormat = function (target, val) {
                    return moment(target).format(val);
                };
            }

            /* Object functions */
            rivets.formatters.pairs = function (target) {
                return Object.keys(target).map(function (key) {
                    return {
                        'object': target,
                        'property': key,
                        'value': target[key]
                    };
                });
            };

            rivets.formatters.keys = function (target) {
                return Object.keys(target);
            };
            rivets.formatters.values = function (target) {
                return Object.keys(target).map(function (key) {
                    return target[key];
                });
            };

            /* String functions */
            rivets.formatters.stringFormat = function (target) {
                for (var i = 1, len = arguments.length <= 1 ? 0 : arguments.length - 1; i < len; i += 1) {
                    var offset = target.indexOf('%s');

                    if (offset === -1) {
                        break;
                    }

                    target = target.slice(0, offset) + (arguments.length <= i + 1 ? undefined : arguments[i + 1]) + target.slice(offset + 2);
                }

                return target;
            };

            rivets.formatters.split = function (target, val) {
                return target.split(val);
            };
            rivets.formatters.lower = function (target) {
                return target.toLowerCase();
            };
            rivets.formatters.upper = function (target) {
                return target.toUpperCase();
            };

            rivets.formatters.capitalize = function (target) {
                target = rivets.formatters.toString(target);

                return target.split(' ').map(function (seq) {
                    return seq.split('-').map(function (word) {
                        return word.charAt(0).toUpperCase() + word.slice(1);
                    }).join('-');
                }).join(' ');
            };

            /* String&Array functions */
            rivets.formatters.contains = function (target, val) {
                return target.indexOf(val) !== -1;
            };
            rivets.formatters.doesNotContain = function (target, val) {
                return rivets.formatters.negate(rivets.formatters.contains(target, val));
            };
            rivets.formatters.prettyPrint = function (target) {
                return JSON.stringify(target, null, 2);
            };

            rivets.formatters.isEmpty = function (target) {
                if (!rivets.formatters.toBoolean(target)) {
                    return true;
                }

                return rivets.formatters.toArray(target).length === 0;
            };

            rivets.formatters.isNotEmpty = function (target) {
                return rivets.formatters.negate(rivets.formatters.isEmpty(target));
            };

            /* Array formatters */
            rivets.formatters.length = function (target) {
                if (rivets.formatters.isString(target)) {
                    return target.length;
                }

                return rivets.formatters.toArray(target).length;
            };

            rivets.formatters.join = function (target, val) {
                return rivets.formatters.toArray(target).join(val);
            };

            /* Functions formatters */
            rivets.formatters.preventDefault = function (target) {
                /* eslint-disable */
                var self = _this;
                /* eslint-enable */

                return function (ev, model) {
                    ev.preventDefault();
                    target.call(self, ev, model);

                    return false;
                };
            };

            /* Utilify formatters */
            rivets.formatters.capitalize = function (val) {
                return globalHelpers.capitalize(val);
            };
            rivets.formatters.contains = function (target, elem) {
                return globalHelpers.contains(target, elem);
            };
            rivets.formatters.normalizeText = function (target) {
                return globalHelpers.normalizeText(target);
            };
            rivets.formatters.pad = function (val) {
                return globalHelpers.pad(val);
            };
            rivets.formatters.strCompact = function (target) {
                return globalHelpers.strCompact(target);
            };

            /* Formatter shortcuts */
            rivets.formatters.eq = rivets.formatters.isEqual;
            rivets.formatters.ne = function (target, val) {
                return rivets.formatters.negate(rivets.formatters.isEqual(target, val));
            };
            rivets.formatters.lt = rivets.formatters.isLess;
            rivets.formatters.gt = rivets.formatters.isGreater;
            rivets.formatters.le = rivets.formatters.isLessEqual;
            rivets.formatters.lte = rivets.formatters.isLessEqual;
            rivets.formatters.ge = rivets.formatters.isGreaterEqual;
            rivets.formatters.gte = rivets.formatters.isGreaterEqual;

            rivets.formatters.prv = rivets.formatters.preventDefault;
            rivets.formatters.inject = rivets.formatters.stringFormat;
            rivets.formatters.format = rivets.formatters.dateFormat;
            rivets.formatters.len = rivets.formatters.length;
            rivets.formatters.def = rivets.formatters.default;
            rivets.formatters.neg = rivets.formatters.negate;

            rivets.formatters.stringify = rivets.formatters.prettyPrint;
            rivets.formatters.int = rivets.formatters.integer;

            // Backwards compatibility
            rivets.formatters.isLower = rivets.formatters.isLess;
            rivets.formatters.isLowerEqual = rivets.formatters.isLessEqual;
        }
    }
};

/**
 * Create a RivetsUtilify class
 * Vtex utilities methods
 */

var RivetsUtilify = function RivetsUtilify(utilify) {
    classCallCheck(this, RivetsUtilify);

    /**
     * Version
     * @type {String}
     */
    this.version = '0.0.1';

    /**
     * Package name
     * @type {String}
     */
    this.name = '@RivetsUtilify';

    // Validate Vtex Utils
    if (utilify === undefined) {
        throw new TypeError(CONSTANTS.MESSAGES.utilify);
    }

    if (utilify.name !== '@UtilifyJS') {
        throw new TypeError(CONSTANTS.MESSAGES.utilify);
    }

    if (utilify.version < CONSTANTS.MESSAGES.utilifyVersion) {
        throw new Error(CONSTANTS.MESSAGES.utilifyVersionMessage);
    }

    /**
     * Extend public methods
     * @type {Method}
     */
    utilify.globalHelpers.extend(RivetsUtilify.prototype, rivetsUtilifyMethods);

    this.init(utilify.globalHelpers);
};

module.exports = RivetsUtilify;
