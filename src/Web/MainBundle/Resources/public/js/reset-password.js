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
           $.ajax(
           {
               url: baseUrl + 'v1/reset-password-request ',
               crossDomain: true,
               //headers : {"X-Auth-Token" : tokenbase.value},
               type: 'post',
               data: JSON.stringify({email : email}),
               dataType: 'json',
               success: function (data) {
                   console.log(data);
                   alert("Envoie réussi !");
               },
               error: function (xhr, status, message) { //en cas d'erreur
                   console.log(status+"\n"+xhr.responseText + '\n' + message );
               }
           });
   }
       e.preventDefault();
   });
});