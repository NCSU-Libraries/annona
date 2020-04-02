import Vue from 'vue'
//import index from 'karma-chai'
import { mount } from '@vue/test-utils'

import searchapi from '../src/components/searchapi.vue'

import flushPromises from 'flush-promises'

describe('Component', () => {
    test('test open annotation', async ()  => {
      const wrapper =  mount(searchapi,{
        propsData: {
          manifesturl: 'https://d.lib.ncsu.edu/collections/catalog/technician-basketballspecial-1991-11/manifest'
        }
      })
      await wrapper.vm.$nextTick()
      await flushPromises()
      expect(wrapper.vm.$data.stylingstring).toBe('table_view:true;')
      expect(wrapper.vm.$data.renderurl).toBe('')
      expect(wrapper.vm.$data.fielddata).toEqual([{'name': 'Query', 'key': 'q'}])

      expect(wrapper.vm.$data.apiurl).toBe("https://ocr.lib.ncsu.edu/search/technician-basketballspecial-1991-11")
      wrapper.vm.$data.fielddata[0].param = 'test'
      wrapper.vm.search()
      expect(wrapper.vm.$data.fielddata).toEqual([{'name': 'Query', 'key': 'q', 'param': 'test'}])
      expect(wrapper.vm.$data.renderurl).toBe('https://ocr.lib.ncsu.edu/search/technician-basketballspecial-1991-11?q=test')
    })
})
