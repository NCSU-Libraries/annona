import Vue from 'vue'
//import index from 'karma-chai'
import { mount } from '@vue/test-utils';
import { shallowMount } from '@vue/test-utils';

import storyboard from '../src/components/storyboard.vue';
import shared from '../src/components/shared.js'

import flushPromises from 'flush-promises';
let consoleSpy;
describe('Component', () => {
    test('test storyboard with mirador list', async ()  => {
      const wrapper =  mount(storyboard,{
        propsData: {
          annotationlist: 'mc00240.json',
          styling: 'tagscolor: {"balcony":"white", "railing": "green", "partition": "red"}'
        },
        attachToDocument: true
      })
      await wrapper.vm.$nextTick()
      await flushPromises()
      var data = wrapper.vm.$data
      expect(data.seadragontile).toBe("https://iiif.lib.ncsu.edu/iiif/mc00240-001-ff0093-001-001_0010/info.json")
      expect(data.zoomsections.length).toEqual(3)
      expect(data.zoomsections[0]['section']).toEqual(["740,567,3998,4586", "2735,589,14,14"])
      expect(data.zoomsections[0]['type']).toEqual("rectangle")
      expect(data.zoomsections[0]['svg_path'][0].outerHTML).toEqual("<path xmlns=\"http://www.w3.org/2000/svg\" d=\"M740.00502,566.97616l1998.77039,0l0,0l1998.77039,0l0,2293.02384l0,2293.02384l-1998.77039,0l-1998.77039,0l0,-2293.02384z\" data-paper-data=\"{&quot;defaultStrokeValue&quot;:1,&quot;editStrokeValue&quot;:5,&quot;currentStrokeValue&quot;:5,&quot;rotation&quot;:0,&quot;annotation&quot;:null,&quot;editable&quot;:true}\" id=\"rectangle_dcc88375-b2ff-4b41-b061-6d9b5f6b81fc\" fill-opacity=\"0.00001\" fill=\"#00bfff\" fill-rule=\"nonzero\" stroke=\"#00bfff\" stroke-width=\"17.94228\" stroke-linecap=\"butt\" stroke-linejoin=\"miter\" stroke-miterlimit=\"10\" stroke-dasharray=\"\" stroke-dashoffset=\"0\" font-family=\"none\" font-weight=\"none\" font-size=\"none\" text-anchor=\"none\" style=\"mix-blend-mode: normal\"></path>")
      expect(data.zoomsections[0]['svg_path'].length).toEqual(2)
      expect(data.position).toEqual(-1)
      expect(data.seadragonid).toBe('mc00240_storyboard')
      expect(data.annotations[1]['tags'].length).toEqual(2)
      expect(data.annotations[1]['tags']).toContain('railing')
      expect(data.annotations.length).toEqual(3)
      expect(data.annotations[0]['textual_body'][0]).toContain('<p>Bank and Office Building for Wachovia Bank and Trust Co.</p>')
      expect(data.currentanno).toEqual('')
      expect(data.tagslist).toEqual({"balcony": {"checked": false, "color": "white", "count": 1}, "partition": {"checked": false, "color": "red", "count": 1}, "railing": {"checked": false, "color": "green", "count": 1}})
      const tagsButton = wrapper.find('#tagsButton')
      tagsButton.trigger('click')
      expect(data.shown).toBe('tags')
      expect(document.getElementsByClassName('content')[0].innerHTML.replace(/(\r\n|\n|\r)/gm, " ")).toEqual("<div id=\"balcony_tags\" class=\"tags\"><input type=\"checkbox\" class=\"tagscheck\"> <div class=\"countkey\">            balcony           <span class=\"tagscount\" style=\"background: white;\"><span>1</span></span></div></div><div id=\"partition_tags\" class=\"tags\"><input type=\"checkbox\" class=\"tagscheck\"> <div class=\"countkey\">            partition           <span class=\"tagscount\" style=\"background: red;\"><span>1</span></span></div></div><div id=\"railing_tags\" class=\"tags\"><input type=\"checkbox\" class=\"tagscheck\"> <div class=\"countkey\">            railing           <span class=\"tagscount\" style=\"background: green;\"><span>1</span></span></div></div>")
      const infoButton = wrapper.find('#infoButton')
      infoButton.trigger('click')
      expect(data.shown).toBe('info')
      wrapper.find('.annoinfolink').trigger('click')
      wrapper.find('.imageinfolink').trigger('click')
      expect(document.getElementsByClassName('content')[0].innerHTML.replace(/(\r\n|\n|\r)/gm, " ")).toEqual("<div class=\"imagetitle\"><h1>Cross section, interior details</h1></div> <span><!----> <!----> <!----> <!----> <button class=\"infolink buttonlink annoinfolink\">Annotation information</button> <div class=\"annoinfo\"><span><div class=\"listinfo\"><b>Annotation Url: </b><a href=\"mc00240.json\" target=\"_blank\">mc00240.json</a><br>       <b>Number of Annotations:</b> 3</div></span> <div class=\"annotationslist\"><div id=\"data_0\"><div class=\"title\"><button class=\"buttonlink\">Annotation 1</button></div> <div class=\"additionaltext\">         Bank and Office Building for...<br>                           </div></div><div id=\"data_1\"><div class=\"title\"><button class=\"buttonlink\">Annotation 2</button></div> <div class=\"additionaltext\">         DETAILS OF BALCONY RAILING<br>                           <b>Tags:</b> balcony, railing<br></div></div><div id=\"data_2\"><div class=\"title\"><button class=\"buttonlink\">Annotation 3</button></div> <div class=\"additionaltext\">         DETAILS OF PARTITION BETWEEN BANK...<br>                           <b>Tags:</b> partition<br></div></div></div></div> <button class=\"infolink buttonlink imageinfolink\">Image information</button> <div class=\"imageinfo\"><div id=\"Manifest\"><b>Manifest: </b><a href=\"https://d.lib.ncsu.edu/collections/catalog/mc00240-001-ff0093-001-001_0010/manifest.json\" target=\"_blank\">https://d.lib.ncsu.edu/collections/catalog/mc00240-001-ff0093-001-001_0010/manifest.json</a></div><div id=\"title\"><b>Title: </b>Cross section, interior details</div><div id=\"attribution\"><b>Attribution: </b>Northup &amp; O'Brien Architectural Records, 1917-1980 (MC00240), Special Collections Research Center at NCSU Libraries</div><div id=\"license\"><b>License: </b>https://d.lib.ncsu.edu/collections/about#rights_and_use</div><div id=\"title\"><b>Title: </b>Cross section, interior details</div><div id=\"Creator\"><b>Creator: </b><span><a href=\"https://d.lib.ncsu.edu/collections/catalog?f%5Bnames_facet%5D%5B%5D=O%27Brien%2C+Leet+Alexander%2C+1891-1963\">O'Brien, Leet Alexander, 1891-1963</a> (Architect)</span></div><div id=\"Created Date\"><b>Created Date: </b>1924-06-201924-10-16</div><div id=\"URL\"><b>URL: </b><span><a href=\"https://d.lib.ncsu.edu/collections/catalog/mc00240-001-ff0093-001-001_0010\">https://d.lib.ncsu.edu/collections/catalog/mc00240-001-ff0093-001-001_0010</a></span></div><div id=\"\"><span><a href=\"https://d.lib.ncsu.edu/collections/catalog/mc00240-001-ff0093-001-001_0010?manifest=https%3A%2F%2Fd.lib.ncsu.edu%2Fcollections%2Fcatalog%2Fmc00240-001-ff0093-001-001_0010%2Fmanifest.json\" title=\"IIIF drag &amp; drop\">IIIF drag &amp; drop</a> (<a href=\"https://d.lib.ncsu.edu/collections/about-iiif\">About IIIF</a>)</span></div></div></span>")
      wrapper.find('.annoinfolink').trigger('click')
      wrapper.find('.imageinfolink').trigger('click')
      expect(document.getElementsByClassName('content')[0].innerHTML.replace(/(\r\n|\n|\r)/gm, " ")).toEqual("<div class=\"imagetitle\"><h1>Cross section, interior details</h1></div> <span><!----> <!----> <!----> <!----> <button class=\"infolink buttonlink annoinfolink\">Annotation information</button> <!----> <button class=\"infolink buttonlink imageinfolink\">Image information</button> <!----></span>")
    })
    test('test storyboard with openannotation list', async ()  => {
      const wrapper =  shallowMount(storyboard,{
        propsData: {
          annotationlist: 'mc00240.json'
        }
      })
      const saveMock = jest.fn()
      wrapper.vm.createViewer = saveMock;
      await wrapper.vm.$nextTick()
      await flushPromises()
      var data = wrapper.vm.$data
      expect(data.seadragontile).toBe("https://iiif.lib.ncsu.edu/iiif/mc00240-001-ff0093-001-001_0010/info.json")
      expect(data.zoomsections[1]['section']).toEqual(["4206,2376,1970,2379"])
      expect(data.zoomsections[1]['type']).toEqual("rectangle")
      expect(data.zoomsections[1]['svg_path'][0].outerHTML).toEqual("<path xmlns=\"http://www.w3.org/2000/svg\" d=\"M4206.4542,2375.55834l985.03137,0l0,0l985.03137,0l0,1189.5734l0,1189.5734l-985.03137,0l-985.03137,0l0,-1189.5734z\" data-paper-data=\"{&quot;defaultStrokeValue&quot;:1,&quot;editStrokeValue&quot;:5,&quot;currentStrokeValue&quot;:1,&quot;rotation&quot;:0,&quot;deleteIcon&quot;:null,&quot;rotationIcon&quot;:null,&quot;group&quot;:null,&quot;editable&quot;:true,&quot;annotation&quot;:null}\" id=\"rectangle_97e17d4a-e919-467d-836b-17722e9fee6a\" fill-opacity=\"0\" fill=\"#00bfff\" fill-rule=\"nonzero\" stroke=\"#00bfff\" stroke-width=\"3.58846\" stroke-linecap=\"butt\" stroke-linejoin=\"miter\" stroke-miterlimit=\"10\" stroke-dasharray=\"\" stroke-dashoffset=\"0\" font-family=\"none\" font-weight=\"none\" font-size=\"none\" text-anchor=\"none\" style=\"mix-blend-mode: normal\"></path>")
      expect(data.zoomsections[1]['svg_path'].length).toEqual(1)
      expect(data.position).toEqual(-1)
      expect(data.seadragonid).toBe('mc00240_storyboard')
      expect(data.annotations[1]['tags'].length).toEqual(2)
      expect(data.annotations[1]['tags']).toContain('railing')
      expect(data.annotations.length).toEqual(3)
      expect(data.annotations[0]['textual_body'][0]).toContain('<p>Bank and Office Building for Wachovia Bank and Trust Co.</p>')
      expect(data.currentanno).toEqual('')
    })
    test('test storyboard with w3 annotations page', async ()  => {
      const wrapper =  shallowMount(storyboard,{
        propsData: {
          annotationlist: 'page.json'
        }
      })
      const saveMock = jest.fn()
      wrapper.vm.createViewer = saveMock;
      await wrapper.vm.$nextTick()
      await flushPromises()
      var data = wrapper.vm.$data
      expect(data.seadragontile).toBe("https://iiif.lib.ncsu.edu/iiif/mc00084-001-te0159-000-001_0001/info.json")
      expect(data.zoomsections).toEqual([{"section": ["1800,2000,500,500"], "type": "rect", "svg_path":[]}])
      expect(data.position).toEqual(-1)
      expect(data.seadragonid).toBe('page_storyboard')
      expect(data.annotations[0]['tags'].length).toEqual(0)
      expect(data.annotations.length).toEqual(1)
      expect(data.annotations[0]['textual_body']).toContain("<div class=\"textualbody\"><iiif-annotation annotationurl='https://dnoneill.github.io/annotate/annotations/0001-1.json'></iiif-annotation></div>")
      expect(data.currentanno).toEqual('')
    })
    test('test storyboard with single open annotation', async ()  => {
      const wrapper =  shallowMount(storyboard,{
        propsData: {
          annotationurl: 'paragraph.json'
        }
      })
      const saveMock = jest.fn()
      wrapper.vm.createViewer = saveMock;
      await wrapper.vm.$nextTick()
      await flushPromises()
      var data = wrapper.vm.$data
      expect(data.seadragontile).toBe("https://dlcs.io/iiif-img/wellcome/1/ce30a1a7-a606-4b5e-b2ad-c13677d3e8f6/info.json")
      expect(data.zoomsections).toEqual([{"section": ["310,1250,1850,1180"], "type": "rect", "svg_path":[]}])
      expect(data.seadragonid).toBe('paragraph_storyboard')
      expect(data.annotations[0]['tags'].length).toEqual(0)
      expect(data.annotations.length).toEqual(1)
      expect(data.annotations[0]['ocr'][0]).toContain('Jim Watson and I have probably made a')
      expect(data.currentanno).toEqual('')
    })
    test('test storyboard with single w3 annotation', async ()  => {
      const wrapper =  shallowMount(storyboard,{
        propsData: {
          annotationurl: 'bees.json'
        }
      })
      const saveMock = jest.fn()
      wrapper.vm.createViewer = saveMock;
      await wrapper.vm.$nextTick()
      await flushPromises()
      var data = wrapper.vm.$data
      expect(data.seadragontile).toBe("https://iiif.lib.ncsu.edu/iiif/segIns_023/info.json")
      expect(data.zoomsections).toEqual([{"section": ["318,499,2891,3339"], "type": "rect", "svg_path":[]}])
      expect(data.seadragonid).toBe('bees_storyboard')
      expect(data.annotations[0]['tags'].length).toEqual(1)
      expect(data.annotations.length).toEqual(1)
      expect(data.annotations[0]['textual_body'].length).toEqual(0)
      expect(data.currentanno).toEqual('')
    })
    test('test storyboard with single open annotation', async ()  => {
      const wrapper =  shallowMount(storyboard,{
        propsData: {
          annotationurl: 'paragraph.json'
        }
      })
      const saveMock = jest.fn()
      wrapper.vm.createViewer = saveMock;
      await wrapper.vm.$nextTick()
      await flushPromises()
      var data = wrapper.vm.$data
      expect(data.seadragontile).toBe("https://dlcs.io/iiif-img/wellcome/1/ce30a1a7-a606-4b5e-b2ad-c13677d3e8f6/info.json")
      expect(data.zoomsections).toEqual([{"section": ["310,1250,1850,1180"], "type": "rect", "svg_path":[]}])
      expect(data.seadragonid).toBe('paragraph_storyboard')
      expect(data.annotations[0]['tags'].length).toEqual(0)
      expect(data.annotations.length).toEqual(1)
      expect(data.annotations[0]['ocr'][0]).toContain('Jim Watson and I have probably made a')
      expect(data.currentanno).toEqual('')
      expect(shared.createContent(data.annotations[0], null, data.settings, true)['anno'].replace(/(\r\n|\n|\r)/gm, " ")).toEqual("<span style=\"direction: ltr;\"><div id=\"ocr\">Jim Watson and I have probably made a most important discovery. We have built a model for the structure of des-oxy-ribose-nucleic-acid (read it carefully) called D.N.A. for short. You may remember that the genes of the chromosomes - which carry the hereditary factors - are made up of protein and D.N.A.</div></span>")
      expect(shared.createContent(data.annotations[1], null, data.settings, true)['anno'].replace(/(\r\n|\n|\r)/gm, " ")).toEqual("")
    })
    test('test storyboard with no manifest', async ()  => {
      const wrapper =  shallowMount(storyboard,{
        propsData: {
          annotationlist: '4058a628-c593-463e-9736-8a821e178fee-list.json',
          styling: 'toggleoverlay: true;startenddisplay:keyboard;'
        }
      })
      const saveMock = jest.fn()
      wrapper.vm.createViewer = saveMock;
      await wrapper.vm.$nextTick()
      await flushPromises()
      var data = wrapper.vm.$data
      expect(wrapper.html().replace(/(\r\n|\n|\r)/gm, " ")).toEqual("<div id=\"storyboard_viewer\" class=\"storyboard_viewer\"><div class=\"defaultview\" style=\"position: relative; display: flex;\"><div id=\"4058a628-c593-463e-9736-8a821e178fee_storyboard\" class=\"seadragonbox default_menu_container\" style=\"position: relative;\"><span id=\"header_toolbar\" class=\"default_menu\"><button id=\"autoRunButton\" class=\"toolbarButton\" data-hotkey-string=\"b|1\"><span><i class=\"fas fa-magic\"></i></span> <span class=\"toolbartext\">Start/Stop Autorun</span></button> <button id=\"infoButton\" class=\"toolbarButton\" data-hotkey-string=\"i|2\"><span><i class=\"fas fa-info-circle\"></i></span> <span class=\"toolbartext\">View source image information</span></button> <button id=\"tagsButton\" class=\"toolbarButton\" data-hotkey-string=\"t|3\"><span><i class=\"fas fa-tag\"></i></span> <span class=\"toolbartext\">Toggle Tags</span></button> <button id=\"overlayButton\" class=\"toolbarButton\" data-hotkey-string=\"o|4\"><span><i class=\"fas fa-toggle-on\"></i></span> <span class=\"toolbartext\">Toggle Overlays</span></button> <!----> <button id=\"zoomInButton\" class=\"toolbarButton\" data-hotkey-string=\"z|+|shift+up\"><i class=\"fas fa-search-plus\"></i> <span class=\"toolbartext\">Zoom in</span></button> <button id=\"zoomOutButton\" class=\"toolbarButton\" data-hotkey-string=\"m|-|shift+down\"><i class=\"fas fa-search-minus\"></i> <span class=\"toolbartext\">Zoom out</span></button> <button id=\"homeZoomButton\" class=\"toolbarButton\" data-hotkey-string=\"h|0\"><i class=\"fas fa-home\"></i> <span class=\"toolbartext\">View full image</span></button> <button id=\"previousButton\" class=\"toolbarButton inactive\" data-hotkey-string=\"p|,|shift+left\"><i class=\"fa fa-arrow-left\"></i> <span class=\"toolbartext\">Previous Annotation</span></button> <button id=\"nextButton\" class=\"toolbarButton\" data-hotkey-string=\"n|.|shift+right\"><i class=\"fa fa-arrow-right\"></i> <span class=\"toolbartext\">Next Annotation</span></button> <button id=\"keyboardShortcutsButton\" class=\"toolbarButton\" data-hotkey-string=\"s|8\"><span><i class=\"fas fa-window-close\"></i></span> <span class=\"toolbartext\">Toggle keyboard shortcuts</span></button> <button id=\"fullScreenButton\" class=\"toolbarButton\" data-hotkey-string=\"alt+f|;\"><span><i class=\"fas fa-expand\"></i></span> <span class=\"toolbartext\">Toggle fullscreen</span></button></span></div> <div id=\"4058a628-c593-463e-9736-8a821e178fee_storyboard_annotation\" tabindex=\"0\" class=\"annotation fullcontent corner\" style=\"\"><span id=\"annotation_controls\"><button id=\"close_button\" class=\"annocontrols_button\" data-hotkey-string=\"x|6\"><i class=\"fas fa-times\"></i></button> <button id=\"hide_button\" class=\"annocontrols_button\" data-hotkey-string=\"c|7\"><span><i class=\"fas fa-caret-up\"></i></span></button> <!----> <button id=\"tags_button\" class=\"annocontrols_button\"><span><i class=\"fas fa-tag\"></i></span></button> <button id=\"info_button\" class=\"annocontrols_button\"><span><i class=\"fas fa-info-circle\"></i></span></button> <!----> <!----></span> <!----> <div id=\"shortcuts\" class=\"content\"><p>There are multiple possible keyboard shortcuts for each button. They are separated by an 'or'. On Macs 'alt' is the 'option' key</p> <table><tr><th>Icon</th> <th>Keyboard Shortcuts</th></tr> <tr id=\"autorun_tags\" class=\"keyboard\"><td><span class=\"shortcuticon\"><i class=\"fas fa-magic\"></i> (Auto Run)</span></td> <td><span><code>b</code><span> or </span></span><span><code>1</code><!----></span></td></tr><tr id=\"info_tags\" class=\"keyboard\"><td><span class=\"shortcuticon\"><i class=\"fas fa-info-circle\"></i> (Info Button)</span></td> <td><span><code>i</code><span> or </span></span><span><code>2</code><!----></span></td></tr><tr id=\"overlay_tags\" class=\"keyboard\"><td><span class=\"shortcuticon\"><i class=\"fas fa-toggle-on\"></i> (Toggle)</span></td> <td><span><code>o</code><span> or </span></span><span><code>4</code><!----></span></td></tr><tr id=\"zoomin_tags\" class=\"keyboard\"><td><span class=\"shortcuticon\"><i class=\"fas fa-search-plus\"></i> (Zoom In)</span></td> <td><span><code>z</code><span> or </span></span><span><code>+</code><span> or </span></span><span><code>shift+up</code><!----></span></td></tr><tr id=\"zoomout_tags\" class=\"keyboard\"><td><span class=\"shortcuticon\"><i class=\"fas fa-search-minus\"></i> (Zoom Out)</span></td> <td><span><code>m</code><span> or </span></span><span><code>-</code><span> or </span></span><span><code>shift+down</code><!----></span></td></tr><tr id=\"home_tags\" class=\"keyboard\"><td><span class=\"shortcuticon\"><i class=\"fas fa-home\"></i> (Home)</span></td> <td><span><code>h</code><span> or </span></span><span><code>0</code><!----></span></td></tr><tr id=\"prev_tags\" class=\"keyboard\"><td><span class=\"shortcuticon\"><i class=\"fa fa-arrow-left\"></i> (Previous)</span></td> <td><span><code>p</code><span> or </span></span><span><code>,</code><span> or </span></span><span><code>shift+left</code><!----></span></td></tr><tr id=\"next_tags\" class=\"keyboard\"><td><span class=\"shortcuticon\"><i class=\"fa fa-arrow-right\"></i> (Next)</span></td> <td><span><code>n</code><span> or </span></span><span><code>.</code><span> or </span></span><span><code>shift+right</code><!----></span></td></tr><tr id=\"fullscreen_tags\" class=\"keyboard\"><td><span class=\"shortcuticon\"><i class=\"fas fa-expand\"></i> (Fullscreen)</span></td> <td><span><code>alt+f</code><span> or </span></span><span><code>;</code><!----></span></td></tr><tr id=\"close_tags\" class=\"keyboard\"><td><span class=\"shortcuticon\"><i class=\"fas fa-times\"></i> (Close)</span></td> <td><span><code>x</code><span> or </span></span><span><code>6</code><!----></span></td></tr><tr id=\"hide_tags\" class=\"keyboard\"><td><span class=\"shortcuticon\"><i class=\"fas fa-caret-up\"></i> (Collapse text)</span></td> <td><span><code>c</code><span> or </span></span><span><code>7</code><!----></span></td></tr><tr id=\"shortcut_tags\" class=\"keyboard\"><td><span class=\"shortcuticon\"><i class=\"fas fa-window-close\"></i> (Keyboard Shortcuts)</span></td> <td><span><code>s</code><span> or </span></span><span><code>8</code><!----></span></td></tr><tr id=\"tags_tags\" class=\"keyboard\"><td><span class=\"shortcuticon\"><i class=\"fas fa-tag\"></i> (Tags)</span></td> <td><span><code>t</code><span> or </span></span><span><code>3</code><!----></span></td></tr></table></div> <!----> <!----> <!----> <!----></div></div></div>")
      expect(Object.keys(data.tagslist).length).toEqual(6)
      expect(data.tagslist.church.checked).toBe(true)
      expect(data.seadragontile).toBe("https://repository.duke.edu/iipsrv/iipsrv.fcgi?IIIF=/srv/perkins/repo_deriv/multires_image/40/58/a6/28/4058a628-c593-463e-9736-8a821e178fee/info.json")
      expect(data.zoomsections).toEqual([{"section": ["6925,7907,415,156"], "type": "pin", "svg_path": []}, {"section": ["7068,8160,382,245"], "type": "pin", "svg_path": []}, {"section": ["6609,5718,766,721"], "type": "pin", "svg_path": []}, {"section": ["21613,7537,565,381"], "type": "pin", "svg_path":[]}, {"section": ["23006,8428,690,819"], "type": "pin", "svg_path": []}, {"section": ["3444,5811,579,403"], "type": "pin", "svg_path": []}, {"section": ["11986,9036,2233,889"], "type": "pin", "svg_path":[]}, {"section": ["6373,7880,221,223"], "type": "pin", "svg_path":[]}])
      expect(data.seadragonid).toBe('4058a628-c593-463e-9736-8a821e178fee_storyboard')
      expect(data.annotations[0]['tags'].length).toEqual(1)
      expect(data.annotations.length).toEqual(8)
      expect(data.annotations[0]['textual_body']).toEqual(['<div class=\"textualbody\">Campo San Maurizio</div>'])
      expect(data.currentanno).toEqual('')
      expect(shared.createContent(data.annotations[0], null, data.settings, true)).toEqual({"anno": "<span style=\"direction: ltr;\"><div class=\"textualbody\">Campo San Maurizio</div><div class=\"tags\">Tags: campo</div></span>", "transcription": ""})
      expect(shared.createContent(data.annotations[1], null, data.settings, true)).toEqual({"anno": "<span style=\"direction: ltr;\"><div class=\"textualbody\">Church of San Maurizio. Is now a Museum on music of Baroque Venice.</div><div class=\"tags\">Tags: church, deconsecrated</div></span>", "transcription": ""})
      expect(data.annoinfo.annodata.length).toBe(8)
      expect(data.annoinfo.annodata[0].title).toBe('Annotation 1')
    })
    test('test storyboard with settings', async ()  => {
      const wrapper =  shallowMount(storyboard,{
        propsData: {
          annotationurl: 'techocr.json',
          styling: 'transcription:true;startenddisplay:transcription;'
        }
      })
      const saveMock = jest.fn()
      wrapper.vm.createViewer = saveMock;
      await wrapper.vm.$nextTick()
      await flushPromises()
      var data = wrapper.vm.$data
      expect(data.seadragontile).toBe("https://d.lib.ncsu.edu/collections/canvas/technician-basketballspecial-1991-11_0001/info.json")
      expect(data.zoomsections).toEqual([{"section": ["881,247,1764,86"], "svg_path": [], "type": "rect"}, {"section": ["878,396,2236,126"], "svg_path": [], "type": "rect"}, {"section": ["864,684,2330,236"], "svg_path": [], "type": "rect"}, {"section": ["1455,1002,1180,50"], "svg_path": [], "type": "rect"}, {"section": ["2047,1649,1021,150"], "svg_path": [], "type": "rect"}, {"section": ["2044,1928,909,239"], "svg_path": [], "type": "rect"}, {"section": ["2047,2199,572,60"], "svg_path": [], "type": "rect"}])
      expect(data.seadragonid).toBe('techocr_storyboard')
      expect(data.annotations[0]['tags'].length).toEqual(0)
      expect(data.annotations.length).toEqual(7)
      expect(data.annotations[0]['ocr'][0]).toContain('Meet the Pack One Last Look')
      expect(data.currentanno).toEqual('')
      expect(wrapper.html()).toEqual('<div id="storyboard_viewer" class="storyboard_viewer"><div class="defaultview" style="position: relative; display: flex;"><div id="techocr_storyboard" class="seadragonbox default_menu_container" style="position: relative;"><span id="header_toolbar" class="default_menu"><!----> <button id="infoButton" class="toolbarButton" data-hotkey-string="i|2"><span><i class="fas fa-info-circle"></i></span> <span class="toolbartext">View source image information</span></button> <!----> <!----> <!----> <button id="zoomInButton" class="toolbarButton" data-hotkey-string="z|+|shift+up"><i class="fas fa-search-plus"></i> <span class="toolbartext">Zoom in</span></button> <button id="zoomOutButton" class="toolbarButton" data-hotkey-string="m|-|shift+down"><i class="fas fa-search-minus"></i> <span class="toolbartext">Zoom out</span></button> <button id="homeZoomButton" class="toolbarButton" data-hotkey-string="h|0"><i class="fas fa-home"></i> <span class="toolbartext">View full image</span></button> <!----> <!----> <button id="keyboardShortcutsButton" class="toolbarButton" data-hotkey-string="s|8"><span><i class="fas fa-keyboard"></i></span> <span class="toolbartext">Toggle keyboard shortcuts</span></button> <button id="fullScreenButton" class="toolbarButton" data-hotkey-string="alt+f|;"><span><i class="fas fa-expand"></i></span> <span class="toolbartext">Toggle fullscreen</span></button></span></div> <div id="techocr_storyboard_annotation" tabindex="0" class="annotation fullcontent corner" style=""><span id="annotation_controls"><button id="close_button" class="annocontrols_button" data-hotkey-string="x|6"><i class="fas fa-times"></i></button> <button id="hide_button" class="annocontrols_button" data-hotkey-string="c|7"><span><i class="fas fa-caret-up"></i></span></button> <!----> <!----> <button id="info_button" class="annocontrols_button"><span><i class="fas fa-info-circle"></i></span></button> <!----> <!----></span> <!----> <!----> <!----> <!----> <div id="transcription" class="content"><!----> <button class="buttonastext ocrlink"><div id="line0" class="ocrtranscription">Meet the Pack One Last Look</div></button><button class="buttonastext ocrlink"><div id="line1" class="ocrtranscription">Player proﬁles of all members of the Remember the exciting ﬁnal year of men’s and women’s basketball teams the “Fire &amp; Ice” backoourt</div></button><button class="buttonastext ocrlink"><div id="line2" class="ocrtranscription">HMPreview ’91-92</div></button><button class="buttonastext ocrlink"><div id="line3" class="ocrtranscription">Technician’s Annual Basketball Edition</div></button><button class="buttonastext ocrlink"><div id="line4" class="ocrtranscription">LEADER OF TH ACK</div></button><button class="buttonastext ocrlink"><div id="line5" class="ocrtranscription">TOM GUGLIOTTA IS LOOKING FOR A STRONG PERFORMANCE IN HIS</div></button><button class="buttonastext ocrlink"><div id="line6" class="ocrtranscription">SENIOR SEASON</div></button> <!----></div> <!----></div></div></div>')
      var contentpos1 = shared.createContent(data.annotations[0], null, data.settings, true);
      expect(contentpos1['anno']).toEqual(contentpos1['transcription'])
      expect(contentpos1['anno']).toEqual("<span style=\"direction: ltr;\"><div id=\"ocr\">Meet the Pack One Last Look</div></span>")
      expect(shared.createContent(data.annotations[1], null, data.settings, true)['anno']).toEqual("<span style=\"direction: ltr;\"><div id=\"ocr\">Player proﬁles of all members of the Remember the exciting ﬁnal year of men’s and women’s basketball teams the “Fire & Ice” backoourt</div></span>")
      expect(shared.keyboardShortcuts('storyboard', wrapper.vm)).toEqual({"close": {"icon": "<i class=\"fas fa-times\"></i>", "label": "Close", "shortcut": ["x", "6"]}, "fullscreen": {"icon": "<i class=\"fas fa-expand\"></i>", "label": "Fullscreen", "shortcut": ["alt+f", ";"]}, "hide": {"icon": "<i class=\"fas fa-caret-up\"></i>", "label": "Collapse text", "shortcut": ["c", "7"]}, "home": {"icon": "<i class=\"fas fa-home\"></i>", "label": "Home", "shortcut": ["h", "0"]}, "info": {"icon": "<i class=\"fas fa-info-circle\"></i>", "label": "Info Button", "shortcut": ["i", "2"]}, "shortcut": {"icon": "<i class=\"fas fa-keyboard\"></i>", "label": "Keyboard Shortcuts", "shortcut": ["s", "8"]}, "zoomin": {"icon": "<i class=\"fas fa-search-plus\"></i>", "label": "Zoom In", "shortcut": ["z", "+", "shift+up"]}, "zoomout": {"icon": "<i class=\"fas fa-search-minus\"></i>", "label": "Zoom Out", "shortcut": ["m", "-", "shift+down"]}})
    })
    test('test storyboard with transcription', async ()  => {

      const wrapper =  mount(storyboard,{
        propsData: {
          annotationlist: 'recogito.json',
          styling: 'hide_infobutton: true;startenddisplay:info;'
        },
        attachToDocument: true
      })
      const saveMock = jest.fn()
      wrapper.vm.createViewer = saveMock;
      await wrapper.vm.$nextTick()
      await flushPromises()
      var data = wrapper.vm.$data
      data.booleanitems.annoinfoshown = true;
      expect(data.seadragontile).toBe("https://iiif.bodleian.ox.ac.uk/iiif/image/467a8da6-02b6-4643-a376-4b0afaff6ab7/info.json")
      expect(data.zoomsections).toEqual([{"section": ["1958,1907,113,51"], "svg_path": [], "type": "rect"}, {"section": ["1537,579,382,352"], "svg_path": [], "type": "rect"}, {"section": ["1704,1509,319,123"], "svg_path": [], "type": "rect"}])
      expect(data.seadragonid).toBe('recogito_storyboard')
      expect(data.annotations[0]['tags'].length).toEqual(0)
      expect(data.annotations.length).toEqual(3)
      expect(data.annotations[0]['ocr'][0]).toContain('Lodinv<div class=\"authorship\">Written by: https://recogito.pelagios.org/rainer</div>')
      expect(data.currentanno).toEqual('')
      //wrapper.find('.annoinfolink').trigger('click')
      expect(wrapper.html().replace(/(\r\n|\n|\r)/gm, " ")).toEqual("<div id=\"storyboard_viewer\" class=\"storyboard_viewer\"><div class=\"defaultview\" style=\"position: relative; display: flex;\"><div id=\"recogito_storyboard\" class=\"seadragonbox default_menu_container\" style=\"position: relative;\"><span id=\"header_toolbar\" class=\"default_menu\"><button id=\"autoRunButton\" class=\"toolbarButton\" data-hotkey-string=\"b|1\"><span><i class=\"fas fa-magic\"></i></span> <span class=\"toolbartext\">Start/Stop Autorun</span></button> <!----> <!----> <button id=\"overlayButton\" class=\"toolbarButton\" data-hotkey-string=\"o|4\"><span><i class=\"fas fa-toggle-on\"></i></span> <span class=\"toolbartext\">Toggle Overlays</span></button> <!----> <button id=\"zoomInButton\" class=\"toolbarButton\" data-hotkey-string=\"z|+|shift+up\"><i class=\"fas fa-search-plus\"></i> <span class=\"toolbartext\">Zoom in</span></button> <button id=\"zoomOutButton\" class=\"toolbarButton\" data-hotkey-string=\"m|-|shift+down\"><i class=\"fas fa-search-minus\"></i> <span class=\"toolbartext\">Zoom out</span></button> <button id=\"homeZoomButton\" class=\"toolbarButton\" data-hotkey-string=\"h|0\"><i class=\"fas fa-home\"></i> <span class=\"toolbartext\">View full image</span></button> <button id=\"previousButton\" class=\"toolbarButton inactive\" data-hotkey-string=\"p|,|shift+left\"><i class=\"fa fa-arrow-left\"></i> <span class=\"toolbartext\">Previous Annotation</span></button> <button id=\"nextButton\" class=\"toolbarButton\" data-hotkey-string=\"n|.|shift+right\"><i class=\"fa fa-arrow-right\"></i> <span class=\"toolbartext\">Next Annotation</span></button> <button id=\"keyboardShortcutsButton\" class=\"toolbarButton\" data-hotkey-string=\"s|8\"><span><i class=\"fas fa-keyboard\"></i></span> <span class=\"toolbartext\">Toggle keyboard shortcuts</span></button> <button id=\"fullScreenButton\" class=\"toolbarButton\" data-hotkey-string=\"alt+f|;\"><span><i class=\"fas fa-expand\"></i></span> <span class=\"toolbartext\">Toggle fullscreen</span></button></span></div> <div id=\"recogito_storyboard_annotation\" tabindex=\"0\" class=\"annotation fullcontent corner\" style=\"\"><span id=\"annotation_controls\"><button id=\"close_button\" class=\"annocontrols_button\" data-hotkey-string=\"x|6\"><i class=\"fas fa-times\"></i></button> <button id=\"hide_button\" class=\"annocontrols_button\" data-hotkey-string=\"c|7\"><span><i class=\"fas fa-caret-up\"></i></span></button> <!----> <!----> <!----> <!----> <!----></span> <!----> <!----> <!----> <div id=\"information\" class=\"info content\" style=\"height: auto;\"><div class=\"imagetitle\"><h1></h1></div> <span><!----> <!----> <!----> <!----> <button class=\"infolink buttonlink annoinfolink\">Annotation information</button> <div class=\"annoinfo\"><span><div class=\"listinfo\"><b>Annotation Url: </b><a href=\"recogito.json\" target=\"_blank\">recogito.json</a><br>       <b>Number of Annotations:</b> 3</div></span> <div class=\"annotationslist\"><div id=\"data_0\"><div class=\"title\"><button class=\"buttonlink\">Annotation 1</button></div> <div class=\"additionaltext\">         http://pleiades.stoa.org/places/79574<br>                           </div></div><div id=\"data_1\"><div class=\"title\"><button class=\"buttonlink\">Annotation 2</button></div> <div class=\"additionaltext\">         MARE HIBERNICVM<br>                           </div></div><div id=\"data_2\"><div class=\"title\"><button class=\"buttonlink\">Annotation 3</button></div> <div class=\"additionaltext\">         The British Isles<br>                           </div></div></div></div> <!----> <!----></span></div> <!----> <!----></div></div></div>")
      var contentpos1 = shared.createContent(data.annotations[0], null, data.settings, true);
      expect(contentpos1['anno']).not.toEqual(contentpos1['transcription'])
      expect(contentpos1['anno']).toEqual("<span style=\"direction: ltr;\"><div class=\"identifying\">http://pleiades.stoa.org/places/79574<div class=\"authorship\">Written by: https://recogito.pelagios.org/rainer</div></div></span>")
      expect(shared.createContent(data.annotations[1], null, data.settings, true)['anno']).toEqual("<span style=\"direction: ltr;\"><div id=\"ocr\">MARE HIBERNICVM<div class=\"authorship\">Written by: https://recogito.pelagios.org/rainer</div></div></span>")
      expect(shared.keyboardShortcuts('storyboard', wrapper.vm)).toEqual({"autorun": {"icon": "<i class=\"fas fa-magic\"></i>", "label": "Auto Run", "shortcut": ["b", "1"]}, "close": {"icon": "<i class=\"fas fa-times\"></i>", "label": "Close", "shortcut": ["x", "6"]}, "fullscreen": {"icon": "<i class=\"fas fa-expand\"></i>", "label": "Fullscreen", "shortcut": ["alt+f", ";"]}, "hide": {"icon": "<i class=\"fas fa-caret-up\"></i>", "label": "Collapse text", "shortcut": ["c", "7"]}, "home": {"icon": "<i class=\"fas fa-home\"></i>", "label": "Home", "shortcut": ["h", "0"]}, "next": {"icon": "<i class=\"fa fa-arrow-right\"></i>", "label": "Next", "shortcut": ["n", ".", "shift+right"]}, "overlay": {"icon": "<i class=\"fas fa-toggle-on\"></i>", "label": "Toggle", "shortcut": ["o", "4"]}, "prev": {"icon": "<i class=\"fa fa-arrow-left\"></i>", "label": "Previous", "shortcut": ["p", ",", "shift+left"]}, "shortcut": {"icon": "<i class=\"fas fa-keyboard\"></i>", "label": "Keyboard Shortcuts", "shortcut": ["s", "8"]}, "transcription": {"icon": "<i class=\"fas fa-pen-nib\"></i>", "label": "Toggle between transcription/annotation", "shortcut": ["a", "/"]}, "zoomin": {"icon": "<i class=\"fas fa-search-plus\"></i>", "label": "Zoom In", "shortcut": ["z", "+", "shift+up"]}, "zoomout": {"icon": "<i class=\"fas fa-search-minus\"></i>", "label": "Zoom Out", "shortcut": ["m", "-", "shift+down"]}})
      var content = shared.createContent(data.annotations[2], data.currentlang, true);
      wrapper.setData({'position': 2, 'currentanno': content['anno'], 'shown': 'anno', 'transcription': content['transcription']});
      expect(data.currentanno).toEqual("<span style=\"direction: ltr;\"><div class=\"commenting\">The British Isles<div class=\"authorship\">Written by: https://recogito.pelagios.org/rainer</div></div></span>")
      expect(wrapper.find('.content').html()).toEqual("<div id=\"annotation_text\" class=\"content\" style=\"\"><span><span style=\"direction: ltr;\"><div class=\"commenting\">The British Isles<div class=\"authorship\">Written by: https://recogito.pelagios.org/rainer</div></div></span></span> <!----></div>")
      wrapper.find('#transcription_button').trigger('click')
      expect(data.shown).toEqual('transcription')
      expect(wrapper.find('.content').html()).toEqual("<div id=\"transcription\" class=\"content\" style=\"\"><span><span style=\"direction: ltr;\"><div id=\"ocr\">BRITANIA INSVLA<div class=\"authorship\">Written by: https://recogito.pelagios.org/rainer</div></div></span></span> <!----><!----><!----> <!----></div>")
      wrapper.find('#transcription_button').trigger('click')
      expect(wrapper.find('.content').html()).toEqual("<div id=\"annotation_text\" class=\"content\" style=\"\"><span><span style=\"direction: ltr;\"><div class=\"commenting\">The British Isles<div class=\"authorship\">Written by: https://recogito.pelagios.org/rainer</div></div></span></span> <!----></div>")
      expect(data.shown).toEqual('anno')
    })
})
