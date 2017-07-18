var MainSubPhotos = function()
{
    this.params = {
        page: $("#mainUserProfile"),
        sub: $("#Main-Subphotos"),
        api:{
            fill: {
                url : baseUrl+"auth/user/photo/list",
                method: "get",
                type: "json"
            },
            add: {
                url : baseUrl+"auth/user/city",
                method: "get",
                type: "json"
            },
            delete:{

            },
            published:{

            },
            profile:{

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

            }
        }
    };

};


$(function () {
    var mainSubPhotos = new MainSubPhotos(),
        mainUserProfile_photos = new MainUserProfile();

    if(mainSubPhotos.params.sub.data('sub')=="photos")
    {
        mainSubPhotos.params.tabs.list.chargement_photo.fadeIn();
        //charger les photos de l'utilisateur selectionnée (par defaut le user connecte
        fillPhotos(currentUser.id);

        mainSubPhotos.params.tabs.list.body_photo.on('click', "img",function() {
            mainSubPhotos.params.tabs.list.zoom_source.attr('src', $(this).attr('src'));
            mainSubPhotos.params.tabs.list.zoom_img.modal('show');
        });


        function fillPhotos(id){
            var formdata = new FormData();
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

        function setPhotos(element,list){

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
                                '<p>'+photo.id+' people like this photo </p>'+
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
            mainSubPhotos.params.tabs.list.chargement_photo.fadeOut();
        }

    }
});
