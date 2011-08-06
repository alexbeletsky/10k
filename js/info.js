/// <reference path="jquery-1.6.2-vsdoc.js" />
/// <reference path="github.js" />

function Info() { }

Info.prototype = (function () {
    function Collector(user) {
        this.github = new GitHub();
        this.user = user;
    }

    Collector.prototype.collect = function (callback) {
        var dataReady = function () {
            var info = {};

            callback(info);
        }

        this.github.init(this.user, dataReady);
    }

    return {
        collect: function (user, callback) {
            var collector = new Collector(user);
            collector.collect(callback);
        }
    }

})();