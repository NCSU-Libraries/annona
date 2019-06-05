<template>
<div id="storyboard_viewer" v-bind:class="[!settings.fullpage && !fullscreen ? 'storyboard_viewer' : 'fullpage']">
  <div style="position:relative; display:flex">
    <div v-bind:id="seadragonid" v-bind:class="[!settings.fullpage && !fullscreen ? 'seadragonbox' : 'seadragonboxfull']" style="position:relative">
      <span id="header_toolbar" v-show="!settings.hide_toolbar || settings.hide_toolbar && !fullscreen ">
        <button v-show="!annotationurl" id="autoRunButton" v-on:click="autoRun(settings.autorun_interval)" class="toolbarButton">
          <span v-html="buttons.autorunbutton"></span>
          <span class="toolbartext">Start/Stop Autorun</span>
        </button>
        <button v-on:click="getInfo()" v-if="imageinfo.text || annoinfo.text"  id="infoButton" class="toolbarButton">
          <span v-html="buttons.info"></span>
          <span class="toolbartext">View source image information</span>
        </button>
        <button v-on:click="showtags()" id="tagsButton" v-if="Object.keys(tagslist).length > 0 && settings.showtags !== false" class="toolbarButton">
          <span v-html="buttons.tags"></span>
          <span class="toolbartext">Toggle Tags</span>
        </button>
        <button v-show="!annotationurl" id="overlayButton" v-on:click="createOverlay()" class="toolbarButton">
          <span v-html="buttons.overlaybutton"></span>
          <span class="toolbartext">Toggle Overlays</span>
        </button>
        <button v-on:click="zoom('in')" id="zoomInButton" class="toolbarButton">
          <i class="fas fa-search-plus"></i>
          <span class="toolbartext">Zoom in</span>
        </button>
        <button v-on:click="zoom('out')" id="zoomOutButton" class="toolbarButton">
          <i class="fas fa-search-minus"></i>
          <span class="toolbartext">Zoom out</span>
        </button>
        <button v-on:click="zoom('home')" id="homeZoomButton" class="toolbarButton">
          <i class="fas fa-home"></i>
          <span class="toolbartext">View full image</span>
        </button>
        <button v-show="!annotationurl" id="previousButton" v-on:click="next('prev')" v-bind:class="{ 'inactive' : prev_inactive }" class="toolbarButton">
          <i class="fa fa-arrow-left"></i>
          <span class="toolbartext">Previous Annotation</span>
        </button>
        <button v-show="!annotationurl" id="nextButton" v-on:click="next('next')" v-bind:class="{ 'inactive' : next_inactive }" class="toolbarButton">
          <i class="fa fa-arrow-right"></i>
          <span class="toolbartext">Next Annotation</span>
        </button>
        <button v-on:click="toggle_fullscreen()"  id="fullScreenButton" class="toolbarButton">
          <span v-html="buttons.expandbutton"></span>
          <span class="toolbartext">Toggle fullscreen</span>
        </button>

      </span>
    </div>
    <div v-bind:id="seadragonid + '_annotation'" class="annotation" v-show="shown">
      <span v-show="!settings.hide_annocontrols && settings.hide_annocontrols !== true" id="annotation_controls">
      <span class="close_button" ><i class="fas fa-times" v-on:click="shown = false"></i></span>
      <span v-html="buttons.hide_button" class="close_button"  v-on:click="hide()"></span>
      <span v-html="buttons.playpause" class="close_button" v-on:click="playpause()" v-if="settings.tts"></span>
      <span v-html="buttons.tags"  v-if="Object.keys(tagslist).length > 0 && settings.showtags !== false" class="close_button" v-on:click="showtags()"></span>
      <span v-html="buttons.info"  v-if="imageinfo.text || annoinfo.text" class="close_button" v-on:click="getInfo()"></span>
      <span class="lang-icon close_button" v-if="languages.length > 0"><select class="lang_drop" v-on:change="changeLang($event)" v-html="languages.join('')"></select></span>
      </span>
      <div id="tags" v-if="shown == 'tags'">
        <div v-for="(value, key) in tagslist" v-bind:id="key + '_tags'" v-bind:key="key">
          <input type="checkbox" class="tagscheck" v-on:click="hideshowalltags(key)" v-bind:checked="value.checked"><span v-bind:style="'color: ' + value.color" class="tagskey"> {{key.split("_").join(" ")}}</span>
        </div>
      </div>
      <div id="information" style="height: auto;" v-if="shown == 'info'" class="info">
        <a class="infolink" v-on:click="annoinfo.shown = !annoinfo.shown" v-if="annoinfo.text">Annotation information</a>
        <div v-if="annoinfo.shown" class="annoinfo">
          <span v-html="annoinfo.text"></span>
          <div class="annotationslist">
            <div v-for="annoinfo in annoinfo.annodata" v-bind:key="annoinfo.position" v-bind:id="'data_' + annoinfo.position">
              <div class="title"><a v-on:click="next(annoinfo.position)">{{annoinfo.title}}</a></div>
              <div class="additionaltext" v-html="annoinfo.additionaltext"></div>
            </div>
          </div>
        </div>
        <a class="infolink" v-if="imageinfo.text" v-on:click="imageinfo.shown = !imageinfo.shown">Full object information</a>
        <div v-if="imageinfo.shown" v-html="imageinfo.text" class="imageinfo"></div>
      </div>
      <div id="annotation_excerpt" style="height: auto;" v-if="shown == 'excerpt'" v-html="$options.filters.truncate(currentanno, settings.truncate_length)"></div>
      <div id="annotation_text" v-html="currentanno" v-if="shown == 'anno'"></div>
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
      isexcerpt: false,
      shown: false,
      mapmarker: '<i class="fas fa-map-marker-alt map-marker"></i>',
      anno_elem: '',
      isautorunning: '',
      buttons: {
        'autorunbutton': '<i class="fas fa-magic"></i>',
        'overlaybutton': '<i class="fas fa-toggle-on"></i>',
        'expandbutton' : '<i class="fas fa-expand"></i>',
        'hide_button' : '<i class="fas fa-caret-up"></i>',
        'playpause': '<i class="fas fa-play"></i>',
        'tags': '<i class="fas fa-tag"></i>',
        'info': '<i class="fas fa-info-circle"></i>'
      },
      settings: {},
      currentlang: '',
      languages: [],
      fullscreen: false,
      tagslist: {},
      annoinfo: {'text': '', 'annodata': [], 'shown':false},
      imageinfo: {'text': '', 'shown':false}
    }
  },
  created() {
    var annotationurl = this.annotationlist ? this.annotationlist : this.annotationurl;
    this.seadragonid = annotationurl.replace(/\/\s*$/, "").split("/").pop().replace("-list", "").replace(".json","");
    axios.get(annotationurl).then(response => {
      var anno = response.data.resources ? response.data.resources : response.data.items ? response.data.items : response.data;
      anno = [].concat(anno);
      this.annoinfo.text += `<div class="listinfo"><b>Annotation Url: </b><a href="${annotationurl}" target="_blank">${annotationurl}</a>
      <br><b>Number of Annotations:</b> ${anno.length}</div>`
      var manifestlink = shared.manifestlink(this.manifesturl, anno[0], response.data);
      for (var i = 0; i < anno.length; i++){
        var ondict = shared.on_structure(anno[i]);
        var canvasId = anno[i].target !== undefined ? anno[i].target : ondict[0].full ? ondict.map(element => element.full) : ondict.flatMap(element => element);
        canvasId = [].concat(canvasId)
        var sections = []
        var content_data = shared.chars(anno[i]);
        var type = content_data['type'];
        var svg_path = [];
        for (var jar=0; jar<canvasId.length; jar++){
          var jarondict = ondict && ondict[jar] ? ondict[jar] : ondict;
          var canvasRegion = shared.canvasRegion(canvasId[jar], jarondict)
          sections.push(canvasRegion['canvasRegion'])
          var canvas = canvasRegion['canvasId'];
          var svg_overlay = shared.getSVGoverlay(jarondict)
          if (svg_overlay) {
            type = svg_overlay.getAttribute('id').split("_")[0];
            svg_path.push(svg_overlay);
          } else if (!type) {
            type = 'rect';
          }
        }
        if(content_data.languages){
          this.currentlang = content_data['textual_body'][0]['language'];
          this.languages = Array.from(new Set(this.languages.concat(content_data.languages)));
        }
        content_data['authors'] = shared.getAuthor(anno[i]);
        this.annotations.push(content_data);
        var title = content_data['label'] ? `${i+1}. ${content_data['label']}` : `Annotation ${i+1}`;
        var content = shared.createContent(content_data, this.currentlang, true);
        var additionaltext = `
          ${ content ? `${this.$options.filters.truncate(content, 5)}<br>` : ``}
          ${content_data['authors'] ? `<b>Authors:</b> ${content_data['authors']}<br>` : ``}
          ${content_data['rights'] ? `<b>Rights:</b> ${content_data['rights']}<br>` : ``}
          ${content_data['tags'].length > 0 ? `<b>Tags:</b> ${content_data['tags'].join(", ")}<br>` : ``}`
        this.annoinfo.annodata.push({'title': title, 'position': i, 'additionaltext': additionaltext})
        this.zoomsections.push({'section':sections, 'type':type, svg_path: svg_path});
      } if (manifestlink) {
        this.getManifestData(manifestlink, canvas, canvasId)
      } else {
        this.buildseadragon(canvas)
      }
      var tags = Array.from(new Set(this.annotations.flatMap(a => a.tags))).sort();
      for (var tc=0; tc<tags.length; tc++){
        var randomcolor = '#'+Math.random().toString(16).substr(-6);
        var checked = this.settings.toggleoverlay ? true : false;
        this.tagslist[tags[tc]] = {'color':randomcolor, 'checked': checked};
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
        if (vue.annotationurl){
          vue.createOverlay();
          vue.position = 0;
          vue.next();
        }
        if (vue.settings.toggleoverlay){
          vue.createOverlay();
        }
        if (vue.currentlang) {
          vue.changeLang(vue.currentlang)
        }
      });
    },
    changeLang: function(event){
      var lang = event.target ? event.target.value : event;
      this.currentlang = lang;
      this.currentanno = shared.createContent(this.annotations[this.position], this.currentlang, true);
      if (this.settings.tts){
        this.settings.tts = lang;
        this.tts(this.currentanno.split('<div class="tags">')[0])
      }
    },
    createOverlayElement: function(position, tags, zoomsections) {
      for (var jt=0; jt<zoomsections['section'].length; jt++){
        var xywh = zoomsections['section'][jt].split(",");
        var imagesize = this.viewer.world.getItemAt(0).getBounds();
        var rect = this.viewer.world.getItemAt(0).imageToViewportRectangle(parseInt(xywh[0]), parseInt(xywh[1]), parseInt(xywh[2]), parseInt(xywh[3]));
        rect = xywh[0] == 'full' ? imagesize : rect;
        var zindex = xywh[0] == 'full' ? 1 : 20;
        var elem = document.createElement('div');
        elem.style.display = 'none';
        elem.id = `position${position}`;
        var multi = zoomsections['section'].length > 1 ? 'multi' : '';
        var classes = `overlay ${tags} ${multi}`.trim()
        elem.className = `${zoomsections['type']} ${classes}`;
        var color = this.tagslist[tags] ? this.tagslist[tags].color : '';
        if (zoomsections['type'] === 'pin'){
          elem.innerHTML = this.mapmarker;
          elem.style.fill = color;
        } else if (zoomsections['svg_path'][jt]){
          var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg")
          svg.setAttribute('viewBox', xywh.join(" "))
          var path = zoomsections['svg_path'][jt];
          path.style.stroke = color;
          var path2 = document.createElement("path")
          path2.setAttribute('d', path.getAttribute('d'))
          path2.classList.add('svgactive')
          var origin = `${parseInt(xywh[0])+(parseInt(xywh[2])/2)}px ${parseInt(xywh[1])+(parseInt(xywh[3])/2)}px`;
          path2.style.transformOrigin = origin;
          path2.style.webkitTransformOrigin = origin;
          svg.innerHTML  = path2.outerHTML + path.outerHTML;
          elem.appendChild(svg)
        }
        if (color){
          elem.style.borderColor = color;
          elem.style.color = color;
        }
        elem.style.zIndex = zindex;
        this.viewer.addOverlay({
          element: elem,
          location: rect
        });
        this.addTracking(elem, rect, position, this);
      }
    },
    playpause: function(){
      var synth = window.speechSynthesis;
      if (synth.paused){
        synth.resume();
        this.buttons.playpause = '<i class="fas fa-pause"></i>'
      } else if (!synth.speaking) {
        var content = this.annotations[this.position] ? shared.createContent(this.annotations[this.position], this.currentlang, true) : '';
        this.tts(content)
        this.buttons.playpause = '<i class="fas fa-pause"></i>'
      } else {
        synth.pause();
        this.buttons.playpause = '<i class="fas fa-play"></i>'
      }
    },
    hide: function(){
      var element = document.getElementById(`${this.seadragonid}_annotation`);
      element.style.removeProperty("height");
      if(this.shown === 'excerpt'){
        this.shown = 'anno';
        this.isexcerpt = false;
        this.buttons.hide_button = '<i class="fas fa-caret-up"></i>'
      } else {
        this.shown = 'excerpt';
        this.isexcerpt = true;
        this.buttons.hide_button = '<i class="fas fa-caret-down"></i>'
      }
    },
    getInfo: function(){
      var element = document.getElementById(`${this.seadragonid}_annotation`);
      element.style.removeProperty("height");
      if(this.shown === 'info'){
        this.switchButtons()
        this.buttons.info = '<i class="fas fa-info-circle"></i>'
      } else {
        this.shown = 'info';
        this.switchButtons('info')
      }
    },
    showtags: function(){
      if(this.shown === 'tags'){
        this.buttons.tags = '<i class="fas fa-tag"></i>'
        this.switchButtons()
      } else {
        this.shown = 'tags';
        this.switchButtons('tags')
      }
    },
    switchButtons: function(button=false) {
      this.buttons.info = '<i class="fas fa-info-circle"></i>'
      this.buttons.tags = '<i class="fas fa-tag"></i>'
      if (button){
        if (this.position == -1 || this.position === this.zoomsections.length) {
          this.buttons[button] = '<i class="fas fa-window-close"></i>'
        } else {
          this.buttons[button] = '<i class="fas fa-file-alt"></i>'
        }
      } else {
        if (this.position == -1 || this.position === this.zoomsections.length){
          this.shown = false;
        } else {
          this.shown = this.isexcerpt ? 'excerpt' : 'anno';
        }
      }
    },
    hideshowalltags: function(tag){
      var elem = this.anno_elem.getElementsByClassName(tag)
      var box_elements = this.anno_elem.getElementsByClassName("overlay");
      for (var j=0; j<elem.length; j++){
        var multi = document.querySelectorAll(`#${elem[j].id}`)
        for (var aj=0; aj<multi.length; aj++){
          multi[aj].style.zIndex = 0;
        }
        if (elem[j].style.display != 'none') {
          elem[j].style.display = 'none'
          this.tagslist[tag].checked = false;
        } else {
          elem[j].style.display = 'block'
          elem[j].style.zIndex = 1000;
          this.tagslist[tag].checked = true;
        }
      }
      var displaying = Array.from(box_elements).some(function(element) {
        return element.style.display !== 'none';
      });
      if (displaying){
        this.buttons.overlaybutton = '<i class="fas fa-toggle-off"></i>';
      } else {
        this.buttons.overlaybutton = '<i class="fas fa-toggle-on"></i>';
      }
    },
    getManifestData: function(manifestlink, canvas, canvasId){
        axios.get(manifestlink).then(canvas_data => {
          var metadata = [{'label': 'Full object', 'value' : `<a href="${manifestlink}" target="_blank">${manifestlink}</a>`},{'label':'title', 'value': canvas_data.data.label}, {'label':'description', 'value': canvas_data.data.description},
          {'label': 'attribution', 'value': canvas_data.data.attribution},{'label': 'license', 'value': canvas_data.data.license}]
          metadata = canvas_data.data.metadata ? metadata.concat(canvas_data.data.metadata) : metadata;
          for (var j=0; j<metadata.length; j++){
            var label = Array.isArray(metadata[j]['label']) ? metadata[j]['label'].map(element => element['@value'] ? element['@value'] : element['value'] ? element['value'] : element) : metadata[j]['label'];
            label = Array.isArray(label) ? label.join("/") : label['@value'] ? label['@value'] : label;
            var value = Array.isArray(metadata[j]['value']) ? metadata[j]['value'].map(element => element['@value'] ? element['@value'] : element['value'] ? element['value'] : element) : metadata[j]['value'] ;
            value = Array.isArray(value) ? value.join("<br>") : value && value['@value'] ? value['@value'] : value;
            if (value != canvas_data.data.label && value != canvas_data.data.description && value){
              this.imageinfo.text += `<div id="${label}">${label ? `<b>${label.charAt(0).toUpperCase() + label.slice(1)}: ` : `` }</b>${value}</div>`
            }
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
      this.settings.truncate_length = this.settings.truncate_length ? this.settings.truncate_length : 2;
      if (this.seadragontile === ""){
        var tile = Array.isArray(canvasId) ? canvasId[0] : canvasId;
        tile = tile.split("#")[0];
        tile += tile.slice(-1) !== '/' ? "/" : '';
        this.seadragontile = tile + "info.json";
      }
      this.createViewer();
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
      var lang = this.annotations[this.position] ? this.annotations[this.position]['language'] : '';
      speech.lang = lang ? lang : this.settings.tts;
      var voice = synth.getVoices().filter(function(voice) {
        var currentlang = speech.lang;
        return currentlang.length == 2 ? voice.lang.split("-")[0] == currentlang : voice.lang == currentlang;
      })
      speech.voice = voice ? voice[0] : synth.getVoices()[0];
      var this_functions = this;
      speech.onstart = function() {
        this_functions.buttons.playpause = '<i class="fas fa-pause"></i>';
      }
      if (!text){
        this.autoRunTTS()
      } else {
        speech.onend = this_functions.autoRunTTS
      }
      console.log("utterance", speech);
      synth.speak(speech)
      this.buttons.playpause = '<i class="fas fa-pause"></i>'
    },
    autoRunTTS: function(){
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
      if(!window.speechSynthesis.speaking && !window.speechSynthesis.pending){
        this.buttons.playpause = '<i class="fas fa-play"></i>'
      }
    },
    createOverlay: function(){
      var box_elements = this.anno_elem.getElementsByClassName("overlay");
      var displaying = Array.from(box_elements).some(function(element) {
        return element.style.display !== 'none' && element.className.indexOf('multi') === -1;
      });
      var display_setting;
      var checked;
      if (displaying){
        display_setting = 'none';
        checked = false;
        this.buttons.overlaybutton = '<i class="fas fa-toggle-on"></i>';
      } else {
        display_setting = 'block';
        checked = true;
        this.buttons.overlaybutton = '<i class="fas fa-toggle-off"></i>';
      }
      for (var key in this.tagslist){
        this.tagslist[key].checked = checked
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
          functions.next();
          functions.goToArea(rect);
        }
      }).setTracking(true);
    },
    goToArea: function(rect){
      var xywh = this.zoomsections[this.position]['section'][0].split(",");
      if (xywh.join("") == 'full'){
        this.zoom('home')
      } else if (this.settings.panorzoom == 'pan'){
        this.viewer.viewport.panTo(new openseadragon.Point(rect['x'], rect['y'])).applyConstraints()
      } else {
        this.viewer.viewport.fitBoundsWithConstraints(rect).ensureVisible();
      }
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
        this.buttons.expandbutton = '<i class="fas fa-compress"></i>';
      } else {
        this.buttons.expandbutton = '<i class="fas fa-expand"></i>';
      }
      this.fullscreen = fullscreen;
    },
    next: function(nextorprev){
      var element = document.getElementById(`${this.seadragonid}_annotation`);
      element.style.removeProperty("height");
      if (nextorprev === 'prev'){
        this.position -= 1;
      } else if (nextorprev === 'next') {
        this.position += 1;
      } else if(!isNaN(nextorprev)) {
        this.position = nextorprev;
      } else {
        this.position = this.position;
      }
      this.switchButtons();
      if (this.settings.tts){
        var content = this.annotations[this.position] ? shared.createContent(this.annotations[this.position], this.currentlang) : '';
        this.tts(content)
      }
      if(this.buttons.overlaybutton.indexOf('toggle-off') == -1){
        var multielements = document.getElementsByClassName("multi")
        for (var we=0; we<multielements.length; we++){
          multielements[we].style.display = "none";
        }
      }
      if (this.zoomsections[this.position] === undefined){
        this.zoom('home')
        this.currentanno = '';
        this.makeactive(undefined);
        this.shown = false;
      } else {
        var numbsections = this.zoomsections[this.position]['section'].length;
        var xywh = this.zoomsections[this.position]['section'][0].split(",");
        if (this.settings.textposition) {
          this.overlayPosition(xywh);
        }
        this.currentanno = shared.createContent(this.annotations[this.position], this.currentlang, true)
        this.makeactive(this.position);
        if (numbsections <= 1) {
          var rect = this.viewer.world.getItemAt(0).imageToViewportRectangle(parseInt(xywh[0]), parseInt(xywh[1]), parseInt(xywh[2]), parseInt(xywh[3]));
          this.goToArea(rect);
        } else {
          var sections = this.zoomsections[this.position]['section']
          var xs = sections.map(element => element.split(",")[0])
          var lowx = Math.min(...xs)
          var highx = Math.max(...xs)
          var ys = sections.map(element => element.split(",")[1])
          var lowy = Math.min(...ys);
          var highy = Math.max(...ys);
          var ws = sections.map(element => element.split(",")[2])
          var sumw = ws.reduce((a, b) => parseInt(a) + parseInt(b), 0)
          var width = (highx - lowx) + sumw;
          var highinfo = sections.filter(element => parseInt(element.split(",")[1]) === highy)[0]
          var height = highy - lowy + parseInt(highinfo.split(',')[3]);
          var zoomarea = this.viewer.world.getItemAt(0).imageToViewportRectangle(lowx, lowy, width, height);
          this.goToArea(zoomarea);
          var elements = this.anno_elem.querySelectorAll(`#position${this.position}`)
          for (var tk=0; tk<elements.length; tk++){
            elements[tk].style.display = 'block';
          }
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
      var maxwidth = this.viewer.viewport.getContainerSize()['x'] - this.viewer.viewport.pixelFromPoint(new openseadragon.Point(overlayrect['x'], overlayrect['y']))['x'];
      var maxheight = this.viewer.viewport.getContainerSize()['y'] - this.viewer.viewport.pixelFromPoint(new openseadragon.Point(overlayrect['x'], overlayrect['y']))['y'];
      elem.classList.add(`${this.settings.textposition}`);
      var vue = this;
      elem.addEventListener("mouseover",function(){
        vue.enableOSDmouse(false)
      });
      elem.addEventListener("mouseout",function(){
        vue.enableOSDmouse(true)
      });
      elem.style.maxHeight = `${maxheight-35}px`;
      elem.style.maxWidth = `${maxwidth-35}px`;
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
    enableOSDmouse: function(disable) {
      this.viewer.setControlsEnabled(disable);
      this.viewer.setMouseNavEnabled(disable);
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
        this.buttons.autorunbutton = '<i class="fas fa-stop-circle"></i>';
      } else {
        clearInterval(this.isautorunning);
        this.isautorunning = '';
        this.buttons.autorunbutton = '<i class="fas fa-magic"></i>';
      }
    }
  },
  filters: {
    truncate: function(string, words_length) {
      string = string ? string.split('<div class="tags">')[0] : '';
      var tmp = document.createElement("DIV");
      tmp.innerHTML = string;
      var text = tmp.textContent || tmp.innerText || "";
      return truncate(text, words_length, { byWords: true });
    }
  }
}
</script>

<style lang="scss">
@import '../iiif-annotation.scss'
</style>
