/**
 * Created by Danick takam on 16/06/2017.
 */

var MainHome = function()
{
    this.params = {
        mainHorizontalNav : $('#mainHorizontalNav'),
        classname: "fixebar",
        footer: $("#footer"),
        content: $('#content')
    };
};


$(function(){

    var mainHome = new MainHome();
    if(mainHome.params.mainHorizontalNav.data("menu")!="undefined" && mainHome.params.mainHorizontalNav.data("menu")=="mainHorizontalNav")
    {
        setScroll(mainHome.params.mainHorizontalNav, mainHome.params.classname);
    }
    function setScroll(menu, classFixed)
    {
        // On recupere la position du bloc par rapport au haut du site
        var position_top_raccourci = menu.offset().top;

        //Au scroll dans la fenetre on déclenche la fonction
        $(window).scroll(function () {

            //si on a defile de plus de 150px du haut vers le bas
            if ($(this).scrollTop() > position_top_raccourci) {

                //on ajoute la classe classFixed
                menu.addClass(classFixed);
            } else {
                //sinon on retire la classe "fixNavigation" a <div id="navigation">
                menu.removeClass(classFixed);
            }
        });
    }

    setInterval(function(){
        //setFooter();
    },100);


    function setFooter() {

            // je recupere la hauteur du  document
            var windowHeight=$(window).height();
            if (windowHeight>0) {
                // je recuperer la taille du  contenu
                var contentHeight= mainHome.params.content.offsetHeight;
                // je recupere la taille du  footer
                var footerHeight=mainHome.params.footer.offsetHeight;

                if (windowHeight-(contentHeight+footerHeight)>=0) {
                    mainHome.params.footer.style.position='relative';
                    footerElement.style.top= (windowHeight-(contentHeight +footerHeight))+'px';
                }
                else {
                    mainHome.params.footer.style.position='static';
                }
            }

    }
});
