var MainSubDetailProfile = function()
{
    this.params = {
        page: $("#mainUserProfile"),
        sub: $("#Main-Subdetail-profile"),
        path: path.flags,
        link_photo: $ ("#Main-Subdetail-profile #zone_more_detail #link-profile-photo a"),
        link_photo_span: $ ("#Main-Subdetail-profile #zone_more_detail #link-profile-photo a span"),
        link_friend: $ ("#Main-Subdetail-profile #zone_more_detail #link-profile-friend a"),
        link_friend_span: $ ("#Main-Subdetail-profile #zone_more_detail #link-profile-friend a span "),
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
            img_profile: $("#zone_profile .img_profile"),
            full_name: $("#zone_profile .full_name"),
            full_profession: $("#zone_profile .full_profession"),
            chargement: $("#Main-Subdetail-profile  #chargement-detail-profile"),
            ask_button: $("#Main-Subdetail-profile  .ask button"),
            profile:{

            },
            friend:{
                body_detail_freinds: $("#Main-Subdetail-profile #body-photo-detail-profile-freinds"),
                zoomImg_detail_freinds_source: $("#Main-Subdetail-profile #zoomImg-detail-profile-freinds .zoomImgSource-detail-profile-freinds"),
                zoomImg_detail_freinds: $("#Main-Subdetail-profile #zoomImg-detail-profile-freinds"),
            },
            photo:{
                body_photo_detail: $("#Main-Subdetail-profile  #body-photo-detail-profile"),
                zoomImg_detail: $("#Main-Subdetail-profile  #zoomImg-detail-profile"),
                zoomImg_detail_source: $("#Main-Subdetail-profile  #zoomImg-detail-profile .zoomImgSource-detail-profile"),
            },
            about:{
                name : $('#zone_profile .about .name'),
                gender : $('#zone_profile .about .gender'),
                country : $('#zone_profile .about .country'),
                city : $('#zone_profile .about .city'),
                phone : $('#zone_profile .about .phone'),
                age : $('#zone_profile .about .age')
            },
            content:{
                vip : $("#zone_profile .content .vip"),
                countFriend: $("#zone_profile .content .countFriend"),
                profession: $("#zone_profile .content .profession"),
                joinReason: $("#zone_profile .content .joinReason")
            }
        }
    };

};


$(function () {
    var mainSubDetailProfile = new MainSubDetailProfile(),
        mainUserProfile_detail_profile = new MainUserProfile();

    if(mainSubDetailProfile.params.sub.data('sub')=="detail-profile")
    {
        //afficher le preloader
        mainSubDetailProfile.params.body.chargement.slideDown();

        //agrandir une photo
        mainSubDetailProfile.params.body.photo.body_photo_detail.on('click', "img",function() {
            mainSubDetailProfile.params.body.photo.zoomImg_detail_source.attr('src', $(this).attr('src'));
            mainSubDetailProfile.params.body.photo.zoomImg_detail.modal('show');
        });

        //agrandir une photo option friend
        mainSubDetailProfile.params.body.friend.body_detail_freinds.on('click', ".img_detail",function() {
            mainSubDetailProfile.params.body.friend.zoomImg_detail_freinds_source.attr('src', $(this).attr('src'));
            mainSubDetailProfile.params.body.friend.zoomImg_detail_freinds.modal('show');
        });


        //demande l'amtier
        mainSubDetailProfile.params.body.ask_button(function(){
            trans = Translator.trans('sub.success.ask',{},"detail-profile");
            bootbox.prompt(trans,function(result){
                if(result){
                    var datas = {
                        'applicantId': currentUser.id,
                        'receiverEmail': mainSubDetailProfile.params.sub.data('email'),
                        'message':result
                    };
                    askFriendShip(datas);
                }
            });
        });



        //appel de la fonction pour charger les informations
        fill(currentUser.id,mainSubDetailProfile.params.sub.data('email'));

        function fill(id,email){
            var datas ={
                id: id,
              email : email
            };
            $.ajax({
                url: mainSubDetailProfile.params.api.fill.url,
                type:  mainSubDetailProfile.params.api.fill.method,
                data: datas,
                crossDomain: true,
                headers : {"X-Auth-Token" : currentUser.token},
                contentType: false,
                dataType:  mainSubDetailProfile.params.api.fill.type,
                success: function(response){
                    console.log(response);
                    if(response!=null  && response!="null" && response!="undefined")
                    {
                        // set de la premiere partir concernant les info du  user
                        setdefault(response.user, mainSubDetailProfile.params.body,baseHost+response.profile.path,mainUserProfile_detail_profile.params.imprtant.important_block_img.data('help'));
                        setcontent(response.user, mainSubDetailProfile.params.body.content, response.listFriends.length,response.listAloneFriends.length);
                        setabout(response.user, mainSubDetailProfile.params.body.about);

                        //charger les photos
                        mainSubDetailProfile.params.link_photo_span.html('('+response.listPhotos.length+')');

                        setPhotos(mainSubDetailProfile.params.body.photo.body_photo_detail,response.listPhotos);

                        //charger les amis
                    }
                },
                error: function (xhr, status, message) { //en cas d'erreur
                    console.log(status+"\n"+xhr.responseText + '\n' + message );
                    //hide le preloader
                    mainSubDetailProfile.params.body.chargement.slideUp();
                },
                complete:function(){
                    console.log("Request finished.");
                    //hide le preloader
                    mainSubDetailProfile.params.body.chargement.slideUp();
                }

            });

            function setabout(user,element)
            {
                var flag ="<img class='sm-img' src='"+mainSubDetailProfile.params.path+user.country+".png' alt=''/> ";
                element.name.html(user.fullname);
                element.gender.html(user.gender);
                element.country.html(flag);
                element.country.append(user.country);
                element.city.html(user.city);
                element.phone.empty();
                if(user.phones!=null && user.phones.length>0)
                {
                    for(var i=0; i<user.phones.length;i++){
                        element.phone.append(user.phones[i]+"/");
                    }
                }
                //variable de user
                var today=new Date();

                var currentyear = today.getFullYear();
                var year  = user.birthDate.split('-')[0];
                var age = currentyear -parseInt(year);
                element.age.html(age+'ans');

            }


            function setPhotos(element,list){

                element.empty();

                var body = "";
                for(var i=0; i<list.length; i++)
                {
                    var photo = list[i];
                    var src = null;
                   if(photo.visibility=="public")
                   {
                       if ((photo.hashname == null || photo.hashname == 'null')) {
                           src = element.data('help');
                       }
                       else {
                           src = baseHost + photo.path;
                       }
                       var img = '<img src="'+ src +'" alt="" class="card-img-top rounded">';
                       var id = "action"+photo.id;
                       body+=
                           '<div class="col-sm-12 col-md-6 col  text-center align-content-center img">'+
                               '<div class="card">'+
                                    '<img src="'+src+'" alt="" class="card-img-top ">' +
                                   '<div class="card-block text-right">'+
                                        '<span class="fa fa-thumbs-o-up ">('+photo.id+')</span>'+
                                   '</div>'+
                               '</div>'+
                           '</div>';
                   }
                }
                element.append(body);
            }

            function setcontent(user,element,countFriends, countFriendAlone)
            {
                element.vip.html(user.isVip?'yes':'no');
                element.countFriend.html("["+(countFriendAlone+countFriends)+"]["+countFriends+"]");
                element.profession.html(user.profession);
                element.joinReason.html(user.joinReason);
            }


            function setdefault(user,element,img , imghelp)
            {
                element.full_name.html(user.fullname);
                element.full_profession.html(user.profession);
                setpicture(element.img_profile, img,imghelp);
            }


            function setpicture(element,img,helpImg){
                if(img==null || img=="undefined")
                {
                    element.attr("src",helpImg);
                }
                else{
                    element.attr("src",img);
                }
                return element;
            }


        }

        function askFriendShip(datas){
            mainSubDetailProfile.params.body.chargement.slideDown();
            $.ajax({
                url: mainSubDetailProfile.params.api.ask.url,
                type:  mainSubDetailProfile.params.api.ask.method,
                data: datas,
                crossDomain: true,
                headers : {"X-Auth-Token" : currentUser.token},
                contentType: false,
                dataType:  mainSubDetailProfile.params.api.ask.type,
                success: function(response){
                    console.log(response);
                    if(response!=null  && response!="null" && response!="undefined")
                    {
                        trans = Translator.trans('sub.success.ask',{},"detail-profile");
                        bootbox.alert(trans,function(result){});
                    }
                },
                error: function (xhr, status, message) { //en cas d'erreur
                    console.log(status+"\n"+xhr.responseText + '\n' + message );
                    //hide le preloader
                    mainSubDetailProfile.params.body.chargement.slideUp();
                    trans = Translator.trans('sub.success.ask',{},"detail-profile");
                    bootbox.alert(trans,function(result){});
                },
                complete:function(){
                    console.log("Request finished.");
                    //hide le preloader
                    mainSubDetailProfile.params.body.chargement.slideUp();
                }

            });

            function setabout(user,element)
            {
                var flag ="<img class='sm-img' src='"+mainSubDetailProfile.params.path+user.country+".png' alt=''/> ";
                element.name.html(user.fullname);
                element.gender.html(user.gender);
                element.country.html(flag);
                element.country.append(user.country);
                element.city.html(user.city);
                element.phone.empty();
                if(user.phones!=null && user.phones.length>0)
                {
                    for(var i=0; i<user.phones.length;i++){
                        element.phone.append(user.phones[i]+"/");
                    }
                }
                //variable de user
                var today=new Date();

                var currentyear = today.getFullYear();
                var year  = user.birthDate.split('-')[0];
                var age = currentyear -parseInt(year);
                element.age.html(age+'ans');

            }


            function setPhotos(element,list){

                element.empty();

                var body = "";
                for(var i=0; i<list.length; i++)
                {
                    var photo = list[i];
                    var src = null;
                    if(photo.visibility=="public")
                    {
                        if ((photo.hashname == null || photo.hashname == 'null')) {
                            src = element.data('help');
                        }
                        else {
                            src = baseHost + photo.path;
                        }
                        var img = '<img src="'+ src +'" alt="" class="card-img-top rounded">';
                        var id = "action"+photo.id;
                        body+=
                            '<div class="col-sm-12 col-md-6 col  text-center align-content-center img">'+
                            '<div class="card">'+
                            '<img src="'+src+'" alt="" class="card-img-top ">' +
                            '<div class="card-block text-right">'+
                            '<span class="fa fa-thumbs-o-up ">('+photo.id+')</span>'+
                            '</div>'+
                            '</div>'+
                            '</div>';
                    }
                }
                element.append(body);
            }

            function setcontent(user,element,countFriends, countFriendAlone)
            {
                element.vip.html(user.isVip?'yes':'no');
                element.countFriend.html("["+(countFriendAlone+countFriends)+"]["+countFriends+"]");
                element.profession.html(user.profession);
                element.joinReason.html(user.joinReason);
            }


            function setdefault(user,element,img , imghelp)
            {
                element.full_name.html(user.fullname);
                element.full_profession.html(user.profession);
                setpicture(element.img_profile, img,imghelp);
            }


            function setpicture(element,img,helpImg){
                if(img==null || img=="undefined")
                {
                    element.attr("src",helpImg);
                }
                else{
                    element.attr("src",img);
                }
                return element;
            }


        }
    }
});
