let axios = require('axios')
const request = require("request");
const fs = require("fs");
let qs = require('qs')

class Chrome {

  constructor(){

  }

  download(url, path){

    return new Promise(resolve => {
      request(url)
        .pipe(fs.createWriteStream(path))
        .on("error",function(err){
          resolve({
            code: 500,
            err
          });
        })
        .on("close",() => {
          resolve({
            code: 200,
          });
        })
    })
  }

  get(url, data, header, urlData){
    return new Promise(resolve => {

      if(url.indexOf('?') === -1){
        url += '?' + ( urlData ? decodeURIComponent(qs.stringify(urlData)) : '')
      }

      axios({
        method: 'GET',
        url: url,
        data: data || {},
        headers: Object.assign({
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/69.0.3497.92 Safari/537.36'
        }, header)
      }).then(function (response) {
          // handle success
          resolve({
            code: 200,
            data: response.data,
            response
          })
        })
        .catch(function (error) {
          // handle error
          resolve({
            code: 500,
            data: null,
            error
          })
        })

    })
  }



}



module.exports = new Chrome()
