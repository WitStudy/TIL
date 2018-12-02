# Syntax of Bash

Bashに手を出したもののシンタックスが独特すぎて

何をするにも困る状況だったため、基本的なところだけメモしておきます。

## 変数

### 宣言

```bash
variable=value
```

イコールの前後にスペースを挟むとSyntax Errorとなります

### 参照

```bash
variable=value

echo $variable
# => value

echo variable
# => variable
```

宣言時には`$`は不要ですが、参照時は`$`が必要です

## 配列

### 宣言

```bash
array=()
array2=(1 2 3)
```

### 追加

```bash
array=()
array+=(1)
```

### 参照

```bash
array=(1 2 3)
echo ${array[1]}
# => 2
```

`{}`で囲わないと要素を取得できません

## 連想配列

```bash
declare -A hash
hash[key]=value

echo ${hash[key]}
# => value
```

## 四則演算

```bash
echo $(( 1 + 1 ))
# => 2

echo 1 + 1
# => 1 + 1
```

計算する際は`$(())`で囲います

## 小数計算

```bash
echo `bc <<< "1 + 0.1"`
# => 1.1
```

`$(())`を用いた方法ではSyntax Errorとなります

## 分岐

### 構文

```bash
if [ cond1 ]; then
  echo "TRUE"
elif [ cond2 ]; then
  echo "ELIF"
else
  echo "ELSE"
fi
```

`if` の後、 `[` の前後、 `]` の前にはスペースが必要です。

### 条件式

|exmple                |description           |
|----------------------|----------------------|
|"STRING1" = "STRING2" |文字列が等しい        |
|"STRING1" != "STRING2"|文字列が等しくない    |
|int1 -eq int2         |int1とint2が等しい    |
|int1 -ne int2         |int1とint2が等しくない|
|int1 -lt int2         |int1がint2未満である  |
|int1 -le int2         |int1がint2以下である  |
|int1 -gt int2         |int1がint2超である    |
|int1 -ge int2         |int1がint2以上である  |

