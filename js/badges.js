/// <reference path="jquery/jquery-1.6.2-vsdoc.js" />

function Criteria() { }

Criteria.prototype = (function () {
    var criteria = function (badge, type, value, context, format, low, high) {
        if (!high) {
            high = value + 1;
        }

        if (value >= low && value < high) {
            context.badges.push({ name: badge, type: type, info: format(value) });
            return true;
        }

        return false;
    }

    var init = function (type, info, options) {
        var property = options[type].propertyName;
        var propertyValue = info[property];
        var low = options[type].low;
        var high = options[type].high;
        var format = options[type].format;

        return { badge: options.badge, value: propertyValue, format: format, low: low, high: high };
    }

    var wooden = function (info, context, options) {
        var input = init('wooden', info, options);
        return criteria(input.badge, 'wooden', input.value, context, input.format, input.low, input.high);
    }

    var bronze = function (info, context, options) {
        var input = init('bronze', info, options);
        return criteria(input.badge, 'bronze', input.value, context, input.format, input.low, input.high);
    }

    var silver = function (info, context, options) {
        var input = init('silver', info, options);
        return criteria(input.badge, 'silver', input.value, context, input.format, input.low, input.high);
    }

    var golden = function (info, context, options) {
        var input = init('golden', info, options);
        return criteria(input.badge, 'golden', input.value, context, input.format, input.low, input.high);
    }

    return {
        applyForBadge: function (info, context, options) {
            $.each([golden, silver, bronze, wooden], function (i, matcher) {
                return !matcher(info, context, options);
            });
        }
    }
})();

function Watcher() { }

Watcher.prototype = (function () {
    return {
        applyForBadge: function (info, context) {
            var criteria = new Criteria();
            var options = [];

            var format = function (watched) {
                return 'Watching ' + watched + ' repositories';
            }

            options.badge = 'Watcher';
            options['wooden'] = { propertyName: 'watchedRepositories', low: 5, high: 50, format: format };
            options['bronze'] = { propertyName: 'watchedRepositories', low: 50, high: 100, format: format };
            options['silver'] = { propertyName: 'watchedRepositories', low: 100, high: 500, format: format };
            options['golden'] = { propertyName: 'watchedRepositories', low: 500, format: format };

            criteria.applyForBadge(info, context, options);
        }
    }
})();

function Follower() { }

Follower.prototype = (function () {
    return {
        applyForBadge: function (info, context) {
            var criteria = new Criteria();
            var options = [];

            var format = function (following) {
                return 'Following ' + following + ' repositories';
            }

            options.badge = 'Follower';

            options['wooden'] = { propertyName: 'following', low: 5, high: 10, format: format };
            options['bronze'] = { propertyName: 'following', low: 10, high: 50, format: format };
            options['silver'] = { propertyName: 'following', low: 50, high: 100, format: format };
            options['golden'] = { propertyName: 'following', low: 100, format: format };

            criteria.applyForBadge(info, context, options);
        }
    }
})();

function Celebrity() { }

Celebrity.prototype = (function () {
    return {
        applyForBadge: function (info, context) {
            var criteria = new Criteria();
            var options = [];

            var format = function (followed) {
                return 'Followed by ' + followed + ' developers';
            }

            options.badge = 'Celebrity';

            options['wooden'] = { propertyName: 'followed', low: 5, high: 10, format: format };
            options['bronze'] = { propertyName: 'followed', low: 10, high: 100, format: format };
            options['silver'] = { propertyName: 'followed', low: 100, high: 500, format: format };
            options['golden'] = { propertyName: 'followed', low: 500, format: format };

            criteria.applyForBadge(info, context, options);
        }
    }
})();

function Contributor() { }

Contributor.prototype = (function () {
    return {
        applyForBadge: function (info, context) {
            var criteria = new Criteria();
            var options = [];

            var format = function (forked) {
                return 'Forked ' + forked + ' repositories';
            }

            options.badge = 'Contributor';

            options['wooden'] = { propertyName: 'forked', low: 5, high: 10, format: format };
            options['bronze'] = { propertyName: 'forked', low: 10, high: 20, format: format };
            options['silver'] = { propertyName: 'forked', low: 20, high: 30, format: format };
            options['golden'] = { propertyName: 'forked', low: 30, format: format };

            criteria.applyForBadge(info, context, options);
        }
    }
})();

function Creator() { }

Creator.prototype = (function () {
    return {
        applyForBadge: function (info, context) {
            var criteria = new Criteria();
            var options = [];

            var format = function (watchers) {
                return 'Some repository watched by ' + watchers + ' developers';
            }

            options.badge = 'Creator';

            options['wooden'] = { propertyName: 'watchers', low: 5, high: 10, format: format };
            options['bronze'] = { propertyName: 'watchers', low: 10, high: 100, format: format };
            options['silver'] = { propertyName: 'watchers', low: 100, high: 1000, format: format };
            options['golden'] = { propertyName: 'watchers', low: 1000, format: format };

            criteria.applyForBadge(info, context, options);
        }
    }
})();

function Coder() { }

Coder.prototype = (function () {
    return {
        applyForBadge: function (info, context) {
            var criteria = new Criteria();
            var options = [];

            var format = function (repositories) {
                return 'Have created ' + repositories + ' repositories';
            }

            options.badge = 'Coder';

            options['wooden'] = { propertyName: 'repositories', low: 5, high: 10, format: format };
            options['bronze'] = { propertyName: 'repositories', low: 10, high: 50, format: format };
            options['silver'] = { propertyName: 'repositories', low: 50, high: 100, format: format };
            options['golden'] = { propertyName: 'repositories', low: 100, format: format };

            criteria.applyForBadge(info, context, options);
        }
    }
})();


function Bureaucrat() { }

Bureaucrat.prototype = (function () {
    return {
        applyForBadge: function (info, context) {
            var criteria = new Criteria();
            var options = [];

            var format = function (issues) {
                return 'Some repository contains ' + issues + ' issues';
            }

            options.badge = 'Bureaucrat';

            options['wooden'] = { propertyName: 'issues', low: 5, high: 10, format: format };
            options['bronze'] = { propertyName: 'issues', low: 10, high: 100, format: format };
            options['silver'] = { propertyName: 'issues', low: 100, high: 1000, format: format };
            options['golden'] = { propertyName: 'issues', low: 1000, format: format };

            criteria.applyForBadge(info, context, options);
        }
    }
})();

function Writer() { }

Writer.prototype = (function () {
    return {
        applyForBadge: function (info, context) {
            var criteria = new Criteria();
            var options = [];

            var format = function (gists) {
                return 'Have created ' + gists + ' gists';
            }

            options.badge = 'Writer';

            options['wooden'] = { propertyName: 'gists', low: 10, high: 50, format: format };
            options['bronze'] = { propertyName: 'gists', low: 50, high: 100, format: format };
            options['silver'] = { propertyName: 'gists', low: 100, high: 1000, format: format };
            options['golden'] = { propertyName: 'gists', low: 1000, format: format };

            criteria.applyForBadge(info, context, options);
        }
    }
})();



