$(function(){
	//获取location中指定值
	function getLocationValue(name){
	    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
		var r = window.location.search.substr(1).match(reg);
		if(r!=null)return  decodeURI(r[2]); return null;
	}
	var cId = getLocationValue("cId");    //直接获取url中的字段值
	var cBelongto = getLocationValue("belongto"); 

	//ajax读取JSON文件中的数据
	$.ajax({
   		url: "./js/webData.json",//json文件位置
   		type: "GET",
   		dataType: "json",     //返回数据格式为json
   		success: function(data){
			if(data.webName.length!=0){
				var htmlOther="";
				for(var i=0;i<data.webName.length;i++){
					var childObj=data.webName[i].children;
					for(var j=0;j<childObj.length;j++){
						if(childObj[j].id==cId){
							$(".conDiv iframe").attr("src",childObj[j].ifmSrc);
						}else{
							if(childObj[j].belongto==cBelongto){
								htmlOther+="<a class='AboutIt' href='./demo.html?cId="+childObj[j].id+"&belongto="+childObj[j].belongto+"'>"+childObj[j].name+"</a>";
							}
						}
					}
				}
				$(".pageTurn").append(htmlOther);
			}
   			
	    }
	})
	
})
