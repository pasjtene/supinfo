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
            country : $("#Main-Subdetail-detail-User #country"),
            phoneadd : $("#Main-Subdetail-detail-User #phoneadd"),
            firstName : $("#Main-Subdetail-detail-User #firstName"),
            city : $("#Main-Subdetail-detail-User #city"),
            profession : $("#Main-Subdetail-detail-User #profession"),
            day : $("#Main-Subdetail-detail-User #day"),
            month : $("#Main-Subdetail-detail-User #month"),
            year : $("#Main-Subdetail-detail-User #year"),
            email : $("#Main-Subdetail-detail-User #email"),
            lastname : $("#Main-Subdetail-detail-User #lastName")
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
            },
            addPhone:
            {
                url : baseUrl+"auth/user/compte/addPhone",
                method: "get",
                type: "json"
            },
            deletePhone:
            {
                url : baseUrl+"auth/user/compte/deletePhone",
                method: "get",
                type: "json"
            },
            editProfil:
            {
                url : baseUrl+"auth/user/compte/editProfildetail",
                method: "get",
                type: "json"
            },
            editBirthday:
            {
                url : baseUrl+"auth/user/compte/editBirthday",
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
            phones : $("#Main-Subdetail-detail-User .detail_profile_phones"),
            countryChange : $("#Main-Subdetail-detail-User .countryChange"),
            countryblock : $("#Main-Subdetail-detail-User .countryblock"),
            phoneBlock : $("#Main-Subdetail-detail-User .phoneBlock"),
            phoneChange : $("#Main-Subdetail-detail-User .phoneChange"),
            birthdayBlock : $("#Main-Subdetail-detail-User .birthdayBlock"),
            birthdayChange : $("#Main-Subdetail-detail-User .birthdayChange")
        },
        btn:{
            openChange : $("#Main-Subdetail-detail-User .btnOpenchange"),
            saveCountry : $("#Main-Subdetail-detail-User .linkSaveCountry"),
            closeCountry : $("#Main-Subdetail-detail-User .linkCloseCountry"),
            addPhone : $("#Main-Subdetail-detail-User .LinkSavePhone"),
            closePhone : $("#Main-Subdetail-detail-User .LinkClosePhone"),
            openPhone : $("#Main-Subdetail-detail-User .btnOpenAddPhone"),
            saveBirth : $("#Main-Subdetail-detail-User .LinkSaveBirth"),
            closeBirth : $("#Main-Subdetail-detail-User .LinkCloseBirth"),
            openBirth : $("#Main-Subdetail-detail-User .btnOpenbirthday"),
            deletePhone : $("#Main-Subdetail-detail-User .deletephone"),
            editProfil : $("#Main-Subdetail-detail-User #editProfil")
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

        mainDetailProfile.params.btn.openPhone.click(function(e){
            toogleLinkPhone();
            e.preventDefault();
        });

        mainDetailProfile.params.btn.closePhone.click(function(e){
           toogleLinkPhone();
            e.preventDefault();
        });

        mainDetailProfile.params.btn.openBirth.click(function(e){
            toogleLinkBirthday();
            e.preventDefault();
        });

        mainDetailProfile.params.btn.closeBirth.click(function(e){
            toogleLinkBirthday();
            e.preventDefault();
        });

        ///===MODIFIE LE PAY
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


        ////Ajoute un numero de telephone
        mainDetailProfile.params.btn.addPhone.click(function(e){
            mainProfile_detail.params.bg_action.fadeIn();
            var data = {id:currentUser.id, phone:mainDetailProfile.params.form.phoneadd.val()};
            // console.log(data.pays.length);
            if(data.phone.length == 0){
                bootbox.alert("Veuillez saisir un numero pour ajouter", function(){});
                mainProfile_detail.params.bg_action.fadeOut();
            }else{
                $.ajax({
                    url:  mainDetailProfile.params.api.addPhone.url,
                    type:  mainDetailProfile.params.api.addPhone.method,
                    crossDomain: true,
                    data : data,
                    headers : {"X-Auth-Token" : currentUser.token},
                    contentType: false,
                    dataType:  mainDetailProfile.params.api.addPhone.type,
                    success: function(response){ // en cas de success

                        if(response!=null && response!="null")
                        {
                             //console.log(response);
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
                        toogleLinkPhone();
                        mainProfile_detail.params.bg_action.fadeOut();
                    }

                });
            }
            e.preventDefault();
        });


       ////AMODIFIER LE ROFIL DE LUTILISATEUR
        mainDetailProfile.params.btn.editProfil.click(function(e){
            mainProfile_detail.params.bg_action.fadeIn();
            var data = {id:currentUser.id,
                email:mainDetailProfile.params.form.email.val(),
                lastName:mainDetailProfile.params.form.lastname.val(),
                firstName:mainDetailProfile.params.form.firstName.val(),
                city:mainDetailProfile.params.form.city.val(),
                profession:mainDetailProfile.params.form.profession.val()
            };
            // console.log(data.pays.length);
            if(data.email.length == 0){
                bootbox.alert("Veuillez ", function(){});
                mainProfile_detail.params.bg_action.fadeOut();
            }else{
                $.ajax({
                    url:  mainDetailProfile.params.api.editProfil.url,
                    type:  mainDetailProfile.params.api.editProfil.method,
                    crossDomain: true,
                    data : data,
                    headers : {"X-Auth-Token" : currentUser.token},
                    contentType: false,
                    dataType:  mainDetailProfile.params.api.editProfil.type,
                    success: function(response){ // en cas de success

                        if(response!=null && response!="null")
                        {
                             //console.log(response);
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
                        mainProfile_detail.params.bg_action.fadeOut();
                    }

                });
            }
            e.preventDefault();
        });


       ////=====MODIFIE LA DATE DE NAISSANCE
        mainDetailProfile.params.btn.saveBirth.click(function(e){
            mainProfile_detail.params.bg_action.fadeIn();
            var data = {id:currentUser.id,
                        day:mainDetailProfile.params.form.day.val(),
                        year:mainDetailProfile.params.form.year.val(),
                        month:mainDetailProfile.params.form.month.val()
            };
            // console.log(data.pays.length);
            if(data.day.length == 0 ||data.year.length == 0 ||data.month.length == 0 ){
                bootbox.alert("Veuillez veriifier votre date de naissance", function(){});
                mainProfile_detail.params.bg_action.fadeOut();
            }else{
                $.ajax({
                    url:  mainDetailProfile.params.api.editBirthday.url,
                    type:  mainDetailProfile.params.api.editBirthday.method,
                    crossDomain: true,
                    data : data,
                    headers : {"X-Auth-Token" : currentUser.token},
                    contentType: false,
                    dataType:  mainDetailProfile.params.api.editBirthday.type,
                    success: function(response){ // en cas de success

                        if(response!=null && response!="null")
                        {
                             //console.log(response);
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
                        toogleLinkBirthday();
                        mainProfile_detail.params.bg_action.fadeOut();
                    }
                });
            }
            e.preventDefault();
        });


        ///====AFFICHE LES DETAILS DU USER
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
                success: function(response){
// en cas de success
                    if(response!=null && response!="null")
                    {
                        console.log(response);

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
        function toogleLinkBirthday(){
            mainDetailProfile.params.detail_profile.birthdayBlock.toggleClass('hide');
            mainDetailProfile.params.detail_profile.birthdayChange.toggleClass('hide');
        }

        function toogleLinkPhone(){
            mainDetailProfile.params.form.phoneadd.val("");
            mainDetailProfile.params.detail_profile.phoneBlock.toggleClass('hide');
            mainDetailProfile.params.detail_profile.phoneChange.toggleClass('hide');
        }


        //EFFACER UN NUMERO DE LA LISTE DES NUMEROs
        function deletePhone(phone){
            mainProfile_detail.params.bg_action.fadeIn();
            var data = {id:currentUser.id, phone:phone};
            // console.log(data.pays.length);
            $.ajax({
                url:  mainDetailProfile.params.api.deletePhone.url,
                type:  mainDetailProfile.params.api.deletePhone.method,
                crossDomain: true,
                data : data,
                headers : {"X-Auth-Token" : currentUser.token},
                contentType: false,
                dataType:  mainDetailProfile.params.api.deletePhone.type,
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
                    mainProfile_detail.params.bg_action.fadeOut();
                }

            });

        }

        function setdetailAll(element, val){
            element.name.html(val.fullname);
            element.sex.html(val.gender);
            element.city.html(val.city);
            element.email.html(val.email);
            element.birthday.html(new Date(val.birthDate).toLocaleDateString());
            element.profession.html(val.profession);
            var country = getCountry(countryList,val.country);
            var flag ="<img class='sm-img flag' src='"+path.flags+val.country+".png' alt=''/> ";
            element.country.html(flag + country);
            var chainePhones = "";

            //REMPLIR ES CHAMP POUR LA MODIFICATION
            //console.log(val.email);
            mainDetailProfile.params.form.email.val(val.email);
            mainDetailProfile.params.form.firstName.val(val.firstName);
            mainDetailProfile.params.form.lastname.val(val.lastName);
            mainDetailProfile.params.form.city.val(val.city);
            mainDetailProfile.params.form.profession.val(val.profession);

            if(val.phones != null){
                for(var i = 0; i < val.phones.length; i++){
                    //console.log(chainePhones);
                    chainePhones += "<span class='phonedet '> " +
                        "<span>"+ val.phones[i] +"</span> &nbsp;&nbsp;"+
                        "<a data-phone='"+ val.phones[i] +"' class='deletephone fa fa-2x fa-close' href='#'></a>"+
                        " </span><br>";
                }
            }
            element.phones.html(chainePhones);
            mainDetailProfile.params.btn.deletePhone = $("#Main-Subdetail-detail-User .deletephone");
            mainDetailProfile.params.btn.deletePhone.click(function(e){
                deletePhone($(this).data('phone'));
                //bootbox.alert("phone" + $(this).data('phone'), function(){});
                e.preventDefault();
            });
        }
        // fon fait  l'appel  du fichier
        getCompte(currentUser.id);
    }
});