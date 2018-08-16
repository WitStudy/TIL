# 特定条件によるconfirmメッセージの上書き
あまり意識していなかったが、Rails4以降confirmオプションは廃止され  
代わりにdata-confirmで記述するようになっている。

## dataオプションでconfirmを記述

confirmオプションを使った記述  
`` <%= f.submit '登録', confirm: '本当に登録してよろしいですか？', id: 'hoge' %> ``

↓

dataオプションを使った記述  
`` <%= f.submit '登録', data: { confirm: '本当に登録してよろしいですか？'}, id: 'hoge' %> ``

⇒ このdata-confirm属性を上書きすることでメッセージの変更が可能。

## 実装例
例） idがpiyoのチェックボックスがチェックされている場合にメッセージを変更する。

```
$ ->
    $('.hoge').on 'click', ->
        if $('#piyo:checked').val() == true
            $('.hoge').data('confirm', 'piyoが入力されています！本当に登録してよろしいですか？')
            return
```

↑のようなスクリプトで特定条件時の処理を付与
