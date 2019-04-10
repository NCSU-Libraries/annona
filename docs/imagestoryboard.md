---
layout: page
title: Storyboard Viewer
permalink: /storyboard/
---
<script src="{{site.url}}{{site.baseurl}}/dist/iiif-annotation.js"></script>
<link rel="stylesheet" type="text/css" href="{{site.url}}{{site.baseurl}}/dist/iiif-annotation.css">
<style>
code {
  word-wrap: break-word;
}
</style>

* A markdown unordered list which will be replaced with the ToC, excluding the "Contents header" from above
{:toc}

# Props

| Props      | Values |
| ----------- | ----------- |
| annotationurl | Single Annotation. See "@type" or "type" in annotation. i.e. [https://dnoneill.github.io/annotate/annotations/segins-004-1.json](https://dnoneill.github.io/annotate/annotations/segins-004-1.json)|
| annotationlist | ListAnnotation or PageAnnotation. See "@type" or "type" in annotation. i.e. [https://dnoneill.github.io/annotate/annotations/segins-004-list.json](https://dnoneill.github.io/annotate/annotations/segins-004-list.json) |
| manifesturl | iiif manifest url, only required when annotation does not contain manifest |
| styling | string structured styling. See [settings table](#settings) for more options |


# AnnotationList or AnnotationPage Storyboard

In order to create the viewer below the following four lines of code need to be entered into any html page.

Note: the iiif-annotation.js and iiif-annotation.css need to be loaded only once, no matter how many storyboards are loaded. Multiple storyboards can be loaded on one page with the `<iiif-storyboard>` tag. An example of this can be seen here: [annotation storyboards](https://dnoneill.github.io/annotate/storyboard).

```
<script src="{{site.url}}{{site.baseurl}}/dist/iiif-annotation.js"></script>
<link rel="stylesheet" type="text/css" href="{{site.url}}{{site.baseurl}}/dist/iiif-annotation.css">

<iiif-storyboard annotationlist="https://dnoneill.github.io/annotate/annotations/segins-004-list.json"></iiif-storyboard>
```

<div id="example">
<iiif-storyboard annotationlist="https://dnoneill.github.io/annotate/annotations/segins-004-list.json"></iiif-storyboard>
</div>

# Settings
This code is also customizable. Adding a configuration section to the code will provide options. The full page setting only works for one storyboard. An example can be seen here: [all settings example]({{site.baseurl}}/storyboard_settings). The example has set all options. They are interchangeable, any combination will work. They only need to be set if you would like to change the default settings. Otherwise the variable does not need to be set. The code and options can be seen below. Like the image viewer these settings can be set on a single item as well.

Additionally each of these viewer's CSS can be individually customized. The overlay color is set to lightblue on load and lightgreen when annotation is being viewed. This can easily be customized to each viewer. See [Single annotation settings](#single-annotation-setting) for an example.

| Variable      | Settings |
| ----------- | ----------- |
| autorun_interval   | number between switches in seconds, e.g. 4 will switch between annotations every four seconds; **Default** is 3 seconds. |
|autorun_onload | **true** or **false**. Will start autorun on page load. **Default** is false.      |
| hide_toolbar   | **true** or **false**. This will only hide the toolbar when the storyboard is full screen. In order to exit from full screen without the toolbar hit escape key (<kbd>esc</kbd>). **Default** is false. |
|fullpage|**true** or **false**. This will only fill the browser window. It will only work with a single storyboard. This will not display the storyboard full screen, due to permissions that has to be done by an operator. This will only fill the browser window. **Default** is false |
|hide_annocontrols| **true** or **false**. This setting hides <i class="fas fa-times close_button"></i> and <i class="fas fa-caret-square-up close_button"></i> in annotation box. **Default** is false |
| fit | By default the image is fit vertically to the OpenSeadragon viewer. The other option which can be set is to fill the viewer with the image. This can mean the full image is not visible. The value for this is **fill** |
| panorzoom | **pan**. By default when clicking or tabbing through annotations the viewer will zoom into the annotation area. This can also be set to "pan" which will keep the aspect ration and recenter the image to the clicked annotation |
| mapmarker | Any HTML object. When creating annotations with Mirador, if a pin is used the default view in the OpenSeadragon viewer is: <i class="fas fa-map-marker-alt"></i>. This can be overridden by entering new HTML for the map marker |
| toggleoverlay | **true** or **false**. By default this is **false** and the overlay is hidden unless toggled. This setting allows the overlay to be toggled on load |
| textposition | **top**, **bottom**, **right**, **left**. Will position to the left, right, bottom, or top of annotated area. By default this option is not instantiated and the annotation text appears in the top left hand corner of the viewer. Additional positioning can be done with CSS. Each option has a dedicated class based on the option name (.top, .right, etc.)|


## Global Settings
Item here: [all settings example]({{site.baseurl}}/storyboard_settings)
```
<script src="{{site.url}}{{site.baseurl}}/dist/iiif-annotation.js"></script>
<link rel="stylesheet" type="text/css" href="{{site.url}}{{site.baseurl}}/dist/iiif-annotation.css">

<script id="config" type="application/json">{
  "autorun_onload":true,
  "autorun_interval": 4,
  "hide_toolbar": true,
  "fullpage": true,
  "hide_annocontrols": true,
  "mapmarker": "<svg height='18' width='18'><circle cx='9' cy='9' r='5' stroke='black' stroke-width='3' fill='lightblue' /></svg>",
  "fit": "fill",
  "panorzoom":"pan",
  "toggleoverlay": true,
  "textposition": "right"
}</script>
<iiif-storyboard annotationlist="https://dnoneill.github.io/annotate/annotations/00000001jp2-list.json"></iiif-storyboard>
```
## Single annotation setting
```
<iiif-storyboard annotationlist="https://dnoneill.github.io/annotate/annotations/00000001jp2-list.json" styling="fit: fill; panorzoom: pan; toggleoverlay: true; textposition: left"></iiif-storyboard>

<style>
[id="\30 0000001jp2"] .box {
  border: 2px solid blue;
}

[id="\30 0000001jp2"] .mapmarker {
  color: blue;
  font-size: 39px;
}

[id="\30 0000001jp2"] .map-marker {
  position:absolute;
  bottom:0;
  left: calc(50% - 13px); //for the default map marker this should be the font-size/3;
}

[id="\30 0000001jp2"] .active.box {
  border: 2px solid red;
}

[id="\30 0000001jp2"] .active.mapmarker {
  color: red;
}

[id="\30 0000001jp2"] .mapmarker.overlay.active circle, rect {
  fill: red;
}

[id="\30 0000001jp2"] .left {
  margin-left: -1.5vw;
  margin-top: -4vh;
}
</style>
```
<iiif-storyboard annotationlist="https://dnoneill.github.io/annotate/annotations/00000001jp2-list.json" styling="fit: fill; panorzoom: pan; toggleoverlay: true; textposition: left"></iiif-storyboard>
<style>
[id="\30 0000001jp2"] .box {
  border: 2px solid blue;
}

[id="\30 0000001jp2"] .mapmarker {
  color: blue;
  font-size: 39px;
}

[id="\30 0000001jp2"] .map-marker {
  position:absolute;
  bottom:0;
  left: calc(50% - 13px);
}

[id="\30 0000001jp2"] .active.box {
  border: 2px solid red;
}

[id="\30 0000001jp2"] .active.mapmarker {
  color: red;
}

[id="\30 0000001jp2"] .mapmarker.overlay.active circle, rect {
  fill: red;
}

[id="\30 0000001jp2"] .left {
  margin-left: -1.5vw;
  margin-top: -4vh;
}
</style>

# Toolbar Icons

| Icon      | Purpose |
| ----------- | ----------- |
| <i class="fas fa-magic"></i>      | This button will automatically go through all the annotations and the sections associated with the annotation until stopped. When it is running it will be replaced with <i class="fas fa-stop-circle"></i> icon until it is pressed again       |
| <i class="fas fa-toggle-on"></i>   | This button will display the sections that are annotated. When toggled on, these sections are clickable. It is replaced with <i class="fas fa-toggle-off"></i> when the toggle is active |
| <i class="fas fa-search-plus"></i><i class="fas fa-search-minus"></i>   | Zoom in/out buttons |
| <i class="fas fa-home"></i>   | This button shows the full image, if an image is zoomed in, it will resize the image to the view on the original load |
| <i class="fa fa-arrow-left"></i><i class="fa fa-arrow-right"></i>   | These buttons allow users to scroll through annotations. They will be red when they have reached the end or beginning of the list |
| <i class="fas fa-expand"></i> | Will make viewer fullscreen, switches to <i class="fas fa-compress"></i> when full screen |

# Single Annotation Storyboard

This application also allows for a single annotation to be loaded in an OpenSeadragon viewer. In order to embed an storyboard viewer for a single annotation the code is below:

```
<script src="{{site.url}}{{site.baseurl}}/dist/iiif-annotation.js"></script>
<link rel="stylesheet" type="text/css" href="{{site.url}}{{site.baseurl}}/dist/iiif-annotation.css">
<iiif-storyboard annotationurl="https://dnoneill.github.io/annotate/annotations/segins-004-1.json"></iiif-storyboard>
```
<script src="{{site.url}}{{site.baseurl}}/dist/iiif-annotation.js"></script>
<link rel="stylesheet" type="text/css" href="{{site.url}}{{site.baseurl}}/dist/iiif-annotation.css">
<iiif-storyboard annotationurl="https://dnoneill.github.io/annotate/annotations/segins-004-1.json"></iiif-storyboard>
