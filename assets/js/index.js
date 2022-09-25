//console.log("Connected to ./assets/js/index.js");

// create html container for brightTalk
var documentBody = document.getElementsByTagName("body");
//console.log(documentBody[0]);
var brightTalkContainerEl = document.createElement("div");

// append container to body
documentBody[0].insertBefore(brightTalkContainerEl, documentBody[0].children[0]);

// insert video
function createVideoEl(data) {
    let videoContainer = document.querySelector("div");
    console.log(data);
    console.log(data.documentElement);
    console.log(data.documentElement.children);
    console.log(data.documentElement.children[5]);
    console.log(data.documentElement.children[5].href);
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
   