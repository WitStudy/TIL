# Slackへ投稿する関数を作成する

ここでは、以下については記載いたしません

- Google Apps Script のプロジェクト作成手順
- Slackのチーム作成手順

## Slack に Incoming WebHooks の設定を行う

1. `https://<workspace-name>.slack.com/apps/A0F7XDUAZ-incoming-webhooks` へアクセスする

1. `Add Configration` ボタンをクリックする

1. 投稿先のChannelを選択する

1. `Add Incoming WebHooks integration` ボタンをクリックする

1. `Customize Name` に投稿時の名前を入力する

1. `Customize Icon` に投稿時のアイコンを選択する

1. `Save Settings` ボタンをクリックする

1. `Webhook URL` のURLを控えておく

## Google Apps Script のプロパティを設定する

1. Google Apps Script のスクリプトエディタ画面を開く

1. [ファイル]-[プロジェクトのプロパティ] をクリックする

1. [スクリプトのプロパティ] タブを開く

1. `行を追加` をクリックする

1. `プロパティ` に `SLACK_INCOMING_URL` を入力する

1. `値` に `Slack に Incoming WebHooks の設定を行う` で控えたURLを入力する

1. `保存` をクリックする

## Google Apps Script に Slackへ投稿する関数を作成する

```js
var slack = {
  'incomingUrl': PropertiesService.getScriptProperties().getProperty('SLACK_INCOMING_URL')
};

function postMessage(message){
  var options = {
    'method'     : 'post',
    'contentType': 'application/json',
    'payload'    : JSON.stringify({ 'text': message })
  };

  UrlFetchApp.fetch(slack['incomingUrl'], options);
}
```

## 使用例

```js
function test() {
  postMessage("message");
}
```

