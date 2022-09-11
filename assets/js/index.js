console.log("Connected to ./assets/js/index.js");

// create html container for brightTalk
var documentBody = document.getElementsByTagName("body");
console.log(documentBody[0]);
var brightTalkContainerEl = document.createElement("div");

// append container to body
documentBody[0].insertBefore(brightTalkContainerEl, documentBody[0].children[0]);

// insert video
function createVideoEl(data) {
    let videoContainer = document.querySelector("div");
    console.log(data.documentElement);
}


fetch("https://www.brighttalk.com/channel/19195/feed")
    .then(response => {
        return response.text();
    })
    .then(str => {
         return new DOMParser().parseFromString(str, "text/xml");
    })
    .then(data => {
        createVideoEl(data);
    });