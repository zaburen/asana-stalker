/**
 * Documentation:
 * https://github.com/actions/toolkit
 * https://octokit.github.io/rest.js/v20
 * https://docs.github.com/en/actions/using-workflows/events-that-trigger-workflows
 * https://docs.github.com/en/webhooks/webhook-events-and-payloads
 */

const core = require('@actions/core');
const github = require('@actions/github');
const payload = github.context.payload;

/**
 * Get the Body text for supported Events.
 * @returns String. Body text.
 */
function getGithubEventsBody() {
    const eventName = github.context.eventName;
    let body = '';
    switch (eventName) {
        case 'pull_request':
            body = getPullRequestBody();
            break;
        case 'issue_comment':
            body = getCommentBody();
            break;
        case 'issues':
            body = getIssueBody();
            break;
        default:
            unsupportedEvent(eventName);
    }
    return `${body}`;
}

function getPullRequestBody() {
    const body = payload.pull_request?.body;
    checkValue(body, 'body', 'pull request');
    return body;
}

function getCommentBody() {
    const body = payload.comment?.body;
    checkValue(body, 'body', 'comment');
    return body;
}

/** used for issues and pull requests */
function getIssueBody() {
    const body = payload.issue?.body;
    checkValue(body, 'body', 'issue');
    return body;
}

/**
 * Get the URL for supported Events.
 * @returns String. Url.
 */
function getEventUrl() {
    const eventName = github.context.eventName;
    let url = '';
    switch (eventName) {
        case 'pull_request':
            url = getPullRequestUrl();
            break;
        case 'issue_comment':
            url = getCommentUrl();
            break;
        case 'issues':
            url = getIssueUrl();
            break;
        default:
            unsupportedEvent(eventName);
    }
    return `${url}`;
}

function getPullRequestUrl() {
    const url = payload.pull_request?.html_url;
    checkValue(url, 'URL', 'pull request');
    return url;
}

function getCommentUrl() {
    const url = payload.comment?.html_url
    checkValue(url, 'URL', 'comment');
    return url;
}

function getIssueUrl() {
    const url = payload.issue?.html_url;
    checkValue(url, 'URL', 'issue');
    return url;
}

/**
 * Get href text for event.
 * @returns String. Link text to use in a href.
 */
function getEventHrefText()  {
    const eventName = github.context.eventName;
    let hrefText = '';
    switch (eventName) {
        case 'pull_request':
            hrefText = getPullRequestHrefText();
            break;
        case 'issue_comment':
            hrefText = getCommentHrefText();
            break;
        case 'issues':
            hrefText = getIssueHrefText();
            break;
        default:
            unsupportedEvent(eventName);
    }
    return `${hrefText}`;
}

function getPullRequestHrefText() {
    const number = payload.pull_request?.number;
    checkValue(number, 'number', 'pull request');
    return `Github Pull Request #${number}`;
}

function getCommentHrefText() {
    const id = payload.comment?.id;
    checkValue(id, 'id', 'comment');
    return `Github Comment ID #${id}`;
}

function getIssueHrefText() {
    const number = payload.issue?.number;
    checkValue(number, 'number', 'issue');
    return `Github Issue #${number}`;
}

function checkValue(value, checkValue, actionType) {
    console.log(`${actionType} ${checkValue}:\n${value}`);
    if (value === null || value === 'undefined') {
        core.error(`${actionType} is null or has a null ${checkValue} value. Specified Activity Type may not be supported`);
    }
}

function unsupportedEvent(eventName) {
    core.error(`${eventName} is not a supported Event Type`);
}

module.exports = { getGithubEventsBody, getEventUrl, getEventHrefText }