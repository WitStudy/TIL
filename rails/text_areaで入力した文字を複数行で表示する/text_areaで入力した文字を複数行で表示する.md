# text_areaで入力した文字を複数行で表示する

## 環境

|対象  |バージョン|
|------|----------|
|CentOS|6.9       |
|MySQL |5.7.22    |
|Ruby  |2.6.2     |
|Rails |5.2.2.1   |

## 手順

### Railsアプリケーションを生成

1. `mkdir sample_application`

1. `cd sample_application`

1. `echo 2.6.2 > .ruby-version`

1. `bundle init`

1. `vim Gemfile`

    ```diff
    - # gem "rails"
    + gem "rails", "5.2.3"
    ```

1. `bundle install --path=./vendor/bundle`

1. `bundle exec rails new . -d mysql --skip-bundle --skip-test --skip-action-mailer --skip-active-storage --skip-action-cable --skip-coffee`

1. `vim Gemfile`

    ```diff
      source 'https://rubygems.org'
      git_source(:github) { |repo| "https://github.com/#{repo}.git" }

      ruby '2.6.2'

      # Bundle edge Rails instead: gem 'rails', github: 'rails/rails'
    - gem 'rails', '~> 5.2.3'
    + gem 'rails', '5.2.3'
      # Use mysql as the database for Active Record
    - gem 'mysql2', '>= 0.4.4', '< 0.6.0'
    + gem 'mysql2', '0.5.2'
      # Use Puma as the app server
    - gem 'puma', '~> 3.11'
    + gem 'puma', '3.12.1'
      # Use SCSS for stylesheets
    - gem 'sass-rails', '~> 5.0'
    + gem 'sass-rails', '5.0.7'
      # Use Uglifier as compressor for JavaScript assets
    - gem 'uglifier', '>= 1.3.0'
    + gem 'uglifier', '4.1.20'
      # See https://github.com/rails/execjs#readme for more supported runtimes
      # gem 'mini_racer', platforms: :ruby

      # Turbolinks makes navigating your web application faster. Read more: https://github.com/turbolinks/turbolinks
    - gem 'turbolinks', '~> 5'
    + gem 'turbolinks', '5.2.0'
      # Build JSON APIs with ease. Read more: https://github.com/rails/jbuilder
    - gem 'jbuilder', '~> 2.5'
    + gem 'jbuilder', '2.8.0'
      # Use ActiveModel has_secure_password
      # gem 'bcrypt', '~> 3.1.7'

      # Use Capistrano for deployment
      # gem 'capistrano-rails', group: :development

      # Reduces boot times through caching; required in config/boot.rb
    - gem 'bootsnap', '>= 1.1.0', require: false
    + gem 'bootsnap', '1.4.3', require: false

      group :development, :test do
        # Call 'byebug' anywhere in the code to stop execution and get a debugger console
    -   gem 'byebug', platforms: [:mri, :mingw, :x64_mingw]
    +   gem 'byebug', '11.0.1', platforms: [:mri, :mingw, :x64_mingw]
      end

      group :development do
        # Access an interactive console on exception pages or by calling 'console' anywhere in the code.
    -   gem 'web-console', '>= 3.3.0'
    +   gem 'web-console', '3.7.0'
    -   gem 'listen', '>= 3.0.5', '< 3.2'
    +   gem 'listen', '3.1.5'
        # Spring speeds up development by keeping your application running in the background. Read more: https://github.com/rails/spring
    -   gem 'spring'
    +   gem 'spring', '2.0.2'
    -   gem 'spring-watcher-listen', '~> 2.0.0'
    +   gem 'spring-watcher-listen', '2.0.1'
      end


      # Windows does not include zoneinfo files, so bundle the tzinfo-data gem
    - gem 'tzinfo-data', platforms: [:mingw, :mswin, :x64_mingw, :jruby]
    + gem 'tzinfo-data', '1.2019.1', platforms: [:mingw, :mswin, :x64_mingw, :jruby]
    ```

1. `bundle`

1. `vim .gitignore`

    ```diff
    +
    + # Ignore gem files.
    + /vendor/bundle
    ```

1. `cp -p config/database.yml config/database.yml.example`

1. `vim .gitignore`

    ```diff
    +
    + # Ignore database setting.
    + /config/database.yml
    ```

1. `vim config/database.yml`

    ```diff
      default: &default
        adapter: mysql2
        encoding: utf8
        pool: <%= ENV.fetch("RAILS_MAX_THREADS") { 5 } %>
    -   username: root
    +   username: <mysql user>
    -   password:
    +   password: <mysql password>
        socket: /var/lib/mysql/mysql.sock
    ```

1. `bundle exec rails db:create`

### モデルをScaffoldする

1. `bundle exec rails g scaffold Sample text:string`

1. `bundle exec rails db:migrate`

### テキスト入力欄をtext_areaに変更する

1. `vim app/views/samples/_form.html.erb`

    ```diff
      <div class="field">
        <%= form.label :text %>
    -   <%= form.text_field :text %>
    +   <%= form.text_area :text %>
      </div>
    ```

### 改行を含む入力内容の表示を確認する

1. 画面からの登録内容

    ```
    1行目
    2行目
    3行目

    5行目
    ```

1. `vim app/views/samples/show.html.erb`

    ```erb
    <p>
      <strong>Text:</strong>
      <%= @sample.text %>
    </p>
    ```

    上記ソースコードから生成されるHTMLソース

    ```
    <p>
      <strong>Text:</strong>
      1行目
    2行目
    3行目

    5行目
    </p>
    ```

    画面上の見た目

    ```
    Text: 1行目 2行目 3行目 5行目
    ```

### simple_formatを使用して表示する

1. `vim app/views/samples/show.html.erb`

    ```diff
      <p>
        <strong>Text:</strong>
    -   <%= @sample.text %>
    +   <%= simple_format @sample.text %>
      </p>
    ```

    上記ソースコードから生成されるHTMLソース

    ```
    <p>
      <strong>Text:</strong>
      <p>1行目
    <br />2行目
    <br />3行目</p>

    <p>5行目</p>
    </p>
    ```

    画面上の見た目

    ```
    Text:
    1行目
    2行目
    3行目

    5行目
    ```

