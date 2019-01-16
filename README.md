# qqMusicDownload
QQ音乐批量下载、解析，支持下载指定链接或者一张专辑。由于QQ音乐资源限制，目前只能解析到高品质mp3格式。  

![](https://user-gold-cdn.xitu.io/2019/1/16/1685476e0ae191a8?w=997&h=523&f=png&s=38709)

## API

* QQMusic
  * <a href="#getdownloadlinksbyarray">getDownloadLinksByArray</a>
  * <a href="#getplaylist">downloadMp3</a>
  * <a href="#downloadmp3">getPlayList</a>



### getDownloadLinksByArray
解析一首歌的下载链接

#### `@params`  
qqMusic.getDownloadLinksByArray(`[@downloadLink: String | Array]`)  

* @downloadLink : 歌曲链接，可以使字符串或者数组

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




### getPlayList
解析一张歌单的下载链接

#### `@params`  
qqMusic.getPlayList(`[@playListLink: String]`)

* @playListLink : 歌单链接

#### `@return`
返回解析后的链接

#### `@example`

```js
let qqMusic = new QQMusic();
let playList = await qqMusic.getPlayList('https://y.qq.com/n/yqq/playlist/5109299040.html')
```




### downloadMp3
下载解析后的链接

#### `@params`  
qqMusic.downloadMp3(`[@downloadArray: Array], [@basePath: String], [@callback: Function]`)

* @downloadArray : 下载链接
* @basePath : 存放路径
* @callback : 回调函数，每首歌下载之后调用，传递下载的歌曲信息，失败状态等。

#### `@return`
返回解析后的链接

#### `@example`

##### 下载单曲
```js

let path = require('path')
let basePath = path.join(__dirname, '../output')

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
let downloadInfo = await qqMusic.downloadMp3(data, basePath, (info)=>{
  console.log(info.target.name + '下载完成')
})
```  

##### 下载歌单
```js
let path = require('path')
let basePath = path.join(__dirname, '../output')

let qqMusic = new QQMusic();
let playList = await qqMusic.getPlayList('https://y.qq.com/n/yqq/playlist/5109299040.html')

let data = await qqMusic.getDownloadLinksByArray(playList.list)
let downloadInfo = await qqMusic.downloadMp3(data, basePath, (info)=>{
  console.log(info.target.name + '下载完成')
})
```



