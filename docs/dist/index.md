---
layout: page
title: Dist
permalink: /dist/
---

<link rel="stylesheet" type="text/css" href="{{site.url}}{{site.baseurl}}/dist/annona.css">

To import and use library copy and paste code. Change url if you use locally downloaded files. These files are the most recent updates, they are not necessarily latest releases. latest releases can be found on the [GitHub releases page](https://github.com/NCSU-Libraries/annona/releases).

```
<script src="{{site.url}}{{site.baseurl}}/dist/annona.js"></script>
<link rel="stylesheet" type="text/css" href="{{site.url}}{{site.baseurl}}/dist/annona.css">
```

| Dist Stable | <a href="{{site.baseurl}}/dist2.zip" download="dist.zip"><i class="fas fa-download"></i></a>
| ------------- |
| [annona.css](annona.css) | <a href="{{site.baseurl}}/dist/annona.css" download><i class="fas fa-download"></i></a> |
| [annona.js](annona.js) | <a href="{{site.baseurl}}/dist/annona.js" download><i class="fas fa-download"></i></a> |
| [annona.js.map](annona.js.map) | <a href="{{site.baseurl}}/dist/annona.js.map" download="annona.js.map"><i class="fas fa-download"></i></a> |


```
<script src="{{site.url}}{{site.baseurl}}/latest/annona.js"></script>
<link rel="stylesheet" type="text/css" href="{{site.url}}{{site.baseurl}}/latest/annona.css">
```

| Dist Latest | <a href="{{site.baseurl}}/latest/dist2.zip" download="dist.zip"><i class="fas fa-download"></i></a>
| ------------- |
| [annona.css]({{site.baseurl}}/latest/annona.css) | <a href="{{site.baseurl}}/latest/annona.css" download><i class="fas fa-download"></i></a> |
| [annona.js]({{site.baseurl}}/latest/annona.js) | <a href="{{site.baseurl}}/latest/annona.js" download><i class="fas fa-download"></i></a> |
| [annona.js.map]({{site.baseurl}}/latest/annona.js.map) | <a href="{{site.baseurl}}/latest/annona.js.map" download="annona.js.map"><i class="fas fa-download"></i></a> |
| [storyboard.js]({{site.baseurl}}/latest/storyboard.js) | <a href="{{site.baseurl}}/latest/storyboard.js" download><i class="fas fa-download"></i></a> |
| [multistoryboard.js]({{site.baseurl}}/latest/multistoryboard.js) | <a href="{{site.baseurl}}/latest/multistoryboard.js" download><i class="fas fa-download"></i></a> |
| [rangestoryboard.js]({{site.baseurl}}/latest/rangestoryboard.js) | <a href="{{site.baseurl}}/latest/rangestoryboard.js" download><i class="fas fa-download"></i></a> |
| [iiifannotation.js]({{site.baseurl}}/latest/iiifannotation.js) | <a href="{{site.baseurl}}/latest/iiifannotation.js" download><i class="fas fa-download"></i></a> |
| [searchapi.js]({{site.baseurl}}/latest/searchapi.js) | <a href="{{site.baseurl}}/latest/searchapi.js" download><i class="fas fa-download"></i></a> |

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
