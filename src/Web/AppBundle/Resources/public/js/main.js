/**
 * Created by Danick takam on 16/06/2017.
 */



var baseUrl = 'http://127.0.0.1:8001/';


var   AppMain = function()
    {
        this.params ={
            api:{
                action :
                    {find: baseUrl +"v1/app"},
                method:
                    {get:"GET"}
            }
        }

    };





var tokenbase =null;
   var appMain = new AppMain();
    $.ajax(
        {
            url: appMain.params.api.action.find,
            type: appMain.params.api.method.get,
            crossDomain: true,
            success: function (data) {
                tokenbase = data;
                console.log(tokenbase);
            },
            error: function (xhr, status, message) {
                console.log(status+"\n"+xhr.responseText + '\n' + message );
            }
        }
    );