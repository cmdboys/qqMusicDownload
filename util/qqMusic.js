
let chrome = require('./chrome')
let api_list = require('../config/API_LIST')
let path = require('path')
let cheerio = require('cheerio');

class QQMusc {

  constructor() {
    this.uin = '1008611'
    this.guid = '1234567890'
    this.sizeList = [
      /* 目前只能解下载mp3
      {
        type: 'size_flac',
        downloadType: ['F000', 'flac']
      },
      {
        type: 'size_ape',
        downloadType: ['A000', 'ape']
      },
      */
      {
        type: 'size_320mp3',
        downloadType: ['M800', 'mp3']
      },
      {
        type: 'size_128mp3',
        downloadType: ['M500', 'mp3']
      }
    ]
  }


  /*
  * 获取vkey，vkey可以使用 80400ms
  * */
  async getKey(){

    let getVkeyUrl = `${api_list.GET_KEY}?g_tk=0&loginUin=${this.uin}&hostUin=0&format=json&inCharset=utf8&outCharset=utf-8&notice=0&platform=yqq&needNewCode=0&cid=205361747&uin=${this.uin}&songmid=003a1tne1nSz1Y&filename=C400003a1tne1nSz1Y.m4a&guid=${this.guid}`

    let info = await chrome.get(getVkeyUrl)

    if(info.code === 200) {
      let vkey = ''

      try {
        vkey = info.data['data']['items'][0]['vkey']
      } catch (e) {

      }
      return vkey
    } else {
      return null
    }

  }

  getMid(songLink){
    let mid = null
    try {
      let a1 = songLink.split('/').pop()
      mid = a1.split('.')[0]
    } catch (e) {

    }
    return mid
  }

  // 选择最优的文件
  checkType(file){
    for(let i=0; i<this.sizeList.length; i++) {
      let target = this.sizeList[i]
      if(file[target.type]) {
        return target
      }
    }
    return null
  }

  async getMedia(mid){
    let getMidUrl = `${api_list.GET_INFO}?songmid=${mid}&tpl=yqq_song_detail&format=json&callback=getOneSongInfoCallback&g_tk=5381&jsonCallback=getOneSongInfoCallback&loginUin=0&hostUin=0&format=json&inCharset=utf8&outCharset=utf-8&notice=0&platform=yqq&needNewCode=0`
    let info = await chrome.get(getMidUrl)


    if(info.code === 200) {
      let file = ''

      try {
        file = info.data.data[0].file
        file.name = info.data.data[0].name
      } catch (e) {

      }

      return file
    } else {
      return null
    }

  }

  async getDownloadLink(media_mid, vkey, downloadType){
    return `${api_list.GET_DOWNLOAD}/${downloadType.downloadType[0]}${media_mid}.${downloadType.downloadType[1]}?vkey=${vkey}&guid=1234567890&uin=1008611&fromtag=8`
  }

  async getDownloadLinksByArray(arrOrString){

    let myArray = []

    let returnStatus = {
      code: 200,
      list: [],
      err_msg: ''
    }

    if(typeof arrOrString === 'string') {
      myArray.push(arrOrString)
    } else {
      myArray = arrOrString
    }

    // 获取key
    let vkey = await this.getKey()

    if(!vkey) {
      returnStatus.code = 500
      returnStatus.err_msg = '获取vkey失败'
      return returnStatus
    }

    for(let i = 0; i< myArray.length; i++) {
      let url = myArray[i]

      let item = {
        url: '',
        err_msg: null
      }


      let mid = this.getMid(url)

      if(!mid) {
        item.err_msg = '链接有误'
        break
      }

      // 获取media id
      let file = await this.getMedia(mid)


      if(!file) {
        item.err_msg = '获取media信息失败'
        break
      }

      // 获取文件
      let checked = this.checkType(file)

      if(!checked) {
        item.err_msg = '解析媒体信息失败'
        break
      }

      // 获取下载链接
      let downloadLink = await this.getDownloadLink(mid, vkey, checked)

      item.url = downloadLink
      item.name = file.name
      item.tyep = checked.downloadType[1]
      item.fileName = file.name+'.'+checked.downloadType[1]

      returnStatus.list.push(item)
    }

    return returnStatus

  }

  async downloadMp3(arr, basePath, callback){
    let list = arr.list
    let downloadInfo = []

    for(let i=0; i<list.length; i++) {
      let target = list[i]
      let info = await chrome.download(target.url, path.join(basePath, target.fileName))
      info.target = target
      callback && callback(info)
      downloadInfo.push(info)
    }

    return downloadInfo
  }

  async getPlayList(playListUrl){
    let innerHTML = await chrome.get(playListUrl)

    let output = []

    var $= cheerio.load(innerHTML.data);
    var list = $('.songlist__list').children();


    for(let i = 0; i<list.length; i++) {
      let target = list[i]

      // output.push(target.find('.js_song'))
      console.log($(target).html())

      return

    }

    console.log(output)


  }

}


module.exports = QQMusc
