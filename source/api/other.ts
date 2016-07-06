/*
 * Polyfill of Object.prototype.watch & Object.prototype.unwatch taken on the web ^^
 * Because deprecated and not recommanded on the browsers.
 */
 
 
if (!Object.prototype["watch"]) {
	Object.defineProperty(Object.prototype, "watch", {
    enumerable: false,
		configurable: true,
		writable: false,
		value: function (prop, handler) {
			let oldval = this[prop];
			let newval = oldval;
			let getter = function () {
				return newval;
			};
			let setter = function (val) {
				oldval = newval;
				return newval = handler.call(this, prop, oldval, val);
			};
			if (delete this[prop]) {
				Object.defineProperty(this, prop, {
          get: getter,
					set: setter,
					enumerable: true,
					configurable: true
				});
			}
		}
	});
}

if (!Object.prototype["unwatch"]) {
	Object.defineProperty(Object.prototype, "unwatch", {
		enumerable: false,
		configurable: true,
		writable: false,
		value: function (prop) {
			let val = this[prop];
			delete this[prop];
			this[prop] = val;
		}
	});
}
