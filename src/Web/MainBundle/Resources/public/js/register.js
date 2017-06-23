/**
 * Created by Danick takam on 16/06/2017.
 */

var MainRegister = function()
{
    this.params = {
        page : $('#mainRegister'),
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
            btnregister: $("#btnregister"),
            countryList: $("#countryList"),
            day: $('#day'),
            month: $('#month'),
            year: $('#year')
        },
        api:{
            action :
                {save: baseUrl +"v1/auth/register"},
            method:
                {post:"POST"},
            headers:
                {auth: "X-Auth-Token"}
        },
        required:{
            name : $("#block-name"),
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
            year: $('#block-year')
        }
    };

};


$(function(){



    //instancier la classe MainRegister
    var mainRegister = new MainRegister();


    //fonction de verifications des valeurs saisies par l'utilisateur
    function verify(user)
    {
        var appMain = new AppMain();
        var test = '';
        test+= appMain.function.validation(user.firstname,3,100);
        test+= appMain.function.validation(user.country,1,100);
        test+= appMain.function.validation(user.email,8,100);
        test+= appMain.function.validation(user.birthDate,10,10);
        test+= appMain.function.validation(user.gender,1,8);
        test+= appMain.function.validation(user.joinReason,1,100);
        test+= appMain.function.validation(user.password,5,100);
        return test;
    }

    //tester si  nous somme dans la page d'enregistrement
    if(mainRegister.params.page.data('page')=="mainRegister")
    {



        //donner le focus au chargement  de la page au  champs name
        mainRegister.params.form.name.focus();

        // rendre le champs birthday  en datepicker
       // mainRegister.params.form.birthday.datepicker();


       // alert(mainRegister.params.form.country.data("country"))

        //charger la liste des pays
        $.getJSON(mainRegister.params.form.country.data("country"), function(data){
            mainRegister.params.form.countryList.empty();
            $.each(data,function(index,vaue){
                    var option = "<option value='"+index+"'>"+vaue+"</option>"
                    mainRegister.params.form.countryList.append(option);
            });
        });

        //charger tous les jours
        for(var i= 1;i<32;i++)
        {
            var option = "<option value='"+ (i<10? "0"+i: i) +"'>"+ (i<10? "0"+i: i) +"</option>"
            mainRegister.params.form.day.append(option);
        }

        //charger tous les mois
        for(var i= 1;i<13;i++)
        {
            var option = "<option value='"+ (i<10? "0"+i: i) +"'>"+ (i<10? "0"+i: i) +"</option>"
            mainRegister.params.form.month.append(option);
        }

        //recuperer la date du  jour
        var today=new Date();
        //recuperer le mois du  jour
        var currentyear = today.getFullYear();

        //accorder les enfants ages d'au moins 5ans à   s'enregistrer
        currentyear-=5;

        //charger les annees par ordre décroissant
        for(var i= currentyear;i>1959;i--)
        {
            var option = "<option value='"+i+"'>"+i+"</option>"
            mainRegister.params.form.year.append(option);
        }

        //evenement  du  clic  sur le bouton enregistre
        mainRegister.params.form.btnregister.click(function (e) {

            //empecher la soumission du  formulaire
            e.preventDefault();

            //instanicier le user et  charger avec les valeurs de la bd
            var User =
            {
                firstname: mainRegister.params.form.name.val(),
                birthDate: mainRegister.params.form.day.val()+"/"+mainRegister.params.form.month.val()+"/"+mainRegister.params.form.year.val(),
                profession: mainRegister.params.form.profession.val(),
                type: "Normal",
                joinReason: mainRegister.params.form.reason.val(),
                gender: mainRegister.params.form.gender.val(),
                email: mainRegister.params.form.email.val(),
                password: mainRegister.params.form.password.val(),
                country: mainRegister.params.form.country.val()
                /*lastName: null,
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
            if (verify(User) != '') {
               //print error message
                alert(verify(User));
            } else {
                alert("kckl");
               // alert(mainRegister.params.api.action.save);
                //jQuery.support.cors = true;

                // implementer l'enregistrement  proprement  dit avec ajax
                $.ajax(
                    {
                        url: mainRegister.params.api.action.save,
                        crossDomain: true,
                        headers : {"X-Auth-Token" : tokenbase.value},
                        type: mainRegister.params.api.method.post,
                        data: User,
                        success: function (data) { //lorsque tout c'est bien passe
                            console.log("ajout réussi !");
                            alert("ajout réussi !");
                            //redirect  here
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

        // 1- validation du champs name
        mainRegister.params.form.name.focus(function(){
            appMain.function.validate(mainRegister.params.required.name,appMain.params.required.has_danger,appMain.params.required.has_success,mainRegister.params.form.name,appMain.params.required.form_control_danger,appMain.params.required.form_control_success,mainRegister.params.required.name,appMain.params.required.form_control_feedback,3,100);
        });
        mainRegister.params.form.name.keyup(function(){
            appMain.function.validate(mainRegister.params.required.name,appMain.params.required.has_danger,appMain.params.required.has_success,mainRegister.params.form.name,appMain.params.required.form_control_danger,appMain.params.required.form_control_success,mainRegister.params.required.name,appMain.params.required.form_control_feedback,3,100);
        });


        // 2- validation du champs county
        mainRegister.params.form.country.focus(function(){
            appMain.function.validate(mainRegister.params.required.country,appMain.params.required.has_danger,appMain.params.required.has_success,mainRegister.params.form.country,appMain.params.required.form_control_danger,appMain.params.required.form_control_success,mainRegister.params.required.country,appMain.params.required.form_control_feedback,1,100);
        });
        mainRegister.params.form.country.keyup(function(){
            appMain.function.validate(mainRegister.params.required.country,appMain.params.required.has_danger,appMain.params.required.has_success,mainRegister.params.form.country,appMain.params.required.form_control_danger,appMain.params.required.form_control_success,mainRegister.params.required.country,appMain.params.required.form_control_feedback,1,100);
        });

        // 3- validation du champs email
        mainRegister.params.form.email.focus(function(){
            appMain.function.validate(mainRegister.params.required.email,appMain.params.required.has_danger,appMain.params.required.has_success,mainRegister.params.form.email,appMain.params.required.form_control_danger,appMain.params.required.form_control_success,mainRegister.params.required.email,appMain.params.required.form_control_feedback,8,100);
        });
        mainRegister.params.form.email.keyup(function(){
            appMain.function.validate(mainRegister.params.required.email,appMain.params.required.has_danger,appMain.params.required.has_success,mainRegister.params.form.email,appMain.params.required.form_control_danger,appMain.params.required.form_control_success,mainRegister.params.required.email,appMain.params.required.form_control_feedback,8,100);
        });


        // 4- validation du champs jour
        mainRegister.params.form.day.focus(function(){
            appMain.function.validate(mainRegister.params.required.day,appMain.params.required.has_danger,appMain.params.required.has_success,mainRegister.params.form.day,appMain.params.required.form_control_danger,appMain.params.required.form_control_success,mainRegister.params.required.day,appMain.params.required.form_control_feedback,1,100);
        });
        mainRegister.params.form.day.keyup(function(){
            appMain.function.validate(mainRegister.params.required.day,appMain.params.required.has_danger,appMain.params.required.has_success,mainRegister.params.form.day,appMain.params.required.form_control_danger,appMain.params.required.form_control_success,mainRegister.params.required.day,appMain.params.required.form_control_feedback,1,100);
        });


        // 5- validation du champs mois
        mainRegister.params.form.month.focus(function(){
            appMain.function.validate(mainRegister.params.required.month,appMain.params.required.has_danger,appMain.params.required.has_success,mainRegister.params.form.month,appMain.params.required.form_control_danger,appMain.params.required.form_control_success,mainRegister.params.required.month,appMain.params.required.form_control_feedback,1,100);
        });
        mainRegister.params.form.month.keyup(function(){
            appMain.function.validate(mainRegister.params.required.month,appMain.params.required.has_danger,appMain.params.required.has_success,mainRegister.params.form.month,appMain.params.required.form_control_danger,appMain.params.required.form_control_success,mainRegister.params.required.month,appMain.params.required.form_control_feedback,1,100);
        });


        // 6- validation du champs année
        mainRegister.params.form.year.focus(function(){
            appMain.function.validate(mainRegister.params.required.year,appMain.params.required.has_danger,appMain.params.required.has_success,mainRegister.params.form.year,appMain.params.required.form_control_danger,appMain.params.required.form_control_success,mainRegister.params.required.year,appMain.params.required.form_control_feedback,4,100);
        });
        mainRegister.params.form.year.keyup(function(){
            appMain.function.validate(mainRegister.params.required.year,appMain.params.required.has_danger,appMain.params.required.has_success,mainRegister.params.form.year,appMain.params.required.form_control_danger,appMain.params.required.form_control_success,mainRegister.params.required.year,appMain.params.required.form_control_feedback,4,100);
        });


        // 8- validation du champs sexe
        mainRegister.params.form.gender.focus(function(){
            appMain.function.validate(mainRegister.params.required.gender,appMain.params.required.has_danger,appMain.params.required.has_success,mainRegister.params.form.gender,appMain.params.required.form_control_danger,appMain.params.required.form_control_success,mainRegister.params.required.gender,appMain.params.required.form_control_feedback,1,100);
        });
        mainRegister.params.form.gender.keyup(function(){
            appMain.function.validate(mainRegister.params.required.gender,appMain.params.required.has_danger,appMain.params.required.has_success,mainRegister.params.form.gender,appMain.params.required.form_control_danger,appMain.params.required.form_control_success,mainRegister.params.required.gender,appMain.params.required.form_control_feedback,1,100);
        });


        // 8- validation du champs reason
        mainRegister.params.form.reason.focus(function(){
            appMain.function.validate(mainRegister.params.required.reason,appMain.params.required.has_danger,appMain.params.required.has_success,mainRegister.params.form.reason,appMain.params.required.form_control_danger,appMain.params.required.form_control_success,mainRegister.params.required.reason,appMain.params.required.form_control_feedback,1,100);
        });
        mainRegister.params.form.reason.keyup(function(){
            appMain.function.validate(mainRegister.params.required.reason,appMain.params.required.has_danger,appMain.params.required.has_success,mainRegister.params.form.reason,appMain.params.required.form_control_danger,appMain.params.required.form_control_success,mainRegister.params.required.reason,appMain.params.required.form_control_feedback,1,100);
        });

        // 9- validation du champs password
        mainRegister.params.form.password.focus(function(){
            appMain.function.validate(mainRegister.params.required.password,appMain.params.required.has_danger,appMain.params.required.has_success,mainRegister.params.form.password,appMain.params.required.form_control_danger,appMain.params.required.form_control_success,mainRegister.params.required.password,appMain.params.required.form_control_feedback,5,100);
        });
        mainRegister.params.form.password.keyup(function(){
            appMain.function.validate(mainRegister.params.required.password,appMain.params.required.has_danger,appMain.params.required.has_success,mainRegister.params.form.password,appMain.params.required.form_control_danger,appMain.params.required.form_control_success,mainRegister.params.required.password,appMain.params.required.form_control_feedback,5,100);
        });
    }





});