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


function listEmoticons(){
    return  data = {
        ":Blanco" : "/00 Blanco.png",
        ":centaur" : "/001-centaur.png",
        ":leggings" : "/001-leggings.png",
        ":sick-1" : "/001-sick-1.png",
        ":Smile" : "/01 Smile.png",
        ":gloves" : "/002-gloves.png",
        ":in-love" : "/002-in-love.png",
        ":kraken" : "/002-kraken.png",
        ":Laugh" : "/02 Laugh.png",
        ":dinosaur" : "/003-dinosaur.png",
        ":scared" : "/003-scared.png",
        ":socks" : "/003-socks.png",
        ":Silly" : "/03 Silly.png",
        ":sun-lotion" : "/004-sun-lotion.png",
        ":tree-1" : "/004-tree-1.png",
        ":004-waiting" : "/004-waiting.png",
        ":04 Wink" : "/04 Wink.png",
        ":005-employee" : "/005-employee.png",
        ":005-hand" : "/005-hand.png",
        ":005-shoe" : "/005-shoe.png",
        ":05 Blush" : "/05 Blush.png",
        ":006-echidna" : "/006-echidna.png",
        ":006-sign" : "/006-sign.png",
        ":006-writer" : "/006-writer.png",
        ":06 Sad" : "/06 Sad.png",
        ":007-robot" : "/007-robot.png",
        ":007-stopwatch" : "/007-stopwatch.png",
        ":007-wrestler" : "/007-wrestler.png",
        ":07 Cool" : "/07 Cool.png",
        ":008-helmet-1" : "/008-helmet-1.png",
        ":008-model" : "/008-model.png",
        ":008-mushroom" : "/008-mushroom.png",
        ":08 Angry" : "/08 Angry.png",
        ":009-hello" : "/009-hello.png",
        ":009-location" : "/009-location.png",
        ":09 Surprised" : "/09 Surprised.png",
        ":010-bicycle" : "/010-bicycle.png",
        ":010-phoenix" : "/010-phoenix.png",
        ":010-troglodyte" : "/010-troglodyte.png",
        ":10 Speechless" : "/10 Speechless.png",
        ":011-dragon-1" : "/011-dragon-1.png",
        ":011-pulsometer" : "/011-pulsometer.png",
        ":011-space" : "/011-space.png",
        ":11 Geek" : "/11 Geek.png",
        ":012-devil" : "/012-devil.png",
        ":012-heart-rate" : "/012-heart-rate.png",
        ":012-pirate" : "/012-pirate.png",
        ":12 Tease" : "/12 Tease.png",
        ":013-light" : "/013-light.png",
        ":013-troll" : "/013-troll.png",
        ":013-worker" : "/013-worker.png",
        ":13 Crazy" : "/13 Crazy.png",
        ":014-alien" : "/014-alien.png",
        ":014-wrench" : "/014-wrench.png",
        ":014-zombie" : "/014-zombie.png",
        ":14 Fools" : "/14 Fools.png",
        ":015-minotaur" : "/015-minotaur.png",
        ":015-plant" : "/015-plant.png",
        ":015-wheel" : "/015-wheel.png",
        ":15 Cry" : "/15 Cry.png",
        ":016-finish-2" : "/016-finish-2.png",
        ":016-madre-monte" : "/016-madre-monte.png",
        ":016-painter" : "/016-painter.png",
        ":16 XD" : "/16 XD.png",
        ":017-cry" : "/017-cry.png",
        ":017-finish-1" : "/017-finish-1.png",
        ":017-satyr" : "/017-satyr.png",
        ":17 Devil" : "/17 Devil.png",
        ":018-karakasakozou" : "/018-karakasakozou.png",
        ":018-panel" : "/018-panel.png",
        ":018-shower" : "/018-shower.png",
        ":18 Angel" : "/18 Angel.png",
        ":019-glasses" : "/019-glasses.png",
        ":019-music" : "/019-music.png",
        ":019-pirate" : "/019-pirate.png",
        ":19 Ill" : "/19 Ill.png",
        ":020-finish" : "/020-finish.png",
        ":020-guitar-player" : "/020-guitar-player.png",
        ":020-werewolf" : "/020-werewolf.png",
        ":20 Meow" : "/20 Meow.png",
        ":021-run" : "/021-run.png",
        ":021-scarecrow" : "/021-scarecrow.png",
        ":021-start" : "/021-start.png",
        ":21 Zip it" : "/21 Zip it.png",
        ":022-computer" : "/022-computer.png",
        ":022-gun" : "/022-gun.png",
        ":022-valkyrie" : "/022-valkyrie.png",
        ":22 Annoyed" : "/22 Annoyed.png",
        ":023-chain" : "/023-chain.png",
        ":023-coffee" : "/023-coffee.png",
        ":023-curupira" : "/023-curupira.png",
        ":23 Please" : "/23 Please.png",
        ":024-clutch" : "/024-clutch.png",
        ":024-loch-ness-monster" : "/024-loch-ness-monster.png",
        ":024-reading" : "/024-reading.png",
        ":24 Hay" : "/24 Hay.png",
        ":025-money" : "/025-money.png",
        ":025-pump" : "/025-pump.png",
        ":025-tree" : "/025-tree.png",
        ":25 Not guilty" : "/25 Not guilty.png",
        ":026-cerberus" : "/026-cerberus.png",
        ":026-eat" : "/026-eat.png",
        ":026-helmet" : "/026-helmet.png",
        ":26 Kissy" : "/26 Kissy.png",
        ":027-angel" : "/027-angel.png",
        ":027-gryphon" : "/027-gryphon.png",
        ":027-road" : "/027-road.png",
        ":27 Goatse" : "/27 Goatse.png",
        ":028-mermaid" : "/028-mermaid.png",
        ":028-rain" : "/028-rain.png",
        ":028-water" : "/028-water.png",
        ":28 Nomnomnom" : "/28 Nomnomnom.png",
        ":029-phone-call" : "/029-phone-call.png",
        ":029-uniform" : "/029-uniform.png",
        ":029-vampire" : "/029-vampire.png",
        ":29 Zzz" : "/29 Zzz.png",
        ":030-bike" : "/030-bike.png",
        ":030-goblin" : "/030-goblin.png",
        ":030-kiss" : "/030-kiss.png",
        ":30 Total shock" : "/30 Total shock.png",
        ":031-laughing" : "/031-laughing.png",
        ":031-yeti" : "/031-yeti.png",
        ":31 In love" : "/31 In love.png",
        ":032-leprechaun" : "/032-leprechaun.png",
        ":032-surprised" : "/032-surprised.png",
        ":32 Not one care" : "/32 Not one care.png",
        ":033-angry" : "/033-angry.png",
        ":033-medusa" : "/033-medusa.png",
        ":33 Boring" : "/33 Boring.png",
        ":034-chimera" : "/034-chimera.png",
        ":034-sick" : "/034-sick.png",
        ":34 Minishock" : "/34 Minishock.png",
        ":035-car" : "/035-car.png",
        ":035-elf" : "/035-elf.png",
        ":35 Devil laugh" : "/35 Devil laugh.png",
        ":036-hydra" : "/036-hydra.png",
        ":036-love" : "/036-love.png",
        ":36 James" : "/36 James.png",
        ":037-cyclops" : "/037-cyclops.png",
        ":037-selfie" : "/037-selfie.png",
        ":37 Oh" : "/37 Oh.png",
        ":038-pegasus" : "/038-pegasus.png",
        ":038-rich" : "/038-rich.png",
        ":38 Why thank you" : "/38 Why thank you.png",
        ":039-narwhal" : "/039-narwhal.png",
        ":039-thinking" : "/039-thinking.png",
        ":39 Alien 1" : "/39 Alien 1.png",
        ":040-ghost" : "/040-ghost.png",
        ":040-woodcutter" : "/040-woodcutter.png",
        ":40 Alien 2" : "/40 Alien 2.png",
        ":041-detective" : "/041-detective.png",
        ":041-zombie" : "/041-zombie.png",
        ":41 Male" : "/41 Male.png",
        ":042-dragon" : "/042-dragon.png",
        ":042-exercise" : "/042-exercise.png",
        ":42 Female" : "/42 Female.png",
        ":043-frankenstein" : "/043-frankenstein.png",
        ":043-sleeping" : "/043-sleeping.png",
        ":43 Ghost" : "/43 Ghost.png",
        ":044-cooker" : "/044-cooker.png",
        ":044-witch" : "/044-witch.png",
        ":44 Mario" : "/44 Mario.png",
        ":045-bad" : "/045-bad.png",
        ":045-fairy" : "/045-fairy.png",
        ":046-beard" : "/046-beard.png",
        ":046-genie" : "/046-genie.png",
        ":047-pinocchio" : "/047-pinocchio.png",
        ":047-sad" : "/047-sad.png",
        ":048-cool" : "/048-cool.png",
        ":048-ghost" : "/048-ghost.png",
        ":049-birthday" : "/049-birthday.png",
        ":049-wizard" : "/049-wizard.png",
        ":050-happy" : "/050-happy.png",
        ":050-unicorn" : "/050-unicorn.png",
        ":angel" : "/angel.png",
        ":angry-1" : "/angry-1.png",
        ":bored" : "/bored.png",
        ":bored-1" : "/bored-1.png",
        ":bored-2" : "/bored-2.png",
        ":BRB" : "/BRB.png",
        ":Cellphone" : "/Cellphone.png",
        ":Clock" : "/Clock.png",
        ":clown" : "/clown.png",
        ":confused-1" : "/confused-1.png",
        ":cool" : "/cool.png",
        ":cool-1" : "/cool-1.png",
        ":cool-2" : "/cool-2.png",
        ":cool-3" : "/cool-3.png",
        ":couple" : "/couple.png",
        ":couplekiss(p)" : "/couplekiss(p).png",
        ":crying-1" : "/crying-1.png",
        ":dancer(bk)" : "/dancer(bk).png",
        ":dancer" : "/dancer.png",
        ":depression" : "/depression.png",
        ":dislike" : "/dislike.png",
        ":embarrassed" : "/embarrassed.png",
        ":emoticons" : "/emoticons.png",
        ":female_farmer" : "/female_farmer.png",
        ":File Blanco" : "/File Blanco.png",
        ":File Picture" : "/File Picture.png",
        ":File Text" : "/File Text.png",
        ":Flower" : "/Flower.png",
        ":gay" : "/gay.png",
        ":geek" : "/geek.png",
        ":Gift" : "/Gift.png",
        ":giftest" : "/giftest.png",
        ":happy-4" : "/happy-4.png",
        ":Heart" : "/Heart.png",
        ":hugging_face" : "/hugging_face.png",
        ":ill" : "/ill.png",
        ":Info" : "/Info.png",
        ":kiss" : "/kiss.png",
        ":kissing" : "/kissing.png",
        ":laughing" : "/laughing.png",
        ":like" : "/like.png",
        ":love" : "/love.png",
        ":mad" : "/mad.png",
        ":Mail" : "/Mail.png",
        ":man-and-woman" : "/man-and-woman.png",
        ":me" : "/me.png",
        ":metalfist" : "/metalfist.png",
        ":money" : "/money.png",
        ":moustache" : "/moustache.png",
        ":Music 1" : "/Music 1.png",
        ":Music 2" : "/Music 2.png",
        ":nerd-1" : "/nerd-1.png",
        ":ninja" : "/ninja.png",
        ":Pencil" : "/Pencil.png",
        ":PhotoCamera" : "/PhotoCamera.png",
        ":Private 1" : "/Private 1.png",
        ":Private 2" : "/Private 2.png",
        ":punk" : "/punk.png",
        ":quiet" : "/quiet.png",
        ":robot" : "/robot.png",
        ":sad" : "/sad.png",
        ":sleep" : "/sleep.png",
        ":smart" : "/smart.png",
        ":smiling" : "/smiling.png",
        ":star" : "/star.png",
        ":stuck_out_tongue(br)" : "/stuck_out_tongue(br).png",
        ":surprise" : "/surprise.png",
        ":surprised" : "/surprised.png",
        ":surprised-1" : "/surprised-1.png",
        ":suspicious" : "/suspicious.png",
        ":suspicious-1" : "/suspicious-1.png",
        ":thumbsup" : "/thumbsup.png",
        ":tongue" : "/tongue.png",
        ":tongue-out" : "/tongue-out.png",
        ":tongue-out-1" : "/tongue-out-1.png",
        ":unhappy" : "/unhappy.png",
        ":waou" : "/waou.png",
        ":Web" : "/Web.png",
        ":chine1" : "/chine1.png",
        ":chine2" : "/chine2.png",
        ":chine3" : "/chine3.png",
        ":chine4" : "/chine4.png",
        ":chine5" : "/chine5.png"
    };
}

function getEmotions(path,icon)
{
    return "<img src='"+path+icon+"'/>";
}

function  translateEmotion(list,element,path){
    var contentold = element.html();
    var content = element.html();
    $.each(list, function(key, value)
    {
        content =   content.replace(key, getEmotions(path,value));
    });
    if(contentold!=content)
    {
        element.empty();
        element.append(content);
        return true;
    }
    return false;
}

function setCaret(target, isStart) {
    const range = document.createRange();
    const sel = window.getSelection();
    if (isStart){
        const newText = document.createTextNode('');
        target.appendChild(newText);
        range.setStart(target.childNodes[0], 0);
    }
    else {
        range.selectNodeContents(target);
    }
    range.collapse(isStart);
    sel.removeAllRanges();
    sel.addRange(range);
    target.focus();
    //target.select();
}

function setEmoticons(element, src)
{
    var content =
        '<a class="dropdown-item col-3"  data-img="'+src+'" href="#">'+
        '<img class="" src="'+src+'"  alt="">'+
        '</a>';
    element.append(content);
}
function  fillEmotion(list,element,path){
    element.empty();
    var src = null;
    $.each(list, function(key, value)
    {
        src =   path+value;
        //console.log(src);
        setEmoticons(element,src);
    });
}


