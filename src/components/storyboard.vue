<template>
<div id="storyboard_viewer" class="annonaview" v-bind:class="[!settings.fullpage && !fullscreen ? 'storyboard_viewer' : 'fullpage']">
  <div style="position:relative;" v-bind:class="[!settings.annoview || shown == false ? 'defaultview' : settings.annoview == 'sidebyside' || settings.annoview == 'scrollview' ? 'sidebyside' : 'collapse']">
    <div v-bind:id="seadragonid" v-bind:class="[!settings.fullpage && !fullscreen ? 'seadragonbox' : 'seadragonboxfull', settings.toolbarposition && !$parent.multi ? settings.toolbarposition + '_menu_container' : 'default_menu_container']" style="position:relative">
      <toolbar v-if="!$parent.multi"></toolbar>
      <div v-if="rendered" v-html="rendered" style="position: relative; top: 50%;text-align: center;"></div>
      <annotationbox v-if="settings.annoview != 'sidebyside' && settings.annoview != 'scrollview'"></annotationbox>
    </div>
    <annotationbox v-if="settings.annoview == 'sidebyside' || settings.annoview == 'scrollview'"></annotationbox>
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
import annotationbox from './annotationbox';
import toolbar from './toolbar';
Vue.use(fullscreen);

export default {
  name: 'storyboard',
  components: {
    annotationbox,
    toolbar
  },
  props: {
    'manifesturl':String,
    'annotationurl': String,
    'annotationlist': String,
    'jsonannotation': Object,
    'styling': String,
    'ws': String,
    'layers': String
  },
  data: function() {
    return {
      seadragontile: '',
      position: -1,
      seadragonid: '',
      annotations: [],
      currentanno: '',
      hastranscription: false,
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
      buttons: JSON.parse(JSON.stringify(shared.buttons)),
      settings: {},
      textoverlay: {
        'opacity': 100,
        'fontcolor': '#000000',
        'background': ''
      },
      currentlang: '',
      languages: [],
      fullscreen: false,
      tagslist: {},
      annoinfo: {'text': '', 'annodata': []},
      imageinfo: {'text': '', 'label': 'Image information'},
      imagetitle: '',
      layerslist: [],
      shortcuts: {},
      basecompontent: '',
      rendered: '',
      leaflet: false
    }
  },
  created() {
    this.basecompontent = this.$parent;
    if (this.basecompontent && this.basecompontent.range && !this.$parent.multi){
      this.basecompontent.updateFullScreen(this.basecompontent.isfullscreen);
    }
    var annotationurl = this.annotationurl ? this.annotationurl : this.annotationlist ? this.annotationlist : this.jsonannotation;
    this.settings = shared.getsettings(this, this.$parent.multi);
    var isIE = /*@cc_on!@*/false || !!document.documentMode;
    isIE ? this.settings.tts = false : '';
    this.imagetitle = this.settings.title ? this.settings.title : '';
    var isURL = shared.isURL(annotationurl, this.settings);
    this.seadragonid = 'storyboard_' + isURL['id'];
    this.settings.index ? this.seadragonid += `_${this.settings.index}` : '';
    this.settings.annoview == 'collapse' ? this.buttons.hide = '<i class="fas fa-caret-left"></i>' : '';
    if(isURL['isURL']){
      axios.get(annotationurl).then(response => {
        this.parseAnnoData(response.data, annotationurl, isURL['isURL'])
      }).catch((error) => {this.renderError(annotationurl)});
    }
  },
  watch: {
    annoContent: function(newVal) {
      this.hastranscription = newVal['anno'] && newVal['transcription'] && newVal['anno'] != newVal['transcription']
      if ((newVal['anno'] == '' && newVal['transcription'] == '') || (this.settings.hide_annotationtext)){
        this.shown = false;
      }
    },
    buttons: {
      deep: true,
      handler: function(){
        if (this.$parent.multi){
          this.$parent.buttons = this.buttons;
        }
      }
    }
  },
  mounted () {
    this.newSocket();
    var annotationurl = this.annotationurl ? this.annotationurl : this.annotationlist ? this.annotationlist : this.jsonannotation;
    var isURL = shared.isURL(annotationurl, '');
    if (!isURL['isURL']) {
      this.parseAnnoData(isURL['json'], annotationurl, isURL['isURL'])
    }
  },
  methods: {
    checksubgrouptags: function(key) {
      const groupdict = this.groupTagDict[key];
      const tagstotoggle = groupdict.tags;
      for (var st=0; st<tagstotoggle.length; st++){
        if (groupdict.checked == tagstotoggle[st].checked){
          this.sendMessage({'function': 'hideshowalltags', 'args': tagstotoggle[st]['key']})
        }
      }
    },
    renderError: function(url) {
      if (this.basecompontent.manifestcontents){
        this.getManifestData()
      } else {
        this.rendered = `There was a error with <a href="${url}">${url}</a>`;
      }
    },
    parseAnnoData: function(annotation, annotationurl, isURL){
      this.imagetitle = this.settings.title ? this.imagetitle : annotation.label;
      var anno = shared.getAnnotations(annotation);
      //Get basic annotation information
      this.annoinfo.text += `<div class="listinfo">${isURL ? `<b>Annotation Url: </b><a href="${annotationurl}" target="_blank">${annotationurl}</a><br>` : ``}
      <b>Number of Annotations:</b> ${anno.length}</div>`
      var manifestlink = shared.manifestlink(this.manifesturl, anno[0], annotation);
      //loop through list of annotations
      for (var i = 0; i < anno.length; i++){
        var ondict = shared.on_structure(anno[i]);
        var canvasId = shared.getCanvasId(anno[i]);
        var sections = [];
        var content_data = shared.chars(anno[i]);
        var type = content_data['type'] ? content_data['type'] : 'rect';
        var svg_path = [];
        //get SVG paths for each canvas; add svg path to list for each annotation
        for (var jar=0; jar<canvasId.length; jar++){
          var jarondict = ondict && ondict[jar] ? ondict[jar] : ondict;
          var canvasRegion = shared.canvasRegion(canvasId[jar], jarondict);
          const regions = canvasRegion['canvasRegion'];
          sections.push(regions);
          var canvas = canvasRegion['canvasId'];
          if (canvasRegion['svg']) {
            var idtype = canvasRegion['svg'].getAttribute('id');
            type = idtype ? idtype.split("_")[0] : 'path';
          } 
          if ((regions.split(',')[0] != 0 || regions.split(',')[1] != 0) && regions.split(',')[2] == 0 || regions.split(',')[3] == 0){
            type = 'pin';
          }
          svg_path.push(canvasRegion['svg']);
        }
        content_data = Object.assign({}, content_data, {'section':sections, 'type':type, svg_path: svg_path})
        this.annotations.push(content_data);
        if (content_data['geometry']){
          this.leaflet = 'true';
        }
        if (content_data['styles']) {
          if (content_data['styles']['overlay'] && !this.settings.overlaycolor){
            this.settings.overlaycolor = content_data['styles']['overlay'];
          }
          if (content_data['styles']['activecolor'] && !this.settings.activecolor){
            this.settings.activecolor = content_data['styles']['activecolor'];
          }
          this.settings.tagscolor = this.settings.tagscolor ? Object.assign(content_data['styles'], this.settings.tagscolor) : content_data['styles'];
        }
        this.getAnnoInfo(content_data, i);
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
    },
    tagslistShortcuts: function() {
      //get tags and set corresponding color
      var tags = shared.flatten(this.annotations, 'tags');
      var checked = this.settings.toggleoverlay ? true : false;
      this.tagslist = shared.getTagDict(tags, this.settings, checked);
      this.booleanitems.istranscription = this.settings.transcription && !this.settings.textfirst ? true : false;
      if (this.$parent.multi) {
        Object.keys(this.tagslist).length > 0 ? this.$parent.tags = true : '';
        this.$parent.shortcuts = shared.keyboardShortcuts('multistoryboard', this.$parent);
        this.shortcuts = this.$parent.shortcuts;
      } else {
        this.shortcuts = shared.keyboardShortcuts('storyboard', this);
      }
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
        for (var i=0; i<vue.annotations.length; i++){
          if (vue.annotations[i]['tags'].length > 0){
            for (var jl=0; jl<vue.annotations[i]['tags'].length; jl++){
              vue.createOverlayElement(i, vue.annotations[i]['tags'][jl]);
            }
          } else {
            vue.createOverlayElement(i, vue.annotations[i]['tags']);
          }
        }
        // if setting call for toggled and language set to values
        if (vue.settings.toggleoverlay){
          vue.createOverlay();
        }
        if (vue.currentlang) {
          vue.changeLang(vue.currentlang);
        }
        if (vue.settings.startposition != undefined) {
          vue.next(vue.settings.startposition -1)
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
      var metadata = [{'label': 'Manifest', 'value' : `<a href="${manifestlink}" target="_blank">${manifestlink}</a>`},{'label':'title', 'value': canvas_data.label}, {'label':'description', 'value': canvas_data.description},
      {'label': 'attribution', 'value': canvas_data.attribution},{'label': 'license', 'value': canvas_data.license}]
      metadata = canvas_data.metadata ? metadata.concat(canvas_data.metadata) : metadata;
      canvas_data.sequences && canvas_data.sequences[0].canvases.length > 1 ? this.imageinfo.label = 'Manifest information' : '';
      for (var j=0; j<metadata.length; j++){
        var label = shared.parseMetaFields(metadata[j]['label']);
        var value = shared.parseMetaFields(metadata[j]['value']);
        if (label === 'title' && j == 1 && !this.settings.title){
          this.imagetitle = value;
        }
        if (value && value !== ''){
          this.imageinfo.text += `<div id="${label}">${label ? `<b>${label.charAt(0).toUpperCase() + label.slice(1)}: ` : `` }</b>${value}</div>`
        }
      }
    },
    // Create TOC for each annotation; Gets a list of annotations and corresponding data
    getAnnoInfo: function(content_data, i){
      var title = content_data['label'] ? `${i+1}. ${content_data['label']}` : `Annotation ${i+1}`;
      var content = shared.createContent(content_data, this.currentlang)['anno'];
      var additionaltext = `
        ${ content ? `${this.$options.filters.truncate(content, 5)}<br>` : ``}
        ${content_data['authors'] ? `<b>Authors:</b> ${content_data['authors']}<br>` : ``}
        ${content_data['rights'] ? `<b>Rights:</b> ${content_data['rights']}<br>` : ``}
        ${content_data['tags'].length > 0 ? `<b>Tags:</b> ${content_data['tags'].map(tag => tag['value']).join(", ")}<br>` : ``}`
      this.annoinfo.annodata.push({'title': title, 'position': i, 'additionaltext': additionaltext})
    },
    // On language change, change annotation language; update information language;
    changeLang: function(event){
      var lang = event.target ? event.target.value : event;
      this.currentlang = lang;
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
    createOverlayElement: function(position, tags) {
      var annotation = this.annotations[position];
      tags = tags ? shared.tagsToClass(tags) : '';
      for (var jt=0; jt<annotation['section'].length; jt++){
        var xywh = annotation['section'][jt].split(",");
        if (xywh[0].indexOf('pct') > -1){
          const wh = this.viewer.world.getItemAt(0).getContentSize();
          xywh = [(parseFloat(xywh[1])/100)*wh['x'], (parseFloat(xywh[2])/100)*wh['y'], (parseFloat(xywh[3])/100)*wh['x'], (parseFloat(xywh[4])/100)*wh['y']]
          annotation['section'][jt] = xywh.join(",");
        }
        var imagesize = this.viewer.world.getItemAt(0).getBounds();
        var rect = this.viewer.world.getItemAt(0).imageToViewportRectangle(parseInt(xywh[0]), parseInt(xywh[1]), parseInt(xywh[2]), parseInt(xywh[3]));
        rect = xywh[0] == 'full' ? imagesize : rect;
        // calculate zindex based on coordinates; This allows for boxes that are in other boxes to be clickable.
        var zindex = parseInt(((xywh[0]*xywh[1])/(xywh[2]*xywh[3]))*1000);
        zindex = xywh[0] == 'full' ? 1 : zindex;
        //create div with section
        var elem = document.createElement('div');
        elem.style.display = 'none';
        elem.id = `position${position}`;
        var multi = annotation['section'].length > 1 ? 'multi' : '';
        //set class as overlay and tags and multi if multiple sections for one annotation
        var classes = `overlay ${tags} ${multi}`.trim();
        elem.className = `${annotation['type']} ${classes}`;
        //set color for overlay based on tag color
        var color = this.tagslist[tags] ? this.tagslist[tags].color : this.settings.overlaycolor ? this.settings.overlaycolor : '';
        // If type is 'pin' use mapmarker icon
        if (annotation['type'] === 'pin'){
          elem.innerHTML = this.mapmarker;
          elem.style.fill = color;
          for (var ec=0; ec<elem.children.length; ec++){
            if (elem.children[ec].nodeName == 'svg') {
              for (var c=0; c<elem.children[ec].children.length; c++){
                elem.children[ec].children[c].style.stroke = color;
              }
            }
          }
        } else if (annotation['svg_path'][jt]){
          var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
          //set viewBox based on section. SVG will not show up without this.
          svg.setAttribute('viewBox', xywh.join(" "));
          svg.setAttribute('style', 'position: absolute');
          var path = annotation['svg_path'][jt];
          path.style.stroke = color;
          //path2 is for in the inner line when active
          var path2 = document.createElement(path.tagName);
          for (var att=0; att<path.attributes.length; att++){
            var attribute = path.attributes[att];
            if (attribute.name != 'style'){
              path2.setAttribute(attribute.name, attribute.value);
            }
          }
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
        //set viewBox based on section. SVG will not show up without this.
        this.addTracking(elem, rect, position, this);
        if (annotation.ocr.length > 0){
          //var elem2 = elem.cloneNode(true);
          var innerHTML;
          xywh = xywh.map(elem => parseFloat(elem))
          var svgpathelem = elem.getElementsByTagName('svg').length > 0 ? elem.getElementsByTagName('svg')[0].childNodes[0] : "";
          innerHTML = shared.textOverlayHTML(xywh, annotation.ocr, svgpathelem);
          var elem2 = document.createElementNS("http://www.w3.org/2000/svg", "svg");
            //set viewBox based on section. SVG will not show up without this.
          elem2.setAttribute('viewBox', xywh.join(" "));
          elem2.setAttribute('style', 'position: absolute;');
          elem2.id = `ocr-position${position}`;
          elem2.classList = 'textoverlay';
          elem2.style.userSelect = 'text';
          elem2.style.display = 'none';
          elem2.innerHTML +=  innerHTML;    
          this.viewer.addOverlay({
            element: elem2,
            location: rect
          });
          new openseadragon.MouseTracker({
            element: elem2
          }).setTracking(true);
        }
      }
    },
    //play pause TTS if enabled. Called when playpause button pressed.
    playpause: function(){
      var synth = window.speechSynthesis;
      if (synth.paused){
        synth.resume();
        this.buttons.playpause = shared.buttons['playpauseoff'];
      } else if (!synth.speaking) {
        this.ttscontent();
        this.buttons.playpause = shared.buttons['playpauseoff'];
      } else {
        synth.pause();
        this.buttons.playpause = shared.buttons['playpause'];
      }
    },
    ttscontent: function(){
      var content = this.annotations[this.position] ? shared.createContent(this.annotations[this.position], this.currentlang) : '';
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
    removeHeight: function() {
      var element = document.getElementById(`${this.seadragonid}_annotation`);
      if (element){
        element.style.removeProperty("height");
      }
    },
    close: function(){
      this.shown = false;
      this.setDefaultButtons();
    },
    //Hide annotation if hide button pressed
    hide: function(){
      this.removeHeight();
      const hidesetting =  this.settings.annoview == 'collapse' ? 'collapsehide' : 'hide';
      if(this.booleanitems.isexcerpt){
        this.booleanitems.isexcerpt = false;
        this.buttons.hide = shared.buttons[hidesetting];
      } else {
        this.booleanitems.isexcerpt = true;
        this.buttons.hide = shared.buttons[`${hidesetting}off`];
      }
    },
    //when specified button clicked change shown value
    clickButton: function(field){
      this.removeHeight();
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
      this.setDefaultButtons();
    },
    setDefaultButtons: function() {
      const fields = ['info', 'layer', 'tags', 'keyboard', 'textoverlay']
      for (var fi=0; fi<fields.length; fi++){
        this.buttons[fields[fi]] = shared.buttons[fields[fi]];
      }
      this.buttons.anno = !this.booleanitems.istranscription ? '<i class="fas fa-pen-nib"></i>' : '<i class="fas fa-file-alt"></i>';
    },
    //Set all buttons to correct value, change specified button and shown value
    switchButtons: function(button=false) {
      this.setDefaultButtons();
      if (button){
        if (this.position == -1 || this.position >= this.annotations.length) {
          this.buttons[button] = '<i class="fas fa-window-close"></i>';
        } else {
          this.buttons[button] = !this.booleanitems.istranscription ? '<i class="fas fa-file-alt"></i>' : '<i class="fas fa-pen-nib"></i>';
        }
      } else {
        if (this.position == -1 || this.position === this.annotations.length){
          this.shown = this.settings.startenddisplay ? this.settings.startenddisplay : false;
          this.settings.startenddisplay && this.buttons[this.settings.startenddisplay] ? this.buttons[this.settings.startenddisplay] = '<i class="fas fa-window-close"></i>' : '';
        } else {
          this.currentanno != '' && !this.settings.hide_annotationtext && !this.booleanitems.istranscription ? this.setShownData('anno') : !this.settings.hide_annotationtext && this.booleanitems.istranscription ? this.setShownData('transcription') : this.setShownData(false);
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
        this.booleanitems.isoverlaytoggled = false;
        this.buttons.overlay = shared.buttons['overlay'];
      } else {
        this.booleanitems.isoverlaytoggled = true;
        this.buttons.overlay = shared.buttons['overlayoff'];
      }
      //This is the only way to ensure checkboxes update
      this.shown = false;
      this.shown = 'tags';
    },
    //get Manifest data from manifest and get layerdata
    getManifestData: function(manifestlink, canvas, canvasId){
        if (this.basecompontent.annotationurl && this.basecompontent.annotationurl.images){
          this.manifestDataFunctions(manifestlink, this.basecompontent.manifestcontents, canvas, canvasId, this.basecompontent.annotationurl.images)
        } else if (this.basecompontent.manifestcontents) {
          this.manifestDataFunctions(manifestlink, this.basecompontent.manifestcontents, canvas, canvasId)
        } else {
          axios.get(manifestlink).then(canvas_data => {
            this.manifestDataFunctions(manifestlink, canvas_data.data, canvas, canvasId)
          }).catch((error) => {this.renderError(manifestlink)});
        }
    },
    manifestDataFunctions: function(manifestlink, canvas_data, canvas, canvasId, images='') {
      this.getImageInfo(canvas_data, manifestlink)
      var get_canvas = shared.matchCanvas(canvas_data, canvas, this.imagetitle, images);
      this.imagetitle = get_canvas['title'];
      var canvsimgs = get_canvas['images'];
      this.getLayerData(canvsimgs);
      this.buildseadragon(canvasId);
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
        this.seadragontile = shared.iiifOrImageCheck(tile, true);
        this.layerslist.push({'tile': this.seadragontile, 'label': 'Layer 1', checked: true, 'opacity': 1});
        this.getLayerData([]);
      }
      this.createViewer();
      this.anno_elem = document.getElementById(`${this.seadragonid}`);
      this.settings.autorun_interval = this.settings.autorun_interval ? this.settings.autorun_interval : 3;
      this.mapmarker = this.settings.mapmarker ? this.settings.mapmarker : this.mapmarker;
      this.tagslistShortcuts();
      this.imageinfo.text += `<div id="imageurl"><b>Image URL: </b><a href="${this.seadragontile}" target="_blank">${this.seadragontile}</a></div>`
    },
    //get any layers in manfiest and get custom layers. This is called for all viewers and will get the tile if there are no layers
    getLayerData: function(images) {
      images = images ? images : [];
      for (var i=0; i<images.length; i++){
        var get_ct = shared.getCanvasTile(images[i], true);
        var canvas_tile = get_ct['canvas_tile'];
        var imgResource = get_ct['img_resource'];
        const resourceid = images[i].resource ? shared.getId(images[i].resource) : '';
        var xywh = resourceid && resourceid.constructor.name === 'String' && resourceid.indexOf('xywh') > -1 ? resourceid : shared.on_structure(images[i]) && shared.on_structure(images[i])[0].constructor.name === 'String' ? shared.on_structure(images[i])[0] : '';
        xywh = xywh ? xywh.split("xywh=").slice(-1)[0].split(",") : xywh;
        xywh = xywh.length > 1 ? xywh : ''
        var label = imgResource.label ? imgResource.label : `Layer ${i + 1}`;
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
      var speak = shared.stripHTML(text);
      var speech = new SpeechSynthesisUtterance(speak);
      var lang = this.currentanno ? this.currentanno['language'] : '';
      speech.lang = lang ? lang : this.settings.tts;
      var voice = synth.getVoices().filter(function(voice) {
        var currentlang = speech.lang;
        return currentlang.length == 2 ? voice.lang.split("-")[0] == currentlang : voice.lang == currentlang;
      })
      speech.voice = voice ? voice[0] : synth.getVoices()[0];
      var this_functions = this;
      speech.onstart = function() {
        this_functions.buttons.playpause = shared.buttons['playpauseoff'];
      }
      if (!text){
        this.autoRunTTS();
      } else {
        speech.onend = this_functions.autoRunTTS;
      }
      console.log("utterance", speech);
      synth.speak(speech);
      this.buttons.playpause = shared.buttons['playpauseoff'];
    },
    // Makes sure that autoRun waits for TTS to finish
    autoRunTTS: function(){
      if (this.isautorunning){
        var this_functions = this;
        var interval = this.settings.autorun_interval*1000;
        this_functions.isautorunning = setTimeout(function(){
          if (this_functions.position === this_functions.annotations.length){
            this_functions.position = -1;
          }
          this_functions.next('next');
        }, interval);
      } else {
        clearTimeout(this.isautorunning);
      }
      if(!window.speechSynthesis.speaking && !window.speechSynthesis.pending){
        this.buttons.playpause = shared.buttons['playpause'];
      }
    },
    //toggles created overlays;
    createOverlay: function(classname){
      classname = classname ? classname : 'overlay';
      var box_elements = this.anno_elem.getElementsByClassName(classname);
      var display_setting;
      var checked;
      var togglestatus = this.booleanitems[`is${classname}toggled`];
      if (togglestatus){
        display_setting = 'none';
        checked = false;
        this.booleanitems[`is${classname}toggled`] = false;
        if (shared.buttons[`${classname}off`]){
          this.buttons[classname] = shared.buttons[classname];
        }
      } else {
        display_setting = 'block';
        checked = true;
        this.booleanitems[`is${classname}toggled`] = true;
        if (shared.buttons[`${classname}off`]){
          this.buttons[classname] = shared.buttons[`${classname}off`];
        }
      }
      if (classname == 'overlay'){
        for (var key in this.tagslist){
          this.tagslist[key].checked = checked;
        }
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
          var matching_sections = functions.annotations.map((section, i) => section.section.map(sect => functions.annotations[position].section.indexOf(sect) > -1).some(x => x === true) ? i : -1)
          matching_sections = matching_sections.filter(index => index != -1);
          //If there is multiple annotations for the same section, add all the text to the box with horizontal lines seperating.
          if (matching_sections.length > 1){
            functions.currentanno = matching_sections.map(section => functions.annotations[section]);
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
      const currentanno = Array.isArray(this.currentanno) ? this.currentanno[0] : this.currentanno;
      var xywh = currentanno['section'][0].split(",");
      var isFull = xywh.join("") == 'full';
      rect['height'] == 0 && rect['width'] == 0 ? rect['height'] = .001 : '';
      if (isFull){
        this.zoom('home');
      } else if (this.settings.panorzoom == 'pan'){
        var x = rect['x']+(rect['width']/2);
        var y = rect['y']+(rect['height']/2);
        this.viewer.viewport.panTo(new openseadragon.Point(x,y)).applyConstraints();
      } else {
        this.viewer.viewport.fitBoundsWithConstraints(rect).ensureVisible();
      }
      if (this.settings.textposition) {
        var position = isFull ? 'full' : rect;
        this.overlayPosition(position);
      }
    },
    //toggle fullscreen button
    toggle_fullscreen: function(){
      var element = this.basecompontent.range ? this.basecompontent.$el : this.$el;
      this.$fullscreen.toggle(element, {
        wrap: false,
        callback: this.fullscreenChange
      });
    },
    toggletranscription: function(){
      const switchto = this.booleanitems.istranscription ? 'anno' : 'transcription';
      this.setShownData(switchto);
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
      this.fullscreen = fullscreen;
      if(this.basecompontent.range) {
        this.basecompontent.updateFullScreen(fullscreen);
      }
    },
    // Click of the next button, goes to section and load annotation data.
    // If multiple sections annotated for one annotation center zoom on all annotations.
    next: function(nextorprev){
      this.removeHeight();
      if (nextorprev === 'prev' && this.position > -1){
        this.position -= 1;
      } else if (nextorprev === 'next' && this.position < this.annotations.length) {
        this.position += 1;
      } else if(!isNaN(nextorprev)) {
        this.position = nextorprev;
      } else {
        this.position = this.position;
      }
      if(this.buttons.overlay.indexOf('toggle-off') == -1){
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
      this.currentanno = this.annotations[this.position];
      if (this.currentanno === undefined){
        this.zoom('home');
        this.currentanno = '';
        this.makeactive(undefined);
        if (this.settings.textposition){
          var elem = document.getElementById(`${this.seadragonid}_annotation`);
          var bounds = this.viewer.viewport.getBounds();
          var point = new openseadragon.Point(bounds['x'],bounds['y']);
          this.viewer.updateOverlay(elem, point, 'TOP_RIGHT');
          elem.style.maxHeight = '';
          elem.style.maxWidth = '';
          this.textposition = 'corner';
        }
      } else {
        var numbsections = this.currentanno['section'].length;
        var xywh = this.currentanno['section'][0].split(",");
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
          var sections = this.currentanno['section'];
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
      if (this.position >= this.annotations.length){
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
          var activeword = document.getElementsByClassName("activeword")[0];
          if (activeword){
            var annotationElement = document.getElementById(`${this.seadragonid}_annotation`);
            annotationElement.scrollTop = activeword.offsetTop - annotationElement.offsetTop;
          }
        })
      }
    },
    //For annotation box position, will position box in specified location is set;
    overlayPosition: function(xywh){
      if (xywh == 'full'){
        var bounds = this.viewer.viewport.getBounds();
        var imagebounds = {'x':0, 'y':0, 'width': .99, 'height': bounds['height']}
        xywh = bounds['width'] > 1 || bounds['height'] > 1 ? imagebounds : bounds;
      }
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
      var length = this.annotations.length;
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
        this.buttons.autorun = shared.buttons['autorunoff'];
      } else {
        clearInterval(this.isautorunning);
        this.isautorunning = '';
        this.buttons.autorun = shared.buttons['autorun'];
      }
    },
    createAnnoContent: function(anno) {
      var annocontent = []
      var transcriptcontent = []
      if (Array.isArray(anno)) {
        for (var i=0; i<anno.length; i++){
          var multicreateContent = shared.createContent(anno[i], this.currentlang);
          if (multicreateContent['anno']){
            annocontent.push(multicreateContent['anno']);
          }
          if (multicreateContent['transcription']) {
            transcriptcontent.push(multicreateContent['transcription']);
          }
        }
        annocontent = annocontent.join("<hr>");
        transcriptcontent = transcriptcontent.join("<hr>")
      } else {
        var createContent = shared.createContent(anno, this.currentlang);
        transcriptcontent = createContent['transcription'];
        annocontent = createContent['anno'];
      }
      annocontent = annocontent ? annocontent : transcriptcontent;
      return {'anno': annocontent, 'transcription': transcriptcontent };
    }
  },
  computed: {
    groupTagDict: function(){
      const grouplist = shared.groupBy(this.tagslist, 'group');
      return grouplist;
    },
    annoContent: function(){
      return this.createAnnoContent(this.currentanno);
    }
  },
  //truncate item in annotation box
  filters: {
    truncate: function(string, words_length) {
      string = string ? string.split('<div class="tags">')[0] : '';
      string = string ? string.split('<div class="authorship">')[0] : '';
      var text = shared.stripHTML(string);
      return truncate(text, words_length, { byWords: true });
    }
  }
}
</script>

<style lang="scss">
@import '../iiif-annotation.scss';
</style>
