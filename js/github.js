/// <reference path="jquery/jquery-1.6.2-vsdoc.js" />

function GitHub() { }

GitHub.prototype = (function () {
    var api = 'https://api.github.com/';

    var callApi = function (m, error, callback) {
        $.ajax({
            url: api + m,
            dataType: "jsonp",
            jsonpCallback: "jsoncallback",
            timeout: 5000,
            success: function (r) {
                callback(r);
            },
            error: function (x, t, e) {
                error(x, t, e);
            },
        });
    };

    var getForkedCount = function (repos) {
        var count = 0;
        $.each(repos, function (i, repo) {
            if (repo.fork) {
                count++;
            }
        });

        return count;
    };

    var getMaxIssuesCount = function (repos) {
        var maxIssues = 0;
        $.each(repos, function (i, repo) {
            var issuesInCurrentRepository = repo.open_issues;

            if (issuesInCurrentRepository > maxIssues) {
                maxIssues = issuesInCurrentRepository;
            }
        });

        return maxIssues;
    };

    var getMaxWatchers = function (repos) {
        var maxWatchers = 0;

        $.each(repos, function (i, repo) {
            var watchersForCurrentRepository = repo.watchers;

            if (watchersForCurrentRepository > maxWatchers) {
                maxWatchers = watchersForCurrentRepository;
            }
        });

        return maxWatchers;
    };

    return {
        init: function (user, callback, error) {
            var info = {};
            // get user information
            callApi('users/' + user, error, function (r) {

                info.name = r.data.name;
                info.gravatar = r.data.gravatar_id;
                info.following = r.data.following;
                info.followed = r.data.followers;

                // get watched repos information
                callApi('users/' + user + '/subscriptions', error, function (r) {

                    info.watchedRepositories = r.data.length;

                    // get repositories information
                    callApi('users/' + user + '/repos', error, function (r) {

                        info.repositories = r.data.length;
                        info.forked = getForkedCount(r.data);
                        info.issues = getMaxIssuesCount(r.data);
                        info.watchers = getMaxWatchers(r.data);

                        callback(info);
                    });
                });
            });
        }
    };
})();