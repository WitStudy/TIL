# kconvを利用した文字コード変換について

## 背景

入力された文字数のチェックを行う際、

kconvを用いてsjisに変換し、変換後の文字のバイトサイズをチェックしているシステムがありました。

その動作確認を行ったとき、半角カナを入力したときのバイトサイズが自分の想定と違ったため、メモしておきます。

## `String#tojis` した場合のバイトサイズ

```rb
require 'kconv'

p 'a'.tosjis.bytesize
# => 1

p 'A'.tosjis.bytesize
# => 1

p 'ａ'.tosjis.bytesize
# => 2

p 'Ａ'.tosjis.bytesize
# => 2

p '1'.tosjis.bytesize
# => 1

p '１'.tosjis.bytesize
# => 2

p 'あ'.tosjis.bytesize
# => 2

p 'ア'.tosjis.bytesize
# => 2

p 'ｱ'.tosjis.bytesize
# => 2

p '阿'.tosjis.bytesize
# => 2
```

半角カナのバイトサイズは1を想定していましたが、2が返ってきました。

## `String.encode(Encoding::SHIFT_JIS)` した場合

```rb
p 'ｱ'.encode(Encoding::SHIFT_JIS).bytesize
# => 1
```

こちらは想定したとおり、1が返ってきました。

## `String#tosjis` と `String.encode(Encoding::SHIFT_JIS)` の違い

```rb
require 'kconv'

p 'ｱ'.tosjis.encoding
# => #<Encoding:Shift_JIS>

p 'ｱ'.encode(Encoding::SHIFT_JIS).encoding
# => #<Encoding:Shift_JIS>

p 'ｱ'.tosjis
# => "\x{8341}"

p 'ｱ'.encode(Encoding::SHIFT_JIS)
# => "\xB1"

p 'ｱ'.tosjis.encode(Encoding::UTF_8)
# => "ア"

p 'ｱ'.encode(Encoding::SHIFT_JIS).encode(Encoding::UTF_8)
# => "ｱ"
```

どうやら `String#tosjis` を行うと半角カナが全角カナに変換されてしまう模様。

[リファレンス](https://docs.ruby-lang.org/ja/latest/method/String/i/tosjis.html)にもしっかりと記載されていました。

## 感想

文字数によるチェックはよく目にしますが、バイト数によるチェックは初めてだったため、面白かったです。

また、文字コード周りはわかっていないことが多いと改めて思い知らされたため、

関連する処理を実装する際は気をつけなければと感じました。。。

