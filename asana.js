/**
 * Documents: 
 * - https://github.com/Asana/node-asana/
 * - https://developers.asana.com/docs/javascript
 */

const core = require('@actions/core');
const Asana = require('asana');

// Initialize Asana Client
let client = Asana.ApiClient.instance;
let token = client.authentications['token'];
let tokenFromGithub = core.getInput('asana-pat');
token.accessToken =  tokenFromGithub;
let tasksApiInstance = new Asana.TasksApi();

/**
 * 
 * @param {String} gid Global ID for task
 * @param {String} url URL to add to task notes (if not already present)
 * @param {String} linkText Text to use for url when makeing href
 * @returns todo
 */
async function getTaskNotesAndUpdateThemIfNeeded(gid, url, linkText) {
    console.log(`\nTask gid: ${gid}`)
    try {
        let existingNotes = await getTaskHtmlNotes(gid);
        let alreadyContainsNewNote = checkIfNotesAlreadyContainUrl(existingNotes, url)
        if (alreadyContainsNewNote) {
            console.log(`Task notes already contains information you are trying to add.`);
            return;
        } else {
            let updatedNotes = makeUpdatedNotes(existingNotes, url, linkText);
            updateAsanaTaskNotes(gid, updatedNotes);
        }
    } catch(error) {
        if (isErrorBecauseNotATask(error.message)) {
            console.log('Gid was not a task Gid');
        } else {
            console.log(`Asana Error:\n${error}`);
        }
    }
}


async function getTaskHtmlNotes(gid) {
    let options = {
        'opt_fields': 'html_notes'
    };

    let htmlNotes = '';
    await tasksApiInstance.getTask(gid, options).then((result) => {
        htmlNotes = result.data.html_notes;
    }, (error) => {
        let errorText = error.response.text;
        throw new Error(errorText);
    });
    console.log(`Task's Old Notes:\n${htmlNotes}`)
    return htmlNotes;
}

async function updateAsanaTaskNotes(gid, updatedNotes) {
    let body = {
        'data': {
            'html_notes': updatedNotes
        }
    };
    let options = {};

    tasksApiInstance.updateTask(body, gid, options).then((result) => {
        console.log(`Task notes has been updated!\nURL: ${result.data.permalink_url}`);
    }, (error) => {
        let errorText = error.response.text;
        throw new Error(errorText);
    });
}

function makeUpdatedNotes(originalNotes, url, linkText) {
    let updatedNotes = originalNotes.replace('<body>', `<body>${makeHref(url, linkText)}\n`).trim();
    return updatedNotes;
}

function checkIfNotesAlreadyContainUrl(notes, url) {
    return notes.search(url) >= 0;
}

function makeHref(url, linkText) {
    return `<a href="${url}">${linkText}</a>`;
}

function isErrorBecauseNotATask(errorText) {
    return errorText.search('Not a recognized ID') >= 0;
}

module.exports = { getTaskNotesAndUpdateThemIfNeeded };