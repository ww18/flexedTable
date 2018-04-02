/**
 * Created by ww on 2018/4/2.
 */
import Watcher from './Watcher.js';
//编译模版
function Compile(el, data){
    this.vm = data;
    this.el = el;
    this.fragment = null;
    this.init();
}
Compile.prototype = {
    init: function(){
        if(this.el){
            this.fragment = this.nodeToFragment(this.el);
            this.compileElement(this.fragment);
            this.el.appendChild(this.fragment);
        }else{
            console.log("Dom 元素不存在");
        }
    },
    nodeToFragment: function(el){
        var fragment = document.createDocumentFragment();
        var child = el.firstChild;
        while(child){
            //appendChild会移动元素，原来的地方就删除，放到新的元素下面
            fragment.appendChild(child);
            child = el.firstChild;
        }
        return fragment;
    },
    compileElement(el){
        var childNodes = el.childNodes;
        var self = this;
        [].slice.call(childNodes).forEach(function(node){
            var reg = /\{\{(.*)\}\}/;
            var text = node.textContent;
            if(self.isTextNode(node) && reg.test(text)){
                self.compileText(node, reg.exec(text)[1]);
            }
            if(node.childNodes && node.childNodes.length){
                self.compileElement(node);
            }
        })
    },
    compileText(node, exp){
        var initText = this.vm[exp];
        this.updateText(node, initText);

    },
    updateText(node, value){
        node.textContent = typeof value == 'undefined'?'': value;
    },
    isTextNode(node){
        return node.nodeType == 3;
    }
}

export default Compile;