import Vue from 'vue'
//import index from 'karma-chai'
import { mount } from '@vue/test-utils';
import { shallowMount } from '@vue/test-utils';

import rangestoryboard from '../src/components/rangestoryboard.vue';
import shared from '../src/components/shared.js'

import flushPromises from 'flush-promises';
let consoleSpy;


describe('Component', () => {
    test('test range list', async ()  => {
      const wrapper =  shallowMount(rangestoryboard,{
        propsData: {
          rangeurl: 'range.json'
        }
      })
      const saveMock = jest.fn()
      wrapper.vm.createViewer = saveMock;
      await wrapper.vm.$nextTick()
      await flushPromises()
      var data = wrapper.vm.$data
      expect(data.tags).toBe(false)
      expect(data.layerslist).toBe(false)
      expect(wrapper.isws).toBe(undefined)
      expect(data.buttons).toEqual({"autorunbutton": "<i class=\"fas fa-magic\"></i>", "expandbutton": "<i class=\"fas fa-expand\"></i>", "hide_button": "<i class=\"fas fa-caret-up\"></i>", "info": "<i class=\"fas fa-info-circle\"></i>", "layer": "<i class=\"fas fa-layer-group\"></i>", "next": "<i class=\"fas fa-chevron-left\"></i>", "overlaybutton": "<i class=\"fas fa-toggle-on\"></i>", "playpause": "<i class=\"fas fa-play\"></i>", "prev": "<i class=\"fas fa-chevron-right\"></i>", "tags": "<i class=\"fas fa-tag\"></i>"})
      expect(data.range).toBe(true)
      expect(data.toctitle).toEqual("Range Pages")
      expect(data.stylingstring).toEqual("autorun_interval:3;title:十二類絵巻: 1;")
      expect(data.annotationurl).toEqual({"anno": "https://kotenseki.nijl.ac.jp/biblio/200015137/list/1", "canvas": {"within": "https://kotenseki.nijl.ac.jp/biblio/200015137/manifest"}, "manifest": "https://kotenseki.nijl.ac.jp/biblio/200015137/manifest", "section": "", "title": "1"})
      expect(data.rangelist).toEqual( [{"anno": "https://kotenseki.nijl.ac.jp/biblio/200015137/list/1", "canvas": {"within": "https://kotenseki.nijl.ac.jp/biblio/200015137/manifest"}, "manifest": "https://kotenseki.nijl.ac.jp/biblio/200015137/manifest", "section": "", "title": "1"}, {"anno": "https://kotenseki.nijl.ac.jp/biblio/200015137/list/4", "canvas": {"within": "https://kotenseki.nijl.ac.jp/biblio/200015137/manifest"}, "manifest": "https://kotenseki.nijl.ac.jp/biblio/200015137/manifest", "section": "", "title": "4"}, {"anno": "https://kotenseki.nijl.ac.jp/biblio/200015137/list/5", "canvas": {"within": "https://kotenseki.nijl.ac.jp/biblio/200015137/manifest"}, "manifest": "https://kotenseki.nijl.ac.jp/biblio/200015137/manifest", "section": "", "title": "5"}, {"anno": "https://kotenseki.nijl.ac.jp/biblio/200015137/list/6", "canvas": {"within": "https://kotenseki.nijl.ac.jp/biblio/200015137/manifest"}, "manifest": "https://kotenseki.nijl.ac.jp/biblio/200015137/manifest", "section": "", "title": "6"}, {"anno": "https://kotenseki.nijl.ac.jp/biblio/200015137/list/7", "canvas": {"within": "https://kotenseki.nijl.ac.jp/biblio/200015137/manifest"}, "manifest": "https://kotenseki.nijl.ac.jp/biblio/200015137/manifest", "section": "", "title": "7"}, {"anno": "https://kotenseki.nijl.ac.jp/biblio/200015137/list/8", "canvas": {"within": "https://kotenseki.nijl.ac.jp/biblio/200015137/manifest"}, "manifest": "https://kotenseki.nijl.ac.jp/biblio/200015137/manifest", "section": "", "title": "8"}, {"anno": "https://kotenseki.nijl.ac.jp/biblio/200015137/list/9", "canvas": {"within": "https://kotenseki.nijl.ac.jp/biblio/200015137/manifest"}, "manifest": "https://kotenseki.nijl.ac.jp/biblio/200015137/manifest", "section": "", "title": "9"}, {"anno": "https://kotenseki.nijl.ac.jp/biblio/200015137/list/10", "canvas": {"within": "https://kotenseki.nijl.ac.jp/biblio/200015137/manifest"}, "manifest": "https://kotenseki.nijl.ac.jp/biblio/200015137/manifest", "section": "", "title": "10"}, {"anno": "https://kotenseki.nijl.ac.jp/biblio/200015137/list/11", "canvas": {"within": "https://kotenseki.nijl.ac.jp/biblio/200015137/manifest"}, "manifest": "https://kotenseki.nijl.ac.jp/biblio/200015137/manifest", "section": "", "title": "11"}, {"anno": "https://kotenseki.nijl.ac.jp/biblio/200015137/list/12", "canvas": {"within": "https://kotenseki.nijl.ac.jp/biblio/200015137/manifest"}, "manifest": "https://kotenseki.nijl.ac.jp/biblio/200015137/manifest", "section": "", "title": "12"}, {"anno": "https://kotenseki.nijl.ac.jp/biblio/200015137/list/13", "canvas": {"within": "https://kotenseki.nijl.ac.jp/biblio/200015137/manifest"}, "manifest": "https://kotenseki.nijl.ac.jp/biblio/200015137/manifest", "section": "", "title": "13"}, {"anno": "https://kotenseki.nijl.ac.jp/biblio/200015137/list/14", "canvas": {"within": "https://kotenseki.nijl.ac.jp/biblio/200015137/manifest"}, "manifest": "https://kotenseki.nijl.ac.jp/biblio/200015137/manifest", "section": "", "title": "14"}, {"anno": "https://kotenseki.nijl.ac.jp/biblio/200015137/list/15", "canvas": {"within": "https://kotenseki.nijl.ac.jp/biblio/200015137/manifest"}, "manifest": "https://kotenseki.nijl.ac.jp/biblio/200015137/manifest", "section": "", "title": "15"}, {"anno": "https://kotenseki.nijl.ac.jp/biblio/200015137/list/16", "canvas": {"within": "https://kotenseki.nijl.ac.jp/biblio/200015137/manifest"}, "manifest": "https://kotenseki.nijl.ac.jp/biblio/200015137/manifest", "section": "", "title": "16"}, {"anno": "https://kotenseki.nijl.ac.jp/biblio/200015137/list/17", "canvas": {"within": "https://kotenseki.nijl.ac.jp/biblio/200015137/manifest"}, "manifest": "https://kotenseki.nijl.ac.jp/biblio/200015137/manifest", "section": "", "title": "17"}, {"anno": "https://kotenseki.nijl.ac.jp/biblio/200015137/list/18", "canvas": {"within": "https://kotenseki.nijl.ac.jp/biblio/200015137/manifest"}, "manifest": "https://kotenseki.nijl.ac.jp/biblio/200015137/manifest", "section": "", "title": "18"}, {"anno": "https://kotenseki.nijl.ac.jp/biblio/200015137/list/20", "canvas": {"within": "https://kotenseki.nijl.ac.jp/biblio/200015137/manifest"}, "manifest": "https://kotenseki.nijl.ac.jp/biblio/200015137/manifest", "section": "", "title": "20"}, {"anno": "https://kotenseki.nijl.ac.jp/biblio/200015137/list/21", "canvas": {"within": "https://kotenseki.nijl.ac.jp/biblio/200015137/manifest"}, "manifest": "https://kotenseki.nijl.ac.jp/biblio/200015137/manifest", "section": "", "title": "21"}, {"anno": "https://kotenseki.nijl.ac.jp/biblio/200015137/list/22", "canvas": {"within": "https://kotenseki.nijl.ac.jp/biblio/200015137/manifest"}, "manifest": "https://kotenseki.nijl.ac.jp/biblio/200015137/manifest", "section": "", "title": "22"}, {"anno": "https://kotenseki.nijl.ac.jp/biblio/200015137/list/23", "canvas": {"within": "https://kotenseki.nijl.ac.jp/biblio/200015137/manifest"}, "manifest": "https://kotenseki.nijl.ac.jp/biblio/200015137/manifest", "section": "", "title": "23"}, {"anno": "https://kotenseki.nijl.ac.jp/biblio/200015137/list/24", "canvas": {"within": "https://kotenseki.nijl.ac.jp/biblio/200015137/manifest"}, "manifest": "https://kotenseki.nijl.ac.jp/biblio/200015137/manifest", "section": "", "title": "24"}, {"anno": "https://kotenseki.nijl.ac.jp/biblio/200015137/list/25", "canvas": {"within": "https://kotenseki.nijl.ac.jp/biblio/200015137/manifest"}, "manifest": "https://kotenseki.nijl.ac.jp/biblio/200015137/manifest", "section": "", "title": "25"}, {"anno": "https://kotenseki.nijl.ac.jp/biblio/200015137/list/26", "canvas": {"within": "https://kotenseki.nijl.ac.jp/biblio/200015137/manifest"}, "manifest": "https://kotenseki.nijl.ac.jp/biblio/200015137/manifest", "section": "", "title": "26"}, {"anno": "https://kotenseki.nijl.ac.jp/biblio/200015137/list/27", "canvas": {"within": "https://kotenseki.nijl.ac.jp/biblio/200015137/manifest"}, "manifest": "https://kotenseki.nijl.ac.jp/biblio/200015137/manifest", "section": "", "title": "27"}, {"anno": "https://kotenseki.nijl.ac.jp/biblio/200015137/list/28", "canvas": {"within": "https://kotenseki.nijl.ac.jp/biblio/200015137/manifest"}, "manifest": "https://kotenseki.nijl.ac.jp/biblio/200015137/manifest", "section": "", "title": "28"}, {"anno": "https://kotenseki.nijl.ac.jp/biblio/200015137/list/29", "canvas": {"within": "https://kotenseki.nijl.ac.jp/biblio/200015137/manifest"}, "manifest": "https://kotenseki.nijl.ac.jp/biblio/200015137/manifest", "section": "", "title": "29"}, {"anno": "https://kotenseki.nijl.ac.jp/biblio/200015137/list/30", "canvas": {"within": "https://kotenseki.nijl.ac.jp/biblio/200015137/manifest"}, "manifest": "https://kotenseki.nijl.ac.jp/biblio/200015137/manifest", "section": "", "title": "30"}, {"anno": "https://kotenseki.nijl.ac.jp/biblio/200015137/list/31", "canvas": {"within": "https://kotenseki.nijl.ac.jp/biblio/200015137/manifest"}, "manifest": "https://kotenseki.nijl.ac.jp/biblio/200015137/manifest", "section": "", "title": "31"}])
      expect(data.position).toEqual(0)
      expect(data.prevPageInactive).toBe(true)
      expect(data.nextPageInactive).toBe(false)
      expect(data.rangeid).toBe('range.json')
      expect(data.customlayers).toEqual('')
      expect(data.isfullscreen).toBe(false)
      expect(data.toc).toEqual([{"description": "", "label": "1", "position": 0}, {"description": "", "label": "4", "position": 1}, {"description": "", "label": "5", "position": 2}, {"description": "", "label": "6", "position": 3}, {"description": "", "label": "7", "position": 4}, {"description": "", "label": "8", "position": 5}, {"description": "", "label": "9", "position": 6}, {"description": "", "label": "10", "position": 7}, {"description": "", "label": "11", "position": 8}, {"description": "", "label": "12", "position": 9}, {"description": "", "label": "13", "position": 10}, {"description": "", "label": "14", "position": 11}, {"description": "", "label": "15", "position": 12}, {"description": "", "label": "16", "position": 13}, {"description": "", "label": "17", "position": 14}, {"description": "", "label": "18", "position": 15}, {"description": "", "label": "20", "position": 16}, {"description": "", "label": "21", "position": 17}, {"description": "", "label": "22", "position": 18}, {"description": "", "label": "23", "position": 19}, {"description": "", "label": "24", "position": 20}, {"description": "", "label": "25", "position": 21}, {"description": "", "label": "26", "position": 22}, {"description": "", "label": "27", "position": 23}, {"description": "", "label": "28", "position": 24}, {"description": "", "label": "29", "position": 25}, {"description": "", "label": "30", "position": 26}, {"description": "", "label": "31", "position": 27}])
      expect(data.viewingDirection).toBe('rtl')
      expect(data.rangetitle).toEqual('十二類絵巻')
    })
    test('test range list without canvases', async ()  => {
      const wrapper =  shallowMount(rangestoryboard,{
        propsData: {
          rangeurl: 'range2.json'
        }
      })
      const saveMock = jest.fn()
      wrapper.vm.createViewer = saveMock;
      await wrapper.vm.$nextTick()
      await flushPromises()
      var data = wrapper.vm.$data
      expect(data.tags).toBe(false)
      expect(data.layerslist).toBe(false)
      expect(data.isws).toBe("")
      expect(data.buttons).toEqual({"autorunbutton": "<i class=\"fas fa-magic\"></i>", "expandbutton": "<i class=\"fas fa-expand\"></i>", "hide_button": "<i class=\"fas fa-caret-up\"></i>", "info": "<i class=\"fas fa-info-circle\"></i>", "layer": "<i class=\"fas fa-layer-group\"></i>", "next": "<i class=\"fas fa-chevron-right\"></i>", "overlaybutton": "<i class=\"fas fa-toggle-on\"></i>", "playpause": "<i class=\"fas fa-play\"></i>", "prev": "<i class=\"fas fa-chevron-left\"></i>", "tags": "<i class=\"fas fa-tag\"></i>"})
      expect(data.range).toBe(true)
      expect(data.toctitle).toEqual("Range Pages")
      expect(data.stylingstring).toEqual("autorun_interval:3;title:A Profound Warrior For Us All;")
      expect(data.annotationurl).toEqual({"anno": "https://tomcrane.github.io/iiif-collector/objects/longer-article-annos1.json", "canvas": undefined, "manifest": "", "section": "", "title": undefined})
      expect(data.position).toEqual(0)
      expect(data.prevPageInactive).toBe(true)
      expect(data.nextPageInactive).toBe(true)
      expect(data.rangeid).toBe('range2.json')
      expect(data.customlayers).toEqual('')
      expect(data.isfullscreen).toBe(false)
      expect(data.toc).toEqual([{"description": "", "label": "Page 1", "position": 0}])
      expect(data.viewingDirection).toBe('ltr')
      expect(data.rangetitle).toEqual('A Profound Warrior For Us All')
    })
    test('test range list without canvases and settings', async ()  => {
      const wrapper =  shallowMount(rangestoryboard,{
        propsData: {
          rangeurl: 'range2.json',
          layers: "[{'label':'<a href=\'https://www.wikidata.org/wiki/Q4792194\'>View from Arles</a>', 'xywh': '200,200,4750,6513', 'image':'https://tools.wmflabs.org/zoomviewer/iipsrv.fcgi/?iiif=cache/8937e1777945b722457fac2cde0cf61b.tif/info.json'}]",
          ws: "wss://echo",
          styling: "autorun_interval:4; panorzoom: pan"
        }
      })
      const saveMock = jest.fn()
      wrapper.vm.createViewer = saveMock;
      await wrapper.vm.$nextTick()
      await flushPromises()
      var data = wrapper.vm.$data
      expect(data.tags).toBe(false)
      expect(data.layerslist).toBe(false)
      expect(data.isws).toBe("wss://echo")
      expect(data.buttons).toEqual({"autorunbutton": "<i class=\"fas fa-magic\"></i>", "expandbutton": "<i class=\"fas fa-expand\"></i>", "hide_button": "<i class=\"fas fa-caret-up\"></i>", "info": "<i class=\"fas fa-info-circle\"></i>", "layer": "<i class=\"fas fa-layer-group\"></i>", "next": "<i class=\"fas fa-chevron-right\"></i>", "overlaybutton": "<i class=\"fas fa-toggle-on\"></i>", "playpause": "<i class=\"fas fa-play\"></i>", "prev": "<i class=\"fas fa-chevron-left\"></i>", "tags": "<i class=\"fas fa-tag\"></i>"})
      expect(data.range).toBe(true)
      expect(data.toctitle).toEqual("Range Pages")
      expect(data.stylingstring).toEqual("autorun_interval:4;panorzoom:pan;title:A Profound Warrior For Us All;")
      expect(data.annotationurl).toEqual({"anno": "https://tomcrane.github.io/iiif-collector/objects/longer-article-annos1.json", "canvas": undefined, "manifest": "", "section": "", "title": undefined})
      expect(data.position).toEqual(0)
      expect(data.prevPageInactive).toBe(true)
      expect(data.nextPageInactive).toBe(true)
      expect(data.rangeid).toBe('range2.json')
      expect(data.customlayers).toEqual("[{'label':'<a href='https://www.wikidata.org/wiki/Q4792194'>View from Arles</a>', 'xywh': '200,200,4750,6513', 'image':'https://tools.wmflabs.org/zoomviewer/iipsrv.fcgi/?iiif=cache/8937e1777945b722457fac2cde0cf61b.tif/info.json'}]")
      expect(data.isfullscreen).toBe(false)
      expect(data.toc).toEqual([{"description": "", "label": "Page 1", "position": 0}])
      expect(data.viewingDirection).toBe('ltr')
      expect(data.rangetitle).toBe("A Profound Warrior For Us All")
    })
})
