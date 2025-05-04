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
      const payload = JSON.stringify({
        notification: {
          title: params?.title,
          body: params?.body,
          data: {
            url: 'https://flicg.venith.com.br'
          },
          actions: [
            {
              action: "open",
              title: "Ver programação"
            }
          ]
        }
      })
      return await this.webpush.sendNotification(params?.subscription, payload)
    } catch(e) { 
      throw new Error(e.message)
    }
  }
  
}
  
  