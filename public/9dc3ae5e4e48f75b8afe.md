---
title: バネの動きをShaderで再現する
tags:
  - Unity
  - Physics
  - Shader
  - HLSL
  - ShaderGraph
private: false
updated_at: '2022-02-05T23:36:03+09:00'
id: 9dc3ae5e4e48f75b8afe
organization_url_name: null
slide: false
ignorePublish: false
---

![springLightDamping.gif](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/1771055/293df065-09f2-9d9d-1d46-3d9977a32a42.gif)


バネの動きを再現するのに，バネ小振動関数 (Spring light damping function) の公式2.8 [1] を使いました．

![image.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/1771055/d67ad841-d248-a337-72fd-ff5a1570fa93.png)

見た目は↓の感じです．

![image.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/1771055/0ed90f4c-1675-f2fb-9fc5-cdffdaa5bf5b.png)


[Graphtoyで描画したバネ小振動関数](https://graphtoy.com/?f1(x,t)=3.0*exp(-x*0.6/PI)*cos(x*3)&v1=true&f2(x,t)=&v2=false&f3(x,t)=&v3=false&f4(x,t)=&v4=false&f5(x,t)=&v5=false&f6(x,t)=&v6=false&grid=1&coords=10.971303370786517,0.033808988764044756,14.520000000000003) のリンクをたどってグラフを見ることもできます．

実際のHLSLコードは下のような感じです

```HLSL
//
// Reference:
//     George C King, Vibrations and waves, https://himafi.fmipa.unej.ac.id/wp-content/uploads/sites/16/2018/03/vibrations-and-waves-george-c-king.pdf
//
void SpringLightDamping_float(
	float x, float expFrequency, float cosFrequency,
	float amplitude, out float res)
{
    res = amplitude * exp( - x * expFrequency / 2 ) * cos( x * cosFrequency);
}
```

下のリンクには，UnityのShaderGraph用に拡張HLSLコードを書いているので，ぜひご参照ください．

https://github.com/supertask/ShaderLibCore

[1] George C King, Vibrations and waves, https://himafi.fmipa.unej.ac.id/wp-content/uploads/sites/16/2018/03/vibrations-and-waves-george-c-king.pdf
