<template>
  <div class="iiifannotation"  v-if="rendered === true">
    <select v-if="languages.length > 0" class="lang_drop" v-on:change="changeLang($event)" v-html="languages.join('')"></select>
    <div v-for="item in annotation_items" :key="item.id" :id="item.id">
      <span v-for="image in item.image" :key="image">
      <span v-html="image" id="annoimage"></span>
      </span>
      <img v-if="item.fullImage && !settings.image_only && !settings.hide_viewlarger" v-bind:src="item.fullImage" style="display:none;" id="fullimage" v-bind:alt="manifest['label']" v-bind:style="[settings.imagesettings !== undefined ? settings.imagesettings : '']">
      <div id="content" v-if="item.rendered_content && item.rendered_content !== '' && settings.image_only !== true" v-html="item.rendered_content"></div>
      <div id="tags">
        <div v-if="!settings.hide_tags && item.tags" v-for="tag in item.tags" v-bind:key="tag" class="tags">
          <div class="countkey">
            {{tag}}
            <span class="tagscount" v-bind:style="[counts[tag] ? {background: counts[tag].color }: {}]">
              <span v-if="!settings.hide_tagcount && annotation_items.length > 1 && counts[tag]">{{counts[tag].count}}</span>
            </span>
          </div>
        </div>
      </div>
      <button v-on:click="toggle($event)" class="togglebutton" v-if="item.fullImage && item.fullImage !== '' && !settings.hide_viewlarger !== false">View Full Image</button>
      <div id="link_to_object" v-if="!settings.hide_fullobject && full_object && full_object !== '' && !settings.image_only && !settings.text_only">
        Full object: <a v-bind:href="full_object" target="_blank">{{manifest["label"]}}</a>
      </div>
    </div>
  </div>
  <div v-else-if="rendered === false">
  "{{annotationlist}}{{annotationurl}}" did not render. Please ensure your annotation link is correct.<br>
  Make sure the annotation contains a link to a working manifest. If it does not add manifest url to tag using the "manifesturl" property.<br>
  Also ensure you did not sure the wrong property for your annotation (annotationlist for lists of annotations and annotationurl for single annotations)
  </div>
</template>

<script>
import axios from 'axios';
import shared from './shared';

export default {
  name: 'iiifannotation',
  props: {
    'annotationurl': {type: String, required: false},
    'annotationlist':{type: String, required: false},
    'manifesturl':{type: String, required: false},
    'styling': {type: String, required: false}
  },
  data: function() {
    return {
      anno: '',
      manifest: '',
      settings: {},
      manifestlink: '',
      annotation_items: [],
      rendered: '',
      annotation_json: '',
      languages: [],
      counts: {}
      }
  },
  created() {
    this.settings = shared.getsettings(this.styling); //get settings

    //CSS custom height/width settings
    if (this.settings.height){
      var width = this.settings.width ? `${this.settings.width}px` : 'auto';
      this.settings.imagesettings = {'height':`${this.settings.height}px`, 'width':width};
    } else if (this.settings.width) {
      this.settings.imagesettings = {'width':`${this.settings.width}px`};
    }

    //get annotation URL and get annotation data
    var annotation_json = this.annotationlist ? this.annotationlist : this.annotationurl;
    this.annotation_json = this.parseInput(annotation_json);
    if (this.annotation_json.constructor === String){
      axios.get(this.annotation_json).then(response => {
        this.parseAnnoManifest(response.data)
      }).catch((error) => {this.rendered = false;console.log(error);})
    } else {
      var annotation_data = this.annotation_json;
      this.annotation_json = this.annotation_json['@id'] ? this.annotation_json['@id'] : this.annotation_json['id'];
      this.parseAnnoManifest(annotation_data);
    }
  },
  methods: {
    parseAnnoManifest: function(annotation_data){
      this.anno = annotation_data.resources ? annotation_data.resources : annotation_data.items ? annotation_data.items : annotation_data;
      this.anno = Array.isArray(this.anno) ? this.anno : [].concat(this.anno);
      this.manifestlink = shared.manifestlink(this.manifesturl, this.anno[0], annotation_data);
      if (this.manifestlink && !this.settings.text_only) {
        this.getManifestData()
      } else {
        this.annoloop(false)
      }
    },
    parseInput: function(annotation) {
      try {
        return JSON.parse(document.getElementById(annotation).innerHTML)
      }
      catch(err) {
        return annotation;
      }
    },
    //toggle hide/view full image
    toggle: function(event){
      var parent = event.target.parentElement;
      var fullImage = parent.querySelector("#fullimage");
      var change_html = event.srcElement !== undefined ?  event.srcElement : event.target;
      if (fullImage.style.display === 'none'){
        fullImage.style.display='inline-block';
        change_html.innerHTML = "Hide Full Image";
      } else {
        fullImage.style.display= 'none';
        change_html.innerHTML = "View Full Image";
      }
    },
    //get full image URL
    getImages: function(baseImageUrl, canvasRegion, size, jpgformat='default.jpg'){
      baseImageUrl = baseImageUrl.indexOf('upload.wikimedia.org') > -1 ? `https://tools.wmflabs.org/zoomviewer/proxy.php?iiif=${baseImageUrl.split('/').slice(-1)[0]}` : baseImageUrl;
      var extension = shared.getExtension(baseImageUrl);
      var imageurl = shared.imageextensions.includes(extension) ? baseImageUrl : `${baseImageUrl}/${canvasRegion}/${size}/0/${jpgformat}`;
      var fullImage = shared.imageextensions.includes(extension) ? baseImageUrl : canvasRegion !== "full" ? `${baseImageUrl}/full/${size}/0/${jpgformat}` : '';
      return {'fullImage':fullImage, 'imageurl': imageurl};
    },
    //get manifest data from URL
    getManifestData: function(){
      axios.get(this.manifestlink).then(response => {
        this.manifest = response.data;
        this.annoloop(true);
      }).catch((error) => {this.rendered = false; console.log(error);})
    },
    // when annotation has choice, change language
    changeLang: function(event){
      var lang = event.target ? event.target.value : event;
      for(var ai=0; ai<this.annotation_items.length; ai++){
        this.annotation_items[ai]['rendered_content'] = shared.createContent(this.annotation_items[ai]['content'], lang);
      }
    },
    // Loop through annotations
    annoloop: function(hasmanifest) {
      for (var i =0; i < this.anno.length; i++){
        var dictionary = this.getImageData(this.anno[i], this.annotation_json, i); //get image data for annotation
        var ondict = shared.on_structure(this.anno[i]);
        var canvasId = this.anno[i].target !== undefined ? this.anno[i].target : ondict[0].full ? ondict.map(element => element.full) : shared.flatten(ondict);
        canvasId = [].concat(canvasId);
        // Get custom size values
        var size;
        var width = this.settings.width ? this.settings.width : this.manifestlink.indexOf('iiif/2.0') > -1 ? '1200' : '';
        var height = this.settings.height ? this.settings.height : '';
        size = `${width}${height}` != '' ? `${width},${height}` : 'full';
        // If has manifest take canvas ids and check canvas against manifest to get image
        if (hasmanifest) {
          var imagedata = this.getManifestCanvas(canvasId, this.anno[i], dictionary, size)
          dictionary['image'] = dictionary['image'].concat(imagedata['image']);
          dictionary['fullImage'] = imagedata['fullImage'];
        } else if (!this.settings.text_only) {
          //If image does not have a manifest go through canvases, get image urls and create HTML img or svg element
          for (var cn = 0; cn < canvasId.length; cn++){
            var canvasItem = canvasId[cn]
            var canvasRegion = shared.canvasRegion(canvasItem, undefined);
            var imagedict = this.getImages(canvasRegion['canvasId'], canvasRegion['canvasRegion'], size);
            var imageurl = imagedict['imageurl'];
            dictionary['fullImage'] = imagedict['fullImage']
            var imagehtml = this.createimagehtml(imageurl, canvasRegion, dictionary, ondict, cn);
            dictionary['image'].push(imagehtml.outerHTML);
          }
        }
        // If received image render element
        if (dictionary['image'].length == 0 && !this.settings.text_only){
          this.rendered = false;
        } else {
          this.rendered = true;
        }
        this.annotation_items.push(dictionary);
      }
      var alltags = shared.flatten(this.annotation_items.map(element=>element['tags']));
      this.counts = shared.getTagDict(alltags, this.settings, '');
    },
    // Create SVG elements and corresponding image
    createimagehtml: function(imageurl, canvasRegion, dictionary, ondict, cn) {
      var imagehtml;
      var isderivative = imageurl.indexOf('img/derivatives') > -1;
      var extension = shared.getExtension(canvasRegion['canvasId']);
      var path = shared.getSVGoverlay(ondict[cn]);
      isderivative ? imageurl = dictionary['fullImage'] : '';
      if (path && !isderivative) {
        imagehtml = this.createSVG(imageurl, canvasRegion['canvasRegion'], dictionary, path, cn)
      } else {
        imagehtml = document.createElement("img");
        imagehtml.setAttribute('src', imageurl);
        imagehtml.setAttribute('alt', dictionary['altText']);
      }
      if (shared.imageextensions.includes(extension) || isderivative) {
       var canv = document.createElement('canvas');
       canv.id = `${dictionary['id']}_canvas`
       canv.onload = this.writecanvas(imagehtml, canvasRegion['canvasRegion'], canv.id, path);
       imagehtml = canv;
      }
      for (var key in this.settings.imagesettings){
        imagehtml.style[key] = this.settings.imagesettings[key];
      }
      return imagehtml;
    },
    createSVG: function(imageurl, regionCanvas, dictionary, path, position) {
      var id = dictionary['id'] + '-' + position;
      var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      svg.setAttribute('viewBox', regionCanvas.split(",").join(" "));
      svg.setAttribute('aria-label', dictionary['altText']);
      for (var key in this.settings.imagesettings){
        svg.style[key] = this.settings.imagesettings[key];
      }
      var inner = `<defs><pattern patternUnits="objectBoundingBox" id="${id}"  width="100%" height="100%">
      <image xlink:href="${imageurl}" width="100%" height="100%" x="0" y="0" />
      </pattern></defs>`
      path.setAttribute("fill", `url(#${id})`);
      path.setAttribute("fill-opacity", "1");
      path.setAttribute("stroke", "none")
      svg.innerHTML = inner + path.outerHTML;
      return svg;
    },
    writecanvas: function(img, xywh, id) {
      setTimeout(function(){
        xywh = xywh.split(',')
        var canvas1 = document.getElementById(id); //find new canvas we created
        var context = canvas1.getContext('2d');
        canvas1.width = xywh[2]
        canvas1.height = xywh[3]
        context.drawImage(img, -xywh[0], -xywh[1]); //draws background image
      }, 1599);
    },
    //gets image by matching against manifest
    getManifestCanvas: function(canvasId, anno, dictionary, size){
      var images = [];
      var fullImage;
      for (var cn = 0; cn < canvasId.length; cn++){
        var canvasItem = canvasId[cn];
        var ondict = shared.on_structure(anno);
        var canvasRegion = shared.canvasRegion(canvasItem, ondict[cn]);
        for(var idx = 0; idx < this.manifest.sequences[0].canvases.length; idx++){
          var existing = this.manifest.sequences[0].canvases[idx];
          if(existing['@id'].replace("https", "http") === canvasRegion['canvasId'].replace("https", "http")){
            var canvas = existing;
          }
        }
        var regionCanvas = canvasRegion['canvasRegion'];
        var baseImageUrl;
        if (canvas === undefined) {
          baseImageUrl = canvasItem.split("#")[0];
        } else {
          baseImageUrl = canvas.images[0].resource.service ? canvas.images[0].resource.service['@id'] : canvas.images[0].resource['@id'];
        }
        //get jpg format
        var resourceid = canvas.images[0].resource['@id'] && canvas.images[0].resource['@id'].includes('/full') ? canvas.images[0].resource['@id'] : '';
        var jpgformat = resourceid ? resourceid.split("/").slice(-1)[0] : 'default.jpg';
        size = size != 'full' ? size : resourceid ? resourceid.split("/").slice(-3)[0] : 'full';
        var imagedict = this.getImages(baseImageUrl, regionCanvas, size, jpgformat);
        fullImage = imagedict['fullImage'];
        //construct image URL
        var imageurl = imagedict['imageurl'];
        dictionary['fullImage'] = fullImage;
        var imagehtml = this.createimagehtml(imageurl, canvasRegion, dictionary, ondict, cn);
        images.push(imagehtml.outerHTML)
      }
      return {'fullImage': fullImage, 'image': images}
    },
    //get all image data
    getImageData: function(anno, annotation_json, i){
      var dictionary = {'image':[]};
      if (this.settings.image_only !== true){
        var dict = shared.chars(anno);
        dict['authors'] = shared.getAuthor(anno);
        this.languages = dict['languages'] ? [...new Set(this.languages.concat(dict['languages']))] : this.languages;
        var all_langs = dict['textual_body'].map(el => el.language);
        var langs = all_langs.filter(element => navigator.language.indexOf(element) > -1);
        this.currentlang = langs.length > 0 ? langs[0] : this.currentlang ? this.currentlang : dict['textual_body'][0] && dict['textual_body'][0]['language'];
        dictionary['rendered_content'] = shared.createContent(dict, this.currentlang);
        dictionary['content'] = dict;
        dictionary['id'] = annotation_json.split("/").slice(-1).pop().replace(".json", "") + i;
        dictionary['altText'] = dict['ocr'].length > 0 ? dict['ocr'][0] : dict['label'] !== undefined ? dict['label'] : `Image section of "${this.manifest['label']}"`;
        dictionary['altText'] = dictionary['altText'].replace(/(\r\n|\n|\r)/gm, " ");
        dictionary['tags'] = dict['tags'].length > 0 ? dict['tags'] : "";
      } else {
        dictionary['altText'] = `Image section of "${this.manifest['label']}"`;
        dictionary['id'] = annotation_json.split("/").slice(-1).pop().replace(".json", "") + i;
        this.settings.hide_viewlarger = true;
      }
      return dictionary;
    }
  },
  computed: {
    // get full object URL
    full_object: function(){
      var link;
      var keys = Object.keys(this.manifest);
      if (keys.indexOf("related") > -1){
        if (typeof this.manifest.related === 'string'){
          link = this.manifest.related;
        } else {
          link = this.manifest.related['@id'];
        }
      } else {
          link = keys.indexOf("seeAlso") > -1 ? this.manifest.seeAlso['@id'] : '';
      }
      return link;
    }
  }
}
</script>

<style lang="scss">
@import '../iiif-annotation.scss'
</style>
