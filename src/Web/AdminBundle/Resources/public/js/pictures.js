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
                mn_delete_pics: $("#mn-delete-pics"),
                pictures_view: $("#pictures-view"),
                ul_pagination: $("#ul-pagination"),
                page_link: '.pic-pg-link',
                prev_pagination: $("#pg-prev"),
                next_pagination: $("#pg-next")
            },
            class:{
                pics_checked: '.pics-chk:checked'
            }
        },
        api:{
            action :
            {
                pictures: baseUrl +"auth/pictures"
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
            selectedPics.push(checkboxes.eq(i).value);
        }

        return selectedPics;
    };

    var getPictures = function(queryString)
    {
        adminPictures.params.attr.id.loader.show();
        $.ajax(
            {
                url: adminPictures.params.api.action.pictures + queryString,
                type: adminPictures.params.api.method.get,
                headers : {"X-Auth-Token" : tokenbase.value},
                crossDomain: true,
                success: function (response) {
                    adminPictures.params.attr.id.nb_pics.html(response.pictures.length);
                    adminPictures.params.attr.id.loader.hide();

                    $.each(response.pictures, function(i, pic)
                    {
                        /*var row = $('<tr>').html("<td>" + (i+1) +
                            "</td><td><a href='"+Routing.generate("admin_view_member", {_locale:locale,  id:user.id})+"'>"+ user.firstName+"</a>"+
                            "</td><td>" + user.email +
                            "</td><td>" + user.country +
                            "</td><td>" + user.gender +
                            "</td><td>" + (user.enabled ? "Enabled" : "Locked") +
                            "</td><td>" + (user.isVip ? "Yes" : "No") +
                            "</td>");
                        $("<td />").html('<input class="user_select_checkbox" type="checkbox" name="'+ user.id+'" value="'+ user.email+'"/>').appendTo(row);
                        */

                        adminPictures.params.attr.id.pictures_view.append(row);
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

    if(adminPictures.params.page.data('page') === "adminHome")
    {
        $('a[data-toggle="tab"]').on('shown.bs.tab', function (e)
        {
            if ($('.nav-tabs .active').attr('href')==="#photos")
            {
                var queryString = "?page="+page;
                getPictures(queryString);
            }
        });

        adminPictures.params.attr.id.mn_delete_pics.click(function(e)
        {
            alert('delete');
            var selectedPics = getSelectedPics(),
                t = selectedPics.length;

            if(t > 0)
            {
                var data = {pics: selectedPics};
                adminPictures.params.attr.id.loader.show();
                $.ajax(
                {
                    url: adminPictures.params.api.action.pictures,
                    type: adminPictures.params.api.method.delete,
                    headers: {"X-Auth-Token": tokenbase.value},
                    data: data,
                    crossDomain: true,
                    success: function (response) {
                        adminPictures.params.attr.id.loader.hide();
                    },
                    error: function (xhr, status, message) {
                        adminPictures.params.attr.id.loader.hide();
                        console.log(status + "\n" + xhr.responseText + '\n' + message);
                    }
                });
            }
            e.preventDefault();
        });

        adminPictures.params.attr.id.mn_private_pics.click(function(e)
        {
            alert('private');
            var selectedPics = getSelectedPics(),
                t = selectedPics.length;

            if(t > 0)
            {
                var data = {pics: selectedPics};
                adminPictures.params.attr.id.loader.show();
                $.ajax(
                {
                    url: adminPictures.params.api.action.pictures,
                    type: adminPictures.params.api.method.put,
                    headers: {"X-Auth-Token": tokenbase.value},
                    data: data,
                    crossDomain: true,
                    success: function (response) {
                        adminPictures.params.attr.id.loader.hide();
                    },
                    error: function (xhr, status, message) {
                        adminPictures.params.attr.id.loader.hide();
                        console.log(status + "\n" + xhr.responseText + '\n' + message);
                    }
                });
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

            var queryString = "?page="+page;
            getPictures(queryString);
        });
    }
});
