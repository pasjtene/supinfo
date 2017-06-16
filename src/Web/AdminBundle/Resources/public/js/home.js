/**
 * Created by Danick takam on 16/06/2017.
 */

var AdminHome = function()
{
    this.params = {
        class1 : $('.class1'),
        id1 : $('#id1'),
        form: {
            input1 : $("#input1"),
            input2 : $("#input2"),
            input3 : $("#input3"),
            input4 : $("#input4"),
            btnsubmit: $("#btnsubmit")
        }
    };

};


$(function(){

    var adminHome = new AdminHome();
    //exemple d'utilisation
    $(adminHome.params.form.btnsubmit).click(function(){

    });
});