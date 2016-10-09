export default class QueueService {

  constructor(){
    this._queue = {};
    this._lock = false;
  }

  add(message){
    if(this._lock) {return false};
    if(!this._queue[message.name]) {
      message.midPrice = [(message.bestBid + message.bestAsk) / 2];
    } else {
      message.midPrice = this._queue[message.name].midPrice.concat([(message.bestBid + message.bestAsk) / 2]);
    }
    this._queue[message.name] = message;
  }

  /**
   * Set's the last priceMid value as first of new period
   */
  discartMidPrices(){
    this._lock = true;
    for (var key in this._queue) {
      let last = this._queue[key].midPrice.length -1;
      this._queue[key].midPrice = [this._queue[key].midPrice[last]];
    }
    this._lock = false;
  }

  getData(){
    var values = [];
    for (var key in this._queue) { values.push(this._queue[key]);}
    return values;
  }

}