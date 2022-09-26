//console.log("Connected to ./assets/js/index.js");

// Use document.evaluate() ref https://developer.mozilla.org/en-US/docs/Web/XPath/Introduction_to_using_XPath_in_JavaScript
//const xpathResult = document.evaluate();


// create html container for brightTalk
var documentBody = document.getElementsByTagName("body");
//console.log(documentBody[0]);
var brightTalkContainerEl = document.createElement("div");

// append container to body
documentBody[0].insertBefore(brightTalkContainerEl, documentBody[0].children[0]);

// insert video
function createVideoEl(data) {
    const resolver = () => {
        return 'http://www.w3.org/2005/Atom'
    }
    let videoContainer = document.querySelector("div");
    console.log(data);
    xmlDoc = data.documentElement
    console.log(xmlDoc);
    console.log(data.evaluate('//updated', data, resolver, XPathResult.ANY_TYPE, null));
    //console.log(data.documentElement.children);
    //console.log(data.documentElement.children[5]);
    //console.log(data.documentElement.children[5].href);
    videoContainer.innerHTML = data.documentElement.children;
}


fetch("https://www.brighttalk.com/channel/19195/feed")
    .then(response => {
        //console.log(response);
        return response.text();
    })
    .then(str => {
        //console.log(str);
         return new DOMParser().parseFromString(str, "text/xml");
    })
    .then(data => {
        createVideoEl(data);
    });

/* data.documentElement contains entries.These entries hold the title, summary, thumbnail
   and video link. Look into using XML XPath to access the attributes of the XML elements.
*/
   