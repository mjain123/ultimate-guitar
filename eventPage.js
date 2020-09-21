chrome.browserAction.onClicked.addListener(function(activeTab) {
    if (!activeTab || !activeTab.url) {
        return;
    }
    $.getJSON('https://noembed.com/embed', {format: 'json', url: activeTab.url}, function (data) {
        if (!data || !data.title) {
            return;
        }
        var newURL = buildUrl(fixTitle(data.title));
        chrome.tabs.create({ url: newURL });
    });
});   

const fixTitle = (title) => {
    title = title.replace(/\(.*\)/, ''); // remove '(addtional info)' text from title.
    return encodeURI(title);
}

const ultimateGuitarSearchUrl = 'https://www.ultimate-guitar.com/search.php?search_type=title&value=';

const buildUrl = (title) => ultimateGuitarSearchUrl + title;

const youtubeUrlParser = (url) => {
    var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    var match = url.match(regExp);
    return (match&&match[7].length==11)? match[7] : false;
};
