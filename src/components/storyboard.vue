<template>
<div id="storyboard_viewer" v-bind:class="[!settings.fullpage && !fullscreen ? 'storyboard_viewer' : 'fullpage']">
  <div style="position:relative; display:flex">
    <div v-bind:id="seadragonid" v-bind:class="[!settings.fullpage && !fullscreen ? 'seadragonbox' : 'seadragonboxfull']" style="position:relative">
      <span id="header_toolbar" v-show="!settings.hide_toolbar || settings.hide_toolbar != true || settings.hide_toolbar == true && fullscreen == false ">
        <span style="float:right; margin:10px 0 0 20px">
        <button v-on:click="autoRun(settings.autorun_interval)" class="toolbarButton"><span v-html="autorunbutton"></span></button>
        <button v-on:click="createOverlay()" class="toolbarButton"><span v-html="overlaybutton"></span></button>
        <button v-on:click="zoom('in')" class="toolbarButton"><i class="fas fa-search-plus"></i><span class="toolbartext">Zoom in</span></button>
        <button v-on:click="zoom('out')" class="toolbarButton"><i class="fas fa-search-minus"></i><span class="toolbartext">Zoom out</span></button>
        <button v-on:click="zoom('home')" class="toolbarButton"><i class="fas fa-home"></i><span class="toolbartext">View full image</span></button>
        <button v-on:click="next('prev')" v-bind:class="{ 'inactive' : prev_inactive }" class="toolbarButton"><i class="fa fa-arrow-left"></i><span class="toolbartext">Previous Annotation</span></button>
        <button v-on:click="next('next')" id="next" v-bind:class="{ 'inactive' : next_inactive }" class="toolbarButton"><i class="fa fa-arrow-right"></i><span class="toolbartext">Next Annotation</span></button>
        <button v-on:click="toggle_fullscreen()" class="toolbarButton"><span v-html="expandbutton"></span></button>
        </span>
      </span>
    </div>
    <div id="annotation" class="annotation" v-show="prev_inactive != true && next_inactive != true && isclosed != true">
      <span v-show="!settings.hide_annocontrols && settings.hide_annocontrols != true" id="annotation_controls" style="display:flex;">
      <i class="fas fa-times close_button" v-on:click="close()"></i>
      <i class="fas fa-caret-square-up close_button" v-on:click="hide()" v-if="ishidden == false"></i>
      <i class="fas fa-caret-square-down close_button" v-on:click="hide()" v-if="ishidden"></i>
      </span>
      <div id="annotation_excerpt" style="height: auto;" v-if="ishidden" v-html="$options.filters.truncate(currentanno, 2)"></div>
      <div id="annotation_text" v-html="currentanno" v-if="ishidden == false"></div>
    </div>
  </div>
</div>
</template>
<script>
import axios from 'axios';
import truncate from 'truncate-html';
import openseadragon from 'openseadragon';
import fullscreen from 'vue-fullscreen'
import Vue from 'vue'
import shared from './shared'

Vue.use(fullscreen)

export default {
  name: 'storyboard',
  props: {
    'annotationlist':String,
    'manifesturl':String
  },
  data: function() {
    return {
      zoomsections: [],
      seadragontile: '',
      position: -1,
      seadragonid: '',
      annotations: [],
      currentanno: '',
      prev_inactive: true,
      next_inactive: false,
      toolbar_id: '',
      first: true,
      title: '',
      isclosed: false,
      ishidden: false,
      anno_elem: '',
      isautorunning: '',
      autorunbutton: '<i class="fas fa-magic"></i><span class="toolbartext">Auto run</span>',
      overlaybutton: '<i class="fas fa-toggle-on"></i><span class="toolbartext">Show annotations</span>',
      settings: {},
      expandbutton: '<i class="fas fa-expand"></i><span class="toolbartext">View Full Screen</span>',
      fullscreen: false
    }
  },
  created() {
    this.seadragonid = this.annotationlist.split("/").pop().replace("-list", "").replace(".json","");
    axios.get(this.annotationlist).then(response => {
      var anno = response.data.resources ? response.data.resources : response.data.items ? response.data.items : response.data;
      var on_dict = shared.on_structure(anno[0]);
      var manifestlink = shared.manifestlink(this.manifesturl, anno[0], response.data);

      var target = anno[0].target != undefined ? anno[0].target : on_dict.full;
      target = target ? target : on_dict;
      target = Object.keys(target).indexOf('id') != -1 ? target.id : target;
      var canvas = target.split("#x")[0]
      var resources = response.data.resources ? response.data.resources : response.data.items;
      for (var i = 0; i < resources.length; i++){
        var ondict = shared.on_structure(resources[i])
        if (typeof ondict.selector != 'undefined') {
          var mirador = ondict.selector.value ? ondict.selector.value : ondict.selector.default.value;
          mirador = mirador.split("=").slice(-1)[0]
        }
        var canvasId = resources[i].target != undefined ? resources[i].target : ondict.full ? ondict.full : ondict;
        var section = mirador ? mirador : shared.canvasRegion(canvasId)['canvasRegion'];
        var type;
        if (mirador && ondict.selector.item != undefined){
          var svg_elem = document.createElement( 'html' )
          svg_elem.innerHTML = ondict.selector.item.value;
          type = svg_elem.getElementsByTagName('path')[0].getAttribute('id').split("_")[0]
        } else {
          type = 'rect'
        }
        var content_data = shared.chars(resources[i])
        content_data['textual_body'] = content_data['textual_body'] + `<div id="ocr">${decodeURIComponent(escape(shared.ocr(resources[i])))}</div>`
        this.annotations.push({'content': content_data['textual_body'], 'tags':content_data['tags']})
        this.zoomsections.push({'section':section, 'type':type})
      }
      axios.get(manifestlink).then(canvas_data => {
        var label = canvas_data.data.label;
        if (label != undefined){
          label = label['en'] ? label.en[0] : label['@value'] ?  label['@value']  : label;
          this.title = truncate(label, 6, { byWords: true })
        }
        var canvases = canvas_data.data.sequences[0].canvases;
        for (var i = 0; i< canvases.length; i++){
          if (canvases[i]['@id'].replace("https", "http") == canvas.replace("https", "http")) {
            var imgResource = canvases[i].images[0].resource
            var canvas_tile = imgResource.service['@id'].split("full")[0]
            canvas_tile += canvas_tile.slice(-1) != '/' ? "/" : '';
            this.seadragontile = canvas_tile + "info.json"
          }
        }
      this.createViewer()

      this.anno_elem = document.getElementById(`${this.seadragonid}`);
      if (document.getElementById("config") != null){
        this.settings = JSON.parse(document.getElementById("config").innerHTML);
      }
      this.settings.autorun_interval = this.settings.autorun_interval ? this.settings.autorun_interval : 3;

      if(this.settings.autorun_onload){
        this.anno_elem.addEventListener("load", this.autoRun(this.settings.autorun_interval));
      }
    });
  });
  },
  methods: {
    createViewer: function(){
      this.viewer = openseadragon({
            id: `${this.seadragonid}`,
            type: "image",
            nextButton: 'next',
            previousButton: 'previous',
            tileSources: `${this.seadragontile}`,
            toolbar: `${this.toolbar_id}`,
            showNavigator:  false,
            showNavigationControl: false
      });
    },
    close: function(){
      this.isclosed = true;
    },
    hide: function(){
      this.anno_elem.parentElement.getElementsByClassName('annotation')[0].removeAttribute('style')
      if(this.ishidden == true){
        this.ishidden = false;

      } else {
        this.ishidden = true;
      }
    },
    zoom: function(inorout){
      var oldzoom = this.viewer.viewport.getZoom()
      var minzoom = parseInt(this.viewer.viewport.getMinZoom())
      var maxzoom = parseInt(this.viewer.viewport.getMaxZoom())
      var zoomfactor = .8
      if (inorout == 'in' && maxzoom != parseInt(oldzoom)){
        zoomfactor = oldzoom + zoomfactor
      } else if (inorout == 'out' && minzoom != parseInt(oldzoom)) {
        zoomfactor = oldzoom - zoomfactor
      } else if (inorout == 'home') {
        zoomfactor = this.viewer.viewport.getHomeZoom()
      } else {
        return 0
      }
      this.viewer.viewport.zoomTo(zoomfactor)
    },
    createOverlay: function(){
      if(this.first == true){
        for (var i=0; i<this.zoomsections.length; i++){
          var xywh = this.zoomsections[i]['section'].split(",")
          var rect = this.viewer.world.getItemAt(0).imageToViewportRectangle(parseInt(xywh[0]), parseInt(xywh[1]), parseInt(xywh[2]), parseInt(xywh[3]))
          var elem = document.createElement('div');
          if (this.zoomsections[i]['type'] != 'pin'){
            elem.id = 'box';
            elem.className = 'box overlay';
          } else {
            elem.innerHTML = '<i class="fas fa-map-marker-alt map-marker"></i>'
            elem.className = 'overlay';
          }
          this.viewer.addOverlay({
            element: elem,
            location: rect
          })
          this.addTracking(elem, rect, i, this)
        }
        this.first = false;
        this.overlaybutton = '<i class="fas fa-toggle-off"></i><span class="toolbartext">Hide annotations</span>'
      } else {
        var box_elements = document.getElementsByClassName("overlay")
        var display_setting;
        if (box_elements[0].style.display != 'none'){
          display_setting = 'none'
          this.overlaybutton = '<i class="fas fa-toggle-on"></i><span class="toolbartext">Show annotations</span>'
        } else {
          display_setting = 'block'
          this.overlaybutton = '<i class="fas fa-toggle-off"></i><span class="toolbartext">Hide annotations</span>'
        }
        for (var a=0; a<box_elements.length; a++){
          box_elements[a].style.display = display_setting;
        }
      }
    },
    addTracking: function(node, rect, position, functions){
      new openseadragon.MouseTracker({
        element: node,
        clickHandler: function() {
          functions.position = position
          functions.next()
        }
      }).setTracking(true)
    },
    toggle_fullscreen: function(){
      this.$fullscreen.toggle(this.$el, {
        wrap: false,
        callback: this.fullscreenChange
      })

    },
    fullscreenChange (fullscreen) {
      if(fullscreen){
        this.expandbutton = '<i class="fas fa-compress"></i><span class="toolbartext">Exit Full Screen</span>';
      } else {
        this.expandbutton = '<i class="fas fa-expand"></i><span class="toolbartext">View Full Screen</span>';
      }
      this.fullscreen = fullscreen
    },
    next: function(nextorprev){
      this.isclosed = false;
      if (nextorprev == 'prev'){
        this.position -= 1
      } else if (nextorprev == 'next') {
        this.position += 1
      } else {
        this.position = this.position
      }
      if (this.zoomsections[this.position] == undefined){
        this.viewer.viewport.fitVertically()
        this.currentanno = ''
      } else {
        var xywh = this.zoomsections[this.position]['section'].split(",")
        var anno_section = this.annotations[this.position];
        this.currentanno = `${anno_section['content']}${anno_section['tags'].length > 0 ? `<span class="tags">Tags: ${anno_section['tags'].join(", ")}</div>` : ''}`
        var rect = this.viewer.world.getItemAt(0).imageToViewportRectangle(parseInt(xywh[0]), parseInt(xywh[1]), parseInt(xywh[2]), parseInt(xywh[3]))
        this.viewer.viewport.fitBoundsWithConstraints(rect).ensureVisible()
      }
      if (this.position == this.zoomsections.length){
        this.next_inactive = true;
      } else {
        this.next_inactive = false;
      } if (this.position == -1){
        this.prev_inactive = true;
      } else {
        this.prev_inactive = false;
      }
    },
    autoRun: function(interval){
      interval = interval * 1000;
      var length = this.zoomsections.length;
      if (this.isautorunning == ''){
        if (this.position == length){
          this.position = -1;
        }
        var this_functions = this;
        this.isautorunning = setInterval(function() {
          this_functions.next('next')
          if(this_functions.position == length){
            this_functions.position = -1;
          }
        }, interval)
        this.autorunbutton = '<i class="fas fa-stop-circle"></i><span class="toolbartext">Stop auto run</span>'
      } else {
        clearInterval(this.isautorunning);
        this.isautorunning = '';
        this.autorunbutton = '<i class="fas fa-magic"></i><span class="toolbartext">Auto run</span>'
      }
    }
  },
  filters: {
    truncate: function(string, words_length) {
      return truncate(string, words_length, { byWords: true })
    }
  }
}
</script>
<style lang="scss">
@import '../iiif-annotation.scss'
</style>
