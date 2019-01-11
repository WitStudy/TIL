# gemのインストール先ディレクトリを開く

## 一言で結論

[Bundler](https://github.com/bundler/bundler) で管理しているgemのディレクトリを開きたいときは、以下コマンドを利用すると便利です。

```bash
$ cd `bundle show <gem_name>`
```

## 背景

Rubyを使用するときは、だいたいBundlerを使用してgemを管理しているのですが、

gemの中身を見てみたいとき、該当のディレクトリを開くのは意外と大変です。。。

## 例えば

```bash
$ cd /tmp
$ mkdir open_gem_directory
$ cd open_gem_directory/
$ bundle init
$ echo "gem 'pry'" >> Gemfile
$ bundle install --path=vendor/bundle
```

上記手順でpryをインストールした場合、インストール先のディレクトリは以下となります。

深いですね。。。

`/tmp/open_gem_directory/vendor/bundle/ruby/2.6.0/gems/pry-0.12.2`

## bundle show コマンド

bundle show コマンドは、指定したgemのディレクトリを表示します。

```bash
$ bundle show pry
# => /tmp/open_gem_directory/vendor/bundle/ruby/2.6.0/gems/pry-0.12.2
```

このコマンドとcdコマンドを組み合わせると簡単にgemのディレクトリを開けます。

```bash
$ pwd
# => /tmp/open_gem_directory

$ cd `bundle show pry`

$ pwd
# => /tmp/open_gem_directory/vendor/bundle/ruby/2.6.0/gems/pry-0.12.2
```

## 余談

Ruby 2.6 にて、 Bundler が Default gems として標準添付されましたので、

`$ gem install bundler` を実行しなくてもbundleコマンドが使えるようになりました。
