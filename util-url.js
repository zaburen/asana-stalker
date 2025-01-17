const REGEX_PATTERN_FOR_ASANA_URLS = /https:\/\/app.asana.com\/\d+\/\d+\/\d+/g;

/**
 * 
 * @param {String} text to search
 * @returns List of Object { url: String, gid: Number }
 */
function getAnyAsanaUrls(text) {
    let urls = [];
    let matches = text.match(REGEX_PATTERN_FOR_ASANA_URLS)
    if (matches !== null) {
        urls = [...text.match(REGEX_PATTERN_FOR_ASANA_URLS)];
    }
    let urlAndGidList = urls.map((url) => {
        return convertUrlToGidAndUrl(url);
    });
    console.log(`Matched Urls:\n${urlAndGidList}`);
    return urlAndGidList;
}

/**
 * 
 * @param {String} urlText String containg an Asana Matched URL
 * @returns Object { url: String, gid: Number }
 */
function convertUrlToGidAndUrl(urlText) {
    const REGEX_PATTERN_FOR_GIDS = /\d+/g;
    let gid = urlText.match(REGEX_PATTERN_FOR_GIDS).pop(); // need last number
    return {
        url: urlText,
        gid: gid,
    }
}


module.exports = { getAnyAsanaUrls };