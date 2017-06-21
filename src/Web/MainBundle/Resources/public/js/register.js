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

    }

    //tester si  nous somme dans la page d'enregistrement
    if(mainRegister.params.page.data('page')=="mainRegister")
    {
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
            if (verify(User) != null) {
               //print error message
                alert('no');
            } else {

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

        //validation du  formualire au touche

    }





});