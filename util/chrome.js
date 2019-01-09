let axios = require('axios')

class Chrome {

  constructor(){

  }

  get(url, data){
    return new Promise(resolve => {
      axios.get(url ,
        data || {},
        {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/69.0.3497.92 Safari/537.36'
        })
        .then(function (response) {
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
