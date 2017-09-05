/**
 * Created by tene on 03/09/2017.
 */
//alert("this is supinfo");
/**
 * Created by tene on 03/09/2017.
 */
//alert("this is supinfo");

//Limit images download capabilities
$('.img-content').mousedown(function (e) {
    if(e.button == 2) { // right click
        //alert("Thank you for your interest !!!");
        return false; // do nothing!
    }
});