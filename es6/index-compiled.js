/**
 * Created by anthrax on 10/4/16.
 */
import WSService from './services/WSService';
import BinaryHeap from './services/BinaryHeap';
import QueueService from './services/QueueService';
import { WEBSOCKET_URL, DELAY } from './consts';

var WebSocket = new WSService(WEBSOCKET_URL);
var heap = new BinaryHeap(item => Math.abs(item.lastChangeBid));
var queue = new QueueService();

// connect and subscribe
WebSocket.connect().then(success => WebSocket.subscribe('/fx/prices', message => queue.add(JSON.parse(message.body)))).catch(error => console.error(error));

window.setInterval(() => {
  var data = [];
  queue.getData().forEach(item => heap.push(item));
  while (heap.size() > 0) {
    data.push(heap.pop());
  }
  var appEl = document.getElementById('app');
  var table = "<table>content</table>";
  table += "";
  var mask = "<thead><tr><th>name</th><th>bestBid</th><th>bestAsk</th><th>openBid</th><th>lastChangeBid</th></tr>";
  data.forEach(item => {
    mask += '' + '<tr>' + ' <td>' + item.name + '</td> ' + ' <td>' + item.bestBid + '</td> ' + ' <td>' + item.bestAsk + '</td> ' + ' <td>' + item.openBid + '</td> ' + ' <td>' + item.lastChangeBid + '</td> ' + '</tr>';
  });
  appEl.innerHTML = table.replace('content', mask);
}, DELAY);

//# sourceMappingURL=index-compiled.js.map