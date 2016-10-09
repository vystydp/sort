export default class QueueService {

  constructor(){
    this._queue = {};
  }

  // todo: refactor expireTime marking
  add(message, now){
    if(!this._queue[message.name]) {
      now.setTime(now.getTime() + 10000);
      message.midPriceExpire = now;
      message.midPrice = [(message.bestBid + message.bestAsk) / 2];
    } else {
      message.midPriceExpire = this._queue[message.name].midPriceExpire;
      message.midPrice = this._queue[message.name].midPrice.concat([(message.bestBid + message.bestAsk) / 2]);
    }
    let currDateTime = new Date();
    if (message.midPriceExpire.getTime() < currDateTime.getTime()){
      message.midPriceExpire = currDateTime;
      message.midPrice = [(message.bestBid + message.bestAsk) / 2];
    }
    this._queue[message.name] = message;
  }

  getData(){
    var values = [];
    for (var key in this._queue) { values.push(this._queue[key]);}
    return values;
  }

}