# PDF ファイルを連結する

## 環境

* CentOS 7.6

## 必要なパッケージのインストール

`sudo yum install -y poppler-utils`

## コマンド

`pdfunite <inputfiles> <outputfile>`

ex: `pdfunite file1 file2 file3 output.pdf`

=> `file1`, `file2`, `file3` の順番で連結して `output.pdf` を作成する

