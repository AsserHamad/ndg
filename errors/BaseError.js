class BaseError {
    constructor(error, code) {
        this.error = error;
        this.code = code;
    }
}

module.exports = BaseError