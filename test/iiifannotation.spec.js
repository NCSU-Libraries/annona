import Vue from 'vue'
//import index from 'karma-chai'
import { mount } from '@vue/test-utils'

import iiifAnnotation from '../src/components/iiifannotation.vue'

import flushPromises from 'flush-promises'

describe('Component', () => {
    test('test open annotation', async ()  => {
      const wrapper =  mount(iiifAnnotation,{
        propsData: {
          annotationurl: 'paragraph.json'
        }
      })
      await wrapper.vm.$nextTick()
      await flushPromises()
      const annotation = wrapper.vm.$data.annotation_items[0]
      expect(wrapper.vm.$data.annotation_items).toHaveLength(1)
      expect(wrapper.vm.$data.manifest.label).toBe("Letter from Francis Crick to Michael Crick")
      expect(annotation.label).toBe(undefined)
      expect(annotation.image).toEqual(["https://dlcs.io/iiif-img/wellcome/1/ce30a1a7-a606-4b5e-b2ad-c13677d3e8f6/310,1250,1850,1180/1200,/0/default.jpg"])
      expect(annotation.ocr).toBe("Jim Watson and I have probably made a\nmost important discovery. We have built a model for\nthe structure of des-oxy-ribose-nucleic-acid (read it\ncarefully) called D.N.A. for short. You may remember\nthat the genes of the chromosomes - which carry the\nhereditary factors - are made up of protein and\nD.N.A.")
    })
    test('test mirador annotation list', async ()  => {
      const wrapper =  mount(iiifAnnotation,{
        propsData: {
          annotationlist: 'mc00240.json'
        }
      })
      await wrapper.vm.$nextTick()
      await flushPromises()
      const annotations = wrapper.vm.$data.annotation_items
      expect(annotations[1].chars).toBe('<div class="dctypes:text"><p>DETAILS OF BALCONY RAILING</p></div>')
      expect(annotations[0].label).toBe(undefined)
      expect(annotations[0].tags).toBe('')
      expect(wrapper.vm.$data.manifest.label).toBe("Cross section, interior details")
      expect(annotations[0].altText).toBe('Image section of "Cross section, interior details"')
      expect(annotations[1].tags).toBe('<div class="tagging">balcony</div><div class="tagging">railing</div>')
      expect(annotations.length).toBe(3)
    })
    test('test w3 annotations', async ()  => {
      const wrapper =  mount(iiifAnnotation,{
        propsData: {
          annotationurl: 'bees.json'
        }
      })
      await wrapper.vm.$nextTick()
      await flushPromises()
      const annotations = wrapper.vm.$data.annotation_items[0]
      expect(annotations.image).toEqual(["https://iiif.lib.ncsu.edu/iiif/segIns_023/318,499,2891,3339/1200,/0/default.jpg"])
      expect(annotations.label).toBe("The Bees")
      expect(annotations.ocr).toBe("")
      expect(annotations.fullImage).toBe("https://iiif.lib.ncsu.edu/iiif/segIns_023/full/1200,/0/default.jpg")
      expect(annotations.chars).toBe("")
      expect(annotations.tags).toBe('<div class="tagging">So many bees.</div>')
      expect(annotations.dataset.dataset_format).toBe("")
      expect(annotations.dataset.dataset_url).toBe("")
      expect(annotations.altText).toBe("The Bees")
    })
    test('test w3 annotations list', async ()  => {
      const wrapper =  mount(iiifAnnotation,{
        propsData: {
          annotationlist: 'page.json'
        }
      })
      await wrapper.vm.$nextTick()
      await flushPromises()
      const annotations = wrapper.vm.$data.annotation_items[0]
      expect(annotations.image).toEqual(["https://iiif.lib.ncsu.edu/iiif/mc00084-001-te0159-000-001_0001/1800,2000,500,500/1200,/0/default.jpg"])
      expect(annotations.id).toBe('page0')
      expect(annotations.label).toBe(undefined)
      expect(annotations.ocr).toBe("")
      expect(annotations.chars).toEqual(`<div class="textualbody"><iiif-annotation annotationurl='https://dnoneill.github.io/annotate/annotations/0001-1.json'></iiif-annotation></div>`)
    })
    test('test oa list', async ()  => {
      const wrapper =  mount(iiifAnnotation,{
        propsData: {
          annotationlist: 'oa.json',
          manifesturl: 'annopagemanifest.json'
        }
      })
      await wrapper.vm.$nextTick()
      await flushPromises()
      const annotations = wrapper.vm.$data.annotation_items[0]
      expect(annotations.image).toEqual([ 'https://iiif.lib.ncsu.edu/iiif/segIns_023/318,499,2891,3339/1200,/0/default.jpg/6270,3903,2250,2250/1200,/0/default.jpg' ])
      expect(annotations.ocr).toEqual("Annotation 1")
    })
    test('test non-existent urls', async ()  => {
      const wrapper =  mount(iiifAnnotation,{
        propsData: {
          annotationurl: 'bees2.json'
        }
      })
      expect(wrapper.html()).toContain('"bees2.json" did not render. Please ensure your annotation link is correct.')
    })
})
