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

* A markdown unordered list which will be replaced with the ToC, excluding the "Contents header" from above
{:toc}
<script src="{{site.url}}{{site.baseurl}}/latest/annona.js"></script>
<link rel="stylesheet" type="text/css" href="{{site.url}}{{site.baseurl}}/latest/annona.css">
| Props      | Values |
| ----------- | ----------- |
| **rangeurl** | URL for the **range** of annotations **or** a **manifest** with at least one annotation link or embedded annotation. In the manifest annotations should be in the OtherContent (v2.0) or items (v3.0) field. that are going to be loaded into the viewer.|
| styling | string structured styling. See [settings table](/annona/storyboard/#settings) for more options |
| ws | link to web socket. Should have a wss:// or ws:/ preceding instead of https:// or http://. See [web sockets](#web-sockets) section about how to set up |

# Additional Icons
See [toolbar icon](/{{site.baseurl}}/storyboard/#toolbar-icons) table for other icons.

| Icon      | Keyboard Shortcut | Purpose |
| ----------- | ----------- | ----------- |
| <i class="fas fa-chevron-left"></i> | `alt+p`(window)/`option+p`(mac) or `alt+,`(windows)/`option+,`(mac) or  <code>alt+<i class="fas fa-arrow-left"></i></code>(window)/<code>option+<i class="fas fa-arrow-left"></i></code>(mac)| This will go to the next annotation in the list|
| <i class="fas fa-chevron-right"></i> | `alt+n`(window)/`option+n`(mac) or `alt+.`(windows)/`option+.`(mac) or  <code>alt+<i class="fas fa-arrow-right"></i></code>(window)/<code>option+<i class="fas fa-arrow-right"></i></code>(mac) | This will go to the previous annotation in the list|
| <i class="fas fa-book-open"></i>| `y`| Show the per page modal.|

## Manifest Examples

```
<iiif-rangestoryboard rangeurl="https://iiif.bodleian.ox.ac.uk/iiif/manifest/748a9d50-5a3a-440e-ab9d-567dd68b6abb.json" styling="overlaynext: true"></iiif-rangestoryboard>
```
**fols. 2b and 3a & fols. 32b and 33a are particularly cool**

<iiif-rangestoryboard rangeurl="https://iiif.bodleian.ox.ac.uk/iiif/manifest/748a9d50-5a3a-440e-ab9d-567dd68b6abb.json" styling="overlaynext: true"></iiif-rangestoryboard>


```
<iiif-rangestoryboard rangeurl="https://wd-image-positions.toolforge.org/iiif/Q64686074/P18/manifest.json"></iiif-rangestoryboard>
```
This manifest has only one annotation so it appears as a regular storyboard.

<iiif-rangestoryboard rangeurl="https://wd-image-positions.toolforge.org/iiif/Q64686074/P18/manifest.json"></iiif-rangestoryboard>



## Range Examples

```
<iiif-rangestoryboard rangeurl="https://tomcrane.github.io/iiif-collector/objects/longer-article.json"></iiif-rangestoryboard>
```
<iiif-rangestoryboard rangeurl="https://tomcrane.github.io/iiif-collector/objects/longer-article.json" styling="overlay"></iiif-rangestoryboard>

```
<iiif-rangestoryboard rangeurl="{{site.url}}{{site.baseurl}}/webannotations/range.json" styling="togglelayers: true;"></iiif-rangestoryboard>
```

<iiif-rangestoryboard rangeurl="{{site.baseurl}}/webannotations/range.json" styling="togglelayers: true;"></iiif-rangestoryboard>


## Custom List of storyboards
The range storyboard allows for you to create a list of custom storyboard and multistoryboards in a json. An example can be seen at the following url: [{{site.url}}{{site.baseurl}}/webannotations/storyboardlist.json]({{site.url}}{{site.baseurl}}/webannotations/storyboardlist.json).

An [empty template]({{site.url}}{{site.baseurl}}/webannotations/template.json) is avaliable.

The JSON should reflect the example in the link above.

```<iiif-rangestoryboard rangeurl="{{site.url}}{{site.baseurl}}/webannotations/storyboardlist.json"></iiif-rangestoryboard>```

<iiif-rangestoryboard rangeurl="{{site.baseurl}}/webannotations/storyboardlist.json"></iiif-rangestoryboard>


## Collection Examples
The range storyboard allows for you to load a IIIF collection into the viewer.

### National Gallery: Multiple nested Collection
```<iiif-rangestoryboard rangeurl="https://research.ng-london.org.uk/iiif-projects/json/ng-projects.json"></iiif-rangestoryboard>```

<iiif-rangestoryboard rangeurl="https://research.ng-london.org.uk/iiif-projects/json/ng-projects.json"></iiif-rangestoryboard>

### From the Page: Example of collections with Annotations

```<iiif-rangestoryboard rangeurl="https://fromthepage.com/iiif/collection/jeremiah-white-graves-diaries"></iiif-rangestoryboard>```

<iiif-rangestoryboard rangeurl="https://fromthepage.com/iiif/collection/jeremiah-white-graves-diaries"></iiif-rangestoryboard>


## Notes about creating a range
- Currently the application expects that if the `canvases` field exists it is the same length as the annotation list.
- `canvases` is not a required field assuming the annotation already has the manifest defined in the annotation.
- Highest level `label` field is used for the title for each annotation.
