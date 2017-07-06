/**
 * Created by Danick takam on 16/06/2017.
 */

var MainUserProfile = function()
{
    this.params = {
        page: $("#mainUserProfile"),
        id:{
            modalEmail: $("#modalEmail")
        }
    };

};


$(function(){

    var mainUserProfile = new MainUserProfile();

   if(mainUserProfile.params.page.data('page')=="mainUserProfile")
   {
       // force le background a ne pas reagir lorsqu'on   clic
       mainUserProfile.params.id.modalEmail.click(function(){
           if(!$(this).hasclass("show"))
           {
               $(this).addClass("show");
           }
       });

       mainUserProfile.params.id.modalEmail.modal('show');
   }
});