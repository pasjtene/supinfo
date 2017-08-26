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
                country: $('#mb-country'),
                btn_delete_member: $('#btn-delete-member'),
                user_ip: $("#user-ip"),
                btn_block_ip: $("#btn-block-ip"),
                btn_mb_country: $("#btn-mb-country"),
                cb_country: $("#cb-country")
            },
            class:{

            }
        },
        api:{
            action :
            {
                update: baseUrl +"auth/member/",
                lock: baseUrl + "auth/members/lock",
                vip: baseUrl + "auth/members/vip",
                delete: baseUrl + "auth/members/delete/",
                blockedIp: baseUrl + "auth/blocked-ip",
                country: baseUrl + "auth/members/country",
            },
            method:
            {
                put:"PUT",
                post: "POST",
                get: "GET",
                delete: "DELETE"
            },
            headers:
            {auth: "X-Auth-Token"}
        }
    };

};

$(function()
{
    var countries = [];

    var getCountriesList = function(){
        $.getJSON(path.country[locale], function (result) {
            countries = result;
        });
    };

    var adminMemberProfile = new AdminMemberProfile();

    var checkIp = function()
    {
        var ip = adminMemberProfile.params.attr.id.user_ip.text();

        $.ajax(
        {
            url: adminMemberProfile.params.api.action.blockedIp + "?ip="+ip,
            type: adminMemberProfile.params.api.method.get,
            headers: {"X-Auth-Token": currentUser.token},
            crossDomain: true,
            success: function (response) {
                //console.log(response);
                if(response.ip !== null){
                    adminMemberProfile.params.attr.id.user_ip.addClass('text-danger');
                }
            },
            error: function (xhr, status, message) {
                console.log(status + "\n" + xhr.responseText + '\n' + message);
            }
        });
    };

    if(adminMemberProfile.params.page.data('page') === "adminMember")
    {
        getCountriesList();

        var country = adminMemberProfile.params.attr.id.country.data('country');

        setTimeout(function(){
            adminMemberProfile.params.attr.id.country.html("<img src='"+path.flags+country+".png' alt=''/> " + countries[country]);
            checkIp();
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
                        headers : {"X-Auth-Token" : currentUser.token},
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
                headers : {"X-Auth-Token" : currentUser.token},
                data: data,
                crossDomain: true,
                success: function (response) {
                    document.location.reload();
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

            var data = {members: mid, action: action};
            $.ajax({
                url: adminMemberProfile.params.api.action.vip,
                type: adminMemberProfile.params.api.method.put,
                headers : {"X-Auth-Token" : currentUser.token},
                data: data,
                crossDomain: true,
                success: function (response) {
                    document.location.reload();
                },
                error: function (xhr, status, message) {
                    console.log(status+"\n"+xhr.responseText + '\n' + message );
                }
            });
        });

        adminMemberProfile.params.attr.id.btn_delete_member.click(function(e)
        {
            var mid = $(this).data('mid');

            bootbox.confirm("You really want to delete this user ?", function(confirm)
            {
               if(confirm)
               {
                   $.ajax({
                       url: adminMemberProfile.params.api.action.delete + mid,
                       type: adminMemberProfile.params.api.method.delete,
                       headers : {"X-Auth-Token" : currentUser.token},
                       crossDomain: true,
                       success: function (users) {
                            window.location = Routing.generate('admin_home', {_locale: locale});
                       },
                       error: function (xhr, status, message) {
                           console.log(status+"\n" + message );
                       }
                   });
               }
            });
        });

        adminMemberProfile.params.attr.id.btn_block_ip.click(function(e)
        {
            var ip = $(this).data('ip');

            $.ajax(
            {
                url: adminMemberProfile.params.api.action.blockedIp,
                type: adminMemberProfile.params.api.method.post,
                headers: {"X-Auth-Token": currentUser.token},
                data: JSON.stringify({ip: ip}),
                crossDomain: true,
                success: function (response) {
                    //console.log(response);
                    if(response.code === 0){
                        bootbox.alert('The IP address is already blocked !');
                    }
                    else{
                        bootbox.alert('The IP address has been blocked successfully !');
                        adminMemberProfile.params.attr.id.user_ip.addClass('text-danger');
                    }
                },
                error: function (xhr, status, message) {
                    console.log(status + "\n" + xhr.responseText + '\n' + message);
                }
            });

            e.preventDefault();
        });

        adminMemberProfile.params.attr.id.btn_mb_country.click(function(e)
        {
            var that = $(this),
                action = parseInt(that.data('action'));

            if(action === 0)
            {
                $.getJSON(adminMemberProfile.params.attr.id.cb_country.data("path"), function(data) {
                    adminMemberProfile.params.attr.id.cb_country.empty();
                    $.each(data, function (index, value) {
                        var option = "<option  value='" + index + "'>" + value + "</option>";
                        adminMemberProfile.params.attr.id.cb_country.append(option);
                    });
                    adminMemberProfile.params.attr.id.cb_country.removeClass('invisible');
                    //that.text(Translator.trans('lbl_save_country', {}, 'member')).data('action', '1');
                    that.text("Save").data('action', '1');
                });
            }
            else
            {
                var country = adminMemberProfile.params.attr.id.cb_country.val(),
                    mid = parseInt(that.data('mid')),
                    data = {mid: mid, country: country};
                $.ajax({
                    url: adminMemberProfile.params.api.action.country,
                    type: adminMemberProfile.params.api.method.put,
                    headers : {"X-Auth-Token" : currentUser.token},
                    data: data,
                    crossDomain: true,
                    success: function (response) {
                        document.location.reload();
                    },
                    error: function (xhr, status, message) {
                        console.log(status+"\n"+xhr.responseText + '\n' + message );
                    }
                });
            }
            e.preventDefault();
        });
    }

});
