<template>
<div id="storyboard_viewer" style="position:relative">
  <div style="position:relative; display:flex">
    <div v-bind:id="seadragonid" class="seadragonbox" style="position:relative">
      <span id="header_toolbar">
        <span style="float:right; margin:10px 0 0 20px">
        <button v-on:click="createOverlay()" class="nextButton"><i class="fas fa-toggle-on"></i></button>
        <button v-on:click="zoom('in')" class="nextButton"><i class="fas fa-search-plus"></i></button>
        <button v-on:click="zoom('out')" class="nextButton"><i class="fas fa-search-minus"></i></button>
        <button v-on:click="zoom('home')" class="nextButton"><i class="fas fa-home"></i></button>
        <button v-on:click="next('prev')" v-bind:class="{ 'inactive' : prev_inactive }" class="nextButton"><i class="fa fa-arrow-left"></i></button>
        <button v-on:click="next('next')" v-bind:class="{ 'inactive' : next_inactive }" class="nextButton"><i class="fa fa-arrow-right"></i></button>
        </span>
        <span id="title" style="display:inline-block; width: 60%; margin-top: 15px;">{{title}}</span>
      </span>
    </div>
    <div id="annotation" class="annotation" v-show="prev_inactive != true && next_inactive != true && isclosed != true">
      <i class="fas fa-times close_button" v-on:click="close()"></i>
      <div id="annotation_text"  v-html="currentanno"></div>
    </div>
  </div>
</div>
</template>
<script>
import axios from 'axios';
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
      isclosed: false
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
        var content = ''
        if (chars[0] != undefined && chars[0].length == undefined){
          for (var e=0; e<chars.length; e++){
            content += `<div class=${chars[e]['@type'].replace("oa:", "").toLowerCase()}>
            ${chars[e].chars}</div>`
          }
        } else {
          content = chars.chars ? chars.chars : chars.value;
        }
        this.annotations.push(content)
        this.zoomsections.push(section.split("=").pop())
      }
      axios.get(manifestlink).then(canvas_data => {
        var label = canvas_data.data.label;
        label = label.en ? label.en[0] : label;
        this.title = label.split(" ").length > 5 ? title + ' ...' : title;
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
          var xywh = this.zoomsections[i].split(",")
          var rect = this.viewer.world.getItemAt(0).imageToViewportRectangle(parseInt(xywh[0]), parseInt(xywh[1]), parseInt(xywh[2]), parseInt(xywh[3]))
          var elem = document.createElement('div');
          elem.id = 'box';
          elem.className = 'box';
          this.viewer.addOverlay({
            element: elem,
            location: rect
          })
          this.addTracking(elem, rect, i, this)
        }
        this.first = false;
      } else {
        var box_elements = document.getElementsByClassName("box")
        if (box_elements[0].style.display != 'none'){
          var display_setting = 'none'
        } else {
          var display_setting = 'block'
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
        var xywh = this.zoomsections[this.position].split(",")
        this.currentanno = this.annotations[this.position];
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
    }
  },
}
</script>
<style>
@import url('https://use.fontawesome.com/releases/v5.5.0/css/all.css');

.tag {
  background: #92D1E8;
  border-radius: 3px 0 0 3px;
  color: black;
  display: inline-block;
  height: 26px;
  line-height: 26px;
  padding: 0 20px 0 23px;
  position: relative;
  margin: 0 10px 10px 0;
  text-decoration: none;
  -webkit-transition: color 0.2s;
}
.tag::before {
  background: #fff;
  border-radius: 10px;
  box-shadow: inset 0 1px rgba(0, 0, 0, 0.25);
  content: '';
  height: 6px;
  left: 10px;
  position: absolute;
  width: 6px;
  top: 10px;
}

.tag::after {
  background: #fff;
  border-bottom: 13px solid transparent;
  border-left: 10px solid #92D1E8;
  border-top: 13px solid transparent;
  content: '';
  position: absolute;
  right: 0;
  top: 0;
}
.inactive {
  color: red;
  pointer-events: none;
}
.nextButton {
  font-size: 22px;
}

#storyboard_viewer {
  padding-top: 50px;
}

.seadragonbox {
  width: 60%;
  display: inline-block;
  height:600px;
}
#annotation {
  width: 10%;
  resize: both;
  border: 2px solid black;
  background: white;
  position: absolute;
  top: 60px;
  z-index: 2;
  height: 250px;
  overflow: scroll;
  padding: 2px;
  margin-left: 20px;
  word-wrap: break-word;
}

#annotation_text {
  word-wrap: break-word;
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
  border: 2px solid lightblue;
}

.box:hover {
  background:grey;
   opacity: .4;
}
.close {
  display: none;
}
.close_button {
  float: left;
  padding-top: 5px;
  padding-left: 5px;
}
</style>
