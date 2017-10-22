# bundle exec について

## 結論

![What is bundle exec ?](https://github.com/WitStudy/TIL/blob/resources/ruby/bundle_execについて.png)

## 環境

### ソフトウェア

|ソフトウェア|バージョン|
|---|---|
|OS|CentOS 6.9|
|Ruby|2.4.1|

### gem list

```
*** LOCAL GEMS ***

bigdecimal (default: 1.3.0)
bundler (1.15.4)
did_you_mean (1.1.0)
io-console (default: 0.4.6)
json (default: 2.0.2)
minitest (5.10.1)
net-telnet (0.1.1)
openssl (default: 2.0.3)
power_assert (0.4.1)
psych (default: 2.2.2)
rake (12.0.0)
rdoc (default: 5.0.0)
test-unit (3.2.3)
xmlrpc (0.2.1)
```

## 準備

BundlerでGemをインストールします。

1. Bundlerの初期化を行います

    `bundle init`

1. Gemfileを修正します

    ```diff
      # frozen_string_literal: true
      source "https://rubygems.org"

      git_source(:github) {|repo_name| "https://github.com/#{repo_name}" }

      # gem "rails"
    + gem 'rake', '12.1.0'
    ```

1. Gemをインストールします

    `bundle install --path=./gems`

1. インストールしたGemの確認

    `bundle list`

    ```
    Gems included by the bundle:
    * bundler (1.15.4)
    * rake (12.1.0)
    ```

## 確認

### rake --version

  ⇒ `rake, version 12.0.0`

### bundle exec rake --version

  ⇒ `rake, version 12.1.0`
