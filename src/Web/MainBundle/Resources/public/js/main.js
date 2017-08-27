var DefaultMain =function(){
    this.params ={
        nav: {
            language : $("#nav-language")
        }
    }
}



// instantiation de default main
var defaultMain = new DefaultMain();

//lors qu clic sur le lien de traduction on force le rechargement de la page
defaultMain.params.nav.language.click(function(){
   // window.Location.href = $(this).attr('href');
});