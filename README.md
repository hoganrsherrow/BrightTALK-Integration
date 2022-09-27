# BrightTALK-Integration

## Accomplished So Far:
* Set up dev enironment.
* Established ```fetch``` to BrightTALK.
* Successfully parsed the XML data.
* XML data required an XML function (```document.evaluate()```) to retrieve relevant     information from attributes (such as ```href``` values) found within the feed element. Successfully passed fetched and parsed XML data into ```evaluate()``` function to retrieve node information. 
* Found work-around for NS Resolver to direct XPath to correct node. Retrieved ```href``` values for ```links``` under ```entry``` node.
* Accessed all ```href``` values that are attributes of ```links``` descended from ```entries```.
* Created ```createVideoEl()``` function to render webinar links with correct thumnail images.


## Future Steps:
 * move code from practice environment into dev enironement.
 * Mobile responsiveness
 * Style the section with XML data.
 * Make changes/updates if necessary.


 ## Daily Screenshot
 * This image shows the href values logged to the console and video links rendered as children of the body tag with correct thumbnails.
   ![day two image](./assets/img/day-3.PNG "Day Three")