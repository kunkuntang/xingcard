window.onload=function(){
	var button=document.getElementById('button');
     var obj = document.getElementById('container');

  

	button.onclick= function(){
			startMove(0,50);
			obj.addEventListener('touchmove', function(event) {
   				 startMove(-200,-50);
			}, false);
	}


	//定义侧边栏滑动函数
	var timer=null;
	function startMove(num,speed){
		clearInterval(timer);
		var sidebar=document.getElementById('sidebar');
		timer=setInterval(function(){
			if(sidebar.offsetLeft==num){
				clearInterval(timer);
			}
			else{
			sidebar.style.left=sidebar.offsetLeft+speed+'px';
			}
		},30)
	}

	//长短号转换
	// var change=document.getElementById('change');
	// var num = 0;
	//       change.onclick=function(){
	//           if (num % 2 ==0) {
	//       		change.innerHTML='<i class="fa fa-fw fa-phone fa-lg"></i>短号<i class="fa fa-fw fa-angle-down fa-lg"></i>';
	//       	    num++;
	//       	}
	//       	else if (num % 2 ==1 ) {
	//       		change.innerHTML='<i class="fa fa-fw fa-phone fa-lg"></i>长号<i class="fa fa-fw fa-angle-down fa-lg"></i>';
	//       	    num++;
	//       	};
	// }


	//获取不同组的电话
	var tel1=document.getElementById('telephone1');
	var tel2=document.getElementById('telephone2');
	var tel3=document.getElementById('telephone3');
	var tel4=document.getElementById('telephone4');
	var tel5=document.getElementById('telephone5');
	var tel6=document.getElementById('telephone6');
	var tel7=document.getElementById('telephone7');
	var tel8=document.getElementById('telephone8');
	var tel9=document.getElementById('telephone9');
	var tel10=document.getElementById('telephone10');
	var tel11=document.getElementById('telephone11');
	var tel12=document.getElementById('telephone12');
	var tel13=document.getElementById('telephone13');
	var tel14=document.getElementById('telephone14');
	var tel15=document.getElementById('telephone15');


    //获取所有组
	var first=document.getElementById('first');
	var second=document.getElementById('second');
	var third=document.getElementById('third');
	var fourth=document.getElementById('fourth');
	var fifth=document.getElementById('fifth');
	var sixth=document.getElementById('sixth');
	var seventh=document.getElementById('seventh');
	var eighth=document.getElementById('eighth');
	var ninth=document.getElementById('ninth');
	var tenth=document.getElementById('tenth');
	var eleventh=document.getElementById('eleventh');
	var twelfth=document.getElementById('twelfth');
	var thirteenth=document.getElementById('thirteenth');
	var fourteenth=document.getElementById('fourteenth');
	var fifteenth=document.getElementById('fifteenth');
    //声明数组
	var arr= new Array(first,second,third,fourth,fifth,sixth,seventh,eighth,ninth,tenth,eleventh,twelfth,thirteenth,fourteenth,fifteenth);
	var Arr= new Array(tel1,tel2,tel3,tel4,tel5,tel6,tel7,tel8,tel9,tel10,tel11,tel12,tel13,tel14,tel15);
	// for (var i = 0; i < 11; i++) {
		arr[0].onclick=function(){
			for(var j=0;j<15;j++){
				Arr[j].style.visibility="hidden";
				arr[j].style.backgroundColor="#2d3f51";
				if(j==0)
				{
					Arr[0].style.visibility="visible";
					arr[0].style.backgroundColor="#35495f";
				} 
			}
			startMove(-200,-50);
		}
		arr[1].onclick=function(){
			for(var j=0;j<15;j++){
				Arr[j].style.visibility="hidden";
				arr[j].style.backgroundColor="#2d3f51";
				if(j==1)
				{
					Arr[1].style.visibility="visible";
					arr[1].style.backgroundColor="#35495f";
				} 
			}
			startMove(-200,-50);
		}
		arr[2].onclick=function(){
			for(var j=0;j<15;j++){
				Arr[j].style.visibility="hidden";
				arr[j].style.backgroundColor="#2d3f51";
				if(j==2)
				{
					Arr[2].style.visibility="visible";
					arr[2].style.backgroundColor="#35495f";
				} 
			}
			startMove(-200,-50);
		}
		arr[3].onclick=function(){
			for(var j=0;j<15;j++){
				Arr[j].style.visibility="hidden";
				arr[j].style.backgroundColor="#2d3f51";
				if(j==3)
				{
					Arr[3].style.visibility="visible";
					arr[3].style.backgroundColor="#35495f";
				} 
			}
			startMove(-200,-50);
		}
		arr[4].onclick=function(){
			for(var j=0;j<15;j++){
				Arr[j].style.visibility="hidden";
				arr[j].style.backgroundColor="#2d3f51";
				if(j==4)
				{
					Arr[4].style.visibility="visible";
					arr[4].style.backgroundColor="#35495f";
				} 
			}
			startMove(-200,-50);
		}
		arr[5].onclick=function(){
			for(var j=0;j<15;j++){
				Arr[j].style.visibility="hidden";
				arr[j].style.backgroundColor="#2d3f51";
				if(j==5)
				{
					Arr[5].style.visibility="visible";
					arr[5].style.backgroundColor="#35495f";
				} 
			}
			startMove(-200,-50);
		}
		arr[6].onclick=function(){
			for(var j=0;j<15;j++){
				Arr[j].style.visibility="hidden";
				arr[j].style.backgroundColor="#2d3f51";
				if(j==6)
				{
					Arr[6].style.visibility="visible";
					arr[6].style.backgroundColor="#35495f";
				} 
			}
			startMove(-200,-50);
		}
		arr[7].onclick=function(){
			for(var j=0;j<15;j++){
				Arr[j].style.visibility="hidden";
				arr[j].style.backgroundColor="#2d3f51";
				if(j==7)
				{
					Arr[7].style.visibility="visible";
					arr[7].style.backgroundColor="#35495f";
				} 
			}
			startMove(-200,-50);
		}
		arr[8].onclick=function(){
			for(var j=0;j<15;j++){
				Arr[j].style.visibility="hidden";
				arr[j].style.backgroundColor="#2d3f51";
				if(j==8)
				{
					Arr[8].style.visibility="visible";
					arr[8].style.backgroundColor="#35495f";
				} 
			}
			startMove(-200,-50);
		}
		arr[9].onclick=function(){
			for(var j=0;j<15;j++){
				Arr[j].style.visibility="hidden";
				arr[j].style.backgroundColor="#2d3f51";
				if(j==9)
				{
					Arr[9].style.visibility="visible";
					arr[9].style.backgroundColor="#35495f";
				} 
			}
			startMove(-200,-50);
		}
		arr[10].onclick=function(){
			for(var j=0;j<15;j++){
				Arr[j].style.visibility="hidden";
				arr[j].style.backgroundColor="#2d3f51";
				if(j==10)
				{
					Arr[10].style.visibility="visible";
					arr[10].style.backgroundColor="#35495f";
				} 
			}
			startMove(-200,-50);
		}
		arr[11].onclick=function(){
			for(var j=0;j<15;j++){
				Arr[j].style.visibility="hidden";
				arr[j].style.backgroundColor="#2d3f51";
				if(j==11)
				{
					Arr[11].style.visibility="visible";
					arr[11].style.backgroundColor="#35495f";
				} 
			}
			startMove(-200,-50);
		}
		arr[12].onclick=function(){
			for(var j=0;j<15;j++){
				Arr[j].style.visibility="hidden";
				arr[j].style.backgroundColor="#2d3f51";
				if(j==12)
				{
					Arr[12].style.visibility="visible";
					arr[12].style.backgroundColor="#35495f";
				} 
			}
			startMove(-200,-50);
		}
		arr[13].onclick=function(){
			for(var j=0;j<15;j++){
				Arr[j].style.visibility="hidden";
				arr[j].style.backgroundColor="#2d3f51";
				if(j==13)
				{
					Arr[13].style.visibility="visible";
					arr[13].style.backgroundColor="#35495f";
				} 
			}
			startMove(-200,-50);
		}
		arr[14].onclick=function(){
			for(var j=0;j<15;j++){
				Arr[j].style.visibility="hidden";
				arr[j].style.backgroundColor="#2d3f51";
				if(j==14)
				{
					Arr[14].style.visibility="visible";
					arr[14].style.backgroundColor="#35495f";
				} 
			}
			startMove(-200,-50);
		}
}



	