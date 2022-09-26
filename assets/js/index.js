//console.log("Connected to ./assets/js/index.js");
const req = new XMLHttpRequest();

req.open('GET', 'https://www.brighttalk.com/channel/19195/feed', false);
req.send(null);

const xmlDoc = req.responseXML;
console.log(xmlDoc);

const nsResolver = xmlDoc.createNSResolver( xmlDoc.ownerDocument === null ? xmlDoc.documentElement : xmlDoc.ownerDocument.documentElement);

const titleIterator = xmlDoc.evaluate('//title', xmlDoc, nsResolver, XPathResult.ANY_TYPE, null);
console.log(titleIterator);
console.log(titleIterator.stringValue);

// fetch("https://www.brighttalk.com/channel/19195/feed")
//     .then(response => {
//         //console.log(response);
//         return response.text();
//     })
//     .then(str => {
//         //console.log(str);
//          return new DOMParser().parseFromString(str, "text/xml");
//     })
//     .then(data => {
//         createVideoEl(data);
//     });


   