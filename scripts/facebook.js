import fetch from 'node-fetch'
import { FacebookComment, FacebookPost } from '../models/models'


// takes a list of userids and a valid accessToken and
// puts the posts and comments from these users into database
export async function fetchPostsByUserIds(userIdsList, accessToken) {
  let allPosts = []
  for (let userId of userIdsList) {
    let curPosts = await fetchPostsByUserId(userId, accessToken)
    allPosts = [...allPosts, ...curPosts]
  }
  return allPosts
}


// takes a userId and a valid accessToken and
// also returs a list of Posts(including comments etc) for that user
// also puts that list of posts and comments into database
export async function fetchPostsByUserId(userId, accessToken) {
  let url = `https://graph.facebook.com/v2.10/${userId}/posts?fields=id,from,message,created_time,comments{id,from,message,created_time}&access_token=${accessToken}`
  let curPosts = []
  let response = ''
  let jsonResponse = ''
  do {
    process.stdout.write('.')
    response = await fetch(url)
    jsonResponse = await response.json()
    curPosts.push(...jsonResponse.data)
    url = jsonResponse.paging.next
  } while (url)
  putPosts(curPosts) // put entire array into the database
  return curPosts
}


function putPosts(postObjects) {
  postObjects.forEach(post => {
    putPost(post)
  })
}


// take a post object that also contains comments
// and put this post and comments into the database
function putPost(postObject) {
  postObject.from = postObject.from.id
  let post = new FacebookPost(postObject)
  post.save((error, post) => {
    if (error) {
      console.log('!')
    } else {
      console.log('>')
    }
  })
  for (let comment of postObject.comments.data) {
    putComment(comment)
  }
}

// takes a comment object and put that comment into database
function putComment(commentObject) {
  commentObject.from = commentObject.from.id
  let comment = new FacebookComment(commentObject)
  comment.save((error, comment) => {
    if (error) {
      console.log('!!')
    } else {
      console.log('>>')
    }
  })
}
