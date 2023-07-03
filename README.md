# 5ch-script-for-me
自分用の5chとopen2chのスクリプト、悪く言ったらただの自己満。  
好みのscript manager でインストールしてください。　  
めんどくさいからこれ以上何かしたりしないです。**⚠️使用は自己責任で。⚠️**   
## **このコードはchatgptにより出力されました。**　　
**私はそれをうまく動くようにしました。**  
もっといい書き方があるかもしれないけど、プログラミング初心者の私にはコレが精一杯です。  
# インストール  
[Github raw text](https://github.com/Chibiaoiro/5ch-script-for-me/raw/main/url-change-5ch.user.js)  
[GreasyFork](https://greasyfork.org/ja/scripts/470038-5ch-script-for-me)
# パーツに分けた解説
* 5ch   
  - `//5ch.home.page`  
    コレは、5chのホームページで /read.cgi/　を /read.cgi/c/ にして強制的にクラシック版にする。

  - `//5ch.primary`  
    コレはメインで動くやつ。/l50 をなくして強制的に全表示にする。  

  - `//5ch.find.page`  
    コレは5chのfindページでクラシック版にするやつ。  

  - `//5ch.read.cgi`  
    コレはread.cgiで上のボタン(最新50とか)で/l50を削除しないようにするやつ。　クラシック版にする。

* open2ch
  
  -  `//open2ch`  
     コレはそれぞれ l10, l30, l50　があるならそれを削除するだけ。　強制全表示。

いらんかったらそれぞれの部分消去して調整してね。😏
