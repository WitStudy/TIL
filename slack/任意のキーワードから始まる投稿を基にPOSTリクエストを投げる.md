# 任意のキーワードから始まる投稿を基にPOSTリクエストを投げる

## Outgoing WebHooks の設定を行う

1. `https://<workspace-name>.slack.com/apps/A0F7VRG6Q-outgoing-webhooks` へアクセスする

1. `Add Configuration` ボタンをクリックする

1. `Add Outgoing WebHooks integration` ボタンをクリックする

1. `Channel` に投稿内容の検知を行うチャンネルを選択する

    `Any` を選択すると、全チャンネルで投稿内容の検知を行う

1. `Trigger Word(s)` にキーワードを入力する

    `Channel` を選択している場合は省略可

    キーワードを複数設定する場合はカンマで区切る

1. `URL(s)` にリクエスト先のURLを入力する

    URLを複数設定する場合は改行で区切る

1. `Token` にリクエストトークンを入力する

1. `Descriptive Label` に設定の説明を入力する

1. `Customize Name` にレスポンスを返すときの名前を入力する

1. `Customize Icon` にレスポンスを返すときのアイコンを選択する

## リクエスト内容

Outgoing WebHooks を設定すると、

任意のキーワードから始まる投稿を基にPOSTリクエストを投げるようになります。

なお、リクエストの内容は以下のような形です。

```
{
  "parameter":{
    "channel_name":"<channel_name>",
    "user_id":"<post_user_id>",
    "user_name":"<post_user_name>",
    "trigger_word":"<trigger_word>",
    "service_id":"<outgoing_webhooks_id>",
    "team_domain":"<workspace_name>",
    "team_id":"<workspace_id>",
    "text":"<post_text>",
    "channel_id":"<channel_id>",
    "token":"<outgoing_webhooks_token>",
    "timestamp":"<timestamp>"
  },
  "contextPath":"",
  "contentLength":<content_length>,
  "queryString":"",
  "parameters":{
    "channel_name":["<channel_name>"],
    "user_id":["<post_user_id>"],
    "user_name":["<post_user_name>"],
    "trigger_word":["<trigger_word>"],
    "service_id":["<outgoing_webhooks_id>"],
    "team_domain":["<workspace_name>"],
    "team_id":["<workspace_id>"],
    "text":["<post_text>"],
    "channel_id":["<channel_id>"],
    "token":["<outgoing_webhooks_token>"],
    "timestamp":["<timestamp>"]
  },
  "postData":{
    "type":"application/x-www-form-urlencoded",
    "length":<content_length>,
    "contents":"token=<outgoing_webhooks_token>&team_id=<workspace_id>&team_domain=<workspace_name>&service_id=<outgoing_webhooks_id>&channel_id=<channel_id>&channel_name=<channel_name>&timestamp=<timestamp>&user_id=<post_user_id>&user_name=<post_user_name>&text=<post_text>&trigger_word=<trigger_word>",
    "name":"postData"
  }
}
```

