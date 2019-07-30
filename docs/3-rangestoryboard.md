---
layout: page
title: Range Storyboard
permalink: /range/
---

# Currently only available in latest version. This viewer is still in development.

<style>
code {
  word-wrap: break-word;
  white-space: normal;
}
</style>

| Props      | Values |
| ----------- | ----------- |
| **rangeurl** | URL for the range of annotations that are going to be loaded into the viewer.|
| styling | string structured styling. See [settings table](#settings) for more options |
| ws | link to web socket. Should have a wss:// or ws:/ preceding instead of https:// or http://. See [web sockets](#web-sockets) section about how to set up |

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
