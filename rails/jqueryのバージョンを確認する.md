# jQuery のバージョンを確認する

Rails で使用している jQuery のバージョンを知りたくなったとき、

おもむろに Rails Console を立ち上げ、以下を実行すれば良い

```rb
irb(main):001:0> Jquery::Rails::JQUERY_VERSION
=> "1.12.4"
```
