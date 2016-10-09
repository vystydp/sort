import WSService from './services/WSService';
import BinaryHeap from './models/BinaryHeap';
import QueueService from './services/QueueService';
import DOMService from './services/DOMService';
import { WEBSOCKET_URL, DELAY, MIDPRICE_DELAY } from './consts';

const WebSocket = new WSService(WEBSOCKET_URL);
const dom = new DOMService();
const heap = new BinaryHeap(item => Math.abs(item.lastChangeBid));
const queue = new QueueService();

WebSocket.connect().then(success => WebSocket.subscribe('/fx/prices', message => queue.add(JSON.parse(message.body)))).catch(error => console.error(error));

//  renders table
window.setInterval(() => {
  var data = [];
  queue.getData().forEach(item => heap.push(item));
  while (heap.size() > 0) {
    data.push(heap.pop());
  }
  var tableEl = document.getElementById('currency-dashboard');
  let parentEl = tableEl.parentNode;
  parentEl.replaceChild(dom.tableCreate(data), tableEl);
}, DELAY); // 1000ms default by server

//  Remove mid prices history
window.setInterval(() => {
  queue.discartMidPrices();
}, MIDPRICE_DELAY);

//# sourceMappingURL=index-compiled.js.map