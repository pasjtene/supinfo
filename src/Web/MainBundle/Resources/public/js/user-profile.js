/**
 * Created by Danick takam on 16/06/2017.
 */

var MainUserProfile = function()
{
    this.params = {
        page: $("#mainUserProfile"),
        preloader: '/data/img/simple.gif',
        bg_action:$('#bg-action'),
        iswriteMessage:$('#mainUserProfile .iswriteMessage'),
        api:{
           base: {
               url : baseUrl+"auth/user/base",
               method: "get",
               type: "json"
           },
            searchUser: {
                url : baseUrl+"auth/user/search",
                method: "get",
                type: "json"
            },
            accept: {
                url : baseUrl+"auth/user/friends/accept",
                method: "put",
                type: "json"
            },
            ask:{
                url : baseUrl+"auth/user/friend/ask",
                method: "post",
                type: "json"
            },
            deletes: {
                url : baseUrl+"auth/user/friends/remove",
                method: "delete",
                type: "json"
            },
            delcine: {
                url : baseUrl+"auth/user/friends/decline",
                method: "put",
                type: "json"
            },
            city: {
                url : baseUrl+"auth/user/city",
                method: "get",
                type: "json"
            },
            get: {
                url : baseUrl+"auth/Message/conversation",
                method: "get",
                type: "json"
            },
            countConversation:{
                url : baseUrl+"auth/Message/notification",
                method: "get",
                type: "json"
            } ,
            post:{
                url : baseUrl+"auth/Message/add",
                method: "post",
                type: "json"
            },
        },
        id:{
            modalEmail: $("#modalEmail"),
            bg_action:$('#bg-action'),
        },
        class:{
            carousel: $('.carousel')
        },
        imprtant:{
            important_block_img: $("#important-block img")
        },
        main_body:{
            content :$("#main-body #content"),
            chargement: $("#main-body #chargement")
        },
        matches:{
            carousel_inner: $("#profile-nav #carousel .carousel-inner"),
            carousel: $("#profile-nav #carousel"),
            detail : $("#profile-nav #carousel .vip-detail")
        },
        filter:
        {
            countries: $("#countries"),
            cities: $("#cities"),
            age_min: $("#age-min"),
            age_max: $("#age-max"),
            surface_min: $("#surface-min"),
            surface_max: $("#surface-max"),
            profession: $("#profession"),
            sex: $("#sex"),
            btn: $("#filter-valider"),
            close: $("#filter-close"),
            modalfilter: $("#modalfilter")
        },
        nav:{
            dropdownMenuMessages: $('#nav #dropdownMenuMessages'),
            dropdownMenuMessages_badge: $('#nav #dropdownMenuMessages .badge'),
            dropdownMenuMessages_body:$("#toogleNav #dropdownMenuMessages-body"),
            dropdownMenuFreinds: $('#nav #dropdownMenuFreinds'),
            dropdownMenuFreinds_badge: $('#nav #dropdownMenuFreinds .badge'),
            dropdownMenuFreinds_body:$("#toogleNav #dropdownMenuFreinds-body"),
            content: $("#content"),
            notification:
            {
                friends : {
                    count : $('#toogleNav #dropdownMenuFreinds-body .count'),
                    body : $('#toogleNav #dropdownMenuFreinds-body .body'),
                    preloader : $('#toogleNav #dropdownMenuFreinds-body .preloader')
                },
                message:{
                    count : $('#toogleNav #dropdownMenuMessages-body .count'),
                    body : $('#toogleNav #dropdownMenuMessages-body .body'),
                    preloader : $('#toogleNav #dropdownMenuMessages-body .preloader')
                }

            }
        },
        chat:{
            main: $('#qnimate'),
            btnMessage: $('.drag-message'),
            header:{
                main: $("#qnimate .popup-head"),
                close: $("#qnimate .popup-head #closeChat"),
                setting: $("#qnimate .popup-head .btn-group"),
                Profile: $("#qnimate .popup-head #userCurrentProfile"),
                name: $("#qnimate .popup-head #userCurrentName")

            },
            body:{
                main: $('#qnimate .popup-messages')
            },
            footer:{
                main: $('#qnimate .popup-messages-footer'),
                message: $('#qnimate .popup-messages-footer #status_message'),
                btn: $('#qnimate .popup-messages-footer .btn-footer'),
                send: $('#qnimate .popup-messages-footer .btn-footer .btn-send')
            }
        },
        chatbox:{
            father: $('#drag-messageA'),
            main: $('.chatcontent'),
            btnMessage: $('.drag-message'),
            header:{
                main: $(".chatcontent .popup-head"),
                close: $(".chatcontent .popup-head .closeChat"),
                setting: $(".chatcontent .popup-head .btn-group"),
                Profile: $(".chatcontent .popup-head .userCurrentProfile"),
                name: $(".chatcontent .popup-head .userCurrentName")

            },
            body:{
                main: $('.chatcontent .popup-messages')
            },
            footer:{
                main: $('.chatcontent .popup-messages-footer'),
                message: $('.chatcontent .popup-messages-footer #status_message'),
                btn: $('.chatcontent .popup-messages-footer .btn-footer'),
                send: $('.chatcontent .popup-messages-footer .btn-footer .btn-send')
            }
        }
    };

};

var listUsers = null,
    listVips = null,
    selectUserId = 0,
    ListPhotos = null;
$(function(){


    var mainUserProfile = new MainUserProfile(),
        appEmoticons = new AppEmoticons();

   if(mainUserProfile.params.page.data('page')=="mainUserProfile")
   {
       // force le background a ne pas reagir lorsqu'on   clic
       mainUserProfile.params.id.modalEmail.click(function(){
           if(!$(this).hasclass("show"))
           {
               $(this).addClass("show");
           }
       });

       mainUserProfile.params.id.modalEmail.modal('show');
       mainUserProfile.params.class.carousel.carousel({
           interval: 2000
       });


       //variable globales
       var countFriend= 0
           countMessage=0,
           countListMessageUserCurrent = 0,
           countListMessageUserCurrentnew = 0,
           countMessageNotSee = 0,
           listUsers = null,
           errorMessage = "something is wrong";

       //fermer le modal
       mainUserProfile.params.filter.close.click(function(){
           mainUserProfile.params.filter.modalfilter.removeClass("show");
       });


       //alert(mainUserProfile.params.filter.countries.data("country"))

       //charger la liste des pays
       $.getJSON(mainUserProfile.params.filter.countries.data("country"), function(data){
           mainUserProfile.params.filter.countries.empty();
           $.each(data,function(index,value){
               var option = "<option value='"+index+"'>"+value+"</option>";
               mainUserProfile.params.filter.countries.append(option);
           });
       });

       //charger la liste des villes
       mainUserProfile.params.filter.countries.change(function(){
           //charger la liste des villes
           $.ajax({
               url: mainUserProfile.params.api.city.url,
               type:  mainUserProfile.params.api.city.method,
               data: "country="+$(this).val(),
               crossDomain: true,
               headers : {"X-Auth-Token" : currentUser.token},
               contentType: false,
               processData: false,
               dataType:  mainUserProfile.params.api.city.type,
               success: function(response){
                   //console.log(response);
                   mainUserProfile.params.filter.cities.empty();
                   $.each(response,function(index,value){
                       var option = "<option value='"+value.city+"'>"+value.accentCity+"</option>";
                       mainUserProfile.params.filter.cities.append(option);
                   });
               },
               error: function (xhr, status, message) { //en cas d'erreur
                   console.log(status+"\n"+xhr.responseText + '\n' + message );
               },
               complete:function(){
                   console.log("Request finished.");
               }

           });
       });





       //charger tous les elements de bases
       $.ajax({
           url: mainUserProfile.params.api.base.url,
           type:  mainUserProfile.params.api.base.method,
           data: "id="+currentUser.id,
           crossDomain: true,
           headers : {"X-Auth-Token" : currentUser.token},
           contentType: false,
           processData: false,
           dataType:  mainUserProfile.params.api.base.type,
           success: function(response){
               //console.log(response);
               //set  les listes des users
               listUsers=response.users;

               //set  les listes des photos
               listPhotos=response.photos;

               //set le user connecte
              /* if(response.user!=null && response.user!=null && response.user!='undefined'){
                   selectUserId = response.user.id;
               }
               */

               //modifier la photo de profile du  user connecte
               if(response.profilePhotos!=null && response.profilePhotos[0]!=null && response.profilePhotos[0]!='undefined'){
                   setProfile(mainUserProfile.params.imprtant.important_block_img,baseHost+response.profilePhotos[0].path,mainUserProfile.params.imprtant.important_block_img.data('help'))
               }

               //charger les entetes de notifications
               if(response.recievers!=null)
               {
                   countFriend = response.recievers.length;
                   setFriendsNav(mainUserProfile.params.nav.notification.friends,response.recievers,mainUserProfile.params.nav.dropdownMenuFreinds_badge);
               }
               else{
                   mainUserProfile.params.nav.dropdownMenuFreinds_badge.fadeOut();
               }
               //chargement des utilisateurs vips
               if(response.vips!=null)
               {
                   setVips(mainUserProfile.params.matches.carousel_inner,response.vips);
               }
               if(response.recieveMessages!=null  && response.recieveMessages !="null" && response.recieveMessages!="undefined")
               {
                   countMessage = response.recieveMessages.length;
                   setnotificationMessage(mainUserProfile.params.nav.notification.message, response.recieveMessages,mainUserProfile.params.nav.dropdownMenuMessages_badge);
               }

           },
           error: function (xhr, status, message) { //en cas d'erreur
               console.log(status+"\n"+xhr.responseText + '\n' + message );
           },
           complete:function(){
               console.log("Request finished.");
           }

       });




       mainUserProfile.params.nav.dropdownMenuFreinds_body.on('click',".accept",function(){
           accept($(this).data('id'), currentUser.id,$('#toogleNav #dropdownMenuFreinds-body #'+$(this).data('preloader')));
       });

       mainUserProfile.params.nav.dropdownMenuFreinds_body.on('click',".decline",function(){
           decline($(this).data('id'), currentUser.id,$(this).data('decision'),$('#toogleNav #dropdownMenuFreinds-body #'+$(this).data('preloader')));
       });

       function accept(id, idUser,preloader)
       {
           preloader.fadeIn();
           datas = {
               id : id,
               idUser: idUser
           };
           $.ajax({
               url: mainUserProfile.params.api.accept.url,
               type:  mainUserProfile.params.api.accept.method,
               data:  datas,
               crossDomain: true,
               headers : {"X-Auth-Token" : currentUser.token},
               dataType:  mainUserProfile.params.api.base.type,
               success: function(response){
                   //charger les entetes de notifications
                   if(response.recievers!=null)
                   {
                       setFriendsNav(mainUserProfile.params.nav.notification.friends,response.recievers,mainUserProfile.params.nav.dropdownMenuFreinds_badge);
                   }
                   else{
                       mainUserProfile.params.nav.dropdownMenuFreinds_badge.fadeOut();
                       mainUserProfile.params.nav.notification.friends.body.empty();
                   }
                   preloader.fadeOut();
                   trans = Translator.trans('sub.invitation.accept',{},"friends")+' '+response.user.fullname;
                   bootbox.alert(trans,function(){});
               },
               error: function (xhr, status, message) { //en cas d'erreur
                   console.log(status+"\n"+xhr.responseText + '\n' + message );
                   preloader.fadeOut();
                   trans = Translator.trans('sub.invitation.error',{},"friends");
                   bootbox.alert(trans,function(){});
               },
               complete:function(){
                   console.log("Request finished.");
               }

           });
       }


       function decline(id, idUser,decision,preloader)
       {
          preloader.fadeIn();
           datas = {
               id : id,
               idUser: idUser,
               decision: decision
           };
           $.ajax({
               url: mainUserProfile.params.api.delcine.url,
               type:  mainUserProfile.params.api.delcine.method,
               data: datas,
               crossDomain: true,
               headers : {"X-Auth-Token" : currentUser.token},
               success: function(response){
                   //charger les entetes de notifications
                   if(response.recievers!=null)
                   {
                       setFriendsNav(mainUserProfile.params.nav.notification.friends,response.recievers,mainUserProfile.params.nav.dropdownMenuFreinds_badge);
                   }
                   else{
                       mainUserProfile.params.nav.dropdownMenuFreinds_badge.fadeOut();
                       mainUserProfile.params.nav.notification.friends.empty();
                   }
                   preloader.fadeOut();
                   trans = Translator.trans('sub.invitation.refuse',"friends");
                   bootbox.alert(trans,function(){});
               },
               error: function (xhr, status, message) { //en cas d'erreur
                   console.log(status+"\n"+xhr.responseText + '\n' + message );
                   preloader.fadeOut();
                   trans = Translator.trans('sub.invitation.error',{},"friends");
                   bootbox.alert(trans,function(){});
               },
               complete:function(){
                   console.log("Request finished.");
               }

           });
       }

       function setProfile(element,img,helpImg){
           if(img==null || img=="undefined")
           {
               element.attr("src",helpImg);
           }
           else{
               element.attr("src",img);
           }
           return element;
       }

       function setVips(element,list)
       {
           element.empty();
           var body ="";
           var j=1;
           for(var i=0; i<list.length; i++)
           {
               var user = list[i].user;
               var profile = list[i].profile;
               var photos = list[i].photos;
               var profilePicture = list[i].photoProfile;
               if(user.type!="System") {
                   if (user.country == currentUser.country) {
                       //photos
                       var src = null;
                       if ((profilePicture == null || profilePicture == 'null')) {
                           src = mainUserProfile.params.imprtant.important_block_img.data('help');
                       }
                       else {
                           src = baseHost + profilePicture.path;
                       }
                       var img = '<img class="d-block img-fluid rounded-circle vip-detail" data-key="'+user.key+'" title="'+user.fullname+'" src="' + src + '" alt="First slide">';
                       //variable de user
                       var today = new Date();
                       var currentyear = today.getFullYear();
                       var year = user.birthDate.split('-')[0];
                       var age = currentyear - parseInt(year);

                       if (j % 10 == 0 || j == 1) {
                           body += '<div class="carousel-item active align-items-center justify-content-md-center">';
                       }
                       else if (j % 10 == 0) {
                           body +=
                               '</div>' +
                               '</div>' +
                               '<div class="carousel-item  align-items-center justify-content-md-center">';
                       }
                       body +=
                           '<div class="row">' +
                           '<div class="col">' +
                           img +
                           '</div>';
                       j++;
                   }
               }
           }
           body+='</div> </div>';
           element.append(body);
           mainUserProfile.params.page.css({'margin-top':"0em"});
           mainUserProfile.params.matches.carousel.fadeIn();
           setTooltip(".vip-detail");
       }
       //mainUserProfile.params.nav.dropdownMenuMessages_body.fadeIn();
       //afficher les notifications messages
       mainUserProfile.params.nav.dropdownMenuMessages.on('click', function () {
           if(countMessage>0)
           {
               mainUserProfile.params.nav.dropdownMenuMessages_body.fadeIn();
           }
           else
           {
               var href = $(this).data('href');
               window.location.href = href;
           }
       });

       //afficher les notifications users
       mainUserProfile.params.nav.dropdownMenuFreinds.on('click', function () {
           if(countFriend>0)
           {
               mainUserProfile.params.nav.dropdownMenuFreinds_body.fadeIn();
           }
           else
           {
               var href = $(this).data('href');
               window.location.href = href;
           }
       });

       //cacher les boites de notification
       mainUserProfile.params.nav.content.on('click', function () {
           //bootbox.alert("ok",function(){});
           mainUserProfile.params.nav.dropdownMenuMessages_body.fadeOut();
           mainUserProfile.params.nav.dropdownMenuFreinds_body.fadeOut();
       });

       function setFriendsNav(element, list,badge){
           if(list.length==0)
           {
               mainUserProfile.params.nav.dropdownMenuFreinds_badge.fadeOut();
           }
           element.body.empty();
           var length = list.length<10? "0"+list.length : list.length;
           element.count.html("("+length+")");
           badge.html(length);
           for(var i=0; i<list.length;i++) {
               var profileReciever = list[i].photoReciever,
                   photoApplicant = list[i].photoApplicant,
                   reciever = list[i].request.receiver,
                   applicant = list[i].request.applicant,
                   message = list[i].request.messageTuncate,
                   id = list[i].request.id,
                   datapreloader = "friendpreoloader"+list[i].request.id;
               //console.log(applicant);
               var flagApplicant ="<img class='sm-img flag' src='"+path.flags+applicant.country+".png' alt=''/> ";
               var flagReciever ="<img class='sm-img flag' src='"+path.flags+reciever.country+".png' alt=''/> ";
               var preloader ="<br/><img id='"+datapreloader+"' class='sm-img preloader' src='"+mainUserProfile.params.preloader+"' alt=''/> ";
               var src = "";
               if ((photoApplicant == null || photoApplicant == 'null')) {
                   src = element.body.data('help');
               }
               else {
                   src = baseHost + photoApplicant.path;
               }
               var content =
                   '<div class="dropdown-divider"></div>' +
                   '<a class="dropdown-item" href="#" >'+
                   '<div class="row align-items-center">' +
                   '<div class="col-2">' +
                   '<img src="'+src+'" alt="">' +
                   '</div>' +
                   '<div class="col-4">' +
                   '<strong>'+ applicant.lastNameOrFirstname +'</strong><br>' +
                   '<span class="text-grey small">'+message+'</span> <br>' +
                   '<span class="text-grey small">'+flagApplicant+getCountry(countryList,applicant.country)+'</span>' +
                   '</div>' +
                   '<div class="col text-muted small text-right">' +
                   '<button  class="btn btn-sm btn-primary small accept" data-id="'+id+'" data-preloader="'+datapreloader+'" >Confirmer</button>' +
                   '<button class="btn btn-sm btn-danger small decline" data-decision="2" data-id="'+id+'" data-preloader="'+datapreloader+'" >Supprimer</button>' +
                   preloader+
                   '</div>' +
                   '</div>' +
                   '</a>';
               element.body.append(content);
           }

           if(list.length==0)
           {
               element.body.empty();
               mainUserProfile.params.nav.dropdownMenuFreinds_badge.fadeOut();
           }
       }

       function setnotificationMessage(element, list,badge)
       {
           element.body.empty();

           var userMessages = null,
               message = null,
               createDate=null,
               sendDate =null,
               src =null,
               friend =null,
               friendProfile = null,
               userProfile =null,
               content =null,
               today =new Date(),
               total = 0;
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
               total+= messages[i].count;
               var messageprop = !like(message.contentTuncate)?'emoticon':message.contentTuncate;
               content =
                   '<div class="dropdown-divider"></div>'+
                   '<a class="dropdown-item detail-message" href="#" data-key="'+friend.key+'">'+
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



       mainUserProfile.params.nav.notification.message.body.on('click','.detail-message',function(){
           var key = $(this).data('key');
           window.location.href = Routing.generate('main_profile_messages_detail',{_locale:locale,key:key});
       });
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

       mainUserProfile.params.chat.btnMessage.click(function () {
           mainUserProfile.params.chat.main.addClass('popup-box-on');
       });
       //rendre la zone dragente
       //mainUserProfile.params.chat.main.draggable();

       //$("#qnimate").mousedown(handle_mousedown);
       mainUserProfile.params.chat.header.close.click(function () {
           mainUserProfile.params.chat.main.removeClass('popup-box-on');
       });
       function handle_mousedown(e){
           window.my_dragging = {};
           my_dragging.pageX0 = e.pageX;
           my_dragging.pageY0 = e.pageY;
           my_dragging.elem = this;
           my_dragging.offset0 = $(this).offset();
           function handle_dragging(e){
               var left = my_dragging.offset0.left + (e.pageX - my_dragging.pageX0);
               var top = my_dragging.offset0.top + (e.pageY - my_dragging.pageY0);
               $(my_dragging.elem)
                   .offset({top: top, left: left});
           }
           function handle_mouseup(e){
               $('body')
                   .off('mousemove', handle_dragging)
                   .off('mouseup', handle_mouseup);
           }
           $('body')
               .on('mouseup', handle_mouseup)
               .on('mousemove', handle_dragging);
       }


       //accorder le tooltip et cliquer sur image pour consulter le detail
       //consulter le detail  sur un profile
       mainUserProfile.params.matches.carousel.on('click','.vip-detail',function(){
           window.location.href = Routing.generate('main_profile_detailProfile',{_locale:locale,key:$(this).data('key')});
       });

       //setTooltip(mainUserProfile.params.matches.detail);
       //$('[data-toggle="tooltip"]').tooltip();


       function setTooltip(element) {
           //alert(element);
           //$(element).tooltip("enable");
           console.log(element);
           $(element).tooltip({
               position: {
                   my: "center bottom-45",
                   at: "center left",
                   using: function (position, feedback) {
                       //alert(this);
                       $(this).css(position);
                       $("<div>")
                           .addClass("arrow")
                           .addClass(feedback.vertical)
                           .addClass(feedback.horizontal)
                           .appendTo(this);

                   }
               }
           });
       }

      /* if(mainUserProfile.params.iswriteMessage.data('write') =='yes')
       {

           function get(objet,errorMessage,isobjet,isdelete)
           {
               $.ajax(
                   {
                       url: mainUserProfile.params.api.get.url,
                       type: mainUserProfile.params.api.get.method,
                       data: objet,
                       crossDomain: true,
                       headers : {"X-Auth-Token" : currentUser.token},
                       dataType:  mainUserProfile.params.api.get.type,
                       success: function (data) {
                           console.log(data);
                           if(data!=null  && data !="null" && data!="undefined")
                           {
                               countListMessageUserCurrent = (data.recievers!=null && data.recievers!='null')? data.recievers.length: 0;
                               countListMessageUserCurrentnew = countListMessageUserCurrent;
                               src = baseHost + data.profileFriend.path;
                               mainUserProfile.params.chat.header.Profile.attr('src',src);
                               mainUserProfile.params.chat.header.name.html(data.friend.fullname);
                               setmessageContent(data,mainUserProfile.params.chat.body.main,isobjet);
                           }
                       },
                       error: function (xhr, status, message) {
                           console.log(xhr.responseText);
                           // bootbox.alert(errorMessage,function(){});
                       },
                       complete: function(){
                           if(isdelete)
                           {
                               mainUserProfile.params.bg_action.fadeOut();
                           }
                       }
                   }
               );
           }

           function post(objet,errorMessage,isobjet)
           {
               $.ajax(
                   {
                       url: mainUserProfile.params.api.post.url,
                       type: mainUserProfile.params.api.post.method,
                       data: objet,
                       crossDomain: true,
                       dataType:  mainUserProfile.params.api.post.type,
                       headers : {"X-Auth-Token" : currentUser.token},
                       success: function (data) {
                           console.log(data);
                           if(data!=null && data!="null" && data!="undefined")
                           {
                               setmessageContent(data,mainUserProfile.params.chat.body.main,isobjet);
                               mainUserProfile.params.chat.footer.message.empty();
                           }

                       },
                       error: function (xhr, status, message) {
                           console.log(xhr.responseText);
                           bootbox.alert(errorMessage,function(){});
                       }
                   }
               );
           }


           function  setmessageContent(list, element, isobjet)
           {
               //alert(selectUserId);
               var userMessages = null,
                   message = null,
                   createDate=null,
                   sendDate =null,
                   src =null,
                   country =null,
                   city = null,
                   final =null,
                   flag =null,
                   friendProfile = null,
                   time = null,
                   userProfile =null,
                   content =null,
                   user =null,
                   today =new Date();

               if(isobjet)
               {
                   userMessages = list.userMessages;
                   message = userMessages.message;
                   user = list.user;
                   userProfile = list.profile;
                   country = user.country;
                   city = user.city;
                   final =(city==null || city=="null")? getCountry(countryList,country) :city;
                   flag ="<img class='sm-img flag' src='"+path.flags+country+".png' alt=''/> ";
                   createDate =new Date(message.createDate);
                   time = createDate.toLocaleTimeString();
                   sendDate = createDate.toLocaleDateString();
                   sendDate=sendDate.replace("/","-");
                   sendDate=sendDate.replace("/","-");

                   if(userProfile!=null)
                   {
                       src = baseHost + userProfile.path;
                   }
                   else
                   {
                       src = path.emptyImage;
                   }
                   content =
                       '<div class="direct-chat-messages">'+
                       '<div class="chat-box-single-line">'+
                       '<abbr class="timestamp">'+sendDate+'</abbr>'+
                       '</div>'+
                       '<div class="direct-chat-msg doted-border">'+
                       '<div class="direct-chat-info clearfix">'+
                       '<span class="direct-chat-name pull-left">'+user.lastNameOrFirstname+'</span>'+
                       '</div>'+
                       '<img alt="message user image" src="'+src+'" class="direct-chat-img">'+
                       '<div class="direct-chat-text">'+
                       message.content+
                       '</div>'+
                       '<div class="direct-chat-info clearfix">'+
                       '<span class="direct-chat-timestamp pull-right">'+time+'</span>'+
                       '</div>'+
                       '<div class="direct-chat-info clearfix">'+
                       '<span class="direct-chat-img-reply-small pull-left">'+

                       '</span>'+
                       '<span class="direct-chat-reply-name">'+flag+final+'</span>'+
                       '</div>'+
                       '</div>'+
                       '</div>';
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
                   //mainUserProfile.params.chat.header.Profile.attr('src',src);

                   friendProfile = list.profileFriend;
                   if(friendProfile!=null)
                   {
                       src = baseHost + friendProfile.path;
                   }
                   else
                   {
                       src = path.emptyImage;
                   }
                   // mainSubMessages.params.chat_area.img_reciever.attr('src',src);


                   messages = list.messages;
                   for(var i=0; i<messages.length;i++)
                   {
                       userMessage = messages[i].userMessage;
                       friendProfile = messages[i].friendProfile;
                       userProfile = messages[i].userProfile;
                       message = userMessage.message;
                       user = messages[i].user;
                       country = user.country;
                       city = user.city;
                       final =(city==null || city=="null")? getCountry(countryList,country) :city;
                       flag ="<img class='sm-img flag' src='"+path.flags+country+".png' alt=''/> ";
                       createDate =new Date(message.createDate);
                       time = createDate.toLocaleTimeString();
                       sendDate = createDate.toLocaleDateString();
                       sendDate = sendDate.replace("/","-");
                       sendDate = sendDate.replace("/","-");
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
                           content =
                               '<div class="direct-chat-messages">'+
                               '<div class="chat-box-single-line">'+
                               '<abbr class="timestamp">'+sendDate+'</abbr>'+
                               '</div>'+
                               '<div class="direct-chat-msg doted-border">'+
                               '<div class="direct-chat-info clearfix">'+
                               '<span class="direct-chat-name pull-left">'+user.lastNameOrFirstname+'</span>'+
                               '</div>'+
                               '<img alt="message user image" src="'+src+'" class="direct-chat-img">'+
                               '<div class="direct-chat-text">'+
                               message.content+
                               '</div>'+
                               '<div class="direct-chat-info clearfix">'+
                               '<span class="direct-chat-timestamp pull-right">'+time+'</span>'+
                               '</div>'+
                               '<div class="direct-chat-info clearfix">'+
                               '<span class="direct-chat-img-reply-small pull-left">'+

                               '</span>'+
                               '<span class="direct-chat-reply-name">'+flag+final+'</span>'+
                               '</div>'+
                               '</div>'+
                               '</div>';
                           element.append(content);
                       }
                       else if(!isSender && userMessage.recieverRemove!=true )
                       {
                           user = messages[i].friend;
                           country = user.country;
                           city = user.city;
                           final =(city==null || city=="null")? getCountry(countryList,country) :city;
                           flag ="<img class='sm-img flag' src='"+path.flags+country+".png' alt=''/> ";
                           if(friendProfile!=null)
                           {
                               src = baseHost + friendProfile.path;
                           }
                           else
                           {
                               src = path.emptyImage;
                           }
                           content =
                               '<div class="direct-chat-messages">'+
                               '<div class="chat-box-single-line">'+
                               '<abbr class="timestamp">'+sendDate+'</abbr>'+
                               '</div>'+
                               '<div class="direct-chat-msg doted-border">'+
                               '<div class="direct-chat-info clearfix">'+
                               '<span class="direct-chat-name pull-left">'+user.lastNameOrFirstname+'</span>'+
                               '</div>'+
                               '<img alt="message user image" src="'+src+'" class="direct-chat-img">'+
                               '<div class="direct-chat-text">'+
                               message.content+
                               '</div>'+
                               '<div class="direct-chat-info clearfix">'+
                               '<span class="direct-chat-timestamp pull-right">'+time+'</span>'+
                               '</div>'+
                               '<div class="direct-chat-info clearfix">'+
                               '<span class="direct-chat-img-reply-small pull-left">'+

                               '</span>'+
                               '<span class="direct-chat-reply-name">'+flag+final+'</span>'+
                               '</div>'+
                               '</div>'+
                               '</div>';
                       }
                       element.append(content);
                   }
               }

               element.scrollTop(10000);
           }


           function getNotifieCount(objet,errorMessage)
           {
               $.ajax(
                   {
                       url: mainUserProfile.params.api.countConversation.url,
                       type: mainUserProfile.params.api.countConversation.method,
                       data: objet,
                       crossDomain: true,
                       headers : {"X-Auth-Token" : currentUser.token},
                       dataType:  mainUserProfile.params.api.countConversation.type,
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

           //au  debut on set la liste des messages du  user actuelle
           var  userint = setInterval(function(){
               if(selectUserId>0)
               {
                   clearInterval(userint);

                   var data ={
                       id : currentUser.id,
                       idFriend: selectUserId
                   };
                   //mainSubMessages.params.chat_area.send.prop('disabled',false);
                   //changeState(mainSubMessages.params.member_list.user_list, $(this));
                   get(data,errorMessage,false,false);
               }
           },100);


           //envoyer un message
           mainUserProfile.params.chat.footer.send.click(function(e){
               e.preventDefault();

               var data ={
                   id : currentUser.id,
                   idFriend: selectUserId,
                   content : mainUserProfile.params.chat.footer.message.html()
               };
               //alert(data.content);
               post(data,errorMessage,true);
           });

           // declancher l'accuse de reception
           setInterval(function(){
               var data ={
                   id : currentUser.id,
                   idFriend: selectUserId,
                   lastcount: countMessageNotSee
               };
               getNotifieCount(data,errorMessage);
           },3000);

           mainUserProfile.params.chat.footer.message.empty();
           mainUserProfile.params.chat.footer.message.focus();
           //envoyer un message en cliquant  sur entree
           mainUserProfile.params.chat.footer.message.keyup(function(e){
               //placeCaretAtEnd($(this).get(0));
               if(e.keyCode==32){
                   if( translateEmotion(listEmoticons(),$(this),path.emoticon))
                   {
                       setCaret($(this).get(0),false);
                   }
               }
               if(e.keyCode==13)
               {
                   e.preventDefault();
                   mainUserProfile.params.chat.footer.send.trigger('click');
               }
           });
       }
       */



       // debut  implementation du  chat
      // mainUserProfile.params.chat.btnMessage.click(function () {
      // });
      // mainUserProfile.params.chatbox.main.addClass('popup-box-on');


    /*
       // Premièrement, vérifions que nous avons la permission de notifier
       // Sinon, demandons la permission
       if (window.Notification && Notification.permission !== "granted") {
           Notification.requestPermission(function (status) {
               if (Notification.permission !== status) {
                   Notification.permission = status;
               }
           });
       }

       var button = $('#notifie');

       button.on('click', function () {
           // Si l'utilisateur accepte les notifications
           // essayons d'envoyer 10 notifications
           if (window.Notification && Notification.permission === "granted") {
               for (var i = 0; i < 10; i++) {
                   // Grâce au tag, nous ne devrions voir que la notification "Hey! 9"
                   var n = new Notification("Hey! " + i, {tag: 'soManyNotification'});
               }
           }

           // Si l'utilisateur n'a pas choisi s'il accepte d'être notifié // Note: à cause de Chrome, nous ne sommes pas certains que la
           // propriété permission soit définie, par conséquent il n'est pas
           // sûr de vérifier la valeur par défault.
           else if (window.Notification && Notification.permission !== "denied") {
               Notification.requestPermission(function (status) {
                   if (Notification.permission !== status) {
                       Notification.permission = status;
                   }

                   // Si l'utilisateur a accepté les notifications
                   if (status === "granted") {
                       for (var i = 0; i < 10; i++) {
                           // Grâce au tag, nous ne devrions voir que la notification "Hey! 9"
                           var n = new Notification("Hey! " + i, {tag: 'soManyNotification'});
                       }
                   }

                   // Sinon on bascule sur une alerte modale
                   else {
                       alert("Hey!");
                   }
               });
           }

           // Si l'utilisateur refuse les notifications
           else {
               // on bascule sur une alerte modale
               alert("Hey!");
           }
       });
    */

       //emoticons
       appEmoticons.params.btn.popover({
           html : true,
           content: function() {
               return appEmoticons.params.body.html();
           },
           trigger: 'focus'
       });
       appEmoticons.params.btn.click(function(e){
           e.preventDefault();
       });
   }
});


