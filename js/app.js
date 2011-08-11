/// <reference path="jquery/jquery-1.6.2-vsdoc.js" />
/// <reference path="github.js" />
/// <reference path="bages.js" />
/// <reference path="info.js" />

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

            var showNextBadge = function (current) {
                if (current == context.badges.length) {

                    if (current == 0) {
                        $('.badges').append('<span class="info">Your github activity is very low. You earned nothing, keep up good work!</span>');
                    }

                    return;
                }
                var badge = context.badges[current];
                var $badge = $('<div class="badge"><div title="' + badge.type + ' badge" class="body ' + badge.type + '-outline"><h2>' + badge.name + '</h2><p>' + badge.info + '</p></div></div>').hide();
                $('.badges').append($badge);

                $badge.fadeIn('slow', function () { showNextBadge(++current) });
            }

            $('.badges').show();
            showNextBadge(0);
        }

        var error = function () {
            $('#loading').hide();
            $('.badges').append('<span class="error">Sorry, but it looks like user with such account does not exists...</span>');
        }

        location.hash = account;
        github.init(account, callback, error);
    }

    $('.badges').hide().empty();

    $('button.submit').bind('click', function () {
        var account = $('#github-account').val();
        setTimeout(startProgress(account), 200);
        event.preventDefault();
    });

    $('#github-account').live('keyup', function (event) {
        var account = $('#github-account').val();
        if (account != '' && event.keyCode == 13) {
            setTimeout(startProgress(account), 200);
        }
        event.preventDefault();
    });

    if (location.hash) {
        $('#box').hide();
        startProgress(location.hash.substr(1));
    }
});