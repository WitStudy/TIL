# thinをインストールするとRailsが起動しなくなる

## 環境

* Windows Server 2016 (評価版)
* Ruby 2.6.3p62 (2019-04-16 revision 67580) [x64-mingw32]
* Rails 5.2.3
* Thin 1.7.2

## 現象

thin をインストールすると、`rails s` や `rails c` などのコマンドを実行したときに例外が発生する。

```
C:\inetpub\wwwroot\jz4o>bundle exec rails s
Unable to load the EventMachine C extension; To use the pure-ruby reactor, require 'em/pure_ruby'
Traceback (most recent call last):
        34: from bin/rails:4:in `<main>'
        33: from bin/rails:4:in `require'
        32: from C:/inetpub/wwwroot/jz4o/vendor/bundle/ruby/2.6.0/gems/railties-5.2.3/lib/rails/commands.rb:18:in `<top (required)>'
        31: from C:/inetpub/wwwroot/jz4o/vendor/bundle/ruby/2.6.0/gems/railties-5.2.3/lib/rails/command.rb:46:in `invoke'
        30: from C:/inetpub/wwwroot/jz4o/vendor/bundle/ruby/2.6.0/gems/railties-5.2.3/lib/rails/command/base.rb:65:in `perform'
        29: from C:/inetpub/wwwroot/jz4o/vendor/bundle/ruby/2.6.0/gems/thor-0.20.3/lib/thor.rb:387:in `dispatch'
        28: from C:/inetpub/wwwroot/jz4o/vendor/bundle/ruby/2.6.0/gems/thor-0.20.3/lib/thor/invocation.rb:126:in `invoke_command'
        27: from C:/inetpub/wwwroot/jz4o/vendor/bundle/ruby/2.6.0/gems/thor-0.20.3/lib/thor/command.rb:27:in `run'
        26: from C:/inetpub/wwwroot/jz4o/vendor/bundle/ruby/2.6.0/gems/railties-5.2.3/lib/rails/commands/server/server_command.rb:142:in `perform'
        25: from C:/inetpub/wwwroot/jz4o/vendor/bundle/ruby/2.6.0/gems/railties-5.2.3/lib/rails/commands/server/server_command.rb:142:in `tap'
        24: from C:/inetpub/wwwroot/jz4o/vendor/bundle/ruby/2.6.0/gems/railties-5.2.3/lib/rails/commands/server/server_command.rb:145:in `block in perform'
        23: from C:/inetpub/wwwroot/jz4o/vendor/bundle/ruby/2.6.0/gems/railties-5.2.3/lib/rails/commands/server/server_command.rb:145:in `require'
        22: from C:/inetpub/wwwroot/jz4o/config/application.rb:18:in `<top (required)>'
        21: from C:/Ruby26-x64/lib/ruby/2.6.0/bundler.rb:114:in `require'
        20: from C:/Ruby26-x64/lib/ruby/2.6.0/bundler/runtime.rb:65:in `require'
        19: from C:/Ruby26-x64/lib/ruby/2.6.0/bundler/runtime.rb:65:in `each'
        18: from C:/Ruby26-x64/lib/ruby/2.6.0/bundler/runtime.rb:76:in `block in require'
        17: from C:/Ruby26-x64/lib/ruby/2.6.0/bundler/runtime.rb:76:in `each'
        16: from C:/Ruby26-x64/lib/ruby/2.6.0/bundler/runtime.rb:81:in `block (2 levels) in require'
        15: from C:/Ruby26-x64/lib/ruby/2.6.0/bundler/runtime.rb:81:in `require'
        14: from C:/inetpub/wwwroot/jz4o/vendor/bundle/ruby/2.6.0/gems/thin-1.7.2/lib/thin.rb:7:in `<top (required)>'
        13: from C:/inetpub/wwwroot/jz4o/vendor/bundle/ruby/2.6.0/gems/activesupport-5.2.3/lib/active_support/dependencies.rb:291:in `require'
        12: from C:/inetpub/wwwroot/jz4o/vendor/bundle/ruby/2.6.0/gems/activesupport-5.2.3/lib/active_support/dependencies.rb:257:in `load_dependency'
        11: from C:/inetpub/wwwroot/jz4o/vendor/bundle/ruby/2.6.0/gems/activesupport-5.2.3/lib/active_support/dependencies.rb:291:in `block in require'
        10: from C:/inetpub/wwwroot/jz4o/vendor/bundle/ruby/2.6.0/gems/activesupport-5.2.3/lib/active_support/dependencies.rb:291:in `require'
         9: from C:/inetpub/wwwroot/jz4o/vendor/bundle/ruby/2.6.0/gems/eventmachine-1.2.7-x64-mingw32/lib/eventmachine.rb:8:in `<top (required)>'
         8: from C:/inetpub/wwwroot/jz4o/vendor/bundle/ruby/2.6.0/gems/activesupport-5.2.3/lib/active_support/dependencies.rb:291:in `require'
         7: from C:/inetpub/wwwroot/jz4o/vendor/bundle/ruby/2.6.0/gems/activesupport-5.2.3/lib/active_support/dependencies.rb:257:in `load_dependency'
         6: from C:/inetpub/wwwroot/jz4o/vendor/bundle/ruby/2.6.0/gems/activesupport-5.2.3/lib/active_support/dependencies.rb:291:in `block in require'
         5: from C:/inetpub/wwwroot/jz4o/vendor/bundle/ruby/2.6.0/gems/activesupport-5.2.3/lib/active_support/dependencies.rb:291:in `require'
         4: from C:/inetpub/wwwroot/jz4o/vendor/bundle/ruby/2.6.0/gems/eventmachine-1.2.7-x64-mingw32/lib/rubyeventmachine.rb:2:in `<top (required)>'
         3: from C:/inetpub/wwwroot/jz4o/vendor/bundle/ruby/2.6.0/gems/activesupport-5.2.3/lib/active_support/dependencies.rb:291:in `require'
         2: from C:/inetpub/wwwroot/jz4o/vendor/bundle/ruby/2.6.0/gems/activesupport-5.2.3/lib/active_support/dependencies.rb:257:in `load_dependency'
         1: from C:/inetpub/wwwroot/jz4o/vendor/bundle/ruby/2.6.0/gems/activesupport-5.2.3/lib/active_support/dependencies.rb:291:in `block in require'
C:/inetpub/wwwroot/jz4o/vendor/bundle/ruby/2.6.0/gems/activesupport-5.2.3/lib/active_support/dependencies.rb:291:in `require': cannot load such file -- 2.6/rubyeventmachine (LoadError)
```

## 対応方法

thin の依存でインストールされる eventmachine の内部で LoadError が発生するため、

問題のないバージョンをインストールする。

今回は、 Rubygems で公開されているバージョンでは動作しなかったため、Githubからインストールする。

1. Gemfile を修正

    ```diff
    + # 2019/9/6時点のmasterブランチの最新コミット(10fb0c47c9a030b716dacd4a8df7e34b2445169b)を取得
    + gem 'eventmachine', github: 'eventmachine/eventmachine', branch: :master, ref: '10fb0c4'
    ```

1. `bundle update eventmachine`

1. `bundle exec rails s`

    ```
    C:\inetpub\wwwroot\jz4o>bundle exec rails s
    => Booting Puma
    => Rails 5.2.3 application starting in development
    => Run `rails server -h` for more startup options
    *** SIGUSR2 not implemented, signal based restart unavailable!
    *** SIGUSR1 not implemented, signal based restart unavailable!
    *** SIGHUP not implemented, signal based logs reopening unavailable!
    Puma starting in single mode...
    * Version 3.12.1 (ruby 2.6.3-p62), codename: Llamas in Pajamas
    * Min threads: 5, max threads: 5
    * Environment: development
    * Listening on tcp://localhost:3000
    Use Ctrl-C to stop
    ```

無事に起動した！！！
