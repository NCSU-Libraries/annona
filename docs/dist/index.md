---
layout: page
title: Dist
permalink: /dist/
---

<link rel="stylesheet" type="text/css" href="{{site.url}}{{site.baseurl}}/dist/iiif-annotation.css">

To import and use library copy and paste code. Change url if you use locally downloaded files. These files are the most recent updates, they are not necessarily latest releases. latest releases can be found on the [GitHub releases page](https://github.com/NCSU-Libraries/iiif-annotation/releases).

```
<script src="{{site.url}}{{site.baseurl}}/dist/iiif-annotation.js"></script>
<link rel="stylesheet" type="text/css" href="{{site.url}}{{site.baseurl}}/dist/iiif-annotation.css">
```

| Dist Stable | <a href="{{site.baseurl}}/dist2.zip" download="dist.zip"><i class="fas fa-download"></i></a>
| ------------- |
| [iiif-annotation.css](iiif-annotation.css) | <a href="{{site.baseurl}}/dist/iiif-annotation.css" download><i class="fas fa-download"></i></a> |
| [iiif-annotation.js](iiif-annotation.js) | <a href="{{site.baseurl}}/dist/iiif-annotation.js" download><i class="fas fa-download"></i></a> |
| [iiif-annotation.js.map](iiif-annotation.js.map) | <a href="{{site.baseurl}}/dist/iiif-annotation.js.map" download="iiif-annotation.js.map"><i class="fas fa-download"></i></a> |


```
<script src="{{site.url}}{{site.baseurl}}/latest/iiif-annotation.js"></script>
<link rel="stylesheet" type="text/css" href="{{site.url}}{{site.baseurl}}/latest/iiif-annotation.css">
```

| Dist Latest | <a href="{{site.baseurl}}/latest/dist2.zip" download="dist.zip"><i class="fas fa-download"></i></a>
| ------------- |
| [iiif-annotation.css](iiif-annotation.css) | <a href="{{site.baseurl}}/latest/iiif-annotation.css" download><i class="fas fa-download"></i></a> |
| [iiif-annotation.js](iiif-annotation.js) | <a href="{{site.baseurl}}/latest/iiif-annotation.js" download><i class="fas fa-download"></i></a> |
| [iiif-annotation.js.map](iiif-annotation.js.map) | <a href="{{site.baseurl}}/latest/iiif-annotation.js.map" download="iiif-annotation.js.map"><i class="fas fa-download"></i></a> |

<script>

function downloaddist(url) {
fetch(url).then(function(t) {
    return t.blob().then((b)=>{
        var a = document.createElement("a");
        a.href = URL.createObjectURL(b);
        var filename = url.split("/").slice(-1)[0];
        a.setAttribute("download", filename);
        a.click();
    }
    );
});
}
</script>
