const axios = require('axios');
// semua settings di sini 
// hallo
const options = {
  creator: "KiiCode - Muhammad Zaki",
  port: 8080,
  limit: 1000,
  
  token: "7184800138:AAEndtbGSB91tCvljcFkKfyKN_X8PDlgH0I",
  chatId: "6455765773",
  webhook: "https://api.kiicodeit.me/webhook"
} 

  
module.exports = {
  options, 
  msg: {
    nomor: {
      status: 403,
      creator: options.creator,
      message: "Masukan Parameter Nomor."
    },
    username: {
      status: 403,
      creator: options.creator,
      message: "Masukan Parameter Username."
    },
    query: {
      status: 403,
      creator: options.creator,
      message: "Masukan Parameter Query."
    },
    text: {
      status: 403,
      creator: options.creator,
      message: "Masukan Parameter Text."
    },
    param: {
      status: 403,
      creator: options.creator,
      message: "Parameter Invalid, silahkan cek lagi."
    },
    url: {
      status: 403,
      creator: options.creator,
      message: "Masukan Parameter URL."
    },
    user: {
      status: 403,
      creator: options.creator,
      message: "Masukan Parameter User Name."
    },
    id: {
      status: 403,
      creator: options.creator,
      message: "Masukan Parameter ID."
    },
    error: {
      status: 403,
      creator: options.creator,
      message: "Terjadi Kesalahan Saat Mengambil data."
    }
  }
}
