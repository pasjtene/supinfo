var MainSubPhotos = function()
{
    this.params = {
        page: $("#mainUserProfile"),
        sub: $("#Main-Subphotos"),
        active_tab : $("#Main-Subphotos #active-photo-tab"),
        link_list:$("#Main-Subphotos #link-photo-list a "),
        link_profile:$("#Main-Subphotos #link-photo-profile a "),
        link_detail_user: $("#Main-Subphotos #link-photo-detail-profile a"),
        link_friends: $("#Main-Subphotos #link-photo-friends a"),
        api:{
            fill: {
                url : baseUrl+"auth/user/photo/list",
                method: "get",
                type: "json"
            },
            delete:{
                url : baseUrl+"auth/user/photo/delete",
                method: "delete",
                type: "json"
            },
            published:{
                url : baseUrl+"auth/user/photo/published",
                method: "put",
                type: "json"
            },
            setprofile:{
                url : baseUrl+"auth/user/photo/setprofile",
                method: "put",
                type: "json"
            },
            profile:{
                url : baseUrl+"auth/user/photo/profile",
                method: "get",
                type: "json"
            },
            friend:{
                url : baseUrl+"auth/user/friends/current",
                method: "get",
                type: "json"
            }

        },
        body:{
            content :$("#main-body #Main-Subphotos #content"),
            chargement: $("#main-body #Main-Subphotos #chargement")
        },
        tabs:
        {
            add:{

            },
            list:{
                img : $("#mainUserProfile #Main-Subphotos  #Main-Subphotos-list img"),
                zoom_source : $("#mainUserProfile #Main-Subphotos  #Main-Subphotos-list .zoomImgSource"),
                zoom_img : $("#mainUserProfile #Main-Subphotos  #Main-Subphotos-list #zoomImg"),
                body_photo: $("#mainUserProfile #Main-Subphotos  #Main-Subphotos-list #body-photo"),
                chargement_photo : $("#mainUserProfile #Main-Subphotos  #Main-Subphotos-list #chargement-photo")
            },
            profile:{
                img : $("#mainUserProfile #Main-Subphotos  #Main-Subphotos-profiles img"),
                zoom_source : $("#mainUserProfile #Main-Subphotos  #Main-Subphotos-profiles .zoomImgSource-profile"),
                zoom_img : $("#mainUserProfile #Main-Subphotos  #Main-Subphotos-profiles #zoomImg-profile"),
                body_photo: $("#mainUserProfile #Main-Subphotos  #Main-Subphotos-profiles #body-profile"),
                chargement_photo : $("#mainUserProfile #Main-Subphotos  #Main-Subphotos-profiles #chargement-profile")
            },
            friend:{
                img : $("#mainUserProfile #Main-Subphotos  #photo-friends-list img"),
                zoom_source : $("#mainUserProfile #Main-Subphotos  #photo-friends-list .zoomImgSourceFriends"),
                zoom_img : $("#mainUserProfile #Main-Subphotos  #photo-friends-list #zoomImgFriends"),
                body: $("#mainUserProfile #Main-Subphotos  #photo-friends-list .body"),
                chargement_photo : $("#mainUserProfile #Main-Subphotos  #photo-friends-list #chargement-photo-friends")
            }
        }
    };

};


$(function () {
    var mainSubPhotos = new MainSubPhotos(),
        mainUserProfile_photos = new MainUserProfile(),
        currentlink =0;

    if(mainSubPhotos.params.sub.data('sub')=="photos")
    {

        var listePhotoHelp =null;

        //toutes les innformations concernant  la liste des photos
        if(mainSubPhotos.params.active_tab.val()==1){
            mainSubPhotos.params.tabs.list.chargement_photo.fadeIn();
            initList();
            currentlink =1;
        }

        mainSubPhotos.params.link_list.click(function(){
            mainSubPhotos.params.tabs.list.chargement_photo.fadeIn();
            initList();
            currentlink=1;
            mainSubPhotos.params.active_tab.attr('value',currentlink);
        });



        //toutes les innformations concernant  la liste des profiles
        if(mainSubPhotos.params.active_tab.val()==3){
            mainSubPhotos.params.tabs.profile.chargement_photo.fadeIn();
            initProfile();
            currentlink = 3;
        }

        mainSubPhotos.params.link_profile.click(function(){
            mainSubPhotos.params.tabs.profile.chargement_photo.fadeIn();
            initProfile();
            currentlink =3;
            mainSubPhotos.params.active_tab.attr('value',currentlink);
        });

        //link detail user appuyer
        mainSubPhotos.params.link_detail_user.click(function(){
           // mainSubPhotos.params.tabs.profile.chargement_photo.fadeIn();
            currentlink =4;
            mainSubPhotos.params.active_tab.attr('value',currentlink);
        });

        //link friends user appuyer
        if(mainSubPhotos.params.active_tab.val()==5){
            initFriends();
            currentlink = 5;
        }
        mainSubPhotos.params.link_friends.click(function(){
            initFriends();
            currentlink =5;
            mainSubPhotos.params.active_tab.attr('value',currentlink);
        });

        //consulter le detail  sur un profile
        mainSubPhotos.params.tabs.friend.body.on('click','.detail',function(){
            window.location.href = Routing.generate('main_profile_detailProfile',{_locale:locale,key:$(this).data('key')});
        });

        mainSubPhotos.params.tabs.friend.body.on('click','.detail-profile',function(){
            window.location.href = Routing.generate('main_profile_detailProfile',{_locale:locale,key:$(this).data('key')});
        });

        mainSubPhotos.params.tabs.friend.body.on('click','.remove',function(){
            deleteFriends($(this).data('id'), currentUser.id,mainUserProfile_photos.params.bg_action);
        });



        //agrandir une photo des amis
        mainSubPhotos.params.tabs.friend.body.on('click', "img",function() {
            mainSubPhotos.params.tabs.friend.zoom_source.attr('src', $(this).attr('src'));
            mainSubPhotos.params.tabs.friend.zoom_img.modal('show');
        });


        //agrandir une photo
        mainSubPhotos.params.tabs.list.body_photo.on('click', "img",function() {
           // mainSubPhotos.params.tabs.list.zoom_source.attr('src', $(this).attr('src'));
           // mainSubPhotos.params.tabs.list.zoom_img.modal('show');
            bg.bg_photo_content.empty();
            for(var i=0; i<listePhotoHelp.length;i++)
            {
                var photo = listePhotoHelp[i];
                var src = null;
                if ((photo.hashname == null || photo.hashname == 'null')) {
                    src = element.data('help');
                }
                else {
                    src = baseHost + photo.path;
                }
                var active = (photo.id ==$(this).data('active'))? 'active' :'';
                //console.log('photo = '+ photo.id + " current = "+$(this).data('active') + "active = "+active);
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
            bg.bg_photo.fadeIn();
            bg.bg_photo.css({'z-index':10});
        });


        //agrandir une photo dans la liste des profiles
        mainSubPhotos.params.tabs.profile.body_photo.on('click', "img",function() {
            mainSubPhotos.params.tabs.profile.zoom_source.attr('src', $(this).attr('src'));
            mainSubPhotos.params.tabs.profile.zoom_img.modal('show');
        });

    // zone liste des photos
        //supprimer une photo
        mainSubPhotos.params.tabs.list.body_photo.on('click', ".dropdown-menu .delete",function() {
            mainSubPhotos.params.tabs.list.chargement_photo.fadeIn();
            deletePhoto($(this).data('hashname'));
        });

        //set profile
        mainSubPhotos.params.tabs.list.body_photo.on('click', ".dropdown-menu .setprofile",function() {
            mainSubPhotos.params.tabs.list.chargement_photo.fadeIn();
            setprofilePhoto($(this).data('hashname'));
        });


        //set visibility
        mainSubPhotos.params.tabs.list.body_photo.on('click', ".dropdown-menu .published",function() {
            mainSubPhotos.params.tabs.list.chargement_photo.fadeIn();
            setpublished($(this).data('hashname'),$(this).data('status'));
        });
    // fin

    // zone liste des photos de profiles
        //supprimer une photo
        mainSubPhotos.params.tabs.profile.body_photo.on('click', ".dropdown-menu .delete",function() {
            mainSubPhotos.params.tabs.profile.chargement_photo.fadeIn();
            deletePhoto($(this).data('hashname'));
        });

        //set profile
        mainSubPhotos.params.tabs.profile.body_photo.on('click', ".dropdown-menu .setprofile",function() {
            mainSubPhotos.params.tabs.profile.chargement_photo.fadeIn();
            setprofilePhoto($(this).data('hashname'));
        });


        //set visibility
        mainSubPhotos.params.tabs.profile.body_photo.on('click', ".dropdown-menu .published",function() {
            mainSubPhotos.params.tabs.profile.chargement_photo.fadeIn();
            setpublished($(this).data('hashname'),$(this).data('status'));
        });
    //fin

        function initList(){
            mainSubPhotos.params.tabs.list.chargement_photo.fadeIn();
            //charger les photos de l'utilisateur selectionnée (par defaut le user connecte
            fillPhotos(currentUser.id);
        }


        function initProfile(){
            mainSubPhotos.params.tabs.profile.chargement_photo.fadeIn();
            //charger les photos de profile de l'utilisateur selectionnée (par defaut le user connecte)
            fillProfile(currentUser.id);
        }


        function initFriends(){
            //charger les photos de profile de l'utilisateur selectionnée (par defaut le user connecte)
            fillFriends(currentUser.id);
        }


        function fillFriends(id){
            mainSubPhotos.params.tabs.friend.chargement_photo.fadeIn();
            $.ajax({
                url: mainSubPhotos.params.api.friend.url,
                type:  mainSubPhotos.params.api.friend.method,
                data: "id="+id,
                crossDomain: true,
                headers : {"X-Auth-Token" : currentUser.token},
                contentType: false,
                dataType:  mainSubPhotos.params.api.friend.type,
                success: function(response){
                    console.log(response);
                    if(response!=null  && response!="null" && response!="undefined")
                    {
                        if(response.listUsers!=null  && response.listUsers!="null" && response.listUsers!="undefined")
                        {
                            setFriends(mainSubPhotos.params.tabs.friend.body,response.listUsers);
                        }
                    }
                    mainSubPhotos.params.tabs.friend.chargement_photo.fadeOut();
                },
                error: function (xhr, status, message) { //en cas d'erreur
                    console.log(status+"\n"+xhr.responseText + '\n' + message );
                    mainSubPhotos.params.tabs.friend.chargement_photo.fadeOut();
                },
                complete:function(){
                    console.log("Request finished.");
                }

            });

        }



        function setFriends(element,list){
            element.empty();
            for(var i= 0; i<list.length;i++){

                var photoApplicant = list[i].photoApplicant,
                    photoReciever = list[i].photoReciever,
                    request = list[i].request,
                    user = list[i].user;

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

                //alert(currentUser.ip);
                //alert("country =>"+user.country+ "user country =>"+currentUser.country)
                if(user.id !=currentUser.id && user.type!="System"){
                    //photos

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

                    var detail = Translator.trans('sub.tabs.seedetail', {}, 'photo'),
                        message = Translator.trans('sub.tabs.message', {}, 'photo'),
                        friend = Translator.trans('sub.tabs.friendc', {}, 'photo'),
                        common = Translator.trans('sub.tabs.nofriend', {}, 'photo'),
                        remove = Translator.trans('sub.tabs.remove', {}, 'photo');

                   var body =
                    '<div class="col-md-4 col-sm-12 col-xs-3 ">' +
                        '<div class="card">' +
                            '<div class="col-12 text-center bg-faded img">' +
                                '<img src="'+src+'" class="responsive img-thumbnail">' +
                            '</div>' +
                            '<div class=" card-block">' +
                                '<h4 class="card-title detail-profile" data-key="'+user.key+'">'+user.lastNameOrFirstname+ age+'</h4>' +
                                '<p class="card-text text-muted message-text small">'+getJoinReason(user.joinReason)+'</p>' +
                                '<p class="card-text text-grey small"><span class="pays">'+flag+final+'</span> <span class="profession text-muted"> '+profession+'</span></p>' +
                                '<p class="card-text text-grey small">'+common+'  </p>' +
                                '<div class="col-12 text-center dropdown">' +
                                    '<button class="btn btn-sm btn-primary" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">' +
                                        '<span class="fa fa-check"></span>' +friend+
                                    '</button>' +
                                    '<div class="dropdown-menu" aria-labelledby="dropdownMenuButton">' +
                                        '<a class="dropdown-item detail" data-id="'+user.id+'" data-key="'+user.key+'" data-email="'+user.email+'" href="#"><span class="fa fa-list"></span>'+detail+' </a>' +
                                        '<a class="dropdown-item writemessage" data-id="'+user.id+'"  href="#"><span class="fa fa-comment"></span>'+message+'  </a>' +
                                        '<a class="dropdown-item remove" data-id="'+request.id+'" href="#"><span class="fa fa-remove"></span> '+remove+' </a>' +
                                    '</div>' +
                                '</div>' +
                            '</div>' +
                        '</div>' +
                    '</div>';
                    element.append(body);
                }
            }
        }


        function deleteFriends(id, idUser,preloader)
        {
            preloader.fadeIn();
            datas = {
                id : id,
                idUser: idUser,
                page: 'friends'
            };
            $.ajax({
                url: mainUserProfile_photos.params.api.deletes.url,
                type:  mainUserProfile_photos.params.api.deletes.method,
                data: datas,
                crossDomain: true,
                headers : {"X-Auth-Token" : currentUser.token},
                success: function(response){
                    if(response!=null  && response!="null" && response!="undefined")
                    {
                        if(response.listUsers!=null  && response.listUsers!="null" && response.listUsers!="undefined")
                        {
                            setFriends(mainSubPhotos.params.tabs.friend.body,response.listUsers);
                            trans = Translator.trans('sub.tabs.remove_success',"photo");
                            bootbox.alert(trans,function(){});
                        }
                        else
                        {
                            mainSubPhotos.params.tabs.friend.body.empty();
                        }
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


        function fillPhotos(id){
            $.ajax({
                url: mainSubPhotos.params.api.fill.url,
                type:  mainSubPhotos.params.api.fill.method,
                data: "id="+id,
                crossDomain: true,
                headers : {"X-Auth-Token" : currentUser.token},
                contentType: false,
                processData: false,
                dataType:  mainSubPhotos.params.api.fill.type,
                success: function(response){
                    console.log(response);
                    if(response!=null  && response!="null" && response!="undefined")
                    {
                        listePhotoHelp = response;
                        console.log('liste des profiles');
                        console.log(listePhotoHelp);
                        setPhotos(mainSubPhotos.params.tabs.list.body_photo,response);
                    }
                },
                error: function (xhr, status, message) { //en cas d'erreur
                    console.log(status+"\n"+xhr.responseText + '\n' + message );
                },
                complete:function(){
                    console.log("Request finished.");
                }

            });

        }


        function fillProfile(id){
            $.ajax({
                url: mainSubPhotos.params.api.profile.url,
                type:  mainSubPhotos.params.api.profile.method,
                data: "id="+id,
                crossDomain: true,
                headers : {"X-Auth-Token" : currentUser.token},
                contentType: false,
                processData: false,
                dataType:  mainSubPhotos.params.api.profile.type,
                success: function(response){
                    console.log(response);
                    if(response!=null  && response!="null" && response!="undefined")
                    {
                        setProfile(mainSubPhotos.params.tabs.profile.body_photo,response);
                    }
                },
                error: function (xhr, status, message) { //en cas d'erreur
                    console.log(status+"\n"+xhr.responseText + '\n' + message );
                },
                complete:function(){
                    console.log("Request finished.");
                }

            });

        }

        function setPhotos(element,list){

            element.empty();

            var body = "";
            for(var i=0; i<list.length; i++)
            {
                var photo = list[i];
                var src = null;
                var datepublished = new  Date(photo.publishedDate);
                var  isPublished = photo.visibility=="private"? false :true;

                if ((photo.hashname == null || photo.hashname == 'null')) {
                    src = element.data('help');
                }
                else {
                    src = baseHost + photo.path;
                }
                //alert(element.data('help'));
                //varibale trans
                var private = Translator.trans('sub.body.state.private', {}, 'photo'),
                    public = Translator.trans('sub.body.state.public', {}, 'photo'),
                    pulished = Translator.trans('sub.img.published', {}, 'photo'),
                    pulished_private = Translator.trans('sub.img.private', {}, 'photo'),
                    profile = Translator.trans('sub.img.profile', {}, 'photo'),
                    deletes = Translator.trans('sub.img.delete', {}, 'photo'),
                    like = Translator.trans('sub.img.like', {}, 'photo'),
                    action = Translator.trans('sub.img.action', {}, 'photo'),
                    text_published = ((isPublished)? public + '  '+ datepublished.toLocaleDateString() : private ),
                    link_published = (!isPublished)?'<a class="dropdown-item published" href="#" data-status="1" data-hashname="'+photo.hashname+'">'+pulished+'</a>':'<a class="dropdown-item" href="#" data-status="0" data-hashname="'+photo.hashname+'">'+pulished_private+'</a>' ;
                var img = '<img src="'+ src +'" alt="" class="card-img-top rounded">';
                var id = "action"+photo.id;
                body+=
                    '<div class="col-sm-12 col-md-4 col   temxt-center img" data-active='+photo.id+' >'+
                        '<div class="card" data-active='+photo.id+' >'+
                            '<div class="col-12 text-center bg-faded img" data-active='+photo.id+' >' +
                                '<img src="'+src+'" data-active='+photo.id+' class="responsive card-img-top rounded img-thumbnail">' +
                            '</div>' +
                            '<div class="card-block bg-faded">'+
                                '<p>'+photo.id+' people(s) like this photo </p>'+
                                '<p>'+text_published+'</p>'+
                                '<div class="col-12 text-center">'+
                                    '<div class="btn-group text-center">'+
                                        '<button id="m8'+id+'" type="button" class="btn-sm btn-warning dropdown-toggle dropdown-toggle-split" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">'+
                                            '<span class="fa fa-check"></span>' +action+
                                        '</button>'+
                                        '<div class="dropdown-menu"  aria-labelledby="'+id+'">'+
                                            '<a class="dropdown-item setprofile" href="#" data-hashname="'+photo.hashname+'">'+profile+'</a>'+
                                               link_published+
                                            '<a class="dropdown-item " href="#"> <span class="fa fa-thumbs-o-up">'+like+'</span></a>'+
                                            '<a class="dropdown-item delete" href="#" data-hashname="'+photo.hashname+'">'+deletes+'</a>'+
                                        '</div>'+
                                    '</div>'+
                                '</div>'+
                            '</div>'+
                        '</div>'    +
                    '</div>';
            }
            element.append(body);
            mainSubPhotos.params.tabs.list.chargement_photo.fadeOut();
        }


        function setProfile(element,list){

            element.empty();

            var body = "";
            for(var i=0; i<list.length; i++)
            {
                var photo = list[i];
                var src = null;
                var datepublished = new  Date(photo.publishedDate);
                var  isPublished = photo.visibility=="private"? false :true;
                if ((photo.hashname == null || photo.hashname == 'null')) {
                    src = element.data('help');
                }
                else {
                    src = baseHost + photo.path;
                }
                //alert(element.data('help'));
                //varibale trans
                var private = Translator.trans('sub.body.state.private', {}, 'photo'),
                    public = Translator.trans('sub.body.state.public', {}, 'photo'),
                    pulished = Translator.trans('sub.img.published', {}, 'photo'),
                    pulished_private = Translator.trans('sub.img.private', {}, 'photo'),
                    profile = Translator.trans('sub.img.profile', {}, 'photo'),
                    deletes = Translator.trans('sub.img.delete', {}, 'photo'),
                    like = Translator.trans('sub.img.like', {}, 'photo'),
                    action = Translator.trans('sub.img.action', {}, 'photo'),
                    text_published = ((isPublished)? public + '  '+ datepublished.toLocaleDateString() : private ),
                    link_published = (!isPublished)?'<a class="dropdown-item published" href="#" data-status="1" data-hashname="'+photo.hashname+'">'+pulished+'</a>':'<a class="dropdown-item" href="#" data-status="0" data-hashname="'+photo.hashname+'">'+pulished_private+'</a>' ;

                var img = '<img src="'+ src +'" alt="" class="card-img-top rounded">';
                var id = "action"+photo.id;
                body+=
                    '<div class="col-sm-12 col-md-4 col   temxt-center img">'+
                    '<div class="card">'+
                    '<div class="col-12 text-center bg-faded img">' +
                    '<img src="'+src+'" class="responsive card-img-top rounded img-thumbnail">' +
                    '</div>' +
                    '<div class="card-block bg-faded">'+
                    '<p>'+photo.id+' people(s) like this photo </p>'+
                    '<p>'+text_published+'</p>'+
                    '<div class="col-12 text-center">'+
                    '<div class="btn-group text-center">'+
                    '<button id="m8'+id+'" type="button" class="btn-sm btn-warning dropdown-toggle dropdown-toggle-split" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">'+
                    '<span class="fa fa-check"></span>' +action+
                    '</button>'+
                    '<div class="dropdown-menu"  aria-labelledby="'+id+'">'+
                    '<a class="dropdown-item setprofile" href="#" data-hashname="'+photo.hashname+'">'+profile+'</a>'+
                    link_published+
                    '<a class="dropdown-item " href="#"> <span class="fa fa-thumbs-o-up">'+like+'</span></a>'+
                    '<a class="dropdown-item delete" href="#" data-hashname="'+photo.hashname+'">'+deletes+'</a>'+
                    '</div>'+
                    '</div>'+
                    '</div>'+
                    '</div>'+
                    '</div>'    +
                    '</div>';
            }
            element.append(body);
            mainSubPhotos.params.tabs.profile.chargement_photo.fadeOut();
        }




        //supprimer une photo
        function deletePhoto(hashname){
            var trans = Translator.trans('sub.body.confirm_message',{},"photo");

            bootbox.confirm(trans,function(result){
                if(result){
                    mainSubPhotos.params.tabs.list.chargement_photo.fadeIn();
                    var datas = {
                        hashanme : hashname,
                        state: currentlink==1?"list":"profile"
                    };
                    $.ajax({
                        url: mainSubPhotos.params.api.delete.url,
                        type:  mainSubPhotos.params.api.delete.method,
                        data: datas,
                        crossDomain: true,
                        headers : {"X-Auth-Token" : currentUser.token},
                        dataType:  mainSubPhotos.params.api.delete.type,
                        success: function(response){
                            console.log(response);
                            if(response!=null  && response!="null" && response!="undefined")
                            {
                                if(currentlink==1)
                                {
                                    setPhotos(mainSubPhotos.params.tabs.list.body_photo,response);
                                }
                                else{
                                    setProfile(mainSubPhotos.params.tabs.profile.body_photo,response);
                                }
                            }
                            var message = Translator.trans("sub.body.success_message",{},"photo");
                            bootbox.alert(message,function(result){});
                        },
                        error: function (xhr, status, message) { //en cas d'erreur
                            console.log(status+"\n"+xhr.responseText + '\n' + message );
                            var message = Translator.trans("sub.body.error_message",{},"photo");
                            bootbox.alert(message,function(result){});
                        },
                        complete:function(){
                            console.log("Request finished.");
                        }

                    });
                }
                else
                {
                    trans = Translator.trans('sub.body.cancel_message',{},"photo");
                    bootbox.alert(trans,function(result){});
                    mainSubPhotos.params.tabs.list.chargement_photo.fadeOut();
                }
            });
        }


        //set  une photo de profile
        function setprofilePhoto(hashname){

            mainSubPhotos.params.tabs.list.chargement_photo.fadeIn();
            var datas = {
                hashname : hashname,
                state: currentlink==1?"list":"profile"
            };
            $.ajax({
                    url: mainSubPhotos.params.api.setprofile.url,
                    type:  mainSubPhotos.params.api.setprofile.method,
                    data: datas,
                    crossDomain: true,
                    headers : {"X-Auth-Token" : currentUser.token},
                    dataType:  mainSubPhotos.params.api.setprofile.type,
                    success: function(response){
                        console.log(response);
                        if(response!=null  && response!="null" && response!="undefined")
                        {
                            if(currentlink==1)
                            {
                                setPhotos(mainSubPhotos.params.tabs.list.body_photo,response.list);
                                setpicture(mainUserProfile_photos.params.imprtant.important_block_img,baseHost+response.profile.path,mainUserProfile_photos.params.imprtant.important_block_img.data('help'));
                            }
                            else{
                                setProfile(mainSubPhotos.params.tabs.profile.body_photo,response.list);
                                setpicture(mainUserProfile_photos.params.imprtant.important_block_img,baseHost+response.profile.path,mainUserProfile_photos.params.imprtant.important_block_img.data('help'))
                            }
                        }
                        var message = Translator.trans("sub.body.setprofile.success",{},"photo");
                        bootbox.alert(message,function(result){});
                    },
                    error: function (xhr, status, message) { //en cas d'erreur
                        console.log(status+"\n"+xhr.responseText + '\n' + message );
                        var message = Translator.trans("sub.body.setprofile.error",{},"photo");
                        bootbox.alert(message,function(result){});
                    },
                    complete:function(){
                        console.log("Request finished.");
                    }

                });

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


        //changer la visibilite de la photo
        function setpublished(hashname,status){

            mainSubPhotos.params.tabs.list.chargement_photo.fadeIn();
            var datas = {
                hashname : hashname,
                status : status,
                state: currentlink==1?"list":"profile"
            };
            $.ajax({
                url: mainSubPhotos.params.api.published.url,
                type:  mainSubPhotos.params.api.published.method,
                data: datas,
                crossDomain: true,
                headers : {"X-Auth-Token" : currentUser.token},
                dataType:  mainSubPhotos.params.api.published.type,
                success: function(response){
                    console.log(response);
                    if(response!=null  && response!="null" && response!="undefined")
                    {
                        if(currentlink==1)
                        {
                            setPhotos(mainSubPhotos.params.tabs.list.body_photo,response);
                        }
                        else{
                            setProfile(mainSubPhotos.params.tabs.profile.body_photo,response);
                        }
                    }
                    var message = Translator.trans("sub.body.published.success",{},"photo");
                    bootbox.alert(message,function(result){});
                },
                error: function (xhr, status, message) { //en cas d'erreur
                    console.log(status+"\n"+xhr.responseText + '\n' + message );
                    var message = Translator.trans("sub.body.published.error",{},"photo");
                    bootbox.alert(message,function(result){});
                },
                complete:function(){
                    console.log("Request finished.");
                }

            });

        }



    }
});
