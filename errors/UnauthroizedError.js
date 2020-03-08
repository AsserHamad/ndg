const BaseError = require("../errors/BaseError");

class UnauthroizedError extends BaseError {
    constructor(error) {
        super(error || "Unauthroized!", 401);
    }
}

module.exports = UnauthroizedError