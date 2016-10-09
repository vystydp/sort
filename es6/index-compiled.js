import WSService from './services/WSService';
import BinaryHeap from './models/BinaryHeap';
import QueueService from './services/QueueService';
import { WEBSOCKET_URL, DELAY } from './consts';
import { tableCreate } from './services/DOMService';

const WebSocket = new WSService(WEBSOCKET_URL);
const heap = new BinaryHeap(item => Math.abs(item.lastChangeBid));
const queue = new QueueService();

WebSocket.connect().then(success => WebSocket.subscribe('/fx/prices', message => queue.add(JSON.parse(message.body), new Date()))).catch(error => console.error(error));

window.setInterval(() => {
  var data = [];
  queue.getData().forEach(item => heap.push(item));
  while (heap.size() > 0) {
    data.push(heap.pop());
  }
  var tableEl = document.getElementById('currency-dashboard');
  let parentEl = tableEl.parentNode;
  parentEl.replaceChild(tableCreate(data), tableEl);
}, DELAY); // 1000ms default by server

//# sourceMappingURL=index-compiled.js.map