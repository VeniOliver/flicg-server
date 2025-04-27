import Error from './error.class.js';
import Log from './log.class.js';
import validator from 'validator';
import Notification from './notification.class.js';
import SubscriptionDB from '../service/subscription.db.js';



/**
 * Class Subscription.
 */
export default class Subscription {

  constructor() {
    this.logs = []
    this.notification = new Notification()
  }


  set _name(name) {
    if (!name) throw new Error('Por favor, informe um nome.')
    this.name = name
  }

  set _email(email) {
    if (!validator.isEmail(email)) throw new Error('Por favor, informe um email válido.')
    this.email = email
  }

  set _subscription(subscription) {
    if (!subscription?.endpoint) throw new Error('Houve um erro na autorização das notificações, atualize a página e tente novamente.')
    this.subscription = subscription
  }

  set _events(events) {
    if (!events?.length) throw new Error('Por favor, selecione pelo menos um evento para acompanhar.')
    this.events = events
  }

  async subscribe(data) {
    try {
      // Set data properties
      this._name = data?.name
      this._email = data?.email
      this._subscription = data?.subscription
      this._events = data?.events
      // Verify duplicate
      const duplicate = await SubscriptionDB.find({email: this.email})
      if (duplicate?._id) {
        //update
        let update = await SubscriptionDB.findByIdAndUpdate(duplicate?._id, {$set: { name: this.name, email: this.email, events: this.events}})
        let notification = await this.notification.send({
          subscription: duplicate?.subscription, 
          title:`Cadastro atualizado, ${update?.name?.trim().split(' ')[0]}`,
          body: `Suas preferências no FLICG foram atualizadas com sucesso.`
        })
        console.log(notification)
        return
      }
      // Create a log entry
      this.logs.push(new Log('create'))
      //create
      let create = await SubscriptionDB.create(this)
      let notification = await this.notification.send({
        subscription: create?.subscription, 
        title: `Cadastro confirmado, ${create?.name?.trim().split(' ')[0]}`,
        body: `Você receberá atualizações do FLICG. Fique ligado(a)!`
      })
      console.log(notification)
      return
    } catch(e) { 
      throw new Error(e.message)
    }
  }

}

