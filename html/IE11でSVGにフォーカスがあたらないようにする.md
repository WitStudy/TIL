# IE11でSVGにフォーカスがあたらないようにする

## 結論

`focusable="false"` を指定してやることで解決した。

## 背景

タブキーによるフォーカス移動が上手くいかないとのことで、

確認してみるとSVGの画像にフォーカスがあたっていたためだった。

なお、 Google Chrome, Firefox, Internet Explorer にて確認したが、

フォーカスがあたるのは Internet Explorer のみであった。

## 確認した環境

|ブラウザ         |バージョン                                  |結果                    |
|-----------------|--------------------------------------------|------------------------|
|Google Chrome    |78.0.3904.97（Official Build） （64 ビット）|フォーカスがあたらない  |
|Firefox          |52.0.2                                      |フォーカスがあたらない  |
|Internet Explorer|11.0.9600.19540                             |フォーカスが **あたる** |

## 検証用HTML

```html
<a href="#">Link1</a>

<!-- 対策なし　フォーカスがあたる -->
<svg width="10px" height="10px">
  <circle cx="5" cy="5" r="5" fill="red"></circle>
</svg>

<a href="#">Link2</a>

<!-- tabindex を指定　フォーカスがあたる -->
<svg width="10px" height="10px" tabindex="-1">
  <circle cx="5" cy="5" r="5" fill="green"></circle>
</svg>

<a href="#">Link3</a>

<!-- focusable を指定　フォーカスがあたらない -->
<svg width="10px" height="10px" focusable="false">
  <circle cx="5" cy="5" r="5" fill="blue"></circle>
</svg>

<a href="#">Link4</a>
```
