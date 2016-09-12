(function () {
    'use strict';

    var main = function () {
        var blockedUserLinks = [];
        var blockedUserNames = [];

        var blockUser = function () {
            $.each(blockedUserLinks, function (index, item) {
                var links = [item, "http://www.zhihu.com" + item, "http://www.zhihu.com" + item];
                $.each(links, function (index, link) {
                    $('div.zm-item-answer:has(a.author-link[href="' + link + '"])').hide();
                });
            });

            $.each(blockedUserNames, function (index, item) {
                $('div.comment-app-holder div[aria-label="' + item + "的评论" + '"]').hide();
            });

        };

        // load blocked user
        $.get("/settings/filter").done(function (html) {
            var page = $(html);
            $.each(page.find('.blocked-users a.avatar-link'), function (index, item) {
                blockedUserLinks.push($(item).attr("href"));
            });

            $.each(page.find('.blocked-users div.body a'), function (index, item) {
                blockedUserNames.push($(item).text());
            });

            blockUser();
        });


        $(document).ajaxComplete(function (event, request, settings) {
            blockUser();
        });
    };

    chrome.storage.local.get("disabled", function (data) {
        if (!data || !data["disabled"]) {
            var injectedScript = document.createElement('script');
            injectedScript.type = 'text/javascript';
            injectedScript.text = '(' + main + ')("");';
            (document.body || document.head).appendChild(injectedScript);
        }
    });
})();

