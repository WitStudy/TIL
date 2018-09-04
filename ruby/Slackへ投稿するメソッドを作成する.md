# Slackへ投稿するメソッドを作成する

[GASからSlackへの投稿](https://github.com/WitStudy/TIL/blob/master/gas/Slackへ投稿する関数を作成する.md) はこれまで行ったことがありますが、

GAS以外の方法では行ったことがなかったため、

普段使用しているRubyで試してみました。

## 環境

- Ruby 2.5.1

## クラスとメソッドを作成する

```rb
class Slack
  require 'net/https'
  require 'json'

  INCOMING_URL = '<Incoming WebHooksのURL>'

  # Slackへメッセージを投稿します
  #
  # @param String message 投稿内容
  #
  # @return Net::HTTPOK レスポンス
  def self.post_message(message)
    # 通信先
    uri = URI.parse INCOMING_URL
    http = Net::HTTP.new uri.host, uri.port

    # HTTPS通信設定
    http.use_ssl = true
    http.verify_mode = OpenSSL::SSL::VERIFY_NONE

    # リクエスト内容
    request = Net::HTTP::Post.new uri.path
    request['Content-Type'] = 'application/json'
    request.body = { text: message }.to_json

    # リクエスト送信
    http.request(request)
  end
end
```

## 使用例

```rb
Slack.post_message 'message'
```

## 感想

POSTでのHTTPS通信さえできれば、簡単にできる印象です。

他の言語やツールでも試してみたくなりました。

