---
layout: page
title: Image Viewer
permalink: /imageviewer/
---
<script src="{{site.url}}{{site.baseurl}}/dist/iiif-annotation.js"></script>
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


# Getting started
In order to create any of the viewers listed on the website the following code needs to be added to an HTML file once.

```
<script src="{{site.url}}{{site.baseurl}}/dist/iiif-annotation.js"></script>
<link rel="stylesheet" type="text/css" href="{{site.url}}{{site.baseurl}}/dist/iiif-annotation.css">
```

Note: the iiif-annotation.js and iiif-annotation.css need to be loaded only once, no matter how many image viewers are loaded. Multiple image viewers can be loaded on one page with the `<iiif-storyboard>` tag. An example of this can be seen here: [annotations](https://dnoneill.github.io/annotate/annotations).


# Single Annotation

Below is an example of annotation url. This is a single annotation. In the JSON they will have a type of annotation or oa:annotation. An annotation list will have a type of AnnotationList.

```
<iiif-annotation annotationurl="{{site.url}}{{site.baseurl}}/webannotations/annotation1.json"></iiif-annotation>

```
<iiif-annotation annotationurl="{{site.baseurl}}/webannotations/annotation1.json"></iiif-annotation>

# Annotation Lists
These are normally denoted in the annotation json as AnnotationList, they will consist of multiple annotations on one image.
```
<iiif-annotation annotationlist="https://dnoneill.github.io/annotate/annotations/segins-004-list.json"></iiif-annotation>
```

<iiif-annotation annotationlist="https://dnoneill.github.io/annotate/annotations/segins-004-list.json"></iiif-annotation>

# Annotations without Manifests listed in annotation
The following example is a annotation list. The annotation list does not have a manifest in the annotation. The manifest is added manually into to the tag.
```
<iiif-annotation annotationlist="https://dzkimgs.l.u-tokyo.ac.jp/iiif/zuzoubu/12b02/list/p0001-0025.json" manifesturl="https://dzkimgs.l.u-tokyo.ac.jp/iiif/zuzoubu/12b02/manifest.json"></iiif-annotation>
```

<iiif-annotation annotationlist="https://dzkimgs.l.u-tokyo.ac.jp/iiif/zuzoubu/12b02/list/p0001-0025.json" manifesturl="https://dzkimgs.l.u-tokyo.ac.jp/iiif/zuzoubu/12b02/manifest.json"></iiif-annotation>

# Annotations with Multiple languages
W3 standards allow for transitions between multiple bodies [https://www.w3.org/TR/annotation-model/#choice-between-bodies](https://www.w3.org/TR/annotation-model/#choice-between-bodies). The assumption is only body is used at a time. This library supports this model. The assumption this library uses is that the changes are between different languages which are defined in ISO standard in the annotation. An example of this can be seen in the annotation below.

<iiif-annotation annotationurl="{{site.baseurl}}/webannotations/annotationslist.json"></iiif-annotation>

# Settings

What areas are shown in the embedded image are customizable either through settings or through basic css. Below are the setting options and their values. An example with all settings enabled can be seen here: [all settings]({{site.baseurl}}/imageviewer_settings). This can also be applied to a single annotation.

| Variable      | Settings |
| ----------- | ----------- |
| view_larger   | **true** or **false**. Shows/hides the "View Full Image" button. **Default** is true |
| view_full_object |  **true** or **false**. Shows/hides the full object url. **Default** is true |
| view_tags | **true** or **false**. Shows/hides the tags if they exists. **Default** is true |
| height | Any css height dimension. Changes annotation and full size image size. **Default** is 'auto' |
| width | Any css width dimension. Changes annotation and full size image size. **Default** is 49% |
| image_only | **true** or **false**. Will only show the annotated image. **Default** is false |

## Global settings
Item here: [all settings example]({{site.baseurl}}/imageviewer_settings)

```
<script src="{{site.url}}{{site.baseurl}}/dist/iiif-annotation.js"></script>
<link rel="stylesheet" type="text/css" href="{{site.url}}{{site.baseurl}}/dist/iiif-annotation.css">
<script id="config" type="application/json">{
  "view_larger":false,
  "view_full_object":false,
  "view_tags": false,
  "height": "200px"
}</script>
<iiif-annotation annotationlist="https://dzkimgs.l.u-tokyo.ac.jp/iiif/zuzoubu/12b02/list/p0001-0025.json" manifesturl="https://dzkimgs.l.u-tokyo.ac.jp/iiif/zuzoubu/12b02/manifest.json"></iiif-annotation>
```

## Single annotation settings
```
<iiif-annotation annotationlist='https://dzkimgs.l.u-tokyo.ac.jp/iiif/zuzoubu/12b02/list/p0001-0025.json' manifesturl='https://dzkimgs.l.u-tokyo.ac.jp/iiif/zuzoubu/12b02/manifest.json' styling='view_larger:false; image_only:true; width:200px'></iiif-annotation>
```

<iiif-annotation annotationlist='https://dzkimgs.l.u-tokyo.ac.jp/iiif/zuzoubu/12b02/list/p0001-0025.json' manifesturl='https://dzkimgs.l.u-tokyo.ac.jp/iiif/zuzoubu/12b02/manifest.json' styling='view_larger:false; image_only:true; width:200px'></iiif-annotation>
