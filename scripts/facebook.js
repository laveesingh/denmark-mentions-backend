var fetch = require('node-fetch')

// takes a userId and a valid accessToken and returs a list of Posts(including comments etc) for that user
export async function fetchPostsByUserId(userId, accessToken){
  // let $postIds = `https://graph.facebook.com/v2.10/${userId}?fields=posts{id}&access_token=${accessToken}`
  let $Posts = `https://graph.facebook.com/v2.10/${userId}/posts?fields=comments{id},id&access_token=${accessToken}`
  let curPosts = []
  let response = ''
  let jsonResponse = ''
  do{
    process.stdout.write('.')
    response = await fetch($Posts)
    jsonResponse = await response.json()
    curPosts.push(...jsonResponse.data)
    if(jsonResponse.posts){
      $Posts = jsonResponse.posts.paging.next
    } else {
      $Posts = jsonResponse.paging.next
    }
  }while($Posts);
  putPosts(curPosts) // put entire array into the database
  return curPosts
}

// takes a list of UserIds and a valid accessToken and returs a list of Posts(including comments etc) for those users
export async function fetchPostsByUserIds(userIdsList, accessToken){
  let allPosts = []
  for(let userId of userIdsList) {
    let curPosts = await fetchPostsByUserId(userId, accessToken)
    allPosts = [...allPosts, ...curPosts]
  }
  return allPosts
}

function putPosts(postObjects){
  postObjects.forEach(post => {
    putPost(post)
  })
}

// take a post object that also contains comments
// and put this post and comments into the database
function putPost(postObject){
  console.log("post object:", postObject)
}
