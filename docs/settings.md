---
permalink: /storyboard_settings/
---
<script src="https://unpkg.com/vue"></script>
<script src="{{site.url}}{{site.baseurl}}/dist/iiif-annotation.js"></script>
<link rel="stylesheet" type="text/css" href="{{site.url}}{{site.baseurl}}/dist/iiif-annotation.css">
<script id="config" type="application/json">{
  "autorun_onload":true,
  "autorun_interval": 4,
  "hide_toolbar": true,
  "fullpage": true,
  "hide_annocontrols": true
}</script>
<iiif-storyboard annotationlist="https://dnoneill.github.io/annotate/annotations/segins-004-list.json"></iiif-storyboard>
