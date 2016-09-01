<?
$c = $_COOKIE['shelian'];
if(empty($c)){
    header('location:./index.php');
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title></title>
    <link rel="stylesheet" href="css/bootstrap.min.css">
    <link rel="stylesheet" href="css/app.css">
<style>
.foot{

    width: 100%;
    font-size: 1.2em;
    text-align: center;

}
</style>
</head>
<body>
    <div class="container">
        <div class="media">
             <div class="media-object pull-right">
                 <!-- <div class="thumbnail people">
                     <img src="image/people.jpg" class="img-responsive">
                 </div> -->
                 <div class="row">
                     <p class="col-xs-6">
                         <button type="button" class="btn btn-danger btn-sm" data-toggle="modal" data-target="#logoOut">登出</button>
                     </p>
                     <div class="modal fade" id="logoOut" tabindex="-1" role="dialog" aria-labelledby="logoOut" aria-hidden="true">
                         <div class="modal-dialog">
                             <div class="modal-content">
                                 <div class="modal-header">
                                     <h3>确定登出?
                                     <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
                                     </h3>
                                 </div>
                                 <div class="modal-footer">
                                     <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
                                     <button type="button" class="btn btn-danger" id="logoOutButton" onClick="clicke()">登出</button>
                                 </div>
                             </div>
                         </div>
                     </div>
                 </div>
             </div>
           <div class="media-body">
                <div class="col-sm-4 col-md-offset-1">
                    <h1 class="media-heading"><strong><span id="association">社团：</span></strong></h1>
                </div>                 
           </div>
        </div>
    </div>
    <hr>
    <div class="container">
        <div class="aside container col-md-3">
        	<!--屏幕大于874px时显示，PC端-->
            <ul class="list-group hidden-sm hidden-xs" id="apartment">
                <span class="list-group-item list-group-item-heading">部门</span>
            </ul>
        </div>
        <div class="container col-md-9">
            <div class="container visible-sm col-sm-12 visible-xs">
                <!--屏幕小于874px时显示，移动端-->
               <button type="button" class="btn btn-primary dropdown-toggle visible-sm col-sm-12 visible-xs col-xs-12" id="dropdownMenu" data-toggle="dropdown">展开部门<span class="caret"></span></button>
               <ul class="dropdown-menu pull-right" role="menu" aria-labelledby="dropdownMenu1" id="apartmentMobile">
               </ul>
                <!--屏幕小于874px时显示，移动端-->
            </div>
            <div class="container col-sm-12">
                
                    <table class="table table-hover table-responsive table-bordered" id="memberList">
                        <thead>
                            <tr id="memberListHeader">
                                <td class="col-md-3">人员名</td>
                                <td class="col-md-3">短号</td>
                                <!-- <td class="col-md-3">短号</td> -->
                                <td class="col-md-3">短信</td>
                            </tr>
                        </thead>
                        <tbody>
                        </tbody>
                    </table>
					<!-- 
                    <div class="container col-sm-12">
                        <nav class="text-center">
                            <ul class="pagination">
                                <li class="disabled">
                                    <a href="#" aria-label="Previous">
                                        <span aria-hidden="true">&laquo;</span>
                                    </a>
                                </li>
                                <li class="active"><a href="#">1</a></li>
                                <li><a href="#">2</a></li>
                                <li><a href="#">3</a></li>
                                <li><a href="#">4</a></li>
                                <li><a href="#">5</a></li>
                                <li><a href="#">...</a></li>
                                <li><a href="#">100</a></li>
                                <li>
                                    <a href="#" aria-label="Next">
                                        <span aria-hidden="true">&raquo;</span>
                                    </a>
                                </li>
                            </ul>
                        </nav>
                    </div>
                	 -->
            </div>
        </div>
    </div>
<div class="foot">
<span>版权所有©星空学生创新中心
</span>
</div>
    <script src="js/jquery-1.11.3.js"></script>
    <script src="js/bootstrap.min.js"></script>
    <script src="js/function3.js"></script>
    <script language="javascript" type="text/javascript">
      function clicke(){
        document.cookie="shelian=";
        window.location.href="./index.php"; 
     }
    </script>
</body>
</html>