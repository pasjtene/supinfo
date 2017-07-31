/**
 * Created by root on 21/07/2017.
 */

var AdminPictures = function()
{
    this.params = {
        page : $('#adminHome'),
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
                next_pagination: $("#ppg-next")
            },
            class:{
                pics_checked: '.pics-chk:checked'
            }
        },
        api:{
            action :
            {
                pictures: baseUrl +"auth/pictures",
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
    var adminPictures = new AdminPictures();
    var page = 1;

    var getSelectedPics = function()
    {
        var checkboxes = $(adminPictures.params.attr.class.pics_checked);
        var selectedPics = [];

        for (var i = 0; i < checkboxes.length; i++) {
            selectedPics.push(checkboxes.eq(i).val());
        }

        return selectedPics;
    };

    var getPictures = function(page)
    {
        var queryString = "?page="+page;

        adminPictures.params.attr.id.loader.show();
        $.ajax(
            {
                url: adminPictures.params.api.action.pictures + queryString,
                type: adminPictures.params.api.method.get,
                headers : {"X-Auth-Token" : tokenbase.value},
                crossDomain: true,
                success: function (response) {
                    adminPictures.params.attr.id.nb_pics.html(response.total);
                    adminPictures.params.attr.id.loader.hide();
                    adminPictures.params.attr.id.pictures_view.empty();

                    $.each(response.pictures, function(i, pic)
                    {
                        var item = '<div class="col-lg-3 col-sm-4 col-xs-12">'+
                                        '<div class="bp-item bp-house">'+
                                            '<div class="item-media">'+
                                                '<img class="item-img" src="'+ appUrl + '/' + pic.path +'" alt="" />'+
                                            '</div>'+
                                            '<div class="item-details">'+
                                                '<div class="bp-details">'+
                                                    '<span><input type="checkbox" class="pics-chk" value="'+pic.id+'"/></span>'+
                                                    '<a href="'+Routing.generate("admin_view_member", {_locale:locale,  id:pic.user.id})+'" class="user-name">'+pic.user.fullname+'</a>'+
                                                '</div>'+
                                                '<div class="bp-details">Visibilité : <b>'+pic.visibility+'</b></div>'+
                                                '<div class="bp-details">Ajouté le : <b>'+app.parseDate(pic.createDate)+'</b></div>'+
                                            '</div>'+
                                        '</div>'+
                                    '</div>';

                        adminPictures.params.attr.id.pictures_view.append(item);
                    });

                    adminPictures.params.attr.id.prev_pagination.data('page', response.pagePrev);
                    adminPictures.params.attr.id.next_pagination.data('page', response.pageNext);
                    var listItem = "";
                    for(var i = 1; i<= response.paginationCount; i++){
                        listItem += '<li class="page-item '+((response.page === i) ? "active" : "")+'" ><a class="pic-pg-link" href="#" data-page="'+i+'">'+i+'</a></li>';
                    }

                    $(listItem).insertAfter(adminPictures.params.attr.id.prev_pagination.parent('li'));

                    if(response.page === response.pagePrev){
                        adminPictures.params.attr.id.prev_pagination.parent('li').addClass('disabled');
                    }else{
                        adminPictures.params.attr.id.prev_pagination.parent('li').removeClass('disabled');
                    }

                    if(response.paginationCount === response.page){
                        adminPictures.params.attr.id.next_pagination.parent('li').addClass('disabled');
                    }else{
                        adminPictures.params.attr.id.next_pagination.parent('li').removeClass('disabled');
                    }
                },
                error: function (xhr, status, message) {
                    adminPictures.params.attr.id.loader.hide();
                    console.log(status+"\n"+xhr.responseText + '\n' + message );
                }
            }
        );
    };

    var changeState = function(data)
    {
        adminPictures.params.attr.id.loader.show();
        $.ajax(
        {
            url: adminPictures.params.api.action.changeVisibility,
            type: adminPictures.params.api.method.put,
            headers: {"X-Auth-Token": tokenbase.value},
            data: JSON.stringify(data),
            crossDomain: true,
            success: function (response) {
                getPictures(page);
            },
            error: function (xhr, status, message) {
                adminPictures.params.attr.id.loader.hide();
                console.log(status + "\n" + xhr.responseText + '\n' + message);
            }
        });
    };

    if(adminPictures.params.page.data('page') === "adminHome")
    {
        $('a[data-toggle="tab"]').on('shown.bs.tab', function (e)
        {
            if ($('.nav-tabs .active').attr('href')==="#photos")
            {
                getPictures(page);
            }
        });

        adminPictures.params.attr.id.mn_delete_pics.click(function(e)
        {
            var selectedPics = getSelectedPics(),
                t = selectedPics.length;

            console.log(selectedPics);

            if(t > 0)
            {
                bootbox.confirm("You really want to delete this picture ?", function(confirm)
                {
                   if(confirm)
                   {
                       var data = {pictures: selectedPics};
                       adminPictures.params.attr.id.loader.show();
                       $.ajax(
                           {
                               url: adminPictures.params.api.action.pictures,
                               type: adminPictures.params.api.method.delete,
                               headers: {"X-Auth-Token": tokenbase.value},
                               data: JSON.stringify(data),
                               crossDomain: true,
                               success: function (response) {
                                   console.log(response);
                                   getPictures(page);
                               },
                               error: function (xhr, status, message) {
                                   adminPictures.params.attr.id.loader.hide();
                                   console.log(status + "\n" + xhr.responseText + '\n' + message);
                               }
                           });
                   }
                });
            }
            e.preventDefault();
        });

        adminPictures.params.attr.id.mn_private_pics.click(function(e)
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

        adminPictures.params.attr.id.mn_public_pics.click(function(e)
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

        adminPictures.params.attr.id.ul_pagination.on('click', adminPictures.params.attr.id.page_link, function(e){
            page = parseInt($(this).data('page'));

            var pageLinks = $(adminPictures.params.attr.id.page_link),
                t = pageLinks.length;

            for(var i = 1; i < t - 1; i++){
                pageLinks.eq(i).remove();
            }

            getPictures(page);
        });
    }
});
