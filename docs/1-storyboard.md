---
layout: page
title: Storyboard Viewer
permalink: /storyboard/
---
<script src="{{site.url}}{{site.baseurl}}/latest/iiif-annotation.js"></script>
<link rel="stylesheet" type="text/css" href="{{site.url}}{{site.baseurl}}/dist/iiif-annotation.css">

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
| annotationurl | Single Annotation. See "@type" or "type" in annotation. i.e. [https://dnoneill.github.io/annotate/annotations/segins-004-001.json](https://dnoneill.github.io/annotate/annotations/segins-004-001.json)|
| annotationlist | ListAnnotation or PageAnnotation. See "@type" or "type" in annotation. i.e. [https://dnoneill.github.io/annotate/annotations/segins-004-list.json](https://dnoneill.github.io/annotate/annotations/segins-004-list.json) |
| manifesturl | iiif manifest url, only required when annotation does not contain manifest |
| styling | string structured styling. See [settings table](#settings) for more options |
| ws | link to web socket. Should have a wss:// or ws:/ preceding instead of https:// or http://. See [web sockets](#web-sockets) section about how to set up |
| layers | String in JSON format. Required fields are 'label' and 'image'. Optional field of xywh. Read about what each of these are in the [Add custom layers](#add-custom-layers) section. |

# Getting started
In order to create any of the viewers listed on the website the following code needs to be added to an HTML file once.

```
<script src="{{site.url}}{{site.baseurl}}/dist/iiif-annotation.js"></script>

<link rel="stylesheet" type="text/css" href="{{site.url}}{{site.baseurl}}/dist/iiif-annotation.css">
```

Note: the iiif-annotation.js and iiif-annotation.css need to be loaded only once, no matter how many storyboards are loaded. Multiple storyboards can be loaded on one page with the `<iiif-storyboard>` tag. An example of this can be seen here: [annotation storyboards](https://dnoneill.github.io/annotate/storyboard). Be aware that the last annotation in a list of annotations will be the color to display on top. The colors for the annotation tag types will be randomly generated. To override these colors see [the CSS styling in the single annotation setting example](#single-annotation-setting).


## Building views
From there any of the tags built through the [Tag Builder]({{site.baseurl}}/tag-builder/) or manually can be entered into a webpage. The Tag Builder provides a user interface for creating much of the code documented below. It also has all settings built into the interface.




# Default AnnotationList or AnnotationPage Storyboard example

The code below makes use of default without any overrides or CSS styling.
```
<iiif-storyboard annotationlist="https://dnoneill.github.io/annotate/annotations/wh234bz9013-0001-list.json"></iiif-storyboard>
```

<div id="example">
<iiif-storyboard annotationlist="https://dnoneill.github.io/annotate/annotations/wh234bz9013-0001-list.json"></iiif-storyboard>
</div>

# AnnotationList or AnnotationPage Storyboard with Multiple languages
W3 standards allow for transitions between multiple bodies [https://www.w3.org/TR/annotation-model/#choice-between-bodies](https://www.w3.org/TR/annotation-model/#choice-between-bodies). The assumption is only one body is used at a time. This library supports this model. The assumption this library makes is that the changes are between different languages which are defined in ISO standard in the annotation. An example of this can be seen in the storyboard below.

<iiif-storyboard annotationlist="/iiif-annotation/webannotations/annotationslist.json" styling="tts:true"></iiif-storyboard>

# Manifests with layers
Some manifests define multiple images for a "canvas" allowing for images to be placed on top of each other. Three examples of annotations created on manifests with layers can be seen below. The layers can be toggled using the <i class="fas fa-layer-group"></i> button.

```
<iiif-storyboard annotationlist="https://dnoneill.github.io/annotate/annotations/ba-obj-722-conservation-list.json"></iiif-storyboard>
```

<iiif-storyboard annotationlist="https://dnoneill.github.io/annotate/annotations/ba-obj-722-conservation-list.json"></iiif-storyboard>

 ```
<iiif-storyboard annotationlist="https://dnoneill.github.io/annotate/annotations/cdm17272contentdmoclcorg-14057-list.json"></iiif-storyboard>
 ```

<iiif-storyboard annotationlist="https://dnoneill.github.io/annotate/annotations/cdm17272contentdmoclcorg-14057-list.json"></iiif-storyboard>

```
<iiif-storyboard annotationlist="https://dnoneill.github.io/annotate/annotations/4490-canvas-981394-list.json"></iiif-storyboard>
```
<iiif-storyboard annotationlist="https://dnoneill.github.io/annotate/annotations/4490-canvas-981394-list.json"></iiif-storyboard>

# Add custom layers
This allows for layers to be created without having to define the layers in a manifest. In order to add custom layers (no limit to number) a JSON object has to be set for the `layers` property. For ease of use I would suggest replacing fields in the example below. The `label` fields defines what will show up in the layer controller. This can be HTML as in the example below. The `image` field should be a IIIF image in info.json format. See [https://iiif.io/api/image/2.1/#image-information-request-uri-syntax](https://iiif.io/api/image/2.1/#image-information-request-uri-syntax) for more information on this format. The `xywh` field defines how the image gets layered on top of the top image. It should be four numbers separated with commas and no whitespace. In order they are x coordinate, y coordinate, width and height. Width is the measurement used to calculate the height, so figuring out the height is not necessary. In the example below the overlaid image is larger than the annotated image so xywh is set to 185,180,4750,6513. This means the image is moved down by 180 and to the right by 185 and the width of the image is set to 4750. `rotation` is the rotation of the overlaid image, the rotation is clockwise. `section` allows for a section of the image you have inputed.

**Note: In order to determine the `xywh` and `section` fields try using any of the cropping tools listed on the [Awesome IIIF list.](https://github.com/IIIF/awesome-iiif#image-tools)**

```
<iiif-storyboard annotationlist="https://dnoneill.github.io/annotate/annotations/131424-list.json" layers="[{'label':'<a href=\'https://www.wikidata.org/wiki/Q4792194\'>View from Arles</a>', 'xywh': '200,200,4750,6513', 'image':'https://tools.wmflabs.org/zoomviewer/iipsrv.fcgi/?iiif=https://tools.wmflabs.org/zoomviewer/proxy.php?iiif=Van_Gogh_-_Weizenfeld_mit_Blick_auf_Arles.jpeg/info.json'}]"></iiif-storyboard>
```
<iiif-storyboard annotationlist="https://dnoneill.github.io/annotate/annotations/131424-list.json" layers="[{'label':'<a href=\'https://www.wikidata.org/wiki/Q4792194\'>View from Arles</a>', 'xywh': '200,200,4750,6513', 'image':'https://tools.wmflabs.org/zoomviewer/iipsrv.fcgi/?iiif=https://tools.wmflabs.org/zoomviewer/proxy.php?iiif=Van_Gogh_-_Weizenfeld_mit_Blick_auf_Arles.jpeg/info.json'}]"></iiif-storyboard>

```
<iiif-storyboard annotationlist="https://dnoneill.github.io/annotate/annotations/mc00084-001-te0159-000-001-0001-list.json" layers="[{'label':'Harrelson Hall', 'xywh': '4400,1300,3000,3000', 'image':'https://iiif.lib.ncsu.edu/iiif/0003310/info.json', 'section':'0,2952,2500,1696'}, {'label':'D.H. Hill Jr. Library', 'xywh': '3700,400,3000,3000', 'image':'https://iiif.lib.ncsu.edu/iiif/0003310/info.json', 'section':'0,384,6430,2500', 'rotation': 352}]" styling="togglelayers: true; customid: customlayers"></iiif-storyboard>
```

<iiif-storyboard annotationlist="https://dnoneill.github.io/annotate/annotations/mc00084-001-te0159-000-001-0001-list.json" layers="[{'label':'Harrelson Hall', 'xywh': '4400,1300,3000,3000', 'image':'https://iiif.lib.ncsu.edu/iiif/0003310/info.json', 'section':'0,2952,2500,1696'}, {'label':'D.H. Hill Jr. Library', 'xywh': '3700,400,3000,3000', 'image':'https://iiif.lib.ncsu.edu/iiif/0003310/info.json', 'section':'0,384,6430,2500', 'rotation': 352}]" styling="togglelayers: true; customid: customlayers"></iiif-storyboard>

# Settings
This code is also customizable. Adding a configuration section to the code will provide options. The full page setting only works for one storyboard. An example can be seen here: [all settings example]({{site.baseurl}}/storyboard_settings). The example has set almost all options. They are interchangeable, any combination will work. They only need to be set if you would like to change the default settings. The code and options can be seen below. Like the image viewer these settings can be set for a single storyboard or all storyboards on a page.

Additionally each storyboard viewer has CSS that can be individually customized. The overlay color is set to lightblue on load and a lightgreen outline will appear inside the overlay when annotation is being viewed. This can easily be customized to each viewer. See [Single annotation settings](#single-annotation-setting) for an example.

| Variable      | Settings |
| ----------- | ----------- |
| autorun_interval   | time between switches in seconds, e.g. 4 will switch between annotations every four seconds; **Default** is 3 seconds. |
|autorun_onload | **true** or **false**. Will start autorun on page load. **Default** is false.      |
| hide_toolbar   | **true** or **false**. This will only hide the toolbar. **Default** is false. |
|fullpage|**true** or **false**. This will only fill the browser window. It will only work with a single storyboard. This will not display the storyboard full screen, due to permissions that has to be done by an operator. This will only fill the browser window. **Default** is false |
|hide_annocontrols| **true** or **false**. This setting hides <i class="fas fa-times close_button"></i>, <i class="fas fa-caret-square-up close_button"></i> and any other icons in annotation box. **Default** is false |
| fit | By default the image is fit vertically to the OpenSeadragon viewer. The other options  are to fit horizontally or fill the viewer with the image. This can mean the full image is not visible. The options are **horizontal** and **fill** |
| panorzoom | **pan**. By default when clicking or tabbing through annotations the viewer will zoom into the annotated area. This can be set to "pan" which will keep the aspect ratio and recenter the image to the clicked annotation |
| mapmarker | Any HTML object. When creating annotations with Mirador, if a pin is used the default view in the OpenSeadragon viewer is: <i class="fas fa-map-marker-alt"></i>. This can be overridden by entering new HTML icon or SVG element for the map marker |
| toggleoverlay | **true** or **false**. By default this is **false** and the overlay is hidden unless toggled. This setting shows the overlays on load. |
| textposition | **top**, **bottom**, **right**, **left**. Will position to the left, right, bottom, or top of annotated area. By default this option is not instantiated and the annotation text appears in the top left hand corner of the viewer. Additional positioning can be done with CSS. Each option has a dedicated class based on the option name (.top, .right, etc.)|
| tts | **Any ISO language code**. This will provide text to speech for the annotation text content. It will only read the main content, not the tags or labels. If the language is set in the individual annotations it will set the language automatically and this can be set to **true** (see [Auto Language TTS example](#auto-language-tts-example)). A list of language codes can be found here: [http://www.lingoes.net/en/translator/langcode.htm](http://www.lingoes.net/en/translator/langcode.htm). If you are implementing autorun_onload and tts together it will not work in Chrome. It requires user activation (clicking the Auto Run button) to work in Chrome but should work fine in Safari and Firefox. It does not work with Internet Explorer. |
| truncate_length | **Any Integer.** By default it is set to **2**; This determines how many words appear when the hide button (<i class="fas fa-caret-up"></i>) is clicked. The hide button will only show words in the annotation and will truncate the annotation and hide the tags. If you are looking for a way to hide the tags listed in the annotation (not the tags button) add to css to `.tags {display: none;}` |
| additionalinfo | Is the id for an HTML object whose innerHTML will be loaded into the info tab. This HTML object should have a title tag. |
| startenddisplay | Choices are **'tags'** or **'info'**. By default the first and last items are the full image without a text box. This setting allows for the information or tags tab to be toggled at the first and last item. |
| controller | **true** or **false**. Should only be instantiated if property of `ws` is also used. Default is **false**. Sets the storyboard as being able to control other storyboards connected to the web socket server. |
| togglelayers |**true** or **false**. By default is **false**; shows all layers on load when set to true. |
| customid | **String**. If for some reason you would like to customize the identifier which gets automatically generated from the annotation filename use this setting. An example can be seen in the second storyboard in [add custom layers](#add-custom-layers). This setting is necessary if two storyboards with the same annotation get added to the same page. |
| imagecrop | **String**. X,Y,W,H coordinates on the image in the following format "x,y,w,h", e.g. "200,300,600,400". This will crop the image in the viewer. Make sure not to crop out any annotations you have created. **Only available in latest release** |
| title | **String**. Allows for a custom title to be placed in the info box. **Only available in latest release** |
| tagscolor | String in JSON format. Should have tag with corresponding color. Any CSS color can be used. i.e. `{'tag name': 'color', 'tag name 2': 'color2'}`. See [single annotation settings](#single-annotation-setting) for an example. |
|overlaycolor | change the overlay color; default is `#00bfff`. See [single annotation settings](#single-annotation-setting) for an example.|
| activecolor | change active color; default is `lightgreen`. See [single annotation settings](#single-annotation-setting) for an example. |
| hide_tagcount | **true** or **false**. Will hide the count number in the tag key. **Default** is **false** |
| annoview | **sidebyside** or **collapse**. Will change how the annotation and information box style. Collapse positions the box on top of the image viewer and allows for the bar to collapse. Side by side is similar but it is next to the viewer |   
| overlaynext | **true** or **false**. When the overlays are not toggled it will show the overlay for the active annotation only. **Default** is **false** |
| toolbarposition | **bottom**. Will move the toolbar to the bottom of the viewer. Default is the top of the viewer |
| hide_tagsbutton | **true** or **false**. By default is **false**; If there are tags in the annotations tags will be available for toggling based on tags. This will remove the icons in both toolbars. |
| hide_autorunbutton | **true** or **false**. By default is **false**; Will stop the autorun button from rendering and not allow the shortcuts to render. |
| hide_infobutton| **true** or **false**. By default is **false**; Will stop the info button from rendering and not allow the shortcuts to render. |
| hide_overlaybutton| **true** or **false**. By default is **false**; Will stop the overlay button from rendering and not allow the shortcuts to render. |
| hide_layersbutton | **true** or **false**. By default is **false**; Will stop the layers button from rendering and not allow the shortcuts to render. |
| hide_nextbuttons | **true** or **false**. By default is **false**; Will stop the previous and next buttons from rendering and not allow the shortcuts to render. |
| hide_fullscreenbutton | **true** or **false**. By default is **false**; Will stop the fullscreen button from rendering and not allow the shortcuts to render. |


## Web sockets
Web sockets allow for communication across websites. In order to use this functionality a server will first need to be set up. An example of an easy server can be found here: [https://github.com/dnoneill/sample-websocket](https://github.com/dnoneill/sample-websocket). All this server is doing is receiving a broadcast from the controller and sending it back to all storyboards connected to the server. If you already have your own server the only listener you will need to know is below.
  ```
  socket.on('broadcast', (message) => {
    socket.broadcast.emit('message', message);
  });
  ```

In order to instantiate a controller the server url should be loaded into the storyboard. See the example below on how to instantiate the controller.

```
<iiif-storyboard ws="wss://websocketserver" annotationlist="https://dnoneill.github.io/annotate/annotations/wh234bz9013-0001-list.json" styling="controller: true;"></iiif-storyboard>
```

Another instance can be loaded in another webpage if a "receiver" is needed. This is not required. If you open the controller in multiple webpages they will mirror each other across devices. The reason for adding a receiver is to be able to customize the look and stop actions from being reflected back to all other pages.
```
<iiif-storyboard ws="wss://websocketserver" annotationlist="https://dnoneill.github.io/annotate/annotations/wh234bz9013-0001-list.json"></iiif-storyboard>
```
An example of the web sockets in use can be seen in the video below. The window on the far left has an instantiated item on a server and is a receiver (controller has not been set in settings). The two windows next to it are the same URL and are the controllers. As you should be able to see from the video, the receiver can still navigate through the annotations but it will not affect the controllers. Additionally, on reload of the receiver the toolbar disappears. Like all aspects of the library elements can be hidden with the CSS functionality.

<video width="100%" controls>
  <source src="{{site.baseurl}}/videos/websockets.m4v" type="video/mp4">
</video>

The instantiated storyboards do not have to be the same object, however they should be the same number of annotations. The video below shows two different annotations list on the same page of the The Cantebury Tales but in different versions. **This can also now be done without websockets see [Multi Storyboard]({{site.baseurl}}/multistoryboard) for more info**

<video width="100%" controls>
  <source src="{{site.baseurl}}/videos/websockets2.m4v" type="video/mp4">
</video>

## Auto Language TTS example
This annotation has the language set for each of the annotations in the annotation list. This allows for the language to be set for TTS using the annotation data instead defining the language in the settings.

```
<iiif-storyboard annotationlist="https://dzkimgs.l.u-tokyo.ac.jp/iiif/zuzoubu/12b02/list/p0001-0025.json" manifesturl="https://dzkimgs.l.u-tokyo.ac.jp/iiif/zuzoubu/12b02/manifest.json" styling="tts:true"></iiif-storyboard>
```

<iiif-storyboard annotationlist="https://dzkimgs.l.u-tokyo.ac.jp/iiif/zuzoubu/12b02/list/p0001-0025.json" manifesturl="https://dzkimgs.l.u-tokyo.ac.jp/iiif/zuzoubu/12b02/manifest.json" styling="tts:true"></iiif-storyboard>

## Global Settings
Item here: [global settings example]({{site.baseurl}}/storyboard_settings)
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
  "textposition": "right",
  "tts": "en",
  "hide_tags":true
}</script>
<iiif-storyboard annotationlist="https://dnoneill.github.io/annotate/annotations/4058a628-c593-463e-9736-8a821e178fee-list.json"></iiif-storyboard>
```
## Single annotation setting
Annotation settings can be set inline. Additionally colors can be changed using CSS styling.
```
<div id="anno1" title="example info">
This is an example of the info that is loaded.
</div>
<iiif-storyboard annotationlist="https://dnoneill.github.io/annotate/annotations/mc00084-001-te0159-000-001-0001-list.json" styling="fit: fill; panorzoom: pan; toggleoverlay: true; textposition: left; mapmarker: <svg width='20' height='20'><circle cx='10' cy='10' r='8' stroke='black' stroke-width='3' /></svg>; tts:it-IT; truncate_length: 5; additionalinfo: anno1; startenddisplay: info; title: Example custom title; tagscolor: {'standing': 'green', 'reactor': 'blue', 'demolished': 'red'}; overlaycolor: orange; activecolor: yellow;"></iiif-storyboard>
```
<div id="anno1" title="example info">
This is an example of the info that is loaded.
</div>
<iiif-storyboard annotationlist="https://dnoneill.github.io/annotate/annotations/mc00084-001-te0159-000-001-0001-list.json" styling="fit: fill; panorzoom: pan; toggleoverlay: true; textposition: left; mapmarker: <svg width='20' height='20'><circle cx='10' cy='10' r='8' stroke='black' stroke-width='3' /></svg>; tts:it-IT; truncate_length: 5; additionalinfo: anno1; startenddisplay: info; title: Example custom title; tagscolor: {'standing': 'green', 'reactor': 'blue', 'demolished': 'red'}; overlaycolor: orange; activecolor: yellow;"></iiif-storyboard>

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
| OpenSeadragon viewer | [https://openseadragon.github.io/examples/ui-keyboard-navigation/](https://openseadragon.github.io/examples/ui-keyboard-navigation/) | The OpenSeadragon viewer also has keyboard navigation (the image section of the storyboard). See webpage for keyboard navigation like rotate and flip |


# Single Annotation Storyboard

This application also allows for a single annotation to be loaded in an OpenSeadragon viewer. In order to embed an storyboard viewer for a single annotation the code is below:

```
<iiif-storyboard annotationurl="https://dnoneill.github.io/annotate/annotations/qva4uqb6ncml7jyjq0er.json"></iiif-storyboard>
```

<iiif-storyboard annotationurl="https://dnoneill.github.io/annotate/annotations/qva4uqb6ncml7jyjq0er.json"></iiif-storyboard>
