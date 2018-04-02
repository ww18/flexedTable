/**
 * Created by ww on 2018/4/2.
 */
import Dep from './Dep.js';
class Observer{
    constructor(data){
        this.walk(data);
    }
    walk(data){
        Object.keys(data).forEach((key)=>{
            this.definedProperty(data,key,data[key]);
        })
    }
    definedProperty(data, key, val){
        observe(val);
        var dep = new Dep();
        Object.defineProperty(data, key, {
            enumerable: true,
            configurable: true,
            get(){
                if(Dep.default){
                    dep.subs.push(Dep.default);
                }
                return val;
            },
            set(newVal){
                if(val === newVal){
                    return;
                }
                val = newVal;
                dep.notify();
            }
        })
    }
}
function observe(data){
    if(!data || Array.isArray(data)){
        return;
    }
    return new Observer(data);
}
export default observe;