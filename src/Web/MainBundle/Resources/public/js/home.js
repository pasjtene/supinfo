/**
 * Created by Danick takam on 16/06/2017.
 */

var MainHome = function()
{
    this.params = {
        mainHorizontalNav : $('#mainHorizontalNav'),
        classname: "fixebar",
        footer: $("#footer"),
        content: $('#content'),
        nav: $("#nav"),
        carousel: $("#carousel"),
        carouselClass : $('.carousel'),
        dropdownClass : $(".dropdown-toggle")
    };
};


$(function(){

    var mainHome = new MainHome();

    if(mainHome.params.carousel.data("menu")!="undefined" && mainHome.params.carousel.data("menu")=="matches")
    {
        mainHome.params.carouselClass.carousel({
            interval: 10000
        });
    }
    if(mainHome.params.mainHorizontalNav.data("menu")!="undefined" && mainHome.params.mainHorizontalNav.data("menu")=="mainHorizontalNav")
    {
        //setScroll(mainHome.params.mainHorizontalNav, mainHome.params.classname);
    }

    if(mainHome.params.nav.data("menu")!="undefined" && mainHome.params.nav.data("menu")=="nav")
    {
        mainHome.params.dropdownClass.dropdown();
        //setScroll(mainHome.params.nav, mainHome.params.classname);
    }

  /*  function setScroll(menu, classFixed)
    {
        // On recupere la position du bloc par rapport au haut du site
        var position_top_raccourci = menu.offset().top;

        //Au scroll dans la fenetre on déclenche la fonction
        $(window).scroll(function () {

            //si on a defile de plus de 150px du haut vers le bas
            if ($(this).scrollTop() > position_top_raccourci) {

                //on ajoute la classe classFixed
               // menu.addClass(classFixed);
            } else {
                //sinon on retire la classe "fixNavigation" a <div id="navigation">
               // menu.removeClass(classFixed);
            }
        });
    }
    */
    setInterval(function(){
        //setFooter();
    },100);
});
