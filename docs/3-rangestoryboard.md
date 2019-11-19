---
layout: page
title: Range Storyboard
permalink: /range/
---

<style>
code {
  word-wrap: break-word;
  white-space: normal;
}
</style>

| Props      | Values |
| ----------- | ----------- |
| **rangeurl** | URL for the range of annotations that are going to be loaded into the viewer.|
| styling | string structured styling. See [settings table](/iiif-annotation/storyboard/#settings) for more options |
| ws | link to web socket. Should have a wss:// or ws:/ preceding instead of https:// or http://. See [web sockets](#web-sockets) section about how to set up |

# Additional Icons
See [toolbar icon](/{{site.baseurl}}/storyboard/#toolbar-icons) table for other icons.

| Icon      | Keyboard Shortcut | Purpose |
| ----------- | ----------- | ----------- |
| <i class="fas fa-chevron-left"></i> | `alt+p`(window)/`option+p`(mac) or `alt+,`(windows)/`option+,`(mac) or  <code>alt+<i class="fas fa-arrow-left"></i></code>(window)/<code>option+<i class="fas fa-arrow-left"></i></code>(mac)| This will go to the next annotation in the list|
| <i class="fas fa-chevron-right"></i> | `alt+n`(window)/`option+n`(mac) or `alt+.`(windows)/`option+.`(mac) or  <code>alt+<i class="fas fa-arrow-right"></i></code>(window)/<code>option+<i class="fas fa-arrow-right"></i></code>(mac) | This will go to the previous annotation in the list|


<script src="{{site.url}}{{site.baseurl}}/latest/iiif-annotation.js"></script>
<link rel="stylesheet" type="text/css" href="{{site.url}}{{site.baseurl}}/latest/iiif-annotation.css">

```
<iiif-rangestoryboard rangeurl="https://tomcrane.github.io/iiif-collector/objects/longer-article.json"></iiif-rangestoryboard>
```
<iiif-rangestoryboard rangeurl="https://tomcrane.github.io/iiif-collector/objects/longer-article.json" styling="overlay"></iiif-rangestoryboard>

```
<iiif-rangestoryboard rangeurl="{{site.url}}{{site.baseurl}}/webannotations/range.json" styling="togglelayers: true;"></iiif-rangestoryboard>
```

<iiif-rangestoryboard rangeurl="{{site.baseurl}}/webannotations/range.json" styling="togglelayers: true;"></iiif-rangestoryboard>

## Notes about creating a range
- Currently the application expects that if the `canvases` field exists it is the same length as the annotation list.
- `canvases` is not a required field assuming the annotation already has the manifest defined in the annotation.
- Highest level `label` field is used for the title for each annotation.
