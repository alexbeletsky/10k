/// <reference path="jquery/jquery-1.6.2-vsdoc.js" />

function GitHub() { }

GitHub.prototype = (function () {
    var api = 'http://github.com/api/v2/json/';

    var withJsonp = function (url) {
        return url + '?callback=?';
    }

    var callApi = function (m, callback) {
        var url = withJsonp(api + m);
        $.getJSON(url, function (r) {
            callback(r)
        });
    }

    var getForkedCount = function (repos) {
        var count = 0;
        $.each(repos, function (i, repo) {
            if (repo.fork) {
                count++;
            }
        });

        return count;
    }

    var getMaxIssuesCount = function (repos) {
        var maxIssues = 0;
        $.each(repos, function (i, repo) {
            var issuesInCurrentRepository = repo.open_issues;

            if (issuesInCurrentRepository > maxIssues) {
                maxIssues = issuesInCurrentRepository;
            }
        });

        return maxIssues;
    }

    var getMaxWatchers = function (repos) {
        var maxWatchers = 0;

        $.each(repos, function (i, repo) {
            var watchersForCurrentRepository = repo.watchers;

            if (watchersForCurrentRepository > maxWatchers) {
                maxWatchers = watchersForCurrentRepository;
            }
        });

        return maxWatchers;
    }

    return {
        init: function (user, callback) {
            var info = {};

            // get user information
            callApi('user/show/' + user, function (r) {

                info.name = r.user.name;
                info.gravatar = r.user.gravatar_id;
                info.repositories = r.user.public_repo_count;
                info.gists = r.user.public_gist_count;
                info.following = r.user.following_count;
                info.followed = r.user.followers_count;

                // get watched repos information
                callApi('repos/watched/' + user, function (r) {

                    info.watchedRepositories = r.repositories.length;

                    // get repositories information
                    callApi('repos/show/' + user, function (r) {

                        info.forked = getForkedCount(r.repositories);
                        info.issues = getMaxIssuesCount(r.repositories);
                        info.watchers = getMaxWatchers(r.repositories);

                        callback(info);
                    });
                });
            });
        }
    };
})();