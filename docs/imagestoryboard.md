---
layout: page
title: Storyboard Viewer
permalink: /storyboard/
---
<script src="https://unpkg.com/vue"></script>
<script src="{{site.url}}{{site.baseurl}}/dist/iiif-annotation.js"></script>
<link rel="stylesheet" type="text/css" href="{{site.url}}{{site.baseurl}}/dist/iiif-annotation.css">


In order to create the viewer below the following four lines of code need to be entered into any html page.

Note: the vue, iiif-annotation.js and iiif-annotation.css need to be loaded only once, no matter how many storyboards are loaded. Multiple storyboards can be loaded on one page with the `<iiif-storyboard>` tag. An example of this can be seen here: [annotation storyboards](https://dnoneill.github.io/annotate/storyboard).

```
<script src="https://unpkg.com/vue"></script>
<script src="{{site.url}}{{site.baseurl}}/dist/iiif-annotation.min.js"></script>
<link rel="stylesheet" type="text/css" href="{{site.url}}{{site.baseurl}}/dist/iiif-annotation.css">

<iiif-storyboard annotationlist="https://dnoneill.github.io/annotate/annotations/segins-004-list.json"></iiif-storyboard>
```

<div id="example">
<iiif-storyboard annotationlist="https://dnoneill.github.io/annotate/annotations/segins-004-list.json"></iiif-storyboard>
</div>


This code is also customizable. Adding a configuration section to the code will provide options. The full page setting only works for one storyboard. An example can be seen here: [all settings example]({{site.baseurl}}/settings). The example has set all five options. They are interchangeable, any combination will work. They only need to be set if you would like to change the default settings. Otherwise the variable does not need to be set. The code and options can be seen below.

| Variable      | Settings |
| ----------- | ----------- |
| autorun_interval   | number between switches in seconds, e.g. 4 will switch between annotations every four seconds; **Default** is 3 seconds. |
|autorun_onload | **true** or **false**. Will start autorun on page load. **Default** is false.      |
| hide_toolbar   | **true** or **false**. This will only hide the toolbar when the storyboard is full screen. In order to exit from full screen without the toolbar hit escape key (<kbd>esc</kbd>). **Default** is false. |
|fullpage|**true** or **false**. This will only fill the browser window. It will only work with a single storyboard. This will not display the storyboard full screen, due to permissions that has to be done by an operator. This will only fill the browser window. **Default** is false |
|hide_annocontrols| **true** or **false**. This setting hides <i class="fas fa-times close_button"></i> and <i class="fas fa-caret-square-up close_button"></i> in annotation box. **Default** is false |

```
<script src="https://unpkg.com/vue"></script>
<script src="{{site.url}}{{site.baseurl}}/dist/iiif-annotation.min.js"></script>
<link rel="stylesheet" type="text/css" href="{{site.url}}{{site.baseurl}}/dist/iiif-annotation.css">
<script id="config" type="application/json">{
  "autorun_onload":true,
  "autorun_interval": 4,
  "hide_toolbar": true,
  "fullpage": true,
  "hide_annocontrols": true
}</script>
<iiif-storyboard annotationlist="https://dnoneill.github.io/annotate/annotations/segins-004-list.json"></iiif-storyboard>
```

| Icon      | Purpose |
| ----------- | ----------- |
| <i class="fas fa-magic"></i>      | This button will automatically go through all the annotations and the sections associated with the annotation until stopped. When it is running it will be replaced with <i class="fas fa-stop-circle"></i> icon until it is pressed again       |
| <i class="fas fa-toggle-on"></i>   | This button will display the sections that are annotated. When toggled on, these sections are clickable. It is replaced with <i class="fas fa-toggle-off"></i> when the toggle is active |
| <i class="fas fa-search-plus"></i><i class="fas fa-search-minus"></i>   | Zoom in/out buttons |
| <i class="fas fa-home"></i>   | This button shows the full image, if an image is zoomed in, it will resize the image to the view on the original load |
| <i class="fa fa-arrow-left"></i><i class="fa fa-arrow-right"></i>   | These buttons allow users to scroll through annotations. They will be red when they have reached the end or beginning of the list |
| <i class="fas fa-expand"></i> | Will make viewer fullscreen, switches to <i class="fas fa-compress"></i> when full screen |
