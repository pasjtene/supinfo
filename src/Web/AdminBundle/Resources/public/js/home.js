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
                user_list: $("#user_list")
            },
            class:{
                nbrofchkbox: $('.nbrofchkbox'),
                user_select_checkbox: $('.user_select_checkbox'),
                total_users: $(".total_users"),
                showtab: 'shown.bs.tab'
            }
        },
        api:{
            action :
            {findall: baseUrl +"v1/auth/users"},
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
                        //puisque le token n'est plus null a present il  faut qu'on arrete de tester
                        clearInterval(interval);
                    }
                },100);
            }
        })


        //methode pour gerer les membres
        function setMember(){
            if(adminHome.params.tab.members.data('tab')=="adminMembers")
            {

                //This function counts the number of checkboxes that are checked
                function updateCount () {
                    var count = $("input[type=checkbox]:checked").length;
                    adminHome.params.attr.class.nbrofchkbox.text(count);
                    adminHome.params.attr.id.nbusers.toggle(count > 0);
                }

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

                            //set du  total  des users
                            adminHome.params.attr.class.total_users.append(users.length);
                            $.each(users, function(i, user){

                                var row = $('<tr>').html("<td>" + (i+1) +
                                    "</td><td>" + user.firstName +
                                    "</td><td>" + user.gender +
                                    "</td>");
                                $("<td />").html('<input class="user_select_checkbox" type="checkbox" name="user_id_to_fix"/>').appendTo(row);
                                //augmenter les users dans le tableau
                                row.appendTo('.users_table');

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
