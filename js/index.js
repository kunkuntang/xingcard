window.onload = function() {
	var button = document.getElementById('button');
	var obj = document.getElementById('container');
	var title = document.getElementById('title');
	var tel = null;
	var telephone = document.getElementById('telephone');
	var GroupInfo = {
		0: "第一组",
		1: "第二组",
		2: "第三组",
		3: "第四组",
		4: "第五组",
		length: 5
	};
	var Group = ["第一组", "第二组", "第三组"];
	var timer = null;
	var GobalDate = null;
	var GobalIndex = 0;
	var GobalnewDiv = null;


	//函数功能块
	var fun = {
		//输出部门函数
		OutputDepartments: function() {
			var sideBar = document.getElementById("sidebar");
			var departments = document.getElementById("departments");
			for (var i = 0; i < GobalDate.departments.length; i++) {
				var depart = document.createElement('li');
				depart.innerHTML = GobalDate.departments[i].name;
				departments.appendChild(depart);
			}
			tel = departments.getElementsByTagName('li');
			for (var i = 0; i < tel.length; i++) {
				tel[i].id = i;
			}

			for (var i = 0; i < GobalDate.departments.length; i++) {
				tel[i].onclick = function() {
					GobalIndex = this.id;
					fun.OutputMembers();
					animation.startMove(-200, -50);
				}
			}
		},
		OutputMembers: function() { 
			//清空membersList里的内容然后再添加新的内容 
			var memberUl = document.getElementById('membersList'); //此语句必须在这里，因为每次清空列表后都要重新在内存中找新创的id为membersList的ul !!!!!
			telephone.removeChild(memberUl);
			var newDiv = document.createElement('div');
			newDiv.id = "membersList"
			telephone.appendChild(newDiv);
			for (var i = 0; i < GobalDate.departments[GobalIndex].members.length; i++) {
				var newUl = document.createElement('ul');
				var newLiName = document.createElement('li');
				var newLiTel = document.createElement('li');
				var newLiMes = document.createElement('li');
				var newTelA = document.createElement('a');
				var newMsmA = document.createElement('a');
				var newI = document.createElement('i');
				var telValue = "tel:" + GobalDate.departments[GobalIndex].members[i].tel;
				var msmValue = "sms:" + GobalDate.departments[GobalIndex].members[i].tel;

				//循环输出成员名字
				newLiName.innerHTML = GobalDate.departments[GobalIndex].members[i].username;

				//循环输出成员电话
				newLiTel.className = "longTel";
				newTelA.innerHTML = GobalDate.departments[GobalIndex].members[i].tel;
				newTelA.setAttribute("href", telValue);

				//循环输出成员短信
				newI.className = "fa fa-fw fa-envelope fa-lg";
				newMsmA.setAttribute("href", msmValue);

				//把	电话a链接	加到li里
				newLiTel.appendChild(newTelA);
				newLiTel.appendChild(newI);

				//把	短信a链接、短信图标	加到li里
				newLiMes.appendChild(newMsmA);
				newMsmA.appendChild(newI);

				//把名字、电话、短信加到ul里
				newUl.appendChild(newLiName);
				newUl.appendChild(newLiTel);
				newUl.appendChild(newLiMes);

				//把ul加到HTMl中
				newDiv.appendChild(newUl);
			}
		},
		getCookie: function() {
			var strCookie = document.cookie;
			var arrCookie = strCookie.split("; ");
			for (var i = 0; i < arrCookie.length; i++) {
				var arr = arrCookie[i].split("=");
				if ("www.xingkong.us" == arr[0]) {
					return arr[1];
				}
			}
			return "";
		}
	};

	//定义动画函数块
	var animation = {
		//部门点击按钮动画
		startMove: function(num, speed) {
			clearInterval(timer);
			var sidebar = document.getElementById('sidebar');
			timer = setInterval(function() {
				if (sidebar.offsetLeft == num) {
					clearInterval(timer);
				} else {
					sidebar.style.left = sidebar.offsetLeft + speed + 'px';
				}
			}, 30)
		},

		show: function() {
			for (var i = 0; i < tel.length; i++) {

			}
		}
	};


	function Init() {
		$.ajax({
			type: "POST",
			url: 'http://xingkongus.duapp.com/index.php/User/loginAPP',
			dataType: 'json',
			data: {
				key: 82015,
				name: fun.getCookie(),
			},
			success: function(data) {
				if(data.result == 200){
					alert("请输入正确的ID");
					document.cookie = "www.xingkong.us=";
					location.href="index.php";					
				}
				//循环输出部门 outputApartment
				GobalDate = data;
				title.innerHTML = data.department_belong;
				fun.OutputDepartments();
				fun.OutputMembers()

			},
			error: function(XMLHttpRequest, textStatus, errorThrown) {
				console.log(XMLHttpRequest.status);
				console.log(XMLHttpRequest.readyState);
				console.log(textStatus);
			},

		})
	}

	Init();
	button.onclick = function() {
		animation.startMove(0, 50);
		obj.addEventListener('touchmove', function(event) {
			animation.startMove(-200, -50);
		}, false);
	}
}

/*var pwinfo = {};
	pwinfo['key'] = 82015;
	pwinfo['name'] = "qingma100";
	console.log(pwinfo);
	var pw = JSON.stringify(pwinfo);
	console.log(pw);

	var request;
	if (window.XMLHttpRequest) {
		request = new XMLHttpRequest();
	} else {
		request = new ActiveXObject("Miscrosoft.XMLHTTP");
	}

	request.open("post", "http://xingkongus.duapp.com/index.php/User/loginAPP", true);
	request.send(pw);
*/



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