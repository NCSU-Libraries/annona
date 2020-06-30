import Vue from 'vue'
//import index from 'karma-chai'
import { mount } from '@vue/test-utils';
import { shallowMount } from '@vue/test-utils';

import multistoryboard from '../src/components/multistoryboard.vue';
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
  })
    test('test multistoryboard with mirador and page list', async ()  => {
      const wrapper =  mount(multistoryboard,{
        propsData: {
          annotationlists: 'mc00240.json;page.json'
        },
        attachToDocument: true
      })
      const saveMock = jest.fn()
      var children = wrapper.vm.$children;
      for (var i=0; i<children.length; i++){
        children[i].createViewer = saveMock;
      }
      await wrapper.vm.$nextTick()
      await flushPromises()

      var data = wrapper.vm.$data
      expect(data.anno_data).toEqual(["mc00240.json", "page.json"])
      expect(wrapper.vm.$children.length).toEqual(2)
      expect(data.stylingstring).toEqual("autorun_interval:3;")
      expect(data.widthvar).toEqual("50%")
      expect(data.multi).toBe(true)
      expect(data.tags).toBe(true)
      expect(data.layerslist).toBe(false)
      expect(data.shortcuts).toEqual({"autorun": {"icon": "<i class=\"fas fa-magic\"></i>", "label": "Auto Run", "shortcut": ["b", "1"]}, "close": {"icon": "<i class=\"fas fa-times\"></i>", "label": "Close", "shortcut": ["x", "6"]}, "fullscreen": {"icon": "<i class=\"fas fa-expand\"></i>", "label": "Fullscreen", "shortcut": ["alt+f", ";"]}, "hide": {"icon": "<i class=\"fas fa-caret-up\"></i>", "label": "Collapse text", "shortcut": ["c", "7"]}, "home": {"icon": "<i class=\"fas fa-home\"></i>", "label": "Home", "shortcut": ["h", "0"]}, "info": {"icon": "<i class=\"fas fa-info-circle\"></i>", "label": "Info Button", "shortcut": ["i", "2"]}, "next": {"icon": "<i class=\"fa fa-arrow-right\"></i>", "label": "Next", "shortcut": ["n", ".", "shift+right"]}, "overlay": {"icon": "<i class=\"fas fa-toggle-on\"></i>", "label": "Toggle", "shortcut": ["o", "4"]}, "prev": {"icon": "<i class=\"fa fa-arrow-left\"></i>", "label": "Previous", "shortcut": ["p", ",", "shift+left"]}, "shortcut": {"icon": "<i class=\"fas fa-keyboard\"></i>", "label": "Keyboard Shortcuts", "shortcut": ["s", "8"]}, "tags": {"icon": "<i class=\"fas fa-tag\"></i>", "label": "Tags", "shortcut": ["t", "3"]}, "zoomin": {"icon": "<i class=\"fas fa-search-plus\"></i>", "label": "Zoom In", "shortcut": ["z", "+", "shift+up"]}, "zoomout": {"icon": "<i class=\"fas fa-search-minus\"></i>", "label": "Zoom Out", "shortcut": ["m", "-", "shift+down"]}})
      expect(wrapper.html()).toEqual("<div id=\"multistoryboard\" class=\"multistoryboard top_menu_container\"><span id=\"header_toolbar\" class=\"top_multi_menu\"><button id=\"autoRunButton\" class=\"toolbarButton\" data-hotkey-string=\"b|1\"><span><i class=\"fas fa-magic\"></i></span> <span class=\"toolbartext\">Start/Stop Autorun</span></button> <button id=\"infoButton\" class=\"toolbarButton\" data-hotkey-string=\"i|2\"><span><i class=\"fas fa-info-circle\"></i></span> <span class=\"toolbartext\">View source image information</span></button> <button id=\"tagsButton\" class=\"toolbarButton\" data-hotkey-string=\"t|3\"><span><i class=\"fas fa-tag\"></i></span> <span class=\"toolbartext\">Toggle Tags</span></button> <button id=\"overlayButton\" class=\"toolbarButton\" data-hotkey-string=\"o|4\"><span><i class=\"fas fa-toggle-on\"></i></span> <span class=\"toolbartext\">Toggle Overlays</span></button> <!----> <button id=\"zoomInButton\" class=\"toolbarButton\" data-hotkey-string=\"z|+|shift+up\"><i class=\"fas fa-search-plus\"></i> <span class=\"toolbartext\">Zoom in</span></button> <button id=\"zoomOutButton\" class=\"toolbarButton\" data-hotkey-string=\"m|-|shift+down\"><i class=\"fas fa-search-minus\"></i> <span class=\"toolbartext\">Zoom out</span></button> <button id=\"homeZoomButton\" class=\"toolbarButton\" data-hotkey-string=\"h|0\"><i class=\"fas fa-home\"></i> <span class=\"toolbartext\">View full image</span></button> <button id=\"previousButton\" class=\"toolbarButton inactive\" data-hotkey-string=\"p|,|shift+left\"><i class=\"fa fa-arrow-left\"></i> <span class=\"toolbartext\">Previous Annotation</span></button> <button id=\"nextButton\" class=\"toolbarButton\" data-hotkey-string=\"n|.|shift+right\"><i class=\"fa fa-arrow-right\"></i> <span class=\"toolbartext\">Next Annotation</span></button> <button id=\"keyboardShortcutsButton\" class=\"toolbarButton\" data-hotkey-string=\"s|8\"><span><i class=\"fas fa-keyboard\"></i></span> <span class=\"toolbartext\">Toggle keyboard shortcuts</span></button> <button id=\"fullScreenButton\" class=\"toolbarButton\" data-hotkey-string=\"alt+f|;\"><span><i class=\"fas fa-expand\"></i></span> <span class=\"toolbartext\">Toggle fullscreen</span></button></span> <span class=\"storyboard_containers\"><div style=\"position: relative; display: inline-block; width: 50%;\"><!----> <div id=\"storyboard_viewer\" class=\"storyboard_viewer\"><div class=\"defaultview\" style=\"position: relative; display: flex;\"><div id=\"mc00240_storyboard_0\" class=\"seadragonbox default_menu_container\" style=\"position: relative;\"><!----></div> <div id=\"mc00240_storyboard_0_annotation\" tabindex=\"0\" class=\"annotation fullcontent corner\" style=\"display: none;\"><span id=\"annotation_controls\"><button id=\"close_button\" class=\"annocontrols_button\" data-hotkey-string=\"x|6\"><i class=\"fas fa-times\"></i></button> <button id=\"hide_button\" class=\"annocontrols_button\" data-hotkey-string=\"c|7\"><span><i class=\"fas fa-caret-up\"></i></span></button> <!----> <button id=\"tags_button\" class=\"annocontrols_button\"><span><i class=\"fas fa-tag\"></i></span></button> <button id=\"info_button\" class=\"annocontrols_button\"><span><i class=\"fas fa-info-circle\"></i></span></button> <!----> <!----></span> <!----> <!----> <!----> <!----> <!----> <!----></div></div></div></div><div style=\"position: relative; display: inline-block; width: 50%;\"><!----> <div id=\"storyboard_viewer\" class=\"storyboard_viewer\"><div class=\"defaultview\" style=\"position: relative; display: flex;\"><div id=\"page_storyboard_1\" class=\"seadragonbox default_menu_container\" style=\"position: relative;\"><!----></div> <div id=\"page_storyboard_1_annotation\" tabindex=\"0\" class=\"annotation fullcontent corner\" style=\"display: none;\"><span id=\"annotation_controls\"><button id=\"close_button\" class=\"annocontrols_button\" data-hotkey-string=\"x|6\"><i class=\"fas fa-times\"></i></button> <button id=\"hide_button\" class=\"annocontrols_button\" data-hotkey-string=\"c|7\"><span><i class=\"fas fa-caret-up\"></i></span></button> <!----> <!----> <button id=\"info_button\" class=\"annocontrols_button\"><span><i class=\"fas fa-info-circle\"></i></span></button> <!----> <!----></span> <!----> <!----> <!----> <!----> <!----> <!----></div></div></div></div> </span></div>")
    })
    test('test multistoryboard 2', async ()  => {
      const wrapper =  mount(multistoryboard,{
        propsData: {
          annotationlists: '4058a628-c593-463e-9736-8a821e178fee-list.json;page.json;paragraph.json',
          styling: 'startenddisplay: keyboard'
        },
        attachToDocument: true
      })
      const saveMock = jest.fn()
      var children = wrapper.vm.$children;
      for (var i=0; i<children.length; i++){
        children[i].createViewer = saveMock;
      }
      await wrapper.vm.$nextTick()
      await flushPromises()
      var data = wrapper.vm.$data
      expect(data.anno_data).toEqual(["4058a628-c593-463e-9736-8a821e178fee-list.json", "page.json", "paragraph.json"])
      expect(wrapper.vm.$children.length).toEqual(3)
      expect(data.stylingstring).toEqual("startenddisplay:keyboard;autorun_interval:3;")
      expect(data.widthvar).toEqual("33%")
      expect(data.multi).toBe(true)
      expect(data.tags).toBe(true)
      expect(data.layerslist).toBe(false)
      expect(data.shortcuts).toEqual({"autorun": {"icon": "<i class=\"fas fa-magic\"></i>", "label": "Auto Run", "shortcut": ["b", "1"]}, "close": {"icon": "<i class=\"fas fa-times\"></i>", "label": "Close", "shortcut": ["x", "6"]}, "fullscreen": {"icon": "<i class=\"fas fa-expand\"></i>", "label": "Fullscreen", "shortcut": ["alt+f", ";"]}, "hide": {"icon": "<i class=\"fas fa-caret-up\"></i>", "label": "Collapse text", "shortcut": ["c", "7"]}, "home": {"icon": "<i class=\"fas fa-home\"></i>", "label": "Home", "shortcut": ["h", "0"]}, "info": {"icon": "<i class=\"fas fa-info-circle\"></i>", "label": "Info Button", "shortcut": ["i", "2"]}, "next": {"icon": "<i class=\"fa fa-arrow-right\"></i>", "label": "Next", "shortcut": ["n", ".", "shift+right"]}, "overlay": {"icon": "<i class=\"fas fa-toggle-on\"></i>", "label": "Toggle", "shortcut": ["o", "4"]}, "prev": {"icon": "<i class=\"fa fa-arrow-left\"></i>", "label": "Previous", "shortcut": ["p", ",", "shift+left"]}, "shortcut": {"icon": "<i class=\"fas fa-keyboard\"></i>", "label": "Keyboard Shortcuts", "shortcut": ["s", "8"]}, "tags": {"icon": "<i class=\"fas fa-tag\"></i>", "label": "Tags", "shortcut": ["t", "3"]}, "zoomin": {"icon": "<i class=\"fas fa-search-plus\"></i>", "label": "Zoom In", "shortcut": ["z", "+", "shift+up"]}, "zoomout": {"icon": "<i class=\"fas fa-search-minus\"></i>", "label": "Zoom Out", "shortcut": ["m", "-", "shift+down"]}})
    })
    test('test multistoryboard 2', async ()  => {
      const wrapper =  mount(multistoryboard,{
        propsData: {
          annotationlists: '4058a628-c593-463e-9736-8a821e178fee-list.json;page.json;paragraph.json',
          styling: 'startenddisplay: keyboard'
        },
        attachToDocument: true
      })
      const saveMock = jest.fn()
      var children = wrapper.vm.$children;
      for (var i=0; i<children.length; i++){
        children[i].createViewer = saveMock;
      }
      await wrapper.vm.$nextTick()
      await flushPromises()
      var data = wrapper.vm.$data
      expect(data.anno_data).toEqual(["4058a628-c593-463e-9736-8a821e178fee-list.json", "page.json", "paragraph.json"])
      expect(wrapper.vm.$children.length).toEqual(3)
      expect(data.stylingstring).toEqual("startenddisplay:keyboard;autorun_interval:3;")
      expect(data.widthvar).toEqual("33%")
      expect(data.multi).toBe(true)
      expect(data.tags).toBe(true)
      expect(data.layerslist).toBe(false)
      expect(data.shortcuts).toEqual({"autorun": {"icon": "<i class=\"fas fa-magic\"></i>", "label": "Auto Run", "shortcut": ["b", "1"]}, "close": {"icon": "<i class=\"fas fa-times\"></i>", "label": "Close", "shortcut": ["x", "6"]}, "fullscreen": {"icon": "<i class=\"fas fa-expand\"></i>", "label": "Fullscreen", "shortcut": ["alt+f", ";"]}, "hide": {"icon": "<i class=\"fas fa-caret-up\"></i>", "label": "Collapse text", "shortcut": ["c", "7"]}, "home": {"icon": "<i class=\"fas fa-home\"></i>", "label": "Home", "shortcut": ["h", "0"]}, "info": {"icon": "<i class=\"fas fa-info-circle\"></i>", "label": "Info Button", "shortcut": ["i", "2"]}, "next": {"icon": "<i class=\"fa fa-arrow-right\"></i>", "label": "Next", "shortcut": ["n", ".", "shift+right"]}, "overlay": {"icon": "<i class=\"fas fa-toggle-on\"></i>", "label": "Toggle", "shortcut": ["o", "4"]}, "prev": {"icon": "<i class=\"fa fa-arrow-left\"></i>", "label": "Previous", "shortcut": ["p", ",", "shift+left"]}, "shortcut": {"icon": "<i class=\"fas fa-keyboard\"></i>", "label": "Keyboard Shortcuts", "shortcut": ["s", "8"]}, "tags": {"icon": "<i class=\"fas fa-tag\"></i>", "label": "Tags", "shortcut": ["t", "3"]}, "zoomin": {"icon": "<i class=\"fas fa-search-plus\"></i>", "label": "Zoom In", "shortcut": ["z", "+", "shift+up"]}, "zoomout": {"icon": "<i class=\"fas fa-search-minus\"></i>", "label": "Zoom Out", "shortcut": ["m", "-", "shift+down"]}})
    })
    test('test multistoryboard 3', async ()  => {
      const wrapper =  mount(multistoryboard,{
        propsData: {
          annotationlists: 'paragraph.json;techocr.json',
          styling: 'transcription: true;'
        },
        attachToDocument: true
      })
      const saveMock = jest.fn()
      var children = wrapper.vm.$children;
      for (var i=0; i<children.length; i++){
        children[i].createViewer = saveMock;
      }
      await wrapper.vm.$nextTick()
      await flushPromises()
      var data = wrapper.vm.$data
      expect(data.anno_data).toEqual(["paragraph.json", "techocr.json"])
      expect(wrapper.vm.$children.length).toEqual(2)
      expect(data.stylingstring).toEqual("transcription:true;autorun_interval:3;")
      expect(data.widthvar).toEqual("50%")
      expect(data.multi).toBe(true)
      expect(data.tags).toBe(false)
      expect(data.layerslist).toBe(false)
      expect(data.shortcuts).toEqual({"autorun": {"icon": "<i class=\"fas fa-magic\"></i>", "label": "Auto Run", "shortcut": ["b", "1"]}, "close": {"icon": "<i class=\"fas fa-times\"></i>", "label": "Close", "shortcut": ["x", "6"]}, "fullscreen": {"icon": "<i class=\"fas fa-expand\"></i>", "label": "Fullscreen", "shortcut": ["alt+f", ";"]}, "hide": {"icon": "<i class=\"fas fa-caret-up\"></i>", "label": "Collapse text", "shortcut": ["c", "7"]}, "home": {"icon": "<i class=\"fas fa-home\"></i>", "label": "Home", "shortcut": ["h", "0"]}, "info": {"icon": "<i class=\"fas fa-info-circle\"></i>", "label": "Info Button", "shortcut": ["i", "2"]}, "next": {"icon": "<i class=\"fa fa-arrow-right\"></i>", "label": "Next", "shortcut": ["n", ".", "shift+right"]}, "overlay": {"icon": "<i class=\"fas fa-toggle-on\"></i>", "label": "Toggle", "shortcut": ["o", "4"]}, "prev": {"icon": "<i class=\"fa fa-arrow-left\"></i>", "label": "Previous", "shortcut": ["p", ",", "shift+left"]}, "shortcut": {"icon": "<i class=\"fas fa-keyboard\"></i>", "label": "Keyboard Shortcuts", "shortcut": ["s", "8"]}, "zoomin": {"icon": "<i class=\"fas fa-search-plus\"></i>", "label": "Zoom In", "shortcut": ["z", "+", "shift+up"]}, "zoomout": {"icon": "<i class=\"fas fa-search-minus\"></i>", "label": "Zoom Out", "shortcut": ["m", "-", "shift+down"]}})
    })
    test('test multistoryboard 4', async ()  => {
      const wrapper =  mount(multistoryboard,{
        propsData: {
          annotationlists: 'recogito.json;techocr.json',
          styling: 'transcription: true;'
        },
        attachToDocument: true
      })
      const saveMock = jest.fn()
      var children = wrapper.vm.$children;
      for (var i=0; i<children.length; i++){
        children[i].createViewer = saveMock;
      }
      await wrapper.vm.$nextTick()
      await flushPromises()
      var data = wrapper.vm.$data
      expect(data.anno_data).toEqual(["recogito.json", "techocr.json"])
      expect(wrapper.vm.$children.length).toEqual(2)
      expect(data.stylingstring).toEqual("transcription:true;autorun_interval:3;")
      expect(data.widthvar).toEqual("50%")
      expect(data.multi).toBe(true)
      expect(data.tags).toBe(false)
      expect(data.layerslist).toBe(false)
      expect(data.shortcuts).toEqual({"autorun": {"icon": "<i class=\"fas fa-magic\"></i>", "label": "Auto Run", "shortcut": ["b", "1"]}, "close": {"icon": "<i class=\"fas fa-times\"></i>", "label": "Close", "shortcut": ["x", "6"]}, "fullscreen": {"icon": "<i class=\"fas fa-expand\"></i>", "label": "Fullscreen", "shortcut": ["alt+f", ";"]}, "hide": {"icon": "<i class=\"fas fa-caret-up\"></i>", "label": "Collapse text", "shortcut": ["c", "7"]}, "home": {"icon": "<i class=\"fas fa-home\"></i>", "label": "Home", "shortcut": ["h", "0"]}, "info": {"icon": "<i class=\"fas fa-info-circle\"></i>", "label": "Info Button", "shortcut": ["i", "2"]}, "next": {"icon": "<i class=\"fa fa-arrow-right\"></i>", "label": "Next", "shortcut": ["n", ".", "shift+right"]}, "overlay": {"icon": "<i class=\"fas fa-toggle-on\"></i>", "label": "Toggle", "shortcut": ["o", "4"]}, "prev": {"icon": "<i class=\"fa fa-arrow-left\"></i>", "label": "Previous", "shortcut": ["p", ",", "shift+left"]}, "shortcut": {"icon": "<i class=\"fas fa-keyboard\"></i>", "label": "Keyboard Shortcuts", "shortcut": ["s", "8"]}, "zoomin": {"icon": "<i class=\"fas fa-search-plus\"></i>", "label": "Zoom In", "shortcut": ["z", "+", "shift+up"]}, "zoomout": {"icon": "<i class=\"fas fa-search-minus\"></i>", "label": "Zoom Out", "shortcut": ["m", "-", "shift+down"]}})
    })
})
