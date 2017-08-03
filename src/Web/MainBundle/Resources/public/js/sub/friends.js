/**
 * Created by Danick takam on 16/06/2017.
 */

var MainSubFriends = function()
{
    this.params = {
        page: $("#mainUserProfile"),
        sub: $("#Main-Subfriends"),
        preloader: '/data/img/current.gif',
        api:{
            fill: {
                url : baseUrl+"auth/user/friends",
                method: "get",
                type: "json"
            },
            accpet: {
                url : baseUrl+"auth/user/friends/accept",
                method: "put",
                type: "json"
            },
            delcine: {
                url : baseUrl+"auth/user/friends/decline",
                method: "put",
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
           body: $("#Main-Subfriends #Main-Subfriends-ask .body")
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
                console.log(response);

                if(response!=null && response!="null")
                {
                    if(response.listRecievers!=null && response.listRecievers!="null"  && response.listRecievers!="undefined")
                    {
                        setInvitation(mainSubFriends.params.ask.body, response.listRecievers);
                    }
                }

            },
            error: function (xhr, status, message) { //en cas d'erreur
                console.log(status+"\n"+xhr.responseText + '\n' + message );
            },
            complete:function(){
                console.log("Request finished.");
            }

        });

        mainSubFriends.params.ask.body.on('click',".confirm",function(e){
            e.preventDefault();
            accept($(this).data('id'), currentUser.id,$('#Main-Subfriends #Main-Subfriends-ask .body #'+$(this).data('preloader')));
        });

        mainSubFriends.params.ask.body.on('click',".decline",function(e){
            e.preventDefault();
            decline($(this).data('id'), currentUser.id,$(this).data('decision'),$('#Main-Subfriends #Main-Subfriends-ask .body #'+$(this).data('preloader')));
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
                var datapreloader = "Invitationpreoloader"+list[i].request.id;
                var preloader ="<img id='"+datapreloader+"' class='sm-img preloader' src='"+mainUserProfile_friends.params.preloader+"' alt=''/> ";
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
                                     '<img src="'+src+'" class="w-100">'+
                                '</div>'+
                                '<div class="col-md-9 px-3 content" >'+
                                    '<div class="card-block px-3">'+
                                         '<h4 class="card-title">'+friends.fullname+age+' </h4>'+
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



        function accept(id, idUser,preloader)
        {
            preloader.fadeIn();
            datas = {
                id : id,
                idUser: idUser,
                page : 'listFriend'
            };
            $.ajax({
                url: mainUserProfile_friends.params.api.accpet.url,
                type:  mainUserProfile_friends.params.api.accpet.method,
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
                        setInvitation(mainSubFriends.params.ask.body, response.listRecievers);
                        preloader.fadeOut();
                        trans = Translator.trans('sub.invitation.accept',{},"friends")+' '+response.user.fullname;
                        bootbox.alert(trans,function(){});
                    }
                    else{
                        mainUserProfile_friends.params.nav.dropdownMenuFreinds_badge.fadeOut();
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
                        preloader.fadeOut();
                        trans = Translator.trans('sub.invitation.refuse',"friends");
                        bootbox.alert(trans,function(){});
                    }
                    else{
                        mainUserProfile_friends.params.nav.dropdownMenuFreinds_badge.fadeOut();
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
                mainUserProfile_friends.params.nav.dropdownMenuFreinds_badge.fadeOut();
            }
        }
    }



});