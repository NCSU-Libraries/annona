---
permalink: /fullscreen/
---
<script src="https://unpkg.com/vue"></script>
<script src="{{site.baseurl}}/dist/iiif-annotation.js"></script>
<link rel="stylesheet" type="text/css" href="{{site.baseurl}}/dist/iiif-annotation.css">
<script id="config" type="application/json">{
  "full_screen":true,
  "autorun_interval": 3,
  "hide_toolbar": true
}</script>
<iiif-storyboard annotationlist="https://dnoneill.github.io/annotate/annotations/segins-004-list.json"></iiif-storyboard>
