/**
 * Created by root on 06/07/2017.
 */

var AdminMember = function()
{
    this.params = {
        page : $('#adminMember'),
        attr: {
            id:{
                btn_role_action: $("#btn-role-action"),
                cb_roles: $("#cb-roles")
            },
            class:{

            }
        },
        api:{
            action :
            {update: baseUrl +"auth/member/"},
            method:
            {put:"PUT"},
            headers:
            {auth: "X-Auth-Token"}
        }
    };

};



$(function(){

    // instanciation  de la classe AdminMember
    var adminMember = new AdminMember();

    //tester si  la page actuelle c'est adminMember
    if(adminMember.params.page.data('page') === "adminMember")
    {

    }

    adminMember.params.attr.id.btn_role_action.click(function(e)
    {
        var edit = parseInt($(this).data('edit')),
            cb_roles = adminMember.params.attr.id.cb_roles;

        if(edit === 0)
        {
            $(this).data('edit', 1).text('Save');

            cb_roles.prop('disabled', false);
        }
        else
        {
            //Si le rôle a été modifié
            if(cb_roles.data('role') !== cb_roles.val())
            {
                var id = $(this).data('mid');

                var data = {role : cb_roles.val()};

                $.ajax({
                    url: adminMember.params.api.action.update + id + '/role',
                    type: adminMember.params.api.method.put,
                    headers : {"X-Auth-Token" : tokenbase.value},
                    data: data,
                    crossDomain: true,
                    success: function (response) {
                        alert("Member's changed successfully !");
                        cb_roles.data('role', data.role);
                    },
                    error: function (xhr, status, message) {
                        console.log(status+"\n"+xhr.responseText + '\n' + message );
                    }
                });
            }

            $(this).data('edit', 0).text('Change role');
            adminMember.params.attr.id.cb_roles.prop('disabled', true);
        }
        e.preventDefault();
    });
});
