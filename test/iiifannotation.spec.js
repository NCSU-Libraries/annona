import Vue from 'vue'
//import index from 'karma-chai'
import { mount } from '@vue/test-utils'

import iiifAnnotation from '../src/components/iiifannotation.vue'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter';
import flushPromises from 'flush-promises'

describe('Component', () => {
    test('test url', async ()  => {

      var mock = new MockAdapter(axios);
      mock.onGet('https://raw.githubusercontent.com/tomcrane/iiif-collector/master/objects/paragraph.json').reply(200, {
          "@context": "http://iiif.io/api/presentation/2/context.json",
          "@id": "https://tomcrane.github.io/iiif-collector/objects/paragraph.json",
          "@type": "oa:Annotation",
          "motivation": "sc:painting",
          "resource": {
            "@type": "cnt:ContentAsText",
            "format": "text/plain",
            "chars": "Jim Watson and I have probably made a\nmost important discovery. We have built a model for\nthe structure of des-oxy-ribose-nucleic-acid (read it\ncarefully) called D.N.A. for short. You may remember\nthat the genes of the chromosomes - which carry the\nhereditary factors - are made up of protein and\nD.N.A."
          },
          "on": {
            "@id": "https://wellcomelibrary.org/iiif/b1948799x/canvas/c0#xywh=310,1250,1850,1180",
            "@type": "sc:Canvas",
            "within": {
              "@id": "https://wellcomelibrary.org/iiif/b1948799x/manifest",
              "@type": "sc:Manifest",
              "label": ""
            }
          }
        }
      );
      mock.onGet('https://wellcomelibrary.org/iiif/b1948799x/manifest').reply(200, {
  "@context": "http://iiif.io/api/presentation/2/context.json",
  "@id": "https://wellcomelibrary.org/iiif/b1948799x/manifest",
  "@type": "sc:Manifest",
  "label": "Copied letter from Francis Crick to Michael Crick",
  "metadata": [
    {
      "label": "Title",
      "value": "Copied letter from Francis Crick to Michael Crick"
    },
    {
      "label": "Date",
      "value": "1953"
    },
    {
      "label": "Reference",
      "value": "PPCRI/D/4/3"
    },
    {
      "label": "Description",
      "value": "A copy of the famous letter from Crick to his son Michael explaining his and Watson's discovery of the structure of DNA, 19 March 1953.<p>The letter is the earliest written description of the genetic mechanism, written before Crick and Watson's second <i>Nature</i> paper was drafted."
    },
    {
      "label": "Attribution",
      "value": "Wellcome Library<br/>License: CC-BY-NC"
    },
    {
      "label": "Repository",
      "value": "This material has been provided by Wellcome Library where the originals may be consulted."
    },
    {
      "label": "",
      "value": "<a href='https://search.wellcomelibrary.org/iii/encore/record/C__Rb1948799'>View full catalogue record</a>"
    },
    {
      "label": "Full conditions of use",
      "value": "You have permission to make copies of this work under a <a target=\"_top\" href=\"http://creativecommons.org/licenses/by-nc/4.0/\">Creative Commons, Attribution, Non-commercial license</a>.<br/><br/>Non-commercial use includes private study, academic research, teaching, and other activities that are not primarily intended for, or directed towards, commercial advantage or private monetary compensation. See the <a target=\"_top\" href=\"http://creativecommons.org/licenses/by-nc/4.0/legalcode\">Legal Code</a> for further information.<br/><br/>Image source should be attributed as specified in the full catalogue record. If no source is given the image should be attributed to Wellcome Library."
    }
  ],
  "license": "https://creativecommons.org/licenses/by-nc/4.0/",
  "logo": "https://wellcomelibrary.org/assets/img/squarelogo64.png",
  "related": {
    "@id": "https://wellcomelibrary.org/item/b1948799x",
    "format": "text/html"
  },
  "seeAlso": [
    {
      "@id": "https://wellcomelibrary.org/data/b1948799x.json",
      "format": "application/json",
      "profile": "http://wellcomelibrary.org/profiles/res"
    },
    {
      "@id": "https://wellcomelibrary.org/resource/schemaorg/b1948799x",
      "format": "application/ld+json",
      "profile": "http://iiif.io/community/profiles/discovery/schema"
    },
    {
      "@id": "https://wellcomelibrary.org/resource/dublincore/b1948799x",
      "format": "application/ld+json",
      "profile": "http://iiif.io/community/profiles/discovery/dc"
    }
  ],
  "service": [
    {
      "@context": "http://wellcomelibrary.org/ld/iiif-ext/0/context.json",
      "@id": "https://wellcomelibrary.org/iiif/b1948799x-0/access-control-hints-service",
      "profile": "http://wellcomelibrary.org/ld/iiif-ext/access-control-hints",
      "accessHint": "open"
    },
    {
      "@context": "http://universalviewer.io/context.json",
      "@id": "http://wellcomelibrary.org/service/trackingLabels/b1948799x",
      "profile": "http://universalviewer.io/tracking-extensions-profile",
      "trackingLabel": "Format: archive, Institution: Wellcome Library, Identifier: b1948799x, Digicode: diggenetics, Collection code: PPCRI/D/4/3"
    }
  ],
  "sequences": [
    {
      "@id": "https://wellcomelibrary.org/iiif/b1948799x/sequence/s0",
      "@type": "sc:Sequence",
      "label": "Sequence s0",
      "rendering": {
        "@id": "https://dlcs.io/pdf/wellcome/pdf-item/b1948799x/0",
        "format": "application/pdf",
        "label": "Download as PDF"
      },
      "canvases": [
        {
          "@id": "https://wellcomelibrary.org/iiif/b1948799x/canvas/c0",
          "@type": "sc:Canvas",
          "label": " - ",
          "thumbnail": {
            "@id": "https://dlcs.io/thumbs/wellcome/1/ce30a1a7-a606-4b5e-b2ad-c13677d3e8f6/full/67,100/0/default.jpg",
            "@type": "dctypes:Image",
            "service": {
              "@context": "http://iiif.io/api/image/2/context.json",
              "@id": "https://dlcs.io/thumbs/wellcome/1/ce30a1a7-a606-4b5e-b2ad-c13677d3e8f6",
              "protocol": "http://iiif.io/api/image",
              "height": 1024,
              "width": 683,
              "sizes": [
                {
                  "width": 67,
                  "height": 100
                },
                {
                  "width": 133,
                  "height": 200
                },
                {
                  "width": 267,
                  "height": 400
                },
                {
                  "width": 683,
                  "height": 1024
                }
              ],
              "profile": [
                "http://iiif.io/api/image/2/level0.json"
              ]
            }
          },
          "height": 3965,
          "width": 2643,
          "images": [
            {
              "@id": "https://wellcomelibrary.org/iiif/b1948799x/imageanno/ce30a1a7-a606-4b5e-b2ad-c13677d3e8f6",
              "@type": "oa:Annotation",
              "motivation": "sc:painting",
              "resource": {
                "@id": "https://dlcs.io/iiif-img/wellcome/1/ce30a1a7-a606-4b5e-b2ad-c13677d3e8f6/full/!1024,1024/0/default.jpg",
                "@type": "dctypes:Image",
                "format": "image/jpeg",
                "height": 1024,
                "width": 683,
                "service": {
                  "@context": "http://iiif.io/api/image/2/context.json",
                  "@id": "https://dlcs.io/iiif-img/wellcome/1/ce30a1a7-a606-4b5e-b2ad-c13677d3e8f6",
                  "profile": "http://iiif.io/api/image/2/level1.json"
                }
              },
              "on": "https://wellcomelibrary.org/iiif/b1948799x/canvas/c0"
            }
          ]
        },
        {
          "@id": "https://wellcomelibrary.org/iiif/b1948799x/canvas/c1",
          "@type": "sc:Canvas",
          "label": " - ",
          "thumbnail": {
            "@id": "https://dlcs.io/thumbs/wellcome/1/572eb401-1837-4b62-9125-2bf1e55c3365/full/67,100/0/default.jpg",
            "@type": "dctypes:Image",
            "service": {
              "@context": "http://iiif.io/api/image/2/context.json",
              "@id": "https://dlcs.io/thumbs/wellcome/1/572eb401-1837-4b62-9125-2bf1e55c3365",
              "protocol": "http://iiif.io/api/image",
              "height": 1024,
              "width": 683,
              "sizes": [
                {
                  "width": 67,
                  "height": 100
                },
                {
                  "width": 133,
                  "height": 200
                },
                {
                  "width": 267,
                  "height": 400
                },
                {
                  "width": 683,
                  "height": 1024
                }
              ],
              "profile": [
                "http://iiif.io/api/image/2/level0.json"
              ]
            }
          },
          "height": 3965,
          "width": 2643,
          "images": [
            {
              "@id": "https://wellcomelibrary.org/iiif/b1948799x/imageanno/572eb401-1837-4b62-9125-2bf1e55c3365",
              "@type": "oa:Annotation",
              "motivation": "sc:painting",
              "resource": {
                "@id": "https://dlcs.io/iiif-img/wellcome/1/572eb401-1837-4b62-9125-2bf1e55c3365/full/!1024,1024/0/default.jpg",
                "@type": "dctypes:Image",
                "format": "image/jpeg",
                "height": 1024,
                "width": 683,
                "service": {
                  "@context": "http://iiif.io/api/image/2/context.json",
                  "@id": "https://dlcs.io/iiif-img/wellcome/1/572eb401-1837-4b62-9125-2bf1e55c3365",
                  "profile": "http://iiif.io/api/image/2/level1.json"
                }
              },
              "on": "https://wellcomelibrary.org/iiif/b1948799x/canvas/c1"
            }
          ]
        },
        {
          "@id": "https://wellcomelibrary.org/iiif/b1948799x/canvas/c2",
          "@type": "sc:Canvas",
          "label": " - ",
          "thumbnail": {
            "@id": "https://dlcs.io/thumbs/wellcome/1/9b955204-adc4-417f-b340-0ad9bea63ff6/full/67,100/0/default.jpg",
            "@type": "dctypes:Image",
            "service": {
              "@context": "http://iiif.io/api/image/2/context.json",
              "@id": "https://dlcs.io/thumbs/wellcome/1/9b955204-adc4-417f-b340-0ad9bea63ff6",
              "protocol": "http://iiif.io/api/image",
              "height": 1024,
              "width": 683,
              "sizes": [
                {
                  "width": 67,
                  "height": 100
                },
                {
                  "width": 133,
                  "height": 200
                },
                {
                  "width": 267,
                  "height": 400
                },
                {
                  "width": 683,
                  "height": 1024
                }
              ],
              "profile": [
                "http://iiif.io/api/image/2/level0.json"
              ]
            }
          },
          "height": 3965,
          "width": 2643,
          "images": [
            {
              "@id": "https://wellcomelibrary.org/iiif/b1948799x/imageanno/9b955204-adc4-417f-b340-0ad9bea63ff6",
              "@type": "oa:Annotation",
              "motivation": "sc:painting",
              "resource": {
                "@id": "https://dlcs.io/iiif-img/wellcome/1/9b955204-adc4-417f-b340-0ad9bea63ff6/full/!1024,1024/0/default.jpg",
                "@type": "dctypes:Image",
                "format": "image/jpeg",
                "height": 1024,
                "width": 683,
                "service": {
                  "@context": "http://iiif.io/api/image/2/context.json",
                  "@id": "https://dlcs.io/iiif-img/wellcome/1/9b955204-adc4-417f-b340-0ad9bea63ff6",
                  "profile": "http://iiif.io/api/image/2/level1.json"
                }
              },
              "on": "https://wellcomelibrary.org/iiif/b1948799x/canvas/c2"
            }
          ]
        },
        {
          "@id": "https://wellcomelibrary.org/iiif/b1948799x/canvas/c3",
          "@type": "sc:Canvas",
          "label": " - ",
          "thumbnail": {
            "@id": "https://dlcs.io/thumbs/wellcome/1/3d134dfb-8e62-4ee1-8034-86d28e253e43/full/67,100/0/default.jpg",
            "@type": "dctypes:Image",
            "service": {
              "@context": "http://iiif.io/api/image/2/context.json",
              "@id": "https://dlcs.io/thumbs/wellcome/1/3d134dfb-8e62-4ee1-8034-86d28e253e43",
              "protocol": "http://iiif.io/api/image",
              "height": 1024,
              "width": 683,
              "sizes": [
                {
                  "width": 67,
                  "height": 100
                },
                {
                  "width": 133,
                  "height": 200
                },
                {
                  "width": 267,
                  "height": 400
                },
                {
                  "width": 683,
                  "height": 1024
                }
              ],
              "profile": [
                "http://iiif.io/api/image/2/level0.json"
              ]
            }
          },
          "height": 3965,
          "width": 2643,
          "images": [
            {
              "@id": "https://wellcomelibrary.org/iiif/b1948799x/imageanno/3d134dfb-8e62-4ee1-8034-86d28e253e43",
              "@type": "oa:Annotation",
              "motivation": "sc:painting",
              "resource": {
                "@id": "https://dlcs.io/iiif-img/wellcome/1/3d134dfb-8e62-4ee1-8034-86d28e253e43/full/!1024,1024/0/default.jpg",
                "@type": "dctypes:Image",
                "format": "image/jpeg",
                "height": 1024,
                "width": 683,
                "service": {
                  "@context": "http://iiif.io/api/image/2/context.json",
                  "@id": "https://dlcs.io/iiif-img/wellcome/1/3d134dfb-8e62-4ee1-8034-86d28e253e43",
                  "profile": "http://iiif.io/api/image/2/level1.json"
                }
              },
              "on": "https://wellcomelibrary.org/iiif/b1948799x/canvas/c3"
            }
          ]
        },
        {
          "@id": "https://wellcomelibrary.org/iiif/b1948799x/canvas/c4",
          "@type": "sc:Canvas",
          "label": " - ",
          "thumbnail": {
            "@id": "https://dlcs.io/thumbs/wellcome/1/48784e73-54a0-4d32-a157-51036b411241/full/67,100/0/default.jpg",
            "@type": "dctypes:Image",
            "service": {
              "@context": "http://iiif.io/api/image/2/context.json",
              "@id": "https://dlcs.io/thumbs/wellcome/1/48784e73-54a0-4d32-a157-51036b411241",
              "protocol": "http://iiif.io/api/image",
              "height": 1024,
              "width": 683,
              "sizes": [
                {
                  "width": 67,
                  "height": 100
                },
                {
                  "width": 133,
                  "height": 200
                },
                {
                  "width": 267,
                  "height": 400
                },
                {
                  "width": 683,
                  "height": 1024
                }
              ],
              "profile": [
                "http://iiif.io/api/image/2/level0.json"
              ]
            }
          },
          "height": 3965,
          "width": 2643,
          "images": [
            {
              "@id": "https://wellcomelibrary.org/iiif/b1948799x/imageanno/48784e73-54a0-4d32-a157-51036b411241",
              "@type": "oa:Annotation",
              "motivation": "sc:painting",
              "resource": {
                "@id": "https://dlcs.io/iiif-img/wellcome/1/48784e73-54a0-4d32-a157-51036b411241/full/!1024,1024/0/default.jpg",
                "@type": "dctypes:Image",
                "format": "image/jpeg",
                "height": 1024,
                "width": 683,
                "service": {
                  "@context": "http://iiif.io/api/image/2/context.json",
                  "@id": "https://dlcs.io/iiif-img/wellcome/1/48784e73-54a0-4d32-a157-51036b411241",
                  "profile": "http://iiif.io/api/image/2/level1.json"
                }
              },
              "on": "https://wellcomelibrary.org/iiif/b1948799x/canvas/c4"
            }
          ]
        },
        {
          "@id": "https://wellcomelibrary.org/iiif/b1948799x/canvas/c5",
          "@type": "sc:Canvas",
          "label": " - ",
          "thumbnail": {
            "@id": "https://dlcs.io/thumbs/wellcome/1/2f239ab4-87b4-4114-97ac-09b7c7f498e7/full/67,100/0/default.jpg",
            "@type": "dctypes:Image",
            "service": {
              "@context": "http://iiif.io/api/image/2/context.json",
              "@id": "https://dlcs.io/thumbs/wellcome/1/2f239ab4-87b4-4114-97ac-09b7c7f498e7",
              "protocol": "http://iiif.io/api/image",
              "height": 1024,
              "width": 683,
              "sizes": [
                {
                  "width": 67,
                  "height": 100
                },
                {
                  "width": 133,
                  "height": 200
                },
                {
                  "width": 267,
                  "height": 400
                },
                {
                  "width": 683,
                  "height": 1024
                }
              ],
              "profile": [
                "http://iiif.io/api/image/2/level0.json"
              ]
            }
          },
          "height": 3965,
          "width": 2643,
          "images": [
            {
              "@id": "https://wellcomelibrary.org/iiif/b1948799x/imageanno/2f239ab4-87b4-4114-97ac-09b7c7f498e7",
              "@type": "oa:Annotation",
              "motivation": "sc:painting",
              "resource": {
                "@id": "https://dlcs.io/iiif-img/wellcome/1/2f239ab4-87b4-4114-97ac-09b7c7f498e7/full/!1024,1024/0/default.jpg",
                "@type": "dctypes:Image",
                "format": "image/jpeg",
                "height": 1024,
                "width": 683,
                "service": {
                  "@context": "http://iiif.io/api/image/2/context.json",
                  "@id": "https://dlcs.io/iiif-img/wellcome/1/2f239ab4-87b4-4114-97ac-09b7c7f498e7",
                  "profile": "http://iiif.io/api/image/2/level1.json"
                }
              },
              "on": "https://wellcomelibrary.org/iiif/b1948799x/canvas/c5"
            }
          ]
        },
        {
          "@id": "https://wellcomelibrary.org/iiif/b1948799x/canvas/c6",
          "@type": "sc:Canvas",
          "label": " - ",
          "thumbnail": {
            "@id": "https://dlcs.io/thumbs/wellcome/1/793b32d0-ffae-47c2-9fcc-229e6af793d5/full/67,100/0/default.jpg",
            "@type": "dctypes:Image",
            "service": {
              "@context": "http://iiif.io/api/image/2/context.json",
              "@id": "https://dlcs.io/thumbs/wellcome/1/793b32d0-ffae-47c2-9fcc-229e6af793d5",
              "protocol": "http://iiif.io/api/image",
              "height": 1024,
              "width": 683,
              "sizes": [
                {
                  "width": 67,
                  "height": 100
                },
                {
                  "width": 133,
                  "height": 200
                },
                {
                  "width": 267,
                  "height": 400
                },
                {
                  "width": 683,
                  "height": 1024
                }
              ],
              "profile": [
                "http://iiif.io/api/image/2/level0.json"
              ]
            }
          },
          "height": 3965,
          "width": 2643,
          "images": [
            {
              "@id": "https://wellcomelibrary.org/iiif/b1948799x/imageanno/793b32d0-ffae-47c2-9fcc-229e6af793d5",
              "@type": "oa:Annotation",
              "motivation": "sc:painting",
              "resource": {
                "@id": "https://dlcs.io/iiif-img/wellcome/1/793b32d0-ffae-47c2-9fcc-229e6af793d5/full/!1024,1024/0/default.jpg",
                "@type": "dctypes:Image",
                "format": "image/jpeg",
                "height": 1024,
                "width": 683,
                "service": {
                  "@context": "http://iiif.io/api/image/2/context.json",
                  "@id": "https://dlcs.io/iiif-img/wellcome/1/793b32d0-ffae-47c2-9fcc-229e6af793d5",
                  "profile": "http://iiif.io/api/image/2/level1.json"
                }
              },
              "on": "https://wellcomelibrary.org/iiif/b1948799x/canvas/c6"
            }
          ]
        }
      ]
    }
  ]

      });
      const wrapper =  mount(iiifAnnotation,{
        propsData: {
          annotationurl: 'https://raw.githubusercontent.com/tomcrane/iiif-collector/master/objects/paragraph.json'
        }
      })
      await wrapper.vm.$nextTick()
      await flushPromises()
      const annotation = wrapper.vm.$data.annotation_items[0]
      expect(wrapper.vm.$data.annotation_items).toHaveLength(1)
      expect(annotation.label).toBe(undefined)
      expect(annotation.image).toEqual(["https://dlcs.io/iiif-img/wellcome/1/ce30a1a7-a606-4b5e-b2ad-c13677d3e8f6/310,1250,1850,1180/1200,/0/default.jpg"])
      expect(annotation.ocr).toBe("Jim Watson and I have probably made a\nmost important discovery. We have built a model for\nthe structure of des-oxy-ribose-nucleic-acid (read it\ncarefully) called D.N.A. for short. You may remember\nthat the genes of the chromosomes - which carry the\nhereditary factors - are made up of protein and\nD.N.A.")

})
})
