import Vue from 'vue'
//import index from 'karma-chai'
import { mount } from '@vue/test-utils';
import { shallowMount } from '@vue/test-utils';

import multistoryboard from '../src/components/multistoryboard.vue';
import shared from '../src/components/shared.js'

import flushPromises from 'flush-promises';
let consoleSpy;

describe('Component', () => {
    test('test multistoryboard with mirador and page list', async ()  => {
      const wrapper =  shallowMount(multistoryboard,{
        propsData: {
          annotationlists: 'mc00240.json;page.json'
        }
      })
      const saveMock = jest.fn()
      wrapper.vm.createViewer = saveMock;
      await wrapper.vm.$nextTick()
      await flushPromises()
      var data = wrapper.vm.$data
      expect(data.anno_data).toEqual(["mc00240.json", "page.json"])
      expect(wrapper.vm.$children.length).toEqual(2)
      expect(data.stylingstring).toEqual("autorun_interval:3;")
      expect(data.widthvar).toEqual("50%")
      expect(data.multi).toBe(true)
    })
})
