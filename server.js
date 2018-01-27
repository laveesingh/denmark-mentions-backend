import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import path from 'path'
import {getDBConnection} from './handlers/database'
import {router} from './handlers/routes'

const PORT = process.env.PORT || 8081
const app = express()

router(app)

app.get('/', function(request, response){
  response.json({msg: 'Backend server is running'})
})

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cors())
app.use(express.static('.'))
app.use(cookieParser)

const db = getDBConnection()

app.listen(PORT, function() {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`)
})
