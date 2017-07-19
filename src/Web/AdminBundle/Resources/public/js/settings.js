/**
 * Created by root on 06/07/2017.
 */

var AdminSettings = function()
{
    this.params = {
        page : $('#adminHome'),
        attr: {
            id:{
                btn_save_settings: $("#btn-save-settings"),
                nbuser_perpage: $('#nbuser-perpage')
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

    // Instanciation  de la classe AdminMember
    var adminSettings = new AdminSettings();
    var settings = null;

    var fillInput = function(settings){
        adminSettings.params.attr.id.nbuser_perpage.val(settings.userPerPage);
    };

    //Tester si  la page actuelle c'est adminMember
    if(adminSettings.params.page.data('page') === "adminHome")
    {
        $('a[data-toggle="tab"]').on('shown.bs.tab', function (e)
        {
            if ($('.nav-tabs .active').attr('href')==="#settings")
            {
                $.ajax(
                    {
                        url: adminSettings.params.api.action.settings,
                        type: adminSettings.params.api.method.get,
                        headers : {"X-Auth-Token" : tokenbase.value},
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
                    }
                );
            }
        });

        adminSettings.params.attr.id.btn_save_settings.click(function(e)
        {
            var nbupp = parseInt(adminSettings.params.attr.id.nbuser_perpage.val());
            var data = { user_per_page: nbupp };
            $.ajax(
                {
                    url: adminSettings.params.api.action.settings,
                    type: adminSettings.params.api.method.put,
                    headers : {"X-Auth-Token" : tokenbase.value},
                    data: data,
                    crossDomain: true,
                    success: function (response)
                    {
                        settings = response;
                        console.log(settings);

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
