---
layout: page
title: Storyboard Viewer
permalink: /storyboard/
---
<script src="https://unpkg.com/vue"></script>
<script src="{{site.baseurl}}/dist/iiif-annotation.js"></script>
<link rel="stylesheet" type="text/css" href="{{site.baseurl}}/dist/iiif-annotation.css">


In order to create the viewer above the following four lines of code need to be entered into any html page.
```
<script src="https://unpkg.com/vue"></script>
<script src="{{site.baseurl}}/dist/iiif-annotation.js"></script>
<link rel="stylesheet" type="text/css" href="{{site.baseurl}}/dist/iiif-annotation.css">

<iiif-storyboard annotationlist="https://dnoneill.github.io/annotate/annotations/segins-004-list.json"></iiif-storyboard>
```
Note: the vue, iiif-annotation.js and iiif-annotation.css need to be loaded only once, no matter how many storyboards are loaded. Multiple storyboards can be loaded on one page with the <iiif-storyboard> tag. An example of this can be seen here: [annotation storyboards](https://dnoneill.github.io/annotate/storyboard).

This code is also customizable. Adding a configuration section to the code will provide a full screen experience. The fullscreen experience only works for one storyboard, unlike the regular experience which allows multiple storyboards to be inserted into a page. An example can be seen here: [fullscreen example]({{site.baseurl}}/fullscreen). The example has all three options as true. They are interchangeable, any combination will work.


| Variable      | Settings |
| ----------- | ----------- |
| full_screen      | **true** or **false**       |
| autorun_interval   | number between switches in seconds, e.g. 3 will switch between annotations every three seconds|
| hide_toolbar   | **true** or **false** |

```
<script src="https://unpkg.com/vue"></script>
<script src="{{site.baseurl}}/dist/iiif-annotation.js"></script>
<link rel="stylesheet" type="text/css" href="{{site.baseurl}}/dist/iiif-annotation.css">
<script id="config" type="application/json">{
  "full_screen":true,
  "autorun_interval": 3,
  "hide_toolbar": true
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

<iiif-storyboard annotationlist="https://dnoneill.github.io/annotate/annotations/segins-004-list.json"></iiif-storyboard>
