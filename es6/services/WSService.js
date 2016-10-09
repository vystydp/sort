export default class WSService {

  constructor(url) {
    this.client = Stomp.client(url);
    this.setDebug(false);
  }

  /** @returns WSService */
  setDebug(debug){
    this.client.debug = ((msg) => {if(debug)console.info(msg)});
    return this;
  }

  /** @returns Promise */
  connect(){
    return new Promise((resolve, reject) => {
      this.client.connect({}, (success) => resolve(success), (error) => reject(error));
    });
  }

  /** @returns WSService */
  subscribe(channel, subscribeCallback) {
    this.client.subscribe(channel, subscribeCallback);
    return this;
  }


}