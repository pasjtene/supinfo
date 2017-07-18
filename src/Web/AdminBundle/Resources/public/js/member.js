/**
 * Created by root on 06/07/2017.
 */

var AdminMember = function()
{
    this.params = {
        page : $('#adminHome'),
        attr: {
            id:{
                btn_role_action: $("#btn-role-action"),
                cb_roles: $("#cb-roles"),
                recipient_name: $('#recipient-name'),
                email_title: $('#email-title'),
                text_message: $("#message-text"),
                btn_send_email: $('#btn-send-email'),
                modal_email: $('#modal-email'),
                email_spinner: $("#email-spinner"),
                success_msg: $("#success-msg"),
                btn_lock_member : $("#btn-lock-members"),
                cb_property: $('#cb-property'),
                cb_order_users: $('#cb-order'),
                btn_order_users: $('#btn-order-users'),
                users_table_body: $("#users_table_body"),
                total_users: $("#total_users"),
                nbusers: $("#nbusers"),
                users_loader: $("#users-loader"),
                btn_vip_member: $("#btn-vip-members"),
                btn_unblock_member: $("#btn-unlock-members"),
                btn_unvip_member: $("#btn-unvip-members")
            },
            class:{
                checkbox : 'input[type="checkbox"]',
                nbrofchkbox: $('.nbrofchkbox')
            }
        },
        api:{
            action :
            {
                update: baseUrl +"auth/member/",
                bulk_email: baseUrl +"auth/send-email",
                lock: baseUrl + "auth/members/lock",
                findall: baseUrl +"auth/members",
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

$(function(){

    // Instanciation  de la classe AdminMember
    var adminMember = new AdminMember();

    var action = "set";

    var lockAction = function(selectedUsers)
    {
        var data = {members: selectedUsers, action: action};
        $.ajax({
            url: adminMember.params.api.action.lock,
            type: adminMember.params.api.method.put,
            headers : {"X-Auth-Token" : tokenbase.value},
            data: data,
            crossDomain: true,
            success: function (response) {
                action = "set";
                adminMember.params.attr.id.btn_order_users.trigger('click');
            },
            error: function (xhr, status, message) {
                console.log(status+"\n"+xhr.responseText + '\n' + message );
            }
        });
    };

    //Tester si  la page actuelle c'est adminMember
    if(adminMember.params.page.data('page') === "adminHome")
    {
        CKEDITOR.replace('message-text');

        adminMember.params.attr.id.modal_email.on('show.bs.modal', function (event)
        {
            var selecteUsers = getSelectedUsers(true),
                t = selecteUsers.length;

            if(t === 0)
            {
                adminMember.params.attr.id.recipient_name.val("");
                adminMember.params.attr.id.btn_send_email.prop('disabled', true);
            }
            else
            {
                adminMember.params.attr.id.btn_send_email.prop('disabled', false);

                var recipient = "";
                for(var i = 0; i < t; i++){
                    recipient += selecteUsers[i].value;
                    recipient += i !== t-1 ? ", " : "";
                }
                adminMember.params.attr.id.recipient_name.val(recipient);
            }
        });

        adminMember.params.attr.id.btn_send_email.click(function(e)
        {
            var recipients = adminMember.params.attr.id.recipient_name.val(),
                title = adminMember.params.attr.id.email_title.val(),
                message = CKEDITOR.instances['message-text'].getData();

            if(recipients.length > 0 && message.length > 0)
            {
                var data = {recipients: recipients, title: title, message: message};
                adminMember.params.attr.id.email_spinner.show();
                $.ajax({
                    url: adminMember.params.api.action.bulk_email,
                    type: adminMember.params.api.method.post,
                    headers : {"X-Auth-Token" : tokenbase.value},
                    data: data,
                    crossDomain: true,
                    success: function (response) {
                        adminMember.params.attr.id.success_msg.show();
                        adminMember.params.attr.id.email_spinner.hide();
                        setTimeout(function(){
                            adminMember.params.attr.id.success_msg.hide();
                            adminMember.params.attr.id.email_title.val("");
                            adminMember.params.attr.id.recipient_name.val("");
                            CKEDITOR.instances['message-text'].setData("");
                            adminMember.params.attr.id.modal_email.modal("hide");
                            $(adminMember.params.attr.class.checkbox).prop('checked', false);
                        }, 3000);
                    },
                    error: function (xhr, status, message) {
                        adminMember.params.attr.id.email_spinner.hide();
                        console.log(status+"\n"+xhr.responseText + '\n' + message );
                    }
                });
            }
            e.preventDefault();
        });

        adminMember.params.attr.id.btn_lock_member.click(function(e)
        {
            var selectedUsers = getSelectedUsers(),
                t = selectedUsers.length;

            if(t > 0 && confirm('You really want to block these members ?'))
            {
                lockAction(selectedUsers);
            }
            e.preventDefault();
        });

        adminMember.params.attr.id.btn_order_users.click(function(e)
        {
            var property = adminMember.params.attr.id.cb_property.val(),
                order = adminMember.params.attr.id.cb_order_users.val();

            var queryString = "?property="+property+"&order="+order;
            adminMember.params.attr.id.users_loader.show();
            adminMember.params.attr.id.users_table_body.empty();

            //find the users list
            $.ajax(
                {
                    url: adminMember.params.api.action.findall + queryString,
                    type: adminMember.params.api.method.get,
                    headers : {"X-Auth-Token" : tokenbase.value},
                    crossDomain: true,
                    success: function (users) {
                        adminMember.params.attr.id.total_users.html(users.length);

                        adminMember.params.attr.id.users_loader.hide();
                        $.each(users, function(i, user){

                            var row = $('<tr>').html("<td>" + (i+1) +
                                "</td><td><a href='"+Routing.generate("admin_view_member", {_locale:locale,  id:user.id})+"'>"+ user.firstName+"</a>"+
                                "</td><td>" + user.email +
                                "</td><td>" + user.country +
                                "</td><td>" + user.gender +
                                "</td><td>" + (user.enabled ? "Enabled" : "Locked") +
                                "</td><td>" + (user.isVip ? "Yes" : "No") +
                                "</td>");
                            $("<td />").html('<input class="user_select_checkbox" type="checkbox" name="'+ user.id+'" value="'+ user.email+'"/>').appendTo(row);
                            //augmenter les users dans le tableau
                            adminMember.params.attr.id.users_table_body.append(row);

                        });
                        var count = $("input[type=checkbox]:checked").length;
                        adminMember.params.attr.class.nbrofchkbox.text(0);
                        adminMember.params.attr.id.nbusers.toggle(count > 0);
                    },
                    error: function (xhr, status, message) { //en cas d'erreur
                        console.log(status+"\n"+xhr.responseText + '\n' + message );
                    }
                }
            );
        });

        adminMember.params.attr.id.btn_vip_member.click(function(e)
        {
            var selectedUsers = getSelectedUsers(),
                t = selectedUsers.length;

            if(t > 0)
            {
                var data = {members: selectedUsers, action: action};
                $.ajax({
                    url: adminMember.params.api.action.vip,
                    type: adminMember.params.api.method.put,
                    headers : {"X-Auth-Token" : tokenbase.value},
                    data: data,
                    crossDomain: true,
                    success: function (response) {
                        action = "set";
                        adminMember.params.attr.id.btn_order_users.trigger('click');
                    },
                    error: function (xhr, status, message) {
                        console.log(status+"\n"+xhr.responseText + '\n' + message );
                    }
                });
            }
            e.preventDefault();
        });

        adminMember.params.attr.id.btn_unvip_member.click(function(e)
        {
            action = "unset";
            adminMember.params.attr.id.btn_vip_member.trigger('click');
        });

        adminMember.params.attr.id.btn_unblock_member.click(function(e)
        {
            action = "unset";
            var selectedUsers = getSelectedUsers();

            lockAction(selectedUsers);
        });

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
    }
});
