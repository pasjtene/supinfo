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
           if(listPhotos!=null)
           {
               clearInterval(intervalphotos);

           }
       },100);

        function setPhotos(element,list){

            element.empty();
            mainSubPhotos.params.body.chargement.fadeOut();
        }
    }
});
