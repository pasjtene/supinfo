/**
 * Created by root on 06/07/2017.
 */

var AdminMemberProfile = function()
{
    this.params = {
        page: $("#adminMember"),
        attr: {
            id:{
                btn_role_action: $("#btn-role-action"),
                cb_roles: $("#cb-roles"),
                btn_status_member : $("#btn-status-member"),
                btn_vip_member: $("#btn-vip-member"),
                country: $('#mb-country')
            },
            class:{

            }
        },
        api:{
            action :
            {
                update: baseUrl +"auth/member/",
                lock: baseUrl + "auth/members/lock",
                vip: baseUrl + "auth/members/vip"
            },
            method:
            {
                put:"PUT",
                post: "POST",
                get: "GET"
            },
            headers:
            {auth: "X-Auth-Token"}
        }
    };

};

$(function()
{
    var adminMemberProfile = new AdminMemberProfile();

    if(adminMemberProfile.params.page.data('page'))
    {
        var country = adminMemberProfile.params.attr.id.country.data('country');

        setTimeout(function(){
            adminMemberProfile.params.attr.id.country.html("<img src='"+path.flags+country+".png' alt=''/> " + countries[country]);
        }, 3000);

        adminMemberProfile.params.attr.id.btn_role_action.click(function(e)
        {
            var edit = parseInt($(this).data('edit')),
                cb_roles = adminMemberProfile.params.attr.id.cb_roles;

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
                        url: adminMemberProfile.params.api.action.update + id + '/role',
                        type: adminMemberProfile.params.api.method.put,
                        headers : {"X-Auth-Token" : tokenbase.value},
                        data: data,
                        crossDomain: true,
                        success: function (response) {
                            bootbox.alert("Member's changed successfully !");
                            cb_roles.data('role', data.role);
                        },
                        error: function (xhr, status, message) {
                            console.log(status+"\n"+xhr.responseText + '\n' + message );
                        }
                    });
                }

                $(this).data('edit', 0).text('Change role');
                adminMemberProfile.params.attr.id.cb_roles.prop('disabled', true);
            }

            e.preventDefault();
        });

        adminMemberProfile.params.attr.id.btn_status_member.click(function(e)
        {
            var action = $(this).data('action'),
                mid = $(this).data('mid');

            var data = {members: mid, action: action};
            $.ajax({
                url: adminMemberProfile.params.api.action.lock,
                type: adminMemberProfile.params.api.method.put,
                headers : {"X-Auth-Token" : tokenbase.value},
                data: data,
                crossDomain: true,
                success: function (response) {
                    action = "set";
                    //document.location.reload();
                },
                error: function (xhr, status, message) {
                    console.log(status+"\n"+xhr.responseText + '\n' + message );
                }
            });
        });

        adminMemberProfile.params.attr.id.btn_vip_member.click(function(e)
        {
            var action = $(this).data('action'),
                mid = $(this).data('mid');

            console.log(action);

            var data = {members: mid, action: action};
            $.ajax({
                url: adminMemberProfile.params.api.action.vip,
                type: adminMemberProfile.params.api.method.put,
                headers : {"X-Auth-Token" : tokenbase.value},
                data: data,
                crossDomain: true,
                success: function (response) {
                    //document.location.reload();
                },
                error: function (xhr, status, message) {
                    console.log(status+"\n"+xhr.responseText + '\n' + message );
                }
            });
        });
    }

});
