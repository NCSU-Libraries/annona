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
      expect(data.anno_elem).toEqual(null)
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
      expect(data.anno_elem).toEqual(null)
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
      expect(data.anno_elem).toEqual(null)
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
      expect(data.anno_elem).toEqual(null)
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
      expect(data.anno_elem).toEqual(null)
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
      expect(data.anno_elem).toEqual(null)
      expect(shared.createContent(data.annotations[0], null, data.settings, true).replace(/(\r\n|\n|\r)/gm, " ")).toEqual("<span style=\"direction: ltr;\"><div id=\"ocr\">Jim Watson and I have probably made a most important discovery. We have built a model for the structure of des-oxy-ribose-nucleic-acid (read it carefully) called D.N.A. for short. You may remember that the genes of the chromosomes - which carry the hereditary factors - are made up of protein and D.N.A.</div></span>")
      expect(shared.createContent(data.annotations[1], null, data.settings, true).replace(/(\r\n|\n|\r)/gm, " ")).toEqual("")
    })
    test('test storyboard with no manifest', async ()  => {
      const wrapper =  shallowMount(storyboard,{
        propsData: {
          annotationlist: '4058a628-c593-463e-9736-8a821e178fee-list.json',
          styling: 'toggleoverlay: true;'
        }
      })
      const saveMock = jest.fn()
      wrapper.vm.createViewer = saveMock;
      await wrapper.vm.$nextTick()
      await flushPromises()
      var data = wrapper.vm.$data
      expect(Object.keys(data.tagslist).length).toEqual(6)
      expect(data.tagslist.church.checked).toBe(true)
      expect(data.seadragontile).toBe("https://repository.duke.edu/iipsrv/iipsrv.fcgi?IIIF=/srv/perkins/repo_deriv/multires_image/40/58/a6/28/4058a628-c593-463e-9736-8a821e178fee/info.json")
      expect(data.zoomsections).toEqual([{"section": ["6925,7907,415,156"], "type": "pin", "svg_path": []}, {"section": ["7068,8160,382,245"], "type": "pin", "svg_path": []}, {"section": ["6609,5718,766,721"], "type": "pin", "svg_path": []}, {"section": ["21613,7537,565,381"], "type": "pin", "svg_path":[]}, {"section": ["23006,8428,690,819"], "type": "pin", "svg_path": []}, {"section": ["3444,5811,579,403"], "type": "pin", "svg_path": []}, {"section": ["11986,9036,2233,889"], "type": "pin", "svg_path":[]}, {"section": ["6373,7880,221,223"], "type": "pin", "svg_path":[]}])
      expect(data.seadragonid).toBe('4058a628-c593-463e-9736-8a821e178fee_storyboard')
      expect(data.annotations[0]['tags'].length).toEqual(1)
      expect(data.annotations.length).toEqual(8)
      expect(data.annotations[0]['textual_body']).toEqual(['<div class=\"textualbody\">Campo San Maurizio</div>'])
      expect(data.currentanno).toEqual('')
      expect(data.anno_elem).toEqual(null)
      expect(shared.createContent(data.annotations[0], null, data.settings, true)).toEqual('<span style="direction: ltr;"><div class="textualbody">Campo San Maurizio</div><div class="tags">Tags: campo</div></span>')
      expect(shared.createContent(data.annotations[1], null, data.settings, true)).toEqual('<span style=\"direction: ltr;\"><div class=\"textualbody\">Church of San Maurizio. Is now a Museum on music of Baroque Venice.</div><div class=\"tags\">Tags: church, deconsecrated</div></span>')
      expect(data.annoinfo.annodata.length).toBe(8)
      expect(data.annoinfo.annodata[0].title).toBe('Annotation 1')
    })
    test('test storyboard with settings', async ()  => {
      const wrapper =  shallowMount(storyboard,{
        propsData: {
          annotationurl: 'techocr.json',
          styling: 'transcription:true;'
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
      expect(data.anno_elem).toEqual(null)
      expect(shared.createContent(data.annotations[0], null, data.settings, true).replace(/(\r\n|\n|\r)/gm, " ")).toEqual("")
      expect(shared.createContent(data.annotations[1], null, data.settings, true).replace(/(\r\n|\n|\r)/gm, " ")).toEqual("")
    })
})
