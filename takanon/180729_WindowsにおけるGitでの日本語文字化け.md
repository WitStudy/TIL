# 概要
自宅PCでコミットをする際、コミットメッセージの日本語が文字化け  
なぜだろうと調べたらGit for Windowsでは標準で対応していない模様

## 現象

```
git status

PS > git status
On branch master
Your branch is up to date with 'origin/master'.

Untracked files:
  (use "git add <file>..." to include in what will be committed)

        "\343\201\253\343\201\212\343\201\221\343\202～"
```

## 原因
Git for WindowsではShift-JISがUTF-8として解釈されている様子

## 対処
- 環境変数に言語を指定する  
`` > Set-Item env:LANG -Value ja_JP.UTF-8 ``

  
普段PowerShell扱うことが少ないのでメモ  
※そもそもPowerShellでなくGitBashを使えばOKですね...

## 参考
- [https://teratail.com/questions/94616](https://teratail.com/questions/94616 "日本語文字化けの解決方法 その2")