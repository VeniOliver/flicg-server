import express from 'express';

const router = express.Router()

/**
 * Router default
 * 
 * This route handler responds with a message indicating that the application is online.
 * It uses the `process.env.APP_NAME` variable to dynamically insert the application name 
 * into the response message.
 * 
 * @route GET /
 * @returns {String} 200 - A message indicating that the application is online.
 */
router.get('/', (req, res) => {
  res.send(`${process.env.APP_NAME} is online.`)
})

export default router
