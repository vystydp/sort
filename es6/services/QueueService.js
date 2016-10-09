/**
 * Created by anthrax on 10/8/16.
 */


export default class QueueService {

  constructor(){
    this._queue = {};
  }

  add(message){
    if(!this._queue[message.name]) {
      message.midPrice = [(message.bestBid + message.bestAsk) / 2];
    } else {
      message.midPrice = this._queue[message.name].midPrice.concat([(message.bestBid + message.bestAsk) / 2]);
    }
    this._queue[message.name] = message;
  }

  getData(){
    var values = [];
    for (var key in this._queue) { values.push(this._queue[key]);}
    return values;
  }

}