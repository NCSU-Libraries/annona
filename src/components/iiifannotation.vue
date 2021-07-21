<template>
  <div class="iiifannotation annonaview" v-bind:id="annotationid + '_imageview'">
    <select v-if="languages.length > 0" class="lang_drop" v-on:change="changeLang($event)" v-html="languages.join('')"></select>
    <div v-if="rendered === 'emptylist'">
      Could not find any annotations for "{{annotationurl}}"
    </div>
    <defaultimageview v-bind:compdata="this.$data" v-else-if="rendered && !settings.table_view"></defaultimageview>
    <tableview v-bind:compdata="this.$data" v-else-if="rendered && settings.table_view"></tableview>
    <div v-else-if="rendered === false">
      "{{annotationurl}}" did not render. Please ensure your annotation link is correct.<br>
      Make sure the annotation contains a link to a working manifest. If it does not add manifest url to tag using the "manifesturl" property.<br>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import shared from './shared';
import defaultimageview from './defaultimageview';
import tableview from './tableview';

export default {
  name: 'iiifannotation',
  components: {
    defaultimageview,
    tableview
  },
  props: {
    'annotationurl': {type: String, required: false},
    'annotationlist': {type: String, required: false},
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
      languages: [],
      annotationid: '',
      textoverlay: false,
      leaflet: false
    }
  },
  created() {
    this.settings = shared.getsettings(this); //get settings
    //CSS custom height/width settings
    if (this.settings.height){
      var width = this.settings.width ? `${this.settings.width}px` : 'auto';
      this.settings.imagesettings = {'height':`${this.settings.height}px`, 'width':width};
    } else if (this.settings.width) {
      this.settings.imagesettings = {'width':`${this.settings.width}px`};
    }

    //get annotation URL and get annotation data
    this.annotationurl = this.annotationurl ? this.annotationurl : this.annotationlist;
    var isURL = shared.isURL(this.annotationurl, this.settings);
    this.annotationid = isURL['id'];
    if (isURL['isURL']){
      axios.get(this.annotationurl).then(response => {
        this.parseAnnoManifest(response.data)
      }).catch((error) => {this.rendered = false;console.log(error);})
    } else {
      this.parseAnnoManifest(isURL['json']);
    }
  },
  methods: {
    parseAnnoManifest: function(annotation_data){
      this.anno = shared.getAnnotations(annotation_data);
      if (annotation_data.hits){
        this.anno.map(elem => elem['hits'] = annotation_data.hits.filter(hit => hit.annotations.indexOf(elem['@id']) > -1)[0])
      }
      this.manifestlink = shared.manifestlink(this.manifesturl, this.anno[0], annotation_data);
      this.anno.length == 0 ? this.rendered = 'emptylist' : '';
      if (this.manifestlink && !this.settings.text_only) {
        this.getManifestData()
      } else {
        this.annoloop(false)
      }
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
        this.annotation_items[ai]['rendered_content'] = shared.createContent(this.annotation_items[ai]['content'], lang, true)['anno'];
      }
    },
    // Loop through annotations
    annoloop: function(hasmanifest) {
      for (var i =0; i < this.anno.length; i++){
        var dictionary = this.getImageData(i); //get image data for annotation
        var canvasId = shared.getCanvasId(this.anno[i]);
        // Get custom size values
        var size;
        var width = this.settings.width ? this.settings.width : this.manifestlink.indexOf('iiif/2.0') > -1 && !this.settings.height ? '1200' : '';
        var height = this.settings.height ? this.settings.height : '';
        size = `${width}${height}` != '' ? `${width},${height}` : 'full';
        // If has manifest take canvas ids and check canvas against manifest to get image
        if (hasmanifest) {
          var imagedata = this.getManifestCanvas(canvasId, this.anno[i], dictionary, size);
          dictionary['image'] = dictionary['image'].concat(imagedata['image']);
          dictionary['fullImage'] = imagedata['fullImage'];
        } else if (!this.settings.text_only) {
          //If image does not have a manifest go through canvases, get image urls and create HTML img or svg element
          for (var cn = 0; cn < canvasId.length; cn++){
            var canvasItem = canvasId[cn];
            var canvasRegion = shared.canvasRegion(canvasItem, undefined);
            var imagedict = shared.getImages(canvasRegion['canvasId'], canvasRegion['canvasRegion'], size);
            var imageurl = imagedict['imageurl'];
            dictionary['fullImage'] = imagedict['fullImage']
            var imagehtml = this.createimagehtml(imageurl, canvasRegion, dictionary, cn);
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
      if (!this.settings.image_only && !this.settings.hide_tags){
        var alltags = shared.flatten(this.annotation_items.map(element=>Object.values(element['tags'])));
        var vue = this;
        if (alltags.length > 0){
          const counts = shared.getTagDict(alltags, vue.settings, '');
          for (var ai=0; ai<vue.annotation_items.length; ai++){
            if (vue.annotation_items[ai].tags){
              vue.annotation_items[ai].tags.map(elem =>  counts[shared.tagsToClass(elem)])
              vue.annotation_items[ai]['tags'] = vue.annotation_items[ai].tags.map(elem =>  counts[shared.tagsToClass(elem)]);
            }
          }
        }
      }
    },
    // Create SVG elements and corresponding image
    createimagehtml: function(imageurl, canvasRegion, dictionary, cn) {
      var imagehtml;
      var isderivative = imageurl.indexOf('img/derivatives') > -1;
      var extension = shared.getExtension(canvasRegion['canvasId']);
      var path = canvasRegion['svg'];
      var textoverlay = '';
      const xywh = canvasRegion['canvasRegion'].split(',').map(elem => parseFloat(elem.trim()))
      if (dictionary && dictionary['content'] && dictionary['content']['ocr'] && dictionary['content']['ocr'].length > 0){
        this.textoverlay = true;
        textoverlay = shared.textOverlayHTML(xywh, dictionary['content']['ocr'], path)
      }
      isderivative ? imageurl = dictionary['fullImage'] : '';
      if (path && !isderivative) {
        imagehtml = this.createSVG(imageurl, canvasRegion['canvasRegion'], dictionary, path, cn, textoverlay)
      } else {
        imagehtml = document.createElement("img");
        imagehtml.setAttribute('src', imageurl);
        imagehtml.setAttribute('alt', dictionary['altText']);
      }
      if (shared.imageextensions.includes(extension) || isderivative) {
       var canv = document.createElement('canvas');
       canv.id = `${dictionary['id']}_canvas_img${cn}`
       canv.onload = this.writecanvas(imagehtml, canvasRegion['canvasRegion'], canv.id);
       imagehtml = canv;
      }
      for (var key in this.settings.imagesettings){
        imagehtml.style[key] = this.settings.imagesettings[key];
      }
      return imagehtml;
    },
    createSVG: function(imageurl, regionCanvas, dictionary, path, position, textoverlay) {
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
      path.setAttribute("stroke", "none");
      svg.innerHTML = inner + path.outerHTML + textoverlay;
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
        ondict = ondict ? ondict[cn] : ondict;
        var canvasRegion = shared.canvasRegion(canvasItem, ondict);
        var canvas = shared.matchCanvas(this.manifest, canvasRegion['canvasId'])['images'];
        var regionCanvas = canvasRegion['canvasRegion'];
        var baseImageUrl;
        if (!canvas) {
          baseImageUrl = canvasItem.split("#")[0];
        } else {
          var canvas_tile = shared.getCanvasTile(canvas[0])
          baseImageUrl = canvas_tile['canvas_tile'];
          var imgResource = canvas_tile['img_resource'];
        }
        //get jpg format
        var resourceid = imgResource && imgResource['@id'] && shared.getId(imgResource).includes('/full') ? shared.getId(imgResource) : '';
        var jpgformat = resourceid ? resourceid.split("/").slice(-1)[0] : 'default.jpg';
        size = size != 'full' ? size : resourceid ? resourceid.split("/").slice(-3)[0] : 'full';
        var imagedict = shared.getImages(baseImageUrl, regionCanvas, size, jpgformat);
        fullImage = imagedict['fullImage'];
        //construct image URL
        var imageurl = imagedict['imageurl'];
        dictionary['fullImage'] = fullImage;

        var imagehtml = this.createimagehtml(imageurl, canvasRegion, dictionary, cn);
        images.push(imagehtml.outerHTML)
      }
      return {'fullImage': fullImage, 'image': images}
    },
    getBeforeAfterText: function(dictionary, anno) {
      var text = shared.stripHTML(dictionary['rendered_content']);
      var index = anno.hits.match.indexOf(text);
      var before = anno.hits.match.substring(0, index).trim();
      var after = anno.hits.match.substring(index+text.length, ).trim();
      before = anno.hits.before.trim() + " " + before;
      after += anno.hits.after.trim();
      return {'after': after, 'before': before};
    },
    //get all image data
    getImageData: function(i){
      var anno = this.anno[i];
      var dictionary = {'image':[]};
      var dict = shared.chars(anno);
      if (this.settings.image_only !== true){
        this.languages = dict['languages'] ? [...new Set(this.languages.concat(dict['languages']))] : this.languages;
        var all_langs = dict['textual_body'].map(el => el.language);
        var langs = all_langs.filter(element => navigator.language.indexOf(element) > -1);
        this.currentlang = langs.length > 0 ? langs[0] : this.currentlang ? this.currentlang : dict['textual_body'][0] && dict['textual_body'][0]['language'];
        dictionary['rendered_content'] = shared.createContent(dict, this.currentlang, true)['anno'];
        dictionary['content'] = dict;
        dictionary['id'] = this.annotationid + i;
        dictionary['altText'] = dict['ocr'].length > 0 ? dict['ocr'][0] : dict['label'] !== undefined ? dict['label'] : `Image section of "${this.manifest['label']}"`;
        dictionary['altText'] = dictionary['altText'].replace(/(\r\n|\n|\r)/gm, " ");
        dictionary['tags'] = dict['tags'].length > 0 ? dict['tags'] : "";
        if (dict['styles']) {
          this.settings.tagscolor = this.settings.tagscolor ? Object.assign(dict['styles'], this.settings.tagscolor) : dict['styles'];
        }
        if (anno.hits && anno.hits.match && !this.settings.hide_beforeafter){
          var banda = this.getBeforeAfterText(dictionary, anno);
        }
        dictionary['before'] = banda && banda['before'] ? banda['before'] : "";
        dictionary['after'] = banda && banda['after'] ? banda['after'] : "";
      } else {
        dictionary['altText'] = `Image section of "${this.manifest['label']}"`;
        dictionary['id'] = this.annotationid + i;
        dictionary['content'] = dict;
        this.settings.hide_viewlarger = true;
      }
      return dictionary;
    }
  }
}
</script>

<style lang="scss">
@import '../iiif-annotation.scss'
</style>
