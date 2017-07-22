var MainSubMatchesDetail = function()
{
    this.params = {
        page: $("#mainUserProfile"),
        sub: $("#Main-Subdetail-profile"),
        path: path.flags,
        api:{
            base: {
                url : baseUrl+"auth/user/base",
                method: "get",
                type: "json"
            },
            city: {
                url : baseUrl+"auth/user/city",
                method: "get",
                type: "json"
            }
        },
        body:{
            content :$("#main-body #Main-Submatches #content"),
            chargement: $("#main-body #Main-Submatches #chargement")
        }
    };

};


$(function () {
    var mainSubMatchesDetail = new MainSubMatchesDetail(),
        mainUserProfile_matchesDetail = new MainUserProfile();

    if(mainSubMatchesDetail.params.sub.data('sub')=="detail-profile")
    {

    }
});
