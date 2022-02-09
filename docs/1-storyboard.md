---
layout: page
title: Storyboard Viewer
permalink: /storyboard/
---
<script src="{{site.url}}{{site.baseurl}}/latest/annona.js"></script>
<link rel="stylesheet" type="text/css" href="{{site.url}}{{site.baseurl}}/latest/annona.css">

<script src="{{site.url}}{{site.baseurl}}/tools/js/settings.js"></script>

<style>
code {
  word-wrap: break-word;
  white-space: normal;
}
</style>

* A markdown unordered list which will be replaced with the ToC, excluding the "Contents header" from above
{:toc}



# Props

| Props      | Values |
| ----------- | ----------- |
| annotationurl | URl to the annotation. i.e. [https://dnoneill.github.io/annotate/annotations/segins-004-001.json](https://dnoneill.github.io/annotate/annotations/segins-004-001.json)|
| annotationlist | **This has been moved to annotationurl. If you want to recreate the previous look of annotationurl that is now doable with the settings.** ListAnnotation or PageAnnotation. See "@type" or "type" in annotation. i.e. [https://dnoneill.github.io/annotate/annotations/segins-004-list.json](https://dnoneill.github.io/annotate/annotations/segins-004-list.json) |
| manifesturl | iiif manifest url, only required when annotation does not contain manifest |
| styling | string structured styling. See [settings table](#settings) for more options |
| ws | link to web socket. Should have a wss:// or ws:/ preceding instead of https:// or http://. See [web sockets](#web-sockets) section about how to set up |
| layers | String in JSON format. Required fields are 'label' and 'image'. Optional field of xywh. Read about what each of these are in the [Add custom layers](#add-custom-layers) section. |

# Getting started
In order to create any of the viewers listed on the website the following code needs to be added to an HTML file once.

```
<script src="{{site.url}}{{site.baseurl}}/dist/annona.js"></script>

<link rel="stylesheet" type="text/css" href="{{site.url}}{{site.baseurl}}/dist/annona.css">
```

Note: the annona.js and annona.css need to be loaded only once, no matter how many storyboards are loaded. Multiple storyboards can be loaded on one page with the `<iiif-storyboard>` tag. An example of this can be seen here: [annotation storyboards](https://dnoneill.github.io/annotate/storyboard). Be aware that the last annotation in a list of annotations will be the color to display on top. The colors for the annotation tag types will be randomly generated. To override these colors see [the CSS styling in the single annotation setting example](#single-annotation-setting).


## Building views
From there any of the tags built through the [Tag Builder]({{site.baseurl}}/tools/#/tag-builder/) or manually can be entered into a webpage. The Tag Builder provides a user interface for creating much of the code documented below. It also has all settings built into the interface.


# Default AnnotationList or AnnotationPage Storyboard example

The code below makes use of default without any overrides or CSS styling. <a href="https://ncsu-libraries.github.io/annona/tools/#/tag-builder/?url=https%3A%2F%2Fdnoneill.github.io%2Fannotate%2Fannotations%2Fwh234bz9013-0001-list.json&viewtype=iiif-storyboard&listtype=annotationurl&manifesturl=&settings=%7B%22tagscolor%22%3A%5B%7B%22tagvalue%22%3A%22%22,%22color%22%3A%22%23add8e6%22%7D%5D,%22additionalinfo%22%3A%22%22,%22overlaycolor%22%3A%22%23add8e6%22,%22activecolor%22%3A%22%2390ee90%22%7D&props=%7B%22layers%22%3A%5B%7B%22label%22%3A%22%22,%22xywh%22%3A%22%22,%22image%22%3A%22%22,%22section%22%3A%22%22,%22rotation%22%3A%22%22%7D%5D,%22images%22%3A%5B%5D%7D&css=%7B%22.content%22%3A%7B%22font-size%22%3A%22%22%7D,%22.annotation%22%3A%7B%22width%22%3A%22%22,%22height%22%3A%22%22,%22margin%22%3A%22%22%7D%7D" target="_blank">
View example below in Tag Builder</a>

```
<iiif-storyboard annotationurl="https://dnoneill.github.io/annotate/annotations/wh234bz9013-0001-list.json"></iiif-storyboard>
```

<div id="example">
<iiif-storyboard annotationurl="https://dnoneill.github.io/annotate/annotations/wh234bz9013-0001-list.json"></iiif-storyboard>
</div>

# Icons & Keyboard Shortcuts

| Icon      | Keyboard Shortcut(s) | Purpose |
| ----------- | ----------- | ----------- |
| <i class="fas fa-magic"></i> | `b` or `1` | This button will automatically go through all the annotations and the sections associated with the annotation until stopped. When it is running it will be replaced with <i class="fas fa-stop-circle"></i> icon until it is pressed again. |
|<i class="fas fa-info-circle"></i> | `i` or `2` | This button will display a list of the annotations available. It also displays manifest metadata if a manifest is provided. Also it will show specialized information loaded through the settings. <i class="fas fa-file-alt"></i> will appear when an annotation is clicked and will toggle back to the annotation. <i class="fas fa-window-close"></i> will appear when no annotation is clicked and will close the box. |
| <i class="fas fa-tag"></i> | `t` or `3` | This button will display all of the tags in the storyboard and allow the users to view overlays based on tags. It works with resources with multiple tags, however they will display on top of each other so only one color is visible at one time. <i class="fas fa-file-alt"></i> will appear when an annotation is clicked and will toggle back to the annotation. <i class="fas fa-window-close"></i> will appear when no annotation is clicked and will close the box. |
| <i class="fas fa-toggle-on"></i> | `o` or `4` | This button will display the sections that are annotated. When toggled on, these sections are clickable. It is replaced with <i class="fas fa-toggle-off"></i> when the toggle is active |
| <i class="fas fa-layer-group"></i> | `l` or `5` | This button will show the layers available, allow for toggling them and changing the opacity on the layers. <i class="fas fa-file-alt"></i> will appear when an annotation is clicked and will toggle back to the annotation. <i class="fas fa-window-close"></i> will appear when no annotation is clicked and will close the box. |
| <i class="fas fa-search-plus"></i><i class="fas fa-search-minus"></i> | `z` or `+` or <code>shift+<i class="fas fa-arrow-up"></i></code> (zoom in), `m` or `-` or <code>shift+<i class="fas fa-arrow-down"></i></code>(zoom out) | Zoom in/out buttons |
| <i class="fas fa-home"></i> | `h` or `0` | This button shows the full image, if an image is zoomed in, it will resize the image to the view on the original load. |
| <i class="fa fa-arrow-left"></i><i class="fa fa-arrow-right"></i> | `p` or `,` or <code>shift+<i class="fas fa-arrow-left"></i></code>(previous), `n` or `.` or <code>shift+<i class="fas fa-arrow-right"></i></code> (next)| These buttons allow users to scroll through annotations. They will be red when they have reached the end or beginning of the list. |
| <i class="fas fa-expand"></i> | `alt+f`(windows)/`option+f`(mac) or `;`| Will make viewer fullscreen, switches to <i class="fas fa-compress"></i> when full screen. |
| <i class="fas fa-times"></i> | `x`, `6` | Will close the content box. Make sure to navigate to the viewer to use keyboard shortcuts.|
| <i class="fas fa-caret-up"></i> <i class="fas fa-caret-down"></i> (<i class="fas fa-caret-left"></i> <i class="fas fa-caret-right"></i> with collapse setting)| `c`, `7`| Will truncate the length of the annotation. Make sure to navigate to the viewer to use keyboard shortcuts.|
| <i class="fas fa-keyboard"></i> | `s`, `8` | Will show keyboard shortcuts |
| OpenSeadragon viewer | [https://openseadragon.github.io/examples/ui-keyboard-navigation/](https://openseadragon.github.io/examples/ui-keyboard-navigation/) | The OpenSeadragon viewer also has keyboard navigation (the image section of the storyboard). See webpage for keyboard navigation like rotate and flip |

# Settings
This code is also customizable. Adding a configuration section to the code will provide options. The full page setting only works for one storyboard. An example can be seen here: [all settings example]({{site.baseurl}}/storyboard_settings). The example has set almost all options. They are interchangeable, any combination will work. They only need to be set if you would like to change the default settings. The code and options can be seen below. Like the image viewer these settings can be set for a single storyboard or all storyboards on a page.

Additionally each storyboard viewer has CSS that can be individually customized. The overlay color is set to lightblue on load and a lightgreen outline will appear inside the overlay when annotation is being viewed. This can easily be customized to each viewer. See [Single annotation settings](#single-annotation-setting) for an example.
<annona-settings type="iiifstoryboard"></annona-settings>

## Global Settings
Item here: [global settings example]({{site.baseurl}}/storyboard_settings)
```
<script src="{{site.url}}{{site.baseurl}}/dist/annona.js"></script>
<link rel="stylesheet" type="text/css" href="{{site.url}}{{site.baseurl}}/dist/annona.css">

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
  "textposition": "right",
  "tts": "en",
  "hide_tags":true
}</script>
<iiif-storyboard annotationurl="https://dnoneill.github.io/annotate/annotations/4058a628-c593-463e-9736-8a821e178fee-list.json"></iiif-storyboard>
```
## Single annotation setting
Annotation settings can be set inline. Additionally colors can be changed using CSS styling. The code below makes use of default without any overrides or CSS styling. <a href="https://ncsu-libraries.github.io/annona/tools/#/tag-builder/?url=https%3A%2F%2Fncsu-libraries.github.io%2Fannona%2Fwebannotations%2Fmc00084-001-te0159-000-001-0001-list.json&viewtype=iiif-storyboard&listtype=annotationurl&manifesturl=&settings=%7B%22tagscolor%22%3A%5B%7B%22tagvalue%22%3A%22standing%22,%22color%22%3A%22green%22%7D,%7B%22tagvalue%22%3A%22demolished%22,%22color%22%3A%22red%22%7D%5D,%22additionalinfo%22%3A%22%22,%22overlaycolor%22%3A%22orange%22,%22activecolor%22%3A%22yellow%22,%22fit%22%3A%22fill%22,%22panorzoom%22%3A%22pan%22,%22toggleoverlay%22%3Atrue,%22textposition%22%3A%22left%22,%22mapmarker%22%3A%22%3Csvg%20width%3D%5C%2220%5C%22%20height%3D%5C%2220%5C%22%3E%3Ccircle%20cx%3D%5C%2210%5C%22%20cy%3D%5C%2210%5C%22%20r%3D%5C%228%5C%22stroke%3D%5C%22black%5C%22%20stroke-width%3D%5C%223%5C%22%20%2F%3E%3C%2Fsvg%3E%22,%22tts%22%3A%22it-IT%22,%22truncate_length%22%3A%225%22,%22startenddisplay%22%3A%22info%22,%22title%22%3A%22Example%20custom%20title%22%7D&props=%7B%22layers%22%3A%5B%7B%22label%22%3A%22%22,%22xywh%22%3A%22%22,%22image%22%3A%22%22,%22section%22%3A%22%22,%22rotation%22%3A%22%22%7D%5D,%22images%22%3A%5B%5D%7D&css=%7B%22.content%22%3A%7B%22font-size%22%3A%22%22%7D,%22.annotation%22%3A%7B%22width%22%3A%22%22,%22height%22%3A%22%22,%22margin%22%3A%22%22%7D%7D" target="_blank">
View example below in Tag Builder</a>

```
<div id="anno1" title="example info">
This is an example of the info that is loaded.
</div>
<iiif-storyboard annotationurl="https://ncsu-libraries.github.io/annona/webannotations/mc00084-001-te0159-000-001-0001-list.json" styling="fit: fill; panorzoom: pan; toggleoverlay: true; textposition: left; mapmarker: <svg width='20' height='20'><circle cx='10' cy='10' r='8' stroke='black' stroke-width='3' /></svg>; tts:it-IT; truncate_length: 5; additionalinfo: anno1; startenddisplay: info; title: Example custom title; tagscolor: {'standing': 'green', 'demolished': 'red'}; overlaycolor: orange; activecolor: yellow;"></iiif-storyboard>
```
<div id="anno1" title="example info">
This is an example of the info that is loaded.
</div>
<iiif-storyboard annotationurl="https://ncsu-libraries.github.io/annona/webannotations/mc00084-001-te0159-000-001-0001-list.json" styling="fit: fill; panorzoom: pan; toggleoverlay: true; textposition: left; mapmarker: <svg width='20' height='20'><circle cx='10' cy='10' r='8' stroke='black' stroke-width='3' /></svg>; tts:it-IT; truncate_length: 5; additionalinfo: anno1; startenddisplay: info; title: Example custom title; tagscolor: {'standing': 'green', 'reactor': 'blue', 'demolished': 'red'}; overlaycolor: orange; activecolor: yellow;"></iiif-storyboard>

# AnnotationList or AnnotationPage Storyboard with Multiple languages
W3 standards allow for transitions between multiple bodies [https://www.w3.org/TR/annotation-model/#choice-between-bodies](https://www.w3.org/TR/annotation-model/#choice-between-bodies). The assumption is only one body is used at a time. This library supports this model. The assumption this library makes is that the changes are between different languages which are defined in ISO standard in the annotation. An example of this can be seen in the storyboard below. <a href="https://ncsu-libraries.github.io/annona/tools/#/tag-builder/?url=https%3A%2F%2Fncsu-libraries.github.io%2Fannona%2Fwebannotations%2Fannotationslist.json&viewtype=iiif-storyboard&listtype=annotationurl&manifesturl=&settings=%7B%22tagscolor%22%3A%5B%7B%22tagvalue%22%3A%22%22,%22color%22%3A%22%23add8e6%22%7D%5D,%22additionalinfo%22%3A%22%22,%22overlaycolor%22%3A%22%23add8e6%22,%22activecolor%22%3A%22%2390ee90%22%7D&props=%7B%22layers%22%3A%5B%7B%22label%22%3A%22%22,%22xywh%22%3A%22%22,%22image%22%3A%22%22,%22section%22%3A%22%22,%22rotation%22%3A%22%22%7D%5D,%22images%22%3A%5B%5D%7D&css=%7B%22.content%22%3A%7B%22font-size%22%3A%22%22%7D,%22.annotation%22%3A%7B%22width%22%3A%22%22,%22height%22%3A%22%22,%22margin%22%3A%22%22%7D%7D" target="_blank">
View example below in Tag Builder</a>

<iiif-storyboard annotationurl="/annona/webannotations/annotationslist.json" styling="tts:true"></iiif-storyboard>


# Manifests with layers
Some manifests define multiple images for a "canvas" allowing for images to be placed on top of each other. Three examples of annotations created on manifests with layers can be seen below. The layers can be toggled using the <i class="fas fa-layer-group"></i> button.

 ```
<iiif-storyboard annotationurl="https://dnoneill.github.io/annotate/annotations/cdm17272contentdmoclcorg-14057-list.json"></iiif-storyboard>
 ```

 <a href="https://ncsu-libraries.github.io/annona/tools/#/tag-builder/?url=https://dnoneill.github.io/annotate/annotations/cdm17272contentdmoclcorg-14057-list.json&viewtype=iiif-storyboard&listtype=annotationurl&manifesturl=&settings=%7B%22tagscolor%22%3A%5B%7B%22tagvalue%22%3A%22%22,%22color%22%3A%22%23add8e6%22%7D%5D,%22additionalinfo%22%3A%22%22,%22overlaycolor%22%3A%22%23add8e6%22,%22activecolor%22%3A%22%2390ee90%22%7D&props=%7B%22layers%22%3A%5B%7B%22label%22%3A%22%22,%22xywh%22%3A%22%22,%22image%22%3A%22%22,%22section%22%3A%22%22,%22rotation%22%3A%22%22%7D%5D,%22images%22%3A%5B%5D%7D&css=%7B%22.content%22%3A%7B%22font-size%22%3A%22%22%7D,%22.annotation%22%3A%7B%22width%22%3A%22%22,%22height%22%3A%22%22,%22margin%22%3A%22%22%7D%7D" target="_blank">
 View example below in Tag Builder</a>


<iiif-storyboard annotationurl="https://dnoneill.github.io/annotate/annotations/cdm17272contentdmoclcorg-14057-list.json"></iiif-storyboard>


```
<iiif-storyboard annotationurl="https://dnoneill.github.io/annotate/annotations/4490-canvas-981394-list.json"></iiif-storyboard>
```
<a href="https://ncsu-libraries.github.io/annona/tools/#/tag-builder/?url=https://dnoneill.github.io/annotate/annotations/4490-canvas-981394-list.json&viewtype=iiif-storyboard&listtype=annotationurl&manifesturl=&settings=%7B%22tagscolor%22%3A%5B%7B%22tagvalue%22%3A%22%22,%22color%22%3A%22%23add8e6%22%7D%5D,%22additionalinfo%22%3A%22%22,%22overlaycolor%22%3A%22%23add8e6%22,%22activecolor%22%3A%22%2390ee90%22%7D&props=%7B%22layers%22%3A%5B%7B%22label%22%3A%22%22,%22xywh%22%3A%22%22,%22image%22%3A%22%22,%22section%22%3A%22%22,%22rotation%22%3A%22%22%7D%5D,%22images%22%3A%5B%5D%7D&css=%7B%22.content%22%3A%7B%22font-size%22%3A%22%22%7D,%22.annotation%22%3A%7B%22width%22%3A%22%22,%22height%22%3A%22%22,%22margin%22%3A%22%22%7D%7D" target="_blank">
View example below in Tag Builder</a>

<iiif-storyboard annotationurl="https://dnoneill.github.io/annotate/annotations/4490-canvas-981394-list.json"></iiif-storyboard>

# Add custom layers
This allows for layers to be created without having to define the layers in a manifest. In order to add custom layers (no limit to number) a JSON object has to be set for the `layers` property. For ease of use I would suggest replacing fields in the example below. The `label` fields defines what will show up in the layer controller. This can be HTML as in the example below. The `image` field should be a IIIF image in info.json format. See [https://iiif.io/api/image/2.1/#image-information-request-uri-syntax](https://iiif.io/api/image/2.1/#image-information-request-uri-syntax) for more information on this format. The `xywh` field defines how the image gets layered on top of the top image. It should be four numbers separated with commas and no whitespace. In order they are x coordinate, y coordinate, width and height. Width is the measurement used to calculate the height, so figuring out the height is not necessary. In the example below the overlaid image is larger than the annotated image so xywh is set to 185,180,4750,6513. This means the image is moved down by 180 and to the right by 185 and the width of the image is set to 4750. `rotation` is the rotation of the overlaid image, the rotation is clockwise. `section` allows for a section of the image you have inputed.

**Note: In order to determine the `xywh` and `section` fields try using any of the cropping tools listed on the [Awesome IIIF list.](https://github.com/IIIF/awesome-iiif#image-tools)**

```
<iiif-storyboard annotationurl="https://dnoneill.github.io/annotate/annotations/131424-list.json" layers="[{'label':'<a href=\'https://www.wikidata.org/wiki/Q4792194\'>View from Arles</a>', 'xywh': '200,200,4750,6513', 'image':'https://tools.wmflabs.org/zoomviewer/proxy.php?iiif=Van_Gogh_-_Weizenfeld_mit_Blick_auf_Arles.jpeg/info.json'}]"></iiif-storyboard>
```

<a href="https://ncsu-libraries.github.io/annona/tools/#/tag-builder/?url=https%3A%2F%2Fdnoneill.github.io%2Fannotate%2Fannotations%2F131424-list.json&viewtype=iiif-storyboard&listtype=annotationurl&manifesturl=&settings=%7B%22tagscolor%22%3A%5B%7B%22tagvalue%22%3A%22%22,%22color%22%3A%22%23add8e6%22%7D%5D,%22additionalinfo%22%3A%22%22,%22overlaycolor%22%3A%22%23add8e6%22,%22activecolor%22%3A%22%2390ee90%22,%22transcription%22%3Afalse%7D&props=%7B%22layers%22%3A%5B%7B%22label%22%3A%22%3Ca%20href%3D%5C%22https%3A%2F%2Fwww.wikidata.org%2Fwiki%2FQ4792194%5C%22%3EView%20from%20Arles%3C%2Fa%3E%22,%22xywh%22%3A%22200,200,4750,6513%22,%22image%22%3A%22https%3A%2F%2Ftools.wmflabs.org%2Fzoomviewer%2Fproxy.php%3Fiiif%3DVan_Gogh_-_Weizenfeld_mit_Blick_auf_Arles.jpeg%2Finfo.json%22,%22section%22%3A%22%22,%22rotation%22%3A%22%22%7D%5D,%22images%22%3A%5B%5D%7D&css=%7B%22.content%22%3A%7B%22font-size%22%3A%22%22%7D,%22.annotation%22%3A%7B%22width%22%3A%22%22,%22height%22%3A%22%22,%22margin%22%3A%22%22%7D%7D" target="_blank">View example below in Tag Builder</a>

<iiif-storyboard annotationurl="https://dnoneill.github.io/annotate/annotations/131424-list.json" layers="[{'label':'<a href=\'https://www.wikidata.org/wiki/Q4792194\'>View from Arles</a>', 'xywh': '200,200,4750,6513', 'image':'https://tools.wmflabs.org/zoomviewer/proxy.php?iiif=Van_Gogh_-_Weizenfeld_mit_Blick_auf_Arles.jpeg/info.json'}]"></iiif-storyboard>

```
<iiif-storyboard annotationurl="https://dnoneill.github.io/annotate/annotations/mc00084-001-te0159-000-001-0001-list.json" layers="[{'label':'Harrelson Hall', 'xywh': '4400,1300,3000,3000', 'image':'https://iiif.lib.ncsu.edu/iiif/0003310/info.json', 'section':'0,2952,2500,1696'}, {'label':'D.H. Hill Jr. Library', 'xywh': '3700,400,3000,3000', 'image':'https://iiif.lib.ncsu.edu/iiif/0003310/info.json', 'section':'0,384,6430,2500', 'rotation': 352}]" styling="togglelayers: true; customid: customlayers"></iiif-storyboard>
```

<iiif-storyboard annotationurl="https://dnoneill.github.io/annotate/annotations/mc00084-001-te0159-000-001-0001-list.json" layers="[{'label':'Harrelson Hall', 'xywh': '4400,1300,3000,3000', 'image':'https://iiif.lib.ncsu.edu/iiif/0003310/info.json', 'section':'0,2952,2500,1696'}, {'label':'D.H. Hill Jr. Library', 'xywh': '3700,400,3000,3000', 'image':'https://iiif.lib.ncsu.edu/iiif/0003310/info.json', 'section':'0,384,6430,2500', 'rotation': 352}]" styling="togglelayers: true; customid: customlayers"></iiif-storyboard>

# Transcription

## No settings enabled

```
<iiif-storyboard annotationurl="{{site.url}}{{site.baseurl}}/webannotations/4665993.json"></iiif-storyboard>
```
<iiif-storyboard annotationurl="{{site.url}}{{site.baseurl}}/webannotations/4665993.json"></iiif-storyboard>


## Transcription setting only
```
<iiif-storyboard annotationurl="{{site.url}}{{site.baseurl}}/webannotations/4665993.json" styling="transcription: true;customid:transcriptionsetting"></iiif-storyboard>
```
<iiif-storyboard annotationurl="{{site.url}}{{site.baseurl}}/webannotations/4665993.json" styling="transcription: true;customid:transcriptionsetting"></iiif-storyboard>

## Transcription with text first
```
<iiif-storyboard annotationurl="{{site.url}}{{site.baseurl}}/webannotations/4665993.json" styling="transcription: true;textfirst: true; customid:textfirstsetting"></iiif-storyboard>
```
<iiif-storyboard annotationurl="{{site.url}}{{site.baseurl}}/webannotations/4665993.json" styling="transcription: true;textfirst: true; customid:textfirstsetting"></iiif-storyboard>


# Web sockets
Web sockets allow for communication across websites. In order to use this functionality a server will first need to be set up. An example of an easy server can be found here: [https://github.com/dnoneill/sample-websocket](https://github.com/dnoneill/sample-websocket). All this server is doing is receiving a broadcast from the controller and sending it back to all storyboards connected to the server. If you already have your own server the only listener you will need to know is below.
  ```
  socket.on('broadcast', (message) => {
    socket.broadcast.emit('message', message);
  });
  ```

In order to instantiate a controller the server url should be loaded into the storyboard. See the example below on how to instantiate the controller.

```
<iiif-storyboard ws="wss://websocketserver" annotationurl="https://dnoneill.github.io/annotate/annotations/wh234bz9013-0001-list.json" styling="controller: true;"></iiif-storyboard>
```

Another instance can be loaded in another webpage if a "receiver" is needed. This is not required. If you open the controller in multiple webpages they will mirror each other across devices. The reason for adding a receiver is to be able to customize the look and stop actions from being reflected back to all other pages.
```
<iiif-storyboard ws="wss://websocketserver" annotationurl="https://dnoneill.github.io/annotate/annotations/wh234bz9013-0001-list.json"></iiif-storyboard>
```
An example of the web sockets in use can be seen in the video below. The window on the far left has an instantiated item on a server and is a receiver (controller has not been set in settings). The two windows next to it are the same URL and are the controllers. As you should be able to see from the video, the receiver can still navigate through the annotations but it will not affect the controllers. Additionally, on reload of the receiver the toolbar disappears. Like all aspects of the library elements can be hidden with the CSS functionality.

<video width="100%" controls>
  <source src="{{site.baseurl}}/videos/websockets.m4v" type="video/mp4">
</video>

The instantiated storyboards do not have to be the same object, however they should be the same number of annotations. The video below shows two different annotations list on the same page of the The Cantebury Tales but in different versions. **This can also now be done without websockets see [Multi Storyboard]({{site.baseurl}}/multistoryboard) for more info**

<video width="100%" controls>
  <source src="{{site.baseurl}}/videos/websockets2.m4v" type="video/mp4">
</video>

# Auto Language TTS example
This annotation has the language set for each of the annotations in the annotation list. This allows for the language to be set for TTS using the annotation data instead defining the language in the settings.

```
<iiif-storyboard annotationurl="https://dzkimgs.l.u-tokyo.ac.jp/iiif/zuzoubu/12b02/list/p0001-0025.json" manifesturl="https://dzkimgs.l.u-tokyo.ac.jp/iiif/zuzoubu/12b02/manifest.json" styling="tts:true"></iiif-storyboard>
```

<iiif-storyboard annotationurl="https://dzkimgs.l.u-tokyo.ac.jp/iiif/zuzoubu/12b02/list/p0001-0025.json" manifesturl="https://dzkimgs.l.u-tokyo.ac.jp/iiif/zuzoubu/12b02/manifest.json" styling="tts:true"></iiif-storyboard>

# Single Annotation Storyboard
**This functionality has been depracated but can be recreated by the use the settings below**

```
<iiif-storyboard annotationurl="https://dnoneill.github.io/annotate/annotations/qva4uqb6ncml7jyjq0er.json" styling="startposition: 1; toggleoverlay: true; hide_nextbuttons:true;"></iiif-storyboard>
```

<iiif-storyboard annotationurl="https://dnoneill.github.io/annotate/annotations/qva4uqb6ncml7jyjq0er.json" styling="startposition: 1; toggleoverlay: true;hide_nextbuttons:true;"></iiif-storyboard>
