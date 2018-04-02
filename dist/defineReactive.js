'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

//绑定监听事件
function Observer(data) {
	this.walk(data);
}
Observer.prototype = {
	walk: function walk(data) {
		var _this = this;

		Object.keys(data).forEach(function (key) {
			_this.defineReactive(data, key, data[key]);
		});
	},
	defineReactive: function defineReactive(data, key, val) {
		observe(val); //递归遍历所有子属性
		var dep = new Dep();
		Object.defineProperty(data, key, {
			enumerable: true,
			configurable: true,
			get: function get() {
				if (Dep.target) {
					//"是否需要添加订阅者"
					dep.addSub(Dep.target);
				}
				return val;
			},
			set: function set(newVal) {
				if (val === newVal) {
					return;
				}
				val = newVal;
				console.log("属性" + key + '已经被监听了,现在值为："' + newVal.toString() + '"');
				dep.notify(); //如果数据变化，通知所有订阅者
			}
		});
	}
};

//遍历所有属性
function observe(data) {
	if (!data || (typeof data === 'undefined' ? 'undefined' : _typeof(data)) !== 'object') {
		return;
	}
	return new Observer(data);
}
//存储监听，并设置触发方法
function Dep() {
	this.subs = [];
}
Dep.prototype = {
	addSub: function addSub(sub) {
		this.subs.push(sub);
	},
	notify: function notify() {
		//这个是不是会更新所有的，没有做优化的
		this.subs.forEach(function (sub) {
			sub.update();
		});
	}

	//监听器
};function Watcher(vm, exp, cb) {
	this.cb = cb;
	this.vm = vm;
	this.exp = exp;
	this.value = this.get();
}
Watcher.prototype = {
	update: function update() {
		this.run();
	},
	run: function run() {
		var value = this.vm.data[this.exp];
		var oldVal = this.value;
		if (value !== oldVal) {
			this.value = value;
			this.cb.call(this.vm, value, oldVal);
		}
	},
	get: function get() {
		Dep.target = this;
		var value = this.vm.data[this.exp];
		Dep.target = null;
		return value;
	}
	//编译模版
};function Compile(el, vm) {
	this.vm = vm;
	this.el = document.querySelector(el);
	this.fragment = null;
	this.init();
}
Compile.prototype = {
	init: function init() {
		if (this.el) {
			this.fragment = this.nodeToFragment(this.el);
			this.compileElement(this.fragment);
			this.el.appendChild(this.fragment);
		} else {
			console.log("Dom 元素不存在");
		}
	},
	nodeToFragment: function nodeToFragment(el) {
		var fragment = document.createDocumentFragment();
		var child = el.firstChild;
		while (child) {
			//appendChild会移动元素，原来的地方就删除，放到新的元素下面
			fragment.appendChild(child);
			child = el.firstChild;
		}
		return fragment;
	},
	compileElement: function compileElement(el) {
		var childNodes = el.childNodes;
		var self = this;
		[].slice.call(childNodes).forEach(function (node) {
			var reg = /\{\{(.*)\}\}/;
			var text = node.textContent;
			if (self.isTextNode(node) && reg.test(text)) {
				self.compileText(node, reg.exec(text)[1]);
			}
			if (node.childNodes && node.childNodes.length) {
				self.compileElement(node);
			}
		});
	},
	compileText: function compileText(node, exp) {
		var self = this;
		var initText = this.vm[exp];
		this.updateText(node, initText);
		new Watcher(this.vm, exp, function (value) {
			self.updateText(node, value);
		});
	},
	updateText: function updateText(node, value) {
		node.textContent = typeof value == 'undefined' ? '' : value;
	},
	isTextNode: function isTextNode(node) {
		return node.nodeType == 3;
	}
};

//外部调用方法
function SelfVue(options) {
	var self = this;
	this.methods = options.methods;
	this.data = options.data;

	Object.keys(this.data).forEach(function (key) {
		self.proxyKeys(key);
	});
	observe(this.data);

	new Compile(options.el, this);

	options.mounted.call(this);
}
SelfVue.prototype = {
	proxyKeys: function proxyKeys(key) {
		var self = this;
		Object.defineProperty(this, key, {
			enumerable: false,
			configurable: true,
			get: function get() {
				return self.data[key];
			},
			set: function set(newVal) {
				self.data[key] = newVal;
			}
		});
	}
};