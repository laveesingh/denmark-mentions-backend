var fetch = require('node-fetch')
var cheerio = require('cheerio')

async function _fetchFacebookIds(url){
  let response = await fetch(url)
  let responseString = await response.text()
  const $ = cheerio.load(responseString)
  let idSet = new Set()
  $('body').append(responseString)
  $('body').find('table.brand-table-list div.item a.acc-placeholder-img').each((index, value) => {
    let match = $(value).attr('href').match(/\/(\d+)\-/)
    if(match){
      if(!idSet.has(match[1])){
        idSet.add(match[1])
      }
    }
  })
  return Array.from(idSet.values())
}

async function fetchFacebookIdsFromSB(noOfPages){
  let facebookIdsArray = []
  for(let pageNo = 1; pageNo <= noOfPages; pageNo+=5){
    const url = `https://www.socialbakers.com/statistics/facebook/pages/total/denmark/page-${pageNo}-${pageNo+4}`
    let curIdsList = await _fetchFacebookIds(url)
    facebookIdsArray = [...facebookIdsArray, ...curIdsList]
  }
  let olderArrayLength = facebookIdsArray.length
  facebookIdsArray = Array.from(new Set(facebookIdsArray)) // eliminate duplicates
  return facebookIdsArray
}

// response = fetchFacebookIdsFromSB(5)
// .then(res => console.log(res))
// .catch(err => console.error(err))

module.exports = {
  _fetchFacebookIds,
  fetchFacebookIdsFromSB
}