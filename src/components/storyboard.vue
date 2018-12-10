<template>
<div id="storyboard_viewer" style="position:relative">
<div style="position:relative; display:flex">
<div v-bind:id="seadragonid" class="seadragonbox" style="position:relative">
<span id="header_toolbar">
<span style="float:right; margin:10px 0 0 20px">
<button v-on:click="createOverlay()" class="nextButton"><i class="fas fa-toggle-on"></i></button>
<button v-on:click="full_screen()" class="nextButton"><i class="fas fa-expand-arrows-alt"></i></button>
<button v-on:click="zoom('in')" class="nextButton"><i class="fas fa-search-plus"></i></button>
<button v-on:click="zoom('out')" class="nextButton"><i class="fas fa-search-minus"></i></button>
<button v-on:click="zoom('home')" class="nextButton"><i class="fas fa-home"></i></button>
<button v-on:click="next('prev')" v-bind:class="{ 'inactive' : prev_inactive }" class="nextButton"><i class="fa fa-arrow-left"></i></button>
<button v-on:click="next('next')" v-bind:class="{ 'inactive' : next_inactive }" class="nextButton"><i class="fa fa-arrow-right"></i></button>
</span>
<div id="fullscreen_annotation" class="window" v-html="currentanno">
</div>
</span>

</div>
<div id="annotation" v-bind:class="[ currentanno ? 'active' : 'inactive' ]" class="annotation">
<i class="fas fa-times close_button" v-on:click="close($event)"></i>
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
  props: ['annotationlist', 'manifesturl'],
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
      isfullscreen: false
    }
  },
  created() {
  this.seadragonid = this.annotationlist.split("/").pop().replace("-list", "").replace(".json","");
  axios.get(this.annotationlist).then(response => {
    var anno = response.data.resources ? response.data.resources : response.data;
    var on_dict = this.on_structure(anno[0]);
    if (this.manifesturl == undefined){
      var manifest_dict = response.data['dcterms:isPartOf'] ? response.data['dcterms:isPartOf'] : on_dict.within ? on_dict.within : response.data['within']['within'];
      var manifestlink =  manifest_dict['id'] ? manifest_dict['id'] : manifest_dict['@id'];
    } else {
      var manifestlink = this.manifesturl;
    }
    var target = anno[0].target != undefined ? anno[0].target : on_dict.full ? on_dict.full : on_dict;
    var canvas = target.split("#x")[0]
    axios.get(manifestlink).then(canvas_data => {
    var canvases = canvas_data.data.sequences[0].canvases;
    for (var i = 0; i< canvases.length; i++){
      if (canvases[i]['@id'] == canvas) {
      var imgResource = canvases[i].images[0].resource
      this.seadragontile = imgResource.service['@id'].split("full")[0]+ "/info.json"
      }
    }
    var resources = response.data.resources;
      for (var i = 0; i < resources.length; i++){
        var chars = resources[i].resource != Array ? resources[i].resource : resources[i].resource[0];
        if (typeof this.on_structure(resources[i]).selector != 'undefined') {
          var ondict = this.on_structure(resources[i])
          var mirador = ondict.selector.value ? ondict.selector.value : ondict.selector.default.value;
        }
        var section = mirador ? mirador : resources[i].on;
        var content = ''
        if (chars[0] != undefined && chars[0].length == undefined){
          for (var e=0; e<chars.length; e++){
            content += `<div class=${chars[e]['@type'].replace("oa:", "").toLowerCase()}>
            ${chars[e].chars}</div>`
          }
        } else {
          content = chars.chars
        }
        this.annotations.push(content)
        this.zoomsections.push(section.split("=").pop())
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
      var seadragonid = this.seadragonid
      this.viewer.addHandler('full-screen',function(fulldata){
        if(fulldata.fullScreen){
          var elements = document.getElementById(seadragonid).getElementsByClassName("window")
          elements[0].classList.add("fullscreen")
          elements[0].classList.remove("window")
        } else {
          var elements = document.getElementsByClassName("fullscreen")
          elements[0].classList.add("window")
          elements[0].classList.remove("fullscreen")
          this.isfullscreen = false;
        }
      })
      this.toolbar_id = `${this.seadragonid}toolbarDiv`
    },
    full_screen: function(){
    if(this.viewer.isFullPage() == false){
      this.viewer.setFullScreen(true);
      this.isfullscreen = true;
    } else {
      this.viewer.setFullScreen(false)
      this.isfullscreen = false;
    }

    },
    close: function(event){
        event.target.parentElement.classList.add('inactive')
        event.target.parentElement.classList.remove('active')
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
    createOverlay(){
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
    addTracking(node, rect, position, functions){
      new openseadragon.MouseTracker({
        element: node,
        clickHandler: function(e) {
          functions.position = position
          functions.next()
        }
      }).setTracking(true)
    },
    goToPoint: function(rect){
      this.viewer.viewport.fitBoundsWithConstraints(rect).ensureVisible()
    },
    next(nextorprev){
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
    }else {
    var xywh = this.zoomsections[this.position].split(",")
    this.currentanno = this.annotations[this.position];
    var rect = this.viewer.world.getItemAt(0).imageToViewportRectangle(parseInt(xywh[0]), parseInt(xywh[1]), parseInt(xywh[2]), parseInt(xywh[3]))
    this.viewer.viewport.fitBoundsWithConstraints(rect).ensureVisible()
    }
    if (this.position == this.zoomsections.length){
      this.next_inactive = true;
      this.position -= 1
    } else {
      this.next_inactive = false;
    } if (this.position == -1){
      this.prev_inactive = true;
    } else {
      this.prev_inactive = false;
    }
    if (this.position != this.zoomsections.length && this.position != -1){
      var anno_elem = document.getElementById(`${this.seadragonid}`).offsetParent.getElementsByClassName('annotation')[0]
      anno_elem.classList.remove('inactive')
      anno_elem.classList.add('active')
    }
    }
  }
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
#annotation.active {
  width: 10%;
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
  display: inline-block;
}

#annotation_text img {
    width: 100%;
    height: 100%;
    object-fit: scale-down;
}

#annotation.inactive {
  display: none;
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
