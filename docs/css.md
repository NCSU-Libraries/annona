---
permalink: /css_settings/
title: Custom views
layout: default
---
* A markdown unordered list which will be replaced with the ToC, excluding the "Contents header" from above
{:toc}
These are some of the CSS styling I believe might be most requested for implementation. This is by no means an extensive list. View [the annotation css](https://github.com/NCSU-Libraries/annona/blob/master/src/annona.scss) for annotation specifics. Below there is a table with CSS. See [the css examples section](#examples) for examples of implementation.

# Selected CSS fields

| section | CSS attribute | defaults | mobile settings | fullpage settings | comments |
| ----------- | ----------- | ----------- |
| ![#storyboard_viewer]({{site.baseurl}}/images/storyboard_fullpage.png "#storyboard_viewer") | #storyboard_viewer | padding-bottom: 50px; position: relative; | none | none | This encompasses the entire view including the annotation. |
| ![.storyboard_viewer]({{site.baseurl}}/images/storyboard_fullpage.png ".storyboard_viewer") | .storyboard_viewer | padding-bottom: 50px; position: relative; | none | none | This encompasses the entire view including the annotation. Is the same element as #storyboard_viewer; this will change to fullscreen when toggled to fullpage or fullscreen. |
| ![.fullpage]({{site.baseurl}}/images/storyboard_fullpage.png ".fullpage") | .fullpage |  position: fixed; top: 0; bottom: 0; left: 0; right: 0; width: 100%; height: 100%; background: #000; border: 1px solid #000; z-index: 102; font-size: 30px; | none | none | This encompasses the entire view including the annotation. Is the same element as #storyboard_viewer; this will only be avaliable when toggled to fullpage or fullscreen. |
| ![.seadragonbox]({{site.baseurl}}/images/seadragonbox.png ".seadragonbox") | .seadragonbox | width: 100%; display: inline-block; height:600px; |  none | none | Child elements are the #header_toolbar and openseadragon element. This does not change any annotation css |
| ![#header_toolbar]({{site.baseurl}}/images/header_toolbar.png "#header_toolbar") | #header_toolbar | width: 100%; display: flex; | none | margin: 0px; | none |
| ![#autoRunButton]({{site.baseurl}}/images/autoRun.png "#autoRunButton") | #autoRunButton | none | none | none |to hide add display: none; to css |
| ![#infoButton]({{site.baseurl}}/images/info.png "#infoButton") | #infoButton | none | none | none |to hide add display: none; to css |
| ![#tagsButton]({{site.baseurl}}/images/tags.png "#tagsButton") | #tagsButton | none | none | none |to hide add display: none; to css |
| ![#overlayButton]({{site.baseurl}}/images/overlay.png "#overlayButton") | #overlayButton | none | none | none |to hide add display: none; to css |
| ![#zoomInButton]({{site.baseurl}}/images/zoomin.png "#zoomInButton") | #zoomInButton | none | none | none |to hide add display: none; to css |
| ![#zoomOutButton]({{site.baseurl}}/images/zoomout.png "#zoomOutButton") | #zoomOutButton | none | none | none |to hide add display: none; to css |
| ![#homeZoomButton]({{site.baseurl}}/images/zoomhome.png "#homeZoomButton") | #homeZoomButton | none | none | none |to hide add display: none; to css |
| ![#previousButton]({{site.baseurl}}/images/prev.png "#previousButton") | #previousButton | none | none | none |to hide add display: none; to css |
| ![#nextButton]({{site.baseurl}}/images/next.png "#nextButton") | #nextButton | none | none | none |to hide add display: none; to css |
| ![#fullScreenButton]({{site.baseurl}}/images/fullscreen.png "#fullScreenButton") | #fullScreenButton | none | none | none |to hide add display: none; to css |
| ![#infoButton]({{site.baseurl}}/images/info.png "#infoButton") | .toolbarButton | font-size: 1.5rem; background-color: #F0F0F0; border: 2px solid #D3D3D3; width: 100%; position: relative; margin-right: 2px; (except for last button) | margin: 0px!important; font-size: .79rem; | margin-right: 5px; (execept for last button)| This is the class on all the buttons, not just the info button |
| ![.annotation]({{site.baseurl}}/images/annotation.png ".annotation") | .annotation |  width: 20%; resize: both; border: 2px solid black; background: white; position: absolute; top: 75px; z-index: 2000; max-width: calc(100% - 20px); max-height: calc(100% - 75px); height: auto; overflow: scroll; margin-left: 20px; word-wrap: break-word;| width: calc(100% - 4px); resize: both; border: 2px solid black; background: white; position: absolute; font-size: 14px!important; top: calc(.79rem + 6px)!important; z-index: 2000; max-width: 100%; height: auto!important; overflow: scroll; margin-left: 0px; word-wrap: break-word; max-height: 33%!important; | top: 55px; max-height: calc(100% - 110px); | none |
| ![#annotation_controls]({{site.baseurl}}/images/annotation_controls.png "#annotation_controls") | #annotation_controls |  display: flex; background: black; position: -web-sticky; position: sticky; top: 0; flex-wrap: wrap; | none | none | none |
| ![#annotation_text]({{site.baseurl}}/images/annotation_text.png "#annotation_text") | #annotation_text |  none | none | none | none |
