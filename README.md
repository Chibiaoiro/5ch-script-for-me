# 5ch-script-for-me
自分用の5chとopen2chのスクリプト、悪く言ったらただの自己満。  
好みのscript manager でインストールしてください。　  
めんどくさいからこれ以上何かしたりしないです。**⚠️使用は自己責任で。⚠️**   
## **このコードはchatgptにより出力されました。🤖**　　
**私はそれをうまく動くようにしました。**  
もっといい書き方があるかもしれないけど、プログラミング初心者の私にはコレが精一杯です。😞  
# ⬇️ インストール ⬇️  
  Install on [Github Raw Content](https://github.com/Chibiaoiro/5ch-script-for-me/raw/main/url-change-5ch.user.js)  
  ![Static Badge](https://img.shields.io/badge/GitHub-raw_content-white?logo=GitHub&link=https%3A%2F%2Fgithub.com%2FChibiaoiro%2F5ch-script-for-me%2Fraw%2Fmain%2Furl-change-5ch.user.js)

  Install on [GreasyFork](https://greasyfork.org/ja/scripts/470038-5ch-open2ch-url-改変スクリプト)   
  ![Greasy Fork](https://img.shields.io/greasyfork/dt/470038?color=red&link=https%3A%2F%2Fgreasyfork.org%2Fja%2Fscripts%2F470038-5ch-open2ch-url-%E6%94%B9%E5%A4%89%E3%82%B9%E3%82%AF%E3%83%AA%E3%83%97%E3%83%88)


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

いらんかったらそれぞれの部分消去して調整してね。📝
