$(function(){

    $(".etape-titre").click(function(){
        $(this).siblings(".etape-contenu").slideToggle("slow");
    });

});

