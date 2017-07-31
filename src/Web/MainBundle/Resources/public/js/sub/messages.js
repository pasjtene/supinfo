var MainSubMessages = function()
{
    this.params = {
        page: $("#mainUserProfile"),
        sub: $("#Main-Subdetail-profile"),
        bg_action:$('#bg-action'),
        path: path.flags,
        api:{
            fill: {
                url : baseUrl+"auth/user/photo/profile/detail",
                method: "get",
                type: "json"
            },
            ask:{
                url : baseUrl+"auth/user/friend/ask",
                method: "post",
                type: "json"
            }
        },
        body:{

        }
    };

};


$(function () {
    var mainSubMessages = new MainSubMessages(),
        mainUserProfile_messages = new MainUserProfile();

    if(mainSubMessages.params.sub.data('sub')=="messages") {

         function setOwnMessage(content) {

         }

        function translateEmoticons(){
            return  data = {

            };
        }
    }
});



