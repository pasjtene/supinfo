bootbox.dialog("Plenty of buttons...", [{
    "label" : "Success!",
    "class" : "success",
    "callback": function() {
        console.log("great success");
    }
}, {
    "label" : "Danger!",
    "class" : "danger",
    "callback": function() {
        console.log("uh oh, look out!");
    }
}, {
    "label" : "Click ME!",
    "class" : "primary",
    "callback": function() {
        console.log("Primary button");
    }
}, {
    "label" : "Just a button..."
}, {
    "Condensed format": function() {
        console.log("condensed");
    }
}]);