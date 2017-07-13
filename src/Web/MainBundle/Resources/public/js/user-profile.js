/**
 * Created by Danick takam on 16/06/2017.
 */

var MainUserProfile = function()
{
    this.params = {
        page: $("#mainUserProfile"),
        api:{
           base: {
               url : baseUrl+"auth/user/base",
               method: "get",
               type: "json"
           },
            city: {
                url : baseUrl+"auth/user/city",
                method: "get",
                type: "json"
            }
        },
        id:{
            modalEmail: $("#modalEmail")
        },
        class:{
            carousel: $('.carousel')
        },
        filter:
        {
            countries: $("#countries"),
            cities: $("#cities"),
            age_min: $("#age-min"),
            age_max: $("#age-max"),
            surface_min: $("#surface-min"),
            surface_max: $("#surface-max"),
            profession: $("#profession"),
            sex: $("#sex"),
            btn: $("#filter-valider"),
            close: $("#filter-close"),
            modalfilter: $("#modalfilter")
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
       mainUserProfile.params.class.carousel.carousel({
           interval: 2000
       });



       // js du  filtre

       //fermer le modal
       mainUserProfile.params.filter.close.click(function(){
           mainUserProfile.params.filter.modalfilter.removeClass("show");
       });


       //alert(mainUserProfile.params.filter.countries.data("country"))

       //charger la liste des pays
       $.getJSON(mainUserProfile.params.filter.countries.data("country"), function(data){
           mainUserProfile.params.filter.countries.empty();
           $.each(data,function(index,value){
               var option = "<option value='"+index+"'>"+value+"</option>";
               mainUserProfile.params.filter.countries.append(option);
           });
       });

       //charger la liste des villes
       mainUserProfile.params.filter.countries.change(function(){
           //charger la liste des villes
           $.ajax({
               url: mainUserProfile.params.api.city.url,
               type:  mainUserProfile.params.api.city.method,
               data: "country="+$(this).val(),
               crossDomain: true,
               headers : {"X-Auth-Token" : currentUser.token},
               contentType: false,
               processData: false,
               dataType:  mainUserProfile.params.api.city.type,
               success: function(response){
                   console.log(response);
                   mainUserProfile.params.filter.cities.empty();
                   $.each(response,function(index,value){
                       var option = "<option value='"+value.city+"'>"+value.accentCity+"</option>";
                       mainUserProfile.params.filter.cities.append(option);
                   });
               },
               error: function (xhr, status, message) { //en cas d'erreur
                   console.log(status+"\n"+xhr.responseText + '\n' + message );
               },
               complete:function(){
                   console.log("Request finished.");
               }

           });
       });





       //charger tous les elements de bases
       $.ajax({
           url: mainUserProfile.params.api.base.url,
           type:  mainUserProfile.params.api.base.method,
           data: "id="+currentUser.id,
           crossDomain: true,
           headers : {"X-Auth-Token" : currentUser.token},
           contentType: false,
           processData: false,
           dataType:  mainUserProfile.params.api.base.type,
           success: function(response){
               console.log(response);
           },
           error: function (xhr, status, message) { //en cas d'erreur
               console.log(status+"\n"+xhr.responseText + '\n' + message );
           },
           complete:function(){
               console.log("Request finished.");
           }

       });


   }
});