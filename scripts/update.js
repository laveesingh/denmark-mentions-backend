const {getDBConnection} = require('../handlers/database')
const {fetchPostsByUserId, fetchPostsByUserIds} = require('./facebook')
const {fetchFacebookIdsFromSB} = require('./socialBakers')

/*
Insert a feature for fullupdate in order of userids so that 
first updates the userid that was updated the longest ago.
*/
async function fullFacebookUpdate(accessToken){
  const noOfPageSB = 5 // temporary
  const db = getDBConnection()
  let facebookUserIdsList = await fetchFacebookIdsFromSB(noOfPageSB)
  facebookUserIdsList = facebookUserIdsList.slice(0,2) // temporary
  let facebookPosts = []

  for(let userId of facebookUserIdsList){
    console.log('fetching for user:', userId)
    let curPosts = await fetchPostsByUserId(userId, accessToken)
    curPosts = curPosts.slice(0, 3) // temporary
    facebookPosts.push(...curPosts)
    console.log('currentPostIds:', curPosts.length)
  }
  console.log('Total posts:', facebookPosts.length)
  for(let post of facebook){
    console.log(post)
    break
  }
}

fullFacebookUpdate(
  'EAACEdEose0cBANMZBjH2g8BRYqIOyJHRP54zW7jbuaXgUPIPHyUXZBSXu8uBksscg6qZCJjbNoJZA0gZBLbyBlhVoUTlCWOwK7cKGshjntWBCsdIYi6kZAlBPbkNv6W0EZAp8RoIqZAn07mMrfOaQ7N1r0Tmz9yNpapLpHNhd7YG7lUJXQ2UAuTGhQNQwzZAaZCP4ZD'
)

module.exports = {
  fullFacebookUpdate
}