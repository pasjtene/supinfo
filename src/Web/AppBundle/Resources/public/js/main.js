/**
 * Created by Danick takam on 16/06/2017.
 */

var baseUrl = api.baseUrl;
var baseHost = api.baseHost;
var   AppMain = function()
{
    this.params ={
        api:{
            action :
            {find: baseUrl +"app"},
            method:
            {get:"GET"}
        },
        required:{ //class de base  pour les erreurs et  succees
            has_danger: "has-danger",
            has_success: "has-success",
            form_control_danger: "form-control-danger",
            form_control_success: "form-control-success",
            form_control_feedback : "form-control-feedback"
        },
        other : {
            tokenkey: "apptktfgapi"
        }
    },
    this.function={
        hasclass: //teste l'existance d'une classe et retourne true si  element  contient classname
            function (element, classname)
            {
                if(element.hasClass(classname)){
                    return true;
                }
                return false;
            },
        addclass: //ajoute la classename a element  si  element  ne possède pas deja cette classe
            function (elemnent, classname)
            {
                if(! this.hasclass(elemnent,classname)){
                    elemnent.addClass(classname);
                }
            },
        removeclass: //supprime  une classe si elle existe
            function (elemnent, classname)
            {
                if(this.hasclass(elemnent,classname)){
                    elemnent.removeClass(classname);
                }
            },
        show: //affiche un element cache
            function(element){
                element.slideDown();
            },
        hide: //cache un element
            function(element){
                element.slideUp();
            },
        notValid: //teste si  un champs est valide retourne error si ce n'est  pas le cas et  '' si  c'est bon
            function(element, minLength, maxLenght){
                if(element.trim()=="" || element.length<minLength || element.length>maxLenght)
                {
                    return true;
                }
                return false;
            },
        validate:
            function(fatherElement,fatherError,fatherSuccess, childElement, childError, childSuccess, errorElement, classError, minLenght, maxLenght){
                if (childElement.val().trim() == "" || childElement.val().length<minLenght || childElement.val().length>maxLenght) {
                    //supprimer la classe success si  elle exite dans le parent
                    this.removeclass(fatherElement,fatherSuccess);

                    //ajout  de la classe has-danger
                    this.addclass(fatherElement,fatherError);

                    //supprimer la classe success si  elle exite dans le controle enfant
                    this.removeclass(childElement,childSuccess);

                    //ajout  de la classe form-control-danger
                    this.addclass(childElement, childError);

                    //activation de l'erreur
                    this.show($("#"+errorElement.attr('id')+" ."+classError))

                }
                else {
                    //supprimer la classe error si  elle exite dans le parent
                    this.removeclass(fatherElement,fatherError);

                    //ajout  de la classe has-success
                    this.addclass(fatherElement,fatherSuccess);

                    //supprimer la classe error si  elle exite dans le controle enfant
                    this.removeclass(childElement,childError);

                    //ajout  de la classe form-control-success
                    this.addclass(childElement, childSuccess);

                    //cacher le message d'erreur
                    this.hide($("#"+errorElement.attr('id')+" ."+classError))
                }
            }
    },
    this.getAppToken = function(cb)
    {
        $.ajax(
            {
                url: this.params.api.action.find,
                type: this.params.api.method.get,
                crossDomain: true,
                success: function (data) {
                    console.log(data);
                    cb(data);
                },
                error: function (xhr, status, message) {
                    console.log(status+"\n"+xhr.responseText + '\n' + message );
                }
            }
        );
    }
};


var tokenbase =null;
var appMain = new AppMain();

appMain.getAppToken(function(data){
    //tokenbase = data.value;
    tokenbase = data;
});

