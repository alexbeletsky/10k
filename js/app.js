/// <reference path="jquery/jquery-1.6.2-vsdoc.js" />
/// <reference path="github.js" />
/// <reference path="bages.js" />
/// <reference path="info.js" />

$(function () {

    var badges = [new Watcher(), new Follower(), new Celebrity(), new Contributor(), new Creator(), new Coder(), new Bureaucrat(), new Writer()];

    //$('.badges').hide();

    $('#github-account').live('keyup', function (event) {
        if ($(this).val() != '' && event.keyCode == 13) {
            setTimeout(loadBadges(), 200);
        }
        event.preventDefault();
    });

    function loadBadges() {
        hideInput(startProgress);
    }

    function hideInput(callback) {
        $('#box').fadeOut('slow', callback);
    }

    function startProgress() {
        $('#loading').show();

        var github = new GitHub();
        var callback = function (d) {
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

            $('#loading').hide();
        }

        github.init($('#github-account').val(), callback);
    }

    //badgesTests();
    //infoTests();
    //githubTests();
    // Application code
});

function githubTests() {
    var github = new GitHub();

    var callback = function (d) {
        //alert(d);
    }

    github.init('rstacruz', callback);
}

function infoTests() {
    var info = new Info();

    var callback = function (d) {
        alert(d);
    }

    info.collect('rstacruz', callback);
}

function badgesTests() {
    var info = {};
    var context = {};

    info.repositories = 17;             //DONE
    info.watchedRepositories = 700;     //DONE
    info.following = 522;               //DONE
    info.followed = 15;                 //DONE
    info.forked = 4;                    //DONE
    info.watchers = 12;                 //DONE
    info.issues = 40;                   //DONE             
    info.gists = 100;                   //DONE
    context.bages = [];

    var watcher = new Watcher();
    watcher.applyForBadge(info, context);
    $('.debug').append('<p>Watcher ' + context.bages['Watcher'].type + ' ' + context.bages['Watcher'].info + '</p>');

    var follower = new Follower();
    follower.applyForBadge(info, context);
    $('.debug').append('<p>Follower ' + context.bages['Follower'].type + ' ' + context.bages['Follower'].info + '</p>');

    var celebrity = new Celebrity();
    celebrity.applyForBadge(info, context);
    $('.debug').append('<p>Celebrity ' + context.bages['Celebrity'].type + ' ' + context.bages['Celebrity'].info + '</p>');

    var contributor = new Contributor();
    contributor.applyForBadge(info, context);
    $('.debug').append('<p>Contributor ' + context.bages['Contributor'].type + ' ' + context.bages['Contributor'].info + '</p>');

    var creator = new Creator();
    creator.applyForBadge(info, context);
    $('.debug').append('<p>Creator ' + context.bages['Creator'].type + ' ' + context.bages['Creator'].info + '</p>');

    var coder = new Coder();
    coder.applyForBadge(info, context);
    $('.debug').append('<p>Coder ' + context.bages['Coder'].type + ' ' + context.bages['Coder'].info + '</p>');

    var bureaucrat = new Bureaucrat();
    bureaucrat.applyForBadge(info, context);
    $('.debug').append('<p>Bureaucrat ' + context.bages['Bureaucrat'].type + ' ' + context.bages['Bureaucrat'].info + '</p>');

    var writer = new Writer();
    writer.applyForBadge(info, context);
    $('.debug').append('<p>Writer ' + context.bages['Writer'].type + ' ' + context.bages['Writer'].info + '</p>');
}