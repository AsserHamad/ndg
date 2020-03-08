const  BaseError = require("../errors/BaseError");

class InternalServerError extends BaseError{
    constructor(error) {
        super(error || "Internal Server Error", 500);
    }
}

module.exports = InternalServerError