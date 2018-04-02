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

var Watcher = function () {
    function Watcher(vm, key, cb) {
        _classCallCheck(this, Watcher);

        this.vm = vm;
        this.key = key;
        this.cb = cb;
        this.value = this.get();
    }

    _createClass(Watcher, [{
        key: 'get',
        value: function get() {
            _Dep2.default.default = this;
            var value = this.vm[this.key];
            _Dep2.default.default = null;
            return value;
        }
    }, {
        key: 'run',
        value: function run() {
            var newVal = this.vm[this.key];
            var oldVal = this.value;
            if (newVal !== oldVal) {
                this.cb.call(this.vm, newVal, oldVal);
            }
        }
    }]);

    return Watcher;
}();

exports.default = Watcher;