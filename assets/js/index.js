// xml data is indexed at 1, not 0
let i = 1;

const createContainerRowEl = () => {
    let container = document.getElementById("brighttalk-container");
    let row = document.createElement("div");
    row.classList.add("tipalti_post_grid", "gallery-columns-3");
    row.id = "brighttalk-container-row";
    container.appendChild(row);
}

const createWebinarEl = (hrefArray) => {
    let container = document.getElementById("brighttalk-container-row");
    let webinar = document.createElement("div");
    webinar.classList.add("tipalti_grid_post_wrapper", "gallery-item");
    webinar.innerHTML = `
                        <a href="${hrefArray[0]}" target="_blank">
                            <div class="tipalti_grid_post">
                                <div class="tipalti_grid_post_thumbnail with-flip-mid-horiz">
                                    <img src="${hrefArray[1]}" srcset="${hrefArray[1]} 100w, ${hrefArray[2]} 640w" width="350" height="196.88" class="img-cover" loading="lazy" />
                                </div>
                            </div>
                        </a>
                    `;
    container.appendChild(webinar);
}


const getHref = (results) => {
    let attributes = [];
    for (let i = 0; i < 3; i++) {
        let thisNode = results.iterateNext();
        
        if(!thisNode.textContent) {
            console.log("null");
        } else {
            attributes.push(thisNode.textContent);
        }
        
    }
    //console.log(attributes);
    createWebinarEl(attributes);
}

const createBtnEl = () => {
    let container = document.getElementById("brighttalk-container");
    let btn = document.createElement("div");
    btn.classList.add("fintalk-posts-load-more-wrap");
    btn.innerHTML = `
                    <a href="javascript:getXmlData();" class="fintalk-posts-load-more wp-block-button__link" id="brighttalk-btn">
                        <span class="fintalk-posts-load-more-loader" style="display: none;">
                            <img src="https://tipalti.com/wp-content/themes/tipalti_accelerated/images/spin1.jpeg" alt="The BrightTALK Webinars">
                        </span>
                        Load More
                    </a>
                `;
    container.append(btn);
};

const getXmlData = () => {
    fetch("https://www.brighttalk.com/channel/19195/feed")
        .then(response => response.text())
        .then(str => new DOMParser().parseFromString(str, "text/xml"))
        .then(data => {
            //console.log(data);
            xPathResults = data.evaluate(`//*[name()='entry'][position() >= ${i} and not(position() > ${i + 5})]//*[name()='link']//@*[name()='href']`, data, null, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null);
            i += 6;
            return xPathResults;
        })
        .then(xPathResults => {
            //console.log(xPathResults);
            createContainerRowEl();
            for (let i = 0; i < 6; i++) {
                getHref(xPathResults);
            }
            let btn = document.getElementById("brighttalk-btn");
            if(!btn) {
                createBtnEl();
            }
        })
        .catch(err => console.log(err));
};

const entryCount = () => {
    fetch("https://www.brighttalk.com/channel/19195/feed")
    .then(response => response.text())
    .then(str => new DOMParser().parseFromString(str, "text/xml"))
    .then(data => {
        //console.log(data);
        let evalResult = data.evaluate(`count(//*[name()='entry'])`, data, null, XPathResult.NUMBER_TYPE, null);
        console.log(evalResult.numberValue);
        return evalResult.numberValue;
    });
}
console.log(entryCount());
getXmlData();
//createBtnEl();

/* 
Restructure fetch request to be function that executes on load and then on btn click. Can use i counter to keep track.
Potentially look at using iterateNext() instead of for loop in getXmlData()
so that you will not run into errors when trying to load more webinars. 

filter: none;

.img-cover {
    object-position: left;
}
*/