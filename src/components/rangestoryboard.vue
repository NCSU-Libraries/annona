<template>
<div v-bind:id="rangeid" class="rangestoryboard annonaview" v-bind:class="[!settings.fullpage && !isfullscreen ? 'rangestoryboardview' : 'rangefullpage']">
  <span v-if="listtype == 'storyboardlist'" v-bind:key="position" style="width: 100vw">
    <span v-if="rangelist[position]['tag'] == 'iiif-storyboard'">
      <storyboard :annotationurl="annotationurl.annotationurl" v-bind:jsonannotation="annotationurl.jsonanno" v-bind:manifesturl="annotationurl.manifesturl" v-bind:styling="stylingstring" v-bind:ws="annotationurl.ws" v-bind:layers="annotationurl.layers"></storyboard>
    </span>
    <span v-else-if="rangelist[position]['tag'] == 'iiif-multistoryboard'">
      <multistoryboard :annotationurls="annotationurl.annotationurls" v-bind:jsonannotation="annotationurl.jsonanno" v-bind:manifesturl="annotationurl.manifesturl" v-bind:styling="stylingstring" v-bind:ws="annotationurl.ws" v-bind:layers="annotationurl.layers" v-bind:images="annotationurl.images"></multistoryboard>
    </span>
    <span v-else-if="rangelist[position]['tag'] == 'iiif-annotation'">
      <iiifannotation :annotationurl="annotationurl.annotationurl" v-bind:jsonannotation="annotationurl.jsonanno" v-bind:manifesturl="annotationurl.manifesturl" v-bind:styling="stylingstring" ></iiifannotation>
    </span>
  </span>
  <span v-else style="width: 100vw">
    <storyboard v-bind:key="position" v-if="ready" v-bind:jsonannotation="annotationurl.jsonanno" v-bind:annotationurl="annotationurl.anno" v-bind:manifesturl="annotationurl.manifest" v-bind:styling="stylingstring" v-bind:ws="isws" v-bind:layers="customlayers"></storyboard>
  </span>
  <button id="previousPageInactiveButton" v-on:click="nextItemRange('prev')" class="pageButton toolbarButton" v-bind:class="[{ 'pageinactive' : prevPageInactive}, { 'imageview' : rangelist[position] && rangelist[position]['tag'] == 'iiif-annotation'}, viewingDirection == 'rtl' ? 'floatleft' : 'floatright' ]">
    <span v-html="buttons.prev"></span>
    <span class="toolbartext">Previous page</span>
  </button>
  <button id="nextPageInactiveButton" v-on:click="nextItemRange('next')" class="pageButton toolbarButton" v-bind:class="[{ 'pageinactive' : nextPageInactive},{ 'imageview' : rangelist[position] && rangelist[position]['tag'] == 'iiif-annotation'}, viewingDirection == 'ltr' ? 'floatleft' : 'floatright']">
    <span v-html="buttons.next"></span>
    <span class="toolbartext">Next Page</span>
  </button>
</div>
</template>
<script>
import storyboard from './storyboard';
import iiifannotation from './iiifannotation';
import shared from './shared';
import axios from 'axios';
import multistoryboard from './multistoryboard.vue';

export default {
    components: {
        storyboard,
        multistoryboard,
        iiifannotation
    },
    props: {
      'rangeurl':String,
      'styling': String,
      'ws': String,
      'layers': String
    },
    data: function() {
      return {
        tags: false,
        layerslist: false,
        isws: '',
        range: true,
        toctitle: 'Range Pages',
        buttons: JSON.parse(JSON.stringify(shared.buttons)),
        settings: {},
        stylingstring: "",
        annotationurl: '',
        rangelist: [],
        position: 0,
        prevPageInactive: true,
        nextPageInactive: false,
        rangeid: '',
        customlayers: '',
        isfullscreen: false,
        manifestcontents: '',
        toc: [],
        viewingDirection: 'ltr',
        rangetitle: '',
        ready: false,
        listtype: '',
        startCanvas: ''
      }
    },
    watch: {
      'position': function(newval) {
        this.prevPageInactive = false;
        this.nextPageInactive = false;
        if (newval <= 0){
          this.prevPageInactive = true;
        }
        if (newval >= this.rangelist.length-1){
          this.nextPageInactive = true;
        }
      }
    },
    created(){
      // get annotation urls in list
      this.rangeid = "rangestoryboard_" + this.$props.rangeurl.split("/").slice(-1)[0];
      this.settings = shared.getsettings(this);
      var isURL = shared.isURL(this.$props.rangeurl, this.settings);
      if (isURL['isURL']){
        axios.get(this.$props.rangeurl).then(response => {
          this.manifestOrRange(response.data);
        })
      } else {
        this.manifestOrRange(isURL['json']);
      }
    },
    methods: {
      manifestOrRange: function(contents) {
        var listtype = contents['@type'] ? contents['@type'] : contents['type'];
        this.listtype = listtype;
        if (listtype.toLowerCase().indexOf('manifest') > -1){
          this.getManifestData(contents);
        } else if (listtype == 'storyboardlist') {
          for (var rl =0; rl<contents['items'].length; rl++){
            const content = contents['items'][rl];
            var el = document.createElement( 'div' );
            el.innerHTML = content['board'];
            const dict = {'tag': el.children[0].localName}
            const attributes = el.children[0].attributes;
            for (var att=0;att<attributes.length; att++){
              dict[attributes[att].name] = attributes[att].nodeValue;
            }
            if (content['annotation']){
              dict['jsonanno'] = content['annotation'];
              dict['annotationurl'] = '';
            }
            var toclabel = content['title'] ? content['title'] : `Page ${rl + 1}`;
            toclabel = shared.parseMetaFields(toclabel);
            dict['title'] = toclabel;
            this.rangelist.push(dict)
            this.toc.push({ 'position': rl, 'label': toclabel, 'thumbnail': content['thumbnail'], 'description': content['description']});
          }
          this.setDefaults(contents);
        } else {
          this.getRangeData(contents);
        }
      },
      getManifestData: function(manifest) {
        var otherContent = [];
        if (manifest['sequences'] || manifest['items']){
          const startCanvas = manifest['items'] ? manifest['items']['start'] : manifest['sequences'][0]['startCanvas'];
          this.startCanvas = startCanvas ? shared.getId(startCanvas) : startCanvas;
          var canvases = manifest['items'] ? shared.flatten(manifest['items']) : shared.flatten(manifest['sequences'].map(element => element['canvases']));
          for (var cv=0; cv<canvases.length; cv++){
            var canvas = canvases[cv];
            var annotationfield = canvas['otherContent'] ? canvas['otherContent'] : canvas['annotations'];
            if (annotationfield){
              otherContent.push({'oc': annotationfield, 'canvas': canvas});
            }            
          }
        }
        for (var an=0; an<otherContent.length; an++){
          var anno = otherContent[an]['oc'];
          if (anno.constructor.name == 'Array') { 
            for (var h=0; h<anno.length; h++){
              this.addToLists(anno[h], this.$props.rangeurl, otherContent[an]['canvas']);
            }
          } else{
            this.addToLists(anno, this.$props.rangeurl, otherContent[an]['canvas']);
          }  
        }
        this.setDefaults(manifest);
        this.manifestcontents = manifest;
      },
      addToLists: function(anno, manifesturl, canvas) {
        if(anno.resources || anno.items || anno.body){
          var jsonanno = anno; 
        } else {
          var annourl = shared.getId(anno);
        }
        if (canvas){
          var canvasid = shared.getId(canvas);
          if (canvasid.constructor.name === 'String' && canvasid.indexOf('#xywh') > -1){
            var xywh = canvasid.split("#xywh=").length > 1 ? canvasid.split("#xywh=").slice(-1)[0] : '';
          } 
          var firstcanvas = canvas.images ? canvas.images[0] : canvas.items ? canvas.items[0].items[0] : undefined;
          if (firstcanvas){
            var thumbnail = shared.getImages(shared.getCanvasTile(firstcanvas)['canvas_tile'], 'full', '30,')['imageurl'];
          }
        }
        const position = this.rangelist.length;
        if (canvasid == this.startCanvas){
            this.position = position;
        }
        var toclabel = anno['label'] ? anno['label'] : canvas && canvas['label'] ? canvas['label'] : `Page ${position + 1}`;
        toclabel = shared.parseMetaFields(toclabel);
        var description = anno['description'] ?  anno['description'] : '';
        this.toc.push({ 'position' :position, 'label' : toclabel, 'thumbnail': thumbnail, 'description': description});
        this.rangelist.push({'canvas': canvasid, 'images': firstcanvas ? canvas : '', 'anno': annourl, 'jsonanno': jsonanno, 'manifest': manifesturl, 'section': xywh, 'title': toclabel});
      },
      setDefaults: function(data) {
        var viewingDirection = data.viewingDirection;
        if(viewingDirection === 'right-to-left'){
          this.viewingDirection = 'rtl';
          this.buttons.prev = this.buttons.next;
          this.buttons.next = '<i class="fas fa-chevron-left"></i>';
        }
        this.annotationurl = this.rangelist[this.position];
        this.rangetitle = shared.parseMetaFields(data.label);
        this.settings.autorun_interval ? '' : this.settings.autorun_interval = 3;
        this.updateFullScreen(this.isfullscreen);
        this.getTitle();
        this.$props.ws ? this.isws = this.$props.ws : '';
        this.customlayers = this.$props.layers ? this.$props.layers : this.annotationurl.layers ? this.annotationurl.layers : '';
        this.annotationurl.section ? this.settings.imagecrop = this.annotationurl.section : '';
        this.getStylingString();
        this.rangelist.length == 1 ? this.nextPageInactive = true : '';
        this.ready = true;
      },
      getRangeData: function(rangelist) {
        var annos = rangelist.contentLayer ? rangelist.contentLayer.otherContent: rangelist.items;
        var canvases = rangelist.canvases ? rangelist.canvases : [];
        for (var ca=0; ca<annos.length; ca++){
          var canvas = canvases[ca];
          var anno = annos[ca];
          var manifest = canvas ? canvas['within'] : '';
          manifest = shared.getId(manifest);
          this.addToLists(anno, manifest, canvas);
        }
        this.setDefaults(rangelist);
      },
      nextItemRange: function(prevornext){
        if (prevornext == 'prev') {
          this.position -= 1;
        } else if (prevornext == 'next') {
          this.position += 1;
        } else {
          this.position = prevornext;
        }
        this.annotationurl = this.rangelist[this.position];
        this.annotationurl.section ? this.settings.imagecrop = this.annotationurl.section : '';
        this.getTitle();
        this.getStylingString();
      },
      getStylingString: function(){
        this.stylingstring = '';
        for (var key in this.settings){
          this.stylingstring += `${key}:${this.settings[key]};`;
        }
        if (this.annotationurl.styling) {
          this.stylingstring += this.annotationurl.styling;
        }
      },
      getTitle: function() {
        var title = this.rangetitle ? this.rangetitle : '';
        if (this.rangelist.length > 1 || this.annotationurl.title.substring(0, 4) != 'Page') {
          this.rangetitle && this.annotationurl.title ? title += ': ' : '';
          title += this.annotationurl.title ? this.annotationurl.title : '';
        }
        this.settings.title = title;
      },
      updateFullScreen: function(fullscreen) {
        this.isfullscreen = fullscreen;
        for (var fs=0; fs<this.$children.length; fs++){
          if (this.$children[fs].$options.name.indexOf('storyboard') > -1){
            this.$children[fs].fullscreen = fullscreen;
          }
        }
      }
    }
}
</script>
