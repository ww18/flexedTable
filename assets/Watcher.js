/**
 * Created by ww on 2018/4/2.
 */
import Dep from 'Dep.js';
class Watcher{
    constructor(vm, key, cb){
        this.vm = vm;
        this.key = key;
        this.cb = cb;
        this.value = this.get();
    }
    get(){
        Dep.default = this;
        var value = this.vm.data[this.key];
        Dep.default = null;
        return value;
    }
    run(){
        var newVal = this.vm.data[this.key];
        var oldVal = this.value;
        if(newVal !== oldVal){
            this.cb.call(this.vm, newVal, oldVal);
        }
    }
}

export Watcher;