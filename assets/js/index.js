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
        attributes.push(thisNode.textContent);
        console.log(thisNode.textContent);
    }
    console.log(attributes);
    createWebinarEl(attributes);
}

const createBtnEl = () => {
    let container = document.getElementById("brighttalk-container");
    let btn = document.createElement("div");
    btn.classList.add("fintalk-posts-load-more-wrap");
    btn.innerHTML = `
                    <a href="javascript:alert('I was clicked');" class="fintalk-posts-load-more wp-block-button__link">
                        <span class="fintalk-posts-load-more-loader" style="display: none;">
                            <img src="https://tipalti.com/wp-content/themes/tipalti_accelerated/images/spin1.jpeg" alt="The BrightTALK Webinars">
                        </span>
                        Load More
                    </a>
                `;
    container.appendChild(btn);
};


fetch("https://www.brighttalk.com/channel/19195/feed")
    .then(response => response.text())
    .then(str => new DOMParser().parseFromString(str, "text/xml"))
    .then(data => {
        console.log(data);
        return data.evaluate("//*[name()='entry'][position()<7]//*[name()='link']//@*[name()='href']", data, /*data.ownerDocument === null ? data.documentElement : data.ownerDocument.documentElement*/ null, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null)
    })
    .then(xPathResults => {
        console.log(xPathResults);
        createContainerRowEl();
        for (let i = 0; i < 6; i++) {
            getHref(xPathResults);
        };
        createBtnEl();
    });