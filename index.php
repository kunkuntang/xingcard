<?
$a = $_COOKIE['login'];
$b = $_COOKIE['shida'];
$c = $_COOKIE['shelian'];
$d = $_COOKIE['xiao'];
if (!empty($a)) {
	header('location:./xingcard2.php');
} elseif (!empty($b)) {
	header('location:./xingcard2.1.php');
} elseif (!empty($c)) {
	header('location:./xingcard2.2.php');
} elseif (!empty($d)) {
	header('location:./xingcard2.3.php');
}
?>
	<!DOCTYPE html>
	<html>

	<head>
		<meta charset="utf-8">
		<title>
			登陆
		</title>
		<meta http-equiv="X-UA-Compatible" content="IE=edge">
		<meta content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" name="viewport" />
	</head>
	<style type="text/css">
		body,ol,ul,h1,h2,h3,h4,h5,h6,p,th,td,dl,dd,form,fieldset,legend,input,textarea,select {
			margin: 0;
			padding: 0;
			font-family: "微软雅黑";
		}
		section {
			width: 100%;
			height: 450px;
			background-color: #1E90FF;
			position: relative;
		}
		section .image {
			padding-top: 20%;
			text-align: center;
		}
		.image img {
			width: 120px;
			height: 120px;
		}
		section .title {
			position: relative;
			width: 100%;
			text-align: center;
			top: 5%;
		}
		.container {
			position: relative;
			width: 100%;
			height: 40%;
			top: 10%;
			background-color: #fff;
		}
		section span {
			font-size: 2em;
			color: #fff;
			text-align: center;
		}
		input {
			position: relative;
			width: 70%;
			height: 40px;
			margin: 8% 15% 0 15%;
			font-size: 1.5em;
			border-radius: 5px;
		}
	</style>

	<body ontouchmove='return false;'>
		<section>
			<div class="image">
				<img src="image/xingcard.png">
			</div>
			<div class="title">
				<span>星名片v1.0</span>
			</div>
			<div class="container">
				<form>
					<div>
						<input type="text" id="login" placeholder="输入你的社团/组织ID">
					</div>
					<div>
						<input type="submit" value="登陆" id="submit" style="background-color:#1E90FF;width:71%;color:#fff">
					</div>
				</form>
			</div>
		</section>
	</body>
	<script type="text/javascript">
		var login = document.getElementById('login');
		var submit = document.getElementById('submit');
		var date = new Date();
		var expireDays = 30;
		
		if (getCookieValue() != "") {
			window.location.href = "./Xingcard.php";
		} 
		 
		//将date设置为10天以后的时间
		date.setTime(date.getTime() + expireDays * 24 * 3600 * 1000);
		 //将userId和userName两个cookie设置为10天后过期
		submit.onclick = function() {
			var pw = "www.xingkong.us=" + login.value + "; expires=" + date.toGMTString();
			document.cookie = pw;
			window.location.href = "./Xingcard.php";
			return false;
		}

		function getCookieValue() {
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
	</script>

	</html>