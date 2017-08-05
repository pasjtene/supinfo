$(function(){
    if($("#AdminStat").data('page')=="Stat")
    {
        //on cible l'element  dans la page html (l'element  qui  doit  contenir le nombre de user
        var  countUsersView = $('#AdminStat table tr .countuser');
        //on cible l'element  dans la page html (l'element  qui  doit  contenir le nombre de vips
        var  countVipsView = $('#AdminStat table tr .countuservip');
        $.ajax({
            url: baseUrl+'auth/count',
            type:  'get',
            crossDomain: true,
            headers : {"X-Auth-Token" : currentUser.token},
            contentType: false,
            processData: false,
            dataType:  'json',
            success: function(response){ // en cas de succeess

                if(response!=null && response!="null")
                {
                    countUsersView.html(response.countuser);
                    countVipsView.html(response.countvip);
                }

            },
            error: function (xhr, status, message) { //en cas d'erreur
                console.log(status+"\n"+xhr.responseText + '\n' + message );
            },
            complete:function(){
                console.log("Request finished.");
            }

        });
    }
});