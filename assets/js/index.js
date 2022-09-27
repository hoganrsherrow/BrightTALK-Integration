// const getHref = () => {
//     const entries = 
// }



fetch("https://www.brighttalk.com/channel/19195/feed")
    .then(response => response.text())
    .then(str => new DOMParser().parseFromString(str, "text/xml"))
    .then(data => {
        console.log(data);
        return data.evaluate("//*[name()='entry']//*[name()='link']//@*[name()='href']", data, /*data.ownerDocument === null ? data.documentElement : data.ownerDocument.documentElement*/null, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null)
    })
    .then(xmlDoc => {
        let thisNode = xmlDoc.iterateNext();
        while(thisNode) {
            console.log(thisNode.textContent);
            thisNode = xmlDoc.iterateNext();
        }
    });
    

/* data.documentElement contains entries.These entries hold the title, summary, thumbnail
   and video link. Look into using XML XPath to access the attributes of the XML elements.

    Accessing HREFs: /@*[name()='href']
*/
   