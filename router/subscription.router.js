import express from 'express';
import Subscription from '../model/subscription.class.js';
import Notification from '../model/notification.class.js';
import Error from '../model/error.class.js';

const router = express.Router()

router.post('/', async (req, res) => {
  try {
    const sub = new Subscription()
    return res.status(201).send(await sub.subscribe(req?.body))
  } catch (e) {
    console.log(e)
    res.status(500).send(new Error(e.message, e.code))
  }
})

export default router
