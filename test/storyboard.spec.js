import Vue from 'vue'
//import index from 'karma-chai'
import { mount } from '@vue/test-utils';
import { shallowMount } from '@vue/test-utils';

import storyboard from '../src/components/storyboard.vue';

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
      expect(data.zoomsections).toEqual([{"section": ["740,567,3998,4586", "2735,589,14,14"], "type": "rectangle"}, {"section": ["4206,2376,1970,2379"], "type": "rectangle"}, {"section": ["5943,222,2771,4521"], "type": "rectangle"}])
      expect(data.position).toEqual(-1)
      expect(data.seadragonid).toBe('mc00240')
      expect(data.annotations[1]['tags'].length).toEqual(2)
      expect(data.annotations[1]['tags']).toContain('railing')
      expect(data.annotations.length).toEqual(3)
      expect(data.annotations[0]['content']).toContain('<p>Bank and Office Building for Wachovia Bank and Trust Co.</p>')
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
      expect(data.zoomsections).toEqual([{"section": ["740,567,3998,4586", "2735,589,14,14"], "type": "rectangle"}, {"section": ["4206,2376,1970,2379"], "type": "rectangle"}, {"section": ["5943,222,2771,4521"], "type": "rectangle"}])
      expect(data.position).toEqual(-1)
      expect(data.seadragonid).toBe('mc00240')
      expect(data.annotations[1]['tags'].length).toEqual(2)
      expect(data.annotations[1]['tags']).toContain('railing')
      expect(data.annotations.length).toEqual(3)
      expect(data.annotations[0]['content']).toContain('<p>Bank and Office Building for Wachovia Bank and Trust Co.</p>')
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
      expect(data.zoomsections).toEqual([{"section": ["1800,2000,500,500"], "type": "rect"}])
      expect(data.position).toEqual(-1)
      expect(data.seadragonid).toBe('page')
      expect(data.annotations[0]['tags'].length).toEqual(0)
      expect(data.annotations.length).toEqual(1)
      expect(data.annotations[0]['content']).toContain("<div class=\"textualbody\"><iiif-annotation annotationurl='https://dnoneill.github.io/annotate/annotations/0001-1.json'></iiif-annotation></div>")
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
      expect(data.zoomsections).toEqual([{"section": ["310,1250,1850,1180"], "type": "rect"}])
      expect(data.seadragonid).toBe('paragraph')
      expect(data.annotations[0]['tags'].length).toEqual(0)
      expect(data.annotations.length).toEqual(1)
      expect(data.annotations[0]['content']).toContain('Jim Watson and I have probably made a')
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
      expect(data.zoomsections).toEqual([{"section": ["318,499,2891,3339"], "type": "rect"}])
      expect(data.seadragonid).toBe('bees')
      expect(data.annotations[0]['tags'].length).toEqual(1)
      expect(data.annotations.length).toEqual(1)
      expect(data.annotations[0]['content']).toEqual('')
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
      expect(data.zoomsections).toEqual([{"section": ["310,1250,1850,1180"], "type": "rect"}])
      expect(data.seadragonid).toBe('paragraph')
      expect(data.annotations[0]['tags'].length).toEqual(0)
      expect(data.annotations.length).toEqual(1)
      expect(data.annotations[0]['content']).toContain('Jim Watson and I have probably made a')
      expect(data.currentanno).toEqual('')
      expect(data.anno_elem).toEqual(null)
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
      expect(data.zoomsections).toEqual([{"section": ["6925,7907,415,156"], "type": "pin"}, {"section": ["7068,8160,382,245"], "type": "pin"}, {"section": ["6609,5718,766,721"], "type": "pin"}, {"section": ["21613,7537,565,381"], "type": "pin"}, {"section": ["23006,8428,690,819"], "type": "pin"}, {"section": ["3444,5811,579,403"], "type": "pin"}, {"section": ["11986,9036,2233,889"], "type": "pin"}, {"section": ["6373,7880,221,223"], "type": "pin"}])
      expect(data.seadragonid).toBe('4058a628-c593-463e-9736-8a821e178fee')
      expect(data.annotations[0]['tags'].length).toEqual(1)
      expect(data.annotations.length).toEqual(8)
      expect(data.annotations[0]['content']).toEqual('<div class=\"textualbody\">Campo San Maurizio</div>')
      expect(data.currentanno).toEqual('')
      expect(data.anno_elem).toEqual(null)
    })
})
