
import CONSTANTS from './rivets-utilify.constants.js';
import rivetsUtilifyMethods from './rivets-utilify.methods.js';

/**
 * Create a RivetsUtilify class
 * Vtex utilities methods
 */
class RivetsUtilify {
    constructor(utilify) {
        /**
         * Version
         * @type {String}
         */
        this.version = '0.1.0';

        /**
         * Package name
         * @type {String}
         */
        this.name = '@RivetsUtilify';

        // Validate Vtex Utils
        if ( utilify === undefined ) {
            throw new TypeError(CONSTANTS.MESSAGES.utilify);
        }

        if ( utilify.name !== '@UtilifyJS' ) {
            throw new TypeError(CONSTANTS.MESSAGES.utilify);
        }

        if ( utilify.version < CONSTANTS.MESSAGES.utilifyVersion ) {
            throw new Error(CONSTANTS.MESSAGES.utilifyVersionMessage);
        }

        /**
         * Extend public methods
         * @type {Method}
         */
        utilify.globalHelpers.extend(RivetsUtilify.prototype, rivetsUtilifyMethods);

        this.init(utilify.globalHelpers);
    }
}

export default RivetsUtilify;
