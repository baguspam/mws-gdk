function myLike(x) {
    
    if(x.className === "readmore color-red"){
    	x.classList.toggle('color-red');
    	var str = String(x.value);
    	var z = str.substr(str.lastIndexOf("-")+1);
    	var id = str.split("-",1);
    	//console.log(str+'  '+z);
	    var y = Number(z) - 1;
	    x.value = id+'-'+y;
	    x.innerHTML = '<i class="fa fa-heart"></i> <span style="color:white;">&nbsp;'+y+' Like</span>';
    }else{
    	x.classList.toggle('color-red');
	    var str = String(x.value);
    	var z = str.substr(str.lastIndexOf("-")+1);
    	var id = str.split("-",1);
    	//console.log(str+'  '+z);
	    var y = Number(z) + 1;
	    x.value = id+'-'+y;
	    x.innerHTML = '<i class="fa fa-heart"></i> <span style="color:white;">&nbsp;'+y+' Like</span>';
    }
}