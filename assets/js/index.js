fetch("https://www.brighttalk.com/channel/19195/feed")
    .then(response => response.text())
    .then(str => new DOMParser().parseFromString(str, "text/xml"))
    .then(data => {
        console.log(data);
        return data.evaluate("/*[name()='feed']/*[name()='entry']/*[name()='link']/@*[name()='href']", data, /*data.ownerDocument === null ? data.documentElement : data.ownerDocument.documentElement*/null, XPathResult.STRING_TYPE, null)
    })
    .then(xmlDoc => console.log(xmlDoc.stringValue));
    

/* data.documentElement contains entries.These entries hold the title, summary, thumbnail
   and video link. Look into using XML XPath to access the attributes of the XML elements.
*/
   