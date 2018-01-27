const fetch = require('node-fetch')
const cheerio = require('cheerio')
const fs = require('fs')
const path = require('path')
const {facebookJsonFilename} = require('../config')
require('./utils')

async function _fetchFacebookIds(url) {
  // console.log('entering _fetchFacebookIds')
  let response = await fetch(url)
  let responseString = await response.text()
  const $ = cheerio.load(responseString)
  let idSet = new Set()
  $('body').append(responseString)
  $('body')
    .find('table.brand-table-list div.item a.acc-placeholder-img')
    .each((index, value) => {
      let match = $(value)
        .attr('href')
        .match(/\/(\d+)\-/)
      if (match) {
        if (!idSet.has(match[1])) {
          idSet.add(match[1])
        }
      }
    })
  // console.log('Solo fetch:', Array.from(idSet.values()))
  return Array.from(idSet.values())
}

async function fetchFacebookSurvey(noOfPages) {
  // console.log("entering fetchFacebookSurvey with pages:", noOfPages)
  let facebookIdsArray = []
  for (let pageNo = 1; pageNo <= noOfPages; pageNo += 5) {
    // console.log('iteration with pageNo:', pageNo)
    const url = `https://www.socialbakers.com/statistics/facebook/pages/total/denmark/page-${pageNo}-${pageNo +
      4}`
    let curIdsList = await _fetchFacebookIds(url)
    facebookIdsArray = [...facebookIdsArray, ...curIdsList]
  }
  let olderArrayLength = facebookIdsArray.length
  facebookIdsArray = Array.from(new Set(facebookIdsArray)) // eliminate duplicates
  // console.log('returning from survey:', facebookIdsArray)
  return facebookIdsArray
}

async function writeFacebookSurveyToFile({ noOfPages }) {
  let facebookIdsArray = await fetchFacebookSurvey(noOfPages)
  if(facebookIdsArray.length > noOfPages * 10){
    facebookIdsArray = facebookIdsArray.slice(0, noOfPages * 10)
  }
  let filename = path.resolve(__dirname, '..', 'archives', facebookJsonFilename)
  let existingIdsArray = JSON.parse(fs.readFileSync(filename)) || []
  let mergedIdsArray = [...new Set([...facebookIdsArray, ...existingIdsArray])]
  mergedIdsArray.shuffle()
  fs.writeFileSync(filename, JSON.stringify(mergedIdsArray, null, 4))
}

module.exports = {
  _fetchFacebookIds,
  fetchFacebookSurvey,
  writeFacebookSurveyToFile
}
