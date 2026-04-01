---
title: GLSLからHLSLへ変換する方法
tags:
  - Unity
  - Shader
  - HLSL
  - ShaderLab
  - shadertoy
private: false
updated_at: '2021-09-15T00:56:50+09:00'
id: 0ff14e62fa1a3a3b4ceb
organization_url_name: null
slide: false
ignorePublish: false
---


ShadertoyのGLSLのソースコードをHLSLへ変換するShaderManというツールがあるのですが、結構癖があるので説明します。

使い方などは以下にやり方が載っているのでそれを参考にしましょう。

https://github.com/smkplus/ShaderMan

## ドキュメントが古い

Open ShaderMan from Tools\ShaderManと書かれていますが、実際には2021年現在はWindow\ShaderMan です。

## エディタの癖が強い

コピへして、スクロールしようとすると、Macのマジックパッドなどでスクロールできず、矢印キー下（↓）で進んでいくと、下のコードへ辿り着けると言う仕様になっており、最初文字数制限で下にいけないのかと思ってしまうくらい、非常にわかりにくいUIです。

![スクリーンショット 2021-09-14 23.37.46.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/1771055/2f71b1fb-8243-8472-f885-bc79a7487ed9.png)


## 構文を少しでも違うと、変なエラーが出る

例えば、Shadertoyでよくある以下のようなメイン関数で

```HLSL
void mainImage( out vec4 fragColor, in vec2 fragCoord )
```

`in` を抜いた状態でconvertを走らせると、以下のようなバグが起こります。

```
i.uvfi.uvri.uvai.uvgi.uvCi.uvoi.uvli.uvoi.uvri.uv
i.uvfi.uvri.uvai.uvgi.uvCi.uvoi.uvli.uvoi.uvri.uv
<省略>
```


## 変更しないといけないコード

``` HLSL
iFrame -> Time.y
tex2Dlod(_MainTex, uv, x) -> tex2Dlod(_MainTex, float4(uv, x, 0))
```


