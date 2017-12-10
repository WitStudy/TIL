# find_each

DBから大量のレコードを取得する際、レコードを分割して取得します。

バッチ等、大量のデータを扱う際に、 `each` メソッドの代わりに使用します。

## `Model.all.each`

全レコードがメモリ上に展開されるため、
レコード数が多い場合、処理に時間がかかります。

## `Model.all.find_each`

レコードを分割して処理するため、
レコード数が多い場合でもメモリ消費量を抑えられます。

---

以下にメソッド実行時の処理の様子を記載します。

### 確認環境

- Ruby 2.4.1

- Rails 5.1.4

- `mysql> show columns from articles;`

| Field      | Type         | Null | Key | Default | Extra          |
|------------|--------------|------|-----|---------|----------------|
| id         | bigint(20)   | NO   | PRI | NULL    | auto_increment |
| title      | varchar(255) | NO   |     | NULL    |                |
| content    | varchar(255) | NO   |     | NULL    |                |
| author     | varchar(255) | NO   |     | NULL    |                |
| created_at | datetime     | NO   |     | NULL    |                |
| updated_at | datetime     | NO   |     | NULL    |                |

`mysql> select count(*) from articles;`

| count(*) |
|---------:|
|      100 |

### `find_each` のデフォルトの挙動

`Article.all.find_each {}` とした場合のSQLは、以下のとおりです。

`` SELECT  `articles`.* FROM `articles` ORDER BY `articles`.`id` ASC LIMIT 1000 ``

1回のSQLで最大1000件のレコードを取得します。

レコード数が1000件以上の場合、SQLの発行を複数回行います。

### SQL1回あたりの取得数を変更する

`batch_size` オプションを使用します。

`Article.all.find_each(batch_size: 500) {}`　とした場合のSQLは、以下のとおりです。

``SELECT  `articles`.* FROM `articles` ORDER BY `articles`.`id` ASC LIMIT 500``

### 取得順(order)の指定について

`find_each` では、orderの指定はできません。

[ソースコード参照](https://github.com/rails/rails/blob/2a7cf24cb7aab28f483a6772b608e2868a9030ba/activerecord/lib/active_record/relation/batches.rb#L41)

`Article.order(title: :asc).find_each {}` とした場合のSQLは、以下のとおりです。

`` SELECT  `articles`.* FROM `articles` ORDER BY `articles`.`id` ASC LIMIT 1000 ``

プライマリキーの昇順で取得されます。

### 取得数(limit)の指定について

`find_each` では、limitの指定はできません。と記載されています。

[ソースコード参照](https://github.com/rails/rails/blob/2a7cf24cb7aab28f483a6772b608e2868a9030ba/activerecord/lib/active_record/relation/batches.rb#L46)


しかし、 `Article.all.limit(5).find_each {}` とした場合のSQLは、以下のとおりです。

`` SELECT  `articles`.* FROM `articles` ORDER BY `articles`.`id` ASC LIMIT 5 ``

どうやらlimitは指定できる模様です。。。

### 処理の比較

全レコードでループを回し、10件ごとに累計レコード数を表示するサンプルコードにて、

`each` と `find_each` の処理の比較を行います。

　※ `find_each` では50件ずつレコードを取得することとします

#### Article.all.each

```ruby
Article.all.each.with_index(1) do |record, index|
  p index if index % 10 == 0
end
```

**結果**
```sql
  Article Load (1.6ms)  SELECT `articles`.* FROM `articles`
10
20
30
40
50
60
70
80
90
100
```

⇒100件のレコードを、1回で取得し、処理しています。

#### Article.find_each

```ruby
Article.all.find_each(batch_size: 50).with_index(1) do |record, index|
  p index if index % 10 == 0
end
```

**結果**
```sql
  Article Load (1.5ms)  SELECT  `articles`.* FROM `articles` ORDER BY `articles`.`id` ASC LIMIT 50
10
20
30
40
50
  Article Load (1.3ms)  SELECT  `articles`.* FROM `articles` WHERE (`articles`.`id` > 50) ORDER BY `articles`.`id` ASC LIMIT 50
60
70
80
90
100
  Article Load (0.6ms)  SELECT  `articles`.* FROM `articles` WHERE (`articles`.`id` > 100) ORDER BY `articles`.`id` ASC LIMIT 50
```

⇒100件のレコードを、50件ごとに分割して取得し、処理しています。
