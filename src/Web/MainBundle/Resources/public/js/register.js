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
            btnregister: $("#btnregister")
        },
        api:{
            action :
                {save: baseUrl +"v1/auth/register"},
            method:
                {post:"POST"},
            headers:
                {auth: "X-Auth-Token"}
        }
    };

};


$(function(){

    function verify(user)
    {
        return null;
    }
    var mainRegister = new MainRegister();


    if(mainRegister.params.page.data('page')=="mainRegister")
    {
        // rendre le champs birthday  en datepicker
        mainRegister.params.form.birthday.datepicker();


        mainRegister.params.form.btnregister.click(function (e) {

            e.preventDefault();

            var User =
            {
                firstname: mainRegister.params.form.name.val(),
                birthDate: mainRegister.params.form.birthday.val(),
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
            alert(User.gender);


            if (verify(User) != null) {
               //print error message
                alert('no');
            } else {

               // alert(mainRegister.params.api.action.save);
                //jQuery.support.cors = true;
                $.ajax(
                    {
                        url: mainRegister.params.api.action.save,
                        crossDomain: true,
                        headers : {"X-Auth-Token" : tokenbase.value},
                        type: mainRegister.params.api.method.post,
                        data: User,
                        success: function (data) {
                            console.log("ajout réussi !");
                            alert("ajout réussi !");
                            //redirect  here
                        },
                        error: function (xhr, status, message) {
                            console.log(status+"\n"+xhr.responseText + '\n' + message );
                        }
                    }
                );
            }
        });
    }





});