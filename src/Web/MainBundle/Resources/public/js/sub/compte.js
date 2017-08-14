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
            userName : $("#Main-Subdetail-detail-User #userName"),
            lastname : $("#Main-Subdetail-detail-User #lastName"),
            cpwd : $("#Main-Subdetail-detail-User #cpwd"),
            npwd : $("#Main-Subdetail-detail-User #npwd"),
            cfpwd : $("#Main-Subdetail-detail-User #cfpwd"),
            gender : $("#Main-Subdetail-detail-User #gender")
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
            infoPerso:
            {
                url : baseUrl+"auth/user/compte/infoPerso",
                method: "get",
                type: "json"
            },
            editAdresse:
            {
                url : baseUrl+"auth/user/compte/editAdresse",
                method: "get",
                type: "json"
            },
            editAccount:
            {
                url : baseUrl+"auth/user/compte/editAccount",
                method: "get",
                type: "json"
            },
            editpwd:
            {
                url : baseUrl+"auth/user/compte/editpwd",
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
            userName : $("#Main-Subdetail-detail-User .detail_profile_userName"),
            countryChange : $("#Main-Subdetail-detail-User .countryChange"),
            countryblock : $("#Main-Subdetail-detail-User .countryblock"),
            phoneBlock : $("#Main-Subdetail-detail-User .phoneBlock"),
            phoneChange : $("#Main-Subdetail-detail-User .phoneChange"),
            birthdayBlock : $("#Main-Subdetail-detail-User .birthdayBlock"),
            birthdayChange : $("#Main-Subdetail-detail-User .birthdayChange"),
            infoPersoBlock : $("#Main-Subdetail-detail-User .infoPersoBlock"),
            infoPersoChange : $("#Main-Subdetail-detail-User .infoPersoChange"),
            AdresseBlock : $("#Main-Subdetail-detail-User .AdresseBlock"),
            AdresseChange : $("#Main-Subdetail-detail-User .AdresseChange"),
            AccountBlock : $("#Main-Subdetail-detail-User .AccountBlock"),
            AccountChange : $("#Main-Subdetail-detail-User .AccountChange"),
            pwdBlock : $("#Main-Subdetail-detail-User .pwdBlock"),
            pwdchange : $("#Main-Subdetail-detail-User .helpers")
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
            LinkSaveInfoPerso : $("#Main-Subdetail-detail-User .LinkSaveInfoPerso"),
            LinkCloseInfoPerso : $("#Main-Subdetail-detail-User .LinkCloseInfoPerso"),
            openInfoperso : $("#Main-Subdetail-detail-User .openInfoperso"),
            openBirth : $("#Main-Subdetail-detail-User .btnOpenbirthday"),
            deletePhone : $("#Main-Subdetail-detail-User .deletephone"),
            editProfil : $("#Main-Subdetail-detail-User #editProfil"),
            LinkSaveAdresse : $("#Main-Subdetail-detail-User .LinkSaveAdresse"),
            LinkCloseAdresse : $("#Main-Subdetail-detail-User .LinkCloseAdresse"),
            openAdresse : $("#Main-Subdetail-detail-User .openAdresse"),
            LinkSaveAccount : $("#Main-Subdetail-detail-User .LinkSaveAccount"),
            LinkCloseAccount : $("#Main-Subdetail-detail-User .LinkCloseAccount"),
            openAccount : $("#Main-Subdetail-detail-User .openAccount"),
            LinkSavepwd : $("#Main-Subdetail-detail-User .LinkSavepwd"),
            LinkClosepwd : $("#Main-Subdetail-detail-User .LinkClosepwd"),
            openPwd : $("#Main-Subdetail-detail-User .openPwd")
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
            toogleLink(mainDetailProfile.params.detail_profile.countryblock, mainDetailProfile.params.detail_profile.countryChange);

            mainProfile_detail.params.bg_action.fadeOut();
            e.preventDefault();
        });

        mainDetailProfile.params.btn.closeCountry.click(function(e){
           toogleLink(mainDetailProfile.params.detail_profile.countryblock,
               mainDetailProfile.params.detail_profile.countryChange);
            e.preventDefault();
        });

        mainDetailProfile.params.btn.openInfoperso.click(function(e){
            toogleLink(mainDetailProfile.params.detail_profile.infoPersoBlock,
                mainDetailProfile.params.detail_profile.infoPersoChange);
            e.preventDefault();
        });

        mainDetailProfile.params.btn.LinkCloseInfoPerso.click(function(e){
            toogleLink(mainDetailProfile.params.detail_profile.infoPersoBlock,
                mainDetailProfile.params.detail_profile.infoPersoChange);
            e.preventDefault();
        });

        mainDetailProfile.params.btn.openPhone.click(function(e){
            toogleLink(mainDetailProfile.params.detail_profile.phoneBlock,
                mainDetailProfile.params.detail_profile.phoneChange);
            e.preventDefault();
        });

        mainDetailProfile.params.btn.closePhone.click(function(e){
            toogleLink(mainDetailProfile.params.detail_profile.phoneBlock,
                mainDetailProfile.params.detail_profile.phoneChange);
            e.preventDefault();
        });

        mainDetailProfile.params.btn.openAccount.click(function(e){
            toogleLink(mainDetailProfile.params.detail_profile.AccountBlock,
                mainDetailProfile.params.detail_profile.AccountChange);
            e.preventDefault();
        });

        mainDetailProfile.params.btn.LinkCloseAccount.click(function(e){
            toogleLink(mainDetailProfile.params.detail_profile.AccountBlock,
                mainDetailProfile.params.detail_profile.AccountChange);
            e.preventDefault();
        });

        mainDetailProfile.params.btn.openPwd.click(function(e){
            toogleLink(mainDetailProfile.params.detail_profile.pwdBlock,
                mainDetailProfile.params.detail_profile.pwdchange);
            e.preventDefault();
        });

        mainDetailProfile.params.btn.LinkClosepwd.click(function(e){
            toogleLink(mainDetailProfile.params.detail_profile.pwdBlock,
                mainDetailProfile.params.detail_profile.pwdchange);
            e.preventDefault();
        });

        mainDetailProfile.params.btn.openAdresse.click(function(e){
            toogleLink(mainDetailProfile.params.detail_profile.AdresseBlock,
                mainDetailProfile.params.detail_profile.AdresseChange);
            e.preventDefault();
        });

        mainDetailProfile.params.btn.LinkCloseAdresse.click(function(e){
            toogleLink(mainDetailProfile.params.detail_profile.AdresseBlock,
                mainDetailProfile.params.detail_profile.AdresseChange);
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
                edit(data, mainDetailProfile.params.api.editCountry,
                    mainDetailProfile.params.detail_profile.countryblock, mainDetailProfile.params.detail_profile.countryChange)
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
                edit(data, mainDetailProfile.params.api.addPhone,
                    mainDetailProfile.params.detail_profile.phoneBlock, mainDetailProfile.params.detail_profile.phoneChange)

            }
            e.preventDefault();
        });


        ////AMODIFIER LES INFORMATIONS PERSONNELLES
        mainDetailProfile.params.btn.LinkSaveInfoPerso.click(function(e){
            mainProfile_detail.params.bg_action.fadeIn();
            var data = {id:currentUser.id,
                email:mainDetailProfile.params.form.email.val(),
                lastName:mainDetailProfile.params.form.lastname.val(),
                firstName:mainDetailProfile.params.form.firstName.val(),
                city:mainDetailProfile.params.form.city.val(),
                profession:mainDetailProfile.params.form.profession.val(),
                day:mainDetailProfile.params.form.day.val(),
                year:mainDetailProfile.params.form.year.val(),
                sexe:mainDetailProfile.params.form.gender.val(),
                birthDate: mainDetailProfile.params.form.day.val()+"-"+mainDetailProfile.params.form.month.val()+"-"+mainDetailProfile.params.form.year.val(),
                month:mainDetailProfile.params.form.month.val()
            };
            // console.log(data.pays.length);
            if(data.day.length == 0 ||data.year.length == 0 ||data.month.length == 0 ){
                bootbox.alert("Veuillez veriifier votre date de naissance", function(){});
                mainProfile_detail.params.bg_action.fadeOut();
            }else{
                edit(data, mainDetailProfile.params.api.infoPerso,
                    mainDetailProfile.params.detail_profile.infoPersoBlock, mainDetailProfile.params.detail_profile.infoPersoChange)

            }
            e.preventDefault();
        });


       ////=====MODIFIE LE BLOCK ADRESSE
        mainDetailProfile.params.btn.LinkSaveAdresse.click(function(e){
            mainProfile_detail.params.bg_action.fadeIn();
            var data = {id:currentUser.id,
                        city:mainDetailProfile.params.form.city.val(),
                        profession:mainDetailProfile.params.form.profession.val()
            };
            // console.log(data.pays.length);
            if(data.city.length == 0 ||data.profession.length == 0 ){
                bootbox.alert("Veuillez veriifier vos champs", function(){});
                mainProfile_detail.params.bg_action.fadeOut();
            }else{
                edit(data, mainDetailProfile.params.api.editAdresse,
                    mainDetailProfile.params.detail_profile.AdresseBlock, mainDetailProfile.params.detail_profile.AdresseChange)

            }
            e.preventDefault();
        });

        ////=====MODIFIE LE BLOCK ACCOUNT
        mainDetailProfile.params.btn.LinkSaveAccount.click(function(e){
            mainProfile_detail.params.bg_action.fadeIn();
            var data = {id:currentUser.id,
                        email:mainDetailProfile.params.form.email.val(),
                        username:mainDetailProfile.params.form.userName.val()
            };
            // console.log(data.pays.length);
            if(data.email.length == 0 ||data.username.length == 0 ){
                bootbox.alert("Veuillez veriifier vos champs", function(){});
                mainProfile_detail.params.bg_action.fadeOut();
            }
            else if(!validateEmail(data.email)){
                bootbox.alert("Veuillez veriifier votre email", function(){});
                mainProfile_detail.params.bg_action.fadeOut();
            }
            else{
                edit(data, mainDetailProfile.params.api.editAccount,
                    mainDetailProfile.params.detail_profile.AccountBlock, mainDetailProfile.params.detail_profile.AccountChange)

            }
            e.preventDefault();
        });

       ////=====MODIFIE LE MOT DE PASSE
        mainDetailProfile.params.btn.LinkSavepwd.click(function(e){
            mainProfile_detail.params.bg_action.fadeIn();
            var data = {id:currentUser.id,
                        cpwd:mainDetailProfile.params.form.cpwd.val(),
                        npwd:mainDetailProfile.params.form.npwd.val(),
                        cfpwd:mainDetailProfile.params.form.cfpwd.val()
            };
            // console.log(data.pays.length);
            if(data.cpwd.length == 0 ||data.npwd.length == 0 ||data.cfpwd.length == 0 ){
                bootbox.alert("Veuillez veriifier vos champs", function(){});
                mainProfile_detail.params.bg_action.fadeOut();
            }
            else if(data.npwd != data.cfpwd){
                bootbox.alert("Confirm password not be same with new passeword", function(){});
                mainProfile_detail.params.bg_action.fadeOut();
            }
            else{
                edit(data, mainDetailProfile.params.api.editpwd,
                    mainDetailProfile.params.detail_profile.pwdBlock, mainDetailProfile.params.detail_profile.pwdchange)
            }
            e.preventDefault();
        });



        function edit(data, params, block, change){
            $.ajax({
                url:  params.url,
                type:  params.method,
                crossDomain: true,
                data : data,
                headers : {"X-Auth-Token" : currentUser.token},
                contentType: false,
                dataType:  params.type,
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
                    toogleLink(block,change);
                }
            });
        }

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

        function validateEmail(email) {
            var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(email);
        }



        function toogleLink(block,Change){
            block.toggleClass('hide');
            Change.toggleClass('hide');
            mainDetailProfile.params.form.phoneadd.val("");
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
            element.userName.html(val.username);
            var country = getCountry(countryList,val.country);
            var flag ="<img class='sm-img flag' src='"+path.flags+val.country+".png' alt=''/> ";
            element.country.html(flag + country);
            var chainePhones = "";


            //REMPLIR ES CHAMP POUR LA MODIFICATION
            //console.log(val.email);
            mainDetailProfile.params.form.email.val(val.email);
            mainDetailProfile.params.form.userName.val(val.username);
            mainDetailProfile.params.form.firstName.val(val.firstName);
            mainDetailProfile.params.form.lastname.val(val.lastName);
            mainDetailProfile.params.form.city.val(val.city);
            mainDetailProfile.params.form.profession.val(val.profession);
            mainDetailProfile.params.form.gender.val(val.gender);

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