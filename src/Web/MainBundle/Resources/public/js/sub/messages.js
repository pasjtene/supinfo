var MainSubMessages = function()
{
    this.params = {
        page: $("#mainUserProfile"),
        sub: $("#Main-Messages"),
        bg_action:$('#bg-action'),
        path: path.flags,
        api:{
            getAll: {
                url : baseUrl+"auth/Message/all",
                method: "get",
                type: "json"
            },
            get: {
                url : baseUrl+"auth/Message/conversation",
                method: "get",
                type: "json"
            },
            post:{
                url : baseUrl+"auth/Message/add",
                method: "post",
                type: "json"
            },
            put:{
                url : baseUrl+"auth/Message/update",
                method: "put",
                type: "json"
            },
            delete:{
                url : baseUrl+"auth/Message/delete",
                method: "delete",
                type: "json"
            },
            friend:{
                url : baseUrl+"auth/user/friends/cuurent",
                method: "get",
                type: "json"
            },
            countConversation:{
                url : baseUrl+"auth/Message/conversations/count",
                method: "get",
                type: "json"
            }
        },
        member_list: {
            body : $("#Main-Messages .member_list .list-unstyled"),
            user_list : $("#Main-Messages .member_list .list-unstyled li")
        },
        chat_area: {
            body_content : $("#Main-Messages .chat_area"),
            body : $("#Main-Messages .chat_area .list-unstyled"),
            send: $("#Main-Messages .message_write .btn_send"),
            emoticon_btn:$("#Main-Messages .message_write #chat_bottom_emoyoyi"),
            emoticon_body:$("#Main-Messages .message_write .chat_bottom_emoyoyi .row"),
            img_sender:$("#Main-Messages .message_write .img_sender img"),
            img_reciever:$("#Main-Messages .message_write .img_reciever img")
        },
        body:{
            message_text: $('#Main-Messages #message-text'),
            caretposition: $('#Main-Messages #caretposition')
        }
    },
   this.getAll = function(cb,objet,errorMessage)
    {
        $.ajax(
            {
               url: this.params.api.getAll.url,
               type: this.params.api.getAll.method,
               data: objet,
               headers : {"X-Auth-Token" : currentUser.token},
               crossDomain: true,
               dataType:  this.params.api.getAll.type,
               success: function (data) {
                    console.log(data);
                    cb(data);
               },
               error: function (xhr, status, message) {
                    console.log(xhr.responseText);
                    bootbox.alert(errorMessage,function(){});
               }
            }
        );
    },
    this.get = function(cb,objet,errorMessage)
    {
        $.ajax(
            {
                url: this.params.api.get.url,
                type: this.params.api.get.method,
                data: objet,
                crossDomain: true,
                headers : {"X-Auth-Token" : currentUser.token},
                dataType:  this.params.api.get.type,
                success: function (data) {
                    console.log(data);
                    cb(data);
                },
                error: function (xhr, status, message) {
                    console.log(xhr.responseText);
                    bootbox.alert(errorMessage,function(){});
                }
            }
        );
    },
    this.post = function(cb,objet,errorMessage)
    {
        $.ajax(
            {
               url: this.params.api.post.url,
               type: this.params.api.post.method,
               data: objet,
               crossDomain: true,
               dataType:  this.params.api.post.type,
               headers : {"X-Auth-Token" : currentUser.token},
               success: function (data) {
                    console.log(data);
                    cb(data);
               },
               error: function (xhr, status, message) {
                  console.log(xhr.responseText);
                  bootbox.alert(errorMessage,function(){});
               }
            }
        );
    },
    this.put = function(cb,objet,errorMessage)
    {
        $.ajax(
            {
               url: this.params.api.post.url,
               type: this.params.api.put.method,
               data: objet,
               crossDomain: true,
               dataType:  this.params.api.put.type,
               headers : {"X-Auth-Token" : currentUser.token},
               success: function (data) {
                    console.log(data);
                    cb(data);
               },
               error: function (xhr, status, message) {
                   console.log(xhr.responseText);
                   bootbox.alert(errorMessage,function(){});
               }
            }
        );
    },
    this.delete = function(cb,objet,errorMessage)
    {
        $.ajax(
            {
               url: this.params.api.delete.url,
               type: this.params.api.delete.method,
               data: objet,
               crossDomain: true,
               dataType:  this.params.api.delete.type,
               headers : {"X-Auth-Token" : currentUser.token},
               success: function (data) {
                    console.log(data);
                    cb(data);
               },
               error: function (xhr, status, message) {
                    console.log(xhr.responseText);
                    bootbox.alert(errorMessage,function(){});
               }
            }
        );
    },
    this.friend =  function context(cb,objet,errorMessage)
        {
            var isok =false;
            $.ajax(
                {
                    url: this.params.api.friend.url,
                    type: this.params.api.friend.method,
                    data: objet,
                    crossDomain: true,
                    headers : {"X-Auth-Token" : currentUser.token},
                    dataType:  this.params.api.friend.type,
                    success: function (data) {
                        console.log(data);
                        isok =true;
                        return {'data':data, 'isok':isok};
                    },
                    error: function (xhr, status, message) {
                        console.log(xhr.responseText);
                        bootbox.alert(errorMessage,function(){});
                    }
                }
            );

        }
};


$(function () {
    var mainSubMessages = new MainSubMessages(),
        mainUserProfile_messages = new MainUserProfile();

    if(mainSubMessages.params.sub.data('sub')=="messages") {

        //variables globales
        var selectUserId = 0,
            countListMessageUserCurrent = 0,
            countListMessageUserCurrentnew = 0,
            countMessageNotSee = 0,
            errorMessage = "something is wrong";


            // declancher l'accuse de reception
            setInterval(function(){
                var data ={
                    id : currentUser.id,
                    idFriend: selectUserId
                };
                getNotifieCount(data,errorMessage);
            },3000);

        mainSubMessages.params.body.message_text.empty();
        mainSubMessages.params.body.message_text.focus();
            //envoyer un message en cliquant  sur entree
            mainSubMessages.params.body.message_text.keyup(function(e){
                //placeCaretAtEnd($(this).get(0));
               if(e.keyCode==32){
                 if( translateEmotion(listEmoticons(),$(this),path.emoticon))
                 {
                     setCaret($(this).get(0),false);
                 }
               }
                if(e.keyCode==13)
                {
                    e.preventDefault();
                    mainSubMessages.params.chat_area.send.trigger('click');
                }
            });


        function get(objet,errorMessage,isobjet)
        {
            $.ajax(
                {
                    url: mainSubMessages.params.api.get.url,
                    type: mainSubMessages.params.api.get.method,
                    data: objet,
                    crossDomain: true,
                    headers : {"X-Auth-Token" : currentUser.token},
                    dataType:  mainSubMessages.params.api.get.type,
                    success: function (data) {
                        console.log(data);
                        if(data!=null  && data !="null" && data!="undefined")
                        {
                            countListMessageUserCurrent = (data.recievers!=null && data.recievers!='null')? data.recievers.length: 0;
                            countListMessageUserCurrentnew = countListMessageUserCurrent;
                            setmessageContent(data,mainSubMessages.params.chat_area.body,isobjet);
                        }
                    },
                    error: function (xhr, status, message) {
                        console.log(xhr.responseText);
                       // bootbox.alert(errorMessage,function(){});
                    }
                }
            );
        }

        function getNotifieCount(objet,errorMessage)
        {
            $.ajax(
                {
                    url: mainSubMessages.params.api.countConversation.url,
                    type: mainSubMessages.params.api.countConversation.method,
                    data: objet,
                    crossDomain: true,
                    headers : {"X-Auth-Token" : currentUser.token},
                    dataType:  mainSubMessages.params.api.countConversation.type,
                    success: function (data) {
                       // console.log(data);
                        if(data!=null  && data !="null" && data!="undefined")
                        {
                            countListMessageUserCurrentnew = data.countMyFriendsMessage;
                            countMessageNotSee = data.notifiyCountMessage;
                            if(countListMessageUserCurrentnew !=countListMessageUserCurrent)
                            {
                                countListMessageUserCurrent =countListMessageUserCurrentnew;
                              //  alert("new : "+countListMessageUserCurrentnew +  " old : " + countListMessageUserCurrent);
                                if(selectUserId>0){
                                    var data ={
                                        id : currentUser.id,
                                        idFriend: selectUserId
                                    };
                                    get(data,errorMessage,false);
                                }

                            }
                        }
                    },
                    error: function (xhr, status, message) {
                        console.log(xhr.responseText);
                       // bootbox.alert(errorMessage,function(){});
                    }
                }
            );
        }

        //liste les amis
         fillFriend({ id: currentUser.id },errorMessage);
        function fillFriend(objet,errorMessage)
        {
            var isok =false;
            $.ajax(
                {
                    url: mainSubMessages.params.api.friend.url,
                    type: mainSubMessages.params.api.friend.method,
                    data: objet,
                    crossDomain: true,
                    headers : {"X-Auth-Token" : currentUser.token},
                    dataType:  mainSubMessages.params.api.friend.type,
                    success: function (data) {
                        console.log(data);
                        if(data!=null  && data !="null" && data!="undefined")
                        {
                            setfriendList(data.listUsers,mainSubMessages.params.member_list.body);
                        }

                    },
                    error: function (xhr, status, message) {
                        console.log(xhr.responseText);
                        bootbox.alert(errorMessage,function(){});
                    }
                }
            );

        }


        function post(objet,errorMessage,isobjet)
        {
            $.ajax(
                {
                    url: mainSubMessages.params.api.post.url,
                    type: mainSubMessages.params.api.post.method,
                    data: objet,
                    crossDomain: true,
                    dataType:  mainSubMessages.params.api.post.type,
                    headers : {"X-Auth-Token" : currentUser.token},
                    success: function (data) {
                        console.log(data);
                        if(data!=null && data!="null" && data!="undefined")
                        {
                            setmessageContent(data,mainSubMessages.params.chat_area.body,isobjet);
                            mainSubMessages.params.body.message_text.empty();
                            //countListMessageUserCurrent++;
                            //countListMessageUserCurrentnew = countListMessageUserCurrent;
                        }

                    },
                    error: function (xhr, status, message) {
                        console.log(xhr.responseText);
                        bootbox.alert(errorMessage,function(){});
                    }
                }
            );
        }

        function listEmoticons(){
                    return  data = {
                            ":Blanco" : "/00 Blanco.png",
                            ":centaur" : "/001-centaur.png",
                            ":leggings" : "/001-leggings.png",
                            ":sick-1" : "/001-sick-1.png",
                            ":Smile" : "/01 Smile.png",
                            ":gloves" : "/002-gloves.png",
                            ":in-love" : "/002-in-love.png",
                            ":kraken" : "/002-kraken.png",
                            ":Laugh" : "/02 Laugh.png",
                            ":dinosaur" : "/003-dinosaur.png",
                            ":scared" : "/003-scared.png",
                            ":socks" : "/003-socks.png",
                            ":Silly" : "/03 Silly.png",
                            ":sun-lotion" : "/004-sun-lotion.png",
                            ":tree-1" : "/004-tree-1.png",
                            ":004-waiting" : "/004-waiting.png",
                            ":04 Wink" : "/04 Wink.png",
                            ":005-employee" : "/005-employee.png",
                            ":005-hand" : "/005-hand.png",
                            ":005-shoe" : "/005-shoe.png",
                            ":05 Blush" : "/05 Blush.png",
                            ":006-echidna" : "/006-echidna.png",
                            ":006-sign" : "/006-sign.png",
                            ":006-writer" : "/006-writer.png",
                            ":06 Sad" : "/06 Sad.png",
                            ":007-robot" : "/007-robot.png",
                            ":007-stopwatch" : "/007-stopwatch.png",
                            ":007-wrestler" : "/007-wrestler.png",
                            ":07 Cool" : "/07 Cool.png",
                            ":008-helmet-1" : "/008-helmet-1.png",
                            ":008-model" : "/008-model.png",
                            ":008-mushroom" : "/008-mushroom.png",
                            ":08 Angry" : "/08 Angry.png",
                            ":009-hello" : "/009-hello.png",
                            ":009-location" : "/009-location.png",
                            ":09 Surprised" : "/09 Surprised.png",
                            ":010-bicycle" : "/010-bicycle.png",
                            ":010-phoenix" : "/010-phoenix.png",
                            ":010-troglodyte" : "/010-troglodyte.png",
                            ":10 Speechless" : "/10 Speechless.png",
                            ":011-dragon-1" : "/011-dragon-1.png",
                            ":011-pulsometer" : "/011-pulsometer.png",
                            ":011-space" : "/011-space.png",
                            ":11 Geek" : "/11 Geek.png",
                            ":012-devil" : "/012-devil.png",
                            ":012-heart-rate" : "/012-heart-rate.png",
                            ":012-pirate" : "/012-pirate.png",
                            ":12 Tease" : "/12 Tease.png",
                            ":013-light" : "/013-light.png",
                            ":013-troll" : "/013-troll.png",
                            ":013-worker" : "/013-worker.png",
                            ":13 Crazy" : "/13 Crazy.png",
                            ":014-alien" : "/014-alien.png",
                            ":014-wrench" : "/014-wrench.png",
                            ":014-zombie" : "/014-zombie.png",
                            ":14 Fools" : "/14 Fools.png",
                            ":015-minotaur" : "/015-minotaur.png",
                            ":015-plant" : "/015-plant.png",
                            ":015-wheel" : "/015-wheel.png",
                            ":15 Cry" : "/15 Cry.png",
                            ":016-finish-2" : "/016-finish-2.png",
                            ":016-madre-monte" : "/016-madre-monte.png",
                            ":016-painter" : "/016-painter.png",
                            ":16 XD" : "/16 XD.png",
                            ":017-cry" : "/017-cry.png",
                            ":017-finish-1" : "/017-finish-1.png",
                            ":017-satyr" : "/017-satyr.png",
                            ":17 Devil" : "/17 Devil.png",
                            ":018-karakasakozou" : "/018-karakasakozou.png",
                            ":018-panel" : "/018-panel.png",
                            ":018-shower" : "/018-shower.png",
                            ":18 Angel" : "/18 Angel.png",
                            ":019-glasses" : "/019-glasses.png",
                            ":019-music" : "/019-music.png",
                            ":019-pirate" : "/019-pirate.png",
                            ":19 Ill" : "/19 Ill.png",
                            ":020-finish" : "/020-finish.png",
                            ":020-guitar-player" : "/020-guitar-player.png",
                            ":020-werewolf" : "/020-werewolf.png",
                            ":20 Meow" : "/20 Meow.png",
                            ":021-run" : "/021-run.png",
                            ":021-scarecrow" : "/021-scarecrow.png",
                            ":021-start" : "/021-start.png",
                            ":21 Zip it" : "/21 Zip it.png",
                            ":022-computer" : "/022-computer.png",
                            ":022-gun" : "/022-gun.png",
                            ":022-valkyrie" : "/022-valkyrie.png",
                            ":22 Annoyed" : "/22 Annoyed.png",
                            ":023-chain" : "/023-chain.png",
                            ":023-coffee" : "/023-coffee.png",
                            ":023-curupira" : "/023-curupira.png",
                            ":23 Please" : "/23 Please.png",
                            ":024-clutch" : "/024-clutch.png",
                            ":024-loch-ness-monster" : "/024-loch-ness-monster.png",
                            ":024-reading" : "/024-reading.png",
                            ":24 Hay" : "/24 Hay.png",
                            ":025-money" : "/025-money.png",
                            ":025-pump" : "/025-pump.png",
                            ":025-tree" : "/025-tree.png",
                            ":25 Not guilty" : "/25 Not guilty.png",
                            ":026-cerberus" : "/026-cerberus.png",
                            ":026-eat" : "/026-eat.png",
                            ":026-helmet" : "/026-helmet.png",
                            ":26 Kissy" : "/26 Kissy.png",
                            ":027-angel" : "/027-angel.png",
                            ":027-gryphon" : "/027-gryphon.png",
                            ":027-road" : "/027-road.png",
                            ":27 Goatse" : "/27 Goatse.png",
                            ":028-mermaid" : "/028-mermaid.png",
                            ":028-rain" : "/028-rain.png",
                            ":028-water" : "/028-water.png",
                            ":28 Nomnomnom" : "/28 Nomnomnom.png",
                            ":029-phone-call" : "/029-phone-call.png",
                            ":029-uniform" : "/029-uniform.png",
                            ":029-vampire" : "/029-vampire.png",
                            ":29 Zzz" : "/29 Zzz.png",
                            ":030-bike" : "/030-bike.png",
                            ":030-goblin" : "/030-goblin.png",
                            ":030-kiss" : "/030-kiss.png",
                            ":30 Total shock" : "/30 Total shock.png",
                            ":031-laughing" : "/031-laughing.png",
                            ":031-yeti" : "/031-yeti.png",
                            ":31 In love" : "/31 In love.png",
                            ":032-leprechaun" : "/032-leprechaun.png",
                            ":032-surprised" : "/032-surprised.png",
                            ":32 Not one care" : "/32 Not one care.png",
                            ":033-angry" : "/033-angry.png",
                            ":033-medusa" : "/033-medusa.png",
                            ":33 Boring" : "/33 Boring.png",
                            ":034-chimera" : "/034-chimera.png",
                            ":034-sick" : "/034-sick.png",
                            ":34 Minishock" : "/34 Minishock.png",
                            ":035-car" : "/035-car.png",
                            ":035-elf" : "/035-elf.png",
                            ":35 Devil laugh" : "/35 Devil laugh.png",
                            ":036-hydra" : "/036-hydra.png",
                            ":036-love" : "/036-love.png",
                            ":36 James" : "/36 James.png",
                            ":037-cyclops" : "/037-cyclops.png",
                            ":037-selfie" : "/037-selfie.png",
                            ":37 Oh" : "/37 Oh.png",
                            ":038-pegasus" : "/038-pegasus.png",
                            ":038-rich" : "/038-rich.png",
                            ":38 Why thank you" : "/38 Why thank you.png",
                            ":039-narwhal" : "/039-narwhal.png",
                            ":039-thinking" : "/039-thinking.png",
                            ":39 Alien 1" : "/39 Alien 1.png",
                            ":040-ghost" : "/040-ghost.png",
                            ":040-woodcutter" : "/040-woodcutter.png",
                            ":40 Alien 2" : "/40 Alien 2.png",
                            ":041-detective" : "/041-detective.png",
                            ":041-zombie" : "/041-zombie.png",
                            ":41 Male" : "/41 Male.png",
                            ":042-dragon" : "/042-dragon.png",
                            ":042-exercise" : "/042-exercise.png",
                            ":42 Female" : "/42 Female.png",
                            ":043-frankenstein" : "/043-frankenstein.png",
                            ":043-sleeping" : "/043-sleeping.png",
                            ":43 Ghost" : "/43 Ghost.png",
                            ":044-cooker" : "/044-cooker.png",
                            ":044-witch" : "/044-witch.png",
                            ":44 Mario" : "/44 Mario.png",
                            ":045-bad" : "/045-bad.png",
                            ":045-fairy" : "/045-fairy.png",
                            ":046-beard" : "/046-beard.png",
                            ":046-genie" : "/046-genie.png",
                            ":047-pinocchio" : "/047-pinocchio.png",
                            ":047-sad" : "/047-sad.png",
                            ":048-cool" : "/048-cool.png",
                            ":048-ghost" : "/048-ghost.png",
                            ":049-birthday" : "/049-birthday.png",
                            ":049-wizard" : "/049-wizard.png",
                            ":050-happy" : "/050-happy.png",
                            ":050-unicorn" : "/050-unicorn.png",
                            ":angel" : "/angel.png",
                            ":angry-1" : "/angry-1.png",
                            ":bored" : "/bored.png",
                            ":bored-1" : "/bored-1.png",
                            ":bored-2" : "/bored-2.png",
                            ":BRB" : "/BRB.png",
                            ":Cellphone" : "/Cellphone.png",
                            ":Clock" : "/Clock.png",
                            ":clown" : "/clown.png",
                            ":confused-1" : "/confused-1.png",
                            ":cool" : "/cool.png",
                            ":cool-1" : "/cool-1.png",
                            ":cool-2" : "/cool-2.png",
                            ":cool-3" : "/cool-3.png",
                            ":couple" : "/couple.png",
                            ":couplekiss(p)" : "/couplekiss(p).png",
                            ":crying-1" : "/crying-1.png",
                            ":dancer(bk)" : "/dancer(bk).png",
                            ":dancer" : "/dancer.png",
                            ":depression" : "/depression.png",
                            ":dislike" : "/dislike.png",
                            ":embarrassed" : "/embarrassed.png",
                            ":emoticons" : "/emoticons.png",
                            ":female_farmer" : "/female_farmer.png",
                            ":File Blanco" : "/File Blanco.png",
                            ":File Picture" : "/File Picture.png",
                            ":File Text" : "/File Text.png",
                            ":Flower" : "/Flower.png",
                            ":gay" : "/gay.png",
                            ":geek" : "/geek.png",
                            ":Gift" : "/Gift.png",
                            ":giftest" : "/giftest.png",
                            ":happy-4" : "/happy-4.png",
                            ":Heart" : "/Heart.png",
                            ":hugging_face" : "/hugging_face.png",
                            ":ill" : "/ill.png",
                            ":Info" : "/Info.png",
                            ":kiss" : "/kiss.png",
                            ":kissing" : "/kissing.png",
                            ":laughing" : "/laughing.png",
                            ":like" : "/like.png",
                            ":love" : "/love.png",
                            ":mad" : "/mad.png",
                            ":Mail" : "/Mail.png",
                            ":man-and-woman" : "/man-and-woman.png",
                            ":me" : "/me.png",
                            ":metalfist" : "/metalfist.png",
                            ":money" : "/money.png",
                            ":moustache" : "/moustache.png",
                            ":Music 1" : "/Music 1.png",
                            ":Music 2" : "/Music 2.png",
                            ":nerd-1" : "/nerd-1.png",
                            ":ninja" : "/ninja.png",
                            ":Pencil" : "/Pencil.png",
                            ":PhotoCamera" : "/PhotoCamera.png",
                            ":Private 1" : "/Private 1.png",
                            ":Private 2" : "/Private 2.png",
                            ":punk" : "/punk.png",
                            ":quiet" : "/quiet.png",
                            ":robot" : "/robot.png",
                            ":sad" : "/sad.png",
                            ":sleep" : "/sleep.png",
                            ":smart" : "/smart.png",
                            ":smiling" : "/smiling.png",
                            ":star" : "/star.png",
                            ":stuck_out_tongue(br)" : "/stuck_out_tongue(br).png",
                            ":surprise" : "/surprise.png",
                            ":surprised" : "/surprised.png",
                            ":surprised-1" : "/surprised-1.png",
                            ":suspicious" : "/suspicious.png",
                            ":suspicious-1" : "/suspicious-1.png",
                            ":thumbsup" : "/thumbsup.png",
                            ":tongue" : "/tongue.png",
                            ":tongue-out" : "/tongue-out.png",
                            ":tongue-out-1" : "/tongue-out-1.png",
                            ":unhappy" : "/unhappy.png",
                            ":waou" : "/waou.png",
                            ":Web" : "/Web.png",
                            ":chine1" : "/chine1.png",
                            ":chine2" : "/chine2.png",
                            ":chine3" : "/chine3.png",
                            ":chine4" : "/chine4.png",
                            ":chine5" : "/chine5.png"
                    };
            }

        function getEmotions(path,icon)
        {
            return "<img src='"+path+icon+"'/>";
        }

        function  translateEmotion(list,element,path){
            var contentold = element.html();
            var content = element.html();
           $.each(list, function(key, value)
           {
                 content =   content.replace(key, getEmotions(path,value));
           });
            if(contentold!=content)
            {
                element.empty();
                element.append(content);
                return true;
            }
            return false;
        }

        function setEmoticons(element, src)
        {
            var content =
                '<a class="dropdown-item col-3"  data-img="'+src+'" href="#">'+
                    '<img class="" src="'+src+'"  alt="">'+
                '</a>';
            element.append(content);
        }
        function  fillEmotion(list,element,path){
            element.empty();
            var src = null;
            $.each(list, function(key, value)
            {
                src =   path+value;
                //console.log(src);
                setEmoticons(element,src);
            });
        }

        //charger la liste des emoticons
        fillEmotion(listEmoticons(),mainSubMessages.params.chat_area.emoticon_body,path.emoticon);
        function  setfriendList(list, element)
        {

            element.empty();
            for(var i=0; i<list.length; i++)
            {
                var photoApplicant = list[i].photoApplicant,
                    photoReciever = list[i].photoReciever,
                    request = list[i].request,
                    user = null;
                //alert();
                var src = null;
                if(request.receiver.id==currentUser.id)
                {
                    user = request.applicant;
                    if (( photoApplicant==null || photoApplicant=='null' || photoApplicant.hashname == null || photoApplicant.hashname == 'null')) {
                        src = path.emptyImage;
                    }
                    else {
                        src = baseHost + photoApplicant.path;
                    }
                }
                else
                {
                    user =  request.receiver;
                    if (( photoReciever==null || photoReciever=='null' || photoReciever.hashname == null || photoReciever.hashname == 'null')) {
                        src = path.emptyImage;
                    }
                    else {
                        src = baseHost + photoReciever.path;
                    }
                }
           // alert(user.id + "  current : " + currentUser.id);
                if(user.id !=currentUser.id && user.type!="System") {
                    var name = user.lastNameOrFirstname;
                    var city = user.city;
                    var  country = user.country;
                    var final =(city==null || city=="null")? getCountry(countryList,country) :city;
                    var flag ="<img class='sm-img flag' src='"+path.flags+country+".png' alt=''/> ";
                    var profession = user.profession==null || user.profession=="null"?'' : '('+ user.profession +')';
                    var lastLogin = new Date(user.lastLogin);
                    var toDay = new Date();
                    var state = user.isOnline? "<span class='small connect'>(connected)</span>" : null;
                    if(state==null)
                    {
                       if(lastLogin.toLocaleDateString() == toDay.toLocaleDateString())
                       {
                           state =(toDay-lastLogin)+"ago";
                       }
                    }
                    var content =
                        '<li class="left clearfix" data-id='+user.id+'>' +
                        '<span class="chat-img pull-left">' +
                        '<img src="'+src+'" alt="User Avatar" class="rounded-circle">' +
                        '</span>' +
                        '<div class="chat-body clearfix">' +
                        '<div class="header_sec">' +
                        '<strong class="primary-font">'+name+'</strong> <strong class="pull-right">' +
                         state+'</strong>' +
                        '</div>' +
                        '<div class="contact_sec">' +
                        '<strong class="primary-font">'+flag+final+'</strong> <span class="badge pull-right"></span>'+
                        '</div>' +
                        '</div>' +
                        '</li>';
                    element.append(content);
                }

            }
        }



        function  setmessageContent(list, element, isobjet)
        {

            var userMessages = null,
                message = null,
                createDate=null,
                sendDate =null,
                src =null,
                friendProfile = null,
                userProfile =null,
                content =null,
                today =new Date();

            if(isobjet)
            {
                   userMessages = list.userMessages;
                   message = userMessages.message;
                userProfile = list.profile;
                createDate =new Date(message.createDate);
                if(today.toLocaleDateString()==createDate.toLocaleDateString())
                {
                    sendDate = createDate.toLocaleTimeString();
                }
                else
                {
                    sendDate = createDate.toLocaleDateString();
                    sendDate=sendDate.replace("/","-");
                    sendDate=sendDate.replace("/","-");
                    sendDate+= " "+createDate.toLocaleTimeString();
                }
                if(userProfile!=null)
                {
                    src = baseHost + userProfile.path;
                }
                else
                {
                    src = path.emptyImage;
                }
                 content =
                    '<li class="left clearfix">'+
                    '<span class="chat-img1 pull-left">'+
                    '<img  src="'+src+'" alt="User Avatar" class="rounded">'+
                    '</span>'+
                    '<div class="chat-body1 clearfix">'+
                    '<p>'+message.content+'</p>'+
                    '<div class="chat_time pull-right">'+sendDate+'</div>'+
                    '</div>'+
                    '</li>';

                element.append(content);
            }
            else
            {
                element.empty();
                messages = list.messages;
                for(var i=0; i<messages.length;i++)
                {
                    userMessage = messages[i].userMessage;
                    friendProfile = messages[i].friendProfile;
                    userProfile = messages[i].userProfile;
                    message = userMessage.message;
                    createDate =new Date(message.createDate);
                    if(today.toLocaleDateString()==createDate.toLocaleDateString())
                    {
                        sendDate = createDate.toLocaleTimeString()
                    }
                    else
                    {
                        sendDate = createDate.toLocaleDateString();
                        sendDate = sendDate.replace("/","-");
                        sendDate = sendDate.replace("/","-");
                        sendDate+= " "+createDate.toLocaleTimeString();
                    }

                    var isSender =  messages[i].isSender;

                    if(isSender)
                    {
                        if(userProfile!=null)
                        {
                            src = baseHost + userProfile.path;
                        }
                        else
                        {
                            src = path.emptyImage;
                        }
                        mainSubMessages.params.chat_area.img_sender.attr('src',src);
                         content =
                            '<li class="left clearfix">'+
                            '<span class="chat-img1 pull-left">'+
                            '<img  src="'+src+'" alt="User Avatar" class="rounded">'+
                            '</span>'+
                            '<div class="chat-body1 clearfix">'+
                            '<p>'+message.content+'</p>'+
                            '<div class="chat_time pull-right">'+ sendDate+'</div>'+
                            '</div>'+
                            '</li>';

                    }
                    else
                    {
                        if(friendProfile!=null)
                        {
                            src = baseHost + friendProfile.path;
                        }
                        else
                        {
                            src = path.emptyImage;
                        }
                        mainSubMessages.params.chat_area.img_reciever.attr('src',src);
                        content=
                            '<li class="left clearfix admin_chat">'+
                            '<span class="chat-img1 pull-right">'+
                            '<img  src="'+src+'" alt="User Avatar" class="rounded">'+
                            '</span>'+
                            '<div class="chat-body1 clearfix">'+
                            '<p>'+message.content+'</p>'+
                            '<div class="chat_time pull-left">'+ sendDate+'</div>'+
                            '</div>'+
                            '</li>';
                    }


                    element.append(content);
                }
            }

            mainSubMessages.params.chat_area.body_content.scrollTop(10000);
        }

        function placeCaretAtEnd(el) {
            el.focus();
            if (typeof window.getSelection != "undefined"
                && typeof document.createRange != "undefined") {
                var range = document.createRange();
                range.selectNodeContents(el);
                range.collapse(false);
                var sel = window.getSelection();
                sel.removeAllRanges();
                sel.addRange(range);
            } else if (typeof document.body.createTextRange != "undefined") {
                var textRange = document.body.createTextRange();
                textRange.moveToElementText(el);
                textRange.collapse(false);
                textRange.select();
            }
        }

        function setCaret(target, isStart) {
            const range = document.createRange();
            const sel = window.getSelection();
            if (isStart){
                const newText = document.createTextNode('');
                target.appendChild(newText);
                range.setStart(target.childNodes[0], 0);
            }
            else {
                range.selectNodeContents(target);
            }
            range.collapse(isStart);
            sel.removeAllRanges();
            sel.addRange(range);
            target.focus();
            //target.select();
        }


        //lorsqu'on clique sur un user, on charge la conversation
        mainSubMessages.params.member_list.body.on('click','li',function(){
           selectUserId = $(this).data('id');
            mainSubMessages.params.chat_area.img_reciever.attr('src',path.emptyImage);
            mainSubMessages.params.chat_area.img_sender.attr('src',path.emptyImage);
            var data ={
                id : currentUser.id,
                idFriend: selectUserId
            };
            mainSubMessages.params.chat_area.send.prop('disabled',false);
            changeState(mainSubMessages.params.member_list.user_list, $(this));
            get(data,errorMessage,false);
        });
        mainSubMessages.params.chat_area.send.disabled =false;
     /*  var inter = setInterval(function(){
            if(selectUserId>0)
            {
                clearInterval(inter);

                mainSubMessages.params.chat_area.send.prop('disabled',true);
            }
            else{
                mainSubMessages.params.chat_area.send.prop('disabled',false);
            }
        },1000);
        */
        //envoyer un message
        mainSubMessages.params.chat_area.send.click(function(e){
            e.preventDefault();
            var data ={
                id : currentUser.id,
                idFriend: selectUserId,
                content : mainSubMessages.params.body.message_text.html()
            };
            post(data,errorMessage,true);
        });

        function changeState(Elements, ElementToActive) {
            var t = Elements.length;
            for (var i = 0; i < t; i++) {
                if (Elements.eq(i).hasClass('active_li')) {
                    Elements.eq(i).removeClass('active_li')
                }
            }
            ElementToActive.addClass('active_li');
            //alert();
        }
        mainSubMessages.params.chat_area.send.prop('disabled',true);

        //lors du  clique sur l'emoticon
        mainSubMessages.params.chat_area.emoticon_body.on('click','a',function(e){
            e.preventDefault();
           mainSubMessages.params.body.message_text.append(getEmotions($(this).data('img'),''));
        });

        mainSubMessages.params.chat_area.emoticon_btn.hover(function(){
           // $(this).trigger('click');
        });
    }
});



