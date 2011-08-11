/// <reference path="jquery/jquery-1.6.2-vsdoc.js" />
/// <reference path="github.js" />
/// <reference path="bages.js" />
/// <reference path="info.js" />

$(function () {
    var badges = [new Watcher(), new Follower(), new Celebrity(), new Contributor(), new Creator(), new Coder(), new Bureaucrat(), new Writer()];

    $('.badges').empty();

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
                    return;
                }
                var badge = context.badges[current];
                var $badge = $('<div class="badge"><div class="body ' + badge.type + '-outline"><h2>' + badge.name + '</h2><p>' + badge.info + '</p></div></div>');
                $badge.hide();
                $('.badges').append($badge);

                $badge.fadeIn('slow', function () { showNextBadge(++current) });
            }

            showNextBadge(0);
        }

        var error = function () {
            $('#loading').hide();
            $('.badges').append('<p class="error">Sorry, but it looks like user with such account does not exists...</p>');
        }

        location.hash = account;
        github.init(account, callback, error);
    }

    if (location.hash) {
        $('#box').hide();
        startProgress(location.hash.substr(1));
    }
});