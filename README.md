# qqMusicDownload
QQ音乐批量下载、解析，支持下载指定链接或者一张专辑。由于QQ音乐资源限制，目前只能解析到高品质mp3格式。

## API

* QQMusic
  * getDownloadLinksByArray
  * downloadMp3
  * getPlayList



### getDownloadLinksByArray
解析一首歌的下载链接

#### `@params`  
qqMusic.getDownloadLinksByArray(`[String, Array]`)

#### `@return`
返回解析后的链接

#### `@example`

##### 单链接
```js
let qqMusic = new QQMusic();
let data = await qqMusic.getDownloadLinksByArray('https://y.qq.com/n/yqq/song/002i47OG1GAKRM.html')
```

##### 多链接
```js
let qqMusic = new QQMusic();
let data = await qqMusic.getDownloadLinksByArray(
  [
    'https://y.qq.com/n/yqq/song/001bhwUC1gE6ep.html',
    'https://y.qq.com/n/yqq/song/003ITzMw2CRNZX.html',
    'https://y.qq.com/n/yqq/song/001O8Fq6090GIP.html',
    'https://y.qq.com/n/yqq/song/002YiXmX3PKZHE.html',
    'https://y.qq.com/n/yqq/song/002i47OG1GAKRM.html'
  ]
)
```

