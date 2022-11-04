const LS = window.localStorage;
export default function localStorageHook(key, value, option = '') {

	if (value) {
		if (value instanceof Array || value instanceof Object || value instanceof Function) {
			value = JSON.stringify(value)
		}
		LS.setItem(key, value)
		return 
	}
	if (option) {
		option = option.toLowerCase()
		switch (option) {
			case 'remove': {
				LS.removeItem(key)
				return
			};
			case "clear": {
				LS.clear()
				return
			}
		}
		return 
	}

	return LS.getItem(key)
}