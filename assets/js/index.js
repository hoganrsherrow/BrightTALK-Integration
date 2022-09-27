const getHref = (results) => {
    let attributes = [];
    for(let i = 0; i < 3; i++) {
        let thisNode = results.iterateNext();
        attributes.push(thisNode.textContent);
        console.log(thisNode.textContent);
    }
    console.log(attributes);
}



fetch("https://www.brighttalk.com/channel/19195/feed")
    .then(response => response.text())
    .then(str => new DOMParser().parseFromString(str, "text/xml"))
    .then(data => {
        console.log(data);
        return data.evaluate("//*[name()='entry'][position()<7]//*[name()='link']//@*[name()='href']", data, /*data.ownerDocument === null ? data.documentElement : data.ownerDocument.documentElement*/null, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null)
    })
    .then(xPathResults => {
        console.log(xPathResults);
        for(let i = 0; i < 6; i++) {
            getHref(xPathResults);
        }
    });
    

/* data.documentElement contains entries.These entries hold the title, summary, thumbnail
   and video link. Look into using XML XPath to access the attributes of the XML elements.

    Accessing HREFs: /@*[name()='href']
*/
   