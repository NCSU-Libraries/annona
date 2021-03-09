<template>
<div id="multistoryboard" class="annonaview" v-bind:class="[!settings.fullpage && !fullscreen ? 'multistoryboard' : 'multifullpage', settings.toolbarposition ? settings.toolbarposition + '_menu_container' : 'top_menu_container']">
  <span id="header_toolbar" v-if="!settings.hide_toolbar || settings.hide_toolbar && !fullscreen" v-bind:class="[settings.toolbarposition ? settings.toolbarposition + '_multi_menu' : 'top_multi_menu']">
    <button v-if="!annotationurls && shortcuts['autorun']" v-hotkey="shortcuts['autorun']['shortcut']" id="autoRunButton" v-on:click="multiButton({'function':'autoRun', 'args': settings.autorun_interval});" class="toolbarButton">
      <span v-html="buttons.autorunbutton"></span>
      <span class="toolbartext">Start/Stop Autorun</span>
    </button>
    <button v-hotkey="shortcuts['info']['shortcut']" v-if="shortcuts['info']" v-on:click="multiButton({'function': 'clickButton', 'args': 'info'});" id="infoButton" class="toolbarButton">
      <span v-html="buttons.info"></span>
      <span class="toolbartext">View source image information</span>
    </button>
    <button v-hotkey="shortcuts['tags']['shortcut']" v-on:click="multiButton({'function': 'clickButton', 'args': 'tags'});" id="tagsButton" v-if="shortcuts['tags']" class="toolbarButton">
      <span v-html="buttons.tags"></span>
      <span class="toolbartext">Toggle Tags</span>
    </button>
    <button v-hotkey="shortcuts['overlay']['shortcut']" v-if="!annotationurls && shortcuts['overlay']" id="overlayButton" v-on:click="multiButton({'function': 'createOverlay', 'args': ''});" class="toolbarButton">
      <span v-html="buttons.overlaybutton"></span>
      <span class="toolbartext">Toggle Overlays</span>
    </button>
    <button v-hotkey="shortcuts['layers']['shortcut']" v-if="shortcuts['layers']" id="layerButton" v-on:click="multiButton({'function': 'clickButton', 'args': 'layer'});" class="toolbarButton">
      <span v-html="buttons.layer"></span>
      <span class="toolbartext">View layers</span>
    </button>
    <button v-hotkey="shortcuts['zoomin']['shortcut']" v-if="shortcuts['zoomin']" v-on:click="multiButton({'function': 'zoom', 'args': 'in'});" id="zoomInButton" class="toolbarButton">
      <i class="fas fa-search-plus"></i>
      <span class="toolbartext">Zoom in</span>
    </button>
    <button v-hotkey="shortcuts['zoomout']['shortcut']" v-if="shortcuts['zoomout']" v-on:click="multiButton({'function': 'zoom', 'args': 'out'});" id="zoomOutButton" class="toolbarButton">
      <i class="fas fa-search-minus"></i>
      <span class="toolbartext">Zoom out</span>
    </button>
    <button v-hotkey="shortcuts['home']['shortcut']" v-if="shortcuts['home']" v-on:click="multiButton({'function': 'zoom', 'args': 'home'})" id="homeZoomButton" class="toolbarButton">
      <i class="fas fa-home"></i>
      <span class="toolbartext">View full image</span>
    </button>
    <button v-hotkey="shortcuts['prev']['shortcut']" v-if="!annotationurls && shortcuts['prev']" id="previousButton" v-on:click="multiButton({'function': 'next', 'args': 'prev'});" v-bind:class="{ 'inactive' : prev_inactive }" class="toolbarButton">
      <i class="fa fa-arrow-left"></i>
      <span class="toolbartext">Previous Annotation</span>
    </button>
    <button v-hotkey="shortcuts['next']['shortcut']" v-if="!annotationurls && shortcuts['next']" id="nextButton" v-on:click="multiButton({'function': 'next', 'args': 'next'});" v-bind:class="{ 'inactive' : next_inactive }" class="toolbarButton">
      <i class="fa fa-arrow-right"></i>
      <span class="toolbartext">Next Annotation</span>
    </button>
    <button v-hotkey="shortcuts['shortcut']['shortcut']" v-if="shortcuts['shortcut']" v-on:click="multiButton({'function': 'clickButton', 'args': 'keyboard'});"  id="keyboardShortcutsButton" class="toolbarButton">
      <span v-html="buttons.keyboard"></span>
      <span class="toolbartext">Toggle keyboard shortcuts</span>
    </button>
    <button v-hotkey="shortcuts['fullscreen']['shortcut']" v-if="shortcuts['fullscreen']" v-on:click="toggle_fullscreen()"  id="fullScreenButton" class="toolbarButton">
      <span v-html="buttons.expandbutton"></span>
      <span class="toolbartext">Toggle fullscreen</span>
    </button>
  </span>
  <span class="storyboard_containers">
    <div v-for="(anno, index) in anno_data" v-bind:key="anno" v-bind:style="{'width': widthvar}" style="position: relative; display: inline-block">
      <storyboard v-if="$props.annotationurls" v-bind:annotationurl="anno" v-bind:styling="stylingstring + 'index: ' + index" v-bind:ws="isws" v-bind:layers="customlayers" v-bind:manifesturl="manifesturl"></storyboard>
    </div>
    <div v-for="image in allimages" v-bind:key="image.id" v-bind:style="{'width': widthvar}" style="position: relative; display: inline-block; height: 600px">
      <div v-bind:id="image.id" class="seadragonbox"></div>
    </div>
  </span>
</div>
</template>
<script>
import storyboard from './storyboard'
import shared from './shared'
import openseadragon from 'openseadragon';
import Vue from 'vue';
import VueSimpleHotkey from 'vue-simple-hotkey';
Vue.use(VueSimpleHotkey);

export default {
    components: {
        storyboard
    },
    props: {
      'manifesturl':String,
      'annotationurls': String,
      'styling': String,
      'ws': String,
      'layers': String,
      'images': String
    },
    data: function() {
      return {
        tags: false,
        layerslist: false,
        customlayers: '[]',
        isws: '',
        prev_inactive: true,
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
          'layer': '<i class="fas fa-layer-group"></i>',
          'keyboard': '<i class="fas fa-keyboard"></i>'
        },
        settings: {},
        stylingstring: "",
        widthvar: "",
        multi: true,
        allimages: [],
        viewers: [],
        fullscreen: false,
        shortcuts: {}
      }
    },
    mounted(){
      this.createViewers();
    },
    created(){
      // get annotation urls
      var annotations = this.$props.annotationurls.split(";");
      this.anno_data = annotations.filter(function (el) {
        return el != null && el != '';
      });
      // Get settings and create styling string
      this.settings = shared.getsettings(this);
      this.settings.autorun_interval ? '' : this.settings.autorun_interval = 3;
      this.$props.ws ? this.ws = this.$props.ws : '';
      this.$props.layers ? this.customlayers = this.$props.layers : '';
      for (var key in this.settings){
        if (key != 'fullpage'){
          this.stylingstring += `${key}:${this.settings[key]};`
        }
      }
      // Get custom images
      if (this.$props.images){
        var images = this.$props.images.split(";").filter(function (el) {
          return el != null && el != '';
        });
        for (var img =0; img<images.length; img++){
          this.allimages.push({'id': images[img].split("/").slice(-2)[0], 'tile': images[img]})
        }
      }
      // get width calculated by number of annotations and images
      this.widthvar = `${parseInt((100/(this.anno_data.length + this.allimages.length)))}%`;
    },
    methods: {
      // move annotations and image viewers based on bounds
      moveArea (bounds, ignore) {
        for (var i=0; i<this.$children.length; i++){
          var viewer =this.$children[i].viewer;
          if (!this.settings.matchclick) {
            var conversion = viewer.world.getItemAt(0).imageToViewportRectangle(bounds.x, bounds.y, bounds.width, bounds.height);
            viewer.viewport.fitBoundsWithConstraints(conversion).ensureVisible();
          }
        }
        for (var j=0; j<this.viewers.length; j++){
          if (j != ignore){
            var imageviewer =this.viewers[j];
            var imageconversion = viewer.world.getItemAt(0).imageToViewportRectangle(bounds.x, bounds.y, bounds.width, bounds.height);
            imageviewer.viewport.fitBoundsWithConstraints(imageconversion).ensureVisible();
          }
        }
      },
      // set fullscreen. See vue-fullscreen for more info
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
      // Create OpenSeadragon viewers for custom images
      createViewers: function(){
        var fit = this.settings.fit == 'fill' ? true : false;
        for(var g=0; g<this.allimages.length; g++){
          var image = this.allimages[g];
          var tiles = shared.getTileFormat(image.tile);
          var osdsettings = {
                id: `${image.id}`,
                type: "image",
                nextButton: 'next',
                previousButton: 'previous',
                homeFillsViewer: fit,
                tileSources: `${tiles}`,
                showNavigator:  false,
                showNavigationControl: false,
                constrainDuringPan: true,
                visibilityRatio: 1
          };
          var viewer = openseadragon(osdsettings);
          this.viewers.push(viewer);
          var vue = this;
          viewer.addHandler('open', function(){
            // Set view fit
            for (var v=0; v<vue.viewers.length; v++){
              if (vue.settings.fit == 'horizontal') {
                vue.viewers[v].viewport.fitHorizontally();
              } else if(!fit) {
                vue.viewers[v].viewport.fitVertically();
              }
            }
          });
          var elements = this.allimages.map(element => element.id);
          //listeners for when viewer clicked, scrolled or dragged
          viewer.addHandler('canvas-click', function(event){
            var id = event.eventSource.id;
            var ignore = elements.indexOf(id);
            var bounds = event.eventSource.world.getItemAt(0).viewportToImageRectangle(event.eventSource.viewport.getConstrainedBounds());
            vue.moveArea(bounds, ignore);
          });
          viewer.addHandler('canvas-scroll', function(event){
            var id = event.eventSource.id;
            var ignore = elements.indexOf(id);
            var bounds = event.eventSource.world.getItemAt(0).viewportToImageRectangle(event.eventSource.viewport.getConstrainedBounds());
            vue.moveArea(bounds, ignore);
          });
          viewer.addHandler('canvas-drag', function(event){
            var id = event.eventSource.id;
            var ignore = elements.indexOf(id);
            var bounds = event.eventSource.world.getItemAt(0).viewportToImageRectangle(event.eventSource.viewport.getConstrainedBounds());
            vue.moveArea(bounds, ignore);
          });
        }
      },
      autoRunImages: function() {
        for (var k=0; k<this.viewers.length; k++){
          this.viewers[k].viewport.fitBounds(this.$children[0].viewer.viewport.getConstrainedBounds())
        }
        var data = this.$children[0]._data;
        this.buttons = data.buttons;
        this.prev_inactive = data.prev_inactive;
        this.next_inactive = data.next_inactive;
      },
      //Sends message to each storyboard viewer and each image viewer
      multiButton(e) {
        for (var i=0; i<this.$children.length; i++){
          this.$children[i].sendMessage(e);
        }
        for (var k=0; k<this.viewers.length; k++){
          this.viewers[k].viewport.fitBounds(this.$children[0].viewer.viewport.getConstrainedBounds())
        }
        var data = this.$children[0]._data;
        this.buttons = data.buttons;
        this.prev_inactive = data.prev_inactive;
        this.next_inactive = data.next_inactive;
      }
    }
}
</script>
