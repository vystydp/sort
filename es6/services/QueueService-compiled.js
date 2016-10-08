/**
 * Created by anthrax on 10/8/16.
 */

export default class QueueService {

  constructor() {
    this._queue = {};
  }

  add(message) {
    this._queue[message.name] = message;
  }

  getData() {
    values = [];
    for (var key in this._queue) {
      values.push(this._queue[key]);
    }
    return values;
  }

}

//# sourceMappingURL=QueueService-compiled.js.map