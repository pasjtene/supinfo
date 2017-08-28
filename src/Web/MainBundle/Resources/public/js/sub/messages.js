var MainSubMessages = function()
{
    this.params = {
        page: $("#mainUserProfile"),
        sub: $("#Main-Messages"),
        bg_action:$('#bg-action'),
        path: path.flags,
        api:{
            getAll: {
                url : baseUrl+"auth/Message/all",
                method: "get",
                type: "json"
            },
            get: {
                url : baseUrl+"auth/Message/conversation",
                method: "get",
                type: "json"
            },
            post:{
                url : baseUrl+"auth/Message/add",
                method: "post",
                type: "json"
            },
            put:{
                url : baseUrl+"auth/Message/update",
                method: "put",
                type: "json"
            },
            delete:{
                url : baseUrl+"auth/Message/delete",
                method: "delete",
                type: "json"
            },
            friendList:{
                url : baseUrl+"auth/Message/friends/cuurent",
                method: "get",
                type: "json"
            },
            countConversation:{
                url : baseUrl+"auth/Message/notification",
                method: "get",
                type: "json"
            }
        },
        member_list: {
            body : $("#Main-Messages .member_list .list-unstyled"),
            user_list : $("#Main-Messages .member_list .list-unstyled li")
        },
        chat_area: {
            body_content : $("#Main-Messages .chat_area"),
            body_content_action : $("#Main-Messages #message_action"),
            body_content_detail : $("#Main-Messages .chat_area .chat-body1 p"),
            body_content_messagewrite : $("#Main-Messages  .message_write"),
            body : $("#Main-Messages .chat_area .list-unstyled"),
            send: $("#Main-Messages .message_write .btn_send"),
            emoticon_btn:$("#Main-Messages .message_write #chat_bottom_emoyoyi"),
            emoticon_body:$("#Main-Messages .message_write .chat_bottom_emoyoyi .row"),
            img_sender:$("#Main-Messages .message_write .img_sender img"),
            img_reciever:$("#Main-Messages .message_write .img_reciever img"),
            key:$("#dropdownMenuMessages-body #key")
        },
        btn:{
            body_content_detail_check : $("#Main-Messages .chat_area .chat-body1 p label input[type='checkbox']"),
            delete : $("#Main-Messages .message-delete"),
            foward : $("#Main-Messages .message-foward"),
            cancel : $("#Main-Messages .message-cancel")
        },
        foward:{
            body: $('#modal-foward .modal-body .body')
        },
        body:{
            message_text: $('#Main-Messages #message-text'),
            caretposition: $('#Main-Messages #caretposition')
        },
        setting:{
            profile : $("#Main-Messages .setting .profile"),
            block : $("#Main-Messages .setting .block"),
            empty : $("#Main-Messages .setting .empty"),
            photos : $("#Main-Messages .setting .photos"),
            btn : $("#Main-Messages #dropdown-setting")
        }
    },
   this.getAll = function(cb,objet,errorMessage)
    {
        $.ajax(
            {
               url: this.params.api.getAll.url,
               type: this.params.api.getAll.method,
               data: objet,
               headers : {"X-Auth-Token" : currentUser.token},
               crossDomain: true,
               dataType:  this.params.api.getAll.type,
               success: function (data) {
                    console.log(data);
                    cb(data);
               },
               error: function (xhr, status, message) {
                    console.log(xhr.responseText);
                    bootbox.alert(errorMessage,function(){});
               }
            }
        );
    },
    this.get = function(cb,objet,errorMessage)
    {
        $.ajax(
            {
                url: this.params.api.get.url,
                type: this.params.api.get.method,
                data: objet,
                crossDomain: true,
                headers : {"X-Auth-Token" : currentUser.token},
                dataType:  this.params.api.get.type,
                success: function (data) {
                    console.log(data);
                    cb(data);
                },
                error: function (xhr, status, message) {
                    console.log(xhr.responseText);
                    bootbox.alert(errorMessage,function(){});
                }
            }
        );
    },
    this.post = function(cb,objet,errorMessage)
    {
        $.ajax(
            {
               url: this.params.api.post.url,
               type: this.params.api.post.method,
               data: objet,
               crossDomain: true,
               dataType:  this.params.api.post.type,
               headers : {"X-Auth-Token" : currentUser.token},
               success: function (data) {
                    console.log(data);
                    cb(data);
               },
               error: function (xhr, status, message) {
                  console.log(xhr.responseText);
                  bootbox.alert(errorMessage,function(){});
               }
            }
        );
    },
    this.put = function(cb,objet,errorMessage)
    {
        $.ajax(
            {
               url: this.params.api.post.url,
               type: this.params.api.put.method,
               data: objet,
               crossDomain: true,
               dataType:  this.params.api.put.type,
               headers : {"X-Auth-Token" : currentUser.token},
               success: function (data) {
                    console.log(data);
                    cb(data);
               },
               error: function (xhr, status, message) {
                   console.log(xhr.responseText);
                   bootbox.alert(errorMessage,function(){});
               }
            }
        );
    },
    this.delete = function(cb,objet,errorMessage)
    {
        $.ajax(
            {
               url: this.params.api.delete.url,
               type: this.params.api.delete.method,
               data: objet,
               crossDomain: true,
               dataType:  this.params.api.delete.type,
               headers : {"X-Auth-Token" : currentUser.token},
               success: function (data) {
                    console.log(data);
                    cb(data);
               },
               error: function (xhr, status, message) {
                    console.log(xhr.responseText);
                    bootbox.alert(errorMessage,function(){});
               }
            }
        );
    },
    this.friend =  function context(cb,objet,errorMessage)
        {
            var isok =false;
            $.ajax(
                {
                    url: this.params.api.friendList.url,
                    type: this.params.api.friendList.method,
                    data: objet,
                    crossDomain: true,
                    headers : {"X-Auth-Token" : currentUser.token},
                    dataType:  this.params.api.friendList.type,
                    success: function (data) {
                        console.log(data);
                        isok =true;
                        return {'data':data, 'isok':isok};
                    },
                    error: function (xhr, status, message) {
                        console.log(xhr.responseText);
                        bootbox.alert(errorMessage,function(){});
                    }
                }
            );

        }
};


$(function () {
/*
//Pour le chatBox, on doit mieux arranger avec les variables
    $("#drag-message .popup-box .popup-head").addClass("chatbox-header-bg-color");

    //added ids to the chat btn menu and chat btn group
    $("#chat-btn-menu").click(function(){
        $("#chat-btns").toggleClass("show");
    });


    $("div").click(function(e){
        var $th = $(this);
        var classs = $(this).attr("class");
        console.log("The Class 000 is "+classs);
        if($th.hasClass("btn-group") && $th.hasClass("popup-box")){
            alert("Yes");
            $("#drag-message .popup-box .popup-head").addClass("chatbox-header-bg-color-active");
            $("#drag-message .popup-box .popup-head").removeClass("chatbox-header-bg-color");
            console.log("The class 11 is "+classs);
        } else if($th.hasClass("popup-box")&& !$th.hasClass("btn-group")){
            $("#drag-message .popup-box .popup-head").addClass("chatbox-header-bg-color-active");
            $("#drag-message .popup-box .popup-head").removeClass("chatbox-header-bg-color");
            console.log("The class 2 is "+classs);
            //alert("no");
            e.stopPropagation();
        } else if(!$th.hasClass("btn-group") && !$th.hasClass("popup-box")){
            $("#drag-message .popup-box .popup-head").addClass("chatbox-header-bg-color");
            $("#drag-message .popup-box .popup-head").removeClass("chatbox-header-bg-color-active");
            console.log("The class 3 is "+classs);
            //$("#chat-btns").removeClass("show");
            //alert("noooo");
            //e.stopPropagation();
        }
    });

    $("div").click(function(e){
        var $th = $(this);
        var classs = $(this).attr("class");
        console.log("The Class 000 11 is "+classs);
        if($th.hasClass("btn-group")){
            // alert("Yes");
            $("#chat-btns").addClass("show");
            e.stopPropagation();
        } else {
            $("#chat-btns").removeClass("show");
        }
    });
*/
    //Fin chatbox

    var mainSubMessages = new MainSubMessages(),
         appEmoticons = new AppEmoticons(),
        mainUserProfile_messages = new MainUserProfile();

    if(mainSubMessages.params.sub.data('sub')=="messages") {

        //variables globales
        var selectUserId = 0,
            countListMessageUserCurrent = 0,
            countListMessageUserCurrentnew = 0,
            countMessageNotSee = 0,
            listUsers = null,
            datakey = null,
            errorMessage = "something is wrong",
            key = mainSubMessages.params.chat_area.key.val(),
            countfinal = 0;

            // declancher l'accuse de reception
            setInterval(function(){
                var data ={
                    id : currentUser.id,
                    idFriend: selectUserId,
                    lastcount: countMessageNotSee
                };
                getNotifieCount(data,errorMessage);
            },3000);

        mainSubMessages.params.body.message_text.empty();
        mainSubMessages.params.body.message_text.focus();
            //envoyer un message en cliquant  sur entree
            mainSubMessages.params.body.message_text.keyup(function(e){
                //placeCaretAtEnd($(this).get(0));
               if(e.keyCode==32){
                 if( appEmoticons.function.translateEmotion(listEmoticons(),$(this),path.emoticon))
                 {
                    setCaret($(this).get(0),false);
                 }
               }
                if(e.keyCode==13)
                {
                    e.preventDefault();
                    mainSubMessages.params.chat_area.send.trigger('click');
                }
            });

        function get(objet,errorMessage,isobjet,isdelete)
        {
            $.ajax(
                {
                    url: mainSubMessages.params.api.get.url,
                    type: mainSubMessages.params.api.get.method,
                    data: objet,
                    crossDomain: true,
                    headers : {"X-Auth-Token" : currentUser.token},
                    dataType:  mainSubMessages.params.api.get.type,
                    success: function (data) {
                        console.log(data);
                        if(data!=null  && data !="null" && data!="undefined")
                        {
                            countListMessageUserCurrent = (data.recievers!=null && data.recievers!='null')? data.recievers.length: 0;
                            countListMessageUserCurrentnew = countListMessageUserCurrent;
                            setmessageContent(data,mainSubMessages.params.chat_area.body,isobjet);
                        }
                    },
                    error: function (xhr, status, message) {
                        console.log(xhr.responseText);
                       // bootbox.alert(errorMessage,function(){});
                    },
                    complete: function(){
                        if(isdelete)
                        {
                            mainUserProfile_messages.params.bg_action.fadeOut();
                        }
                    }
                }
            );
        }

        function getNotifieCount(objet,errorMessage)
        {
            $.ajax(
                {
                    url: mainSubMessages.params.api.countConversation.url,
                    type: mainSubMessages.params.api.countConversation.method,
                    data: objet,
                    crossDomain: true,
                    headers : {"X-Auth-Token" : currentUser.token},
                    dataType:  mainSubMessages.params.api.countConversation.type,
                    success: function (data) {
                       // console.log(data);
                        if(data!=null  && data !="null" && data!="undefined")
                        {
                            countListMessageUserCurrentnew = data.countMyFriendsMessage;
                            if(countMessageNotSee != data.notifiyCountMessage)
                            {
                                if(data.notifyMessages!=null  && data.notifyMessages !="null" && data.notifyMessages!="undefined")
                                {
                                    setnotificationMessage(mainUserProfile_messages.params.nav.notification.message, data.notifyMessages,mainUserProfile_messages.params.nav.dropdownMenuMessages_badge);
                                }
                                countMessageNotSee = data.notifiyCountMessage;
                            }
                            if(countListMessageUserCurrentnew !=countListMessageUserCurrent)
                            {
                                countListMessageUserCurrent =countListMessageUserCurrentnew;
                              //  alert("new : "+countListMessageUserCurrentnew +  " old : " + countListMessageUserCurrent);
                                if(selectUserId>0){
                                    var data ={
                                        id : currentUser.id,
                                        idFriend: selectUserId
                                    };
                                    get(data,errorMessage,false,false);
                                }

                            }
                        }
                    },
                    error: function (xhr, status, message) {
                        console.log(xhr.responseText);
                       // bootbox.alert(errorMessage,function(){});
                    }
                }
            );
        }

        function deleteMessage(objet,errorMessage)
        {
            $.ajax(
                {
                    url: mainSubMessages.params.api.delete.url,
                    type: mainSubMessages.params.api.delete.method,
                    data: objet,
                    crossDomain: true,
                    dataType:  mainSubMessages.params.api.delete.type,
                    headers : {"X-Auth-Token" : currentUser.token},
                    success: function (data) {
                        console.log(data);
                        var elem ={
                            id : currentUser.id,
                            idFriend: selectUserId
                        };
                        get(elem,errorMessage,false,true);
                    },
                    error: function (xhr, status, message) {
                        console.log(xhr.responseText);
                        bootbox.alert(errorMessage,function(){});
                    },
                    complete:function()
                    {
                        var  checks =  $("#Main-Messages .chat_area .chat-body1 p label input[type='checkbox']");
                        uncheckCount(checks);
                    }
                }
            );
        }
        //liste les amis
         fillFriend({ id: currentUser.id },errorMessage);
        function fillFriend(objet,errorMessage)
        {
            var isok =false;
            $.ajax(
                {
                    url: mainSubMessages.params.api.friendList.url,
                    type: mainSubMessages.params.api.friendList.method,
                    data: objet,
                    crossDomain: true,
                    headers : {"X-Auth-Token" : currentUser.token},
                    dataType:  mainSubMessages.params.api.friendList.type,
                    success: function (data) {
                        console.log(data);
                        if(data!=null  && data !="null" && data!="undefined" && data.listUsers!="null" && data.listUsers!=null)
                        {
                            listUsers = data.listUsers;
                            setfriendList(data.listUsers,mainSubMessages.params.member_list.body);
                        }

                    },
                    error: function (xhr, status, message) {
                        console.log(xhr.responseText);
                        bootbox.alert(errorMessage,function(){});
                    }
                }
            );

        }


        function post(objet,errorMessage,isobjet)
        {
            $.ajax(
                {
                    url: mainSubMessages.params.api.post.url,
                    type: mainSubMessages.params.api.post.method,
                    data: objet,
                    crossDomain: true,
                    dataType:  mainSubMessages.params.api.post.type,
                    headers : {"X-Auth-Token" : currentUser.token},
                    success: function (data) {
                        console.log(data);
                        if(data!=null && data!="null" && data!="undefined")
                        {
                            setmessageContent(data,mainSubMessages.params.chat_area.body,isobjet);
                            mainSubMessages.params.body.message_text.empty();
                            //countListMessageUserCurrent++;
                            //countListMessageUserCurrentnew = countListMessageUserCurrent;
                        }

                    },
                    error: function (xhr, status, message) {
                        console.log(xhr.responseText);
                        bootbox.alert(errorMessage,function(){});
                    }
                }
            );
        }


        //zone settings

        mainSubMessages.params.setting.profile.click(function(e){
            //alert(Routing.generate('main_profile_detailProfile',{_locale:locale,key:datakey}));
            //alert(datakey);
            if(datakey!=null)
            {
                window.location.href = Routing.generate('main_profile_detailProfile',{_locale:locale,key:datakey});
            }
        });

        //charger la liste des emoticons
        appEmoticons.function.fillEmotion(listEmoticons(),mainSubMessages.params.chat_area.emoticon_body,path.emoticon);

        function  setfriendList(list, element)
        {

            element.empty();
            for(var i=0; i<list.length; i++)
            {
                var photoApplicant = list[i].photoApplicant,
                    photoReciever = list[i].photoReciever,
                    count = list[i].count>0? list[i].count:'',
                    request = list[i].request,
                    user = null;
                //alert();
                var src = null;
                if(request.receiver.id==currentUser.id)
                {
                    user = request.applicant;
                    if (( photoApplicant==null || photoApplicant=='null' || photoApplicant.hashname == null || photoApplicant.hashname == 'null')) {
                        src = path.emptyImage;
                    }
                    else {
                        src = baseHost + photoApplicant.path;
                    }
                }
                else
                {
                    user =  request.receiver;
                    if (( photoReciever==null || photoReciever=='null' || photoReciever.hashname == null || photoReciever.hashname == 'null')) {
                        src = path.emptyImage;
                    }
                    else {
                        src = baseHost + photoReciever.path;
                    }
                }
           // alert(user.id + "  current : " + currentUser.id);
                if(user.id !=currentUser.id && user.type!="System") {
                    var name = user.lastNameOrFirstname;
                    var city = user.city;
                    var  country = user.country;
                    var final =(city==null || city=="null")? getCountry(countryList,country) :city;
                    var flag ="<img class='sm-img flag' src='"+path.flags+country+".png' alt=''/> ";
                    var profession = user.profession==null || user.profession=="null"?'' : '('+ user.profession +')';
                    var lastLogin = new Date(user.lastLogin);
                    var toDay = new Date();
                    var state = user.isOnline? "<span class='small connect'>(connected)</span>" : null;
                    if(state==null)
                    {
                       if(lastLogin.toLocaleDateString() == toDay.toLocaleDateString())
                       {
                           state =(toDay-lastLogin)+"ago";
                       }
                    }



                    var conten="";
                   // alert('key :'+key + " userkey="+user.key);
                    if(key.trim()==user.key.trim())
                    {
                        datakey = user.key;
                        selectUserId = user.id;
                        //alert(key);
                         content =
                            '<li class="left clearfix active_li" data-id="'+user.id+'" data-key="'+user.key+'">' +
                            '<span class="chat-img pull-left">' +
                            '<img src="'+src+'" alt="User Avatar" class="rounded-circle">' +
                            '</span>' +
                            '<div class="chat-body clearfix">' +
                            '<div class="header_sec">' +
                            '<strong class="primary-font name-detail" data-key="'+user.key+'" >'+name+'</strong> <strong class="pull-right">' +
                            state+'</strong>' +
                            '</div>' +
                            '<div class="contact_sec">' +
                            '<strong class="primary-font">'+flag+final+'</strong> <span class="badge bg-danger pull-right"></span>'+
                            '</div>' +
                            '</div>' +
                            '</li>';
                    }
                    else
                    {
                        countfinal+=count;
                         content =
                            '<li class="left clearfix" data-id="'+user.id+'" data-key="'+user.key+'">' +
                            '<span class="chat-img pull-left">' +
                            '<img src="'+src+'" alt="User Avatar" class="rounded-circle">' +
                            '</span>' +
                            '<div class="chat-body clearfix">' +
                            '<div class="header_sec">' +
                            '<strong class="primary-font name-detail" data-key="'+user.key+'" >'+name+'</strong> <strong class="pull-right">' +
                            state+'</strong>' +
                            '</div>' +
                            '<div class="contact_sec">' +
                            '<strong class="primary-font">'+flag+final+'</strong> <span class="badge bg-danger pull-right">'+count+'</span>'+
                            '</div>' +
                            '</div>' +
                            '</li>';
                    }

                    element.append(content);
                }

            }
            if(datakey!=null)
            {
                mainSubMessages.params.setting.btn.fadeIn();
            }
            mainUserProfile_messages.params.nav.dropdownMenuMessages_badge.html(count);
        }


        function  setmessageContent(list, element, isobjet)
        {

            var userMessages = null,
                message = null,
                createDate=null,
                sendDate =null,
                src =null,
                friendProfile = null,
                userProfile =null,
                content =null,
                today =new Date();

            if(isobjet)
            {
                   userMessages = list.userMessages;
                   message = userMessages.message;
                userProfile = list.profile;
                createDate =new Date(message.createDate);
                if(today.toLocaleDateString()==createDate.toLocaleDateString())
                {
                    sendDate = createDate.toLocaleTimeString();
                }
                else
                {
                    sendDate = createDate.toLocaleDateString();
                    sendDate=sendDate.replace("/","-");
                    sendDate=sendDate.replace("/","-");
                    sendDate+= " "+createDate.toLocaleTimeString();
                }
                if(userProfile!=null)
                {
                    src = baseHost + userProfile.path;
                }
                else
                {
                    src = path.emptyImage;
                }
                 content =
                    '<li class="left clearfix" data-id="'+message.id+'">'+
                    '<span class="chat-img1 pull-left">'+
                    '<img  src="'+src+'" alt="User Avatar" class="rounded">'+
                    '</span>'+
                    '<div class="chat-body1 clearfix" data-id="'+message.id+'">'+
                    '<p data-id="'+message.id+'">' +
                    '<label for="'+message.id+'" data-id="'+message.id+'" class="custom-control custom-checkbox mb-2 mr-sm-2 mb-sm-0">'+
                    '<input type="checkbox"  name="'+message.id+'" data-id="'+message.id+'"  id="'+message.id+'" class="rounded-circle custom-control-input ">'+
                    ' <span class="custom-control-indicator" id="indicator'+message.id+'"></span>'+
                    '<span class="custom-control-description" >'+ message.content+'</span>'+
                    '</label>'+
                    '</p>'+
                    '<div class="chat_time pull-right">'+sendDate+'</div>'+
                    '</div>'+
                    '</li>';

                element.append(content);
            }
            else
            {
                element.empty();

                userProfile = list.profileUser;
                if(userProfile!=null)
                {
                    src = baseHost + userProfile.path;
                }
                else
                {
                    src = path.emptyImage;
                }
                mainSubMessages.params.chat_area.img_sender.attr('src',src);

                friendProfile = list.profileFriend;
                if(friendProfile!=null)
                {
                    src = baseHost + friendProfile.path;
                }
                else
                {
                    src = path.emptyImage;
                }
                mainSubMessages.params.chat_area.img_reciever.attr('src',src);


                messages = list.messages;
                for(var i=0; i<messages.length;i++)
                {
                    userMessage = messages[i].userMessage;
                    friendProfile = messages[i].friendProfile;
                    userProfile = messages[i].userProfile;
                    message = userMessage.message;
                    createDate =new Date(message.createDate);
                    if(today.toLocaleDateString()==createDate.toLocaleDateString())
                    {
                        sendDate = createDate.toLocaleTimeString()
                    }
                    else
                    {
                        sendDate = createDate.toLocaleDateString();
                        sendDate = sendDate.replace("/","-");
                        sendDate = sendDate.replace("/","-");
                        sendDate+= " "+createDate.toLocaleTimeString();
                    }

                    var isSender =  messages[i].isSender;

                    if(isSender && userMessage.sendRemove!=true)
                    {
                        if(userProfile!=null)
                        {
                            src = baseHost + userProfile.path;
                        }
                        else
                        {
                            src = path.emptyImage;
                        }
                        mainSubMessages.params.chat_area.img_sender.attr('src',src);
                         content =
                            '<li class="left clearfix" data-id="'+message.id+'">'+
                            '<span class="chat-img1 pull-left">'+
                            '<img  src="'+src+'" alt="User Avatar" class="rounded">'+
                            '</span>'+
                            '<div class="chat-body1 clearfix" data-id="'+message.id+'">'+
                            '<p data-id="'+message.id+'">' +
                            '<label for="'+message.id+'" data-id="'+message.id+'" class="custom-control custom-checkbox mb-2 mr-sm-2 mb-sm-0">'+
                            '<input type="checkbox"  name="'+message.id+'" data-id="'+message.id+'"  id="'+message.id+'" class="rounded-circle custom-control-input ">'+
                            ' <span class="custom-control-indicator" id="indicator'+message.id+'"></span>'+
                            '<span class="custom-control-description" >'+ message.content+'</span>'+
                            '</label>'+
                            '</p>'+
                            '<div class="chat_time pull-right">'+ sendDate+'</div>'+
                            '</div>'+
                            '</li>';

                    }
                    else if(!isSender && userMessage.recieverRemove!=true )
                    {
                        if(friendProfile!=null)
                        {
                            src = baseHost + friendProfile.path;
                        }
                        else
                        {
                            src = path.emptyImage;
                        }
                        mainSubMessages.params.chat_area.img_reciever.attr('src',src);
                        content=
                            '<li class="left clearfix admin_chat"  data-id="'+message.id+'">'+
                            '<span class="chat-img1 pull-right">'+
                            '<img  src="'+src+'" alt="User Avatar" class="rounded">'+
                            '</span>'+
                            '<div class="chat-body1 clearfix" data-id="'+message.id+'" >'+
                            '<p data-id="'+message.id+'">' +
                                '<label for="'+message.id+'" data-id="'+message.id+'" class="custom-control custom-checkbox mb-2 mr-sm-2 mb-sm-0">'+
                                    '<input type="checkbox"  name="'+message.id+'" data-id="'+message.id+'"  id="'+message.id+'" class="rounded-circle custom-control-input ">'+
                                    ' <span class="custom-control-indicator" id="indicator'+message.id+'"></span>'+
                                    '<span class="custom-control-description" >'+ message.content+'</span>'+
                                '</label>'+
                           '</p>'+
                            '<div class="chat_time pull-left">'+ sendDate+'</div>'+
                            '</div>'+
                            '</li>';
                    }


                    element.append(content);
                }
            }

            mainSubMessages.params.chat_area.body_content.scrollTop(10000);
        }

        function placeCaretAtEnd(el) {
            el.focus();
            if (typeof window.getSelection != "undefined"
                && typeof document.createRange != "undefined") {
                var range = document.createRange();
                range.selectNodeContents(el);
                range.collapse(false);
                var sel = window.getSelection();
                sel.removeAllRanges();
                sel.addRange(range);
            } else if (typeof document.body.createTextRange != "undefined") {
                var textRange = document.body.createTextRange();
                textRange.moveToElementText(el);
                textRange.collapse(false);
                textRange.select();
            }
        }




        //lorsqu'on clique sur un user, on charge la conversation
        mainSubMessages.params.member_list.body.on('click','li',function(){
            datakey = $(this).data('key');
            window.location.href = Routing.generate('main_profile_messages_detail',{_locale:locale,key:datakey});
        });

        var  detailint = setInterval(function(){
            if(selectUserId>0)
            {
                clearInterval(detailint);
                mainSubMessages.params.chat_area.img_reciever.attr('src',path.emptyImage);
                mainSubMessages.params.chat_area.img_sender.attr('src',path.emptyImage);

                var data ={
                    id : currentUser.id,
                    idFriend: selectUserId
                };
                mainSubMessages.params.chat_area.send.prop('disabled',false);
                changeState(mainSubMessages.params.member_list.user_list, $(this));
                get(data,errorMessage,false,false);
            }
        },100);

        mainSubMessages.params.chat_area.send.disabled =false;

        //envoyer un message
        mainSubMessages.params.chat_area.send.click(function(e){
            e.preventDefault();
            var data ={
                id : currentUser.id,
                idFriend: selectUserId,
                content : mainSubMessages.params.body.message_text.html()
            };
            post(data,errorMessage,true);
        });

        mainSubMessages.params.chat_area.body.on('click','.chat-body1 p label',function(){
            var  checks =  $("#Main-Messages .chat_area .chat-body1 p label input[type='checkbox']");
            //alert($(this).data('id'));
            checkToogle(checks,$(this));
        });

        function checkList(Elements) {
            var count=0;
           str ='';
            Elements.each(function(){
                if ($(this).prop('checked')) {
                    count++;
                    str+= $(this).data('id')+";";
                }
            });
            return str;
        }

        function checkToogle(Elements,activeelement) {
           var count=0;
           // var t = Elements.length;

            activeId= activeelement.data('id');

           Elements.each(function(){
               if ($(this).prop('checked')) {
                   count++;
                   id= '#indicator'+$(this).data('id');
                  //$(id).css({ 'background-color': '#0275D8;','color':'white;'});
               }
               else if(activeelement ==$(this).data('id')){
                   id= '#indicator'+$(this).data('id');
                  // $(id).css({ 'background': '#fbf9fa none repeat scroll 0 0;'});
               }

            });

            if(count>0)
            {
                    mainSubMessages.params.chat_area.body_content_action.fadeIn();
                    mainSubMessages.params.chat_area.body_content_messagewrite.fadeOut();
            }
            else
            {
                mainSubMessages.params.chat_area.body_content_messagewrite.fadeIn();
                mainSubMessages.params.chat_area.body_content_action.fadeOut();
            }
           // alert(count);
        }


        function uncheckCount(Elements) {
            var count=0;
            // var t = Elements.length;
            Elements.each(function(){
                if ($(this).prop('checked')) {
                    $(this).attr('checked', false);
                    id= '#indicator'+$(this).data('id');
                    $(id).css({ 'background': '#fbf9fa none repeat scroll 0 0;'});
                }
            });

            mainSubMessages.params.chat_area.body_content_messagewrite.fadeIn();
            mainSubMessages.params.chat_area.body_content_action.fadeOut();
        }

        //decocher tout
        mainSubMessages.params.btn.cancel.click(function(e){
            e.preventDefault();
            var  checks =  $("#Main-Messages .chat_area .chat-body1 p label input[type='checkbox']");
            uncheckCount(checks);
        });

        //supprimer un message
        mainSubMessages.params.btn.delete.click(function(e){
            e.preventDefault();
            var  checks =  $("#Main-Messages .chat_area .chat-body1 p label input[type='checkbox']");
            var list  = checkList(checks);
            if(list!='')
            {
                mainUserProfile_messages.params.bg_action.fadeIn();
                var data = { id: list,idUser:currentUser.id};
                deleteMessage(data,errorMessage);
            }
        });


        //supprimer un message
        mainSubMessages.params.btn.foward.click(function(e){
            e.preventDefault();
            var  checks =  $("#Main-Messages .chat_area .chat-body1 p label input[type='checkbox']");
            var list  = checkList(checks);
            if(list!='')
            {
                var data = { id: list};
                setFowardList(listUsers,mainSubMessages.params.foward.body);
            }

        });

        function changeState(Elements, ElementToActive) {
            var t = Elements.length;
            for (var i = 0; i < t; i++) {
                if (Elements.eq(i).hasClass('active_li')) {
                    Elements.eq(i).removeClass('active_li')
                }
            }
            ElementToActive.addClass('active_li');
            //alert();
        }

        mainSubMessages.params.chat_area.send.prop('disabled',true);

        //lors du  clique sur l'emoticon
        mainSubMessages.params.chat_area.emoticon_body.on('click','a',function(e){
            e.preventDefault();
           mainSubMessages.params.body.message_text.append(appEmoticons.function.getEmotions($(this).data('img'),''));
        });

        mainSubMessages.params.chat_area.emoticon_btn.hover(function(){
           // $(this).trigger('click');
        });

        function setnotificationMessage(element, list,badge)
        {
            element.body.empty();

            var userMessages = null,
                message = null,
                createDate=null,
                sendDate =null,
                src =null,
                friend =null,
                total = 0,
                friendProfile = null,
                userProfile =null,
                content =null,
                today =new Date(),
                messages = list;
            for (var i=0; i<messages.length;i++)
            {

                userMessage = messages[i].userMessage;
                friendProfile = messages[i].friendProfile;
                userProfile = messages[i].userProfile;
                message = userMessage.message;
                friend = messages[i].friend;
                createDate =new Date(message.createDate);
                if(today.toLocaleDateString()==createDate.toLocaleDateString())
                {
                    sendDate = createDate.toLocaleTimeString()
                }
                else
                {
                    sendDate = createDate.toLocaleDateString();
                    sendDate = sendDate.replace("/","-");
                    sendDate = sendDate.replace("/","-");
                    sendDate+= " "+createDate.toLocaleTimeString();
                }
                if(friendProfile!=null)
                {
                    src = baseHost + friendProfile.path;
                }
                else
                {
                    src = path.emptyImage;
                }
                total+=messages[i].count;
                var messageprop = !like(message.contentTuncate)?'emoticon':message.contentTuncate;
                content =
                    '<div class="dropdown-divider"></div>'+
                    '<a class="dropdown-item" href="#">'+
                    '<div class="row align-items-center">'+
                    '<div class="col-2"><img src="'+src+'" alt=""></div>'+
                    '<div class="col-7 ">'+
                    friend.fullname +'<br>'+
                    '<span class="text-grey">'+messageprop+'</span>'+
                    '</div>'+
                    '<div class="col-3 text-muted small text-right">'+
                    sendDate+'<br>'+
                    '<div class="badge badge-success">'+messages[i].count+'</div>'+
                    '</div>'+
                    '</div>'+
                    '</a>';
                element.body.append(content);
            }

            if(list.length==0)
            {
                mainUserProfile.params.nav.dropdownMenuFreinds_badge.fadeOut();
            }
            var length = total<10? "0"+total: total;
            element.count.html("("+length+")");
            badge.html(length);
        }


       function setFowardList(list,element)
        {
            element.empty();
            for(var i=0; i<list.length; i++)
            {
                var photoApplicant = list[i].photoApplicant,
                    photoReciever = list[i].photoReciever,
                    count = list[i].count>0? list[i].count:'',
                    request = list[i].request,
                    user = null;
                //alert();
                var src = null;
                if(request.receiver.id==currentUser.id)
                {
                    user = request.applicant;
                    if (( photoApplicant==null || photoApplicant=='null' || photoApplicant.hashname == null || photoApplicant.hashname == 'null')) {
                        src = path.emptyImage;
                    }
                    else {
                        src = baseHost + photoApplicant.path;
                    }
                }
                else
                {
                    user =  request.receiver;
                    if (( photoReciever==null || photoReciever=='null' || photoReciever.hashname == null || photoReciever.hashname == 'null')) {
                        src = path.emptyImage;
                    }
                    else {
                        src = baseHost + photoReciever.path;
                    }
                }
                // alert(user.id + "  current : " + currentUser.id);
                if(user.id !=currentUser.id && user.type!="System") {

                   /*var  message  = list[i].userMessage.message;
                   var sendDate =null;
                   var today =new Date();
                   var  createDate =new Date(message.createDate);
                    if(today.toLocaleDateString()==createDate.toLocaleDateString())
                    {
                        sendDate = createDate.toLocaleTimeString()
                    }
                    else
                    {
                        sendDate = createDate.toLocaleDateString();
                        sendDate = sendDate.replace("/","-");
                        sendDate = sendDate.replace("/","-");
                        sendDate+= " "+createDate.toLocaleTimeString();
                    }
                    */
                    var today = new Date();
                    var currentyear = today.getFullYear();
                    var year  = user.birthDate.split('-')[0];
                    var age = currentyear -parseInt(year);
                    age = age<10 ? '(0'+age+'ans)' : '('+ age+'ans)';
                    var name = user.fullname;
                    var joinReason = user.joinReason;
                    //var messageprop = !like(message.contentTuncate)?'emoticon':message.contentTuncate;
                    var  country = user.country;
                    var city = user.city;
                    var final =(city==null || city=="null")? getCountry(countryList,country) :city;
                    var flag ="<img class='sm-img flag' src='"+path.flags+country+".png' alt=''/> ";
                    var profession = user.profession==null || user.profession=="null"?'' : '('+ user.profession +')';
                    var lastLogin = new Date(user.lastLogin);

                    var state = user.isOnline? "<span class='small connect'>(connected)</span>" : null;
                    if(state==null)
                    {
                        if(lastLogin.toLocaleDateString() == today.toLocaleDateString())
                        {
                            state =(toDay-lastLogin)+"ago";
                        }
                    }

                    var content=
                            '<a href="#" class="list-group-item list-group-item-action flex-column align-items-start">'+
                                    '<table class="mb-1">'+
                                        '<tr>'+
                                            '<td>'+
                                                '<label class="custom-control custom-checkbox mb-2 mr-sm-2 mb-sm-0">'+
                                                     '<input type="checkbox" class="custom-control-input">'+
                                                     '<span class="custom-control-indicator"></span>'+
                                                     '<span class="custom-control-description">'+
                                                     '</span>'+
                                                '</label>'+
                                            '</td>'+
                                            '<td>'+
                                                '<img src="'+src+'" alt="" class="rounded-circle img">'+
                                            '</td>'+
                                            '<td style="padding-left: 5%">'+
                                                '<small class="text-muted pull-right">'+state+'</small>'+
                                                '<strong class="mb-1">'+name+age+'</strong>'+
                                                '<p>'+flag+final+'</p>'+
                                                '<small class="text-muted">'+getJoinReason(joinReason)+'</small>'+
                                            '</td>'+
                                        '</tr>'+
                                    '</table>'+
                                '</a>';
                    element.append(content);
                }
            }
        }

        function like(str) {
            var motif = "^.*<img.*$";
            var  expression = new RegExp(motif,"gi");
            var test =expression.test(str);
            if(str=="" || test==false)
            {
                return true
            }

            return false;
        }
        $("input[type='checkbox']").checkboxradio();

        //emoticons




    }
});



