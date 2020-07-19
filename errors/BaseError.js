class BaseError {
    constructor(message, status) {
        this.message = message;
        this.status = status;
    }
}

module.exports = BaseError