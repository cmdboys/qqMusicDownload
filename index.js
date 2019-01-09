let QQMusic = require('./util/qqMusic')


let qqMusic = new QQMusic();


(async function () {

  let data = await qqMusic.getDownloadLinksByArray('https://y.qq.com/n/yqq/song/001bhwUC1gE6ep.html')
  console.log(data)

})();
