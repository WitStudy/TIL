# githubに空ブランチを作成する方法

## 環境

|ソフトウェア|バージョン|
|---|---|
|OS|CentOS 6.9|
|git|2.14.1|

## 手順

1. ブランチを作成します
    `$ git checkout --orphan new_branch_name`
    ※ `--orphan` を使用すると、元のブランチのログが引き継がれません
    <br>

1. 元のブランチから引き継いだファイルがステージングされているため、
    取り消します
    `$ git rm --cached -r .`
    <br>

1. 元のブランチから引き継いだファイルを削除します
    `$ rm -r *`
    <br>

1. 空コミットします
    `$ git commit --allow-empty -m 'first commit'`
    <br>

1. githubにPushします
    `$ git push -u origin new_branch_name`

