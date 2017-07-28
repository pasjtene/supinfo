/**
 * Created by Danick takam on 16/06/2017.
 */

var MainUserProfile = function()
{
    this.params = {
        page: $("#mainUserProfile"),
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
        id:{
            modalEmail: $("#modalEmail")
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
            carousel: $("#profile-nav #carousel")
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
            dropdownMenuMessages_body:$("#toogleNav #dropdownMenuMessages-body"),
            dropdownMenuFreinds: $('#nav #dropdownMenuFreinds'),
            dropdownMenuFreinds_body:$("#toogleNav #dropdownMenuFreinds-body"),
            content: $("#content")
        }
    };

};

var listUsers = null,
    listVips = null,
    ListPhotos = null;
$(function(){

    var mainUserProfile = new MainUserProfile();

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



       // js du  filtre

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
                   console.log(response);
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
               console.log(response);
               //set  les listes des users
               listUsers=response.users;

               //set  les listes des photos
               listPhotos=response.photos;


               //modifier la photo de profile du  user connecte
               if(response.profilePhotos!=null && response.profilePhotos[0]!=null && response.profilePhotos[0]!='undefined'){
                   setProfile(mainUserProfile.params.imprtant.important_block_img,baseHost+response.profilePhotos[0].path,mainUserProfile.params.imprtant.important_block_img.data('help'))
               }

               //chargement des utilisateurs vips
               if(response.vips!=null)
               {
                   setVips(mainUserProfile.params.matches.carousel_inner,response.vips);
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
                    var img = '<img class="d-block img-fluid rounded-circle" src="' + src + '" alt="First slide">';
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
    }
    //mainUserProfile.params.nav.dropdownMenuMessages_body.fadeIn();
    //afficher les notifications messages
    mainUserProfile.params.nav.dropdownMenuMessages.on('click', function () {
        mainUserProfile.params.nav.dropdownMenuMessages_body.fadeIn();
    });

    //afficher les notifications users
    mainUserProfile.params.nav.dropdownMenuFreinds.on('click', function () {
        mainUserProfile.params.nav.dropdownMenuFreinds_body.fadeIn();
    });

    //cacher les boites de notification
    mainUserProfile.params.nav.content.on('click', function () {
        //bootbox.alert("ok",function(){});
        mainUserProfile.params.nav.dropdownMenuMessages_body.fadeOut();
        mainUserProfile.params.nav.dropdownMenuFreinds_body.fadeOut();
    });

});