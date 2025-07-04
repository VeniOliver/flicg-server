import Error from './error.class.js';
import Log from './log.class.js';
import EventDB from '../service/event.db.js';
import moment from 'moment-timezone';
import 'moment/locale/pt-br.js';

moment.locale('pt-br')


/**
 * Class Event.
 */
export default class Event {

  async find() {
    try {
      const result = await EventDB.aggregate([
        {
          $addFields: {
            dateOnly: {
              $dateToString: {
                format: "%Y-%m-%d",
                date: "$date",
              }
            }
          }
        },
        { $sort: { date: 1 } },
        {
          $group: {
            _id: { date: "$dateOnly", space: "$space" },
            activities: {
              $push: {
                _id: "$_id",
                title: "$title",
                date: "$date",
                space: "$space"
              }
            }
          }
        },
        {
          $group: {
            _id: "$_id.date",
            spaces: {
              $push: {
                name: "$_id.space",
                activities: "$activities"
              }
            }
          }
        },
        {
          $sort: { "_id": 1 }
        }
      ]);
  
      return result.map(day => ({
        date: moment(day._id).format('DD/MM'),
        day_of_week: moment(day._id).format('dddd'),
        spaces: day.spaces
          .sort((a, b) => a.name.localeCompare(b.name)) // ordena pelo nome
          .map(space => ({
            name: space.name,
            activities: space.activities.map(activity => ({
              _id: activity._id,
              time: moment(activity.date).format('HH:mm'),
              title: activity.title,
              date: moment(activity.date).toDate()
            }))
          }))
      }));
      
    } catch (e) {
      throw new Error(e.message);
    }
  }  

}

