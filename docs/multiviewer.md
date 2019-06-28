---
layout: page
title: Multi Storyboard Viewer
permalink: /storyboard-multi/
---

**Currently only avaliable in latest release [Dist](https://ncsu-libraries.github.io/iiif-annotation/dist) for release links**

This replaces the need for websockets for comparing two or more annotations. It works exactly the same as the [Storyboard]({{site.baseurl}}/storyboard) and has all the same settings.

<script src="{{site.url}}{{site.baseurl}}/dist/iiif-annotation.js"></script>
<link rel="stylesheet" type="text/css" href="{{site.url}}{{site.baseurl}}/dist/iiif-annotation.css">

```
<iiif-multistoryboard annotationlists="http://dnoneill.github.io/annotate/annotations/4628556-4628571-list.json;http://dnoneill.github.io/annotate/annotations/627551b3-516f-4d34-8725-2db778724503-list.json"></iiif-multistoryboard>

```

<iiif-multistoryboard annotationlists="http://dnoneill.github.io/annotate/annotations/4628556-4628571-list.json;http://dnoneill.github.io/annotate/annotations/627551b3-516f-4d34-8725-2db778724503-list.json"></iiif-multistoryboard>
