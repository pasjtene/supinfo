/**
 * Created by Danick takam on 16/06/2017.
 */

var MainRegister = function()
{
    this.params = {
        page : $('#mainRegister'),
        modalSave: $("#modalSave"),
        modal_body : $("#modalSave .modal-body center"),
        bg_action:$('#bg-action'),
        form: {
            name : $("#name"),
            email : $("#email"),
            birthday : $("#birthday"),
            gender : $("#gender"),
            reason : $("#reason"),
            password : $("#password"),
            confirmpassword : $("#confirmpassword"),
            profession : $("#profession"),
            country : $("#country"),
            lastname : $("#lastname"),
            btnregister: $("#btnsave"),
            countryList: $("#countryList"),
            day: $('#day'),
            month: $('#month'),
            year: $('#year')
        },
        api:{
            action :
            {save: baseUrl +"auth/register"},
            method:
            {post:"POST"},
            headers:
            {auth: "X-Auth-Token"}
        },
        required:{
            name : $("#block-name"),
            lastname : $("#block-lastname"),
            email : $("#block-email"),
            birthday : $("#block-birthday"),
            gender : $("#block-gender"),
            reason : $("#block-reason"),
            password : $("#block-password"),
            confirmpassword : $("#block-confirmpassword"),
            profession : $("#block-profession"),
            country : $("#block-country"),
            btnregister: $("#block-btnregister"),
            countryList: $("#block-countryList"),
            day: $('#block-day'),
            month: $('#block-month'),
            year: $('#block-year'),
            errorMessage: $("#errorMessage"),
            errorMessageText: $("#errorMessage span"),
        }
    };

};

function enableTolltip(element) {
    $(element).tooltip({
        position: {
            my: "center bottom-30",
            at: "center left",
            using: function (position, feedback) {
                //alert(this);
                $(this).css(position);
                $("<div>")
                    .addClass("arrow")
                    .addClass(feedback.vertical)
                    .addClass(feedback.horizontal)
                    .appendTo(this);

            }
        }
    });
}


$(function(){

    //enableTolltip("#name");
    //enableTolltip("#email");



    //instancier la classe MainRegister

    var mainRegister = new MainRegister();

    //tester si  nous somme dans la page d'enregistrement
    if(mainRegister.params.page.data('page')=="mainRegister")
    {

        //fonction de verifications des valeurs saisies par l'utilisateur
        function verify(user)
        {
            var appMain = new AppMain();
            var  test= false;


            test= appMain.function.notValid(user.lastname,2,100);
            if(test){
                return  $("#"+mainRegister.params.required.lastname.attr('id')+" ."+appMain.params.required.form_control_feedback).text();
            }

            test=notValidName(user.lastname);
            if(test){
                return  $("#"+mainRegister.params.required.lastname.attr('id')+" ."+appMain.params.required.form_control_feedback).text();
            }

            test= appMain.function.notValid(user.firstname,2,100);
            if(test){
                return  $("#"+mainRegister.params.required.name.attr('id')+" ."+appMain.params.required.form_control_feedback).text();
            }
            test=notValidName(user.firstname);
            if(test){
                return  $("#"+mainRegister.params.required.name.attr('id')+" ."+appMain.params.required.form_control_feedback).text();
            }


            test= notValidMail(user.email);
            if(test){
                return  $("#"+mainRegister.params.required.email.attr('id')+" ."+appMain.params.required.form_control_feedback).text();
            }

            test= appMain.function.notValid(user.country,1,100);
            if(test){
                return  $("#"+mainRegister.params.required.country.attr('id')+" ."+appMain.params.required.form_control_feedback).text();
            }

            test= appMain.function.notValid(mainRegister.params.form.day.val(),1,10);
            if(test){
                return  $("#"+mainRegister.params.required.day.attr('id')+" ."+appMain.params.required.form_control_feedback).text();
            }

            test= appMain.function.notValid(mainRegister.params.form.month.val(),1,10);
            if(test){
                return  $("#"+mainRegister.params.required.month.attr('id')+" ."+appMain.params.required.form_control_feedback).text();
            }

            test= appMain.function.notValid(mainRegister.params.form.year.val(),1,10);
            if(test){
                return  $("#"+mainRegister.params.required.year.attr('id')+" ."+appMain.params.required.form_control_feedback).text();
            }

            test= appMain.function.notValid(user.gender,1,8);
            if(test){
                return  $("#"+mainRegister.params.required.gender.attr('id')+" ."+appMain.params.required.form_control_feedback).text();
            }
            test= appMain.function.notValid(user.joinReason,1,100);
            if(test){
                return  $("#"+mainRegister.params.required.reason.attr('id')+" ."+appMain.params.required.form_control_feedback).text();
            }
            test= appMain.function.notValid(user.password,5,100);
            if(test){
                return  $("#"+mainRegister.params.required.password.attr('id')+" ."+appMain.params.required.form_control_feedback).text();
            }

            /* test= notConfirm(mainRegister.params.form.confirmpassword,mainRegister.params.form.password);
             if(test){
             return  $("#"+mainRegister.params.required.confirmpassword.attr('id')+" ."+appMain.params.required.form_control_feedback).text();
             }
             */
            return test;
        }


        //donner le focus au chargement  de la page au  champs name
        mainRegister.params.form.name.focus();

        // rendre le champs birthday  en datepicker
        // mainRegister.params.form.birthday.datepicker();


        var intervalbad =setInterval(function(){
            if(geolocationbad !=null )
            {
                //console.log("bad : " + geolocationbad);
                //il faut  marcher
                //charger la liste des pays
                $.getJSON(mainRegister.params.form.country.data("country"), function(data){
                    //mainRegister.params.form.country.empty();
                    $.each(data,function(index,value){
                        var option = "<option  value='"+index+"'>"+value+"</option>";
                        mainRegister.params.form.country.append(option);
                    });
                });
                clearInterval(intervalbad);
            }
        },100);



        // alert(mainRegister.params.form.country.data("country"))

        var interval =setInterval(function(){
            if(countryList!=null && geolocation!=null)
            {
                //console.log(geolocation);
                $.each(countryList,function(index,value){
                    // console.log(value.value, value.code);
                    if(value.code==geolocation.countryCode || value.value==geolocation.countryName || value.code == geolocation.countryName ||  value.value ==geolocation.countryCode )
                    {
                        console.log("the same country --- user country : "+ geolocation.countryName + " => select country : "+value.value);
                        var option = "<option selected value='"+value.code+"'>"+value.value+"</option>"
                    }
                    else
                    {
                        var option = "<option  value='"+value.code+"'>"+value.value+"</option>"
                    }

                    mainRegister.params.form.country.append(option);
                });
                clearInterval(interval);
            }
        },100);

        //charger tous les jours
        /*for(var i= 1;i<32;i++)
         {
         var option = "<option value='"+ (i<10? "0"+i: i) +"'>"+ (i<10? "0"+i: i) +"</option>"
         mainRegister.params.form.day.append(option);
         }*/

        //charger tous les mois
        /* for(var i= 1;i<13;i++)
         {
         var option = "<option value='"+ (i<10? "0"+i: i) +"'>"+ (i<10? "0"+i: i) +"</option>"
         mainRegister.params.form.month.append(option);
         }*/

        //recuperer la date du  jour
        // var today=new Date();
        //recuperer le mois du  jour
        // var currentyear = today.getFullYear();

        //accorder les enfants ages d'au moins 5ans à   s'enregistrer
        //currentyear-=5;

        //charger les annees par ordre décroissant
        /* for(var i= currentyear;i>1959;i--)
         {
         var option = "<option value='"+i+"'>"+i+"</option>"
         mainRegister.params.form.year.append(option);
         }*/

        //evenement  du  clic  sur le bouton enregistre
        mainRegister.params.form.btnregister.click(function (e) {

            //empecher la soumission du  formulaire
            e.preventDefault();

            //url
            var  url =  Routing.generate("main_emailConfirm",
                {   _locale:locale,
                    name: mainRegister.params.form.lastname.val() + " " + mainRegister.params.form.name.val(),
                    email: mainRegister.params.form.email.val(),
                    password: mainRegister.params.form.password.val()
                },true);

            var  confirm =  Routing.generate("main_confirm",
                {   _locale:locale,
                    email: mainRegister.params.form.email.val(),
                    password: mainRegister.params.form.password.val(),
                    pkeyfs: mainRegister.params.form.password.val()+mainRegister.params.form.email.val()
                },true);

            var logo = Routing.generate("main_homepage", {_locale:locale}, true);
            logo = logo.replace("/en/","/");
            logo = logo.replace("/fr/","/");
            logo += "logo.ico";


            //les paramètres du  mail
            var  params ={
                name: mainRegister.params.form.lastname.val() + " " + mainRegister.params.form.name.val(),
                email: mainRegister.params.form.email.val(),
                password: mainRegister.params.form.password.val(),
                objet:"",
                logo: logo,
                url: url,
                confirm: confirm,
                locale:locale,
                urlPassword: Routing.generate("main_forgot_password",{_locale:locale}, true)
            };

            //instanicier le user et  charger avec les valeurs de la bd
            var User =
            {
                firstname: mainRegister.params.form.name.val(),
                birthDate: mainRegister.params.form.day.val()+"-"+mainRegister.params.form.month.val()+"-"+mainRegister.params.form.year.val(),
                profession: mainRegister.params.form.profession.val(),
                type: "Normal",
                joinReason: mainRegister.params.form.reason.val(),
                gender: mainRegister.params.form.gender.val(),
                email: mainRegister.params.form.email.val().trim(),
                password: mainRegister.params.form.password.val(),
                country: mainRegister.params.form.country.val(),
                lastname: mainRegister.params.form.lastname.val(),
                params: JSON.stringify(params)
                /*
                 isOnline: false,
                 relationshipStatus: null,
                 joinDate: new Date(),
                 isEmailVerified: false,
                 isVip:  false,
                 phones: array(),
                 profileVisibility: array
                 */
            };

            //verifier si  tous les champs sont remplis
            if (verify(User)) {
                //print error message
                // alert(verify(User));
                mainRegister.params.required.errorMessage.slideDown();
                mainRegister.params.required.errorMessageText.text(verify(User));
            } else {

                // alert(mainRegister.params.api.action.save);
                //jQuery.support.cors = true;
                //alert(User.joinReason);
                //console.log(params);
                //alert(params);
                // mainRegister.params.modalSave.modal('show');
                mainRegister.params.bg_action.fadeIn();
                // implementer l'enregistrement  proprement  dit avec ajax
                $.ajax(
                    {
                        url: mainRegister.params.api.action.save,
                        crossDomain: true,
                        headers : {"X-Auth-Token" : tokenbase.value},
                        type: mainRegister.params.api.method.post,
                        data: User,
                        success: function (data) { //lorsque tout c'est bien passe

                            // mainRegister.params.modal_body.empty();
                            //mainRegister.params.modal_body.text(mainRegister.params.modalSave.data('confirm'));
                            //mainRegister.params.modalSave.modal('hide');
                            //redirect  here
                            console.log(data);
                            params  ={
                                username:User.email,
                                password:User.password,
                                basetoken:tokenbase.value,
                                begin:"ok"};
                            $.ajax(
                                {
                                    url: Routing.generate('main_login', {_locale:locale}),
                                    crossDomain: true,
                                    type: mainRegister.params.api.method.post,
                                    data: params,
                                    success: function (reponse) { //lorsque tout c'est bien passe

                                        console.log(reponse);

                                        window.location.href = Routing.generate('main_photo_request',{_locale:locale});

                                    },
                                    error: function (xhr, status, message) { //en cas d'erreur
                                        console.log(status+"\n"+xhr.responseText + '\n' + message );
                                    }
                                }
                            );

                            /*  $.post(Routing.generate('main_login', {_locale:locale}),{  username:User.email, password:User.password, basetoken:tokenbase.value, begin:"ok"} , function(e){
                             window.location.href = Routing.generate('main_photo_request',{_locale:locale});
                             });*/


                        },
                        error: function (xhr, status, message) { //en cas d'erreur
                            console.log(status+"\n"+xhr.responseText + '\n' + message );
                        }
                    }
                );
            }
        });

        // instanciation sz la  classe heper (AppMain) pour recuperer les classe d'erreurs et  success
        var appMain = new AppMain();
        //validation du  formualire au touche

        // 1-a) validation du champs name
        // mainRegister.params.form.name.focus(function(){
        //   appMain.function.validate(mainRegister.params.required.name,appMain.params.required.has_danger,appMain.params.required.has_success,mainRegister.params.form.name,appMain.params.required.form_control_danger,appMain.params.required.form_control_success,mainRegister.params.required.name,appMain.params.required.form_control_feedback,3,100);
        //});
        mainRegister.params.form.name.change(function(){
            if (notValidName(mainRegister.params.form.name.val())){
                enableTolltip(mainRegister.params.form.name);
                mainRegister.params.form.name.tooltip("enable");
            }else{
                mainRegister.params.form.name.tooltip('disable');
            }
            validFormat(false,mainRegister.params.required.name,appMain.params.required.has_danger,appMain.params.required.has_success,mainRegister.params.form.name,appMain.params.required.form_control_danger,appMain.params.required.form_control_success,mainRegister.params.required.name,appMain.params.required.form_control_feedback,2,100);
        });

        // 1-b) validation du champ lastname
        // mainRegister.params.form.name.focus(function(){
        //   appMain.function.validate(mainRegister.params.required.name,appMain.params.required.has_danger,appMain.params.required.has_success,mainRegister.params.form.name,appMain.params.required.form_control_danger,appMain.params.required.form_control_success,mainRegister.params.required.name,appMain.params.required.form_control_feedback,3,100);
        //});
        mainRegister.params.form.lastname.change(function(){
            if (notValidName(mainRegister.params.form.lastname.val())){
                enableTolltip(mainRegister.params.form.lastname);
                mainRegister.params.form.lastname.tooltip("enable");
            }else{
                mainRegister.params.form.lastname.tooltip('disable');
            }
            validFormat(false,mainRegister.params.required.lastname,appMain.params.required.has_danger,appMain.params.required.has_success,mainRegister.params.form.lastname,appMain.params.required.form_control_danger,appMain.params.required.form_control_success,mainRegister.params.required.lastname,appMain.params.required.form_control_feedback,2,100);
        });

        //mainRegister.params.form.name.mouseleave(function(){
        //  appMain.function.validate(mainRegister.params.required.name,appMain.params.required.has_danger,appMain.params.required.has_success,mainRegister.params.form.name,appMain.params.required.form_control_danger,appMain.params.required.form_control_success,mainRegister.params.required.name,appMain.params.required.form_control_feedback,3,100);
        //});


        // 2- validation du champs email

        /* mainRegister.params.form.email.focus(function(){
         appMain.function.validate(mainRegister.params.required.email,appMain.params.required.has_danger,appMain.params.required.has_success,mainRegister.params.form.email,appMain.params.required.form_control_danger,appMain.params.required.form_control_success,mainRegister.params.required.email,appMain.params.required.form_control_feedback,8,100);
         });
         mainRegister.params.form.email.keyup(function(){
         appMain.function.validate(mainRegister.params.required.email,appMain.params.required.has_danger,appMain.params.required.has_success,mainRegister.params.form.email,appMain.params.required.form_control_danger,appMain.params.required.form_control_success,mainRegister.params.required.email,appMain.params.required.form_control_feedback,8,100);
         });
         mainRegister.params.form.email.mouseleave(function(){
         appMain.function.validate(mainRegister.params.required.email,appMain.params.required.has_danger,appMain.params.required.has_success,mainRegister.params.form.email,appMain.params.required.form_control_danger,appMain.params.required.form_control_success,mainRegister.params.required.email,appMain.params.required.form_control_feedback,8,100);
         });
         */
        //email format
        mainRegister.params.form.email.change(function(){
            if (notValidMail(mainRegister.params.form.email.val())){
                enableTolltip(mainRegister.params.form.email);
                mainRegister.params.form.email.tooltip("enable");
            }else{
                mainRegister.params.form.email.tooltip('disable');
            }
            validFormat(true,mainRegister.params.required.email,appMain.params.required.has_danger,appMain.params.required.has_success,mainRegister.params.form.email,appMain.params.required.form_control_danger,appMain.params.required.form_control_success,mainRegister.params.required.email,appMain.params.required.form_control_feedback,8,100);
        });

        // 3- validation du champs county
        mainRegister.params.form.country.change(function(){
            if(mainRegister.params.form.country.val()===""){
                enableTolltip(mainRegister.params.form.country);
                mainRegister.params.form.country.tooltip("enable");
            } else {
                enableTolltip(mainRegister.params.form.country);
                mainRegister.params.form.country.tooltip("disable");
            }
            appMain.function.validate(mainRegister.params.required.country,appMain.params.required.has_danger,appMain.params.required.has_success,mainRegister.params.form.country,appMain.params.required.form_control_danger,appMain.params.required.form_control_success,mainRegister.params.required.country,appMain.params.required.form_control_feedback,1,100);
        });

        // 4- validation du champs jour
        mainRegister.params.form.day.change(function(){
            appMain.function.validate(mainRegister.params.required.day,appMain.params.required.has_danger,appMain.params.required.has_success,mainRegister.params.form.day,appMain.params.required.form_control_danger,appMain.params.required.form_control_success,mainRegister.params.required.day,appMain.params.required.form_control_feedback,1,100);
        });
        // 5- validation du champs mois
        mainRegister.params.form.month.change(function(){
            appMain.function.validate(mainRegister.params.required.month,appMain.params.required.has_danger,appMain.params.required.has_success,mainRegister.params.form.month,appMain.params.required.form_control_danger,appMain.params.required.form_control_success,mainRegister.params.required.month,appMain.params.required.form_control_feedback,1,100);
        });

        // 6- validation du champs année

        mainRegister.params.form.year.change(function(){
            appMain.function.validate(mainRegister.params.required.year,appMain.params.required.has_danger,appMain.params.required.has_success,mainRegister.params.form.year,appMain.params.required.form_control_danger,appMain.params.required.form_control_success,mainRegister.params.required.year,appMain.params.required.form_control_feedback,4,100);
        });


        // 8- validation du champs sexe
        mainRegister.params.form.gender.change(function(){
            appMain.function.validate(mainRegister.params.required.gender,appMain.params.required.has_danger,appMain.params.required.has_success,mainRegister.params.form.gender,appMain.params.required.form_control_danger,appMain.params.required.form_control_success,mainRegister.params.required.gender,appMain.params.required.form_control_feedback,1,100);
        });



        // 8- validation du champs reason

        mainRegister.params.form.reason.change(function(){
            appMain.function.validate(mainRegister.params.required.reason,appMain.params.required.has_danger,appMain.params.required.has_success,mainRegister.params.form.reason,appMain.params.required.form_control_danger,appMain.params.required.form_control_success,mainRegister.params.required.reason,appMain.params.required.form_control_feedback,1,100);
        });

        // 9- validation du champs password

        mainRegister.params.form.password.keyup(function(){
            appMain.function.validate(mainRegister.params.required.password,appMain.params.required.has_danger,appMain.params.required.has_success,mainRegister.params.form.password,appMain.params.required.form_control_danger,appMain.params.required.form_control_success,mainRegister.params.required.password,appMain.params.required.form_control_feedback,5,100);
        });


        // 10 - cinfirm password
        /* mainRegister.params.form.confirmpassword.keyup(function(){
         confirmPass(mainRegister.params.required.confirmpassword,appMain.params.required.has_danger,appMain.params.required.has_success,mainRegister.params.form.confirmpassword,appMain.params.required.form_control_danger,appMain.params.required.form_control_success,mainRegister.params.required.confirmpassword,appMain.params.required.form_control_feedback,mainRegister.params.form.password);
         });
         */


        function confirmPass(fatherElement,fatherError,fatherSuccess, childElement, childError, childSuccess, errorElement, classError,compare)
        {
            if (childElement.val().trim() == "" || childElement.val() != compare.val()) {
                //supprimer la classe success si  elle exite dans le parent
                appMain.function.removeclass(fatherElement,fatherSuccess);

                //ajout  de la classe has-danger
                appMain.function.addclass(fatherElement,fatherError);

                //supprimer la classe success si  elle exite dans le controle enfant
                appMain.function.removeclass(childElement,childSuccess);

                //ajout  de la classe form-control-danger
                appMain.function.addclass(childElement, childError);

                //activation de l'erreur
                appMain.function.show($("#"+errorElement.attr('id')+" ."+classError))

            }
            else {
                //supprimer la classe error si  elle exite dans le parent
                appMain.function.removeclass(fatherElement,fatherError);

                //ajout  de la classe has-success
                appMain.function.addclass(fatherElement,fatherSuccess);

                //supprimer la classe error si  elle exite dans le controle enfant
                appMain.function.removeclass(childElement,childError);

                //ajout  de la classe form-control-success
                appMain.function.addclass(childElement, childSuccess);

                //cacher le message d'erreur
                appMain.function.hide($("#"+errorElement.attr('id')+" ."+classError))
            }
        }

        function notConfirm(element,compare)
        {
            if (element.val().trim() == "" || element.val() != compare.val()) {
                return true;
            }
            return false;
        }


        function validFormat(isemail, fatherElement,fatherError,fatherSuccess, childElement, childError, childSuccess, errorElement, classError)
        {
            var test = false;
            if(isemail)
            {
                test = notValidMail(childElement.val());
            }
            else
            {
               test = notValidName(childElement.val())
            }
            if (test) {
                //supprimer la classe success si  elle exite dans le parent
                appMain.function.removeclass(fatherElement,fatherSuccess);

                //ajout  de la classe has-danger
                appMain.function.addclass(fatherElement,fatherError);

                //supprimer la classe success si  elle exite dans le controle enfant
                appMain.function.removeclass(childElement,childSuccess);

                //ajout  de la classe form-control-danger
                appMain.function.addclass(childElement, childError);

                //activation de l'erreur
                //appMain.function.show($("#"+errorElement.attr('id')+" ."+classError))

            }
            else {
                //supprimer la classe error si  elle exite dans le parent
                appMain.function.removeclass(fatherElement,fatherError);

                //ajout  de la classe has-success
                appMain.function.addclass(fatherElement,fatherSuccess);

                //supprimer la classe error si  elle exite dans le controle enfant
                appMain.function.removeclass(childElement,childError);

                //ajout  de la classe form-control-success
                appMain.function.addclass(childElement, childSuccess);

                //cacher le message d'erreur
                appMain.function.hide($("#"+errorElement.attr('id')+" ."+classError))
            }
        }




        function notValidMail(email) {
            var motif = "^([ ]{0,}?)([a-zA-Z]([0-9]*)?[._-]?){2,}[@]([a-zA-Z]([0-9]*)?[._-]?){2,}[.][a-z]{2,4}$";
            var  expression = new RegExp(motif,"gi");
            var test =expression.test(email);
            if (email=="" || test==false)
            {
                return true
            }

            return false;
        }

        function notValidName(name) {

            name =name.trim();
            var motif = "^([ ]*)(([a-zA-Z]+)([-]?)([a-zA-Z0-9]+)([ ]*)([a-zA-Z0-9]*))+$";
            var  expression = new RegExp(motif,"gi");
            var test =expression.test(name);
            if (name=="" || test==false)
            {
                return true
            }

            return false;
        }

    }

});