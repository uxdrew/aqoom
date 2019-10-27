(function() {
  function startup() {
    const urlParams = new URLSearchParams(window.location.search);
    const myParam = urlParams.get("token");
    getData();
  }

  function getData(token) {
    var request = new XMLHttpRequest();
    request.open("GET", "http://localhost:9000/getReceiptInfo", true);
    // request.open("POST", "/.netlify/functions/submitreceipt", true);
    request.send();
    request.onreadystatechange = function() {
      if (request.readyState == XMLHttpRequest.DONE) {
        var res = JSON.parse(request.responseText);
        console.log("Here is the lineitems", res.result.lineItems);
        buildTable(res.result.lineItems);
      }
    };
  }

  function buildTable(data) {
    data.forEach(item => {
      const tr = document.createElement("tr");
      const td = document.createElement("td");
      td.align = "left";
      const label = document.createElement("label");
      label.innerText = item.descClean;
      td.appendChild(label);
      const p = document.createElement("p");
      p.style = "font-size: 12px";
      p.innerHTML = item.desc;
      td.appendChild(p);
      tr.appendChild(td);
      const td2 = document.createElement("td");
      td2.innerHTML = "Fail";
      const td3 = document.createElement("td");
      const i = document.createElement("i");
      i.class = "fas fa-angle-right";
      td3.appendChild(i);
      tr.appendChild(td2);

      tr.appendChild(td3);
      document.getElementById("movie-table-custom").appendChild(tr);
    });
  }

  window.addEventListener("load", startup, false);
})();
