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
                modal_email: $('#modal-email')
            },
            class:{

            }
        },
        api:{
            action :
            {
                update: baseUrl +"auth/member/",
                bulk_email: baseUrl +"auth/send-email",
            },
            method:
            {
                put:"PUT",
                post: "POST"
            },
            headers:
            {auth: "X-Auth-Token"}
        }
    };

};



$(function(){

    // Instanciation  de la classe AdminMember
    var adminMember = new AdminMember();

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

                $.ajax({
                    url: adminMember.params.api.action.bulk_email,
                    type: adminMember.params.api.method.post,
                    headers : {"X-Auth-Token" : tokenbase.value},
                    data: data,
                    crossDomain: true,
                    success: function (response) {
                        alert("Email sent successfully !");
                    },
                    error: function (xhr, status, message) {
                        console.log(status+"\n"+xhr.responseText + '\n' + message );
                    }
                });
            }
            e.preventDefault();
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
