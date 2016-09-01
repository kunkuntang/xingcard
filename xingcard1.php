<?
$a = $_COOKIE['shida'];
if(empty($a)){
	header('location:./index.php');
}

?>
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<title>星名片</title>
<meta http-equiv="X-UA-Compatible" content="IE=edge"> 
<meta content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" name="viewport" />
<link rel="stylesheet" type="text/css" href="css/style.css">
<link rel="stylesheet" href="css/font-awesome.min.css">
</head>
<body>
<!-- ontouchmove='return false;' -->
<div id="box">
	<div id="sidebar">
		<ul class="section" id="section">
	    	<li id="first"  alt="1" style="background-color:#35495f">第一组</li>
	    	<li id="second" alt="2" >第二组</li>
	    	<li id="third" alt="3" >第三组</li>
	    	<li id="fourth" alt="4" >第四组</li>
	    	<li id="fifth" alt="5" >第五组</li>
	    	<li id="sixth" alt="6" >第六组</li>
	    	<li id="seventh" alt="7" >第七组</li>
	    	<li id="eighth" alt="8" >第八组</li>
	    	<li id="ninth" alt="9" >第九组</li>
	    	<li id="tenth" alt="10" >第十组</li>
	    	<li id="worker" alt="11" >工作组</li>
		</ul>
	</div>
    <div class="container" id="container">
    	<div class="header">
			<span id="button"><i class="fa fa-fw fa-bars fa-lg"></i></span>
            <span class="title">青马工程·华广100</span>
            <span id="back"><i onClick="clicke()" class="fa fa-fw fa-share-square-o"></i></span>
			<ul>
				<li class="li1"><span><i class="fa fa-fw fa-user fa-lg"></i>名字</span></li>
				<li class="li2"><span id="change"><i class="fa fa-fw fa-phone fa-lg"></i>电话</span></li>
				<li class="li3"><span><i class="fa fa-fw fa-envelope fa-lg"></i>短信</span></li>
			</ul>
			
		</div>
		<div class="telephone" id="telephone1" >
			<ul>
		 		<li><span>陈雪君</span></li>
		 		<li class="longTel"><span><a href="tel:18826242543">18826242543</a></span></li>
		 		<li><a href="sms:18826242543"><i class="fa fa-fw fa-envelope fa-lg"></i></a></li>	
		 	</ul>
		</div>
		
        <div class="foot">
			<span>版权所有©星空学生创新中心
			</span>
		</div>
	</div>
</div>
<script type="text/javascript" src="js/index.js">
</script>
</body>
</html>