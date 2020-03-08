const BaseError = require("../errors/BaseError");

class NotFoundError extends BaseError {
    constructor(error) {
        super(error || "Not Found!", 404);
    }
}

module.exports = NotFoundError