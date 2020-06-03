const fetch = require('node-fetch');
const readlineSync = require('readline-sync');
var randomize = require('randomatic')
var random = require('random-name')
const { URLSearchParams } = require('url');
const cheerio = require('cheerio');
const rp = require('request-promise');
const fs = require('fs-extra');
const delay = require('delay')
const uuidv1 = require('uuid/v1');

const functionSendOtp = (email, id, reff) => new Promise((resolve, reject) => {
    const bodys = {
        confirmPassword: "Japro908@",
        email: email,
        installationId: id,
        password: "Japro908@",
        refCode: reff
        }
    
      fetch('https://api.babbapp.com/v1.0/auth/signup', { 
          method: 'POST', 
          body: JSON.stringify(bodys),
          headers: {
            'User-Agent': 'google G011A 576x1024 Android 5.1.1',
            'Content-Type': 'application/json',
            'Content-Length': 161,
            'Host': 'api.babbapp.com',
            'Connection': 'Keep-Alive',
            'Accept-Encoding': 'gzip'
          }
      })
      .then(res => res.text())
      .then(result => {
          resolve(result);
      })
      .catch(err => reject(err))
  });

  const functionGetLink = (nickname) =>
  new Promise((resolve, reject) => {
      fetch(`https://generator.email/`, {
          method: "get",
          headers: {
              'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
              'accept-encoding': 'gzip, deflate, br',
              'accept-language': 'en-US,en;q=0.9',
              'cookie': `_ga=GA1.2.1434039633.1579610017; _gid=GA1.2.374838364.1579610017; _gat=1; surl=xxxw.online%2F${nickname}`,
              'sec-fetch-mode': 'navigate',
              'sec-fetch-site': 'same-origin',
              'upgrade-insecure-requests': 1,
              'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.117 Safari/537.36'
          }
      })
      .then(res => res.text())
          .then(text => {
              const $ = cheerio.load(text);
              const src = $("h2").text();
              resolve(src);
          })
          .catch(err => reject(err));
  });

const functionVerifOtp = (usernames, otp) => new Promise((resolve, reject) => {
      fetch(`https://api.babbapp.com/v1.0/auth/signup/confirm?email=${usernames}%40xxxw.online&code=${otp}`, { 
          method: 'POST',
          headers: {
            'User-Agent': 'google G011A 576x1024 Android 5.1.1',
            'Content-Type': 'application/json',
            'Host': 'api.babbapp.com',
            'Connection': 'Keep-Alive',
            'Accept-Encoding': 'gzip'
          }
      })
      .then(res => res.text())
      .then(result => {
          resolve(result);
      })
      .catch(err => reject(err))
  });

  const functionFill = (token) => new Promise((resolve, reject) => {
    const bodys = {
        city: "sadas",
        country: "ANGOLA",
        firstName: "jashd",
        houseNumber: "sdsaasasd",
        isAnonymous: false,
        isFilled: false,
        lastName: "uhdasu",
        phoneNumber: "+6285155157425",
        postcode: "343",
        street: "asdsa",
        verificationStatus: "Kyc1"
        }
    
      fetch('https://api.babbapp.com/v1.0/user/profile/save', { 
          method: 'POST', 
          body: JSON.stringify(bodys),
          headers: {
            'Authorization': `Bearer ${token}`,
            'User-Agent': 'google G011A 576x1024 Android 5.1.1',
            'Content-Type': 'application/json',
            'Content-Length': '238',
            'Host': 'api.babbapp.com',
            'Connection': 'Keep-Alive',
            'Accept-Encoding': 'gzip'
          }
      })
      .then(res => res.text())
      .then(result => {
          resolve(result);
      })
      .catch(err => reject(err))
  });

(async () => {
    const reff = readlineSync.question('[?] Kode reff: ')
    const jumlah = readlineSync.question('[?] Jumlah reff: ')
    for (var i = 0; i < jumlah; i++){
    try {
        const id = uuidv1()
        const rand = randomize('0', 5)
        const username = random.first()
        const usernames = `${username}${rand}`
        const email = `${usernames}@xxxw.online`
        console.log(`[+] Email: ${email}`)
        const send = await functionSendOtp(email, id, reff)
        await delay(4000)
        const get = await functionGetLink(usernames)
        const otp = get.split(' ')[2] 
        console.log(`[+] OTP ${otp}`)
        const verif = await functionVerifOtp(usernames, otp)
        const fill = await functionFill(verif)
        console.log(fill)
    } catch (e) {
        console.log(e)
    }
}
})()