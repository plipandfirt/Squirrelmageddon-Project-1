// wikipedia.js -  wikipedia.org API - used to augment the Marvel API search 

//---------------------------
// performWikiSearch(title) - uses the passed parameter to run a query against the wikipedia API
///                         - gets multiple items and iterates a new call to go through again to get the details
//-----------------------------
function performWikiSearch(character) {
    $.ajax({
        type: "GET",
        url: "http://en.wikipedia.org/w/api.php?action=opensearch&search=" + character + "&callback=?",
        contentType: "application/json; charset=utf-8",
        async: false,
        dataType: "json",
        success: function (data, textStatus, jqXHR) {
            console.log("--------- performWikiSearch() response data ------------");
            console.log(data);
            console.log("----------------------------------------------------------");

            // Launch another ajax query using the first named MediaWiki element
            $.each(data, function (i, item) {
                if (i == 1) {
                    var searchData = item[0];
                    WikiAPIGetContent(searchData);
                }
            });
        },
        error: function (errorMessage) {
            console.log(errorMessage);
        }
    });
}

//---------------------------
// WikiAPIGetContent(search) - uses the passed parameter to run a query against the wikipedia API
//-----------------------------
function WikiAPIGetContent(search) {
    $.ajax({
        type: "GET",
        url: "http://en.wikipedia.org/w/api.php?action=parse&format=json&prop=text&section=0&page=" + search + "&callback=?",
        contentType: "application/json; charset=utf-8",
        async: false,
        dataType: "json",
        success: function (data, textStatus, jqXHR) {

            var markup = data.parse.text["*"];
            var blurb = $('<div></div>').html(markup);

            // remove links as they will not work
            blurb.find('a').each(function () {
                $(this).replaceWith($(this).html());
            });

            // remove images as they will not work
            blurb.find('img').each(function () {
                $(this).replaceWith($(this).html());
            });

            // remove any references
            blurb.find('sup').remove();

            // remove cite error
            blurb.find('.mw-ext-cite-error').remove();

            // remove notes:
            blurb.find('.hatnote').remove();

            // remove notes:
            blurb.find('.ambox').remove();

            // remove references
            blurb.find('.references').remove();

            $('#wiki').html($(blurb).find('p'));
            $('#wiki').html(blurb);

        },
        error: function (errorMessage) {
            console.log(errorMessage);
        }
    });
}