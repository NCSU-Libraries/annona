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
| images | Should be a IIIF info.json URL(s) separated by `;`. Images that can be loaded into the multi storyboard without annotations. This is useful for viewing the same image without having the annotate two or more images. |

# Important Notes on use
 * Annotations should be separated by a `;` in the props
 * Settings and ws are set the same way as in the storyboard
 * Annotation lists should be the same length; Otherwise some weird things can happen.
 * When clicking on the overlays they will go the same position on each image not the same annotation. This is a conscious choice to allow for comparison at a certain point.
 * Wait for all images to load before using the toolbar.

<script src="{{site.url}}{{site.baseurl}}/latest/iiif-annotation.js"></script>
<link rel="stylesheet" type="text/css" href="{{site.url}}{{site.baseurl}}/latest/iiif-annotation.css">

# Defaults
```
<iiif-multistoryboard annotationlists="{{site.url}}{{site.baseurl}}/webannotations/mc00084-001-te0159-000-001-0001-list.json;{{site.url}}{{site.baseurl}}/webannotations/ua023-015-003-bx0002-004-026-list.json"></iiif-multistoryboard>

```

<iiif-multistoryboard annotationlists="{{site.url}}{{site.baseurl}}/webannotations/mc00084-001-te0159-000-001-0001-list.json;{{site.url}}{{site.baseurl}}/webannotations/ua023-015-003-bx0002-004-026-list.json"></iiif-multistoryboard>

# With Images
This setting works similarly to layers in the storyboard viewer. This will load the image next to the annotation(s). **Note** The annotation is on the image [https://data.getty.edu/museum/api/iiif/366589/info.json](https://data.getty.edu/museum/api/iiif/366589/info.json) which has a width 5127 and height of 6513. The loaded image is [https://tools.wmflabs.org/zoomviewer/iipsrv.fcgi/?iiif=cache/8937e1777945b722457fac2cde0cf61b.tif/info.json](https://tools.wmflabs.org/zoomviewer/iipsrv.fcgi/?iiif=cache/8937e1777945b722457fac2cde0cf61b.tif/info.json) and has a width of 3864 and height of 5076. Due to the height differentials, zooming on the smaller image will move to a different section than the larger image. It can not be avoided but should be kept in mind when using this functionality.

```
<iiif-multistoryboard annotationlists="https://dnoneill.github.io/annotate/annotations/131424-list.json;" images="https://tools.wmflabs.org/zoomviewer/iipsrv.fcgi/?iiif=cache/8937e1777945b722457fac2cde0cf61b.tif/info.json;"></iiif-multistoryboard>
```

<iiif-multistoryboard annotationlists="https://dnoneill.github.io/annotate/annotations/131424-list.json;" images="https://tools.wmflabs.org/zoomviewer/iipsrv.fcgi/?iiif=cache/8937e1777945b722457fac2cde0cf61b.tif/info.json;"></iiif-multistoryboard>