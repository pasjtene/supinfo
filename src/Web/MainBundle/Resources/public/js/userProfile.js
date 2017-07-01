/**
 * Created by Danick takam on 16/06/2017.
 */

var MainUserProfile = function()
{
    this.params = {
        page: $("#mainUserProfile"),
        modalEmail: $("#modalEmail")
    };

};


$(function(){

    var mainUserProfile = new MainUserProfile();

   if(mainUserProfile.params.page.data('page')=="mainUserProfile")
   {
       mainUserProfile.params.modalEmail.modal('show');
   }
});