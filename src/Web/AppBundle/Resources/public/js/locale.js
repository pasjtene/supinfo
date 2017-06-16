/**
 * Created by Danick takam on 16/06/2017.
 */
var AppLocale = {};


$(function()
{
    $.get('', function(response)
    {
        AppLocale = response.messages;
    });
});