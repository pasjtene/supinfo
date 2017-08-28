/**
 * Created by tene on 26/08/2017.
 */
//alert("loaded++");


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
                users_loader: $("#users-loader"),
                prev_pagination: $("#pg-prev"),
                next_pagination: $("#pg-next")
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
            {
                get:"GET",
                delete:"DELETE"
            },
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

var countries = [];

var getCountriesList = function(){
    $.getJSON(path.country[locale], function (result) {
        countries = result;
    });
};

var adminHome = new AdminHome();
function jsetMember(){
    //if(adminHome.params.tab.members.data('tab')=="adminMembers")
    //{
        //When the table is clicked, we count the number of selected checkboxed

        jupdateCount ();
        $(adminHome.params.attr.id.user_list).click(function(event){

            $('.user_select_checkbox').each(function(){
                $(this).change(jupdateCount);
                jupdateCount();
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

                success: function (response)
                {
                    console.log(response);
                    adminHome.params.attr.id.total_users.html(response.total);
                    adminHome.params.attr.id.users_table_body.empty();
                    adminHome.params.attr.id.users_loader.hide();

                    //modifications to the table need to match the table in members.js
                    $.each(response.users, function(i, user){
                        var row = $('<tr>').html("<td>" + (i+1) +
                            "</td><td><a href='"+Routing.generate("admin_view_member", {_locale:locale,  id:user.id})+"'>"+ user.firstName+"</a>"+
                            "</td><td>" + user.id +
                            "</td><td>" + user.email +
                            "</td><td>" + user.joinDate.replace("T", " ").replace("+00:00", " ") +
                            "</td><td><img src='"+path.flags+user.country+".png' alt=''/> " + countries[user.country] +
                            "</td><td>" + user.gender +
                            "</td><td>" + (user.enabled ? "Enabled" : "Locked") +
                            "</td><td>" + (user.isVip ? "Yes" : "No") +
                            "</td>");
                        $("<td />").html('<input class="user_select_checkbox" type="checkbox" name="'+ user.id+'" value="'+ user.email+'"/>').appendTo(row);
                        //augmenter les users dans le tableau
                        adminHome.params.attr.id.users_table_body.append(row);
                        //row.appendTo('.users_table');

                    });

                    adminHome.params.attr.id.prev_pagination.data('page', response.pagePrev);
                    adminHome.params.attr.id.next_pagination.data('page', response.pageNext);
                    var listItem = "";
                    for(var i = 1; i<= response.paginationCount; i++){
                        listItem += '<li class="page-item '+((response.page === i) ? "active" : "")+'" ><a class="page-link" href="#" data-page="'+i+'">'+i+'</a></li>';
                    }

                    $(listItem).insertAfter(adminHome.params.attr.id.prev_pagination.parent('li'));

                    if(response.page === response.pagePrev){
                        adminHome.params.attr.id.prev_pagination.parent('li').addClass('disabled');
                    }else{
                        adminHome.params.attr.id.prev_pagination.parent('li').removeClass('disabled');
                    }

                    if(response.paginationCount === response.page){
                        adminHome.params.attr.id.next_pagination.parent('li').addClass('disabled');
                    }else{
                        adminHome.params.attr.id.next_pagination.parent('li').removeClass('disabled');
                    }
                },
                error: function (xhr, status, message) { //en cas d'erreur
                    console.log(status+"\n"+xhr.responseText + '\n' + message );
                }
            }
        );

    //}
}


function jupdateCount () {
    var count = $("input[type=checkbox]:checked").length;
    adminHome.params.attr.class.nbrofchkbox.text(count);
    adminHome.params.attr.id.nbusers.toggle(count > 0);

}

function selectedUsersList() {
    var selectedUsers = getSelectedUsers();

    deleteUsers(selectedUsers);
}

function deleteUsers(v) {
    alert("Deleting users with ids: "+v);
    $.ajax(
        {
            url: adminHome.params.api.action.delete_users + v,
            type: adminHome.params.api.method.delete,
            headers : {"X-Auth-Token" : tokenbase.value},
            crossDomain: true,
            success: function (users) {
                $.each(users, function(i, user){
                    jupdateCount();
                });

                //refresh the members table
                jsetMember();
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



$(function(){

    // instanciation  de la classe AdminHome
    var adminHome = new AdminHome();

    getCountriesList();

    $("#latest-members-list").hide();
    $("#latest_members").click(function(){
        $("#latest-pictures-list").hide();
        $("#admin-help").hide();
        $("#stats").hide();
        //alert("Clicked ++");
        interval = setInterval(function(){
            //si  le token est deja modifie
            if(tokenbase!=null)
            {
                //on appel la methode pour charger la partir membre (car la fonction demande que le token exit et ne soit pas null)
                jsetMember();
                adminHome.params.attr.id.btn_delete_users.click(selectedUsersList);

                //puisque le token n'est plus null a present il  faut qu'on arrete de tester
                clearInterval(interval);
            }
        },100);

        $("#latest-members-list").show();
    });

/*
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


    }
    */

});