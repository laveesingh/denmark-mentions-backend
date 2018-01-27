const {getDBConnection} = require('../handlers/database')
const {fetchPostsByUserId, fetchPostsByUserIds} = require('./facebook')
import {fetchFacebookIdsFromSB} from './socialBakers'

const facebookAccessToken = '' // needs to be updated every 2 hour (I know, right?)

/*
TODO: Insert a feature for fullupdate in order of userids so that 
first updates the userid that was updated the longest ago.
*/
// takes an accessToken, fetches fetches social bakers survey, updates entire database of facebook
async function fullFacebookUpdate(accessToken){
  const noOfPageSB = 5 // throttled
  // const db = getDBConnection()
  let facebookUserIdsList = await fetchFacebookIdsFromSB(noOfPageSB)
  facebookUserIdsList = facebookUserIdsList.slice(0,2) // throttled
  let facebookPosts = []

  for(let userId of facebookUserIdsList){
    console.log('fetching for user:', userId)
    let curPosts = await fetchPostsByUserId(userId, accessToken)
    curPosts = curPosts.slice(0, 3) // throttled
    facebookPosts.push(...curPosts)
    console.log('currentPostIds:', curPosts.length)
  }
  console.log('Total posts:', facebookPosts.length)
  console.log(facebookPosts)
  // now put those posts into the database
}

// fullFacebookUpdate( facebookAccessToken )

module.exports = {
  fullFacebookUpdate
}