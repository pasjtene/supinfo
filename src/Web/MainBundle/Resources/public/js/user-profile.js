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
        }
    };

};

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
               //modifier la photo de profile du  user connecte
               if(response.profilePhotos!=null && response.profilePhotos[0]!=null && response.profilePhotos[0]!='undefined'){
                   setProfile(mainUserProfile.params.imprtant.important_block_img,baseHost+response.profilePhotos[0].path,mainUserProfile.params.imprtant.important_block_img.data('help'))
               }
               //charger la liste des users du  site
               if(response.users!=null)
               {
                   setUsers(mainUserProfile.params.main_body.content,response.users)
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

    function setUsers(element,list){

        element.empty();
        for(var i= 0; i<list.length; i++)
        {
            var user = list[i].user;
            var profile = list[i].profile;
            var photos = list[i].photos;
            var profilePicture = list[i].photoProfile;
            if(user.country==currentUser.country)
            {
                //alert(currentUser.ip);
                //alert("country =>"+user.country+ "user country =>"+currentUser.country)
                if(user.id !=currentUser.id){
                    //photos
                    var src = null;
                    if((profilePicture==null || profilePicture=='null'))
                    {
                        src =mainUserProfile.params.imprtant.important_block_img.data('help');
                    }
                    else
                    {
                        src = baseHost+profilePicture.path;
                    }
                    var img  = '<img src="'+src+'" alt="not found" class="img-thumbnail">';
                    //variable de user
                    var today=new Date();

                    var currentyear = today.getFullYear();
                    var year  = user.birthDate.split('-')[0];
                    var age = currentyear -parseInt(year);
                    //alert(age);
                    var lastConnect = new  Date(user.lastLogin);

                    //alert(lastConnect.toLocaleDateString());
                    if(lastConnect.toLocaleDateString()==today.toLocaleDateString())
                    {
                        lastConnect = lastConnect.toLocaleTimeString();
                    }
                    else{
                        lastConnect = lastConnect.toLocaleDateString();
                    }
                    //alert(lastConnect);
                    var country ="";
                    for(var k=0; k<countryList.length;k++)
                    {
                        if(countryList[k].code.toLowerCase()==user.country.toLowerCase() || countryList[k].value.toLowerCase()==user.country.toLowerCase() )
                        {
                            country = countryList[k].value;
                        }
                    }
                    var connect =
                        ' <div class="row">'+
                        '<div class="col-1">'+
                        '<div class="rounded-circle connect" ></div>'+
                        '</div>'+
                        '<div class="col name text-left"> <strong > '+user.firstName + '(' + age+'ans)   &nbsp;</strong></div>'+
                        '<div class="col-12 text-left">'+
                        '<span class="text-muted country">'+country+'</span>'+
                        '</div>'+
                        '</div>';

                    var no_connect =
                        ' <div class="row">'+
                        '<div class="col-1">'+
                        '<div class="rounded-circle no-connect" ></div>'+
                        '</div>'+
                        '<div class="col name text-left"> <strong > '+user.firstName + '(' + age+'ans)    &nbsp;</strong></div>'+
                        '<div class="col-12 text-left">'+
                        '<span class="text-muted country">'+user.country+'</span>'+
                        '<span class="text-grey pull-right"> see '+lastConnect+'</span>'+
                        '</div>'+
                        '</div>';


                    var state = null;
                    if(user.isOnline==true || user.isOnline=='true')
                    {
                        state = connect;
                    }
                    else
                    {
                        state = no_connect;
                    }

                    var body =
                            ' <div class="col-sm-12 col-md-4">'+
                            ' <div class="card bg-faded">'+
                            ' <div class="card-block text-center">'+
                            img+
                            ' <br>'+
                            state+
                            '<div class="row text-left bg-white">'+
                            '<div class="col">'+
                            '<a href=""><span class="fa fa-thumbs-o-up">like picture</span></a>'+
                            '</div>'+
                            '<div class="col" style="display: none;">'+
                            '<a href=""><span class="fa fa-comment-o">comment</span></a>'+
                            '</div>'+
                            '</div>'+
                            '</div>'+
                            '</div>'+
                            '</div>'
                        ;
                    element.append(body);
                }
            }
        }

        mainUserProfile.params.main_body.chargement.fadeOut();
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

            if(user.country==currentUser.country)
            {
                //photos
                var src = null;
                if((profilePicture==null || profilePicture=='null'))
                {
                    src =mainUserProfile.params.imprtant.important_block_img.data('help');
                }
                else
                {
                    src = baseHost+profilePicture.path;
                }
                var img  = '<img class="d-block img-fluid rounded-circle" src="'+src+'" alt="First slide">';
                //variable de user
                var today=new Date();

                var currentyear = today.getFullYear();
                var year  = user.birthDate.split('-')[0];
                var age = currentyear -parseInt(year);

                if(j%10==0 || j==1)
                {
                    body+= '<div class="carousel-item active align-items-center justify-content-md-center">';
                }
                else if (j%10==0)
                {
                    body+=
                        '</div>'+
                        '</div>'+
                        '<div class="carousel-item  align-items-center justify-content-md-center">';
                }
                body+=
                    '<div class="row">'+
                    '<div class="col">'+
                    img+
                    '</div>';
                j++;
            }
        }
        body+='</div> </div>';
        element.append(body);
        mainUserProfile.params.page.css({'margin-top':"0em"});
        mainUserProfile.params.matches.carousel.fadeIn();
    }
});