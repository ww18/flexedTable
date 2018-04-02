'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Created by ww on 2018/4/2.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */


var _Observer = require('./Observer.js');

var _Observer2 = _interopRequireDefault(_Observer);

var _Compile = require('./Compile.js');

var _Compile2 = _interopRequireDefault(_Compile);

var _Watcher = require('./Watcher.js');

var _Watcher2 = _interopRequireDefault(_Watcher);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var FixedTable = function () {
    function FixedTable(opt) {
        var _this = this;

        _classCallCheck(this, FixedTable);

        var defaultOpt = {
            fixedLeft: 0,
            fixedRight: 0
        };
        var opt = Object.assign(defaultOpt, opt);

        this.fixedLeft = opt.fixedLeft;
        this.fixedRight = opt.fixedRight;
        this.data = opt.data;

        this.vm = opt.vm;
        this.container = document.querySelector(this.vm);
        //模版table
        this.modalTable = this.container.querySelector('#fixedTable');
        this.headerHtml = this.modalTable.querySelectorAll('tr')[0];
        this.bodyHtml = this.modalTable.querySelectorAll('tr')[1];

        var divC = document.createElement('div');
        divC.className = 'flexed-table-row';
        this.divContainer = divC;

        (0, _Observer2.default)(this.data);

        new _Watcher2.default(this.data, 'data', function () {
            _this.init();
        });

        this.init();

        this.addEvent();
    }

    _createClass(FixedTable, [{
        key: 'init',
        value: function init() {
            this.divContainer.innerHTML = '';
            var len = this.headerHtml.querySelectorAll('th').length;
            //根据配置生成table
            //left
            var objLeft = {
                startIdx: 0,
                endIdx: this.fixedLeft,
                className: "fixed-body"
            };
            var leftTable = this.createTable(objLeft);
            //middle
            var objMiddle = {
                startIdx: this.fixedLeft,
                endIdx: len - this.fixedRight,
                className: "flexed-table-item"
            };
            var middleTable = this.createTable(objMiddle);
            //right
            var objRight = {
                startIdx: len - this.fixedRight,
                endIdx: len,
                className: "fixed-body-right"
            };
            var rightTable = this.createTable(objRight);

            this.divContainer.appendChild(leftTable);
            this.divContainer.appendChild(middleTable);
            this.divContainer.appendChild(rightTable);
            this.container.appendChild(this.divContainer);
            this.modalTable.classList.add('hide');
        }
    }, {
        key: 'createTable',
        value: function createTable(obj) {
            if (obj.startIdx == obj.endIdx) {
                return '';
            }
            var divContainer = document.createElement('div');
            divContainer.className = obj.className;
            var tableN = document.createElement('table');
            tableN.className = "flexed-table";
            var flagTh = false;
            for (var j = 0; j < this.data.data.length; j++) {
                var tableTr = document.createElement('tr');
                //生成table
                for (var i = obj.startIdx; i < obj.endIdx; i++) {
                    if (!flagTh && i >= obj.startIdx && i < obj.endIdx) {
                        var th = document.createElement('th');
                        th.innerHTML = this.headerHtml.querySelectorAll('th')[i].innerHTML;
                        if (i == obj.endIdx - 1) {
                            flagTh = true;
                        }
                    } else {
                        var th = document.createElement('td');
                        th.innerHTML = this.bodyHtml.querySelectorAll('td')[i].innerHTML;
                    }
                    tableTr.appendChild(th);
                }
                tableN.appendChild(tableTr);
                //操作的是虚拟dom
                new _Compile2.default(tableTr, this.data.data[j]);
            }
            divContainer.appendChild(tableN);
            return divContainer;
        }
    }, {
        key: 'addEvent',
        value: function addEvent() {
            var _this2 = this;

            this.divContainer.addEventListener('mouseover', function (e) {
                _this2.fixedTableHover(e);
            }, false);
            this.divContainer.addEventListener('mouseout', function (e) {
                _this2.fixedTableOut(e);
            }, false);
        }
    }, {
        key: 'fixedTableHover',
        value: function fixedTableHover(e) {
            var ele = e.target.parentElement;
            if (ele.nodeName.toLowerCase() == 'tr') {
                ele.className = 'fixed-hover';
                var arr = Array.prototype.slice.call(ele.parentNode.childNodes, 0);
                var nodeArr = [];
                arr.forEach(function (item, index) {
                    if (item.nodeName == 'TR') {
                        nodeArr.push(item);
                    }
                });
                var index = nodeArr.indexOf(ele);
                var table = this.divContainer.querySelectorAll('.flexed-table');

                for (var i = 0; i < table.length; i++) {
                    var arr1 = [];
                    for (var j = 0; j < table[i].childNodes.length; j++) {
                        var nodeBody = table[i].childNodes[j];
                        if (j == index) {
                            nodeBody.className = 'fixed-hover';
                        }
                    }
                }
            }
        }
    }, {
        key: 'fixedTableOut',
        value: function fixedTableOut() {
            var ele = this.divContainer.querySelectorAll('.fixed-hover');
            ele.forEach(function (item, index) {
                item.className = '';
            });
        }
    }]);

    return FixedTable;
}();

exports.default = FixedTable;