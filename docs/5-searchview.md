---
layout: page
title: Search View
permalink: /searchview/
---
<script src="{{site.url}}{{site.baseurl}}/latest/annona.js"></script>
<link rel="stylesheet" type="text/css" href="{{site.url}}{{site.baseurl}}/latest/annona.css">
<style>
code {
  word-wrap: break-word;
  white-space: normal;
}
</style>

* A markdown unordered list which will be replaced with the ToC, excluding the "Contents header" from above
{:toc}


| Props      | Values |
| ----------- | ----------- |
| fields | Search fields that make up a query string. By default the value is [{'name': 'Query', 'key': 'q'}] |
| manifesturl | Required. Manifest to be searched |
| searchapi | Not required. Only necessary if the url for the search api is not in the service field of the manifest. |
| styling | string structured styling. See [settings table](/annona/imageviewer/#settings) for more options |


# Getting started
In order to create any of the viewers listed on the website the following code needs to be added to an HTML file once.


```
<script src="{{site.url}}{{site.baseurl}}/dist/annona.js"></script>
<link rel="stylesheet" type="text/css" href="{{site.url}}{{site.baseurl}}/dist/annona.css">
```

Note: the annona.js and annona.css need to be loaded only once, no matter how many image viewers are loaded. Multiple image viewers can be loaded on one page with the `<iiif-searchapi>` tag. An example of this can be seen here: [annotations](https://dnoneill.github.io/annotate/annotations).

## Building views
From there any of the tags built through the [Tag Builder]({{site.baseurl}}/tools/#/tag-builder/) or manually can be entered into a webpage. The Tag Builder provides a user interface for creating much of the code documented below. It also has all settings built into the interface.

# Example from NC State University Libraries

```
<iiif-searchapi manifesturl="https://d.lib.ncsu.edu/collections/catalog/technician-basketballpreview-1997-11-10/manifest.json"></iiif-searchapi>

```

Query strings with results: basketball, basket

<iiif-searchapi manifesturl="https://d.lib.ncsu.edu/collections/catalog/technician-basketballpreview-1997-11-10/manifest.json"></iiif-searchapi>

# Example from Wellcome library

```
<iiif-searchapi manifesturl='https://wellcomelibrary.org/iiif/b18250464/manifest'></iiif-searchapi>
```
Query strings with results: man, medical

<iiif-searchapi manifesturl='https://wellcomelibrary.org/iiif/b18250464/manifest'></iiif-searchapi>
