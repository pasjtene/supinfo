var MainSubDetailProfile = function()
{
    this.params = {
        page: $("#mainUserProfile"),
        sub: $("#Main-Subdetail-profile"),
        bg_action:$('#bg-action'),
        path: path.flags,
        link_photo: $ ("#Main-Subdetail-profile #zone_more_detail #link-profile-photo a"),
        link_photo_span: $ ("#Main-Subdetail-profile #zone_more_detail #link-profile-photo a span"),
        link_friend: $ ("#Main-Subdetail-profile #zone_more_detail #link-profile-friend a"),
        link_friend_span: $ ("#Main-Subdetail-profile #zone_more_detail #link-profile-friend a span "),
        api:{
            fill: {
                url : baseUrl+"auth/user/photo/profile/detail",
                method: "get",
                type: "json"
            },
            ask:{
                url : baseUrl+"auth/user/friend/ask",
                method: "post",
                type: "json"
            }
        },
        body:{
            img_profile: $("#zone_profile .img_profile"),
            full_name: $("#zone_profile .full_name"),
            full_profession: $("#zone_profile .full_profession"),
            chargement: $("#Main-Subdetail-profile  #chargement-detail-profile"),
            ask_button: $("#Main-Subdetail-profile  .ask button"),
            ask: $("#Main-Subdetail-profile  .no-freind "),
            body: $("#Main-Subdetail-profile  .body "),
            connect: $("#Main-Subdetail-profile .connect-box"),
            profile:{

            },
            friend:{
                body_detail_freinds: $("#Main-Subdetail-profile #body-photo-detail-profile-freinds"),
                zoomImg_detail_freinds_source: $("#Main-Subdetail-profile #zoomImg-detail-profile-freinds .zoomImgSource-detail-profile-freinds"),
                zoomImg_detail_freinds: $("#Main-Subdetail-profile #zoomImg-detail-profile-freinds"),
            },
            photo:{
                body_photo_detail: $("#Main-Subdetail-profile  #body-photo-detail-profile"),
                zoomImg_detail: $("#Main-Subdetail-profile  #zoomImg-detail-profile"),
                zoomImg_detail_source: $("#Main-Subdetail-profile  #zoomImg-detail-profile .zoomImgSource-detail-profile"),
            },
            about:{
                name : $('#zone_profile .about .name'),
                gender : $('#zone_profile .about .gender'),
                country : $('#zone_profile .about .country'),
                city : $('#zone_profile .about .city'),
                phone : $('#zone_profile .about .phone'),
                age : $('#zone_profile .about .age')
            },
            content:{
                vip : $("#zone_profile .content .vip"),
                countFriend: $("#zone_profile .content .countFriend"),
                profession: $("#zone_profile .content .profession"),
                joinReason: $("#zone_profile .content .joinReason")
            },
            friendjoint:{
                body : $("#Main-Subdetail-profile-friends #body-photo-detail-profile-freinds #friend-join")

            },
            friendalone:{
                body : $("#Main-Subdetail-profile-friends #body-photo-detail-profile-freinds #friend-alone")

            }
        }
    };

};


$(function () {
    var mainSubDetailProfile = new MainSubDetailProfile(),
        mainUserProfile_detail_profile = new MainUserProfile();

    if(mainSubDetailProfile.params.sub.data('sub')=="detail-profile")
    {
        var listePhotoHelp = null;

        //afficher le preloader
        mainSubDetailProfile.params.body.chargement.fadeOut();
        mainSubDetailProfile.params.bg_action.fadeIn();
        mainSubDetailProfile.params.body.body.fadeOut();

        //agrandir une photo
        mainSubDetailProfile.params.body.photo.body_photo_detail.on('click', "img",function() {
            bg.bg_photo_content.empty();
            for(var i=0; i<listePhotoHelp.length;i++)
            {
                var photo = listePhotoHelp[i];
                var src = null;
                if(photo.visibility=="public")
                {
                    if ((photo.hashname == null || photo.hashname == 'null')) {
                        src = element.data('help');
                    }
                    else {
                        src = baseHost + photo.path;
                    }
                    var active = (photo.id ==$(this).data('active'))? 'active' :'';
                    var id = "action"+photo.id;
                    var item=
                        '<div class="carousel-item img-thumbnail '+active+'">'+
                        '<img class="d-block img-fluid" src="'+src+'" alt="First slide">'+
                        '<div class="carousel-caption d-none d-md-block" style="">'+
                        '<h3>'+(i+1) +' / ' +listePhotoHelp.length + '</h3>'+
                        '</div>'+
                        '</div>';
                    bg.bg_photo_content.append(item);
                }

            }
            bg.bg_photo.fadeIn();
            bg.bg_photo.css({'z-index':10});
        });

        //agrandir une photo option friend
        mainSubDetailProfile.params.body.friend.body_detail_freinds.on('click', ".img_detail",function() {
            mainSubDetailProfile.params.body.friend.zoomImg_detail_freinds_source.attr('src', $(this).attr('src'));
            mainSubDetailProfile.params.body.friend.zoomImg_detail_freinds.modal('show');
        });




        //consulter le detail  sur un profile
        mainSubDetailProfile.params.body.friendjoint.body.on('click','.name-detail',function(){
            window.location.href = Routing.generate('main_profile_detailProfile',{_locale:locale,key:$(this).data('key')});
        });

        //consulter le detail  sur un profile
        mainSubDetailProfile.params.body.friendalone.body.on('click','.name-detail',function(){
            window.location.href = Routing.generate('main_profile_detailProfile',{_locale:locale,key:$(this).data('key')});
        });


        //appel de la fonction pour charger les informations
        fill(currentUser.id,mainSubDetailProfile.params.sub.data('key'));


        //demande l'amtier
        mainSubDetailProfile.params.body.ask_button.click(function(){
            trans = Translator.trans('sub.message',{},"default");
            bootbox.prompt(trans,function(result){
                if(result){
                    askFriendShip(currentUser.id,mainSubDetailProfile.params.sub.data('key'), result);
                }
            });
        });



        //demander l'amitier
        mainSubDetailProfile.params.body.friendalone.body.on('click','.friendship',function(){
            trans = Translator.trans('sub.message',{},"default");
            var reciever = $(this).data('key');
            bootbox.prompt(trans,function(result){
                if(result){
                    addFriend(currentUser.id,reciever,result, mainUserProfile_detail_profile.params.bg_action);
                }
            });
        });





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
                url: mainSubDetailProfile.params.api.ask.url,
                type:  mainSubDetailProfile.params.api.ask.method,
                data:  datas,
                crossDomain: true,
                headers : {"X-Auth-Token" : currentUser.token},
                dataType:  mainSubDetailProfile.params.api.ask.type,
                success: function(response){
                    trans = Translator.trans('sub.success.ask',{},"default");
                    bootbox.alert(trans,function(){});
                    window.location.reload();
                },
                error: function (xhr, status, message) { //en cas d'erreur
                    console.log(status+"\n"+xhr.responseText + '\n' + message );
                    trans = Translator.trans('sub.invitation.error',{},"friends");
                    bootbox.alert(trans,function(){});
                },
                complete:function(){
                    preloader.fadeOut();
                }

            });
        }








        function fill(id,email){
            var datas ={
                id: id,
              email : email
            };
            $.ajax({
                url: mainSubDetailProfile.params.api.fill.url,
                type:  mainSubDetailProfile.params.api.fill.method,
                data: datas,
                crossDomain: true,
                headers : {"X-Auth-Token" : currentUser.token},
                contentType: false,
                dataType:  mainSubDetailProfile.params.api.fill.type,
                success: function(response){
                    console.log(response);
                    if(response!=null  && response!="null" && response!="undefined")
                    {
                        // set de la premiere partir concernant les info du  user
                        if(response.user!=null)
                        {
                            selectUserId = response.user.id;
                            setdefault(response.user, mainSubDetailProfile.params.body,response.profile==null? null :baseHost+response.profile.path,mainUserProfile_detail_profile.params.imprtant.important_block_img.data('help'));
                            setcontent(response.user, mainSubDetailProfile.params.body.content, response.listFriends==null? 0: response.listFriends.length,response.listAloneFriends==null ?0 :response.listAloneFriends.length);
                            setabout(response.user, mainSubDetailProfile.params.body.about);
                            //modifier l'etat de connexion
                            if(!response.user.isOnline)
                            {
                                mainSubDetailProfile.params.body.connect.css({'background-color':'rgba(0,0,0,.125)'});
                            }
                        }

                        if(response.listAloneFriends!=null){
                            setFriendAlone( mainSubDetailProfile.params.body.friendalone.body,response.listAloneFriends,response.user);
                        }
                        if(response.listFriends!=null){
                            setFriendJoin(mainSubDetailProfile.params.body.friendjoint.body,response.listFriends);
                        }

                        mainSubDetailProfile.params.link_friend_span.html("("+((response.listAloneFriends==null?0:response.listAloneFriends.length)+(response.listFriends==null? 0: response.listFriends.length))+")");
                        if(response.ask!=null )
                        {
                            var ask = response.ask;
                            if(ask.state || ask.decision=="3" || ask.decision=="0"){
                                mainSubDetailProfile.params.body.ask.fadeOut();
                                //mainSubDetailProfile.params.bg_action.fadeOut();
                            }
                            else{
                                mainSubDetailProfile.params.body.ask.fadeIn();
                            }
                        }

                        if(response.reply!=null )
                        {
                            var reply = response.reply;
                            if(reply.state || reply.decision=="3" || reply.decision=="0"){
                                mainSubDetailProfile.params.body.ask.fadeOut();
                                //mainSubDetailProfile.params.bg_action.fadeOut();
                            }
                            else{
                                mainSubDetailProfile.params.body.ask.fadeIn();
                            }
                        }
                        //charger les photos
                        mainSubDetailProfile.params.link_photo_span.html('('+response.listPhotos.length+')');

                        setPhotos(mainSubDetailProfile.params.body.photo.body_photo_detail,response.listPhotos);
                        listePhotoHelp= response.listPhotos;
                        //charger les amis
                    }
                },
                error: function (xhr, status, message) { //en cas d'erreur
                    console.log(status+"\n"+xhr.responseText + '\n' + message );
                    //hide le preloader
                    //mainSubDetailProfile.params.body.chargement.fadeOut();
                    mainSubDetailProfile.params.bg_action.fadeOut();
                },
                complete:function(){
                    console.log("Request finished.");
                    //hide le preloader
                    //mainSubDetailProfile.params.body.chargement.fadeOut();
                    mainSubDetailProfile.params.bg_action.fadeOut();
                    mainSubDetailProfile.params.body.body.fadeIn();
                }

            });

        }

        function askFriendShip(applicantId,recieverEmail,message){
           // mainSubDetailProfile.params.body.chargement.fadeIn();
            mainSubDetailProfile.params.bg_action.fadeIn();
            var datas = {
                'applicantId': applicantId,
                'receiverEmail': recieverEmail,
                'message':message
            };
            $.ajax({
                url: mainSubDetailProfile.params.api.ask.url,
                type:  mainSubDetailProfile.params.api.ask.method,
                data: datas,
                crossDomain: true,
                headers : {"X-Auth-Token" : currentUser.token},
                success: function(response){
                    console.log(response);
                    if(response!=null  && response!="null" && response!="undefined")
                    {
                        if(response!=null )
                        {
                            mainSubDetailProfile.params.body.ask.fadeOut();
                        }
                        trans = Translator.trans('sub.success.ask',{},"default");
                        bootbox.alert(trans,function(result){});
                    }
                },
                error: function (xhr, status, message) { //en cas d'erreur
                    console.log(status+"\n"+xhr.responseText + '\n' + message );
                    //hide le preloader
                    //mainSubDetailProfile.params.body.chargement.fadeOut();
                    mainSubDetailProfile.params.bg_action.fadeOut();
                    trans = Translator.trans('sub.error.ask',{},"default");
                    bootbox.alert(trans,function(result){});
                },
                complete:function(){
                    console.log("Request finished.");
                    //hide le preloader
                    //mainSubDetailProfile.params.body.chargement.fadeOut();
                    mainSubDetailProfile.params.bg_action.fadeOut();
                }

            });
        }

        function setabout(user,element)
        {
            var flag ="<img class='sm-img' src='"+mainSubDetailProfile.params.path+user.country+".png' alt=''/> ";
            element.name.html(user.fullname);
            element.gender.html(user.gender);
            element.country.html(flag);
            element.country.append(getCountry(countryList,user.country));
            element.city.html(user.city);
            element.phone.empty();
            if(user.phones!=null && user.phones.length>0)
            {
                for(var i=0; i<user.phones.length;i++){
                    element.phone.append(user.phones[i]+"/");
                }
            }
            //variable de user
            var today=new Date();

            var currentyear = today.getFullYear();
            var year  = user.birthDate.split('-')[0];
            var age = currentyear -parseInt(year);
            element.age.html(age+'ans');

        }

        function setFriendAlone(element,list,reciever){
            element.empty();
            var discover = Translator.trans('sub.discover',{},"default");
               var head=
                ' <div class="col-12">'+
                        discover +
                    '<hr>'+
                  '</div>';
            element.append(head);
            var body = "";
            for(var i=0; i<list.length; i++)
            {
                var friends = null,
                    src =null,
                    name=null,
                    city = null,
                    country =null,
                    connect=null,
                    flag=null,
                    createDate =null,
                    id=null,
                    trans = Translator.trans('sub.becomeFriends',{},"default"),
                    ask = Translator.trans('sub.ask',{},"default");
                if(list[i].request.receiver.id==currentUser.id || list[i].request.receiver.id==reciever.id )
                {
                    friends = list[i].request.applicant;
                    if ((list[i].photoApplicant==null || list[i].photoReciever=='null' || list[i].photoApplicant.hashname == null || list[i].photoApplicant.hashname == 'null')) {
                        src = element.data('help');
                    }
                    else {
                        src = baseHost + list[i].photoApplicant.path;
                    }
                }
                else
                {
                    friends =  list[i].request.receiver;
                    if ((list[i].photoReciever==null || list[i].photoReciever=='null' || list[i].photoReciever.hashname == null || list[i].photoReciever.hashname == 'null')) {
                        src = element.data('help');
                    }
                    else {
                        src = baseHost + list[i].photoReciever.path;
                    }
                }
                name = friends.lastNameOrFirstname;
                id = 'friendalone'+friends.id;
                city = friends.city;
                country = friends.country;
                var final =(city==null || city=="null")? getCountry(countryList,country) :city;
                createDate = new  Date(friends.createDate);
                flag ="<img class='sm-img flag' src='"+path.flags+country+".png' alt=''/> ";
                connect =friends.isOnline? Translator.trans('sub.connected',{},"default"):Translator.trans('sub.noconnected',{},"default");
                body+=
                    ' <div class="col-sm-12 col-md-6   text-center img">'+
                    '<div class="card">'+
                    '<div class="col-12 text-center bg-faded ">' +
                    '<img src="'+src+'" class="responsive card-img-top rounded img-thumbnail">' +
                    '</div>' +
                    '<div class="card-block text-right">'+
                    '<div class="name">'+
                    '<div class="rounded-circle"> </div>'+
                    '<span class="state text-grey">'+connect+'</span>'+
                    '<p><strong class="name-detail" data-key="'+friends.key+'">'+name+'</strong></p>'+
                    '</div>'+
                    '<p class="country">'+flag+final+'</p>'+
                    '<button  class="bg-primary btn friendship" data-key="'+friends.key+'" ><span class="fa fa-user-plus"></span> '+ ask+'</button>'+
                    '</div>'+
                    '</div>'+
                    '</div>';


            }
            element.append(body);
        }

        function setFriendJoin(element,list){

            element.empty();

            var commonFreinds = Translator.trans('sub.commonFreinds',{},"default");
            var head=
                ' <div class="col-12">'+
                    commonFreinds +
                    '<hr>'+
                '</div>';
            element.append(head);

            var body = "";
            for(var i=0; i<list.length; i++)
            {
                var friends = null,
                    src =null,
                    name=null,
                    city = null,
                    country =null,
                    connect=null,
                    flag=null,
                    createDate =null,
                    trans = Translator.trans('sub.becomeFriends',{},"default");
                if(list[i].request.receiver.id==currentUser.id)
                {
                    friends = list[i].request.applicant;
                    if (( list[i].photoApplicant==null || list[i].photoApplicant=='null' || list[i].photoApplicant.hashname == null || list[i].photoApplicant.hashname == 'null')) {
                        src = element.data('help');
                    }
                    else {
                        src = baseHost + list[i].photoApplicant.path;
                    }
                }
                else
                {
                    friends =  list[i].request.receiver;
                    if (( list[i].photoReciever==null || list[i].photoReciever=='null' || list[i].photoReciever.hashname == null || list[i].photoReciever.hashname == 'null')) {
                        src = element.data('help');
                    }
                    else {
                        src = baseHost + list[i].photoReciever.path;
                    }
                }
                name = friends.lastNameOrFirstname;
                city = friends.city;
                country = friends.country;
                var final =(city==null || city=="null")? getCountry(countryList,country) :city;
                createDate = new  Date(friends.createDate);
                flag ="<img class='sm-img flag' src='"+path.flags+country+".png' alt=''/> ";
                connect =friends.isOnline? Translator.trans('sub.connected',{},"default"):Translator.trans('sub.noconnected',{},"default");
                body+=
                    ' <div class="col-sm-12 col-md-6   text-center img">'+
                    '<div class="card">'+
                    '<div class="col-12 text-center bg-faded img">' +
                    '<img src="'+src+'" class="responsive card-img-top rounded img-thumbnail">' +
                    '</div>' +
                    '<div class="card-block text-right">'+
                    '<div class="name">'+
                    '<div class="rounded-circle"> </div>'+
                    '<span class="state text-grey">'+connect+'</span>'+
                    '<p><strong class="name-detail" data-key="'+friends.key+'" >'+name+'</strong></p>'+
                    '</div>'+
                    '<p class="country">'+flag+final+'</p>'+
                    '<p class="start-frein">'+trans+' 05/11/12</p>'+
                    '</div>'+
                    '</div>'+
                    '</div>';


            }
            element.append(body);
        }
        function setPhotos(element,list){

            element.empty();

            var body = "";
            for(var i=0; i<list.length; i++)
            {
                var photo = list[i];
                var src = null;
                if(photo.visibility=="public")
                {
                    if ((photo.hashname == null || photo.hashname == 'null')) {
                        src = element.data('help');
                    }
                    else {
                        src = baseHost + photo.path;
                    }
                    var img = '<img src="'+ src +'" alt="" class="card-img-top rounded">';
                    var id = "action"+photo.id;
                    body+=
                        '<div class="col-sm-12 col-md-6 col  text-center align-content-center img">'+
                        '<div class="card">'+
                        '<div class="col-12 text-center bg-faded ">' +
                        '<img src="'+src+'" data-active='+photo.id+' class="responsive card-img-top rounded img-thumbnail">' +
                        '</div>' +
                        '<div class="card-block text-right">'+
                        '<span class="fa fa-thumbs-o-up ">('+photo.id+')</span>'+
                        '</div>'+
                        '</div>'+
                        '</div>';
                }
            }
            element.append(body);
        }

        function setcontent(user,element,countFriends, countFriendAlone)
        {
            element.vip.html(user.isVip?'yes':'no');
            element.countFriend.html("["+(countFriendAlone+countFriends)+"]["+countFriends+"]");
            element.profession.html(user.profession);
            element.joinReason.html(getJoinReason(user.joinReason));
        }


        function setdefault(user,element,img , imghelp)
        {
            element.full_name.html(user.fullname);
            element.full_profession.html(user.profession);
            setpicture(element.img_profile, img,imghelp);
        }


        function setpicture(element,img,helpImg){
            if(img==null || img=="undefined")
            {
                element.attr("src",helpImg);
            }
            else{
                element.attr("src",img);
            }
            return element;
        }

    }
});


// pour message

/*function mySoNiceSound(s)
{
    var e=document.createElement('audio');
    e.setAttribute('src',s);
    e.play();
}

mySoNiceSound('beepbeep.mp3');
*/