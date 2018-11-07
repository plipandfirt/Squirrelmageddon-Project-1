/////////////////////////////////
// wikipedia.js -  wikipedia.org API - used to augment the Marvel API search by querying wikipedia.org for content
//                 Note:  it provides two apis,  one for a general query for when the query is generalized and 
//                        not specific page is in mind.   The second is a direct search to an exact known page.
//  Source:  https://www.mediawiki.org/wiki/API:Parsing_wikitext                 

//---------------------------
// performWikiSearch(topic) - uses the passed parameter to run a query against the wikipedia API
//                          - performs an open search on a listed topic and runs a deep search on the first match
//                          - this is good for those times when you aren't sure of what you are looking for
//                          - wikipedia is open sourced and does not require an API key to query, bless their hearts.
//-----------------------------
function performWikiTopicSearch(topic) {

    // First of two required ajaz calls to get the topics matching our topic search
    $.ajax({
        type: "GET",
        url: "http://en.wikipedia.org/w/api.php?action=opensearch&search=" + topic + "&callback=?",
        contentType: "application/json; charset=utf-8",
        async: false,
        dataType: "json",
        noimages: true,
        success: function (data) {
            console.log("--------- performWikiSearch() response data ------------");
            console.log(data);
            console.log("----------------------------------------------------------");

            // Launch another ajax query using the first named MediaWiki element found
            $.each(data, function (i, item) {
                if (i == 1) {
                    var searchData = item[0];
                    performWikiPageSearch(searchData);
                }
            });
        },
        error: function (errorMessage) {
            console.log(errorMessage);
        }
    });
}

//---------------------------
// performWikiPageSearch(search) - uses the passed parameter to run a *detail* query against the wikipedia API
//                           - use this search when you are sure the search leads to a specific detail page
//                           - note it removes all anchors, links and images, to just have the summary table left
//-----------------------------
function performWikiPageSearch(search) {

    // Second call required ajaz calls to narrow our result to a specific wikipedia page
    $.ajax({
        type: "GET",
        url: "http://en.wikipedia.org/w/api.php?action=parse&format=json&prop=text&section=0&page=" + search + "&callback=?",
        contentType: "application/json; charset=utf-8",
        async: false,
        dataType: "json",
        noimages: true,    // don't bring back any images
        success: function (data) {

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

            // Exclude the main paragraph, extract all the descending paragraphs and attach them to the wiki
            $('#wiki').html($(blurb).find('p'));
            $('#wiki').html(blurb);

        },
        error: function (errorMessage) {
            console.log(errorMessage);
        }
    });
}