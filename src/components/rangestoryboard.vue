<template>
<div v-bind:id="rangeid" class="rangestoryboard" v-bind:class="[!settings.fullpage && !isfullscreen ? 'rangestoryboardview' : 'rangefullpage']">
  <storyboard :key="position" v-if="annotationurl" v-bind:jsonannotation="annotationurl.jsonanno" v-bind:annotationlist="annotationurl.anno" v-bind:manifesturl="annotationurl.manifest" v-bind:styling="stylingstring" v-bind:ws="isws" v-bind:layers="customlayers"></storyboard>
  <button id="previousPageInactiveButton" v-hotkey="prevshortcut" v-on:click="nextItemRange('prev')" class="pageButton toolbarButton" v-bind:class="[{ 'pageinactive' : prevPageInactive}, viewingDirection == 'rtl' ? 'floatleft' : 'floatright' ]">
    <span v-html="buttons.prev"></span>
    <span class="toolbartext">Previous page</span>
  </button>
  <button id="nextPageInactiveButton" v-hotkey="nextshortcut" v-on:click="nextItemRange('next')" class="pageButton toolbarButton" v-bind:class="[{ 'pageinactive' : nextPageInactive}, viewingDirection == 'ltr' ? 'floatleft' : 'floatright']">
    <span v-html="buttons.next"></span>
    <span class="toolbartext">Next Page</span>
  </button>
</div>
</template>
<script>
import storyboard from './storyboard'
import shared from './shared'
import axios from 'axios';
require("es6-promise").polyfill();
import Vue from 'vue';
import VueSimpleHotkey from 'vue-simple-hotkey';
Vue.use(VueSimpleHotkey);

export default {
    components: {
        storyboard
    },
    props: {
      'rangeurl':String,
      'styling': String,
      'ws': String,
      'layers': String,
      'manifesturl': String
    },
    data: function() {
      return {
        tags: false,
        layerslist: false,
        isws: '',
        range: true,
        toctitle: 'Range Pages',
        buttons: {
          'autorunbutton': '<i class="fas fa-magic"></i>',
          'overlaybutton': '<i class="fas fa-toggle-on"></i>',
          'expandbutton' : '<i class="fas fa-expand"></i>',
          'hide_button' : '<i class="fas fa-caret-up"></i>',
          'playpause': '<i class="fas fa-play"></i>',
          'tags': '<i class="fas fa-tag"></i>',
          'info': '<i class="fas fa-info-circle"></i>',
          'layer': '<i class="fas fa-layer-group"></i>',
          'prev' : '<i class="fas fa-chevron-left"></i>',
          'next': '<i class="fas fa-chevron-right"></i>'
        },
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
        toc: [],
        viewingDirection: 'ltr',
        rangetitle: '',
        nextshortcut: ['alt+n', 'alt+.', 'alt+right'],
        prevshortcut: ['alt+p', 'alt+,', 'alt+left']
      }
    },
    created(){
      // get annotation urls in list
      this.rangeid = this.$props.rangeurl ? this.$props.rangeurl.split("/").slice(-1)[0] : this.$props.manifesturl.split("/").slice(-1)[0];
      this.settings = shared.getsettings(this);
      if (this.$props.rangeurl){
        var isURL = shared.isURL(this.$props.rangeurl, this.settings);
        if (isURL['isURL']){
          axios.get(this.$props.rangeurl).then(response => {
            this.getRangeData(response.data);
          })
        } else {
          this.getRangeData(isURL['json'])
        }
      } else if (this.$props.manifesturl){
        var isURL = shared.isURL(this.$props.manifesturl, this.settings);
        if (isURL['isURL']){
          axios.get(this.$props.manifesturl).then(response => {
            this.getManifestData(response.data);
          })
        } else {
          this.getManifestData(isURL['json'])
        }
      }
    },
    methods: {
      getManifestData: function(manifest) {
        var otherContent = [];
        if (manifest['sequences']){
          canvases = [].concat.apply([], manifest['sequences'].map(element => element['canvases']));
          for (var cv=0; cv<canvases.length; cv++){
            var canvas = canvases[cv];
            var canvasid = shared.getId(canvas);
            if (canvas['otherContent']){
              otherContent.push(canvas['otherContent'])
            }            
          }
        } else {
          otherContent = [].concat.apply([], manifest['items'].map(element => element['annotations']));
        }
        for (var an=0; an<otherContent.length; an++){
          var anno = otherContent[an];
          var type = 'url'
          if(anno.constructor.name == 'String'){
            var annourl = shared.getId(anno);
          } else {
            var jsonanno = anno;
          }
          var toclabel = anno['label'] ? anno['label'] : `Page ${an + 1}`
          var description = anno['description'] ?  anno['description'] : '';
          this.toc.push({ 'position' :an, 'label' : toclabel, 'description': description});
          this.rangelist.push({'canvas': canvasid, 'anno': annourl, 'jsonanno':  jsonanno,'manifest': this.$props.manifesturl})
        }
        this.setDefaults(manifest)
      },
      setDefaults: function(data) {
        var viewingDirection = data.viewingDirection;
        if(viewingDirection === 'right-to-left'){
          this.viewingDirection = 'rtl';
          this.buttons.prev = this.buttons.next;
          this.buttons.next = '<i class="fas fa-chevron-left"></i>';
        }
        this.annotationurl = this.rangelist[0];
        this.rangetitle = data.label['@value'] ? data.label['@value'] : data.label;
        this.settings.autorun_interval ? '' : this.settings.autorun_interval = 3;
        this.getTitle();
        this.$props.ws ? this.isws = this.$props.ws : '';
        this.$props.layers ? this.customlayers = this.$props.layers : '';
        this.annotationurl.section ? this.settings.imagecrop = this.annotationurl.section : '';
        this.getStylingString();
        this.rangelist.length == 1 ? this.nextPageInactive = true : ''
      },
      getRangeData: function(rangelist) {
        var annos = rangelist.contentLayer.otherContent;
        var canvases = rangelist.canvases ? rangelist.canvases : [];
        for (var ca=0; ca<annos.length; ca++){
          var canvas = canvases[ca];
          var anno = annos[ca];
          var xywh = '';
          var manifest = canvas ? canvas['within'] : '';
          manifest = shared.getId(manifest);
          if (canvas){
            var canvasid = shared.getId(canvas);
            xywh = canvasid.constructor.name === 'String' && canvasid.split("#xywh=").length > 1 ? canvasid.split("#xywh=").slice(-1)[0] : '';
          }
          var annostring = anno['@id'] ? anno['@id'] : anno['id'] ? anno['id'] : anno;
          var toclabel = anno['label'] ? anno['label'] : `Page ${ca + 1}`
          var description = anno['description'] ?  anno['description'] : '';
          this.toc.push({ 'position' :ca, 'label' : toclabel, 'description': description});
          this.rangelist.push({'canvas': canvas, 'anno': annostring,  'manifest': manifest, section: xywh, title: anno['label']})
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
        this.prevPageInactive = false;
        this.nextPageInactive = false;
        if (this.position <= 0) {
          this.prevPageInactive = true;
        } else if (this.position >= this.rangelist.length-1) {
          this.nextPageInactive = true;
        }
        this.annotationurl = this.rangelist[this.position];
        this.annotationurl.section ? this.settings.imagecrop = this.annotationurl.section : '';
        this.getTitle();
        this.getStylingString();
      },
      getStylingString: function(){
        for (var key in this.settings){
          this.stylingstring += `${key}:${this.settings[key]};`
        }
      },
      getTitle: function() {
        var title = this.rangetitle ? this.rangetitle : '';
        this.rangetitle && this.annotationurl.title ? title += ': ' : '';
        title += this.annotationurl.title ? this.annotationurl.title : '';
        this.settings.title = title;
      },
      updateFullScreen: function(fullscreen, expandbutton) {
        this.$children[0].buttons.expandbutton = expandbutton;
        this.isfullscreen = fullscreen;
        this.$children[0].fullscreen = fullscreen;
      }
    }
}
</script>
