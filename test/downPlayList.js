let QQMusic = require('../index')
let path = require('path')

let basePath = path.join(__dirname, '../output')

let qqMusic = new QQMusic();


(async function () {



  let playList = await qqMusic.getPlayList('https://y.qq.com/n/yqq/playlist/5109299040.html')

  /*
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
  */


})();
