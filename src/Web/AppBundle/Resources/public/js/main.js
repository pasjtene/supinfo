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
            },
            required:{ //class de base  pour les erreurs et  succees
                has_danger: "has-danger",
                has_success: "has-success",
                form_control_danger: "form-control-danger",
                form_control_success: "form-control-success",
                form_control_feedback : "form-control-feedback"
            }
        },
        this.function={
            hasclass: //teste l'existance d'une classe et retourne true si  element  contient classname
                function hasclass(element, classname)
                {
                    if(element.hasClass(classname)){
                        return true;
                    }
                    return false;
                },
            addclass: //ajoute la classename a element  si  element  ne possède pas deja cette classe
                function addclass(elemnent, classname)
                {
                    if(! this.hasclass(elemnent,classname)){
                        elemnent.addClass(classname);
                    }
                },
            show: //affiche un element cache
                function(element){
                    element.slideDown();
                },
            hide: //cache un element
                function(element){
                    element.slideUp();
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