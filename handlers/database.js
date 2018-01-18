
function getDBConnection() {
  const mongoose = require('mongoose')
  mongoose.connect('mongodb://dkuser:dkpassword@ds261247.mlab.com:61247/dkmentions', {
    useMongoClient: true
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