var messages = {
	NO_NEW: "Please use the 'new' operator, this object constructor cannot be called as a function.",
	NO_RESOLVER: "You must pass a resolver function as the first argument to the promise constructor",
	NO_CATCH: "Promise was rejected but no catch handler found",
	NO_THEN: "Promise was resolved but no then handler found"
}

function needsResolver () {
	throw new TypeError(messages.NO_RESOLVER);
}

function needsNew () {
	throw new TypeError(messages.NO_NEW);
}

module.exports = function OurPromise (ctor) {

	if (typeof ctor !== "function") { needsResolver(); }
	(this instanceof OurPromise)?null:needsNew();

	var promise = this;

	var onResolve = function (val) { return val; }
	var onReject = function (val) { return val; }

	var state = 0;
	var value = null;

	function resolve (val) {
		state = 1;
		value = onResolve(val);
	}
	function reject (val) {
		state = 2;
		value = onReject(val);
	}

	ctor(resolve, reject)

	promise.then = function (cb) { 
		if (state === 1) { 
			value = cb(value); 
		}
		onResolve = cb; 
		return this;
	}
	promise.catch = function (cb) { 
		if (state === 2) { cb(value); }
		onReject = cb; 
	}
}