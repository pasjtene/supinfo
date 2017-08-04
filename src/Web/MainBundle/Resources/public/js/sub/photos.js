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
        });



        //agrandir une photo
        mainSubPhotos.params.tabs.list.body_photo.on('click', "img",function() {
            mainSubPhotos.params.tabs.list.zoom_source.attr('src', $(this).attr('src'));
            mainSubPhotos.params.tabs.list.zoom_img.modal('show');
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
                    like = Translator.trans('sub.img.like', {}, 'photo')
                    text_published = ((isPublished)? public + '  '+ datepublished.toLocaleDateString() : private ),
                    link_published = (!isPublished)?'<a class="dropdown-item published" href="#" data-status="1" data-hashname="'+photo.hashname+'">'+pulished+'</a>':'<a class="dropdown-item" href="#" data-status="0" data-hashname="'+photo.hashname+'">'+pulished_private+'</a>' ;

                var img = '<img src="'+ src +'" alt="" class="card-img-top rounded">';
                var id = "action"+photo.id;
                body+=
                    '<div class="col-sm-12 col-md-4 col   temxt-center img">'+
                        '<div class="card">'+
                            img+
                            '<div class="card-block bg-faded">'+
                                '<p>'+photo.id+' people(s) like this photo </p>'+
                                '<p>'+text_published+'</p>'+
                                '<div class="btn-group text-right bg-faded"">'+
                                    '<button id="m8'+id+'" type="button" class="bg-faded  btn-sm btn-secondary dropdown-toggle dropdown-toggle-split" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">'+
                                        ' <span class="sr-only">Toggle Dropdown</span>'+
                                    '</button>'+
                                    '<div class="dropdown-menu"  aria-labelledby="'+id+'">'+
                                        '<a class="dropdown-item setprofile" href="#" data-hashname="'+photo.hashname+'">'+profile+'</a>'+
                                           link_published+
                                        '<a class="dropdown-item " href="#"> <span class="fa fa-thumbs-o-up">'+like+'</span></a>'+
                                        '<a class="dropdown-item delete" href="#" data-hashname="'+photo.hashname+'">'+deletes+'</a>'+
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
                    like = Translator.trans('sub.img.like', {}, 'photo')
                text_published = ((isPublished)? public + '  '+ datepublished.toLocaleDateString() : private ),
                    link_published = (!isPublished)?'<a class="dropdown-item published" href="#" data-status="1" data-hashname="'+photo.hashname+'">'+pulished+'</a>':'<a class="dropdown-item" href="#" data-status="0" data-hashname="'+photo.hashname+'">'+pulished_private+'</a>' ;

                var img = '<img src="'+ src +'" alt="" class="card-img-top rounded">';
                var id = "action"+photo.id;
                body+=
                    '<div class="col-sm-12 col-md-4 col   temxt-center img">'+
                    '<div class="card">'+
                    img+
                    '<div class="card-block bg-faded">'+
                    '<p>'+photo.id+' people(s) like this photo </p>'+
                    '<p>'+text_published+'</p>'+
                    '<div class="btn-group text-right bg-faded"">'+
                    '<button id="m8'+id+'" type="button" class="bg-faded  btn-sm btn-secondary dropdown-toggle dropdown-toggle-split" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">'+
                    ' <span class="sr-only">Toggle Dropdown</span>'+
                    '</button>'+
                    '<div class="dropdown-menu"  aria-labelledby="'+id+'">'+
                    '<a class="dropdown-item setprofile" href="#" data-hashname="'+photo.hashname+'">'+profile+'</a>'+
                    link_published+
                    '<a class="dropdown-item " href="#"> <span class="fa fa-thumbs-o-up">'+like+'</span></a>'+
                    '<a class="dropdown-item delete" href="#" data-hashname="'+photo.hashname+'">'+deletes+'</a>'+
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
