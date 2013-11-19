$(function () {
    var badges = [new Watcher(), new Follower(), new Celebrity(), new Contributor(), new Creator(), new Coder(), new Bureaucrat(), new Writer()];

    function startProgress(account) {
        $('#box').fadeOut('slow', function () {
            showBadges(account);
        });
    }

    function showBadges(account) {
        $('#loading').show();

        var github = new GitHub();
        var callback = function (d) {
            $('#loading').hide();

            var context = { badges: [] };
            $.each(badges, function (i, badge) {
                badge.applyForBadge(d, context);
            });

            var summary = {
                toString: function () {
                    return 'You have earned: ' +
                        (this['golden'] || 0) + ' golden, ' + (this['silver'] || 0) + ' silver, ' + (this['bronze'] || 0) + ' bronze and ' + (this['wooden'] || 0) + ' wooden badges';
                }
            };
            var showNextBadge = function (current) {
                if (current == context.badges.length) {

                    if (current === 0) {
                        $('.badges').append('<span class="info">Your github activity is very low. You earned nothing, keep up good work!</span>');
                        return;
                    }

                    var summaryText = summary.toString();
                    var $earnings = $('<span class="earnings">' + summaryText + '</span>').hide();
                    $earnings.append('<p><a href="http://twitter.com/share" class="twitter-share-button" data-text="' + summaryText + '" data-count="none" data-via="ghbadges" data-related="alexbeletsky">Tweet</a><script type="text/javascript" src="http://platform.twitter.com/widgets.js"></script></p>');

                    $('.badges').append($earnings);
                    $earnings.fadeIn('fast');

                    return;
                }
                var badge = context.badges[current];
                var type = badge.type, name = badge.name, info = badge.info;

                collectSummary(summary, type);

                var $badge = $('<div class="badge"><div title="' + type + ' badge" class="body ' + type + '-outline"><h2>' + name + '</h2><p>' + info + '</p></div></div>').hide();
                $('.badges').append($badge);

                $badge.fadeIn('slow', function () { showNextBadge(++current); });
            };

            $('.badges').show();
            showNextBadge(0);
        };

        var collectSummary = function (summary, type) {
            if (summary[type] === undefined) {
                summary[type] = 0;
            }

            summary[type]++;
        };

        var error = function () {
            $('#loading').hide();
            $('.badges').show();
            $('.badges').append('<span class="error">Sorry, but it looks like user with such account does not exists...</span>');
        };

        location.hash = account;
        github.init(account, callback, error);
    }

    $('.badges').hide().empty();
    $('.border').css('background', '#004d69');

    $('button.submit').bind('click', function () {
        var account = $('#github-account').val().trim();
        if (account !== '') {
            setTimeout(startProgress(account), 200);
        }
        event.preventDefault();
    });

    $('#github-account').live('keyup', function (event) {
        var account = $('#github-account').val().trim();
        if (account !== '' && event.keyCode == 13) {
            setTimeout(startProgress(account), 200);
        }
        event.preventDefault();
    });

    if (location.hash) {
        $('#box').hide();
        startProgress(location.hash.substr(1));
    }
});