//funcionalidade básicas de js que serão reutilizadas em todo o projeto e ficam no escopo global
function clone(object) {
    function F() { }
    F.prototype = object;
    return new F();
}

function extend(subClass, superClass) {
    var F = function () { };
    F.prototype = superClass.prototype;
    subClass.prototype = new F();
    subClass.prototype.constructor = subClass;

    subClass.superclass = superClass.prototype;
    if (superClass.prototype.constructor === Object.prototype.constructor) {
        superClass.prototype.constructor = superClass;
    }
}

var Interface = function (name, methods) {
    if (arguments.length !== 2) {
        throw new Error("Interface constructor called with " +
            arguments.length +
            "arguments, but expected exactly 2."
        );
    }

    this.name = name;
    this.methods = [];
    for (var i = 0, len = methods.length; i < len; i++) {
        if (typeof methods[i] !== 'string') {
            throw new Error("Interface constructor expects method names to be " +
            "passed in as a string.");
        }
        this.methods.push(methods[i]);
    }
};

Interface.ensureImplements = function (object) {
    if (arguments.length < 2) {
        throw new Error("Function Interface.ensureImplements called with " +
          arguments.length + "arguments, but expected at least 2.");
    }

    for (var i = 1, len = arguments.length; i < len; i++) {
        var interfaceInstance = arguments[i];
        if (interfaceInstance.constructor !== Interface) {
            throw new Error("Function Interface.ensureImplements expects arguments " +
            "two and above to be instances of Interface.");
        }

        for (var j = 0, methodsLen = interfaceInstance.methods.length; j < methodsLen; j++) {
            var method = interfaceInstance.methods[j];
            if (!object[method] || typeof object[method] !== 'function') {
                throw new Error("Function Interface.ensureImplements: object " +
                "does not implement the " + interfaceInstance.name +
                " interface. Method " + method + " was not found.");
            }
        }
    }
};

function getParamNames(func) {
    var STRIP_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg;
    var ARGUMENT_NAMES = /([^\s,]+)/g;

    var fnStr = func.toString().replace(STRIP_COMMENTS, '');
    var result = fnStr.slice(fnStr.indexOf('(') + 1, fnStr.indexOf(')')).match(ARGUMENT_NAMES);

    if (result === null){
        result = [];
    }

    return result;
}
