function FlexedTable(opt){
	var defaultOpt = {
		fixedLeft: 0,
		fixedRight: 0
	}
	this.opt = Object.assign(defaultOpt, opt);
	this.fixedLeft = this.opt.fixedLeft;
	this.fixedRight = this.opt.fixedRight;
	this.data = this.opt.data;
	this.container = document.querySelector(this.opt.constainer);
	this.header = this.opt.header;
	var divC = document.createElement('div');
	divC.className = 'flexed-table-row';
	this.divContainer = divC;
	this.init();
	this.addEvent();
}
FlexedTable.prototype = {
	constructor: FlexedTable,
	init(){
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
			endIdx: this.header.length - this.fixedRight,
			className: "flexed-table-item"
		};
		var middleTable = this.createTable(objMiddle);
		//right
		var objRight = {
			startIdx: this.header.length - this.fixedRight,
			endIdx: this.header.length,
			className: "fixed-body-right"
		};
		var rightTable = this.createTable(objRight);

		this.divContainer.appendChild(leftTable);
		this.divContainer.appendChild(middleTable);
		this.divContainer.appendChild(rightTable);
		this.container.appendChild(this.divContainer);
	},
	createTable(obj){
		if(obj.startIdx == obj.endIdx){
			return '';
		}
		var divContainer = document.createElement('div');
		divContainer.className = obj.className;
		var tableN = document.createElement('table');
		tableN.className = "flexed-table";
		var flagTh = false;
		for(var j = 0; j < this.data.length; j++){
			var tableTr = document.createElement('tr');
			//生成table
			for(var i = obj.startIdx; i < obj.endIdx; i++){
				if(!flagTh && i >= obj.startIdx && i < obj.endIdx){
					var th = document.createElement('th');
					th.innerHTML = this.header[i].value;
					if(i == obj.endIdx-1){
						flagTh = true;
					}
				}else{
					var th = document.createElement('td');
					th.innerHTML = this.data[j][this.header[i].key];
				}
				tableTr.appendChild(th);
			}
			tableN.appendChild(tableTr);
		}
		divContainer.appendChild(tableN);
		return divContainer;
	},
	addEvent(){
		tableContainer.addEventListener('mouseover', (e)=>{
			this.fixedTableHover(e);
		},false);
		tableContainer.addEventListener('mouseout', (e)=>{
			this.fixedTableOut(e);
		},false);
	},
	fixedTableHover(e){}


}
var tableContainer = document.querySelector('.right-content');
var fixedBody = document.querySelector('.fixed-body');


function fixedTableHover(e){
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
		var table = document.querySelectorAll('.flexed-table');

		for(let i = 0; i < table.length; i++){
			
			for(let j = 0; j < table[i].childNodes.length; j++){
				let nodeBody = table[i].childNodes[j];
				if(nodeBody.nodeName == 'TBODY'){
					let arr1 = [];
					for(let k = 0; k < nodeBody.childNodes.length; k++){
						if(nodeBody.childNodes[k].nodeName == 'TR'){
							arr1.push(nodeBody.childNodes[k]);
						}
					}
					arr1[index].className = 'fixed-hover';
				}
			}
		}
	}
}
function fixedTableOut(e){
	var ele = document.querySelectorAll('.fixed-hover');
	ele.forEach(function(item,index){
		item.className = '';
	})
}


