<template>
<div v-bind:id="rangeid" class="rangestoryboard" v-bind:class="[!settings.fullpage && !isfullscreen ? 'rangestoryboardview' : 'rangefullpage']">
  <storyboard :key="position" v-if="annotationurl" v-bind:annotationlist="annotationurl.anno" v-bind:manifesturl="annotationurl.manifest" v-bind:styling="stylingstring" v-bind:ws="isws" v-bind:layers="customlayers"></storyboard>
  <button id="previousPageInactiveButton" v-on:click="nextItemRange('prev')" class="pageButton toolbarButton" v-bind:class="{ 'pageinactive' : prevPageInactive, 'floatleft' : viewingDirection == 'rtl' }" v-html="buttons.prev">
    <span class="toolbartext">Previous page</span>
  </button>
  <button id="nextPageInactiveButton" v-on:click="nextItemRange('next')" class="pageButton toolbarButton" v-bind:class="{ 'pageinactive' : nextPageInactive, 'floatleft' : viewingDirection == 'ltr' }" v-html="buttons.next">
    <span class="toolbartext">Next Page</span>
  </button>
</div>
</template>
<script>
import storyboard from './storyboard'
import shared from './shared'
import axios from 'axios';
require("es6-promise").polyfill();

export default {
    components: {
        storyboard
    },
    props: {
      'rangeurl':String,
      'styling': String,
      'ws': String,
      'layers': String,
      'images': String
    },
    data: function() {
      return {
        tags: false,
        layerslist: false,
        isws: '',
        range: true,
        anno_data: [],
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
        title: '',
        rangelist: [],
        position: 0,
        prevPageInactive: true,
        nextPageInactive: false,
        rangeid: '',
        customlayers: '',
        isfullscreen: false,
        toc: [],
        viewingDirection: 'ltr'
      }
    },
    created(){
      // get annotation urls in list
      this.rangeid = this.$props.rangeurl.split("/").slice(-1)[0];
      axios.get(this.$props.rangeurl).then(response => {
        var annos = response.data.contentLayer.otherContent;
        var canvases = response.data.canvases ? response.data.canvases : [];
        var viewingDirection = response.data.viewingDirection;
        if(viewingDirection === 'right-to-left'){
          this.viewingDirection = 'rtl';
          this.buttons.prev = this.buttons.next;
          this.buttons.next = '<i class="fas fa-chevron-left"></i>';
        }
        var rangetitle = response.data.label;
        for (var ca=0; ca<annos.length; ca++){
          var canvas = canvases[ca];
          var anno = annos[ca];
          var xywh = '';
          var manifest = canvas ? canvas['within'] : '';
          manifest = manifest['@id'] ? manifest['@id'] : manifest['id'] ? manifest['id'] : manifest;
          if (canvas){
            var canvasid = canvas['@id'] ? canvas['@id'] : canvas['id'] ? canvas['id'] : canvas;
            xywh = canvasid.constructor.name === 'String' && canvasid.split("#xywh=").length > 1 ? canvasid.split("#xywh=").slice(-1)[0] : '';
          }
          var annostring = anno['@id'] ? anno['@id'] : anno['id'] ? anno['id'] : anno;
          var toclabel = anno['label'] ? anno['label'] : `Page ${ca + 1}`
          var description = anno['description'] ?  anno['description'] : '';
          this.toc.push({ 'position' :ca, 'label' : toclabel, 'description': description});
          this.rangelist.push({'canvas': canvas, 'anno': annostring,  'manifest': manifest, section: xywh, title: toclabel})
        }
        this.annotationurl = this.rangelist[0];
        // Get settings and create styling string
        this.settings = shared.getsettings(this.styling);
        this.settings.autorun_interval ? '' : this.settings.autorun_interval = 3;
        this.settings.title = rangetitle ? rangetitle : '' + this.annotationurl.title;
        this.$props.ws ? this.ws = this.$props.ws : '';
        this.$props.layers ? this.customlayers = this.$props.layers : '';
        this.settings.imagecrop = this.annotationurl.section;
        this.getStylingString();
      })
    },
    methods: {
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
        this.settings.imagecrop = this.annotationurl.section;
        this.settings.title = this.annotationurl.title;
        this.getStylingString();
      },
      getStylingString: function(){
        for (var key in this.settings){
          this.stylingstring += `${key}:${this.settings[key]};`
        }
      },
      updateFullScreen: function(fullscreen, expandbutton) {
        this.$children[0].buttons.expandbutton = expandbutton;
        this.isfullscreen = fullscreen;
        this.$children[0].fullscreen = fullscreen;
      }
    }
}
</script>
