'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Created by ww on 2018/4/2.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */


var _Dep = require('./Dep.js');

var _Dep2 = _interopRequireDefault(_Dep);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Observer = function () {
    function Observer(data) {
        _classCallCheck(this, Observer);

        this.walk(data);
    }

    _createClass(Observer, [{
        key: 'walk',
        value: function walk(data) {
            var _this = this;

            Object.keys(data).forEach(function (key) {
                _this.definedProperty(data, key, data[key]);
            });
        }
    }, {
        key: 'definedProperty',
        value: function definedProperty(data, key, val) {
            observe(val);
            var dep = new _Dep2.default();
            Object.defineProperty(data, key, {
                enumerable: true,
                configurable: true,
                get: function get() {
                    if (_Dep2.default.default) {
                        dep.subs.push(_Dep2.default.default);
                    }
                    return val;
                },
                set: function set(newVal) {
                    if (val === newVal) {
                        return;
                    }
                    val = newVal;
                    dep.notify();
                }
            });
        }
    }]);

    return Observer;
}();

function observe(data) {
    if (!data || Array.isArray(data)) {
        return;
    }
    return new Observer(data);
}
exports.default = observe;