/**
 * Created by ww on 2018/4/2.
 */
class Dep{
    constructor(){
        this.subs = [];
    }
    add(notify){
        this.subs.push(notify);
    }
    notify(){
        this.subs.forEach((item)=>{
            item.run();
        })
    }
}

export Dep;
