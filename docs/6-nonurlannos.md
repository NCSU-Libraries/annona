---
layout: page
title: Raw JSON
permalink: /nourls/
---


* A markdown unordered list which will be replaced with the ToC, excluding the "Contents header" from above
{:toc}

# Using libraries with raw json
You can use this library with raw json one of two ways. It should work with all tags, please let me know if it does not.

<script src="{{site.url}}{{site.baseurl}}/latest/annona.js"></script>
<link rel="stylesheet" type="text/css" href="{{site.url}}{{site.baseurl}}/latest/annona.css">
Only have RAW JSON for your annotation? No problem. Use one of the following methods below.

##  Script tag method
**Note: gr1b4nhz2mkvmfs33p9mke below is a random alphanumeric id that was randomly generated. I suggest using something related to your specific item**
<style>
.scriptcode .highlight {
    margin-bottom: 0px!important;
}
code {
  word-wrap: break-word;
  white-space: normal;
}

.scriptcode2 > * {
    display: inline;
}
</style>
<div markdown="1" class="scriptcode highlighter-rouge">
```
<script type="application/json" id="gr1b4nhz2mkvmfs33p9mke">
```

<details class="highlight"><summary>JSON object</summary>
<code>
{
  "@context": "http://iiif.io/api/presentation/2/context.json",
  "@id": "/annotate/annotations/663c12e3-d419-464b-96ed-031bbc7674f4-list.json",
  "@type": "sc:AnnotationList",
  "oa:serializedAt": "2019-08-22T20:24:06.308Z",
  "resources": [
    {
      "@context": "http://iiif.io/api/presentation/2/context.json",
      "@id": "663c12e3-d419-464b-96ed-031bbc7674f4",
      "@type": "oa:Annotation",
      "motivation": [
        "oa:commenting",
        "oa:tagging"
      ],
      "oa:serializedAt": "2019-08-22T20:23:32.336Z",
      "on": [
        {
          "@type": "oa:SpecificResource",
          "full": "https://purl.stanford.edu/wh234bz9013/iiif/canvas/cocina-fileSet-wh234bz9013-wh234bz9013_1",
          "selector": {
            "@type": "oa:Choice",
            "default": {
              "@type": "oa:FragmentSelector",
              "value": "xywh=2997,1697,1087,719"
            },
            "item": {
              "@type": "oa:SvgSelector",
              "value": "<svg xmlns='http://www.w3.org/2000/svg'><path xmlns=\"http://www.w3.org/2000/svg\" d=\"M2997.17524,1696.60216h543.40785v0h543.40785v359.30246v359.30246h-543.40785h-543.40785v-359.30246z\" data-paper-data=\"{&quot;strokeWidth&quot;:1,&quot;rotation&quot;:0,&quot;annotation&quot;:null,&quot;nonHoverStrokeColor&quot;:[&quot;Color&quot;,0,0.74902,1],&quot;editable&quot;:true}\" id=\"rectangle_35a6ec4b-ca51-40f7-8aba-c26833a31088\" fill-opacity=\"0.00001\" fill=\"#00bfff\" fill-rule=\"nonzero\" stroke=\"#00bfff\" stroke-width=\"87.74527\" stroke-linecap=\"butt\" stroke-linejoin=\"miter\" stroke-miterlimit=\"10\" stroke-dasharray=\"\" stroke-dashoffset=\"0\" font-family=\"none\" font-weight=\"none\" font-size=\"none\" text-anchor=\"none\" style=\"mix-blend-mode: normal\"/></svg>"
            }
          },
          "within": {
            "@id": "https://purl.stanford.edu/wh234bz9013/iiif/manifest",
            "@type": "sc:Manifest"
          }
        }
      ],
      "resource": [
        {
          "@type": "dctypes:Text",
          "chars": "<p>Cepheus, king of Aethiopia<span style=\"color: #222222; font-family: arial, sans-serif; font-size: small;\"><span style=\"caret-color: #222222;\">.</span></span></p>",
          "format": "text/html"
        },
        {
          "@type": "oa:Tag",
          "chars": "greek_mythology"
        }
      ]
    },
    {
      "@context": "http://iiif.io/api/presentation/2/context.json",
      "@id": "45767112-2f44-4a7d-a6a3-3da278338417",
      "@type": "oa:Annotation",
      "motivation": [
        "oa:commenting",
        "oa:tagging"
      ],
      "oa:serializedAt": "2019-08-22T20:23:34.899Z",
      "on": [
        {
          "@type": "oa:SpecificResource",
          "full": "https://purl.stanford.edu/wh234bz9013/iiif/canvas/cocina-fileSet-wh234bz9013-wh234bz9013_1",
          "selector": {
            "@type": "oa:Choice",
            "default": {
              "@type": "oa:FragmentSelector",
              "value": "xywh=4089,1748,902,578"
            },
            "item": {
              "@type": "oa:SvgSelector",
              "value": "<svg xmlns='http://www.w3.org/2000/svg'><path xmlns=\"http://www.w3.org/2000/svg\" d=\"M4088.56835,1748.26077h451.08708v0h451.08708v288.7912v288.7912h-451.08708h-451.08708v-288.7912z\" data-paper-data=\"{&quot;strokeWidth&quot;:1,&quot;rotation&quot;:0,&quot;annotation&quot;:null,&quot;nonHoverStrokeColor&quot;:[&quot;Color&quot;,0,0.74902,1],&quot;editable&quot;:true}\" id=\"rectangle_a1fb84a9-b198-4597-9926-53c092540c77\" fill-opacity=\"0.00001\" fill=\"#00bfff\" fill-rule=\"nonzero\" stroke=\"#00bfff\" stroke-width=\"87.74527\" stroke-linecap=\"butt\" stroke-linejoin=\"miter\" stroke-miterlimit=\"10\" stroke-dasharray=\"\" stroke-dashoffset=\"0\" font-family=\"none\" font-weight=\"none\" font-size=\"none\" text-anchor=\"none\" style=\"mix-blend-mode: normal\"/></svg>"
            }
          },
          "within": {
            "@id": "https://purl.stanford.edu/wh234bz9013/iiif/manifest",
            "@type": "sc:Manifest"
          }
        }
      ],
      "resource": [
        {
          "@type": "dctypes:Text",
          "chars": "<p>Ursa Minor</p>",
          "format": "text/html"
        },
        {
          "@type": "oa:Tag",
          "chars": "animals"
        }
      ]
    },
    {
      "@context": "http://iiif.io/api/presentation/2/context.json",
      "@id": "c5594040-67bb-464a-8d77-dad2231875c8",
      "@type": "oa:Annotation",
      "motivation": [
        "oa:commenting",
        "oa:tagging"
      ],
      "oa:serializedAt": "2019-08-22T20:23:37.690Z",
      "on": [
        {
          "@type": "oa:SpecificResource",
          "full": "https://purl.stanford.edu/wh234bz9013/iiif/canvas/cocina-fileSet-wh234bz9013-wh234bz9013_1",
          "selector": {
            "@type": "oa:Choice",
            "default": {
              "@type": "oa:FragmentSelector",
              "value": "xywh=4380,2331,1733,1189"
            },
            "item": {
              "@type": "oa:SvgSelector",
              "value": "<svg xmlns='http://www.w3.org/2000/svg'><path xmlns=\"http://www.w3.org/2000/svg\" d=\"M4379.74625,2330.61657h866.3736v0h866.3736v594.28933v594.28933h-866.3736h-866.3736v-594.28933z\" data-paper-data=\"{&quot;strokeWidth&quot;:1,&quot;rotation&quot;:0,&quot;annotation&quot;:null,&quot;nonHoverStrokeColor&quot;:[&quot;Color&quot;,0,0.74902,1],&quot;editable&quot;:true}\" id=\"rectangle_cf48a626-2201-44fa-9aa9-c74263d62c79\" fill-opacity=\"0.00001\" fill=\"#00bfff\" fill-rule=\"nonzero\" stroke=\"#00bfff\" stroke-width=\"87.74527\" stroke-linecap=\"butt\" stroke-linejoin=\"miter\" stroke-miterlimit=\"10\" stroke-dasharray=\"\" stroke-dashoffset=\"0\" font-family=\"none\" font-weight=\"none\" font-size=\"none\" text-anchor=\"none\" style=\"mix-blend-mode: normal\"/></svg>"
            }
          },
          "within": {
            "@id": "https://purl.stanford.edu/wh234bz9013/iiif/manifest",
            "@type": "sc:Manifest"
          }
        }
      ],
      "resource": [
        {
          "@type": "dctypes:Text",
          "chars": "<p>This is a rendering of Ursa Major. This&nbsp;constellation translated from the latin means \"greater bear.\" This is in refernce to Ursa Minor (lesser bear) which can be seen in the image below.</p>\n<p>These constellations are often talked about in contrast to each other. They are also often called the big and little dipper respectively.</p>",
          "format": "text/html"
        },
        {
          "@type": "oa:Tag",
          "chars": "animals"
        }
      ]
    },
    {
      "@context": "http://iiif.io/api/presentation/2/context.json",
      "@id": "2b4c2e91-ed32-4962-b559-cbdb6a0057b6",
      "@type": "oa:Annotation",
      "motivation": [
        "oa:commenting",
        "oa:tagging"
      ],
      "oa:serializedAt": "2019-08-22T20:23:40.088Z",
      "on": [
        {
          "@type": "oa:SpecificResource",
          "full": "https://purl.stanford.edu/wh234bz9013/iiif/canvas/cocina-fileSet-wh234bz9013-wh234bz9013_1",
          "selector": {
            "@type": "oa:Choice",
            "default": {
              "@type": "oa:FragmentSelector",
              "value": "xywh=6398,2352,600,750"
            },
            "item": {
              "@type": "oa:SvgSelector",
              "value": "<svg xmlns='http://www.w3.org/2000/svg'><path xmlns=\"http://www.w3.org/2000/svg\" d=\"M6397.64195,2352.34435h300.04932v0h300.04932v375.06165v375.06165h-300.04932h-300.04932v-375.06165z\" data-paper-data=\"{&quot;strokeWidth&quot;:1,&quot;rotation&quot;:0,&quot;annotation&quot;:null,&quot;nonHoverStrokeColor&quot;:[&quot;Color&quot;,0,0.74902,1],&quot;editable&quot;:true}\" id=\"rectangle_a1e6898b-b17a-4077-acb3-7c119b94b6aa\" fill-opacity=\"0.00001\" fill=\"#00bfff\" fill-rule=\"nonzero\" stroke=\"#00bfff\" stroke-width=\"87.74527\" stroke-linecap=\"butt\" stroke-linejoin=\"miter\" stroke-miterlimit=\"10\" stroke-dasharray=\"\" stroke-dashoffset=\"0\" font-family=\"none\" font-weight=\"none\" font-size=\"none\" text-anchor=\"none\" style=\"mix-blend-mode: normal\"/></svg>"
            }
          },
          "within": {
            "@id": "https://purl.stanford.edu/wh234bz9013/iiif/manifest",
            "@type": "sc:Manifest"
          }
        }
      ],
      "resource": [
        {
          "@type": "dctypes:Text",
          "chars": "<p>Coma Berenices, means \"Berenice's Hair\" in English. Named for Queen Berenice II of Egypt. Is the only modern constellation named for a historic person.&nbsp;</p>",
          "format": "text/html"
        },
        {
          "@type": "oa:Tag",
          "chars": "historical"
        }
      ]
    },
    {
      "@context": "http://iiif.io/api/presentation/2/context.json",
      "@id": "142f9b22-b3db-4c37-bdff-0d251d1c02a7",
      "@type": "oa:Annotation",
      "motivation": [
        "oa:commenting",
        "oa:tagging"
      ],
      "oa:serializedAt": "2019-08-22T20:23:29.667Z",
      "on": [
        {
          "@type": "oa:SpecificResource",
          "full": "https://purl.stanford.edu/wh234bz9013/iiif/canvas/cocina-fileSet-wh234bz9013-wh234bz9013_1",
          "selector": {
            "@type": "oa:Choice",
            "default": {
              "@type": "oa:FragmentSelector",
              "value": "xywh=1964,2596,1143,707"
            },
            "item": {
              "@type": "oa:SvgSelector",
              "value": "<svg xmlns='http://www.w3.org/2000/svg'><path xmlns=\"http://www.w3.org/2000/svg\" d=\"M1963.80949,2596.34303h571.61755v0h571.61755v353.36357v353.36357h-571.61755h-571.61755v-353.36357z\" data-paper-data=\"{&quot;strokeWidth&quot;:1,&quot;rotation&quot;:0,&quot;annotation&quot;:null,&quot;nonHoverStrokeColor&quot;:[&quot;Color&quot;,0,0.74902,1],&quot;editable&quot;:true}\" id=\"rectangle_d6c0a0fc-b0dc-4b1d-bab1-11a631348684\" fill-opacity=\"0.00001\" fill=\"#00bfff\" fill-rule=\"nonzero\" stroke=\"#00bfff\" stroke-width=\"87.74527\" stroke-linecap=\"butt\" stroke-linejoin=\"miter\" stroke-miterlimit=\"10\" stroke-dasharray=\"\" stroke-dashoffset=\"0\" font-family=\"none\" font-weight=\"none\" font-size=\"none\" text-anchor=\"none\" style=\"mix-blend-mode: normal\"/></svg>"
            }
          },
          "within": {
            "@id": "https://purl.stanford.edu/wh234bz9013/iiif/manifest",
            "@type": "sc:Manifest"
          }
        }
      ],
      "resource": [
        {
          "@type": "dctypes:Text",
          "chars": "<p>Andromeda, the chained woman.</p>",
          "format": "text/html"
        },
        {
          "@type": "oa:Tag",
          "chars": "greek_mythology"
        }
      ]
    },
    {
      "@context": "http://iiif.io/api/presentation/2/context.json",
      "@id": "1192e96e-0bd7-4695-b660-70e089be1053",
      "@type": "oa:Annotation",
      "motivation": [
        "oa:commenting",
        "oa:tagging"
      ],
      "oa:serializedAt": "2019-08-22T20:24:02.451Z",
      "on": [
        {
          "@type": "oa:SpecificResource",
          "full": "https://purl.stanford.edu/wh234bz9013/iiif/canvas/cocina-fileSet-wh234bz9013-wh234bz9013_1",
          "selector": {
            "@type": "oa:Choice",
            "default": {
              "@type": "oa:FragmentSelector",
              "value": "xywh=2319,3719,666,613"
            },
            "item": {
              "@type": "oa:SvgSelector",
              "value": "<svg xmlns='http://www.w3.org/2000/svg'><path xmlns=\"http://www.w3.org/2000/svg\" d=\"M2319.20945,3718.80755h333.15036v0h333.15036v306.49833v306.49833h-333.15036h-333.15036v-306.49833z\" data-paper-data=\"{&quot;strokeWidth&quot;:1,&quot;rotation&quot;:0,&quot;annotation&quot;:null,&quot;nonHoverStrokeColor&quot;:[&quot;Color&quot;,0,0.74902,1],&quot;editable&quot;:true}\" id=\"rectangle_81d323bd-7398-4e2e-b903-6c7838437afb\" fill-opacity=\"0.00001\" fill=\"#00bfff\" fill-rule=\"nonzero\" stroke=\"#00bfff\" stroke-width=\"87.74527\" stroke-linecap=\"butt\" stroke-linejoin=\"miter\" stroke-miterlimit=\"10\" stroke-dasharray=\"\" stroke-dashoffset=\"0\" font-family=\"none\" font-weight=\"none\" font-size=\"none\" text-anchor=\"none\" style=\"mix-blend-mode: normal\"/></svg>"
            }
          },
          "within": {
            "@id": "https://purl.stanford.edu/wh234bz9013/iiif/manifest",
            "@type": "sc:Manifest"
          }
        }
      ],
      "resource": [
        {
          "@type": "dctypes:Text",
          "chars": "<p>Aries</p>",
          "format": "text/html"
        },
        {
          "@type": "oa:Tag",
          "chars": "zodiac"
        }
      ]
    },
    {
      "@context": "http://iiif.io/api/presentation/2/context.json",
      "@id": "2767c17e-1c48-4545-96e4-d02159ec20bb",
      "@type": "oa:Annotation",
      "motivation": [
        "oa:commenting",
        "oa:tagging"
      ],
      "oa:serializedAt": "2019-08-22T20:23:59.809Z",
      "on": [
        {
          "@type": "oa:SpecificResource",
          "full": "https://purl.stanford.edu/wh234bz9013/iiif/canvas/cocina-fileSet-wh234bz9013-wh234bz9013_1",
          "selector": {
            "@type": "oa:Choice",
            "default": {
              "@type": "oa:FragmentSelector",
              "value": "xywh=2716,4039,1149,864"
            },
            "item": {
              "@type": "oa:SvgSelector",
              "value": "<svg xmlns='http://www.w3.org/2000/svg'><path xmlns=\"http://www.w3.org/2000/svg\" d=\"M3865.0271,4038.63189h-574.35121v0h-574.35121v431.76286v431.76286h574.35121h574.35121v-431.76286z\" data-paper-data=\"{&quot;strokeWidth&quot;:1,&quot;rotation&quot;:0,&quot;annotation&quot;:null,&quot;nonHoverStrokeColor&quot;:[&quot;Color&quot;,0,0.74902,1],&quot;editable&quot;:true}\" id=\"rectangle_74d77532-9717-41cd-8b50-270f3a03c54e\" fill-opacity=\"0.00001\" fill=\"#00bfff\" fill-rule=\"nonzero\" stroke=\"#00bfff\" stroke-width=\"87.74527\" stroke-linecap=\"butt\" stroke-linejoin=\"miter\" stroke-miterlimit=\"10\" stroke-dasharray=\"\" stroke-dashoffset=\"0\" font-family=\"none\" font-weight=\"none\" font-size=\"none\" text-anchor=\"none\" style=\"mix-blend-mode: normal\"/></svg>"
            }
          },
          "within": {
            "@id": "https://purl.stanford.edu/wh234bz9013/iiif/manifest",
            "@type": "sc:Manifest"
          }
        }
      ],
      "resource": [
        {
          "@type": "dctypes:Text",
          "chars": "<p>Taurus</p>",
          "format": "text/html"
        },
        {
          "@type": "oa:Tag",
          "chars": "zodiac"
        }
      ]
    },
    {
      "@context": "http://iiif.io/api/presentation/2/context.json",
      "@id": "6108adbd-17b1-4c01-940f-08b7453b26b1",
      "@type": "oa:Annotation",
      "motivation": [
        "oa:commenting",
        "oa:tagging"
      ],
      "oa:serializedAt": "2019-08-22T20:24:06.308Z",
      "on": [
        {
          "@type": "oa:SpecificResource",
          "full": "https://purl.stanford.edu/wh234bz9013/iiif/canvas/cocina-fileSet-wh234bz9013-wh234bz9013_1",
          "selector": {
            "@type": "oa:Choice",
            "default": {
              "@type": "oa:FragmentSelector",
              "value": "xywh=2802,3671,286,327"
            },
            "item": {
              "@type": "oa:SvgSelector",
              "value": "<svg xmlns='http://www.w3.org/2000/svg'><path xmlns=\"http://www.w3.org/2000/svg\" d=\"M2801.86839,3671.24041h143.20225v0h143.20225v163.48923v163.48923h-143.20225h-143.20225v-163.48923z\" data-paper-data=\"{&quot;strokeWidth&quot;:1,&quot;rotation&quot;:0,&quot;annotation&quot;:null,&quot;nonHoverStrokeColor&quot;:[&quot;Color&quot;,0,0.74902,1],&quot;editable&quot;:true}\" id=\"rectangle_bb5e69e9-4f33-4ed1-8247-f02560fabbdf\" fill-opacity=\"0.00001\" fill=\"#00bfff\" fill-rule=\"nonzero\" stroke=\"#00bfff\" stroke-width=\"87.74527\" stroke-linecap=\"butt\" stroke-linejoin=\"miter\" stroke-miterlimit=\"10\" stroke-dasharray=\"\" stroke-dashoffset=\"0\" font-family=\"none\" font-weight=\"none\" font-size=\"none\" text-anchor=\"none\" style=\"mix-blend-mode: normal\"/></svg>"
            }
          },
          "within": {
            "@id": "https://purl.stanford.edu/wh234bz9013/iiif/manifest",
            "@type": "sc:Manifest"
          }
        }
      ],
      "resource": [
        {
          "@type": "dctypes:Text",
          "chars": "<p>Apes later know as Vespa, Lilium and then Musca Borealis. Is latin for bees.</p>",
          "format": "text/html"
        },
        {
          "@type": "oa:Tag",
          "chars": "animals"
        },
        {
          "@type": "oa:Tag",
          "chars": "discarded_constellation"
        }
      ]
    },
    {
      "@context": "http://iiif.io/api/presentation/2/context.json",
      "@id": "2af6d0a4-6ade-42e0-93ee-dc15b5278b83",
      "@type": "oa:Annotation",
      "motivation": [
        "oa:commenting",
        "oa:tagging"
      ],
      "oa:serializedAt": "2019-08-22T20:23:56.943Z",
      "on": [
        {
          "@type": "oa:SpecificResource",
          "full": "https://purl.stanford.edu/wh234bz9013/iiif/canvas/cocina-fileSet-wh234bz9013-wh234bz9013_1",
          "selector": {
            "@type": "oa:Choice",
            "default": {
              "@type": "oa:FragmentSelector",
              "value": "xywh=3613,5545,601,415"
            },
            "item": {
              "@type": "oa:SvgSelector",
              "value": "<svg xmlns='http://www.w3.org/2000/svg'><path xmlns=\"http://www.w3.org/2000/svg\" d=\"M3613.34779,5544.80315h300.72472v0h300.72472v207.64326v207.64326h-300.72472h-300.72472v-207.64326z\" data-paper-data=\"{&quot;strokeWidth&quot;:1,&quot;rotation&quot;:0,&quot;annotation&quot;:null,&quot;nonHoverStrokeColor&quot;:[&quot;Color&quot;,0,0.74902,1],&quot;editable&quot;:true}\" id=\"rectangle_aabcc010-0cbf-4d58-be02-e8c52225c308\" fill-opacity=\"0.00001\" fill=\"#00bfff\" fill-rule=\"nonzero\" stroke=\"#00bfff\" stroke-width=\"87.74527\" stroke-linecap=\"butt\" stroke-linejoin=\"miter\" stroke-miterlimit=\"10\" stroke-dasharray=\"\" stroke-dashoffset=\"0\" font-family=\"none\" font-weight=\"none\" font-size=\"none\" text-anchor=\"none\" style=\"mix-blend-mode: normal\"/></svg>"
            }
          },
          "within": {
            "@id": "https://purl.stanford.edu/wh234bz9013/iiif/manifest",
            "@type": "sc:Manifest"
          }
        }
      ],
      "resource": [
        {
          "@type": "dctypes:Text",
          "chars": "<p>Lepus. Latin for hare.</p>",
          "format": "text/html"
        },
        {
          "@type": "oa:Tag",
          "chars": "animals"
        }
      ]
    },
    {
      "@context": "http://iiif.io/api/presentation/2/context.json",
      "@id": "c844edbf-17fb-4cb6-bc4e-cd7a0324d2dd",
      "@type": "oa:Annotation",
      "motivation": [
        "oa:commenting",
        "oa:tagging"
      ],
      "oa:serializedAt": "2019-08-22T20:23:53.326Z",
      "on": [
        {
          "@type": "oa:SpecificResource",
          "full": "https://purl.stanford.edu/wh234bz9013/iiif/canvas/cocina-fileSet-wh234bz9013-wh234bz9013_1",
          "selector": {
            "@type": "oa:Choice",
            "default": {
              "@type": "oa:FragmentSelector",
              "value": "xywh=4737,4707,375,315"
            },
            "item": {
              "@type": "oa:SvgSelector",
              "value": "<svg xmlns='http://www.w3.org/2000/svg'><path xmlns=\"http://www.w3.org/2000/svg\" d=\"M4737.48543,4707.07h187.35627v0h187.35627v157.52247v157.52247h-187.35627h-187.35627v-157.52247z\" data-paper-data=\"{&quot;strokeWidth&quot;:1,&quot;rotation&quot;:0,&quot;annotation&quot;:null,&quot;nonHoverStrokeColor&quot;:[&quot;Color&quot;,0,0.74902,1],&quot;editable&quot;:true}\" id=\"rectangle_ffed21ee-11af-4b5d-8183-c58619ad87d1\" fill-opacity=\"0.00001\" fill=\"#00bfff\" fill-rule=\"nonzero\" stroke=\"#00bfff\" stroke-width=\"87.74527\" stroke-linecap=\"butt\" stroke-linejoin=\"miter\" stroke-miterlimit=\"10\" stroke-dasharray=\"\" stroke-dashoffset=\"0\" font-family=\"none\" font-weight=\"none\" font-size=\"none\" text-anchor=\"none\" style=\"mix-blend-mode: normal\"/></svg>"
            }
          },
          "within": {
            "@id": "https://purl.stanford.edu/wh234bz9013/iiif/manifest",
            "@type": "sc:Manifest"
          }
        }
      ],
      "resource": [
        {
          "@type": "dctypes:Text",
          "chars": "<p>Canis minor. Translates into English as lesser dog.</p>",
          "format": "text/html"
        },
        {
          "@type": "oa:Tag",
          "chars": "animals"
        }
      ]
    },
    {
      "@context": "http://iiif.io/api/presentation/2/context.json",
      "@id": "d326ca50-e2cd-4096-88a0-0d5aaf366cd1",
      "@type": "oa:Annotation",
      "motivation": [
        "oa:commenting",
        "oa:tagging"
      ],
      "oa:serializedAt": "2019-08-22T20:23:50.137Z",
      "on": [
        {
          "@type": "oa:SpecificResource",
          "full": "https://purl.stanford.edu/wh234bz9013/iiif/canvas/cocina-fileSet-wh234bz9013-wh234bz9013_1",
          "selector": {
            "@type": "oa:Choice",
            "default": {
              "@type": "oa:FragmentSelector",
              "value": "xywh=4281,3930,835,753"
            },
            "item": {
              "@type": "oa:SvgSelector",
              "value": "<svg xmlns='http://www.w3.org/2000/svg'><path xmlns=\"http://www.w3.org/2000/svg\" d=\"M5115.49235,3929.514h-417.37077v0h-417.37077v376.59316v376.59316h417.37077h417.37077v-376.59316z\" data-paper-data=\"{&quot;strokeWidth&quot;:1,&quot;rotation&quot;:0,&quot;annotation&quot;:null,&quot;nonHoverStrokeColor&quot;:[&quot;Color&quot;,0,0.74902,1],&quot;editable&quot;:true}\" id=\"rectangle_36e78f2b-7fab-4df5-b6d7-eb5b5ff4d7c1\" fill-opacity=\"0.00001\" fill=\"#00bfff\" fill-rule=\"nonzero\" stroke=\"#00bfff\" stroke-width=\"87.74527\" stroke-linecap=\"butt\" stroke-linejoin=\"miter\" stroke-miterlimit=\"10\" stroke-dasharray=\"\" stroke-dashoffset=\"0\" font-family=\"none\" font-weight=\"none\" font-size=\"none\" text-anchor=\"none\" style=\"mix-blend-mode: normal\"/></svg>"
            }
          },
          "within": {
            "@id": "https://purl.stanford.edu/wh234bz9013/iiif/manifest",
            "@type": "sc:Manifest"
          }
        }
      ],
      "resource": [
        {
          "@type": "dctypes:Text",
          "chars": "<p>Gemini</p>",
          "format": "text/html"
        },
        {
          "@type": "oa:Tag",
          "chars": "zodiac"
        }
      ]
    },
    {
      "@context": "http://iiif.io/api/presentation/2/context.json",
      "@id": "c8f1cf49-d7aa-4f62-8086-1bb45dc86f3b",
      "@type": "oa:Annotation",
      "motivation": [
        "oa:commenting",
        "oa:tagging"
      ],
      "oa:serializedAt": "2019-08-22T20:23:46.819Z",
      "on": [
        {
          "@type": "oa:SpecificResource",
          "full": "https://purl.stanford.edu/wh234bz9013/iiif/canvas/cocina-fileSet-wh234bz9013-wh234bz9013_1",
          "selector": {
            "@type": "oa:Choice",
            "default": {
              "@type": "oa:FragmentSelector",
              "value": "xywh=4847,3848,880,931"
            },
            "item": {
              "@type": "oa:SvgSelector",
              "value": "<svg xmlns='http://www.w3.org/2000/svg'><path xmlns=\"http://www.w3.org/2000/svg\" d=\"M5727.1564,3847.95879h-440.15825v0h-440.15825v465.34442v465.34442h440.15825h440.15825v-465.34442z\" data-paper-data=\"{&quot;strokeWidth&quot;:1,&quot;rotation&quot;:0,&quot;annotation&quot;:null,&quot;nonHoverStrokeColor&quot;:[&quot;Color&quot;,0,0.74902,1],&quot;editable&quot;:true}\" id=\"rectangle_03586755-8c19-42ac-9c13-e70ee27d27c6\" fill-opacity=\"0.00001\" fill=\"#00bfff\" fill-rule=\"nonzero\" stroke=\"#00bfff\" stroke-width=\"87.74527\" stroke-linecap=\"butt\" stroke-linejoin=\"miter\" stroke-miterlimit=\"10\" stroke-dasharray=\"\" stroke-dashoffset=\"0\" font-family=\"none\" font-weight=\"none\" font-size=\"none\" text-anchor=\"none\" style=\"mix-blend-mode: normal\"/></svg>"
            }
          },
          "within": {
            "@id": "https://purl.stanford.edu/wh234bz9013/iiif/manifest",
            "@type": "sc:Manifest"
          }
        }
      ],
      "resource": [
        {
          "@type": "dctypes:Text",
          "chars": "<p>Cancer</p>",
          "format": "text/html"
        },
        {
          "@type": "oa:Tag",
          "chars": "zodiac"
        }
      ]
    },
    {
      "@context": "http://iiif.io/api/presentation/2/context.json",
      "@id": "176d313f-0f2d-4d25-a3f9-b4e10ec96718",
      "@type": "oa:Annotation",
      "motivation": [
        "oa:commenting",
        "oa:tagging"
      ],
      "oa:serializedAt": "2019-08-22T20:23:42.958Z",
      "on": [
        {
          "@type": "oa:SpecificResource",
          "full": "https://purl.stanford.edu/wh234bz9013/iiif/canvas/cocina-fileSet-wh234bz9013-wh234bz9013_1",
          "selector": {
            "@type": "oa:Choice",
            "default": {
              "@type": "oa:FragmentSelector",
              "value": "xywh=5510,3524,1634,865"
            },
            "item": {
              "@type": "oa:SvgSelector",
              "value": "<svg xmlns='http://www.w3.org/2000/svg'><path xmlns=\"http://www.w3.org/2000/svg\" d=\"M7144.57324,4388.84931h-817.1556v0h-817.1556v-432.5179v-432.5179h817.1556h817.1556v432.5179z\" data-paper-data=\"{&quot;strokeWidth&quot;:1,&quot;rotation&quot;:0,&quot;annotation&quot;:null,&quot;nonHoverStrokeColor&quot;:[&quot;Color&quot;,0,0.74902,1],&quot;editable&quot;:true}\" id=\"rectangle_8b96bd22-b305-4d1e-a9fe-1bf9ce574665\" fill-opacity=\"0.00001\" fill=\"#00bfff\" fill-rule=\"nonzero\" stroke=\"#00bfff\" stroke-width=\"87.74527\" stroke-linecap=\"butt\" stroke-linejoin=\"miter\" stroke-miterlimit=\"10\" stroke-dasharray=\"\" stroke-dashoffset=\"0\" font-family=\"none\" font-weight=\"none\" font-size=\"none\" text-anchor=\"none\" style=\"mix-blend-mode: normal\"/></svg>"
            }
          },
          "within": {
            "@id": "https://purl.stanford.edu/wh234bz9013/iiif/manifest",
            "@type": "sc:Manifest"
          }
        }
      ],
      "resource": [
        {
          "@type": "dctypes:Text",
          "chars": "<p>Leo</p>",
          "format": "text/html"
        },
        {
          "@type": "oa:Tag",
          "chars": "zodiac"
        }
      ]
    }
  ]
  }
    </code>
  </details>
```
</script>
<iiif-storyboard annotationurl="gr1b4nhz2mkvmfs33p9mke"></iiif-storyboard>
```
</div>

<script type="application/json" id="gr1b4nhz2mkvmfs33p9mke">
{
  "@context": "http://iiif.io/api/presentation/2/context.json",
  "@id": "/annotate/annotations/663c12e3-d419-464b-96ed-031bbc7674f4-list.json",
  "@type": "sc:AnnotationList",
  "oa:serializedAt": "2019-08-22T20:24:06.308Z",
  "resources": [
    {
      "@context": "http://iiif.io/api/presentation/2/context.json",
      "@id": "663c12e3-d419-464b-96ed-031bbc7674f4",
      "@type": "oa:Annotation",
      "motivation": [
        "oa:commenting",
        "oa:tagging"
      ],
      "oa:serializedAt": "2019-08-22T20:23:32.336Z",
      "on": [
        {
          "@type": "oa:SpecificResource",
          "full": "https://purl.stanford.edu/wh234bz9013/iiif/canvas/cocina-fileSet-wh234bz9013-wh234bz9013_1",
          "selector": {
            "@type": "oa:Choice",
            "default": {
              "@type": "oa:FragmentSelector",
              "value": "xywh=2997,1697,1087,719"
            },
            "item": {
              "@type": "oa:SvgSelector",
              "value": "<svg xmlns='http://www.w3.org/2000/svg'><path xmlns=\"http://www.w3.org/2000/svg\" d=\"M2997.17524,1696.60216h543.40785v0h543.40785v359.30246v359.30246h-543.40785h-543.40785v-359.30246z\" data-paper-data=\"{&quot;strokeWidth&quot;:1,&quot;rotation&quot;:0,&quot;annotation&quot;:null,&quot;nonHoverStrokeColor&quot;:[&quot;Color&quot;,0,0.74902,1],&quot;editable&quot;:true}\" id=\"rectangle_35a6ec4b-ca51-40f7-8aba-c26833a31088\" fill-opacity=\"0.00001\" fill=\"#00bfff\" fill-rule=\"nonzero\" stroke=\"#00bfff\" stroke-width=\"87.74527\" stroke-linecap=\"butt\" stroke-linejoin=\"miter\" stroke-miterlimit=\"10\" stroke-dasharray=\"\" stroke-dashoffset=\"0\" font-family=\"none\" font-weight=\"none\" font-size=\"none\" text-anchor=\"none\" style=\"mix-blend-mode: normal\"/></svg>"
            }
          },
          "within": {
            "@id": "https://purl.stanford.edu/wh234bz9013/iiif/manifest",
            "@type": "sc:Manifest"
          }
        }
      ],
      "resource": [
        {
          "@type": "dctypes:Text",
          "chars": "<p>Cepheus, king of Aethiopia<span style=\"color: #222222; font-family: arial, sans-serif; font-size: small;\"><span style=\"caret-color: #222222;\">.</span></span></p>",
          "format": "text/html"
        },
        {
          "@type": "oa:Tag",
          "chars": "greek_mythology"
        }
      ]
    },
    {
      "@context": "http://iiif.io/api/presentation/2/context.json",
      "@id": "45767112-2f44-4a7d-a6a3-3da278338417",
      "@type": "oa:Annotation",
      "motivation": [
        "oa:commenting",
        "oa:tagging"
      ],
      "oa:serializedAt": "2019-08-22T20:23:34.899Z",
      "on": [
        {
          "@type": "oa:SpecificResource",
          "full": "https://purl.stanford.edu/wh234bz9013/iiif/canvas/cocina-fileSet-wh234bz9013-wh234bz9013_1",
          "selector": {
            "@type": "oa:Choice",
            "default": {
              "@type": "oa:FragmentSelector",
              "value": "xywh=4089,1748,902,578"
            },
            "item": {
              "@type": "oa:SvgSelector",
              "value": "<svg xmlns='http://www.w3.org/2000/svg'><path xmlns=\"http://www.w3.org/2000/svg\" d=\"M4088.56835,1748.26077h451.08708v0h451.08708v288.7912v288.7912h-451.08708h-451.08708v-288.7912z\" data-paper-data=\"{&quot;strokeWidth&quot;:1,&quot;rotation&quot;:0,&quot;annotation&quot;:null,&quot;nonHoverStrokeColor&quot;:[&quot;Color&quot;,0,0.74902,1],&quot;editable&quot;:true}\" id=\"rectangle_a1fb84a9-b198-4597-9926-53c092540c77\" fill-opacity=\"0.00001\" fill=\"#00bfff\" fill-rule=\"nonzero\" stroke=\"#00bfff\" stroke-width=\"87.74527\" stroke-linecap=\"butt\" stroke-linejoin=\"miter\" stroke-miterlimit=\"10\" stroke-dasharray=\"\" stroke-dashoffset=\"0\" font-family=\"none\" font-weight=\"none\" font-size=\"none\" text-anchor=\"none\" style=\"mix-blend-mode: normal\"/></svg>"
            }
          },
          "within": {
            "@id": "https://purl.stanford.edu/wh234bz9013/iiif/manifest",
            "@type": "sc:Manifest"
          }
        }
      ],
      "resource": [
        {
          "@type": "dctypes:Text",
          "chars": "<p>Ursa Minor</p>",
          "format": "text/html"
        },
        {
          "@type": "oa:Tag",
          "chars": "animals"
        }
      ]
    },
    {
      "@context": "http://iiif.io/api/presentation/2/context.json",
      "@id": "c5594040-67bb-464a-8d77-dad2231875c8",
      "@type": "oa:Annotation",
      "motivation": [
        "oa:commenting",
        "oa:tagging"
      ],
      "oa:serializedAt": "2019-08-22T20:23:37.690Z",
      "on": [
        {
          "@type": "oa:SpecificResource",
          "full": "https://purl.stanford.edu/wh234bz9013/iiif/canvas/cocina-fileSet-wh234bz9013-wh234bz9013_1",
          "selector": {
            "@type": "oa:Choice",
            "default": {
              "@type": "oa:FragmentSelector",
              "value": "xywh=4380,2331,1733,1189"
            },
            "item": {
              "@type": "oa:SvgSelector",
              "value": "<svg xmlns='http://www.w3.org/2000/svg'><path xmlns=\"http://www.w3.org/2000/svg\" d=\"M4379.74625,2330.61657h866.3736v0h866.3736v594.28933v594.28933h-866.3736h-866.3736v-594.28933z\" data-paper-data=\"{&quot;strokeWidth&quot;:1,&quot;rotation&quot;:0,&quot;annotation&quot;:null,&quot;nonHoverStrokeColor&quot;:[&quot;Color&quot;,0,0.74902,1],&quot;editable&quot;:true}\" id=\"rectangle_cf48a626-2201-44fa-9aa9-c74263d62c79\" fill-opacity=\"0.00001\" fill=\"#00bfff\" fill-rule=\"nonzero\" stroke=\"#00bfff\" stroke-width=\"87.74527\" stroke-linecap=\"butt\" stroke-linejoin=\"miter\" stroke-miterlimit=\"10\" stroke-dasharray=\"\" stroke-dashoffset=\"0\" font-family=\"none\" font-weight=\"none\" font-size=\"none\" text-anchor=\"none\" style=\"mix-blend-mode: normal\"/></svg>"
            }
          },
          "within": {
            "@id": "https://purl.stanford.edu/wh234bz9013/iiif/manifest",
            "@type": "sc:Manifest"
          }
        }
      ],
      "resource": [
        {
          "@type": "dctypes:Text",
          "chars": "<p>This is a rendering of Ursa Major. This&nbsp;constellation translated from the latin means \"greater bear.\" This is in refernce to Ursa Minor (lesser bear) which can be seen in the image below.</p>\n<p>These constellations are often talked about in contrast to each other. They are also often called the big and little dipper respectively.</p>",
          "format": "text/html"
        },
        {
          "@type": "oa:Tag",
          "chars": "animals"
        }
      ]
    },
    {
      "@context": "http://iiif.io/api/presentation/2/context.json",
      "@id": "2b4c2e91-ed32-4962-b559-cbdb6a0057b6",
      "@type": "oa:Annotation",
      "motivation": [
        "oa:commenting",
        "oa:tagging"
      ],
      "oa:serializedAt": "2019-08-22T20:23:40.088Z",
      "on": [
        {
          "@type": "oa:SpecificResource",
          "full": "https://purl.stanford.edu/wh234bz9013/iiif/canvas/cocina-fileSet-wh234bz9013-wh234bz9013_1",
          "selector": {
            "@type": "oa:Choice",
            "default": {
              "@type": "oa:FragmentSelector",
              "value": "xywh=6398,2352,600,750"
            },
            "item": {
              "@type": "oa:SvgSelector",
              "value": "<svg xmlns='http://www.w3.org/2000/svg'><path xmlns=\"http://www.w3.org/2000/svg\" d=\"M6397.64195,2352.34435h300.04932v0h300.04932v375.06165v375.06165h-300.04932h-300.04932v-375.06165z\" data-paper-data=\"{&quot;strokeWidth&quot;:1,&quot;rotation&quot;:0,&quot;annotation&quot;:null,&quot;nonHoverStrokeColor&quot;:[&quot;Color&quot;,0,0.74902,1],&quot;editable&quot;:true}\" id=\"rectangle_a1e6898b-b17a-4077-acb3-7c119b94b6aa\" fill-opacity=\"0.00001\" fill=\"#00bfff\" fill-rule=\"nonzero\" stroke=\"#00bfff\" stroke-width=\"87.74527\" stroke-linecap=\"butt\" stroke-linejoin=\"miter\" stroke-miterlimit=\"10\" stroke-dasharray=\"\" stroke-dashoffset=\"0\" font-family=\"none\" font-weight=\"none\" font-size=\"none\" text-anchor=\"none\" style=\"mix-blend-mode: normal\"/></svg>"
            }
          },
          "within": {
            "@id": "https://purl.stanford.edu/wh234bz9013/iiif/manifest",
            "@type": "sc:Manifest"
          }
        }
      ],
      "resource": [
        {
          "@type": "dctypes:Text",
          "chars": "<p>Coma Berenices, means \"Berenice's Hair\" in English. Named for Queen Berenice II of Egypt. Is the only modern constellation named for a historic person.&nbsp;</p>",
          "format": "text/html"
        },
        {
          "@type": "oa:Tag",
          "chars": "historical"
        }
      ]
    },
    {
      "@context": "http://iiif.io/api/presentation/2/context.json",
      "@id": "142f9b22-b3db-4c37-bdff-0d251d1c02a7",
      "@type": "oa:Annotation",
      "motivation": [
        "oa:commenting",
        "oa:tagging"
      ],
      "oa:serializedAt": "2019-08-22T20:23:29.667Z",
      "on": [
        {
          "@type": "oa:SpecificResource",
          "full": "https://purl.stanford.edu/wh234bz9013/iiif/canvas/cocina-fileSet-wh234bz9013-wh234bz9013_1",
          "selector": {
            "@type": "oa:Choice",
            "default": {
              "@type": "oa:FragmentSelector",
              "value": "xywh=1964,2596,1143,707"
            },
            "item": {
              "@type": "oa:SvgSelector",
              "value": "<svg xmlns='http://www.w3.org/2000/svg'><path xmlns=\"http://www.w3.org/2000/svg\" d=\"M1963.80949,2596.34303h571.61755v0h571.61755v353.36357v353.36357h-571.61755h-571.61755v-353.36357z\" data-paper-data=\"{&quot;strokeWidth&quot;:1,&quot;rotation&quot;:0,&quot;annotation&quot;:null,&quot;nonHoverStrokeColor&quot;:[&quot;Color&quot;,0,0.74902,1],&quot;editable&quot;:true}\" id=\"rectangle_d6c0a0fc-b0dc-4b1d-bab1-11a631348684\" fill-opacity=\"0.00001\" fill=\"#00bfff\" fill-rule=\"nonzero\" stroke=\"#00bfff\" stroke-width=\"87.74527\" stroke-linecap=\"butt\" stroke-linejoin=\"miter\" stroke-miterlimit=\"10\" stroke-dasharray=\"\" stroke-dashoffset=\"0\" font-family=\"none\" font-weight=\"none\" font-size=\"none\" text-anchor=\"none\" style=\"mix-blend-mode: normal\"/></svg>"
            }
          },
          "within": {
            "@id": "https://purl.stanford.edu/wh234bz9013/iiif/manifest",
            "@type": "sc:Manifest"
          }
        }
      ],
      "resource": [
        {
          "@type": "dctypes:Text",
          "chars": "<p>Andromeda, the chained woman.</p>",
          "format": "text/html"
        },
        {
          "@type": "oa:Tag",
          "chars": "greek_mythology"
        }
      ]
    },
    {
      "@context": "http://iiif.io/api/presentation/2/context.json",
      "@id": "1192e96e-0bd7-4695-b660-70e089be1053",
      "@type": "oa:Annotation",
      "motivation": [
        "oa:commenting",
        "oa:tagging"
      ],
      "oa:serializedAt": "2019-08-22T20:24:02.451Z",
      "on": [
        {
          "@type": "oa:SpecificResource",
          "full": "https://purl.stanford.edu/wh234bz9013/iiif/canvas/cocina-fileSet-wh234bz9013-wh234bz9013_1",
          "selector": {
            "@type": "oa:Choice",
            "default": {
              "@type": "oa:FragmentSelector",
              "value": "xywh=2319,3719,666,613"
            },
            "item": {
              "@type": "oa:SvgSelector",
              "value": "<svg xmlns='http://www.w3.org/2000/svg'><path xmlns=\"http://www.w3.org/2000/svg\" d=\"M2319.20945,3718.80755h333.15036v0h333.15036v306.49833v306.49833h-333.15036h-333.15036v-306.49833z\" data-paper-data=\"{&quot;strokeWidth&quot;:1,&quot;rotation&quot;:0,&quot;annotation&quot;:null,&quot;nonHoverStrokeColor&quot;:[&quot;Color&quot;,0,0.74902,1],&quot;editable&quot;:true}\" id=\"rectangle_81d323bd-7398-4e2e-b903-6c7838437afb\" fill-opacity=\"0.00001\" fill=\"#00bfff\" fill-rule=\"nonzero\" stroke=\"#00bfff\" stroke-width=\"87.74527\" stroke-linecap=\"butt\" stroke-linejoin=\"miter\" stroke-miterlimit=\"10\" stroke-dasharray=\"\" stroke-dashoffset=\"0\" font-family=\"none\" font-weight=\"none\" font-size=\"none\" text-anchor=\"none\" style=\"mix-blend-mode: normal\"/></svg>"
            }
          },
          "within": {
            "@id": "https://purl.stanford.edu/wh234bz9013/iiif/manifest",
            "@type": "sc:Manifest"
          }
        }
      ],
      "resource": [
        {
          "@type": "dctypes:Text",
          "chars": "<p>Aries</p>",
          "format": "text/html"
        },
        {
          "@type": "oa:Tag",
          "chars": "zodiac"
        }
      ]
    },
    {
      "@context": "http://iiif.io/api/presentation/2/context.json",
      "@id": "2767c17e-1c48-4545-96e4-d02159ec20bb",
      "@type": "oa:Annotation",
      "motivation": [
        "oa:commenting",
        "oa:tagging"
      ],
      "oa:serializedAt": "2019-08-22T20:23:59.809Z",
      "on": [
        {
          "@type": "oa:SpecificResource",
          "full": "https://purl.stanford.edu/wh234bz9013/iiif/canvas/cocina-fileSet-wh234bz9013-wh234bz9013_1",
          "selector": {
            "@type": "oa:Choice",
            "default": {
              "@type": "oa:FragmentSelector",
              "value": "xywh=2716,4039,1149,864"
            },
            "item": {
              "@type": "oa:SvgSelector",
              "value": "<svg xmlns='http://www.w3.org/2000/svg'><path xmlns=\"http://www.w3.org/2000/svg\" d=\"M3865.0271,4038.63189h-574.35121v0h-574.35121v431.76286v431.76286h574.35121h574.35121v-431.76286z\" data-paper-data=\"{&quot;strokeWidth&quot;:1,&quot;rotation&quot;:0,&quot;annotation&quot;:null,&quot;nonHoverStrokeColor&quot;:[&quot;Color&quot;,0,0.74902,1],&quot;editable&quot;:true}\" id=\"rectangle_74d77532-9717-41cd-8b50-270f3a03c54e\" fill-opacity=\"0.00001\" fill=\"#00bfff\" fill-rule=\"nonzero\" stroke=\"#00bfff\" stroke-width=\"87.74527\" stroke-linecap=\"butt\" stroke-linejoin=\"miter\" stroke-miterlimit=\"10\" stroke-dasharray=\"\" stroke-dashoffset=\"0\" font-family=\"none\" font-weight=\"none\" font-size=\"none\" text-anchor=\"none\" style=\"mix-blend-mode: normal\"/></svg>"
            }
          },
          "within": {
            "@id": "https://purl.stanford.edu/wh234bz9013/iiif/manifest",
            "@type": "sc:Manifest"
          }
        }
      ],
      "resource": [
        {
          "@type": "dctypes:Text",
          "chars": "<p>Taurus</p>",
          "format": "text/html"
        },
        {
          "@type": "oa:Tag",
          "chars": "zodiac"
        }
      ]
    },
    {
      "@context": "http://iiif.io/api/presentation/2/context.json",
      "@id": "6108adbd-17b1-4c01-940f-08b7453b26b1",
      "@type": "oa:Annotation",
      "motivation": [
        "oa:commenting",
        "oa:tagging"
      ],
      "oa:serializedAt": "2019-08-22T20:24:06.308Z",
      "on": [
        {
          "@type": "oa:SpecificResource",
          "full": "https://purl.stanford.edu/wh234bz9013/iiif/canvas/cocina-fileSet-wh234bz9013-wh234bz9013_1",
          "selector": {
            "@type": "oa:Choice",
            "default": {
              "@type": "oa:FragmentSelector",
              "value": "xywh=2802,3671,286,327"
            },
            "item": {
              "@type": "oa:SvgSelector",
              "value": "<svg xmlns='http://www.w3.org/2000/svg'><path xmlns=\"http://www.w3.org/2000/svg\" d=\"M2801.86839,3671.24041h143.20225v0h143.20225v163.48923v163.48923h-143.20225h-143.20225v-163.48923z\" data-paper-data=\"{&quot;strokeWidth&quot;:1,&quot;rotation&quot;:0,&quot;annotation&quot;:null,&quot;nonHoverStrokeColor&quot;:[&quot;Color&quot;,0,0.74902,1],&quot;editable&quot;:true}\" id=\"rectangle_bb5e69e9-4f33-4ed1-8247-f02560fabbdf\" fill-opacity=\"0.00001\" fill=\"#00bfff\" fill-rule=\"nonzero\" stroke=\"#00bfff\" stroke-width=\"87.74527\" stroke-linecap=\"butt\" stroke-linejoin=\"miter\" stroke-miterlimit=\"10\" stroke-dasharray=\"\" stroke-dashoffset=\"0\" font-family=\"none\" font-weight=\"none\" font-size=\"none\" text-anchor=\"none\" style=\"mix-blend-mode: normal\"/></svg>"
            }
          },
          "within": {
            "@id": "https://purl.stanford.edu/wh234bz9013/iiif/manifest",
            "@type": "sc:Manifest"
          }
        }
      ],
      "resource": [
        {
          "@type": "dctypes:Text",
          "chars": "<p>Apes later know as Vespa, Lilium and then Musca Borealis. Is latin for bees.</p>",
          "format": "text/html"
        },
        {
          "@type": "oa:Tag",
          "chars": "animals"
        },
        {
          "@type": "oa:Tag",
          "chars": "discarded_constellation"
        }
      ]
    },
    {
      "@context": "http://iiif.io/api/presentation/2/context.json",
      "@id": "2af6d0a4-6ade-42e0-93ee-dc15b5278b83",
      "@type": "oa:Annotation",
      "motivation": [
        "oa:commenting",
        "oa:tagging"
      ],
      "oa:serializedAt": "2019-08-22T20:23:56.943Z",
      "on": [
        {
          "@type": "oa:SpecificResource",
          "full": "https://purl.stanford.edu/wh234bz9013/iiif/canvas/cocina-fileSet-wh234bz9013-wh234bz9013_1",
          "selector": {
            "@type": "oa:Choice",
            "default": {
              "@type": "oa:FragmentSelector",
              "value": "xywh=3613,5545,601,415"
            },
            "item": {
              "@type": "oa:SvgSelector",
              "value": "<svg xmlns='http://www.w3.org/2000/svg'><path xmlns=\"http://www.w3.org/2000/svg\" d=\"M3613.34779,5544.80315h300.72472v0h300.72472v207.64326v207.64326h-300.72472h-300.72472v-207.64326z\" data-paper-data=\"{&quot;strokeWidth&quot;:1,&quot;rotation&quot;:0,&quot;annotation&quot;:null,&quot;nonHoverStrokeColor&quot;:[&quot;Color&quot;,0,0.74902,1],&quot;editable&quot;:true}\" id=\"rectangle_aabcc010-0cbf-4d58-be02-e8c52225c308\" fill-opacity=\"0.00001\" fill=\"#00bfff\" fill-rule=\"nonzero\" stroke=\"#00bfff\" stroke-width=\"87.74527\" stroke-linecap=\"butt\" stroke-linejoin=\"miter\" stroke-miterlimit=\"10\" stroke-dasharray=\"\" stroke-dashoffset=\"0\" font-family=\"none\" font-weight=\"none\" font-size=\"none\" text-anchor=\"none\" style=\"mix-blend-mode: normal\"/></svg>"
            }
          },
          "within": {
            "@id": "https://purl.stanford.edu/wh234bz9013/iiif/manifest",
            "@type": "sc:Manifest"
          }
        }
      ],
      "resource": [
        {
          "@type": "dctypes:Text",
          "chars": "<p>Lepus. Latin for hare.</p>",
          "format": "text/html"
        },
        {
          "@type": "oa:Tag",
          "chars": "animals"
        }
      ]
    },
    {
      "@context": "http://iiif.io/api/presentation/2/context.json",
      "@id": "c844edbf-17fb-4cb6-bc4e-cd7a0324d2dd",
      "@type": "oa:Annotation",
      "motivation": [
        "oa:commenting",
        "oa:tagging"
      ],
      "oa:serializedAt": "2019-08-22T20:23:53.326Z",
      "on": [
        {
          "@type": "oa:SpecificResource",
          "full": "https://purl.stanford.edu/wh234bz9013/iiif/canvas/cocina-fileSet-wh234bz9013-wh234bz9013_1",
          "selector": {
            "@type": "oa:Choice",
            "default": {
              "@type": "oa:FragmentSelector",
              "value": "xywh=4737,4707,375,315"
            },
            "item": {
              "@type": "oa:SvgSelector",
              "value": "<svg xmlns='http://www.w3.org/2000/svg'><path xmlns=\"http://www.w3.org/2000/svg\" d=\"M4737.48543,4707.07h187.35627v0h187.35627v157.52247v157.52247h-187.35627h-187.35627v-157.52247z\" data-paper-data=\"{&quot;strokeWidth&quot;:1,&quot;rotation&quot;:0,&quot;annotation&quot;:null,&quot;nonHoverStrokeColor&quot;:[&quot;Color&quot;,0,0.74902,1],&quot;editable&quot;:true}\" id=\"rectangle_ffed21ee-11af-4b5d-8183-c58619ad87d1\" fill-opacity=\"0.00001\" fill=\"#00bfff\" fill-rule=\"nonzero\" stroke=\"#00bfff\" stroke-width=\"87.74527\" stroke-linecap=\"butt\" stroke-linejoin=\"miter\" stroke-miterlimit=\"10\" stroke-dasharray=\"\" stroke-dashoffset=\"0\" font-family=\"none\" font-weight=\"none\" font-size=\"none\" text-anchor=\"none\" style=\"mix-blend-mode: normal\"/></svg>"
            }
          },
          "within": {
            "@id": "https://purl.stanford.edu/wh234bz9013/iiif/manifest",
            "@type": "sc:Manifest"
          }
        }
      ],
      "resource": [
        {
          "@type": "dctypes:Text",
          "chars": "<p>Canis minor. Translates into English as lesser dog.</p>",
          "format": "text/html"
        },
        {
          "@type": "oa:Tag",
          "chars": "animals"
        }
      ]
    },
    {
      "@context": "http://iiif.io/api/presentation/2/context.json",
      "@id": "d326ca50-e2cd-4096-88a0-0d5aaf366cd1",
      "@type": "oa:Annotation",
      "motivation": [
        "oa:commenting",
        "oa:tagging"
      ],
      "oa:serializedAt": "2019-08-22T20:23:50.137Z",
      "on": [
        {
          "@type": "oa:SpecificResource",
          "full": "https://purl.stanford.edu/wh234bz9013/iiif/canvas/cocina-fileSet-wh234bz9013-wh234bz9013_1",
          "selector": {
            "@type": "oa:Choice",
            "default": {
              "@type": "oa:FragmentSelector",
              "value": "xywh=4281,3930,835,753"
            },
            "item": {
              "@type": "oa:SvgSelector",
              "value": "<svg xmlns='http://www.w3.org/2000/svg'><path xmlns=\"http://www.w3.org/2000/svg\" d=\"M5115.49235,3929.514h-417.37077v0h-417.37077v376.59316v376.59316h417.37077h417.37077v-376.59316z\" data-paper-data=\"{&quot;strokeWidth&quot;:1,&quot;rotation&quot;:0,&quot;annotation&quot;:null,&quot;nonHoverStrokeColor&quot;:[&quot;Color&quot;,0,0.74902,1],&quot;editable&quot;:true}\" id=\"rectangle_36e78f2b-7fab-4df5-b6d7-eb5b5ff4d7c1\" fill-opacity=\"0.00001\" fill=\"#00bfff\" fill-rule=\"nonzero\" stroke=\"#00bfff\" stroke-width=\"87.74527\" stroke-linecap=\"butt\" stroke-linejoin=\"miter\" stroke-miterlimit=\"10\" stroke-dasharray=\"\" stroke-dashoffset=\"0\" font-family=\"none\" font-weight=\"none\" font-size=\"none\" text-anchor=\"none\" style=\"mix-blend-mode: normal\"/></svg>"
            }
          },
          "within": {
            "@id": "https://purl.stanford.edu/wh234bz9013/iiif/manifest",
            "@type": "sc:Manifest"
          }
        }
      ],
      "resource": [
        {
          "@type": "dctypes:Text",
          "chars": "<p>Gemini</p>",
          "format": "text/html"
        },
        {
          "@type": "oa:Tag",
          "chars": "zodiac"
        }
      ]
    },
    {
      "@context": "http://iiif.io/api/presentation/2/context.json",
      "@id": "c8f1cf49-d7aa-4f62-8086-1bb45dc86f3b",
      "@type": "oa:Annotation",
      "motivation": [
        "oa:commenting",
        "oa:tagging"
      ],
      "oa:serializedAt": "2019-08-22T20:23:46.819Z",
      "on": [
        {
          "@type": "oa:SpecificResource",
          "full": "https://purl.stanford.edu/wh234bz9013/iiif/canvas/cocina-fileSet-wh234bz9013-wh234bz9013_1",
          "selector": {
            "@type": "oa:Choice",
            "default": {
              "@type": "oa:FragmentSelector",
              "value": "xywh=4847,3848,880,931"
            },
            "item": {
              "@type": "oa:SvgSelector",
              "value": "<svg xmlns='http://www.w3.org/2000/svg'><path xmlns=\"http://www.w3.org/2000/svg\" d=\"M5727.1564,3847.95879h-440.15825v0h-440.15825v465.34442v465.34442h440.15825h440.15825v-465.34442z\" data-paper-data=\"{&quot;strokeWidth&quot;:1,&quot;rotation&quot;:0,&quot;annotation&quot;:null,&quot;nonHoverStrokeColor&quot;:[&quot;Color&quot;,0,0.74902,1],&quot;editable&quot;:true}\" id=\"rectangle_03586755-8c19-42ac-9c13-e70ee27d27c6\" fill-opacity=\"0.00001\" fill=\"#00bfff\" fill-rule=\"nonzero\" stroke=\"#00bfff\" stroke-width=\"87.74527\" stroke-linecap=\"butt\" stroke-linejoin=\"miter\" stroke-miterlimit=\"10\" stroke-dasharray=\"\" stroke-dashoffset=\"0\" font-family=\"none\" font-weight=\"none\" font-size=\"none\" text-anchor=\"none\" style=\"mix-blend-mode: normal\"/></svg>"
            }
          },
          "within": {
            "@id": "https://purl.stanford.edu/wh234bz9013/iiif/manifest",
            "@type": "sc:Manifest"
          }
        }
      ],
      "resource": [
        {
          "@type": "dctypes:Text",
          "chars": "<p>Cancer</p>",
          "format": "text/html"
        },
        {
          "@type": "oa:Tag",
          "chars": "zodiac"
        }
      ]
    },
    {
      "@context": "http://iiif.io/api/presentation/2/context.json",
      "@id": "176d313f-0f2d-4d25-a3f9-b4e10ec96718",
      "@type": "oa:Annotation",
      "motivation": [
        "oa:commenting",
        "oa:tagging"
      ],
      "oa:serializedAt": "2019-08-22T20:23:42.958Z",
      "on": [
        {
          "@type": "oa:SpecificResource",
          "full": "https://purl.stanford.edu/wh234bz9013/iiif/canvas/cocina-fileSet-wh234bz9013-wh234bz9013_1",
          "selector": {
            "@type": "oa:Choice",
            "default": {
              "@type": "oa:FragmentSelector",
              "value": "xywh=5510,3524,1634,865"
            },
            "item": {
              "@type": "oa:SvgSelector",
              "value": "<svg xmlns='http://www.w3.org/2000/svg'><path xmlns=\"http://www.w3.org/2000/svg\" d=\"M7144.57324,4388.84931h-817.1556v0h-817.1556v-432.5179v-432.5179h817.1556h817.1556v432.5179z\" data-paper-data=\"{&quot;strokeWidth&quot;:1,&quot;rotation&quot;:0,&quot;annotation&quot;:null,&quot;nonHoverStrokeColor&quot;:[&quot;Color&quot;,0,0.74902,1],&quot;editable&quot;:true}\" id=\"rectangle_8b96bd22-b305-4d1e-a9fe-1bf9ce574665\" fill-opacity=\"0.00001\" fill=\"#00bfff\" fill-rule=\"nonzero\" stroke=\"#00bfff\" stroke-width=\"87.74527\" stroke-linecap=\"butt\" stroke-linejoin=\"miter\" stroke-miterlimit=\"10\" stroke-dasharray=\"\" stroke-dashoffset=\"0\" font-family=\"none\" font-weight=\"none\" font-size=\"none\" text-anchor=\"none\" style=\"mix-blend-mode: normal\"/></svg>"
            }
          },
          "within": {
            "@id": "https://purl.stanford.edu/wh234bz9013/iiif/manifest",
            "@type": "sc:Manifest"
          }
        }
      ],
      "resource": [
        {
          "@type": "dctypes:Text",
          "chars": "<p>Leo</p>",
          "format": "text/html"
        },
        {
          "@type": "oa:Tag",
          "chars": "zodiac"
        }
      ]
    }
  ]
  }
</script>
<iiif-storyboard annotationurl="gr1b4nhz2mkvmfs33p9mke"></iiif-storyboard>

## Using base64 encoded Data URI 
You can convert your JSON to a dataURI with one of the following online tools: [https://dopiaza.org/tools/datauri/index.php](https://dopiaza.org/tools/datauri/index.php). This is one of the first ones I found on Google. I am sure there are others that work.


<div markdown="1" class="scriptcode2 highlighter-rouge" style="background:#eef">
`<iiif-annotation annotationurl='`

<details class="highlight" style="margin:0px;">
<summary>Base64 encoded URI</summary>
data:application/json;charset=utf8;base64,ewogICJAY29udGV4dCI6ICJodHRwOi8vaWlpZi5pby9hcGkvcHJlc2VudGF0aW9uLzIvY29udGV4dC5qc29uIiwKICAiQGlkIjogIi9hbm5vdGF0ZS9hbm5vdGF0aW9ucy82NjNjMTJlMy1kNDE5LTQ2NGItOTZlZC0wMzFiYmM3Njc0ZjQtbGlzdC5qc29uIiwKICAiQHR5cGUiOiAic2M6QW5ub3RhdGlvbkxpc3QiLAogICJvYTpzZXJpYWxpemVkQXQiOiAiMjAxOS0wOC0yMlQyMDoyNDowNi4zMDhaIiwKICAicmVzb3VyY2VzIjogWwogICAgewogICAgICAiQGNvbnRleHQiOiAiaHR0cDovL2lpaWYuaW8vYXBpL3ByZXNlbnRhdGlvbi8yL2NvbnRleHQuanNvbiIsCiAgICAgICJAaWQiOiAiNjYzYzEyZTMtZDQxOS00NjRiLTk2ZWQtMDMxYmJjNzY3NGY0IiwKICAgICAgIkB0eXBlIjogIm9hOkFubm90YXRpb24iLAogICAgICAibW90aXZhdGlvbiI6IFsKICAgICAgICAib2E6Y29tbWVudGluZyIsCiAgICAgICAgIm9hOnRhZ2dpbmciCiAgICAgIF0sCiAgICAgICJvYTpzZXJpYWxpemVkQXQiOiAiMjAxOS0wOC0yMlQyMDoyMzozMi4zMzZaIiwKICAgICAgIm9uIjogWwogICAgICAgIHsKICAgICAgICAgICJAdHlwZSI6ICJvYTpTcGVjaWZpY1Jlc291cmNlIiwKICAgICAgICAgICJmdWxsIjogImh0dHBzOi8vcHVybC5zdGFuZm9yZC5lZHUvd2gyMzRiejkwMTMvaWlpZi9jYW52YXMvY29jaW5hLWZpbGVTZXQtd2gyMzRiejkwMTMtd2gyMzRiejkwMTNfMSIsCiAgICAgICAgICAic2VsZWN0b3IiOiB7CiAgICAgICAgICAgICJAdHlwZSI6ICJvYTpDaG9pY2UiLAogICAgICAgICAgICAiZGVmYXVsdCI6IHsKICAgICAgICAgICAgICAiQHR5cGUiOiAib2E6RnJhZ21lbnRTZWxlY3RvciIsCiAgICAgICAgICAgICAgInZhbHVlIjogInh5d2g9Mjk5NywxNjk3LDEwODcsNzE5IgogICAgICAgICAgICB9LAogICAgICAgICAgICAiaXRlbSI6IHsKICAgICAgICAgICAgICAiQHR5cGUiOiAib2E6U3ZnU2VsZWN0b3IiLAogICAgICAgICAgICAgICJ2YWx1ZSI6ICI8c3ZnIHhtbG5zPSdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Zyc+PHBhdGggeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIGQ9XCJNMjk5Ny4xNzUyNCwxNjk2LjYwMjE2aDU0My40MDc4NXYwaDU0My40MDc4NXYzNTkuMzAyNDZ2MzU5LjMwMjQ2aC01NDMuNDA3ODVoLTU0My40MDc4NXYtMzU5LjMwMjQ2elwiIGRhdGEtcGFwZXItZGF0YT1cInsmcXVvdDtzdHJva2VXaWR0aCZxdW90OzoxLCZxdW90O3JvdGF0aW9uJnF1b3Q7OjAsJnF1b3Q7YW5ub3RhdGlvbiZxdW90OzpudWxsLCZxdW90O25vbkhvdmVyU3Ryb2tlQ29sb3ImcXVvdDs6WyZxdW90O0NvbG9yJnF1b3Q7LDAsMC43NDkwMiwxXSwmcXVvdDtlZGl0YWJsZSZxdW90Ozp0cnVlfVwiIGlkPVwicmVjdGFuZ2xlXzM1YTZlYzRiLWNhNTEtNDBmNy04YWJhLWMyNjgzM2EzMTA4OFwiIGZpbGwtb3BhY2l0eT1cIjAuMDAwMDFcIiBmaWxsPVwiIzAwYmZmZlwiIGZpbGwtcnVsZT1cIm5vbnplcm9cIiBzdHJva2U9XCIjMDBiZmZmXCIgc3Ryb2tlLXdpZHRoPVwiODcuNzQ1MjdcIiBzdHJva2UtbGluZWNhcD1cImJ1dHRcIiBzdHJva2UtbGluZWpvaW49XCJtaXRlclwiIHN0cm9rZS1taXRlcmxpbWl0PVwiMTBcIiBzdHJva2UtZGFzaGFycmF5PVwiXCIgc3Ryb2tlLWRhc2hvZmZzZXQ9XCIwXCIgZm9udC1mYW1pbHk9XCJub25lXCIgZm9udC13ZWlnaHQ9XCJub25lXCIgZm9udC1zaXplPVwibm9uZVwiIHRleHQtYW5jaG9yPVwibm9uZVwiIHN0eWxlPVwibWl4LWJsZW5kLW1vZGU6IG5vcm1hbFwiLz48L3N2Zz4iCiAgICAgICAgICAgIH0KICAgICAgICAgIH0sCiAgICAgICAgICAid2l0aGluIjogewogICAgICAgICAgICAiQGlkIjogImh0dHBzOi8vcHVybC5zdGFuZm9yZC5lZHUvd2gyMzRiejkwMTMvaWlpZi9tYW5pZmVzdCIsCiAgICAgICAgICAgICJAdHlwZSI6ICJzYzpNYW5pZmVzdCIKICAgICAgICAgIH0KICAgICAgICB9CiAgICAgIF0sCiAgICAgICJyZXNvdXJjZSI6IFsKICAgICAgICB7CiAgICAgICAgICAiQHR5cGUiOiAiZGN0eXBlczpUZXh0IiwKICAgICAgICAgICJjaGFycyI6ICI8cD5DZXBoZXVzLCBraW5nIG9mIEFldGhpb3BpYTxzcGFuIHN0eWxlPVwiY29sb3I6ICMyMjIyMjI7IGZvbnQtZmFtaWx5OiBhcmlhbCwgc2Fucy1zZXJpZjsgZm9udC1zaXplOiBzbWFsbDtcIj48c3BhbiBzdHlsZT1cImNhcmV0LWNvbG9yOiAjMjIyMjIyO1wiPi48L3NwYW4+PC9zcGFuPjwvcD4iLAogICAgICAgICAgImZvcm1hdCI6ICJ0ZXh0L2h0bWwiCiAgICAgICAgfSwKICAgICAgICB7CiAgICAgICAgICAiQHR5cGUiOiAib2E6VGFnIiwKICAgICAgICAgICJjaGFycyI6ICJncmVla19teXRob2xvZ3kiCiAgICAgICAgfQogICAgICBdCiAgICB9LAogICAgewogICAgICAiQGNvbnRleHQiOiAiaHR0cDovL2lpaWYuaW8vYXBpL3ByZXNlbnRhdGlvbi8yL2NvbnRleHQuanNvbiIsCiAgICAgICJAaWQiOiAiNDU3NjcxMTItMmY0NC00YTdkLWE2YTMtM2RhMjc4MzM4NDE3IiwKICAgICAgIkB0eXBlIjogIm9hOkFubm90YXRpb24iLAogICAgICAibW90aXZhdGlvbiI6IFsKICAgICAgICAib2E6Y29tbWVudGluZyIsCiAgICAgICAgIm9hOnRhZ2dpbmciCiAgICAgIF0sCiAgICAgICJvYTpzZXJpYWxpemVkQXQiOiAiMjAxOS0wOC0yMlQyMDoyMzozNC44OTlaIiwKICAgICAgIm9uIjogWwogICAgICAgIHsKICAgICAgICAgICJAdHlwZSI6ICJvYTpTcGVjaWZpY1Jlc291cmNlIiwKICAgICAgICAgICJmdWxsIjogImh0dHBzOi8vcHVybC5zdGFuZm9yZC5lZHUvd2gyMzRiejkwMTMvaWlpZi9jYW52YXMvY29jaW5hLWZpbGVTZXQtd2gyMzRiejkwMTMtd2gyMzRiejkwMTNfMSIsCiAgICAgICAgICAic2VsZWN0b3IiOiB7CiAgICAgICAgICAgICJAdHlwZSI6ICJvYTpDaG9pY2UiLAogICAgICAgICAgICAiZGVmYXVsdCI6IHsKICAgICAgICAgICAgICAiQHR5cGUiOiAib2E6RnJhZ21lbnRTZWxlY3RvciIsCiAgICAgICAgICAgICAgInZhbHVlIjogInh5d2g9NDA4OSwxNzQ4LDkwMiw1NzgiCiAgICAgICAgICAgIH0sCiAgICAgICAgICAgICJpdGVtIjogewogICAgICAgICAgICAgICJAdHlwZSI6ICJvYTpTdmdTZWxlY3RvciIsCiAgICAgICAgICAgICAgInZhbHVlIjogIjxzdmcgeG1sbnM9J2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJz48cGF0aCB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgZD1cIk00MDg4LjU2ODM1LDE3NDguMjYwNzdoNDUxLjA4NzA4djBoNDUxLjA4NzA4djI4OC43OTEydjI4OC43OTEyaC00NTEuMDg3MDhoLTQ1MS4wODcwOHYtMjg4Ljc5MTJ6XCIgZGF0YS1wYXBlci1kYXRhPVwieyZxdW90O3N0cm9rZVdpZHRoJnF1b3Q7OjEsJnF1b3Q7cm90YXRpb24mcXVvdDs6MCwmcXVvdDthbm5vdGF0aW9uJnF1b3Q7Om51bGwsJnF1b3Q7bm9uSG92ZXJTdHJva2VDb2xvciZxdW90OzpbJnF1b3Q7Q29sb3ImcXVvdDssMCwwLjc0OTAyLDFdLCZxdW90O2VkaXRhYmxlJnF1b3Q7OnRydWV9XCIgaWQ9XCJyZWN0YW5nbGVfYTFmYjg0YTktYjE5OC00NTk3LTk5MjYtNTNjMDkyNTQwYzc3XCIgZmlsbC1vcGFjaXR5PVwiMC4wMDAwMVwiIGZpbGw9XCIjMDBiZmZmXCIgZmlsbC1ydWxlPVwibm9uemVyb1wiIHN0cm9rZT1cIiMwMGJmZmZcIiBzdHJva2Utd2lkdGg9XCI4Ny43NDUyN1wiIHN0cm9rZS1saW5lY2FwPVwiYnV0dFwiIHN0cm9rZS1saW5lam9pbj1cIm1pdGVyXCIgc3Ryb2tlLW1pdGVybGltaXQ9XCIxMFwiIHN0cm9rZS1kYXNoYXJyYXk9XCJcIiBzdHJva2UtZGFzaG9mZnNldD1cIjBcIiBmb250LWZhbWlseT1cIm5vbmVcIiBmb250LXdlaWdodD1cIm5vbmVcIiBmb250LXNpemU9XCJub25lXCIgdGV4dC1hbmNob3I9XCJub25lXCIgc3R5bGU9XCJtaXgtYmxlbmQtbW9kZTogbm9ybWFsXCIvPjwvc3ZnPiIKICAgICAgICAgICAgfQogICAgICAgICAgfSwKICAgICAgICAgICJ3aXRoaW4iOiB7CiAgICAgICAgICAgICJAaWQiOiAiaHR0cHM6Ly9wdXJsLnN0YW5mb3JkLmVkdS93aDIzNGJ6OTAxMy9paWlmL21hbmlmZXN0IiwKICAgICAgICAgICAgIkB0eXBlIjogInNjOk1hbmlmZXN0IgogICAgICAgICAgfQogICAgICAgIH0KICAgICAgXSwKICAgICAgInJlc291cmNlIjogWwogICAgICAgIHsKICAgICAgICAgICJAdHlwZSI6ICJkY3R5cGVzOlRleHQiLAogICAgICAgICAgImNoYXJzIjogIjxwPlVyc2EgTWlub3I8L3A+IiwKICAgICAgICAgICJmb3JtYXQiOiAidGV4dC9odG1sIgogICAgICAgIH0sCiAgICAgICAgewogICAgICAgICAgIkB0eXBlIjogIm9hOlRhZyIsCiAgICAgICAgICAiY2hhcnMiOiAiYW5pbWFscyIKICAgICAgICB9CiAgICAgIF0KICAgIH0sCiAgICB7CiAgICAgICJAY29udGV4dCI6ICJodHRwOi8vaWlpZi5pby9hcGkvcHJlc2VudGF0aW9uLzIvY29udGV4dC5qc29uIiwKICAgICAgIkBpZCI6ICJjNTU5NDA0MC02N2JiLTQ2NGEtOGQ3Ny1kYWQyMjMxODc1YzgiLAogICAgICAiQHR5cGUiOiAib2E6QW5ub3RhdGlvbiIsCiAgICAgICJtb3RpdmF0aW9uIjogWwogICAgICAgICJvYTpjb21tZW50aW5nIiwKICAgICAgICAib2E6dGFnZ2luZyIKICAgICAgXSwKICAgICAgIm9hOnNlcmlhbGl6ZWRBdCI6ICIyMDE5LTA4LTIyVDIwOjIzOjM3LjY5MFoiLAogICAgICAib24iOiBbCiAgICAgICAgewogICAgICAgICAgIkB0eXBlIjogIm9hOlNwZWNpZmljUmVzb3VyY2UiLAogICAgICAgICAgImZ1bGwiOiAiaHR0cHM6Ly9wdXJsLnN0YW5mb3JkLmVkdS93aDIzNGJ6OTAxMy9paWlmL2NhbnZhcy9jb2NpbmEtZmlsZVNldC13aDIzNGJ6OTAxMy13aDIzNGJ6OTAxM18xIiwKICAgICAgICAgICJzZWxlY3RvciI6IHsKICAgICAgICAgICAgIkB0eXBlIjogIm9hOkNob2ljZSIsCiAgICAgICAgICAgICJkZWZhdWx0IjogewogICAgICAgICAgICAgICJAdHlwZSI6ICJvYTpGcmFnbWVudFNlbGVjdG9yIiwKICAgICAgICAgICAgICAidmFsdWUiOiAieHl3aD00MzgwLDIzMzEsMTczMywxMTg5IgogICAgICAgICAgICB9LAogICAgICAgICAgICAiaXRlbSI6IHsKICAgICAgICAgICAgICAiQHR5cGUiOiAib2E6U3ZnU2VsZWN0b3IiLAogICAgICAgICAgICAgICJ2YWx1ZSI6ICI8c3ZnIHhtbG5zPSdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Zyc+PHBhdGggeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIGQ9XCJNNDM3OS43NDYyNSwyMzMwLjYxNjU3aDg2Ni4zNzM2djBoODY2LjM3MzZ2NTk0LjI4OTMzdjU5NC4yODkzM2gtODY2LjM3MzZoLTg2Ni4zNzM2di01OTQuMjg5MzN6XCIgZGF0YS1wYXBlci1kYXRhPVwieyZxdW90O3N0cm9rZVdpZHRoJnF1b3Q7OjEsJnF1b3Q7cm90YXRpb24mcXVvdDs6MCwmcXVvdDthbm5vdGF0aW9uJnF1b3Q7Om51bGwsJnF1b3Q7bm9uSG92ZXJTdHJva2VDb2xvciZxdW90OzpbJnF1b3Q7Q29sb3ImcXVvdDssMCwwLjc0OTAyLDFdLCZxdW90O2VkaXRhYmxlJnF1b3Q7OnRydWV9XCIgaWQ9XCJyZWN0YW5nbGVfY2Y0OGE2MjYtMjIwMS00NGZhLTlhYTktYzc0MjYzZDYyYzc5XCIgZmlsbC1vcGFjaXR5PVwiMC4wMDAwMVwiIGZpbGw9XCIjMDBiZmZmXCIgZmlsbC1ydWxlPVwibm9uemVyb1wiIHN0cm9rZT1cIiMwMGJmZmZcIiBzdHJva2Utd2lkdGg9XCI4Ny43NDUyN1wiIHN0cm9rZS1saW5lY2FwPVwiYnV0dFwiIHN0cm9rZS1saW5lam9pbj1cIm1pdGVyXCIgc3Ryb2tlLW1pdGVybGltaXQ9XCIxMFwiIHN0cm9rZS1kYXNoYXJyYXk9XCJcIiBzdHJva2UtZGFzaG9mZnNldD1cIjBcIiBmb250LWZhbWlseT1cIm5vbmVcIiBmb250LXdlaWdodD1cIm5vbmVcIiBmb250LXNpemU9XCJub25lXCIgdGV4dC1hbmNob3I9XCJub25lXCIgc3R5bGU9XCJtaXgtYmxlbmQtbW9kZTogbm9ybWFsXCIvPjwvc3ZnPiIKICAgICAgICAgICAgfQogICAgICAgICAgfSwKICAgICAgICAgICJ3aXRoaW4iOiB7CiAgICAgICAgICAgICJAaWQiOiAiaHR0cHM6Ly9wdXJsLnN0YW5mb3JkLmVkdS93aDIzNGJ6OTAxMy9paWlmL21hbmlmZXN0IiwKICAgICAgICAgICAgIkB0eXBlIjogInNjOk1hbmlmZXN0IgogICAgICAgICAgfQogICAgICAgIH0KICAgICAgXSwKICAgICAgInJlc291cmNlIjogWwogICAgICAgIHsKICAgICAgICAgICJAdHlwZSI6ICJkY3R5cGVzOlRleHQiLAogICAgICAgICAgImNoYXJzIjogIjxwPlRoaXMgaXMgYSByZW5kZXJpbmcgb2YgVXJzYSBNYWpvci4gVGhpcyZuYnNwO2NvbnN0ZWxsYXRpb24gdHJhbnNsYXRlZCBmcm9tIHRoZSBsYXRpbiBtZWFucyBcImdyZWF0ZXIgYmVhci5cIiBUaGlzIGlzIGluIHJlZmVybmNlIHRvIFVyc2EgTWlub3IgKGxlc3NlciBiZWFyKSB3aGljaCBjYW4gYmUgc2VlbiBpbiB0aGUgaW1hZ2UgYmVsb3cuPC9wPlxuPHA+VGhlc2UgY29uc3RlbGxhdGlvbnMgYXJlIG9mdGVuIHRhbGtlZCBhYm91dCBpbiBjb250cmFzdCB0byBlYWNoIG90aGVyLiBUaGV5IGFyZSBhbHNvIG9mdGVuIGNhbGxlZCB0aGUgYmlnIGFuZCBsaXR0bGUgZGlwcGVyIHJlc3BlY3RpdmVseS48L3A+IiwKICAgICAgICAgICJmb3JtYXQiOiAidGV4dC9odG1sIgogICAgICAgIH0sCiAgICAgICAgewogICAgICAgICAgIkB0eXBlIjogIm9hOlRhZyIsCiAgICAgICAgICAiY2hhcnMiOiAiYW5pbWFscyIKICAgICAgICB9CiAgICAgIF0KICAgIH0sCiAgICB7CiAgICAgICJAY29udGV4dCI6ICJodHRwOi8vaWlpZi5pby9hcGkvcHJlc2VudGF0aW9uLzIvY29udGV4dC5qc29uIiwKICAgICAgIkBpZCI6ICIyYjRjMmU5MS1lZDMyLTQ5NjItYjU1OS1jYmRiNmEwMDU3YjYiLAogICAgICAiQHR5cGUiOiAib2E6QW5ub3RhdGlvbiIsCiAgICAgICJtb3RpdmF0aW9uIjogWwogICAgICAgICJvYTpjb21tZW50aW5nIiwKICAgICAgICAib2E6dGFnZ2luZyIKICAgICAgXSwKICAgICAgIm9hOnNlcmlhbGl6ZWRBdCI6ICIyMDE5LTA4LTIyVDIwOjIzOjQwLjA4OFoiLAogICAgICAib24iOiBbCiAgICAgICAgewogICAgICAgICAgIkB0eXBlIjogIm9hOlNwZWNpZmljUmVzb3VyY2UiLAogICAgICAgICAgImZ1bGwiOiAiaHR0cHM6Ly9wdXJsLnN0YW5mb3JkLmVkdS93aDIzNGJ6OTAxMy9paWlmL2NhbnZhcy9jb2NpbmEtZmlsZVNldC13aDIzNGJ6OTAxMy13aDIzNGJ6OTAxM18xIiwKICAgICAgICAgICJzZWxlY3RvciI6IHsKICAgICAgICAgICAgIkB0eXBlIjogIm9hOkNob2ljZSIsCiAgICAgICAgICAgICJkZWZhdWx0IjogewogICAgICAgICAgICAgICJAdHlwZSI6ICJvYTpGcmFnbWVudFNlbGVjdG9yIiwKICAgICAgICAgICAgICAidmFsdWUiOiAieHl3aD02Mzk4LDIzNTIsNjAwLDc1MCIKICAgICAgICAgICAgfSwKICAgICAgICAgICAgIml0ZW0iOiB7CiAgICAgICAgICAgICAgIkB0eXBlIjogIm9hOlN2Z1NlbGVjdG9yIiwKICAgICAgICAgICAgICAidmFsdWUiOiAiPHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnPjxwYXRoIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiBkPVwiTTYzOTcuNjQxOTUsMjM1Mi4zNDQzNWgzMDAuMDQ5MzJ2MGgzMDAuMDQ5MzJ2Mzc1LjA2MTY1djM3NS4wNjE2NWgtMzAwLjA0OTMyaC0zMDAuMDQ5MzJ2LTM3NS4wNjE2NXpcIiBkYXRhLXBhcGVyLWRhdGE9XCJ7JnF1b3Q7c3Ryb2tlV2lkdGgmcXVvdDs6MSwmcXVvdDtyb3RhdGlvbiZxdW90OzowLCZxdW90O2Fubm90YXRpb24mcXVvdDs6bnVsbCwmcXVvdDtub25Ib3ZlclN0cm9rZUNvbG9yJnF1b3Q7OlsmcXVvdDtDb2xvciZxdW90OywwLDAuNzQ5MDIsMV0sJnF1b3Q7ZWRpdGFibGUmcXVvdDs6dHJ1ZX1cIiBpZD1cInJlY3RhbmdsZV9hMWU2ODk4Yi1iMTdhLTQwNzctYWNiMy03YzExOWI5NGI2YWFcIiBmaWxsLW9wYWNpdHk9XCIwLjAwMDAxXCIgZmlsbD1cIiMwMGJmZmZcIiBmaWxsLXJ1bGU9XCJub256ZXJvXCIgc3Ryb2tlPVwiIzAwYmZmZlwiIHN0cm9rZS13aWR0aD1cIjg3Ljc0NTI3XCIgc3Ryb2tlLWxpbmVjYXA9XCJidXR0XCIgc3Ryb2tlLWxpbmVqb2luPVwibWl0ZXJcIiBzdHJva2UtbWl0ZXJsaW1pdD1cIjEwXCIgc3Ryb2tlLWRhc2hhcnJheT1cIlwiIHN0cm9rZS1kYXNob2Zmc2V0PVwiMFwiIGZvbnQtZmFtaWx5PVwibm9uZVwiIGZvbnQtd2VpZ2h0PVwibm9uZVwiIGZvbnQtc2l6ZT1cIm5vbmVcIiB0ZXh0LWFuY2hvcj1cIm5vbmVcIiBzdHlsZT1cIm1peC1ibGVuZC1tb2RlOiBub3JtYWxcIi8+PC9zdmc+IgogICAgICAgICAgICB9CiAgICAgICAgICB9LAogICAgICAgICAgIndpdGhpbiI6IHsKICAgICAgICAgICAgIkBpZCI6ICJodHRwczovL3B1cmwuc3RhbmZvcmQuZWR1L3doMjM0Yno5MDEzL2lpaWYvbWFuaWZlc3QiLAogICAgICAgICAgICAiQHR5cGUiOiAic2M6TWFuaWZlc3QiCiAgICAgICAgICB9CiAgICAgICAgfQogICAgICBdLAogICAgICAicmVzb3VyY2UiOiBbCiAgICAgICAgewogICAgICAgICAgIkB0eXBlIjogImRjdHlwZXM6VGV4dCIsCiAgICAgICAgICAiY2hhcnMiOiAiPHA+Q29tYSBCZXJlbmljZXMsIG1lYW5zIFwiQmVyZW5pY2UncyBIYWlyXCIgaW4gRW5nbGlzaC4gTmFtZWQgZm9yIFF1ZWVuIEJlcmVuaWNlIElJIG9mIEVneXB0LiBJcyB0aGUgb25seSBtb2Rlcm4gY29uc3RlbGxhdGlvbiBuYW1lZCBmb3IgYSBoaXN0b3JpYyBwZXJzb24uJm5ic3A7PC9wPiIsCiAgICAgICAgICAiZm9ybWF0IjogInRleHQvaHRtbCIKICAgICAgICB9LAogICAgICAgIHsKICAgICAgICAgICJAdHlwZSI6ICJvYTpUYWciLAogICAgICAgICAgImNoYXJzIjogImhpc3RvcmljYWwiCiAgICAgICAgfQogICAgICBdCiAgICB9LAogICAgewogICAgICAiQGNvbnRleHQiOiAiaHR0cDovL2lpaWYuaW8vYXBpL3ByZXNlbnRhdGlvbi8yL2NvbnRleHQuanNvbiIsCiAgICAgICJAaWQiOiAiMTQyZjliMjItYjNkYi00YzM3LWJkZmYtMGQyNTFkMWMwMmE3IiwKICAgICAgIkB0eXBlIjogIm9hOkFubm90YXRpb24iLAogICAgICAibW90aXZhdGlvbiI6IFsKICAgICAgICAib2E6Y29tbWVudGluZyIsCiAgICAgICAgIm9hOnRhZ2dpbmciCiAgICAgIF0sCiAgICAgICJvYTpzZXJpYWxpemVkQXQiOiAiMjAxOS0wOC0yMlQyMDoyMzoyOS42NjdaIiwKICAgICAgIm9uIjogWwogICAgICAgIHsKICAgICAgICAgICJAdHlwZSI6ICJvYTpTcGVjaWZpY1Jlc291cmNlIiwKICAgICAgICAgICJmdWxsIjogImh0dHBzOi8vcHVybC5zdGFuZm9yZC5lZHUvd2gyMzRiejkwMTMvaWlpZi9jYW52YXMvY29jaW5hLWZpbGVTZXQtd2gyMzRiejkwMTMtd2gyMzRiejkwMTNfMSIsCiAgICAgICAgICAic2VsZWN0b3IiOiB7CiAgICAgICAgICAgICJAdHlwZSI6ICJvYTpDaG9pY2UiLAogICAgICAgICAgICAiZGVmYXVsdCI6IHsKICAgICAgICAgICAgICAiQHR5cGUiOiAib2E6RnJhZ21lbnRTZWxlY3RvciIsCiAgICAgICAgICAgICAgInZhbHVlIjogInh5d2g9MTk2NCwyNTk2LDExNDMsNzA3IgogICAgICAgICAgICB9LAogICAgICAgICAgICAiaXRlbSI6IHsKICAgICAgICAgICAgICAiQHR5cGUiOiAib2E6U3ZnU2VsZWN0b3IiLAogICAgICAgICAgICAgICJ2YWx1ZSI6ICI8c3ZnIHhtbG5zPSdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Zyc+PHBhdGggeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIGQ9XCJNMTk2My44MDk0OSwyNTk2LjM0MzAzaDU3MS42MTc1NXYwaDU3MS42MTc1NXYzNTMuMzYzNTd2MzUzLjM2MzU3aC01NzEuNjE3NTVoLTU3MS42MTc1NXYtMzUzLjM2MzU3elwiIGRhdGEtcGFwZXItZGF0YT1cInsmcXVvdDtzdHJva2VXaWR0aCZxdW90OzoxLCZxdW90O3JvdGF0aW9uJnF1b3Q7OjAsJnF1b3Q7YW5ub3RhdGlvbiZxdW90OzpudWxsLCZxdW90O25vbkhvdmVyU3Ryb2tlQ29sb3ImcXVvdDs6WyZxdW90O0NvbG9yJnF1b3Q7LDAsMC43NDkwMiwxXSwmcXVvdDtlZGl0YWJsZSZxdW90Ozp0cnVlfVwiIGlkPVwicmVjdGFuZ2xlX2Q2YzBhMGZjLWIwZGMtNGIxZC1iYWIxLTExYTYzMTM0ODY4NFwiIGZpbGwtb3BhY2l0eT1cIjAuMDAwMDFcIiBmaWxsPVwiIzAwYmZmZlwiIGZpbGwtcnVsZT1cIm5vbnplcm9cIiBzdHJva2U9XCIjMDBiZmZmXCIgc3Ryb2tlLXdpZHRoPVwiODcuNzQ1MjdcIiBzdHJva2UtbGluZWNhcD1cImJ1dHRcIiBzdHJva2UtbGluZWpvaW49XCJtaXRlclwiIHN0cm9rZS1taXRlcmxpbWl0PVwiMTBcIiBzdHJva2UtZGFzaGFycmF5PVwiXCIgc3Ryb2tlLWRhc2hvZmZzZXQ9XCIwXCIgZm9udC1mYW1pbHk9XCJub25lXCIgZm9udC13ZWlnaHQ9XCJub25lXCIgZm9udC1zaXplPVwibm9uZVwiIHRleHQtYW5jaG9yPVwibm9uZVwiIHN0eWxlPVwibWl4LWJsZW5kLW1vZGU6IG5vcm1hbFwiLz48L3N2Zz4iCiAgICAgICAgICAgIH0KICAgICAgICAgIH0sCiAgICAgICAgICAid2l0aGluIjogewogICAgICAgICAgICAiQGlkIjogImh0dHBzOi8vcHVybC5zdGFuZm9yZC5lZHUvd2gyMzRiejkwMTMvaWlpZi9tYW5pZmVzdCIsCiAgICAgICAgICAgICJAdHlwZSI6ICJzYzpNYW5pZmVzdCIKICAgICAgICAgIH0KICAgICAgICB9CiAgICAgIF0sCiAgICAgICJyZXNvdXJjZSI6IFsKICAgICAgICB7CiAgICAgICAgICAiQHR5cGUiOiAiZGN0eXBlczpUZXh0IiwKICAgICAgICAgICJjaGFycyI6ICI8cD5BbmRyb21lZGEsIHRoZSBjaGFpbmVkIHdvbWFuLjwvcD4iLAogICAgICAgICAgImZvcm1hdCI6ICJ0ZXh0L2h0bWwiCiAgICAgICAgfSwKICAgICAgICB7CiAgICAgICAgICAiQHR5cGUiOiAib2E6VGFnIiwKICAgICAgICAgICJjaGFycyI6ICJncmVla19teXRob2xvZ3kiCiAgICAgICAgfQogICAgICBdCiAgICB9LAogICAgewogICAgICAiQGNvbnRleHQiOiAiaHR0cDovL2lpaWYuaW8vYXBpL3ByZXNlbnRhdGlvbi8yL2NvbnRleHQuanNvbiIsCiAgICAgICJAaWQiOiAiMTE5MmU5NmUtMGJkNy00Njk1LWI2NjAtNzBlMDg5YmUxMDUzIiwKICAgICAgIkB0eXBlIjogIm9hOkFubm90YXRpb24iLAogICAgICAibW90aXZhdGlvbiI6IFsKICAgICAgICAib2E6Y29tbWVudGluZyIsCiAgICAgICAgIm9hOnRhZ2dpbmciCiAgICAgIF0sCiAgICAgICJvYTpzZXJpYWxpemVkQXQiOiAiMjAxOS0wOC0yMlQyMDoyNDowMi40NTFaIiwKICAgICAgIm9uIjogWwogICAgICAgIHsKICAgICAgICAgICJAdHlwZSI6ICJvYTpTcGVjaWZpY1Jlc291cmNlIiwKICAgICAgICAgICJmdWxsIjogImh0dHBzOi8vcHVybC5zdGFuZm9yZC5lZHUvd2gyMzRiejkwMTMvaWlpZi9jYW52YXMvY29jaW5hLWZpbGVTZXQtd2gyMzRiejkwMTMtd2gyMzRiejkwMTNfMSIsCiAgICAgICAgICAic2VsZWN0b3IiOiB7CiAgICAgICAgICAgICJAdHlwZSI6ICJvYTpDaG9pY2UiLAogICAgICAgICAgICAiZGVmYXVsdCI6IHsKICAgICAgICAgICAgICAiQHR5cGUiOiAib2E6RnJhZ21lbnRTZWxlY3RvciIsCiAgICAgICAgICAgICAgInZhbHVlIjogInh5d2g9MjMxOSwzNzE5LDY2Niw2MTMiCiAgICAgICAgICAgIH0sCiAgICAgICAgICAgICJpdGVtIjogewogICAgICAgICAgICAgICJAdHlwZSI6ICJvYTpTdmdTZWxlY3RvciIsCiAgICAgICAgICAgICAgInZhbHVlIjogIjxzdmcgeG1sbnM9J2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJz48cGF0aCB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgZD1cIk0yMzE5LjIwOTQ1LDM3MTguODA3NTVoMzMzLjE1MDM2djBoMzMzLjE1MDM2djMwNi40OTgzM3YzMDYuNDk4MzNoLTMzMy4xNTAzNmgtMzMzLjE1MDM2di0zMDYuNDk4MzN6XCIgZGF0YS1wYXBlci1kYXRhPVwieyZxdW90O3N0cm9rZVdpZHRoJnF1b3Q7OjEsJnF1b3Q7cm90YXRpb24mcXVvdDs6MCwmcXVvdDthbm5vdGF0aW9uJnF1b3Q7Om51bGwsJnF1b3Q7bm9uSG92ZXJTdHJva2VDb2xvciZxdW90OzpbJnF1b3Q7Q29sb3ImcXVvdDssMCwwLjc0OTAyLDFdLCZxdW90O2VkaXRhYmxlJnF1b3Q7OnRydWV9XCIgaWQ9XCJyZWN0YW5nbGVfODFkMzIzYmQtNzM5OC00ZTJlLWI5MDMtNmM3ODM4NDM3YWZiXCIgZmlsbC1vcGFjaXR5PVwiMC4wMDAwMVwiIGZpbGw9XCIjMDBiZmZmXCIgZmlsbC1ydWxlPVwibm9uemVyb1wiIHN0cm9rZT1cIiMwMGJmZmZcIiBzdHJva2Utd2lkdGg9XCI4Ny43NDUyN1wiIHN0cm9rZS1saW5lY2FwPVwiYnV0dFwiIHN0cm9rZS1saW5lam9pbj1cIm1pdGVyXCIgc3Ryb2tlLW1pdGVybGltaXQ9XCIxMFwiIHN0cm9rZS1kYXNoYXJyYXk9XCJcIiBzdHJva2UtZGFzaG9mZnNldD1cIjBcIiBmb250LWZhbWlseT1cIm5vbmVcIiBmb250LXdlaWdodD1cIm5vbmVcIiBmb250LXNpemU9XCJub25lXCIgdGV4dC1hbmNob3I9XCJub25lXCIgc3R5bGU9XCJtaXgtYmxlbmQtbW9kZTogbm9ybWFsXCIvPjwvc3ZnPiIKICAgICAgICAgICAgfQogICAgICAgICAgfSwKICAgICAgICAgICJ3aXRoaW4iOiB7CiAgICAgICAgICAgICJAaWQiOiAiaHR0cHM6Ly9wdXJsLnN0YW5mb3JkLmVkdS93aDIzNGJ6OTAxMy9paWlmL21hbmlmZXN0IiwKICAgICAgICAgICAgIkB0eXBlIjogInNjOk1hbmlmZXN0IgogICAgICAgICAgfQogICAgICAgIH0KICAgICAgXSwKICAgICAgInJlc291cmNlIjogWwogICAgICAgIHsKICAgICAgICAgICJAdHlwZSI6ICJkY3R5cGVzOlRleHQiLAogICAgICAgICAgImNoYXJzIjogIjxwPkFyaWVzPC9wPiIsCiAgICAgICAgICAiZm9ybWF0IjogInRleHQvaHRtbCIKICAgICAgICB9LAogICAgICAgIHsKICAgICAgICAgICJAdHlwZSI6ICJvYTpUYWciLAogICAgICAgICAgImNoYXJzIjogInpvZGlhYyIKICAgICAgICB9CiAgICAgIF0KICAgIH0sCiAgICB7CiAgICAgICJAY29udGV4dCI6ICJodHRwOi8vaWlpZi5pby9hcGkvcHJlc2VudGF0aW9uLzIvY29udGV4dC5qc29uIiwKICAgICAgIkBpZCI6ICIyNzY3YzE3ZS0xYzQ4LTQ1NDUtOTZlNC1kMDIxNTllYzIwYmIiLAogICAgICAiQHR5cGUiOiAib2E6QW5ub3RhdGlvbiIsCiAgICAgICJtb3RpdmF0aW9uIjogWwogICAgICAgICJvYTpjb21tZW50aW5nIiwKICAgICAgICAib2E6dGFnZ2luZyIKICAgICAgXSwKICAgICAgIm9hOnNlcmlhbGl6ZWRBdCI6ICIyMDE5LTA4LTIyVDIwOjIzOjU5LjgwOVoiLAogICAgICAib24iOiBbCiAgICAgICAgewogICAgICAgICAgIkB0eXBlIjogIm9hOlNwZWNpZmljUmVzb3VyY2UiLAogICAgICAgICAgImZ1bGwiOiAiaHR0cHM6Ly9wdXJsLnN0YW5mb3JkLmVkdS93aDIzNGJ6OTAxMy9paWlmL2NhbnZhcy9jb2NpbmEtZmlsZVNldC13aDIzNGJ6OTAxMy13aDIzNGJ6OTAxM18xIiwKICAgICAgICAgICJzZWxlY3RvciI6IHsKICAgICAgICAgICAgIkB0eXBlIjogIm9hOkNob2ljZSIsCiAgICAgICAgICAgICJkZWZhdWx0IjogewogICAgICAgICAgICAgICJAdHlwZSI6ICJvYTpGcmFnbWVudFNlbGVjdG9yIiwKICAgICAgICAgICAgICAidmFsdWUiOiAieHl3aD0yNzE2LDQwMzksMTE0OSw4NjQiCiAgICAgICAgICAgIH0sCiAgICAgICAgICAgICJpdGVtIjogewogICAgICAgICAgICAgICJAdHlwZSI6ICJvYTpTdmdTZWxlY3RvciIsCiAgICAgICAgICAgICAgInZhbHVlIjogIjxzdmcgeG1sbnM9J2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJz48cGF0aCB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgZD1cIk0zODY1LjAyNzEsNDAzOC42MzE4OWgtNTc0LjM1MTIxdjBoLTU3NC4zNTEyMXY0MzEuNzYyODZ2NDMxLjc2Mjg2aDU3NC4zNTEyMWg1NzQuMzUxMjF2LTQzMS43NjI4NnpcIiBkYXRhLXBhcGVyLWRhdGE9XCJ7JnF1b3Q7c3Ryb2tlV2lkdGgmcXVvdDs6MSwmcXVvdDtyb3RhdGlvbiZxdW90OzowLCZxdW90O2Fubm90YXRpb24mcXVvdDs6bnVsbCwmcXVvdDtub25Ib3ZlclN0cm9rZUNvbG9yJnF1b3Q7OlsmcXVvdDtDb2xvciZxdW90OywwLDAuNzQ5MDIsMV0sJnF1b3Q7ZWRpdGFibGUmcXVvdDs6dHJ1ZX1cIiBpZD1cInJlY3RhbmdsZV83NGQ3NzUzMi05NzE3LTQxY2QtOGI1MC0yNzBmM2EwM2M1NGVcIiBmaWxsLW9wYWNpdHk9XCIwLjAwMDAxXCIgZmlsbD1cIiMwMGJmZmZcIiBmaWxsLXJ1bGU9XCJub256ZXJvXCIgc3Ryb2tlPVwiIzAwYmZmZlwiIHN0cm9rZS13aWR0aD1cIjg3Ljc0NTI3XCIgc3Ryb2tlLWxpbmVjYXA9XCJidXR0XCIgc3Ryb2tlLWxpbmVqb2luPVwibWl0ZXJcIiBzdHJva2UtbWl0ZXJsaW1pdD1cIjEwXCIgc3Ryb2tlLWRhc2hhcnJheT1cIlwiIHN0cm9rZS1kYXNob2Zmc2V0PVwiMFwiIGZvbnQtZmFtaWx5PVwibm9uZVwiIGZvbnQtd2VpZ2h0PVwibm9uZVwiIGZvbnQtc2l6ZT1cIm5vbmVcIiB0ZXh0LWFuY2hvcj1cIm5vbmVcIiBzdHlsZT1cIm1peC1ibGVuZC1tb2RlOiBub3JtYWxcIi8+PC9zdmc+IgogICAgICAgICAgICB9CiAgICAgICAgICB9LAogICAgICAgICAgIndpdGhpbiI6IHsKICAgICAgICAgICAgIkBpZCI6ICJodHRwczovL3B1cmwuc3RhbmZvcmQuZWR1L3doMjM0Yno5MDEzL2lpaWYvbWFuaWZlc3QiLAogICAgICAgICAgICAiQHR5cGUiOiAic2M6TWFuaWZlc3QiCiAgICAgICAgICB9CiAgICAgICAgfQogICAgICBdLAogICAgICAicmVzb3VyY2UiOiBbCiAgICAgICAgewogICAgICAgICAgIkB0eXBlIjogImRjdHlwZXM6VGV4dCIsCiAgICAgICAgICAiY2hhcnMiOiAiPHA+VGF1cnVzPC9wPiIsCiAgICAgICAgICAiZm9ybWF0IjogInRleHQvaHRtbCIKICAgICAgICB9LAogICAgICAgIHsKICAgICAgICAgICJAdHlwZSI6ICJvYTpUYWciLAogICAgICAgICAgImNoYXJzIjogInpvZGlhYyIKICAgICAgICB9CiAgICAgIF0KICAgIH0sCiAgICB7CiAgICAgICJAY29udGV4dCI6ICJodHRwOi8vaWlpZi5pby9hcGkvcHJlc2VudGF0aW9uLzIvY29udGV4dC5qc29uIiwKICAgICAgIkBpZCI6ICI2MTA4YWRiZC0xN2IxLTRjMDEtOTQwZi0wOGI3NDUzYjI2YjEiLAogICAgICAiQHR5cGUiOiAib2E6QW5ub3RhdGlvbiIsCiAgICAgICJtb3RpdmF0aW9uIjogWwogICAgICAgICJvYTpjb21tZW50aW5nIiwKICAgICAgICAib2E6dGFnZ2luZyIKICAgICAgXSwKICAgICAgIm9hOnNlcmlhbGl6ZWRBdCI6ICIyMDE5LTA4LTIyVDIwOjI0OjA2LjMwOFoiLAogICAgICAib24iOiBbCiAgICAgICAgewogICAgICAgICAgIkB0eXBlIjogIm9hOlNwZWNpZmljUmVzb3VyY2UiLAogICAgICAgICAgImZ1bGwiOiAiaHR0cHM6Ly9wdXJsLnN0YW5mb3JkLmVkdS93aDIzNGJ6OTAxMy9paWlmL2NhbnZhcy9jb2NpbmEtZmlsZVNldC13aDIzNGJ6OTAxMy13aDIzNGJ6OTAxM18xIiwKICAgICAgICAgICJzZWxlY3RvciI6IHsKICAgICAgICAgICAgIkB0eXBlIjogIm9hOkNob2ljZSIsCiAgICAgICAgICAgICJkZWZhdWx0IjogewogICAgICAgICAgICAgICJAdHlwZSI6ICJvYTpGcmFnbWVudFNlbGVjdG9yIiwKICAgICAgICAgICAgICAidmFsdWUiOiAieHl3aD0yODAyLDM2NzEsMjg2LDMyNyIKICAgICAgICAgICAgfSwKICAgICAgICAgICAgIml0ZW0iOiB7CiAgICAgICAgICAgICAgIkB0eXBlIjogIm9hOlN2Z1NlbGVjdG9yIiwKICAgICAgICAgICAgICAidmFsdWUiOiAiPHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnPjxwYXRoIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiBkPVwiTTI4MDEuODY4MzksMzY3MS4yNDA0MWgxNDMuMjAyMjV2MGgxNDMuMjAyMjV2MTYzLjQ4OTIzdjE2My40ODkyM2gtMTQzLjIwMjI1aC0xNDMuMjAyMjV2LTE2My40ODkyM3pcIiBkYXRhLXBhcGVyLWRhdGE9XCJ7JnF1b3Q7c3Ryb2tlV2lkdGgmcXVvdDs6MSwmcXVvdDtyb3RhdGlvbiZxdW90OzowLCZxdW90O2Fubm90YXRpb24mcXVvdDs6bnVsbCwmcXVvdDtub25Ib3ZlclN0cm9rZUNvbG9yJnF1b3Q7OlsmcXVvdDtDb2xvciZxdW90OywwLDAuNzQ5MDIsMV0sJnF1b3Q7ZWRpdGFibGUmcXVvdDs6dHJ1ZX1cIiBpZD1cInJlY3RhbmdsZV9iYjVlNjllOS00ZjMzLTRlZDEtODI0Ny1mMDI1NjBmYWJiZGZcIiBmaWxsLW9wYWNpdHk9XCIwLjAwMDAxXCIgZmlsbD1cIiMwMGJmZmZcIiBmaWxsLXJ1bGU9XCJub256ZXJvXCIgc3Ryb2tlPVwiIzAwYmZmZlwiIHN0cm9rZS13aWR0aD1cIjg3Ljc0NTI3XCIgc3Ryb2tlLWxpbmVjYXA9XCJidXR0XCIgc3Ryb2tlLWxpbmVqb2luPVwibWl0ZXJcIiBzdHJva2UtbWl0ZXJsaW1pdD1cIjEwXCIgc3Ryb2tlLWRhc2hhcnJheT1cIlwiIHN0cm9rZS1kYXNob2Zmc2V0PVwiMFwiIGZvbnQtZmFtaWx5PVwibm9uZVwiIGZvbnQtd2VpZ2h0PVwibm9uZVwiIGZvbnQtc2l6ZT1cIm5vbmVcIiB0ZXh0LWFuY2hvcj1cIm5vbmVcIiBzdHlsZT1cIm1peC1ibGVuZC1tb2RlOiBub3JtYWxcIi8+PC9zdmc+IgogICAgICAgICAgICB9CiAgICAgICAgICB9LAogICAgICAgICAgIndpdGhpbiI6IHsKICAgICAgICAgICAgIkBpZCI6ICJodHRwczovL3B1cmwuc3RhbmZvcmQuZWR1L3doMjM0Yno5MDEzL2lpaWYvbWFuaWZlc3QiLAogICAgICAgICAgICAiQHR5cGUiOiAic2M6TWFuaWZlc3QiCiAgICAgICAgICB9CiAgICAgICAgfQogICAgICBdLAogICAgICAicmVzb3VyY2UiOiBbCiAgICAgICAgewogICAgICAgICAgIkB0eXBlIjogImRjdHlwZXM6VGV4dCIsCiAgICAgICAgICAiY2hhcnMiOiAiPHA+QXBlcyBsYXRlciBrbm93IGFzIFZlc3BhLCBMaWxpdW0gYW5kIHRoZW4gTXVzY2EgQm9yZWFsaXMuIElzIGxhdGluIGZvciBiZWVzLjwvcD4iLAogICAgICAgICAgImZvcm1hdCI6ICJ0ZXh0L2h0bWwiCiAgICAgICAgfSwKICAgICAgICB7CiAgICAgICAgICAiQHR5cGUiOiAib2E6VGFnIiwKICAgICAgICAgICJjaGFycyI6ICJhbmltYWxzIgogICAgICAgIH0sCiAgICAgICAgewogICAgICAgICAgIkB0eXBlIjogIm9hOlRhZyIsCiAgICAgICAgICAiY2hhcnMiOiAiZGlzY2FyZGVkX2NvbnN0ZWxsYXRpb24iCiAgICAgICAgfQogICAgICBdCiAgICB9LAogICAgewogICAgICAiQGNvbnRleHQiOiAiaHR0cDovL2lpaWYuaW8vYXBpL3ByZXNlbnRhdGlvbi8yL2NvbnRleHQuanNvbiIsCiAgICAgICJAaWQiOiAiMmFmNmQwYTQtNmFkZS00MmUwLTkzZWUtZGMxNWI1Mjc4YjgzIiwKICAgICAgIkB0eXBlIjogIm9hOkFubm90YXRpb24iLAogICAgICAibW90aXZhdGlvbiI6IFsKICAgICAgICAib2E6Y29tbWVudGluZyIsCiAgICAgICAgIm9hOnRhZ2dpbmciCiAgICAgIF0sCiAgICAgICJvYTpzZXJpYWxpemVkQXQiOiAiMjAxOS0wOC0yMlQyMDoyMzo1Ni45NDNaIiwKICAgICAgIm9uIjogWwogICAgICAgIHsKICAgICAgICAgICJAdHlwZSI6ICJvYTpTcGVjaWZpY1Jlc291cmNlIiwKICAgICAgICAgICJmdWxsIjogImh0dHBzOi8vcHVybC5zdGFuZm9yZC5lZHUvd2gyMzRiejkwMTMvaWlpZi9jYW52YXMvY29jaW5hLWZpbGVTZXQtd2gyMzRiejkwMTMtd2gyMzRiejkwMTNfMSIsCiAgICAgICAgICAic2VsZWN0b3IiOiB7CiAgICAgICAgICAgICJAdHlwZSI6ICJvYTpDaG9pY2UiLAogICAgICAgICAgICAiZGVmYXVsdCI6IHsKICAgICAgICAgICAgICAiQHR5cGUiOiAib2E6RnJhZ21lbnRTZWxlY3RvciIsCiAgICAgICAgICAgICAgInZhbHVlIjogInh5d2g9MzYxMyw1NTQ1LDYwMSw0MTUiCiAgICAgICAgICAgIH0sCiAgICAgICAgICAgICJpdGVtIjogewogICAgICAgICAgICAgICJAdHlwZSI6ICJvYTpTdmdTZWxlY3RvciIsCiAgICAgICAgICAgICAgInZhbHVlIjogIjxzdmcgeG1sbnM9J2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJz48cGF0aCB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgZD1cIk0zNjEzLjM0Nzc5LDU1NDQuODAzMTVoMzAwLjcyNDcydjBoMzAwLjcyNDcydjIwNy42NDMyNnYyMDcuNjQzMjZoLTMwMC43MjQ3MmgtMzAwLjcyNDcydi0yMDcuNjQzMjZ6XCIgZGF0YS1wYXBlci1kYXRhPVwieyZxdW90O3N0cm9rZVdpZHRoJnF1b3Q7OjEsJnF1b3Q7cm90YXRpb24mcXVvdDs6MCwmcXVvdDthbm5vdGF0aW9uJnF1b3Q7Om51bGwsJnF1b3Q7bm9uSG92ZXJTdHJva2VDb2xvciZxdW90OzpbJnF1b3Q7Q29sb3ImcXVvdDssMCwwLjc0OTAyLDFdLCZxdW90O2VkaXRhYmxlJnF1b3Q7OnRydWV9XCIgaWQ9XCJyZWN0YW5nbGVfYWFiY2MwMTAtMGNiZi00ZDU4LWJlMDItZThjNTIyMjVjMzA4XCIgZmlsbC1vcGFjaXR5PVwiMC4wMDAwMVwiIGZpbGw9XCIjMDBiZmZmXCIgZmlsbC1ydWxlPVwibm9uemVyb1wiIHN0cm9rZT1cIiMwMGJmZmZcIiBzdHJva2Utd2lkdGg9XCI4Ny43NDUyN1wiIHN0cm9rZS1saW5lY2FwPVwiYnV0dFwiIHN0cm9rZS1saW5lam9pbj1cIm1pdGVyXCIgc3Ryb2tlLW1pdGVybGltaXQ9XCIxMFwiIHN0cm9rZS1kYXNoYXJyYXk9XCJcIiBzdHJva2UtZGFzaG9mZnNldD1cIjBcIiBmb250LWZhbWlseT1cIm5vbmVcIiBmb250LXdlaWdodD1cIm5vbmVcIiBmb250LXNpemU9XCJub25lXCIgdGV4dC1hbmNob3I9XCJub25lXCIgc3R5bGU9XCJtaXgtYmxlbmQtbW9kZTogbm9ybWFsXCIvPjwvc3ZnPiIKICAgICAgICAgICAgfQogICAgICAgICAgfSwKICAgICAgICAgICJ3aXRoaW4iOiB7CiAgICAgICAgICAgICJAaWQiOiAiaHR0cHM6Ly9wdXJsLnN0YW5mb3JkLmVkdS93aDIzNGJ6OTAxMy9paWlmL21hbmlmZXN0IiwKICAgICAgICAgICAgIkB0eXBlIjogInNjOk1hbmlmZXN0IgogICAgICAgICAgfQogICAgICAgIH0KICAgICAgXSwKICAgICAgInJlc291cmNlIjogWwogICAgICAgIHsKICAgICAgICAgICJAdHlwZSI6ICJkY3R5cGVzOlRleHQiLAogICAgICAgICAgImNoYXJzIjogIjxwPkxlcHVzLiBMYXRpbiBmb3IgaGFyZS48L3A+IiwKICAgICAgICAgICJmb3JtYXQiOiAidGV4dC9odG1sIgogICAgICAgIH0sCiAgICAgICAgewogICAgICAgICAgIkB0eXBlIjogIm9hOlRhZyIsCiAgICAgICAgICAiY2hhcnMiOiAiYW5pbWFscyIKICAgICAgICB9CiAgICAgIF0KICAgIH0sCiAgICB7CiAgICAgICJAY29udGV4dCI6ICJodHRwOi8vaWlpZi5pby9hcGkvcHJlc2VudGF0aW9uLzIvY29udGV4dC5qc29uIiwKICAgICAgIkBpZCI6ICJjODQ0ZWRiZi0xN2ZiLTRjYjYtYmM0ZS1jZDdhMDMyNGQyZGQiLAogICAgICAiQHR5cGUiOiAib2E6QW5ub3RhdGlvbiIsCiAgICAgICJtb3RpdmF0aW9uIjogWwogICAgICAgICJvYTpjb21tZW50aW5nIiwKICAgICAgICAib2E6dGFnZ2luZyIKICAgICAgXSwKICAgICAgIm9hOnNlcmlhbGl6ZWRBdCI6ICIyMDE5LTA4LTIyVDIwOjIzOjUzLjMyNloiLAogICAgICAib24iOiBbCiAgICAgICAgewogICAgICAgICAgIkB0eXBlIjogIm9hOlNwZWNpZmljUmVzb3VyY2UiLAogICAgICAgICAgImZ1bGwiOiAiaHR0cHM6Ly9wdXJsLnN0YW5mb3JkLmVkdS93aDIzNGJ6OTAxMy9paWlmL2NhbnZhcy9jb2NpbmEtZmlsZVNldC13aDIzNGJ6OTAxMy13aDIzNGJ6OTAxM18xIiwKICAgICAgICAgICJzZWxlY3RvciI6IHsKICAgICAgICAgICAgIkB0eXBlIjogIm9hOkNob2ljZSIsCiAgICAgICAgICAgICJkZWZhdWx0IjogewogICAgICAgICAgICAgICJAdHlwZSI6ICJvYTpGcmFnbWVudFNlbGVjdG9yIiwKICAgICAgICAgICAgICAidmFsdWUiOiAieHl3aD00NzM3LDQ3MDcsMzc1LDMxNSIKICAgICAgICAgICAgfSwKICAgICAgICAgICAgIml0ZW0iOiB7CiAgICAgICAgICAgICAgIkB0eXBlIjogIm9hOlN2Z1NlbGVjdG9yIiwKICAgICAgICAgICAgICAidmFsdWUiOiAiPHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnPjxwYXRoIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiBkPVwiTTQ3MzcuNDg1NDMsNDcwNy4wN2gxODcuMzU2Mjd2MGgxODcuMzU2Mjd2MTU3LjUyMjQ3djE1Ny41MjI0N2gtMTg3LjM1NjI3aC0xODcuMzU2Mjd2LTE1Ny41MjI0N3pcIiBkYXRhLXBhcGVyLWRhdGE9XCJ7JnF1b3Q7c3Ryb2tlV2lkdGgmcXVvdDs6MSwmcXVvdDtyb3RhdGlvbiZxdW90OzowLCZxdW90O2Fubm90YXRpb24mcXVvdDs6bnVsbCwmcXVvdDtub25Ib3ZlclN0cm9rZUNvbG9yJnF1b3Q7OlsmcXVvdDtDb2xvciZxdW90OywwLDAuNzQ5MDIsMV0sJnF1b3Q7ZWRpdGFibGUmcXVvdDs6dHJ1ZX1cIiBpZD1cInJlY3RhbmdsZV9mZmVkMjFlZS0xMWFmLTRiNWQtODE4My1jNTg2MTlhZDg3ZDFcIiBmaWxsLW9wYWNpdHk9XCIwLjAwMDAxXCIgZmlsbD1cIiMwMGJmZmZcIiBmaWxsLXJ1bGU9XCJub256ZXJvXCIgc3Ryb2tlPVwiIzAwYmZmZlwiIHN0cm9rZS13aWR0aD1cIjg3Ljc0NTI3XCIgc3Ryb2tlLWxpbmVjYXA9XCJidXR0XCIgc3Ryb2tlLWxpbmVqb2luPVwibWl0ZXJcIiBzdHJva2UtbWl0ZXJsaW1pdD1cIjEwXCIgc3Ryb2tlLWRhc2hhcnJheT1cIlwiIHN0cm9rZS1kYXNob2Zmc2V0PVwiMFwiIGZvbnQtZmFtaWx5PVwibm9uZVwiIGZvbnQtd2VpZ2h0PVwibm9uZVwiIGZvbnQtc2l6ZT1cIm5vbmVcIiB0ZXh0LWFuY2hvcj1cIm5vbmVcIiBzdHlsZT1cIm1peC1ibGVuZC1tb2RlOiBub3JtYWxcIi8+PC9zdmc+IgogICAgICAgICAgICB9CiAgICAgICAgICB9LAogICAgICAgICAgIndpdGhpbiI6IHsKICAgICAgICAgICAgIkBpZCI6ICJodHRwczovL3B1cmwuc3RhbmZvcmQuZWR1L3doMjM0Yno5MDEzL2lpaWYvbWFuaWZlc3QiLAogICAgICAgICAgICAiQHR5cGUiOiAic2M6TWFuaWZlc3QiCiAgICAgICAgICB9CiAgICAgICAgfQogICAgICBdLAogICAgICAicmVzb3VyY2UiOiBbCiAgICAgICAgewogICAgICAgICAgIkB0eXBlIjogImRjdHlwZXM6VGV4dCIsCiAgICAgICAgICAiY2hhcnMiOiAiPHA+Q2FuaXMgbWlub3IuIFRyYW5zbGF0ZXMgaW50byBFbmdsaXNoIGFzIGxlc3NlciBkb2cuPC9wPiIsCiAgICAgICAgICAiZm9ybWF0IjogInRleHQvaHRtbCIKICAgICAgICB9LAogICAgICAgIHsKICAgICAgICAgICJAdHlwZSI6ICJvYTpUYWciLAogICAgICAgICAgImNoYXJzIjogImFuaW1hbHMiCiAgICAgICAgfQogICAgICBdCiAgICB9LAogICAgewogICAgICAiQGNvbnRleHQiOiAiaHR0cDovL2lpaWYuaW8vYXBpL3ByZXNlbnRhdGlvbi8yL2NvbnRleHQuanNvbiIsCiAgICAgICJAaWQiOiAiZDMyNmNhNTAtZTJjZC00MDk2LTg4YTAtMGQ1YWFmMzY2Y2QxIiwKICAgICAgIkB0eXBlIjogIm9hOkFubm90YXRpb24iLAogICAgICAibW90aXZhdGlvbiI6IFsKICAgICAgICAib2E6Y29tbWVudGluZyIsCiAgICAgICAgIm9hOnRhZ2dpbmciCiAgICAgIF0sCiAgICAgICJvYTpzZXJpYWxpemVkQXQiOiAiMjAxOS0wOC0yMlQyMDoyMzo1MC4xMzdaIiwKICAgICAgIm9uIjogWwogICAgICAgIHsKICAgICAgICAgICJAdHlwZSI6ICJvYTpTcGVjaWZpY1Jlc291cmNlIiwKICAgICAgICAgICJmdWxsIjogImh0dHBzOi8vcHVybC5zdGFuZm9yZC5lZHUvd2gyMzRiejkwMTMvaWlpZi9jYW52YXMvY29jaW5hLWZpbGVTZXQtd2gyMzRiejkwMTMtd2gyMzRiejkwMTNfMSIsCiAgICAgICAgICAic2VsZWN0b3IiOiB7CiAgICAgICAgICAgICJAdHlwZSI6ICJvYTpDaG9pY2UiLAogICAgICAgICAgICAiZGVmYXVsdCI6IHsKICAgICAgICAgICAgICAiQHR5cGUiOiAib2E6RnJhZ21lbnRTZWxlY3RvciIsCiAgICAgICAgICAgICAgInZhbHVlIjogInh5d2g9NDI4MSwzOTMwLDgzNSw3NTMiCiAgICAgICAgICAgIH0sCiAgICAgICAgICAgICJpdGVtIjogewogICAgICAgICAgICAgICJAdHlwZSI6ICJvYTpTdmdTZWxlY3RvciIsCiAgICAgICAgICAgICAgInZhbHVlIjogIjxzdmcgeG1sbnM9J2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJz48cGF0aCB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgZD1cIk01MTE1LjQ5MjM1LDM5MjkuNTE0aC00MTcuMzcwNzd2MGgtNDE3LjM3MDc3djM3Ni41OTMxNnYzNzYuNTkzMTZoNDE3LjM3MDc3aDQxNy4zNzA3N3YtMzc2LjU5MzE2elwiIGRhdGEtcGFwZXItZGF0YT1cInsmcXVvdDtzdHJva2VXaWR0aCZxdW90OzoxLCZxdW90O3JvdGF0aW9uJnF1b3Q7OjAsJnF1b3Q7YW5ub3RhdGlvbiZxdW90OzpudWxsLCZxdW90O25vbkhvdmVyU3Ryb2tlQ29sb3ImcXVvdDs6WyZxdW90O0NvbG9yJnF1b3Q7LDAsMC43NDkwMiwxXSwmcXVvdDtlZGl0YWJsZSZxdW90Ozp0cnVlfVwiIGlkPVwicmVjdGFuZ2xlXzM2ZTc4ZjJiLTdmYWItNGRmNS1iNmQ3LWViNWI1ZmY0ZDdjMVwiIGZpbGwtb3BhY2l0eT1cIjAuMDAwMDFcIiBmaWxsPVwiIzAwYmZmZlwiIGZpbGwtcnVsZT1cIm5vbnplcm9cIiBzdHJva2U9XCIjMDBiZmZmXCIgc3Ryb2tlLXdpZHRoPVwiODcuNzQ1MjdcIiBzdHJva2UtbGluZWNhcD1cImJ1dHRcIiBzdHJva2UtbGluZWpvaW49XCJtaXRlclwiIHN0cm9rZS1taXRlcmxpbWl0PVwiMTBcIiBzdHJva2UtZGFzaGFycmF5PVwiXCIgc3Ryb2tlLWRhc2hvZmZzZXQ9XCIwXCIgZm9udC1mYW1pbHk9XCJub25lXCIgZm9udC13ZWlnaHQ9XCJub25lXCIgZm9udC1zaXplPVwibm9uZVwiIHRleHQtYW5jaG9yPVwibm9uZVwiIHN0eWxlPVwibWl4LWJsZW5kLW1vZGU6IG5vcm1hbFwiLz48L3N2Zz4iCiAgICAgICAgICAgIH0KICAgICAgICAgIH0sCiAgICAgICAgICAid2l0aGluIjogewogICAgICAgICAgICAiQGlkIjogImh0dHBzOi8vcHVybC5zdGFuZm9yZC5lZHUvd2gyMzRiejkwMTMvaWlpZi9tYW5pZmVzdCIsCiAgICAgICAgICAgICJAdHlwZSI6ICJzYzpNYW5pZmVzdCIKICAgICAgICAgIH0KICAgICAgICB9CiAgICAgIF0sCiAgICAgICJyZXNvdXJjZSI6IFsKICAgICAgICB7CiAgICAgICAgICAiQHR5cGUiOiAiZGN0eXBlczpUZXh0IiwKICAgICAgICAgICJjaGFycyI6ICI8cD5HZW1pbmk8L3A+IiwKICAgICAgICAgICJmb3JtYXQiOiAidGV4dC9odG1sIgogICAgICAgIH0sCiAgICAgICAgewogICAgICAgICAgIkB0eXBlIjogIm9hOlRhZyIsCiAgICAgICAgICAiY2hhcnMiOiAiem9kaWFjIgogICAgICAgIH0KICAgICAgXQogICAgfSwKICAgIHsKICAgICAgIkBjb250ZXh0IjogImh0dHA6Ly9paWlmLmlvL2FwaS9wcmVzZW50YXRpb24vMi9jb250ZXh0Lmpzb24iLAogICAgICAiQGlkIjogImM4ZjFjZjQ5LWQ3YWEtNGY2Mi04MDg2LTFiYjQ1ZGM4NmYzYiIsCiAgICAgICJAdHlwZSI6ICJvYTpBbm5vdGF0aW9uIiwKICAgICAgIm1vdGl2YXRpb24iOiBbCiAgICAgICAgIm9hOmNvbW1lbnRpbmciLAogICAgICAgICJvYTp0YWdnaW5nIgogICAgICBdLAogICAgICAib2E6c2VyaWFsaXplZEF0IjogIjIwMTktMDgtMjJUMjA6MjM6NDYuODE5WiIsCiAgICAgICJvbiI6IFsKICAgICAgICB7CiAgICAgICAgICAiQHR5cGUiOiAib2E6U3BlY2lmaWNSZXNvdXJjZSIsCiAgICAgICAgICAiZnVsbCI6ICJodHRwczovL3B1cmwuc3RhbmZvcmQuZWR1L3doMjM0Yno5MDEzL2lpaWYvY2FudmFzL2NvY2luYS1maWxlU2V0LXdoMjM0Yno5MDEzLXdoMjM0Yno5MDEzXzEiLAogICAgICAgICAgInNlbGVjdG9yIjogewogICAgICAgICAgICAiQHR5cGUiOiAib2E6Q2hvaWNlIiwKICAgICAgICAgICAgImRlZmF1bHQiOiB7CiAgICAgICAgICAgICAgIkB0eXBlIjogIm9hOkZyYWdtZW50U2VsZWN0b3IiLAogICAgICAgICAgICAgICJ2YWx1ZSI6ICJ4eXdoPTQ4NDcsMzg0OCw4ODAsOTMxIgogICAgICAgICAgICB9LAogICAgICAgICAgICAiaXRlbSI6IHsKICAgICAgICAgICAgICAiQHR5cGUiOiAib2E6U3ZnU2VsZWN0b3IiLAogICAgICAgICAgICAgICJ2YWx1ZSI6ICI8c3ZnIHhtbG5zPSdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Zyc+PHBhdGggeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIGQ9XCJNNTcyNy4xNTY0LDM4NDcuOTU4NzloLTQ0MC4xNTgyNXYwaC00NDAuMTU4MjV2NDY1LjM0NDQydjQ2NS4zNDQ0Mmg0NDAuMTU4MjVoNDQwLjE1ODI1di00NjUuMzQ0NDJ6XCIgZGF0YS1wYXBlci1kYXRhPVwieyZxdW90O3N0cm9rZVdpZHRoJnF1b3Q7OjEsJnF1b3Q7cm90YXRpb24mcXVvdDs6MCwmcXVvdDthbm5vdGF0aW9uJnF1b3Q7Om51bGwsJnF1b3Q7bm9uSG92ZXJTdHJva2VDb2xvciZxdW90OzpbJnF1b3Q7Q29sb3ImcXVvdDssMCwwLjc0OTAyLDFdLCZxdW90O2VkaXRhYmxlJnF1b3Q7OnRydWV9XCIgaWQ9XCJyZWN0YW5nbGVfMDM1ODY3NTUtOGMxOS00MmFjLTljMTMtZTcwZWUyN2QyN2M2XCIgZmlsbC1vcGFjaXR5PVwiMC4wMDAwMVwiIGZpbGw9XCIjMDBiZmZmXCIgZmlsbC1ydWxlPVwibm9uemVyb1wiIHN0cm9rZT1cIiMwMGJmZmZcIiBzdHJva2Utd2lkdGg9XCI4Ny43NDUyN1wiIHN0cm9rZS1saW5lY2FwPVwiYnV0dFwiIHN0cm9rZS1saW5lam9pbj1cIm1pdGVyXCIgc3Ryb2tlLW1pdGVybGltaXQ9XCIxMFwiIHN0cm9rZS1kYXNoYXJyYXk9XCJcIiBzdHJva2UtZGFzaG9mZnNldD1cIjBcIiBmb250LWZhbWlseT1cIm5vbmVcIiBmb250LXdlaWdodD1cIm5vbmVcIiBmb250LXNpemU9XCJub25lXCIgdGV4dC1hbmNob3I9XCJub25lXCIgc3R5bGU9XCJtaXgtYmxlbmQtbW9kZTogbm9ybWFsXCIvPjwvc3ZnPiIKICAgICAgICAgICAgfQogICAgICAgICAgfSwKICAgICAgICAgICJ3aXRoaW4iOiB7CiAgICAgICAgICAgICJAaWQiOiAiaHR0cHM6Ly9wdXJsLnN0YW5mb3JkLmVkdS93aDIzNGJ6OTAxMy9paWlmL21hbmlmZXN0IiwKICAgICAgICAgICAgIkB0eXBlIjogInNjOk1hbmlmZXN0IgogICAgICAgICAgfQogICAgICAgIH0KICAgICAgXSwKICAgICAgInJlc291cmNlIjogWwogICAgICAgIHsKICAgICAgICAgICJAdHlwZSI6ICJkY3R5cGVzOlRleHQiLAogICAgICAgICAgImNoYXJzIjogIjxwPkNhbmNlcjwvcD4iLAogICAgICAgICAgImZvcm1hdCI6ICJ0ZXh0L2h0bWwiCiAgICAgICAgfSwKICAgICAgICB7CiAgICAgICAgICAiQHR5cGUiOiAib2E6VGFnIiwKICAgICAgICAgICJjaGFycyI6ICJ6b2RpYWMiCiAgICAgICAgfQogICAgICBdCiAgICB9LAogICAgewogICAgICAiQGNvbnRleHQiOiAiaHR0cDovL2lpaWYuaW8vYXBpL3ByZXNlbnRhdGlvbi8yL2NvbnRleHQuanNvbiIsCiAgICAgICJAaWQiOiAiMTc2ZDMxM2YtMGYyZC00ZDI1LWEzZjktYjRlMTBlYzk2NzE4IiwKICAgICAgIkB0eXBlIjogIm9hOkFubm90YXRpb24iLAogICAgICAibW90aXZhdGlvbiI6IFsKICAgICAgICAib2E6Y29tbWVudGluZyIsCiAgICAgICAgIm9hOnRhZ2dpbmciCiAgICAgIF0sCiAgICAgICJvYTpzZXJpYWxpemVkQXQiOiAiMjAxOS0wOC0yMlQyMDoyMzo0Mi45NThaIiwKICAgICAgIm9uIjogWwogICAgICAgIHsKICAgICAgICAgICJAdHlwZSI6ICJvYTpTcGVjaWZpY1Jlc291cmNlIiwKICAgICAgICAgICJmdWxsIjogImh0dHBzOi8vcHVybC5zdGFuZm9yZC5lZHUvd2gyMzRiejkwMTMvaWlpZi9jYW52YXMvY29jaW5hLWZpbGVTZXQtd2gyMzRiejkwMTMtd2gyMzRiejkwMTNfMSIsCiAgICAgICAgICAic2VsZWN0b3IiOiB7CiAgICAgICAgICAgICJAdHlwZSI6ICJvYTpDaG9pY2UiLAogICAgICAgICAgICAiZGVmYXVsdCI6IHsKICAgICAgICAgICAgICAiQHR5cGUiOiAib2E6RnJhZ21lbnRTZWxlY3RvciIsCiAgICAgICAgICAgICAgInZhbHVlIjogInh5d2g9NTUxMCwzNTI0LDE2MzQsODY1IgogICAgICAgICAgICB9LAogICAgICAgICAgICAiaXRlbSI6IHsKICAgICAgICAgICAgICAiQHR5cGUiOiAib2E6U3ZnU2VsZWN0b3IiLAogICAgICAgICAgICAgICJ2YWx1ZSI6ICI8c3ZnIHhtbG5zPSdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Zyc+PHBhdGggeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIGQ9XCJNNzE0NC41NzMyNCw0Mzg4Ljg0OTMxaC04MTcuMTU1NnYwaC04MTcuMTU1NnYtNDMyLjUxNzl2LTQzMi41MTc5aDgxNy4xNTU2aDgxNy4xNTU2djQzMi41MTc5elwiIGRhdGEtcGFwZXItZGF0YT1cInsmcXVvdDtzdHJva2VXaWR0aCZxdW90OzoxLCZxdW90O3JvdGF0aW9uJnF1b3Q7OjAsJnF1b3Q7YW5ub3RhdGlvbiZxdW90OzpudWxsLCZxdW90O25vbkhvdmVyU3Ryb2tlQ29sb3ImcXVvdDs6WyZxdW90O0NvbG9yJnF1b3Q7LDAsMC43NDkwMiwxXSwmcXVvdDtlZGl0YWJsZSZxdW90Ozp0cnVlfVwiIGlkPVwicmVjdGFuZ2xlXzhiOTZiZDIyLWIzMDUtNGQxZS1hOWZlLTFiZjljZTU3NDY2NVwiIGZpbGwtb3BhY2l0eT1cIjAuMDAwMDFcIiBmaWxsPVwiIzAwYmZmZlwiIGZpbGwtcnVsZT1cIm5vbnplcm9cIiBzdHJva2U9XCIjMDBiZmZmXCIgc3Ryb2tlLXdpZHRoPVwiODcuNzQ1MjdcIiBzdHJva2UtbGluZWNhcD1cImJ1dHRcIiBzdHJva2UtbGluZWpvaW49XCJtaXRlclwiIHN0cm9rZS1taXRlcmxpbWl0PVwiMTBcIiBzdHJva2UtZGFzaGFycmF5PVwiXCIgc3Ryb2tlLWRhc2hvZmZzZXQ9XCIwXCIgZm9udC1mYW1pbHk9XCJub25lXCIgZm9udC13ZWlnaHQ9XCJub25lXCIgZm9udC1zaXplPVwibm9uZVwiIHRleHQtYW5jaG9yPVwibm9uZVwiIHN0eWxlPVwibWl4LWJsZW5kLW1vZGU6IG5vcm1hbFwiLz48L3N2Zz4iCiAgICAgICAgICAgIH0KICAgICAgICAgIH0sCiAgICAgICAgICAid2l0aGluIjogewogICAgICAgICAgICAiQGlkIjogImh0dHBzOi8vcHVybC5zdGFuZm9yZC5lZHUvd2gyMzRiejkwMTMvaWlpZi9tYW5pZmVzdCIsCiAgICAgICAgICAgICJAdHlwZSI6ICJzYzpNYW5pZmVzdCIKICAgICAgICAgIH0KICAgICAgICB9CiAgICAgIF0sCiAgICAgICJyZXNvdXJjZSI6IFsKICAgICAgICB7CiAgICAgICAgICAiQHR5cGUiOiAiZGN0eXBlczpUZXh0IiwKICAgICAgICAgICJjaGFycyI6ICI8cD5MZW88L3A+IiwKICAgICAgICAgICJmb3JtYXQiOiAidGV4dC9odG1sIgogICAgICAgIH0sCiAgICAgICAgewogICAgICAgICAgIkB0eXBlIjogIm9hOlRhZyIsCiAgICAgICAgICAiY2hhcnMiOiAiem9kaWFjIgogICAgICAgIH0KICAgICAgXQogICAgfQogIF0KfQo=
</details>

```'></iiif-annotation>```
</div>

<iiif-annotation annotationurl='data:plain/text;charset=utf-8;base64,ewogICJAY29udGV4dCI6ICJodHRwOi8vaWlpZi5pby9hcGkvcHJlc2VudGF0aW9uLzIvY29udGV4dC5qc29uIiwKICAiQGlkIjogIi9hbm5vdGF0ZS9hbm5vdGF0aW9ucy82NjNjMTJlMy1kNDE5LTQ2NGItOTZlZC0wMzFiYmM3Njc0ZjQtbGlzdC5qc29uIiwKICAiQHR5cGUiOiAic2M6QW5ub3RhdGlvbkxpc3QiLAogICJvYTpzZXJpYWxpemVkQXQiOiAiMjAxOS0wOC0yMlQyMDoyNDowNi4zMDhaIiwKICAicmVzb3VyY2VzIjogWwogICAgewogICAgICAiQGNvbnRleHQiOiAiaHR0cDovL2lpaWYuaW8vYXBpL3ByZXNlbnRhdGlvbi8yL2NvbnRleHQuanNvbiIsCiAgICAgICJAaWQiOiAiNjYzYzEyZTMtZDQxOS00NjRiLTk2ZWQtMDMxYmJjNzY3NGY0IiwKICAgICAgIkB0eXBlIjogIm9hOkFubm90YXRpb24iLAogICAgICAibW90aXZhdGlvbiI6IFsKICAgICAgICAib2E6Y29tbWVudGluZyIsCiAgICAgICAgIm9hOnRhZ2dpbmciCiAgICAgIF0sCiAgICAgICJvYTpzZXJpYWxpemVkQXQiOiAiMjAxOS0wOC0yMlQyMDoyMzozMi4zMzZaIiwKICAgICAgIm9uIjogWwogICAgICAgIHsKICAgICAgICAgICJAdHlwZSI6ICJvYTpTcGVjaWZpY1Jlc291cmNlIiwKICAgICAgICAgICJmdWxsIjogImh0dHBzOi8vcHVybC5zdGFuZm9yZC5lZHUvd2gyMzRiejkwMTMvaWlpZi9jYW52YXMvY29jaW5hLWZpbGVTZXQtd2gyMzRiejkwMTMtd2gyMzRiejkwMTNfMSIsCiAgICAgICAgICAic2VsZWN0b3IiOiB7CiAgICAgICAgICAgICJAdHlwZSI6ICJvYTpDaG9pY2UiLAogICAgICAgICAgICAiZGVmYXVsdCI6IHsKICAgICAgICAgICAgICAiQHR5cGUiOiAib2E6RnJhZ21lbnRTZWxlY3RvciIsCiAgICAgICAgICAgICAgInZhbHVlIjogInh5d2g9Mjk5NywxNjk3LDEwODcsNzE5IgogICAgICAgICAgICB9LAogICAgICAgICAgICAiaXRlbSI6IHsKICAgICAgICAgICAgICAiQHR5cGUiOiAib2E6U3ZnU2VsZWN0b3IiLAogICAgICAgICAgICAgICJ2YWx1ZSI6ICI8c3ZnIHhtbG5zPSdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Zyc+PHBhdGggeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIGQ9XCJNMjk5Ny4xNzUyNCwxNjk2LjYwMjE2aDU0My40MDc4NXYwaDU0My40MDc4NXYzNTkuMzAyNDZ2MzU5LjMwMjQ2aC01NDMuNDA3ODVoLTU0My40MDc4NXYtMzU5LjMwMjQ2elwiIGRhdGEtcGFwZXItZGF0YT1cInsmcXVvdDtzdHJva2VXaWR0aCZxdW90OzoxLCZxdW90O3JvdGF0aW9uJnF1b3Q7OjAsJnF1b3Q7YW5ub3RhdGlvbiZxdW90OzpudWxsLCZxdW90O25vbkhvdmVyU3Ryb2tlQ29sb3ImcXVvdDs6WyZxdW90O0NvbG9yJnF1b3Q7LDAsMC43NDkwMiwxXSwmcXVvdDtlZGl0YWJsZSZxdW90Ozp0cnVlfVwiIGlkPVwicmVjdGFuZ2xlXzM1YTZlYzRiLWNhNTEtNDBmNy04YWJhLWMyNjgzM2EzMTA4OFwiIGZpbGwtb3BhY2l0eT1cIjAuMDAwMDFcIiBmaWxsPVwiIzAwYmZmZlwiIGZpbGwtcnVsZT1cIm5vbnplcm9cIiBzdHJva2U9XCIjMDBiZmZmXCIgc3Ryb2tlLXdpZHRoPVwiODcuNzQ1MjdcIiBzdHJva2UtbGluZWNhcD1cImJ1dHRcIiBzdHJva2UtbGluZWpvaW49XCJtaXRlclwiIHN0cm9rZS1taXRlcmxpbWl0PVwiMTBcIiBzdHJva2UtZGFzaGFycmF5PVwiXCIgc3Ryb2tlLWRhc2hvZmZzZXQ9XCIwXCIgZm9udC1mYW1pbHk9XCJub25lXCIgZm9udC13ZWlnaHQ9XCJub25lXCIgZm9udC1zaXplPVwibm9uZVwiIHRleHQtYW5jaG9yPVwibm9uZVwiIHN0eWxlPVwibWl4LWJsZW5kLW1vZGU6IG5vcm1hbFwiLz48L3N2Zz4iCiAgICAgICAgICAgIH0KICAgICAgICAgIH0sCiAgICAgICAgICAid2l0aGluIjogewogICAgICAgICAgICAiQGlkIjogImh0dHBzOi8vcHVybC5zdGFuZm9yZC5lZHUvd2gyMzRiejkwMTMvaWlpZi9tYW5pZmVzdCIsCiAgICAgICAgICAgICJAdHlwZSI6ICJzYzpNYW5pZmVzdCIKICAgICAgICAgIH0KICAgICAgICB9CiAgICAgIF0sCiAgICAgICJyZXNvdXJjZSI6IFsKICAgICAgICB7CiAgICAgICAgICAiQHR5cGUiOiAiZGN0eXBlczpUZXh0IiwKICAgICAgICAgICJjaGFycyI6ICI8cD5DZXBoZXVzLCBraW5nIG9mIEFldGhpb3BpYTxzcGFuIHN0eWxlPVwiY29sb3I6ICMyMjIyMjI7IGZvbnQtZmFtaWx5OiBhcmlhbCwgc2Fucy1zZXJpZjsgZm9udC1zaXplOiBzbWFsbDtcIj48c3BhbiBzdHlsZT1cImNhcmV0LWNvbG9yOiAjMjIyMjIyO1wiPi48L3NwYW4+PC9zcGFuPjwvcD4iLAogICAgICAgICAgImZvcm1hdCI6ICJ0ZXh0L2h0bWwiCiAgICAgICAgfSwKICAgICAgICB7CiAgICAgICAgICAiQHR5cGUiOiAib2E6VGFnIiwKICAgICAgICAgICJjaGFycyI6ICJncmVla19teXRob2xvZ3kiCiAgICAgICAgfQogICAgICBdCiAgICB9LAogICAgewogICAgICAiQGNvbnRleHQiOiAiaHR0cDovL2lpaWYuaW8vYXBpL3ByZXNlbnRhdGlvbi8yL2NvbnRleHQuanNvbiIsCiAgICAgICJAaWQiOiAiNDU3NjcxMTItMmY0NC00YTdkLWE2YTMtM2RhMjc4MzM4NDE3IiwKICAgICAgIkB0eXBlIjogIm9hOkFubm90YXRpb24iLAogICAgICAibW90aXZhdGlvbiI6IFsKICAgICAgICAib2E6Y29tbWVudGluZyIsCiAgICAgICAgIm9hOnRhZ2dpbmciCiAgICAgIF0sCiAgICAgICJvYTpzZXJpYWxpemVkQXQiOiAiMjAxOS0wOC0yMlQyMDoyMzozNC44OTlaIiwKICAgICAgIm9uIjogWwogICAgICAgIHsKICAgICAgICAgICJAdHlwZSI6ICJvYTpTcGVjaWZpY1Jlc291cmNlIiwKICAgICAgICAgICJmdWxsIjogImh0dHBzOi8vcHVybC5zdGFuZm9yZC5lZHUvd2gyMzRiejkwMTMvaWlpZi9jYW52YXMvY29jaW5hLWZpbGVTZXQtd2gyMzRiejkwMTMtd2gyMzRiejkwMTNfMSIsCiAgICAgICAgICAic2VsZWN0b3IiOiB7CiAgICAgICAgICAgICJAdHlwZSI6ICJvYTpDaG9pY2UiLAogICAgICAgICAgICAiZGVmYXVsdCI6IHsKICAgICAgICAgICAgICAiQHR5cGUiOiAib2E6RnJhZ21lbnRTZWxlY3RvciIsCiAgICAgICAgICAgICAgInZhbHVlIjogInh5d2g9NDA4OSwxNzQ4LDkwMiw1NzgiCiAgICAgICAgICAgIH0sCiAgICAgICAgICAgICJpdGVtIjogewogICAgICAgICAgICAgICJAdHlwZSI6ICJvYTpTdmdTZWxlY3RvciIsCiAgICAgICAgICAgICAgInZhbHVlIjogIjxzdmcgeG1sbnM9J2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJz48cGF0aCB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgZD1cIk00MDg4LjU2ODM1LDE3NDguMjYwNzdoNDUxLjA4NzA4djBoNDUxLjA4NzA4djI4OC43OTEydjI4OC43OTEyaC00NTEuMDg3MDhoLTQ1MS4wODcwOHYtMjg4Ljc5MTJ6XCIgZGF0YS1wYXBlci1kYXRhPVwieyZxdW90O3N0cm9rZVdpZHRoJnF1b3Q7OjEsJnF1b3Q7cm90YXRpb24mcXVvdDs6MCwmcXVvdDthbm5vdGF0aW9uJnF1b3Q7Om51bGwsJnF1b3Q7bm9uSG92ZXJTdHJva2VDb2xvciZxdW90OzpbJnF1b3Q7Q29sb3ImcXVvdDssMCwwLjc0OTAyLDFdLCZxdW90O2VkaXRhYmxlJnF1b3Q7OnRydWV9XCIgaWQ9XCJyZWN0YW5nbGVfYTFmYjg0YTktYjE5OC00NTk3LTk5MjYtNTNjMDkyNTQwYzc3XCIgZmlsbC1vcGFjaXR5PVwiMC4wMDAwMVwiIGZpbGw9XCIjMDBiZmZmXCIgZmlsbC1ydWxlPVwibm9uemVyb1wiIHN0cm9rZT1cIiMwMGJmZmZcIiBzdHJva2Utd2lkdGg9XCI4Ny43NDUyN1wiIHN0cm9rZS1saW5lY2FwPVwiYnV0dFwiIHN0cm9rZS1saW5lam9pbj1cIm1pdGVyXCIgc3Ryb2tlLW1pdGVybGltaXQ9XCIxMFwiIHN0cm9rZS1kYXNoYXJyYXk9XCJcIiBzdHJva2UtZGFzaG9mZnNldD1cIjBcIiBmb250LWZhbWlseT1cIm5vbmVcIiBmb250LXdlaWdodD1cIm5vbmVcIiBmb250LXNpemU9XCJub25lXCIgdGV4dC1hbmNob3I9XCJub25lXCIgc3R5bGU9XCJtaXgtYmxlbmQtbW9kZTogbm9ybWFsXCIvPjwvc3ZnPiIKICAgICAgICAgICAgfQogICAgICAgICAgfSwKICAgICAgICAgICJ3aXRoaW4iOiB7CiAgICAgICAgICAgICJAaWQiOiAiaHR0cHM6Ly9wdXJsLnN0YW5mb3JkLmVkdS93aDIzNGJ6OTAxMy9paWlmL21hbmlmZXN0IiwKICAgICAgICAgICAgIkB0eXBlIjogInNjOk1hbmlmZXN0IgogICAgICAgICAgfQogICAgICAgIH0KICAgICAgXSwKICAgICAgInJlc291cmNlIjogWwogICAgICAgIHsKICAgICAgICAgICJAdHlwZSI6ICJkY3R5cGVzOlRleHQiLAogICAgICAgICAgImNoYXJzIjogIjxwPlVyc2EgTWlub3I8L3A+IiwKICAgICAgICAgICJmb3JtYXQiOiAidGV4dC9odG1sIgogICAgICAgIH0sCiAgICAgICAgewogICAgICAgICAgIkB0eXBlIjogIm9hOlRhZyIsCiAgICAgICAgICAiY2hhcnMiOiAiYW5pbWFscyIKICAgICAgICB9CiAgICAgIF0KICAgIH0sCiAgICB7CiAgICAgICJAY29udGV4dCI6ICJodHRwOi8vaWlpZi5pby9hcGkvcHJlc2VudGF0aW9uLzIvY29udGV4dC5qc29uIiwKICAgICAgIkBpZCI6ICJjNTU5NDA0MC02N2JiLTQ2NGEtOGQ3Ny1kYWQyMjMxODc1YzgiLAogICAgICAiQHR5cGUiOiAib2E6QW5ub3RhdGlvbiIsCiAgICAgICJtb3RpdmF0aW9uIjogWwogICAgICAgICJvYTpjb21tZW50aW5nIiwKICAgICAgICAib2E6dGFnZ2luZyIKICAgICAgXSwKICAgICAgIm9hOnNlcmlhbGl6ZWRBdCI6ICIyMDE5LTA4LTIyVDIwOjIzOjM3LjY5MFoiLAogICAgICAib24iOiBbCiAgICAgICAgewogICAgICAgICAgIkB0eXBlIjogIm9hOlNwZWNpZmljUmVzb3VyY2UiLAogICAgICAgICAgImZ1bGwiOiAiaHR0cHM6Ly9wdXJsLnN0YW5mb3JkLmVkdS93aDIzNGJ6OTAxMy9paWlmL2NhbnZhcy9jb2NpbmEtZmlsZVNldC13aDIzNGJ6OTAxMy13aDIzNGJ6OTAxM18xIiwKICAgICAgICAgICJzZWxlY3RvciI6IHsKICAgICAgICAgICAgIkB0eXBlIjogIm9hOkNob2ljZSIsCiAgICAgICAgICAgICJkZWZhdWx0IjogewogICAgICAgICAgICAgICJAdHlwZSI6ICJvYTpGcmFnbWVudFNlbGVjdG9yIiwKICAgICAgICAgICAgICAidmFsdWUiOiAieHl3aD00MzgwLDIzMzEsMTczMywxMTg5IgogICAgICAgICAgICB9LAogICAgICAgICAgICAiaXRlbSI6IHsKICAgICAgICAgICAgICAiQHR5cGUiOiAib2E6U3ZnU2VsZWN0b3IiLAogICAgICAgICAgICAgICJ2YWx1ZSI6ICI8c3ZnIHhtbG5zPSdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Zyc+PHBhdGggeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIGQ9XCJNNDM3OS43NDYyNSwyMzMwLjYxNjU3aDg2Ni4zNzM2djBoODY2LjM3MzZ2NTk0LjI4OTMzdjU5NC4yODkzM2gtODY2LjM3MzZoLTg2Ni4zNzM2di01OTQuMjg5MzN6XCIgZGF0YS1wYXBlci1kYXRhPVwieyZxdW90O3N0cm9rZVdpZHRoJnF1b3Q7OjEsJnF1b3Q7cm90YXRpb24mcXVvdDs6MCwmcXVvdDthbm5vdGF0aW9uJnF1b3Q7Om51bGwsJnF1b3Q7bm9uSG92ZXJTdHJva2VDb2xvciZxdW90OzpbJnF1b3Q7Q29sb3ImcXVvdDssMCwwLjc0OTAyLDFdLCZxdW90O2VkaXRhYmxlJnF1b3Q7OnRydWV9XCIgaWQ9XCJyZWN0YW5nbGVfY2Y0OGE2MjYtMjIwMS00NGZhLTlhYTktYzc0MjYzZDYyYzc5XCIgZmlsbC1vcGFjaXR5PVwiMC4wMDAwMVwiIGZpbGw9XCIjMDBiZmZmXCIgZmlsbC1ydWxlPVwibm9uemVyb1wiIHN0cm9rZT1cIiMwMGJmZmZcIiBzdHJva2Utd2lkdGg9XCI4Ny43NDUyN1wiIHN0cm9rZS1saW5lY2FwPVwiYnV0dFwiIHN0cm9rZS1saW5lam9pbj1cIm1pdGVyXCIgc3Ryb2tlLW1pdGVybGltaXQ9XCIxMFwiIHN0cm9rZS1kYXNoYXJyYXk9XCJcIiBzdHJva2UtZGFzaG9mZnNldD1cIjBcIiBmb250LWZhbWlseT1cIm5vbmVcIiBmb250LXdlaWdodD1cIm5vbmVcIiBmb250LXNpemU9XCJub25lXCIgdGV4dC1hbmNob3I9XCJub25lXCIgc3R5bGU9XCJtaXgtYmxlbmQtbW9kZTogbm9ybWFsXCIvPjwvc3ZnPiIKICAgICAgICAgICAgfQogICAgICAgICAgfSwKICAgICAgICAgICJ3aXRoaW4iOiB7CiAgICAgICAgICAgICJAaWQiOiAiaHR0cHM6Ly9wdXJsLnN0YW5mb3JkLmVkdS93aDIzNGJ6OTAxMy9paWlmL21hbmlmZXN0IiwKICAgICAgICAgICAgIkB0eXBlIjogInNjOk1hbmlmZXN0IgogICAgICAgICAgfQogICAgICAgIH0KICAgICAgXSwKICAgICAgInJlc291cmNlIjogWwogICAgICAgIHsKICAgICAgICAgICJAdHlwZSI6ICJkY3R5cGVzOlRleHQiLAogICAgICAgICAgImNoYXJzIjogIjxwPlRoaXMgaXMgYSByZW5kZXJpbmcgb2YgVXJzYSBNYWpvci4gVGhpcyZuYnNwO2NvbnN0ZWxsYXRpb24gdHJhbnNsYXRlZCBmcm9tIHRoZSBsYXRpbiBtZWFucyBcImdyZWF0ZXIgYmVhci5cIiBUaGlzIGlzIGluIHJlZmVybmNlIHRvIFVyc2EgTWlub3IgKGxlc3NlciBiZWFyKSB3aGljaCBjYW4gYmUgc2VlbiBpbiB0aGUgaW1hZ2UgYmVsb3cuPC9wPlxuPHA+VGhlc2UgY29uc3RlbGxhdGlvbnMgYXJlIG9mdGVuIHRhbGtlZCBhYm91dCBpbiBjb250cmFzdCB0byBlYWNoIG90aGVyLiBUaGV5IGFyZSBhbHNvIG9mdGVuIGNhbGxlZCB0aGUgYmlnIGFuZCBsaXR0bGUgZGlwcGVyIHJlc3BlY3RpdmVseS48L3A+IiwKICAgICAgICAgICJmb3JtYXQiOiAidGV4dC9odG1sIgogICAgICAgIH0sCiAgICAgICAgewogICAgICAgICAgIkB0eXBlIjogIm9hOlRhZyIsCiAgICAgICAgICAiY2hhcnMiOiAiYW5pbWFscyIKICAgICAgICB9CiAgICAgIF0KICAgIH0sCiAgICB7CiAgICAgICJAY29udGV4dCI6ICJodHRwOi8vaWlpZi5pby9hcGkvcHJlc2VudGF0aW9uLzIvY29udGV4dC5qc29uIiwKICAgICAgIkBpZCI6ICIyYjRjMmU5MS1lZDMyLTQ5NjItYjU1OS1jYmRiNmEwMDU3YjYiLAogICAgICAiQHR5cGUiOiAib2E6QW5ub3RhdGlvbiIsCiAgICAgICJtb3RpdmF0aW9uIjogWwogICAgICAgICJvYTpjb21tZW50aW5nIiwKICAgICAgICAib2E6dGFnZ2luZyIKICAgICAgXSwKICAgICAgIm9hOnNlcmlhbGl6ZWRBdCI6ICIyMDE5LTA4LTIyVDIwOjIzOjQwLjA4OFoiLAogICAgICAib24iOiBbCiAgICAgICAgewogICAgICAgICAgIkB0eXBlIjogIm9hOlNwZWNpZmljUmVzb3VyY2UiLAogICAgICAgICAgImZ1bGwiOiAiaHR0cHM6Ly9wdXJsLnN0YW5mb3JkLmVkdS93aDIzNGJ6OTAxMy9paWlmL2NhbnZhcy9jb2NpbmEtZmlsZVNldC13aDIzNGJ6OTAxMy13aDIzNGJ6OTAxM18xIiwKICAgICAgICAgICJzZWxlY3RvciI6IHsKICAgICAgICAgICAgIkB0eXBlIjogIm9hOkNob2ljZSIsCiAgICAgICAgICAgICJkZWZhdWx0IjogewogICAgICAgICAgICAgICJAdHlwZSI6ICJvYTpGcmFnbWVudFNlbGVjdG9yIiwKICAgICAgICAgICAgICAidmFsdWUiOiAieHl3aD02Mzk4LDIzNTIsNjAwLDc1MCIKICAgICAgICAgICAgfSwKICAgICAgICAgICAgIml0ZW0iOiB7CiAgICAgICAgICAgICAgIkB0eXBlIjogIm9hOlN2Z1NlbGVjdG9yIiwKICAgICAgICAgICAgICAidmFsdWUiOiAiPHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnPjxwYXRoIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiBkPVwiTTYzOTcuNjQxOTUsMjM1Mi4zNDQzNWgzMDAuMDQ5MzJ2MGgzMDAuMDQ5MzJ2Mzc1LjA2MTY1djM3NS4wNjE2NWgtMzAwLjA0OTMyaC0zMDAuMDQ5MzJ2LTM3NS4wNjE2NXpcIiBkYXRhLXBhcGVyLWRhdGE9XCJ7JnF1b3Q7c3Ryb2tlV2lkdGgmcXVvdDs6MSwmcXVvdDtyb3RhdGlvbiZxdW90OzowLCZxdW90O2Fubm90YXRpb24mcXVvdDs6bnVsbCwmcXVvdDtub25Ib3ZlclN0cm9rZUNvbG9yJnF1b3Q7OlsmcXVvdDtDb2xvciZxdW90OywwLDAuNzQ5MDIsMV0sJnF1b3Q7ZWRpdGFibGUmcXVvdDs6dHJ1ZX1cIiBpZD1cInJlY3RhbmdsZV9hMWU2ODk4Yi1iMTdhLTQwNzctYWNiMy03YzExOWI5NGI2YWFcIiBmaWxsLW9wYWNpdHk9XCIwLjAwMDAxXCIgZmlsbD1cIiMwMGJmZmZcIiBmaWxsLXJ1bGU9XCJub256ZXJvXCIgc3Ryb2tlPVwiIzAwYmZmZlwiIHN0cm9rZS13aWR0aD1cIjg3Ljc0NTI3XCIgc3Ryb2tlLWxpbmVjYXA9XCJidXR0XCIgc3Ryb2tlLWxpbmVqb2luPVwibWl0ZXJcIiBzdHJva2UtbWl0ZXJsaW1pdD1cIjEwXCIgc3Ryb2tlLWRhc2hhcnJheT1cIlwiIHN0cm9rZS1kYXNob2Zmc2V0PVwiMFwiIGZvbnQtZmFtaWx5PVwibm9uZVwiIGZvbnQtd2VpZ2h0PVwibm9uZVwiIGZvbnQtc2l6ZT1cIm5vbmVcIiB0ZXh0LWFuY2hvcj1cIm5vbmVcIiBzdHlsZT1cIm1peC1ibGVuZC1tb2RlOiBub3JtYWxcIi8+PC9zdmc+IgogICAgICAgICAgICB9CiAgICAgICAgICB9LAogICAgICAgICAgIndpdGhpbiI6IHsKICAgICAgICAgICAgIkBpZCI6ICJodHRwczovL3B1cmwuc3RhbmZvcmQuZWR1L3doMjM0Yno5MDEzL2lpaWYvbWFuaWZlc3QiLAogICAgICAgICAgICAiQHR5cGUiOiAic2M6TWFuaWZlc3QiCiAgICAgICAgICB9CiAgICAgICAgfQogICAgICBdLAogICAgICAicmVzb3VyY2UiOiBbCiAgICAgICAgewogICAgICAgICAgIkB0eXBlIjogImRjdHlwZXM6VGV4dCIsCiAgICAgICAgICAiY2hhcnMiOiAiPHA+Q29tYSBCZXJlbmljZXMsIG1lYW5zIFwiQmVyZW5pY2UncyBIYWlyXCIgaW4gRW5nbGlzaC4gTmFtZWQgZm9yIFF1ZWVuIEJlcmVuaWNlIElJIG9mIEVneXB0LiBJcyB0aGUgb25seSBtb2Rlcm4gY29uc3RlbGxhdGlvbiBuYW1lZCBmb3IgYSBoaXN0b3JpYyBwZXJzb24uJm5ic3A7PC9wPiIsCiAgICAgICAgICAiZm9ybWF0IjogInRleHQvaHRtbCIKICAgICAgICB9LAogICAgICAgIHsKICAgICAgICAgICJAdHlwZSI6ICJvYTpUYWciLAogICAgICAgICAgImNoYXJzIjogImhpc3RvcmljYWwiCiAgICAgICAgfQogICAgICBdCiAgICB9LAogICAgewogICAgICAiQGNvbnRleHQiOiAiaHR0cDovL2lpaWYuaW8vYXBpL3ByZXNlbnRhdGlvbi8yL2NvbnRleHQuanNvbiIsCiAgICAgICJAaWQiOiAiMTQyZjliMjItYjNkYi00YzM3LWJkZmYtMGQyNTFkMWMwMmE3IiwKICAgICAgIkB0eXBlIjogIm9hOkFubm90YXRpb24iLAogICAgICAibW90aXZhdGlvbiI6IFsKICAgICAgICAib2E6Y29tbWVudGluZyIsCiAgICAgICAgIm9hOnRhZ2dpbmciCiAgICAgIF0sCiAgICAgICJvYTpzZXJpYWxpemVkQXQiOiAiMjAxOS0wOC0yMlQyMDoyMzoyOS42NjdaIiwKICAgICAgIm9uIjogWwogICAgICAgIHsKICAgICAgICAgICJAdHlwZSI6ICJvYTpTcGVjaWZpY1Jlc291cmNlIiwKICAgICAgICAgICJmdWxsIjogImh0dHBzOi8vcHVybC5zdGFuZm9yZC5lZHUvd2gyMzRiejkwMTMvaWlpZi9jYW52YXMvY29jaW5hLWZpbGVTZXQtd2gyMzRiejkwMTMtd2gyMzRiejkwMTNfMSIsCiAgICAgICAgICAic2VsZWN0b3IiOiB7CiAgICAgICAgICAgICJAdHlwZSI6ICJvYTpDaG9pY2UiLAogICAgICAgICAgICAiZGVmYXVsdCI6IHsKICAgICAgICAgICAgICAiQHR5cGUiOiAib2E6RnJhZ21lbnRTZWxlY3RvciIsCiAgICAgICAgICAgICAgInZhbHVlIjogInh5d2g9MTk2NCwyNTk2LDExNDMsNzA3IgogICAgICAgICAgICB9LAogICAgICAgICAgICAiaXRlbSI6IHsKICAgICAgICAgICAgICAiQHR5cGUiOiAib2E6U3ZnU2VsZWN0b3IiLAogICAgICAgICAgICAgICJ2YWx1ZSI6ICI8c3ZnIHhtbG5zPSdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Zyc+PHBhdGggeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIGQ9XCJNMTk2My44MDk0OSwyNTk2LjM0MzAzaDU3MS42MTc1NXYwaDU3MS42MTc1NXYzNTMuMzYzNTd2MzUzLjM2MzU3aC01NzEuNjE3NTVoLTU3MS42MTc1NXYtMzUzLjM2MzU3elwiIGRhdGEtcGFwZXItZGF0YT1cInsmcXVvdDtzdHJva2VXaWR0aCZxdW90OzoxLCZxdW90O3JvdGF0aW9uJnF1b3Q7OjAsJnF1b3Q7YW5ub3RhdGlvbiZxdW90OzpudWxsLCZxdW90O25vbkhvdmVyU3Ryb2tlQ29sb3ImcXVvdDs6WyZxdW90O0NvbG9yJnF1b3Q7LDAsMC43NDkwMiwxXSwmcXVvdDtlZGl0YWJsZSZxdW90Ozp0cnVlfVwiIGlkPVwicmVjdGFuZ2xlX2Q2YzBhMGZjLWIwZGMtNGIxZC1iYWIxLTExYTYzMTM0ODY4NFwiIGZpbGwtb3BhY2l0eT1cIjAuMDAwMDFcIiBmaWxsPVwiIzAwYmZmZlwiIGZpbGwtcnVsZT1cIm5vbnplcm9cIiBzdHJva2U9XCIjMDBiZmZmXCIgc3Ryb2tlLXdpZHRoPVwiODcuNzQ1MjdcIiBzdHJva2UtbGluZWNhcD1cImJ1dHRcIiBzdHJva2UtbGluZWpvaW49XCJtaXRlclwiIHN0cm9rZS1taXRlcmxpbWl0PVwiMTBcIiBzdHJva2UtZGFzaGFycmF5PVwiXCIgc3Ryb2tlLWRhc2hvZmZzZXQ9XCIwXCIgZm9udC1mYW1pbHk9XCJub25lXCIgZm9udC13ZWlnaHQ9XCJub25lXCIgZm9udC1zaXplPVwibm9uZVwiIHRleHQtYW5jaG9yPVwibm9uZVwiIHN0eWxlPVwibWl4LWJsZW5kLW1vZGU6IG5vcm1hbFwiLz48L3N2Zz4iCiAgICAgICAgICAgIH0KICAgICAgICAgIH0sCiAgICAgICAgICAid2l0aGluIjogewogICAgICAgICAgICAiQGlkIjogImh0dHBzOi8vcHVybC5zdGFuZm9yZC5lZHUvd2gyMzRiejkwMTMvaWlpZi9tYW5pZmVzdCIsCiAgICAgICAgICAgICJAdHlwZSI6ICJzYzpNYW5pZmVzdCIKICAgICAgICAgIH0KICAgICAgICB9CiAgICAgIF0sCiAgICAgICJyZXNvdXJjZSI6IFsKICAgICAgICB7CiAgICAgICAgICAiQHR5cGUiOiAiZGN0eXBlczpUZXh0IiwKICAgICAgICAgICJjaGFycyI6ICI8cD5BbmRyb21lZGEsIHRoZSBjaGFpbmVkIHdvbWFuLjwvcD4iLAogICAgICAgICAgImZvcm1hdCI6ICJ0ZXh0L2h0bWwiCiAgICAgICAgfSwKICAgICAgICB7CiAgICAgICAgICAiQHR5cGUiOiAib2E6VGFnIiwKICAgICAgICAgICJjaGFycyI6ICJncmVla19teXRob2xvZ3kiCiAgICAgICAgfQogICAgICBdCiAgICB9LAogICAgewogICAgICAiQGNvbnRleHQiOiAiaHR0cDovL2lpaWYuaW8vYXBpL3ByZXNlbnRhdGlvbi8yL2NvbnRleHQuanNvbiIsCiAgICAgICJAaWQiOiAiMTE5MmU5NmUtMGJkNy00Njk1LWI2NjAtNzBlMDg5YmUxMDUzIiwKICAgICAgIkB0eXBlIjogIm9hOkFubm90YXRpb24iLAogICAgICAibW90aXZhdGlvbiI6IFsKICAgICAgICAib2E6Y29tbWVudGluZyIsCiAgICAgICAgIm9hOnRhZ2dpbmciCiAgICAgIF0sCiAgICAgICJvYTpzZXJpYWxpemVkQXQiOiAiMjAxOS0wOC0yMlQyMDoyNDowMi40NTFaIiwKICAgICAgIm9uIjogWwogICAgICAgIHsKICAgICAgICAgICJAdHlwZSI6ICJvYTpTcGVjaWZpY1Jlc291cmNlIiwKICAgICAgICAgICJmdWxsIjogImh0dHBzOi8vcHVybC5zdGFuZm9yZC5lZHUvd2gyMzRiejkwMTMvaWlpZi9jYW52YXMvY29jaW5hLWZpbGVTZXQtd2gyMzRiejkwMTMtd2gyMzRiejkwMTNfMSIsCiAgICAgICAgICAic2VsZWN0b3IiOiB7CiAgICAgICAgICAgICJAdHlwZSI6ICJvYTpDaG9pY2UiLAogICAgICAgICAgICAiZGVmYXVsdCI6IHsKICAgICAgICAgICAgICAiQHR5cGUiOiAib2E6RnJhZ21lbnRTZWxlY3RvciIsCiAgICAgICAgICAgICAgInZhbHVlIjogInh5d2g9MjMxOSwzNzE5LDY2Niw2MTMiCiAgICAgICAgICAgIH0sCiAgICAgICAgICAgICJpdGVtIjogewogICAgICAgICAgICAgICJAdHlwZSI6ICJvYTpTdmdTZWxlY3RvciIsCiAgICAgICAgICAgICAgInZhbHVlIjogIjxzdmcgeG1sbnM9J2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJz48cGF0aCB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgZD1cIk0yMzE5LjIwOTQ1LDM3MTguODA3NTVoMzMzLjE1MDM2djBoMzMzLjE1MDM2djMwNi40OTgzM3YzMDYuNDk4MzNoLTMzMy4xNTAzNmgtMzMzLjE1MDM2di0zMDYuNDk4MzN6XCIgZGF0YS1wYXBlci1kYXRhPVwieyZxdW90O3N0cm9rZVdpZHRoJnF1b3Q7OjEsJnF1b3Q7cm90YXRpb24mcXVvdDs6MCwmcXVvdDthbm5vdGF0aW9uJnF1b3Q7Om51bGwsJnF1b3Q7bm9uSG92ZXJTdHJva2VDb2xvciZxdW90OzpbJnF1b3Q7Q29sb3ImcXVvdDssMCwwLjc0OTAyLDFdLCZxdW90O2VkaXRhYmxlJnF1b3Q7OnRydWV9XCIgaWQ9XCJyZWN0YW5nbGVfODFkMzIzYmQtNzM5OC00ZTJlLWI5MDMtNmM3ODM4NDM3YWZiXCIgZmlsbC1vcGFjaXR5PVwiMC4wMDAwMVwiIGZpbGw9XCIjMDBiZmZmXCIgZmlsbC1ydWxlPVwibm9uemVyb1wiIHN0cm9rZT1cIiMwMGJmZmZcIiBzdHJva2Utd2lkdGg9XCI4Ny43NDUyN1wiIHN0cm9rZS1saW5lY2FwPVwiYnV0dFwiIHN0cm9rZS1saW5lam9pbj1cIm1pdGVyXCIgc3Ryb2tlLW1pdGVybGltaXQ9XCIxMFwiIHN0cm9rZS1kYXNoYXJyYXk9XCJcIiBzdHJva2UtZGFzaG9mZnNldD1cIjBcIiBmb250LWZhbWlseT1cIm5vbmVcIiBmb250LXdlaWdodD1cIm5vbmVcIiBmb250LXNpemU9XCJub25lXCIgdGV4dC1hbmNob3I9XCJub25lXCIgc3R5bGU9XCJtaXgtYmxlbmQtbW9kZTogbm9ybWFsXCIvPjwvc3ZnPiIKICAgICAgICAgICAgfQogICAgICAgICAgfSwKICAgICAgICAgICJ3aXRoaW4iOiB7CiAgICAgICAgICAgICJAaWQiOiAiaHR0cHM6Ly9wdXJsLnN0YW5mb3JkLmVkdS93aDIzNGJ6OTAxMy9paWlmL21hbmlmZXN0IiwKICAgICAgICAgICAgIkB0eXBlIjogInNjOk1hbmlmZXN0IgogICAgICAgICAgfQogICAgICAgIH0KICAgICAgXSwKICAgICAgInJlc291cmNlIjogWwogICAgICAgIHsKICAgICAgICAgICJAdHlwZSI6ICJkY3R5cGVzOlRleHQiLAogICAgICAgICAgImNoYXJzIjogIjxwPkFyaWVzPC9wPiIsCiAgICAgICAgICAiZm9ybWF0IjogInRleHQvaHRtbCIKICAgICAgICB9LAogICAgICAgIHsKICAgICAgICAgICJAdHlwZSI6ICJvYTpUYWciLAogICAgICAgICAgImNoYXJzIjogInpvZGlhYyIKICAgICAgICB9CiAgICAgIF0KICAgIH0sCiAgICB7CiAgICAgICJAY29udGV4dCI6ICJodHRwOi8vaWlpZi5pby9hcGkvcHJlc2VudGF0aW9uLzIvY29udGV4dC5qc29uIiwKICAgICAgIkBpZCI6ICIyNzY3YzE3ZS0xYzQ4LTQ1NDUtOTZlNC1kMDIxNTllYzIwYmIiLAogICAgICAiQHR5cGUiOiAib2E6QW5ub3RhdGlvbiIsCiAgICAgICJtb3RpdmF0aW9uIjogWwogICAgICAgICJvYTpjb21tZW50aW5nIiwKICAgICAgICAib2E6dGFnZ2luZyIKICAgICAgXSwKICAgICAgIm9hOnNlcmlhbGl6ZWRBdCI6ICIyMDE5LTA4LTIyVDIwOjIzOjU5LjgwOVoiLAogICAgICAib24iOiBbCiAgICAgICAgewogICAgICAgICAgIkB0eXBlIjogIm9hOlNwZWNpZmljUmVzb3VyY2UiLAogICAgICAgICAgImZ1bGwiOiAiaHR0cHM6Ly9wdXJsLnN0YW5mb3JkLmVkdS93aDIzNGJ6OTAxMy9paWlmL2NhbnZhcy9jb2NpbmEtZmlsZVNldC13aDIzNGJ6OTAxMy13aDIzNGJ6OTAxM18xIiwKICAgICAgICAgICJzZWxlY3RvciI6IHsKICAgICAgICAgICAgIkB0eXBlIjogIm9hOkNob2ljZSIsCiAgICAgICAgICAgICJkZWZhdWx0IjogewogICAgICAgICAgICAgICJAdHlwZSI6ICJvYTpGcmFnbWVudFNlbGVjdG9yIiwKICAgICAgICAgICAgICAidmFsdWUiOiAieHl3aD0yNzE2LDQwMzksMTE0OSw4NjQiCiAgICAgICAgICAgIH0sCiAgICAgICAgICAgICJpdGVtIjogewogICAgICAgICAgICAgICJAdHlwZSI6ICJvYTpTdmdTZWxlY3RvciIsCiAgICAgICAgICAgICAgInZhbHVlIjogIjxzdmcgeG1sbnM9J2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJz48cGF0aCB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgZD1cIk0zODY1LjAyNzEsNDAzOC42MzE4OWgtNTc0LjM1MTIxdjBoLTU3NC4zNTEyMXY0MzEuNzYyODZ2NDMxLjc2Mjg2aDU3NC4zNTEyMWg1NzQuMzUxMjF2LTQzMS43NjI4NnpcIiBkYXRhLXBhcGVyLWRhdGE9XCJ7JnF1b3Q7c3Ryb2tlV2lkdGgmcXVvdDs6MSwmcXVvdDtyb3RhdGlvbiZxdW90OzowLCZxdW90O2Fubm90YXRpb24mcXVvdDs6bnVsbCwmcXVvdDtub25Ib3ZlclN0cm9rZUNvbG9yJnF1b3Q7OlsmcXVvdDtDb2xvciZxdW90OywwLDAuNzQ5MDIsMV0sJnF1b3Q7ZWRpdGFibGUmcXVvdDs6dHJ1ZX1cIiBpZD1cInJlY3RhbmdsZV83NGQ3NzUzMi05NzE3LTQxY2QtOGI1MC0yNzBmM2EwM2M1NGVcIiBmaWxsLW9wYWNpdHk9XCIwLjAwMDAxXCIgZmlsbD1cIiMwMGJmZmZcIiBmaWxsLXJ1bGU9XCJub256ZXJvXCIgc3Ryb2tlPVwiIzAwYmZmZlwiIHN0cm9rZS13aWR0aD1cIjg3Ljc0NTI3XCIgc3Ryb2tlLWxpbmVjYXA9XCJidXR0XCIgc3Ryb2tlLWxpbmVqb2luPVwibWl0ZXJcIiBzdHJva2UtbWl0ZXJsaW1pdD1cIjEwXCIgc3Ryb2tlLWRhc2hhcnJheT1cIlwiIHN0cm9rZS1kYXNob2Zmc2V0PVwiMFwiIGZvbnQtZmFtaWx5PVwibm9uZVwiIGZvbnQtd2VpZ2h0PVwibm9uZVwiIGZvbnQtc2l6ZT1cIm5vbmVcIiB0ZXh0LWFuY2hvcj1cIm5vbmVcIiBzdHlsZT1cIm1peC1ibGVuZC1tb2RlOiBub3JtYWxcIi8+PC9zdmc+IgogICAgICAgICAgICB9CiAgICAgICAgICB9LAogICAgICAgICAgIndpdGhpbiI6IHsKICAgICAgICAgICAgIkBpZCI6ICJodHRwczovL3B1cmwuc3RhbmZvcmQuZWR1L3doMjM0Yno5MDEzL2lpaWYvbWFuaWZlc3QiLAogICAgICAgICAgICAiQHR5cGUiOiAic2M6TWFuaWZlc3QiCiAgICAgICAgICB9CiAgICAgICAgfQogICAgICBdLAogICAgICAicmVzb3VyY2UiOiBbCiAgICAgICAgewogICAgICAgICAgIkB0eXBlIjogImRjdHlwZXM6VGV4dCIsCiAgICAgICAgICAiY2hhcnMiOiAiPHA+VGF1cnVzPC9wPiIsCiAgICAgICAgICAiZm9ybWF0IjogInRleHQvaHRtbCIKICAgICAgICB9LAogICAgICAgIHsKICAgICAgICAgICJAdHlwZSI6ICJvYTpUYWciLAogICAgICAgICAgImNoYXJzIjogInpvZGlhYyIKICAgICAgICB9CiAgICAgIF0KICAgIH0sCiAgICB7CiAgICAgICJAY29udGV4dCI6ICJodHRwOi8vaWlpZi5pby9hcGkvcHJlc2VudGF0aW9uLzIvY29udGV4dC5qc29uIiwKICAgICAgIkBpZCI6ICI2MTA4YWRiZC0xN2IxLTRjMDEtOTQwZi0wOGI3NDUzYjI2YjEiLAogICAgICAiQHR5cGUiOiAib2E6QW5ub3RhdGlvbiIsCiAgICAgICJtb3RpdmF0aW9uIjogWwogICAgICAgICJvYTpjb21tZW50aW5nIiwKICAgICAgICAib2E6dGFnZ2luZyIKICAgICAgXSwKICAgICAgIm9hOnNlcmlhbGl6ZWRBdCI6ICIyMDE5LTA4LTIyVDIwOjI0OjA2LjMwOFoiLAogICAgICAib24iOiBbCiAgICAgICAgewogICAgICAgICAgIkB0eXBlIjogIm9hOlNwZWNpZmljUmVzb3VyY2UiLAogICAgICAgICAgImZ1bGwiOiAiaHR0cHM6Ly9wdXJsLnN0YW5mb3JkLmVkdS93aDIzNGJ6OTAxMy9paWlmL2NhbnZhcy9jb2NpbmEtZmlsZVNldC13aDIzNGJ6OTAxMy13aDIzNGJ6OTAxM18xIiwKICAgICAgICAgICJzZWxlY3RvciI6IHsKICAgICAgICAgICAgIkB0eXBlIjogIm9hOkNob2ljZSIsCiAgICAgICAgICAgICJkZWZhdWx0IjogewogICAgICAgICAgICAgICJAdHlwZSI6ICJvYTpGcmFnbWVudFNlbGVjdG9yIiwKICAgICAgICAgICAgICAidmFsdWUiOiAieHl3aD0yODAyLDM2NzEsMjg2LDMyNyIKICAgICAgICAgICAgfSwKICAgICAgICAgICAgIml0ZW0iOiB7CiAgICAgICAgICAgICAgIkB0eXBlIjogIm9hOlN2Z1NlbGVjdG9yIiwKICAgICAgICAgICAgICAidmFsdWUiOiAiPHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnPjxwYXRoIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiBkPVwiTTI4MDEuODY4MzksMzY3MS4yNDA0MWgxNDMuMjAyMjV2MGgxNDMuMjAyMjV2MTYzLjQ4OTIzdjE2My40ODkyM2gtMTQzLjIwMjI1aC0xNDMuMjAyMjV2LTE2My40ODkyM3pcIiBkYXRhLXBhcGVyLWRhdGE9XCJ7JnF1b3Q7c3Ryb2tlV2lkdGgmcXVvdDs6MSwmcXVvdDtyb3RhdGlvbiZxdW90OzowLCZxdW90O2Fubm90YXRpb24mcXVvdDs6bnVsbCwmcXVvdDtub25Ib3ZlclN0cm9rZUNvbG9yJnF1b3Q7OlsmcXVvdDtDb2xvciZxdW90OywwLDAuNzQ5MDIsMV0sJnF1b3Q7ZWRpdGFibGUmcXVvdDs6dHJ1ZX1cIiBpZD1cInJlY3RhbmdsZV9iYjVlNjllOS00ZjMzLTRlZDEtODI0Ny1mMDI1NjBmYWJiZGZcIiBmaWxsLW9wYWNpdHk9XCIwLjAwMDAxXCIgZmlsbD1cIiMwMGJmZmZcIiBmaWxsLXJ1bGU9XCJub256ZXJvXCIgc3Ryb2tlPVwiIzAwYmZmZlwiIHN0cm9rZS13aWR0aD1cIjg3Ljc0NTI3XCIgc3Ryb2tlLWxpbmVjYXA9XCJidXR0XCIgc3Ryb2tlLWxpbmVqb2luPVwibWl0ZXJcIiBzdHJva2UtbWl0ZXJsaW1pdD1cIjEwXCIgc3Ryb2tlLWRhc2hhcnJheT1cIlwiIHN0cm9rZS1kYXNob2Zmc2V0PVwiMFwiIGZvbnQtZmFtaWx5PVwibm9uZVwiIGZvbnQtd2VpZ2h0PVwibm9uZVwiIGZvbnQtc2l6ZT1cIm5vbmVcIiB0ZXh0LWFuY2hvcj1cIm5vbmVcIiBzdHlsZT1cIm1peC1ibGVuZC1tb2RlOiBub3JtYWxcIi8+PC9zdmc+IgogICAgICAgICAgICB9CiAgICAgICAgICB9LAogICAgICAgICAgIndpdGhpbiI6IHsKICAgICAgICAgICAgIkBpZCI6ICJodHRwczovL3B1cmwuc3RhbmZvcmQuZWR1L3doMjM0Yno5MDEzL2lpaWYvbWFuaWZlc3QiLAogICAgICAgICAgICAiQHR5cGUiOiAic2M6TWFuaWZlc3QiCiAgICAgICAgICB9CiAgICAgICAgfQogICAgICBdLAogICAgICAicmVzb3VyY2UiOiBbCiAgICAgICAgewogICAgICAgICAgIkB0eXBlIjogImRjdHlwZXM6VGV4dCIsCiAgICAgICAgICAiY2hhcnMiOiAiPHA+QXBlcyBsYXRlciBrbm93IGFzIFZlc3BhLCBMaWxpdW0gYW5kIHRoZW4gTXVzY2EgQm9yZWFsaXMuIElzIGxhdGluIGZvciBiZWVzLjwvcD4iLAogICAgICAgICAgImZvcm1hdCI6ICJ0ZXh0L2h0bWwiCiAgICAgICAgfSwKICAgICAgICB7CiAgICAgICAgICAiQHR5cGUiOiAib2E6VGFnIiwKICAgICAgICAgICJjaGFycyI6ICJhbmltYWxzIgogICAgICAgIH0sCiAgICAgICAgewogICAgICAgICAgIkB0eXBlIjogIm9hOlRhZyIsCiAgICAgICAgICAiY2hhcnMiOiAiZGlzY2FyZGVkX2NvbnN0ZWxsYXRpb24iCiAgICAgICAgfQogICAgICBdCiAgICB9LAogICAgewogICAgICAiQGNvbnRleHQiOiAiaHR0cDovL2lpaWYuaW8vYXBpL3ByZXNlbnRhdGlvbi8yL2NvbnRleHQuanNvbiIsCiAgICAgICJAaWQiOiAiMmFmNmQwYTQtNmFkZS00MmUwLTkzZWUtZGMxNWI1Mjc4YjgzIiwKICAgICAgIkB0eXBlIjogIm9hOkFubm90YXRpb24iLAogICAgICAibW90aXZhdGlvbiI6IFsKICAgICAgICAib2E6Y29tbWVudGluZyIsCiAgICAgICAgIm9hOnRhZ2dpbmciCiAgICAgIF0sCiAgICAgICJvYTpzZXJpYWxpemVkQXQiOiAiMjAxOS0wOC0yMlQyMDoyMzo1Ni45NDNaIiwKICAgICAgIm9uIjogWwogICAgICAgIHsKICAgICAgICAgICJAdHlwZSI6ICJvYTpTcGVjaWZpY1Jlc291cmNlIiwKICAgICAgICAgICJmdWxsIjogImh0dHBzOi8vcHVybC5zdGFuZm9yZC5lZHUvd2gyMzRiejkwMTMvaWlpZi9jYW52YXMvY29jaW5hLWZpbGVTZXQtd2gyMzRiejkwMTMtd2gyMzRiejkwMTNfMSIsCiAgICAgICAgICAic2VsZWN0b3IiOiB7CiAgICAgICAgICAgICJAdHlwZSI6ICJvYTpDaG9pY2UiLAogICAgICAgICAgICAiZGVmYXVsdCI6IHsKICAgICAgICAgICAgICAiQHR5cGUiOiAib2E6RnJhZ21lbnRTZWxlY3RvciIsCiAgICAgICAgICAgICAgInZhbHVlIjogInh5d2g9MzYxMyw1NTQ1LDYwMSw0MTUiCiAgICAgICAgICAgIH0sCiAgICAgICAgICAgICJpdGVtIjogewogICAgICAgICAgICAgICJAdHlwZSI6ICJvYTpTdmdTZWxlY3RvciIsCiAgICAgICAgICAgICAgInZhbHVlIjogIjxzdmcgeG1sbnM9J2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJz48cGF0aCB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgZD1cIk0zNjEzLjM0Nzc5LDU1NDQuODAzMTVoMzAwLjcyNDcydjBoMzAwLjcyNDcydjIwNy42NDMyNnYyMDcuNjQzMjZoLTMwMC43MjQ3MmgtMzAwLjcyNDcydi0yMDcuNjQzMjZ6XCIgZGF0YS1wYXBlci1kYXRhPVwieyZxdW90O3N0cm9rZVdpZHRoJnF1b3Q7OjEsJnF1b3Q7cm90YXRpb24mcXVvdDs6MCwmcXVvdDthbm5vdGF0aW9uJnF1b3Q7Om51bGwsJnF1b3Q7bm9uSG92ZXJTdHJva2VDb2xvciZxdW90OzpbJnF1b3Q7Q29sb3ImcXVvdDssMCwwLjc0OTAyLDFdLCZxdW90O2VkaXRhYmxlJnF1b3Q7OnRydWV9XCIgaWQ9XCJyZWN0YW5nbGVfYWFiY2MwMTAtMGNiZi00ZDU4LWJlMDItZThjNTIyMjVjMzA4XCIgZmlsbC1vcGFjaXR5PVwiMC4wMDAwMVwiIGZpbGw9XCIjMDBiZmZmXCIgZmlsbC1ydWxlPVwibm9uemVyb1wiIHN0cm9rZT1cIiMwMGJmZmZcIiBzdHJva2Utd2lkdGg9XCI4Ny43NDUyN1wiIHN0cm9rZS1saW5lY2FwPVwiYnV0dFwiIHN0cm9rZS1saW5lam9pbj1cIm1pdGVyXCIgc3Ryb2tlLW1pdGVybGltaXQ9XCIxMFwiIHN0cm9rZS1kYXNoYXJyYXk9XCJcIiBzdHJva2UtZGFzaG9mZnNldD1cIjBcIiBmb250LWZhbWlseT1cIm5vbmVcIiBmb250LXdlaWdodD1cIm5vbmVcIiBmb250LXNpemU9XCJub25lXCIgdGV4dC1hbmNob3I9XCJub25lXCIgc3R5bGU9XCJtaXgtYmxlbmQtbW9kZTogbm9ybWFsXCIvPjwvc3ZnPiIKICAgICAgICAgICAgfQogICAgICAgICAgfSwKICAgICAgICAgICJ3aXRoaW4iOiB7CiAgICAgICAgICAgICJAaWQiOiAiaHR0cHM6Ly9wdXJsLnN0YW5mb3JkLmVkdS93aDIzNGJ6OTAxMy9paWlmL21hbmlmZXN0IiwKICAgICAgICAgICAgIkB0eXBlIjogInNjOk1hbmlmZXN0IgogICAgICAgICAgfQogICAgICAgIH0KICAgICAgXSwKICAgICAgInJlc291cmNlIjogWwogICAgICAgIHsKICAgICAgICAgICJAdHlwZSI6ICJkY3R5cGVzOlRleHQiLAogICAgICAgICAgImNoYXJzIjogIjxwPkxlcHVzLiBMYXRpbiBmb3IgaGFyZS48L3A+IiwKICAgICAgICAgICJmb3JtYXQiOiAidGV4dC9odG1sIgogICAgICAgIH0sCiAgICAgICAgewogICAgICAgICAgIkB0eXBlIjogIm9hOlRhZyIsCiAgICAgICAgICAiY2hhcnMiOiAiYW5pbWFscyIKICAgICAgICB9CiAgICAgIF0KICAgIH0sCiAgICB7CiAgICAgICJAY29udGV4dCI6ICJodHRwOi8vaWlpZi5pby9hcGkvcHJlc2VudGF0aW9uLzIvY29udGV4dC5qc29uIiwKICAgICAgIkBpZCI6ICJjODQ0ZWRiZi0xN2ZiLTRjYjYtYmM0ZS1jZDdhMDMyNGQyZGQiLAogICAgICAiQHR5cGUiOiAib2E6QW5ub3RhdGlvbiIsCiAgICAgICJtb3RpdmF0aW9uIjogWwogICAgICAgICJvYTpjb21tZW50aW5nIiwKICAgICAgICAib2E6dGFnZ2luZyIKICAgICAgXSwKICAgICAgIm9hOnNlcmlhbGl6ZWRBdCI6ICIyMDE5LTA4LTIyVDIwOjIzOjUzLjMyNloiLAogICAgICAib24iOiBbCiAgICAgICAgewogICAgICAgICAgIkB0eXBlIjogIm9hOlNwZWNpZmljUmVzb3VyY2UiLAogICAgICAgICAgImZ1bGwiOiAiaHR0cHM6Ly9wdXJsLnN0YW5mb3JkLmVkdS93aDIzNGJ6OTAxMy9paWlmL2NhbnZhcy9jb2NpbmEtZmlsZVNldC13aDIzNGJ6OTAxMy13aDIzNGJ6OTAxM18xIiwKICAgICAgICAgICJzZWxlY3RvciI6IHsKICAgICAgICAgICAgIkB0eXBlIjogIm9hOkNob2ljZSIsCiAgICAgICAgICAgICJkZWZhdWx0IjogewogICAgICAgICAgICAgICJAdHlwZSI6ICJvYTpGcmFnbWVudFNlbGVjdG9yIiwKICAgICAgICAgICAgICAidmFsdWUiOiAieHl3aD00NzM3LDQ3MDcsMzc1LDMxNSIKICAgICAgICAgICAgfSwKICAgICAgICAgICAgIml0ZW0iOiB7CiAgICAgICAgICAgICAgIkB0eXBlIjogIm9hOlN2Z1NlbGVjdG9yIiwKICAgICAgICAgICAgICAidmFsdWUiOiAiPHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnPjxwYXRoIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiBkPVwiTTQ3MzcuNDg1NDMsNDcwNy4wN2gxODcuMzU2Mjd2MGgxODcuMzU2Mjd2MTU3LjUyMjQ3djE1Ny41MjI0N2gtMTg3LjM1NjI3aC0xODcuMzU2Mjd2LTE1Ny41MjI0N3pcIiBkYXRhLXBhcGVyLWRhdGE9XCJ7JnF1b3Q7c3Ryb2tlV2lkdGgmcXVvdDs6MSwmcXVvdDtyb3RhdGlvbiZxdW90OzowLCZxdW90O2Fubm90YXRpb24mcXVvdDs6bnVsbCwmcXVvdDtub25Ib3ZlclN0cm9rZUNvbG9yJnF1b3Q7OlsmcXVvdDtDb2xvciZxdW90OywwLDAuNzQ5MDIsMV0sJnF1b3Q7ZWRpdGFibGUmcXVvdDs6dHJ1ZX1cIiBpZD1cInJlY3RhbmdsZV9mZmVkMjFlZS0xMWFmLTRiNWQtODE4My1jNTg2MTlhZDg3ZDFcIiBmaWxsLW9wYWNpdHk9XCIwLjAwMDAxXCIgZmlsbD1cIiMwMGJmZmZcIiBmaWxsLXJ1bGU9XCJub256ZXJvXCIgc3Ryb2tlPVwiIzAwYmZmZlwiIHN0cm9rZS13aWR0aD1cIjg3Ljc0NTI3XCIgc3Ryb2tlLWxpbmVjYXA9XCJidXR0XCIgc3Ryb2tlLWxpbmVqb2luPVwibWl0ZXJcIiBzdHJva2UtbWl0ZXJsaW1pdD1cIjEwXCIgc3Ryb2tlLWRhc2hhcnJheT1cIlwiIHN0cm9rZS1kYXNob2Zmc2V0PVwiMFwiIGZvbnQtZmFtaWx5PVwibm9uZVwiIGZvbnQtd2VpZ2h0PVwibm9uZVwiIGZvbnQtc2l6ZT1cIm5vbmVcIiB0ZXh0LWFuY2hvcj1cIm5vbmVcIiBzdHlsZT1cIm1peC1ibGVuZC1tb2RlOiBub3JtYWxcIi8+PC9zdmc+IgogICAgICAgICAgICB9CiAgICAgICAgICB9LAogICAgICAgICAgIndpdGhpbiI6IHsKICAgICAgICAgICAgIkBpZCI6ICJodHRwczovL3B1cmwuc3RhbmZvcmQuZWR1L3doMjM0Yno5MDEzL2lpaWYvbWFuaWZlc3QiLAogICAgICAgICAgICAiQHR5cGUiOiAic2M6TWFuaWZlc3QiCiAgICAgICAgICB9CiAgICAgICAgfQogICAgICBdLAogICAgICAicmVzb3VyY2UiOiBbCiAgICAgICAgewogICAgICAgICAgIkB0eXBlIjogImRjdHlwZXM6VGV4dCIsCiAgICAgICAgICAiY2hhcnMiOiAiPHA+Q2FuaXMgbWlub3IuIFRyYW5zbGF0ZXMgaW50byBFbmdsaXNoIGFzIGxlc3NlciBkb2cuPC9wPiIsCiAgICAgICAgICAiZm9ybWF0IjogInRleHQvaHRtbCIKICAgICAgICB9LAogICAgICAgIHsKICAgICAgICAgICJAdHlwZSI6ICJvYTpUYWciLAogICAgICAgICAgImNoYXJzIjogImFuaW1hbHMiCiAgICAgICAgfQogICAgICBdCiAgICB9LAogICAgewogICAgICAiQGNvbnRleHQiOiAiaHR0cDovL2lpaWYuaW8vYXBpL3ByZXNlbnRhdGlvbi8yL2NvbnRleHQuanNvbiIsCiAgICAgICJAaWQiOiAiZDMyNmNhNTAtZTJjZC00MDk2LTg4YTAtMGQ1YWFmMzY2Y2QxIiwKICAgICAgIkB0eXBlIjogIm9hOkFubm90YXRpb24iLAogICAgICAibW90aXZhdGlvbiI6IFsKICAgICAgICAib2E6Y29tbWVudGluZyIsCiAgICAgICAgIm9hOnRhZ2dpbmciCiAgICAgIF0sCiAgICAgICJvYTpzZXJpYWxpemVkQXQiOiAiMjAxOS0wOC0yMlQyMDoyMzo1MC4xMzdaIiwKICAgICAgIm9uIjogWwogICAgICAgIHsKICAgICAgICAgICJAdHlwZSI6ICJvYTpTcGVjaWZpY1Jlc291cmNlIiwKICAgICAgICAgICJmdWxsIjogImh0dHBzOi8vcHVybC5zdGFuZm9yZC5lZHUvd2gyMzRiejkwMTMvaWlpZi9jYW52YXMvY29jaW5hLWZpbGVTZXQtd2gyMzRiejkwMTMtd2gyMzRiejkwMTNfMSIsCiAgICAgICAgICAic2VsZWN0b3IiOiB7CiAgICAgICAgICAgICJAdHlwZSI6ICJvYTpDaG9pY2UiLAogICAgICAgICAgICAiZGVmYXVsdCI6IHsKICAgICAgICAgICAgICAiQHR5cGUiOiAib2E6RnJhZ21lbnRTZWxlY3RvciIsCiAgICAgICAgICAgICAgInZhbHVlIjogInh5d2g9NDI4MSwzOTMwLDgzNSw3NTMiCiAgICAgICAgICAgIH0sCiAgICAgICAgICAgICJpdGVtIjogewogICAgICAgICAgICAgICJAdHlwZSI6ICJvYTpTdmdTZWxlY3RvciIsCiAgICAgICAgICAgICAgInZhbHVlIjogIjxzdmcgeG1sbnM9J2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJz48cGF0aCB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgZD1cIk01MTE1LjQ5MjM1LDM5MjkuNTE0aC00MTcuMzcwNzd2MGgtNDE3LjM3MDc3djM3Ni41OTMxNnYzNzYuNTkzMTZoNDE3LjM3MDc3aDQxNy4zNzA3N3YtMzc2LjU5MzE2elwiIGRhdGEtcGFwZXItZGF0YT1cInsmcXVvdDtzdHJva2VXaWR0aCZxdW90OzoxLCZxdW90O3JvdGF0aW9uJnF1b3Q7OjAsJnF1b3Q7YW5ub3RhdGlvbiZxdW90OzpudWxsLCZxdW90O25vbkhvdmVyU3Ryb2tlQ29sb3ImcXVvdDs6WyZxdW90O0NvbG9yJnF1b3Q7LDAsMC43NDkwMiwxXSwmcXVvdDtlZGl0YWJsZSZxdW90Ozp0cnVlfVwiIGlkPVwicmVjdGFuZ2xlXzM2ZTc4ZjJiLTdmYWItNGRmNS1iNmQ3LWViNWI1ZmY0ZDdjMVwiIGZpbGwtb3BhY2l0eT1cIjAuMDAwMDFcIiBmaWxsPVwiIzAwYmZmZlwiIGZpbGwtcnVsZT1cIm5vbnplcm9cIiBzdHJva2U9XCIjMDBiZmZmXCIgc3Ryb2tlLXdpZHRoPVwiODcuNzQ1MjdcIiBzdHJva2UtbGluZWNhcD1cImJ1dHRcIiBzdHJva2UtbGluZWpvaW49XCJtaXRlclwiIHN0cm9rZS1taXRlcmxpbWl0PVwiMTBcIiBzdHJva2UtZGFzaGFycmF5PVwiXCIgc3Ryb2tlLWRhc2hvZmZzZXQ9XCIwXCIgZm9udC1mYW1pbHk9XCJub25lXCIgZm9udC13ZWlnaHQ9XCJub25lXCIgZm9udC1zaXplPVwibm9uZVwiIHRleHQtYW5jaG9yPVwibm9uZVwiIHN0eWxlPVwibWl4LWJsZW5kLW1vZGU6IG5vcm1hbFwiLz48L3N2Zz4iCiAgICAgICAgICAgIH0KICAgICAgICAgIH0sCiAgICAgICAgICAid2l0aGluIjogewogICAgICAgICAgICAiQGlkIjogImh0dHBzOi8vcHVybC5zdGFuZm9yZC5lZHUvd2gyMzRiejkwMTMvaWlpZi9tYW5pZmVzdCIsCiAgICAgICAgICAgICJAdHlwZSI6ICJzYzpNYW5pZmVzdCIKICAgICAgICAgIH0KICAgICAgICB9CiAgICAgIF0sCiAgICAgICJyZXNvdXJjZSI6IFsKICAgICAgICB7CiAgICAgICAgICAiQHR5cGUiOiAiZGN0eXBlczpUZXh0IiwKICAgICAgICAgICJjaGFycyI6ICI8cD5HZW1pbmk8L3A+IiwKICAgICAgICAgICJmb3JtYXQiOiAidGV4dC9odG1sIgogICAgICAgIH0sCiAgICAgICAgewogICAgICAgICAgIkB0eXBlIjogIm9hOlRhZyIsCiAgICAgICAgICAiY2hhcnMiOiAiem9kaWFjIgogICAgICAgIH0KICAgICAgXQogICAgfSwKICAgIHsKICAgICAgIkBjb250ZXh0IjogImh0dHA6Ly9paWlmLmlvL2FwaS9wcmVzZW50YXRpb24vMi9jb250ZXh0Lmpzb24iLAogICAgICAiQGlkIjogImM4ZjFjZjQ5LWQ3YWEtNGY2Mi04MDg2LTFiYjQ1ZGM4NmYzYiIsCiAgICAgICJAdHlwZSI6ICJvYTpBbm5vdGF0aW9uIiwKICAgICAgIm1vdGl2YXRpb24iOiBbCiAgICAgICAgIm9hOmNvbW1lbnRpbmciLAogICAgICAgICJvYTp0YWdnaW5nIgogICAgICBdLAogICAgICAib2E6c2VyaWFsaXplZEF0IjogIjIwMTktMDgtMjJUMjA6MjM6NDYuODE5WiIsCiAgICAgICJvbiI6IFsKICAgICAgICB7CiAgICAgICAgICAiQHR5cGUiOiAib2E6U3BlY2lmaWNSZXNvdXJjZSIsCiAgICAgICAgICAiZnVsbCI6ICJodHRwczovL3B1cmwuc3RhbmZvcmQuZWR1L3doMjM0Yno5MDEzL2lpaWYvY2FudmFzL2NvY2luYS1maWxlU2V0LXdoMjM0Yno5MDEzLXdoMjM0Yno5MDEzXzEiLAogICAgICAgICAgInNlbGVjdG9yIjogewogICAgICAgICAgICAiQHR5cGUiOiAib2E6Q2hvaWNlIiwKICAgICAgICAgICAgImRlZmF1bHQiOiB7CiAgICAgICAgICAgICAgIkB0eXBlIjogIm9hOkZyYWdtZW50U2VsZWN0b3IiLAogICAgICAgICAgICAgICJ2YWx1ZSI6ICJ4eXdoPTQ4NDcsMzg0OCw4ODAsOTMxIgogICAgICAgICAgICB9LAogICAgICAgICAgICAiaXRlbSI6IHsKICAgICAgICAgICAgICAiQHR5cGUiOiAib2E6U3ZnU2VsZWN0b3IiLAogICAgICAgICAgICAgICJ2YWx1ZSI6ICI8c3ZnIHhtbG5zPSdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Zyc+PHBhdGggeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIGQ9XCJNNTcyNy4xNTY0LDM4NDcuOTU4NzloLTQ0MC4xNTgyNXYwaC00NDAuMTU4MjV2NDY1LjM0NDQydjQ2NS4zNDQ0Mmg0NDAuMTU4MjVoNDQwLjE1ODI1di00NjUuMzQ0NDJ6XCIgZGF0YS1wYXBlci1kYXRhPVwieyZxdW90O3N0cm9rZVdpZHRoJnF1b3Q7OjEsJnF1b3Q7cm90YXRpb24mcXVvdDs6MCwmcXVvdDthbm5vdGF0aW9uJnF1b3Q7Om51bGwsJnF1b3Q7bm9uSG92ZXJTdHJva2VDb2xvciZxdW90OzpbJnF1b3Q7Q29sb3ImcXVvdDssMCwwLjc0OTAyLDFdLCZxdW90O2VkaXRhYmxlJnF1b3Q7OnRydWV9XCIgaWQ9XCJyZWN0YW5nbGVfMDM1ODY3NTUtOGMxOS00MmFjLTljMTMtZTcwZWUyN2QyN2M2XCIgZmlsbC1vcGFjaXR5PVwiMC4wMDAwMVwiIGZpbGw9XCIjMDBiZmZmXCIgZmlsbC1ydWxlPVwibm9uemVyb1wiIHN0cm9rZT1cIiMwMGJmZmZcIiBzdHJva2Utd2lkdGg9XCI4Ny43NDUyN1wiIHN0cm9rZS1saW5lY2FwPVwiYnV0dFwiIHN0cm9rZS1saW5lam9pbj1cIm1pdGVyXCIgc3Ryb2tlLW1pdGVybGltaXQ9XCIxMFwiIHN0cm9rZS1kYXNoYXJyYXk9XCJcIiBzdHJva2UtZGFzaG9mZnNldD1cIjBcIiBmb250LWZhbWlseT1cIm5vbmVcIiBmb250LXdlaWdodD1cIm5vbmVcIiBmb250LXNpemU9XCJub25lXCIgdGV4dC1hbmNob3I9XCJub25lXCIgc3R5bGU9XCJtaXgtYmxlbmQtbW9kZTogbm9ybWFsXCIvPjwvc3ZnPiIKICAgICAgICAgICAgfQogICAgICAgICAgfSwKICAgICAgICAgICJ3aXRoaW4iOiB7CiAgICAgICAgICAgICJAaWQiOiAiaHR0cHM6Ly9wdXJsLnN0YW5mb3JkLmVkdS93aDIzNGJ6OTAxMy9paWlmL21hbmlmZXN0IiwKICAgICAgICAgICAgIkB0eXBlIjogInNjOk1hbmlmZXN0IgogICAgICAgICAgfQogICAgICAgIH0KICAgICAgXSwKICAgICAgInJlc291cmNlIjogWwogICAgICAgIHsKICAgICAgICAgICJAdHlwZSI6ICJkY3R5cGVzOlRleHQiLAogICAgICAgICAgImNoYXJzIjogIjxwPkNhbmNlcjwvcD4iLAogICAgICAgICAgImZvcm1hdCI6ICJ0ZXh0L2h0bWwiCiAgICAgICAgfSwKICAgICAgICB7CiAgICAgICAgICAiQHR5cGUiOiAib2E6VGFnIiwKICAgICAgICAgICJjaGFycyI6ICJ6b2RpYWMiCiAgICAgICAgfQogICAgICBdCiAgICB9LAogICAgewogICAgICAiQGNvbnRleHQiOiAiaHR0cDovL2lpaWYuaW8vYXBpL3ByZXNlbnRhdGlvbi8yL2NvbnRleHQuanNvbiIsCiAgICAgICJAaWQiOiAiMTc2ZDMxM2YtMGYyZC00ZDI1LWEzZjktYjRlMTBlYzk2NzE4IiwKICAgICAgIkB0eXBlIjogIm9hOkFubm90YXRpb24iLAogICAgICAibW90aXZhdGlvbiI6IFsKICAgICAgICAib2E6Y29tbWVudGluZyIsCiAgICAgICAgIm9hOnRhZ2dpbmciCiAgICAgIF0sCiAgICAgICJvYTpzZXJpYWxpemVkQXQiOiAiMjAxOS0wOC0yMlQyMDoyMzo0Mi45NThaIiwKICAgICAgIm9uIjogWwogICAgICAgIHsKICAgICAgICAgICJAdHlwZSI6ICJvYTpTcGVjaWZpY1Jlc291cmNlIiwKICAgICAgICAgICJmdWxsIjogImh0dHBzOi8vcHVybC5zdGFuZm9yZC5lZHUvd2gyMzRiejkwMTMvaWlpZi9jYW52YXMvY29jaW5hLWZpbGVTZXQtd2gyMzRiejkwMTMtd2gyMzRiejkwMTNfMSIsCiAgICAgICAgICAic2VsZWN0b3IiOiB7CiAgICAgICAgICAgICJAdHlwZSI6ICJvYTpDaG9pY2UiLAogICAgICAgICAgICAiZGVmYXVsdCI6IHsKICAgICAgICAgICAgICAiQHR5cGUiOiAib2E6RnJhZ21lbnRTZWxlY3RvciIsCiAgICAgICAgICAgICAgInZhbHVlIjogInh5d2g9NTUxMCwzNTI0LDE2MzQsODY1IgogICAgICAgICAgICB9LAogICAgICAgICAgICAiaXRlbSI6IHsKICAgICAgICAgICAgICAiQHR5cGUiOiAib2E6U3ZnU2VsZWN0b3IiLAogICAgICAgICAgICAgICJ2YWx1ZSI6ICI8c3ZnIHhtbG5zPSdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Zyc+PHBhdGggeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIGQ9XCJNNzE0NC41NzMyNCw0Mzg4Ljg0OTMxaC04MTcuMTU1NnYwaC04MTcuMTU1NnYtNDMyLjUxNzl2LTQzMi41MTc5aDgxNy4xNTU2aDgxNy4xNTU2djQzMi41MTc5elwiIGRhdGEtcGFwZXItZGF0YT1cInsmcXVvdDtzdHJva2VXaWR0aCZxdW90OzoxLCZxdW90O3JvdGF0aW9uJnF1b3Q7OjAsJnF1b3Q7YW5ub3RhdGlvbiZxdW90OzpudWxsLCZxdW90O25vbkhvdmVyU3Ryb2tlQ29sb3ImcXVvdDs6WyZxdW90O0NvbG9yJnF1b3Q7LDAsMC43NDkwMiwxXSwmcXVvdDtlZGl0YWJsZSZxdW90Ozp0cnVlfVwiIGlkPVwicmVjdGFuZ2xlXzhiOTZiZDIyLWIzMDUtNGQxZS1hOWZlLTFiZjljZTU3NDY2NVwiIGZpbGwtb3BhY2l0eT1cIjAuMDAwMDFcIiBmaWxsPVwiIzAwYmZmZlwiIGZpbGwtcnVsZT1cIm5vbnplcm9cIiBzdHJva2U9XCIjMDBiZmZmXCIgc3Ryb2tlLXdpZHRoPVwiODcuNzQ1MjdcIiBzdHJva2UtbGluZWNhcD1cImJ1dHRcIiBzdHJva2UtbGluZWpvaW49XCJtaXRlclwiIHN0cm9rZS1taXRlcmxpbWl0PVwiMTBcIiBzdHJva2UtZGFzaGFycmF5PVwiXCIgc3Ryb2tlLWRhc2hvZmZzZXQ9XCIwXCIgZm9udC1mYW1pbHk9XCJub25lXCIgZm9udC13ZWlnaHQ9XCJub25lXCIgZm9udC1zaXplPVwibm9uZVwiIHRleHQtYW5jaG9yPVwibm9uZVwiIHN0eWxlPVwibWl4LWJsZW5kLW1vZGU6IG5vcm1hbFwiLz48L3N2Zz4iCiAgICAgICAgICAgIH0KICAgICAgICAgIH0sCiAgICAgICAgICAid2l0aGluIjogewogICAgICAgICAgICAiQGlkIjogImh0dHBzOi8vcHVybC5zdGFuZm9yZC5lZHUvd2gyMzRiejkwMTMvaWlpZi9tYW5pZmVzdCIsCiAgICAgICAgICAgICJAdHlwZSI6ICJzYzpNYW5pZmVzdCIKICAgICAgICAgIH0KICAgICAgICB9CiAgICAgIF0sCiAgICAgICJyZXNvdXJjZSI6IFsKICAgICAgICB7CiAgICAgICAgICAiQHR5cGUiOiAiZGN0eXBlczpUZXh0IiwKICAgICAgICAgICJjaGFycyI6ICI8cD5MZW88L3A+IiwKICAgICAgICAgICJmb3JtYXQiOiAidGV4dC9odG1sIgogICAgICAgIH0sCiAgICAgICAgewogICAgICAgICAgIkB0eXBlIjogIm9hOlRhZyIsCiAgICAgICAgICAiY2hhcnMiOiAiem9kaWFjIgogICAgICAgIH0KICAgICAgXQogICAgfQogIF0KfQo='></iiif-annotation>
