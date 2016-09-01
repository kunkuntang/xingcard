<!DOCTYPE html>
<html>

	<head>
		<meta charset="utf-8">
		<title>
			星名片在线版
		</title>
		<meta http-equiv="X-UA-Compatible" content="IE=edge">
		<meta content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" name="viewport" />
		<link rel="stylesheet" type="text/css" href="css/style.css">
		<link rel="stylesheet" href="css/font-awesome.min.css">
	</head>

	<body>
		<!-- ontouchmove='return false;' -->
		<div id="sidebar">
			<ul id="departments" class="section">
			</ul>
		</div>
		<div class="container" id="container">
			<div class="header">
				<span id="button">
						<i class="fa fa-fw fa-bars fa-lg">
						</i>
					</span>
				<span id="title" class="title">
					</span>
				<span id="back">
						<i onClick="clicke()" class="fa fa-fw fa-share-square-o">
						</i>
					</span>
				<ul>
					<li class="li1">
						<span>
								<i class="fa fa-fw fa-user fa-lg">
								</i>名字
							</span>
					</li>
					<li class="li2">
						<span id="change">
								<i class="fa fa-fw fa-phone fa-lg">
								</i>电话
							</span>
					</li>
					<li class="li3">
						<span>
								<i class="fa fa-fw fa-envelope fa-lg">
								</i>短信
							</span>
					</li>
				</ul>
			</div>
			<div class="telephone" id="telephone">
				<div id="membersList"> </div>
			</div>
			<div class="foot">
				<span>版权所有©星空学生创新中心
					</span>
			</div>
		</div>
		<script type="text/javascript" src="js/index.js"></script>
		<script src="js/jquery-1.11.3.js" type="text/javascript" charset="utf-8"></script>
		<script language="javascript" type="text/javascript">
			
			function clicke() {
				document.cookie = "www.xingkong.us=";
				window.location.href = "./index.php";
			}
		</script>
	</body>

</html>