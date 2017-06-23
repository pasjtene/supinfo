/**
 * Created by Danick takam on 16/06/2017.
 */

var AdminHome = function()
{
    this.params = {
        page : $('#adminHome'),
        tab:{
            message: $("#message")
        },
        attr: {
            id:{
                nbmessage: $("#nbmessage"),
                message_list: $("#message_list")
            },
            class:{
                nbrofchkbox: $('.nbrofchkbox'),
                user_select_checkbox: $('.message_select_checkbox'),
                total_message: $(".total_message")
            }
        },
        api:{
            action :
            {findall: baseUrl +"v1/auth/message"},
            method:
            {get:"GET"},
            headers:
            {auth: "X-Auth-Token"}
        }
    };

};



$(function(){

    // instanciation  de la classe AdminHome
    var adminHome = new AdminHome();

    //tester si  la page actuelle c'est adminHome
    if(adminHome.params.page.data('page')=="adminHome")
    {

        // teste si le tokenbase n'ai pas encore modifie chaque 0,1s
        interval = setInterval(function(){
            //si  le token est deja modifie
            if(tokenbase!=null)
            {
                //on appel la methode pour charger la partir membre (car la fonction demande que le token exit et ne soit pas null)
                setMessage();
                //puisque le token n'est plus a present il  faut qu'on arrete de tester
                clearInterval(interval);
            }
        },100);


        //methode pour gerer les membres
        function setMessage(){
            if(adminHome.params.tab.message.data('tab')=="adminMessage")
            {

                //This function counts the number of checkboxes that are checked
                function updateCount () {
                    var count = $("input[type=checkbox]:checked").length;
                    adminHome.params.attr.class.nbrofchkbox.text(count);
                    adminHome.params.attr.id.nbmessage.toggle(count > 0);
                }

                //When the table is clicked, we count the number of selected checkboxed
                updateCount ();
                adminHome.params.attr.id.message_list.click(function(event){
                    adminHome.params.attr.class.message_select_checkbox.each(function(){
                        $(this).change(updateCount);
                        updateCount();
                    });
                });

                //find the users list
                $.ajax(
                    {
                        url: adminHome.params.api.action.findall,
                        type: adminHome.params.api.method.get,
                        headers : {"X-Auth-Token" : tokenbase.value},
                        crossDomain: true,
                        success: function (users) {
                            console.log(users);
                            var chkbox = '<input class="form-check-input" type="checkbox" id="blankCheckbox" value="option1" aria-label="...">';

                            adminHome.params.attr.class.total_message.append(message.length);
                            $.each(users, function(i, user){

                                var row = $('<tr>').html("<td>" + (i+1) +
                                    "</td><td>" + message.message_parent_id +
                                    "</td><td>" + message.sender_id +
                                    "</td><td>" + message.content +
                                    "</td><td>" + message.createDate +
                                    "</td><td>" + message.isValid +
                                    "</td>");
                                $("<td />").html('<input class="message_select_checkbox" type="checkbox" name="message_id_to_fix"/>').appendTo(row);
                                row.appendTo('.users_table');

                            });
                        },
                        error: function (xhr, status, message) {
                            console.log(status+"\n"+xhr.responseText + '\n' + message );
                        }
                    }
                );

                clearInterval(interval);
            }
        }
    }
});
