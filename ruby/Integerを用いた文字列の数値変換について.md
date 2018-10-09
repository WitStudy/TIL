# Integerを用いた文字列の数値変換について

## 背景

「001」や「A01」など、3桁の番号を数値に置き換える必要があり、

`Integer()` で変換したら、一部の文字列の場合に想定と違う動きをする。

・・・という話を後輩から教えてもらったため、メモ。

## なにが起こったか

「010」「050」など、「0」で始まる数値が上手く変換できないことがある。

```rb
p Integer('001')
# => 1

p Integer('010')
# => 8

p Integer('099')
# => `Integer': invalid value for Integer(): "099" (ArgumentError)
```

## なぜこうなる？

0から始まる数値文字列が8進数として認識されているため

## 2進数や16進数の場合は？

同様に `Integer()` では上手く変換できません。

```rb
# 2進数

p Integer('0b1')
# => 1

p Integer('0b2')
# => `Integer': invalid value for Integer(): "0b2" (ArgumentError)

# 16進数

p Integer('0x9')
# => 9

p Integer('0xa')
# => 10

p Integer('0xx')
# => `Integer': invalid value for Integer(): "0xx" (ArgumentError)
```

## 感想

文字列を数値に変換する場合、

自分なら大して考えずに `String#match?` と `String#to_i` を使いそうなので、

`Integer()` を使う発想もあるんだな、と勉強になりました。

