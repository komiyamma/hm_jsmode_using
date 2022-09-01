/*
 * Copyright (C) 2022 Akitsugu Komiyama
 * under the MIT License
 * 
 * using v1.0.0
 */

declare interface IMayDisposable {
    Dispose?() :any;
    dispose?() :any;
}

function using(instance: IMayDisposable, func: (instance: IMayDisposable) => any): any {
    var progree = 0;

    if (instance == null) {
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
    } finally {

        if (progree < 2) { // Disposeを実行してなければ...

            if (typeof instance.Dispose === "function") {
                instance.Dispose();
            } else if (typeof instance.dispose === "function") {
                instance.dispose();
            }
        }
    }
}