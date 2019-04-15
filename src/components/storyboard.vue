<template>
<div id="storyboard_viewer" v-bind:class="[!settings.fullpage && !fullscreen ? 'storyboard_viewer' : 'fullpage']">
  <div style="position:relative; display:flex">
    <div v-bind:id="seadragonid" v-bind:class="[!settings.fullpage && !fullscreen ? 'seadragonbox' : 'seadragonboxfull']" style="position:relative">
      <span id="header_toolbar" v-show="!settings.hide_toolbar || settings.hide_toolbar !== true || settings.hide_toolbar === true && fullscreen === false ">
        <span style="float:right; margin:10px 0 0 20px">
        <button v-on:click="showtags()" v-if="Object.keys(tagslist).length > 0 && settings.showtags !== false" class="toolbarButton"><span v-html="buttons.tags"></span></button>
        <button v-show="!annotationurl" v-on:click="autoRun(settings.autorun_interval)" class="toolbarButton"><span v-html="buttons.autorunbutton"></span></button>
        <button v-show="!annotationurl" v-on:click="createOverlay()" class="toolbarButton"><span v-html="buttons.overlaybutton"></span></button>
        <button v-on:click="zoom('in')" class="toolbarButton"><i class="fas fa-search-plus"></i><span class="toolbartext">Zoom in</span></button>
        <button v-on:click="zoom('out')" class="toolbarButton"><i class="fas fa-search-minus"></i><span class="toolbartext">Zoom out</span></button>
        <button v-on:click="zoom('home')" class="toolbarButton"><i class="fas fa-home"></i><span class="toolbartext">View full image</span></button>
        <button v-show="!annotationurl" v-on:click="next('prev')" v-bind:class="{ 'inactive' : prev_inactive }" class="toolbarButton"><i class="fa fa-arrow-left"></i><span class="toolbartext">Previous Annotation</span></button>
        <button v-show="!annotationurl" v-on:click="next('next')" id="next" v-bind:class="{ 'inactive' : next_inactive }" class="toolbarButton"><i class="fa fa-arrow-right"></i><span class="toolbartext">Next Annotation</span></button>
        <button v-on:click="toggle_fullscreen()" class="toolbarButton"><span v-html="buttons.expandbutton"></span></button>
        </span>
      </span>
    </div>
    <div v-bind:id="seadragonid + '_annotation'" class="annotation" v-show="istags || prev_inactive !== true && next_inactive !== true && isclosed !== true">
      <span v-show="!settings.hide_annocontrols && settings.hide_annocontrols !== true" id="annotation_controls">
      <span class="close_button" ><i class="fas fa-times" v-on:click="close()"></i></span>
      <span v-html="buttons.hide_button" class="close_button"  v-on:click="hide()"></span>
      <span v-html="buttons.playpause" class="close_button" v-on:click="playpause()" v-if="settings.tts"></span>
      <span v-html="buttons.tags"  v-if="Object.keys(tagslist).length > 0 && settings.showtags !== false" class="close_button" v-on:click="showtags()"></span>
      </span>
      <div id="tags" v-if="istags">
        <div v-for="(value, key) in tagslist" v-bind:id="key + '_tags'" v-bind:key="key">
          <a v-bind:style="'color: ' + value" v-on:click="hideshowalltags(key)">{{key.split("_").join(" ")}}</a>
        </div>
      </div>
      <div id="annotation_excerpt" style="height: auto;" v-if="ishidden && !istags" v-html="$options.filters.truncate(currentanno, 2)"></div>
      <div id="annotation_text" v-html="currentanno" v-if="ishidden === false && !istags"></div>
    </div>
  </div>
</div>
</template>

<script>
import axios from 'axios';
import truncate from 'truncate-html';
import openseadragon from 'openseadragon';
import fullscreen from 'vue-fullscreen';
import Vue from 'vue';
import shared from './shared';

Vue.use(fullscreen);

export default {
  name: 'storyboard',
  props: {
    'annotationlist':String,
    'manifesturl':String,
    'annotationurl': String,
    'styling': String
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
      title: '',
      isclosed: false,
      ishidden: false,
      mapmarker: '<i class="fas fa-map-marker-alt map-marker"></i>',
      anno_elem: '',
      istags: false,
      isautorunning: '',
      buttons: {
        'autorunbutton': '<i class="fas fa-magic"></i><span class="toolbartext">Auto run</span>',
        'overlaybutton': '<i class="fas fa-toggle-on"></i><span class="toolbartext">Show annotations</span>',
        'expandbutton' : '<i class="fas fa-expand"></i><span class="toolbartext">View Full Screen</span>',
        'hide_button' : '<i class="fas fa-caret-up"></i>',
        'playpause': '<i class="fas fa-play"></i>',
        'tags': '<i class="fas fa-tags"></i>'
      },
      settings: {},
      fullscreen: false,
      tagslist: {}
    }
  },
  created() {
    var annotationurl = this.annotationlist ? this.annotationlist : this.annotationurl;
    this.seadragonid = annotationurl.replace(/\/\s*$/, "").split("/").pop().replace("-list", "").replace(".json","");
    axios.get(annotationurl).then(response => {
      var anno = response.data.resources ? response.data.resources : response.data.items ? response.data.items : response.data;
      anno = [].concat(anno);
      var manifestlink = shared.manifestlink(this.manifesturl, anno[0], response.data);
      for (var i = 0; i < anno.length; i++){
        var ondict = shared.on_structure(anno[i]);
        if (typeof ondict.selector !== 'undefined') {
          var mirador = ondict.selector.value ? ondict.selector.value : ondict.selector.default.value;
          mirador = mirador.split("=").slice(-1)[0];
        }
        var canvasId = anno[i].target !== undefined ? anno[i].target : ondict.full ? ondict.full : ondict;
        var section = mirador ? mirador : shared.canvasRegion(canvasId)['canvasRegion'];
        var canvas = shared.canvasRegion(canvasId)['canvasId'];
        var type;
        if (mirador && ondict.selector.item !== undefined){
          var svg_elem = document.createElement( 'html' );
          svg_elem.innerHTML = ondict.selector.item.value;
          type = svg_elem.getElementsByTagName('path')[0].getAttribute('id').split("_")[0];
        } else if (anno[i].body && anno[i].body.selector) {
          type = anno[i].body.selector.value;
        } else {
          type = 'rect';
        }
        var content_data = shared.chars(anno[i]);
        var ocr = shared.ocr(anno[i]);
        content_data['textual_body'] = content_data['textual_body'] + `${ocr ? `<div id="ocr">${decodeURIComponent(escape(ocr))}</div>` : ``}`;
        this.annotations.push({'content': content_data['textual_body'], 'tags':content_data['tags']});
        this.zoomsections.push({'section':section, 'type':type});
      } if (manifestlink) {
        this.getManifestData(manifestlink, canvas, canvasId)
      } else {
        this.buildseadragon(canvas)
      }
      var tags = Array.from(new Set(this.annotations.flatMap(a => a.tags))).sort();
      for (var jar=0; jar<tags.length; jar++){
        var randomcolor = '#'+Math.random().toString(16).substr(-6);
        this.tagslist[tags[jar]] = randomcolor;
      }
  });
  },
  methods: {
    createViewer: function(){
      var fit = this.settings.fit == 'fill' ? true : false;
      var osdsettings = {
            id: `${this.seadragonid}`,
            type: "image",
            nextButton: 'next',
            previousButton: 'previous',
            tileSources: `${this.seadragontile}`,
            toolbar: `${this.toolbar_id}`,
            showNavigator:  false,
            showNavigationControl: false,
            homeFillsViewer: fit,
            constrainDuringPan: true,
            visibilityRatio: 1
      }
      if (this.settings.textposition) {
        osdsettings['zoomPerClick'] = 1;
        osdsettings['zoomPerScroll'] = 1;
      }
      this.viewer = openseadragon(osdsettings);
      var viewer = this.viewer;
      var zoomsections = this.zoomsections;
      var vue = this;
      viewer.addHandler('open', function(){
        if (!fit) {
          vue.viewer.viewport.fitVertically()
        }
        if(vue.settings.autorun_onload){
          vue.autoRun(vue.settings.autorun_interval);
        }
        for (var i=0; i<zoomsections.length; i++){
          if (vue.annotations[i]['tags'].length > 0){
            for (var jl=0; jl<vue.annotations[i]['tags'].length; jl++){
              vue.createOverlayElement(i, vue.annotations[i]['tags'][jl], zoomsections[i])
            }
          } else {
            vue.createOverlayElement(i, vue.annotations[i]['tags'], zoomsections[i])
          }

        }
        if (vue.settings.toggleoverlay){
          vue.createOverlay();
        }
      });
    },
    close: function(){
      this.isclosed = true;
    },
    createOverlayElement: function(position, tags, zoomsections) {
      var xywh = zoomsections['section'].split(",");
      var rect = this.viewer.world.getItemAt(0).imageToViewportRectangle(parseInt(xywh[0]), parseInt(xywh[1]), parseInt(xywh[2]), parseInt(xywh[3]));
      var elem = document.createElement('div');
      elem.style.display = 'none';
      elem.id = `position${position}`;
      var classes = `overlay ${tags}`
      if (zoomsections['type'] !== 'pin'){
        elem.className = `box ${classes.trim()}`;
      } else {
        elem.innerHTML = this.mapmarker;
        elem.className = `mapmarker ${classes.trim()}`;
      }
      if (this.tagslist[tags]){
        elem.style.borderColor = this.tagslist[tags];
        elem.style.color = this.tagslist[tags];
      }
      this.viewer.addOverlay({
        element: elem,
        location: rect
      });
      this.addTracking(elem, rect, position, this);
      if (this.annotationurl){
        elem.style.display = 'block';
        this.position = 0;
        this.next();
      }
    },
    playpause: function(){
      var synth = window.speechSynthesis;
      if (synth.paused){
        synth.resume();
        this.buttons.playpause = '<i class="fas fa-pause"></i>'
      } else if (!synth.speaking) {
        var content = this.annotations[this.position] ? this.annotations[this.position]['content'] : '';
        this.tts(content)
        this.buttons.playpause = '<i class="fas fa-pause"></i>'
      } else {
        synth.pause();
        this.buttons.playpause = '<i class="fas fa-play"></i>'
      }
    },
    hide: function(){
      var element = document.getElementById(`${this.seadragonid}_annotation`);
      element.style.removeProperty("width");
      element.style.removeProperty("height");
      if(this.ishidden === true){
        this.ishidden = false;
        this.buttons.hide_button = '<i class="fas fa-caret-up"></i>'
      } else {
        this.ishidden = true;
        this.buttons.hide_button = '<i class="fas fa-caret-down"></i>'
      }
    },
    showtags: function(){
      if(this.istags){
        this.buttons.tags = '<i class="fas fa-tag"></i>'
        this.istags = false;
      } else {
        this.buttons.tags = '<i class="fas fa-file-alt"></i>'
        this.istags = true;
      }
    },
    hideshowalltags: function(tag){
      var elem = this.anno_elem.getElementsByClassName(tag)
      var box_elements = this.anno_elem.getElementsByClassName("overlay");
      for (var a=0; a<box_elements.length; a++){
        box_elements[a].style.zIndex = 0;
      }
      for (var j=0; j<elem.length; j++){
        if (elem[j].style.display != 'none') {
          elem[j].style.display = 'none'
        } else {
          elem[j].style.display = 'block'
          elem[j].style.zIndex = 1000;
        }
      }
      var displaying = Array.from(box_elements).some(function(element) {
        return element.style.display !== 'none';
      });
      if (displaying){
        this.buttons.overlaybutton = '<i class="fas fa-toggle-off"></i><span class="toolbartext">Show annotations</span>';
      } else {
        this.buttons.overlaybutton = '<i class="fas fa-toggle-on"></i><span class="toolbartext">Hide annotations</span>';
      }
    },
    getManifestData: function(manifestlink, canvas, canvasId){
        axios.get(manifestlink).then(canvas_data => {
          this.settings = shared.getsettings(this.styling)
          var label = canvas_data.data.label;
          if (label !== undefined){
            label = label['en'] ? label.en[0] : label['@value'] ?  label['@value']  : label;
            this.title = truncate(label, 6, { byWords: true });
          }
          var canvases = canvas_data.data.sequences[0].canvases;
          for (var i = 0; i< canvases.length; i++){
            if (canvases[i]['@id'].replace("https", "http") === canvas.replace("https", "http")) {
              var imgResource = canvases[i].images[0].resource;
              var canvas_tile = imgResource.service['@id'].split("full")[0];
              canvas_tile += canvas_tile.slice(-1) !== '/' ? "/" : '';
              this.seadragontile = canvas_tile + "info.json";
            }
          }
          this.buildseadragon(canvasId)
      });
    },
    buildseadragon: function(canvasId){
      this.settings = shared.getsettings(this.styling)
      if (this.seadragontile === ""){
        var tile = canvasId.split("#")[0];
        tile += tile.slice(-1) !== '/' ? "/" : '';
        this.seadragontile = tile + "info.json";
      }
      this.createViewer(this.annotationurl);
      this.anno_elem = document.getElementById(`${this.seadragonid}`);
      this.settings.autorun_interval = this.settings.autorun_interval ? this.settings.autorun_interval : 3;
      this.mapmarker = this.settings.mapmarker ? this.settings.mapmarker : this.mapmarker;
    },
    zoom: function(inorout){
      var oldzoom = parseFloat(this.viewer.viewport.getZoom());
      var minzoom = parseFloat(this.viewer.viewport.getMinZoom()) -.2;
      var maxzoom = parseFloat(this.viewer.viewport.getMaxZoom());
      if (inorout === 'in' && maxzoom >= oldzoom){
        this.viewer.viewport.zoomBy(1.1);
      } else if (inorout === 'out' && minzoom <= oldzoom) {
        this.viewer.viewport.zoomBy(.9);
      } else if (inorout === 'home') {
        if (this.settings.fit == 'fill') {
          this.viewer.viewport.fitBounds(this.viewer.viewport.getHomeBounds())
        } else {
          this.viewer.viewport.fitVertically();
        }
      } else {
        return 0;
      }
    },
    tts: function(text){
      var synth = window.speechSynthesis;
      synth.cancel();
      var div = document.createElement("div");
      div.innerHTML = text;
      var speak = div.textContent
      var speech = new SpeechSynthesisUtterance(speak);
      speech.lang = this.settings.tts;
      var this_functions = this;
      if (!text){
        this.autoRunTTS()
      } else {
        speech.onend = this_functions.autoRunTTS
      }
      synth.speak(speech)
      this.buttons.playpause = '<i class="fas fa-pause"></i>'
    },
    autoRunTTS: function(){
      if(!window.speechSynthesis.speaking && !window.speechSynthesis.pending){
        this.buttons.playpause = '<i class="fas fa-play"></i>'
      }
      if (this.isautorunning){
        if (this.position === this.zoomsections.length){
          this.position = -1;
        }
        var this_functions = this;
        var interval = this.settings.autorun_interval*1000;
        this_functions.isautorunning = setTimeout(function(){
          this_functions.next('next')
        }, interval);
      } else {
        clearTimeout(this.isautorunning)
      }
    },
    createOverlay: function(){
      var box_elements = this.anno_elem.getElementsByClassName("overlay");
      var displaying = Array.from(box_elements).some(function(element) {
        return element.style.display !== 'none';
      });
      var display_setting;
      if (displaying){
        display_setting = 'none';
        this.buttons.overlaybutton = '<i class="fas fa-toggle-on"></i><span class="toolbartext">Show annotations</span>';
      } else {
        display_setting = 'block';
        this.buttons.overlaybutton = '<i class="fas fa-toggle-off"></i><span class="toolbartext">Hide annotations</span>';
      }
      for (var a=0; a<box_elements.length; a++){
        box_elements[a].style.display = display_setting;
      }
    },
    addTracking: function(node, rect, position, functions){
      new openseadragon.MouseTracker({
        element: node,
        clickHandler: function() {
          functions.position = position
          functions.makeactive(position);
          functions.next()
        }
      }).setTracking(true);
    },
    toggle_fullscreen: function(){
      this.$fullscreen.toggle(this.$el, {
        wrap: false,
        callback: this.fullscreenChange
      });
    },
    makeactive: function(position){
      var currentactive = this.anno_elem.getElementsByClassName("active");
      while(currentactive[0]){
        currentactive[0].classList.remove("active");
      }
      if (Number.isInteger(position)) {
        var node = this.anno_elem.querySelectorAll(`#position${position}`)
        for (var k=0; k<node.length; k++){
          node[k].classList.add('active');
        }
      }
    },
    fullscreenChange (fullscreen) {
      if(fullscreen){
        this.buttons.expandbutton = '<i class="fas fa-compress"></i><span class="toolbartext">Exit Full Screen</span>';
      } else {
        this.buttons.expandbutton = '<i class="fas fa-expand"></i><span class="toolbartext">View Full Screen</span>';
      }
      this.fullscreen = fullscreen;
    },
    next: function(nextorprev){
      this.isclosed = false;
      this.istags = true;
      this.showtags();
      if (nextorprev === 'prev'){
        this.position -= 1;
      } else if (nextorprev === 'next') {
        this.position += 1;
      } else {
        this.position = this.position;
      }
      if (this.settings.tts){
        var content = this.annotations[this.position] ? this.annotations[this.position]['content'] : '';
        this.tts(content)
      }
      if (this.zoomsections[this.position] === undefined){
        this.zoom('home')
        this.currentanno = '';
        this.makeactive(undefined)
      } else {
        var xywh = this.zoomsections[this.position]['section'].split(",");
        var anno_section = this.annotations[this.position];
        this.currentanno = `${anno_section['content']}${anno_section['tags'].length > 0 ? `<span class="tags">Tags: ${anno_section['tags'].join(", ")}</div>` : ''}`;
        var rect = this.viewer.world.getItemAt(0).imageToViewportRectangle(parseInt(xywh[0]), parseInt(xywh[1]), parseInt(xywh[2]), parseInt(xywh[3]));
        this.makeactive(this.position);
        if (this.settings.panorzoom == 'pan'){
          this.viewer.viewport.panTo(new openseadragon.Point(rect['x'], rect['y'])).applyConstraints()
        } else {
          this.viewer.viewport.fitBoundsWithConstraints(rect).ensureVisible();
        }
        if (this.settings.textposition) {
          this.overlayPosition(xywh);
        }
      }
      if (this.position === this.zoomsections.length){
        this.next_inactive = true;
      } else {
        this.next_inactive = false;
      } if (this.position === -1){
        this.prev_inactive = true;
      } else {
        this.prev_inactive = false;
      }
    },
    overlayPosition: function(xywh){
      var elem = document.getElementById(`${this.seadragonid}_annotation`);
      var positioning = {
        right: {'x': parseInt(xywh[0])+parseInt(xywh[2]), 'y' : parseInt(xywh[1]), 'placement': 'TOP_LEFT'},
        left: {'x': parseInt(xywh[0]), 'y' : parseInt(xywh[1]), 'placement': 'TOP_RIGHT'},
        top: {'x': parseInt(xywh[0])+(parseInt(xywh[2])/2), 'y': parseInt(xywh[1]), 'placement': 'BOTTOM'},
        bottom: {'x': parseInt(xywh[0])+(parseInt(xywh[2])/2), 'y': parseInt(xywh[1])+parseInt(xywh[3]), 'placement':'TOP'}
      }
      var positions = positioning[this.settings.textposition];
      var overlayrect = this.viewer.world.getItemAt(0).imageToViewportCoordinates(positions['x'], positions['y']);
      var existingoverlay = this.viewer.getOverlayById(`${this.seadragonid}_annotation`);
      var maxheight = this.viewer.viewport.getContainerSize()['y'] - this.viewer.viewport.viewportToWindowCoordinates(new openseadragon.Point(overlayrect['x'], overlayrect['y']))['y'];
      elem.classList.add(`${this.settings.textposition}`);
      elem.style.maxHeight = `${maxheight-35}px`;
      if (existingoverlay) {
        this.viewer.updateOverlay(elem, overlayrect);
      } else {
        this.viewer.addOverlay({
          element: elem,
          location: overlayrect,
          placement: positions['placement']
        });
      }
    },
    autoRun: function(interval){
      interval = interval * 1000;
      var length = this.zoomsections.length;
      if (this.isautorunning === ''){
        if (this.position === length){
          this.position = -1;
        }
        var this_functions = this;
        if (this.settings.tts) {
          this.isautorunning = true;
          this.next('next')
        } else {
          this.isautorunning = setInterval(function() {
            this_functions.next('next')
            if(this_functions.position === length){
              this_functions.position = -1;
            }
          }, interval);
        }
        this.buttons.autorunbutton = '<i class="fas fa-stop-circle"></i><span class="toolbartext">Stop auto run</span>';
      } else {
        clearInterval(this.isautorunning);
        this.isautorunning = '';
        this.buttons.autorunbutton = '<i class="fas fa-magic"></i><span class="toolbartext">Auto run</span>';
      }
    }
  },
  filters: {
    truncate: function(string, words_length) {
      return truncate(string, words_length, { byWords: true });
    }
  }
}
</script>

<style lang="scss">
@import '../iiif-annotation.scss'
</style>
