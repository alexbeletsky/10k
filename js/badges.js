/// <reference path="jquery-1.6.2-vsdoc.js" />

function Criteria() { }

Criteria.prototype = (function () {
    var criteria = function (badge, type, value, context, format, low, high) {
        if (!high) {
            high = value + 1;
        }

        if (value >= low && value < high) {
            context.bages[badge] = { type: type, info: format(value) }
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

    var wood = function (info, context, options) {
        var input = init('wood', info, options);
        return criteria(input.badge, 'wood', input.value, context, input.format, input.low, input.high);
    }

    var bronze = function (info, context, options) {
        var input = init('bronze', info, options);
        return criteria(input.badge, 'bronze', input.value, context, input.format, input.low, input.high);
    }

    var silver = function (info, context, options) {
        var input = init('silver', info, options);
        return criteria(input.badge, 'silver', input.value, context, input.format, input.low, input.high);
    }

    var gold = function (info, context, options) {
        var input = init('gold', info, options);
        return criteria(input.badge, 'gold', input.value, context, input.format, input.low, input.high);
    }

    return {
        applyForBadge: function (info, context, options) {
            $.each([gold, silver, bronze, wood], function (i, matcher) {
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
            options['wood'] = { propertyName: 'watchedRepositories', low: 1, high: 10, format: format };
            options['bronze'] = { propertyName: 'watchedRepositories', low: 10, high: 100, format: format };
            options['silver'] = { propertyName: 'watchedRepositories', low: 100, high: 500, format: format };
            options['gold'] = { propertyName: 'watchedRepositories', low: 500, format: format };

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

            options['wood'] = { propertyName: 'following', low: 1, high: 10, format: format };
            options['bronze'] = { propertyName: 'following', low: 10, high: 100, format: format };
            options['silver'] = { propertyName: 'following', low: 100, high: 500, format: format };
            options['gold'] = { propertyName: 'following', low: 500, format: format };

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

            options['wood'] = { propertyName: 'followed', low: 1, high: 10, format: format };
            options['bronze'] = { propertyName: 'followed', low: 10, high: 100, format: format };
            options['silver'] = { propertyName: 'followed', low: 100, high: 500, format: format };
            options['gold'] = { propertyName: 'followed', low: 500, format: format };

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

            options['wood'] = { propertyName: 'forked', low: 1, high: 5, format: format };
            options['bronze'] = { propertyName: 'forked', low: 5, high: 10, format: format };
            options['silver'] = { propertyName: 'forked', low: 10, high: 20, format: format };
            options['gold'] = { propertyName: 'forked', low: 20, format: format };

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

            var format = function (watched) {
                return 'Some repository watched by ' + watched + ' developers';
            }

            options.badge = 'Creator';

            options['wood'] = { propertyName: 'watched', low: 2, high: 10, format: format };
            options['bronze'] = { propertyName: 'watched', low: 10, high: 100, format: format };
            options['silver'] = { propertyName: 'watched', low: 100, high: 1000, format: format };
            options['gold'] = { propertyName: 'watched', low: 1000, format: format };

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

            options['wood'] = { propertyName: 'repositories', low: 1, high: 10, format: format };
            options['bronze'] = { propertyName: 'repositories', low: 10, high: 30, format: format };
            options['silver'] = { propertyName: 'repositories', low: 30, high: 50, format: format };
            options['gold'] = { propertyName: 'repositories', low: 50, format: format };

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

            options['wood'] = { propertyName: 'issues', low: 1, high: 10, format: format };
            options['bronze'] = { propertyName: 'issues', low: 10, high: 100, format: format };
            options['silver'] = { propertyName: 'issues', low: 100, high: 1000, format: format };
            options['gold'] = { propertyName: 'issues', low: 1000, format: format };

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

            options['wood'] = { propertyName: 'gists', low: 1, high: 10, format: format };
            options['bronze'] = { propertyName: 'gists', low: 10, high: 100, format: format };
            options['silver'] = { propertyName: 'gists', low: 100, high: 1000, format: format };
            options['gold'] = { propertyName: 'gists', low: 1000, format: format };

            criteria.applyForBadge(info, context, options);
        }
    }
})();



