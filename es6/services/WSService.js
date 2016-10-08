/**
 * Created by anthrax on 10/4/16.
 */

export default class WSService {

  constructor(url) {
    this.client = Stomp.client(url)
  }

  setDebug(){
    this.client.debug = ((msg) => console.info(msg));
    return this;
  }

  connect(){
    return new Promise((resolve, reject) => {
      this.client.connect({}, (success) => resolve(success), (error) => reject(error));
    });
  }

  subscribe(channel, subscribeCallback) {
    this.client.subscribe(channel, subscribeCallback);
    return this;
  }


}