/**
 * Created by Danick takam on 16/06/2017.
 */

var MainDetailProfile = function()
{
    this.params = {
        sub : $("#Main-Subdetail-detail-User"),
        item: $("#Main-Subdetails-Detail-User"),
        active_tab : $("#Main-Subphotos #active-photo-tab"),
        html: $("html"),
        form: {
            country : $("#Main-Subdetail-detail-User #country")
        },
        api:{
            compte:
            {
                url : baseUrl+"auth/user/compte",
                method: "get",
                type: "json"
            },
            editCountry:
            {
                url : baseUrl+"auth/user/compte/editCountry",
                method: "get",
                type: "json"
            }
        },
        photo: $("#Main-Subdetail-detail-User .photoDetail"),
        detail_profile:{
            name : $("#Main-Subdetail-detail-User .detail_profile_name"),
            sex : $("#Main-Subdetail-detail-User .detail_profile_sex"),
            country : $("#Main-Subdetail-detail-User .detail_profile_country"),
            city : $("#Main-Subdetail-detail-User .detail_profile_city"),
            profession : $("#Main-Subdetail-detail-User .detail_profile_profession"),
            birthday : $("#Main-Subdetail-detail-User .detail_profile_birthday"),
            email : $("#Main-Subdetail-detail-User .detail_profile_email"),
            countryChange : $("#Main-Subdetail-detail-User .countryChange"),
            countryblock : $("#Main-Subdetail-detail-User .countryblock")
        },
        btn:{
            openChange : $("#Main-Subdetail-detail-User .btnOpenchange"),
            saveCountry : $("#Main-Subdetail-detail-User .linkSaveCountry"),
            closeCountry : $("#Main-Subdetail-detail-User .linkCloseCountry")
        }
    };

};

$(function(){

    var mainDetailProfile = new MainDetailProfile();
    var mainProfile_detail = new MainUserProfile();




    if(mainDetailProfile.params.sub.data('sub')=="Main-Subdetail-detail-User" && mainDetailProfile.params.active_tab.val()==4)
    {
       // console.log(mainDetailProfile.params.btn.openChange);
        mainDetailProfile.params.btn.openChange.click(function(e){
            mainProfile_detail.params.bg_action.fadeIn();
            var chargerPays = setInterval(function(){
                console.log("bad : " + geolocationbad);
                //il faut  marcher
                //charger la liste des pays
                $.getJSON(mainDetailProfile.params.form.country.data("country"), function(data){
                    //mainRegister.params.form.country.empty();
                    $.each(data,function(index,value){
                        var option = "<option  value='"+index+"'>"+value+"</option>";
                        mainDetailProfile.params.form.country.append(option);
                    });
                });
                clearInterval(chargerPays);
            },100);
            toogleLinkCountry();
            mainProfile_detail.params.bg_action.fadeOut();
            e.preventDefault();
        });

        mainDetailProfile.params.btn.closeCountry.click(function(e){
           toogleLinkCountry();
            e.preventDefault();
        });
        mainDetailProfile.params.btn.saveCountry.click(function(e){
            mainProfile_detail.params.bg_action.fadeIn();
            var data = {id:currentUser.id, pays:mainDetailProfile.params.form.country.val()};
           // console.log(data.pays.length);
            if(data.pays.length == 0){
                bootbox.alert("Veuillez choisir un pays", function(){});
                mainProfile_detail.params.bg_action.fadeOut();
            }else{
                $.ajax({
                    url:  mainDetailProfile.params.api.editCountry.url,
                    type:  mainDetailProfile.params.api.editCountry.method,
                    crossDomain: true,
                    data : data,
                    headers : {"X-Auth-Token" : currentUser.token},
                    contentType: false,
                    dataType:  mainDetailProfile.params.api.editCountry.type,
                    success: function(response){ // en cas de success

                        if(response!=null && response!="null")
                        {
                           // console.log(response);
                            if(response.userProfile != "null" && response.userProfile != null){
                                var  user  = response.userProfile.user;  // recuperer le user

                            }else{
                                var  user  = response.user;  // recuperer le user
                            }
                            setdetailAll(mainDetailProfile.params.detail_profile, user);
                        }
                    },
                    error: function (xhr, status, message) { //en cas d'erreur
                        console.log(status+"\n"+xhr.responseText + '\n' + message );
                    },
                    complete:function(){
                        toogleLinkCountry();
                        mainProfile_detail.params.bg_action.fadeOut();
                    }

                });
            }
            e.preventDefault();
        });
        function getCompte(id)
        {
            mainProfile_detail.params.bg_action.fadeIn();
            $.ajax({
                url:  mainDetailProfile.params.api.compte.url,
                type:  mainDetailProfile.params.api.compte.method,
                crossDomain: true,
                data : 'id='+id,
                headers : {"X-Auth-Token" : currentUser.token},
                contentType: false,
                dataType:  mainDetailProfile.params.api.compte.type,
                success: function(response){ // en cas de success

                    if(response!=null && response!="null")
                    {
                        //console.log(response);
                        if(response.userProfile != "null" && response.userProfile != null){
                            var  user  = response.userProfile.user;  // recuperer le user
                            var  profile  = response.userProfile;  // recuperer le profile
                            var  geolocation  = response.userProfile.geolocation;  // recuperer les informations sur son plan de localisation lors de la connexion a ne pas modifier ces info
                           
                        }else{
                            var  user  = response.user;  // recuperer le user
                            //bootbox.alert("Nombre d'utilisateur present  dans la base de donnée : " + user.fullname, function(){});
                        }
                        if(response.photo != null && response.photo != 'null'){
                            mainDetailProfile.params.photo.attr('src', baseHost+response.photo.path);
                        }else{
                            mainDetailProfile.params.photo.attr('src', path.emptyImage);
                        }
                        setdetailAll(mainDetailProfile.params.detail_profile, user);

                    }


                },
                error: function (xhr, status, message) { //en cas d'erreur
                    console.log(status+"\n"+xhr.responseText + '\n' + message );
                },
                complete:function(){

                    mainProfile_detail.params.bg_action.fadeOut();
                }

            });
        }

        function toogleLinkCountry(){
            mainDetailProfile.params.detail_profile.countryblock.toggleClass('hide');
            mainDetailProfile.params.detail_profile.countryChange.toggleClass('hide');
        }

        function setdetailAll(element, val){
            element.name.html(val.fullname);
            element.sex.html(val.gender);
            element.city.html(val.city);
            element.email.html(val.email);
            element.birthday.html(new Date(val.birthDate).toLocaleDateString());
            element.profession.html(val.profession);
            var country = getCountry(countryList,val.country)
            var flag ="<img class='sm-img flag' src='"+path.flags+val.country+".png' alt=''/> ";
            element.country.html(flag + country);
        }
        // fon fait  l'appel  du fichier
        getCompte(currentUser.id);
    }
});