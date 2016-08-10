var expect = require('expect');

var ourPromise = require('./ourPromise');

describe('Promise Implementation', function () {
    it('should throw an error if no resolver ', function () {
        expect(ourPromise).toThrow(/You must pass a resolver function/)
    })
    it('should throw an error if new keyword not used ', function () {
        var bindPromise = ourPromise.bind(this, function (resolve, reject) {})
        expect(bindPromise).toThrow(/Please use the 'new' operator/)
    })
    it('should be thenable', function () {
        var promise = new ourPromise(function (resolve, reject) {})
        var actual = typeof promise.then;
        var expected = "function";
        expect(actual).toBe(expected);
    })

    it('should be catchable', function () {
        var deferred = new ourPromise(function (resolve, reject) {})
        var actual = typeof deferred.catch;
        var expected = "function";
        expect(actual).toBe(expected);
    })

    it('should callback to then on success', function () {
        var defered = new ourPromise(function (resolve, reject) {
            resolve(true);
        });
        var actual = false;

        defered
        .then(function (val) {
            actual = val;
        })

        var expected = true;
        expect(actual).toBe(expected);
    })

    it('should callback to catch on error', function () {
        var defered = new ourPromise(function (resolve, reject) {
            reject(true);
        });
        var actual = false;

        defered
        .then(function () {
            actual = false;
        })
        .catch(function (err) {
            actual = err;
        })

        var expected = true;
        expect(actual).toBe(expected);
    })

    it('should be chainable', function () {
        var defered = new ourPromise(function (resolve, reject) {
            resolve(false);
        });
        var actual = false;

        defered
            .then(function () {
                return true;
            })
            .then(function (val) {
                actual = val;
            })
            .catch(function (val) {
                actual = false;
            })

        var expected = true;
        expect(actual).toBe(expected);
    })

})