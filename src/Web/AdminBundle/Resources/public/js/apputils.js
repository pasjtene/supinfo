/**
 * Created by root on 7/26/17.
 */
var app = {
    formatNumber: function(number){
        return number < 10 ? "0"+number : number.toString();
    },
    parseDate : function(date)
    {
        var d = new Date(date),
            result = "";

        result += app.formatNumber(d.getDate()) + '/';
        result += app.formatNumber(d.getMonth()) + '/';
        result += d.getFullYear() + ' à ';
        result += app.formatNumber(d.getHours()) + ':';
        result += app.formatNumber(d.getMinutes());

        return result;
    }
};