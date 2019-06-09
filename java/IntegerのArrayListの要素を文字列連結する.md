# IntegerのArrayListの要素を文字連結する

`ArrayList<Integer>` に `String.join` 的な処理がしたい

## 環境

* Java 8

## 結論

以下のようにします。

```java
ArrayList<Integer> list = new ArrayList<Integer>(Arrays.asList(1, 2, 3));
String result = list.stream().map(String::valueOf).collect(Collectors.joining(" "));
System.out.println(result);
// => 1 2 3
```

## 試行

### `String[]` の場合、 `String.join` を使用する

Java 8 では、 `String.join` を使用することで簡単に連結が可能です。

```java
String result = String.join(" ", new String[] {"1", "2", "3"});
System.out.println(result);
// => 1 2 3
```

### `ArrayList<String>` でも `String.join` が使用可能

```java
String result = String.join(" ", new ArrayList<String>(Arrays.asList("1", "2", "3")));
System.out.println(result);
// => 1 2 3
```

### `ArrayList<Integer>` では `String.join` が使用できない

```java
ArrayList<Integer> list = new ArrayList<Integer>(Arrays.asList(1, 2, 3));
String result = String.join(" ", list);
// => error: no suitable method found for join(String,ArrayList<Integer>)
```

### `ArrayList<Integer>` から `String[]` を作成して `String.join` を使用すれば連結可能

```java
ArrayList<Integer> list = new ArrayList<Integer>(Arrays.asList(1, 2, 3));
String[] strArray = new String[list.size()];
for (int i = 0; i < list.size(); i++) {
    strArray[i] = String.valueOf(list.get(i));
}
System.out.println(String.join(" ", strArray));
// => 1 2 3
```

### Java 8 以降の場合

Java 7 以前ではおそらく上記の書き方が良いかと思いますが、

Java 8 からは `Stream` を使用して、もう少し分かりやすく書けるようです。

```java
ArrayList<Integer> list = new ArrayList<Integer>(Arrays.asList(1, 2, 3));
String result = list.stream().map(String::valueOf).collect(Collectors.joining(" "));
System.out.println(result);
// => 1 2 3
```
