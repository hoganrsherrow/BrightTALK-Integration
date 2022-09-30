const createContainerRowEl = () => {
    let container = document.getElementById("brighttalk-container");
    let row = document.createElement("div");
    row.classList.add("tipalti_post_grid", "gallery-columns-3");
    row.id = "brighttalk-container-row";
    container.appendChild(row);
}

const createVideoEl = (hrefArray) => {
    let container = document.getElementById("brighttalk-container-row");
    let video = document.createElement("div");
    video.classList.add("col", "js-inview", "anim-slide-bottom"); 
    video.innerHTML = `
                        <div class="card card-hover"
                            <div class="card-img">
                                <div class="ratio ratio-16x9">
                                    <a href="${hrefArray[0]}" target="_blank">
                                        <img src="${hrefArray[1]}" srcset="${hrefArray[1]} 100w, ${hrefArray[2]} 640w" width="350" height="196.88" class="img-cover" loading="lazy" />
                                    </a>
                                </div>
                            </div>
                        </div>
                      `;
    container.appendChild(video);
}


const getHref = (results) => {
    let attributes = [];
    for(let i = 0; i < 3; i++) {
        let thisNode = results.iterateNext();
        attributes.push(thisNode.textContent);
        console.log(thisNode.textContent);
    }
    console.log(attributes);
    createVideoEl(attributes);
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
        createContainerRowEl();
        for(let i = 0; i < 6; i++) {
            getHref(xPathResults);
        }
    });
    

/* data.documentElement contains entries.These entries hold the title, summary, thumbnail
   and video link. Look into using XML XPath to access the attributes of the XML elements.

    Accessing HREFs: /@*[name()='href']
*/
   