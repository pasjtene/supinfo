/**
 * Created by Danick takam on 16/06/2017.
 */

var AdminMessage = function()
{
    this.params = {
        page : $('#adminMessage'),
        tab:{
            message: $("#tabmessages")
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
            {findall: baseUrl +"auth/message"},
            method:
            {get:"GET"},
            headers:
            {auth: "X-Auth-Token"}
        }
    };

};



$(function(){

    // instanciation  de la classe AdminMessage
    var adminMessage = new AdminMessage();

    //tester si  la page actuelle c'est adminMessage
    if(adminMessage.params.page.data('page')=="adminHome")
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

            if(adminMessage.params.tab.message.data('tab')=="adminMessages")
            {

                //This function counts the number of checkboxes that are checked
                function updateCount () {
                    var count = $("input[type=checkbox]:checked").length;
                    adminMessage.params.attr.class.nbrofchkbox.text(count);
                    adminMessage.params.attr.id.nbmessage.toggle(count > 0);
                }

                //When the table is clicked, we count the number of selected checkboxed
                updateCount ();
                adminMessage.params.attr.id.message_list.click(function(event){
                    adminMessage.params.attr.class.message_select_checkbox.each(function(){
                        $(this).change(updateCount);
                        updateCount();
                    });
                });

                //find the users list
                $.ajax(
                    {
                        url: adminMessage.params.api.action.findall,
                        type: adminMessage.params.api.method.get,
                        headers : {"X-Auth-Token" : tokenbase.value},
                        crossDomain: true,
                        success: function (users) {
                            console.log(users);
                            var chkbox = '<input class="form-check-input" type="checkbox" id="blankCheckbox" value="option1" aria-label="...">';

                            adminMessage.params.attr.class.total_message.append(message.length);
                            $.each(users, function(i, user){

                                var row = $('<tr>').html("<td>" + (i+1) +
                                    "</td><td>" + message.messageParent +
                                    "</td><td>" + message.id +
                                    "</td><td>" + message.content +
                                    "</td><td>" + message.createDate +
                                    "</td><td>" + message.isValid +
                                    "</td><td>" + message.subMessages +
                                    "</td><td>" + message.sender +
                                    "</td><td>" + message.file +
                                    "</td>");
                                $("<td />").html('<input class="message_select_checkbox" type="checkbox" name="message_id_to_fix"/>').appendTo(row);
                                row.appendTo('.messages_table');

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
