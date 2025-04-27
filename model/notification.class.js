import webpush from 'web-push';
import Error from './error.class.js';

/**
 * Class Notification.
 */
export default class Notification {

  constructor() {
    this.webpush = webpush;
    this.webpush.setVapidDetails(
      'mailto:contato@venith.com.br',
      process.env?.VAPID_PUBLIC_KEY,
      process.env?.VAPID_PRIVATE_KEY
    )
  }

  async send(params) {
    try {
      return await this.webpush.sendNotification(params?.subscription, JSON.stringify({
        title: params?.title,
        body: params?.body
      }))
    } catch(e) { 
      throw new Error(e.message)
    }
  }
  
}
  
  