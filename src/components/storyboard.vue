<template>
<div id="storyboard_viewer" style="position:relative">
  <div style="position:relative; display:flex">
    <div v-bind:id="seadragonid" class="seadragonbox" style="position:relative">
      <span id="header_toolbar">
        <span style="float:right; margin:10px 0 0 20px">
        <button v-on:click="autoRun(5000)" class="toolbarButton"><span v-html="autorunbutton"></span></button>
        <button v-on:click="createOverlay()" class="toolbarButton"><span v-html="overlaybutton"></span></button>
        <button v-on:click="zoom('in')" class="toolbarButton"><i class="fas fa-search-plus"></i></button>
        <button v-on:click="zoom('out')" class="toolbarButton"><i class="fas fa-search-minus"></i></button>
        <button v-on:click="zoom('home')" class="toolbarButton"><i class="fas fa-home"></i></button>
        <button v-on:click="next('prev')" v-bind:class="{ 'inactive' : prev_inactive }" class="toolbarButton"><i class="fa fa-arrow-left"></i></button>
        <button v-on:click="next('next')" id="next" v-bind:class="{ 'inactive' : next_inactive }" class="toolbarButton"><i class="fa fa-arrow-right"></i></button>
        </span>
      </span>
    </div>
    <div id="annotation" class="annotation" v-show="prev_inactive != true && next_inactive != true && isclosed != true">
      <span style="display:flex;">
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
      autorunbutton: '<i class="fas fa-magic"></i>',
      overlaybutton: '<i class="fas fa-toggle-on"></i>'
    }
  },
  created() {
    this.seadragonid = this.annotationlist.split("/").pop().replace("-list", "").replace(".json","");
    axios.get(this.annotationlist).then(response => {
      var anno = response.data.resources ? response.data.resources : response.data.items ? response.data.items : response.data;
      var on_dict = this.on_structure(anno[0]);
      if (this.manifesturl == undefined){
        var manifest_dict = response.data['dcterms:isPartOf'] ? response.data['dcterms:isPartOf'] : on_dict.within
        manifest_dict = manifest_dict ? manifest_dict : response.data['partOf'];
        manifest_dict = manifest_dict ? manifest_dict : response.data['within']['within'];
        var manifestlink =  manifest_dict['id'] ? manifest_dict['id'] : manifest_dict['@id'];
      } else {
        var manifestlink = this.manifesturl;
      }
      var target = anno[0].target != undefined ? anno[0].target : on_dict.full
      target = target ? target : on_dict;
      target = Object.keys(target).indexOf('id') != -1 ? target.id : target;
      var canvas = target.split("#x")[0]
      var resources = response.data.resources ? response.data.resources : response.data.items;
      for (var i = 0; i < resources.length; i++){
        var chars = resources[i].resource != Array ? resources[i].resource : resources[i].resource[0];
        chars = chars ? chars : resources[i].body;
        if (typeof this.on_structure(resources[i]).selector != 'undefined') {
          var ondict = this.on_structure(resources[i])
          var mirador = ondict.selector.value ? ondict.selector.value : ondict.selector.default.value;
        }
        var section = mirador ? mirador : resources[i].on ? resources[i].on : resources[i].target.id;
        if (mirador){
          var svg_elem = document.createElement( 'html' )
          svg_elem.innerHTML = ondict.selector.item.value;
          var type = svg_elem.getElementsByTagName('path')[0].getAttribute('id').split("_")[0]
        } else {
          var type = 'rect'
        }
        var content = ''
        var tags = []
        if (chars[0] != undefined && chars[0].length == undefined){
          for (var e=0; e<chars.length; e++){
            if (chars[e]['@type'].toLowerCase().indexOf('tag') > -1) {
              tags.push(chars[e].chars)
            }else {
              content += `<div class=${chars[e]['@type'].replace("oa:", "").toLowerCase()}>
              ${chars[e].chars}</div>`
            }
          }
        } else {
          content = chars.chars ? chars.chars : chars.value;
        }
        this.annotations.push({'content':content, 'tags':tags})
        this.zoomsections.push({'section':section.split("=").pop(), 'type':type})
      }
      axios.get(manifestlink).then(canvas_data => {
        var label = canvas_data.data.label;
        label = label.en ? label.en[0] : label;
        this.title = label.split(" ").length > 6 ? label.split(" ").slice(0,6).join(" ") + ' ...' : label;
        var canvases = canvas_data.data.sequences[0].canvases;
        for (var i = 0; i< canvases.length; i++){
          if (canvases[i]['@id'] == canvas) {
            var imgResource = canvases[i].images[0].resource
            var canvas_tile = imgResource.service['@id'].split("full")[0]
            canvas_tile += canvas_tile.slice(-1) != '/' ? "/" : '';
            this.seadragontile = canvas_tile + "info.json"
          }
        }
      this.createViewer()
      this.anno_elem = document.getElementById(`${this.seadragonid}`);
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
    hide: function(show){
      this.anno_elem.parentElement.getElementsByClassName('annotation')[0].removeAttribute('style')
      if(this.ishidden == true){
        this.ishidden = false;

      } else {
        this.ishidden = true;
      }
    },
    on_structure: function(anno){
      if (typeof anno['on'] == 'undefined'){
        return 'undefined'
      }
      else if (typeof anno['on'][0] != 'undefined' && typeof anno['on'][0] != 'string'){
        return anno['on'][0]
      } else {
        return anno['on']
      }
    },
    zoom: function(inorout){
      var oldzoom = this.viewer.viewport.getZoom()
      var minzoom = parseInt(this.viewer.viewport.getMinZoom())
      var maxzoom = parseInt(this.viewer.viewport.getMaxZoom())
      var zoomfactor = .8
      if (inorout == 'in' && maxzoom != parseInt(oldzoom)){
        var zoomfactor = oldzoom + zoomfactor
      } else if (inorout == 'out' && minzoom != parseInt(oldzoom)) {
        var zoomfactor = oldzoom - zoomfactor
      } else if (inorout == 'home') {
        var zoomfactor = this.viewer.viewport.getHomeZoom()
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
        this.overlaybutton = '<i class="fas fa-toggle-off"></i>'
      } else {
        var box_elements = document.getElementsByClassName("overlay")
        if (box_elements[0].style.display != 'none'){
          var display_setting = 'none'
          this.overlaybutton = '<i class="fas fa-toggle-on"></i>'
        } else {
          var display_setting = 'block'
          this.overlaybutton = '<i class="fas fa-toggle-off"></i>'
        }
        for (var a=0; a<box_elements.length; a++){
          box_elements[a].style.display = display_setting;
        }
      }
    },
    addTracking: function(node, rect, position, functions){
      new openseadragon.MouseTracker({
        element: node,
        clickHandler: function(e) {
          functions.position = position
          functions.next()
        }
      }).setTracking(true)
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
      var length = this.zoomsections.length;
      if (this.isautorunning == ''){
        var this_functions = this;
        this.isautorunning = setInterval(function() {
          this_functions.next('next')
          if(this_functions.position == length){
            this_functions.position = 0
          }
        }, interval)
        this.autorunbutton = '<i class="fas fa-stop-circle"></i>'
      } else {
        clearInterval(this.isautorunning);
        this.isautorunning = '';
        this.autorunbutton = '<i class="fas fa-magic"></i>'
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
@import url('https://use.fontawesome.com/releases/v5.5.0/css/all.css');
$pin_size: 25;
$overlay_color: lightblue;
$seadragon_width: 100%;
$seadrgon_height: 100vh;
$mid_pin: $pin_size/2 + px;
$pin_font: $pin_size + px;

.inactive {
  color: red;
  pointer-events: none;
}
.toolbarButton {
  font-size: 22px;
}

#storyboard_viewer {
  padding-top: 50px;
}

.seadragonbox {
  width: $seadragon_width;
  display: inline-block;
  height:$seadrgon_height;
}
#annotation {
  width: 10%;
  resize: both;
  border: 2px solid black;
  background: white;
  position: absolute;
  top: 75px;
  z-index: 2;
  max-width: 100%;
  max-height: 100%;
  height: auto;
  overflow: scroll;
  padding: 2px;
  margin-left: 20px;
  word-wrap: break-word;
}

#annotation_text {
  word-wrap: break-word;
  height: auto;
  max-height: 450px;
}

#annotation_text img {
    width: 100%;
    height: 100%;
    object-fit: scale-down;
}

.fullscreen {
display: block;
padding-left: 20px;
width: 87%;
}
.window {
display: none;
}
.box {
  border: 2px solid $overlay_color;
}

.box:hover {
  background:grey;
   opacity: .4;
}

.overlay {
color: $overlay_color;
font-size: $pin_font;
}
.close {
  display: none;
}
.close_button {
  padding-top: 5px;
  padding-left: 5px;
}

.map-marker {
position:absolute;
bottom:0;
left: calc(50% - #{$mid_pin});
}

.fullscreen {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 100%;
  background: #000;
  border: 1px solid #000;
}

.tags {
  font-size: smaller;
  font-style: italic;
}
</style>
