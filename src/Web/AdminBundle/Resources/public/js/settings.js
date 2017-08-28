/**
 * Created by root on 06/07/2017.
 */

var AdminSettings = function()
{
    this.params = {
        page : $('#adminSettings'),
        attr: {
            id:{
                btn_save_settings: $("#btn-save-settings"),
                nbuser_perpage: $('#nbuser-perpage'),
                point_on_login: $('#point-ol'),
                point_per_message: $('#point-pm'),
                point_per_upload: $('#point-pu'),
                default_point: $('#point-register'),
                point_for_vip: $('#point-fv'),
                nbpic_perpage: $('#nbpic-perpage')
            },
            class:{

            }
        },
        api:{
            action :
            {
                settings: baseUrl +"auth/settings"
            },
            method:
            {
                put:"PUT",
                get: "GET"
            },
            headers:
            {auth: "X-Auth-Token"}
        }
    };
};

$(function(){

    // Instanciation  de la classe AdminSettings
    var adminSettings = new AdminSettings();
    var settings = null;

    var fillInput = function(settings){
        adminSettings.params.attr.id.nbuser_perpage.val(settings.userPerPage);
        adminSettings.params.attr.id.point_on_login.val(settings.pointOnLogin);
        adminSettings.params.attr.id.point_per_message.val(settings.pointPerMessage);
        adminSettings.params.attr.id.point_per_upload.val(settings.pointForUpload);
        adminSettings.params.attr.id.default_point.val(settings.defaultPoint);
        adminSettings.params.attr.id.point_for_vip.val(settings.pointForVip);
        adminSettings.params.attr.id.nbpic_perpage.val(settings.picturePerPage);
    };

    //Tester si  la page actuelle c'est adminMember
    if(adminSettings.params.page.data('page') === "adminSettings")
    {
        $.ajax({
            url: adminSettings.params.api.action.settings,
            type: adminSettings.params.api.method.get,
            headers : {"X-Auth-Token" : currentUser.token},
            crossDomain: true,
            success: function (response)
            {
                settings = response;
                console.log(settings);
                fillInput(settings);
            },
            error: function (xhr, status, message) { //en cas d'erreur
                console.log(status+"\n"+xhr.responseText + '\n' + message );
            }
        });

        adminSettings.params.attr.id.btn_save_settings.click(function(e)
        {
            var data = {
                upp: parseInt(adminSettings.params.attr.id.nbuser_perpage.val()),
                pol: parseInt(adminSettings.params.attr.id.point_on_login.val()),
                ppm: parseInt(adminSettings.params.attr.id.point_per_message.val()),
                pfu: parseInt(adminSettings.params.attr.id.point_per_upload.val()),
                dp: parseInt(adminSettings.params.attr.id.default_point.val()),
                pfv: parseInt(adminSettings.params.attr.id.point_for_vip.val()),
                ppp: parseInt(adminSettings.params.attr.id.nbpic_perpage.val())
            };
            $.ajax(
                {
                    url: adminSettings.params.api.action.settings,
                    type: adminSettings.params.api.method.put,
                    headers : {"X-Auth-Token" : currentUser.token},
                    data: data,
                    crossDomain: true,
                    success: function (response)
                    {
                        console.log(response);
                        bootbox.alert("Settings saved successfully !");
                    },
                    error: function (xhr, status, message) { //en cas d'erreur
                        console.log(status+"\n"+xhr.responseText + '\n' + message );
                    }
                }
            );
            e.preventDefault();
        });
    }
});
