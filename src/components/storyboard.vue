<template>
<div id="storyboard_viewer" v-bind:class="[!settings.fullpage && !fullscreen ? 'storyboard_viewer' : 'fullpage']">
  <div style="position:relative; display:flex" v-bind:class="[!settings.annoview || shown == false ? 'defaultview' : settings.annoview == 'sidebyside' ? 'sidebyside' : 'collapse']">
    <div v-bind:id="seadragonid" v-bind:class="[!settings.fullpage && !fullscreen ? 'seadragonbox' : 'seadragonboxfull', settings.toolbarposition && !$parent.multi ? settings.toolbarposition + '_menu_container' : 'default_menu_container']" style="position:relative">
      <span id="header_toolbar" v-if="!$parent.multi && !settings.hide_toolbar" v-bind:class="[settings.toolbarposition && !$parent.multi ? settings.toolbarposition + '_menu' : 'default_menu']">
        <button v-if="shortcuts['autorun']" v-hotkey="shortcuts['autorun']['shortcut']" id="autoRunButton" v-on:click="sendMessage({'function':'autoRun', 'args': settings.autorun_interval});" class="toolbarButton">
          <span v-html="buttons.autorunbutton"></span>
          <span class="toolbartext">Start/Stop Autorun</span>
        </button>
        <button v-hotkey="shortcuts['info']['shortcut']" v-on:click="sendMessage({'function': 'clickButton', 'args': 'info'});" v-if="(imageinfo || annoinfo.text || settings.additionalinfo) && shortcuts['info']"  id="infoButton" class="toolbarButton">
          <span v-html="buttons.info"></span>
          <span class="toolbartext">View source image information</span>
        </button>
        <button v-hotkey="shortcuts['tags']['shortcut']" v-on:click="sendMessage({'function': 'clickButton', 'args': 'tags'});" id="tagsButton" v-if="shortcuts['tags']" class="toolbarButton">
          <span v-html="buttons.tags"></span>
          <span class="toolbartext">Toggle Tags</span>
        </button>
        <button v-hotkey="shortcuts['overlay']['shortcut']" v-if="shortcuts['overlay']" id="overlayButton" v-on:click="sendMessage({'function': 'createOverlay', 'args': ''});" class="toolbarButton">
          <span v-html="buttons.overlaybutton"></span>
          <span class="toolbartext">Toggle Overlays</span>
        </button>
        <button v-hotkey="shortcuts['layers']['shortcut']" v-if="layerslist.length > 1 && shortcuts['layers']" id="layerButton" v-on:click="sendMessage({'function': 'clickButton', 'args': 'layer'});" class="toolbarButton">
          <span v-html="buttons.layer"></span>
          <span class="toolbartext">View layers</span>
        </button>
        <button v-hotkey="shortcuts['zoomin']['shortcut']" v-if="shortcuts['zoomin']" v-on:click="sendMessage({'function': 'zoom', 'args': 'in'});" id="zoomInButton" class="toolbarButton">
          <i class="fas fa-search-plus"></i>
          <span class="toolbartext">Zoom in</span>
        </button>
        <button v-hotkey="shortcuts['zoomout']['shortcut']" v-if="shortcuts['zoomout']" v-on:click="sendMessage({'function': 'zoom', 'args': 'out'});" id="zoomOutButton" class="toolbarButton">
          <i class="fas fa-search-minus"></i>
          <span class="toolbartext">Zoom out</span>
        </button>
        <button v-hotkey="shortcuts['home']['shortcut']" v-if="shortcuts['home']" v-on:click="sendMessage({'function': 'zoom', 'args': 'home'})" id="homeZoomButton" class="toolbarButton">
          <i class="fas fa-home"></i>
          <span class="toolbartext">View full image</span>
        </button>
        <button v-hotkey="shortcuts['prev']['shortcut']" v-if="shortcuts['prev']" id="previousButton" v-on:click="sendMessage({'function': 'next', 'args': 'prev'});" v-bind:class="{ 'inactive' : prev_inactive }" class="toolbarButton">
          <i class="fa fa-arrow-left"></i>
          <span class="toolbartext">Previous Annotation</span>
        </button>
        <button v-hotkey="shortcuts['next']['shortcut']" v-if="shortcuts['next']" id="nextButton" v-on:click="sendMessage({'function': 'next', 'args': 'next'});" v-bind:class="{ 'inactive' : next_inactive }" class="toolbarButton">
          <i class="fa fa-arrow-right"></i>
          <span class="toolbartext">Next Annotation</span>
        </button>
        <button v-hotkey="shortcuts['shortcut']['shortcut']" v-if="shortcuts['shortcut']" v-on:click="sendMessage({'function': 'clickButton', 'args': 'keyboard'});"  id="keyboardShortcutsButton" class="toolbarButton">
          <span v-html="buttons.keyboard"></span>
          <span class="toolbartext">Toggle keyboard shortcuts</span>
        </button>
        <button v-hotkey="shortcuts['fullscreen']['shortcut']" v-if="shortcuts['fullscreen']" v-on:click="sendMessage(({'function': 'toggle_fullscreen', 'args': ''}));"  id="fullScreenButton" class="toolbarButton">
          <span v-html="buttons.expandbutton"></span>
          <span class="toolbartext">Toggle fullscreen</span>
        </button>
      </span>
    </div>
    <div v-bind:id="seadragonid + '_annotation'" class="annotation" v-bind:class="[booleanitems.isexcerpt ? 'excerpt' : 'fullcontent', textposition, settings.toolbarposition ? settings.toolbarposition + '_menu_annotation' : '', settings.hide_toolbar ? 'no_toolbar_annotation' : '']" v-show="shown" tabindex="0">
      <span v-if="!settings.hide_annocontrols && settings.hide_annocontrols !== true" id="annotation_controls">
        <button class="annocontrols_button" id="close_button" v-if="shortcuts['close']" v-on:click="shown = false" v-hotkey="shortcuts['close']['shortcut']">
          <i class="fas fa-times"></i>
        </button>
        <button v-if="shortcuts['hide']" v-hotkey="shortcuts['hide']['shortcut']" id="hide_button" class="annocontrols_button"  v-on:click="sendMessage({'function': 'hide', 'args': ''});">
          <span v-html="buttons.hide_button"></span>
        </button>
        <button id="playpause_button" v-hotkey="shortcuts['playpause']['shortcut']" class="annocontrols_button" v-on:click="sendMessage({'function': 'playpause', 'args': ''});" v-if="settings.tts && shortcuts['playpause']">
          <span v-html="buttons.playpause"></span>
        </button>
        <button id="tags_button" v-if="shortcuts['tags']" class="annocontrols_button" v-on:click="sendMessage({'function': 'clickButton', 'args': 'tags'});">
          <span v-html="buttons.tags"></span>
        </button>
        <button id="info_button" v-if="(imageinfo || annoinfo.text) && shortcuts['info']" class="annocontrols_button" v-on:click="sendMessage({'function': 'clickButton', 'args': 'info'});">
          <span v-html="buttons.info"></span>
        </button>
        <button class="annocontrols_button" v-if="currentanno && transcription && currentanno != transcription && shortcuts['transcription']" v-hotkey="shortcuts['transcription']['shortcut']" v-on:click="sendMessage({'function': 'clickButton', 'args': shown =='anno' ? 'transcription' : shown =='transcription' ? 'anno' : shown });">
          <span v-html="buttons.anno"></span>
        </button>
        <span class="lang-icon" id="lang_button" v-if="languages.length > 0"><select class="lang_drop" v-on:change="sendMessage({'function': 'changeLang', 'args': $event });" v-html="languages.join('')"></select></span>
      </span>
      <div id="layers" v-if="shown == 'layer'" class="content">
        <div v-for="layer in layerslist" v-bind:key="layer.tile">
          <input type="checkbox" class="tagscheck" v-on:click="sendMessage({'function': 'setOpacity', 'args': layer });" v-model="layer.checked">
          <span v-html="layer.label"></span>
          <div class="slidecontainer">Opacity: <input v-on:change="sendMessage({'function': 'setOpacity', 'args': {'event': $event, 'layer': layer} })" type="range" min="0" max="100" v-bind:value="layer.opacity*100" class="slider"></div>
        </div>
      </div>
      <div id="shortcuts" v-if="shown == 'keyboard'" class="content">
        <p>There are multiple possible keyboard shortcuts for each button. They are separated by an 'or'. On Macs 'alt' is the 'option' key</p>
        <table v-if="!booleanitems.isexcerpt">
        <tr>
          <th>Icon</th>
          <th>Keyboard Shortcuts</th>
        </tr>
        <tr v-for="(value, key) in shortcuts" v-bind:id="key + '_tags'" v-bind:key="key" class="keyboard">
          <td>
            <span class="shortcuticon" v-html="value.icon + ' (' + value.label + ')'"></span>
          </td>
          <td><span v-for="(shortcut, index) in value.shortcut" v-bind:key="shortcut"><code>{{shortcut}}</code><span v-if="index != value.shortcut.length - 1"> or </span></span></td>
        </tr>
        </table>
      </div>
      <div id="tags" v-if="shown == 'tags'" class="content">
        <div v-for="(value, key) in tagslist" v-bind:id="key + '_tags'" v-bind:key="key" class="tags">
          <input type="checkbox" class="tagscheck" v-on:click="sendMessage({'function': 'hideshowalltags', 'args': key });" v-model="value.checked">
          <div class="countkey">
           {{key.split("_").join(" ")}}
          <span v-bind:style="'background: ' + value.color" class="tagscount">
            <span v-if="!settings.hide_tagcount">{{value.count}}</span>
          </span>
          </div>
        </div>
      </div>
      <div id="information" style="height: auto;" v-if="shown == 'info'" class="info content">
        <div class="imagetitle"><h1>{{imagetitle}}</h1></div>
        <span v-if="!booleanitems.isexcerpt">
          <button class="infolink buttonlink" v-on:click="sendMessage({'function':'switchShown', 'args': 'additionalinfoshown'});" v-if="settings.additionalinfo">{{settings.additionalinfotitle}}</button>
          <div v-if="booleanitems.additionalinfoshown" v-html="settings.additionalinfo" class="imageinfo"></div>

          <button class="infolink buttonlink" v-on:click="sendMessage({'function':'switchShown', 'args': 'tocshown'});" v-if="$parent.range && $parent.toc.length > 0">{{$parent.toctitle}}</button>
          <div v-if="booleanitems.tocshown" class="tocinfo">
            <div v-for="toc in $parent.toc" v-bind:key="toc.position" v-bind:id="'data_' + toc.position">
              <div class="title"><button class="buttonlink" v-on:click="$parent.nextItemRange(toc.position);">{{toc.label}}</button></div>
              <div class="additionaltext" v-html="toc.description" v-if="toc.description"></div>
            </div>
          </div>

          <button class="infolink buttonlink" v-on:click="sendMessage({'function':'switchShown', 'args': 'annoinfoshown'});" v-if="annoinfo.text">Annotation information</button>
          <div v-if="booleanitems.annoinfoshown" class="annoinfo">
            <span v-html="annoinfo.text"></span>
            <div class="annotationslist">
              <div v-for="annoinfo in annoinfo.annodata" v-bind:key="annoinfo.position" v-bind:id="'data_' + annoinfo.position">
                <div class="title"><button class="buttonlink" v-on:click="sendMessage({'function': 'next', 'args': annoinfo.position});">{{annoinfo.title}}</button></div>
                <div class="additionaltext" v-html="annoinfo.additionaltext"></div>
              </div>
            </div>
          </div>

          <button class="infolink buttonlink" v-if="imageinfo.text" v-on:click="sendMessage({'function':'switchShown', 'args': 'imageinfoshown'});">{{imageinfo.label}}</button>
          <div v-if="booleanitems.imageinfoshown" v-html="imageinfo.text" class="imageinfo"></div>
        </span>
      </div>
      <div id="transcription" v-if="shown == 'transcription'" class="content">
        <span v-if="!booleanitems.isexcerpt && !settings.transcription" v-html="transcription"></span>
        <button v-for="(item, index) in annotations" v-bind:key="index" v-if="!booleanitems.isexcerpt && settings.transcription" v-on:click="sendMessage({'function':'next', 'args': index});" class="buttonastext ocrlink" v-bind:class="[index == position ? 'activeword' : '']">
          <div v-html="item.ocr.join('')" class="ocrtranscription" v-bind:id="'line' + index"></div>
        </button>
        <span v-html="$options.filters.truncate(transcription, settings.truncate_length)" v-if="booleanitems.isexcerpt"></span>
      </div>
      <div id="annotation_text" v-if="shown == 'anno'" class="content">
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
import VueSimpleHotkey from 'vue-simple-hotkey';
Vue.use(VueSimpleHotkey);

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
      transcription: '',
      textposition: 'corner',
      prev_inactive: true,
      next_inactive: false,
      toolbar_id: '',
      booleanitems: {
        isexcerpt: false,
        isoverlaytoggled: false,
        annoinfoshown: false,
        imageinfoshown: false,
        additionalinfoshown: false,
        tocshown: false,
        istranscription: false
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
        'layer': '<i class="fas fa-layer-group"></i>',
        'keyboard': '<i class="fas fa-keyboard"></i>',
        'anno': '<i class="fas fa-file-alt"></i>'
      },
      settings: {},
      currentlang: '',
      languages: [],
      fullscreen: false,
      tagslist: {},
      annoinfo: {'text': '', 'annodata': []},
      imageinfo: {'text': '', 'label': 'Manifest information'},
      imagetitle: '',
      layerslist: [],
      shortcuts: {}
    }
  },
  created() {
    if(this.$parent.range) {
      this.fullscreenChange(this.$parent.isfullscreen);
    }
    var annotationurl = this.annotationlist ? this.annotationlist : this.annotationurl;
    this.settings = shared.getsettings(this, this.$parent.multi);
    var isIE = /*@cc_on!@*/false || !!document.documentMode;
    isIE ? this.settings.tts = false : '';
    this.imagetitle = this.settings.title ? this.settings.title : '';
    var isURL = shared.isURL(annotationurl, this.settings);
    this.seadragonid = isURL['id'] + '_storyboard';
    this.settings.index ? this.seadragonid += `_${this.settings.index}` : '';
    this.settings.annoview == 'collapse' ? this.buttons.hide_button = '<i class="fas fa-caret-left"></i>' : '';
    if(isURL['isURL']){
      axios.get(annotationurl).then(response => {
        this.parseAnnoData(response.data, annotationurl, isURL['isURL'])
      });
    }
  },
  mounted () {
    this.newSocket();
    var annotationurl = this.annotationlist ? this.annotationlist : this.annotationurl;
    var isURL = shared.isURL(annotationurl, '');
    if (!isURL['isURL']) {
      this.parseAnnoData(isURL['json'], annotationurl, isURL['isURL'])
    }
  },
  methods: {
    parseAnnoData: function(annotation, annotationurl, isURL){
      var anno = annotation.resources ? annotation.resources : annotation.items ? annotation.items : annotation;
      anno = [].concat(anno);
      //Get basic annotation information
      this.annoinfo.text += `<div class="listinfo">${isURL ? `<b>Annotation Url: </b><a href="${annotationurl}" target="_blank">${annotationurl}</a><br>` : ``}
      <b>Number of Annotations:</b> ${anno.length}</div>`
      var manifestlink = shared.manifestlink(this.manifesturl, anno[0], annotation);
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
      var lang_drops = this.annotations.filter(element => element.languages);
      if(lang_drops.length > 0){
        var all_langs = shared.flatten(this.annotations.map(element => element.textual_body.map(els => els.language)));
        var lang = all_langs.filter(element => element != undefined && navigator.language.indexOf(element.toLowerCase()) > -1);
        this.currentlang = lang.length > 0 ? lang[0] : all_langs[0];
        var all_drop = shared.flatten(lang_drops, 'languages');
        this.languages = Array.from(new Set(all_drop));
      }
      //If manifest link avaliable use getManifestData() function to match canvas to image.
      //Else use image link listed in the annotation.
      if (manifestlink) {
        this.getManifestData(manifestlink, canvas, canvasId);
      } else {
        this.buildseadragon(canvas);
      }
      //get tags and set corresponding color
      var tags = shared.flatten(this.annotations, 'tags');
      var checked = this.settings.toggleoverlay ? true : false;
      this.tagslist = shared.getTagDict(tags, this.settings, checked);
      this.booleanitems.istranscription = this.settings.transcription && !this.settings.textfirst ? true : false;
    },
    //Create OpenSeadragon viewer and adds listeners for moving in seadragon viewer
    createViewer: function(){
      var fit = this.settings.fit == 'fill' ? true : false;
      var tilesource = shared.getTileFormat(this.seadragontile);
      var osdsettings = {
            id: `${this.seadragonid}`,
            type: "image",
            nextButton: 'next',
            previousButton: 'previous',
            tileSources: tilesource,
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
        }
        // if setting call for toggled and language set to values
        if (vue.settings.toggleoverlay){
          vue.createOverlay();
        }
        if (vue.currentlang) {
          vue.changeLang(vue.currentlang);
        }
        if (vue.settings.startposition != undefined) {
          vue.next(vue.settings.startposition)
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
        if (label === 'title' && j == 1 && !this.settings.title){
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
      var content = shared.createContent(content_data, this.currentlang, true)['anno'];
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
      var annotation = this.annotations[this.position];
      this.currentanno = shared.createContent(annotation, this.currentlang, true)['anno'];
      this.annoinfo.annodata = [];
      for (var ai=0; ai<this.annotations.length; ai++){
        this.getAnnoInfo(this.annotations[ai], ai);
      }
      if (this.settings.tts){
        this.settings.tts = lang;
        this.ttscontent();
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
        var color = this.tagslist[tags] ? this.tagslist[tags].color : this.settings.overlaycolor ? this.settings.overlaycolor : '';
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
          this.settings.activecolor ? path2.style.stroke = this.settings.activecolor : '';
          var origin = `${parseInt(xywh[0])+(parseInt(xywh[2])/2)}px ${parseInt(xywh[1])+(parseInt(xywh[3])/2)}px`;
          path2.style.transformOrigin = origin;
          path2.style.webkitTransformOrigin = origin;
          svg.innerHTML = path2.outerHTML + path.outerHTML;
          elem.appendChild(svg);
        }
        if (color){
          elem.style.borderColor = color;
          elem.style.color = color;
          this.settings.activecolor ? elem.style.cssText += `outline-color: ${this.settings.activecolor}!important` : '';
          this.settings.activecolor ? elem.style.webkitTextStrokeColor = this.settings.activecolor : '';
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
        this.ttscontent();
        this.buttons.playpause = '<i class="fas fa-pause"></i>';
      } else {
        synth.pause();
        this.buttons.playpause = '<i class="fas fa-play"></i>';
      }
    },
    ttscontent: function(){
      var content = this.annotations[this.position] ? shared.createContent(this.annotations[this.position], this.currentlang, true) : '';
      content ? this.tts(content[this.shown]) : '';
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
        this.buttons.hide_button = this.settings.annoview == 'collapse' ? '<i class="fas fa-caret-left"></i>' : '<i class="fas fa-caret-up"></i>' ;
      } else {
        this.booleanitems.isexcerpt = true;
        this.buttons.hide_button = this.settings.annoview == 'collapse' ? '<i class="fas fa-caret-right"></i>' : '<i class="fas fa-caret-down"></i>';
      }
    },
    //when specified button clicked change shown value
    clickButton: function(field){
      var element = document.getElementById(`${this.seadragonid}_annotation`);
      element.style.removeProperty("height");
      if (this.booleanitems.isexcerpt && this.settings.annoview == 'collapse') {
        this.hide();
      }
      var beforechange = this.shown;
      if(this.shown === field){
        this.switchButtons();
      } else {
        this.setShownData(field)
        this.switchButtons(field);
      }
      if (this.settings.tts && (this.shown == 'anno' && beforechange == 'transcription' || beforechange == 'anno' && this.shown == 'transcription')) {
        this.ttscontent();
      }
    },
    //boolean switch of value shown
    switchShown: function(item) {
      this.booleanitems[item] = !this.booleanitems[item];
    },
    setShownData: function(field){
      this.shown = field;
      this.booleanitems.istranscription = field == 'anno' ? false : field == 'transcription' ? true : this.booleanitems.istranscription;
      this.buttons.anno = this.shown == 'anno' ? '<i class="fas fa-pen-nib"></i>' : this.shown =='transcription' ?  '<i class="fas fa-file-alt"></i>' : !this.booleanitems.istranscription ? '<i class="fas fa-file-alt"></i>' : '<i class="fas fa-pen-nib"></i>';
    },
    //Set all buttons to correct value, change specified button and shown value
    switchButtons: function(button=false) {
      this.buttons.info = '<i class="fas fa-info-circle"></i>';
      this.buttons.layer = '<i class="fas fa-layer-group"></i>';
      this.buttons.tags = '<i class="fas fa-tag"></i>';
      this.buttons.keyboard = '<i class="fas fa-keyboard"></i>';
      if (button){
        if (this.position == -1 || this.position >= this.zoomsections.length) {
          this.buttons[button] = '<i class="fas fa-window-close"></i>';
        } else {
          this.buttons[button] = this.buttons.anno;
        }
      } else {
        if (this.position == -1 || this.position === this.zoomsections.length){
          this.shown = this.settings.startenddisplay ? this.settings.startenddisplay : false;
          this.settings.startenddisplay && this.buttons[this.settings.startenddisplay] ? this.buttons[this.settings.startenddisplay] = '<i class="fas fa-window-close"></i>' : '';
        } else {
          this.currentanno != '' && !this.booleanitems.istranscription ? this.setShownData('anno') : this.booleanitems.istranscription ? this.setShownData('transcription') : this.setShownData(false);
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
          elem[j].style.zIndex = 1;
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
            var cleancanvas = canvas.split('/canvas').slice(-1)[0];
            var canvregex = new RegExp(`${cleancanvas}$`,"g");
            if (canvases[i]['@id'].replace("https", "http") === canvas.replace("https", "http") || canvregex.test(canvases[i]['@id'].replace("https", "http"))) {
              var images = canvases[i].images;
              if (!this.settings.title){
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
      infoelement ? infoelement.parentNode.removeChild(infoelement) : ''
      this.settings.truncate_length = this.settings.truncate_length ? this.settings.truncate_length : 2;
      if (this.seadragontile === ""){
        var tile = Array.isArray(canvasId) ? canvasId[0] : canvasId;
        tile = tile.split("#")[0];
        var extension = shared.getExtension(tile);
        if (shared.imageextensions.includes(extension)){
          this.seadragontile = tile;
        } else {
          tile += tile.slice(-1) !== '/' ? "/" : '';
          this.seadragontile = tile + "info.json";
        }
        this.layerslist.push({'tile': this.seadragontile, 'label': 'Layer 1', checked: true, 'opacity': 1});
        this.getLayerData([]);
      }
      this.createViewer();
      this.anno_elem = document.getElementById(`${this.seadragonid}`);
      this.settings.autorun_interval = this.settings.autorun_interval ? this.settings.autorun_interval : 3;
      this.mapmarker = this.settings.mapmarker ? this.settings.mapmarker : this.mapmarker;
      if (this.$parent.multi) {
        this.tagslist.length > 0 ? this.$parent.tags = true : '';
        this.$parent.shortcuts = shared.keyboardShortcuts('multistoryboard', this.$parent)
      }
      this.shortcuts = shared.keyboardShortcuts('storyboard', this);
    },
    //get any layers in manfiest and get custom layers. This is called for all viewers and will get the tile if there are no layers
    getLayerData: function(images) {
      images = images ? images : [];
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
      var tilesource = shared.getTileFormat(layer.tile);
      var rect = this.viewer.world.getItemAt(0).imageToViewportRectangle(parseInt(xywh[0]), parseInt(xywh[1]), parseInt(xywh[2]), parseInt(xywh[3]));
      var clip = layer.section ? new openseadragon.Rect(layer.section[0], layer.section[1], layer.section[2], layer.section[3]) : 0;
      this.viewer.addTiledImage({
          tileSource: tilesource,
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
          if (this_functions.position === this_functions.zoomsections.length){
            this_functions.position = -1;
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
              multipletexts += shared.createContent(functions.annotations[matching_sections[i]], functions.currentlang, true)['anno'];
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
              if (functions.settings.matchclick) {
                children[ch].next(position)
              }
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
        var x = rect['x']+(rect['width']/2);
        var y = rect['y']+(rect['height']/2);
        this.viewer.viewport.panTo(new openseadragon.Point(x,y)).applyConstraints();
      } else {
        this.viewer.viewport.fitBoundsWithConstraints(rect).ensureVisible();
      }
      if (this.settings.textposition) {
        this.overlayPosition(rect);
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
      if (nextorprev === 'prev' && this.position > -1){
        this.position -= 1;
      } else if (nextorprev === 'next' && this.position < this.zoomsections.length) {
        this.position += 1;
      } else if(!isNaN(nextorprev)) {
        this.position = nextorprev;
      } else {
        this.position = this.position;
      }
      if(this.buttons.overlaybutton.indexOf('toggle-off') == -1){
        var multielements = document.getElementsByClassName("multi");
        for (var we=0; we<multielements.length; we++){
          multielements[we].style.display = "none";
        }
      }
      if (this.settings.overlaynext && !this.booleanitems.isoverlaytoggled){
        var overlays = this.anno_elem.getElementsByClassName("overlay");
        for (var ov=0; ov<overlays.length; ov++){
          overlays[ov].style.display = "none";
        }
      }
      if (this.zoomsections[this.position] === undefined){
        this.zoom('home');
        this.currentanno = '';
        this.makeactive(undefined);
        if (this.settings.textposition){
          var elem = document.getElementById(`${this.seadragonid}_annotation`);
          var bounds = this.viewer.viewport.getBounds();
          var point = new openseadragon.Point(bounds['x'],bounds['y']);
          this.viewer.updateOverlay(elem, point);
          elem.style.maxHeight = '';
          elem.style.maxWidth = '';
          this.textposition = 'corner';
        }
      } else {
        var numbsections = this.zoomsections[this.position]['section'].length;
        var xywh = this.zoomsections[this.position]['section'][0].split(",");
        var annotation = this.annotations[this.position];
        var createdContent = shared.createContent(annotation, this.currentlang, true);
        this.currentanno = createdContent['anno'];
        this.transcription = createdContent['transcription'];
        this.currentanno == '' ? this.shown = false : '';
        this.makeactive(this.position);
        if (numbsections <= 1) {
          var rect = this.viewer.world.getItemAt(0).imageToViewportRectangle(parseInt(xywh[0]), parseInt(xywh[1]), parseInt(xywh[2]), parseInt(xywh[3]));
          this.goToArea(rect);
          if (this.settings.overlaynext && !this.booleanitems.isoverlaytoggled){
            var positionelement = this.anno_elem.querySelectorAll(`#position${this.position}`);
            positionelement[0].style.display = 'block';
          }
        } else {
          //If more than one section try to fit sections to screen with zoom
          var sections = this.zoomsections[this.position]['section'];
          var xs = sections.map(element => element.split(",")[0]);
          var lowx = Math.min(...xs);
          var ys = sections.map(element => element.split(",")[1]);
          var lowy = Math.min(...ys);
          var highy = Math.max(...sections.map(element => parseInt(element.split(",")[1]) + parseInt(element.split(",")[3])));
          var height = highy - lowy;
          var width = Math.max(...sections.map(element => parseInt(element.split(",")[0]) + parseInt(element.split(",")[2]))) - lowx;
          var zoomarea = this.viewer.world.getItemAt(0).imageToViewportRectangle(lowx, lowy, width, height);
          this.goToArea(zoomarea);
          var elements = this.anno_elem.querySelectorAll(`#position${this.position}`);
          for (var tk=0; tk<elements.length; tk++){
            elements[tk].style.display = 'block';
          }
        }
      }
      this.switchButtons();
      if (this.settings.tts){
        this.ttscontent();
      }
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
      if (this.$parent.multi && this.isautorunning) {
       this.$parent.autoRunImages()
      }
      if (this.settings.transcription) {
        this.$nextTick(() => {
          var elmnt = document.getElementsByClassName("activeword")[0];
          if (elmnt){
            elmnt.scrollIntoView({behavior: "smooth", block: "center", inline: "nearest"});
          }
        })
      }
    },
    //For annotation box position, will position box in specified location is set;
    overlayPosition: function(xywh){
      xywh = xywh == 'full' ? [0,0,0,0] : xywh;
      var elem = document.getElementById(`${this.seadragonid}_annotation`);
      var positioning = {
        right: {'x': xywh['x']+xywh['width'], 'y' : xywh['y'], 'placement': 'TOP_LEFT', 'inverse': 'left'},
        left: {'x': xywh['x'], 'y' : xywh['y'], 'placement': 'TOP_RIGHT', 'inverse': 'right'},
        top: {'x': xywh['x']+(xywh['width']/2), 'y': xywh['y'], 'placement': 'BOTTOM', 'inverse': 'bottom'},
        bottom: {'x': xywh['x']+(xywh['width']/2), 'y': xywh['y']+xywh['height'], 'placement':'TOP', 'inverse': 'top'}
      };
      var overlaydict = this.getPositionData(positioning, elem);
      if (overlaydict['maxHeight'] < 65 || overlaydict['maxWidth'] < 65) {
        overlaydict = this.getPositionData(positioning, elem, true);
      }
      if (overlaydict['maxHeight'] < 65 || overlaydict['maxWidth'] < 65) {
        overlaydict = this.getPositionData(positioning, elem, false, true);
      }
      var overlayrect = overlaydict['overlayrect'];
      var maxheight = overlaydict['maxHeight'];
      var maxwidth = overlaydict['maxWidth'];
      var positions = overlaydict['positions'];
      this.textposition = overlaydict['textposition'];
      var vue = this;
      elem.addEventListener("mouseover",function(){
        vue.enableOSDmouse(false);
      });
      elem.addEventListener("mouseout",function(){
        vue.enableOSDmouse(true);
      });
      elem.style.maxHeight = `${maxheight-20}px`;
      elem.style.maxWidth = `${maxwidth-20}px`;
      var placement = openseadragon.Placement[positions['placement']]
      if (this.viewer.getOverlayById(`${this.seadragonid}_annotation`)) {
        this.viewer.updateOverlay(elem.id, overlayrect, placement);
      } else {
        this.viewer.addOverlay({
          element: elem,
          location: overlayrect,
          placement: placement
        });
      }
    },
    //Allows for scrolling in annotation box if it is moved to left, right, top or bottom
    enableOSDmouse: function(disable) {
      this.viewer.setControlsEnabled(disable);
      this.viewer.setMouseNavEnabled(disable);
    },
    getPositionData: function(positioning, elem, isinverse=false, inner=false) {
      var inverse = positioning[this.settings.textposition].inverse;
      var textposition = isinverse ? inverse : this.settings.textposition;
      var positions = positioning[textposition];
      var overlayrect = new openseadragon.Point(positions['x'],positions['y']);
      var overlaypixels = this.viewer.viewport.pixelFromPoint(overlayrect);
      var containerpixels = this.viewer.viewport.getContainerSize();
      var maxwidth = textposition == 'right' ?  containerpixels['x'] - overlaypixels['x'] : overlaypixels['x'];
      var maxheight = textposition == 'top' ? overlaypixels['y'] : containerpixels['y'] - overlaypixels['y'];
      if (inner) {
        positions['placement'] = positioning[inverse].placement;
        maxwidth < 65 ? maxwidth = "100" : '';
        maxheight < 65 ? maxheight = "100" : '';
      }
      return {'positions': positions, 'overlayrect': overlayrect, 'maxWidth': maxwidth, 'maxHeight': maxheight, 'textposition': textposition}
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
      string = string ? string.split('<div class="authorship">')[0] : '';
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
