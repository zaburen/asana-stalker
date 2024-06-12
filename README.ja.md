# Asana ストーカー
GitHub に投稿された Asana リンクをチェックします。見つかった場合、GitHub の URL を Asanaのタスクのノートに投稿しようとします（もしタスクであれば）。

## 必要条件
 - Asana のパーソナルアクセス トークンが必要です。
 - asana-pat フィールドに渡されるワークフロー ファイルが必要です。
   - この[リンク](https://developers.asana.com/docs/personal-access-token)から新しいパーソナルアクセス トークン（PAT）を作成してください。

## サポートされるイベント
 - pull_request
 - issue
 - issue_comments
   - また、プルリクエストコメントに対してもトリガーされます。

## 動作
 - Asana リンクはすべてタスクとして扱われます。
 - URLを解析して取得したタスクのグローバル ID（GID）を使用して、タスクのノートを取得しようとします。
   - タスクでない場合、その GID の処理を静かに終了します。
 - タスクのノートを取得できた場合、GitHub の URL が既に存在するかどうかをチェックする。
 - 存在しない場合、現在のタスクのノートをコピーし、新しいノートを上部に配置して関連する`pull_request`、`issue`、または`comment`へのリンクを貼り付けます。

## 例のワークフローファイル

<img width="700" alt="スクリーンショット 2024-06-12 12 11 25" src="https://github.com/zaburen/asana-stalker/assets/108658635/37752257-a615-4dba-9195-ed964e361bd4">
