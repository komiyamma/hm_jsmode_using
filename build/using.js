/// <reference path="../types/hm_jsmode.d.ts" />

/*
 * Copyright (C) 2022 Akitsugu Komiyama
 * under the MIT License
 */

function using(instance, func) {
	let progree = 0;

    if (!instance) {
        throw new ReferenceError("InstanceIsNullException");
    }

	try {
		const result = func(instance);

		progree = 1;

		if (typeof instance.Dispose === "function") {
			instance.Dispose();
		} else if (typeof instance.dispose === "function") {
			instance.dispose();
		}

		progree = 2;

		return result;

	} catch (e) {

		if (progree < 2) { // Disposeを実行してなければ...

			if (typeof instance.Dispose === "function") {
				instance.Dispose();
			} else if (typeof instance.dispose === "function") {
				instance.dispose();
			}
		}

		throw e;
	}
}