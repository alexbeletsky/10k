/// <reference path="jquery-1.6.2-vsdoc.js" />
/// <reference path="github.js" />
/// <reference path="bages.js" />

$(function () {

    var info = {};
    var context = {};

    info.watchedRepositories = 700;
    info.following = 522;
    info.followed = 15;
    info.forked = 4;
    info.watched = 12;
    info.issues = 40;
    info.gists = 100;
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

    var bureaucrat = new Bureaucrat();
    bureaucrat.applyForBadge(info, context);
    $('.debug').append('<p>Bureaucrat ' + context.bages['Bureaucrat'].type + ' ' + context.bages['Bureaucrat'].info + '</p>');

    var writer = new Writer();
    writer.applyForBadge(info, context);
    $('.debug').append('<p>Writer ' + context.bages['Writer'].type + ' ' + context.bages['Writer'].info + '</p>');

    Writer

});