var AdminStat = function(){
    this.params ={
        page : $('#AdminStat'),
        api:{
            user:{
                url: baseUrl+'auth/count',
                type: "get",
                contenType: "json"
            },
            picture:{
                url: baseUrl+'auth/count/picture',
                type: "get",
                contenType: "json"
            },
            message:{
                url: baseUrl+'auth/count/message',
                type: "get",
                contenType: "json"
            }

        },
        user:{
            count:{
                //on cible l'element  dans la page html (l'element  qui  doit  contenir le nombre de user
                all: $('#AdminStat table tr .countuser'),
                //on cible l'element  dans la page html (l'element  qui  doit  contenir le nombre de vips
                vip: $('#AdminStat table tr .countuservip'),
                //on cible l'element  dans la page html (l'element  qui  doit  contenir le nombre de user inscrit today
                jointoday: $('#AdminStat table tr .joinTodays'),
                //on cible l'element  dans la page html (l'element  qui  doit  contenir le nombre de user inscrit yesterday
                jointyesterday: $('#AdminStat table tr .membersWhoJoinedYesterdays'),
                //on cible l'element  dans la page html (l'element  qui  doit  contenir le nombre de user inscrit from one week
                jointoneweek: $('#AdminStat table tr .membersWhoJoinedfromoneWeeks'),
                //on cible l'element  dans la page html (l'element  qui  doit  contenir le nombre de user inscrit from one month
                jointonemonth: $('#AdminStat table tr .membersWhoJoinedfromoneMonths'),
            },
            graph:{

            }
        },
        picture:{
            count:{
                //on cible l'element  dans la page html (l'element  qui  doit  contenir le nombre de picture
                all: $('#AdminStat table tr .numberpicture'),
                pictureToday: $('#AdminStat table tr .NumberpictureTodays'),
                pictureYesterday: $('#AdminStat table tr .NumberYesterdaypictures'),
                pictureWeek: $('#AdminStat table tr .NumberpictureWeeks'),
                pictureMonth: $('#AdminStat table tr .NumberpictureMonths'),
                UserWithoutPicture: $('#AdminStat table tr .NumberuserWithoutPictures'),




            },
            graph:{

            }
        },
        message:{
            count:{
                //on cible l'element  dans la page html (l'element  qui  doit  contenir le nombre de message
                all: $('#AdminStat table tr .numberMessages'),
                messageToday: $('#AdminStat table tr .numberMessageTodays'),
                messageWeek: $('#AdminStat table tr .numberMessageOfWeeks'),
                messageMonth: $('#AdminStat table tr .numberMessageMonths'),

            },
            graph:{

            }
        }
    }
};


$(function(){

    $("#stats").hide();
    $("#latest-pictures-list").hide();

    $("#stats-link").click(function () {
        $("#admin-help").hide();
        $("#latest-members-list").hide();
        $("#latest-pictures-list").hide();
        $("#stats").show();
    });

    adminStat = new AdminStat();
    if(adminStat.params.page.data('page')=="Stat")
    {


        fillCounUser();
        fillCountPicture();
        fillCountMessage();

        function setcountView(objet,element)
        {
            element.all.html(objet.countuser);
            element.vip.html(objet.countvip);
            element.jointoday.html(objet.joinTodays);
            element.jointyesterday.html(objet.membersWhoJoinedYesterdays);
            element.jointoneweek.html(objet.membersWhoJoinedfromoneWeeks);
            element.jointonemonth.html(objet.membersWhoJoinedfromoneMonths);
        }
        function fillCounUser(){
            $.ajax({
                url: adminStat.params.api.user.url,
                type:  adminStat.params.api.user.type,
                crossDomain: true,
                headers : {"X-Auth-Token" : currentUser.token},
                dataType:  adminStat.params.api.user.contenType,
                success: function(response){ // in success case
                    if(response!=null && response!="null")
                    {
                        setcountView(response,adminStat.params.user.count);
                        console.log(response);
                    }

                },
                error: function (xhr, status, message) { //en cas d'erreur
                    console.log(status+"\n"+xhr.responseText + '\n' + message );
                },
                complete:function(){
                    //console.log("Request finished.");
                }

            });
        }

        function setCountPictureView(objet,element){
            element.all.html(objet.numberpictures);
            element.pictureToday.html(objet.NumberpictureTodays);
            element.pictureYesterday.html(objet.NumberYesterdaypictures);
            element.pictureWeek.html(objet.NumberpictureWeeks);
            element.pictureMonth.html(objet.NumberpictureMonths);
            element.UserWithoutPicture.html(objet.NumberuserWithoutPictures);

        }

        function fillCountPicture()
        {
            $.ajax({
                url:  adminStat.params.api.picture.url,
                type:  adminStat.params.api.picture.type,
                crossDomain: true,
                headers : {"X-Auth-Token" : currentUser.token},
                dataType: adminStat.params.api.picture.contenType,
                success: function(response){ // in success case

                    if(response!=null && response!="null")
                    {
                        setCountPictureView(response,adminStat.params.picture.count);
                        console.log(response);
                    }

                },
                error: function (xhr, status, message) { //en cas d'erreur
                    console.log(status+"\n"+xhr.responseText + '\n' + message );
                },
                complete:function(){
                    //console.log("Request finished.");
                }

            });
        }

        function setCountMessageView(objet,element){
            element.all.html(objet.numberMessages);
            element.messageToday.html(objet.numberMessageToday);
            element.messageWeek.html(objet.numberMessageOfWeeks);
            element.messageMonth.html(objet.numberMessageMonths);
        }

        function fillCountMessage()
        {
            $.ajax({
                url:  adminStat.params.api.message.url,
                type:  adminStat.params.api.message.type,
                crossDomain: true,
                headers : {"X-Auth-Token" : currentUser.token},
                dataType: adminStat.params.api.message.contenType,
                success: function(response){ // in success case

                    if(response!=null && response!="null")
                    {
                        setCountMessageView(response,adminStat.params.message.count);
                        console.log(response);
                    }

                },
                error: function (xhr, status, message) { //en cas d'erreur
                    console.log(status+"\n"+xhr.responseText + '\n' + message );
                },
                complete:function(){
                    //console.log("Request finished.");
                }

            });
        }

    }
});

