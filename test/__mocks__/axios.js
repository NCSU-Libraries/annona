
module.exports = {

  get: jest.fn((url) => {
  if (url === 'paragraph.json') {
        return Promise.resolve({
            data: {"resource":{"@type":"cnt:ContentAsText","format":"text/plain","chars":"Jim Watson and I have probably made a\nmost important discovery. We have built a model for\nthe structure of des-oxy-ribose-nucleic-acid (read it\ncarefully) called D.N.A. for short. You may remember\nthat the genes of the chromosomes - which carry the\nhereditary factors - are made up of protein and\nD.N.A."},"on":{"@id":"https://wellcomelibrary.org/iiif/b1948799x/canvas/c0#xywh=310,1250,1850,1180","@type":"sc:Canvas","within":{"@id":"https://wellcomelibrary.org/iiif/b1948799x/manifest","@type":"sc:Manifest"}}}
        });
  }
  if (url==='storyboardlist.json'){
    return Promise.resolve({data:{"label": "",
    "type": "storyboardlist",
    "items": 
    [
      {"title": "Bayeux Tapestry test", "board":
    "<iiif-storyboard annotationurl='https://storiiies.cogapp.com/holbein/annotations/list.json' manifesturl='https://storiiies.cogapp.com/holbein/manifest.json' styling='fit: horizontal;'></iiif-storyboard>"
    },
        {"title": "jsonexample","board": "<iiif-storyboard annotationurl='0rlhfbs7nxohjotc951ytp' styling='toggleoverlay:false;'></iiif-storyboard>",
        "annotation":{"resource":{"@type":"cnt:ContentAsText","format":"text/plain","chars":"Jim Watson and I have probably made a\nmost important discovery. We have built a model for\nthe structure of des-oxy-ribose-nucleic-acid (read it\ncarefully) called D.N.A. for short. You may remember\nthat the genes of the chromosomes - which carry the\nhereditary factors - are made up of protein and\nD.N.A."},"on":{"@id":"https://wellcomelibrary.org/iiif/b1948799x/canvas/c0#xywh=310,1250,1850,1180","@type":"sc:Canvas","within":{"@id":"https://wellcomelibrary.org/iiif/b1948799x/manifest","@type":"sc:Manifest"}}} },
     {"title": "", "board":
    "<iiif-storyboard annotationurl='https://dnoneill.github.io/annotate/annotations/wh234bz9013-0001-list.json'></iiif-storyboard>"}
    ,
    {"title": "multistoryboard test", "board":
    "<iiif-multistoryboard annotationurls='mc00240.json;page.json;'></iiif-multistoryboard>"},
    {"title": "multistoryboard test 2", "board":
    "<iiif-multistoryboard annotationurls='https://dnoneill.github.io/annotate/annotations/04fbbb28-d5a7-4408-b7da-800c4e65eda3-list.json' images='https://dlcs.io/iiif-img/3/2/8034eb5b-9c90-4471-ad68-52124232ec0c/info.json'></iiif-multistoryboard>"},
    {"title": "layers test", "board":
    "<iiif-storyboard annotationurl='https://dnoneill.github.io/annotate/annotations/04fbbb28-d5a7-4408-b7da-800c4e65eda3-list.json' layers='[{\"label\":\"x-ray\",\"xywh\":\"\",\"image\":\"https://dlcs.io/iiif-img/3/2/8034eb5b-9c90-4471-ad68-52124232ec0c/info.json\",\"section\":\"\",\"rotation\":\"\"}]' styling='togglelayers: true;'></iiif-storyboard>"}
]
}})
  }
  if (url === 'techocr.json'){
    return Promise.resolve({data: {"@context":"http://iiif.io/api/presentation/2/context.json","@id":"https://ocr.lib.ncsu.edu/ocr/te/technician-basketballspecial-1991-11_0001/technician-basketballspecial-1991-11_0001-annotation-list-paragraph.json","@type":"sc:AnnotationList","@label":"OCR text granularity of paragraph","resources":[{"@id":"https://ocr.lib.ncsu.edu/ocr/te/technician-basketballspecial-1991-11_0001/technician-basketballspecial-1991-11_0001-annotation-list-paragraph/881,247,1764,86","@type":"oa:Annotation","motivation":"sc:painting","resource":{"@type":"cnt:ContentAsText","format":"text/plain","chars":"Meet the Pack One Last Look"},"on":"https://d.lib.ncsu.edu/collections/canvas/technician-basketballspecial-1991-11_0001#xywh=881,247,1764,86"},{"@id":"https://ocr.lib.ncsu.edu/ocr/te/technician-basketballspecial-1991-11_0001/technician-basketballspecial-1991-11_0001-annotation-list-paragraph/878,396,2236,126","@type":"oa:Annotation","motivation":"sc:painting","resource":{"@type":"cnt:ContentAsText","format":"text/plain","chars":"Player proﬁles of all members of the Remember the exciting ﬁnal year of men’s and women’s basketball teams the “Fire \u0026 Ice” backoourt"},"on":"https://d.lib.ncsu.edu/collections/canvas/technician-basketballspecial-1991-11_0001#xywh=878,396,2236,126"},{"@id":"https://ocr.lib.ncsu.edu/ocr/te/technician-basketballspecial-1991-11_0001/technician-basketballspecial-1991-11_0001-annotation-list-paragraph/864,684,2330,236","@type":"oa:Annotation","motivation":"sc:painting","resource":{"@type":"cnt:ContentAsText","format":"text/plain","chars":"HMPreview ’91-92"},"on":"https://d.lib.ncsu.edu/collections/canvas/technician-basketballspecial-1991-11_0001#xywh=864,684,2330,236"},{"@id":"https://ocr.lib.ncsu.edu/ocr/te/technician-basketballspecial-1991-11_0001/technician-basketballspecial-1991-11_0001-annotation-list-paragraph/1455,1002,1180,50","@type":"oa:Annotation","motivation":"sc:painting","resource":{"@type":"cnt:ContentAsText","format":"text/plain","chars":"Technician’s Annual Basketball Edition"},"on":"https://d.lib.ncsu.edu/collections/canvas/technician-basketballspecial-1991-11_0001#xywh=1455,1002,1180,50"},{"@id":"https://ocr.lib.ncsu.edu/ocr/te/technician-basketballspecial-1991-11_0001/technician-basketballspecial-1991-11_0001-annotation-list-paragraph/2047,1649,1021,150","@type":"oa:Annotation","motivation":"sc:painting","resource":{"@type":"cnt:ContentAsText","format":"text/plain","chars":"LEADER OF TH ACK"},"on":"https://d.lib.ncsu.edu/collections/canvas/technician-basketballspecial-1991-11_0001#xywh=2047,1649,1021,150"},{"@id":"https://ocr.lib.ncsu.edu/ocr/te/technician-basketballspecial-1991-11_0001/technician-basketballspecial-1991-11_0001-annotation-list-paragraph/2044,1928,909,239","@type":"oa:Annotation","motivation":"sc:painting","resource":{"@type":"cnt:ContentAsText","format":"text/plain","chars":"TOM GUGLIOTTA IS LOOKING FOR A STRONG PERFORMANCE IN HIS"},"on":"https://d.lib.ncsu.edu/collections/canvas/technician-basketballspecial-1991-11_0001#xywh=2044,1928,909,239"},{"@id":"https://ocr.lib.ncsu.edu/ocr/te/technician-basketballspecial-1991-11_0001/technician-basketballspecial-1991-11_0001-annotation-list-paragraph/2047,2199,572,60","@type":"oa:Annotation","motivation":"sc:painting","resource":{"@type":"cnt:ContentAsText","format":"text/plain","chars":"SENIOR SEASON"},"on":"https://d.lib.ncsu.edu/collections/canvas/technician-basketballspecial-1991-11_0001#xywh=2047,2199,572,60"}]}
    });
  }
  if (url === 'https://ocr.lib.ncsu.edu/search/technician-basketballspecial-1991-11?q=test') {
    return Promise.resolve({data: {"@context":"http://iiif.io/api/search/0/context.json","@id":"https://ocr.lib.ncsu.edu/search/technician-basketballspecial-1991-11?q=test","@type":"sc:AnnotationList","startIndex":0,"within":{"ignored":[],"total":1,"@type":"sc:Layer"},"hits":[{"@type":"search:Hit","annotations":["urn:ocracoke:technician-basketballspecial-1991-11:technician-basketballspecial-1991-11_0011:annotation0","urn:ocracoke:technician-basketballspecial-1991-11:technician-basketballspecial-1991-11_0011:annotation1","urn:ocracoke:technician-basketballspecial-1991-11:technician-basketballspecial-1991-11_0011:annotation2"]},{"@type":"search:Hit","annotations":["urn:ocracoke:technician-basketballspecial-1991-11:technician-basketballspecial-1991-11_0023:annotation0"]}],"resources":[{"@id":"urn:ocracoke:technician-basketballspecial-1991-11:technician-basketballspecial-1991-11_0011:annotation0","@type":"oa:Annotation","motivation":"sc:painting","resource":{"@type":"cnt:ContentAsText","chars":"test"},"on":"https://d.lib.ncsu.edu/collections/canvas/technician-basketballspecial-1991-11_0011#xywh=883,3544,92,31"},{"@id":"urn:ocracoke:technician-basketballspecial-1991-11:technician-basketballspecial-1991-11_0011:annotation1","@type":"oa:Annotation","motivation":"sc:painting","resource":{"@type":"cnt:ContentAsText","chars":"test"},"on":"https://d.lib.ncsu.edu/collections/canvas/technician-basketballspecial-1991-11_0011#xywh=934,3601,97,34"},{"@id":"urn:ocracoke:technician-basketballspecial-1991-11:technician-basketballspecial-1991-11_0011:annotation2","@type":"oa:Annotation","motivation":"sc:painting","resource":{"@type":"cnt:ContentAsText","chars":"TEST"},"on":"https://d.lib.ncsu.edu/collections/canvas/technician-basketballspecial-1991-11_0011#xywh=0,0,0,0"},{"@id":"urn:ocracoke:technician-basketballspecial-1991-11:technician-basketballspecial-1991-11_0023:annotation0","@type":"oa:Annotation","motivation":"sc:painting","resource":{"@type":"cnt:ContentAsText","chars":"tests"},"on":"https://d.lib.ncsu.edu/collections/canvas/technician-basketballspecial-1991-11_0023#xywh=1802,987,75,21"}]}
    })
  }
  if (url === 'https://d.lib.ncsu.edu/collections/catalog/technician-basketballspecial-1991-11/manifest'){
    return Promise.resolve({
      data: {"@context":"http://iiif.io/api/presentation/2/context.json","@id":"https://d.lib.ncsu.edu/collections/catalog/technician-basketballspecial-1991-11/manifest","@type":"sc:Manifest","label":"Technician Basketball Special, November 1991","related":{"@id":"https://d.lib.ncsu.edu/collections/catalog/technician-basketballspecial-1991-11","format":"text/html","label":"HTML page for the resource","dcterms:modified":"2019-09-24T16:08:28.738Z"},"logo":{"@id":"https://d.lib.ncsu.edu/collections/assets/ncsu-libraries-white-logo-placement-0ac6d32dfc3427d3325882e6a32c81be.jpg"},"attribution":"Technician (Raleigh, N.C.) (LH1 .N6 T4), Special Collections Research Center at NC State University Libraries","license":["https://d.lib.ncsu.edu/collections/about#rights_and_use"],"metadata":[{"label":"title","value":"Technician Basketball Special, November 1991"},{"label":"Creator","value":"\u003cspan\u003e\u003ca href=\"https://d.lib.ncsu.edu/collections/catalog?f%5Bnames_facet%5D%5B%5D=Technician+%28Raleigh%2C+N.C.%29\"\u003eTechnician (Raleigh, N.C.)\u003c/a\u003e (Publisher)\u003c/span\u003e"},{"label":"Created Date","value":"1991-11"},{"label":"URL","value":"\u003cspan\u003e\u003ca href=\"https://d.lib.ncsu.edu/collections/catalog/technician-basketballspecial-1991-11\"\u003ehttps://d.lib.ncsu.edu/collections/catalog/technician-basketballspecial-1991-11\u003c/a\u003e\u003c/span\u003e"},{"label":"","value":"\u003cspan\u003e\u003ca title=\"IIIF drag \u0026amp; drop\" href=\"https://d.lib.ncsu.edu/collections/catalog/technician-basketballspecial-1991-11?manifest=https%3A%2F%2Fd.lib.ncsu.edu%2Fcollections%2Fcatalog%2Ftechnician-basketballspecial-1991-11%2Fmanifest.json\"\u003eIIIF drag \u0026amp; drop\u003c/a\u003e (\u003ca href=\"https://d.lib.ncsu.edu/collections/about-iiif\"\u003eAbout IIIF\u003c/a\u003e)\u003c/span\u003e"}],"thumbnail":{"@id":"https://iiif.lib.ncsu.edu/iiif/technician-basketballspecial-1991-11/full/150,/0/default.jpg","service":{"@context":"http://iiif.io/api/image/2/context.json","@id":"https://iiif.lib.ncsu.edu/iiif/technician-basketballspecial-1991-11","profile":"http://iiif.io/api/image/2/level2.json"}},"sequences":[{"canvases":[{"@type":"sc:Canvas","@id":"https://d.lib.ncsu.edu/collections/canvas/technician-basketballspecial-1991-11_0001","width":3560,"height":4356,"label":"[1]","seeAlso":[{"@id":"https://ocr.lib.ncsu.edu/ocr/te/technician-basketballspecial-1991-11_0001/technician-basketballspecial-1991-11_0001.hocr","format":"text/vnd.hocr+html","profile":"https://github.com/kba/hocr-spec/blob/master/hocr-spec.md","label":"hOCR"},{"@id":"https://ocr.lib.ncsu.edu/ocr/te/technician-basketballspecial-1991-11_0001/technician-basketballspecial-1991-11_0001.txt","format":"text/plain","label":"plain text OCR"}],"images":[{"@id":"https://d.lib.ncsu.edu/collections/canvas/technician-basketballspecial-1991-11_0001/image","@type":"oa:Annotation","on":"https://d.lib.ncsu.edu/collections/canvas/technician-basketballspecial-1991-11_0001","motivation":"sc:painting","resource":{"@id":"https://iiif.lib.ncsu.edu/iiif/technician-basketballspecial-1991-11_0001/full/1170,/0/default.jpg","width":3560,"height":4356,"service":{"profile":"http://iiif.io/api/image/2/level2.json","@context":"http://iiif.io/api/image/2/context.json","@id":"https://iiif.lib.ncsu.edu/iiif/technician-basketballspecial-1991-11_0001"},"@type":"dctypes:Image"}}],"otherContent":[{"@id":"https://ocr.lib.ncsu.edu/ocr/te/technician-basketballspecial-1991-11_0001/technician-basketballspecial-1991-11_0001-annotation-list-word.json","@type":"sc:AnnotationList","label":"Text of this page (word level)"},{"@id":"https://ocr.lib.ncsu.edu/ocr/te/technician-basketballspecial-1991-11_0001/technician-basketballspecial-1991-11_0001-annotation-list-line.json","@type":"sc:AnnotationList","label":"Text of this page (line level)"},{"@id":"https://ocr.lib.ncsu.edu/ocr/te/technician-basketballspecial-1991-11_0001/technician-basketballspecial-1991-11_0001-annotation-list-paragraph.json","@type":"sc:AnnotationList","label":"Text of this page (paragraph level)"}]},{"@type":"sc:Canvas","@id":"https://d.lib.ncsu.edu/collections/canvas/technician-basketballspecial-1991-11_0002","width":3501,"height":4359,"label":"[2]","seeAlso":[{"@id":"https://ocr.lib.ncsu.edu/ocr/te/technician-basketballspecial-1991-11_0002/technician-basketballspecial-1991-11_0002.hocr","format":"text/vnd.hocr+html","profile":"https://github.com/kba/hocr-spec/blob/master/hocr-spec.md","label":"hOCR"},{"@id":"https://ocr.lib.ncsu.edu/ocr/te/technician-basketballspecial-1991-11_0002/technician-basketballspecial-1991-11_0002.txt","format":"text/plain","label":"plain text OCR"}],"images":[{"@id":"https://d.lib.ncsu.edu/collections/canvas/technician-basketballspecial-1991-11_0002/image","@type":"oa:Annotation","on":"https://d.lib.ncsu.edu/collections/canvas/technician-basketballspecial-1991-11_0002","motivation":"sc:painting","resource":{"@id":"https://iiif.lib.ncsu.edu/iiif/technician-basketballspecial-1991-11_0002/full/1170,/0/default.jpg","width":3501,"height":4359,"service":{"profile":"http://iiif.io/api/image/2/level2.json","@context":"http://iiif.io/api/image/2/context.json","@id":"https://iiif.lib.ncsu.edu/iiif/technician-basketballspecial-1991-11_0002"},"@type":"dctypes:Image"}}],"otherContent":[{"@id":"https://ocr.lib.ncsu.edu/ocr/te/technician-basketballspecial-1991-11_0002/technician-basketballspecial-1991-11_0002-annotation-list-word.json","@type":"sc:AnnotationList","label":"Text of this page (word level)"},{"@id":"https://ocr.lib.ncsu.edu/ocr/te/technician-basketballspecial-1991-11_0002/technician-basketballspecial-1991-11_0002-annotation-list-line.json","@type":"sc:AnnotationList","label":"Text of this page (line level)"},{"@id":"https://ocr.lib.ncsu.edu/ocr/te/technician-basketballspecial-1991-11_0002/technician-basketballspecial-1991-11_0002-annotation-list-paragraph.json","@type":"sc:AnnotationList","label":"Text of this page (paragraph level)"}]},{"@type":"sc:Canvas","@id":"https://d.lib.ncsu.edu/collections/canvas/technician-basketballspecial-1991-11_0003","width":3518,"height":4327,"label":"[3]","seeAlso":[{"@id":"https://ocr.lib.ncsu.edu/ocr/te/technician-basketballspecial-1991-11_0003/technician-basketballspecial-1991-11_0003.hocr","format":"text/vnd.hocr+html","profile":"https://github.com/kba/hocr-spec/blob/master/hocr-spec.md","label":"hOCR"},{"@id":"https://ocr.lib.ncsu.edu/ocr/te/technician-basketballspecial-1991-11_0003/technician-basketballspecial-1991-11_0003.txt","format":"text/plain","label":"plain text OCR"}],"images":[{"@id":"https://d.lib.ncsu.edu/collections/canvas/technician-basketballspecial-1991-11_0003/image","@type":"oa:Annotation","on":"https://d.lib.ncsu.edu/collections/canvas/technician-basketballspecial-1991-11_0003","motivation":"sc:painting","resource":{"@id":"https://iiif.lib.ncsu.edu/iiif/technician-basketballspecial-1991-11_0003/full/1170,/0/default.jpg","width":3518,"height":4327,"service":{"profile":"http://iiif.io/api/image/2/level2.json","@context":"http://iiif.io/api/image/2/context.json","@id":"https://iiif.lib.ncsu.edu/iiif/technician-basketballspecial-1991-11_0003"},"@type":"dctypes:Image"}}],"otherContent":[{"@id":"https://ocr.lib.ncsu.edu/ocr/te/technician-basketballspecial-1991-11_0003/technician-basketballspecial-1991-11_0003-annotation-list-word.json","@type":"sc:AnnotationList","label":"Text of this page (word level)"},{"@id":"https://ocr.lib.ncsu.edu/ocr/te/technician-basketballspecial-1991-11_0003/technician-basketballspecial-1991-11_0003-annotation-list-line.json","@type":"sc:AnnotationList","label":"Text of this page (line level)"},{"@id":"https://ocr.lib.ncsu.edu/ocr/te/technician-basketballspecial-1991-11_0003/technician-basketballspecial-1991-11_0003-annotation-list-paragraph.json","@type":"sc:AnnotationList","label":"Text of this page (paragraph level)"}]},{"@type":"sc:Canvas","@id":"https://d.lib.ncsu.edu/collections/canvas/technician-basketballspecial-1991-11_0004","width":3487,"height":4295,"label":"[4]","seeAlso":[{"@id":"https://ocr.lib.ncsu.edu/ocr/te/technician-basketballspecial-1991-11_0004/technician-basketballspecial-1991-11_0004.hocr","format":"text/vnd.hocr+html","profile":"https://github.com/kba/hocr-spec/blob/master/hocr-spec.md","label":"hOCR"},{"@id":"https://ocr.lib.ncsu.edu/ocr/te/technician-basketballspecial-1991-11_0004/technician-basketballspecial-1991-11_0004.txt","format":"text/plain","label":"plain text OCR"}],"images":[{"@id":"https://d.lib.ncsu.edu/collections/canvas/technician-basketballspecial-1991-11_0004/image","@type":"oa:Annotation","on":"https://d.lib.ncsu.edu/collections/canvas/technician-basketballspecial-1991-11_0004","motivation":"sc:painting","resource":{"@id":"https://iiif.lib.ncsu.edu/iiif/technician-basketballspecial-1991-11_0004/full/1170,/0/default.jpg","width":3487,"height":4295,"service":{"profile":"http://iiif.io/api/image/2/level2.json","@context":"http://iiif.io/api/image/2/context.json","@id":"https://iiif.lib.ncsu.edu/iiif/technician-basketballspecial-1991-11_0004"},"@type":"dctypes:Image"}}],"otherContent":[{"@id":"https://ocr.lib.ncsu.edu/ocr/te/technician-basketballspecial-1991-11_0004/technician-basketballspecial-1991-11_0004-annotation-list-word.json","@type":"sc:AnnotationList","label":"Text of this page (word level)"},{"@id":"https://ocr.lib.ncsu.edu/ocr/te/technician-basketballspecial-1991-11_0004/technician-basketballspecial-1991-11_0004-annotation-list-line.json","@type":"sc:AnnotationList","label":"Text of this page (line level)"},{"@id":"https://ocr.lib.ncsu.edu/ocr/te/technician-basketballspecial-1991-11_0004/technician-basketballspecial-1991-11_0004-annotation-list-paragraph.json","@type":"sc:AnnotationList","label":"Text of this page (paragraph level)"}]},{"@type":"sc:Canvas","@id":"https://d.lib.ncsu.edu/collections/canvas/technician-basketballspecial-1991-11_0005","width":3556,"height":4320,"label":"[5]","seeAlso":[{"@id":"https://ocr.lib.ncsu.edu/ocr/te/technician-basketballspecial-1991-11_0005/technician-basketballspecial-1991-11_0005.hocr","format":"text/vnd.hocr+html","profile":"https://github.com/kba/hocr-spec/blob/master/hocr-spec.md","label":"hOCR"},{"@id":"https://ocr.lib.ncsu.edu/ocr/te/technician-basketballspecial-1991-11_0005/technician-basketballspecial-1991-11_0005.txt","format":"text/plain","label":"plain text OCR"}],"images":[{"@id":"https://d.lib.ncsu.edu/collections/canvas/technician-basketballspecial-1991-11_0005/image","@type":"oa:Annotation","on":"https://d.lib.ncsu.edu/collections/canvas/technician-basketballspecial-1991-11_0005","motivation":"sc:painting","resource":{"@id":"https://iiif.lib.ncsu.edu/iiif/technician-basketballspecial-1991-11_0005/full/1170,/0/default.jpg","width":3556,"height":4320,"service":{"profile":"http://iiif.io/api/image/2/level2.json","@context":"http://iiif.io/api/image/2/context.json","@id":"https://iiif.lib.ncsu.edu/iiif/technician-basketballspecial-1991-11_0005"},"@type":"dctypes:Image"}}],"otherContent":[{"@id":"https://ocr.lib.ncsu.edu/ocr/te/technician-basketballspecial-1991-11_0005/technician-basketballspecial-1991-11_0005-annotation-list-word.json","@type":"sc:AnnotationList","label":"Text of this page (word level)"},{"@id":"https://ocr.lib.ncsu.edu/ocr/te/technician-basketballspecial-1991-11_0005/technician-basketballspecial-1991-11_0005-annotation-list-line.json","@type":"sc:AnnotationList","label":"Text of this page (line level)"},{"@id":"https://ocr.lib.ncsu.edu/ocr/te/technician-basketballspecial-1991-11_0005/technician-basketballspecial-1991-11_0005-annotation-list-paragraph.json","@type":"sc:AnnotationList","label":"Text of this page (paragraph level)"}]},{"@type":"sc:Canvas","@id":"https://d.lib.ncsu.edu/collections/canvas/technician-basketballspecial-1991-11_0006","width":3570,"height":4339,"label":"[6]","seeAlso":[{"@id":"https://ocr.lib.ncsu.edu/ocr/te/technician-basketballspecial-1991-11_0006/technician-basketballspecial-1991-11_0006.hocr","format":"text/vnd.hocr+html","profile":"https://github.com/kba/hocr-spec/blob/master/hocr-spec.md","label":"hOCR"},{"@id":"https://ocr.lib.ncsu.edu/ocr/te/technician-basketballspecial-1991-11_0006/technician-basketballspecial-1991-11_0006.txt","format":"text/plain","label":"plain text OCR"}],"images":[{"@id":"https://d.lib.ncsu.edu/collections/canvas/technician-basketballspecial-1991-11_0006/image","@type":"oa:Annotation","on":"https://d.lib.ncsu.edu/collections/canvas/technician-basketballspecial-1991-11_0006","motivation":"sc:painting","resource":{"@id":"https://iiif.lib.ncsu.edu/iiif/technician-basketballspecial-1991-11_0006/full/1170,/0/default.jpg","width":3570,"height":4339,"service":{"profile":"http://iiif.io/api/image/2/level2.json","@context":"http://iiif.io/api/image/2/context.json","@id":"https://iiif.lib.ncsu.edu/iiif/technician-basketballspecial-1991-11_0006"},"@type":"dctypes:Image"}}],"otherContent":[{"@id":"https://ocr.lib.ncsu.edu/ocr/te/technician-basketballspecial-1991-11_0006/technician-basketballspecial-1991-11_0006-annotation-list-word.json","@type":"sc:AnnotationList","label":"Text of this page (word level)"},{"@id":"https://ocr.lib.ncsu.edu/ocr/te/technician-basketballspecial-1991-11_0006/technician-basketballspecial-1991-11_0006-annotation-list-line.json","@type":"sc:AnnotationList","label":"Text of this page (line level)"},{"@id":"https://ocr.lib.ncsu.edu/ocr/te/technician-basketballspecial-1991-11_0006/technician-basketballspecial-1991-11_0006-annotation-list-paragraph.json","@type":"sc:AnnotationList","label":"Text of this page (paragraph level)"}]},{"@type":"sc:Canvas","@id":"https://d.lib.ncsu.edu/collections/canvas/technician-basketballspecial-1991-11_0007","width":3503,"height":4311,"label":"[7]","seeAlso":[{"@id":"https://ocr.lib.ncsu.edu/ocr/te/technician-basketballspecial-1991-11_0007/technician-basketballspecial-1991-11_0007.hocr","format":"text/vnd.hocr+html","profile":"https://github.com/kba/hocr-spec/blob/master/hocr-spec.md","label":"hOCR"},{"@id":"https://ocr.lib.ncsu.edu/ocr/te/technician-basketballspecial-1991-11_0007/technician-basketballspecial-1991-11_0007.txt","format":"text/plain","label":"plain text OCR"}],"images":[{"@id":"https://d.lib.ncsu.edu/collections/canvas/technician-basketballspecial-1991-11_0007/image","@type":"oa:Annotation","on":"https://d.lib.ncsu.edu/collections/canvas/technician-basketballspecial-1991-11_0007","motivation":"sc:painting","resource":{"@id":"https://iiif.lib.ncsu.edu/iiif/technician-basketballspecial-1991-11_0007/full/1170,/0/default.jpg","width":3503,"height":4311,"service":{"profile":"http://iiif.io/api/image/2/level2.json","@context":"http://iiif.io/api/image/2/context.json","@id":"https://iiif.lib.ncsu.edu/iiif/technician-basketballspecial-1991-11_0007"},"@type":"dctypes:Image"}}],"otherContent":[{"@id":"https://ocr.lib.ncsu.edu/ocr/te/technician-basketballspecial-1991-11_0007/technician-basketballspecial-1991-11_0007-annotation-list-word.json","@type":"sc:AnnotationList","label":"Text of this page (word level)"},{"@id":"https://ocr.lib.ncsu.edu/ocr/te/technician-basketballspecial-1991-11_0007/technician-basketballspecial-1991-11_0007-annotation-list-line.json","@type":"sc:AnnotationList","label":"Text of this page (line level)"},{"@id":"https://ocr.lib.ncsu.edu/ocr/te/technician-basketballspecial-1991-11_0007/technician-basketballspecial-1991-11_0007-annotation-list-paragraph.json","@type":"sc:AnnotationList","label":"Text of this page (paragraph level)"}]},{"@type":"sc:Canvas","@id":"https://d.lib.ncsu.edu/collections/canvas/technician-basketballspecial-1991-11_0008","width":3463,"height":4299,"label":"[8]","seeAlso":[{"@id":"https://ocr.lib.ncsu.edu/ocr/te/technician-basketballspecial-1991-11_0008/technician-basketballspecial-1991-11_0008.hocr","format":"text/vnd.hocr+html","profile":"https://github.com/kba/hocr-spec/blob/master/hocr-spec.md","label":"hOCR"},{"@id":"https://ocr.lib.ncsu.edu/ocr/te/technician-basketballspecial-1991-11_0008/technician-basketballspecial-1991-11_0008.txt","format":"text/plain","label":"plain text OCR"}],"images":[{"@id":"https://d.lib.ncsu.edu/collections/canvas/technician-basketballspecial-1991-11_0008/image","@type":"oa:Annotation","on":"https://d.lib.ncsu.edu/collections/canvas/technician-basketballspecial-1991-11_0008","motivation":"sc:painting","resource":{"@id":"https://iiif.lib.ncsu.edu/iiif/technician-basketballspecial-1991-11_0008/full/1170,/0/default.jpg","width":3463,"height":4299,"service":{"profile":"http://iiif.io/api/image/2/level2.json","@context":"http://iiif.io/api/image/2/context.json","@id":"https://iiif.lib.ncsu.edu/iiif/technician-basketballspecial-1991-11_0008"},"@type":"dctypes:Image"}}],"otherContent":[{"@id":"https://ocr.lib.ncsu.edu/ocr/te/technician-basketballspecial-1991-11_0008/technician-basketballspecial-1991-11_0008-annotation-list-word.json","@type":"sc:AnnotationList","label":"Text of this page (word level)"},{"@id":"https://ocr.lib.ncsu.edu/ocr/te/technician-basketballspecial-1991-11_0008/technician-basketballspecial-1991-11_0008-annotation-list-line.json","@type":"sc:AnnotationList","label":"Text of this page (line level)"},{"@id":"https://ocr.lib.ncsu.edu/ocr/te/technician-basketballspecial-1991-11_0008/technician-basketballspecial-1991-11_0008-annotation-list-paragraph.json","@type":"sc:AnnotationList","label":"Text of this page (paragraph level)"}]},{"@type":"sc:Canvas","@id":"https://d.lib.ncsu.edu/collections/canvas/technician-basketballspecial-1991-11_0009","width":3555,"height":4300,"label":"[9]","seeAlso":[{"@id":"https://ocr.lib.ncsu.edu/ocr/te/technician-basketballspecial-1991-11_0009/technician-basketballspecial-1991-11_0009.hocr","format":"text/vnd.hocr+html","profile":"https://github.com/kba/hocr-spec/blob/master/hocr-spec.md","label":"hOCR"},{"@id":"https://ocr.lib.ncsu.edu/ocr/te/technician-basketballspecial-1991-11_0009/technician-basketballspecial-1991-11_0009.txt","format":"text/plain","label":"plain text OCR"}],"images":[{"@id":"https://d.lib.ncsu.edu/collections/canvas/technician-basketballspecial-1991-11_0009/image","@type":"oa:Annotation","on":"https://d.lib.ncsu.edu/collections/canvas/technician-basketballspecial-1991-11_0009","motivation":"sc:painting","resource":{"@id":"https://iiif.lib.ncsu.edu/iiif/technician-basketballspecial-1991-11_0009/full/1170,/0/default.jpg","width":3555,"height":4300,"service":{"profile":"http://iiif.io/api/image/2/level2.json","@context":"http://iiif.io/api/image/2/context.json","@id":"https://iiif.lib.ncsu.edu/iiif/technician-basketballspecial-1991-11_0009"},"@type":"dctypes:Image"}}],"otherContent":[{"@id":"https://ocr.lib.ncsu.edu/ocr/te/technician-basketballspecial-1991-11_0009/technician-basketballspecial-1991-11_0009-annotation-list-word.json","@type":"sc:AnnotationList","label":"Text of this page (word level)"},{"@id":"https://ocr.lib.ncsu.edu/ocr/te/technician-basketballspecial-1991-11_0009/technician-basketballspecial-1991-11_0009-annotation-list-line.json","@type":"sc:AnnotationList","label":"Text of this page (line level)"},{"@id":"https://ocr.lib.ncsu.edu/ocr/te/technician-basketballspecial-1991-11_0009/technician-basketballspecial-1991-11_0009-annotation-list-paragraph.json","@type":"sc:AnnotationList","label":"Text of this page (paragraph level)"}]},{"@type":"sc:Canvas","@id":"https://d.lib.ncsu.edu/collections/canvas/technician-basketballspecial-1991-11_0010","width":3580,"height":4348,"label":"[10]","seeAlso":[{"@id":"https://ocr.lib.ncsu.edu/ocr/te/technician-basketballspecial-1991-11_0010/technician-basketballspecial-1991-11_0010.hocr","format":"text/vnd.hocr+html","profile":"https://github.com/kba/hocr-spec/blob/master/hocr-spec.md","label":"hOCR"},{"@id":"https://ocr.lib.ncsu.edu/ocr/te/technician-basketballspecial-1991-11_0010/technician-basketballspecial-1991-11_0010.txt","format":"text/plain","label":"plain text OCR"}],"images":[{"@id":"https://d.lib.ncsu.edu/collections/canvas/technician-basketballspecial-1991-11_0010/image","@type":"oa:Annotation","on":"https://d.lib.ncsu.edu/collections/canvas/technician-basketballspecial-1991-11_0010","motivation":"sc:painting","resource":{"@id":"https://iiif.lib.ncsu.edu/iiif/technician-basketballspecial-1991-11_0010/full/1170,/0/default.jpg","width":3580,"height":4348,"service":{"profile":"http://iiif.io/api/image/2/level2.json","@context":"http://iiif.io/api/image/2/context.json","@id":"https://iiif.lib.ncsu.edu/iiif/technician-basketballspecial-1991-11_0010"},"@type":"dctypes:Image"}}],"otherContent":[{"@id":"https://ocr.lib.ncsu.edu/ocr/te/technician-basketballspecial-1991-11_0010/technician-basketballspecial-1991-11_0010-annotation-list-word.json","@type":"sc:AnnotationList","label":"Text of this page (word level)"},{"@id":"https://ocr.lib.ncsu.edu/ocr/te/technician-basketballspecial-1991-11_0010/technician-basketballspecial-1991-11_0010-annotation-list-line.json","@type":"sc:AnnotationList","label":"Text of this page (line level)"},{"@id":"https://ocr.lib.ncsu.edu/ocr/te/technician-basketballspecial-1991-11_0010/technician-basketballspecial-1991-11_0010-annotation-list-paragraph.json","@type":"sc:AnnotationList","label":"Text of this page (paragraph level)"}]},{"@type":"sc:Canvas","@id":"https://d.lib.ncsu.edu/collections/canvas/technician-basketballspecial-1991-11_0011","width":3490,"height":4306,"label":"[11]","seeAlso":[{"@id":"https://ocr.lib.ncsu.edu/ocr/te/technician-basketballspecial-1991-11_0011/technician-basketballspecial-1991-11_0011.hocr","format":"text/vnd.hocr+html","profile":"https://github.com/kba/hocr-spec/blob/master/hocr-spec.md","label":"hOCR"},{"@id":"https://ocr.lib.ncsu.edu/ocr/te/technician-basketballspecial-1991-11_0011/technician-basketballspecial-1991-11_0011.txt","format":"text/plain","label":"plain text OCR"}],"images":[{"@id":"https://d.lib.ncsu.edu/collections/canvas/technician-basketballspecial-1991-11_0011/image","@type":"oa:Annotation","on":"https://d.lib.ncsu.edu/collections/canvas/technician-basketballspecial-1991-11_0011","motivation":"sc:painting","resource":{"@id":"https://iiif.lib.ncsu.edu/iiif/technician-basketballspecial-1991-11_0011/full/1170,/0/default.jpg","width":3490,"height":4306,"service":{"profile":"http://iiif.io/api/image/2/level2.json","@context":"http://iiif.io/api/image/2/context.json","@id":"https://iiif.lib.ncsu.edu/iiif/technician-basketballspecial-1991-11_0011"},"@type":"dctypes:Image"}}],"otherContent":[{"@id":"https://ocr.lib.ncsu.edu/ocr/te/technician-basketballspecial-1991-11_0011/technician-basketballspecial-1991-11_0011-annotation-list-word.json","@type":"sc:AnnotationList","label":"Text of this page (word level)"},{"@id":"https://ocr.lib.ncsu.edu/ocr/te/technician-basketballspecial-1991-11_0011/technician-basketballspecial-1991-11_0011-annotation-list-line.json","@type":"sc:AnnotationList","label":"Text of this page (line level)"},{"@id":"https://ocr.lib.ncsu.edu/ocr/te/technician-basketballspecial-1991-11_0011/technician-basketballspecial-1991-11_0011-annotation-list-paragraph.json","@type":"sc:AnnotationList","label":"Text of this page (paragraph level)"}]},{"@type":"sc:Canvas","@id":"https://d.lib.ncsu.edu/collections/canvas/technician-basketballspecial-1991-11_0012","width":3573,"height":4336,"label":"[12]","seeAlso":[{"@id":"https://ocr.lib.ncsu.edu/ocr/te/technician-basketballspecial-1991-11_0012/technician-basketballspecial-1991-11_0012.hocr","format":"text/vnd.hocr+html","profile":"https://github.com/kba/hocr-spec/blob/master/hocr-spec.md","label":"hOCR"},{"@id":"https://ocr.lib.ncsu.edu/ocr/te/technician-basketballspecial-1991-11_0012/technician-basketballspecial-1991-11_0012.txt","format":"text/plain","label":"plain text OCR"}],"images":[{"@id":"https://d.lib.ncsu.edu/collections/canvas/technician-basketballspecial-1991-11_0012/image","@type":"oa:Annotation","on":"https://d.lib.ncsu.edu/collections/canvas/technician-basketballspecial-1991-11_0012","motivation":"sc:painting","resource":{"@id":"https://iiif.lib.ncsu.edu/iiif/technician-basketballspecial-1991-11_0012/full/1170,/0/default.jpg","width":3573,"height":4336,"service":{"profile":"http://iiif.io/api/image/2/level2.json","@context":"http://iiif.io/api/image/2/context.json","@id":"https://iiif.lib.ncsu.edu/iiif/technician-basketballspecial-1991-11_0012"},"@type":"dctypes:Image"}}],"otherContent":[{"@id":"https://ocr.lib.ncsu.edu/ocr/te/technician-basketballspecial-1991-11_0012/technician-basketballspecial-1991-11_0012-annotation-list-word.json","@type":"sc:AnnotationList","label":"Text of this page (word level)"},{"@id":"https://ocr.lib.ncsu.edu/ocr/te/technician-basketballspecial-1991-11_0012/technician-basketballspecial-1991-11_0012-annotation-list-line.json","@type":"sc:AnnotationList","label":"Text of this page (line level)"},{"@id":"https://ocr.lib.ncsu.edu/ocr/te/technician-basketballspecial-1991-11_0012/technician-basketballspecial-1991-11_0012-annotation-list-paragraph.json","@type":"sc:AnnotationList","label":"Text of this page (paragraph level)"}]},{"@type":"sc:Canvas","@id":"https://d.lib.ncsu.edu/collections/canvas/technician-basketballspecial-1991-11_0013","width":3516,"height":4336,"label":"[13]","seeAlso":[{"@id":"https://ocr.lib.ncsu.edu/ocr/te/technician-basketballspecial-1991-11_0013/technician-basketballspecial-1991-11_0013.hocr","format":"text/vnd.hocr+html","profile":"https://github.com/kba/hocr-spec/blob/master/hocr-spec.md","label":"hOCR"},{"@id":"https://ocr.lib.ncsu.edu/ocr/te/technician-basketballspecial-1991-11_0013/technician-basketballspecial-1991-11_0013.txt","format":"text/plain","label":"plain text OCR"}],"images":[{"@id":"https://d.lib.ncsu.edu/collections/canvas/technician-basketballspecial-1991-11_0013/image","@type":"oa:Annotation","on":"https://d.lib.ncsu.edu/collections/canvas/technician-basketballspecial-1991-11_0013","motivation":"sc:painting","resource":{"@id":"https://iiif.lib.ncsu.edu/iiif/technician-basketballspecial-1991-11_0013/full/1170,/0/default.jpg","width":3516,"height":4336,"service":{"profile":"http://iiif.io/api/image/2/level2.json","@context":"http://iiif.io/api/image/2/context.json","@id":"https://iiif.lib.ncsu.edu/iiif/technician-basketballspecial-1991-11_0013"},"@type":"dctypes:Image"}}],"otherContent":[{"@id":"https://ocr.lib.ncsu.edu/ocr/te/technician-basketballspecial-1991-11_0013/technician-basketballspecial-1991-11_0013-annotation-list-word.json","@type":"sc:AnnotationList","label":"Text of this page (word level)"},{"@id":"https://ocr.lib.ncsu.edu/ocr/te/technician-basketballspecial-1991-11_0013/technician-basketballspecial-1991-11_0013-annotation-list-line.json","@type":"sc:AnnotationList","label":"Text of this page (line level)"},{"@id":"https://ocr.lib.ncsu.edu/ocr/te/technician-basketballspecial-1991-11_0013/technician-basketballspecial-1991-11_0013-annotation-list-paragraph.json","@type":"sc:AnnotationList","label":"Text of this page (paragraph level)"}]},{"@type":"sc:Canvas","@id":"https://d.lib.ncsu.edu/collections/canvas/technician-basketballspecial-1991-11_0014","width":3546,"height":4306,"label":"[14]","seeAlso":[{"@id":"https://ocr.lib.ncsu.edu/ocr/te/technician-basketballspecial-1991-11_0014/technician-basketballspecial-1991-11_0014.hocr","format":"text/vnd.hocr+html","profile":"https://github.com/kba/hocr-spec/blob/master/hocr-spec.md","label":"hOCR"},{"@id":"https://ocr.lib.ncsu.edu/ocr/te/technician-basketballspecial-1991-11_0014/technician-basketballspecial-1991-11_0014.txt","format":"text/plain","label":"plain text OCR"}],"images":[{"@id":"https://d.lib.ncsu.edu/collections/canvas/technician-basketballspecial-1991-11_0014/image","@type":"oa:Annotation","on":"https://d.lib.ncsu.edu/collections/canvas/technician-basketballspecial-1991-11_0014","motivation":"sc:painting","resource":{"@id":"https://iiif.lib.ncsu.edu/iiif/technician-basketballspecial-1991-11_0014/full/1170,/0/default.jpg","width":3546,"height":4306,"service":{"profile":"http://iiif.io/api/image/2/level2.json","@context":"http://iiif.io/api/image/2/context.json","@id":"https://iiif.lib.ncsu.edu/iiif/technician-basketballspecial-1991-11_0014"},"@type":"dctypes:Image"}}],"otherContent":[{"@id":"https://ocr.lib.ncsu.edu/ocr/te/technician-basketballspecial-1991-11_0014/technician-basketballspecial-1991-11_0014-annotation-list-word.json","@type":"sc:AnnotationList","label":"Text of this page (word level)"},{"@id":"https://ocr.lib.ncsu.edu/ocr/te/technician-basketballspecial-1991-11_0014/technician-basketballspecial-1991-11_0014-annotation-list-line.json","@type":"sc:AnnotationList","label":"Text of this page (line level)"},{"@id":"https://ocr.lib.ncsu.edu/ocr/te/technician-basketballspecial-1991-11_0014/technician-basketballspecial-1991-11_0014-annotation-list-paragraph.json","@type":"sc:AnnotationList","label":"Text of this page (paragraph level)"}]},{"@type":"sc:Canvas","@id":"https://d.lib.ncsu.edu/collections/canvas/technician-basketballspecial-1991-11_0015","width":3520,"height":4348,"label":"[15]","seeAlso":[{"@id":"https://ocr.lib.ncsu.edu/ocr/te/technician-basketballspecial-1991-11_0015/technician-basketballspecial-1991-11_0015.hocr","format":"text/vnd.hocr+html","profile":"https://github.com/kba/hocr-spec/blob/master/hocr-spec.md","label":"hOCR"},{"@id":"https://ocr.lib.ncsu.edu/ocr/te/technician-basketballspecial-1991-11_0015/technician-basketballspecial-1991-11_0015.txt","format":"text/plain","label":"plain text OCR"}],"images":[{"@id":"https://d.lib.ncsu.edu/collections/canvas/technician-basketballspecial-1991-11_0015/image","@type":"oa:Annotation","on":"https://d.lib.ncsu.edu/collections/canvas/technician-basketballspecial-1991-11_0015","motivation":"sc:painting","resource":{"@id":"https://iiif.lib.ncsu.edu/iiif/technician-basketballspecial-1991-11_0015/full/1170,/0/default.jpg","width":3520,"height":4348,"service":{"profile":"http://iiif.io/api/image/2/level2.json","@context":"http://iiif.io/api/image/2/context.json","@id":"https://iiif.lib.ncsu.edu/iiif/technician-basketballspecial-1991-11_0015"},"@type":"dctypes:Image"}}],"otherContent":[{"@id":"https://ocr.lib.ncsu.edu/ocr/te/technician-basketballspecial-1991-11_0015/technician-basketballspecial-1991-11_0015-annotation-list-word.json","@type":"sc:AnnotationList","label":"Text of this page (word level)"},{"@id":"https://ocr.lib.ncsu.edu/ocr/te/technician-basketballspecial-1991-11_0015/technician-basketballspecial-1991-11_0015-annotation-list-line.json","@type":"sc:AnnotationList","label":"Text of this page (line level)"},{"@id":"https://ocr.lib.ncsu.edu/ocr/te/technician-basketballspecial-1991-11_0015/technician-basketballspecial-1991-11_0015-annotation-list-paragraph.json","@type":"sc:AnnotationList","label":"Text of this page (paragraph level)"}]},{"@type":"sc:Canvas","@id":"https://d.lib.ncsu.edu/collections/canvas/technician-basketballspecial-1991-11_0016","width":3520,"height":4300,"label":"[16]","seeAlso":[{"@id":"https://ocr.lib.ncsu.edu/ocr/te/technician-basketballspecial-1991-11_0016/technician-basketballspecial-1991-11_0016.hocr","format":"text/vnd.hocr+html","profile":"https://github.com/kba/hocr-spec/blob/master/hocr-spec.md","label":"hOCR"},{"@id":"https://ocr.lib.ncsu.edu/ocr/te/technician-basketballspecial-1991-11_0016/technician-basketballspecial-1991-11_0016.txt","format":"text/plain","label":"plain text OCR"}],"images":[{"@id":"https://d.lib.ncsu.edu/collections/canvas/technician-basketballspecial-1991-11_0016/image","@type":"oa:Annotation","on":"https://d.lib.ncsu.edu/collections/canvas/technician-basketballspecial-1991-11_0016","motivation":"sc:painting","resource":{"@id":"https://iiif.lib.ncsu.edu/iiif/technician-basketballspecial-1991-11_0016/full/1170,/0/default.jpg","width":3520,"height":4300,"service":{"profile":"http://iiif.io/api/image/2/level2.json","@context":"http://iiif.io/api/image/2/context.json","@id":"https://iiif.lib.ncsu.edu/iiif/technician-basketballspecial-1991-11_0016"},"@type":"dctypes:Image"}}],"otherContent":[{"@id":"https://ocr.lib.ncsu.edu/ocr/te/technician-basketballspecial-1991-11_0016/technician-basketballspecial-1991-11_0016-annotation-list-word.json","@type":"sc:AnnotationList","label":"Text of this page (word level)"},{"@id":"https://ocr.lib.ncsu.edu/ocr/te/technician-basketballspecial-1991-11_0016/technician-basketballspecial-1991-11_0016-annotation-list-line.json","@type":"sc:AnnotationList","label":"Text of this page (line level)"},{"@id":"https://ocr.lib.ncsu.edu/ocr/te/technician-basketballspecial-1991-11_0016/technician-basketballspecial-1991-11_0016-annotation-list-paragraph.json","@type":"sc:AnnotationList","label":"Text of this page (paragraph level)"}]},{"@type":"sc:Canvas","@id":"https://d.lib.ncsu.edu/collections/canvas/technician-basketballspecial-1991-11_0017","width":3618,"height":4299,"label":"[17]","seeAlso":[{"@id":"https://ocr.lib.ncsu.edu/ocr/te/technician-basketballspecial-1991-11_0017/technician-basketballspecial-1991-11_0017.hocr","format":"text/vnd.hocr+html","profile":"https://github.com/kba/hocr-spec/blob/master/hocr-spec.md","label":"hOCR"},{"@id":"https://ocr.lib.ncsu.edu/ocr/te/technician-basketballspecial-1991-11_0017/technician-basketballspecial-1991-11_0017.txt","format":"text/plain","label":"plain text OCR"}],"images":[{"@id":"https://d.lib.ncsu.edu/collections/canvas/technician-basketballspecial-1991-11_0017/image","@type":"oa:Annotation","on":"https://d.lib.ncsu.edu/collections/canvas/technician-basketballspecial-1991-11_0017","motivation":"sc:painting","resource":{"@id":"https://iiif.lib.ncsu.edu/iiif/technician-basketballspecial-1991-11_0017/full/1170,/0/default.jpg","width":3618,"height":4299,"service":{"profile":"http://iiif.io/api/image/2/level2.json","@context":"http://iiif.io/api/image/2/context.json","@id":"https://iiif.lib.ncsu.edu/iiif/technician-basketballspecial-1991-11_0017"},"@type":"dctypes:Image"}}],"otherContent":[{"@id":"https://ocr.lib.ncsu.edu/ocr/te/technician-basketballspecial-1991-11_0017/technician-basketballspecial-1991-11_0017-annotation-list-word.json","@type":"sc:AnnotationList","label":"Text of this page (word level)"},{"@id":"https://ocr.lib.ncsu.edu/ocr/te/technician-basketballspecial-1991-11_0017/technician-basketballspecial-1991-11_0017-annotation-list-line.json","@type":"sc:AnnotationList","label":"Text of this page (line level)"},{"@id":"https://ocr.lib.ncsu.edu/ocr/te/technician-basketballspecial-1991-11_0017/technician-basketballspecial-1991-11_0017-annotation-list-paragraph.json","@type":"sc:AnnotationList","label":"Text of this page (paragraph level)"}]},{"@type":"sc:Canvas","@id":"https://d.lib.ncsu.edu/collections/canvas/technician-basketballspecial-1991-11_0018","width":3578,"height":4311,"label":"[18]","seeAlso":[{"@id":"https://ocr.lib.ncsu.edu/ocr/te/technician-basketballspecial-1991-11_0018/technician-basketballspecial-1991-11_0018.hocr","format":"text/vnd.hocr+html","profile":"https://github.com/kba/hocr-spec/blob/master/hocr-spec.md","label":"hOCR"},{"@id":"https://ocr.lib.ncsu.edu/ocr/te/technician-basketballspecial-1991-11_0018/technician-basketballspecial-1991-11_0018.txt","format":"text/plain","label":"plain text OCR"}],"images":[{"@id":"https://d.lib.ncsu.edu/collections/canvas/technician-basketballspecial-1991-11_0018/image","@type":"oa:Annotation","on":"https://d.lib.ncsu.edu/collections/canvas/technician-basketballspecial-1991-11_0018","motivation":"sc:painting","resource":{"@id":"https://iiif.lib.ncsu.edu/iiif/technician-basketballspecial-1991-11_0018/full/1170,/0/default.jpg","width":3578,"height":4311,"service":{"profile":"http://iiif.io/api/image/2/level2.json","@context":"http://iiif.io/api/image/2/context.json","@id":"https://iiif.lib.ncsu.edu/iiif/technician-basketballspecial-1991-11_0018"},"@type":"dctypes:Image"}}],"otherContent":[{"@id":"https://ocr.lib.ncsu.edu/ocr/te/technician-basketballspecial-1991-11_0018/technician-basketballspecial-1991-11_0018-annotation-list-word.json","@type":"sc:AnnotationList","label":"Text of this page (word level)"},{"@id":"https://ocr.lib.ncsu.edu/ocr/te/technician-basketballspecial-1991-11_0018/technician-basketballspecial-1991-11_0018-annotation-list-line.json","@type":"sc:AnnotationList","label":"Text of this page (line level)"},{"@id":"https://ocr.lib.ncsu.edu/ocr/te/technician-basketballspecial-1991-11_0018/technician-basketballspecial-1991-11_0018-annotation-list-paragraph.json","@type":"sc:AnnotationList","label":"Text of this page (paragraph level)"}]},{"@type":"sc:Canvas","@id":"https://d.lib.ncsu.edu/collections/canvas/technician-basketballspecial-1991-11_0019","width":3549,"height":4339,"label":"[19]","seeAlso":[{"@id":"https://ocr.lib.ncsu.edu/ocr/te/technician-basketballspecial-1991-11_0019/technician-basketballspecial-1991-11_0019.hocr","format":"text/vnd.hocr+html","profile":"https://github.com/kba/hocr-spec/blob/master/hocr-spec.md","label":"hOCR"},{"@id":"https://ocr.lib.ncsu.edu/ocr/te/technician-basketballspecial-1991-11_0019/technician-basketballspecial-1991-11_0019.txt","format":"text/plain","label":"plain text OCR"}],"images":[{"@id":"https://d.lib.ncsu.edu/collections/canvas/technician-basketballspecial-1991-11_0019/image","@type":"oa:Annotation","on":"https://d.lib.ncsu.edu/collections/canvas/technician-basketballspecial-1991-11_0019","motivation":"sc:painting","resource":{"@id":"https://iiif.lib.ncsu.edu/iiif/technician-basketballspecial-1991-11_0019/full/1170,/0/default.jpg","width":3549,"height":4339,"service":{"profile":"http://iiif.io/api/image/2/level2.json","@context":"http://iiif.io/api/image/2/context.json","@id":"https://iiif.lib.ncsu.edu/iiif/technician-basketballspecial-1991-11_0019"},"@type":"dctypes:Image"}}],"otherContent":[{"@id":"https://ocr.lib.ncsu.edu/ocr/te/technician-basketballspecial-1991-11_0019/technician-basketballspecial-1991-11_0019-annotation-list-word.json","@type":"sc:AnnotationList","label":"Text of this page (word level)"},{"@id":"https://ocr.lib.ncsu.edu/ocr/te/technician-basketballspecial-1991-11_0019/technician-basketballspecial-1991-11_0019-annotation-list-line.json","@type":"sc:AnnotationList","label":"Text of this page (line level)"},{"@id":"https://ocr.lib.ncsu.edu/ocr/te/technician-basketballspecial-1991-11_0019/technician-basketballspecial-1991-11_0019-annotation-list-paragraph.json","@type":"sc:AnnotationList","label":"Text of this page (paragraph level)"}]},{"@type":"sc:Canvas","@id":"https://d.lib.ncsu.edu/collections/canvas/technician-basketballspecial-1991-11_0020","width":3529,"height":4320,"label":"[20]","seeAlso":[{"@id":"https://ocr.lib.ncsu.edu/ocr/te/technician-basketballspecial-1991-11_0020/technician-basketballspecial-1991-11_0020.hocr","format":"text/vnd.hocr+html","profile":"https://github.com/kba/hocr-spec/blob/master/hocr-spec.md","label":"hOCR"},{"@id":"https://ocr.lib.ncsu.edu/ocr/te/technician-basketballspecial-1991-11_0020/technician-basketballspecial-1991-11_0020.txt","format":"text/plain","label":"plain text OCR"}],"images":[{"@id":"https://d.lib.ncsu.edu/collections/canvas/technician-basketballspecial-1991-11_0020/image","@type":"oa:Annotation","on":"https://d.lib.ncsu.edu/collections/canvas/technician-basketballspecial-1991-11_0020","motivation":"sc:painting","resource":{"@id":"https://iiif.lib.ncsu.edu/iiif/technician-basketballspecial-1991-11_0020/full/1170,/0/default.jpg","width":3529,"height":4320,"service":{"profile":"http://iiif.io/api/image/2/level2.json","@context":"http://iiif.io/api/image/2/context.json","@id":"https://iiif.lib.ncsu.edu/iiif/technician-basketballspecial-1991-11_0020"},"@type":"dctypes:Image"}}],"otherContent":[{"@id":"https://ocr.lib.ncsu.edu/ocr/te/technician-basketballspecial-1991-11_0020/technician-basketballspecial-1991-11_0020-annotation-list-word.json","@type":"sc:AnnotationList","label":"Text of this page (word level)"},{"@id":"https://ocr.lib.ncsu.edu/ocr/te/technician-basketballspecial-1991-11_0020/technician-basketballspecial-1991-11_0020-annotation-list-line.json","@type":"sc:AnnotationList","label":"Text of this page (line level)"},{"@id":"https://ocr.lib.ncsu.edu/ocr/te/technician-basketballspecial-1991-11_0020/technician-basketballspecial-1991-11_0020-annotation-list-paragraph.json","@type":"sc:AnnotationList","label":"Text of this page (paragraph level)"}]},{"@type":"sc:Canvas","@id":"https://d.lib.ncsu.edu/collections/canvas/technician-basketballspecial-1991-11_0021","width":3582,"height":4295,"label":"[21]","seeAlso":[{"@id":"https://ocr.lib.ncsu.edu/ocr/te/technician-basketballspecial-1991-11_0021/technician-basketballspecial-1991-11_0021.hocr","format":"text/vnd.hocr+html","profile":"https://github.com/kba/hocr-spec/blob/master/hocr-spec.md","label":"hOCR"},{"@id":"https://ocr.lib.ncsu.edu/ocr/te/technician-basketballspecial-1991-11_0021/technician-basketballspecial-1991-11_0021.txt","format":"text/plain","label":"plain text OCR"}],"images":[{"@id":"https://d.lib.ncsu.edu/collections/canvas/technician-basketballspecial-1991-11_0021/image","@type":"oa:Annotation","on":"https://d.lib.ncsu.edu/collections/canvas/technician-basketballspecial-1991-11_0021","motivation":"sc:painting","resource":{"@id":"https://iiif.lib.ncsu.edu/iiif/technician-basketballspecial-1991-11_0021/full/1170,/0/default.jpg","width":3582,"height":4295,"service":{"profile":"http://iiif.io/api/image/2/level2.json","@context":"http://iiif.io/api/image/2/context.json","@id":"https://iiif.lib.ncsu.edu/iiif/technician-basketballspecial-1991-11_0021"},"@type":"dctypes:Image"}}],"otherContent":[{"@id":"https://ocr.lib.ncsu.edu/ocr/te/technician-basketballspecial-1991-11_0021/technician-basketballspecial-1991-11_0021-annotation-list-word.json","@type":"sc:AnnotationList","label":"Text of this page (word level)"},{"@id":"https://ocr.lib.ncsu.edu/ocr/te/technician-basketballspecial-1991-11_0021/technician-basketballspecial-1991-11_0021-annotation-list-line.json","@type":"sc:AnnotationList","label":"Text of this page (line level)"},{"@id":"https://ocr.lib.ncsu.edu/ocr/te/technician-basketballspecial-1991-11_0021/technician-basketballspecial-1991-11_0021-annotation-list-paragraph.json","@type":"sc:AnnotationList","label":"Text of this page (paragraph level)"}]},{"@type":"sc:Canvas","@id":"https://d.lib.ncsu.edu/collections/canvas/technician-basketballspecial-1991-11_0022","width":3558,"height":4327,"label":"[22]","seeAlso":[{"@id":"https://ocr.lib.ncsu.edu/ocr/te/technician-basketballspecial-1991-11_0022/technician-basketballspecial-1991-11_0022.hocr","format":"text/vnd.hocr+html","profile":"https://github.com/kba/hocr-spec/blob/master/hocr-spec.md","label":"hOCR"},{"@id":"https://ocr.lib.ncsu.edu/ocr/te/technician-basketballspecial-1991-11_0022/technician-basketballspecial-1991-11_0022.txt","format":"text/plain","label":"plain text OCR"}],"images":[{"@id":"https://d.lib.ncsu.edu/collections/canvas/technician-basketballspecial-1991-11_0022/image","@type":"oa:Annotation","on":"https://d.lib.ncsu.edu/collections/canvas/technician-basketballspecial-1991-11_0022","motivation":"sc:painting","resource":{"@id":"https://iiif.lib.ncsu.edu/iiif/technician-basketballspecial-1991-11_0022/full/1170,/0/default.jpg","width":3558,"height":4327,"service":{"profile":"http://iiif.io/api/image/2/level2.json","@context":"http://iiif.io/api/image/2/context.json","@id":"https://iiif.lib.ncsu.edu/iiif/technician-basketballspecial-1991-11_0022"},"@type":"dctypes:Image"}}],"otherContent":[{"@id":"https://ocr.lib.ncsu.edu/ocr/te/technician-basketballspecial-1991-11_0022/technician-basketballspecial-1991-11_0022-annotation-list-word.json","@type":"sc:AnnotationList","label":"Text of this page (word level)"},{"@id":"https://ocr.lib.ncsu.edu/ocr/te/technician-basketballspecial-1991-11_0022/technician-basketballspecial-1991-11_0022-annotation-list-line.json","@type":"sc:AnnotationList","label":"Text of this page (line level)"},{"@id":"https://ocr.lib.ncsu.edu/ocr/te/technician-basketballspecial-1991-11_0022/technician-basketballspecial-1991-11_0022-annotation-list-paragraph.json","@type":"sc:AnnotationList","label":"Text of this page (paragraph level)"}]},{"@type":"sc:Canvas","@id":"https://d.lib.ncsu.edu/collections/canvas/technician-basketballspecial-1991-11_0023","width":3565,"height":4359,"label":"[23]","seeAlso":[{"@id":"https://ocr.lib.ncsu.edu/ocr/te/technician-basketballspecial-1991-11_0023/technician-basketballspecial-1991-11_0023.hocr","format":"text/vnd.hocr+html","profile":"https://github.com/kba/hocr-spec/blob/master/hocr-spec.md","label":"hOCR"},{"@id":"https://ocr.lib.ncsu.edu/ocr/te/technician-basketballspecial-1991-11_0023/technician-basketballspecial-1991-11_0023.txt","format":"text/plain","label":"plain text OCR"}],"images":[{"@id":"https://d.lib.ncsu.edu/collections/canvas/technician-basketballspecial-1991-11_0023/image","@type":"oa:Annotation","on":"https://d.lib.ncsu.edu/collections/canvas/technician-basketballspecial-1991-11_0023","motivation":"sc:painting","resource":{"@id":"https://iiif.lib.ncsu.edu/iiif/technician-basketballspecial-1991-11_0023/full/1170,/0/default.jpg","width":3565,"height":4359,"service":{"profile":"http://iiif.io/api/image/2/level2.json","@context":"http://iiif.io/api/image/2/context.json","@id":"https://iiif.lib.ncsu.edu/iiif/technician-basketballspecial-1991-11_0023"},"@type":"dctypes:Image"}}],"otherContent":[{"@id":"https://ocr.lib.ncsu.edu/ocr/te/technician-basketballspecial-1991-11_0023/technician-basketballspecial-1991-11_0023-annotation-list-word.json","@type":"sc:AnnotationList","label":"Text of this page (word level)"},{"@id":"https://ocr.lib.ncsu.edu/ocr/te/technician-basketballspecial-1991-11_0023/technician-basketballspecial-1991-11_0023-annotation-list-line.json","@type":"sc:AnnotationList","label":"Text of this page (line level)"},{"@id":"https://ocr.lib.ncsu.edu/ocr/te/technician-basketballspecial-1991-11_0023/technician-basketballspecial-1991-11_0023-annotation-list-paragraph.json","@type":"sc:AnnotationList","label":"Text of this page (paragraph level)"}]},{"@type":"sc:Canvas","@id":"https://d.lib.ncsu.edu/collections/canvas/technician-basketballspecial-1991-11_0024","width":3519,"height":4356,"label":"[24]","seeAlso":[{"@id":"https://ocr.lib.ncsu.edu/ocr/te/technician-basketballspecial-1991-11_0024/technician-basketballspecial-1991-11_0024.hocr","format":"text/vnd.hocr+html","profile":"https://github.com/kba/hocr-spec/blob/master/hocr-spec.md","label":"hOCR"},{"@id":"https://ocr.lib.ncsu.edu/ocr/te/technician-basketballspecial-1991-11_0024/technician-basketballspecial-1991-11_0024.txt","format":"text/plain","label":"plain text OCR"}],"images":[{"@id":"https://d.lib.ncsu.edu/collections/canvas/technician-basketballspecial-1991-11_0024/image","@type":"oa:Annotation","on":"https://d.lib.ncsu.edu/collections/canvas/technician-basketballspecial-1991-11_0024","motivation":"sc:painting","resource":{"@id":"https://iiif.lib.ncsu.edu/iiif/technician-basketballspecial-1991-11_0024/full/1170,/0/default.jpg","width":3519,"height":4356,"service":{"profile":"http://iiif.io/api/image/2/level2.json","@context":"http://iiif.io/api/image/2/context.json","@id":"https://iiif.lib.ncsu.edu/iiif/technician-basketballspecial-1991-11_0024"},"@type":"dctypes:Image"}}],"otherContent":[{"@id":"https://ocr.lib.ncsu.edu/ocr/te/technician-basketballspecial-1991-11_0024/technician-basketballspecial-1991-11_0024-annotation-list-word.json","@type":"sc:AnnotationList","label":"Text of this page (word level)"},{"@id":"https://ocr.lib.ncsu.edu/ocr/te/technician-basketballspecial-1991-11_0024/technician-basketballspecial-1991-11_0024-annotation-list-line.json","@type":"sc:AnnotationList","label":"Text of this page (line level)"},{"@id":"https://ocr.lib.ncsu.edu/ocr/te/technician-basketballspecial-1991-11_0024/technician-basketballspecial-1991-11_0024-annotation-list-paragraph.json","@type":"sc:AnnotationList","label":"Text of this page (paragraph level)"}]}],"@type":"sc:Sequence","viewingHint":"paged","rendering":[{"@id":"https://ocr.lib.ncsu.edu/ocr/te/technician-basketballspecial-1991-11/technician-basketballspecial-1991-11.pdf","label":"Download as PDF, 6.81 MB","format":"application/pdf"},{"@id":"https://ocr.lib.ncsu.edu/ocr/te/technician-basketballspecial-1991-11/technician-basketballspecial-1991-11.txt","label":"Download OCR Text","format":"plain/text"}]}],"service":[{"@context":"http://iiif.io/api/search/0/context.json","@id":"https://ocr.lib.ncsu.edu/search/technician-basketballspecial-1991-11","profile":"http://iiif.io/api/search/0/search","label":"Search within this thing","service":{"@id":"https://ocr.lib.ncsu.edu/suggest/technician-basketballspecial-1991-11","profile":"http://iiif.io/api/search/0/autocomplete","label":"Get suggested words"}}],"seeAlso":[{"@id":"https://d.lib.ncsu.edu/collections/catalog/oai?identifier=ncsul%2Ftechnician-basketballspecial-1991-11\u0026metadataPrefix=oai_dc\u0026verb=GetRecord","format":"text/xml","label":"Dublin Core XML via OAI-PMH"},{"@id":"https://d.lib.ncsu.edu/collections/catalog/technician-basketballspecial-1991-11/schemaorg.json","format":"application/ld+json","profile":"https://schema.org","label":"Schema.org metadata as JSON-LD"}],"dcterms:modified":"2019-09-24T16:08:27.000Z","dcterms:created":"2015-12-22T20:16:58.000Z"}
    });
  }
  if (url === 'http://wellcomelibrary.org/iiif/b1948799x/manifest' || url === 'https://wellcomelibrary.org/iiif/b1948799x/manifest') {
      return Promise.resolve({
        data: {"@context":"http://iiif.io/api/presentation/2/context.json","@id":"https://wellcomelibrary.org/iiif/b1948799x/manifest","@type":"sc:Manifest","label":"Letter from Francis Crick to Michael Crick","sequences":[{"canvases":[{"@id":"https://wellcomelibrary.org/iiif/b1948799x/canvas/c0","@type":"sc:Canvas","label":" - ","images":[{"@id":"https://wellcomelibrary.org/iiif/b1948799x/imageanno/ce30a1a7-a606-4b5e-b2ad-c13677d3e8f6","@type":"oa:Annotation","motivation":"sc:painting","resource":{"@id":"https://dlcs.io/iiif-img/wellcome/1/ce30a1a7-a606-4b5e-b2ad-c13677d3e8f6/full/!1024,1024/0/default.jpg","@type":"dctypes:Image","format":"image/jpeg","height":1024,"width":683,"service":{"@context":"http://iiif.io/api/image/2/context.json","@id":"https://dlcs.io/iiif-img/wellcome/1/ce30a1a7-a606-4b5e-b2ad-c13677d3e8f6","profile":"http://iiif.io/api/image/2/level1.json"}},"on":"https://wellcomelibrary.org/iiif/b1948799x/canvas/c0"}]}]}]        }
      })
  }
  if (url === 'mc00240.json') {
    return Promise.resolve({data:{"@context": "http://iiif.io/api/presentation/2/context.json", "@id": "http://localhost:4000/annotate/annotations/mc00240-001-ff0093-001-001-0010-list.json", "@type": "sc:AnnotationList", "resources": [{"on": [{"within": {"@id": "https://d.lib.ncsu.edu/collections/catalog/mc00240-001-ff0093-001-001_0010/manifest.json", "@type": "sc:Manifest"}, "@type": "oa:SpecificResource", "full": "https://d.lib.ncsu.edu/collections/canvas/mc00240-001-ff0093-001-001_0010", "selector": {"default": {"@type": "oa:FragmentSelector", "value": "xywh=740,567,3998,4586"}, "item": {"@type": "oa:SvgSelector", "value": "<svg xmlns='http://www.w3.org/2000/svg'><path xmlns=\"http://www.w3.org/2000/svg\" d=\"M740.00502,566.97616l1998.77039,0l0,0l1998.77039,0l0,2293.02384l0,2293.02384l-1998.77039,0l-1998.77039,0l0,-2293.02384z\" data-paper-data=\"{&quot;defaultStrokeValue&quot;:1,&quot;editStrokeValue&quot;:5,&quot;currentStrokeValue&quot;:5,&quot;rotation&quot;:0,&quot;annotation&quot;:null,&quot;editable&quot;:true}\" id=\"rectangle_dcc88375-b2ff-4b41-b061-6d9b5f6b81fc\" fill-opacity=\"0.00001\" fill=\"#00bfff\" fill-rule=\"nonzero\" stroke=\"#00bfff\" stroke-width=\"17.94228\" stroke-linecap=\"butt\" stroke-linejoin=\"miter\" stroke-miterlimit=\"10\" stroke-dasharray=\"\" stroke-dashoffset=\"0\" font-family=\"none\" font-weight=\"none\" font-size=\"none\" text-anchor=\"none\" style=\"mix-blend-mode: normal\"/></svg>"}, "@type": "oa:Choice"}}, {"within": {"@id": "https://d.lib.ncsu.edu/collections/catalog/mc00240-001-ff0093-001-001_0010/manifest.json", "@type": "sc:Manifest"}, "@type": "oa:SpecificResource", "full": "https://d.lib.ncsu.edu/collections/canvas/mc00240-001-ff0093-001-001_0010", "selector": {"default": {"@type": "oa:FragmentSelector", "value": "xywh=2735,589,14,14"}, "item": {"@type": "oa:SvgSelector", "value": "<svg xmlns='http://www.w3.org/2000/svg'><path xmlns=\"http://www.w3.org/2000/svg\" d=\"M2735.18695,588.5069l7.17691,0l0,0l7.17691,0l0,7.17691l0,7.17691l-7.17691,0l-7.17691,0l0,-7.17691z\" data-paper-data=\"{&quot;defaultStrokeValue&quot;:1,&quot;editStrokeValue&quot;:5,&quot;currentStrokeValue&quot;:5,&quot;rotation&quot;:0,&quot;annotation&quot;:null,&quot;editable&quot;:true}\" id=\"rectangle_00446e32-f965-4188-916c-b74faa69f71c\" fill-opacity=\"0.00001\" fill=\"#00bfff\" fill-rule=\"nonzero\" stroke=\"#00bfff\" stroke-width=\"17.94228\" stroke-linecap=\"butt\" stroke-linejoin=\"miter\" stroke-miterlimit=\"10\" stroke-dasharray=\"\" stroke-dashoffset=\"0\" font-family=\"none\" font-weight=\"none\" font-size=\"none\" text-anchor=\"none\" style=\"mix-blend-mode: normal\"/></svg>"}, "@type": "oa:Choice"}}], "motivation": ["oa:commenting"], "resource": [{"chars": "<p>Bank and Office Building for Wachovia Bank and Trust Co.</p>\n<p>Salisbury, NC</p>", "@type": "dctypes:Text", "format": "text/html"}], "@context": "http://iiif.io/api/presentation/2/context.json", "@id": "1bc33180-e9c1-4905-b1bb-f4751c1879fb", "@type": "oa:Annotation"}, {"on": [{"within": {"@id": "https://d.lib.ncsu.edu/collections/catalog/mc00240-001-ff0093-001-001_0010/manifest.json", "@type": "sc:Manifest"}, "@type": "oa:SpecificResource", "full": "https://d.lib.ncsu.edu/collections/canvas/mc00240-001-ff0093-001-001_0010", "selector": {"default": {"@type": "oa:FragmentSelector", "value": "xywh=4206,2376,1970,2379"}, "item": {"@type": "oa:SvgSelector", "value": "<svg xmlns='http://www.w3.org/2000/svg'><path xmlns=\"http://www.w3.org/2000/svg\" d=\"M4206.4542,2375.55834l985.03137,0l0,0l985.03137,0l0,1189.5734l0,1189.5734l-985.03137,0l-985.03137,0l0,-1189.5734z\" data-paper-data=\"{&quot;defaultStrokeValue&quot;:1,&quot;editStrokeValue&quot;:5,&quot;currentStrokeValue&quot;:1,&quot;rotation&quot;:0,&quot;deleteIcon&quot;:null,&quot;rotationIcon&quot;:null,&quot;group&quot;:null,&quot;editable&quot;:true,&quot;annotation&quot;:null}\" id=\"rectangle_97e17d4a-e919-467d-836b-17722e9fee6a\" fill-opacity=\"0\" fill=\"#00bfff\" fill-rule=\"nonzero\" stroke=\"#00bfff\" stroke-width=\"3.58846\" stroke-linecap=\"butt\" stroke-linejoin=\"miter\" stroke-miterlimit=\"10\" stroke-dasharray=\"\" stroke-dashoffset=\"0\" font-family=\"none\" font-weight=\"none\" font-size=\"none\" text-anchor=\"none\" style=\"mix-blend-mode: normal\"/></svg>"}, "@type": "oa:Choice"}}], "motivation": ["oa:tagging", "oa:commenting"], "resource": [{"chars": "balcony", "@type": "oa:Tag"}, {"chars": "railing", "@type": "oa:Tag"}, {"chars": "<p>DETAILS OF BALCONY RAILING</p>", "@type": "dctypes:Text", "format": "text/html"}], "@context": "http://iiif.io/api/presentation/2/context.json", "@id": "6796833f-be93-42d0-8fb1-832e8f39c6aa", "@type": "oa:Annotation"}, {"on": [{"within": {"@id": "https://d.lib.ncsu.edu/collections/catalog/mc00240-001-ff0093-001-001_0010/manifest.json", "@type": "sc:Manifest"}, "@type": "oa:SpecificResource", "full": "https://d.lib.ncsu.edu/collections/canvas/mc00240-001-ff0093-001-001_0010", "selector": {"default": {"@type": "oa:FragmentSelector", "value": "xywh=5943,222,2771,4521"}, "item": {"@type": "oa:SvgSelector", "value": "<svg xmlns='http://www.w3.org/2000/svg'><path xmlns=\"http://www.w3.org/2000/svg\" d=\"M5943.26725,222.48432l1385.53576,0l0,0l1385.53576,0l0,2260.72773l0,2260.72773l-1385.53576,0l-1385.53576,0l0,-2260.72773z\" data-paper-data=\"{&quot;defaultStrokeValue&quot;:1,&quot;editStrokeValue&quot;:5,&quot;currentStrokeValue&quot;:1,&quot;rotation&quot;:0,&quot;deleteIcon&quot;:null,&quot;rotationIcon&quot;:null,&quot;group&quot;:null,&quot;editable&quot;:true,&quot;annotation&quot;:null}\" id=\"rectangle_2a8e3963-b45d-4841-9879-421fb92fb141\" fill-opacity=\"0\" fill=\"#00bfff\" fill-rule=\"nonzero\" stroke=\"#00bfff\" stroke-width=\"3.58846\" stroke-linecap=\"butt\" stroke-linejoin=\"miter\" stroke-miterlimit=\"10\" stroke-dasharray=\"\" stroke-dashoffset=\"0\" font-family=\"none\" font-weight=\"none\" font-size=\"none\" text-anchor=\"none\" style=\"mix-blend-mode: normal\"/></svg>"}, "@type": "oa:Choice"}}], "motivation": ["oa:tagging", "oa:commenting"], "resource": [{"chars": "partition", "@type": "oa:Tag"}, {"chars": "<p>DETAILS OF PARTITION BETWEEN BANK AND DIRECTORS' ROOM</p>", "@type": "dctypes:Text", "format": "text/html"}], "@context": "http://iiif.io/api/presentation/2/context.json", "@id": "2f66f50f-8a7e-4596-8654-6b25c72179ea", "@type": "oa:Annotation"}]}
    })
  }
  if (url === 'http://d.lib.ncsu.edu/collections/catalog/mc00240-001-ff0093-001-001_0010/manifest.json' || url === 'https://d.lib.ncsu.edu/collections/catalog/mc00240-001-ff0093-001-001_0010/manifest.json'){
    return Promise.resolve({data:{"@context":"http://iiif.io/api/presentation/2/context.json","@id":"https://d.lib.ncsu.edu/collections/catalog/mc00240-001-ff0093-001-001_0010/manifest.json","@type":"sc:Manifest","label":"Cross section, interior details","related":{"@id":"https://d.lib.ncsu.edu/collections/catalog/mc00240-001-ff0093-001-001_0010","format":"text/html","label":"HTML page for the resource","dcterms:modified":"2018-11-20T20:02:09.861Z"},"logo":{"@id":"https://d.lib.ncsu.edu/collections/assets/ncsu-libraries-white-logo-placement-8e3a4e918262aa5993b0e0475989b02f.jpg"},"attribution":"Northup \u0026 O'Brien Architectural Records, 1917-1980 (MC00240), Special Collections Research Center at NCSU Libraries","license":["https://d.lib.ncsu.edu/collections/about#rights_and_use"],"metadata":[{"label":"title","value":"Cross section, interior details"},{"label":"Creator","value":"\u003cspan\u003e\u003ca href=\"https://d.lib.ncsu.edu/collections/catalog?f%5Bnames_facet%5D%5B%5D=O%27Brien%2C+Leet+Alexander%2C+1891-1963\"\u003eO\u0026#39;Brien, Leet Alexander, 1891-1963\u003c/a\u003e (Architect)\u003c/span\u003e"},{"label":"Created Date","value":"1924-06-201924-10-16"},{"label":"URL","value":"\u003cspan\u003e\u003ca href=\"https://d.lib.ncsu.edu/collections/catalog/mc00240-001-ff0093-001-001_0010\"\u003ehttps://d.lib.ncsu.edu/collections/catalog/mc00240-001-ff0093-001-001_0010\u003c/a\u003e\u003c/span\u003e"},{"label":"","value":"\u003cspan\u003e\u003ca href=\"https://d.lib.ncsu.edu/collections/catalog/mc00240-001-ff0093-001-001_0010?manifest=https%3A%2F%2Fd.lib.ncsu.edu%2Fcollections%2Fcatalog%2Fmc00240-001-ff0093-001-001_0010%2Fmanifest.json\" title=\"IIIF drag \u0026amp; drop\"\u003eIIIF drag \u0026amp; drop\u003c/a\u003e (\u003ca href=\"https://d.lib.ncsu.edu/collections/about-iiif\"\u003eAbout IIIF\u003c/a\u003e)\u003c/span\u003e"}],"thumbnail":{"@id":"https://iiif.lib.ncsu.edu/iiif/mc00240-001-ff0093-001-001_0010/full/150,/0/default.jpg","service":{"@context":"http://iiif.io/api/image/2/context.json","@id":"https://iiif.lib.ncsu.edu/iiif/mc00240-001-ff0093-001-001_0010","profile":"http://iiif.io/api/image/2/level2.json"}},"sequences":[{"canvases":[{"@type":"sc:Canvas","@id":"https://d.lib.ncsu.edu/collections/canvas/mc00240-001-ff0093-001-001_0010","width":8944,"height":5720,"label":"[1]","images":[{"@id":"https://d.lib.ncsu.edu/collections/canvas/mc00240-001-ff0093-001-001_0010/image","@type":"oa:Annotation","on":"https://d.lib.ncsu.edu/collections/canvas/mc00240-001-ff0093-001-001_0010","motivation":"sc:painting","resource":{"@id":"https://iiif.lib.ncsu.edu/iiif/mc00240-001-ff0093-001-001_0010/full/1170,/0/default.jpg","width":1170,"height":748,"service":{"profile":"http://iiif.io/api/image/2/level2.json","@context":"http://iiif.io/api/image/2/context.json","@id":"https://iiif.lib.ncsu.edu/iiif/mc00240-001-ff0093-001-001_0010"},"@type":"dctypes:Image"}}]}],"@type":"sc:Sequence","viewingHint":"non-paged"}],"seeAlso":[{"@id":"https://d.lib.ncsu.edu/collections/catalog/oai?identifier=ncsul%2Fmc00240-001-ff0093-001-001_0010\u0026metadataPrefix=oai_dc\u0026verb=GetRecord","format":"text/xml","label":"Dublin Core XML via OAI-PMH"},{"@id":"https://d.lib.ncsu.edu/collections/catalog/mc00240-001-ff0093-001-001_0010/schemaorg.json","format":"application/ld+json","profile":"https://schema.org","label":"Schema.org metadata as JSON-LD"}],"dcterms:modified":"2018-11-20T20:02:09.000Z","dcterms:created":"2010-01-20T11:29:42.000Z"}})
  }
  if (url === 'bees.json'){
    return Promise.resolve({data:{"type":"Annotation","@context":"http://www.w3.org/ns/anno.jsonld","label":"The Bees","body":{"value":"So many bees.","type":"TextualBody","purpose":"tagging","format":"text/plain"},"target":{"id":"https://d.lib.ncsu.edu/collections/canvas/segIns_023#xywh=318,499,2891,3339","type":"Canvas","dcterms:isPartOf":{"id":"https://d.lib.ncsu.edu/collections/catalog/segIns_023/manifest","type":"Manifest","label":"Insectes. [patterns]"}},"motivation":{"id":"http://www.w3.org/ns/oa#tagging","label":"tagging"},"generator":"/capture-models/generic/describing.json"}})
  }
  if (url === "http://d.lib.ncsu.edu/collections/catalog/segIns_023/manifest" || url === "https://d.lib.ncsu.edu/collections/catalog/segIns_023/manifest"){
    return Promise.resolve({data:{"@context":"http://iiif.io/api/presentation/2/context.json","@id":"https://d.lib.ncsu.edu/collections/catalog/segIns_023/manifest","@type":"sc:Manifest","label":"Insectes. [patterns]","description":"Four patterns inspired by insects.","related":{"@id":"https://d.lib.ncsu.edu/collections/catalog/segIns_023","format":"text/html","label":"HTML page for the resource","dcterms:modified":"2018-10-22T13:23:44.834Z"},"logo":{"@id":"https://d.lib.ncsu.edu/collections/assets/ncsu-libraries-white-logo-placement-8e3a4e918262aa5993b0e0475989b02f.jpg"},"attribution":"E. A. Séguy's Insectes (QL466 .S49 1920), Special Collections Research Center at NCSU Libraries","license":["https://d.lib.ncsu.edu/collections/about#rights_and_use"],"metadata":[{"label":"title","value":"Insectes. [patterns]"},{"label":"Creator","value":"\u003cspan\u003e\u003ca href=\"https://d.lib.ncsu.edu/collections/catalog?f%5Bnames_facet%5D%5B%5D=Se%CC%81guy%2C+E.+%28Euge%CC%80ne%29%2C+1890-1985\"\u003eSéguy, E. (Eugène), 1890-1985\u003c/a\u003e (Artist)\u003c/span\u003e"},{"label":"Created Date","value":"circa 19201929"},{"label":"URL","value":"\u003cspan\u003e\u003ca href=\"https://d.lib.ncsu.edu/collections/catalog/segIns_023\"\u003ehttps://d.lib.ncsu.edu/collections/catalog/segIns_023\u003c/a\u003e\u003c/span\u003e"},{"label":"","value":"\u003cspan\u003e\u003ca href=\"https://d.lib.ncsu.edu/collections/catalog/segIns_023?manifest=https%3A%2F%2Fd.lib.ncsu.edu%2Fcollections%2Fcatalog%2FsegIns_023%2Fmanifest.json\" title=\"IIIF drag \u0026amp; drop\"\u003eIIIF drag \u0026amp; drop\u003c/a\u003e (\u003ca href=\"https://d.lib.ncsu.edu/collections/about-iiif\"\u003eAbout IIIF\u003c/a\u003e)\u003c/span\u003e"}],"thumbnail":{"@id":"https://iiif.lib.ncsu.edu/iiif/segIns_023/full/150,/0/default.jpg","service":{"@context":"http://iiif.io/api/image/2/context.json","@id":"https://iiif.lib.ncsu.edu/iiif/segIns_023","profile":"http://iiif.io/api/image/2/level2.json"}},"sequences":[{"canvases":[{"@type":"sc:Canvas","@id":"https://d.lib.ncsu.edu/collections/canvas/segIns_023","width":6099,"height":8599,"label":"[1]","images":[{"@id":"https://d.lib.ncsu.edu/collections/canvas/segIns_023/image","@type":"oa:Annotation","on":"https://d.lib.ncsu.edu/collections/canvas/segIns_023","motivation":"sc:painting","resource":{"@id":"https://iiif.lib.ncsu.edu/iiif/segIns_023/full/1170,/0/default.jpg","width":1170,"height":1650,"service":{"profile":"http://iiif.io/api/image/2/level2.json","@context":"http://iiif.io/api/image/2/context.json","@id":"https://iiif.lib.ncsu.edu/iiif/segIns_023"},"@type":"dctypes:Image"}}]}],"@type":"sc:Sequence","viewingHint":"non-paged"}],"seeAlso":[{"@id":"https://d.lib.ncsu.edu/collections/catalog/oai?identifier=ncsul%2FsegIns_023\u0026metadataPrefix=oai_dc\u0026verb=GetRecord","format":"text/xml","label":"Dublin Core XML via OAI-PMH"},{"@id":"https://d.lib.ncsu.edu/collections/catalog/segIns_023/schemaorg.json","format":"application/ld+json","profile":"https://schema.org","label":"Schema.org metadata as JSON-LD"}],"dcterms:modified":"2018-10-22T13:23:44.000Z","dcterms:created":"2006-11-20T00:00:00.000Z"}
    })
  }
  if (url === 'page.json'){
    return Promise.resolve({data:{"@context":"http://www.w3.org/ns/anno.jsonld","id":"http://example.org/page1","type":"AnnotationPage","partOf":{"id":"annopagemanifest.json","label":"Page annotations","total":42023},"next":"http://example.org/page2","startIndex":0,"items":[{"id":"/annopage/p1/a1","type":"Annotation","motivation":"describing","body":{"type":"TextualBody","value":"<iiif-annotation annotationurl='https://dnoneill.github.io/annotate/annotations/0001-1.json'></iiif-annotation>","format":"text/html"},"target":{"id":"https://d.lib.ncsu.edu/collections/canvas/mc00084-001-te0159-000-001_0001#xywh=1800,2000,500,500","type":"Canvas"}}]}})
  }
  if (url === 'annopagemanifest.json'){
    return Promise.resolve({data:{"sequences":[{"@id":"https://d.lib.ncsu.edu/collections/canvas/mc00084-001-te0159-000-001_0001","canvases":[{"@id":"https://d.lib.ncsu.edu/collections/canvas/mc00084-001-te0159-000-001_0001","images":[{"@id":"https://d.lib.ncsu.edu/collections/canvas/mc00084-001-te0159-000-001_0001","resource":{"service":{"@id":"https://iiif.lib.ncsu.edu/iiif/mc00084-001-te0159-000-001_0001"}}}]}]}]}})
  }
  if (url === 'oa.json' || url == 'https://ocr.lib.ncsu.edu/ocr/te/technician-basketballspecial-1991-11_0001/technician-basketballspecial-1991-11_0001-annotation-list-word.json') {
    return Promise.resolve({data:{"@context":"http://iiif.io/api/presentation/2/context.json","@id":"oawithoutmanifest.json","@type":"sc:AnnotationList","resources":[{"@type":"oa:Annotation","motivation":"sc:painting","resource":{"@type":"cnt:ContentAsText","format":"text/plain","chars":"Annotation 1"},"on":"https://iiif.lib.ncsu.edu/iiif/segIns_023/info.json#xywh=6270,3903,2250,2250"},{"@type":"oa:Annotation","motivation":"sc:painting","resource":{"@type":"cnt:ContentAsText","format":"text/plain","chars":"Annotation 2"},"on":"https://iiif.lib.ncsu.edu/iiif/segIns_023/318,499,2891,3339/1200,/0/default.jpg#xywh=12288,16567,2250,2250"}]}})
  }

  if (url === '4058a628-c593-463e-9736-8a821e178fee-list.json') {
    return Promise.resolve({data:{"resources": [{"@context": "http://www.w3.org/ns/anno.jsonld", "type": "Annotation", "body": [{"format": "text/html", "selector": {"value": "pin", "type": "FragmentSelector"}, "type": "TextualBody", "value": "Campo San Maurizio"}, {"purpose": "tagging", "value": "campo", "type": "TextualBody", "format": "text/plain"}], "target": {"id": "https://repository.duke.edu/iipsrv/iipsrv.fcgi?IIIF=/srv/perkins/repo_deriv/multires_image/40/58/a6/28/4058a628-c593-463e-9736-8a821e178fee#xywh=6925,7907,415,156", "type": "Image"}}, {"@context": "http://www.w3.org/ns/anno.jsonld", "type": "Annotation", "body": [{"format": "text/html", "selector": {"value": "pin", "type": "FragmentSelector"}, "type": "TextualBody", "value": "Church of San Maurizio. Is now a Museum on music of Baroque Venice."}, {"purpose": "tagging", "value": "church", "type": "TextualBody", "format": "text/plain"}, {"purpose": "tagging", "value": "deconsecrated", "type": "TextualBody", "format": "text/plain"}], "target": {"id": "https://repository.duke.edu/iipsrv/iipsrv.fcgi?IIIF=/srv/perkins/repo_deriv/multires_image/40/58/a6/28/4058a628-c593-463e-9736-8a821e178fee#xywh=7068,8160,382,245", "type": "Image"}}, {"@context": "http://www.w3.org/ns/anno.jsonld", "type": "Annotation", "body": [{"format": "text/html", "type": "TextualBody", "selector": {"type": "FragmentSelector", "value": "pin"}, "value": "Santa Maria Gloriosa dei Frari also know as Frari."}, {"format": "text/plain", "type": "TextualBody", "value": "church", "purpose": "tagging"}, {"format": "text/plain", "type": "TextualBody", "value": "standing", "purpose": "tagging"}], "target": {"id": "https://repository.duke.edu/iipsrv/iipsrv.fcgi?IIIF=/srv/perkins/repo_deriv/multires_image/40/58/a6/28/4058a628-c593-463e-9736-8a821e178fee#xywh=6609,5718,766,721", "type": "Image"}}, {"@context": "http://www.w3.org/ns/anno.jsonld", "type": "Annotation", "body": [{"format": "text/html", "type": "TextualBody", "selector": {"type": "FragmentSelector", "value": "pin"}, "value": "Cristo Re alla Celestia"}, {"format": "text/plain", "type": "TextualBody", "value": "church", "purpose": "tagging"}, {"format": "text/plain", "type": "TextualBody", "value": "demolished", "purpose": "tagging"}], "target": {"id": "https://repository.duke.edu/iipsrv/iipsrv.fcgi?IIIF=/srv/perkins/repo_deriv/multires_image/40/58/a6/28/4058a628-c593-463e-9736-8a821e178fee#xywh=21613,7537,565,381", "type": "Image"}}, {"@context": "http://www.w3.org/ns/anno.jsonld", "type": "Annotation", "body": [{"format": "text/html", "type": "TextualBody", "selector": {"type": "FragmentSelector", "value": "pin"}, "value": "Bucentaur. State barges of the doges of Venice. They are depicted in the painting <i>The Doge on the Bucintoro near the Riva di Sant'Elena</i> by Francesco Guardi seen below. \n<br><a title=\"Francesco Guardi\n [Public domain], via Wikimedia Commons\" href=\"https://commons.wikimedia.org/wiki/File:Guardi,Francesco_-_The_Departure_of_Bucentaur_for_the_Lido_on_Ascension_Day.jpg\"><img width=\"200\" alt=\"Guardi,Francesco - The Departure of Bucentaur for the Lido on Ascension Day\" src=\"https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/Guardi%2CFrancesco_-_The_Departure_of_Bucentaur_for_the_Lido_on_Ascension_Day.jpg/512px-Guardi%2CFrancesco_-_The_Departure_of_Bucentaur_for_the_Lido_on_Ascension_Day.jpg\"></a>"}, {"format": "text/plain", "type": "TextualBody", "value": "barges", "purpose": "tagging"}], "target": {"id": "https://repository.duke.edu/iipsrv/iipsrv.fcgi?IIIF=/srv/perkins/repo_deriv/multires_image/40/58/a6/28/4058a628-c593-463e-9736-8a821e178fee#xywh=23006,8428,690,819", "type": "Image"}}, {"@context": "http://www.w3.org/ns/anno.jsonld", "type": "Annotation", "body": [{"format": "text/html", "type": "TextualBody", "selector": {"type": "FragmentSelector", "value": "pin"}, "value": "Church of Corpus Domini"}, {"format": "text/plain", "type": "TextualBody", "value": "church", "purpose": "tagging"}, {"format": "text/plain", "type": "TextualBody", "value": "demolished", "purpose": "tagging"}], "target": {"id": "https://repository.duke.edu/iipsrv/iipsrv.fcgi?IIIF=/srv/perkins/repo_deriv/multires_image/40/58/a6/28/4058a628-c593-463e-9736-8a821e178fee#xywh=3444,5811,579,403", "type": "Image"}}, {"@context": "http://www.w3.org/ns/anno.jsonld", "type": "Annotation", "body": [{"format": "text/html", "type": "TextualBody", "selector": {"type": "FragmentSelector", "value": "pin"}, "value": "Piazza San Marco also known as St Mark's Square. "}, {"format": "text/plain", "type": "TextualBody", "value": "campo", "purpose": "tagging"}], "target": {"id": "https://repository.duke.edu/iipsrv/iipsrv.fcgi?IIIF=/srv/perkins/repo_deriv/multires_image/40/58/a6/28/4058a628-c593-463e-9736-8a821e178fee#xywh=11986,9036,2233,889", "type": "Image"}}, {"@context": "http://www.w3.org/ns/anno.jsonld", "body": [{"format": "text/html", "type": "TextualBody", "value": "San Vidal Church. Currently is used as a event and concert hall", "selector": {"value": "pin", "type": "FragmentSelector"}}, {"purpose": "tagging", "type": "TextualBody", "value": "church", "format": "text/plain"}, {"purpose": "tagging", "type": "TextualBody", "value": "deconsecrated", "format": "text/plain"}], "type": "Annotation", "target": {"id": "https://repository.duke.edu/iipsrv/iipsrv.fcgi?IIIF=/srv/perkins/repo_deriv/multires_image/40/58/a6/28/4058a628-c593-463e-9736-8a821e178fee#xywh=6373,7880,221,223", "type": "Image"}}], "@context": "http://www.w3.org/ns/anno.jsonld", "@type": "AnnotationPage", "id": "https://dnoneill.github.io/annotate/annotations/4058a628-c593-463e-9736-8a821e178fee-list.json"}})
  }

  if (url === 'range.json') {
    return Promise.resolve({data:{"@id":"https://kotenseki.nijl.ac.jp/biblio/200015137/manifest","@type":"sc:Range","canvases":[{"within":"https://kotenseki.nijl.ac.jp/biblio/200015137/manifest"},{"within":"https://kotenseki.nijl.ac.jp/biblio/200015137/manifest"},{"within":"https://kotenseki.nijl.ac.jp/biblio/200015137/manifest"},{"within":"https://kotenseki.nijl.ac.jp/biblio/200015137/manifest"},{"within":"https://kotenseki.nijl.ac.jp/biblio/200015137/manifest"},{"within":"https://kotenseki.nijl.ac.jp/biblio/200015137/manifest"},{"within":"https://kotenseki.nijl.ac.jp/biblio/200015137/manifest"},{"within":"https://kotenseki.nijl.ac.jp/biblio/200015137/manifest"},{"within":"https://kotenseki.nijl.ac.jp/biblio/200015137/manifest"},{"within":"https://kotenseki.nijl.ac.jp/biblio/200015137/manifest"},{"within":"https://kotenseki.nijl.ac.jp/biblio/200015137/manifest"},{"within":"https://kotenseki.nijl.ac.jp/biblio/200015137/manifest"},{"within":"https://kotenseki.nijl.ac.jp/biblio/200015137/manifest"},{"within":"https://kotenseki.nijl.ac.jp/biblio/200015137/manifest"},{"within":"https://kotenseki.nijl.ac.jp/biblio/200015137/manifest"},{"within":"https://kotenseki.nijl.ac.jp/biblio/200015137/manifest"},{"within":"https://kotenseki.nijl.ac.jp/biblio/200015137/manifest"},{"within":"https://kotenseki.nijl.ac.jp/biblio/200015137/manifest"},{"within":"https://kotenseki.nijl.ac.jp/biblio/200015137/manifest"},{"within":"https://kotenseki.nijl.ac.jp/biblio/200015137/manifest"},{"within":"https://kotenseki.nijl.ac.jp/biblio/200015137/manifest"},{"within":"https://kotenseki.nijl.ac.jp/biblio/200015137/manifest"},{"within":"https://kotenseki.nijl.ac.jp/biblio/200015137/manifest"},{"within":"https://kotenseki.nijl.ac.jp/biblio/200015137/manifest"},{"within":"https://kotenseki.nijl.ac.jp/biblio/200015137/manifest"},{"within":"https://kotenseki.nijl.ac.jp/biblio/200015137/manifest"},{"within":"https://kotenseki.nijl.ac.jp/biblio/200015137/manifest"},{"within":"https://kotenseki.nijl.ac.jp/biblio/200015137/manifest"}],"contentLayer":{"otherContent":[{"@id":"https://kotenseki.nijl.ac.jp/biblio/200015137/list/1","description":"","label":"1"},{"@id":"https://kotenseki.nijl.ac.jp/biblio/200015137/list/4","description":"","label":"4"},{"@id":"https://kotenseki.nijl.ac.jp/biblio/200015137/list/5","description":"","label":"5"},{"@id":"https://kotenseki.nijl.ac.jp/biblio/200015137/list/6","description":"","label":"6"},{"@id":"https://kotenseki.nijl.ac.jp/biblio/200015137/list/7","description":"","label":"7"},{"@id":"https://kotenseki.nijl.ac.jp/biblio/200015137/list/8","description":"","label":"8"},{"@id":"https://kotenseki.nijl.ac.jp/biblio/200015137/list/9","description":"","label":"9"},{"@id":"https://kotenseki.nijl.ac.jp/biblio/200015137/list/10","description":"","label":"10"},{"@id":"https://kotenseki.nijl.ac.jp/biblio/200015137/list/11","description":"","label":"11"},{"@id":"https://kotenseki.nijl.ac.jp/biblio/200015137/list/12","description":"","label":"12"},{"@id":"https://kotenseki.nijl.ac.jp/biblio/200015137/list/13","description":"","label":"13"},{"@id":"https://kotenseki.nijl.ac.jp/biblio/200015137/list/14","description":"","label":"14"},{"@id":"https://kotenseki.nijl.ac.jp/biblio/200015137/list/15","description":"","label":"15"},{"@id":"https://kotenseki.nijl.ac.jp/biblio/200015137/list/16","description":"","label":"16"},{"@id":"https://kotenseki.nijl.ac.jp/biblio/200015137/list/17","description":"","label":"17"},{"@id":"https://kotenseki.nijl.ac.jp/biblio/200015137/list/18","description":"","label":"18"},{"@id":"https://kotenseki.nijl.ac.jp/biblio/200015137/list/20","description":"","label":"20"},{"@id":"https://kotenseki.nijl.ac.jp/biblio/200015137/list/21","description":"","label":"21"},{"@id":"https://kotenseki.nijl.ac.jp/biblio/200015137/list/22","description":"","label":"22"},{"@id":"https://kotenseki.nijl.ac.jp/biblio/200015137/list/23","description":"","label":"23"},{"@id":"https://kotenseki.nijl.ac.jp/biblio/200015137/list/24","description":"","label":"24"},{"@id":"https://kotenseki.nijl.ac.jp/biblio/200015137/list/25","description":"","label":"25"},{"@id":"https://kotenseki.nijl.ac.jp/biblio/200015137/list/26","description":"","label":"26"},{"@id":"https://kotenseki.nijl.ac.jp/biblio/200015137/list/27","description":"","label":"27"},{"@id":"https://kotenseki.nijl.ac.jp/biblio/200015137/list/28","description":"","label":"28"},{"@id":"https://kotenseki.nijl.ac.jp/biblio/200015137/list/29","description":"","label":"29"},{"@id":"https://kotenseki.nijl.ac.jp/biblio/200015137/list/30","description":"","label":"30"},{"@id":"https://kotenseki.nijl.ac.jp/biblio/200015137/list/31","description":"","label":"31"}]},"label":"十二類絵巻","viewingDirection":"right-to-left"}})
  }

  if (url == 'range2.json') {
    return Promise.resolve({data:{"@context":"http://iiif.io/api/presentation/2/context.json","@id":"https://tomcrane.github.io/iiif-collector/objects/longer-article.json","@type":"sc:Range","contentLayer":{"@id":"https://tomcrane.github.io/iiif-collector/objects/longer-article-contentlayer","@type":"sc:Layer","label":"Content of 'A Profound Warrior For Us All' article","otherContent":["https://tomcrane.github.io/iiif-collector/objects/longer-article-annos1.json"]},"description":"<p><a href='https://d.lib.ncsu.edu/collections/catalog/nubian-message-1995-04-01#?c=0&m=0&s=0&cv=0&z=749.6929%2C3307.2622%2C4049.5239%2C3514.5534'>See this in place across two pages</a></p>","label":"A Profound Warrior For Us All"}})
  }

  if (url == 'recogito.json' || url == 'https://tomcrane.github.io/iiif-collector/objects/longer-article-annos1.json') {
    return Promise.resolve({data:[ { "@context" : "http://www.w3.org/ns/anno.jsonld", "id" : "https://recogito.pelagios.org/annotation/5350510e-65a9-46e9-b29c-e889695528f1", "type" : "Annotation", "generator" : { "id" : "https://recogito.pelagios.org/", "type" : "Software", "name" : "Recogito", "homepage" : "https://recogito.pelagios.org/" }, "generated" : "2019-11-15T16:44:23+00:00", "body" : [ { "type" : "TextualBody", "value" : "Lodinv", "creator" : "https://recogito.pelagios.org/rainer", "modified" : "2019-09-19T13:00:14+00:00", "purpose" : "transcribing" }, { "type" : "SpecificResource", "value" : "http://pleiades.stoa.org/places/79574", "creator" : "https://recogito.pelagios.org/rainer", "modified" : "2019-09-19T13:00:14+00:00", "purpose" : "identifying" } ], "target" : { "source" : "https://iiif.bodleian.ox.ac.uk/iiif/image/467a8da6-02b6-4643-a376-4b0afaff6ab7", "type" : "Image", "selector" : [ { "type" : "FragmentSelector", "conformsTo" : "http://www.w3.org/TR/media-frags/", "value" : "xywh=pixel:1958,1907,113,51" } ] } }, { "@context" : "http://www.w3.org/ns/anno.jsonld", "id" : "https://recogito.pelagios.org/annotation/5fbb23a4-db57-41bc-bec2-92a52454e4c7", "type" : "Annotation", "generator" : { "id" : "https://recogito.pelagios.org/", "type" : "Software", "name" : "Recogito", "homepage" : "https://recogito.pelagios.org/" }, "generated" : "2019-11-15T16:44:23+00:00", "body" : [ { "type" : "TextualBody", "value" : "MARE HIBERNICVM", "creator" : "https://recogito.pelagios.org/rainer", "modified" : "2019-11-15T08:08:45+00:00", "purpose" : "transcribing" } ], "target" : { "source" : "https://iiif.bodleian.ox.ac.uk/iiif/image/467a8da6-02b6-4643-a376-4b0afaff6ab7", "type" : "Image", "selector" : [ { "type" : "FragmentSelector", "conformsTo" : "http://www.w3.org/TR/media-frags/", "value" : "xywh=pixel:1537,579,382,352" } ] } }, { "@context" : "http://www.w3.org/ns/anno.jsonld", "id" : "https://recogito.pelagios.org/annotation/338c2d75-47d5-49d1-bccb-ce68966346cd", "type" : "Annotation", "generator" : { "id" : "https://recogito.pelagios.org/", "type" : "Software", "name" : "Recogito", "homepage" : "https://recogito.pelagios.org/" }, "generated" : "2019-11-15T16:44:23+00:00", "body" : [ { "type" : "TextualBody", "value" : "BRITANIA INSVLA", "creator" : "https://recogito.pelagios.org/rainer", "modified" : "2019-11-15T08:09:03+00:00", "purpose" : "transcribing" }, { "type" : "TextualBody", "value" : "The British Isles", "creator" : "https://recogito.pelagios.org/rainer", "modified" : "2019-11-15T08:09:03+00:00", "purpose" : "commenting" } ], "target" : { "source" : "https://iiif.bodleian.ox.ac.uk/iiif/image/467a8da6-02b6-4643-a376-4b0afaff6ab7", "type" : "Image", "selector" : [ { "type" : "FragmentSelector", "conformsTo" : "http://www.w3.org/TR/media-frags/", "value" : "xywh=pixel:1704,1509,319,123" } ] } } ]});
  }

  if (url === 'https://storiiies.cogapp.com/holbein/manifest.json') {
    return Promise.resolve({data: {
        "@context": "http://iiif.io/api/presentation/2/context.json",
        "@id": "https://storiiies.cogapp.com/holbein/manifest.json",
        "@type": "sc:Manifest",
        "label": {
          "@value": "Holbein's 'The Ambassadors'",
          "@language": "en"
        },
        "description": {
          "@value": "Let's explore some of the symbolism and features in this iconic painting",
          "@language": "en"
        },
        "viewingHint": "paged",
        "viewingDirection": "left-to-right",
        "attribution": "Copyright National Gallery, London; used under license.",
        "sequences": [
          {
            "@id": "https://storiiies.cogapp.com/holbein/sequence",
            "@type": "sc:Sequence",
            "canvases": [
              {
                "@context": "http://iiif.io/api/presentation/2/context.json",
                "@type": "sc:Canvas",
                "width": 30000,
                "height": 29560,
                "@id": "https://storiies.cogapp.com/holbein/canvas/c0",
                "label": {
                  "@value": "The Ambassadors",
                  "@language": "en"
                },
                "description": {
                  "@value": "The Ambassadors by Hans Holbein the Younger (National Gallery, London) was created in 1533, the year that Elizabeth I was born. A striking life-scale double portrait, it also depicts numerous meticulously rendered objects and includes a rare and much-cited example of anamorphosis. The meaning of the painting and the objects it depicts has been the cause of much debate.",
                  "@language": "en"
                },
                "images": [
                  {
                    "@type": "oa:Annotation",
                    "@id": "https://storiies.cogapp.com/holbein/image/i0",
                    "motivation": "sc:painting",
                    "on": "https://storiies.cogapp.com/holbein/canvas/c0",
                    "resource": {
                      "@id": "https://images.cogapp.com/iiif/holbein_big_p.tif/full/full/0/default.jpg",
                      "@type": "dctypes:Image",
                      "format": "image/jpeg",
                      "width": 30000,
                      "height": 29560,
                      "service": {
                        "@context": "http://iiif.io/api/image/2/context.json",
                        "profile": "http://iiif.io/api/image/1/level2.json",
                        "@id": "https://images.cogapp.com/iiif/holbein_big_p.tif"
                      }
                    }
                  }
                ],
                "otherContent": [
                  {
                    "@id": "https://storiiies.cogapp.com/holbein/annotations/list.json",
                    "@type": "sc:AnnotationList"
                  }
                ]
              }
            ]
          }
        ]
      
      
      }
      })
  }

  if (url === 'https://storiiies.cogapp.com/holbein/annotations/list.json') {
    return Promise.resolve({data: {
        "@context": "http://iiif.io/api/presentation/2/context.json",
        "@id": "https://storiiies.cogapp.com/holbein/annotations/list.json",
        "@type": "sc:AnnotationList",
        "resources": [
          {
            "@type": "oa:Annotation",
            "motivation": "sc:painting",
            "resource": {
              "@type": "cnt:ContentAsText",
              "format": "text/plain",
              "chars": "When this double portrait was painted, Jean de Dinteville, Seigneur de Polisy, was ambassador to London from the court of the French king, François I."
            },
            "on": "https://images.cogapp.com/iiif/holbein_big_p.tif#xywh=6270,3903,2250,2250"
          },
          {
            "@type": "oa:Annotation",
            "motivation": "sc:painting",
            "resource": {
              "@type": "cnt:ContentAsText",
              "format": "text/plain",
              "chars": "The globe (bottom shelf) marks Dinteville's château at Polisy."
            },
            "on": "https://images.cogapp.com/iiif/holbein_big_p.tif#xywh=12288,16567,2250,2250"
          },
          {
            "@type": "oa:Annotation",
            "motivation": "sc:painting",
            "resource": {
              "@type": "cnt:ContentAsText",
              "format": "text/plain",
              "chars": "His dagger sheath is inscribed in Latin 'aet. svae/29' (meaning aged 29)."
            },
            "on": "https://images.cogapp.com/iiif/holbein_big_p.tif#xywh=5310,14872,2250,2250"
          },
          {
            "@type": "oa:Annotation",
            "motivation": "sc:painting",
            "resource": {
              "@type": "cnt:ContentAsText",
              "format": "text/plain",
              "chars": "Georges de Selve, Bishop of Lavaur, visited Dinteville in London in spring 1533."
            },
            "on": "https://images.cogapp.com/iiif/holbein_big_p.tif#xywh=24266,4312,2250,2250"
          },
          {
            "@type": "oa:Annotation",
            "motivation": "sc:painting",
            "resource": {
              "@type": "cnt:ContentAsText",
              "format": "text/plain",
              "chars": "He leans on a book inscribed in Latin 'aet. svae/25' (meaning aged 25)."
            },
            "on": "https://images.cogapp.com/iiif/holbein_big_p.tif#xywh=19106,8865,2250,2250"
          },
          {
            "@type": "oa:Annotation",
            "motivation": "sc:painting",
            "resource": {
              "@id": "https://storiiies.cogapp.com/holbein/annotations/arms_of_death.jpg",
              "@type": "dctypes:Image",
              "format": "image/jpeg",
              "description": "Various elements in the picture are 'vanitas', reminders of mortality. Holbein also explored this theme in his woodcut series 'The Dance of Death'.",
              "attribution": "Courtesy National Gallery of Art, Washington"
            },
            "on": "https://images.cogapp.com/iiif/holbein_big_p.tif#xywh=19106,8865,2250,2250"
          },
          {
            "@type": "oa:Annotation",
            "motivation": "sc:painting",
            "resource": {
              "@type": "cnt:ContentAsText",
              "format": "text/plain",
              "chars": "The hat badge, skull and the broken lute string are all possibly vanitas elements. The crucifix may be a reminder of the Christian promise of resurrection."
            },
            "on": [
              "https://images.cogapp.com/iiif/holbein_big_p.tif#xywh=7188,2021,2250,2250",
              "https://images.cogapp.com/iiif/holbein_big_p.tif#xywh=7132,22158,14625,7500",
              "https://images.cogapp.com/iiif/holbein_big_p.tif#xywh=14805,18945,2250,2250"
            ]
          },
          {
            "@type": "oa:Annotation",
            "motivation": "sc:painting",
            "resource": {
              "@type": "cnt:ContentAsText",
              "format": "text/plain",
              "chars": "Scholarship and luxury: The floor is based on the famous (and mystically symbolic) Cosmati pavement in front of the main altar in Westminster Abbey."
            },
            "on": "https://images.cogapp.com/iiif/holbein_big_p.tif"
          },
          {
            "@type": "oa:Annotation",
            "motivation": "sc:painting",
            "resource": {
              "@type": "cnt:ContentAsText",
              "format": "text/plain",
              "chars": "The objects on the two shelves relate to heaven and earth respectively."
            },
            "on": [
              "https://images.cogapp.com/iiif/holbein_big_p.tif#xywh=10987,4312,11250,7125",
              "https://images.cogapp.com/iiif/holbein_big_p.tif#xywh=11737,15937,11250,5250"
            ]
          },
          {
            "@type": "oa:Annotation",
            "motivation": "sc:painting",
            "resource": {
              "@type": "cnt:ContentAsText",
              "format": "text/plain",
              "chars": "The celestial globe shows a map of the heavens. Constellations are shown as signs of the zodiac."
            },
            "on": "https://images.cogapp.com/iiif/holbein_big_p.tif#xywh=11587,5325,3562,3562"
          },
          {
            "@type": "oa:Annotation",
            "motivation": "sc:painting",
            "resource": {
              "@type": "cnt:ContentAsText",
              "format": "text/plain",
              "chars": "This sundial is an instrument for telling the time and date from the position of the sun."
            },
            "on": "https://images.cogapp.com/iiif/holbein_big_p.tif#xywh=14175,8062,937,2325"
          },
          {
            "@type": "oa:Annotation",
            "motivation": "sc:painting",
            "resource": {
              "@type": "cnt:ContentAsText",
              "format": "text/plain",
              "chars": "Expensive oriental rugs like this one were displayed on tables rather than floors."
            },
            "on": "https://images.cogapp.com/iiif/holbein_big_p.tif#xywh=14625,10125,9375,4500"
          },
          {
            "@type": "oa:Annotation",
            "motivation": "sc:painting",
            "resource": {
              "@type": "cnt:ContentAsText",
              "format": "text/plain",
              "chars": "The quadrant determines the user's geographical position."
            },
            "on": "https://images.cogapp.com/iiif/holbein_big_p.tif#xywh=15187,6937,3000,3375"
          },
          {
            "@type": "oa:Annotation",
            "motivation": "sc:painting",
            "resource": {
              "@type": "cnt:ContentAsText",
              "format": "text/plain",
              "chars": "This is a sundial in the form of a ten-sided polyhedron. There is a compass inset on the top face."
            },
            "on": "https://images.cogapp.com/iiif/holbein_big_p.tif#xywh=17700,8625,2250,2250"
          },
          {
            "@type": "oa:Annotation",
            "motivation": "sc:painting",
            "resource": {
              "@type": "cnt:ContentAsText",
              "format": "text/plain",
              "chars": "This complex instrument, a torquetum, is for measuring the position of stars and planets."
            },
            "on": "https://images.cogapp.com/iiif/holbein_big_p.tif#xywh=18937,4312,2250,4125"
          },
          {
            "@type": "oa:Annotation",
            "motivation": "sc:painting",
            "resource": {
              "@type": "cnt:ContentAsText",
              "format": "text/plain",
              "chars": "The globe shows Dinteville's chateau at Polisy."
            },
            "on": "https://images.cogapp.com/iiif/holbein_big_p.tif#xywh=12000,16125,3000,3000"
          },
          {
            "@type": "oa:Annotation",
            "motivation": "sc:painting",
            "resource": {
              "@type": "cnt:ContentAsText",
              "format": "text/plain",
              "chars": "A printed mathematical text book illustrating techniques for calculation with decimal numbers. The use of an explicit zero, shown in this example, was an important technical innovation."
            },
            "on": "https://images.cogapp.com/iiif/holbein_big_p.tif#xywh=12375,19200,2625,1500"
          },
          {
            "@type": "oa:Annotation",
            "motivation": "sc:painting",
            "resource": {
              "@type": "cnt:ContentAsText",
              "format": "text/plain",
              "chars": "A hymn book with German text by Martin Luther, the founder of the Reformation. "
            },
            "on": "https://images.cogapp.com/iiif/holbein_big_p.tif#xywh=16275,18562,4762,2062"
          },
          {
            "@type": "oa:Annotation",
            "motivation": "sc:painting",
            "resource": {
              "@type": "cnt:ContentAsText",
              "format": "text/plain",
              "chars": "The leather case has a lock and key. It contains flutes. One flute appears to be missing."
            },
            "on": "https://images.cogapp.com/iiif/holbein_big_p.tif#xywh=19500,18750,3000,3000"
          },
          {
            "@type": "oa:Annotation",
            "motivation": "sc:painting",
            "resource": {
              "@type": "cnt:ContentAsText",
              "format": "text/plain",
              "chars": "One of the lute strings is broken."
            },
            "on": "https://images.cogapp.com/iiif/holbein_big_p.tif#xywh=14531,19050,3000,3000"
          },
          {
            "@type": "oa:Annotation",
            "motivation": "sc:painting",
            "resource": {
              "@type": "cnt:ContentAsText",
              "format": "text/plain",
              "chars": "The distorted image - or anamorphosis - of the skull comes into focus from a point to the right of the picture."
            },
            "on": "https://images.cogapp.com/iiif/holbein_big_p.tif#xywh=7132,22158,14625,7500"
          }
        ]
      }      
      })
  }

  if (url === 'https://stephenwf.github.io/ocean-liners.json') {
    return Promise.resolve({data: {
      "@context": [
        "http://iiif.io/api/presentation/3/context.json",
        "http://www.w3.org/ns.anno.jsonld"
      ],
      "id": "https://iiif.vam.ac.uk/collections/O1023003/manifest.json",
      "type": "Manifest",
      "viewingDirection": "left-to-right",
      "behavior": [
        "individuals"
      ],
      "items": [
        {
          "items": [
            {
              "items": [
                {
                  "body": {
                    "service": [
                      {
                        "profile": "level1",
                        "type": "ImageService2",
                        "id": "https://framemark.vam.ac.uk/collections/2013GU2911"
                      }
                    ],
                    "format": "image/jpeg",
                    "height": 6000,
                    "width": 3788,
                    "type": "Image",
                    "id": "https://framemark.vam.ac.uk/collections/2013GU2911/full/full/0/default.jpg"
                  },
                  "motivation": "painting",
                  "type": "Annotation",
                  "target": "https://iiif.vam.ac.uk/collections/O1023003/canvas/c0"
                }
              ],
              "type": "AnnotationPage"
            }
          ],
          "label": {
            "en": [
              "Object image 0"
            ]
          },
          "width": 3788,
          "height": 6000,
          "type": "Canvas",
          "id": "https://iiif.vam.ac.uk/collections/O1023003/canvas/c0",
          "annotations": [
            {
              "id": "https://iiif.vam.ac.uk/collections/O1023003/annopage/p1",
              "type": "AnnotationPage",
              "items": [
                {
                  "id": "https://iiif.vam.ac.uk/collections/O1023003/annopage/p1/a1",
                  "type": "Annotation",
                  "motivation": "describing",
                  "body": {
                    "type": "TextualBody",
                    "value": "<h2 class=\"annotatedzoom-annotation-detail__label\">First-class lounge</h2><div class=\"annotatedzoom-annotation-detail__content\"><img class=\"annotatedzoom-annotation-detail__image\" src=\"https://media.vam.ac.uk/feature/annotatedzoom/O1023003/Aquitania-lounge-drawing-room-cropped.jpg\" width=300 height=250/><p>First-class public rooms were located in the centre of the ship &mdash; the most stable and comfortable areas on board. The <i>Aquitania</i>'s opulent interiors were inspired by classical architecture &ndash; spot the Ionic columns in the lounge. Architect Arthur Davis recommended the use of plaster and papier-m&acirc;ch&eacute; for ceilings, domes, and other decorative moulding, but advised against using marble and brickwork, as these would make the ship top-heavy.</p><p class=\"annotatedzoom-annotation-detail__credit\">Photograph from <em>The New Art of Going Abroad</em>, 1929, US. National Art Library: 38041986015030. &copy; Victoria and Albert Museum, London</p></div>",
                    "format": "text/html"
                  },
                  "target": {
                    "id": "https://iiif.vam.ac.uk/collections/O1023003/canvas/c0#xywh=1800,2000,500,500",
                    "type": "Canvas"
                  }
                },
                {
                  "id": "https://iiif.vam.ac.uk/collections/O1023003/annopage/p1/a2",
                  "type": "Annotation",
                  "motivation": "describing",
                  "body": {
                    "type": "TextualBody",
                    "value": "<h2 class=\"annotatedzoom-annotation-detail__label\">Garden lounge</h2><div class=\"annotatedzoom-annotation-detail__content\"><img class=\"annotatedzoom-annotation-detail__image\" src=\"https://media.vam.ac.uk/feature/annotatedzoom/O1023003/2017KE6202-Aquitania-Garden-Lounge-cropped.jpg\" width=300 height=250/><p>&ldquo;As cool, as restful, as any terrace overlooking a rose-garden.&rdquo; (<i>The New Art of Going Abroad</i>, 1929). Overlooking the sea and decorated with palms, the garden lounge was a fashionable place to have tea and was sometimes used for dancing.</p><p class=\"annotatedzoom-annotation-detail__credit\">Photograph from <em>The New Art of Going Abroad</em>, 1929, US. National Art Library: 38041986015030. &copy; Victoria and Albert Museum, London</p></div>",
                    "format": "text/html"
                  },
                  "target": {
                    "id": "https://iiif.vam.ac.uk/collections/O1023003/canvas/c0#xywh=3000,2100,100,200",
                    "type": "Canvas"
                  }
                },
                {
                  "id": "https://iiif.vam.ac.uk/collections/O1023003/annopage/p1/a3",
                  "type": "Annotation",
                  "motivation": "describing",
                  "body": {
                    "type": "TextualBody",
                    "value": "<h2 class=\"annotatedzoom-annotation-detail__label\">First-class restaurant</h2><div class=\"annotatedzoom-annotation-detail__content\"><img class=\"annotatedzoom-annotation-detail__image\" src=\"https://media.vam.ac.uk/feature/annotatedzoom/O1023003/2017KE6204-Aquitania-restaurant-cropped.jpg\" width=300 height=250/><p>Dining on ocean liners was a radically different experience depending on the class of travel. In first class, the <i>Aquitania</i>&#39;s Louis XVI-style dining room offered seating in small isolated groups, echoing elegant restaurants on land. The ship&#39;s architect, Arthur Davis, explained that a &ldquo;cheerful room with comfortable surroundings&rdquo; was a necessary distraction from &ldquo;the often very unpleasant conditions&rdquo; at sea. </p><p class=\"annotatedzoom-annotation-detail__credit\">Photograph from <em>The New Art of Going Abroad</em>, 1929, US. National Art Library: 38041986015030. &copy; Victoria and Albert Museum, London</p></div>",
                    "format": "text/html"
                  },
                  "target": {
                    "id": "https://iiif.vam.ac.uk/collections/O1023003/canvas/c0#xywh=2000,2800,400,400",
                    "type": "Canvas"
                  }
                },
                {
                  "id": "https://iiif.vam.ac.uk/collections/O1023003/annopage/p1/a4",
                  "type": "Annotation",
                  "motivation": "describing",
                  "body": {
                    "type": "TextualBody",
                    "value": "<h2 class=\"annotatedzoom-annotation-detail__label\">First-class state room</h2><div class=\"annotatedzoom-annotation-detail__content\"><img class=\"annotatedzoom-annotation-detail__image\" src=\"https://media.vam.ac.uk/feature/annotatedzoom/O1023003/2017KE6205-state-rooms-on-B-deck-+-D-deck-cropped.jpg\" width=300 height=250/><p>The <i>Aquitania</i>&#39;s first-class cabins were designed by architect Arthur Davis, whose firm, Mew&egrave;s and Davis Architects, had decorated the famously opulent Ritz hotels in Paris and London. The cabins were &ldquo;as spacious as a bedroom at the Ritz or the Barclay. The walls are panelled in grey silk. The carpets are vibrant blue and yellow, as are also the striped silk chair coverings. Note the bath &mdash; just off-stage, and the electric heater&rdquo;. (<i>The New Art of Going Abroad</i>, 1929).</p><p class=\"annotatedzoom-annotation-detail__credit\">Photograph from <em>The New Art of Going Abroad</em>, 1929, US. National Art Library: 38041986015030. &copy; Victoria and Albert Museum, London</p></div>",
                    "format": "text/html"
                  },
                  "target": {
                    "id": "https://iiif.vam.ac.uk/collections/O1023003/canvas/c0#xywh=1400,2500,100,200",
                    "type": "Canvas"
                  }
                },
                {
                  "id": "https://iiif.vam.ac.uk/collections/O1023003/annopage/p1/a5",
                  "type": "Annotation",
                  "motivation": "describing",
                  "body": {
                    "type": "TextualBody",
                    "value": "<h2 class=\"annotatedzoom-annotation-detail__label\">Third-class dining saloon</h2><div class=\"annotatedzoom-annotation-detail__content\"><p>While extravagant dishes and refined delicacies were served in first class, third-class meals were less sophisticated. A third-class lunch on a Cunard ship in the 1920s could include rice soup, boiled haddock or braised beef with cabbage, boiled potatoes, bread and &lsquo;cabin biscuits&rsquo;, followed by bread and butter pudding. To save space, passengers sat at long communal tables on chairs bolted to the floor, in case of bad weather.</p></div>",
                    "format": "text/html"
                  },
                  "target": {
                    "id": "https://iiif.vam.ac.uk/collections/O1023003/canvas/c0#xywh=2450,3800,100,200",
                    "type": "Canvas"
                  }
                },
                {
                  "id": "https://iiif.vam.ac.uk/collections/O1023003/annopage/p1/a6",
                  "type": "Annotation",
                  "motivation": "describing",
                  "body": {
                    "type": "TextualBody",
                    "value": "<h2 class=\"annotatedzoom-annotation-detail__label\">Third-class four berth room</h2><div class=\"annotatedzoom-annotation-detail__content\"><p>Liners were strictly organised spaces which reflected social hierarchies. Although people travelling in third class could account for 60% of the total number of passengers, they were segregated into a relatively small space in the lower decks of the ship, close to the noisy engine room. These four-berth rooms had none of the luxurious furnishings or fabrics found in first class, but they were an improvement on the communal sleeping quarters provided for steerage-class passengers on earlier liners.</p></div>",
                    "format": "text/html"
                  },
                  "target": {
                    "id": "https://iiif.vam.ac.uk/collections/O1023003/canvas/c0#xywh=800,3500,100,200",
                    "type": "Canvas"
                  }
                },
                {
                  "id": "https://iiif.vam.ac.uk/collections/O1023003/annopage/p1/a7",
                  "type": "Annotation",
                  "motivation": "describing",
                  "body": {
                    "type": "TextualBody",
                    "value": "<h2 class=\"annotatedzoom-annotation-detail__label\">Boiler room</h2><div class=\"annotatedzoom-annotation-detail__content\"><p>In 1919 the <i>Aquitania</i> was refitted and converted from coal-burning to oil-burning engines, which meant fewer crew were required to labour in the engine room.</p></div>",
                    "format": "text/html"
                  },
                  "target": {
                    "id": "https://iiif.vam.ac.uk/collections/O1023003/canvas/c0#xywh=2500,4500,500,800",
                    "type": "Canvas"
                  }
                },
                {
                  "id": "https://iiif.vam.ac.uk/collections/O1023003/annopage/p1/a8",
                  "type": "Annotation",
                  "motivation": "describing",
                  "body": {
                    "type": "TextualBody",
                    "value": "<h2 class=\"annotatedzoom-annotation-detail__label\">Stores</h2><div class=\"annotatedzoom-annotation-detail__content\"><p>Ocean liners required huge quantities of food, enough for all crew and passengers &mdash; the equivalent to feeding a floating city. Cunard catered for varied tastes. Provisions for one trip included 500 sheep kidneys, 400 ox tails, 800 tongues and large quantities of frogs&#39; legs, as well as geese, turkey, duck, game and &ldquo;75 heads of cattle and calfs&rdquo;.</p></div>",
                    "format": "text/html"
                  },
                  "target": {
                    "id": "https://iiif.vam.ac.uk/collections/O1023003/canvas/c0#xywh=3000,4000,100,200",
                    "type": "Canvas"
                  }
                },
                {
                  "id": "https://iiif.vam.ac.uk/collections/O1023003/annopage/p1/a9",
                  "type": "Annotation",
                  "motivation": "describing",
                  "body": {
                    "type": "TextualBody",
                    "value": "<h2 class=\"annotatedzoom-annotation-detail__label\">Baggage</h2><div class=\"annotatedzoom-annotation-detail__content\"><p>Passengers travelling for weeks or months would bring a huge number of trunks, most of which were kept in the baggage store deep in the hull of the ship. Cabins could only accommodate smaller trunks. Louis Vuitton designed the &lsquo;steamer trunk&rsquo; specifically to fit under a first-class cabin bed. The baggage store was opened daily so that maids or stewards could collect personal items that were needed during the voyage.</p></div>",
                    "format": "text/html"
                  },
                  "target": {
                    "id": "https://iiif.vam.ac.uk/collections/O1023003/canvas/c0#xywh=2100,4000,100,200",
                    "type": "Canvas"
                  }
                },
                {
                  "id": "https://iiif.vam.ac.uk/collections/O1023003/annopage/p1/a10",
                  "type": "Annotation",
                  "motivation": "describing",
                  "body": {
                    "type": "TextualBody",
                    "value": "<h2 class=\"annotatedzoom-annotation-detail__label\">Second-class dining saloon</h2><div class=\"annotatedzoom-annotation-detail__content\"><p>The second-class spaces, like first class, were decorated in a neo-classical style. &ldquo;The second-class accommodation on the vessel, though not so sumptuous as the first-class, is still very elaborate and comfortable&rdquo;, explained the architect. &ldquo;The dining-room, no less than 104 ft in length and extending across the whole width of the ship, is decorated with paintings adapted from panels by Pergolesi&rdquo;&mdash; the 18th-century decorative artist. (Arthur Davis, <i>The Architectural Review</i>, April 1914)</p></div>",
                    "format": "text/html"
                  },
                  "target": {
                    "id": "https://iiif.vam.ac.uk/collections/O1023003/canvas/c0#xywh=1500,3250,100,200",
                    "type": "Canvas"
                  }
                }
              ]
            }
          ]
        }
      ],
      "label": {
        "en": [
          "Cunard Line - to all parts of the world"
        ]
      },
      "metadata": [
        {
          "value": {
            "en": [
              "E.1829-2004"
            ]
          },
          "label": {
            "en": [
              "Museum number"
            ]
          }
        },
        {
          "value": {
            "en": [
              "Cunard Line - to all parts of the world"
            ]
          },
          "label": {
            "en": [
              "title"
            ]
          }
        },
        {
          "value": {
            "en": [
              "Chromolithograph travel poster for \"Cunard Line - to all parts of the world\", depicting a cross section of the Aquitania at sea, printed by Thos. Forman & Sons, Nottingham, ca. 1920."
            ]
          },
          "label": {
            "en": [
              "Descriptive Line"
            ]
          }
        },
        {
          "value": {
            "en": [
              "PDP"
            ]
          },
          "label": {
            "en": [
              "Collection"
            ]
          }
        },
        {
          "value": {
            "en": [
              "Nottingham (printed)"
            ]
          },
          "label": {
            "en": [
              "Place"
            ]
          }
        },
        {
          "value": {
            "en": [
              "chromolithograph"
            ]
          },
          "label": {
            "en": [
              "Materials & Techniques"
            ]
          }
        },
        {
          "value": {
            "en": [
              "ca. 1920 (made)"
            ]
          },
          "label": {
            "en": [
              "Date"
            ]
          }
        },
        {
          "value": {
            "en": [
              "Posters;Boats and ships;Tourism & Travel"
            ]
          },
          "label": {
            "en": [
              "Categories"
            ]
          }
        },
        {
          "value": {
            "en": [
              "Chromolithograph travel poster for \"Cunard Line - to all parts of the world\", depicting a cross section of the Aquitania at sea, printed by Thos. Forman & Sons, Nottingham, ca. 1920."
            ]
          },
          "label": {
            "en": [
              "Description"
            ]
          }
        }
      ],
      "seeAlso": [
        {
          "type": "Dataset",
          "id": "https://collections.vam.ac.uk/item/O1023003.jsonld",
          "@format": "application/ld+json"
        }
      ]
    }})
  }

  if (url === 'regular.json') {
    return Promise.resolve({data: {"@type": "AnnotationPage", "resources": [{"created": "2019-08-27T22:46:51.967Z", "creator": ["mary"], "type": "Annotation", "body": [{"type": "TextualBody", "value": "", "format": "text/html", "selector": {"type": "FragmentSelector", "value": "rect"}}, {"type": "TextualBody", "purpose": "tagging", "value": "Dome", "format": "text/plain"}, {"type": "TextualBody", "purpose": "tagging", "value": "cathedral", "format": "text/plain"}], "@id": "https://dnoneill.github.io/annotate/annotations/9472d2d2-c91c-11e9-bda2-5ad66088c379.json", "target": {"type": "Image", "id": "/annotate/assets/images/custom/spencer-davis-7ZpvOE2psxM-unsplash.jpg#xywh=650,1525,1044,997"}, "@context": "http://www.w3.org/ns/anno.jsonld"}], "created": "2019-08-27T22:46:51.967Z", "@context": "http://www.w3.org/ns/anno.jsonld", "id": "https://dnoneill.github.io/annotate/annotations/9472d2d2-c91c-11e9-bda2-5ad66088c379.json-list.json"}})
  }

  if (url === 'cssnestedtags.json'){
    return Promise.resolve({data: {"@context": "http://www.w3.org/ns/anno.jsonld",
    "items": [
      {
        "@context": "http://www.w3.org/ns/anno.jsonld",
        "body": [
          {
            "created": "2020-09-11T19:20:20.932Z",
            "creator": "testuser",
            "modified": "2020-09-11T19:20:20.932Z",
            "purpose": "tagging",
            "type": "Dataset",
            "value": {
              "group": "Points",
              "value": "3"
            }
          }
        ],
        "stylesheet": {
          "type": "CssStylesheet",
          "value": ".tag .points {color: blue;}"
        },
        "target": {
          "id": "/image/",
          "selector": {
            "conformsTo": "http://www.w3.org/TR/SVG/",
            "type": "SvgSelector",
            "value": "<svg><polygon points=\"2230.0,1596.5 2224.5,1596.0 2224.5,1572.0 2209.5,1575.0 2210.0,1286.5 2218.0,1286.5 2231.5,1290.0 2232.5,1312.0 2240.0,1317.5 2247.5,1318.0 2248.0,1293.5 2275.5,1305.0 2274.5,1567.0 2257.0,1567.5 2240.0,1571.5 2239.5,1593.0 2230.0,1596.5\"></polygon></svg>"
          },
          "styleClass": "tag"
        },
        "type": "Annotation"
      },
      {
        "@context": "http://www.w3.org/ns/anno.jsonld",
        "body": [
          {
            "created": "2020-09-11T19:20:20.932Z",
            "creator": "testuser",
            "modified": "2020-09-11T19:20:20.932Z",
            "purpose": "tagging",
            "type": "Dataset",
            "value": {
              "group": "Points",
              "value": "5"
            }
          }
        ],
        "stylesheet": {
          "type": "CssStylesheet",
          "value": ".tag .points {color: blue;}"
        },
        "target": {
          "id": "/image/",
          "selector": {
            "conformsTo": "http://www.w3.org/TR/SVG/",
            "type": "SvgSelector",
            "value": "<svg><polygon points=\"2230.0,1596.5 2224.5,1596.0 2224.5,1572.0 2209.5,1575.0 2210.0,1286.5 2218.0,1286.5 2231.5,1290.0 2232.5,1312.0 2240.0,1317.5 2247.5,1318.0 2248.0,1293.5 2275.5,1305.0 2274.5,1567.0 2257.0,1567.5 2240.0,1571.5 2239.5,1593.0 2230.0,1596.5\"></polygon></svg>"
          },
          "styleClass": "tag"
        },
        "type": "Annotation"
      }]}})
  }

  if (url === 'cssnestedandnonested.json'){
    return Promise.resolve({data: {"@context": "http://www.w3.org/ns/anno.jsonld",
    "items": [
      {
        "@context": "http://www.w3.org/ns/anno.jsonld",
        "body": [
          {
            "created": "2020-09-11T19:20:20.932Z",
            "creator": "testuser",
            "modified": "2020-09-11T19:20:20.932Z",
            "purpose": "tagging",
            "type": "Dataset",
            "value": {
              "group": "Points",
              "value": "3"
            }
          }
        ],
        "stylesheet": {
          "type": "CssStylesheet",
          "value": ".tag .points {color: blue;}"
        },
        "target": {
          "id": "/image/",
          "selector": {
            "conformsTo": "http://www.w3.org/TR/SVG/",
            "type": "SvgSelector",
            "value": "<svg><polygon points=\"2230.0,1596.5 2224.5,1596.0 2224.5,1572.0 2209.5,1575.0 2210.0,1286.5 2218.0,1286.5 2231.5,1290.0 2232.5,1312.0 2240.0,1317.5 2247.5,1318.0 2248.0,1293.5 2275.5,1305.0 2274.5,1567.0 2257.0,1567.5 2240.0,1571.5 2239.5,1593.0 2230.0,1596.5\"></polygon></svg>"
          },
          "styleClass": "tag"
        },
        "type": "Annotation"
      },
      {
        "@context": "http://www.w3.org/ns/anno.jsonld",
        "body": [
          {
            "created": "2020-09-11T19:20:20.932Z",
            "creator": "testuser",
            "modified": "2020-09-11T19:20:20.932Z",
            "purpose": "tagging",
            "type": "TextualBody",
            "value": "test variable"
          }
        ],
        "target": {
          "id": "/image/",
          "selector": {
            "conformsTo": "http://www.w3.org/TR/SVG/",
            "type": "SvgSelector",
            "value": "<svg><polygon points=\"2230.0,1596.5 2224.5,1596.0 2224.5,1572.0 2209.5,1575.0 2210.0,1286.5 2218.0,1286.5 2231.5,1290.0 2232.5,1312.0 2240.0,1317.5 2247.5,1318.0 2248.0,1293.5 2275.5,1305.0 2274.5,1567.0 2257.0,1567.5 2240.0,1571.5 2239.5,1593.0 2230.0,1596.5\"></polygon></svg>"
          },
          "styleClass": "tag"
        },
        "type": "Annotation"
      }]}})
  }
  if (url === 'bees2.json'){
    return Promise.reject()
  }
})
}
