# excelファイルを作成する

## 背景

RailsでExcelのファイルを作成する方法は以前まとめましたが、

素のRubyではどうすれば良いんだろうと思ったので、試してみました。

（結果的に、[axlsx](https://github.com/randym/axlsx) のREADMEをやっただけになりましたが。。。）

## 環境

- CentOS 6.8
- Ruby 2.5.1
- Bundler 1.16.2
- axlsx 2.0.1

## 手順

1. `$ mkdir axlsx_sample`

1. `& cd axlsx_sample`

1. `$ bundle init`

1. `$ vim Gemfile`

    ```diff
    +  gem 'axlsx', '2.0.1'
    ```

1. `$ bundle install --path=./gems`

1. `$ vim axlsx_sample.rb`

    ```rb
    require 'axlsx'

    Axlsx::Package.new do |p|
      p.workbook.add_worksheet(name: 'Pie Chart') do |sheet|
        sheet.add_row ['Simple Pie Chart']
        %w[first second third].each { |label| sheet.add_row [label, rand(24) + 1] }
        sheet.add_chart(Axlsx::Pie3DChart, start_at: [0, 5], end_at: [10, 20], title: 'example 3: Pie Chart') do |chart|
          chart.add_series data: sheet['B2:B4'], labels: sheet['A2:A4'], colors: %w[FF0000 00FF00 0000FF]
        end
      end
      p.serialize 'sample.xlsx'
    end
    ```

1. `$ bundle exec ruby axlsx_sample.rb`

## 感想

かなり手軽に使えて良い感じですね。

