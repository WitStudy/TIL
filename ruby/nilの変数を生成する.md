# nilの変数を生成する

業務などでは使えないトリビア的な知識ですが、

nilの変数を生成する面白い書き方を見つけたので記載しておきます。

（コードゴルフでは使えるかもしれません。。。）

## pメソッドを使用した書き方

```rb
variable = p
=> nil
```

### どうしてnilになる？

[p](https://docs.ruby-lang.org/ja/latest/method/Kernel/m/p.html) メソッドは、引数を人間に読みやすい形で標準出力に出力し、引数を呼び出し元に返します。

引数をつけずに使用した場合、出力を行わずにnilを返します。

確認

```rb
p 1
=> 1

p 'string'
=> "string"

p 1, 'two', 3.0
=> [1, "two", 3.0]

p
=> nil
```

### 今回の趣旨とはズレますが・・・

```rb
variable = p 'string'
```

のような書き方をすると、標準出力に出力しながら代入もできますね。

（これはデバッグで使えるかもしれません）

## 自己代入的な方法

```rb
variable = variable
=> nil
```

### どうしてnilになる？（想像）

内部的な動きが分かっていないので想像になってしまうのですが、

変数の代入を行う可能性のある行を実行する際、

該当の変数が定義されていない場合はnilで初期化しているのではないかと思います。

例として、以下のような場合ですね。

```rb
variable = true if false # <= variable = true は実行されないため、variableは未定義？
p variable               # <= variable は未定義ではなくnil
=> nil
```

これを基にして考えると、 `variable = variable` は以下のような順序で処理されているのではないかと思います。

1. 変数 `variable` がnilで定義される

1. 変数 `variable` に `variable` が代入される

想像なので、間違っている可能性も大いにあります・・・

### こんな書き方もできます

```rb
a = b = c = a
=> nil
```

もはや意味がわかりませんね。。。

