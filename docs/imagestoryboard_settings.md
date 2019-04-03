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
  "mapmarker": "<svg><circle cx='9' cy='9' r='5' stroke='black' stroke-width='3' fill='lightblue' /></svg>",
  "fit": "fill",
  "panorzoom":"pan",
  "toggleoverlay": true
}</script>
<iiif-storyboard annotationlist="https://dnoneill.github.io/annotate/annotations/4665993-list.json"></iiif-storyboard>
