/**
 * Created by Danick takam on 16/06/2017.
 */

var MainSubFriends = function()
{
    this.params = {
        page: $("#mainUserProfile"),
        sub: $("#Main-Subfriends"),
        api:{
            fill: {
                url : baseUrl+"auth/user/friends",
                method: "get",
                type: "json"
            }
        },
        id:{
            modalEmail: $("#modalEmail"),
            bg_action:$('#bg-action')
        },
        class:{
            carousel: $('.carousel')
        },
        imprtant:{
            important_block_img: $("#important-block img")
        },
       ask:{
           Main_Subfriends_ask: $("#Main-Subfriends #Main-Subfriends-ask"),
           body: $("#Main-Subfriends #Main-Subfriends-ask .body"),
           head:{
               div: $('#Main-Subfriends #Main-Subfriends-ask'),
               h5: $('#Main-Subfriends #Main-Subfriends-ask .card-header h5 strong '),
               number: $('#Main-Subfriends #Main-Subfriends-ask .card-header h5 strong .number '),
               a: $('#Main-Subfriends #Main-Subfriends-ask .card-header a  ')
           }
       },
        send:{
            Main_Subfriends_send: $("#Main-Subfriends #Main-Subfriends-send"),
            body: $("#Main-Subfriends #Main-Subfriends-send .body"),
            head:{
                div: $('#Main-Subfriends #Main-Subfriends-send'),
                h5: $('#Main-Subfriends #Main-Subfriends-send .card-header h5 strong '),
                number: $('#Main-Subfriends #Main-Subfriends-send .card-header h5 strong .number '),
                a: $('#Main-Subfriends #Main-Subfriends-send .card-header a  ')
            }
        },
        friend:{
            Main_Subfriends_search: $("#Main-Subfriends #Main-Subfriends-seach"),
            body: $("#Main-Subfriends #Main-Subfriends-seach .body"),
            input: $("#Main-Subfriends #Main-Subfriends-seach #Main-Subfriends-seach-input"),
            btn: $("#Main-Subfriends #Main-Subfriends-seach #Main-Subfriends-seach-btn"),
            list: $("#Main-Subfriends #Main-Subfriends-seach #Main-Subfriends-seach-list"),
            preloader: $("#Main-Subfriends #Main-Subfriends-seach .img-search"),
            head:{
                div: $('#Main-Subfriends #Main-Subfriends-seach'),
                h5: $('#Main-Subfriends #Main-Subfriends-seach .card-header h5 strong '),
                number: $('#Main-Subfriends #Main-Subfriends-seach .card-header h5 strong .number '),
                a: $('#Main-Subfriends #Main-Subfriends-seach .card-header a  ')
            }
        }

    };

};

var listUsers = null,
    listVips = null,
    ListPhotos = null;
$(function(){

    var  mainSubFriends = new MainSubFriends();
    var mainUserProfile_friends = new MainUserProfile();
    if(mainSubFriends.params.sub.data('sub')=="friends")
    {

        mainUserProfile_friends.params.bg_action.fadeIn();
        //charger tous les elements de bases
        $.ajax({
            url: mainSubFriends.params.api.fill.url,
            type:  mainSubFriends.params.api.fill.method,
            data: "id="+currentUser.id,
            crossDomain: true,
            headers : {"X-Auth-Token" : currentUser.token},
            contentType: false,
            processData: false,
            dataType:  mainSubFriends.params.api.fill.type,
            success: function(response){
                

                if(response!=null && response!="null")
                {
                    var test1= false;
                    var test2= false;
                    if(response.listRecievers!=null && response.listRecievers!="null"  && response.listRecievers!="undefined")
                    {
                        console.log(response);
                        test1 =true;
                        mainSubFriends.params.ask.head.number.html(response.listRecievers.length);
                        if(response.listApplicants!=null && response.listApplicants!="null"  && response.listApplicants!="undefined"){
                            mainSubFriends.params.ask.head.a.fadeIn();
                        }
                        setInvitation(mainSubFriends.params.ask.body, response.listRecievers);
                    }
                    if(response.listApplicants!=null && response.listApplicants!="null"  && response.listApplicants!="undefined")
                    {
                        if(response.listRecievers!=null && response.listRecievers!="null"  && response.listRecievers!="undefined")
                        {
                            mainSubFriends.params.send.head.a.fadeIn();
                        }
                        test2=true;
                        mainSubFriends.params.send.head.number.html(response.listApplicants.length);
                        setSend(mainSubFriends.params.send.body, response.listApplicants);
                    }

                    if(test1){
                        mainSubFriends.params.send.head.div.fadeOut();
                        mainSubFriends.params.ask.head.div.fadeIn();
                    }
                    else if(test2)
                    {
                        mainSubFriends.params.ask.head.div.fadeOut();
                        mainSubFriends.params.send.head.div.fadeIn();
                    }
                    else
                    {
                        mainSubFriends.params.ask.head.div.fadeOut();
                        mainSubFriends.params.send.head.div.fadeOut();
                    }

                    if(response.listUsers!=null && response.listUsers!="null"  && response.listUsers!="undefined") {

                        setUsers(mainSubFriends.params.friend.body, response.listUsers);
                        mainSubFriends.params.friend.head.div.fadeIn();
                    }
                    mainUserProfile_friends.params.bg_action.fadeOut();
                }

            },
            error: function (xhr, status, message) { //en cas d'erreur
                console.log(status+"\n"+xhr.responseText + '\n' + message );
            },
            complete:function(){
                console.log("Request finished.");
            }

        });


        // charger le dataliste des users
        var intUser = setInterval(function(){
            if(listUsers!=null)
            {
                for(var i=0; i<listUsers.length;i++)
                {
                    var user = listUsers[i].user;
                    if(user.id !=currentUser.id && user.type!="System"){
                        var option = '<option value="'+user.fullname+'">';
                        mainSubFriends.params.friend.list.append(option);
                    }
                }

                for(var i=0; i<countryList.length;i++)
                {
                    var country = countryList[i];
                        var option = '<option value="'+getCountry(countryList,country.code)+'">';
                        mainSubFriends.params.friend.list.append(option);
                }
                // on arrete le thread
               clearInterval(intUser) ;
            }
        },100);

        //charger la liste de  recher
        mainSubFriends.params.friend.btn.click(function(e){
            e.preventDefault();
            searchUser(mainSubFriends.params.friend.input.val(),currentUser.id);
        });

        //lorqu'on clique sur le button entrée
        mainSubFriends.params.friend.input.keydown(function(e){
               if(e.keyCode===13){
                   mainSubFriends.params.friend.btn.trigger('click');
               }

        });

        //consulter le detail  sur un profile
        mainSubFriends.params.page.on('click','.detail',function(){
            window.location.href = Routing.generate('main_profile_detailProfile',{_locale:locale,key:$(this).data('key')});
        });

        //consulter le detail  sur un profile
        mainSubFriends.params.page.on('click','.name-detail',function(){
            window.location.href = Routing.generate('main_profile_detailProfile',{_locale:locale,key:$(this).data('key')});
        });

        // demander l'amitier
        mainSubFriends.params.friend.body.on('click',".add",function(e){
            e.preventDefault();
            trans = Translator.trans('sub.message',{},"default");
            var email =$(this).data('key');
            bootbox.prompt(trans,function(result){
                if(result){
                    addFriend(currentUser.id,email,result,$('#Main-Subfriends #Main-Subfriends-seach .body #'+$(this).data('preloader')));
                }
            });
        });

        // accepter les demandes d'amitiers
        mainSubFriends.params.ask.body.on('click',".confirm",function(e){
            e.preventDefault();
            accept($(this).data('id'), currentUser.id,$('#Main-Subfriends #Main-Subfriends-ask .body #'+$(this).data('preloader')));
        });

        // decliner les demandes d'amitiers
        mainSubFriends.params.ask.body.on('click',".decline",function(e){
            e.preventDefault();
            decline($(this).data('id'), currentUser.id,$(this).data('decision'),$('#Main-Subfriends #Main-Subfriends-ask .body #'+$(this).data('preloader')));
        });

        // afficher la liste de  ces propres demandes  d'amitier
        mainSubFriends.params.ask.head.a.click(function(e){
            e.preventDefault();
            mainSubFriends.params.ask.head.div.fadeOut();
            mainSubFriends.params.send.head.div.fadeIn();
        });

        // accepter les demandes d'amitiers
        mainSubFriends.params.send.body.on('click',".delete",function(e){
            e.preventDefault();
            var preloader = $('#Main-Subfriends #Main-Subfriends-send .body #'+$(this).data('preloader'));
            deleteInvitation($(this).data('id'), currentUser.id,preloader);
        });


        // afficher la liste de  invitattions
        mainSubFriends.params.send.head.a.click(function(e){
            e.preventDefault();
            mainSubFriends.params.send.head.div.fadeOut();
            mainSubFriends.params.ask.head.div.fadeIn();
        });


        function setInvitation(element, list)
        {
            element.empty();
            for(var i=0; i<list.length;i++)
            {
                var photoApplicant = list[i].photoApplicant,
                    photoReciever = list[i].photoReciever,
                    request = list[i].request,
                    src = null,
                    friends=null,
                    common = Translator.trans('sub.invitation.common', {}, 'friends'),
                    confirm = Translator.trans('sub.invitation.confirm', {}, 'friends'),
                    message = Translator.trans('sub.invitation.message', {}, 'friends'),
                    action = Translator.trans('sub.invitation.action', {}, 'friends'),
                    block = Translator.trans('sub.invitation.block', {}, 'friends'),
                    ignore = Translator.trans('sub.invitation.ignore', {}, 'friends'),
                    id = 'module'+request.id;
                var datapreloader = "Invitationpreoloader"+request.id;
                var preloader ="<img id='"+datapreloader+"' class='sm-img preloader pull-right' src='"+mainUserProfile_friends.params.preloader+"' alt=''/> ";
               var  deletes = Translator.trans('sub.invitation.delete', {}, 'friends');
                    if(request.receiver.id==currentUser.id)
                    {
                        friends = request.applicant;
                        if (( photoApplicant==null || photoApplicant=='null' || photoApplicant.hashname == null || photoApplicant.hashname == 'null')) {
                            src = element.data('help');
                        }
                        else {
                            src = baseHost + list[i].photoApplicant.path;
                        }
                    }
                    else
                    {
                        friends =  request.receiver;
                        if (( photoReciever==null || photoReciever=='null' || photoReciever.hashname == null || photoReciever.hashname == 'null')) {
                            src = element.data('help');
                        }
                        else {
                            src = baseHost + list[i].photoReciever.path;
                        }
                    }
                    var today=new Date();
                    var currentyear = today.getFullYear();
                    var year  = friends.birthDate.split('-')[0];
                    var age = currentyear -parseInt(year);
                    age = age<10 ? '(0'+age+'ans)' : '('+ age+'ans)';
                    var name = friends.lastNameOrFirstname;
                    var city = friends.city;
                   var  country = friends.country;
                    var final =(city==null || city=="null")? getCountry(countryList,country) :city;
                   var flag ="<img class='sm-img flag' src='"+path.flags+country+".png' alt=''/> ";
                var profession = friends.profession==null || friends.profession=="null"?'' : '('+ friends.profession +')';
                var  content =
                    '<section>'+
                         '<div class="container py-3">'+
                            '<div class="row align-items-center small">'+
                                '<div class="col-md-3 ">'+
                                     '<img src="'+src+'" class="w-100 detail" data-key="'+friends.key+'" data-email="'+friends.email+'" >'+
                                '</div>'+
                                '<div class="col-md-9 px-3 content" >'+
                                    '<div class="card-block px-3">'+
                                         '<h4 class="card-title name-detail" data-key="'+friends.key+'" >'+friends.fullname+age+' </h4>'+
                                         '<p class="card-text text-muted message-text" >'+request.message+'</p>'+
                                         '<p class="card-text text-grey small"><span class="pays">'+flag+final+'</span> <span class="profession text-muted">'+profession+'</span></p>'+
                                         '<a href="#" data-id="'+request.id+'" class="btn btn-sm btn-primary confirm" data-preloader="'+datapreloader+'">'+confirm+'</a>'+
                                         '<a href="#" data-id="'+request.id+'" data-toggle="modal" data-target="#Message-box" class="btn btn-sm btn-success message"><span class="fa fa-comment"></span>'+message+'</a>'+
                                         '<a href="#" class="btn btn-sm btn-danger dropdown-toggle" id="'+id+'" data-preloader="'+datapreloader+'" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">'+action+'</a>'+
                                            '<div class="dropdown-menu" aria-labelledby="'+id+'" style="line-height: 1rem;">'+
                                                '<a class="dropdown-item decline" data-preloader="'+datapreloader+'" data-id="'+request.id+'" data-decision="2" href="#">'+deletes+'</a>'+
                                                '<a class="dropdown-item decline" data-preloader="'+datapreloader+'" data-id="'+request.id+'" data-decision="3"  href="#">'+block+'</a>'+
                                                '<a class="dropdown-item decline" data-preloader="'+datapreloader+'" data-id="'+request.id+'" data-decision="4" href="#">'+ignore+'</a>'+
                                            '</div>'+
                                            preloader+
                                    '</div>'+
                                '</div>'+
                            '</div>'+
                         '</div>'+
                         '<hr>'+
                    '</section>';

                element.append(content);
            }
        }


        function setSend(element, list)
        {
            element.empty();
            for(var i=0; i<list.length;i++)
            {
                var photoApplicant = list[i].photoApplicant,
                    photoReciever = list[i].photoReciever,
                    request = list[i].request,
                    src = null,
                    friends=null,
                    common = Translator.trans('sub.invitation.common', {}, 'friends'),
                    deletesmessages = Translator.trans('sub.invitation.deletes', {}, 'friends'),
                    ignore = Translator.trans('sub.invitation.ignore', {}, 'friends'),
                    id = 'sendInvitation'+request.id;
                var datapreloader = "SendInvitationpreoloader"+list[i].request.id;
                var preloader ="<img id='"+datapreloader+"' class='sm-img preloader pull-right' src='"+mainUserProfile_friends.params.preloader+"' alt=''/> ";
                var  deletes = Translator.trans('sub.invitation.delete', {}, 'friends');
                if(request.receiver.id==currentUser.id)
                {
                    friends = request.applicant;
                    if (( photoApplicant==null || photoApplicant=='null' || photoApplicant.hashname == null || photoApplicant.hashname == 'null')) {
                        src = element.data('help');
                    }
                    else {
                        src = baseHost + list[i].photoApplicant.path;
                    }
                }
                else
                {
                    friends =  request.receiver;
                    if (( photoReciever==null || photoReciever=='null' || photoReciever.hashname == null || photoReciever.hashname == 'null')) {
                        src = element.data('help');
                    }
                    else {
                        src = baseHost + list[i].photoReciever.path;
                    }
                }
                var today=new Date();
                var currentyear = today.getFullYear();
                var year  = friends.birthDate.split('-')[0];
                var age = currentyear -parseInt(year);
                age = age<10 ? '(0'+age+'ans)' : '('+ age+'ans)';
                var name = friends.lastNameOrFirstname;
                var city = friends.city;
                var  country = friends.country;
                var final =(city==null || city=="null")? getCountry(countryList,country) :city;
                var flag ="<img class='sm-img flag' src='"+path.flags+country+".png' alt=''/> ";
                var profession = friends.profession==null || friends.profession=="null"?'' : '('+ friends.profession +')';
                var  content =
                    '<section>'+
                    '<div class="container py-3">'+
                    '<div class="row align-items-center small">'+
                    '<div class="col-md-3 ">'+
                    '<img src="'+src+'" class="w-100 detail" data-key="'+friends.key+'" data-email="'+friends.email+'" >'+
                    '</div>'+
                    '<div class="col-md-9 px-3 content" >'+
                    '<div class="card-block px-3">'+
                    '<h4 class="card-title name-detail" data-key="'+friends.key+'" >'+friends.fullname+age+' </h4>'+
                    '<p class="card-text text-muted message-text" >'+request.message+'</p>'+
                    '<p class="card-text text-grey small"><span class="pays">'+flag+final+'</span> <span class="profession text-muted">'+profession+'</span></p>'+
                    '<a href="#" data-id="'+request.id+'" class="btn btn-sm btn-primary delete" data-preloader="'+datapreloader+'">'+deletesmessages+'</a>'+
                    preloader+
                    '</div>'+
                    '</div>'+
                    '</div>'+
                    '</div>'+
                    '<hr>'+
                    '</section>';

                element.append(content);
            }
        }



        function accept(id, idUser,preloader)
        {
            preloader.fadeIn();
            datas = {
                id : id,
                idUser: idUser,
                page : 'listFriend'
            };
            $.ajax({
                url: mainUserProfile_friends.params.api.accept.url,
                type:  mainUserProfile_friends.params.api.accept.method,
                data:  datas,
                crossDomain: true,
                headers : {"X-Auth-Token" : currentUser.token},
                dataType:  mainUserProfile_friends.params.api.base.type,
                success: function(response){
                    //charger les les notifications
                    console.log(response);
                    if(response.listRecievers!=null && response.listRecievers!="null"  && response.listRecievers!="undefined")
                    {
                        setFriendsNav(mainUserProfile_friends.params.nav.notification.friends,response.listRecievers,mainUserProfile_friends.params.nav.dropdownMenuFreinds_badge);
                        setInvitation(mainSubFriends.params.ask.body,response.listRecievers);
                    }
                    else{
                        mainSubFriends.params.ask.body.empty();
                        mainSubFriends.params.ask.head.div.fadeOut();
                        mainUserProfile_friends.params.nav.dropdownMenuFreinds_badge.fadeOut();
                        mainUserProfile.params.nav.notification.friends.body.empty();
                        if(response.listApplicants!=null && response.listApplicants!="null"  && response.listApplicants!="undefined")
                        {
                            mainSubFriends.params.send.head.div.fadeIn();
                        }
                        else
                        {
                            mainSubFriends.params.send.head.div.fadeOut();
                        }

                        mainUserProfile_friends.params.nav.dropdownMenuFreinds_badge.fadeOut();
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


        function addFriend(applicantId,receiverEmail,message,preloader)
        {
            preloader.fadeIn();
            datas = {
                applicantId: applicantId,
                receiverEmail: receiverEmail,
                page : 'listFriend',
                message: message
            };
            $.ajax({
                url: mainUserProfile_friends.params.api.ask.url,
                type:  mainUserProfile_friends.params.api.ask.method,
                data:  datas,
                crossDomain: true,
                headers : {"X-Auth-Token" : currentUser.token},
                dataType:  mainUserProfile_friends.params.api.ask.type,
                success: function(response){
                    //charger les les notifications
                    console.log(response);
                    if(response.listApplicants!=null && response.listApplicants!="null"  && response.listApplicants!="undefined")
                    {
                        setSend(mainSubFriends.params.send.body, response.listApplicants);
                        mainSubFriends.params.ask.head.div.fadeOut();
                        mainSubFriends.params.send.head.div.fadeIn();
                    }
                    else
                    {
                        mainSubFriends.params.send.head.div.fadeOut();
                    }
                    if(response.listUsers!=null && response.listUsers!="null"  && response.listUsers!="undefined") {

                        setUsers(mainSubFriends.params.friend.body, response.listUsers);
                        mainSubFriends.params.friend.head.div.fadeIn();
                    }
                    preloader.fadeOut();
                    trans = Translator.trans('sub.success.ask',{},"default");
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




        function searchUser(search,id)
        {
            mainSubFriends.params.friend.preloader.fadeIn();
            mainSubFriends.params.friend.body.empty();
           var country = getCountryCode(countryList, search);
            search = country==null? search : country;
            datas = {
                search: search,
                id: id
            };
            $.ajax({
                url: mainUserProfile_friends.params.api.searchUser.url,
                type:  mainUserProfile_friends.params.api.searchUser.method,
                data:  datas,
                crossDomain: true,
                headers : {"X-Auth-Token" : currentUser.token},
                dataType:  mainUserProfile_friends.params.api.searchUser.type,
                success: function(response){
                    console.log(response);
                    if(response.listUsers!=null && response.listUsers!="null"  && response.listUsers!="undefined") {

                        setUsers(mainSubFriends.params.friend.body, response.listUsers);
                        mainSubFriends.params.friend.head.div.fadeIn();
                    }
                },
                error: function (xhr, status, message) { //en cas d'erreur
                    console.log(status+"\n"+xhr.responseText + '\n' + message );
                    trans = Translator.trans('sub.invitation.error',{},"friends");
                    bootbox.alert(trans,function(){});
                },
                complete:function(){
                    console.log("Request finished.");
                    mainSubFriends.params.friend.preloader.fadeOut();
                }

            });
        }

        function decline(id, idUser,decision,preloader)
        {
            preloader.fadeIn();
            datas = {
                id : id,
                idUser: idUser,
                decision: decision,
                page: 'listFriend'
            };
            $.ajax({
                url: mainUserProfile_friends.params.api.delcine.url,
                type:  mainUserProfile_friends.params.api.delcine.method,
                data: datas,
                crossDomain: true,
                headers : {"X-Auth-Token" : currentUser.token},
                success: function(response){
                    //charger les entetes de notifications
                    if(response.listRecievers!=null && response.listRecievers!="null"  && response.listRecievers!="undefined")
                    {
                        setFriendsNav(mainUserProfile_friends.params.nav.notification.friends,response.listRecievers,mainUserProfile_friends.params.nav.dropdownMenuFreinds_badge);
                        setInvitation(mainSubFriends.params.ask.body,response.listRecievers);
                    }
                    else{
                        mainSubFriends.params.ask.body.empty();
                        mainSubFriends.params.ask.head.div.fadeOut();
                        mainUserProfile_friends.params.nav.dropdownMenuFreinds_badge.fadeOut();
                        mainUserProfile.params.nav.notification.friends.body.empty();
                        if(response.listApplicants!=null && response.listApplicants!="null"  && response.listApplicants!="undefined")
                        {
                            mainSubFriends.params.send.head.div.fadeIn();
                        }
                        else
                        {
                            mainSubFriends.params.send.head.div.fadeOut();
                        }

                        mainUserProfile_friends.params.nav.dropdownMenuFreinds_badge.fadeOut();
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


        function deleteInvitation(id, idUser,preloader)
        {
            preloader.fadeIn();
            datas = {
                id : id,
                idUser: idUser,
                page: 'listFriend'
            };
            $.ajax({
                url: mainUserProfile_friends.params.api.deletes.url,
                type:  mainUserProfile_friends.params.api.deletes.method,
                data: datas,
                crossDomain: true,
                headers : {"X-Auth-Token" : currentUser.token},
                success: function(response){
                    //charger les entetes de notifications
                    if(response.listApplicants!=null && response.listApplicants!="null"  && response.listApplicants!="undefined")
                    {
                        if(response.listRecievers!=null && response.listRecievers!="null"  && response.listRecievers!="undefined")
                        {
                            mainSubFriends.params.send.head.a.fadeIn();
                        }
                        mainSubFriends.params.send.head.number.html(response.listApplicants.length);
                        setSend(mainSubFriends.params.send.body,response.listApplicants);
                        preloader.fadeOut();
                        trans = Translator.trans('sub.invitation.deletes',"friends");
                        bootbox.alert(trans,function(){});
                    }
                    else
                    {
                        mainSubFriends.params.send.head.div.fadeOut();
                        if(response.listRecievers!=null && response.listRecievers!="null"  && response.listRecievers!="undefined")
                        {
                            mainSubFriends.params.ask.head.div.fadeIn();
                            mainSubFriends.params.ask.head.a.fadeOut();
                        }
                        else{
                            mainSubFriends.params.ask.head.div.fadeOut();
                        }

                    }

                    if(response.listUsers!=null && response.listUsers!="null"  && response.listUsers!="undefined") {

                        setUsers(mainSubFriends.params.friend.body, response.listUsers);
                        mainSubFriends.params.friend.head.div.fadeIn();
                    }

                    preloader.fadeOut();
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

        function setFriendsNav(element, list,badge){
            if(list.length==0)
            {
                mainUserProfile_friends.params.nav.dropdownMenuFreinds_badge.fadeOut();
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
                var preloader ="<br/><img id='"+datapreloader+"' class='sm-img preloader' src='"+mainUserProfile_friends.params.preloader+"' alt=''/> ";
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
                    '<strong class="name-detail" data-key="'+applicant.key+'" >'+ applicant.lastNameOrFirstname +'</strong><br>' +
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
                mainUserProfile_friends.params.nav.dropdownMenuFreinds_badge.fadeOut();
            }
        }



//liste des utilisateurs non ami
        function setUsers(element,list){

            element.empty();
            for(var i= 0; i<list.length; i++)
            {
                var user = list[i].user;
                var profile = list[i].profile;
                var photos = list[i].photos;
                var profilePicture = list[i].photoProfile;
                var datapreloader = "Invitationpreoloader"+list[i].user.id;
                var preloader ="<img id='"+datapreloader+"' class='sm-img preloader pull-right' src='"+mainUserProfile_friends.params.preloader+"' alt=''/> ";
                //alert(currentUser.ip);
                //alert("country =>"+user.country+ "user country =>"+currentUser.country)
                if(user.id !=currentUser.id && user.type!="System"){
                    //photos
                    var src = null;
                    if((profilePicture==null || profilePicture=='null'))
                    {
                        src =path.emptyImage;
                    }
                    else
                    {
                        src = baseHost+profilePicture.path;
                    }
                    var today=new Date();
                    var currentyear = today.getFullYear();
                    var year  = user.birthDate.split('-')[0];
                    var age = currentyear -parseInt(year);
                    age = age<10 ? '(0'+age+'ans)' : '('+ age+'ans)';
                    var name = user.lastNameOrFirstname;
                    var city = user.city;
                    var  country = user.country;
                    var final =(city==null || city=="null")? getCountry(countryList,country) :city;
                    var flag ="<img class='sm-img flag' src='"+path.flags+country+".png' alt=''/> ";
                    var profession = user.profession==null || user.profession=="null"?'' : '('+ user.profession +')';

                   var add = Translator.trans('sub.noFriend.add', {}, 'friends'),
                        message = Translator.trans('sub.noFriend.message', {}, 'friends'),
                        deletes = Translator.trans('sub.noFriend.delete', {}, 'friends');
                    var body =
                '<section>'+
                    '<div class="container py-3">'+
                        '<div class="row align-items-center small">'+
                            '<div class="col-md-3 ">'+
                                '<img src="'+src+'" class="w-100 detail" data-key="'+user.key+'" data-email="'+user.email+'">'+
                            '</div>'+
                            '<div class="col-md-9 px-3 content">'+
                                '<div class="card-block px-3">'+
                                '<h4 class="card-title name-detail" data-key="'+user.key+'" >'+ user.fullname + age + '</h4>'+
                                '<p class="card-text text-muted message-text">'+user.joinReason+'</p>'+
                                '<p class="card-text text-grey small"><span class="pays">'+flag+final+'</span> <span class="profession text-muted">'+profession+'</span></p>'+
                                '<p class="card-text text-grey small"> commun friend </p>'+
                                '<a href="#" class="btn btn-sm btn-primary add" data-key="'+user.key+'"  data-email="'+user.email+'"  data-preloader="'+datapreloader+'"  data-id="'+user.id+'"><span class="fa fa-user-plus"></span> '+ add + ' </a>'+
                                '<a href="#" data-toggle="modal" data-target="#Message-box" class="btn btn-sm btn-success"><span class="fa fa-comment"></span>' + message +' </a>'+
                                 preloader+
                            '</div>'+
                        '</div>'+
                        '</div>'+
                    '</div>'+
                     '<hr>'+
                '</section>'
                        ;
                    element.append(body);
                }
            }
        }
    }



});