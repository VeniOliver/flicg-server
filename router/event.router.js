import express from 'express';
import Event from '../model/event.class.js';
import Error from '../model/error.class.js';

const router = express.Router()

router.get('/', async (req, res) => {
  try {
    const event = new Event()
    return res.status(201).send(await event.find())
  } catch (e) {
    console.log(e)
    res.status(500).send(new Error(e.message, e.code))
  }
})

export default router
