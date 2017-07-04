/**
 * Created by Danick takam on 16/06/2017.
 */

var MainPhotoRequest = function()
{
    this.params = {
        page: $("#photo-request"),
        html: $("html"),
        api:{
            url : baseUrl+"auth/upload",
            method: "POST",
            type: "json"
        },
        id: {
            uploadfile : $("#uploadfile"),
            uploadfile_col : $("#uploadfile .col-12"),
            file: $("#file"),
            uploadfile_context: $("#uploadfile .col-12 #context"),
            uploadfile_h1: $("#uploadfile .col-12 h1"),
            uploadfile_btn: $("#uploadfile .col-12 button"),
            form : $("form"),
            bg: $("#bg"),
            bg_message: $("#bg #bloc_message"),
            modal_photo : $("#modal-photo"),
            modal_photo_content_message : $("#modal-photo #content_message"),
            modal_photo_content_photo : $("#modal-photo #content_photo")

        },
        class:{
            upload_area: $(".upload-area"),
            upload_area_col: $(".upload-area .col-12"),
            upload_area_thumbnail: $(".upload-area .col-12 div.thumbnail")
        }
    };

};


$(function(){

    var mainPhotoRequest = new MainPhotoRequest();


    if(mainPhotoRequest.params.page.data('inc')=="photo-request")
    {

        //varibales

        // save the upload zone content
        var lastcontent = lastcontent==null? mainPhotoRequest.params.id.uploadfile_context.html():lastcontent;

        // le nombre total de fichier
        var countfile = 0;

        //lindex courent
        var currentIndex = 0;

        //image courent
        var currentImg = [];

        // force le background a ne pas reagir au cours du  click
        mainPhotoRequest.params.id.modal_photo.click(function(){
          if(!$(this).hasclass("show"))
          {
              $(this).addClass("show");
          }
        });



        // preventing page from redirecting
        mainPhotoRequest.params.html.on("dragover", function(e) {
            e.preventDefault();
            e.stopPropagation();

            mainPhotoRequest.params.id.uploadfile_context.slideDown();
            mainPhotoRequest.params.id.uploadfile_h1.text("Drag here");
        });

        mainPhotoRequest.params.html.on("drop", function(e) { e.preventDefault(); e.stopPropagation(); });

        // Drag enter
        mainPhotoRequest.params.class.upload_area.on('dragenter', function (e) {
            e.stopPropagation();
            e.preventDefault();
            mainPhotoRequest.params.id.uploadfile_context.slideUp();
            mainPhotoRequest.params.id.uploadfile_h1.text("Drop");
            //mainPhotoRequest.params.id.uploadfile_h1.text("");
        });

        // Drag over
        mainPhotoRequest.params.class.upload_area.on('dragover', function (e) {
            e.stopPropagation();
            e.preventDefault();
            mainPhotoRequest.params.id.uploadfile_h1.text("Drop");
        });


        // Drop
        mainPhotoRequest.params.class.upload_area.on('drop', function (e) {
            e.stopPropagation();
            e.preventDefault();

            //declancher le procussus de telechargerment
            mainPhotoRequest.params.id.bg.height($(window).height()+50+"px");
            // alert( "lengt : " + mainPhotoRequest.params.id.bg.height() + " ---"+$(window).height());
            mainPhotoRequest.params.id.bg.slideDown();

            //show the upload button
            mainPhotoRequest.params.id.uploadfile_context.slideDown();
            mainPhotoRequest.params.id.uploadfile_h1.text("");

            var files = e.originalEvent.dataTransfer.files;

            //recuperer le nombre de fichier
            countfile = files.length;

            //initialiser  l'index
            currentIndex=0;

            for(var i=0; i<files.length; i++)
            {
                var fd = new FormData();
                var file = files[i];
                currentImg.push(file.name);
                fd.append('file',file);
                uploadData(fd);
            }
        });

        // Open file selector on button click
        mainPhotoRequest.params.id.uploadfile_btn.click(function(){
            mainPhotoRequest.params.id.file.click();
        });

        // file selected
        mainPhotoRequest.params.id.file.change(function(e){
            e.stopPropagation();
            e.preventDefault();

            //declancher le procussus de telechargerment
            mainPhotoRequest.params.id.bg.css({height:$(window).height()+50+"px"});
           // alert( "lengt : " + mainPhotoRequest.params.id.bg.height() + " ---"+$(window).height());
            mainPhotoRequest.params.id.bg.slideDown();


            //var fd = new FormData(mainPhotoRequest.params.id.form);
            var  inputfile  =mainPhotoRequest.params.id.file;

            var files = inputfile[0].files;
            //recuperer le nombre de fichier
            countfile = files.length;

            //initialiser  l'index
            currentIndex=0;
           // mainPhotoRequest.params.id.uploadfile_context.empty();
            for(var i=0; i<files.length; i++)
            {
                var fd = new FormData();
                var file = files[i];
                currentImg.push(file.name);
                fd.append('file',file);
                // console.log(fd.get('file'));
                uploadData(fd);
            }
        });


        // Sending AJAX request and upload file
        function uploadData(formdata){

            //console.log("apply User current where id :"+ currentUser.id);

            mainPhotoRequest.params.id.bg_message.empty();
            mainPhotoRequest.params.id.bg_message.html("Traitement  du  fichier <span class='text-danger'>"+ currentImg[0]+ "</span> ... ");

            formdata.append('id',currentUser.id);
            // alert(mainPhotoRequest.params.api.url);
            // console.log(formdata.get("file"));
            $.ajax({
                url: mainPhotoRequest.params.api.url,
                type:  mainPhotoRequest.params.api.method,
                data: formdata,
                crossDomain: true,
                headers : {"X-Auth-Token" : currentUser.token},
                contentType: false,
                processData: false,
                dataType:  mainPhotoRequest.params.api.type,
                success: function(response){
                    console.log(response);
                    //incrementer l'index
                    currentIndex++;
                    if(currentImg[currentIndex]!=null)
                    {
                        mainPhotoRequest.params.id.bg_message.empty();
                        mainPhotoRequest.params.id.bg_message.html("Traitement  du  fichier <span class='text-danger'>"+ currentImg[currentIndex]+ "</span> ... ");
                    }
                    addThumbnail(response);
                },
                error: function (xhr, status, message) { //en cas d'erreur
                    console.log(status+"\n"+xhr.responseText + '\n' + message );
                },
                complete:function(){
                    console.log("Request finished.");
                }

            });


        }


        // Added thumbnail
        function addThumbnail(data){
           // mainPhotoRequest.params.id.uploadfile_context.slideDown();
            var len = mainPhotoRequest.params.class.upload_area_thumbnail.length;
            var num = Number(len);
            num = num + 1;
            var name = data.name;
            var size = convertSize(data.size);
            var src = baseHost+data.src;

            //au  debut  on cree un div pour contenir toutes les photos
            if(currentIndex==1)
            {
                // Creating an thumbnail
                mainPhotoRequest.params.id.uploadfile_col.append('<div class="thumbnail row" id="thumbnail_'+num+'"'+'></div>');
            }

            $("#thumbnail_"+num).append('<div class="col node"> <img src="'+src+'" >');
            $("#thumbnail_"+num).append('<div class="size">'+size+'</div></div>');


            // on teste si  le countfile a attient l'index max du  tableau  de fichier
            if(countfile==currentIndex)
            {
                //on cache le bg
               mainPhotoRequest.params.id.bg.slideUp();


                var result =Translator.trans('content',{'count':(currentIndex-1)},"modal-photo");
                //modifie le texte de notification
                mainPhotoRequest.params.id.modal_photo_content_message.html(result);

                result = Translator.trans('photo',{'count':(currentIndex-1)},"modal-photo")+ "<br/>"
                // on affiche le texte pour le nombre de photo
                mainPhotoRequest.params.id.modal_photo_content_photo.html(result);

                result = '<div class="thumbnail row" id="thumbnail_1"'+'>' +
                            $("#thumbnail_1").html()
                         +'</div>';
                //on charge les photos sur la page
                mainPhotoRequest.params.id.modal_photo_content_photo.append(result);

                // affiche le modal pour la notification
               mainPhotoRequest.params.id.modal_photo.modal("show");

            }

        }


        // Bytes conversion
        function convertSize(size) {
            var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
            if (size == 0) return '0 Byte';
            var i = parseInt(Math.floor(Math.log(size) / Math.log(1024)));
            return Math.round(size / Math.pow(1024, i), 2) + ' ' + sizes[i];
        }

    }
});