/**
 * Created by tene on 02/07/2017.
 */
//Configurez le base url correspondant a l'installation de l'API ici.
//La valeure depend de votre installation locale.
//Ce fichier doit etre inclus dans .gitigore pour ne pas modifier la configuration des autre.
//Ce fichier doit etre refferencer dans app/Resources/views/base.html.twig avant master.min.js

var api = {
   // baseUrl: "/api/v1/",
    baseUrl: 'http://127.0.0.1:8000/v1/',

    // le chemin de base de l'api  pour facililter la tache lors de l'affichage des photos depuis le serveur
    baseHost: 'http://127.0.0.1:8000/'
    //baseUrl: 'http://127.0.0.1/Site/funglobeapi/web/v1',
   // baseHost: 'http://127.0.0.1/Site/funglobeapi/web/'
}
