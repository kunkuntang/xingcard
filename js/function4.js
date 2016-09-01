/**
* Created by Administrator on 2015/8/4 0004.
*/
$(document).ready(function(){
    var memberListShow = {
        //放变量,初始化，获取dom 结构，加载函数
        URL:'http://xingkongus.duapp.com/index.php/User/loginAPP',//地址
        apartmentNum: 0,//部门列表数量
        memberListNum: 0,
        $apartment: $("#apartment"),//左边部门列表ul
        $apartmentM: $("#apartmentMobile"),//手机端部门列表ul
        $memberList: $("#memberList"),//右边部门人员列表
        $memberListHeader: $("#memberListHeader"),
        listNum: 4,//总共的列表数-1 现5列 即除去多选框外的列数
        loginKey: 0,
        loginName: '',
        apartmentKind: 0, //  部门种类
        data: null,//第一次加载时的缓存数据
        dataTemp: null,//后台临时传回的数据
        memberId: null,//临时存放当前编辑成员的id值
        index: 1,
        memberListEditeTemp: null,//临时存储编辑成员时的成员信息（数组）
        $editorThis: null,//当前编辑的按钮对象
        cancelButton: null,
        editorButton: null,
        checkFlag: null,//存放多选框
        apartmentChgThis: null,//当前编辑部门的编辑按钮
        postTemp: null,//临时存放Ajax返回数据
        apartmentCurrentIndex: null,
        enterName: "xiaotuanwei",
        enterKey: 82015,

        init: function(){   
            //页面加载时初始化函数,事件出发功能
            //用户登出按钮功能


            $('#logoOutButton').on('click',function(){
                document.cookie="peixun=";
                window.location.href="./index.php";
            });


            //部门列表点击事件
            memberListShow.$apartment.find('li').find('a').on('click',function(){
                
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
                
            });
            //Moblie部门点击事件
            memberListShow.$apartmentM.find('li').find('a').on('click',function(){
                
                    $('#delMemberList').find('span').empty();
                    $('#delMemberList').attr('disabled',true);
                    memberListShow.apartmentKind = $(this).attr('index');
                    console.log(memberListShow.apartmentKind)
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
                
            });
            //初始化成员列表样式
            memberListShow.$apartment.find('li').find('a').eq(0).css({'background-color':'#337ab7','color':'white'});
            memberListShow.$apartment.find('li').find('a').eq(0).parent().css({'background-color':'#337ab7','color':'white'});
            //初始化，获取dom结构
            $('#association').html(memberListShow.data.department_belong);
            memberListShow.dataTemp = {};
            memberListShow.apartmentCurrentIndex = 0;
            memberListShow.postTemp = ['username','phone','tel'];
            memberListShow.memberListEditeTemp = ['','','','',''];
        },
        postdata:function(){
            /*$.post(URL, {key:82015,name:'xingkong'},function(data){
                console.log(data);
            });*/
            $.ajax({
                type:"POST",
                url:'http://xingkongus.duapp.com/index.php/User/loginAPP',
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
                memberListShow.$apartmentM.append('<li role="presentation" class="visible-sm visible-xs"><a role="menuitem" tabindex="-1" index="' + i + '" >' + memberListName[i] + '</a></li>');
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
                    memberListShow.$memberList.children('tbody').append('<tr alt=' + data.departments[index].members[i].user_id + ' index = ' + i + '><td class="username">' + data.departments[index].members[i].username + '</td><td class="longtPhoneNume"><a href="tel:' + data.departments[index].members[i].tel + '">' + data.departments[index].members[i].tel + '</a></td><td class="message"><a href="sms:' + data.departments[index].members[i].phone + '" class="glyphicon glyphicon-envelope"></a></td></tr>');
                }
            }else{
                alert('此部门没有人员信息，请填写！');
            }
        }
        //循环输出人员列表
    }

/*
    $.post('http://xingkongus.duapp.com/index.php/User/loginAPP',{key:82015,name:"qingma100"},function(data){
        memberListShow.enterKey = data.key;
        memberListShow.enterName = data.name;
        console.log(memberListShow.enterName);
        console.log(memberListShow.enterKey);
        memberListShow.postdata();
    },"json");

*/
    memberListShow.postdata();


    window.memberListShow = memberListShow;
    

});