/**
 * Created by Danick takam on 16/06/2017.
 */

var MainLogin = function()
{
    this.params = {
        page: $("#mainLogin"),
        modalLogin: $("#modalLogin"),
        form: {
            login : $("#_username"),
            password : $("#_password"),
            btnsubmit: $("#btn-submit")
        },
        api:
        {
            action: baseUrl+  "v1/auth/login",
            method: "POST"
        }
    };

};


$(function(){

    // instanciation de la classe MainLogin
    var mainLogin = new MainLogin();

    //teste si  nous somme vraiment dans la page concerne
    if(mainLogin.params.page.data('page')=="mainLogin")
    {
        //donner le focus au chargement  de la page au  champs login
        mainLogin.params.form.login.focus();



        // evenement  du  clique sur le bouton d'enregistrement
        mainLogin.params.form.btnsubmit.click(function (e) {

            //empecher la soumission du  formulaire
            e.preventDefault();

            //instanicier du credential
            var Data =
            {
                _username: mainLogin.params.form.login.val(),
                _password: mainLogin.params.form.password.val()
            };

                // afficher le preloader d'attente
                mainLogin.params.modalLogin.modal('show');

                // on se rassure que le tokenbase est  au prealable chargé
                interval= setInterval(function(){
                    if(tokenbase!=null)
                    {
                        /*
                         xhrFields: {
                         withCredentials: true
                         },
                         */

                        // envoi d'une requete ajax au serveur pour login
                        jQuery.support.cors = true;
                        $.ajax(
                            {
                                url:mainLogin.params.api.action,
                                crossOrigin: true,
                                crossDomain: true,
                                headers : {"X-Auth-Token" : tokenbase.value},
                                type: mainLogin.params.api.method,
                                data: Data,
                                success: function (data) { //lorsque tout c'est bien passe
                                    alert("faire ta redirection car tout  est deja ok");
                                },
                                error: function (xhr, status, message) { //en cas d'erreur
                                    console.log(status+"\n"+xhr.responseText + '\n' + message );
                                }
                            }
                        );

                        //on arrete de faire le test du  token car tout  c'est deja passe comme attendu
                        clearInterval(interval);
                    }
                },100);
        });


    }

});