
import CONSTANTS from './rivets-utilify.constants';
import rivetsUtilifyMethods from './rivets-utilify.methods';

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
        this.version = '0.2.2';

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

        /**
         * Extend public methods
         * @type {Method}
         */
        utilify.globalHelpers.extend(RivetsUtilify.prototype, rivetsUtilifyMethods);

        this.init(utilify.globalHelpers);
    }
}

export default RivetsUtilify;
