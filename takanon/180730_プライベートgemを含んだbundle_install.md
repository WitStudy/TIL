# プライベートgemを含んだbundle install

## 概要

rubygemsに登録されていないgemを他のgemと混合して利用する場合  
Gemfileでの管理が厄介...というケースと稀に遭遇するため備忘録とする

## 問題点

プライベートgemへの依存を含むGemfileでbundle installを行った場合
当然、該当gemが見つからず失敗する。

```
$ bundle install
Fetching gem metadata from https://rubygems.org/..........
Fetching gem metadata from https://rubygems.org/.
Resolving dependencies...
Bundler could not find compatible versions for gem "rhl7":
  In Gemfile:
    pine was resolved to 1.0.1, which depends on
      rhl7 (>= 2.0.8)

Could not find gem 'rhl7 (>= 2.0.8)', which is required by gem 'pine', in any of
the sources.
```

## 対応

1. Gemfileにプライベートgemの位置を指定

```
# pathに追加するgemのパスを追加
# 必ずバージョンを指定すること
gem 'hogehoge', '=1.0.1', path: 'files'
```

2. bundle install  
` $ bundle install `

※バージョン指定が無い場合...
```
$ bundle install
Fetching gem metadata from https://rubygems.org/..........
Fetching gem metadata from https://rubygems.org/.
Could not find gem 'hogehoge' in source at `files`.
The source does not contain any versions of 'hogehoge'
```

3. bundle pacakge  
` $ bundle pacakge `
vendor/cacheに.gemファイルがキャッシュされる

4. vendor/cacheに1.で追加したプライベートgemを手動で配置  
ここらへんもっとかっこよくできそうな気がする

5. 1.で追記したプライベートなgemの記述を削除  
` gem 'hogehoge', '=1.0.1', path: 'files' `

6. 改めてbundle install  
` $ bundle install `

これでローカルでインストールしたgemも入っているはず。
```
$  bundle exec gem list

*** LOCAL GEMS ***
~
hogehoge (1.0.1)
~

```