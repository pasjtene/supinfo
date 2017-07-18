var MainSubPhotos = function()
{
    this.params = {
        page: $("#mainUserProfile"),
        sub: $("#Main-Subphotos"),
        api:{
            base: {
                url : baseUrl+"auth/user/base",
                method: "get",
                type: "json"
            },
            city: {
                url : baseUrl+"auth/user/city",
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
                zoom_img : $("#mainUserProfile #Main-Subphotos  #Main-Subphotos-list #zoomImg")
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
       var intervalphotos = setInterval(function(){
           //charger la liste des users du  site
           if(ListPhotos!=null)
           {
               clearInterval(intervalphotos);

           }
       },100);
        mainSubPhotos.params.tabs.list.img.click(function() {
            mainSubPhotos.params.tabs.list.zoom_source.attr('src', $(this).attr('src'));
            mainSubPhotos.params.tabs.list.zoom_img.modal('show');
        });

        function setPhotos(element,list){

            element.empty();
            mainSubPhotos.params.body.chargement.fadeOut();
        }
    }
});
