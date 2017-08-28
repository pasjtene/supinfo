/**
 * Created by Danick takam on 16/06/2017.
 */

var baseUrl = api.baseUrl;
var baseHost = api.baseHost;
var appUrl = api.appUrl;

var   AppMain = function()
{
    this.params ={
        page: $('.pageGeolocation'),
        api:{
            action :
            {find: baseUrl +"app"},
            method:
            {get:"GET"},
            datype: "json",
            geolocation:
            {
                action : baseUrl +"geolocation",
                method: "get",
                datype: "json"
            }
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
                        //this.show($("#"+errorElement.attr('id')+" ."+classError))

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
                    dataType:  this.params.api.datype,
                    success: function (data) {
                        console.log(data);
                        cb(data);
                    },
                    error: function (xhr, status, message) {
                        console.log(status+"\n"+xhr.responseText + '\n' + message );
                    }
                }
            );
        },
        this.getGeolocation = function(cb)
        {
            $.ajax(
                {
                    url: this.params.api.geolocation.action,
                    type: this.params.api.geolocation.method,
                    crossDomain: true,
                    dataType:  this.params.api.geolocation.datype,
                    success: function (data) {
                        console.log(data);
                        cb(data);
                    },
                    error: function (xhr, status, message) {
                        geolocationbad = xhr.responseText;
                        console.log(geolocationbad);
                    }
                }
            );
        }

};


//TODOo : donner plus d'explicaton sur l'utilisation du tokenbase
var tokenbase =null;
var geolocation =null;
var geolocationbad =null;
var appMain = new AppMain();
var path =
{
    country: {
        en: '/dist/country-en.json',
        fr: '/dist/country.json'
    },
    flags: '/dist/flags/',
    emoticon : "/dist/emoticons/png",
    emptyImage: '/data/img/empty.png'
};

function getJoinReason(value){
   /* value = value.trim();
    var result = "";
    if(locale=="en"){
        switch(value){
            case '1':{
                result = 'I am  here to Make new friends';
                break;
            }
            case '2': {
                result = 'I am  here to Chat with my friends';
                break;
            }
            case '3': {
                result = 'I am  here to Meet people';
                break;
            }
        }
    }
    else
    {
        switch(value){
            case '1':{
                result = 'Je suis la pour me faire de nouveau amis';
                break;
            }
            case '2': {
                result = 'Je suis la pour causer avec mes proches';
                break;
            }
            case '3': {
                result = 'Je suis la pour faire des rencontres ';
                break;
            }
        }
    }
    return result;*/
    return 'ok dex';
};
//cette fonction fait un appel a la route xxx sur l'api qui calcul et genere le token
appMain.getAppToken(function(data){
    //tokenbase = data.value;
    tokenbase = data;
    sessionStorage.setItem("fg_token_base", data.value);
    //geolocation = data.geolocation;
});

if(appMain.params.page.data('geolocation')=="geolocation"){
    appMain.getGeolocation(function(data){
        geolocation = data;
    });

}

function getCountry(list, search){
    for(var i=0; i<list.length;i++)
    {
        if(list[i].code ==search)
        {
            return list[i].value;
        }
    }
    return null;
}

function getCountryCode(list, search){
    for(var i=0; i<list.length;i++)
    {
        if(list[i].value ==search)
        {
            return list[i].code;
        }
    }
    return null;
}

//les elements pour paginer les photos dans une carouserie
var bg ={
    bg_photo : $('#bg-photos-globale'), //ceci est  le contenu principale qui  cotient  toutes les elements
    propagation: $('#bg-photos-globale .propagation'), //ceci  represente les fleches
    bg_photo_row: $('#bg-photos-globale .row'), //le conteneur direct (non necessaire )
    bg_photo_content : $("#bg-photos-globale #photo-carouserie .carousel-inner"), //ceci  est  le contenu  a modifier
    bg_photo_img : $('#bg-photos-globale #photo-carouserie .carousel-inner .img-fluid')
};
//comment  integre
//1- declarer une liste d'image dans la page lors du  chargement  de la page, recuperer la liste et  update votre liste
//2- chaque image peut  avoir un element qui  permet  de le distinguer par exemple l'id du  user dans un data-user
//3- il  suffit  lorsque vous cliquer sur une photo d'un user, chercher dans votre liste toutes les photos correspondant que vous charger a nouveau dans un autre tableau
//4- parcourrir le tableau et  charger les items de la carrouserie avec se referer de base.html.twig a la ligne 92
//5- dans votre image , vous devez avoir un element qui  permet  de savoir que l'image x est l'image que l'on souhaite dabord voir afin d'activer en premier
//6- charger bg.bg_photo_content avec toutes vos items
// 7- activer la caurouserie bg.bg_photo.fadeIn();


$('html').click(function(event){
    if(event.target.id == 'bg-photos-globale' || event.target.id =='bg-photos-child') {
        bg.bg_photo.fadeOut();
    }
   // console.log(event.target);
   // alert(event.target.id );
});

bg.bg_photo_row.css({'height':($(window).height()-$(window).height()/30)+'px'});
bg.bg_photo_img.css({'max-height':($(window).height()-$(window).height()/15)+'px' + ' !important;'});
