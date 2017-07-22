var MainSubDetailProfile = function()
{
    this.params = {
        page: $("#mainUserProfile"),
        sub: $("#Main-Subdetail-profile"),
        path: path.flags,
        api:{
            base: {
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

    }
});
