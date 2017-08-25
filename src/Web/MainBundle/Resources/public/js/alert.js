var MainAlert = function(){
    this.params = {
        alert: $(".alert"),
        alert_close: $(".alert .close"),
        sucess: $("#successMessage"),
        error: $("#errorMessage"),
        info: $( "#infoMessage"),
        warning: $("#warningMessage"),
    }
};

$(function(){
   var mainAlert = new MainAlert();
    if(mainAlert.params.alert.data('alert')=="info")
    {
        mainAlert.params.alert_close.click(function(){
           window.location.href = Routing.generate(route,{_locale:locale});
        });
    }
});