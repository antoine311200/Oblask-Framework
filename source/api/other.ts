let cos = Math.cos;
let sin = Math.sin;
let tan = Math.tan;
let pi = Math.PI;

function search(array: any[] | {[key: string]: any}, propertie: string, element: any, return_: string) {
  if(array instanceof Object) {
    for(let key in array) {
      if(array[key][propertie] == element) return (return_ == "id") ? key : (return_ != null) ? array[key][propertie] : array[key];
    }
  }
  else {
    for(let i = 0; i <= (<any[]>array).length; i++) {
      if(array[i][propertie] == element) return (return_ == "id") ? i : (return_ != null) ? array[i][propertie] : array[i];
    }
  }
  return null;
}


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
