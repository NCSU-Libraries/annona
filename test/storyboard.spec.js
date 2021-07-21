import { mount } from '@vue/test-utils';
import { shallowMount } from '@vue/test-utils';

import storyboard from '../src/components/storyboard.vue';
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
    const div = document.createElement('div');
    div.id = 'root'
    document.body.appendChild(div)
  })
    test('test storyboard with mirador list', async ()  => {
      const wrapper =  mount(storyboard,{
        propsData: {
          annotationurl: 'mc00240.json',
          styling: 'tagscolor: {"balcony":"white", "railing": "green", "partition": "red"}'
        },
        attachTo: document.getElementById('root')
      })
      await wrapper.vm.$nextTick()
      await flushPromises()
      var data = wrapper.vm.$data;
      expect(data.seadragontile).toBe("https://iiif.lib.ncsu.edu/iiif/mc00240-001-ff0093-001-001_0010/info.json")
      expect(data.annotations.length).toEqual(3)
      expect(data.annotations[0]['section']).toEqual(["740,566,3997,4586", "740,566,3997,4586"])
      expect(data.annotations[0]['type']).toEqual("rectangle")
      expect(data.annotations[0]['svg_path'][0].outerHTML).toEqual("<path xmlns=\"http://www.w3.org/2000/svg\" d=\"M740.00502,566.97616l1998.77039,0l0,0l1998.77039,0l0,2293.02384l0,2293.02384l-1998.77039,0l-1998.77039,0l0,-2293.02384z\" data-paper-data=\"{&quot;defaultStrokeValue&quot;:1,&quot;editStrokeValue&quot;:5,&quot;currentStrokeValue&quot;:5,&quot;rotation&quot;:0,&quot;annotation&quot;:null,&quot;editable&quot;:true}\" id=\"rectangle_dcc88375-b2ff-4b41-b061-6d9b5f6b81fc\" fill-opacity=\"0.00001\" fill=\"#00bfff\" fill-rule=\"nonzero\" stroke=\"#00bfff\" stroke-width=\"17.94228\" stroke-linecap=\"butt\" stroke-linejoin=\"miter\" stroke-miterlimit=\"10\" stroke-dasharray=\"\" stroke-dashoffset=\"0\" font-family=\"none\" font-weight=\"none\" font-size=\"none\" text-anchor=\"none\" style=\"mix-blend-mode: normal\"></path>")
      expect(data.annotations[0]['svg_path'].length).toEqual(2)
      expect(data.position).toEqual(-1)
      expect(data.seadragonid).toBe('storyboard_mc00240')
      expect(data.annotations[1]['tags'].length).toEqual(2)
      expect(data.annotations[1]['tags'][1]['value']).toBe('railing')
      expect(data.annotations.length).toEqual(3)
      expect(data.annotations[0]['textual_body'][0]).toContain('<p>Bank and Office Building for Wachovia Bank and Trust Co.</p>')
      expect(data.currentanno).toEqual('')
      expect(data.tagslist).toEqual({"balcony": {"checked": false, "color": "white", "count": 1, "group": "",  "key": "balcony", "label": "balcony"}, "partition": {"checked": false, "color": "red", "count": 1, "group": "",  "key": "partition", "label": "partition"}, "railing": {"checked": false, "color": "green", "count": 1, "group": "",  "key": "railing", "label": "railing"}})
      const tagsButton = wrapper.find('#tagsButton')
      tagsButton.trigger('click')
      expect(data.shown).toBe('tags')
      await wrapper.vm.$nextTick()
      expect(document.getElementsByClassName('content')[0].innerHTML.replace(/[\r\n]/gm, " ").replace(/[  ]{2,}/gm, " ")).toEqual("<div class=\"tagslist\"><!----> <div id=\"balcony_tags\" class=\"tags\"><input type=\"checkbox\" class=\"tagscheck\"> <div class=\"countkey\"> balcony <span class=\"tagscount\" style=\"background: white;\"><span> 1 </span></span></div></div><div id=\"partition_tags\" class=\"tags\"><input type=\"checkbox\" class=\"tagscheck\"> <div class=\"countkey\"> partition <span class=\"tagscount\" style=\"background: red;\"><span> 1 </span></span></div></div><div id=\"railing_tags\" class=\"tags\"><input type=\"checkbox\" class=\"tagscheck\"> <div class=\"countkey\"> railing <span class=\"tagscount\" style=\"background: green;\"><span> 1 </span></span></div></div></div>")
      const infoButton = wrapper.find('#infoButton')
      infoButton.trigger('click')
      await wrapper.vm.$nextTick()
      expect(data.shown).toBe('info')
      wrapper.find('.annoinfolink').trigger('click')
      await wrapper.vm.$nextTick()
      wrapper.find('.imageinfolink').trigger('click')
      await wrapper.vm.$nextTick()
      expect(document.getElementsByClassName('content')[0].innerHTML.replace(/[\r\n]/gm, " ").replace(/[  ]{2,}/gm, " ")).toEqual("<div class=\"imagetitle\"><h1>Cross section, interior details</h1></div> <span><!----> <!----> <!----> <!----> <button class=\"infolink buttonlink annoinfolink\">Annotation information</button> <div class=\"annoinfo\"><span><div class=\"listinfo\"><b>Annotation Url: </b><a href=\"mc00240.json\" target=\"_blank\">mc00240.json</a><br> <b>Number of Annotations:</b> 3</div></span> <div class=\"annotationslist\"><div id=\"data_0\"><div class=\"title\"><button class=\"buttonlink\">Annotation 1</button></div> <div class=\"additionaltext\"> Bank and Office Building for...<br> </div></div><div id=\"data_1\"><div class=\"title\"><button class=\"buttonlink\">Annotation 2</button></div> <div class=\"additionaltext\"> DETAILS OF BALCONY RAILING<br> <b>Tags:</b> balcony, railing<br></div></div><div id=\"data_2\"><div class=\"title\"><button class=\"buttonlink\">Annotation 3</button></div> <div class=\"additionaltext\"> DETAILS OF PARTITION BETWEEN BANK...<br> <b>Tags:</b> partition<br></div></div></div></div> <button class=\"infolink buttonlink imageinfolink\">Image information</button> <div class=\"imageinfo\"><div id=\"Manifest\"><b>Manifest: </b><a href=\"https://d.lib.ncsu.edu/collections/catalog/mc00240-001-ff0093-001-001_0010/manifest.json\" target=\"_blank\">https://d.lib.ncsu.edu/collections/catalog/mc00240-001-ff0093-001-001_0010/manifest.json</a></div><div id=\"title\"><b>Title: </b>Cross section, interior details</div><div id=\"attribution\"><b>Attribution: </b>Northup &amp; O'Brien Architectural Records, 1917-1980 (MC00240), Special Collections Research Center at NCSU Libraries</div><div id=\"license\"><b>License: </b>https://d.lib.ncsu.edu/collections/about#rights_and_use</div><div id=\"title\"><b>Title: </b>Cross section, interior details</div><div id=\"Creator\"><b>Creator: </b><span><a href=\"https://d.lib.ncsu.edu/collections/catalog?f%5Bnames_facet%5D%5B%5D=O%27Brien%2C+Leet+Alexander%2C+1891-1963\">O'Brien, Leet Alexander, 1891-1963</a> (Architect)</span></div><div id=\"Created Date\"><b>Created Date: </b>1924-06-201924-10-16</div><div id=\"URL\"><b>URL: </b><span><a href=\"https://d.lib.ncsu.edu/collections/catalog/mc00240-001-ff0093-001-001_0010\">https://d.lib.ncsu.edu/collections/catalog/mc00240-001-ff0093-001-001_0010</a></span></div><div id=\"\"><span><a href=\"https://d.lib.ncsu.edu/collections/catalog/mc00240-001-ff0093-001-001_0010?manifest=https%3A%2F%2Fd.lib.ncsu.edu%2Fcollections%2Fcatalog%2Fmc00240-001-ff0093-001-001_0010%2Fmanifest.json\" title=\"IIIF drag &amp; drop\">IIIF drag &amp; drop</a> (<a href=\"https://d.lib.ncsu.edu/collections/about-iiif\">About IIIF</a>)</span></div><div id=\"imageurl\"><b>Image URL: </b><a href=\"https://iiif.lib.ncsu.edu/iiif/mc00240-001-ff0093-001-001_0010/info.json\" target=\"_blank\">https://iiif.lib.ncsu.edu/iiif/mc00240-001-ff0093-001-001_0010/info.json</a></div></div></span>")
      wrapper.find('.annoinfolink').trigger('click')
      await wrapper.vm.$nextTick()
      wrapper.find('.imageinfolink').trigger('click')
      await wrapper.vm.$nextTick()
      expect(document.getElementsByClassName('content')[0].innerHTML.replace(/[\r\n]/gm, " ").replace(/[  ]{2,}/gm, " ")).toEqual("<div class=\"imagetitle\"><h1>Cross section, interior details</h1></div> <span><!----> <!----> <!----> <!----> <button class=\"infolink buttonlink annoinfolink\">Annotation information</button> <!----> <button class=\"infolink buttonlink imageinfolink\">Image information</button> <!----></span>")
      wrapper.destroy()
    })
    test('test storyboard with openannotation list', async ()  => {
      const wrapper =  shallowMount(storyboard,{
        propsData: {
          annotationurl: 'mc00240.json'
        },
        attachTo: document.getElementById('root')
      })
      const saveMock = jest.fn()
      wrapper.vm.createViewer = saveMock;
      await wrapper.vm.$nextTick()
      await flushPromises()
      var data = wrapper.vm.$data
      expect(data.seadragontile).toBe("https://iiif.lib.ncsu.edu/iiif/mc00240-001-ff0093-001-001_0010/info.json")
      expect(data.annotations[1]['section']).toEqual(["740,566,3997,4586"])
      expect(data.annotations[1]['type']).toEqual("rectangle")
      expect(data.annotations[1]['svg_path'][0].outerHTML).toEqual("<path xmlns=\"http://www.w3.org/2000/svg\" d=\"M4206.4542,2375.55834l985.03137,0l0,0l985.03137,0l0,1189.5734l0,1189.5734l-985.03137,0l-985.03137,0l0,-1189.5734z\" data-paper-data=\"{&quot;defaultStrokeValue&quot;:1,&quot;editStrokeValue&quot;:5,&quot;currentStrokeValue&quot;:1,&quot;rotation&quot;:0,&quot;deleteIcon&quot;:null,&quot;rotationIcon&quot;:null,&quot;group&quot;:null,&quot;editable&quot;:true,&quot;annotation&quot;:null}\" id=\"rectangle_97e17d4a-e919-467d-836b-17722e9fee6a\" fill-opacity=\"0\" fill=\"#00bfff\" fill-rule=\"nonzero\" stroke=\"#00bfff\" stroke-width=\"3.58846\" stroke-linecap=\"butt\" stroke-linejoin=\"miter\" stroke-miterlimit=\"10\" stroke-dasharray=\"\" stroke-dashoffset=\"0\" font-family=\"none\" font-weight=\"none\" font-size=\"none\" text-anchor=\"none\" style=\"mix-blend-mode: normal\"></path>")
      expect(data.annotations[1]['svg_path'].length).toEqual(1)
      expect(data.position).toEqual(-1)
      expect(data.seadragonid).toBe('storyboard_mc00240')
      expect(data.annotations[1]['tags'].length).toEqual(2)
      expect(data.annotations[1]['tags'][1]['value']).toBe('railing')
      expect(data.annotations.length).toEqual(3)
      expect(data.annotations[0]['textual_body'][0]).toContain('<p>Bank and Office Building for Wachovia Bank and Trust Co.</p>')
      expect(data.currentanno).toEqual('')
      wrapper.destroy()
    })
    test('test storyboard with w3 annotations page', async ()  => {
      const wrapper =  shallowMount(storyboard,{
        propsData: {
          annotationurl: 'page.json'
        },
        attachTo: document.getElementById('root')
      })
      const saveMock = jest.fn()
      wrapper.vm.createViewer = saveMock;
      await wrapper.vm.$nextTick()
      await flushPromises()
      var data = wrapper.vm.$data
      expect(data.seadragontile).toBe("https://iiif.lib.ncsu.edu/iiif/mc00084-001-te0159-000-001_0001/info.json")
      expect(data.annotations[0]['section']).toEqual(["1800,2000,500,500"])
      expect(data.annotations[0]['type']).toEqual("rect")
      expect(data.annotations[0]['svg_path']).toEqual([undefined])
      expect(data.position).toEqual(-1)
      expect(data.seadragonid).toBe('storyboard_page')
      expect(data.annotations[0]['tags'].length).toEqual(0)
      expect(data.annotations.length).toEqual(1)
      expect(data.annotations[0]['textual_body']).toContain("<div class=\"describing\"><iiif-annotation annotationurl='https://dnoneill.github.io/annotate/annotations/0001-1.json'></iiif-annotation></div>")
      expect(data.currentanno).toEqual('')
      wrapper.destroy()
    })
    test('test storyboard with single open annotation', async ()  => {
      const wrapper =  shallowMount(storyboard,{
        propsData: {
          annotationurl: 'paragraph.json'
        },
        attachTo: document.getElementById('root')
      })
      const saveMock = jest.fn()
      wrapper.vm.createViewer = saveMock;
      await wrapper.vm.$nextTick()
      await flushPromises()
      var data = wrapper.vm.$data
      expect(data.seadragontile).toBe("https://dlcs.io/iiif-img/wellcome/1/ce30a1a7-a606-4b5e-b2ad-c13677d3e8f6/info.json")
      expect(data.annotations[0]['section']).toEqual(["310,1250,1850,1180"])
      expect(data.seadragonid).toBe('storyboard_paragraph')
      expect(data.annotations[0]['tags'].length).toEqual(0)
      expect(data.annotations.length).toEqual(1)
      expect(data.annotations[0]['ocr'][0]).toContain('Jim Watson and I have probably made a')
      expect(data.currentanno).toEqual('')
      wrapper.destroy()
    })
    test('test storyboard with single w3 annotation', async ()  => {
      const wrapper =  shallowMount(storyboard,{
        propsData: {
          annotationurl: 'bees.json'
        },
        attachTo: document.getElementById('root')
      })
      const saveMock = jest.fn()
      wrapper.vm.createViewer = saveMock;
      await wrapper.vm.$nextTick()
      await flushPromises()
      var data = wrapper.vm.$data
      expect(data.seadragontile).toBe("https://iiif.lib.ncsu.edu/iiif/segIns_023/info.json")
      expect(data.annotations[0]['section']).toEqual(["318,499,2891,3339"])
      expect(data.seadragonid).toBe('storyboard_bees')
      expect(data.annotations[0]['tags'].length).toEqual(1)
      expect(data.annotations.length).toEqual(1)
      expect(data.annotations[0]['textual_body'].length).toEqual(0)
      expect(data.currentanno).toEqual('')
      wrapper.destroy()
    })
    test('test storyboard with single open annotation', async ()  => {
      const wrapper =  shallowMount(storyboard,{
        propsData: {
          annotationurl: 'paragraph.json'
        },
        attachTo: document.getElementById('root')
      })
      const saveMock = jest.fn()
      wrapper.vm.createViewer = saveMock;
      await wrapper.vm.$nextTick()
      await flushPromises()
      var data = wrapper.vm.$data
      expect(data.seadragontile).toBe("https://dlcs.io/iiif-img/wellcome/1/ce30a1a7-a606-4b5e-b2ad-c13677d3e8f6/info.json")
      expect(data.annotations[0]['section']).toEqual(["310,1250,1850,1180"])
      expect(data.seadragonid).toBe('storyboard_paragraph')
      expect(data.annotations[0]['tags'].length).toEqual(0)
      expect(data.annotations.length).toEqual(1)
      expect(data.annotations[0]['ocr'][0]).toContain('Jim Watson and I have probably made a')
      expect(data.currentanno).toEqual('')
      expect(shared.createContent(data.annotations[0], null)['anno'].replace(/[\r\n]/gm, " ").replace(/[  ]{2,}/gm, " ")).toEqual("<span style=\"direction: ltr;\"><div id=\"ocr\">Jim Watson and I have probably made a most important discovery. We have built a model for the structure of des-oxy-ribose-nucleic-acid (read it carefully) called D.N.A. for short. You may remember that the genes of the chromosomes - which carry the hereditary factors - are made up of protein and D.N.A.</div></span>")
      expect(shared.createContent(data.annotations[1], null)['anno'].replace(/[\r\n]/gm, " ").replace(/[  ]{2,}/gm, " ")).toEqual("")
      wrapper.destroy()
    })
    test('test storyboard with no manifest', async ()  => {
      const wrapper =  mount(storyboard,{
        propsData: {
          annotationurl: '4058a628-c593-463e-9736-8a821e178fee-list.json',
          styling: 'toggleoverlay: true;startenddisplay:keyboard;'
        },
        attachTo: document.getElementById('root')
      })
      const saveMock = jest.fn();
      wrapper.vm.createViewer = saveMock;
      await wrapper.vm.$nextTick();
      await flushPromises();
      var data = wrapper.vm.$data;
      expect(wrapper.find('.toolbarButton').html()).toEqual('<button id="autoRunButton" class="toolbarButton"><span><i class="fas fa-magic"></i></span> <span class="toolbartext">Start/Stop Autorun</span></button>')
      expect(Object.keys(data.tagslist).length).toEqual(6)
      //expect(data.tagslist.church.checked).toBe(true)
      expect(data.seadragontile).toBe("https://repository.duke.edu/iipsrv/iipsrv.fcgi?IIIF=/srv/perkins/repo_deriv/multires_image/40/58/a6/28/4058a628-c593-463e-9736-8a821e178fee/info.json")
      expect(data.annotations.length).toEqual(8)
      expect(data.annotations[1]['section']).toEqual(["7068,8160,382,245"])
      expect(data.annotations[1]['type']).toEqual("pin")
      expect(data.seadragonid).toBe('storyboard_4058a628-c593-463e-9736-8a821e178fee')
      expect(data.annotations[0]['tags'].length).toEqual(1)
      expect(data.annotations.length).toEqual(8)
      expect(data.annotations[0]['textual_body']).toEqual(['<div class=\"textualbody\">Campo San Maurizio</div>'])
      expect(data.currentanno).toEqual('')
      expect(shared.createContent(data.annotations[0], null)).toEqual({"anno": "<span style=\"direction: ltr;\"><div class=\"textualbody\">Campo San Maurizio</div><div class=\"tags\">Tags: campo</div></span>", "transcription": ""})
      expect(shared.createContent(data.annotations[1], null)).toEqual({"anno": "<span style=\"direction: ltr;\"><div class=\"textualbody\">Church of San Maurizio. Is now a Museum on music of Baroque Venice.</div><div class=\"tags\">Tags: church, deconsecrated</div></span>", "transcription": ""})
      expect(data.annoinfo.annodata.length).toBe(8)
      expect(data.annoinfo.annodata[0].title).toBe('Annotation 1')
      wrapper.destroy()
    })
    test('test storyboard with settings', async ()  => {
      const wrapper =  mount(storyboard,{
        propsData: {
          annotationurl: 'techocr.json',
          styling: 'transcription:true;startenddisplay:transcription;'
        },
        attachTo: document.getElementById('root')
      })
      const saveMock = jest.fn()
      wrapper.vm.createViewer = saveMock;
      await wrapper.vm.$nextTick()
      await flushPromises()
      var data = wrapper.vm.$data
      expect(data.seadragontile).toBe("https://d.lib.ncsu.edu/collections/canvas/technician-basketballspecial-1991-11_0001/info.json")
      expect(data.seadragonid).toBe('storyboard_techocr')
      expect(data.annotations[0]['tags'].length).toEqual(0)
      expect(data.annotations.length).toEqual(7)
      expect(data.annotations[2]['section']).toEqual(["864,684,2330,236"])
      expect(data.annotations[0]['ocr'][0]).toContain('Meet the Pack One Last Look')
      expect(data.currentanno).toEqual('')
      expect(wrapper.find('.content').html().replace(/[\r\n]/gm, " ").replace(/[  ]{2,}/gm, " ")).toEqual("<div id=\"transcription\" class=\"content\" style=\"\"><button class=\"buttonastext ocrlink\"> <div id=\"line0\" class=\"ocrtranscription\"><span style=\"direction: ltr;\"><div id=\"ocr\">Meet the Pack One Last Look</div></span></div> </button><button class=\"buttonastext ocrlink\"> <div id=\"line1\" class=\"ocrtranscription\"><span style=\"direction: ltr;\"><div id=\"ocr\">Player proﬁles of all members of the Remember the exciting ﬁnal year of men’s and women’s basketball teams the “Fire &amp; Ice” backoourt</div></span></div> </button><button class=\"buttonastext ocrlink\"> <div id=\"line2\" class=\"ocrtranscription\"><span style=\"direction: ltr;\"><div id=\"ocr\">HMPreview ’91-92</div></span></div> </button><button class=\"buttonastext ocrlink\"> <div id=\"line3\" class=\"ocrtranscription\"><span style=\"direction: ltr;\"><div id=\"ocr\">Technician’s Annual Basketball Edition</div></span></div> </button><button class=\"buttonastext ocrlink\"> <div id=\"line4\" class=\"ocrtranscription\"><span style=\"direction: ltr;\"><div id=\"ocr\">LEADER OF TH ACK</div></span></div> </button><button class=\"buttonastext ocrlink\"> <div id=\"line5\" class=\"ocrtranscription\"><span style=\"direction: ltr;\"><div id=\"ocr\">TOM GUGLIOTTA IS LOOKING FOR A STRONG PERFORMANCE IN HIS</div></span></div> </button><button class=\"buttonastext ocrlink\"> <div id=\"line6\" class=\"ocrtranscription\"><span style=\"direction: ltr;\"><div id=\"ocr\">SENIOR SEASON</div></span></div> </button></div>")
      var contentpos1 = shared.createContent(data.annotations[0], null);
      expect(contentpos1['anno']).not.toEqual(contentpos1['transcription'])
      expect(contentpos1['anno']).toEqual("<span style=\"direction: ltr;\"><div id=\"ocr\">Meet the Pack One Last Look</div></span>")
      expect(shared.createContent(data.annotations[1], null)['anno']).toEqual("<span style=\"direction: ltr;\"><div id=\"ocr\">Player proﬁles of all members of the Remember the exciting ﬁnal year of men’s and women’s basketball teams the “Fire & Ice” backoourt</div></span>")
      const shortcuts = shared.keyboardShortcuts('storyboard', wrapper.vm);
      expect(Object.keys(shortcuts).sort()).toEqual( ["autorun", "info", "overlay", "zoomin", "textoverlay", "zoomout", "home", "prev", "next", "fullscreen", "close", "hide", "shortcut"].sort())
      wrapper.destroy()
    })
    test('test storyboard with transcription', async ()  => {

      const wrapper =  mount(storyboard,{
        propsData: {
          annotationurl: 'recogito.json',
          styling: 'hide_infobutton: true;startenddisplay:info;'
        },
        attachTo: document.getElementById('root')
      })
      const saveMock = jest.fn()
      wrapper.vm.createViewer = saveMock;
      await wrapper.vm.$nextTick()
      await flushPromises()
      var data = wrapper.vm.$data
      data.booleanitems.annoinfoshown = true;
      expect(data.seadragontile).toBe("https://iiif.bodleian.ox.ac.uk/iiif/image/467a8da6-02b6-4643-a376-4b0afaff6ab7/info.json")
      expect(data.seadragonid).toBe('storyboard_recogito')
      expect(data.annotations[0]['tags'].length).toEqual(0)
      expect(data.annotations.length).toEqual(3)
      expect(data.annotations[2]['section']).toEqual(["1704,1509,319,123"])
      expect(data.annotations[0]['ocr'][0]).toContain('Lodinv<div class=\"authorship\">Written by: https://recogito.pelagios.org/rainer</div>')
      expect(data.currentanno).toEqual('')
      expect(wrapper.find('#information').html().replace(/[\r\n]/gm, " ").replace(/[  ]{2,}/gm, " ")).toEqual("<div id=\"information\" class=\"info content\" style=\"height: auto;\"> <div class=\"imagetitle\"> <h1></h1> </div> <span><!----> <!----> <!----> <!----> <button class=\"infolink buttonlink annoinfolink\">Annotation information</button> <!----> <button class=\"infolink buttonlink imageinfolink\">Image information</button> <!----></span> </div>")
      //wrapper.find('.annoinfolink').trigger('click')
      var contentpos1 = shared.createContent(data.annotations[0], null);
      expect(contentpos1['anno']).not.toEqual(contentpos1['transcription'])
      expect(contentpos1['anno']).toEqual("<span style=\"direction: ltr;\"><div class=\"identifying\">http://pleiades.stoa.org/places/79574<div class=\"authorship\">Written by: https://recogito.pelagios.org/rainer</div></div></span>")
      expect(shared.createContent(data.annotations[1], null)['anno']).toEqual("<span style=\"direction: ltr;\"><div id=\"ocr\">MARE HIBERNICVM<div class=\"authorship\">Written by: https://recogito.pelagios.org/rainer</div></div></span>")
      const shortcuts = shared.keyboardShortcuts('storyboard', wrapper.vm);
      expect(Object.keys(shortcuts).sort()).toEqual(['autorun', 'close', 'fullscreen', 'hide', 'home', 'next', 'overlay', 'prev', 'shortcut', 'transcription', 'textoverlay', 'zoomin', 'zoomout'].sort())
      wrapper.setData({'position': 2, 'currentanno': data.annotations[2], 'shown': 'anno'});
      await wrapper.vm.$nextTick()
      expect(wrapper.vm._computedWatchers.annoContent.value['anno']).toEqual("<span style=\"direction: ltr;\"><div class=\"commenting\">The British Isles<div class=\"authorship\">Written by: https://recogito.pelagios.org/rainer</div></div></span>")
      expect(wrapper.vm._computedWatchers.annoContent.value['transcription']).toEqual("<span style=\"direction: ltr;\"><div id=\"ocr\">BRITANIA INSVLA<div class=\"authorship\">Written by: https://recogito.pelagios.org/rainer</div></div></span>")
      expect(wrapper.find('.content').html().replace(/[\r\n]/gm, " ").replace(/[  ]{2,}/gm, " ")).toEqual("<div id=\"annotation_text\" class=\"content\" style=\"\"><span><span style=\"direction: ltr;\"><div class=\"commenting\">The British Isles<div class=\"authorship\">Written by: https://recogito.pelagios.org/rainer</div></div></span></span> <!----> </div>")
      wrapper.find('#transcription_button').trigger('click')
      await wrapper.vm.$nextTick()
      expect(data.shown).toEqual('transcription')
      expect(wrapper.find('.content').html().replace(/[\r\n]/gm, " ").replace(/[  ]{2,}/gm, " ")).toEqual("<div id=\"transcription\" class=\"content\"><span><span style=\"direction: ltr;\"><div id=\"ocr\">BRITANIA INSVLA<div class=\"authorship\">Written by: https://recogito.pelagios.org/rainer</div></div></span></span></div>")
      wrapper.find('#transcription_button').trigger('click')
      await wrapper.vm.$nextTick()
      expect(wrapper.find('.content').html().replace(/[\r\n]/gm, " ").replace(/[  ]{2,}/gm, " ")).toEqual("<div id=\"annotation_text\" class=\"content\" style=\"\"><span><span style=\"direction: ltr;\"><div class=\"commenting\">The British Isles<div class=\"authorship\">Written by: https://recogito.pelagios.org/rainer</div></div></span></span> <!----> </div>")
      expect(data.shown).toEqual('anno')
    })

    test('test storyboard with regular image', async ()  => {

      const wrapper =  mount(storyboard,{
        propsData: {
          annotationurl: 'regular.json'
        },
        attachTo: document.getElementById('root')
      })
      const saveMock = jest.fn()
      wrapper.vm.createViewer = saveMock;
      await wrapper.vm.$nextTick()
      await flushPromises()
      var data = wrapper.vm.$data
      data.booleanitems.annoinfoshown = true;
      expect(data.seadragontile).toBe("/annotate/assets/images/custom/spencer-davis-7ZpvOE2psxM-unsplash.jpg")
      expect(data.annotations[0]['section']).toEqual(["650,1525,1044,997"])
      expect(data.annotations[0]['svg_path']).toEqual([undefined])
      expect(data.annotations[0]['type']).toEqual("rect")
      expect(data.seadragonid).toBe('storyboard_regular')
      expect(data.annotations[0]['tags'].length).toEqual(2)
      expect(data.annotations.length).toEqual(1)
      expect(data.currentanno).toEqual('')
      var contentpos1 = shared.createContent(data.annotations[0], null);
      expect(contentpos1['anno']).not.toEqual(contentpos1['transcription'])
      expect(contentpos1['anno']).toEqual("<span style=\"direction: ltr;\"><div class=\"authorship\">Written by: mary</div><div class=\"tags\">Tags: Dome, cathedral</div></span>")
      const shortcuts = shared.keyboardShortcuts('storyboard', wrapper.vm);
      expect(Object.keys(shortcuts).sort()).toEqual(['autorun', 'close', 'fullscreen', 'hide', 'home', 'info', 'next', 'overlay', 'prev', 'shortcut', 'tags', 'zoomin', 'zoomout'].sort())
    })

    test('test storyboard with nested tags and css styling', async ()  => {

      const wrapper =  mount(storyboard,{
        propsData: {
          annotationurl: 'cssnestedtags.json'
        },
        attachTo: document.getElementById('root')
      })
      const saveMock = jest.fn()
      wrapper.vm.createViewer = saveMock;
      await wrapper.vm.$nextTick()
      await flushPromises()
      var data = wrapper.vm.$data
      data.booleanitems.annoinfoshown = true;
      expect(data.seadragontile).toBe("/image/info.json")
      expect(data.annotations[0]['section']).toEqual(["740,566,3997,4586"])
      expect(data.annotations[0]['svg_path'][0].outerHTML.toString()).toEqual('<polygon points="2230.0,1596.5 2224.5,1596.0 2224.5,1572.0 2209.5,1575.0 2210.0,1286.5 2218.0,1286.5 2231.5,1290.0 2232.5,1312.0 2240.0,1317.5 2247.5,1318.0 2248.0,1293.5 2275.5,1305.0 2274.5,1567.0 2257.0,1567.5 2240.0,1571.5 2239.5,1593.0 2230.0,1596.5"></polygon>')
      expect(data.annotations[0]['type']).toEqual("path")
      expect(data.seadragonid).toBe('storyboard_cssnestedtags')
      expect(data.annotations[0]['tags'].length).toEqual(1)
      expect(data.annotations.length).toEqual(2)
      expect(data.currentanno).toEqual('')
      expect(data.tagslist).toEqual({"points3": {"checked": false, "color": "blue", "count": 1, "group": "Points", "key": "points3", "label": "3"}, "points5": {"checked": false, "color": "blue", "count": 1, "group": "Points", "key": "points5", "label": "5"}})
      var contentpos1 = shared.createContent(data.annotations[0], null);
      expect(contentpos1['anno']).not.toEqual(contentpos1['transcription'])
      expect(contentpos1['anno']).toEqual("<span style=\"direction: ltr;\"><div class=\"tags\">Tags: 3</div></span><style>.tag .points {color: blue;}</style>")
      const shortcuts = shared.keyboardShortcuts('storyboard', wrapper.vm);
      expect(Object.keys(shortcuts).sort()).toEqual(['autorun', 'close', 'fullscreen', 'hide', 'home', 'info', 'next', 'overlay', 'prev', 'shortcut', 'tags', 'zoomin', 'zoomout'].sort())
    })

    test('test storyboard with nested tags and css styling and styling override', async ()  => {

      const wrapper =  mount(storyboard,{
        propsData: {
          annotationurl: 'cssnestedtags.json',
          styling: 'tagscolor: {"points":"white", "points3": "red"}'
        },
        attachTo: document.getElementById('root')
      })
      const saveMock = jest.fn()
      wrapper.vm.createViewer = saveMock;
      await wrapper.vm.$nextTick()
      await flushPromises()
      var data = wrapper.vm.$data
      data.booleanitems.annoinfoshown = true;
      expect(data.seadragontile).toBe("/image/info.json")
      expect(data.annotations[0]['section']).toEqual(["740,566,3997,4586"])
      expect(data.annotations[0]['svg_path'][0].outerHTML.toString()).toEqual('<polygon points="2230.0,1596.5 2224.5,1596.0 2224.5,1572.0 2209.5,1575.0 2210.0,1286.5 2218.0,1286.5 2231.5,1290.0 2232.5,1312.0 2240.0,1317.5 2247.5,1318.0 2248.0,1293.5 2275.5,1305.0 2274.5,1567.0 2257.0,1567.5 2240.0,1571.5 2239.5,1593.0 2230.0,1596.5"></polygon>')
      expect(data.annotations[0]['type']).toEqual("path")
      expect(data.seadragonid).toBe('storyboard_cssnestedtags')
      expect(data.annotations[0]['tags'].length).toEqual(1)
      expect(data.annotations.length).toEqual(2)
      expect(data.currentanno).toEqual('')
      expect(data.tagslist).toEqual({"points3": {"checked": false, "color": "red", "count": 1, "group": "Points", "key": "points3", "label": "3"}, "points5": {"checked": false, "color": "white", "count": 1, "group": "Points", "key": "points5", "label": "5"}})
      var contentpos1 = shared.createContent(data.annotations[0], null);
      expect(contentpos1['anno']).not.toEqual(contentpos1['transcription'])
      expect(contentpos1['anno']).toEqual("<span style=\"direction: ltr;\"><div class=\"tags\">Tags: 3</div></span><style>.tag .points {color: blue;}</style>")
      const shortcuts = shared.keyboardShortcuts('storyboard', wrapper.vm);
      expect(Object.keys(shortcuts).sort()).toEqual(['autorun', 'close', 'fullscreen', 'hide', 'home', 'info', 'next', 'overlay', 'prev', 'shortcut', 'tags', 'zoomin', 'zoomout'].sort())
    })

    test('test storyboard with nested tags and css styling and non nested tags', async ()  => {

      const wrapper =  mount(storyboard,{
        propsData: {
          annotationurl: 'cssnestedandnonested.json',
          styling: 'tagscolor: {"testvariable":"green"}'
        },
        attachTo: document.getElementById('root')
      })
      const saveMock = jest.fn()
      wrapper.vm.createViewer = saveMock;
      await wrapper.vm.$nextTick()
      await flushPromises()
      var data = wrapper.vm.$data
      data.booleanitems.annoinfoshown = true;
      expect(data.seadragontile).toBe("/image/info.json")
      expect(data.annotations[0]['section']).toEqual(["740,566,3997,4586"])
      expect(data.annotations[0]['svg_path'][0].outerHTML.toString()).toEqual('<polygon points="2230.0,1596.5 2224.5,1596.0 2224.5,1572.0 2209.5,1575.0 2210.0,1286.5 2218.0,1286.5 2231.5,1290.0 2232.5,1312.0 2240.0,1317.5 2247.5,1318.0 2248.0,1293.5 2275.5,1305.0 2274.5,1567.0 2257.0,1567.5 2240.0,1571.5 2239.5,1593.0 2230.0,1596.5"></polygon>')
      expect(data.annotations[0]['type']).toEqual("path")
      expect(data.seadragonid).toBe('storyboard_cssnestedandnonested')
      expect(data.annotations[0]['tags'].length).toEqual(1)
      expect(data.annotations.length).toEqual(2)
      expect(data.currentanno).toEqual('')
      expect(data.tagslist).toEqual({"testvariable": {"checked": false, "color": "green", "count": 1, "group": "", "key": "testvariable", "label": "test variable"}, "points3": {"checked": false, "color": "blue", "count": 1, "group": "Points", "key": "points3", "label": "3"}})
      var contentpos1 = shared.createContent(data.annotations[1], null);
      expect(contentpos1['anno']).not.toEqual(contentpos1['transcription'])
      expect(contentpos1['anno']).toEqual("<span style=\"direction: ltr;\"><div class=\"tags\">Tags: test variable</div></span>")
      const shortcuts = shared.keyboardShortcuts('storyboard', wrapper.vm);
      expect(Object.keys(shortcuts).sort()).toEqual(['autorun', 'close', 'fullscreen', 'hide', 'home', 'info', 'next', 'overlay', 'prev', 'shortcut', 'tags', 'zoomin', 'zoomout'].sort())
    })
    test('test storyboard with mutliple settings', async ()  => {

      const wrapper =  mount(storyboard,{
        propsData: {
          annotationurl: 'cssnestedandnonested.json',
          styling: 'overlaynext: true;textfirst: true;toggleoverlay: true;panorzoom: pan;textposition: left;startenddisplay: keyboard;toolbarposition: bottom;autorun_interval: 5;customid: test;title: test;'
        },
        attachTo: document.getElementById('root')
      })
      const saveMock = jest.fn()
      wrapper.vm.createViewer = saveMock;
      await wrapper.vm.$nextTick()
      await flushPromises()
      var data = wrapper.vm.$data
      data.booleanitems.annoinfoshown = true;
      expect(data.seadragontile).toBe("/image/info.json")
      expect(data.annotations[0]['section']).toEqual(["740,566,3997,4586"])
      expect(data.annotations[0]['svg_path'][0].outerHTML.toString()).toEqual('<polygon points="2230.0,1596.5 2224.5,1596.0 2224.5,1572.0 2209.5,1575.0 2210.0,1286.5 2218.0,1286.5 2231.5,1290.0 2232.5,1312.0 2240.0,1317.5 2247.5,1318.0 2248.0,1293.5 2275.5,1305.0 2274.5,1567.0 2257.0,1567.5 2240.0,1571.5 2239.5,1593.0 2230.0,1596.5"></polygon>')
      expect(data.annotations[0]['type']).toEqual("path")
      expect(data.seadragonid).toBe('storyboard_test')
      expect(data.annotations[0]['tags'].length).toEqual(1)
      expect(data.annotations.length).toEqual(2)
      expect(data.currentanno).toEqual('')
      expect(data.tagslist['testvariable']['checked']).toEqual(true)
      var contentpos1 = shared.createContent(data.annotations[1], null);
      expect(contentpos1['anno']).not.toEqual(contentpos1['transcription'])
      expect(contentpos1['anno']).toEqual("<span style=\"direction: ltr;\"><div class=\"tags\">Tags: test variable</div></span>")
      const shortcuts = shared.keyboardShortcuts('storyboard', wrapper.vm);
      expect(Object.keys(shortcuts).sort()).toEqual(['autorun', 'close', 'fullscreen', 'hide', 'home', 'info', 'next', 'overlay', 'prev', 'shortcut', 'tags', 'zoomin', 'zoomout'].sort())
    })
})