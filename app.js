import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import moment from 'moment-timezone';
import 'moment/locale/pt-br.js';

dotenv.config({
  silent: process.env.NODE_ENV === 'production'
})

import connect from './db.js';
import auth from './model/auth.class.js';
import DefaultRoutes from './router/default.router.js';
import SubscriptionRoutes from './router/subscription.router.js';
import EventRoutes from './router/event.router.js';
import Notification from './model/notification.class.js';
import SubscriptionDB from './service/subscription.db.js';
import EventDB from './service/event.db.js';
//connect to database
await connect()

async function notifyUpcomingEvents() {
  const notif = new Notification()

  const now = moment()?.utc().subtract(3, 'hours')
  const oneHourFromNow = moment().add(1, 'hour')?.utc()?.subtract(3, 'hours')

  const upcomingEvents = await EventDB.find({
    date: { $gte: now.toDate(), $lte: oneHourFromNow.toDate() }
  })

  console.log(upcomingEvents, now, oneHourFromNow)

  //2025-05-08T13:00:00.000+00:00

  for (const event of upcomingEvents) {
    const subscribers = await SubscriptionDB.find({
      "events._id": event._id?.toString()
    })

    console.log(subscribers)

    for (const subscriber of subscribers) {
      let payload = {
        subscription: subscriber.subscription, 
        title: `Lembrete: ${event.title}`,
        body: `Seu evento começa às ${moment(event.date).format('HH:mm')} em ${event.space}.`
      }
      try {
        //await notif.send(payload)
        console.log(`Notified: ${subscriber.email}`);
      } catch (err) {
        console.error(`Failed to notify ${subscriber.email}:`, err.message);
      }
    }
  }
}

// Schedule to run every 5 minutes
setInterval(notifyUpcomingEvents, 0.1 * 60 * 1000);


//function adjustDateMinus3Hours(isoString) {
//  const date = new Date(isoString);
//  date.setHours(date.getHours() - 3);
//  return date;
//}

//const notif = new Notification()
//const subscriptions = await SubscriptionDB.find()
//for (const sub of subscriptions) {
//  try {
//    let payload = {
//      subscription: sub?.subscription, 
//      title:`Olá ${sub?.name?.trim().split(' ')[0]}`,
//      body: `❤️ Obrigado por se inscrever!`
//    }
//    await notif.send(payload)
//    console.log('sucesso: ', sub?.name)
//  } catch(e) {
//    //console.log('erro: ', e, sub?.name)
//  }
//}

//create app
const app = express()
// adding Helmet to enhance your API's security
app.use(helmet())
// using bodyParser to parse JSON bodies into JS objects
app.use(bodyParser.json({limit: '5mb', extended: true}))
// enabling CORS
app.use(cors({
  origin: 'https://flicg.venith.com.br'
}))
//check api key
app.use(auth.apiKeyVerify)
//routers
app.use(DefaultRoutes)
app.use('/subscription', SubscriptionRoutes)
app.use('/event', EventRoutes)


export default app
