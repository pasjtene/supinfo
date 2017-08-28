/**
 * Created by Danick takam on 16/06/2017.
 */

var MainDetailProfile = function()
{
    this.params = {
        sub : $("#Main-Subdetail-detail-User"),
        item: $("#Main-Subdetails-Detail-User"),
        active_tab : $("#Main-Subphotos #active-photo-tab"),
        var: {
            schools:null,
            OldUp:null,
            country: null
        },
        html: $("html"),
        form: {
            country : $("#Main-Subdetail-detail-User #country"),
            countryc : $("#Main-Subdetail-detail-User #countryc"),
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
            phones : $("#Main-Subdetail-detail-User #phones"),
            cpwd : $("#Main-Subdetail-detail-User #cpwd"),
            npwd : $("#Main-Subdetail-detail-User #npwd"),
            cfpwd : $("#Main-Subdetail-detail-User #cfpwd"),
            gender : $("#Main-Subdetail-detail-User #gender"),
            schoolname : $("#Main-Subdetail-detail-User #schoolname"),
            location : $("#Main-Subdetail-detail-User #location"),
            highlevel : $("#Main-Subdetail-detail-User #highlevel"),
            numberOfChill : $("#Main-Subdetail-detail-User #numberOfChill"),
            maritalStatus : $("#Main-Subdetail-detail-User #maritalStatus"),
            meetLike : $("#Main-Subdetail-detail-User #meetLike"),
            bio : $("#Main-Subdetail-detail-User #bio"),
            yearC : $("#Main-Subdetail-detail-User #yearC"),
            Qualification : $("#Main-Subdetail-detail-User #Qualification"),
            reason : $("#Main-Subdetail-detail-User #reason")
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
            },
            addSchool:
            {
                url : baseUrl+"auth/user/compte/addSchool",
                method: "get",
                type: "json"
            },
            delSchool:
            {
                url : baseUrl+"auth/user/compte/delSchool",
                method: "get",
                type: "json"
            },
            editSchool:
            {
                url : baseUrl+"auth/user/compte/editSchool",
                method: "get",
                type: "json"
            },
            about:
            {
                url : baseUrl+"auth/user/compte/about",
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
            school : $("#Main-Subdetail-detail-User .detail_profile_school"),
            meetLike : $("#Main-Subdetail-detail-User .detail_profile_meetLike"),
            bio : $("#Main-Subdetail-detail-User .detail_profile_bio"),
            maritalStatus : $("#Main-Subdetail-detail-User .detail_profile_maritalStatus"),
            numberOfChill : $("#Main-Subdetail-detail-User .detail_profile_numberOfChill"),
            reason : $("#Main-Subdetail-detail-User .detail_profile_reason"),
            country_v : $("#Main-Subdetail-detail-User .detail_ville_pays"),
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
            pwdchange : $("#Main-Subdetail-detail-User .helpers"),
            SchoolBlock : $("#Main-Subdetail-detail-User .SchoolBlock"),
            aboutChange : $("#Main-Subdetail-detail-User .aboutChange"),
            aboutBlock : $("#Main-Subdetail-detail-User .aboutBlock"),
            SchoolChange : $("#Main-Subdetail-detail-User .SchoolChange")
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
            openPwd : $("#Main-Subdetail-detail-User .openPwd"),
            LinkSaveSchool : $("#Main-Subdetail-detail-User .LinkSaveSchool"),
            LinkCloseSchool : $("#Main-Subdetail-detail-User .LinkCloseSchool"),
            openSchool : $("#Main-Subdetail-detail-User .openSchool"),
            LinkCloseAbout : $("#Main-Subdetail-detail-User .LinkCloseAbout"),
            LinkSaveAbout : $("#Main-Subdetail-detail-User .LinkSaveAbout"),
            openAbout : $("#Main-Subdetail-detail-User .openAbout"),
            LinkDelSchool : $("#Main-Subdetail-detail-User .LinkDelSchool")
        }
    };

};

$(function(){

    var mainDetailProfile = new MainDetailProfile();
    var mainProfile_detail = new MainUserProfile();




    if(mainDetailProfile.params.sub.data('sub')=="Main-Subdetail-detail-User" && mainDetailProfile.params.active_tab.val()==4)
    {

        mainDetailProfile.params.btn.openChange.click(function(e){
            mainProfile_detail.params.bg_action.fadeIn();
            loadCountry(mainDetailProfile.params.form.country);
            mainProfile_detail.params.bg_action.fadeOut();
            toogleLink(mainDetailProfile.params.detail_profile.countryblock, mainDetailProfile.params.detail_profile.countryChange);
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

        mainDetailProfile.params.btn.openAbout.click(function(e){
            toogleLink(mainDetailProfile.params.detail_profile.aboutBlock,
                mainDetailProfile.params.detail_profile.aboutChange);
            e.preventDefault();
        });

        mainDetailProfile.params.btn.LinkCloseAbout.click(function(e){
            toogleLink(mainDetailProfile.params.detail_profile.aboutBlock,
                mainDetailProfile.params.detail_profile.aboutChange);
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
           // toogleLink(mainDetailProfile.params.detail_profile.pwdBlock,
              //  mainDetailProfile.params.detail_profile.pwdchange);
            e.preventDefault();
        });

        mainDetailProfile.params.btn.LinkClosepwd.click(function(e){
            toogleLink(mainDetailProfile.params.detail_profile.pwdBlock,
                mainDetailProfile.params.detail_profile.pwdchange);
            e.preventDefault();
        });

        mainDetailProfile.params.btn.openSchool.click(function(e){
            //console.log(mainDetailProfile.params.schools);
            mainProfile_detail.params.bg_action.fadeIn();
            loadCountry(mainDetailProfile.params.form.countryc);
            mainProfile_detail.params.bg_action.fadeOut();
            toogleLink(mainDetailProfile.params.detail_profile.SchoolBlock,
                mainDetailProfile.params.detail_profile.SchoolChange);
            e.preventDefault();
        });

        mainDetailProfile.params.btn.LinkCloseSchool.click(function(e){
            toogleLink(mainDetailProfile.params.detail_profile.SchoolBlock,
                mainDetailProfile.params.detail_profile.SchoolChange);
            schoolTrach();
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


        ////MODIFIER LE BLOCK ABOUT
        mainDetailProfile.params.btn.LinkSaveAbout.click(function(e){
            mainProfile_detail.params.bg_action.fadeIn();
            var data = {id:currentUser.id,
                numberOfChill: parseInt(mainDetailProfile.params.form.numberOfChill.val()),
                bio:mainDetailProfile.params.form.bio.val(),
                meetLike:mainDetailProfile.params.form.meetLike.val(),
                reason:mainDetailProfile.params.form.reason.val(),
                maritalStatus:mainDetailProfile.params.form.maritalStatus.val()
            };
            //console.log(data);
            edit(data, mainDetailProfile.params.api.about,
                mainDetailProfile.params.detail_profile.aboutBlock, mainDetailProfile.params.detail_profile.aboutChange)
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
                phones:mainDetailProfile.params.form.phones.val(),
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
            edit(data, mainDetailProfile.params.api.editAdresse,
                mainDetailProfile.params.detail_profile.AdresseBlock, mainDetailProfile.params.detail_profile.AdresseChange)

            e.preventDefault();
        });

        ////=====EFFACER LE SCHOOL
        mainDetailProfile.params.btn.LinkDelSchool.click(function(e){
            mainProfile_detail.params.bg_action.fadeIn();
            var data = {
                id:parseInt(currentUser.id),
                idschool:parseInt(mainDetailProfile.params.var.OldUp)
            };
            bootbox.confirm("I you sure you wont to delete ?",function(res){
                if(res){
                    $.ajax({
                        url:  mainDetailProfile.params.api.delSchool.url,
                         type:  mainDetailProfile.params.api.delSchool.method,
                         crossDomain: true,
                         data : data,
                         headers : {"X-Auth-Token" : currentUser.token},
                         contentType: false,
                         dataType:  mainDetailProfile.params.api.delSchool.type,
                         success: function(response){ // en cas de success
                         if(response!=null && response!="null")
                         {
                             if(response.error != undefined){
                             bootbox.alert(response.error, function(){});

                             }
                             else{
                                 setSchool(mainDetailProfile.params.detail_profile, response.schools);
                             }
                         }
                         },
                         error: function (xhr, status, message) { //en cas d'erreur
                            console.log(status+"\n"+xhr.responseText + '\n' + message );
                         },
                         complete:function(){
                            mainProfile_detail.params.bg_action.fadeOut();
                             toogleLink(mainDetailProfile.params.detail_profile.SchoolBlock, mainDetailProfile.params.detail_profile.SchoolChange);
                         }
                     });
                }
                else{
                    mainProfile_detail.params.bg_action.fadeOut();
                }

            })

        });

       /////=====MODIFIE LE SCHOOL
        function editSchool(id){

            var school = null;
            var sc = mainDetailProfile.params.var.schools;
            mainProfile_detail.params.bg_action.fadeIn();
            loadCountry(mainDetailProfile.params.form.countryc);
            for(var elt = 0; elt < sc.length; elt++){
                if(sc[elt].id == id )
                    school = sc[elt];
            }

            if(school != null)
            {
                toogleLink(mainDetailProfile.params.detail_profile.SchoolBlock,mainDetailProfile.params.detail_profile.SchoolChange);
                mainDetailProfile.params.form.schoolname.val(school.name);
                mainDetailProfile.params.form.countryc.val(school.country);
                mainDetailProfile.params.form.location.val(school.city);
                mainDetailProfile.params.form.yearC.val(school.year);
                mainDetailProfile.params.form.Qualification.val(school.qualification);
                mainDetailProfile.params.form.highlevel.val(school.highLevel);
                mainDetailProfile.params.var.OldUp = school.id;
                mainDetailProfile.params.btn.LinkDelSchool.toggleClass('hide');
            }
            mainProfile_detail.params.bg_action.fadeOut();
        };

       ////=====AJOUTER ET modifierer LE SCHOOL
        mainDetailProfile.params.btn.LinkSaveSchool.click(function(e){
            mainProfile_detail.params.bg_action.fadeIn();
            var data = {id:currentUser.id,
                        idschool: mainDetailProfile.params.var.OldUp,
                        name:mainDetailProfile.params.form.schoolname.val(),
                        city:mainDetailProfile.params.form.location.val(),
                        country:mainDetailProfile.params.form.countryc.val(),
                        year:mainDetailProfile.params.form.yearC.val(),
                        Qualification:mainDetailProfile.params.form.Qualification.val(),
                        level:mainDetailProfile.params.form.highlevel.val()
            };

            if(data.name.length == 0  ){
                bootbox.alert("Veuillez veriifier vos champs", function(){});
                mainProfile_detail.params.bg_action.fadeOut();
            }
            else{

                var School = null;
                if(data.idschool == null){
                    School = mainDetailProfile.params.api.addSchool;
                }else{
                    School = mainDetailProfile.params.api.editSchool;
                }
                $.ajax({
                    url:  School.url,
                    type:  School.method,
                    crossDomain: true,
                    data : data,
                    headers : {"X-Auth-Token" : currentUser.token},
                    contentType: false,
                    dataType:  School.type,
                    success: function(response){

                        if(response!=null && response!="null")
                        {
                            if(response.error != undefined){
                                bootbox.alert(response.error, function(){});
                            }
                            else{
                                setSchool(mainDetailProfile.params.detail_profile, response.schools);
                            }
                        }
                    },
                    error: function (xhr, status, message) { //en cas d'erreur
                        console.log(status+"\n"+xhr.responseText + '\n' + message );
                    },
                    complete:function(){

                        mainProfile_detail.params.bg_action.fadeOut();
                        toogleLink(mainDetailProfile.params.detail_profile.SchoolBlock, mainDetailProfile.params.detail_profile.SchoolChange);
                    }
                });

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
                        if(response.error != undefined){
                            bootbox.alert(response.error, function(){});
                        }
                        else{
                            if(response.userProfile != "null" && response.userProfile != null){
                                var  user  = response.userProfile.user;  // recuperer le user
                                var  profile  = response.userProfile;
                            }else{
                                var  user  = response.user;  // recuperer le user
                            }
                            setdetailAll(mainDetailProfile.params.detail_profile, user, profile);
                        }

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
                        if(response.userProfile != "null" && response.userProfile != null){
                            var  user  = response.userProfile.user;  // recuperer le user
                            var  profile  = response.userProfile;  // recuperer le profile
                            var  geolocation  = response.userProfile.geolocation;  // recuperer les informations sur son plan de localisation lors de la connexion a ne pas modifier ces info

                        }else{
                            var  user  = response.user;  // recuperer le user
                            //bootbox.alert("Nombre d'utilisateur present  dans la base de donn�e : " + user.fullname, function(){});
                        }
                        if(response.photo != null && response.photo != 'null'){
                            mainDetailProfile.params.photo.attr('src', baseHost+response.photo.path);
                        }else{
                            mainDetailProfile.params.photo.attr('src', path.emptyImage);
                        }

                        setdetailAll(mainDetailProfile.params.detail_profile, user, profile);
                        setSchool(mainDetailProfile.params.detail_profile, response.schools);
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

        function loadCountry(block){
            var chargerPays = setInterval(function(){
                //mainDetailProfile.params.var.country = true;
                $.getJSON(block.data("country"), function(data){
                    //mainRegister.params.form.country.empty();
                    $.each(data,function(index,value){
                        var option = "<option  value='"+index+"'>"+value+"</option>";
                        block.append(option);
                    });
                });
                clearInterval(chargerPays);
            },100);
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

        function schoolTrach(){
            mainDetailProfile.params.form.schoolname.val("");
            mainDetailProfile.params.form.location.val("");
            mainDetailProfile.params.form.highlevel.val("");
            mainDetailProfile.params.form.Qualification.val("");
            if(mainDetailProfile.params.var.OldUp != null){
                mainDetailProfile.params.var.OldUp = null;
                mainDetailProfile.params.btn.LinkDelSchool.toggleClass('hide');
            }
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

        function setdetailAll(element, val, profile){
            //console.log(val);
            element.name.html(val.fullname);
            element.sex.html(val.gender);
            element.city.html(val.city);
            element.email.html(val.email);
            element.birthday.html(new Date(val.birthDate).toLocaleDateString());
            element.profession.html(val.profession);
            element.userName.html(val.username);
            element.reason.html(val.joinReason);

            var country = getCountry(countryList,val.country);
            var flag ="<img class='sm-img flag' src='"+path.flags+val.country+".png' alt=''/> ";
            element.country.html(flag + country);
            element.country_v.html(flag + country);
            var chainePhones = "";

            if(profile != null){

                if(profile.aboutMe != null){
                    element.bio.html(profile.aboutMe);
                }

                if(profile.childNumber != null){
                    element.numberOfChill.html(profile.childNumber);
                }
                var maritalStatus;

                if(profile.meetLike != null){
                    element.meetLike.html(profile.meetLike);
                }

                if(profile.maritalStatus != null){
                    element.maritalStatus.html(profile.maritalStatus);
                }
                mainDetailProfile.params.form.bio.val(profile.aboutMe);
                mainDetailProfile.params.form.numberOfChill.val(profile.childNumber);
                mainDetailProfile.params.form.maritalStatus.val(profile.maritalStatus);
                mainDetailProfile.params.form.meetLike.val(profile.meetLike);
            }

            //REMPLIR ES CHAMP POUR LA MODIFICATION
            //console.log(val.email);
            mainDetailProfile.params.form.email.val(val.email);
            mainDetailProfile.params.form.userName.val(val.username);
            mainDetailProfile.params.form.firstName.val(val.firstName);
            mainDetailProfile.params.form.lastname.val(val.lastName);
            if(val.city != null){
                mainDetailProfile.params.form.city.val(val.city);
            }


            if(val.joinReason != null){
                mainDetailProfile.params.form.reason.val(val.joinReason);
            }

            if(val.profession != null){
                mainDetailProfile.params.form.profession.val(val.profession);
            }
            mainDetailProfile.params.form.gender.val(val.gender);
            var m = new Date(val.birthDate).getMonth();
            //console.log(m);
            mainDetailProfile.params.form.month.val(m+1);
            mainDetailProfile.params.form.day.val(new Date(val.birthDate).getDate());
            mainDetailProfile.params.form.year.val(new Date(val.birthDate).getFullYear());

            if(val.phones != null){
                element.phones.html(val.phones[0]);
                mainDetailProfile.params.form.phones.val(val.phones[0]);
                for(var i = 0; i < val.phones.length; i++){
                    //console.log(chainePhones);
                    chainePhones += "<span class='phonedet '> " +
                        "<span>"+ val.phones[i] +"</span> &nbsp;&nbsp;"+
                        "<a data-phone='"+ val.phones[i] +"' class='deletephone fa fa-2x fa-close' href='#'></a>"+
                        " </span><br>";
                }
            }
            //AFFICHE TOUS LES PHONES
            /*element.phones.html(chainePhones);
            mainDetailProfile.params.btn.deletePhone = $("#Main-Subdetail-detail-User .deletephone");
            mainDetailProfile.params.btn.deletePhone.click(function(e){
                deletePhone($(this).data('phone'));
                //bootbox.alert("phone" + $(this).data('phone'), function(){});
                e.preventDefault();
            });*/
        }

        function setSchool(elt, school){
            var ch = "";
            schoolTrach();
            mainDetailProfile.params.var.schools = school;
            //console.log(school);
            if(school != null){
                for(var i = 0; i < school.length; i++){
                    var flag ="<img class='sm-img flag' src='"+path.flags+school[i].country+".png' alt=''/> ";
                    ch += '<li class="list-group-item">' +
                        '<span class=""><a data-school="'+school[i].id+'" class=" deleteschool fa fa-2x fa-edit   " href="#"></a>&nbsp; &nbsp;'+
                        ''+school[i].name+'&nbsp; &nbsp; '+flag + school[i].city+'&nbsp; &nbsp; '+ school[i].highLevel +'&nbsp; &nbsp; '+ school[i].year+'</span> ' +
                        '</li>'
                }
                elt.school.html(ch);
                mainDetailProfile.params.btn.deleteschool = $("#Main-Subdetail-detail-User .deleteschool");
                mainDetailProfile.params.btn.deleteschool.click(function(e){
                    editSchool($(this).data('school'));
                    //bootbox.alert("phone" + $(this).data('phone'), function(){});
                    e.preventDefault();
                });
            }
        }
        // fon fait  l'appel  du fichier
        getCompte(currentUser.id);


    }
});