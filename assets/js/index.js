// xml data is indexed at 1, not 0
let recordedEventCount = 1;
let upcomingEventCount = 1;

const createContainerRowEl = (containerName) => {
    let container = document.getElementById(`${containerName}-container`);
    let row = document.createElement("div");
    row.classList.add("tipalti_post_grid", "gallery-columns-3");
    row.id = `${containerName}-container-row`;
    container.appendChild(row);
}

const createWebinarEl = (hrefArray, rowName, classIdentifier) => {
    let container = document.getElementById(`${rowName}-container-row`);
    let webinar = document.createElement("div");
    webinar.classList.add("tipalti_grid_post_wrapper", "gallery-item", classIdentifier);
    webinar.innerHTML = `
                        <a href="${hrefArray[0]}" target="_blank">
                            <div class="tipalti_grid_post">
                                <div class="tipalti_grid_post_thumbnail with-flip-mid-horiz">
                                    <img src="${hrefArray[1]}" srcset="${hrefArray[1]} 100w, ${hrefArray[2]} 640w" width="350" height="196.88" class="img-cover" loading="lazy" style="filter: none; object-position: left;" />
                                </div>
                            </div>
                        </a>
                    `;
    container.appendChild(webinar);
}


const getHref = (results, rowName, classIdentifier) => {
    let attributes = [];
    for (let i = 0; i < 3; i++) {
        let thisNode = results.iterateNext();
        if(thisNode) {
            attributes.push(thisNode.textContent);
        } else {
            let btn = document.getElementById(`${rowName}-btn`);
            btn.classList.add("invisible");
            // console.log("'Tis null.");
            return;
        }
        
        //console.log(thisNode.textContent);
    }
    //console.log(attributes);
    createWebinarEl(attributes, rowName, classIdentifier);
}

const createBtnEl = (containerName, functionCall) => {
    let container = document.getElementById(`${containerName}-container`);
    let btn = document.createElement("div");
    btn.classList.add("fintalk-posts-load-more-wrap");
    btn.innerHTML = `
                    <a href="javascript:${functionCall}();" class="fintalk-posts-load-more wp-block-button__link" id="${containerName}-btn" 
                    style="
                        background: #ffbd00;
                        color: #000;
                        text-align: center;
                        margin: 0 auto 20px;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        font-family: 'aktiv-grotesk';
                        font-weight: 700;
                        max-width: fit-content;
                        padding: 9px 27px;
                        font-size: 14px;
                        text-transform: uppercase;
                        line-height: 23.04px;
                        white-space: nowrap;
                        ">
                        <span class="fintalk-posts-load-more-loader" style="display: none;">
                            <img src="https://tipalti.com/wp-content/themes/tipalti_accelerated/images/spin1.jpeg" alt="${containerName} BrightTALK Webinars">
                        </span>
                        Load More
                    </a>
                `;
    container.append(btn);
};

const getDay = (date) => {
    switch(date.getDay()) {
        case 0:
            return "Sunday";
        case 1:
            return "Monday";
        case 2:
            return "Tuesday";
        case 3: 
            return "Wednesday";
        case 4: 
            return "Thursday";
        case 5:
            return "Friday";
        case 6:
            return "Saturday";
        default:
            break;
    }
}

const getMonth = (date) => {
    switch(date.getMonth()) {
        case 0:
            return "January";
        case 1:
            return "February";
        case 2: 
            return "March";
        case 3:
            return "April";
        case 4:
            return "May";
        case 5: 
            return "June";
        case 6:
            return "July";
        case 7:
            return "August";
        case 8: 
            return "September";
        case 9:
            return "October";
        case 10:
            return "November";
        case 11:
            return "December";
        default:
            break;
    }
};

// create dates for
const createDateEl = (milli) => {
    const d = new Date(milli);
    let container = document.getElementsByClassName("upcoming-webinars")[upcomingEventCount - 1];
    container.style.marginBottom = "3rem";
    let dateEl = document.createElement("div");
    dateEl.textContent = `${getDay(d)}, ${getMonth(d)} ${d.getDate()}, ${d.getFullYear()}`;
    dateEl.style.textAlign = "center";
    container.prepend(dateEl);
    return d;
};

const getUpcomingWebinarDates = () => {
    console.log("---getting dates---");
    fetch("https://www.brighttalk.com/channel/19195/feed")
        .then(response => response.text())
        .then(str => new DOMParser().parseFromString(str, "text/xml"))
        .then(data => {
            const nsResolver = (prefix) => {
                const ns = {
                    'myns': 'http://www.w3.org/2005/Atom',
                    'bt': 'http://brighttalk.com/2009/atom_extensions'
                }
                return ns[prefix] || null;
            };
            let xPathResults = data.evaluate(`//myns:entry[bt:status='upcoming'][position() >= ${upcomingEventCount} and not(position() > ${upcomingEventCount + 5})]//bt:start`, data, nsResolver, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null);
            return xPathResults;
        })
        .then(xPathResults => {
            console.log(xPathResults);
            for(let i = 0; i < 6; i++) {
                let thisNode = xPathResults.iterateNext();
                // console.log(i);
                // console.log(thisNode);
                // console.log(thisNode.textContent);
                createDateEl(thisNode.textContent * 1000);
                upcomingEventCount++;
            }
            
        })
}

const getUpcomingWebinars = () => {
    fetch("https://www.brighttalk.com/channel/19195/feed")
        .then(response => response.text())
        .then(str => new DOMParser().parseFromString(str, "text/xml"))
        .then(data => {
            // console.log(data);
            const nsResolver = (prefix) => {
                const ns = {
                    'myns': 'http://www.w3.org/2005/Atom',
                    'bt': 'http://brighttalk.com/2009/atom_extensions'
                }
                return ns[prefix] || null;
            };
            xPathResults = data.evaluate(`//myns:entry[bt:status='upcoming'][position() >= ${upcomingEventCount} and not(position() > ${upcomingEventCount + 5})]//myns:link//@href[..//@type!='text/calendar']`, data, nsResolver, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null);
            return xPathResults;
        })
        .then(xPathResults => {
            // console.log(xPathResults);
            createContainerRowEl("upcoming");
            for (let i = 0; i < 6; i++) {
                getHref(xPathResults, "upcoming", "upcoming-webinars");
            }
            let btn = document.getElementById("upcoming-btn");
            if(!btn) {
                createBtnEl("upcoming", "getUpcomingWebinars");
            }
            getUpcomingWebinarDates();
        })
        .catch(err => {
            console.log(err)
            let btn = document.getElementById("upcoming-btn");
            btn.classList.add("invisible");
        });
};

const getRecordedWebinars = () => {
    fetch("https://www.brighttalk.com/channel/19195/feed")
        .then(response => response.text())
        .then(str => new DOMParser().parseFromString(str, "text/xml"))
        .then(data => {
            //console.log(data);
            const nsResolver = (prefix) => {
                const ns = {
                    'myns': 'http://www.w3.org/2005/Atom',
                    'bt': 'http://brighttalk.com/2009/atom_extensions'
                }
                return ns[prefix] || null;
            };
            xPathResults = data.evaluate(`//myns:entry[bt:status='recorded'][position() >= ${recordedEventCount} and not(position() > ${recordedEventCount + 5})]//myns:link//@href[..//@type!='text/calendar']`, data, nsResolver, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null);
            recordedEventCount += 6;
            return xPathResults;
        })
        .then(xPathResults => {
            // console.log(xPathResults);
            createContainerRowEl("brighttalk");
            for (let i = 0; i < 6; i++) {
                getHref(xPathResults, "brighttalk", "recorded-webinars");
            }
            let btn = document.getElementById("brighttalk-btn");
            if(!btn) {
                createBtnEl("brighttalk", "getRecordedWebinars");
            }
        })
        .catch(err => {
            console.log(err)
            let btn = document.getElementById("brighttalk-btn");
            btn.classList.add("invisible");
        });
};

getUpcomingWebinars();
getRecordedWebinars();