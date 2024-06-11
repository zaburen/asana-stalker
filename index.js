const UtilUrl = require("./util-url");
const CustomAsana = require("./asana");
const CustomGithub = require("./github");

function run() {
    const eventBody = CustomGithub.getGithubEventsBody();
    const eventUrl = CustomGithub.getEventUrl();
    const hrefText = CustomGithub.getEventHrefText();
    const linkList = UtilUrl.getAnyAsanaUrls(eventBody);
    linkList.forEach((obj) => {
        CustomAsana.getTaskNotesAndUpdateThemIfNeeded(obj.gid, eventUrl, hrefText);
    });
}

run();