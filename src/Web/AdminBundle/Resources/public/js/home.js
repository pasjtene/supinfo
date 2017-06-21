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



//Ce code devra etre optimise pour utiliser les parametres de adminHome definit plus haut.
$(document).ready(function(){
    //This function counts the number of checkboxes that are checked
    function updateCount () {
        var count = $("input[type=checkbox]:checked").length;
        $(".nbrofchkbox").text(count);
        $("#nbusers").toggle(count > 0);
    };

    $(document).ready(function(){
        //When the table is clicked, we count the number of selected checkboxed
        updateCount ()
        $("#user_list").click(function(event){
            $('.user_select_checkbox').each(function(){
                $(this).change(updateCount);
                updateCount();
            });
        });

        $.getJSON('/api/users', function(users){
            $(function(){
                var chkbox = '<input class="form-check-input" type="checkbox" id="blankCheckbox" value="option1" aria-label="...">';

                $('.total_users').append(users.length);
                $.each(users, function(i, user){

                    var row = $('<tr>').html("<td>" + (i+1) +
                        "</td><td>" + user.firstName +
                        "</td><td>" + user.gender +
                        "</td>");
                    $("<td />").html('<input class="user_select_checkbox" type="checkbox" name="user_id_to_fix"/>').appendTo(row);
                    row.appendTo('.users_table');

                });
            });
        });

    });
});