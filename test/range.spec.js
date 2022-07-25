import Vue from 'vue'
//import index from 'karma-chai'
import { mount } from '@vue/test-utils';
import { shallowMount } from '@vue/test-utils';
import '@babel/polyfill'
import rangestoryboard from '../src/components/rangestoryboard.vue';
import shared from '../src/components/shared.js'

import flushPromises from 'flush-promises';
let consoleSpy;


describe('Component', () => {
  beforeEach(() => {
    window.SVGElement.prototype.getBBox = () => ({
      x: 740,
      y: 566, 
      width: 3997,
      height: 4586
      // whatever other props you need
    });
    const div = document.createElement('div')
    div.id = 'root';
    document.body.appendChild(div)
  })
    test('test range list', async ()  => {
      const wrapper =  shallowMount(rangestoryboard,{
        propsData: {
          rangeurl: 'range.json'
        },
        attachTo: '#root'
      })
      
      await wrapper.vm.$nextTick()
      await flushPromises()
      var data = wrapper.vm.$data
      expect(data.tags).toBe(false)
      expect(data.layerslist).toBe(false)
      expect(wrapper.isws).toBe(undefined)
      expect(data.range).toBe(true)
      expect(data.langs).toEqual([])
      expect(data.toctitle).toEqual("Range Pages")
      expect(data.stylingstring).toEqual("autorun_interval:3;title:十二類絵巻: 1;")
      expect(data.annotationurl).toEqual({"anno": "https://kotenseki.nijl.ac.jp/biblio/200015137/list/1", "canvas": {"within": "https://kotenseki.nijl.ac.jp/biblio/200015137/manifest"}, "images": "", "jsonanno": undefined, "manifest": "https://kotenseki.nijl.ac.jp/biblio/200015137/manifest", "section": undefined, "title": "1", "otherLists": false})
      expect(data.rangelist.length).toEqual(28)
      expect(data.position).toEqual(0)
      expect(data.prevPageInactive).toBe(true)
      expect(data.nextPageInactive).toBe(false)
      expect(data.rangeid).toBe('rangestoryboard_range.json')
      expect(data.customlayers).toEqual('')
      expect(data.isfullscreen).toBe(false)
      expect(data.toc).toEqual([{"description": "", "label": "1", "position": 0}, {"description": "", "label": "4", "position": 1}, {"description": "", "label": "5", "position": 2}, {"description": "", "label": "6", "position": 3}, {"description": "", "label": "7", "position": 4}, {"description": "", "label": "8", "position": 5}, {"description": "", "label": "9", "position": 6}, {"description": "", "label": "10", "position": 7}, {"description": "", "label": "11", "position": 8}, {"description": "", "label": "12", "position": 9}, {"description": "", "label": "13", "position": 10}, {"description": "", "label": "14", "position": 11}, {"description": "", "label": "15", "position": 12}, {"description": "", "label": "16", "position": 13}, {"description": "", "label": "17", "position": 14}, {"description": "", "label": "18", "position": 15}, {"description": "", "label": "20", "position": 16}, {"description": "", "label": "21", "position": 17}, {"description": "", "label": "22", "position": 18}, {"description": "", "label": "23", "position": 19}, {"description": "", "label": "24", "position": 20}, {"description": "", "label": "25", "position": 21}, {"description": "", "label": "26", "position": 22}, {"description": "", "label": "27", "position": 23}, {"description": "", "label": "28", "position": 24}, {"description": "", "label": "29", "position": 25}, {"description": "", "label": "30", "position": 26}, {"description": "", "label": "31", "position": 27}])
      expect(data.viewingDirection).toBe('rtl')
      expect(data.rangetitle).toEqual('十二類絵巻')
      wrapper.destroy()
    })

    test('test range list without canvases', async ()  => {
      const wrapper =  shallowMount(rangestoryboard,{
        propsData: {
          rangeurl: 'range2.json'
        },
        attachTo: '#root'
      })
      
      await wrapper.vm.$nextTick()
      await flushPromises()
      var data = wrapper.vm.$data
      expect(data.tags).toBe(false)
      expect(data.layerslist).toBe(false)
      expect(data.isws).toBe("")
      expect(data.range).toBe(true)
      expect(data.langs).toEqual([])
      expect(data.toctitle).toEqual("Range Pages")
      expect(data.stylingstring).toEqual("autorun_interval:3;title:A Profound Warrior For Us All;")
      expect(data.annotationurl).toEqual({"anno": "https://tomcrane.github.io/iiif-collector/objects/longer-article-annos1.json", "otherLists": false, "canvas": undefined, "images": "", "jsonanno": undefined, "manifest": "", "section": undefined, "title": "Page 1"})
      expect(data.position).toEqual(0)
      expect(data.prevPageInactive).toBe(true)
      expect(data.nextPageInactive).toBe(true)
      expect(data.rangeid).toBe('rangestoryboard_range2.json')
      expect(data.customlayers).toEqual('')
      expect(data.isfullscreen).toBe(false)
      expect(data.toc).toEqual([{"description": "", "label": "Page 1", "position": 0}])
      expect(data.viewingDirection).toBe('ltr')
      expect(data.rangetitle).toEqual('A Profound Warrior For Us All')
      wrapper.destroy()
    })

    test('test range list without canvases and settings', async ()  => {
      const wrapper =  mount(rangestoryboard,{
        propsData: {
          rangeurl: 'range2.json',
          layers: '[{"label":"View from Arles", "xywh": "200,200,4750,6513", "image":"https://tools.wmflabs.org/zoomviewer/iipsrv.fcgi/?iiif=cache/8937e1777945b722457fac2cde0cf61b.tif/info.json"}]',
          ws: "wss://echo",
          styling: "autorun_interval:4; panorzoom: pan"
        },
        attachTo: '#root'
      })
      await wrapper.vm.$nextTick()
      await flushPromises()
      var data = wrapper.vm.$data;
      expect(data.tags).toBe(false)
      expect(data.layerslist).toBe(false)
      expect(data.isws).toBe("wss://echo")
      expect(data.range).toBe(true)
      expect(data.langs).toEqual([])
      expect(data.toctitle).toEqual("Range Pages")
      expect(data.stylingstring).toEqual("autorun_interval:4;panorzoom:pan;title:A Profound Warrior For Us All;")
      expect(data.annotationurl).toEqual({"anno": "https://tomcrane.github.io/iiif-collector/objects/longer-article-annos1.json", "otherLists": false, "canvas": undefined, "images": "", "jsonanno": undefined, "manifest": "", "section": undefined, "title": "Page 1"})
      expect(data.position).toEqual(0)
      expect(data.prevPageInactive).toBe(true)
      expect(data.nextPageInactive).toBe(true)
      expect(data.rangeid).toBe('rangestoryboard_range2.json')
      expect(data.customlayers).toEqual('[{"label":"View from Arles", "xywh": "200,200,4750,6513", "image":"https://tools.wmflabs.org/zoomviewer/iipsrv.fcgi/?iiif=cache/8937e1777945b722457fac2cde0cf61b.tif/info.json"}]')
      expect(data.isfullscreen).toBe(false)
      expect(data.toc).toEqual([{"description": "", "label": "Page 1", "position": 0}])
      expect(data.viewingDirection).toBe('ltr')
      expect(data.rangetitle).toBe("A Profound Warrior For Us All")
      var sbd = wrapper.vm.$children[0].$el['__vue__']._data;
      expect(sbd.seadragontile).toEqual("https://iiif.bodleian.ox.ac.uk/iiif/image/467a8da6-02b6-4643-a376-4b0afaff6ab7/info.json")
      expect(sbd.position).toBe(-1);
      expect(sbd.seadragonid).toBe("storyboard_objects_longer-article-annos1");
      expect(sbd.annotations).toEqual([{"section": ["1958,1907,113,51"], "geometry": {"coordinates": [-75.87877, 5.6561], "type": "Point"}, "svg_path": [undefined], "authors": "", "label": undefined, "language": undefined, "languages": undefined, "ocr": ["Lodinv<div class=\"authorship\">Written by: https://recogito.pelagios.org/rainer</div>"], "styles": "", "itemclass": "", "stylesheet": undefined, "tags": [], "textual_body": ["<div class=\"identifying\">http://pleiades.stoa.org/places/79574<div class=\"authorship\">Written by: https://recogito.pelagios.org/rainer</div></div>"], "type": "rect"}, 
        {"styles": "", "itemclass": "", "stylesheet": undefined, "section": ["1537,579,382,352"], "svg_path": [undefined], "authors": "", "label": undefined, "language": undefined, "languages": undefined, "ocr": ["MARE HIBERNICVM<div class=\"authorship\">Written by: https://recogito.pelagios.org/rainer</div>"], "tags": [], "textual_body": [], "type": "rect"}, 
        {"section": ["1704,1509,319,123"], "styles": "", "itemclass": "", "stylesheet": undefined, "svg_path": [undefined], "authors": "", "label": undefined, "language": undefined, "languages": undefined, "ocr": ["BRITANIA INSVLA<div class=\"authorship\">Written by: https://recogito.pelagios.org/rainer</div>"], "tags": [], "textual_body": ["<div class=\"commenting\">The British Isles<div class=\"authorship\">Written by: https://recogito.pelagios.org/rainer</div></div>"], "type": "rect"}]);
      expect(sbd.currentanno).toBe("");
      expect(sbd.transcription).toBe(undefined);
      expect(sbd.textposition).toBe("corner");
      expect(sbd.prev_inactive).toBe(true);
      expect(sbd.next_inactive).toBe(false);
      expect(sbd.toolbar_id).toBe("");
      expect(sbd.booleanitems).toEqual({"additionalinfoshown": false, "annoinfoshown": false, "imageinfoshown": false, "isexcerpt": false, "isoverlaytoggled": false, "istextoverlaytoggled": false, "istranscription": false, "tocshown": false, "collectioninfoshown": false});
      expect(sbd.shown).toBe(false);
      expect(sbd.mapmarker).toBe("<i class=\"fas fa-map-marker-alt map-marker\"></i>");
      expect(sbd.isautorunning).toBe("");
      expect(sbd.settings).toEqual({"autorun_interval": 4, "panorzoom": "pan", "title": "A Profound Warrior For Us All", "truncate_length": 2});
      expect(sbd.currentlang).toBe("");
      expect(sbd.languages).toEqual([]);
      expect(sbd.fullscreen).toBe(false);
      expect(sbd.tagslist).toEqual({});
      expect(sbd.imageinfo).toEqual({"label": "Image information", "text": "<div id=\"imageurl\"><b>Image URL: </b><a href=\"https://iiif.bodleian.ox.ac.uk/iiif/image/467a8da6-02b6-4643-a376-4b0afaff6ab7/info.json\" target=\"_blank\">https://iiif.bodleian.ox.ac.uk/iiif/image/467a8da6-02b6-4643-a376-4b0afaff6ab7/info.json</a></div>"});
      expect(sbd.imagetitle).toBe("A Profound Warrior For Us All");
      expect(sbd.layerslist).toEqual([{"checked": true, "label": "Layer 1", "opacity": 1, "tile": "https://iiif.bodleian.ox.ac.uk/iiif/image/467a8da6-02b6-4643-a376-4b0afaff6ab7/info.json"}, {"checked": false, "label": "View from Arles", "opacity": 0, "rotation": 0, "section": "", "tile": "https://tools.wmflabs.org/zoomviewer/iipsrv.fcgi/?iiif=cache/8937e1777945b722457fac2cde0cf61b.tif/info.json", "xywh": ["200", "200", "4750", "6513"]}]);
      expect(Object.keys(sbd.shortcuts).sort()).toEqual(['autorun', 'reload', 'textoverlay', 'close', 'fullscreen', 'hide', 'home', 'info', 'layers', 'next', 'overlay', 'prev', 'keyboard', 'transcription', 'zoomin', 'zoomout'].sort());
      wrapper.destroy()
    })

    test('test manifesturl range', async ()  => {
      const wrapper =  mount(rangestoryboard,{
        propsData: {
          rangeurl: 'https://d.lib.ncsu.edu/collections/catalog/technician-basketballspecial-1991-11/manifest'
        },
        attachTo: '#root'
      });
      
      await wrapper.vm.$nextTick()
      await flushPromises()
      var data = wrapper.vm.$data
      expect(data.tags).toBe(false)
      expect(data.layerslist).toBe(false)
      expect(data.range).toBe(true)
      expect(data.toctitle).toEqual("Range Pages")
      expect(data.stylingstring).toEqual("perpage:1;continousboard:true;autorun_interval:3;title:Technician Basketball Special, November 1991: [1]: Text of this page (word level) / Text of this page (line level) / Text of this page (paragraph level);")
      // expect(data.annotationurl).toEqual({"anno": "https://ocr.lib.ncsu.edu/ocr/te/technician-basketballspecial-1991-11_0001/technician-basketballspecial-1991-11_0001-annotation-list-word.json", "annotationurls": "https://ocr.lib.ncsu.edu/ocr/te/technician-basketballspecial-1991-11_0001/technician-basketballspecial-1991-11_0001-annotation-list-word.json", "canvas": "https://d.lib.ncsu.edu/collections/canvas/technician-basketballspecial-1991-11_0001", "images": {"@id": "https://d.lib.ncsu.edu/collections/canvas/technician-basketballspecial-1991-11_0001", "@type": "sc:Canvas", "height": 4356, "images": [{"@id": "https://d.lib.ncsu.edu/collections/canvas/technician-basketballspecial-1991-11_0001/image", "@type": "oa:Annotation", "motivation": "sc:painting", "on": "https://d.lib.ncsu.edu/collections/canvas/technician-basketballspecial-1991-11_0001", "resource": {"@id": "https://iiif.lib.ncsu.edu/iiif/technician-basketballspecial-1991-11_0001/full/1170,/0/default.jpg", "@type": "dctypes:Image", "height": 4356, "service": {"@context": "http://iiif.io/api/image/2/context.json", "@id": "https://iiif.lib.ncsu.edu/iiif/technician-basketballspecial-1991-11_0001", "profile": "http://iiif.io/api/image/2/level2.json"}, "width": 3560}}], "label": "[1]", "otherContent": [{"@id": "https://ocr.lib.ncsu.edu/ocr/te/technician-basketballspecial-1991-11_0001/technician-basketballspecial-1991-11_0001-annotation-list-word.json", "@type": "sc:AnnotationList", "label": "Text of this page (word level)"}, {"@id": "https://ocr.lib.ncsu.edu/ocr/te/technician-basketballspecial-1991-11_0001/technician-basketballspecial-1991-11_0001-annotation-list-line.json", "@type": "sc:AnnotationList", "label": "Text of this page (line level)"}, {"@id": "https://ocr.lib.ncsu.edu/ocr/te/technician-basketballspecial-1991-11_0001/technician-basketballspecial-1991-11_0001-annotation-list-paragraph.json", "@type": "sc:AnnotationList", "label": "Text of this page (paragraph level)"}], "seeAlso": [{"@id": "https://ocr.lib.ncsu.edu/ocr/te/technician-basketballspecial-1991-11_0001/technician-basketballspecial-1991-11_0001.hocr", "format": "text/vnd.hocr+html", "label": "hOCR", "profile": "https://github.com/kba/hocr-spec/blob/master/hocr-spec.md"}, {"@id": "https://ocr.lib.ncsu.edu/ocr/te/technician-basketballspecial-1991-11_0001/technician-basketballspecial-1991-11_0001.txt", "format": "text/plain", "label": "plain text OCR"}], "width": 3560}, "jsonanno": undefined, "manifest": "https://d.lib.ncsu.edu/collections/catalog/technician-basketballspecial-1991-11/manifest", "section": undefined, "title": "Text of this page (word level)"})
      expect(data.position).toEqual(0)
      expect(data.prevPageInactive).toBe(true)
      expect(data.nextPageInactive).toBe(false)
      expect(data.rangeid).toBe('rangestoryboard_manifest')
      expect(data.isfullscreen).toBe(false)
      expect(data.toc.length).toBe(24)
      expect(data.toc.slice(0, 18)).toEqual([
        {
          "position": 0,
          "label": "[1]: Text of this page (word level) / Text of this page (line level) / Text of this page (paragraph level)",
          "thumbnail": "https://iiif.lib.ncsu.edu/iiif/technician-basketballspecial-1991-11_0001/full/30,/0/default.jpg",
          "description": ""
        },
        {
          "position": 1,
          "label": "[2]: Text of this page (word level) / Text of this page (line level) / Text of this page (paragraph level)",
          "thumbnail": "https://iiif.lib.ncsu.edu/iiif/technician-basketballspecial-1991-11_0002/full/30,/0/default.jpg",
          "description": ""
        },
        {
          "position": 2,
          "label": "[3]: Text of this page (word level) / Text of this page (line level) / Text of this page (paragraph level)",
          "thumbnail": "https://iiif.lib.ncsu.edu/iiif/technician-basketballspecial-1991-11_0003/full/30,/0/default.jpg",
          "description": ""
        },
        {
          "position": 3,
          "label": "[4]: Text of this page (word level) / Text of this page (line level) / Text of this page (paragraph level)",
          "thumbnail": "https://iiif.lib.ncsu.edu/iiif/technician-basketballspecial-1991-11_0004/full/30,/0/default.jpg",
          "description": ""
        },
        {
          "position": 4,
          "label": "[5]: Text of this page (word level) / Text of this page (line level) / Text of this page (paragraph level)",
          "thumbnail": "https://iiif.lib.ncsu.edu/iiif/technician-basketballspecial-1991-11_0005/full/30,/0/default.jpg",
          "description": ""
        },
        {
          "position": 5,
          "label": "[6]: Text of this page (word level) / Text of this page (line level) / Text of this page (paragraph level)",
          "thumbnail": "https://iiif.lib.ncsu.edu/iiif/technician-basketballspecial-1991-11_0006/full/30,/0/default.jpg",
          "description": ""
        },
        {
          "position": 6,
          "label": "[7]: Text of this page (word level) / Text of this page (line level) / Text of this page (paragraph level)",
          "thumbnail": "https://iiif.lib.ncsu.edu/iiif/technician-basketballspecial-1991-11_0007/full/30,/0/default.jpg",
          "description": ""
        },
        {
          "position": 7,
          "label": "[8]: Text of this page (word level) / Text of this page (line level) / Text of this page (paragraph level)",
          "thumbnail": "https://iiif.lib.ncsu.edu/iiif/technician-basketballspecial-1991-11_0008/full/30,/0/default.jpg",
          "description": ""
        },
        {
          "position": 8,
          "label": "[9]: Text of this page (word level) / Text of this page (line level) / Text of this page (paragraph level)",
          "thumbnail": "https://iiif.lib.ncsu.edu/iiif/technician-basketballspecial-1991-11_0009/full/30,/0/default.jpg",
          "description": ""
        },
        {
          "position": 9,
          "label": "[10]: Text of this page (word level) / Text of this page (line level) / Text of this page (paragraph level)",
          "thumbnail": "https://iiif.lib.ncsu.edu/iiif/technician-basketballspecial-1991-11_0010/full/30,/0/default.jpg",
          "description": ""
        },
        {
          "position": 10,
          "label": "[11]: Text of this page (word level) / Text of this page (line level) / Text of this page (paragraph level)",
          "thumbnail": "https://iiif.lib.ncsu.edu/iiif/technician-basketballspecial-1991-11_0011/full/30,/0/default.jpg",
          "description": ""
        },
        {
          "position": 11,
          "label": "[12]: Text of this page (word level) / Text of this page (line level) / Text of this page (paragraph level)",
          "thumbnail": "https://iiif.lib.ncsu.edu/iiif/technician-basketballspecial-1991-11_0012/full/30,/0/default.jpg",
          "description": ""
        },
        {
          "position": 12,
          "label": "[13]: Text of this page (word level) / Text of this page (line level) / Text of this page (paragraph level)",
          "thumbnail": "https://iiif.lib.ncsu.edu/iiif/technician-basketballspecial-1991-11_0013/full/30,/0/default.jpg",
          "description": ""
        },
        {
          "position": 13,
          "label": "[14]: Text of this page (word level) / Text of this page (line level) / Text of this page (paragraph level)",
          "thumbnail": "https://iiif.lib.ncsu.edu/iiif/technician-basketballspecial-1991-11_0014/full/30,/0/default.jpg",
          "description": ""
        },
        {
          "position": 14,
          "label": "[15]: Text of this page (word level) / Text of this page (line level) / Text of this page (paragraph level)",
          "thumbnail": "https://iiif.lib.ncsu.edu/iiif/technician-basketballspecial-1991-11_0015/full/30,/0/default.jpg",
          "description": ""
        },
        {
          "position": 15,
          "label": "[16]: Text of this page (word level) / Text of this page (line level) / Text of this page (paragraph level)",
          "thumbnail": "https://iiif.lib.ncsu.edu/iiif/technician-basketballspecial-1991-11_0016/full/30,/0/default.jpg",
          "description": ""
        },
        {
          "position": 16,
          "label": "[17]: Text of this page (word level) / Text of this page (line level) / Text of this page (paragraph level)",
          "thumbnail": "https://iiif.lib.ncsu.edu/iiif/technician-basketballspecial-1991-11_0017/full/30,/0/default.jpg",
          "description": ""
        },
        {
          "position": 17,
          "label": "[18]: Text of this page (word level) / Text of this page (line level) / Text of this page (paragraph level)",
          "thumbnail": "https://iiif.lib.ncsu.edu/iiif/technician-basketballspecial-1991-11_0018/full/30,/0/default.jpg",
          "description": ""
        } ])
      expect(data.viewingDirection).toBe('ltr')
      expect(data.rangetitle).toBe("Technician Basketball Special, November 1991");
      var sbd = wrapper.vm.$children[0].$el['__vue__']._data.boardchildren[0];
      expect(sbd.seadragontile).toEqual("https://iiif.lib.ncsu.edu/iiif/technician-basketballspecial-1991-11_0001/info.json")
      expect(sbd.position).toBe(-1);
      expect(sbd.seadragonid).toBe("storyboard_technician-basketballspecial-1991-11_0001_technician-basketballspecial-1991-11_0001-annotation-word");
      expect(sbd.annotations).toEqual([{"section": ["6270,3903,2250,2250"], "styles": "", "itemclass": "", "stylesheet": undefined, "svg_path": [undefined], "type": "rect", "authors": "", "label": undefined, "language": undefined, "languages": undefined, "ocr": ["Annotation 1"], "tags": [], "textual_body": []}, {"section": ["12288,16567,2250,2250"], "styles": "", "itemclass": "", "stylesheet": undefined, "svg_path": [undefined], "type": "rect", "authors": "", "label": undefined, "language": undefined, "languages": undefined, "ocr": ["Annotation 2"], "tags": [], "textual_body": []}]);
      expect(sbd.currentanno).toBe("");
      expect(sbd.transcription).toBe(undefined);
      expect(sbd.textposition).toBe("corner");
      expect(sbd.prev_inactive).toBe(true);
      expect(sbd.next_inactive).toBe(false);
      expect(sbd.toolbar_id).toBe("");
      expect(sbd.booleanitems).toEqual({"additionalinfoshown": false, "annoinfoshown": false, "imageinfoshown": false, "isexcerpt": false, "isoverlaytoggled": false, "istextoverlaytoggled": false, "istranscription": false, "tocshown": false, "collectioninfoshown": false});
      expect(sbd.shown).toBe(false);
      expect(sbd.mapmarker).toBe("<i class=\"fas fa-map-marker-alt map-marker\"></i>");
      expect(sbd.isautorunning).toBe("");
      expect(sbd.settings).toEqual({"autorun_interval": 3,"continousboard": true, "index": 0, "perpage": 1, "title": "Technician Basketball Special, November 1991: [1]: Text of this page (word level) / Text of this page (line level) / Text of this page (paragraph level)", "truncate_length": 2});
      expect(sbd.currentlang).toBe("");
      expect(sbd.languages).toEqual([]);
      expect(sbd.fullscreen).toBe(false);
      expect(sbd.tagslist).toEqual({});
      expect(sbd.imageinfo).toEqual({"label": "Manifest information","link": "https://d.lib.ncsu.edu/collections/catalog/technician-basketballspecial-1991-11/manifest", "text": "<div id=\"Manifest\"><b>Manifest: </b><a href=\"https://d.lib.ncsu.edu/collections/catalog/technician-basketballspecial-1991-11/manifest\" target=\"_blank\">https://d.lib.ncsu.edu/collections/catalog/technician-basketballspecial-1991-11/manifest</a></div><div id=\"title\"><b>Title: </b>Technician Basketball Special, November 1991</div><div id=\"attribution\"><b>Attribution: </b>Technician (Raleigh, N.C.) (LH1 .N6 T4), Special Collections Research Center at NC State University Libraries</div><div id=\"license\"><b>License: </b>https://d.lib.ncsu.edu/collections/about#rights_and_use</div><div id=\"title\"><b>Title: </b>Technician Basketball Special, November 1991</div><div id=\"Creator\"><b>Creator: </b><span><a href=\"https://d.lib.ncsu.edu/collections/catalog?f%5Bnames_facet%5D%5B%5D=Technician+%28Raleigh%2C+N.C.%29\">Technician (Raleigh, N.C.)</a> (Publisher)</span></div><div id=\"Created Date\"><b>Created Date: </b>1991-11</div><div id=\"URL\"><b>URL: </b><span><a href=\"https://d.lib.ncsu.edu/collections/catalog/technician-basketballspecial-1991-11\">https://d.lib.ncsu.edu/collections/catalog/technician-basketballspecial-1991-11</a></span></div><div id=\"\"></b><span><a title=\"IIIF drag &amp; drop\" href=\"https://d.lib.ncsu.edu/collections/catalog/technician-basketballspecial-1991-11?manifest=https%3A%2F%2Fd.lib.ncsu.edu%2Fcollections%2Fcatalog%2Ftechnician-basketballspecial-1991-11%2Fmanifest.json\">IIIF drag &amp; drop</a> (<a href=\"https://d.lib.ncsu.edu/collections/about-iiif\">About IIIF</a>)</span></div><div id=\"Dublin Core XML via OAI-PMH\"><b>Dublin Core XML via OAI-PMH: </b><a href=\"https://d.lib.ncsu.edu/collections/catalog/oai?identifier=ncsul%2Ftechnician-basketballspecial-1991-11&metadataPrefix=oai_dc&verb=GetRecord\">https://d.lib.ncsu.edu/collections/catalog/oai?identifier=ncsul%2Ftechnician-basketballspecial-1991-11&metadataPrefix=oai_dc&verb=GetRecord</a></div><div id=\"Schema.org metadata as JSON-LD\"><b>Schema.org metadata as JSON-LD: </b><a href=\"https://d.lib.ncsu.edu/collections/catalog/technician-basketballspecial-1991-11/schemaorg.json\">https://d.lib.ncsu.edu/collections/catalog/technician-basketballspecial-1991-11/schemaorg.json</a></div><div id=\"imageurl\"><b>Image URL: </b><a href=\"https://iiif.lib.ncsu.edu/iiif/technician-basketballspecial-1991-11_0001/info.json\" target=\"_blank\">https://iiif.lib.ncsu.edu/iiif/technician-basketballspecial-1991-11_0001/info.json</a></div>"});
      expect(sbd.imagetitle).toBe("Technician Basketball Special, November 1991: [1]: Text of this page (word level) / Text of this page (line level) / Text of this page (paragraph level)");
      expect(sbd.layerslist).toEqual([{"checked": true, "label": "Layer 1", "opacity": 1, "tile": "https://iiif.lib.ncsu.edu/iiif/technician-basketballspecial-1991-11_0001/info.json", "xywh": ""}]);
      expect(Object.keys(wrapper.vm.$children[0].shortcuts).sort()).toEqual(['autorun', 'perpage', 'reload', 'close', 'textoverlay', 'fullscreen', 'hide', 'home', 'info', 'next', 'nextanno', 'overlay', 'prev', 'prevanno', 'keyboard', 'zoomin', 'zoomout'].sort());
      wrapper.destroy()
    })

    test('test list of storyboardtags', async ()  => {
      const wrapper =  mount(rangestoryboard,{
        propsData: {
          rangeurl: 'storyboardlist.json',
          styling: 'toggleoverlay:true;'
        },
        attachTo: '#root'
      });
      
      await wrapper.vm.$nextTick()
      await flushPromises()
      var data = wrapper.vm.$data
      expect(data.tags).toBe(false)
      expect(data.layerslist).toBe(false)
      expect(data.range).toBe(true)
      expect(data.langs).toEqual([])
      expect(data.toctitle).toEqual("Range Pages")
      expect(data.stylingstring).toEqual("toggleoverlay:true;autorun_interval:3;title:Bayeux Tapestry test;fit: horizontal;")
      expect(data.annotationurl).toEqual({"annotationurl": "https://storiiies.cogapp.com/holbein/annotations/list.json", "manifesturl": "https://storiiies.cogapp.com/holbein/manifest.json", "styling": "fit: horizontal;","tag": "iiif-storyboard","title": "Bayeux Tapestry test"})
      expect(data.position).toEqual(0)
      expect(data.prevPageInactive).toBe(true)
      expect(data.nextPageInactive).toBe(false)
      expect(data.rangeid).toBe('rangestoryboard_storyboardlist.json')
      expect(data.isfullscreen).toBe(false)
      expect(data.toc).toEqual([{"description": undefined, "label": "Bayeux Tapestry test", "position": 0, "thumbnail": undefined}, {"description": undefined, "label": "jsonexample", "position": 1, "thumbnail": undefined}, {"description": undefined, "label": "Page 3", "position": 2, "thumbnail": undefined}, {"description": undefined, "label": "multistoryboard test", "position": 3, "thumbnail": undefined}, {"description": undefined, "label": "multistoryboard test 2", "position": 4, "thumbnail": undefined}, {"description": undefined, "label": "layers test", "position": 5, "thumbnail": undefined}])
      expect(data.viewingDirection).toBe('ltr')
      expect(data.rangetitle).toBe("");
      await wrapper.vm.$nextTick()
      await flushPromises()
      var sbd = wrapper.vm.$children[0];
      expect(sbd.seadragontile).toEqual("https://images.cogapp.com/iiif/holbein_big_p.tif/info.json")
      expect(sbd.position).toBe(-1);
      expect(sbd.seadragonid).toBe("storyboard_annotations_list");
      expect(sbd.annotations[0]).toEqual({"section": ["6270,3903,2250,2250"], "styles": "", "itemclass": "", "stylesheet": undefined, "svg_path": [undefined], "authors": "", "label": undefined, "language": undefined, "languages": undefined, "ocr": ["When this double portrait was painted, Jean de Dinteville, Seigneur de Polisy, was ambassador to London from the court of the French king, François I."], "tags": [], "textual_body": [], "type": "rect"});
      expect(sbd.currentanno).toBe("");
      expect(sbd.transcription).toBe(undefined);
      expect(sbd.textposition).toBe("corner");
      expect(sbd.prev_inactive).toBe(true);
      expect(sbd.next_inactive).toBe(false);
      expect(sbd.toolbar_id).toBe("");
      expect(sbd.booleanitems).toEqual({"additionalinfoshown": false, "annoinfoshown": false, "imageinfoshown": false, "isexcerpt": false, "isoverlaytoggled": true, "istextoverlaytoggled": false, "istranscription": false, "tocshown": false, "collectioninfoshown": false});
      expect(sbd.shown).toBe(false);
      expect(sbd.mapmarker).toBe("<i class=\"fas fa-map-marker-alt map-marker\"></i>");
      expect(sbd.isautorunning).toBe("");
      expect(sbd.settings).toEqual({"autorun_interval": 3, "fit": "horizontal", "title": "Bayeux Tapestry test", "toggleoverlay": true, "truncate_length": 2});
      expect(sbd.currentlang).toBe("");
      expect(sbd.languages).toEqual([]);
      expect(sbd.fullscreen).toBe(false);
      expect(sbd.tagslist).toEqual({});
      expect(sbd.imageinfo).toEqual({"label": "Image information","link": "https://storiiies.cogapp.com/holbein/manifest.json", "text": "<div id=\"Manifest\"><b>Manifest: </b><a href=\"https://storiiies.cogapp.com/holbein/manifest.json\" target=\"_blank\">https://storiiies.cogapp.com/holbein/manifest.json</a></div><div id=\"title\"><b>Title: </b>Holbein's 'The Ambassadors'</div><div id=\"description\"><b>Description: </b>Let's explore some of the symbolism and features in this iconic painting</div><div id=\"attribution\"><b>Attribution: </b>Copyright National Gallery, London; used under license.</div><div id=\"imageurl\"><b>Image URL: </b><a href=\"https://images.cogapp.com/iiif/holbein_big_p.tif/info.json\" target=\"_blank\">https://images.cogapp.com/iiif/holbein_big_p.tif/info.json</a></div>"});
      expect(sbd.imagetitle).toBe("Bayeux Tapestry test");
      expect(sbd.layerslist).toEqual([{"checked": true, "label": "Layer 1", "opacity": 1, "tile": "https://images.cogapp.com/iiif/holbein_big_p.tif/info.json"}]);
      expect(Object.keys(sbd.shortcuts).sort()).toEqual(['autorun', 'reload', 'textoverlay', 'close', 'fullscreen', 'hide', 'home', 'info', 'next', 'nextanno', 'overlay', 'prev', 'prevanno', 'keyboard', 'zoomin', 'zoomout'].sort());
      wrapper.vm.nextItemRange('next');
      await wrapper.vm.$nextTick()
      await flushPromises()
      expect(data.stylingstring).toEqual("toggleoverlay:true;autorun_interval:3;title:jsonexample;toggleoverlay:false;")
      expect(data.annotationurl).toEqual({"annotationurl": "", "jsonanno": {"on": {"@id": "https://wellcomelibrary.org/iiif/b1948799x/canvas/c0#xywh=310,1250,1850,1180", "@type": "sc:Canvas", "within": {"@id": "https://wellcomelibrary.org/iiif/b1948799x/manifest", "@type": "sc:Manifest"}}, "resource": {"@type": "cnt:ContentAsText", "chars": "Jim Watson and I have probably made a\nmost important discovery. We have built a model for\nthe structure of des-oxy-ribose-nucleic-acid (read it\ncarefully) called D.N.A. for short. You may remember\nthat the genes of the chromosomes - which carry the\nhereditary factors - are made up of protein and\nD.N.A.", "format": "text/plain"}}, "styling": "toggleoverlay:false;", "tag": "iiif-storyboard", "title": "jsonexample"})
      expect(data.position).toEqual(1)
      expect(data.prevPageInactive).toBe(false)
      expect(data.nextPageInactive).toBe(false)
      expect(data.rangeid).toBe('rangestoryboard_storyboardlist.json')
      expect(data.isfullscreen).toBe(false)
      expect(data.viewingDirection).toBe('ltr')
      expect(data.rangetitle).toBe("");
      wrapper.vm.nextItemRange(3);
      await wrapper.vm.$nextTick()
      await flushPromises()
      expect(data.annotationurl['annotationurls']).toEqual('mc00240.json;page.json;')
      expect(data.annotationurl['tag']).toEqual('iiif-multistoryboard')
      wrapper.destroy()
    })

    test('test manifesturl with per page', async ()  => {
      const wrapper =  mount(rangestoryboard,{
        propsData: {
          rangeurl: 'https://d.lib.ncsu.edu/collections/catalog/technician-basketballspecial-1991-11/manifest',
          styling: 'perpage: 2'
        },
        attachTo: '#root'
      });
      
      await wrapper.vm.$nextTick()
      await flushPromises()
      var data = wrapper.vm.$data
      expect(data.tags).toBe(false)
      expect(data.layerslist).toBe(false)
      expect(data.range).toBe(true)
      expect(data.toctitle).toEqual("Range Pages")
      expect(data.stylingstring).toEqual("perpage:2;continousboard:true;autorun_interval:3;title:Technician Basketball Special, November 1991;")
      expect(data.annotationurl.annotationurls).toEqual("https://ocr.lib.ncsu.edu/ocr/te/technician-basketballspecial-1991-11_0001/technician-basketballspecial-1991-11_0001-annotation-list-word.json;https://ocr.lib.ncsu.edu/ocr/te/technician-basketballspecial-1991-11_0002/technician-basketballspecial-1991-11_0002-annotation-list-word.json")
      expect(data.annotationurl.annotationurls.split(";").length).toEqual(2)
      expect(data.position).toEqual(0)
      expect(data.prevPageInactive).toBe(true)
      expect(data.nextPageInactive).toBe(false)
      expect(data.rangeid).toBe('rangestoryboard_manifest')
      expect(data.isfullscreen).toBe(false)
      expect(data.viewingDirection).toBe('ltr')
      expect(data.rangetitle).toBe("Technician Basketball Special, November 1991");
      expect(data.annotationurl.annotationurls).toEqual("https://ocr.lib.ncsu.edu/ocr/te/technician-basketballspecial-1991-11_0001/technician-basketballspecial-1991-11_0001-annotation-list-word.json;https://ocr.lib.ncsu.edu/ocr/te/technician-basketballspecial-1991-11_0002/technician-basketballspecial-1991-11_0002-annotation-list-word.json")
      expect(data.annotationurl.annotationurls.split(";").length).toEqual(2)
      expect(wrapper.vm.$children[0].$options.name).toBe('multistoryboard')
      expect(wrapper.vm.$children.length).toBe(1)
      var sbd = wrapper.vm.$children[0].$children[1].$el['__vue__']._data;
      expect(wrapper.vm.$children[0].$children.length).toBe(3)
      expect(wrapper.vm.$children[0].$children.map(elem=>elem.$options.name)).toEqual(["toolbar", "storyboard", "storyboard"])
      expect(sbd.seadragontile).toEqual("https://iiif.lib.ncsu.edu/iiif/technician-basketballspecial-1991-11_0001/info.json")
      expect(sbd.position).toBe(-1);
      expect(sbd.seadragonid).toBe("storyboard_technician-basketballspecial-1991-11_0001_technician-basketballspecial-1991-11_0001-annotation-word");
      expect(sbd.annotations).toEqual([{"section": ["6270,3903,2250,2250"], "styles": "", "itemclass": "", "stylesheet": undefined, "svg_path": [undefined], "type": "rect", "authors": "", "label": undefined, "language": undefined, "languages": undefined, "ocr": ["Annotation 1"], "tags": [], "textual_body": []}, {"section": ["12288,16567,2250,2250"], "styles": "", "itemclass": "", "stylesheet": undefined, "svg_path": [undefined], "type": "rect", "authors": "", "label": undefined, "language": undefined, "languages": undefined, "ocr": ["Annotation 2"], "tags": [], "textual_body": []}]);
      expect(sbd.currentanno).toBe("");
      expect(sbd.transcription).toBe(undefined);
      expect(sbd.textposition).toBe("corner");
      expect(sbd.prev_inactive).toBe(true);
      expect(sbd.next_inactive).toBe(false);
      expect(sbd.toolbar_id).toBe("");
      expect(sbd.booleanitems).toEqual({"additionalinfoshown": false, "annoinfoshown": false, "imageinfoshown": false, "isexcerpt": false, "isoverlaytoggled": false, "istextoverlaytoggled": false, "istranscription": false, "tocshown": false, "collectioninfoshown": false});
      expect(sbd.shown).toBe(false);
      expect(sbd.mapmarker).toBe("<i class=\"fas fa-map-marker-alt map-marker\"></i>");
      expect(sbd.isautorunning).toBe("");
      expect(sbd.settings).toEqual({"autorun_interval": 3, "title": "Technician Basketball Special, November 1991", "truncate_length": 2, "perpage": 2, "continousboard": true, "index": 0});
      expect(sbd.currentlang).toBe("");
      expect(sbd.languages).toEqual([]);
      expect(sbd.fullscreen).toBe(false);
      expect(sbd.tagslist).toEqual({});
      expect(sbd.imageinfo).toEqual({"label": "Manifest information", "link": "https://d.lib.ncsu.edu/collections/catalog/technician-basketballspecial-1991-11/manifest", "text": "<div id=\"Manifest\"><b>Manifest: </b><a href=\"https://d.lib.ncsu.edu/collections/catalog/technician-basketballspecial-1991-11/manifest\" target=\"_blank\">https://d.lib.ncsu.edu/collections/catalog/technician-basketballspecial-1991-11/manifest</a></div><div id=\"title\"><b>Title: </b>Technician Basketball Special, November 1991</div><div id=\"attribution\"><b>Attribution: </b>Technician (Raleigh, N.C.) (LH1 .N6 T4), Special Collections Research Center at NC State University Libraries</div><div id=\"license\"><b>License: </b>https://d.lib.ncsu.edu/collections/about#rights_and_use</div><div id=\"title\"><b>Title: </b>Technician Basketball Special, November 1991</div><div id=\"Creator\"><b>Creator: </b><span><a href=\"https://d.lib.ncsu.edu/collections/catalog?f%5Bnames_facet%5D%5B%5D=Technician+%28Raleigh%2C+N.C.%29\">Technician (Raleigh, N.C.)</a> (Publisher)</span></div><div id=\"Created Date\"><b>Created Date: </b>1991-11</div><div id=\"URL\"><b>URL: </b><span><a href=\"https://d.lib.ncsu.edu/collections/catalog/technician-basketballspecial-1991-11\">https://d.lib.ncsu.edu/collections/catalog/technician-basketballspecial-1991-11</a></span></div><div id=\"\"></b><span><a title=\"IIIF drag &amp; drop\" href=\"https://d.lib.ncsu.edu/collections/catalog/technician-basketballspecial-1991-11?manifest=https%3A%2F%2Fd.lib.ncsu.edu%2Fcollections%2Fcatalog%2Ftechnician-basketballspecial-1991-11%2Fmanifest.json\">IIIF drag &amp; drop</a> (<a href=\"https://d.lib.ncsu.edu/collections/about-iiif\">About IIIF</a>)</span></div><div id=\"Dublin Core XML via OAI-PMH\"><b>Dublin Core XML via OAI-PMH: </b><a href=\"https://d.lib.ncsu.edu/collections/catalog/oai?identifier=ncsul%2Ftechnician-basketballspecial-1991-11&metadataPrefix=oai_dc&verb=GetRecord\">https://d.lib.ncsu.edu/collections/catalog/oai?identifier=ncsul%2Ftechnician-basketballspecial-1991-11&metadataPrefix=oai_dc&verb=GetRecord</a></div><div id=\"Schema.org metadata as JSON-LD\"><b>Schema.org metadata as JSON-LD: </b><a href=\"https://d.lib.ncsu.edu/collections/catalog/technician-basketballspecial-1991-11/schemaorg.json\">https://d.lib.ncsu.edu/collections/catalog/technician-basketballspecial-1991-11/schemaorg.json</a></div><div id=\"imageurl\"><b>Image URL: </b><a href=\"https://iiif.lib.ncsu.edu/iiif/technician-basketballspecial-1991-11_0001/info.json\" target=\"_blank\">https://iiif.lib.ncsu.edu/iiif/technician-basketballspecial-1991-11_0001/info.json</a></div>"});
      expect(sbd.imagetitle).toBe("Technician Basketball Special, November 1991: [1]");
      expect(sbd.layerslist).toEqual([{"checked": true, "label": "Layer 1", "opacity": 1, "tile": "https://iiif.lib.ncsu.edu/iiif/technician-basketballspecial-1991-11_0001/info.json", "xywh": ""}]);
      expect(Object.keys(wrapper.vm.$children[0].shortcuts).sort()).toEqual(['close', 'reload', 'textoverlay', 'fullscreen', 'hide', 'home', 'info', 'next', 'nextanno', 'overlay', 'prev', 'prevanno', 'keyboard', 'zoomin', 'zoomout', 'perpage'].sort());
      wrapper.find("#nextPageButton").trigger('click');
      expect(data.annotationurl.annotationurls).toEqual("https://ocr.lib.ncsu.edu/ocr/te/technician-basketballspecial-1991-11_0003/technician-basketballspecial-1991-11_0003-annotation-list-word.json;https://ocr.lib.ncsu.edu/ocr/te/technician-basketballspecial-1991-11_0004/technician-basketballspecial-1991-11_0004-annotation-list-word.json")
      expect(data.annotationurl.annotationurls.split(";").length).toEqual(2)
      expect(data.position).toEqual(2)
      wrapper.destroy()
    })

    test('test single list manifesturl', async ()  => {
      const wrapper =  mount(rangestoryboard,{
        propsData: {
          rangeurl: 'https://storiiies.cogapp.com/holbein/manifest.json'
        },
        attachTo: '#root'
      });
      
      await wrapper.vm.$nextTick()
      await flushPromises()
      var data = wrapper.vm.$data
      expect(data.tags).toBe(false)
      expect(data.langs).toEqual([])
      expect(data.layerslist).toBe(false)
      expect(data.range).toBe(true)
      expect(data.toctitle).toEqual("Range Pages")
      expect(data.stylingstring).toEqual("autorun_interval:3;title:Holbein's 'The Ambassadors';")
      expect(data.annotationurl).toEqual({"anno": "https://storiiies.cogapp.com/holbein/annotations/list.json", "otherLists": [], "canvas": "https://storiies.cogapp.com/holbein/canvas/c0", "images": {"@context": "http://iiif.io/api/presentation/2/context.json", "@id": "https://storiies.cogapp.com/holbein/canvas/c0", "@type": "sc:Canvas", "description": {"@language": "en", "@value": "The Ambassadors by Hans Holbein the Younger (National Gallery, London) was created in 1533, the year that Elizabeth I was born. A striking life-scale double portrait, it also depicts numerous meticulously rendered objects and includes a rare and much-cited example of anamorphosis. The meaning of the painting and the objects it depicts has been the cause of much debate."}, "height": 29560, "images": [{"@id": "https://storiies.cogapp.com/holbein/image/i0", "@type": "oa:Annotation", "motivation": "sc:painting", "on": "https://storiies.cogapp.com/holbein/canvas/c0", "resource": {"@id": "https://images.cogapp.com/iiif/holbein_big_p.tif/full/full/0/default.jpg", "@type": "dctypes:Image", "format": "image/jpeg", "height": 29560, "service": {"@context": "http://iiif.io/api/image/2/context.json", "@id": "https://images.cogapp.com/iiif/holbein_big_p.tif", "profile": "http://iiif.io/api/image/1/level2.json"}, "width": 30000}}], "label": {"@language": "en", "@value": "The Ambassadors"}, "otherContent": [{"@id": "https://storiiies.cogapp.com/holbein/annotations/list.json", "@type": "sc:AnnotationList"}], "width": 30000}, "jsonanno": undefined, "manifest": "https://storiiies.cogapp.com/holbein/manifest.json", "section": undefined, "title": "The Ambassadors"})
      expect(data.position).toEqual(0)
      expect(data.prevPageInactive).toBe(true)
      expect(data.nextPageInactive).toBe(true)
      expect(data.rangeid).toBe('rangestoryboard_manifest.json')
      expect(data.isfullscreen).toBe(false)
      expect(data.toc).toEqual([{"description": "", "label": "The Ambassadors", "position": 0, "thumbnail": "https://images.cogapp.com/iiif/holbein_big_p.tif/full/30,/0/default.jpg"}])
      expect(data.viewingDirection).toBe('ltr')
      expect(data.rangetitle).toBe("Holbein's 'The Ambassadors'");
      await wrapper.vm.$nextTick()
      await flushPromises()
      var sbd = wrapper.vm.$children[0];
      expect(sbd.seadragontile).toEqual("https://images.cogapp.com/iiif/holbein_big_p.tif/info.json")
      expect(sbd.position).toBe(-1);
      expect(sbd.seadragonid).toBe("storyboard_annotations_list");
      expect(sbd.annotations[0]).toEqual({"section": ["6270,3903,2250,2250"], "styles": "", "itemclass": "", "stylesheet": undefined, "svg_path": [undefined], "authors": "", "label": undefined, "language": undefined, "languages": undefined, "ocr": ["When this double portrait was painted, Jean de Dinteville, Seigneur de Polisy, was ambassador to London from the court of the French king, François I."], "tags": [], "textual_body": [], "type": "rect"});
      expect(sbd.currentanno).toBe("");
      expect(sbd.transcription).toBe(undefined);
      expect(sbd.textposition).toBe("corner");
      expect(sbd.prev_inactive).toBe(true);
      expect(sbd.next_inactive).toBe(false);
      expect(sbd.toolbar_id).toBe("");
      expect(sbd.booleanitems).toEqual({"additionalinfoshown": false, "annoinfoshown": false, "imageinfoshown": false, "isexcerpt": false, "isoverlaytoggled": false, "istextoverlaytoggled": false, "istranscription": false, "tocshown": false, "collectioninfoshown": false});
      expect(sbd.shown).toBe(false);
      expect(sbd.mapmarker).toBe("<i class=\"fas fa-map-marker-alt map-marker\"></i>");
      expect(sbd.isautorunning).toBe("");
      expect(sbd.settings).toEqual({"autorun_interval": 3, "title": "Holbein's 'The Ambassadors'", "truncate_length": 2});
      expect(sbd.currentlang).toBe("");
      expect(sbd.languages).toEqual([]);
      expect(sbd.fullscreen).toBe(false);
      expect(sbd.tagslist).toEqual({});
      expect(sbd.imageinfo).toEqual({"label": "Image information", "link": "https://storiiies.cogapp.com/holbein/manifest.json", "text": "<div id=\"Manifest\"><b>Manifest: </b><a href=\"https://storiiies.cogapp.com/holbein/manifest.json\" target=\"_blank\">https://storiiies.cogapp.com/holbein/manifest.json</a></div><div id=\"title\"><b>Title: </b>Holbein's 'The Ambassadors'</div><div id=\"description\"><b>Description: </b>Let's explore some of the symbolism and features in this iconic painting</div><div id=\"attribution\"><b>Attribution: </b>Copyright National Gallery, London; used under license.</div><div id=\"imageurl\"><b>Image URL: </b><a href=\"https://images.cogapp.com/iiif/holbein_big_p.tif/info.json\" target=\"_blank\">https://images.cogapp.com/iiif/holbein_big_p.tif/info.json</a></div>"});
      expect(sbd.imagetitle).toBe("Holbein's 'The Ambassadors'");
      expect(sbd.layerslist).toEqual([{"checked": true, "label": "Layer 1", "opacity": 1, "tile": "https://images.cogapp.com/iiif/holbein_big_p.tif/info.json", "xywh": ""}]);
      expect(Object.keys(sbd.shortcuts).sort()).toEqual(['autorun', 'reload', 'textoverlay', 'close', 'fullscreen', 'hide', 'home', 'info', 'next', 'overlay', 'prev', 'keyboard', 'zoomin', 'zoomout'].sort());
      wrapper.destroy()
    })
    
    test('test v3 manifest with embedded annotations', async ()  => {
      const wrapper =  mount(rangestoryboard,{
        propsData: {
          rangeurl: 'https://stephenwf.github.io/ocean-liners.json'
        },
        attachTo: '#root'
      });
      
      await wrapper.vm.$nextTick()
      await flushPromises()
      var data = wrapper.vm.$data
      expect(data.tags).toBe(false)
      expect(data.langs).toEqual(["<option value=\"en\" selected>English</option>"])
      expect(data.layerslist).toBe(false)
      expect(data.range).toBe(true)
      expect(data.toctitle).toEqual("Range Pages")
      expect(data.stylingstring).toEqual("autorun_interval:3;title:Cunard Line - to all parts of the world: Object image 0;")
      expect(data.position).toEqual(0)
      expect(data.prevPageInactive).toBe(true)
      expect(data.nextPageInactive).toBe(true)
      expect(data.rangeid).toBe('rangestoryboard_ocean-liners.json')
      expect(data.isfullscreen).toBe(false)
      expect(data.toc).toEqual([{"label": "Object image 0", "position": 0, "thumbnail": "https://framemark.vam.ac.uk/collections/2013GU2911/full/30,/0/default.jpg", "description": ""}])
      expect(data.viewingDirection).toBe('ltr')
      expect(data.rangetitle).toBe("Cunard Line - to all parts of the world");
      var sbd = wrapper.vm.$children[0].$el['__vue__']._data;
      expect(sbd.seadragontile).toEqual("https://framemark.vam.ac.uk/collections/2013GU2911/info.json")
      expect(sbd.position).toBe(-1);
      expect(sbd.seadragonid).toBe("storyboard_annopage_p1");
      expect(sbd.annotations[2]).toEqual({"styles": "", "itemclass": "", "stylesheet": undefined, "authors": "", "label": undefined, "language": undefined, "languages": undefined, "ocr": [], "section": ["2000,2800,400,400"], "svg_path": [undefined], "tags": [], "textual_body": ["<div class=\"describing\"><h2 class=\"annotatedzoom-annotation-detail__label\">First-class restaurant</h2><div class=\"annotatedzoom-annotation-detail__content\"><img class=\"annotatedzoom-annotation-detail__image\" src=\"https://media.vam.ac.uk/feature/annotatedzoom/O1023003/2017KE6204-Aquitania-restaurant-cropped.jpg\" width=300 height=250/><p>Dining on ocean liners was a radically different experience depending on the class of travel. In first class, the <i>Aquitania</i>&#39;s Louis XVI-style dining room offered seating in small isolated groups, echoing elegant restaurants on land. The ship&#39;s architect, Arthur Davis, explained that a &ldquo;cheerful room with comfortable surroundings&rdquo; was a necessary distraction from &ldquo;the often very unpleasant conditions&rdquo; at sea. </p><p class=\"annotatedzoom-annotation-detail__credit\">Photograph from <em>The New Art of Going Abroad</em>, 1929, US. National Art Library: 38041986015030. &copy; Victoria and Albert Museum, London</p></div></div>"], "type": "rect"});
      expect(sbd.currentanno).toBe("");
      expect(sbd.transcription).toBe(undefined);
      expect(sbd.textposition).toBe("corner");
      expect(sbd.prev_inactive).toBe(true);
      expect(sbd.next_inactive).toBe(false);
      expect(sbd.toolbar_id).toBe("");
      expect(sbd.booleanitems).toEqual({"additionalinfoshown": false, "annoinfoshown": false, "imageinfoshown": false, "isexcerpt": false, "isoverlaytoggled": false, "istextoverlaytoggled": false, "istranscription": false, "tocshown": false, "collectioninfoshown": false});
      expect(sbd.shown).toBe(false);
      expect(sbd.mapmarker).toBe("<i class=\"fas fa-map-marker-alt map-marker\"></i>");
      expect(sbd.isautorunning).toBe("");
      expect(sbd.settings).toEqual({"autorun_interval": 3, "title": "Cunard Line - to all parts of the world: Object image 0", "truncate_length": 2});
      expect(sbd.currentlang).toBe("");
      expect(sbd.languages).toEqual([]);
      expect(sbd.fullscreen).toBe(false);
      expect(sbd.tagslist).toEqual({});
      expect(sbd.imageinfo).toEqual({"label": "Image information", "link": "https://stephenwf.github.io/ocean-liners.json","text": "<div id=\"Manifest\"><b>Manifest: </b><a href=\"https://stephenwf.github.io/ocean-liners.json\" target=\"_blank\">https://stephenwf.github.io/ocean-liners.json</a></div><div id=\"title\"><b>Title: </b>Cunard Line - to all parts of the world</div><div id=\"Museum number\"><b>Museum number: </b>E.1829-2004</div><div id=\"title\"><b>Title: </b>Cunard Line - to all parts of the world</div><div id=\"Descriptive Line\"><b>Descriptive Line: </b>Chromolithograph travel poster for \"Cunard Line - to all parts of the world\", depicting a cross section of the Aquitania at sea, printed by Thos. Forman & Sons, Nottingham, ca. 1920.</div><div id=\"Collection\"><b>Collection: </b>PDP</div><div id=\"Place\"><b>Place: </b>Nottingham (printed)</div><div id=\"Materials & Techniques\"><b>Materials & Techniques: </b>chromolithograph</div><div id=\"Date\"><b>Date: </b>ca. 1920 (made)</div><div id=\"Categories\"><b>Categories: </b>Posters;Boats and ships;Tourism & Travel</div><div id=\"Description\"><b>Description: </b>Chromolithograph travel poster for \"Cunard Line - to all parts of the world\", depicting a cross section of the Aquitania at sea, printed by Thos. Forman & Sons, Nottingham, ca. 1920.</div><div id=\"\"></b><a href=\"https://collections.vam.ac.uk/item/O1023003.jsonld\">https://collections.vam.ac.uk/item/O1023003.jsonld</a></div><div id=\"imageurl\"><b>Image URL: </b><a href=\"https://framemark.vam.ac.uk/collections/2013GU2911/info.json\" target=\"_blank\">https://framemark.vam.ac.uk/collections/2013GU2911/info.json</a></div>"});
      expect(sbd.imagetitle).toBe("Cunard Line - to all parts of the world: Object image 0");
      expect(sbd.layerslist).toEqual([{"checked": true, "label": "Layer 1", "opacity": 1, "tile": "https://framemark.vam.ac.uk/collections/2013GU2911/info.json", "xywh": ""}]);
      expect(Object.keys(sbd.shortcuts).sort()).toEqual(['autorun', 'reload', 'close', 'fullscreen', 'hide', 'home', 'info', 'next', 'overlay', 'prev', 'keyboard', 'zoomin', 'zoomout'].sort());
      wrapper.destroy()
    })

    test('test nested collection', async ()  => {
      const wrapper =  mount(rangestoryboard,{
        propsData: {
          rangeurl: 'https://research.ng-london.org.uk/iiif-projects/json/ng-projects.json'
        },
        attachTo: '#root'
      });
      
      await wrapper.vm.$nextTick()
      await flushPromises()
      var data = wrapper.vm.$data
      expect(data.tags).toBe(false)
      expect(data.langs).toEqual(["<option value=\"en\" selected>English</option>"])
      expect(data.layerslist).toBe(false)
      expect(data.range).toBe(true)
      expect(data.toctitle).toEqual("Range Pages")
      expect(data.stylingstring).toEqual("perpage:1;continousboard:true;autorun_interval:3;title:In Search of Verrocchio the Painter: The Cleaning and Examination of 'The Virgin and Child with Two Angels': Infrared reflectogram (OSIRIS) (4036x3100px);")
      expect(data.position).toEqual(0)
      expect(data.prevPageInactive).toBe(true)
      expect(data.nextPageInactive).toBe(false)
      expect(data.rangeid).toBe('rangestoryboard_ng-projects.json')
      expect(data.isfullscreen).toBe(false)
      expect(data.toc.length).toEqual(6)
      expect(data.collection.manifests.length).toEqual(4)
      expect(data.collection.manifests[0].manifests.length).toEqual(6)
      expect(data.collection.manifests[0].manifests[0].manifests.length).toEqual(2)
      expect(data.viewingDirection).toBe('ltr')
      expect(data.rangetitle).toBe("In Search of Verrocchio the Painter: The Cleaning and Examination of 'The Virgin and Child with Two Angels'");
      var sbd = wrapper.vm.$children[0].$children[1].$el['__vue__']._data;
      await flushPromises()
      expect(sbd.seadragontile).toEqual("https://research.ng-london.org.uk/iiif/pics/pyramids/technicalbulletin/volume_31/N-0296_dirrO_0_a_AT-PYR.tif/info.json")
      expect(sbd.position).toBe(-1);
      expect(sbd.seadragonid.indexOf('storyboard_noannotation') > -1).toEqual(true);
      expect(sbd.annotations.length).toEqual(0);
      expect(sbd.currentanno).toBe("");
      expect(sbd.transcription).toBe(undefined);
      expect(sbd.textposition).toBe("corner");
      expect(sbd.prev_inactive).toBe(true);
      expect(sbd.next_inactive).toBe(false);
      expect(sbd.toolbar_id).toBe("");
      expect(sbd.booleanitems).toEqual({"additionalinfoshown": false, "annoinfoshown": false, "imageinfoshown": false, "isexcerpt": false, "isoverlaytoggled": false, "istextoverlaytoggled": false, "istranscription": false, "tocshown": false, "collectioninfoshown": false});
      expect(sbd.shown).toBe(false);
      expect(sbd.mapmarker).toBe("<i class=\"fas fa-map-marker-alt map-marker\"></i>");
      expect(sbd.isautorunning).toBe("");
      expect(sbd.settings).toEqual({"autorun_interval": 3,"continousboard": true,"index": 0,"perpage": 1, "title": "In Search of Verrocchio the Painter: The Cleaning and Examination of 'The Virgin and Child with Two Angels': Infrared reflectogram (OSIRIS) (4036x3100px)", "truncate_length": 2});
      expect(sbd.currentlang).toBe("");
      expect(sbd.languages).toEqual([]);
      expect(sbd.fullscreen).toBe(false);
      expect(sbd.tagslist).toEqual({});
      expect(sbd.imageinfo).toEqual({"label": "Manifest information", "link": "https://research.ng-london.org.uk/iiif-projects/json/dunkerton_syson2010.json","text": "<div id=\"Manifest\"><b>Manifest: </b><a href=\"https://research.ng-london.org.uk/iiif-projects/json/dunkerton_syson2010.json\" target=\"_blank\">https://research.ng-london.org.uk/iiif-projects/json/dunkerton_syson2010.json</a></div><div id=\"title\"><b>Title: </b>In Search of Verrocchio the Painter: The Cleaning and Examination of 'The Virgin and Child with Two Angels'</div><div id=\"description\"><b>Description: </b>Selection of high resolution infrared images in support of the Dunkerton and Syson article from Technical Bulletin Volume 31</div><div id=\"Attribution\"><b>Attribution: </b>&copy; The National Gallery, London</div><div id=\"rights\"><b>Rights: </b>http://rightsstatements.org/vocab/InC/1.0/</div><div id=\"Manifest Author\"><b>Manifest Author: </b>Scientific Department (NG)</div><div id=\"Related Projects\"><b>Related Projects: </b><a href=\"https://research.ng-london.org.uk/iiif-projects/json/iiif_collection_explorer.json\">iiif_collection_explorer</a>/<a href=\"https://research.ng-london.org.uk/iiif-projects/json/ng-projects.json\">ng-projects</a>/<a href=\"https://research.ng-london.org.uk/iiif-projects/json/technical-bulletin.json\">technical-bulletin</a>/<a href=\"https://research.ng-london.org.uk/iiif-projects/json/vol-31.json\">vol-31</a></div><div id=\"Additional Links\"><b>Additional Links: </b><a href=\"https://www.nationalgallery.org.uk/research/research-resources/technical-bulletin/technical-bulletin-volume-31\">Technical Bulletin Vol. 31</a>/<a href=\"https://www.nationalgallery.org.uk/technical-bulletin-vol-31/dunkerton_syson2010\">Dunkerton and Syson article</a></div><div id=\"Related PDF\"><b>Related PDF: </b>https://research.ng-london.org.uk/ngws/upload/pdf/Dunkerton_Syson_2010b.pdf</div><div id=\"imageurl\"><b>Image URL: </b><a href=\"https://research.ng-london.org.uk/iiif/pics/pyramids/technicalbulletin/volume_31/N-0296_dirrO_0_a_AT-PYR.tif/info.json\" target=\"_blank\">https://research.ng-london.org.uk/iiif/pics/pyramids/technicalbulletin/volume_31/N-0296_dirrO_0_a_AT-PYR.tif/info.json</a></div>"});
      expect(sbd.imagetitle).toBe("In Search of Verrocchio the Painter: The Cleaning and Examination of 'The Virgin and Child with Two Angels': Infrared reflectogram (OSIRIS) (4036x3100px)");
      expect(sbd.layerslist).toEqual([{"checked": true, "label": "Layer 1", "opacity": 1, "tile": "https://research.ng-london.org.uk/iiif/pics/pyramids/technicalbulletin/volume_31/N-0296_dirrO_0_a_AT-PYR.tif/info.json", "xywh": ""}]);
      expect(Object.keys(sbd.shortcuts).sort()).toEqual(['reload', 'close', 'fullscreen', 'hide', 'home', 'info', 'keyboard', 'zoomin', 'zoomout', 'perpage'].sort());
      wrapper.destroy()
    })
})