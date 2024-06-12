# asana-stalker
Checks for Asana links posted on Github. If found will try to post the url from Github to the Asana link if it is a task.

## Requirements
 - Need an Asana personal access token.
   - In the workflow file passed to the `asana-pat` field
   - Create a new Personal Access Token (PAT) via this [link](https://developers.asana.com/docs/personal-access-token)

## Supported Events
 - pull_request
 - issus
 - issue_comments
   - also will trigger for pull request comments

## Behavior
 - Any asana links will be treated as potential tasks.
 - Using the global ID (GID) for the potential task, obtained through parsing the url, will try to get the notes for the task.
   - If not a task will quietly end the process for that GID
 - If successful at obtaining the task's notes will look to see if the Github url is already present.
 - If not already present will copy the current task notes then place a new note at the top linking to the relevent pull request, issue, or comment.

## Example Workflow Files

<img width="700" alt="スクリーンショット 2024-06-12 12 11 25" src="https://github.com/zaburen/asana-stalker/assets/108658635/37752257-a615-4dba-9195-ed964e361bd4">

