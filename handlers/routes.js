import {writeFacebookSurveyToFile} from '../scripts/socialBakers'
import {fetchPostsByUserIds, fetchPostsByUserId} from '../scripts/facebook'
import fs from 'fs'


export function router(app) {
  app.get('/', function(request, response) {
    console.log('root url requested')
    response.json({ msg: 'screw you' })
  })

  app.get('/update-facebook', async function(request, response) {
    // expects data object along that contains throttling parameters
    // console.log('params:', request.query)
    const {
      maxUsers,
      maxPostsPerUser,
      maxCommentsPerPost,
      scrapeSurvey,
      facebookAccessToken
    } = request.query
    if (scrapeSurvey) {
      await writeFacebookSurveyToFile({noOfPages: 3})
    }
    const facebookArchiveFilename = 
    const facebookUserIds = JSON.parse(fs.readFileSync())
    fetchPostsByUserIds(facebookUserIds, facebookAccessToken)
  })
}