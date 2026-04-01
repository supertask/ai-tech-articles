---
title: 'UNET 1.0.8: 「ビルド済みアプリ」と「Unity Editor上でのアプリ」での疎通で失敗する場合は1.1.1に'
tags:
  - Network
  - アプリ
  - Unity
  - networkApp
  - Unet
private: false
updated_at: '2022-03-17T15:44:31+09:00'
id: ebb9bcfe44d7f69df4f6
organization_url_name: null
slide: false
ignorePublish: false
---

ビルド済みアプリ(クライアント)とUnity Editor上でのアプリ（サーバ）で疎通する際に、

```
IndexOutOfRangeException: NetworkReader:ReadByte out of range:NetBuf sz:0 pos:0
  at UnityEngine.Networking.NetBuffer.ReadByte () [0x0004c] in 
```

というエラーが出ました。[SyncTime](https://github.com/fuqunaga/SyncUtil/blob/master/Scripts/SyncTime.cs#L49)　という時間を同期するライブラリを使っていたのですが、そこのReadMessageでメッセージが空になっている？ためか、**メッセージのデシリアライズ処理（文字列から構造体に戻す処理）で失敗する** というのが、エラーの内容でした。

```
var msg = netMsg.ReadMessage<SyncTimeMessage>();
```


結局、 **Multiplayer HLAPI (通称UNET)のバージョンを1.0.8から1.1.1に更新することで上記のエラーが消えました**。以下は、manifest.jsonで変更した内容。

```
"com.unity.multiplayer-hlapi": "1.1.1",
```

また、ややこしいですが、Multiplayer HLAPIはなぜかキャッシュがのこってしまっていて、1.1.1から1.0.8に戻すとエラーが起こらないので、Libraryフォルダのライブラリキャッシュを消す必要があります。


## 最後に

UNETの互換性のある[Mirror](https://mirror-networking.com/) に移行するのが主流ですので、みなさん、なるべく、そっちに移行しましょう。（自分の場合はどうしても直近で必要だったので、このような対応としましたが）


Mirrorは1フレームごとに送れるバイト数が大きく、バグもUNETと比べてかなり少なく、コミュニティも大きいのでおすすめです。
