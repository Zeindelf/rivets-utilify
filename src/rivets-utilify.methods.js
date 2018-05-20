
export default {
    init(globalHelpers) {
        if ( typeof window !== 'object' ) {
            global.window = global;
            global.window.navigator = {};
        }

        if ( 'rivets' in window ) {
            rivets.stdlib = {
                defaultDateFormat: 'DD/MM/YYYY',
                defaultTimeFormat: 'HH:mm:ss',
                defaultDatetimeFormat: 'YYYY-MM-DD HH:mm:ss',
            };

            /*
             * Basic formatters for rivets
             */

            /* General */
            rivets.formatters.log = (target) => console.log(target);
            rivets.formatters.default = (target, val) => !rivets.formatters.isEmpty(target) ? target : val;
            rivets.formatters.add = (target, val) => target + val;
            rivets.formatters.sub = (target, val) => target - val;

            /* Check JS types */
            rivets.formatters.isBoolean = (target) => typeof target == 'boolean';
            rivets.formatters.isNumeric = (target) => !isNaN(target);

            rivets.formatters.isNaN = (target) => {
                if ( rivets.formatters.isArray(target) ) {
                    return true;
                }

                return isNaN(target);
            };

            /**
             * Thanks a lot to Dagg Nabbit
             * http://stackoverflow.com/questions/3885817/how-to-check-if-a-number-is-float-or-integer
             */
            rivets.formatters.isInteger = (n) => n === +n && n === (n|0);

            /**
             * Thanks a lot to Dagg Nabbit
             * http://stackoverflow.com/questions/3885817/how-to-check-if-a-number-is-float-or-integer
             */
            rivets.formatters.isFloat = (n) => Infinity !== n && n === +n && n !== (n|0);
            rivets.formatters.isNumber = (target) => rivets.formatters.isFloat(target) || rivets.formatters.isInteger(target);
            rivets.formatters.isObject = (target) => rivets.formatters.toBoolean(target) && typeof target === 'object' && !rivets.formatters.isArray(target);
            rivets.formatters.isFunction = (target) => typeof target === 'function';
            rivets.formatters.isArray = (target) => rivets.formatters.isFunction(Array.isArray) ? Array.isArray(target) : target instanceof Array;
            rivets.formatters.isString = (target) => typeof target == 'string' || target instanceof String;
            rivets.formatters.isInfinity = (target) => target === Infinity;

            /* Convert JS types */
            rivets.formatters.toBoolean = (target) => !!target;

            rivets.formatters.toInteger = (target) => {
                const ret = parseInt(target * 1, 10);

                return isNaN(ret) ? 0 : ret;
            };

            rivets.formatters.toFloat = (target) => {
                const ret = parseFloat(target * 1.0);

                return isNaN(ret) ? 0.0 : ret;
            };

            rivets.formatters.toDecimal = (target) => {
                const retI = rivets.formatters.toInteger(target * 1);
                const retF = rivets.formatters.toFloat(target);

                return retI == retF ? retI : retF;
            };

            rivets.formatters.toArray = (target) => {
                if ( rivets.formatters.isArray(target) ) {
                    return target;
                } else if ( rivets.formatters.isObject(target) ) {
                    return rivets.formatters.values(target);
                }

                return [target];
            };

            rivets.formatters.toString = (target) => target ? target.toString() : '';

            rivets.formatters.integer = {
                read(target) {
                    return rivets.formatters.toInteger(target);
                },

                publish(target) {
                    return rivets.formatters.toInteger(target);
                },
            };

            /* Math functions */
            rivets.formatters.sum = (target, val) => (1 * target) + (1 * val);
            rivets.formatters.substract = (target, val) => (1 * target) - (1 * val);
            rivets.formatters.multiply = (target, val) => (1 * target) * (1 * val);
            // rivets.formatters.crossMultiplication = (target, base, total) => (target / base) * total;
            // rivets.formatters.percents = (target, base, total) => rivets.formatters.crossMultiplication(target, base, total) + '%';
            rivets.formatters.divide = (target, val) => (1 * target) / (1 * val);
            rivets.formatters.min = (...args) => Math.min(...args);
            rivets.formatters.max = (...args) => Math.max(...args);

            /* Comparisons */
            rivets.formatters.isEqual = (target, val) => target === val;
            rivets.formatters.isNotEqual = (target, val) => target !== val;
            rivets.formatters.isLess = (target, val) => (target * 1) < (val * 1);
            rivets.formatters.isGreater = (target, val) => (target * 1) > (val * 1);
            rivets.formatters.isLessEqual = (target, val) => (target * 1) <= (val * 1);
            rivets.formatters.isGreaterEqual = (target, val) => (target * 1) >= (val * 1);

            /* Logical functions */
            rivets.formatters.or = (...args) => {
                for ( let i = 0, len = args.length; i < len; i += 1 ) {
                    if ( rivets.formatters.toBoolean(args[i]) ) {
                        return true;
                    }
                }

                return false;
            };

            rivets.formatters.and = (...args) => {
                for ( let i = 0, len = args.length; i < len; i += 1 ) {
                    if ( !rivets.formatters.toBoolean(args[i]) ) {
                        return false;
                    }
                }

                return true;
            };

            rivets.formatters.negate = (target) => !rivets.formatters.toBoolean(target);
            rivets.formatters.if = (target, trueCase, falseCase) => rivets.formatters.toBoolean(target) ? trueCase : falseCase;

            /* Date functions */
            if ( 'moment' in window ) {
                rivets.formatters.date = (target) => moment(target).format(rivets.stdlib.defaultDateFormat);
                rivets.formatters.time = (target) => moment(target).format(rivets.stdlib.defaultTimeFormat);
                rivets.formatters.datetime = (target) => moment(target).format(rivets.stdlib.defaultDatetimeFormat);
                rivets.formatters.toTimestamp = (target) => moment(target).format('X');
                rivets.formatters.toDate = (target) => moment.unix(target).toDate();
                rivets.formatters.toMoment = (target) => moment(target);

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
                rivets.formatters.dateFormat = (target, val) => moment(target).format(val);
            }

            /* Object functions */
            rivets.formatters.pairs = (target) => {
                return Object.keys(target).map((key) => ({
                    'object': target,
                    'property': key,
                    'value': target[key],
                }));
            };

            rivets.formatters.keys = (target) => Object.keys(target);
            rivets.formatters.values = (target) => Object.keys(target).map((key) => target[key]);

            /* String functions */
            rivets.formatters.stringFormat = (target, ...args) => {
                for ( let i = 1, len = args.length; i < len; i += 1 ) {
                    const offset = target.indexOf('%s');

                    if ( offset === -1 ) {
                        break;
                    }

                    target = target.slice(0, offset) + args[i] + target.slice(offset + 2);
                }

                return target;
            };

            rivets.formatters.split = (target, val) => target.split(val);
            rivets.formatters.lower = (target) => target.toLowerCase();
            rivets.formatters.upper = (target) => target.toUpperCase();

            rivets.formatters.capitalize = (target) => {
                target = rivets.formatters.toString(target);

                return target.split(' ').map((seq) => {
                    return seq.split('-').map((word) => {
                        return word.charAt(0).toUpperCase() + word.slice(1);
                    }).join('-');
                }).join(' ');
            };

            /* String&Array functions */
            rivets.formatters.contains = (target, val) => target.indexOf(val) !== -1;
            rivets.formatters.doesNotContain = (target, val) => rivets.formatters.negate(rivets.formatters.contains(target, val));
            rivets.formatters.prettyPrint = (target) => JSON.stringify(target, null, 2);

            rivets.formatters.isEmpty = (target) => {
                if ( !rivets.formatters.toBoolean(target) ) {
                    return true;
                }

                return rivets.formatters.toArray(target).length === 0;
            };

            rivets.formatters.isNotEmpty = (target) => rivets.formatters.negate(rivets.formatters.isEmpty(target));

            /* Array formatters */
            rivets.formatters.length = (target) => {
                if ( rivets.formatters.isString(target) ) {
                    return target.length;
                }

                return rivets.formatters.toArray(target).length;
            };

            rivets.formatters.join = (target, val) => rivets.formatters.toArray(target).join(val);


            /* Functions formatters */
            rivets.formatters.preventDefault = (target) => {
                /* eslint-disable */
                const self = this;
                /* eslint-enable */

                return function(ev, model) {
                    ev.preventDefault();
                    target.call(self, ev, model);

                    return false;
                };
            };

            /* Utilify formatters */
            rivets.formatters.capitalize = (val) => globalHelpers.capitalize(val);
            rivets.formatters.contains = (target, elem) => globalHelpers.contains(target, elem);
            rivets.formatters.normalizeText = (target) => globalHelpers.normalizeText(target);
            rivets.formatters.pad = (val) => globalHelpers.pad(val);
            rivets.formatters.strCompact = (target) => globalHelpers.strCompact(target);

            /* Formatter shortcuts */
            rivets.formatters.eq = rivets.formatters.isEqual;
            rivets.formatters.ne = (target, val) => rivets.formatters.negate(rivets.formatters.isEqual(target, val));
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
    },
};
