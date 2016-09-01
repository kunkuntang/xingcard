/**
* Created by Administrator on 2015/8/4 0004.
*/
$(document).ready(function(){
    var memberListShow = {
        //放变量,初始化，获取dom 结构，加载函数
        URL:'http://debug.xingkong.us/List/adminlist/',//地址
        apartmentNum: 0,//部门列表数量
        memberListNum: 0,
        addFlag: true,//判断是否为编辑状态从而改变其他按钮样式
        $apartment: $("#apartment"),//左边部门列表ul
        $apartmentM: $("#apartmentMobile"),//手机端部门列表ul
        $memberList: $("#memberList"),//右边部门人员列表
        $memberListHeader: $("#memberListHeader"),
        listNum: 4,//总共的列表数-1 现5列 即除去多选框外的列数
        loginKey: 0,
        loginName: '',
        apartmentKind: 0, //  部门种类
        count: 0,//记录全选点击的次数 
        checkedCount: 0,//记录成员多选点击的次数
        data: null,//第一次加载时的缓存数据
        dataTemp: null,//后台临时传回的数据
        memberId: null,//临时存放当前编辑成员的id值
        $memberListEditeThis: null,//存放当前点击的添加人员列表的编辑按钮对象 '#editor'
        $memberListCancelThis: null,//'#cancel'
        $memberListCurrentTr: null,//当编辑行的tr
        index: 1,
        memberListEditeTemp: null,//临时存储编辑成员时的成员信息（数组）
        $editorThis: null,//当前编辑的按钮对象
        cancelButton: null,
        editorButton: null,
        checkFlag: null,//存放多选框
        apartmentChgThis: null,//当前编辑部门的编辑按钮
        postTemp: null,//临时存放Ajax返回数据
        apartmentCurrentIndex: null,
        judge: null,//真为添加人员，假为编辑人员
        num: 0, //编辑人员时记录当前第num行
        deleteJudge: false,//删除判断
        enterName: null,
        enterKey: null,

        init: function(){   
            //页面加载时初始化函数,事件出发功能
            //用户登出按钮功能
            $('#logoOutButton').on('click',function(){
                $.post('http://debug.xingkong.us/User/adminlogout/',{logOut:true},function(data){
                    location.href = data;
                });
            });
            //添加部门按钮功能
            $("#addApartment").on('click',function(){
                memberListShow.addApartment();
            });
            //添加部门修改事件
            $("#apartment").on('click',"#apartmentChg",function(){
                if(memberListShow.addFlag){
                    memberListShow.apartmentChgThis = $(this);
                    memberListShow.editeAparment();
                }
            });
            //添加部门删除事件
            $("#apartment").on('click','#apartmentDel',function () {
                if(memberListShow.addFlag){
                    if(confirm('确认删除？')){
                        $(this).parent().remove();
                    }
                }            
            });
            //添加checkbox全选按钮
            $('#selectAll').on("click",function(){
                memberListShow.selectAll();
            });
            //成员列表编辑功能
            $("tbody").on('click','#editor',function(){
                memberListShow.num = $(this).parent().parent().attr('index');
                memberListShow.$memberListEditeThis = $(this);
                memberListShow.$memberListCurrentTr = $('#memberList').find('tbody').children().eq(memberListShow.num).children();
                memberListShow.memberListEdite();
                $("#addConfirm").on('click',function(){
                    memberListShow.addConfirm();          
                });
                //按下取消后刷新表单内容
                $("#cancel").on('click',function(){
                    memberListShow.cancelEdite();
                });
            });
            //成员列表删除功能
            $("tbody").on('click','#del',function(){
                if(confirm('确认删除？')){
                    var _this = this;
                    var id = $(_this).parent().parent().attr('alt');
                    $.post("http://debug.xingkong.us/User/adminDelete/",{user_id_delete:id},function(data){
                    $(_this).parent().parent().remove();});
                }               
            });
            //增加成员的功能
            $('#addMemberList').on('click',function(){
                memberListShow.addMemberList();
            });
            //添加人员批量删除功能
            $('#delMemberList').on('click',function(){
                memberListShow.deleteJudge = true;
                memberListShow.delMemberList();
            });
            //部门列表点击事件
            memberListShow.$apartment.find('li').find('a').on('click',function(){
                if(memberListShow.addFlag){
                    $('#delMemberList').find('span').empty();
                    $('#delMemberList').attr('disabled',true);
                    memberListShow.apartmentKind = $(this).parent().attr('index');
                    memberListShow.outputMember();
                    memberListShow.count = 0;
                    memberListShow.checkedCount = 0;
                    memberListShow.checkFlag = memberListShow.$memberList.find('.multiply');
                    memberListShow.checkFlag.on('click',function(){
                        memberListShow.checkNum();
                    });
                    $(this).parent().siblings().children().css({'background-color':'white','color':'black'});
                    $(this).parent().siblings().css({'background-color':'white','color':'black'});
                    $(this).parent().children().css({'background-color':'#337ab7','color':'white'});
                    $(this).parent().css({'background-color':'#337ab7','color':'white'});
                }
            });
            //初始化成员列表样式
            memberListShow.$apartment.find('li').find('a').eq(0).css({'background-color':'#337ab7','color':'white'});
            memberListShow.$apartment.find('li').find('a').eq(0).parent().css({'background-color':'#337ab7','color':'white'});
            //选择出多选按钮
            memberListShow.checkFlag = memberListShow.$memberList.find('.multiply');
            //添加多选监听功能
            memberListShow.checkFlag.on('click',function(){
                memberListShow.checkNum();
            });
            //初始化，获取dom结构
            $('#association').html(memberListShow.data.department_belong);
            memberListShow.dataTemp = {};
            memberListShow.apartmentCurrentIndex = 0;
            memberListShow.postTemp = ['username','phone','tel'];
            memberListShow.memberListEditeTemp = ['','','','',''];
            memberListShow.cancelButton = '<button type="button" class="btn btn-danger btn-sm cancel" id="cancel">取消</button>';
            memberListShow.editorButton = '<button type="button" class="btn btn-primary btn-xs editor" id="editor">编辑</button><button type="button" class="btn btn-danger btn-xs del" id="del">删除</button>';
        },
        postdata:function(){
            /*$.post(URL, {key:82015,name:'xingkong'},function(data){
                console.log(data);
            });*/
            $.ajax({
                type:"POST",
                url:'http://debug.xingkong.us/User/adminloading/',
                dataType:'json',
                data:{
                    key:memberListShow.enterKey,
                    name: memberListShow.enterName,
                },
                success:function(data){
                    memberListShow.data = data;
                    console.log(data);
                    //循环输出部门 outputApartment
                    memberListShow.outputApartment();
                    memberListShow.outputMember();
                    memberListShow.init();
                },
                error: function(XMLHttpRequest, textStatus, errorThrown) {
                    console.log(XMLHttpRequest.status);
                    console.log(XMLHttpRequest.readyState);
                    console.log(textStatus);
                },

            })
        },
        //循环输出部门 outputApartment
        outputApartment:function(){
            var data = memberListShow.data;
            var memberListName = new Array();
            for(var i = 0 ; i<data.departments.length;i++){
                memberListName[i]=data.departments[i].name;
            }
            memberListShow.apartmentNum = data.departments.length;
            for(var i = 0; i<memberListShow.apartmentNum; i++){
                memberListShow.$apartment.append('<li class="list-group-item apartmentButton" index="' + i + '" ><a>' + memberListName[i] + '</a><span class="glyphicon glyphicon-remove pull-right" id="apartmentDel"></span><span class="glyphicon glyphicon-pencil pull-right" id="apartmentChg"></span></li>');
                memberListShow.$apartmentM.append('<li role="presentation" class="visible-sm visible-xs"><a role="menuitem" tabindex="-1" href="#">' + memberListName[i] + '</a></li>');
            }
        },
        //循环输出部门 outputApartment
        //循环输出人员列表  
        outputMember: function(){
            var data = memberListShow.data;
            console.log(data);
            var index = memberListShow.apartmentKind;
            memberListShow.$memberList.children('tbody').empty();
            if(data.departments[index].members){
                var memberNum = data.departments[index].members.length;
                console.log(memberNum);
                for(var i = 0; i<memberNum; i++){
                    memberListShow.$memberList.children('tbody').append('<tr alt=' + data.departments[index].members[i].user_id + ' index = ' + i + '><td><input type="checkbox" class="multiply"></td><td class="username">' + data.departments[index].members[i].username + '</td><td class="longtPhoneNume">' + data.departments[index].members[i].phone + '</td><td class="shortPhoneNume">' + data.departments[index].members[i].tel + '</td><td><button type="button" class="btn btn-primary btn-xs editor" id="editor">编辑</button><button type="button" class="btn btn-danger btn-xs del" id="del">删除</button></td></tr>');
                    /*
                    memberListShow.$memberList.children('tbody').append('<tr alt=' + data.departments[index+1].members[i].user_id + ' index = ' + i + '><td><input type="checkbox" class="multiply"></td></tr>');
                    memberListShow.$memberList.children('tbody').find('tr').eq(i).append('<td class="username">' + data.departments[index].members[i].username + '</td><td class="longtPhoneNume">' + data.departments[index].members[i].phone + '</td><td class="shortPhoneNume">' + data.departments[index].members[i].tel + '</td>');
                    memberListShow.$memberList.children('tbody').find('tr').eq(i).append('<td><button type="button" class="btn btn-primary btn-xs editor" id="editor">编辑</button><button type="button" class="btn btn-danger btn-xs del" id="del">删除</button></td>')
                    */
                }
            }else{
                alert('此部门没有人员信息，请填写！');
            }
        },    
        //循环输出人员列表
        //添加部门按钮功能
        addApartment: function(){
            if(memberListShow.addFlag){
                memberListShow.$apartment.append('<li class="list-group-item"><div class="input-group"><input type="text" class="form-control" id="addInput" autofocus><span type="button" class="input-group-btn" id="addConfirm"><button type="button" class="btn btn-primary">确认</button></span></div></li>');
                $("#apartment #addInput").focus();
                memberListShow.addFlag = false;
                memberListShow.$memberList.find('.editor').attr('disabled',true);
                memberListShow.$memberList.find('.del').attr('disabled',true);
                $('#addMemberList').attr('disabled',true);
                $('#addApartment').attr('disabled',true);
            }
            $("#apartment #addInput").blur(function(){
                setTimeout(function () {
                    $("#apartment #addInput").parent().parent().remove();
                    memberListShow.addFlag = true;
                    memberListShow.$memberList.find('.editor').attr('disabled',false);
                    memberListShow.$memberList.find('.del').attr('disabled',false);
                    $('#addMemberList').attr('disabled',false);
                    $('#addApartment').attr('disabled',false);
                },300);
            });
            $("#apartment #addConfirm").click(function () {
                var value = $("#apartment #addInput").val();
                if(value){
                    memberListShow.$apartment.append('<li class="list-group-item"><a>' + value + '</a><span class="glyphicon glyphicon-remove pull-right" id="apartmentDel"></span><span class="glyphicon glyphicon-pencil pull-right" id="apartmentChg"></span></li>');
                    memberListShow.$apartmentM.append('<li role="presentation" class="visible-smvisible-xs"><a role="menuitem" tabindex="-1" href="#">' + value + '</a></li>');
                }
                $(this).parent().parent().remove();
                memberListShow.addFlag = true;
                memberListShow.$memberList.find('.editor').attr('disabled',false);
                memberListShow.$memberList.find('.del').attr('disabled',false);
                $('#addMemberList').attr('disabled',false);
                $('#addApartment').attr('disabled',false);
            });
        },
        //添加部门按钮功能
        //添加部门修改删除事件
        editeAparment:function(){
            memberListShow.$memberList.find('.editor').attr('disabled',true);
            memberListShow.$memberList.find('.del').attr('disabled',true);
            $('#addMemberList').attr('disabled',true);
            $('#addApartment').attr('disabled',true);
            var $this = memberListShow.apartmentChgThis;
            var temp = $this.parent('li').children('a').html();
            var preValue;
            $this = memberListShow.apartmentChgThis;
            memberListShow.addFlag = false;
            $this.parent().replaceWith('<li class="list-group-item"><div class="input-group"><input type="text" class="form-control" id="addInput" value='+ temp+'><span type="button" class="input-group-btn" id="chgConfirm"><button type="button" class="btn btn-primary">确认</button></span></div></li>');
            $("#apartment #addInput").focus(function(){
                preValue = $("#apartment #addInput").val();
            });
            $("#apartment #addInput").blur(function(){
                setTimeout(function () {
                    var value = $("#addInput").val();
                    memberListShow.addFlag = true;
                    memberListShow.$memberList.find('.editor').attr('disabled',false);
                    memberListShow.$memberList.find('.del').attr('disabled',false);
                    $('#addMemberList').attr('disabled',false);
                    $('#addApartment').attr('disabled',false);
                    $("#apartment #addInput").parent().parent().replaceWith('<li class="list-group-item"><a>' + preValue + '</a><span class="glyphicon glyphicon-remove pull-right" id="apartmentDel"></span><span class="glyphicon glyphicon-pencil pull-right" id="apartmentChg"></span></li>');
                },300);
            });
            $("#apartment #chgConfirm").click(function(){
                $.post("http://debug.xingkong.us/User/adminloading/",{preName:'"'+preValue+'"',name:+'"'+value},function(data){});
                $this.parent().remove();
                var value = $("#apartment #addInput").val();
                if(value){
                    memberListShow.$apartment.append('<li class="list-group-item"><a>' + value + '</a><span class="glyphicon glyphicon-remove pull-right" id="apartmentDel"></span><span class="glyphicon glyphicon-pencil pull-right" id="apartmentChg"></span></li>');
                    memberListShow.$apartmentM.append('<li role="presentation" class="visible-smvisible-xs"><a role="menuitem" tabindex="-1" href="#">' + value + '</a></li>');
                }
                $(this).parent().parent().remove();
                memberListShow.addFlag = true;
                memberListShow.$memberList.find('.editor').attr('disabled',false);
                memberListShow.$memberList.find('.del').attr('disabled',false);
                $('#addMemberList').attr('disabled',false);
                $('#addApartment').attr('disabled',false);
            }); 
        },    
        //增加成员的功能
        addMemberList:function(){
            var index = 1;
            var listHeaderClass = ['','col-md-1' , 'col-md-3' , 'col-md-2' , 'col-md-3'];
            var num = memberListShow.$memberList.children('tbody').children().length;
            var current = memberListShow.$memberList.children('tbody').children().eq(num-1).children('td');
            memberListShow.$memberList.find('.editor').attr('disabled',true);
            memberListShow.$memberList.find('.del').attr('disabled',true);
            $('#addMemberList').attr('disabled',true);
            $('#addApartment').attr('disabled',true);
            memberListShow.addFlag = false;
            memberListShow.memberId = 0;
            memberListShow.deleteJudge = true;//点击取消后删除当前行
            //新增一条tr
            memberListShow.$memberList.children('tbody').append('<tr><td><input type="checkbox" class="multiply"></td><td class="username"></td><td class="longPhoneNume"></td><td class="shortPhoneNume"></td><td>' + memberListShow.cancelButton + '</td></tr>');
            //按添加成员时获得当前tr
            memberListShow.judge = true,//真为添加人员，假为编辑人员
            memberListShow.$memberListCurrentTr = $('#memberList').find('tbody').children().eq(memberListShow.$memberList.children('tbody').children().length-1).children();
            //改变输入框宽度
            memberListShow.$memberListHeader.children().eq(index).removeClass().addClass("col-md-4");
            //添加输入框
            memberListShow.$memberList.children('tbody').children().eq(num).children('td').eq(index).replaceWith('<li class="list-group-item"><div class="input-group"><input type="text" class="form-control input-sm" id="addInput" autofocus value=""><span type="button" class="input-group-btn" id="addConfirm"><button type="button" class="btn btn-primary btn-sm">确认</button></span></div></li>');          
            //添加取消按钮
            $("#addConfirm").on('click',function(){
                memberListShow.addConfirm();
            });
            $("#cancel").on('click',function(){
                memberListShow.cancelEdite();
            });
        },
        //添加checkbox全选按钮
        selectAll:function(){
            var num = memberListShow.data.departments[memberListShow.apartmentKind].members.length;
            if(memberListShow.count % 2 ==0){
                memberListShow.selectAllCheckBox();
                $('#delMemberList').attr('disabled',false);
                $('#delMemberList').find('span').html(num);
            }else{
                memberListShow.cancelAllCheckBox();
                $('#delMemberList').attr('disabled',true);
                $('#delMemberList').find('span').empty();
            }
			//memberListShow.checkNum();
        },
        //添加checkbox选中个数监听功能
        checkNum:function(){
            var num = memberListShow.data.departments[memberListShow.apartmentKind].members.length;
            memberListShow.checkedCount = 0;
            console.log("checkedCount:"+memberListShow.checkedCount)
            var delMemberList = $('#delMemberList');
            memberListShow.checkFlag.each(function(index){
                if(memberListShow.checkFlag[index].checked){
                    console.log("index:"+index)
                    memberListShow.checkedCount++;
                    console.log("checkedCount:"+memberListShow.checkedCount)
                }
            });
            if(memberListShow.checkedCount){
                if(memberListShow.checkedCount===num){
                    memberListShow.selectAllCheckBox();
                }else{
                    $('#selectAll').attr('checked',false);
                }
                delMemberList.attr('disabled',false);
                delMemberList.find('span').html(memberListShow.checkedCount);
            }else{
                memberListShow.cancelAllCheckBox();
                delMemberList.attr('disabled',true);
                delMemberList.find('span').empty();
            }
        },
        //添加checkbox全选按钮
        selectAllCheckBox:function(){
            memberListShow.count++;
            var temp = memberListShow.$memberList.find('input');
            temp.each(function(){
                if($(this).attr('type')=="checkbox"){
                    $(this).prop('checked',true);
                }
            });
        },
        //添加取消checkbox全选功能
        cancelAllCheckBox:function(){
            memberListShow.count++;
            var temp = memberListShow.$memberList.find('input');
            temp.each(function(){
                if($(this).attr('type')=="checkbox"){
                    $(this).prop('checked',false);
                }
            });
        },
        //添加人员列表编辑功能
        memberListEdite:function(){
            memberListShow.deleteJudge = false;//点击取消后不删除当前行
            //按编辑成员时获得当前tr  
            console.log(memberListShow.$memberListCurrentTr);
            if(memberListShow.addFlag){
                memberListShow.addFlag = false;
                memberListShow.$memberList.find('.editor').attr('disabled',true);
                memberListShow.$memberList.find('.del').attr('disabled',true);
                $('#addMemberList').attr('disabled',true);
                $('#addApartment').attr('disabled',true);
                memberListShow.judge= false,//真为添加人员，假为编辑人员
                memberListShow.$memberListCurrentTr = memberListShow.$memberListEditeThis.parent().parent();
                var $this = memberListShow.$memberListEditeThis.parent().parent().children();
                //循环获得当前表格内容 
                for(var i= 1 ; i<memberListShow.listNum; i++){
                    memberListShow.memberListEditeTemp[i] = $this.eq(i).html();
                }
                var temp = memberListShow.memberListEditeTemp;
               
                console.log('编辑时临时存储的成员信息:'+temp)
                //编辑功能
                $this.eq(memberListShow.listNum).empty().append(memberListShow.cancelButton);
                memberListShow.$memberListHeader.children().eq(memberListShow.index).removeClass().addClass("col-md-4");
                $this.eq(memberListShow.index).replaceWith('<li class="list-group-item"><div class="input-group"><input type="text" class="form-control input-sm" id="addInput" autofocus value="' + temp[memberListShow.index] + '"><span type="button" class="input-group-btn" id="addConfirm"><button type="button" class="btn btn-primary btn-sm">确认</button></span></div></li>');
                $("#addInput").focus();               
            }   
        },
        //Input确认按钮事件   
        addConfirm:function() {
            memberListShow.checkFlag = memberListShow.$memberList.find('.multiply');
            //console.log(memberListShow.checkFlag);
            var index = ++memberListShow.index;
            var value = $("#addInput").val();           
            var temp = memberListShow.postTemp[index-2];
            var preTemp = ['preusername','prephone','pretel'];
            var _data = {};
            //！！memberListShow.index默认值为2，作判断为了让下面语句只执行一次！！
            if(memberListShow.index){
                if(memberListShow.memberId == undefined){
                    memberListShow.memberId = $("#addInput").parent().parent().parent().attr('alt');
                    console.log('当前编辑成员的id值：'+memberListShow.memberId);
                }
            }
            //！！memberListShow.index默认值为2，作判断为了让上面语句只执行一次！！
            _data["user_id"] = memberListShow.memberId;
            _data[temp] = value;
            _data[preTemp[index-2]] = memberListShow.memberListEditeTemp[index-2];
            _data['department'] = memberListShow.data.departments[memberListShow.apartmentKind].name;   
            _data['name'] = memberListShow.enterName;
            console.log('');
            console.log('');
            console.log('');
            console.log('');

            console.log('送给后台的数据：')
            console.log(_data);
            $.post("http://debug.xingkong.us/User/adminUpdata/",_data,function(data){
                memberListShow.dataTemp = data;
                console.log('返回data值：')
                console.log(memberListShow.dataTemp);
                //！！memberListShow.index默认值为2，作判断为了让下面语句只执行一次！！
                if(memberListShow.index ==2){
                    memberListShow.memberId = data.user_id;
                }
                //！！memberListShow.index默认值为2，作判断为了让上面语句只执行一次！！
                console.log("赋值的ID："+memberListShow.memberId);
            },"json");
            setTimeout(function(){
                $("tbody .list-group-item").replaceWith('<td>' + value +'</td>');
                //判断是添加成员还是编辑成员
                if(memberListShow.judge){
                    //真为添加人员
                    memberListShow.$memberListCurrentTr = $('#memberList').find('tbody').children().eq(memberListShow.$memberList.children('tbody').children().length-1).children();
                }else{
                    //假为编辑人员
                    memberListShow.$memberListCurrentTr = $('#memberList').find('tbody').children().eq(memberListShow.num).children();
                }
                if(index<memberListShow.listNum){
                    if(!memberListShow.memberListEditeTemp){
                        memberListShow.memberListEditeTemp = ['','','','',''];
                    }
                    memberListShow.$memberListHeader.children().eq(index).removeClass().addClass('col-md-4');
                    memberListShow.editor();
                }else{
                    memberListShow.cancelEdite();
                    memberListShow.$memberListHeader.children().eq(index-1).removeClass().addClass("col-md-2");
                }                          
            },150);
        },
        //按了下一个确认后将自动编辑下一个后刷新表单内容
        editor:function () {
            var index = memberListShow.index;
            var temp = memberListShow.memberListEditeTemp;
            var $this = memberListShow.$memberListCancelThis = $('#cancel');
            var listHeaderClass = ['','','col-md-1' , 'col-md-3' , 'col-md-2' , 'col-md-3'];
            console.log('编辑时临时存储的成员信息:'+temp);
            memberListShow.$memberListHeader.children().eq(index-1).removeClass().addClass(listHeaderClass[index]);
            memberListShow.$memberListCurrentTr.eq(index).replaceWith('<li class="list-group-item"><div class="input-group"><input type="text" class="form-control input-sm" id="addInput" autofocus value="' + memberListShow.memberListEditeTemp[index] + '"><span type="button" class="input-group-btn" id="addConfirm"><button type="button" class="btn btn-primary btn-sm">确认</button></span></div></li>');
            $("#addConfirm").on('click',function(){
                memberListShow.addConfirm();            
            });
        },
        //成员列表里取消编辑按钮的功能
        cancelEdite:function(){
            var index = memberListShow.index;
            var temp = memberListShow.memberListEditeTemp;
            var $this = memberListShow.$memberListCancelThis = $('#cancel');
            var current = $this.parent().parent().children();
            var listHeaderClass = ['','col-md-1' , 'col-md-3' , 'col-md-2' , 'col-md-3'];
            var _data = {"user_id_delete" : memberListShow.memberId};
            console.log(memberListShow.index)
            if(memberListShow.index == 4){
                memberListShow.deleteJudge =false;
            }
            if(memberListShow.deleteJudge == true){
                console.log(current);
                current.parent().remove();
                $.post('http://debug.xingkong.us/User/adminDelete/',{_data},function(data){
                    console.log(data);
                },"json");
            }
           
            //全局变量复位
            memberListShow.memberListEditeTemp = ['','','',''];
            memberListShow.index = 1;
            memberListShow.addFlag = true;
            memberListShow.$memberList.find('.editor').attr('disabled',false);
            memberListShow.$memberList.find('.del').attr('disabled',false);
            $('#addApartment').attr('disabled',false);
            $('#addMemberList').attr('disabled',false);
            $("tbody .list-group-item").replaceWith('<td>' + temp[index] +'</td>');
            current.eq(memberListShow.listNum).empty().append(memberListShow.editorButton);
        },
        delMemberList: function(){  
            //var num = memberListShow.data.departments[memberListShow.apartmentKind].members.length; 
            var _data = [];
            memberListShow.checkFlag.each(function(index){
                if(memberListShow.checkFlag[index].checked){
                    _data.push($(this).parent().parent().attr('alt'));
                    $(this).parent().parent().remove();
                }
            });
            _data.push(memberListShow.enterName);
            console.log(_data);
            $.post('http://debug.xingkong.us/User/adminDelete/',{_data},function(data){
                memberListShow.data = data;
                console.log(memberListShow.data);
            },"json");
            setTimeout(function(){
                memberListShow.reFlashMemberList();
                memberListShow.checkNum();
            },150);
            memberListShow.cancelAllCheckBox();
            memberListShow.count = 0;
            memberListShow.checkedCount = 0;
            memberListShow.checkFlag = memberListShow.$memberList.find('.multiply');
            memberListShow.checkFlag.on('click',function(){
                memberListShow.checkNum();
            });   
        },
        reFlashMemberList: function(){
            var data = memberListShow.data;
            var num = data.departments[memberListShow.apartmentKind].members.length;
            for(var i=0; i<num; i++){
                memberListShow.$memberList.children('tbody').find('tr').eq(i).find('td').eq(1).html(data.departments[memberListShow.apartmentKind].members[i].username);
                memberListShow.$memberList.children('tbody').find('tr').eq(i).find('td').eq(2).html(data.departments[memberListShow.apartmentKind].members[i].phone);
                memberListShow.$memberList.children('tbody').find('tr').eq(i).find('td').eq(3).html(data.departments[memberListShow.apartmentKind].members[i].tel);
            }
        }
    } 
    $.post('http://xingkongus.duapp.com/index.php/User/loginAPP',{name:"qingma100",key:82015},function(data){
        /*memberListShow.enterKey = data.key;
        memberListShow.enterName = data.name;
        console.log(memberListShow.enterName);
        console.log(memberListShow.enterKey);*/
        memberListShow.postdata();
    },"json");
    window.memberListShow = memberListShow;
    

});