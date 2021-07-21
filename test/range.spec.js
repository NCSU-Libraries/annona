import Vue from 'vue'
//import index from 'karma-chai'
import { mount } from '@vue/test-utils';
import { shallowMount } from '@vue/test-utils';

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
      const saveMock = jest.fn()
      wrapper.vm.createViewer = saveMock;
      await wrapper.vm.$nextTick()
      await flushPromises()
      var data = wrapper.vm.$data
      expect(data.tags).toBe(false)
      expect(data.layerslist).toBe(false)
      expect(wrapper.isws).toBe(undefined)
      expect(data.range).toBe(true)
      expect(data.toctitle).toEqual("Range Pages")
      expect(data.stylingstring).toEqual("autorun_interval:3;title:十二類絵巻: 1;")
      expect(data.annotationurl).toEqual({"anno": "https://kotenseki.nijl.ac.jp/biblio/200015137/list/1", "canvas": {"within": "https://kotenseki.nijl.ac.jp/biblio/200015137/manifest"}, "images": "", "jsonanno": undefined, "manifest": "https://kotenseki.nijl.ac.jp/biblio/200015137/manifest", "section": undefined, "title": "1"})
      expect(data.rangelist).toEqual( [{"anno": "https://kotenseki.nijl.ac.jp/biblio/200015137/list/1", "canvas": {"within": "https://kotenseki.nijl.ac.jp/biblio/200015137/manifest"}, "images": "", "jsonanno": undefined, "manifest": "https://kotenseki.nijl.ac.jp/biblio/200015137/manifest", "section": undefined, "title": "1"}, {"anno": "https://kotenseki.nijl.ac.jp/biblio/200015137/list/4", "canvas": {"within": "https://kotenseki.nijl.ac.jp/biblio/200015137/manifest"}, "images": "", "jsonanno": undefined, "manifest": "https://kotenseki.nijl.ac.jp/biblio/200015137/manifest", "section": undefined, "title": "4"}, {"anno": "https://kotenseki.nijl.ac.jp/biblio/200015137/list/5", "canvas": {"within": "https://kotenseki.nijl.ac.jp/biblio/200015137/manifest"}, "images": "", "jsonanno": undefined, "manifest": "https://kotenseki.nijl.ac.jp/biblio/200015137/manifest", "section": undefined, "title": "5"}, {"anno": "https://kotenseki.nijl.ac.jp/biblio/200015137/list/6", "canvas": {"within": "https://kotenseki.nijl.ac.jp/biblio/200015137/manifest"}, "images": "", "jsonanno": undefined, "manifest": "https://kotenseki.nijl.ac.jp/biblio/200015137/manifest", "section": undefined, "title": "6"}, {"anno": "https://kotenseki.nijl.ac.jp/biblio/200015137/list/7", "canvas": {"within": "https://kotenseki.nijl.ac.jp/biblio/200015137/manifest"}, "images": "", "jsonanno": undefined, "manifest": "https://kotenseki.nijl.ac.jp/biblio/200015137/manifest", "section": undefined, "title": "7"}, {"anno": "https://kotenseki.nijl.ac.jp/biblio/200015137/list/8", "canvas": {"within": "https://kotenseki.nijl.ac.jp/biblio/200015137/manifest"}, "images": "", "jsonanno": undefined, "manifest": "https://kotenseki.nijl.ac.jp/biblio/200015137/manifest", "section": undefined, "title": "8"}, {"anno": "https://kotenseki.nijl.ac.jp/biblio/200015137/list/9", "canvas": {"within": "https://kotenseki.nijl.ac.jp/biblio/200015137/manifest"}, "images": "", "jsonanno": undefined, "manifest": "https://kotenseki.nijl.ac.jp/biblio/200015137/manifest", "section": undefined, "title": "9"}, {"anno": "https://kotenseki.nijl.ac.jp/biblio/200015137/list/10", "canvas": {"within": "https://kotenseki.nijl.ac.jp/biblio/200015137/manifest"}, "images": "", "jsonanno": undefined, "manifest": "https://kotenseki.nijl.ac.jp/biblio/200015137/manifest", "section": undefined, "title": "10"}, {"anno": "https://kotenseki.nijl.ac.jp/biblio/200015137/list/11", "canvas": {"within": "https://kotenseki.nijl.ac.jp/biblio/200015137/manifest"}, "images": "", "jsonanno": undefined, "manifest": "https://kotenseki.nijl.ac.jp/biblio/200015137/manifest", "section": undefined, "title": "11"}, {"anno": "https://kotenseki.nijl.ac.jp/biblio/200015137/list/12", "canvas": {"within": "https://kotenseki.nijl.ac.jp/biblio/200015137/manifest"}, "images": "", "jsonanno": undefined, "manifest": "https://kotenseki.nijl.ac.jp/biblio/200015137/manifest", "section": undefined, "title": "12"}, {"anno": "https://kotenseki.nijl.ac.jp/biblio/200015137/list/13", "canvas": {"within": "https://kotenseki.nijl.ac.jp/biblio/200015137/manifest"}, "images": "", "jsonanno": undefined, "manifest": "https://kotenseki.nijl.ac.jp/biblio/200015137/manifest", "section": undefined, "title": "13"}, {"anno": "https://kotenseki.nijl.ac.jp/biblio/200015137/list/14", "canvas": {"within": "https://kotenseki.nijl.ac.jp/biblio/200015137/manifest"}, "images": "", "jsonanno": undefined, "manifest": "https://kotenseki.nijl.ac.jp/biblio/200015137/manifest", "section": undefined, "title": "14"}, {"anno": "https://kotenseki.nijl.ac.jp/biblio/200015137/list/15", "canvas": {"within": "https://kotenseki.nijl.ac.jp/biblio/200015137/manifest"}, "images": "", "jsonanno": undefined, "manifest": "https://kotenseki.nijl.ac.jp/biblio/200015137/manifest", "section": undefined, "title": "15"}, {"anno": "https://kotenseki.nijl.ac.jp/biblio/200015137/list/16", "canvas": {"within": "https://kotenseki.nijl.ac.jp/biblio/200015137/manifest"}, "images": "", "jsonanno": undefined, "manifest": "https://kotenseki.nijl.ac.jp/biblio/200015137/manifest", "section": undefined, "title": "16"}, {"anno": "https://kotenseki.nijl.ac.jp/biblio/200015137/list/17", "canvas": {"within": "https://kotenseki.nijl.ac.jp/biblio/200015137/manifest"}, "images": "", "jsonanno": undefined, "manifest": "https://kotenseki.nijl.ac.jp/biblio/200015137/manifest", "section": undefined, "title": "17"}, {"anno": "https://kotenseki.nijl.ac.jp/biblio/200015137/list/18", "canvas": {"within": "https://kotenseki.nijl.ac.jp/biblio/200015137/manifest"}, "images": "", "jsonanno": undefined, "manifest": "https://kotenseki.nijl.ac.jp/biblio/200015137/manifest", "section": undefined, "title": "18"}, {"anno": "https://kotenseki.nijl.ac.jp/biblio/200015137/list/20", "canvas": {"within": "https://kotenseki.nijl.ac.jp/biblio/200015137/manifest"}, "images": "", "jsonanno": undefined, "manifest": "https://kotenseki.nijl.ac.jp/biblio/200015137/manifest", "section": undefined, "title": "20"}, {"anno": "https://kotenseki.nijl.ac.jp/biblio/200015137/list/21", "canvas": {"within": "https://kotenseki.nijl.ac.jp/biblio/200015137/manifest"}, "images": "", "jsonanno": undefined, "manifest": "https://kotenseki.nijl.ac.jp/biblio/200015137/manifest", "section": undefined, "title": "21"}, {"anno": "https://kotenseki.nijl.ac.jp/biblio/200015137/list/22", "canvas": {"within": "https://kotenseki.nijl.ac.jp/biblio/200015137/manifest"}, "images": "", "jsonanno": undefined, "manifest": "https://kotenseki.nijl.ac.jp/biblio/200015137/manifest", "section": undefined, "title": "22"}, {"anno": "https://kotenseki.nijl.ac.jp/biblio/200015137/list/23", "canvas": {"within": "https://kotenseki.nijl.ac.jp/biblio/200015137/manifest"}, "images": "", "jsonanno": undefined, "manifest": "https://kotenseki.nijl.ac.jp/biblio/200015137/manifest", "section": undefined, "title": "23"}, {"anno": "https://kotenseki.nijl.ac.jp/biblio/200015137/list/24", "canvas": {"within": "https://kotenseki.nijl.ac.jp/biblio/200015137/manifest"}, "images": "", "jsonanno": undefined, "manifest": "https://kotenseki.nijl.ac.jp/biblio/200015137/manifest", "section": undefined, "title": "24"}, {"anno": "https://kotenseki.nijl.ac.jp/biblio/200015137/list/25", "canvas": {"within": "https://kotenseki.nijl.ac.jp/biblio/200015137/manifest"}, "images": "", "jsonanno": undefined, "manifest": "https://kotenseki.nijl.ac.jp/biblio/200015137/manifest", "section": undefined, "title": "25"}, {"anno": "https://kotenseki.nijl.ac.jp/biblio/200015137/list/26", "canvas": {"within": "https://kotenseki.nijl.ac.jp/biblio/200015137/manifest"}, "images": "", "jsonanno": undefined, "manifest": "https://kotenseki.nijl.ac.jp/biblio/200015137/manifest", "section": undefined, "title": "26"}, {"anno": "https://kotenseki.nijl.ac.jp/biblio/200015137/list/27", "canvas": {"within": "https://kotenseki.nijl.ac.jp/biblio/200015137/manifest"}, "images": "", "jsonanno": undefined, "manifest": "https://kotenseki.nijl.ac.jp/biblio/200015137/manifest", "section": undefined, "title": "27"}, {"anno": "https://kotenseki.nijl.ac.jp/biblio/200015137/list/28", "canvas": {"within": "https://kotenseki.nijl.ac.jp/biblio/200015137/manifest"}, "images": "", "jsonanno": undefined, "manifest": "https://kotenseki.nijl.ac.jp/biblio/200015137/manifest", "section": undefined, "title": "28"}, {"anno": "https://kotenseki.nijl.ac.jp/biblio/200015137/list/29", "canvas": {"within": "https://kotenseki.nijl.ac.jp/biblio/200015137/manifest"}, "images": "", "jsonanno": undefined, "manifest": "https://kotenseki.nijl.ac.jp/biblio/200015137/manifest", "section": undefined, "title": "29"}, {"anno": "https://kotenseki.nijl.ac.jp/biblio/200015137/list/30", "canvas": {"within": "https://kotenseki.nijl.ac.jp/biblio/200015137/manifest"}, "images": "", "jsonanno": undefined, "manifest": "https://kotenseki.nijl.ac.jp/biblio/200015137/manifest", "section": undefined, "title": "30"}, {"anno": "https://kotenseki.nijl.ac.jp/biblio/200015137/list/31", "canvas": {"within": "https://kotenseki.nijl.ac.jp/biblio/200015137/manifest"}, "images": "", "jsonanno": undefined, "manifest": "https://kotenseki.nijl.ac.jp/biblio/200015137/manifest", "section": undefined, "title": "31"}])
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
      const saveMock = jest.fn()
      wrapper.vm.createViewer = saveMock;
      await wrapper.vm.$nextTick()
      await flushPromises()
      var data = wrapper.vm.$data
      expect(data.tags).toBe(false)
      expect(data.layerslist).toBe(false)
      expect(data.isws).toBe("")
      expect(data.range).toBe(true)
      expect(data.toctitle).toEqual("Range Pages")
      expect(data.stylingstring).toEqual("autorun_interval:3;title:A Profound Warrior For Us All;")
      expect(data.annotationurl).toEqual({"anno": "https://tomcrane.github.io/iiif-collector/objects/longer-article-annos1.json", "canvas": undefined, "images": "", "jsonanno": undefined, "manifest": "", "section": undefined, "title": "Page 1"})
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
      expect(data.toctitle).toEqual("Range Pages")
      expect(data.stylingstring).toEqual("autorun_interval:4;panorzoom:pan;title:A Profound Warrior For Us All;")
      expect(data.annotationurl).toEqual({"anno": "https://tomcrane.github.io/iiif-collector/objects/longer-article-annos1.json", "canvas": undefined, "images": "", "jsonanno": undefined, "manifest": "", "section": undefined, "title": "Page 1"})
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
      expect(sbd.seadragonid).toBe("storyboard_longer-article-annos1");
      expect(sbd.annotations).toEqual([{"section": ["1958,1907,113,51"], "svg_path": [undefined], "authors": "", "label": undefined, "language": undefined, "languages": undefined, "ocr": ["Lodinv<div class=\"authorship\">Written by: https://recogito.pelagios.org/rainer</div>"], "styles": "", "itemclass": "", "stylesheet": undefined, "tags": [], "textual_body": ["<div class=\"identifying\">http://pleiades.stoa.org/places/79574<div class=\"authorship\">Written by: https://recogito.pelagios.org/rainer</div></div>"], "type": "rect"}, 
        {"styles": "", "itemclass": "", "stylesheet": undefined, "section": ["1537,579,382,352"], "svg_path": [undefined], "authors": "", "label": undefined, "language": undefined, "languages": undefined, "ocr": ["MARE HIBERNICVM<div class=\"authorship\">Written by: https://recogito.pelagios.org/rainer</div>"], "tags": [], "textual_body": [], "type": "rect"}, 
        {"section": ["1704,1509,319,123"], "styles": "", "itemclass": "", "stylesheet": undefined, "svg_path": [undefined], "authors": "", "label": undefined, "language": undefined, "languages": undefined, "ocr": ["BRITANIA INSVLA<div class=\"authorship\">Written by: https://recogito.pelagios.org/rainer</div>"], "tags": [], "textual_body": ["<div class=\"commenting\">The British Isles<div class=\"authorship\">Written by: https://recogito.pelagios.org/rainer</div></div>"], "type": "rect"}]);
      expect(sbd.currentanno).toBe("");
      expect(sbd.transcription).toBe(undefined);
      expect(sbd.textposition).toBe("corner");
      expect(sbd.prev_inactive).toBe(true);
      expect(sbd.next_inactive).toBe(false);
      expect(sbd.toolbar_id).toBe("");
      expect(sbd.booleanitems).toEqual({"additionalinfoshown": false, "annoinfoshown": false, "imageinfoshown": false, "isexcerpt": false, "isoverlaytoggled": false, "istranscription": false, "tocshown": false});
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
      expect(Object.keys(sbd.shortcuts).sort()).toEqual(['autorun', 'textoverlay', 'close', 'fullscreen', 'hide', 'home', 'info', 'layers', 'next', 'overlay', 'prev', 'shortcut', 'transcription', 'zoomin', 'zoomout'].sort());
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
      expect(data.stylingstring).toEqual("autorun_interval:3;title:Technician Basketball Special, November 1991: Text of this page (word level);")
      expect(data.annotationurl).toEqual( {"anno": "https://ocr.lib.ncsu.edu/ocr/te/technician-basketballspecial-1991-11_0001/technician-basketballspecial-1991-11_0001-annotation-list-word.json", "canvas": "https://d.lib.ncsu.edu/collections/canvas/technician-basketballspecial-1991-11_0001", "images": {"@id": "https://d.lib.ncsu.edu/collections/canvas/technician-basketballspecial-1991-11_0001", "@type": "sc:Canvas", "height": 4356, "images": [{"@id": "https://d.lib.ncsu.edu/collections/canvas/technician-basketballspecial-1991-11_0001/image", "@type": "oa:Annotation", "motivation": "sc:painting", "on": "https://d.lib.ncsu.edu/collections/canvas/technician-basketballspecial-1991-11_0001", "resource": {"@id": "https://iiif.lib.ncsu.edu/iiif/technician-basketballspecial-1991-11_0001/full/1170,/0/default.jpg", "@type": "dctypes:Image", "height": 4356, "service": {"@context": "http://iiif.io/api/image/2/context.json", "@id": "https://iiif.lib.ncsu.edu/iiif/technician-basketballspecial-1991-11_0001", "profile": "http://iiif.io/api/image/2/level2.json"}, "width": 3560}}], "label": "[1]", "otherContent": [{"@id": "https://ocr.lib.ncsu.edu/ocr/te/technician-basketballspecial-1991-11_0001/technician-basketballspecial-1991-11_0001-annotation-list-word.json", "@type": "sc:AnnotationList", "label": "Text of this page (word level)"}, {"@id": "https://ocr.lib.ncsu.edu/ocr/te/technician-basketballspecial-1991-11_0001/technician-basketballspecial-1991-11_0001-annotation-list-line.json", "@type": "sc:AnnotationList", "label": "Text of this page (line level)"}, {"@id": "https://ocr.lib.ncsu.edu/ocr/te/technician-basketballspecial-1991-11_0001/technician-basketballspecial-1991-11_0001-annotation-list-paragraph.json", "@type": "sc:AnnotationList", "label": "Text of this page (paragraph level)"}], "seeAlso": [{"@id": "https://ocr.lib.ncsu.edu/ocr/te/technician-basketballspecial-1991-11_0001/technician-basketballspecial-1991-11_0001.hocr", "format": "text/vnd.hocr+html", "label": "hOCR", "profile": "https://github.com/kba/hocr-spec/blob/master/hocr-spec.md"}, {"@id": "https://ocr.lib.ncsu.edu/ocr/te/technician-basketballspecial-1991-11_0001/technician-basketballspecial-1991-11_0001.txt", "format": "text/plain", "label": "plain text OCR"}], "width": 3560}, "jsonanno": undefined, "manifest": "https://d.lib.ncsu.edu/collections/catalog/technician-basketballspecial-1991-11/manifest", "section": undefined, "title": "Text of this page (word level)"})
      expect(data.position).toEqual(0)
      expect(data.prevPageInactive).toBe(true)
      expect(data.nextPageInactive).toBe(false)
      expect(data.rangeid).toBe('rangestoryboard_manifest')
      expect(data.isfullscreen).toBe(false)
      expect(data.toc).toEqual([
        {
          "position": 0,
          "label": "Text of this page (word level)",
          "thumbnail": "https://iiif.lib.ncsu.edu/iiif/technician-basketballspecial-1991-11_0001/full/30,/0/default.jpg",
          "description": ""
        },
        {
          "position": 1,
          "label": "Text of this page (line level)",
          "thumbnail": "https://iiif.lib.ncsu.edu/iiif/technician-basketballspecial-1991-11_0001/full/30,/0/default.jpg",
          "description": ""
        },
        {
          "position": 2,
          "label": "Text of this page (paragraph level)",
          "thumbnail": "https://iiif.lib.ncsu.edu/iiif/technician-basketballspecial-1991-11_0001/full/30,/0/default.jpg",
          "description": ""
        },
        {
          "position": 3,
          "label": "Text of this page (word level)",
          "thumbnail": "https://iiif.lib.ncsu.edu/iiif/technician-basketballspecial-1991-11_0002/full/30,/0/default.jpg",
          "description": ""
        },
        {
          "position": 4,
          "label": "Text of this page (line level)",
          "thumbnail": "https://iiif.lib.ncsu.edu/iiif/technician-basketballspecial-1991-11_0002/full/30,/0/default.jpg",
          "description": ""
        },
        {
          "position": 5,
          "label": "Text of this page (paragraph level)",
          "thumbnail": "https://iiif.lib.ncsu.edu/iiif/technician-basketballspecial-1991-11_0002/full/30,/0/default.jpg",
          "description": ""
        },
        {
          "position": 6,
          "label": "Text of this page (word level)",
          "thumbnail": "https://iiif.lib.ncsu.edu/iiif/technician-basketballspecial-1991-11_0003/full/30,/0/default.jpg",
          "description": ""
        },
        {
          "position": 7,
          "label": "Text of this page (line level)",
          "thumbnail": "https://iiif.lib.ncsu.edu/iiif/technician-basketballspecial-1991-11_0003/full/30,/0/default.jpg",
          "description": ""
        },
        {
          "position": 8,
          "label": "Text of this page (paragraph level)",
          "thumbnail": "https://iiif.lib.ncsu.edu/iiif/technician-basketballspecial-1991-11_0003/full/30,/0/default.jpg",
          "description": ""
        },
        {
          "position": 9,
          "label": "Text of this page (word level)",
          "thumbnail": "https://iiif.lib.ncsu.edu/iiif/technician-basketballspecial-1991-11_0004/full/30,/0/default.jpg",
          "description": ""
        },
        {
          "position": 10,
          "label": "Text of this page (line level)",
          "thumbnail": "https://iiif.lib.ncsu.edu/iiif/technician-basketballspecial-1991-11_0004/full/30,/0/default.jpg",
          "description": ""
        },
        {
          "position": 11,
          "label": "Text of this page (paragraph level)",
          "thumbnail": "https://iiif.lib.ncsu.edu/iiif/technician-basketballspecial-1991-11_0004/full/30,/0/default.jpg",
          "description": ""
        },
        {
          "position": 12,
          "label": "Text of this page (word level)",
          "thumbnail": "https://iiif.lib.ncsu.edu/iiif/technician-basketballspecial-1991-11_0005/full/30,/0/default.jpg",
          "description": ""
        },
        {
          "position": 13,
          "label": "Text of this page (line level)",
          "thumbnail": "https://iiif.lib.ncsu.edu/iiif/technician-basketballspecial-1991-11_0005/full/30,/0/default.jpg",
          "description": ""
        },
        {
          "position": 14,
          "label": "Text of this page (paragraph level)",
          "thumbnail": "https://iiif.lib.ncsu.edu/iiif/technician-basketballspecial-1991-11_0005/full/30,/0/default.jpg",
          "description": ""
        },
        {
          "position": 15,
          "label": "Text of this page (word level)",
          "thumbnail": "https://iiif.lib.ncsu.edu/iiif/technician-basketballspecial-1991-11_0006/full/30,/0/default.jpg",
          "description": ""
        },
        {
          "position": 16,
          "label": "Text of this page (line level)",
          "thumbnail": "https://iiif.lib.ncsu.edu/iiif/technician-basketballspecial-1991-11_0006/full/30,/0/default.jpg",
          "description": ""
        },
        {
          "position": 17,
          "label": "Text of this page (paragraph level)",
          "thumbnail": "https://iiif.lib.ncsu.edu/iiif/technician-basketballspecial-1991-11_0006/full/30,/0/default.jpg",
          "description": ""
        },
        {
          "position": 18,
          "label": "Text of this page (word level)",
          "thumbnail": "https://iiif.lib.ncsu.edu/iiif/technician-basketballspecial-1991-11_0007/full/30,/0/default.jpg",
          "description": ""
        },
        {
          "position": 19,
          "label": "Text of this page (line level)",
          "thumbnail": "https://iiif.lib.ncsu.edu/iiif/technician-basketballspecial-1991-11_0007/full/30,/0/default.jpg",
          "description": ""
        },
        {
          "position": 20,
          "label": "Text of this page (paragraph level)",
          "thumbnail": "https://iiif.lib.ncsu.edu/iiif/technician-basketballspecial-1991-11_0007/full/30,/0/default.jpg",
          "description": ""
        },
        {
          "position": 21,
          "label": "Text of this page (word level)",
          "thumbnail": "https://iiif.lib.ncsu.edu/iiif/technician-basketballspecial-1991-11_0008/full/30,/0/default.jpg",
          "description": ""
        },
        {
          "position": 22,
          "label": "Text of this page (line level)",
          "thumbnail": "https://iiif.lib.ncsu.edu/iiif/technician-basketballspecial-1991-11_0008/full/30,/0/default.jpg",
          "description": ""
        },
        {
          "position": 23,
          "label": "Text of this page (paragraph level)",
          "thumbnail": "https://iiif.lib.ncsu.edu/iiif/technician-basketballspecial-1991-11_0008/full/30,/0/default.jpg",
          "description": ""
        },
        {
          "position": 24,
          "label": "Text of this page (word level)",
          "thumbnail": "https://iiif.lib.ncsu.edu/iiif/technician-basketballspecial-1991-11_0009/full/30,/0/default.jpg",
          "description": ""
        },
        {
          "position": 25,
          "label": "Text of this page (line level)",
          "thumbnail": "https://iiif.lib.ncsu.edu/iiif/technician-basketballspecial-1991-11_0009/full/30,/0/default.jpg",
          "description": ""
        },
        {
          "position": 26,
          "label": "Text of this page (paragraph level)",
          "thumbnail": "https://iiif.lib.ncsu.edu/iiif/technician-basketballspecial-1991-11_0009/full/30,/0/default.jpg",
          "description": ""
        },
        {
          "position": 27,
          "label": "Text of this page (word level)",
          "thumbnail": "https://iiif.lib.ncsu.edu/iiif/technician-basketballspecial-1991-11_0010/full/30,/0/default.jpg",
          "description": ""
        },
        {
          "position": 28,
          "label": "Text of this page (line level)",
          "thumbnail": "https://iiif.lib.ncsu.edu/iiif/technician-basketballspecial-1991-11_0010/full/30,/0/default.jpg",
          "description": ""
        },
        {
          "position": 29,
          "label": "Text of this page (paragraph level)",
          "thumbnail": "https://iiif.lib.ncsu.edu/iiif/technician-basketballspecial-1991-11_0010/full/30,/0/default.jpg",
          "description": ""
        },
        {
          "position": 30,
          "label": "Text of this page (word level)",
          "thumbnail": "https://iiif.lib.ncsu.edu/iiif/technician-basketballspecial-1991-11_0011/full/30,/0/default.jpg",
          "description": ""
        },
        {
          "position": 31,
          "label": "Text of this page (line level)",
          "thumbnail": "https://iiif.lib.ncsu.edu/iiif/technician-basketballspecial-1991-11_0011/full/30,/0/default.jpg",
          "description": ""
        },
        {
          "position": 32,
          "label": "Text of this page (paragraph level)",
          "thumbnail": "https://iiif.lib.ncsu.edu/iiif/technician-basketballspecial-1991-11_0011/full/30,/0/default.jpg",
          "description": ""
        },
        {
          "position": 33,
          "label": "Text of this page (word level)",
          "thumbnail": "https://iiif.lib.ncsu.edu/iiif/technician-basketballspecial-1991-11_0012/full/30,/0/default.jpg",
          "description": ""
        },
        {
          "position": 34,
          "label": "Text of this page (line level)",
          "thumbnail": "https://iiif.lib.ncsu.edu/iiif/technician-basketballspecial-1991-11_0012/full/30,/0/default.jpg",
          "description": ""
        },
        {
          "position": 35,
          "label": "Text of this page (paragraph level)",
          "thumbnail": "https://iiif.lib.ncsu.edu/iiif/technician-basketballspecial-1991-11_0012/full/30,/0/default.jpg",
          "description": ""
        },
        {
          "position": 36,
          "label": "Text of this page (word level)",
          "thumbnail": "https://iiif.lib.ncsu.edu/iiif/technician-basketballspecial-1991-11_0013/full/30,/0/default.jpg",
          "description": ""
        },
        {
          "position": 37,
          "label": "Text of this page (line level)",
          "thumbnail": "https://iiif.lib.ncsu.edu/iiif/technician-basketballspecial-1991-11_0013/full/30,/0/default.jpg",
          "description": ""
        },
        {
          "position": 38,
          "label": "Text of this page (paragraph level)",
          "thumbnail": "https://iiif.lib.ncsu.edu/iiif/technician-basketballspecial-1991-11_0013/full/30,/0/default.jpg",
          "description": ""
        },
        {
          "position": 39,
          "label": "Text of this page (word level)",
          "thumbnail": "https://iiif.lib.ncsu.edu/iiif/technician-basketballspecial-1991-11_0014/full/30,/0/default.jpg",
          "description": ""
        },
        {
          "position": 40,
          "label": "Text of this page (line level)",
          "thumbnail": "https://iiif.lib.ncsu.edu/iiif/technician-basketballspecial-1991-11_0014/full/30,/0/default.jpg",
          "description": ""
        },
        {
          "position": 41,
          "label": "Text of this page (paragraph level)",
          "thumbnail": "https://iiif.lib.ncsu.edu/iiif/technician-basketballspecial-1991-11_0014/full/30,/0/default.jpg",
          "description": ""
        },
        {
          "position": 42,
          "label": "Text of this page (word level)",
          "thumbnail": "https://iiif.lib.ncsu.edu/iiif/technician-basketballspecial-1991-11_0015/full/30,/0/default.jpg",
          "description": ""
        },
        {
          "position": 43,
          "label": "Text of this page (line level)",
          "thumbnail": "https://iiif.lib.ncsu.edu/iiif/technician-basketballspecial-1991-11_0015/full/30,/0/default.jpg",
          "description": ""
        },
        {
          "position": 44,
          "label": "Text of this page (paragraph level)",
          "thumbnail": "https://iiif.lib.ncsu.edu/iiif/technician-basketballspecial-1991-11_0015/full/30,/0/default.jpg",
          "description": ""
        },
        {
          "position": 45,
          "label": "Text of this page (word level)",
          "thumbnail": "https://iiif.lib.ncsu.edu/iiif/technician-basketballspecial-1991-11_0016/full/30,/0/default.jpg",
          "description": ""
        },
        {
          "position": 46,
          "label": "Text of this page (line level)",
          "thumbnail": "https://iiif.lib.ncsu.edu/iiif/technician-basketballspecial-1991-11_0016/full/30,/0/default.jpg",
          "description": ""
        },
        {
          "position": 47,
          "label": "Text of this page (paragraph level)",
          "thumbnail": "https://iiif.lib.ncsu.edu/iiif/technician-basketballspecial-1991-11_0016/full/30,/0/default.jpg",
          "description": ""
        },
        {
          "position": 48,
          "label": "Text of this page (word level)",
          "thumbnail": "https://iiif.lib.ncsu.edu/iiif/technician-basketballspecial-1991-11_0017/full/30,/0/default.jpg",
          "description": ""
        },
        {
          "position": 49,
          "label": "Text of this page (line level)",
          "thumbnail": "https://iiif.lib.ncsu.edu/iiif/technician-basketballspecial-1991-11_0017/full/30,/0/default.jpg",
          "description": ""
        },
        {
          "position": 50,
          "label": "Text of this page (paragraph level)",
          "thumbnail": "https://iiif.lib.ncsu.edu/iiif/technician-basketballspecial-1991-11_0017/full/30,/0/default.jpg",
          "description": ""
        },
        {
          "position": 51,
          "label": "Text of this page (word level)",
          "thumbnail": "https://iiif.lib.ncsu.edu/iiif/technician-basketballspecial-1991-11_0018/full/30,/0/default.jpg",
          "description": ""
        },
        {
          "position": 52,
          "label": "Text of this page (line level)",
          "thumbnail": "https://iiif.lib.ncsu.edu/iiif/technician-basketballspecial-1991-11_0018/full/30,/0/default.jpg",
          "description": ""
        },
        {
          "position": 53,
          "label": "Text of this page (paragraph level)",
          "thumbnail": "https://iiif.lib.ncsu.edu/iiif/technician-basketballspecial-1991-11_0018/full/30,/0/default.jpg",
          "description": ""
        },
        {
          "position": 54,
          "label": "Text of this page (word level)",
          "thumbnail": "https://iiif.lib.ncsu.edu/iiif/technician-basketballspecial-1991-11_0019/full/30,/0/default.jpg",
          "description": ""
        },
        {
          "position": 55,
          "label": "Text of this page (line level)",
          "thumbnail": "https://iiif.lib.ncsu.edu/iiif/technician-basketballspecial-1991-11_0019/full/30,/0/default.jpg",
          "description": ""
        },
        {
          "position": 56,
          "label": "Text of this page (paragraph level)",
          "thumbnail": "https://iiif.lib.ncsu.edu/iiif/technician-basketballspecial-1991-11_0019/full/30,/0/default.jpg",
          "description": ""
        },
        {
          "position": 57,
          "label": "Text of this page (word level)",
          "thumbnail": "https://iiif.lib.ncsu.edu/iiif/technician-basketballspecial-1991-11_0020/full/30,/0/default.jpg",
          "description": ""
        },
        {
          "position": 58,
          "label": "Text of this page (line level)",
          "thumbnail": "https://iiif.lib.ncsu.edu/iiif/technician-basketballspecial-1991-11_0020/full/30,/0/default.jpg",
          "description": ""
        },
        {
          "position": 59,
          "label": "Text of this page (paragraph level)",
          "thumbnail": "https://iiif.lib.ncsu.edu/iiif/technician-basketballspecial-1991-11_0020/full/30,/0/default.jpg",
          "description": ""
        },
        {
          "position": 60,
          "label": "Text of this page (word level)",
          "thumbnail": "https://iiif.lib.ncsu.edu/iiif/technician-basketballspecial-1991-11_0021/full/30,/0/default.jpg",
          "description": ""
        },
        {
          "position": 61,
          "label": "Text of this page (line level)",
          "thumbnail": "https://iiif.lib.ncsu.edu/iiif/technician-basketballspecial-1991-11_0021/full/30,/0/default.jpg",
          "description": ""
        },
        {
          "position": 62,
          "label": "Text of this page (paragraph level)",
          "thumbnail": "https://iiif.lib.ncsu.edu/iiif/technician-basketballspecial-1991-11_0021/full/30,/0/default.jpg",
          "description": ""
        },
        {
          "position": 63,
          "label": "Text of this page (word level)",
          "thumbnail": "https://iiif.lib.ncsu.edu/iiif/technician-basketballspecial-1991-11_0022/full/30,/0/default.jpg",
          "description": ""
        },
        {
          "position": 64,
          "label": "Text of this page (line level)",
          "thumbnail": "https://iiif.lib.ncsu.edu/iiif/technician-basketballspecial-1991-11_0022/full/30,/0/default.jpg",
          "description": ""
        },
        {
          "position": 65,
          "label": "Text of this page (paragraph level)",
          "thumbnail": "https://iiif.lib.ncsu.edu/iiif/technician-basketballspecial-1991-11_0022/full/30,/0/default.jpg",
          "description": ""
        },
        {
          "position": 66,
          "label": "Text of this page (word level)",
          "thumbnail": "https://iiif.lib.ncsu.edu/iiif/technician-basketballspecial-1991-11_0023/full/30,/0/default.jpg",
          "description": ""
        },
        {
          "position": 67,
          "label": "Text of this page (line level)",
          "thumbnail": "https://iiif.lib.ncsu.edu/iiif/technician-basketballspecial-1991-11_0023/full/30,/0/default.jpg",
          "description": ""
        },
        {
          "position": 68,
          "label": "Text of this page (paragraph level)",
          "thumbnail": "https://iiif.lib.ncsu.edu/iiif/technician-basketballspecial-1991-11_0023/full/30,/0/default.jpg",
          "description": ""
        },
        {
          "position": 69,
          "label": "Text of this page (word level)",
          "thumbnail": "https://iiif.lib.ncsu.edu/iiif/technician-basketballspecial-1991-11_0024/full/30,/0/default.jpg",
          "description": ""
        },
        {
          "position": 70,
          "label": "Text of this page (line level)",
          "thumbnail": "https://iiif.lib.ncsu.edu/iiif/technician-basketballspecial-1991-11_0024/full/30,/0/default.jpg",
          "description": ""
        },
        {
          "position": 71,
          "label": "Text of this page (paragraph level)",
          "thumbnail": "https://iiif.lib.ncsu.edu/iiif/technician-basketballspecial-1991-11_0024/full/30,/0/default.jpg",
          "description": ""
        }
      ])
      expect(data.viewingDirection).toBe('ltr')
      expect(data.rangetitle).toBe("Technician Basketball Special, November 1991");
      var sbd = wrapper.vm.$children[0].$el['__vue__']._data;
      expect(sbd.seadragontile).toEqual("https://iiif.lib.ncsu.edu/iiif/technician-basketballspecial-1991-11_0001/info.json")
      expect(sbd.position).toBe(-1);
      expect(sbd.seadragonid).toBe("storyboard_technician-basketballspecial-1991-11_0001-annotation-word");
      expect(sbd.annotations).toEqual([{"section": ["6270,3903,2250,2250"], "styles": "", "itemclass": "", "stylesheet": undefined, "svg_path": [undefined], "type": "rect", "authors": "", "label": undefined, "language": undefined, "languages": undefined, "ocr": ["Annotation 1"], "tags": [], "textual_body": []}, {"section": ["12288,16567,2250,2250"], "styles": "", "itemclass": "", "stylesheet": undefined, "svg_path": [undefined], "type": "rect", "authors": "", "label": undefined, "language": undefined, "languages": undefined, "ocr": ["Annotation 2"], "tags": [], "textual_body": []}]);
      expect(sbd.currentanno).toBe("");
      expect(sbd.transcription).toBe(undefined);
      expect(sbd.textposition).toBe("corner");
      expect(sbd.prev_inactive).toBe(true);
      expect(sbd.next_inactive).toBe(false);
      expect(sbd.toolbar_id).toBe("");
      expect(sbd.booleanitems).toEqual({"additionalinfoshown": false, "annoinfoshown": false, "imageinfoshown": false, "isexcerpt": false, "isoverlaytoggled": false, "istranscription": false, "tocshown": false});
      expect(sbd.shown).toBe(false);
      expect(sbd.mapmarker).toBe("<i class=\"fas fa-map-marker-alt map-marker\"></i>");
      expect(sbd.isautorunning).toBe("");
      expect(sbd.settings).toEqual({"autorun_interval": 3, "title": "Technician Basketball Special, November 1991: Text of this page (word level)", "truncate_length": 2});
      expect(sbd.currentlang).toBe("");
      expect(sbd.languages).toEqual([]);
      expect(sbd.fullscreen).toBe(false);
      expect(sbd.tagslist).toEqual({});
      expect(sbd.imageinfo).toEqual({"label": "Manifest information", "text": "<div id=\"Manifest\"><b>Manifest: </b><a href=\"https://d.lib.ncsu.edu/collections/catalog/technician-basketballspecial-1991-11/manifest\" target=\"_blank\">https://d.lib.ncsu.edu/collections/catalog/technician-basketballspecial-1991-11/manifest</a></div><div id=\"title\"><b>Title: </b>Technician Basketball Special, November 1991</div><div id=\"attribution\"><b>Attribution: </b>Technician (Raleigh, N.C.) (LH1 .N6 T4), Special Collections Research Center at NC State University Libraries</div><div id=\"license\"><b>License: </b>https://d.lib.ncsu.edu/collections/about#rights_and_use</div><div id=\"title\"><b>Title: </b>Technician Basketball Special, November 1991</div><div id=\"Creator\"><b>Creator: </b><span><a href=\"https://d.lib.ncsu.edu/collections/catalog?f%5Bnames_facet%5D%5B%5D=Technician+%28Raleigh%2C+N.C.%29\">Technician (Raleigh, N.C.)</a> (Publisher)</span></div><div id=\"Created Date\"><b>Created Date: </b>1991-11</div><div id=\"URL\"><b>URL: </b><span><a href=\"https://d.lib.ncsu.edu/collections/catalog/technician-basketballspecial-1991-11\">https://d.lib.ncsu.edu/collections/catalog/technician-basketballspecial-1991-11</a></span></div><div id=\"\"></b><span><a title=\"IIIF drag &amp; drop\" href=\"https://d.lib.ncsu.edu/collections/catalog/technician-basketballspecial-1991-11?manifest=https%3A%2F%2Fd.lib.ncsu.edu%2Fcollections%2Fcatalog%2Ftechnician-basketballspecial-1991-11%2Fmanifest.json\">IIIF drag &amp; drop</a> (<a href=\"https://d.lib.ncsu.edu/collections/about-iiif\">About IIIF</a>)</span></div><div id=\"imageurl\"><b>Image URL: </b><a href=\"https://iiif.lib.ncsu.edu/iiif/technician-basketballspecial-1991-11_0001/info.json\" target=\"_blank\">https://iiif.lib.ncsu.edu/iiif/technician-basketballspecial-1991-11_0001/info.json</a></div>"});
      expect(sbd.imagetitle).toBe("Technician Basketball Special, November 1991: Text of this page (word level)");
      expect(sbd.layerslist).toEqual([{"checked": true, "label": "Layer 1", "opacity": 1, "tile": "https://iiif.lib.ncsu.edu/iiif/technician-basketballspecial-1991-11_0001/info.json", "xywh": ""}]);
      expect(Object.keys(sbd.shortcuts).sort()).toEqual(['autorun', 'close', 'textoverlay', 'fullscreen', 'hide', 'home', 'info', 'next', 'nextanno', 'overlay', 'prev', 'prevanno', 'shortcut', 'zoomin', 'zoomout'].sort());
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
      expect(sbd.seadragonid).toBe("storyboard_list");
      expect(sbd.annotations[0]).toEqual({"section": ["6270,3903,2250,2250"], "styles": "", "itemclass": "", "stylesheet": undefined, "svg_path": [undefined], "authors": "", "label": undefined, "language": undefined, "languages": undefined, "ocr": ["When this double portrait was painted, Jean de Dinteville, Seigneur de Polisy, was ambassador to London from the court of the French king, François I."], "tags": [], "textual_body": [], "type": "rect"});
      expect(sbd.currentanno).toBe("");
      expect(sbd.transcription).toBe(undefined);
      expect(sbd.textposition).toBe("corner");
      expect(sbd.prev_inactive).toBe(true);
      expect(sbd.next_inactive).toBe(false);
      expect(sbd.toolbar_id).toBe("");
      expect(sbd.booleanitems).toEqual({"additionalinfoshown": false, "annoinfoshown": false, "imageinfoshown": false, "isexcerpt": false, "isoverlaytoggled": false, "istranscription": false, "tocshown": false});
      expect(sbd.shown).toBe(false);
      expect(sbd.mapmarker).toBe("<i class=\"fas fa-map-marker-alt map-marker\"></i>");
      expect(sbd.isautorunning).toBe("");
      expect(sbd.settings).toEqual({"autorun_interval": 3, "fit": "horizontal", "title": "Bayeux Tapestry test", "toggleoverlay": true, "truncate_length": 2});
      expect(sbd.currentlang).toBe("");
      expect(sbd.languages).toEqual([]);
      expect(sbd.fullscreen).toBe(false);
      expect(sbd.tagslist).toEqual({});
      expect(sbd.imageinfo).toEqual({"label": "Image information", "text": "<div id=\"Manifest\"><b>Manifest: </b><a href=\"https://storiiies.cogapp.com/holbein/manifest.json\" target=\"_blank\">https://storiiies.cogapp.com/holbein/manifest.json</a></div><div id=\"title\"><b>Title: </b>Holbein's 'The Ambassadors'</div><div id=\"description\"><b>Description: </b>Let's explore some of the symbolism and features in this iconic painting</div><div id=\"attribution\"><b>Attribution: </b>Copyright National Gallery, London; used under license.</div><div id=\"imageurl\"><b>Image URL: </b><a href=\"https://images.cogapp.com/iiif/holbein_big_p.tif/info.json\" target=\"_blank\">https://images.cogapp.com/iiif/holbein_big_p.tif/info.json</a></div>"});
      expect(sbd.imagetitle).toBe("Bayeux Tapestry test");
      expect(sbd.layerslist).toEqual([{"checked": true, "label": "Layer 1", "opacity": 1, "tile": "https://images.cogapp.com/iiif/holbein_big_p.tif/info.json"}]);
      expect(Object.keys(sbd.shortcuts).sort()).toEqual(['autorun', 'textoverlay', 'close', 'fullscreen', 'hide', 'home', 'info', 'next', 'nextanno', 'overlay', 'prev', 'prevanno', 'shortcut', 'zoomin', 'zoomout'].sort());
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
      expect(data.layerslist).toBe(false)
      expect(data.range).toBe(true)
      expect(data.toctitle).toEqual("Range Pages")
      expect(data.stylingstring).toEqual("autorun_interval:3;title:Holbein's 'The Ambassadors': The Ambassadors;")
      expect(data.annotationurl).toEqual({"anno": "https://storiiies.cogapp.com/holbein/annotations/list.json", "canvas": "https://storiies.cogapp.com/holbein/canvas/c0", "images": {"@context": "http://iiif.io/api/presentation/2/context.json", "@id": "https://storiies.cogapp.com/holbein/canvas/c0", "@type": "sc:Canvas", "description": {"@language": "en", "@value": "The Ambassadors by Hans Holbein the Younger (National Gallery, London) was created in 1533, the year that Elizabeth I was born. A striking life-scale double portrait, it also depicts numerous meticulously rendered objects and includes a rare and much-cited example of anamorphosis. The meaning of the painting and the objects it depicts has been the cause of much debate."}, "height": 29560, "images": [{"@id": "https://storiies.cogapp.com/holbein/image/i0", "@type": "oa:Annotation", "motivation": "sc:painting", "on": "https://storiies.cogapp.com/holbein/canvas/c0", "resource": {"@id": "https://images.cogapp.com/iiif/holbein_big_p.tif/full/full/0/default.jpg", "@type": "dctypes:Image", "format": "image/jpeg", "height": 29560, "service": {"@context": "http://iiif.io/api/image/2/context.json", "@id": "https://images.cogapp.com/iiif/holbein_big_p.tif", "profile": "http://iiif.io/api/image/1/level2.json"}, "width": 30000}}], "label": {"@language": "en", "@value": "The Ambassadors"}, "otherContent": [{"@id": "https://storiiies.cogapp.com/holbein/annotations/list.json", "@type": "sc:AnnotationList"}], "width": 30000}, "jsonanno": undefined, "manifest": "https://storiiies.cogapp.com/holbein/manifest.json", "section": undefined, "title": "The Ambassadors"})
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
      expect(sbd.seadragonid).toBe("storyboard_list");
      expect(sbd.annotations[0]).toEqual({"section": ["6270,3903,2250,2250"], "styles": "", "itemclass": "", "stylesheet": undefined, "svg_path": [undefined], "authors": "", "label": undefined, "language": undefined, "languages": undefined, "ocr": ["When this double portrait was painted, Jean de Dinteville, Seigneur de Polisy, was ambassador to London from the court of the French king, François I."], "tags": [], "textual_body": [], "type": "rect"});
      expect(sbd.currentanno).toBe("");
      expect(sbd.transcription).toBe(undefined);
      expect(sbd.textposition).toBe("corner");
      expect(sbd.prev_inactive).toBe(true);
      expect(sbd.next_inactive).toBe(false);
      expect(sbd.toolbar_id).toBe("");
      expect(sbd.booleanitems).toEqual({"additionalinfoshown": false, "annoinfoshown": false, "imageinfoshown": false, "isexcerpt": false, "isoverlaytoggled": false, "istranscription": false, "tocshown": false});
      expect(sbd.shown).toBe(false);
      expect(sbd.mapmarker).toBe("<i class=\"fas fa-map-marker-alt map-marker\"></i>");
      expect(sbd.isautorunning).toBe("");
      expect(sbd.settings).toEqual({"autorun_interval": 3, "title": "Holbein's 'The Ambassadors': The Ambassadors", "truncate_length": 2});
      expect(sbd.currentlang).toBe("");
      expect(sbd.languages).toEqual([]);
      expect(sbd.fullscreen).toBe(false);
      expect(sbd.tagslist).toEqual({});
      expect(sbd.imageinfo).toEqual({"label": "Image information", "text": "<div id=\"Manifest\"><b>Manifest: </b><a href=\"https://storiiies.cogapp.com/holbein/manifest.json\" target=\"_blank\">https://storiiies.cogapp.com/holbein/manifest.json</a></div><div id=\"title\"><b>Title: </b>Holbein's 'The Ambassadors'</div><div id=\"description\"><b>Description: </b>Let's explore some of the symbolism and features in this iconic painting</div><div id=\"attribution\"><b>Attribution: </b>Copyright National Gallery, London; used under license.</div><div id=\"imageurl\"><b>Image URL: </b><a href=\"https://images.cogapp.com/iiif/holbein_big_p.tif/info.json\" target=\"_blank\">https://images.cogapp.com/iiif/holbein_big_p.tif/info.json</a></div>"});
      expect(sbd.imagetitle).toBe("Holbein's 'The Ambassadors': The Ambassadors");
      expect(sbd.layerslist).toEqual([{"checked": true, "label": "Layer 1", "opacity": 1, "tile": "https://images.cogapp.com/iiif/holbein_big_p.tif/info.json", "xywh": ""}]);
      expect(Object.keys(sbd.shortcuts).sort()).toEqual(['autorun', 'textoverlay', 'close', 'fullscreen', 'hide', 'home', 'info', 'next', 'overlay', 'prev', 'shortcut', 'zoomin', 'zoomout'].sort());
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
      expect(data.layerslist).toBe(false)
      expect(data.range).toBe(true)
      expect(data.toctitle).toEqual("Range Pages")
      expect(data.stylingstring).toEqual("autorun_interval:3;title:Cunard Line - to all parts of the world: Object image 0;")
      expect(data.position).toEqual(0)
      expect(data.prevPageInactive).toBe(true)
      expect(data.nextPageInactive).toBe(true)
      expect(data.rangeid).toBe('rangestoryboard_ocean-liners.json')
      expect(data.isfullscreen).toBe(false)
      expect(data.toc).toEqual([{"description": "", "label": "Object image 0", "position": 0, "thumbnail": "https://framemark.vam.ac.uk/collections/2013GU2911/full/30,/0/default.jpg"}])
      expect(data.viewingDirection).toBe('ltr')
      expect(data.rangetitle).toBe("Cunard Line - to all parts of the world");
      var sbd = wrapper.vm.$children[0].$el['__vue__']._data;
      expect(sbd.seadragontile).toEqual("https://framemark.vam.ac.uk/collections/2013GU2911/info.json")
      expect(sbd.position).toBe(-1);
      expect(sbd.seadragonid).toBe("storyboard_p1");
      expect(sbd.annotations[2]).toEqual({"styles": "", "itemclass": "", "stylesheet": undefined, "authors": "", "label": undefined, "language": undefined, "languages": undefined, "ocr": [], "section": ["2000,2800,400,400"], "svg_path": [undefined], "tags": [], "textual_body": ["<div class=\"describing\"><h2 class=\"annotatedzoom-annotation-detail__label\">First-class restaurant</h2><div class=\"annotatedzoom-annotation-detail__content\"><img class=\"annotatedzoom-annotation-detail__image\" src=\"https://media.vam.ac.uk/feature/annotatedzoom/O1023003/2017KE6204-Aquitania-restaurant-cropped.jpg\" width=300 height=250/><p>Dining on ocean liners was a radically different experience depending on the class of travel. In first class, the <i>Aquitania</i>&#39;s Louis XVI-style dining room offered seating in small isolated groups, echoing elegant restaurants on land. The ship&#39;s architect, Arthur Davis, explained that a &ldquo;cheerful room with comfortable surroundings&rdquo; was a necessary distraction from &ldquo;the often very unpleasant conditions&rdquo; at sea. </p><p class=\"annotatedzoom-annotation-detail__credit\">Photograph from <em>The New Art of Going Abroad</em>, 1929, US. National Art Library: 38041986015030. &copy; Victoria and Albert Museum, London</p></div></div>"], "type": "rect"});
      expect(sbd.currentanno).toBe("");
      expect(sbd.transcription).toBe(undefined);
      expect(sbd.textposition).toBe("corner");
      expect(sbd.prev_inactive).toBe(true);
      expect(sbd.next_inactive).toBe(false);
      expect(sbd.toolbar_id).toBe("");
      expect(sbd.booleanitems).toEqual({"additionalinfoshown": false, "annoinfoshown": false, "imageinfoshown": false, "isexcerpt": false, "isoverlaytoggled": false, "istranscription": false, "tocshown": false});
      expect(sbd.shown).toBe(false);
      expect(sbd.mapmarker).toBe("<i class=\"fas fa-map-marker-alt map-marker\"></i>");
      expect(sbd.isautorunning).toBe("");
      expect(sbd.settings).toEqual({"autorun_interval": 3, "title": "Cunard Line - to all parts of the world: Object image 0", "truncate_length": 2});
      expect(sbd.currentlang).toBe("");
      expect(sbd.languages).toEqual([]);
      expect(sbd.fullscreen).toBe(false);
      expect(sbd.tagslist).toEqual({});
      expect(sbd.imageinfo).toEqual({"label": "Image information", "text": "<div id=\"Manifest\"><b>Manifest: </b><a href=\"https://stephenwf.github.io/ocean-liners.json\" target=\"_blank\">https://stephenwf.github.io/ocean-liners.json</a></div><div id=\"title\"><b>Title: </b>Cunard Line - to all parts of the world</div><div id=\"Museum number\"><b>Museum number: </b>E.1829-2004</div><div id=\"title\"><b>Title: </b>Cunard Line - to all parts of the world</div><div id=\"Descriptive Line\"><b>Descriptive Line: </b>Chromolithograph travel poster for \"Cunard Line - to all parts of the world\", depicting a cross section of the Aquitania at sea, printed by Thos. Forman & Sons, Nottingham, ca. 1920.</div><div id=\"Collection\"><b>Collection: </b>PDP</div><div id=\"Place\"><b>Place: </b>Nottingham (printed)</div><div id=\"Materials & Techniques\"><b>Materials & Techniques: </b>chromolithograph</div><div id=\"Date\"><b>Date: </b>ca. 1920 (made)</div><div id=\"Categories\"><b>Categories: </b>Posters;Boats and ships;Tourism & Travel</div><div id=\"Description\"><b>Description: </b>Chromolithograph travel poster for \"Cunard Line - to all parts of the world\", depicting a cross section of the Aquitania at sea, printed by Thos. Forman & Sons, Nottingham, ca. 1920.</div><div id=\"imageurl\"><b>Image URL: </b><a href=\"https://framemark.vam.ac.uk/collections/2013GU2911/info.json\" target=\"_blank\">https://framemark.vam.ac.uk/collections/2013GU2911/info.json</a></div>"});
      expect(sbd.imagetitle).toBe("Cunard Line - to all parts of the world: Object image 0");
      expect(sbd.layerslist).toEqual([{"checked": true, "label": "Layer 1", "opacity": 1, "tile": "https://framemark.vam.ac.uk/collections/2013GU2911/info.json", "xywh": ""}]);
      expect(Object.keys(sbd.shortcuts).sort()).toEqual(['autorun', 'close', 'fullscreen', 'hide', 'home', 'info', 'next', 'overlay', 'prev', 'shortcut', 'zoomin', 'zoomout'].sort());
      wrapper.destroy()
    })
})