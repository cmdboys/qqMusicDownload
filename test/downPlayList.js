let QQMusic = require('../index')
let path = require('path')

let basePath = path.join(__dirname, '../output')

let qqMusic = new QQMusic();


(async function () {

  // 下载歌单

  let playList = await qqMusic.getPlayList('https://y.qq.com/n/yqq/playsquare/5084277757.html#stat=y_new.playlist.pic_click')

  let data = await qqMusic.getDownloadLinksByArray(playList.list)
  let downloadInfo = await qqMusic.downloadMp3(data, basePath, (info)=>{
    console.log(info.target.name + '下载完成')
  })


})();
