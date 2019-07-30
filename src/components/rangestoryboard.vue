<template>
<div v-bind:id="rangeid" class="rangestoryboard">
  <storyboard :key="position" v-if="annotationurl" v-bind:annotationlist="annotationurl.anno" v-bind:manifesturl="annotationurl.manifest" v-bind:styling="stylingstring" v-bind:ws="isws" v-bind:layers="customlayers"></storyboard>
  <button id="previousPageButton" v-on:click="nextItemRange('prev')" class="pageButton toolbarButton" v-bind:class="{ 'pageinactive' : prevPageInactive }">
    <i class="fas fa-chevron-left"></i><span class="toolbartext">Previous page</span>
  </button>
  <button id="nextPageInactiveButton" v-on:click="nextItemRange('next')" class="pageButton toolbarButton" v-bind:class="{ 'pageinactive' : nextPageInactive }">
    <i class="fas fa-chevron-right"></i><span class="toolbartext">Next Page</span>
  </button>
</div>
</template>
<script>
import storyboard from './storyboard'
import shared from './shared'
import openseadragon from 'openseadragon';
import axios from 'axios';

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
        anno_data: [],
        buttons: {
          'autorunbutton': '<i class="fas fa-magic"></i>',
          'overlaybutton': '<i class="fas fa-toggle-on"></i>',
          'expandbutton' : '<i class="fas fa-expand"></i>',
          'hide_button' : '<i class="fas fa-caret-up"></i>',
          'playpause': '<i class="fas fa-play"></i>',
          'tags': '<i class="fas fa-tag"></i>',
          'info': '<i class="fas fa-info-circle"></i>',
          'layer': '<i class="fas fa-layer-group"></i>'
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
        customlayers: ''
      }
    },
    created(){
      // get annotation urls in list
      this.rangeid = this.$props.rangeurl.split("/").slice(-1)[0];
      axios.get(this.$props.rangeurl).then(response => {
        var annos = response.data.contentLayer.otherContent;
        var canvases = response.data.canvases ? response.data.canvases : [];
        this.title = response.data.label;
        for (var ca=0; ca<annos.length; ca++){
          var canvas = canvases[ca];
          var manifest = canvas ? canvas['within'] : '';
          manifest = manifest['@id'] ? manifest['@id'] : manifest['id'] ? manifest['id'] : manifest;
          this.rangelist.push({'canvas': canvas, 'anno': annos[ca], 'manifest': manifest})
          if (ca == 0) {
            this.annotationurl = this.rangelist[0];
          }
        }
        // Get settings and create styling string
        this.settings = shared.getsettings(this.styling);
        this.settings.autorun_interval ? '' : this.settings.autorun_interval = 3;
        !this.settings.title ? this.settings.title = this.title : '';
        this.$props.ws ? this.ws = this.$props.ws : '';
        this.$props.layers ? this.customlayers = this.$props.layers : '';
        for (var key in this.settings){
          if (key != 'fullpage'){
            this.stylingstring += `${key}:${this.settings[key]};`
          }
        }
      })
    },
    methods: {
      nextItemRange: function(prevornext){
        if (prevornext == 'prev') {
          this.position -= 1;
        } else {
          this.position += 1;
        }
        this.prevPageInactive = false;
        this.nextPageInactive = false;
        if (this.position <= 0) {
          this.prevPageInactive = true;
        } else if (this.position >= this.rangelist.length-1) {
          this.nextPageInactive = true;
        }

        this.annotationurl = this.rangelist[this.position];
      }
    }
}
</script>
