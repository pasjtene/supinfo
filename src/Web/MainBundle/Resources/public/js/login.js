/**
 * Created by Danick takam on 16/06/2017.
 */

var MainLogin = function()
{
    this.params = {
        page: $("#mainLogin"),
        modalLogin: $("#modalLogin"),
        form: {
            id : $("#form-login"),
            login : $("#username"),
            password : $("#password"),
            btoken : $("#btoken"),
            btnsubmit: $("#btn-login")
        },
        api:
        {
            action: baseUrl+  "auth/login",
            method: "POST"
        }
    };

};


$(function(){

    // instanciation de la classe MainLogin
    var mainLogin = new MainLogin();

    //teste si  nous somme vraiment dans la page concerne
    if(mainLogin.params.page.data('page') === "mainLogin")
    {
        //donner le focus au chargement  de la page au  champs login
           console.log("We are at the login page...");
        mainLogin.params.form.login.focus();

        var interval = setInterval(function ()
        {
            if(tokenbase !== null){

                mainLogin.params.form.btoken.val(tokenbase.value);
                clearInterval(interval);
                //console.log("Token Applied");
            }

        }, 1000);

        // evenement  du  clique sur le bouton d'enregistrement
        mainLogin.params.form.btnsubmit.click(function (evt) {

            //empecher la soumission du  formulaire
            evt.preventDefault();

            //instanicier du credential
            var username = mainLogin.params.form.login.val(),
                password = mainLogin.params.form.password.val(),
                btoken = mainLogin.params.form.btoken.val();

            console.log(username, password, btoken);
            if(username.length > 0 && password.length > 0 && btoken.length > 0){
                mainLogin.params.form.id.submit();
            }
        });
    }

});
