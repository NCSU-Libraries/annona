<template>
<div id="storyboard_viewer" v-bind:class="[!settings.fullpage && !fullscreen ? 'storyboard_viewer' : 'fullpage']">
  <div style="position:relative; display:flex">
    <div v-bind:id="seadragonid" v-bind:class="[!settings.fullpage && !fullscreen ? 'seadragonbox' : 'seadragonboxfull']" style="position:relative">
      <span id="header_toolbar" v-if="!$parent.multi" v-show="!settings.hide_toolbar || settings.hide_toolbar && !fullscreen">
        <button v-show="!annotationurl" id="autoRunButton" v-on:click="sendMessage({'function':'autoRun', 'args': settings.autorun_interval});" class="toolbarButton">
          <span v-html="buttons.autorunbutton"></span>
          <span class="toolbartext">Start/Stop Autorun</span>
        </button>
        <button v-on:click="sendMessage({'function': 'clickButton', 'args': 'info'});" v-if="imageinfo || annoinfo.text || settings.additionalinfo"  id="infoButton" class="toolbarButton">
          <span v-html="buttons.info"></span>
          <span class="toolbartext">View source image information</span>
        </button>
        <button v-on:click="sendMessage({'function': 'clickButton', 'args': 'tags'});" id="tagsButton" v-if="Object.keys(tagslist).length > 0 && settings.showtags !== false" class="toolbarButton">
          <span v-html="buttons.tags"></span>
          <span class="toolbartext">Toggle Tags</span>
        </button>
        <button v-show="!annotationurl" id="overlayButton" v-on:click="sendMessage({'function': 'createOverlay', 'args': ''});" class="toolbarButton">
          <span v-html="buttons.overlaybutton"></span>
          <span class="toolbartext">Toggle Overlays</span>
        </button>
        <button v-show="layerslist.length > 1" id="layerButton" v-on:click="sendMessage({'function': 'clickButton', 'args': 'layer'});" class="toolbarButton">
          <span v-html="buttons.layer"></span>
          <span class="toolbartext">View layers</span>
        </button>
        <button v-on:click="sendMessage({'function': 'zoom', 'args': 'in'});" id="zoomInButton" class="toolbarButton">
          <i class="fas fa-search-plus"></i>
          <span class="toolbartext">Zoom in</span>
        </button>
        <button v-on:click="sendMessage({'function': 'zoom', 'args': 'out'});" id="zoomOutButton" class="toolbarButton">
          <i class="fas fa-search-minus"></i>
          <span class="toolbartext">Zoom out</span>
        </button>
        <button v-on:click="sendMessage({'function': 'zoom', 'args': 'home'})" id="homeZoomButton" class="toolbarButton">
          <i class="fas fa-home"></i>
          <span class="toolbartext">View full image</span>
        </button>
        <button v-show="!annotationurl" id="previousButton" v-on:click="sendMessage({'function': 'next', 'args': 'prev'});" v-bind:class="{ 'inactive' : prev_inactive }" class="toolbarButton">
          <i class="fa fa-arrow-left"></i>
          <span class="toolbartext">Previous Annotation</span>
        </button>
        <button v-show="!annotationurl" id="nextButton" v-on:click="sendMessage({'function': 'next', 'args': 'next'});" v-bind:class="{ 'inactive' : next_inactive }" class="toolbarButton">
          <i class="fa fa-arrow-right"></i>
          <span class="toolbartext">Next Annotation</span>
        </button>
        <button v-on:click="sendMessage(({'function': 'toggle_fullscreen', 'args': ''}));"  id="fullScreenButton" class="toolbarButton">
          <span v-html="buttons.expandbutton"></span>
          <span class="toolbartext">Toggle fullscreen</span>
        </button>
      </span>
    </div>
    <div v-bind:id="seadragonid + '_annotation'" class="annotation" v-show="shown">
      <span v-show="!settings.hide_annocontrols && settings.hide_annocontrols !== true" id="annotation_controls">
      <span class="close_button" ><i class="fas fa-times" v-on:click="shown = false"></i></span>
      <span v-html="buttons.hide_button" class="close_button"  v-on:click="sendMessage({'function': 'hide', 'args': ''});"></span>
      <span v-html="buttons.playpause" class="close_button" v-on:click="sendMessage({'function': 'playpause', 'args': ''});" v-if="settings.tts"></span>
      <span v-html="buttons.tags"  v-if="Object.keys(tagslist).length > 0 && settings.showtags !== false" class="close_button" v-on:click="sendMessage({'function': 'clickButton', 'args': 'tags'});"></span>
      <span v-html="buttons.info"  v-if="imageinfo || annoinfo.text" class="close_button" v-on:click="sendMessage({'function': 'clickButton', 'args': 'info'});"></span>
      <span class="lang-icon close_button" v-if="languages.length > 0"><select class="lang_drop" v-on:change="sendMessage({'function': 'changeLang', 'args': $event });" v-html="languages.join('')"></select></span>
      </span>
      <div id="layers" v-if="shown == 'layer'">
        <div v-for="layer in layerslist" v-bind:key="layer.tile">
          <input type="checkbox" class="tagscheck" v-on:click="sendMessage({'function': 'setOpacity', 'args': layer });" v-model="layer.checked">
          <span v-html="layer.label"></span>
          <div class="slidecontainer">Opacity: <input v-on:change="sendMessage({'function': 'setOpacity', 'args': {'event': $event, 'layer': layer} })" type="range" min="0" max="100" v-bind:value="layer.opacity*100" class="slider"></div>
        </div>
      </div>
      <div id="tags" v-if="shown == 'tags'">
        <div v-for="(value, key) in tagslist" v-bind:id="key + '_tags'" v-bind:key="key">
          <input type="checkbox" class="tagscheck" v-on:click="sendMessage({'function': 'hideshowalltags', 'args': key });" v-model="value.checked">
          <span v-bind:style="'color: ' + value.color" class="tagskey"> {{key.split("_").join(" ")}}</span>
        </div>
      </div>
      <div id="information" style="height: auto;" v-if="shown == 'info'" class="info">
        <div class="imagetitle"><h1>{{imagetitle}}</h1></div>
        <span v-if="!booleanitems.isexcerpt">
          <span v-html="$options.filters.truncate(currentanno, settings.truncate_length)" v-if="booleanitems.isexcerpt"></span>
          <a class="infolink" v-on:click="sendMessage({'function':'switchShown', 'args': 'additionalinfoshown'});" v-if="settings.additionalinfo">{{settings.additionalinfotitle}}</a>
          <div v-if="booleanitems.additionalinfoshown" v-html="settings.additionalinfo" class="imageinfo"></div>
          <a class="infolink" v-on:click="sendMessage({'function':'switchShown', 'args': 'annoinfoshown'});" v-if="annoinfo.text">Annotation information</a>
          <div v-if="booleanitems.annoinfoshown" class="annoinfo">
            <span v-html="annoinfo.text"></span>
            <div class="annotationslist">
              <div v-for="annoinfo in annoinfo.annodata" v-bind:key="annoinfo.position" v-bind:id="'data_' + annoinfo.position">
                <div class="title"><a v-on:click="sendMessage({'function': 'next', 'args': annoinfo.position});">{{annoinfo.title}}</a></div>
                <div class="additionaltext" v-html="annoinfo.additionaltext"></div>
              </div>
            </div>
          </div>
          <a class="infolink" v-if="imageinfo.text" v-on:click="sendMessage({'function':'switchShown', 'args': 'imageinfoshown'});">{{imageinfo.label}}</a>
          <div v-if="booleanitems.imageinfoshown" v-html="imageinfo.text" class="imageinfo"></div>
        </span>
      </div>
      <div id="annotation_text" v-if="shown == 'anno'">
        <span v-html="currentanno" v-if="!booleanitems.isexcerpt"></span>
        <span v-html="$options.filters.truncate(currentanno, settings.truncate_length)" v-if="booleanitems.isexcerpt"></span>
      </div>
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
import SocketIO from 'socket.io-client';

Vue.use(fullscreen);

export default {
  name: 'storyboard',
  props: {
    'annotationlist':String,
    'manifesturl':String,
    'annotationurl': String,
    'styling': String,
    'ws': String,
    'layers': String
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
      booleanitems: {
        isexcerpt: false,
        isoverlaytoggled: false,
        annoinfoshown: false,
        imageinfoshown: false,
        additionalinfoshown: false
      },
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
        'info': '<i class="fas fa-info-circle"></i>',
        'layer': '<i class="fas fa-layer-group"></i>'
      },
      settings: {},
      currentlang: '',
      languages: [],
      fullscreen: false,
      tagslist: {},
      annoinfo: {'text': '', 'annodata': []},
      imageinfo: {'text': '', 'label': 'Manifest information'},
      imagetitle: '',
      layerslist: []
    }
  },
  created() {
    if(this.$parent.range) {
      this.fullscreenChange(this.$parent.isfullscreen);
    }
    var annotationurl = this.annotationlist ? this.annotationlist : this.annotationurl;
    this.settings = shared.getsettings(this.styling);
    var isIE = /*@cc_on!@*/false || !!document.documentMode;
    isIE ? this.settings.tts = false : '';
    this.imagetitle = this.settings.title ? this.settings.title : '';
    this.seadragonid = this.settings.customid ? this.settings.customid : annotationurl.replace(/\/\s*$/, "").split("/").pop().replace("-list", "").replace(".json","");
    axios.get(annotationurl).then(response => {
      var anno = response.data.resources ? response.data.resources : response.data.items ? response.data.items : response.data;
      anno = [].concat(anno);
      //Get basic annotation information
      this.annoinfo.text += `<div class="listinfo"><b>Annotation Url: </b><a href="${annotationurl}" target="_blank">${annotationurl}</a>
      <br><b>Number of Annotations:</b> ${anno.length}</div>`
      var manifestlink = shared.manifestlink(this.manifesturl, anno[0], response.data);
      //loop through list of annotations
      for (var i = 0; i < anno.length; i++){
        var ondict = shared.on_structure(anno[i]);
        var canvasId = anno[i].target !== undefined ? anno[i].target : ondict[0].full ? ondict.map(element => element.full) : ondict[0].source ? ondict.map(element => element.source) : shared.flatten(ondict);
        canvasId = [].concat(canvasId);
        var sections = [];
        var content_data = shared.chars(anno[i]);
        var type = content_data['type'];
        var svg_path = [];
        //get SVG paths for each canvas; add svg path to list for each annotation
        for (var jar=0; jar<canvasId.length; jar++){
          var jarondict = ondict && ondict[jar] ? ondict[jar] : ondict;
          var canvasRegion = shared.canvasRegion(canvasId[jar], jarondict);
          sections.push(canvasRegion['canvasRegion']);
          var canvas = canvasRegion['canvasId'];
          var svg_overlay = shared.getSVGoverlay(jarondict);
          if (svg_overlay) {
            type = svg_overlay.getAttribute('id').split("_")[0];
            svg_path.push(svg_overlay);
          } else if (!type) {
            type = 'rect';
          }
        }
        this.annotations.push(content_data);
        this.getAnnoInfo(content_data, i);
        this.zoomsections.push({'section':sections, 'type':type, svg_path: svg_path});
      }
      //Looks at all language options (if existing)
      //gets all languages, sees if browser language is option for languages; otherwise sets language to first in list.
      //sets html dropdown to selected
      if(this.annotations.filter(element => element.languages).length > 0){
        var all_langs = shared.flatten(this.annotations.map(element => element.textual_body.map(els => els.language)));
        var lang = all_langs.filter(element => element != undefined && navigator.language.indexOf(element.toLowerCase()) > -1)
        this.currentlang = lang.length > 0 ? lang[0] : all_langs[0];
        this.languages = Array.from(new Set(this.languages.concat(content_data.languages)));
      }
      //If manifest link avaliable use getManifestData() function to match canvas to image.
      //Else use image link listed in the annotation.
      if (manifestlink) {
        this.getManifestData(manifestlink, canvas, canvasId);
      } else {
        this.buildseadragon(canvas);
      }
      //get tags and set corresponding color
      var tags = Array.from(new Set(shared.flatten(this.annotations, 'tags'))).sort();
      for (var tc=0; tc<tags.length; tc++){
        var randomcolor = '#'+Math.random().toString(16).substr(-6);
        var checked = this.settings.toggleoverlay ? true : false;
        this.tagslist[tags[tc]] = {'color':randomcolor, 'checked': checked};
      }
      if (this.$parent.multi) {
        tags.length > 0 ? this.$parent.tags = true : '';
      }
  });
  },
  mounted () {
    this.newSocket();
  },
  methods: {
    //Create OpenSeadragon viewer and adds listeners for moving in seadragon viewer
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
      };
      this.viewer = openseadragon(osdsettings);
      var viewer = this.viewer;
      var zoomsections = this.zoomsections;
      var vue = this;
      // Listeners for changes in OpenSeadragon view
      viewer.addHandler('canvas-click', function(){
        vue.reposition();
      });
      viewer.addHandler('canvas-scroll', function(){
        vue.reposition();
      });
      viewer.addHandler('canvas-drag', function(){
        vue.reposition();
      });
      // on viewer open
      viewer.addHandler('open', function(){
        if (vue.settings.imagecrop) {
          var cropxywh = vue.settings.imagecrop.split(",").map(elem => parseInt(elem));
          var tiledImage = vue.viewer.world.getItemAt(0);
          tiledImage.setClip(new openseadragon.Rect(cropxywh[0], cropxywh[1], cropxywh[2], cropxywh[3]));
          vue.zoom('home');
        }
        // add layers to viewer.
        if (vue.layerslist && vue.layerslist.length > 0){
          vue.addLayers();
        }
        // Set view fit
        if (vue.settings.fit == 'horizontal') {
          vue.viewer.viewport.fitHorizontally();
        } else if(!fit) {
          vue.viewer.viewport.fitVertically();
        }
        // If autorun on load start autorun
        if(vue.settings.autorun_onload){
          vue.autoRun(vue.settings.autorun_interval);
        }
        // create overlays for each annotation
        for (var i=0; i<zoomsections.length; i++){
          if (vue.annotations[i]['tags'].length > 0){
            for (var jl=0; jl<vue.annotations[i]['tags'].length; jl++){
              vue.createOverlayElement(i, vue.annotations[i]['tags'][jl], zoomsections[i]);
            }
          } else {
            vue.createOverlayElement(i, vue.annotations[i]['tags'], zoomsections[i]);
          }
        }
        // If annotation url (single annotation) show overlays and set position as first annotation
        if (vue.annotationurl){
          vue.createOverlay();
          vue.position = 0;
          vue.next();
        }
        // if setting call for toggled and language set to values
        if (vue.settings.toggleoverlay){
          vue.createOverlay();
        }
        if (vue.currentlang) {
          vue.changeLang(vue.currentlang);
        }
      });
    },
    // reposition viewer to coordinates; This is for the multistoryboard and websocket viewers
    reposition: function(rect = false) {
      rect = rect ? rect : this.viewer.viewport.getConstrainedBounds();
      var bounds = this.viewer.world.getItemAt(0).viewportToImageRectangle(rect);
      if (this.settings.controller){
        this.socket.emit('broadcast', {'bounds': bounds});
      } else if (this.$parent.multi) {
        this.$parent.moveArea(bounds)
      }
    },
    // Create socket connections to web socket server; Based on message either execute function or move viewer
    newSocket: function() {
      if (this.$props.ws){
        let socket = SocketIO(this.$props.ws, { origins: 'http://localhost:*/* http://127.0.0.1:*/*' });
        this.socket = socket;
        this.socket.on('message', (data) => {
          if (data['function']){
            this.position = data['position'];
            this.shown = data['shown'];
            this.booleanitems = data['booleanitems'];
            this[data['function']](data['args']);
          }
          if (data['bounds']) {
            var conversion = this.viewer.world.getItemAt(0).imageToViewportRectangle(data['bounds'].x, data['bounds'].y, data['bounds'].width, data['bounds'].height);
            this.viewer.viewport.fitBoundsWithConstraints(conversion).ensureVisible();
          }
        })
      }
    },
    // Get image info from manifest; This populates the info button for the image.
    getImageInfo: function(canvas_data, manifestlink){
      var metadata = [{'label': 'Manifest', 'value' : `<a href="${manifestlink}" target="_blank">${manifestlink}</a>`},{'label':'title', 'value': canvas_data.data.label}, {'label':'description', 'value': canvas_data.data.description},
      {'label': 'attribution', 'value': canvas_data.data.attribution},{'label': 'license', 'value': canvas_data.data.license}]
      metadata = canvas_data.data.metadata ? metadata.concat(canvas_data.data.metadata) : metadata;
      canvas_data.data.sequences[0].canvases.length == 1 ? this.imageinfo.label = 'Image information' : '';
      for (var j=0; j<metadata.length; j++){
        var label = Array.isArray(metadata[j]['label']) ? metadata[j]['label'].map(element => element['@value'] ? element['@value'] : element['value'] ? element['value'] : element) : metadata[j]['label'];
        label = Array.isArray(label) ? label.join("/") : label['@value'] ? label['@value'] : label;
        var value = Array.isArray(metadata[j]['value']) ? metadata[j]['value'].map(element => element['@value'] ? element['@value'] : element['value'] ? element['value'] : element) : metadata[j]['value'] ;
        value = Array.isArray(value) ? value.join("<br>") : value && value['@value'] ? value['@value'] : value;
        if (label === 'title' && j == 1 && !this.imagetitle){
          this.imagetitle = value;
        }
        if (value){
          this.imageinfo.text += `<div id="${label}">${label ? `<b>${label.charAt(0).toUpperCase() + label.slice(1)}: ` : `` }</b>${value}</div>`
        }
      }
    },
    // Create TOC for each annotation; Gets a list of annotations and corresponding data
    getAnnoInfo: function(content_data, i){
      var title = content_data['label'] ? `${i+1}. ${content_data['label']}` : `Annotation ${i+1}`;
      var content = shared.createContent(content_data, this.currentlang, true);
      var additionaltext = `
        ${ content ? `${this.$options.filters.truncate(content, 5)}<br>` : ``}
        ${content_data['authors'] ? `<b>Authors:</b> ${content_data['authors']}<br>` : ``}
        ${content_data['rights'] ? `<b>Rights:</b> ${content_data['rights']}<br>` : ``}
        ${content_data['tags'].length > 0 ? `<b>Tags:</b> ${content_data['tags'].join(", ")}<br>` : ``}`
      this.annoinfo.annodata.push({'title': title, 'position': i, 'additionaltext': additionaltext})
    },
    // On language change, change annotation language; update annotation in viewer and update information language;
    changeLang: function(event){
      var lang = event.target ? event.target.value : event;
      this.currentlang = lang;
      this.currentanno = shared.createContent(this.annotations[this.position], this.currentlang, true);
      this.annoinfo.annodata = [];
      for (var ai=0; ai<this.annotations.length; ai++){
        this.getAnnoInfo(this.annotations[ai], ai);
      }
      if (this.settings.tts){
        this.settings.tts = lang;
        this.tts(this.currentanno.split('<div class="tags">')[0]);
      }
    },
    //Create overlays on OpenSeadragon viewer
    createOverlayElement: function(position, tags, zoomsections) {
      for (var jt=0; jt<zoomsections['section'].length; jt++){
        var xywh = zoomsections['section'][jt].split(",");
        var imagesize = this.viewer.world.getItemAt(0).getBounds();
        var rect = this.viewer.world.getItemAt(0).imageToViewportRectangle(parseInt(xywh[0]), parseInt(xywh[1]), parseInt(xywh[2]), parseInt(xywh[3]));
        rect = xywh[0] == 'full' ? imagesize : rect;
        // calculate zindex based on coordinates; This allows for boxes that are in other boxes to be clickable.
        var zindex = parseInt((xywh[0]*xywh[1])/(xywh[2]*xywh[3]));
        zindex = xywh[0] == 'full' ? 1 : zindex;
        //create div with section
        var elem = document.createElement('div');
        elem.style.display = 'none';
        elem.id = `position${position}`;
        var multi = zoomsections['section'].length > 1 ? 'multi' : '';
        //set class as overlay and tags and multi if multiple sections for one annotation
        var classes = `overlay ${tags} ${multi}`.trim();
        elem.className = `${zoomsections['type']} ${classes}`;
        //set color for overlay based on tag color
        var color = this.tagslist[tags] ? this.tagslist[tags].color : '';
        // If type is 'pin' use mapmarker icon
        if (zoomsections['type'] === 'pin'){
          elem.innerHTML = this.mapmarker;
          elem.style.fill = color;
        } else if (zoomsections['svg_path'][jt]){
          var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
          //set viewBox based on section. SVG will not show up without this.
          svg.setAttribute('viewBox', xywh.join(" "));
          svg.setAttribute('style', 'position: absolute');
          var path = zoomsections['svg_path'][jt];
          path.style.stroke = color;
          //path2 is for in the inner line when active
          var path2 = document.createElement("path");
          path2.setAttribute('d', path.getAttribute('d'));
          path2.classList.add('svgactive');
          var origin = `${parseInt(xywh[0])+(parseInt(xywh[2])/2)}px ${parseInt(xywh[1])+(parseInt(xywh[3])/2)}px`;
          path2.style.transformOrigin = origin;
          path2.style.webkitTransformOrigin = origin;
          svg.appendChild(path2);
          svg.appendChild(path);
          elem.appendChild(svg);
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
    //play pause TTS if enabled. Called when playpause button pressed.
    playpause: function(){
      var synth = window.speechSynthesis;
      if (synth.paused){
        synth.resume();
        this.buttons.playpause = '<i class="fas fa-pause"></i>';
      } else if (!synth.speaking) {
        var content = this.annotations[this.position] ? shared.createContent(this.annotations[this.position], this.currentlang, true) : '';
        this.tts(content);
        this.buttons.playpause = '<i class="fas fa-pause"></i>';
      } else {
        synth.pause();
        this.buttons.playpause = '<i class="fas fa-play"></i>';
      }
    },
    // call function and send broadcast to WS server if enabled
    sendMessage: function(e) {
      if (this.settings.controller){
        e['position'] = this.position;
        e['booleanitems'] = this.booleanitems;
        e['shown'] = this.shown;
        this.socket.emit('broadcast', e);
      }
      this[e['function']](e['args']);
    },
    //Hide annotation if hide button pressed
    hide: function(){
      var element = document.getElementById(`${this.seadragonid}_annotation`);
      element.style.removeProperty("height");
      if(this.booleanitems.isexcerpt){
        this.booleanitems.isexcerpt = false;
        this.buttons.hide_button = '<i class="fas fa-caret-up"></i>'
      } else {
        this.booleanitems.isexcerpt = true;
        this.buttons.hide_button = '<i class="fas fa-caret-down"></i>'
      }
    },
    //when specified button clicked change shown value
    clickButton: function(field){
      var element = document.getElementById(`${this.seadragonid}_annotation`);
      element.style.removeProperty("height");
      if(this.shown === field){
        this.switchButtons()
      } else {
        this.shown = field;
        this.switchButtons(field)
      }
    },
    //boolean switch of value shown
    switchShown: function(item) {
      this.booleanitems[item] = !this.booleanitems[item];
    },
    //Set all buttons to correct value, change specified button and shown value
    switchButtons: function(button=false) {
      this.buttons.info = '<i class="fas fa-info-circle"></i>';
      this.buttons.layer = '<i class="fas fa-layer-group"></i>';
      this.buttons.tags = '<i class="fas fa-tag"></i>';
      if (button){
        if (this.position == -1 || this.position >= this.zoomsections.length) {
          this.buttons[button] = '<i class="fas fa-window-close"></i>'
        } else {
          this.buttons[button] = '<i class="fas fa-file-alt"></i>'
        }
      } else {
        if (this.position == -1 || this.position === this.zoomsections.length){
          this.shown = this.settings.startenddisplay ? this.settings.startenddisplay : false;
        } else {
          this.shown = this.currentanno != '' ? 'anno' : false;
        }
      }
    },
    //for specified tag toggle overlays with that tag
    hideshowalltags: function(tag){
      var elem = this.anno_elem.getElementsByClassName(tag);
      var checked = this.tagslist[tag].checked;
      for (var j=0; j<elem.length; j++){
        var multi = document.querySelectorAll(`#${elem[j].id}`);
        for (var aj=0; aj<multi.length; aj++){
          multi[aj].style.zIndex = 0;
        }
        if (checked === true) {
          elem[j].style.display = 'none';
          this.tagslist[tag].checked = false;
        } else {
          elem[j].style.display = 'block';
          this.tagslist[tag].checked = true;
        }
      }
      var areviewable = Object.values(this.tagslist).map(element => element['checked']);
      if (areviewable.indexOf(true) === -1){
        this.buttons.overlaybutton = '<i class="fas fa-toggle-on"></i>';
        this.booleanitems.isoverlaytoggled = false;
      } else {
        this.buttons.overlaybutton = '<i class="fas fa-toggle-off"></i>';
        this.booleanitems.isoverlaytoggled = true;
      }
      //This is the only way to ensure checkboxes update
      this.shown = false;
      this.shown = 'tags';
    },
    //get Manifest data from manifest and get layerdata
    getManifestData: function(manifestlink, canvas, canvasId){
        axios.get(manifestlink).then(canvas_data => {
          this.getImageInfo(canvas_data, manifestlink)
          var canvases = canvas_data.data.sequences[0].canvases;
          for (var i = 0; i< canvases.length; i++){
            if (canvases[i]['@id'].replace("https", "http") === canvas.replace("https", "http")) {
              var images = canvases[i].images;
              if (!this.imagetitle){
                var title = canvases[i].label;
                title = title && title.constructor.name == 'Object' ? title['@value'] : title;
                this.imagetitle = title && title !== this.imagetitle && canvases.length !== 1  ? this.imagetitle += ': ' + title : this.imagetitle;
              }
            }
          }
          this.getLayerData(images);
          this.buildseadragon(canvasId);
      });
    },
    //set defaults before creating viewer and then create viewer
    buildseadragon: function(canvasId){
      this.settings.startenddisplay ? this.switchButtons(this.settings.startenddisplay) : '';
      this.settings.startenddisplay ? this.shown = this.settings.startenddisplay : '';
      var infoelement = this.settings.additionalinfo ? document.getElementById(this.settings.additionalinfo) : '';
      infoelement ? this.settings.additionalinfotitle = infoelement.title ? infoelement.title : '' : '';
      infoelement ? this.settings.additionalinfo = infoelement.innerHTML : '';
      infoelement ? infoelement.remove() : ''
      this.settings.truncate_length = this.settings.truncate_length ? this.settings.truncate_length : 2;
      if (this.seadragontile === ""){
        var tile = Array.isArray(canvasId) ? canvasId[0] : canvasId;
        tile = tile.split("#")[0];
        tile += tile.slice(-1) !== '/' ? "/" : '';
        this.seadragontile = tile + "info.json";
        this.layerslist.push({'tile': this.seadragontile, 'label': 'Layer 1', checked: true, 'opacity': 1});
        this.getLayerData([]);
      }
      this.createViewer();
      this.anno_elem = document.getElementById(`${this.seadragonid}`);
      this.settings.autorun_interval = this.settings.autorun_interval ? this.settings.autorun_interval : 3;
      this.mapmarker = this.settings.mapmarker ? this.settings.mapmarker : this.mapmarker;
    },
    //get any layers in manfiest and get custom layers. This is called for all viewers and will get the tile if there are no layers
    getLayerData: function(images) {
      for (var i=0; i<images.length; i++){
        var imgResource = images[i].resource;
        var canvas_tile = imgResource.service ? imgResource.service['@id'].split("/full/")[0] : imgResource['@id'];
        canvas_tile = canvas_tile.indexOf('upload.wikimedia.org') > -1 ? 'https://tools.wmflabs.org/zoomviewer/proxy.php?iiif=' + canvas_tile.split("/").slice(-1)[0] : canvas_tile;
        canvas_tile += canvas_tile.slice(-1) !== '/' ? "/" : '';
        var xywh = images[i].on ? images[i].on.split("xywh=").slice(-1)[0].split(",") : '';
        var label = images[i].resource.label ? images[i].resource.label : `Layer ${i + 1}`;
        canvas_tile += 'info.json';
        var checked = this.settings.togglelayers || i == 0 ? true : false;
        var opacity = this.settings.togglelayers || i == 0 ? 1 : 0;
        this.layerslist.push({'tile': canvas_tile, 'xywh':xywh, 'label': label, checked: checked, 'opacity': opacity});
      }
      this.layerslist.length > 0 ? this.seadragontile =  this.layerslist[0].tile : '';
      if (this.$props.layers) {
        var layers = this.$props.layers.replace(/'/gm, '"');
        layers = JSON.parse(layers);
        for (var lay=0; lay<layers.length;lay++){
          var layer_dict = layers[lay];
          var xwyhset = layer_dict['xywh'] ? layer_dict['xywh'].split(",") : [0,0,0,0];
          var section = layer_dict['section'] ? layer_dict['section'].split(",").map(element => parseInt(element)) : '';
          var ischecked = this.settings.togglelayers ? true : false;
          var setopacity = this.settings.togglelayers ? 1 : 0;
          var rotation = layer_dict['rotation'] ? layer_dict['rotation'] : 0;
          this.layerslist.push({'tile': layer_dict['image'], 'xywh':xwyhset, 'label': layer_dict['label'], checked: ischecked, 'opacity': setopacity, 'section': section, 'rotation': rotation});
        }
      }
      this.$parent.multi && this.layerslist.length > 1 ? this.$parent.layerslist = true : '';
    },
    //add layers to viewer
    addLayers: function(){
      this.layerslist[0]['object'] = this.viewer.world.getItemAt(0);
      for(var j=1; j<this.layerslist.length; j++) {
        this.setLayers(this.layerslist[j], j);
      }
    },
    //add tiled image to viewer; This is the function to actually add the image layers
    setLayers: function(layer, position) {
      var xywh = layer.xywh;
      var vue = this;
      var rect = this.viewer.world.getItemAt(0).imageToViewportRectangle(parseInt(xywh[0]), parseInt(xywh[1]), parseInt(xywh[2]), parseInt(xywh[3]));
      var clip = layer.section ? new openseadragon.Rect(layer.section[0], layer.section[1], layer.section[2], layer.section[3]) : 0;
      this.viewer.addTiledImage({
          tileSource: layer.tile,
          x: rect.x,
          y: rect.y,
          width: rect.width,
          opacity: layer.opacity,
          clip: clip,
          degrees: layer.rotation,
          success: function (obj) {
            vue.layerslist[position]['object'] = obj.item;
          }
      });
    },
    //change opacity when layer is clicked or opacity slider is used
    setOpacity: function(data){
      var layerdata = data.layer ? data.layer : data;
      var opacity = data.event ? data.event.target.value/100 : layerdata.opacity > 0 ? 0 : 1;
      layerdata.object.setOpacity(opacity);
      layerdata.opacity = opacity;
      var checked = opacity != 0 ? true : false;
      layerdata.checked = checked;
    },
    //zoom in or out. Used with zoom buttons
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
          this.viewer.viewport.fitBounds(this.viewer.viewport.getHomeBounds());
        } else if (this.settings.fit == 'horizontal') {
          this.viewer.viewport.fitHorizontally();
        } else {
          this.viewer.viewport.fitVertically();
        }
      } else {
        return 0;
      }
    },
    //call TTS for current annotation
    tts: function(text){
      var synth = window.speechSynthesis;
      synth.cancel();
      var div = document.createElement("div");
      div.innerHTML = text;
      var speak = div.textContent;
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
        this.autoRunTTS();
      } else {
        speech.onend = this_functions.autoRunTTS;
      }
      console.log("utterance", speech);
      synth.speak(speech);
      this.buttons.playpause = '<i class="fas fa-pause"></i>';
    },
    // Makes sure that autoRun waits for TTS to finish
    autoRunTTS: function(){
      if (this.isautorunning){
        var this_functions = this;
        var interval = this.settings.autorun_interval*1000;
        this_functions.isautorunning = setTimeout(function(){
          if (this.position === this.zoomsections.length){
            this.position = -1;
          }
          this_functions.next('next');
        }, interval);
      } else {
        clearTimeout(this.isautorunning);
      }
      if(!window.speechSynthesis.speaking && !window.speechSynthesis.pending){
        this.buttons.playpause = '<i class="fas fa-play"></i>';
      }
    },
    //toggles created overlays;
    createOverlay: function(){
      var box_elements = this.anno_elem.getElementsByClassName("overlay");
      var display_setting;
      var checked;
      if (this.booleanitems.isoverlaytoggled){
        display_setting = 'none';
        checked = false;
        this.booleanitems.isoverlaytoggled = false;
        this.buttons.overlaybutton = '<i class="fas fa-toggle-on"></i>';
      } else {
        display_setting = 'block';
        checked = true;
        this.booleanitems.isoverlaytoggled = true;
        this.buttons.overlaybutton = '<i class="fas fa-toggle-off"></i>';
      }
      for (var key in this.tagslist){
        this.tagslist[key].checked = checked;
      }
      for (var a=0; a<box_elements.length; a++){
        box_elements[a].style.display = display_setting;
      }
    },
    //add tracking for overlays so that when clicked they show annotations
    addTracking: function(node, rect, position, functions){
      new openseadragon.MouseTracker({
        element: node,
        clickHandler: function() {
          functions.position = position;
          functions.makeactive(position);
          functions.sendMessage({'function':'next', 'args': functions.position});
          //Check to see if multiple annotations on same section.
          var matching_sections = functions.zoomsections.map((section, i) => section.section.map(sect => functions.zoomsections[position].section.indexOf(sect) > -1).some(x => x === true) ? i : -1)
          matching_sections = matching_sections.filter(index => index != -1);
          //If there is multiple annotations for the same section, add all the text to the box with horizontal lines seperating.
          if (matching_sections.length > 1){
            var multipletexts = '<hr>';
            for (var i=0; i<matching_sections.length; i++){
              multipletexts += shared.createContent(functions.annotations[matching_sections[i]], functions.currentlang);
              multipletexts += '<hr>';
            }
            functions.currentanno = multipletexts;
          }
          functions.goToArea(rect);
          functions.reposition(rect);
          //This is for multistoryboard views. updates the position and data.
          if (functions.$parent.multi) {
            var children = functions.$parent.$children;
            functions.$parent.next_inactive = functions.next_inactive;
            functions.$parent.prev_inactive = functions.prev_inactive;
            for (var ch=0; ch<children.length; ch++){
              children[ch].position = position;
            }
          }
        }
      }).setTracking(true);
    },
    //go to specified area on OpenSeadragon viewer
    goToArea: function(rect){
      var xywh = this.zoomsections[this.position]['section'][0].split(",");
      if (xywh.join("") == 'full'){
        this.zoom('home');
      } else if (this.settings.panorzoom == 'pan'){
        this.viewer.viewport.panTo(new openseadragon.Point(rect['x'], rect['y'])).applyConstraints();
      } else {
        this.viewer.viewport.fitBoundsWithConstraints(rect).ensureVisible();
      }
    },
    //toggle fullscreen button
    toggle_fullscreen: function(){
      var element = this.$parent.range ? this.$parent.$el : this.$el;
      this.$fullscreen.toggle(element, {
        wrap: false,
        callback: this.fullscreenChange
      });
    },
    //when annotation is clicked add active class to overlay.
    makeactive: function(position){
      var currentactive = this.anno_elem.getElementsByClassName("active");
      while(currentactive[0]){
        currentactive[0].classList.remove("active");
      }
      if (Number.isInteger(position)) {
        var node = this.anno_elem.querySelectorAll(`#position${position}`);
        for (var k=0; k<node.length; k++){
          node[k].classList.add('active');
        }
      }
    },
    //on fullscreen change toggle button and set value;
    fullscreenChange (fullscreen) {
      if(fullscreen){
        this.buttons.expandbutton = '<i class="fas fa-compress"></i>';
      } else {
        this.buttons.expandbutton = '<i class="fas fa-expand"></i>';
      }
      this.fullscreen = fullscreen;
      if(this.$parent.range) {
        this.$parent.updateFullScreen(fullscreen, this.buttons.expandbutton);
      }
    },
    // Click of the next button, goes to section and load annotation data.
    // If multiple sections annotated for one annotation center zoom on all annotations.
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
      if (this.settings.tts){
        var content = this.annotations[this.position] ? shared.createContent(this.annotations[this.position], this.currentlang) : '';
        this.tts(content);
      }
      if(this.buttons.overlaybutton.indexOf('toggle-off') == -1){
        var multielements = document.getElementsByClassName("multi");
        for (var we=0; we<multielements.length; we++){
          multielements[we].style.display = "none";
        }
      }
      if (this.zoomsections[this.position] === undefined){
        this.zoom('home');
        this.currentanno = '';
        this.makeactive(undefined);
      } else {
        var numbsections = this.zoomsections[this.position]['section'].length;
        var xywh = this.zoomsections[this.position]['section'][0].split(",");
        if (this.settings.textposition) {
          this.overlayPosition(xywh);
        }
        this.currentanno = shared.createContent(this.annotations[this.position], this.currentlang, true);
        this.currentanno == '' ? this.shown = false : '';
        this.makeactive(this.position);
        if (numbsections <= 1) {
          var rect = this.viewer.world.getItemAt(0).imageToViewportRectangle(parseInt(xywh[0]), parseInt(xywh[1]), parseInt(xywh[2]), parseInt(xywh[3]));
          this.goToArea(rect);
        } else {
          //If more than one section try to fit sections to screen with zoom
          var sections = this.zoomsections[this.position]['section'];
          var xs = sections.map(element => element.split(",")[0]);
          var lowx = Math.min(...xs);
          var highx = Math.max(...xs);
          var ys = sections.map(element => element.split(",")[1]);
          var lowy = Math.min(...ys);
          var highy = Math.max(...ys);
          var ws = sections.map(element => element.split(",")[2]);
          var sumw = ws.reduce((a, b) => parseInt(a) + parseInt(b), 0);
          var width = (highx - lowx) + sumw;
          var highinfo = sections.filter(element => parseInt(element.split(",")[1]) === highy)[0];
          var height = highy - lowy + parseInt(highinfo.split(',')[3]);
          var zoomarea = this.viewer.world.getItemAt(0).imageToViewportRectangle(lowx, lowy, width, height);
          this.goToArea(zoomarea);
          var elements = this.anno_elem.querySelectorAll(`#position${this.position}`);
          for (var tk=0; tk<elements.length; tk++){
            elements[tk].style.display = 'block';
          }
        }
      }
      this.switchButtons();
      //set button classes based on position
      if (this.position >= this.zoomsections.length){
        this.next_inactive = true;
      } else {
        this.next_inactive = false;
      } if (this.position === -1){
        this.prev_inactive = true;
      } else {
        this.prev_inactive = false;
      }
    },
    //For annotation box position, will position box in specified location is set;
    overlayPosition: function(xywh){
      var elem = document.getElementById(`${this.seadragonid}_annotation`);
      var positioning = {
        right: {'x': parseInt(xywh[0])+parseInt(xywh[2]), 'y' : parseInt(xywh[1]), 'placement': 'TOP_LEFT'},
        left: {'x': parseInt(xywh[0]), 'y' : parseInt(xywh[1]), 'placement': 'TOP_RIGHT'},
        top: {'x': parseInt(xywh[0])+(parseInt(xywh[2])/2), 'y': parseInt(xywh[1]), 'placement': 'BOTTOM'},
        bottom: {'x': parseInt(xywh[0])+(parseInt(xywh[2])/2), 'y': parseInt(xywh[1])+parseInt(xywh[3]), 'placement':'TOP'}
      };
      var positions = positioning[this.settings.textposition];
      var overlayrect = this.viewer.world.getItemAt(0).imageToViewportCoordinates(positions['x'], positions['y']);
      var existingoverlay = this.viewer.getOverlayById(`${this.seadragonid}_annotation`);
      var maxwidth = this.viewer.viewport.getContainerSize()['x'] - this.viewer.viewport.pixelFromPoint(new openseadragon.Point(overlayrect['x'], overlayrect['y']))['x'];
      var maxheight = this.viewer.viewport.getContainerSize()['y'] - this.viewer.viewport.pixelFromPoint(new openseadragon.Point(overlayrect['x'], overlayrect['y']))['y'];
      elem.classList.add(`${this.settings.textposition}`);
      var vue = this;
      elem.addEventListener("mouseover",function(){
        vue.enableOSDmouse(false);
      });
      elem.addEventListener("mouseout",function(){
        vue.enableOSDmouse(true);
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
    //Allows for scrolling in annotation box if it is moved to left, right, top or bottom
    enableOSDmouse: function(disable) {
      this.viewer.setControlsEnabled(disable);
      this.viewer.setMouseNavEnabled(disable);
    },
    //Autorun through annotations
    autoRun: function(interval){
      interval = interval * 1000;
      var length = this.zoomsections.length;
      if (this.isautorunning === ''){
        var this_functions = this;
        if (this.settings.tts) {
          this.isautorunning = true;
          this.next('next');
        } else {
          this.isautorunning = setInterval(function() {
            if(this_functions.position >= length){
              this_functions.position = -1;
            }
            this_functions.next('next');
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
  //truncate item in annotation box
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
