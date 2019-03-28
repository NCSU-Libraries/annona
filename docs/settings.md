---
permalink: /storyboard_settings/
---
<script src="{{site.url}}{{site.baseurl}}/dist/iiif-annotation.js"></script>
<link rel="stylesheet" type="text/css" href="{{site.url}}{{site.baseurl}}/dist/iiif-annotation.css">
<script id="config" type="application/json">{
  "autorun_onload":true,
  "autorun_interval": 4,
  "hide_toolbar": true,
  "fullpage": true,
  "hide_annocontrols": true,
  "mapmarker": "<svg><circle cx='12' cy='12' r='10' stroke='black' stroke-width='3' fill='red' /></svg> ",
  "fit": "fill",
  "panorzoom":"pan",
  "toggleoverlay": true
}</script>
<iiif-storyboard annotationlist="https://dnoneill.github.io/annotate/annotations/mc00084-001-te0159-000-001-0001-list.json"></iiif-storyboard>
