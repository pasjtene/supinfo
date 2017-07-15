/**
 * Created by Danick takam on 16/06/2017.
 */

var AdminHome = function()
{
    this.params = {
        page : $('#adminHome'),
        tab:{
            members: $("#profile")
        },
        attr: {
            id:{
                nbusers: $("#nbusers"),
                user_list: $("#user_list"),
                users_table_body: $("#users_table_body"),
                btn_delete_users: $("#btn_delete_users"),
                total_users: $("#total_users"),
                users_loader: $("#users-loader")
            },
            class:{
                nbrofchkbox: $('.nbrofchkbox'),
                user_select_checkbox: $('.user_select_checkbox'),
                showtab: 'shown.bs.tab'
            }
        },
        api:{
            action :
            {
                findall: baseUrl +"auth/members",
                delete_users: baseUrl +"auth/members/delete/"
            },
            method:
            {get:"GET"},
            headers:
            {auth: "X-Auth-Token"}
        }
    };

};

var getSelectedUsers = function(asObject)
{
    var checkboxes = document.getElementsByClassName("user_select_checkbox");
    var selectedUsers = "", objects = [];
    for (i = 0; i < checkboxes.length; i++) {
        if (checkboxes[i].checked) {
            if (selectedUsers !== ""){
                selectedUsers += ",";
            }
            selectedUsers += checkboxes[i].name;
            objects.push({"id" : checkboxes[i].name, "value" : checkboxes[i].value})
        }
    }

    return asObject === undefined ? selectedUsers : objects;
};


$(function(){

    // instanciation  de la classe AdminHome
    var adminHome = new AdminHome();

    //tester si  la page actuelle c'est adminHome
    if(adminHome.params.page.data('page')=="adminHome")
    {




        var activeTab = null;
        $('a[data-toggle="tab"]').on(adminHome.params.attr.class.showtab, function (e) {
            activeTab = e.target;
            if ($('.nav-tabs .active').text()==="Members"){
                // teste si le tokenbase n'ai pas encore modifie chaque 0,1s
                interval = setInterval(function(){
                    //si  le token est deja modifie
                    if(tokenbase!=null)
                    {
                        //on appel la methode pour charger la partir membre (car la fonction demande que le token exit et ne soit pas null)
                        setMember();
                        adminHome.params.attr.id.btn_delete_users.click(selectedUsersList);

                        //puisque le token n'est plus null a present il  faut qu'on arrete de tester
                        clearInterval(interval);
                    }
                },100);
            }
        })


        function selectedUsersList() {
            var selectedUsers = getSelectedUsers();

           deleteUsers(selectedUsers);
        }


        function deleteUsers(v) {
            alert("Deleting users with ids: "+v);
            $.ajax(
                {
                    url: adminHome.params.api.action.delete_users + v,
                    type: adminHome.params.api.method.get,
                    headers : {"X-Auth-Token" : tokenbase.value},
                    crossDomain: true,
                    success: function (users) {
                         $.each(users, function(i, user){
                            //console.log("Deleting user: " + user.firstName);

                            //We will create a table for confirm delete users ...
                            /*
                            var row = $('<tr>').html("<td>" + (i+1) +
                                "</td><td>" + user.firstName +
                                "</td><td>" + user.email +
                                "</td><td>" + user.gender +
                                "</td>");
                            $("<td />").html('<input class="user_select_checkbox" type="checkbox" name="'+ user.id+'" value="'+ user.id+'"/>').appendTo(row);
                            //augmenter les users dans le tableau
                            adminHome.params.attr.id.users_table_body.append(row);
                            */
                            //row.appendTo('.users_table');
                            //adminHome.params.attr.class.total_users.replaceWith(i);

                            updateCount();
                        });

                        //refresh the members table
                        setMember();
                        adminHome.params.attr.id.nbusers.hide();
                        //Update the number of selected checkboxes

                    },
                    error: function (xhr, status, message) { //en cas d'erreur
                        //console.log(status+"\n"+xhr.responseText + '\n' + message );
                        console.log(status+"\n" + message );
                    }
                }
            );

        }


        //This function counts the number of checkboxes that are checked
        function updateCount () {
            var count = $("input[type=checkbox]:checked").length;
            adminHome.params.attr.class.nbrofchkbox.text(count);
            adminHome.params.attr.id.nbusers.toggle(count > 0);

        }

        //methode pour gerer les membres
        function setMember(){
            if(adminHome.params.tab.members.data('tab')=="adminMembers")
            {

                //When the table is clicked, we count the number of selected checkboxed
                updateCount ();
                $(adminHome.params.attr.id.user_list).click(function(event){

                    $('.user_select_checkbox').each(function(){
                        $(this).change(updateCount);
                        updateCount();
                    });

                    //la partie suivante est logiquement equivalente a celle du haut et devraie marchee, mais ne marche pas.
                    //on doit verifier

                    // adminHome.params.attr.class.user_select_checkbox.each(function(){
                    //   $(this).change(updateCount);
                    //   updateCount();
                    //});

                });
                adminHome.params.attr.id.users_loader.show();
                //find the users list
                $.ajax(
                    {
                        url: adminHome.params.api.action.findall,
                        type: adminHome.params.api.method.get,
                        headers : {"X-Auth-Token" : tokenbase.value},
                        crossDomain: true,
                        success: function (users) {
                            adminHome.params.attr.id.total_users.html(users.length);
                            adminHome.params.attr.id.users_table_body.empty();
                            adminHome.params.attr.id.users_loader.hide();
                            $.each(users, function(i, user){

                                var row = $('<tr>').html("<td>" + (i+1) +
                                    "</td><td><a href='"+Routing.generate("admin_view_member", {_locale:locale,  id:user.id})+"'>"+ user.firstName+"</a>"+
                                    "</td><td>" + user.email +
                                    "</td><td>" + user.gender +
                                    "</td><td>" + (user.enabled ? "Enabled" : "Locked") +
                                    "</td>");
                                $("<td />").html('<input class="user_select_checkbox" type="checkbox" name="'+ user.id+'" value="'+ user.email+'"/>').appendTo(row);
                                //augmenter les users dans le tableau
                                adminHome.params.attr.id.users_table_body.append(row);
                                //row.appendTo('.users_table');

                            });
                        },
                        error: function (xhr, status, message) { //en cas d'erreur
                            console.log(status+"\n"+xhr.responseText + '\n' + message );
                        }
                    }
                );

            }
        }
    }
});
