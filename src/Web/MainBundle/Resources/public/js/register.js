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
            confirmpassword : $("#confirmpassword"),
            profession : $("#profession"),
            btnregister: $("#btnregister")
        },
        api:{
            action :
                {save: baseUrl +"/v1/register"},
            method:
                {post:"POST"}
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

        $.getJSON(baseUrl + "/v1/users" , function (object) {
            console.log(object);
        }).fail(
            function (xhr, status, message) {
                console.log(xhr.responseText + '\n' + status + '\n' + message);
            }
        );


        mainRegister.params.form.btnregister.click(function () {

            var User =
            {
                firstname: mainRegister.params.form.name.val(),
                birthDate: mainRegister.params.form.birthday.val(),
                profession: mainRegister.params.form.profession.val(),
                type: "Normal",
                joinReason: mainRegister.params.form.reason.val(),
                gender: mainRegister.params.form.gender.val(),
                email: mainRegister.params.form.email.val(),
                password: mainRegister.params.form.password.val()
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


            if (verify(ticket) != null) {
               //print error message
            } else {

                $.ajax(
                    {
                        url: mainRegister.params.api.action.save,
                        type: mainRegister.params.api.method.post,
                        data: User,
                        success: function (data) {
                            console.log("ajout réussi !");
                            alert("ajout réussi !");
                            //redirect  here
                        },
                        error: function (xhr, status, message) {
                            alert(xhr.responseText + '\n' + message);
                        }
                    }
                );
            }
        });
    }





});