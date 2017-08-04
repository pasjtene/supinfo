/**
 * Created by Danick takam on 16/06/2017.
 */

var MainPhotoRequest = function()
{
    this.params = {
        page: $("#photo-request"),
        html: $("html"),
        api:{
            upload:
            {
                url : baseUrl+"auth/upload",
                method: "POST",
                type: "json"
            },
            webcam:
            {
                url : baseUrl+"auth/webcam",
                method: "POST",
                type: "json"
            }
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
            modal_photo : $("#modal-photo")

        },
        class:{
            upload_area: $(".upload-area"),
            upload_area_col: $(".upload-area .col-12"),
            upload_area_thumbnail: $(".upload-area .col-12 div.thumbnail")
        },
        webcam:{
            webcam_show: $("#webcam-show span"),
            webcam_modal : $("#webcam-modal"),
            video : document.querySelector('#webcam-video'),
            cover: $('#webcam-cover'),
            photo: $('#webcam-photo'),
            startbutton: $('#webcam-startbutton'),
            save: $('#webcam-save'),
            canvas: document.querySelector('#webcam-canvas'),
            audio: document.querySelector('#webcam-audio'),
            audio_off: document.querySelector('#webcam-audio-off'),
            webcam_loader: $('#webcam-loader'),
            webcam_notification: $('#webcam-notification')
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

        var number =0;

        var messageFinal = $('<ul class="list-group"></ul>');

        // force le background a ne pas reagir lorsqu'on   clic
        mainPhotoRequest.params.id.modal_photo.click(function(){
            mainPhotoRequest.params.id.modal_photo.modal("show");
        });


        // force le background a ne pas reagir lorsqu'on   clic pour la webcam
        mainPhotoRequest.params.webcam.webcam_modal.click(function(){
            mainPhotoRequest.params.webcam.webcam_modal.modal("show");
        });

        // preventing page from redirecting
        mainPhotoRequest.params.html.on("dragover", function(e) {
            e.preventDefault();
            e.stopPropagation();

            var  message = Translator.trans('drag', {}, 'photo');
            //alert(message);
            mainPhotoRequest.params.id.uploadfile_context.slideDown();
            mainPhotoRequest.params.id.uploadfile_h1.text(message);
        });

        mainPhotoRequest.params.html.on("drop", function(e) { e.preventDefault(); e.stopPropagation(); });

        // Drag enter
        mainPhotoRequest.params.class.upload_area.on('dragenter', function (e) {
            e.stopPropagation();
            e.preventDefault();
            mainPhotoRequest.params.id.uploadfile_context.slideUp();
            var  message = Translator.trans('drop', {}, 'photo');
            mainPhotoRequest.params.id.uploadfile_h1.text(message);
            //mainPhotoRequest.params.id.uploadfile_h1.text("");
        });

        // Drag over
        mainPhotoRequest.params.class.upload_area.on('dragover', function (e) {
            e.stopPropagation();
            e.preventDefault();
            var  message = Translator.trans('drop', {}, 'photo');
            mainPhotoRequest.params.id.uploadfile_h1.text(message);
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
            countfile = 0;

            //initialiser  l'index
            currentIndex=0;

            for(var i=0; i<files.length; i++)
            {
                var fd = new FormData();
                var file = files[i];

                var error = Translator.trans("sub.img.error_ext",{},"photo");
                var error_size = Translator.trans("sub.img.error_size",{},"photo");
                var error_message = Translator.trans("sub.modal.state.error",{},"photo");
                var size = Math.round(file.size/(1024*1024));
                if(isValidLenght(size,2)){
                    if(isValidExt(file.type)){
                        countfile++;
                        currentImg.push(file.name);
                        fd.append('file',file);
                        uploadData(fd);
                    }
                    else{
                        number++;
                        var content = '<li class="list-group-item list-group-item-action list-group-item-danger">'+number+')'+ file.name+'<strong> ext : '+ file.type+' '+error+'</strong></li>';

                        messageFinal.append(content);
                    }

                }
                else{
                    number++;
                    var content = '<li class="list-group-item list-group-item-action list-group-item-danger">'+number+')'+ file.name +'<strong> size : '+size+'Mo '+error_size+'</strong></li>';
                    messageFinal.append(content);
                }
            }
            if(countfile==currentIndex) {
                //on cache le bg
                mainPhotoRequest.params.id.bg.fadeOut();


                // affiche le modal pour la notification
                bootbox.alert(messageFinal.html(), function(){});

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
            countfile = 0;

            //initialiser  l'index
            currentIndex=0;
           // mainPhotoRequest.params.id.uploadfile_context.empty();
            for(var i=0; i<files.length; i++)
            {
                var fd = new FormData();
                var file = files[i];

                var error = Translator.trans("sub.img.error_ext",{},"photo");
                var error_size = Translator.trans("sub.img.error_size",{},"photo");
                var error_message = Translator.trans("sub.modal.state.error",{},"photo");
                var size = Math.round(file.size/(1024*1024));
                if(isValidLenght(size,2)){
                    if(isValidExt(file.type)){
                        countfile++;
                        currentImg.push(file.name);
                        fd.append('file',file);
                        uploadData(fd);
                    }
                    else{
                        number++;
                        var content = '<li class="list-group-item list-group-item-action list-group-item-danger">'+number+')'+ file.name+'<strong> ext : '+ file.type+' '+error+'</strong></li>';

                        messageFinal.append(content);
                    }

                }
                else{
                    number++;
                    var content = '<li class="list-group-item list-group-item-action list-group-item-danger">'+number+')'+ file.name +'<strong> size : '+size+'Mo '+error_size+'</strong></li>';
                    messageFinal.append(content);
                }
            }
            if(countfile==currentIndex) {
                //on cache le bg
                mainPhotoRequest.params.id.bg.fadeOut();


                // affiche le modal pour la notification
                bootbox.alert(messageFinal.html(), function(){});

            }
        });


        // Sending AJAX request and upload file
        function uploadData(formdata){

            //console.log("apply User current where id :"+ currentUser.id);

            mainPhotoRequest.params.id.bg_message.empty();
            var  message = Translator.trans('processing', {}, 'photo');
            mainPhotoRequest.params.id.bg_message.html("<span class='text-success'>1/"+ countfile+ "</span> <br/> "+message+"<span class='text-danger'>"+ currentImg[0]+ "</span> ... ");

            formdata.append('id',currentUser.id);
            // alert(mainPhotoRequest.params.api.url);
            // console.log(formdata.get("file"));
            $.ajax({
                url: mainPhotoRequest.params.api.upload.url,
                type:  mainPhotoRequest.params.api.upload.method,
                data: formdata,
                crossDomain: true,
                headers : {"X-Auth-Token" : currentUser.token},
                contentType: false,
                processData: false,
                dataType:  mainPhotoRequest.params.api.upload.type,
                success: function(response){
                    console.log(response);
                    //incrementer l'index
                    currentIndex++;
                    number++;
                    if(currentImg[currentIndex]!=null)
                    {
                        mainPhotoRequest.params.id.bg_message.empty();
                        var  message = Translator.trans('processing', {}, 'photo');
                        mainPhotoRequest.params.id.bg_message.html("<span class='text-success'>"+(currentIndex+1)+"/"+ countfile+ "</span> <br/> "+ message+"<span class='text-danger'>"+ currentImg[currentIndex]+ "</span> ... ");
                    }
                    addThumbnail(response);
                },
                error: function (message) { //en cas d'erreur
                    //console.log(status+"\n"+xhr.responseText + '\n' + message );
                    var error_size = Translator.trans("sub.img.error_size",{},"photo");
                    var error_message = Translator.trans("sub.modal.state.error",{},"photo");
                    number++;
                    var content = '<li class="list-group-item list-group-item-action list-group-item-danger">'+number+')'+ currentImg[currentIndex]+'<strong>' +  message.responseText + '</strong></li>';

                    messageFinal.append(content);
                    currentIndex++;
                    if(countfile==currentIndex) {
                        //on cache le bg
                        mainPhotoRequest.params.id.bg.fadeOut();

                        // affiche le modal pour la notification
                        bootbox.alert(messageFinal.html(), function(){});

                    }
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

            var content = '<li class="list-group-item list-group-item-action list-group-item-success">'+number+')'+ name +'<strong> size : '+ size +'</strong></li>';

            messageFinal.append(content);

            // on teste si  le countfile a attient l'index max du  tableau  de fichier
            if(countfile==currentIndex)
            {
                //on cache le bg
                mainPhotoRequest.params.id.bg.fadeOut();

                // affiche le modal pour la notification
                bootbox.alert(messageFinal.html(), function(result){
                    mainPhotoRequest.params.id.modal_photo.modal("show");
                });

            }

        }


        // Bytes conversion
        function convertSize(size) {
            var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
            if (size == 0) return '0 Byte';
            var i = parseInt(Math.floor(Math.log(size) / Math.log(1024)));
            return Math.round(size / Math.pow(1024, i), 2) + ' ' + sizes[i];
        }


        // webcam

        streaming = false,
            width = 0,
            height = 270;


        function init() {
            navigator.getMedia = ( navigator.getUserMedia ||
            navigator.webkitGetUserMedia ||
            navigator.mozGetUserMedia ||
            navigator.msGetUserMedia);
            navigator.getMedia(
                {
                    video: true,
                    audio: false
                },
                function(stream) {
                    if (navigator.mozGetUserMedia) {
                        mainPhotoRequest.params.webcam.video.mozSrcObject = stream;
                    } else {
                        var vendorURL = window.URL || window.webkitURL;
                        mainPhotoRequest.params.webcam.video.src = vendorURL.createObjectURL(stream);
                    }
                    mainPhotoRequest.params.webcam.video.play();
                    mainPhotoRequest.params.webcam.startbutton.prop("disabled",false);
                },
                function(err) {
                    console.log("An error occured! " + err);
                }
            );
        }




        mainPhotoRequest.params.webcam. video.addEventListener('canplay', function(e){
            if (!streaming) {
                width = mainPhotoRequest.params.webcam.video.videoWidth / (mainPhotoRequest.params.webcam.video.videoHeight/height);
                mainPhotoRequest.params.webcam.video.setAttribute('width', width);
                mainPhotoRequest.params.webcam.video.setAttribute('height', height);
                mainPhotoRequest.params.webcam.canvas.setAttribute('width', width);
                mainPhotoRequest.params.webcam.canvas.setAttribute('height', height);
                streaming = true;
            }
        });

        function takepicture() {
            mainPhotoRequest.params.webcam.audio.play();
            mainPhotoRequest.params.webcam.canvas.width = width;
            mainPhotoRequest.params.webcam.canvas.height = height;
            mainPhotoRequest.params.webcam.canvas.getContext('2d').drawImage(mainPhotoRequest.params.webcam.video, 0, 0, width, height);
            var data = mainPhotoRequest.params.webcam.canvas.toDataURL('image/png');
            mainPhotoRequest.params.webcam.photo.attr('src', data);
        }

        mainPhotoRequest.params.webcam.startbutton.click(function(e){
            takepicture();
            mainPhotoRequest.params.webcam.save.prop("disabled",false);
            e.preventDefault();
        });

        mainPhotoRequest.params.webcam.save.click(function(e){
            upload();
            e.preventDefault();
        });

        function upload() {
            mainPhotoRequest.params.webcam.audio_off.play();
            mainPhotoRequest.params.webcam.webcam_loader.fadeIn();
            mainPhotoRequest.params.webcam.save.prop("disabled",true);
            mainPhotoRequest.params.webcam.startbutton.prop("disabled",true);
            var head = /^data:image\/(png|jpeg);base64,/,
                data = '',
                formdata = new FormData(),
                xhr = new XMLHttpRequest();
            data = mainPhotoRequest.params.webcam.canvas.toDataURL('image/png', 0.9).replace(head, '');
            formdata.append('file', data);
            formdata.append('id', currentUser.id);

            $.ajax({
                url: mainPhotoRequest.params.api.webcam.url,
                type:  mainPhotoRequest.params.api.webcam.method,
                data: formdata,
                headers : {"X-Auth-Token" : currentUser.token},
                crossDomain: true,
                contentType: false,
                processData: false,
                success: function(response){
                    console.log(response);
                },
                error: function (xhr, status, message) { //en cas d'erreur
                    console.log(status+"\n"+xhr.responseText + '\n' + message );
                },
                complete:function(){
                    console.log("Request finished.");
                    mainPhotoRequest.params.webcam.webcam_loader.fadeOut();
                    mainPhotoRequest.params.webcam.webcam_notification.fadeIn();
                    mainPhotoRequest.params.webcam.startbutton.prop("disabled",false);
                     t =setInterval(function(){
                         mainPhotoRequest.params.webcam.webcam_notification.fadeOut();
                        clearInterval(t);
                    },3000);
                }

            });

            }

        //mainPhotoRequest.params.webcam.webcam_modal.modal("show");
        //initialiser la webcam
        mainPhotoRequest.params.webcam.webcam_show.click(function(){
            // affiche le modal pour la notification
            mainPhotoRequest.params.webcam.webcam_modal.modal("show");
            mainPhotoRequest.params.webcam.save.prop("disabled",true);
            mainPhotoRequest.params.webcam.startbutton.prop("disabled",true);
            init();
        });


        //verifier si l'extension d'un fichier
        function isValidExt(fileExtension)
        {

            var fileExtension = fileExtension.toLowerCase();
            var pattern ="^image/(png|jpg|gif|jpeg|bnp)$"
            var regex = new RegExp(pattern);
            if(regex.test(fileExtension)){
                return true;
            }
            return false;
        }

        //verifier si la taille d'un fichier est  convenable
        function isValidLenght(filesize,compaeSize)
        {
            if(filesize<=compaeSize){
                return true;
            }
            return false;
        }


    }
});