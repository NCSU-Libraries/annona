import Vue from 'vue'
//import index from 'karma-chai'
import { mount } from '@vue/test-utils'

import iiifAnnotation from '../src/components/iiifannotation.vue'

import flushPromises from 'flush-promises'

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
    test('test open annotation', async ()  => {
      const wrapper =  mount(iiifAnnotation,{
        propsData: {
          annotationurl: 'paragraph.json'
        },
        attachTo: '#root'
      })
      await wrapper.vm.$nextTick()
      await flushPromises()
      const annotation = wrapper.vm.$data.annotation_items[0]
      expect(wrapper.vm.$data.annotation_items).toHaveLength(1)
      expect(wrapper.vm.$data.manifest.label).toBe("Letter from Francis Crick to Michael Crick")
      expect(annotation.label).toBe(undefined)
      expect(annotation.image).toEqual(['<img src=\"https://dlcs.io/iiif-img/wellcome/1/ce30a1a7-a606-4b5e-b2ad-c13677d3e8f6/310,1250,1850,1180/!1024,/0/default.jpg\" alt=\"Jim Watson and I have probably made a most important discovery. We have built a model for the structure of des-oxy-ribose-nucleic-acid (read it carefully) called D.N.A. for short. You may remember that the genes of the chromosomes - which carry the hereditary factors - are made up of protein and D.N.A.\">'])
      expect(annotation['content']['ocr']).toEqual(["Jim Watson and I have probably made a\nmost important discovery. We have built a model for\nthe structure of des-oxy-ribose-nucleic-acid (read it\ncarefully) called D.N.A. for short. You may remember\nthat the genes of the chromosomes - which carry the\nhereditary factors - are made up of protein and\nD.N.A."])
      expect(wrapper.vm.$data.rendered).toEqual(true);
      wrapper.destroy()
    })
    test('test search api', async ()  => {
      const wrapper =  mount(iiifAnnotation,{
        propsData: {
          annotationurl: 'https://ocr.lib.ncsu.edu/search/technician-basketballspecial-1991-11?q=test',
          manifesturl: 'https://d.lib.ncsu.edu/collections/catalog/technician-basketballspecial-1991-11/manifest'
        },
        attachTo: '#root'
      })
      await wrapper.vm.$nextTick()
      await flushPromises()
      const annotation = wrapper.vm.$data.annotation_items[0]
      expect(wrapper.vm.$data.annotation_items).toHaveLength(4)
      expect(wrapper.vm.$data.manifest.label).toBe("Technician Basketball Special, November 1991")
      expect(annotation.label).toBe(undefined)
      expect(annotation.image).toEqual(["<img src=\"https://iiif.lib.ncsu.edu/iiif/technician-basketballspecial-1991-11_0011/883,3544,92,31/1170,/0/default.jpg\" alt=\"test\">"])
      expect(annotation['content']['ocr']).toEqual(["test"])
      expect(wrapper.vm.$data.rendered).toEqual(true);
      wrapper.destroy()
    })
    test('test mirador annotation list', async ()  => {
      const wrapper =  mount(iiifAnnotation,{
        propsData: {
          annotationurl: 'mc00240.json'
        },
        attachTo: '#root'
      })
      await wrapper.vm.$nextTick()
      await flushPromises()
      const annotations = wrapper.vm.$data.annotation_items
      expect(annotations[1]['rendered_content']).toBe("<span style=\"direction: ltr;\"><div class=\"dctypes:text\"><p>DETAILS OF BALCONY RAILING</p></div></span>")
      expect(annotations[0].label).toBe(undefined)
      expect(annotations[0].tags).toBe('')
      expect(annotations[0].image[0].replace(/(\r\n|\n|\r)/gm, "")).toEqual("<svg viewBox=\"740 566 3997 4586\" aria-label=\"Image section of &quot;Cross section, interior details&quot;\"><defs><pattern patternUnits=\"objectBoundingBox\" id=\"mc002400-0\" width=\"100%\" height=\"100%\">      <image xlink:href=\"https://iiif.lib.ncsu.edu/iiif/mc00240-001-ff0093-001-001_0010/740,566,3997,4586/1170,/0/default.jpg\" width=\"100%\" height=\"100%\" x=\"0\" y=\"0\"></image>      </pattern></defs><path xmlns=\"http://www.w3.org/2000/svg\" d=\"M740.00502,566.97616l1998.77039,0l0,0l1998.77039,0l0,2293.02384l0,2293.02384l-1998.77039,0l-1998.77039,0l0,-2293.02384z\" data-paper-data=\"{&quot;defaultStrokeValue&quot;:1,&quot;editStrokeValue&quot;:5,&quot;currentStrokeValue&quot;:5,&quot;rotation&quot;:0,&quot;annotation&quot;:null,&quot;editable&quot;:true}\" id=\"rectangle_dcc88375-b2ff-4b41-b061-6d9b5f6b81fc\" fill-opacity=\"1\" fill=\"url(#mc002400-0)\" fill-rule=\"nonzero\" stroke=\"none\" stroke-width=\"17.94228\" stroke-linecap=\"butt\" stroke-linejoin=\"miter\" stroke-miterlimit=\"10\" stroke-dasharray=\"\" stroke-dashoffset=\"0\" font-family=\"none\" font-weight=\"none\" font-size=\"none\" text-anchor=\"none\" style=\"mix-blend-mode: normal\"></path></svg>")
      expect(wrapper.vm.$data.manifest.label).toBe("Cross section, interior details")
      expect(annotations[0].altText).toBe('Image section of "Cross section, interior details"')
      expect(annotations[1].tags[0].label).toEqual("balcony")
      expect(annotations[1].tags.length).toEqual(2)
      expect(annotations.length).toBe(3)
      expect(wrapper.vm.$data.rendered).toEqual(true);
      wrapper.destroy()
    })
    test('test w3 annotations', async ()  => {
      const wrapper =  mount(iiifAnnotation,{
        propsData: {
          annotationurl: 'bees.json',
          styling: 'tagscolor: {"So many bees.":"white"}'
        },
        attachTo: '#root'
      })
      await wrapper.vm.$nextTick()
      await flushPromises()
      const annotations = wrapper.vm.$data.annotation_items[0]
      expect(annotations.image).toEqual(["<img src=\"https://iiif.lib.ncsu.edu/iiif/segIns_023/318,499,2891,3339/1170,/0/default.jpg\" alt=\"The Bees\">"])
      expect(annotations['content']['label']).toBe("The Bees")
      expect(annotations['content']['ocr']).toEqual([])
      expect(annotations.fullImage).toBe("https://iiif.lib.ncsu.edu/iiif/segIns_023/full/1170,/0/default.jpg")
      expect(annotations['rendered_content']).toBe('<span style=\"direction: ltr;\"><div class=\"title\">The Bees</div></span>')
      expect(annotations.tags).toEqual([{"checked": "", "color": "white", "count": 1, "group": "", "key": "somanybees", "label": "So many bees."}])
      expect(annotations.altText).toBe("The Bees")
      expect(wrapper.vm.$data.rendered).toEqual(true);
      wrapper.destroy()
    })
    test('test w3 annotations list', async ()  => {
      const wrapper =  mount(iiifAnnotation,{
        propsData: {
          annotationurl: 'page.json'
        },
        attachTo: '#root'
      })
      await wrapper.vm.$nextTick()
      await flushPromises()
      const annotations = wrapper.vm.$data.annotation_items[0]
      expect(annotations.image).toEqual(["<img src=\"https://iiif.lib.ncsu.edu/iiif/mc00084-001-te0159-000-001_0001/1800,2000,500,500/full/0/default.jpg\" alt=\"Image section of &quot;undefined&quot;\">"])
      expect(annotations.id).toBe('page0')
      expect(annotations.label).toBe(undefined)
      expect(annotations['content']['ocr']).toEqual([])
      expect(annotations['rendered_content']).toEqual(`<span style="direction: ltr;"><div class="describing"><iiif-annotation annotationurl='https://dnoneill.github.io/annotate/annotations/0001-1.json'></iiif-annotation></div></span>`)
      expect(wrapper.vm.$data.rendered).toEqual(true);
      wrapper.destroy()
    })
    test('test oa list', async ()  => {
      const wrapper =  mount(iiifAnnotation,{
        propsData: {
          annotationurl: 'oa.json'
        },
        attachTo: '#root'
      })
      await wrapper.vm.$nextTick()
      await flushPromises()
      const annotations = wrapper.vm.$data.annotation_items[0]
      expect(annotations.image).toEqual(["<img src=\"https://iiif.lib.ncsu.edu/iiif/segIns_023/6270,3903,2250,2250/full/0/default.jpg\" alt=\"Annotation 1\">"])
      expect(annotations['content']['ocr']).toEqual(["Annotation 1"])
      expect(wrapper.vm.$data.rendered).toEqual(true);
      wrapper.destroy()
    })
    test('test settings', async ()  => {
      const wrapper =  mount(iiifAnnotation,{
        propsData: {
          annotationurl: 'oa.json',
          styling: 'image_only:true; width: 200',
        },
        attachTo: '#root'
      })
      await wrapper.vm.$nextTick()
      await flushPromises()
      const annotations = wrapper.vm.$data.annotation_items[0];
      expect(annotations.image).toEqual(["<img src=\"https://iiif.lib.ncsu.edu/iiif/segIns_023/6270,3903,2250,2250/200,/0/default.jpg\" alt=\"Image section of &quot;undefined&quot;\" style=\"width: 200px;\">"])
      expect(Object.keys(annotations).length).toBe(5)
      expect(annotations.fullImage).toEqual("https://iiif.lib.ncsu.edu/iiif/segIns_023/full/200,/0/default.jpg")
      expect(Object.keys(annotations)).toEqual(["image", "altText", "id", "content","fullImage"])
      expect(wrapper.vm.$data.rendered).toEqual(true);
      wrapper.destroy()
    })
    test('test settings height', async ()  => {
      const wrapper =  mount(iiifAnnotation,{
        propsData: {
          annotationurl: 'oa.json',
          styling: 'height: 200',
        },
        attachTo: '#root'
      })
      await wrapper.vm.$nextTick()
      await flushPromises()
      const annotations = wrapper.vm.$data.annotation_items[0]
      expect(annotations.image).toEqual(["<img src=\"https://iiif.lib.ncsu.edu/iiif/segIns_023/6270,3903,2250,2250/,200/0/default.jpg\" alt=\"Annotation 1\" style=\"height: 200px; width: auto;\">"])
      expect(Object.keys(annotations).length).toBe(9)
      expect(annotations.fullImage).toEqual("https://iiif.lib.ncsu.edu/iiif/segIns_023/full/,200/0/default.jpg")
      expect(wrapper.vm.$data.rendered).toEqual(true);
      wrapper.destroy()
    })
    test('test non-existent urls', async ()  => {
      const wrapper =  mount(iiifAnnotation,{
        propsData: {
          annotationurl: 'bees2.json'
        },
        attachTo: '#root'
      })
      await wrapper.vm.$nextTick()
      await flushPromises()
      expect(wrapper.vm.$data.rendered).toEqual(false);
      expect(wrapper.html()).toContain('"bees2.json" did not render. Please ensure your annotation link is correct.')
    })

    test('test with regular image', async ()  => {
      const wrapper =  mount(iiifAnnotation,{
        propsData: {
          annotationurl: 'regular.json'
        },
        attachTo: '#root'
      })
      await wrapper.vm.$nextTick()
      await flushPromises()
      const annotations = wrapper.vm.$data.annotation_items[0];
      expect(annotations.image).toEqual(["<canvas id=\"regular0_canvas_img0\"></canvas>"])
      expect(Object.keys(annotations).length).toBe(9)
      expect(annotations.fullImage).toEqual("/annotate/assets/images/custom/spencer-davis-7ZpvOE2psxM-unsplash.jpg")
      expect(wrapper.vm.$data.rendered).toEqual(true);
    })

})
