import mongoose from 'mongoose';

mongoose.set('strictQuery', true)

/**
 * Database connection
 * 
 * This module provides the logic for connecting to a MongoDB database using Mongoose.
 * It establishes a connection to the database, sets the 'strictQuery' option for Mongoose, 
 * and ensures the database connection is closed when the process exits.
 * 
 * @module database
 */
const connect = async () => {
  await mongoose.connect(process.env.DB_URI)
  return mongoose.connection
}

/**
 * Disconnects from the MongoDB database when the process exits.
 * 
 * This event listener listens for the 'exit' event on the process, and when the process 
 * terminates, it disconnects from the MongoDB database and logs a message indicating 
 * that the database has been disconnected.
 * 
 * @event process.exit
 */
process.on('exit', () => {
  mongoose.disconnect()
  console.log('Database disconnected')
})

export default connect


