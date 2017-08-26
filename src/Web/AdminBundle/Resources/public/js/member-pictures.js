/**
 * Created by root on 10/08/2017.
 */

var AdminMemberPictures = function()
{
    this.params = {
        page : $('#adminMemberPictures'),
        attr: {
            id:{
                nb_pics: $("#nb-pics"),
                loader: $('#pics-loader'),
                mn_private_pics: $("#mn-private-pics"), 
                mn_public_pics: $("#mn-public-pics"),
                mn_delete_pics: $("#mn-delete-pics"),
                pictures_view: $("#pictures-view"),
                ul_pagination: $("#pics-pagination"),
                page_link: '.pic-pg-link',
                prev_pagination: $("#ppg-prev"),
                next_pagination: $("#ppg-next"),
                bg_pictures: $("#bg-pictures"),
                carousel_pictures: $('#carousel-pictures'),
                carousel_content: $("#carousel-content")
            },
            class:{
                pics_checked: '.pics-chk:checked',
                carousel: '.carousel',
                item_media : '.item-media'
            }
        },
        api:{
            action :
            {
                pictures: baseUrl +"auth/pictures",
                pictures_member: baseUrl +"auth/members/:id/pictures",
                changeVisibility: baseUrl + "auth/pictures/change"
            },
            method:
            {
                put:"PUT",
                delete: "DELETE",
                get: "GET"
            },
            headers:
            {auth: "X-Auth-Token"}
        }
    };
};

$(function()
{
    var adminMemberPictures = new AdminMemberPictures();
    var page = 1;

    var getSelectedPics = function()
    {
        var checkboxes = $(adminMemberPictures.params.attr.class.pics_checked);
        var selectedPics = [];

        for (var i = 0; i < checkboxes.length; i++) {
            selectedPics.push(checkboxes.eq(i).val());
        }

        return selectedPics;
    };

    var getPictures = function(page)
    {
        var queryString = "?page="+page+"&uid="+adminMemberPictures.params.page.data('uid');

        adminMemberPictures.params.attr.id.loader.show();
        $.ajax(
        {
            url: adminMemberPictures.params.api.action.pictures + queryString,
            type: adminMemberPictures.params.api.method.get,
            headers : {"X-Auth-Token" : currentUser.token},
            crossDomain: true,
            success: function (response) {
                adminMemberPictures.params.attr.id.nb_pics.html(response.total);
                adminMemberPictures.params.attr.id.loader.hide();
                adminMemberPictures.params.attr.id.pictures_view.empty();

                if(response.pictures.length > 0) {
                    $.each(response.pictures, function (i, pic) {
                        var item = '<div class="col-lg-3 col-sm-4 col-xs-12">' +
                            '<div class="bp-item bp-house">' +
                            '<div class="item-media" data-uid="' + pic.user.id + '">' +
                            '<img class="item-img" data-id="' + pic.id + '" src="' + appUrl + '/' + pic.path + '" alt="" />' +
                            '</div>' +
                            '<div class="item-details">' +
                            '<div class="bp-details">' +
                            '<span><input type="checkbox" class="pics-chk" value="' + pic.id + '"/></span>' +
                            '<a href="' + Routing.generate("admin_view_member", {
                                _locale: locale,
                                id: pic.user.id
                            }) + '" class="user-name">' + pic.user.fullname + '</a>' +
                            '</div>' +
                            '<div class="bp-details">Visibilité : <b>' + pic.visibility + '</b></div>' +
                            '<div class="bp-details">Ajouté le : <b>' + app.parseDate(pic.createDate) + '</b></div>' +
                            '</div>' +
                            '</div>' +
                            '</div>';

                        adminMemberPictures.params.attr.id.pictures_view.append(item);
                    });
                }
                else{
                    adminMemberPictures.params.attr.id.pictures_view.append('<div class="col-md-12 text-center" id="no-pictures"><h3>No pictures uploaded !</h3></div>')
                }

                adminMemberPictures.params.attr.id.prev_pagination.data('page', response.pagePrev);
                adminMemberPictures.params.attr.id.next_pagination.data('page', response.pageNext);
                var listItem = "";
                for(var i = 1; i<= response.paginationCount; i++){
                    listItem += '<li class="page-item '+((response.page === i) ? "active" : "")+'" ><a class="pic-pg-link" href="#" data-page="'+i+'">'+i+'</a></li>';
                }

                $(listItem).insertAfter(adminMemberPictures.params.attr.id.prev_pagination.parent('li'));

                if(response.page === response.pagePrev){
                    adminMemberPictures.params.attr.id.prev_pagination.parent('li').addClass('disabled');
                }else{
                    adminMemberPictures.params.attr.id.prev_pagination.parent('li').removeClass('disabled');
                }

                if(response.paginationCount === response.page){
                    adminMemberPictures.params.attr.id.next_pagination.parent('li').addClass('disabled');
                }else{
                    adminMemberPictures.params.attr.id.next_pagination.parent('li').removeClass('disabled');
                }
            },
            error: function (xhr, status, message) {
                adminMemberPictures.params.attr.id.loader.hide();
                console.log(status+"\n"+xhr.responseText + '\n' + message );
            }
        });
    };

    var changeState = function(data)
    {
        adminMemberPictures.params.attr.id.loader.show();
        $.ajax(
        {
            url: adminMemberPictures.params.api.action.changeVisibility,
            type: adminMemberPictures.params.api.method.put,
            headers: {"X-Auth-Token": currentUser.token},
            data: JSON.stringify(data),
            crossDomain: true,
            success: function (response) {
                getPictures(page);
            },
            error: function (xhr, status, message) {
                adminMemberPictures.params.attr.id.loader.hide();
                console.log(status + "\n" + xhr.responseText + '\n' + message);
            }
        });
    };

    $(adminMemberPictures.params.attr.class.carousel).carousel({
        interval: false
    });

    if(adminMemberPictures.params.page.data('page') === "adminMemberPictures")
    {
        getPictures(page);

        adminMemberPictures.params.attr.id.carousel_pictures.css({left: ((window.screen.width - 800)/2)+"px"});

        adminMemberPictures.params.attr.id.mn_delete_pics.click(function(e)
        {
            var selectedPics = getSelectedPics(),
                t = selectedPics.length;

            if(t > 0)
            {
                bootbox.confirm("You really want to delete this picture ?", function(confirm)
                {
                   if(confirm)
                   {
                       var data = {pictures: selectedPics};
                       adminMemberPictures.params.attr.id.loader.show();
                       $.ajax(
                           {
                               url: adminMemberPictures.params.api.action.pictures,
                               type: adminMemberPictures.params.api.method.delete,
                               headers: {"X-Auth-Token": currentUser.token},
                               data: JSON.stringify(data),
                               crossDomain: true,
                               success: function (response) {
                                   console.log(response);
                                   getPictures(page);
                               },
                               error: function (xhr, status, message) {
                                   adminMemberPictures.params.attr.id.loader.hide();
                                   console.log(status + "\n" + xhr.responseText + '\n' + message);
                               }
                           });
                   }
                });
            }
            e.preventDefault();
        });

        adminMemberPictures.params.attr.id.mn_private_pics.click(function(e)
        {
            var selectedPics = getSelectedPics(),
                t = selectedPics.length;

            if(t > 0)
            {
                var data = {pictures: selectedPics, action: 0};
                changeState(data);
            }
            e.preventDefault();
        });

        adminMemberPictures.params.attr.id.mn_public_pics.click(function(e)
        {
            var selectedPics = getSelectedPics(),
                t = selectedPics.length;

            if(t > 0)
            {
                var data = {pictures: selectedPics, action: 1};
                changeState(data);
            }
            e.preventDefault();
        });

        adminMemberPictures.params.attr.id.ul_pagination.on('click', adminMemberPictures.params.attr.id.page_link, function(e){
            page = parseInt($(this).data('page'));

            var pageLinks = $(adminMemberPictures.params.attr.id.page_link),
                t = pageLinks.length;

            for(var i = 1; i < t - 1; i++){
                pageLinks.eq(i).remove();
            }

            getPictures(page);
        });

        adminMemberPictures.params.attr.id.pictures_view.on('click', adminMemberPictures.params.attr.class.item_media, function(e)
        {
            var userId = parseInt($(this).data('uid')),
                imgId = parseInt($(this).children('img').data('id'));

            adminMemberPictures.params.attr.id.carousel_content.empty();

            $.ajax(
            {
                url: adminMemberPictures.params.api.action.pictures_member.replace(':id', userId),
                type: adminMemberPictures.params.api.method.get,
                headers : {"X-Auth-Token" : currentUser.token},
                crossDomain: true,
                success: function (response) {
                    console.log(response);

                    $.each(response.pictures, function(i, pic){
                       var img = '<div class="carousel-item '+(pic.id === imgId ? "active" : "")+'">'+
                                       '<img class="d-block img-fluid" src="'+ appUrl + '/' + pic.path +'" alt="First slide">'+
                                       '<div class="carousel-caption d-none d-md-block"><h4><b>'+(i+1)+' / '+response.pictures.length+'</b></h4></div>'+
                                 '</div>';
                        adminMemberPictures.params.attr.id.carousel_content.append(img);
                    });
                    adminMemberPictures.params.attr.id.bg_pictures.fadeIn();
                    adminMemberPictures.params.attr.id.carousel_pictures.fadeIn();
                },
                error: function (xhr, status, message) {
                    console.log(status+"\n"+xhr.responseText + '\n' + message );
                }
            });

            e.preventDefault();
        });

        adminMemberPictures.params.attr.id.bg_pictures.click(function()
        {
            $(this).fadeOut();
            adminMemberPictures.params.attr.id.carousel_pictures.hide();
        });
    }
});
