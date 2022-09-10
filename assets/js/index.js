console.log("Connected to ./assets/js/index.js");

fetch("https://www.brighttalk.com/channel/19195/feed")
    .then(response => {
        console.log(`This is the response: ${response}`);
        return response.text();

    })
    .then(str => {
        console.log(`This is the string:  ${str}`);
         return new DOMParser().parseFromString(str, "text/xml");
    })
    .then(data => {
        console.log(data);
    });