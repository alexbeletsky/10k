/// <reference path="jquery-1.6.2-vsdoc.js" />

function GitHub() { }

GitHub.prototype = (function () {
    var api = 'http://github.com/api/v2/json/';

    var withJsonp = function(url) {
        return url + '?callback=?';
    }

    var callApi = function(m, callback) {
        var url = withJsonp(api + m);
        $.getJSON(url, function(r) {    
            callback(r)
        });
    }

    return {
        repos: function (user, callback) {
            callApi('repos/show/' + user, callback);
        }
    };

})();