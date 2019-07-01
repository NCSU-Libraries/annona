<template>
<div class="multistoryboard">
  <span id="header_toolbar" v-show="!settings.hide_toolbar || settings.hide_toolbar && !fullscreen">
    <button v-show="!annotationurls" id="autoRunButton" v-on:click="multiButton({'function':'autoRun', 'args': settings.autorun_interval});" class="toolbarButton">
      <span v-html="buttons.autorunbutton"></span>
      <span class="toolbartext">Start/Stop Autorun</span>
    </button>
    <button v-on:click="multiButton({'function': 'clickButton', 'args': 'info'});" id="infoButton" class="toolbarButton">
      <span v-html="buttons.info"></span>
      <span class="toolbartext">View source image information</span>
    </button>
    <button v-on:click="multiButton({'function': 'clickButton', 'args': 'tags'});" id="tagsButton" v-if="tags && settings.showtags !== false" class="toolbarButton">
      <span v-html="buttons.tags"></span>
      <span class="toolbartext">Toggle Tags</span>
    </button>
    <button v-show="!annotationurls" id="overlayButton" v-on:click="multiButton({'function': 'createOverlay', 'args': ''});" class="toolbarButton">
      <span v-html="buttons.overlaybutton"></span>
      <span class="toolbartext">Toggle Overlays</span>
    </button>
    <button v-show="layerslist" id="layerButton" v-on:click="multiButton({'function': 'clickButton', 'args': 'layer'});" class="toolbarButton">
      <span v-html="buttons.layer"></span>
      <span class="toolbartext">View layers</span>
    </button>
    <button v-on:click="multiButton({'function': 'zoom', 'args': 'in'});" id="zoomInButton" class="toolbarButton">
      <i class="fas fa-search-plus"></i>
      <span class="toolbartext">Zoom in</span>
    </button>
    <button v-on:click="multiButton({'function': 'zoom', 'args': 'out'});" id="zoomOutButton" class="toolbarButton">
      <i class="fas fa-search-minus"></i>
      <span class="toolbartext">Zoom out</span>
    </button>
    <button v-on:click="multiButton({'function': 'zoom', 'args': 'home'})" id="homeZoomButton" class="toolbarButton">
      <i class="fas fa-home"></i>
      <span class="toolbartext">View full image</span>
    </button>
    <button v-show="!annotationurls" id="previousButton" v-on:click="multiButton({'function': 'next', 'args': 'prev'});" v-bind:class="{ 'inactive' : prev_inactive }" class="toolbarButton">
      <i class="fa fa-arrow-left"></i>
      <span class="toolbartext">Previous Annotation</span>
    </button>
    <button v-show="!annotationurls" id="nextButton" v-on:click="multiButton({'function': 'next', 'args': 'next'});" v-bind:class="{ 'inactive' : next_inactive }" class="toolbarButton">
      <i class="fa fa-arrow-right"></i>
      <span class="toolbartext">Next Annotation</span>
    </button>
    <button v-on:click="toggle_fullscreen()"  id="fullScreenButton" class="toolbarButton">
      <span v-html="buttons.expandbutton"></span>
      <span class="toolbartext">Toggle fullscreen</span>
    </button>
  </span>
<div v-for="anno in anno_data" v-bind:key="anno" v-bind:style="{'width': widthvar}" style="position: relative; display: inline-block">
  <storyboard v-if="$props.annotationurls" v-bind:annotationurl="anno" v-bind:styling="stylingstring" v-bind:ws="isws" v-bind:layers="customlayers"></storyboard>
  <storyboard v-if="$props.annotationlists" v-bind:annotationlist="anno" v-bind:styling="stylingstring" v-bind:ws="isws" v-bind:layers="customlayers"></storyboard>

</div>
</div>
</template>
<script>
import storyboard from './storyboard'
import shared from './shared'
export default {
    components: {
        storyboard
    },
    props: {
      'annotationlists':String,
      'manifesturl':String,
      'annotationurls': String,
      'styling': String,
      'ws': String,
      'layers': String
    },
    data: function() {
      return {
        tags: false,
        layerslist: false,
        customlayers: '[]',
        isws: '',
        position: -1,
        prev_inactive: false,
        next_inactive: false,
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
        widthvar: "",
        multi: true
      }
    },
    created(){
      this.anno_data = this.$props.annotationlists ? this.$props.annotationlists.split(";") : this.$props.annotationurls.split(";");
      this.settings = shared.getsettings(this.styling);
      this.widthvar = `${parseInt((100/this.anno_data.length))}%`;
      this.settings.autorun_interval ? '' : this.settings.autorun_interval = 3;
      this.$props.ws ? this.ws = this.$props.ws : '';
      this.$props.layers ? this.customlayers = this.$props.layers : '';
      for (var key in this.settings){
        this.stylingstring += `${key}:${this.settings[key]};`
      }
    },
    methods: {
      moveArea (bounds) {
        for (var i=0; i<this.$children.length; i++){
          var viewer =this.$children[i].viewer;
          var conversion = viewer.world.getItemAt(0).imageToViewportRectangle(bounds.x, bounds.y, bounds.width, bounds.height);
          viewer.viewport.fitBoundsWithConstraints(conversion).ensureVisible();
        }
      },
      fullscreenChange (fullscreen) {
        if(fullscreen){
          this.buttons.expandbutton = '<i class="fas fa-compress"></i>';
        } else {
          this.buttons.expandbutton = '<i class="fas fa-expand"></i>';
        }
        this.fullscreen = fullscreen;
      },
      toggle_fullscreen (){
        this.$fullscreen.toggle(this.$el, {
          wrap: false,
          callback: this.fullscreenChange
        });
      },
      multiButton(e) {
        for (var i=0; i<this.$children.length; i++){
          this.$children[i].sendMessage(e);
        }
        var data = this.$children[0]._data;
        this.position = data.position;
        this.buttons = data.buttons;
        this.prev_inactive = data.prev_inactive;
        this.next_inactive = data.next_inactive;
      }
    }
}
</script>
