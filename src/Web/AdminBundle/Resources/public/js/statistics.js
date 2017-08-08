$(function(){
    if($("#AdminStat").data('page')=="Stat")
    {
        //on cible l'element  dans la page html (l'element  qui  doit  contenir le nombre de user
        var  countUsersView = $('#AdminStat table tr .countuser');
        //on cible l'element  dans la page html (l'element  qui  doit  contenir le nombre de vips
        var  countVipsView = $('#AdminStat table tr .countuservip');
        //on cible l'element  dans la page html (l'element  qui  doit  contenir le nombre de user inscrit today
        var  countjointodayView = $('#AdminStat table tr .joinTodays');
        //on cible l'element  dans la page html (l'element  qui  doit  contenir le nombre de user inscrit yesterday
        var  countjointyesterdayView = $('#AdminStat table tr .membersWhoJoinedYesterdays');
        //on cible l'element  dans la page html (l'element  qui  doit  contenir le nombre de user inscrit from one week
        var  countjointoneweekView = $('#AdminStat table tr .membersWhoJoinedfromoneWeeks');
        //on cible l'element  dans la page html (l'element  qui  doit  contenir le nombre de user inscrit from one month
        var  countjointonemonthView = $('#AdminStat table tr .membersWhoJoinedfromoneMonths');
        $.ajax({
            url: baseUrl+'auth/count',
            type:  'get',
            crossDomain: true,
            headers : {"X-Auth-Token" : currentUser.token},
            contentType: false,
            processData: false,
            dataType:  'json',
            success: function(response){ // in success case

                if(response!=null && response!="null")
                {
                    countUsersView.html(response.countuser);
                    countVipsView.html(response.countvip);
                    countjointodayView.html(response.joinTodays);
                    countjointyesterdayView.html(response.membersWhoJoinedYesterdays);
                    countjointoneweekView.html(response.membersWhoJoinedfromoneWeeks);
                    countjointonemonthView.html(response.membersWhoJoinedfromoneMonths);
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
});