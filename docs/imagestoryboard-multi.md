---
layout: page
title: Multi Storyboard Viewer
permalink: /multistoryboard/
---
<style>
code {
  word-wrap: break-word;
  white-space: normal;
}
</style>

This replaces the need for websockets for comparing two or more annotations. It works exactly the same as the [Storyboard]({{site.baseurl}}/storyboard) and has all the same settings. The bolded props are the only changes in regards to input.

| Props      | Values |
| ----------- | ----------- |
| **annotationurls** | Multiple Single Annotations separated by `;`. See "@type" or "type" in annotation. i.e. [https://dnoneill.github.io/annotate/annotations/segins-004-001.json](https://dnoneill.github.io/annotate/annotations/segins-004-001.json)|
| **annotationlists** | Multiple ListAnnotation or PageAnnotation separated by `;`. See "@type" or "type" in annotation. i.e. [https://dnoneill.github.io/annotate/annotations/segins-004-list.json](https://dnoneill.github.io/annotate/annotations/segins-004-list.json) |
| manifesturl | iiif manifest url, only required when annotation does not contain manifest |
| styling | string structured styling. See [settings table](#settings) for more options |
| ws | link to web socket. Should have a wss:// or ws:/ preceding instead of https:// or http://. See [web sockets](#web-sockets) section about how to set up |

# Important Notes on use
 * Annotations should be separated by a `;` in the props
 * Settings and ws are set the same way as in the storyboard
 * Annotation lists should be the same length; Otherwise some weird things can happen.
 * When clicking on the overlays they will go the same position on each image not the same annotation. This is a conscious choice to allow for comparison at a certain point.
 * Wait for all images to load before using the toolbar.

<script src="{{site.url}}{{site.baseurl}}/dist/iiif-annotation.js"></script>
<link rel="stylesheet" type="text/css" href="{{site.url}}{{site.baseurl}}/latest/iiif-annotation.css">

```
<iiif-multistoryboard annotationlists="{{site.url}}{{site.baseurl}}/webannotations/mc00084-001-te0159-000-001-0001-list.json;{{site.url}}{{site.baseurl}}/webannotations/ua023-015-003-bx0002-004-026-list.json"></iiif-multistoryboard>

```

<iiif-multistoryboard annotationlists="{{site.url}}{{site.baseurl}}/webannotations/mc00084-001-te0159-000-001-0001-list.json;{{site.url}}{{site.baseurl}}/webannotations/ua023-015-003-bx0002-004-026-list.json"></iiif-multistoryboard>
