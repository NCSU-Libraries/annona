import Vue from 'vue'
//import index from 'karma-chai'
import { mount } from '@vue/test-utils';
import { shallowMount } from '@vue/test-utils';

import storyboard from '../src/components/storyboard.vue';

import flushPromises from 'flush-promises';
let consoleSpy;
describe('Component', () => {
    test('test storyboard', async ()  => {
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
      expect(data.zoomsections).toEqual([{"section": "740,567,3998,4586", "type": "rectangle"}, {"section": "4206,2376,1970,2379", "type": "rectangle"}, {"section": "5943,222,2771,4521", "type": "rectangle"}])
      expect(data.position).toEqual(-1)
      expect(data.seadragonid).toBe('mc00240')
      expect(data.annotations[1]['tags'].length).toEqual(2)
      expect(data.annotations[1]['tags']).toContain('railing')
      expect(data.annotations.length).toEqual(3)
      expect(data.annotations[0]['content']).toContain('<p>Bank and Office Building for Wachovia Bank and Trust Co.</p>')
      expect(data.currentanno).toEqual('')
      expect(data.anno_elem).toEqual(null)
    })
})
