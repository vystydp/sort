/**
 * Created by anthrax on 10/9/16.
 */


export default class DOMService {

  tableCreate(data) {
    let tbl = document.createElement('table');
    tbl.id = "currency-dashboard";
    let thd = document.createElement('thead');
    let thdTr = document.createElement('tr');
    let name = document.createElement('th');
    let bestBid = document.createElement('th');
    let bestAsk = document.createElement('th');
    let openBid = document.createElement('th');
    let lastChangeAsk = document.createElement('th');
    let lastChangeBid = document.createElement('th');
    let sparks = document.createElement('th');
    name.appendChild(document.createTextNode('name'));
    bestBid.appendChild(document.createTextNode('bestBid'));
    bestAsk.appendChild(document.createTextNode('bestAsk'));
    openBid.appendChild(document.createTextNode('openBid'));
    lastChangeAsk.appendChild(document.createTextNode('lastChangeAsk'));
    lastChangeBid.appendChild(document.createTextNode('lastChangeBid'));
    sparks.appendChild(document.createTextNode('midPrice'));
    thdTr.appendChild(name);
    thdTr.appendChild(bestBid);
    thdTr.appendChild(bestAsk);
    thdTr.appendChild(openBid);
    thdTr.appendChild(lastChangeAsk);
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
      let lastChangeAsk = document.createElement('td');
      let lastChangeBid = document.createElement('td');

      let sparklineTd = document.createElement('td');
      var sparkline = new Sparkline(sparklineTd, {'width': 200});
      sparkline.draw(item.midPrice);

      name.appendChild(document.createTextNode(item.name));
      bestBid.appendChild(document.createTextNode(item.bestBid));
      bestAsk.appendChild(document.createTextNode(item.bestAsk));
      openBid.appendChild(document.createTextNode(item.openBid));
      lastChangeAsk.appendChild(document.createTextNode(item.lastChangeAsk));
      lastChangeBid.appendChild(document.createTextNode(item.lastChangeBid));
      tr.appendChild(name);
      tr.appendChild(bestBid);
      tr.appendChild(bestAsk);
      tr.appendChild(openBid);
      tr.appendChild(lastChangeAsk);
      tr.appendChild(lastChangeBid);
      tr.appendChild(sparklineTd);
      tbdy.appendChild(tr);
    });
    tbl.appendChild(tbdy);
    return tbl;
  };
}