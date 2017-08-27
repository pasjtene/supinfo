var AdminApp =
{
    Main: {
        Id: {
            Content: $("#adm-content")
        },
        Class: {
            NanoBar: '.nano'
        },
        Api: {
            Methods: {
                GET: "GET",
                POST: "POST",
                PUT: "PUT",
                DELETE: "DELETE"
            },
            Options: {
                Auth: "X-Auth-Token"
            }
        },
        Endpoints: {

        }
    },
    Methods: {
        SetHeight: function(element, value){
            element.height(value);
        }
    },
    Components: {

    },
    Init: function(){
        //Fixer la haute minimale de la zone de contenu
        var height = $(window).height();
        this.Methods.SetHeight(this.Main.Id.Content, height);
    },
    Modules: {
        Members: function(){
            var App = {
                Id: {

                },
                Class: {

                },
                Endpoints: {

                }
            }
        }
    }
};

$(function()
{
    AdminApp.Init();

});