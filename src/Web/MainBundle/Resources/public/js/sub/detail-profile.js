var MainSubDetailProfile = function()
{
    this.params = {
        page: $("#mainUserProfile"),
        sub: $("#Main-Subdetail-profile"),
        path: path.flags,
        api:{
            fill: {
                url : baseUrl+"auth/user/photo/profile/detail",
                method: "get",
                type: "json"
            }
        },
        body:{
            chargement: $("#Main-Subdetail-profile  #chargement-detail-profile"),
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
            },
            img_profile: $("#zone_profile .img_profile"),
            full_name: $("#zone_profile .full_name"),
            full_profession: $("#zone_profile .full_profession")
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



        //appel de la fonction pour charger les informations
        fill(currentUser.id,mainSubDetailProfile.params.page.data('email'));

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
                processData: false,
                dataType:  mainSubDetailProfile.params.api.fill.type,
                success: function(response){
                    console.log(response);
                    if(response!=null  && response!="null" && response!="undefined")
                    {
                        // set de la premiere partir concernant les info du  user
                        setAbout(response.user, mainSubDetailProfile.params.body,baseUrl+response.profile.hashname,mainUserProfile_detail_profile.params.imprtant.important_block_img.data('help'));
                        setcontent(response.user, mainSubDetailProfile.params.body.content, response.listFriends.length,response.listAloneFriends.length);
                        setAbout(response.user, mainSubDetailProfile.params.body.about);

                        //charger les photos

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

            function setAbout(user,element)
            {
                element.name.html(user.fullname);
                element.gender.html(user.gender);
                element.country.html(user.country);
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
                element.age.html(age);

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
                element.fullname.html(user.fullname);
                element.fullprofession.html(user.profession);
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
