var MainSubMatches = function()
{
    this.params = {
        page: $("#mainUserProfile"),
        sub: $("#Main-Submatches"),
        path: path.flags,
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
            content :$("#main-body #Main-Submatches #content"),
            chargement: $("#main-body #Main-Submatches #chargement"),
            detail_profile: $("#main-body #Main-Submatches .detail-profile")
        }
    };

};


$(function () {
    var mainSubMatches = new MainSubMatches(),
        mainUserProfile_matches = new MainUserProfile();

    if(mainSubMatches.params.sub.data('sub')=="matches")
    {

        //consulter le detail  sur un profile
        mainSubMatches.params.body.content.on('click','.detail-profile',function(){
            window.location.href = Routing.generate('main_profile_detailProfile',{_locale:locale,key:$(this).data('key')});
        });

       var intervalusers = setInterval(function(){
           //charger la liste des users du  site
           if(listUsers!=null)
           {
               clearInterval(intervalusers);
               setUsers(mainSubMatches.params.body.content,listUsers)
           }
       },100);

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
                    if(user.id !=currentUser.id && user.type!="System"){
                        //photos
                        var src = null;
                        if((profilePicture==null || profilePicture=='null'))
                        {
                            src =mainUserProfile_matches.params.imprtant.important_block_img.data('help');
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

                        var flag ="<img class='sm-img' src='"+mainSubMatches.params.path+user.country+".png' alt=''/> ";

                        //alert(lastConnect.toLocaleDateString());
                        if(lastConnect.toLocaleDateString()==today.toLocaleDateString())
                        {
                            lastConnect = lastConnect.toLocaleTimeString();
                        }
                        else{
                            lastConnect = lastConnect.toLocaleDateString();
                        }

                        var city = user.city;
                        var  country = user.country;
                        var final =(city==null || city=="null")? getCountry(countryList,country) :city;
                        var connect =
                            ' <div class="row">'+
                            '<div class="col-1">'+
                            '<div class="rounded-circle connect" ></div>'+
                            '</div>'+
                            '<div class="col name text-left"> <strong > '+user.lastNameOrFirstname + '(' + age+'ans)   &nbsp;</strong></div>'+
                            '<div class="col-12 text-left">'+
                             flag+
                            '<span class="text-muted country">'+final+'</span>'+
                            '</div>'+
                            '</div>';

                        var no_connect =
                            ' <div class="row">'+
                                '<div class="col-1">'+
                                    '<div class="rounded-circle no-connect" ></div>'+
                                '</div>'+
                                '<div class="col name text-left"> <strong > '+user.lastNameOrFirstname + '(' + age+'ans)    &nbsp;</strong></div>'+
                                    '<div class="col-12 text-left">'+
                                    flag+
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
                                ' <div class="card bg-faded detail-profile" data-key="'+user.key+'"  data-email="'+user.email+'">'+
                                ' <div class="card-block text-center">'+
                                img+
                                ' <br>'+
                                state+
                                '<div class="row text-left">'+
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
            mainSubMatches.params.body.chargement.fadeOut();
           /* console.log("ip du  user connecte : "+currentUser.ip);
            console.log("ip localisation : "+currentUser.geolocation.ipAddress);
            console.log("country localisation : "+currentUser.geolocation.countryName);
            console.log("country code localisation : "+currentUser.geolocation.countryCode);
            console.log("regionName code localisation : "+currentUser.geolocation.regionName);
            console.log("cityName code localisation : "+currentUser.geolocation.cityName);
            */
        }
    }
});
