---
layout: page
---
<script src="{{site.url}}{{site.baseurl}}/dist/annona.js"></script>
<link rel="stylesheet" type="text/css" href="{{site.url}}{{site.baseurl}}/dist/annona.css">

The text in the purple box is how the full text gets rendered in the page. This example shows the full text for [NC State University Nubian Message, April 25, 2002](https://d.lib.ncsu.edu/collections/catalog/nubian-message-2002-04-25/). The styling can be changed to meet user needs. This is just an example of one of the ways this type of scripting can be used with the library.

```
<div id="fulltext"></div>
<script>
for (var i=1; i<9; i++){
  document.getElementById("fulltext").innerHTML += (`<iiif-annotation annotationlist="https://ocr.lib.ncsu.edu/ocr/nu/nubian-message-2002-04-25_000${i}/nubian-message-2002-04-25_000${i}-annotation-list-paragraph.json" styling="text_only: true;"></iiif-annotation>`)
}
</script>
```
<div id="fulltext"></div>
<iiifannotation annotationlist="https://annotations.libcrowds.com/annotations/playbills-results/?page=0"></iiifannotation>
<script>
for (var i=1; i<9; i++){
  document.getElementById("fulltext").innerHTML += (`<iiif-annotation annotationlist="https://ocr.lib.ncsu.edu/ocr/nu/nubian-message-2002-04-25_000${i}/nubian-message-2002-04-25_000${i}-annotation-list-paragraph.json" styling="text_only: true;"></iiif-annotation>`)
}
</script>
