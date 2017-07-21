var MainSubPhotos = function()
{
    this.params = {
        page: $("#mainUserProfile"),
        sub: $("#Main-Subphotos"),
        active_tab : $("#Main-Subphotos #active-photo-tab"),
        link_list:$("#Main-Subphotos #link-photo-list a "),
        link_profile:$("#Main-Subphotos #link-photo-profile a "),
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
                method: "get",
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
        mainSubPhotos.params.tabs.list.chargement_photo.fadeIn();


        //toutes les innformations concernant  la liste des photos
        if(mainSubPhotos.params.active_tab.val()==1){
            initList();
            currentlink =1;
        }

        mainSubPhotos.params.link_list.click(function(){
            initList();
            currentlink=1;
        });



        //toutes les innformations concernant  la liste des profiles
        if(mainSubPhotos.params.active_tab.val()==3){
            initProfile();
            currentlink = 3;
        }

        mainSubPhotos.params.link_list.click(function(){
            initProfile();
            currentlink =3;
        });



        //agrandir une photo
        mainSubPhotos.params.tabs.list.body_photo.on('click', "img",function() {
            mainSubPhotos.params.tabs.list.zoom_source.attr('src', $(this).attr('src'));
            mainSubPhotos.params.tabs.list.zoom_img.modal('show');
        });


        //supprimer une photo
        mainSubPhotos.params.tabs.list.body_photo.on('click', ".dropdown-menu .delete",function() {
           deletePhoto($(this).data('hashanme'));
        });

        //set profile
        mainSubPhotos.params.tabs.list.body_photo.on('click', ".dropdown-menu .setprofile",function() {
            setprofilePhoto($(this).data('hashanme'));
        });


        //set visibility
        mainSubPhotos.params.tabs.list.body_photo.on('click', ".dropdown-menu .setprofile",function() {
            setpublished($(this).data('hashanme'),$(this).data('status'));
        });



        function initList(){
            mainSubPhotos.params.tabs.list.chargement_photo.fadeIn();
            //charger les photos de l'utilisateur selectionnée (par defaut le user connecte
            fillPhotos(currentUser.id);
        }


        function initProfile(){
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
                var  isPublished = datepublished.getYear()<2017? false :true;

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
                    text_published = ((isPublished)? public + datepublished.toLocaleDateString() : private ),
                    link_published = (!isPublished)?'<a class="dropdown-item published" href="#" data-status="1" data-hashname="'+photo.hashname+'">'+pulished+'</a>':'<a class="dropdown-item" href="#" data-status="0" data-hashname="'+photo.hashname+'">'+pulished_private+'</a>' ;

                var img = '<img src="'+ src +'" alt="" class="card-img-top rounded">';
                var id = "action"+photo.id;
                body+=
                    '<div class="col-sm-12 col-md-4 col   temxt-center img">'+
                        '<div class="card">'+
                            img+
                            '<div class="card-block">'+
                                '<p>'+photo.id+' people(s) like this photo </p>'+
                                '<div class="btn-group text-right">'+
                                    '<button class="btn-secondary btn-sm text-muted"  type="button"  aria-haspopup="true" aria-expanded="false">'+
                                        text_published+
                                    '</button>'+
                                    '<button id="m8'+id+'" type="button" class="  btn-sm btn-secondary dropdown-toggle dropdown-toggle-split" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">'+
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
                if ((photo.hashname == null || photo.hashname == 'null')) {
                    src = element.data('help');
                }
                else {
                    src = baseHost + photo.path;
                }
                //alert(element.data('help'));

                //varibale trans
                var pulished_to = Translator.trans('sub.body.see', {}, 'photo');
                var pulished = Translator.trans('sub.img.published', {}, 'photo');
                var profile = Translator.trans('sub.img.profile', {}, 'photo');
                var deletes = Translator.trans('sub.img.delete', {}, 'photo');
                var like = Translator.trans('sub.img.like', {}, 'photo');

                var img = '<img src="'+ src +'" alt="" class="card-img-top rounded">';
                var id = "action"+photo.id;
                body+=
                    '<div class="col-sm-12 col-md-4 col  text-center img">'+
                    '<div class="card">'+
                    img+
                    '<div class="card-block">'+
                    '<p>'+photo.id+' people(s) like this photo </p>'+
                    '<div class="btn-group text-right">'+
                    '<button class="btn-secondary btn-sm text-muted"  type="button"  aria-haspopup="true" aria-expanded="false">'+
                    pulished_to+ datepublished.toLocaleString()+
                    '</button>'+
                    '<button id="'+id+'" type="button" class="  btn-sm btn-secondary dropdown-toggle dropdown-toggle-split" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">'+
                    ' <span class="sr-only">Toggle Dropdown</span>'+
                    '</button>'+
                    '<div class="dropdown-menu"  aria-labelledby="'+id+'">'+
                    '<a class="dropdown-item" href="#">'+profile+'</a>'+
                    '<a class="dropdown-item" href="#">'+pulished+'</a>'+
                    '<a class="dropdown-item " href="#"> <span class="fa fa-thumbs-o-up">'+like+'</span></a>'+
                    '<a class="dropdown-item" href="#">'+deletes+'</a>'+
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
           if(confirm(trans))
           {
               mainSubPhotos.params.tabs.list.chargement_photo.fadeIn();
               var datas = {
                   hashname : hashname,
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
                       alert(message);
                   },
                   error: function (xhr, status, message) { //en cas d'erreur
                       console.log(status+"\n"+xhr.responseText + '\n' + message );
                       var message = Translator.trans("sub.body.error_message",{},"photo");
                       alert(message);
                   },
                   complete:function(){
                       console.log("Request finished.");
                   }

               });

           }
            else{
               trans = Translator.trans('sub.body.cancel_message',{},"photo");
               alert(trans);
           }
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
                                setPhotos(mainSubPhotos.params.tabs.list.body_photo,response);
                            }
                            else{
                                setProfile(mainSubPhotos.params.tabs.profile.body_photo,response);
                            }
                        }
                        var message = Translator.trans("sub.body.setprofile.success",{},"photo");
                        alert(message);
                    },
                    error: function (xhr, status, message) { //en cas d'erreur
                        console.log(status+"\n"+xhr.responseText + '\n' + message );
                        var message = Translator.trans("sub.body.setprofile.error",{},"photo");
                        alert(message);
                    },
                    complete:function(){
                        console.log("Request finished.");
                    }

                });

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
                    alert(message);
                },
                error: function (xhr, status, message) { //en cas d'erreur
                    console.log(status+"\n"+xhr.responseText + '\n' + message );
                    var message = Translator.trans("sub.body.published.error",{},"photo");
                    alert(message);
                },
                complete:function(){
                    console.log("Request finished.");
                }

            });

        }



    }
});
