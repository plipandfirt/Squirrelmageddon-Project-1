// developer.marvel.com 
//      authorization docs:         https://developer.marvel.com/documentation/authorization
//      example well formed call:   https://gateway.marvel.com:443/v1/public/characters?name=Spider-Man&apikey=1888be9053bda9ff9e24ec97fc2ed191
// Global Variables
const marvelPublicKey = "1888be9053bda9ff9e24ec97fc2ed191";

//---------------------------
// buildMarvelQueryURL() - utility function to build the API query
//---------------------------
function buildMarvelQueryURL(name) {
    // queryURL is the url we'll use to query the API
    var queryURL = "https://gateway.marvel.com:443/v1/public/characters?";

    //  Add parameters:   timestamp,  public key, hashed md5("ts" + "private_key" + "public_key")
    var ts = moment().format("X");
    var apiKey = marvelPublicKey;
    var privateKey = "c460d8a97e9d3ceda944bb28e624bbd2c83111e9";
    var hash = MD5(ts + privateKey + apiKey);
    var queryParams = {
        "name": name,
        "ts": ts,
        "apikey": apiKey,
        "hash": hash
    };

    queryURL +=  $.param(queryParams);

    // Logging the URL so we have access to it for troubleshooting
    console.log("buildQueryURL()- " + queryURL);

    return queryURL;
}

//---------------------------
// performMarvelSearch(title) - uses the passed parameter to run a query against the Marvel developer API
//-----------------------------
function performMarvelSearch(character) {

    // Build the query URL for the ajax request to the NYT API
    var queryURL = buildMarvelQueryURL(character);

    // Make the AJAX request to the API - GETs the JSON data at the queryURL.
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log("--------- performMarvelSearch() response data ------------");
        console.log(response);
        console.log("----------------------------------------------------------");

        // TO-DO:  Attach details from response to the div element here
        var name = response.data.results[0].name;
        var thumbnail = response.data.results[0].thumbnail.path;
        thumbnail += "." + response.data.results[0].thumbnail.extension;

        // Replace the displayed card with the new movie
        $("#char-img").empty();
        $("#char-img").append($("<p>").text(name));
        $("#char-img").append($("<img>").attr("src",thumbnail).attr("height","150px"));
    });
}