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
            type: "JSON"
        },
        id: {
            uploadfile : $("#uploadfile"),
            uploadfile_col : $("#uploadfile .col-12"),
            file: $("#file"),
            uploadfile_context: $("#uploadfile .col-12 #context"),
            uploadfile_h1: $("#uploadfile .col-12 h1"),
            uploadfile_btn: $("#uploadfile .col-12 button")
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
       // preventing page from redirecting
       mainPhotoRequest.params.html.on("dragover", function(e) {
           e.preventDefault();
           e.stopPropagation();
           // hide the  upload button
           mainPhotoRequest.params.id.uploadfile_context.slideUp();
           mainPhotoRequest.params.id.uploadfile_h1.text("Drag here");
       });

       mainPhotoRequest.params.html.on("drop", function(e) { e.preventDefault(); e.stopPropagation(); });


       // Drag enter
       mainPhotoRequest.params.class.upload_area.on('dragenter', function (e) {
           e.stopPropagation();
           e.preventDefault();
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

           //show the upload button
           mainPhotoRequest.params.id.uploadfile_h1.slideDown();
           mainPhotoRequest.params.id.uploadfile_h1.text("");

           var files = e.originalEvent.dataTransfer.files;
           var fd = new FormData();

           // fd.append('file', file[0]);

           //uploadData(fd);

           for(var i=0; i<files.length; i++)
           {
               var file = files[i];
               fd.append('file',file);
               uploadData(fd);
           }
       });

       // Open file selector on button click
       mainPhotoRequest.params.id.uploadfile_btn.click(function(){
           mainPhotoRequest.params.id.file.click();
       });

       // file selected
       mainPhotoRequest.params.id.file.change(function(){
           var fd = new FormData();
            var  inputfile  =mainPhotoRequest.params.id.file;

           for(var i=0; i<inputfile[0].files.length; i++)
           {
               var files = inputfile[0].files[i];
               fd.append('file',files);
               uploadData(fd);
           }

       });

       // Sending AJAX request and upload file
       function uploadData(formdata){
           var  photo = {
               id : app.user.id,
               photo : formdata
           }
           $.ajax({
               url: mainPhotoRequest.params.api.url,
               type:  mainPhotoRequest.params.api.method,
               data: photo,
               contentType: false,
               processData: false,
               dataType:  mainPhotoRequest.params.api.type,
               success: function(response){
                   addThumbnail(response);
               }
           });
       }

       // save the upload zone content
        var lastcontent = null;
       // Added thumbnail
       function addThumbnail(data){
           lastcontent = lastcontent==null? mainPhotoRequest.params.class.upload_area_col.html():lastcontent;
           mainPhotoRequest.params.class.upload_area_col.empty();
           var len = mainPhotoRequest.params.class.upload_area_thumbnail.length;

           var num = Number(len);
           num = num + 1;

           var name = data.name;
           var size = convertSize(data.size);
           var src = baseHost+data.src;

           // Creating an thumbnail
           mainPhotoRequest.params.id.uploadfile_col.append('<div id="thumbnail_'+num+'" class="thumbnail"></div>');
           $("#thumbnail_"+num).append('<img src="'+src+'" width="100%" height="78%">');
           $("#thumbnail_"+num).append('<span class="size">'+size+'<span>');

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