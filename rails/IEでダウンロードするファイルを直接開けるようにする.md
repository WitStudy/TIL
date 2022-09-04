# IEでダウンロードするファイルを直接開けるようにする

Rails 5.2 以降、セキュアなX-Download-OptionsおよびX-Permitted-Cross-Domain-Policiesを
デフォルトのヘッダーセットに追加されるようになりました。

IEを使用している場合、上記の影響でファイルをダウンロードする際に
「開く」のボタンが表示されなくなり、
ファイルを開くためにはローカルへの保存が必須となります。

* https://railsguides.jp/5_2_release_notes.html#action-pack-主な変更点
* https://blogs.msdn.microsoft.com/ie/2008/07/02/ie8-security-part-v-comprehensive-protection/

とは言え、「開く」が必要となる場合もありますので、対応手順をメモしておきます。

## 環境

|対象  |バージョン|
|------|----------|
|CentOS|6.9       |
|MySQL |5.7.22    |
|Ruby  |2.6.2     |
|IE    |11        |

## 結論

`config/application` に1行追加する

```diff
  module SampleApplication520
    class Application < Rails::Application
      # Initialize configuration defaults for originally generated Rails version.
      config.load_defaults 5.2

      # Settings in config/environments/* take precedence over those specified here.
      # Application configuration can go into files in config/initializers
      # -- all .rb files in that directory are automatically loaded after loading
      # the framework and any gems in your application.

      # Don't generate system test files.
      config.generators.system_tests = nil
+
+     config.action_dispatch.default_headers['X-Download-Options'] = nil
    end
  end
```

## 手順

### Rails 5.1.7

1. `mkdir sample_application_5_1_7`

1. `cd sample_application_5_1_7`

1. `echo 2.6.2 > .ruby-version`

1. `bundle init`

1. `echo "gem 'rails', '5.1.7'" >> Gemfile`

1. `bundle install --path=./vendor/bundle`

1. `bundle exec rails new . -d mysql --skip-yarn --skip-git --skip-action-mailer --skip-action-cable --skip-coffee --skip-test --skip-bundle --force`

1. `bundle update`

1. `bundle clean`

1. `vim Gemfile`

    ```diff
      source 'https://rubygems.org'

      git_source(:github) do |repo_name|
        repo_name = "#{repo_name}/#{repo_name}" unless repo_name.include?("/")
        "https://github.com/#{repo_name}.git"
      end


      # Bundle edge Rails instead: gem 'rails', github: 'rails/rails'
    - gem 'rails', '~> 5.1.7'
    + gem 'rails', '5.1.7'
      # Use mysql as the database for Active Record
    - gem 'mysql2', '>= 0.3.18', '< 0.6.0'
    + gem 'mysql2', '0.5.2'
      # Use Puma as the app server
    - gem 'puma', '~> 3.7'
    + gem 'puma', '3.12.1'
      # Use SCSS for stylesheets
    - gem 'sass-rails', '~> 5.0'
    + gem 'sass-rails', '5.0.7'
      # Use Uglifier as compressor for JavaScript assets
    - gem 'uglifier', '>= 1.3.0'
    + gem 'uglifier', '4.2.0'
      # See https://github.com/rails/execjs#readme for more supported runtimes
      # gem 'therubyracer', platforms: :ruby

      # Turbolinks makes navigating your web application faster. Read more: https://github.com/turbolinks/turbolinks
    - gem 'turbolinks', '~> 5'
    + gem 'turbolinks', '5.2.1'
      # Build JSON APIs with ease. Read more: https://github.com/rails/jbuilder
    - gem 'jbuilder', '~> 2.5'
    + gem 'jbuilder', '2.9.1'
      # Use ActiveModel has_secure_password
      # gem 'bcrypt', '~> 3.1.7'

      # Use Capistrano for deployment
      # gem 'capistrano-rails', group: :development

      group :development, :test do
        # Call 'byebug' anywhere in the code to stop execution and get a debugger console
    -   gem 'byebug', platforms: [:mri, :mingw, :x64_mingw]
    +   gem 'byebug', '11.0.1', platforms: [:mri, :mingw, :x64_mingw]
      end

      group :development do
        # Access an IRB console on exception pages or by using <%= console %> anywhere in the code.
    -   gem 'web-console', '>= 3.3.0'
    +   gem 'web-console', '3.7.0'
    -   gem 'listen', '>= 3.0.5', '< 3.2'
    +   gem 'listen', '3.1.5'
        # Spring speeds up development by keeping your application running in the background. Read more: https://github.com/rails/spring
    -   gem 'spring'
    +   gem 'spring', '2.1.0'
    -   gem 'spring-watcher-listen', '~> 2.0.0'
    +   gem 'spring-watcher-listen', '2.0.1'
      end

      # Windows does not include zoneinfo files, so bundle the tzinfo-data gem
      gem 'tzinfo-data', platforms: [:mingw, :mswin, :x64_mingw, :jruby]
    ```

1. `bundle exec rails g controller sample index`

1. `echo "sample file" > public/sample_file.txt`

1. `vim app/conrollers/sample_controller.rb`

    ```diff
      class SampleController < ApplicationController
        def index
        end
    +
    +   def download
    +     send_file Rails.root.join('public', 'sample_file.txt'), filename: 'sample_file.txt'
    +   end
      end
    ```

1. `vim config/routes.rb`

    ```diff
      Rails.application.routes.draw do
    +   root 'sample#index'
    +
        get 'sample/index'
    +   get 'sample/download'

        # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
      end
    ```

1. `vim app/views/sample/index.html.erb`

    ```diff
      <h1>Sample#index</h1>
      <p>Find me in app/views/sample/index.html.erb</p>

    + <%= link_to 'download file', sample_download_path, data: { turbolinks: false } %>
    ```

1. アプリケーションを起動し、IEでファイルをダウンロードすると、「開く」が可能

    ![rails5.1.7](https://github.com/WitStudy/TIL/blob/resources/rails/IEでダウンロードするファイルを直接開けるようにする/rails5_1_7.png)

### Rails 5.2.0

1. `mkdir sample_application_5_2_0`

1. `cd sample_application_5_2_0`

1. `echo 2.6.2 > .ruby-version`

1. `bundle init`

1. `echo "gem 'rails', '5.2.0'" >> Gemfile`

1. `bundle install --path=./vendor/bundle`

1. `bundle exec rails new . -d mysql --skip-yarn --skip-git --skip-action-mailer --skip-active-storage --skip-action-cable --skip-coffee --skip-test --skip-bundle --force`

1. `vim Gemfile`

    ```diff
      source 'https://rubygems.org'
      git_source(:github) { |repo| "https://github.com/#{repo}.git" }

      ruby '2.6.2'

      # Bundle edge Rails instead: gem 'rails', github: 'rails/rails'
    - gem 'rails', '~> 5.2.0'
    + gem 'rails', '5.2.0'
      # Use mysql as the database for Active Record
    - gem 'mysql2', '>= 0.4.4', '< 0.6.0'
    + gem 'mysql2', '0.5.2'
      # Use Puma as the app server
    - gem 'puma', '~> 3.11'
    + gem 'puma', '3.12.1'
      # Use SCSS for stylesheets
    - gem 'sass-rails', '~> 5.0'
    + gem 'sass-rails', '5.1.0'
      # Use Uglifier as compressor for JavaScript assets
    - gem 'uglifier', '>= 1.3.0'
    + gem 'uglifier', '4.2.0'
      # See https://github.com/rails/execjs#readme for more supported runtimes
      # gem 'mini_racer', platforms: :ruby

      # Turbolinks makes navigating your web application faster. Read more: https://github.com/turbolinks/turbolinks
    - gem 'turbolinks', '~> 5'
    + gem 'turbolinks', '5.2.1'
      # Build JSON APIs with ease. Read more: https://github.com/rails/jbuilder
    - gem 'jbuilder', '~> 2.5'
    + gem 'jbuilder', '2.9.1'
      # Use ActiveModel has_secure_password
      # gem 'bcrypt', '~> 3.1.7'

      # Use Capistrano for deployment
      # gem 'capistrano-rails', group: :development

      # Reduces boot times through caching; required in config/boot.rb
    - gem 'bootsnap', '>= 1.1.0', require: false
    + gem 'bootsnap', '1.4.5', require: false

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
    +   gem 'spring', '2.1.0'
    -   gem 'spring-watcher-listen', '~> 2.0.0'
    +   gem 'spring-watcher-listen', '2.0.1'
      end


      # Windows does not include zoneinfo files, so bundle the tzinfo-data gem
      gem 'tzinfo-data', platforms: [:mingw, :mswin, :x64_mingw, :jruby]
    ```

1. `bundle update`

1. `bundle clean`

1. `vim config/database.yml`

    ```diff
      default: &default
        adapter: mysql2
        encoding: utf8
        pool: <%= ENV.fetch("RAILS_MAX_THREADS") { 5 } %>
        username: root
    -   password:
    +   password: <mysql_password>
        socket: /var/lib/mysql/mysql.sock
    ```

1. `bundle exec rails db:create`

1. `bundle exec rails g controller sample index`

1. `echo "sample file" > public/sample_file.txt`

1. `vim app/controllers/sample_controller.rb`

    ```diff
      class SampleController < ApplicationController
        def index
        end
    +
    +   def download
    +     send_file Rails.root.join('public', 'sample_file.txt'), filename: 'sample_file.txt'
    +   end
      end
    ```

1. `vim config/routes.rb`

    ```diff
      Rails.application.routes.draw do
    +   root 'sample#index'
    +
        get 'sample/index'
    +   get 'sample/download'
        # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
      end
    ```

1. `vim app/views/sample/index.html.erb`

    ```diff
      <h1>Sample#index</h1>
      <p>Find me in app/views/sample/index.html.erb</p>
    +
    + <%= link_to 'download file', sample_download_path, data: { turbolinks: false } %>
    ```

1. この時点でアプリケーションを起動し、IEでファイルをダウンロードすると、「開く」が不可

    ![rails5.2.0 before](https://github.com/WitStudy/TIL/blob/resources/rails/IEでダウンロードするファイルを直接開けるようにする/rails5_2_0_before.png)

1. `vim config/application`

    ```diff
      module SampleApplication520
        class Application < Rails::Application
          # Initialize configuration defaults for originally generated Rails version.
          config.load_defaults 5.2

          # Settings in config/environments/* take precedence over those specified here.
          # Application configuration can go into files in config/initializers
          # -- all .rb files in that directory are automatically loaded after loading
          # the framework and any gems in your application.

          # Don't generate system test files.
          config.generators.system_tests = nil
    +
    +     config.action_dispatch.default_headers['X-Download-Options'] = nil
        end
      end
    ```

1. アプリケーションを起動し、IEでファイルをダウンロードすると、「開く」が可能となっている

    ![rails5.2.0 after](https://github.com/WitStudy/TIL/blob/resources/rails/IEでダウンロードするファイルを直接開けるようにする/rails5_2_0_after.png)
