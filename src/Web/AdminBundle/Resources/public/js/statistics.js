
$(function(){
    if($("#AdminStat").data('page')=="Stat")
    {
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
            success: function(response){ // en cas de success

                if(response!=null && response!="null")
                {
                    var  countvip  = response; //voici  le nombre d'utilisateur present dans la bd

                    //on modifie le contenu par le contenu  du  count  user
                    countVipsView.html(countvip);

                    //var  listeUser = response.UserList; //voici  la liste de tous les utilisateurs dans la bd
                    //affiche avec une fenetre personalise le nombre de users dans la bd
                    // bootbox.alert("Nombre d'utilisateur present  dans la base de donnée : " + count, function(){});
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

$(function(){
    if($("#AdminStat").data('page')=="Stat")
    {
        //on cible l'element  dans la page html (l'element  qui  doit  contenir le nombre de vips
        var  countVipsView = $('#AdminStat table tr .countuser');
        $.ajax({
            url: baseUrl+'auth/count',
            type:  'get',
            crossDomain: true,
            headers : {"X-Auth-Token" : currentUser.token},
            contentType: false,
            processData: false,
            dataType:  'json',
            success: function(response){ // en cas de success

                if(response!=null && response!="null")
                {
                    var  count  = response; //voici  le nombre d'utilisateur present dans la bd

                    //on modifie le contenu par le contenu  du  count  user
                    countVipsView.html(count);

                    //var  listeUser = response.UserList; //voici  la liste de tous les utilisateurs dans la bd
                    //affiche avec une fenetre personalise le nombre de users dans la bd
                    // bootbox.alert("Nombre d'utilisateur present  dans la base de donnée : " + count, function(){});
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



