var fetch = require('node-fetch')

async function fetchPostsByUserId(userId, accessToken){
  // let $postIds = `https://graph.facebook.com/v2.10/${userId}?fields=posts{id}&access_token=${accessToken}`
  let $postIds = `https://graph.facebook.com/v2.10/${userId}/posts?fields=comments{id},id&access_token=${accessToken}`
  let curPostIds = []
  let response = ''
  let jsonResponse = ''
  do{
    // console.log('.')
    process.stdout.write('.')
    response = await fetch($postIds)
    jsonResponse = await response.json()
    if(jsonResponse.posts){
      console.log('never come in here')
      for(let post of jsonResponse.posts.data){
        curPostIds.push(post.id)
      }
    }else{
      for (let post of jsonResponse.data){
        curPostIds.push(post.id)
      }
    }
    if(jsonResponse.posts){
      $postIds = jsonResponse.posts.paging.next
    } else {
      $postIds = jsonResponse.paging.next
    }
  }while($postIds);
  return curPostIds
}

async function fetchPostsByUserIds(userIdsList, accessToken){
  let allPostsIds = []
  for(let userId of userIdsList) {
    let curPostIds = await fetchPostsByUserId(userId, accessToken)
    allPostsIds = [...allPostsIds, ...curPostIds]
  }
  return allPostsIds
}

module.exports = {
  fetchPostsByUserId,
  fetchPostsByUserIds
}