---
layout: page
title: Test
permalink: /test/
---

<script src="{{site.url}}{{site.baseurl}}/dist/iiif-annotation.js"></script>
<link rel="stylesheet" type="text/css" href="{{site.url}}{{site.baseurl}}/dist/iiif-annotation.css">
<form onsubmit="return loadanno(this)">
  Annotation url: <input type="annourl" name="annourl" id="annourl"><br>
  Manifest url (optional): <input type="manifesturl" name="manifesturl" id="manifesturl"><br>
  <select id="annotype">
  <option value="url">Single Annotation</option>
  <option value="list">Annotation List</option>
  </select>
  <select id="displaytype">
  <option value="storyboard">Storyboard</option>
  <option value="annotation">Annotation</option>
  </select>
  <input type="submit" value="Submit">
</form>
<div id="annotations"></div>
<script>
function loadanno(data){
  var annourl = document.getElementById('annourl').value
  var displaytype = document.getElementById('displaytype').value
  var annotype = document.getElementById('annotype').value
  var manifesturl = document.getElementById('manifesturl').value

  var html = `<iiif-${displaytype} annotation${annotype}="${annourl}"${manifesturl ? ` manifesturl=${manifesturl}` : ``}><iiif-${displaytype}>`
  document.getElementById("annotations").innerHTML = html
  console.log(document.getElementById("annotations"))
  return false;
}
</script>
