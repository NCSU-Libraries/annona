<template>
<div id="storyboard_viewer">
<div v-bind:id="seadragonid">
<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.5.0/css/all.css" integrity="sha384-B4dIYHKNBt8Bc12p+WXckhzcICo0wtJAoU8YZTY5qE0Id1GSseTk6S+L3BlXeVIU" crossorigin="anonymous">
<span id="header_toolbar">
<span style="float:right; margin:10px 0 0 20px">
<button v-on:click="full_screen()" class="nextButton"><i class="fas fa-expand-arrows-alt"></i></button>
<button v-on:click="zoom('in')" class="nextButton"><i class="fas fa-search-plus"></i></button>
<button v-on:click="zoom('out')" class="nextButton"><i class="fas fa-search-minus"></i></button>
<button v-on:click="zoom('home')" class="nextButton"><i class="fas fa-home"></i></button>
<button v-on:click="previous()" v-bind:class="{ inactive : prev_inactive }" class="nextButton"><i class="fa fa-arrow-left"></i></button>
<button v-on:click="next()" v-bind:class="{ inactive : next_inactive }" class="nextButton"><i class="fa fa-arrow-right"></i></button>
</span>
<div id="annotation" v-html="currentanno">
</div>
</span>
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
      position: 0,
      seadragonid: '',
      annotations: [],
      currentanno: '',
      prev_inactive: true,
      next_inactive: false,
      toolbar_id: ''
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
      this.toolbar_id = `${this.seadragonid}toolbarDiv`
    },
    full_screen: function(){
    if(this.viewer.isFullPage() == false){
      this.viewer.setFullScreen(true)
    } else {
      this.viewer.setFullScreen(false)
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
    next: function(){
      this.toggle_through()
      this.position += 1
    },
    previous: function(){
      this.position = this.position - 1
      this.toggle_through()
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
    toggle_through(){
    if (this.zoomsections[this.position] == undefined){
      this.viewer.viewport.fitVertically()
      this.currentanno = ''
    }else {
    var xywh = this.zoomsections[this.position].split(",")
    this.currentanno = unescape(encodeURIComponent(this.annotations[this.position]))
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
    }
  }
}

</script>
<style>
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
#storyboard_viewer > div {
  width: 60%;
  display: inline-block;
  height:600px;
}
#annotation {
  width: 100%;
  text-align: left;
}
</style>
