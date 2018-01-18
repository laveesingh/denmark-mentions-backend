
function getDBConnection() {
  const mongoose = require('mongoose')
  mongoose.connect('mongodb://localhost:27017', {
    useMongoClient: true,
  })
  const db = mongoose.connection
  db.on('error', console.error.bind(
    console,
    'MongoDB client error!'
  ))
  db.once('open', () => {
    console.warn('connected to the database')
  })
  return db
}

module.exports = {
  getDBConnection
}