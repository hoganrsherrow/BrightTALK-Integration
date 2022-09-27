# BrightTALK-Integration

## Accomplished So Far:
* Set up dev enironment.
* Established ```fetch``` to BrightTALK.
* Successfully parsed the XML data.
* XML data required an XML function (```document.evaluate()```) to retrieve relevant     information from attributes (such as ```href``` values) found within the feed element. Successfully passed fetched and parsed XML data into ```evaluate()``` function to retrieve node information. 
* Found work-around for NS Resolver to direct XPath to correct node. Retrieved ```href``` values for ```links``` under ```entry``` node.
* Accessed all ```href``` values that are attributes of ```links``` descended from ```entries```.


## Future Steps:
 * Target ```href``` values within ```<entry>``` tags with ```document.evaluate()``` to obtain webinar link, thumbnail, and preview.
 * Incorporate XML data into HTML div.
 * Style the section with XML data.


 ## Daily Screenshot
 * This image shows the href values logged to the console.
   ![day two image](./assets/img/day-2.PNG "Day Two")