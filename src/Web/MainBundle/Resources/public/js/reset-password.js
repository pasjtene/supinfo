/**
 * Created by root on 6/23/17.
 */
var AppResetPassword = function()
{
    this.params = {
        BtnSubmit : $("#btn-submit"),
        TxtEmail : $("#email")
    }
};

$(function()
{
   var arp = new AppResetPassword();

   arp.params.BtnSubmit.click(function(e)
   {
       var email =arp.params.TxtEmail.val();
       if(email.length > 0)
       {
           //alert(baseRoute);
           var data = {
               url :baseRoute,
               email : email
           }
           $.ajax(
           {
               url: baseUrl + 'reset-password-request ',
               crossDomain: true,
               //headers : {"X-Auth-Token" : tokenbase.value},
               type: 'post',
               data: JSON.stringify(data),
               dataType: 'json',
               success: function (data) {
                   console.log(data);
                   alert('Email  envoyez veillez.  (STP  ERIC  IL FAUT  PERSONALISER CA et  apres 2s par exemple tu  l\'envoi  a la page d\'authentification)');
               },
               error: function (xhr, status, message) { //en cas d'erreur
                   console.log(status+"\n"+xhr.responseText + '\n' + message );
               }
           });
   }
       e.preventDefault();
   });
});