/**
 * Created by anthrax on 10/4/16.
 */
import WSService from './services/WSService';
import BinaryHeap from './services/BinaryHeap';
import QueueService from './services/QueueService';
import { WEBSOCKET_URL, DELAY, TABLE_HEAD_HTML } from './consts';

const WebSocket = new WSService(WEBSOCKET_URL);
const heap = new BinaryHeap(((item) => Math.abs(item.lastChangeBid)));
const queue = new QueueService();

var tableCreate = function(data) {
  let tbl = document.createElement('table');
  tbl.id = "currency-dashboard";
  let thd = document.createElement('thead');
  let thdTr = document.createElement('tr');
  let name = document.createElement('th');
  let bestBid = document.createElement('th');
  let bestAsk = document.createElement('th');
  let openBid = document.createElement('th');
  let lastChangeBid = document.createElement('th');
  let sparks = document.createElement('th');
  name.appendChild(document.createTextNode('name'));
  bestBid.appendChild(document.createTextNode('bestBid'));
  bestAsk.appendChild(document.createTextNode('bestAsk'));
  openBid.appendChild(document.createTextNode('openBid'));
  lastChangeBid.appendChild(document.createTextNode('lastChangeBid'));
  sparks.appendChild(document.createTextNode('sparks'));
  thdTr.appendChild(name);
  thdTr.appendChild(bestBid);
  thdTr.appendChild(bestAsk);
  thdTr.appendChild(openBid);
  thdTr.appendChild(lastChangeBid);
  thdTr.appendChild(sparks);
  thd.appendChild(thdTr);
  tbl.appendChild(thd);
  let tbdy = document.createElement('tbody');
  data.forEach((item) => {
    let tr = document.createElement('tr');
    let name = document.createElement('td');
    let bestBid = document.createElement('td');
    let bestAsk = document.createElement('td');
    let openBid = document.createElement('td');
    let lastChangeBid = document.createElement('td');

    let sparkline = document.createElement('td');
    var el = document.createElement('span');
    var sparkline1 = new Sparkline(sparkline, {'width': 200});
    sparkline1.draw(item.midPrice);
    if(item.name == "gbpjpy"){
      console.log(item.midPrice);
    }
    name.appendChild(document.createTextNode(item.name));
    bestBid.appendChild(document.createTextNode(item.bestBid));
    bestAsk.appendChild(document.createTextNode(item.bestAsk));
    openBid.appendChild(document.createTextNode(item.openBid));
    lastChangeBid.appendChild(document.createTextNode(item.lastChangeBid));
    tr.appendChild(name);
    tr.appendChild(bestBid);
    tr.appendChild(bestAsk);
    tr.appendChild(openBid);
    tr.appendChild(lastChangeBid);
    tr.appendChild(sparkline);
    tbdy.appendChild(tr);
  });
  tbl.appendChild(tbdy);
  return tbl;
};

// connect and subscribe
WebSocket
  .connect()
  .then((success) => WebSocket.subscribe('/fx/prices', (message) => queue.add(JSON.parse(message.body))))
  .catch((error) => console.error(error));

window.setInterval(() => {
  var data = [];
  queue.getData().forEach((item) => heap.push(item));
  while (heap.size() > 0) {data.push(heap.pop())}
  var tableEl = document.getElementById('currency-dashboard');
  let parentEl = tableEl.parentNode;
  parentEl.replaceChild(tableCreate(data), tableEl);
}, DELAY);




