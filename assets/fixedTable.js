/**
 * Created by ww on 2018/4/2.
 */
import observe from './Observer.js';
import Compile from './Compile.js';
import Watcher from './Watcher.js';

class FixedTable{
    constructor(opt){
        var defaultOpt = {
            fixedLeft: 0,
            fixedRight: 0
        }
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

        observe(this.data);

        new Watcher(this.data, 'data', ()=>{
            this.init();
        })

        this.init();

        this.addEvent();
    }
    init(){
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
    createTable(obj){
        if(obj.startIdx == obj.endIdx){
            return '';
        }
        var divContainer = document.createElement('div');
        divContainer.className = obj.className;
        var tableN = document.createElement('table');
        tableN.className = "flexed-table";
        var flagTh = false;
        for(var j = 0; j < this.data.data.length; j++){
            var tableTr = document.createElement('tr');
            //生成table
            for(var i = obj.startIdx; i < obj.endIdx; i++){
                if(!flagTh && i >= obj.startIdx && i < obj.endIdx){
                    var th = document.createElement('th');
                    th.innerHTML = this.headerHtml.querySelectorAll('th')[i].innerHTML;
                    if(i == obj.endIdx-1){
                        flagTh = true;
                    }
                }else{
                    var th = document.createElement('td');
                    th.innerHTML = this.bodyHtml.querySelectorAll('td')[i].innerHTML;
                }
                tableTr.appendChild(th);
            }
            tableN.appendChild(tableTr);
            //操作的是虚拟dom
            new Compile(tableTr, this.data.data[j]);
        }
        divContainer.appendChild(tableN);
        return divContainer;
    }
    addEvent(){
        this.divContainer.addEventListener('mouseover', (e)=>{
            this.fixedTableHover(e);
        },false);
        this.divContainer.addEventListener('mouseout', (e)=>{
            this.fixedTableOut(e);
        },false);
    }
    fixedTableHover(e){
        var ele = e.target.parentElement;
        if(ele.nodeName.toLowerCase() == 'tr'){
            ele.className = 'fixed-hover';
            var arr = Array.prototype.slice.call(ele.parentNode.childNodes,0);
            var nodeArr = [];
            arr.forEach(function(item, index){
                if(item.nodeName == 'TR'){
                    nodeArr.push(item);
                }
            })
            var index = nodeArr.indexOf(ele);
            var table = this.divContainer.querySelectorAll('.flexed-table');

            for(let i = 0; i < table.length; i++){
                let arr1 = [];
                for(let j = 0; j < table[i].childNodes.length; j++){
                    let nodeBody = table[i].childNodes[j];
                    if(j == index){
                        nodeBody.className = 'fixed-hover';
                    }
                }
            }
        }
    }
    fixedTableOut(){
        var ele = this.divContainer.querySelectorAll('.fixed-hover');
        ele.forEach(function(item,index){
            item.className = '';
        })
    }
}

export default FixedTable;