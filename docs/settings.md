---
permalink: /settings/
---
<script src="https://unpkg.com/vue"></script>
<script src="{{site.baseurl}}/dist/iiif-annotation.min.js"></script>
<link rel="stylesheet" type="text/css" href="{{site.baseurl}}/dist/iiif-annotation.css">
<script id="config" type="application/json">{
  "autorun_onload":true,
  "autorun_interval": 4,
  "hide_toolbar": true,
  "fullpage": true,
  "hide_annocontrols": true
}</script>
<iiif-storyboard annotationlist="https://dnoneill.github.io/annotate/annotations/segins-004-list.json"></iiif-storyboard>
