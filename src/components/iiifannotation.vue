<template>
  <div class="iiifannotation"  v-if="rendered == true">
    <div v-for="item in annotation_items" :key="item.id" :id="item.id">
    <span v-for="image in item.image" :key="image">
    <img v-bind:src="image" v-bind:alt="item.altText" id="annoimage" v-bind:style="[settings.imagesettings !== undefined ? settings.imagesettings : '']">
    </span>
    <img v-bind:src="item.fullImage" style="display:none;" id="fullimage" v-bind:alt="manifest['label']" v-bind:style="[settings.imagesettings !== undefined ? settings.imagesettings : '']">
    <figcaption v-show="item.label !== undefined && settings.view_larger !== false" v-html="item.label"></figcaption>
    <div id="ocr" class="text" v-show="item.ocr && item.ocr !== '' && settings.view_ocr !== false" v-html="item.ocr"></div>
    <p v-if="item.dataset && item.dataset['dataset_format'] !== ''"><b><a v-bind:href="item.dataset.dataset_url">Download dataset ({{item.dataset.dataset_format}})</a></b></p>
    <div v-show="item.chars && item.chars !== ''" v-html="item.chars"></div>
    <div v-show="settings.view_tags !== false" v-html="item.tags"></div>
    <button v-on:click="toggle($event)" class="togglebutton" v-show="item.fullImage && item.fullImage !== '' && settings.view_larger !== false">View Full Image</button>
    <div id="link_to_object" v-show="settings.view_full_object !== false && full_object && full_object !== '' && settings.image_only != true">
      Full object: <a v-bind:href="full_object" target="_blank">{{manifest["label"]}}</a>
    </div>
    <div>
  </div>
  </div>
  </div>
  <div v-else>
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
      annotation_json: ''
      }
  },
  created() {
    this.settings = shared.getsettings(this.styling);
    if (this.settings.height){
      var width = this.settings.width ? this.settings.width : 'auto';
      this.settings.imagesettings = {'height':this.settings.height, 'width':width};
    } else if (this.settings.width) {
      this.settings.imagesettings = {'width':this.settings.width};
    }
    this.annotation_json = this.annotationlist ? this.annotationlist : this.annotationurl;
    axios.get(this.annotation_json).then(response => {
      if (this.annotationlist === undefined){
        this.anno = [].concat(response.data);
      } else {
          this.anno = response.data.resources ? response.data.resources : response.data.items ? response.data.items : response.data;
      }
      this.manifestlink = shared.manifestlink(this.manifesturl, this.anno[0], response.data)
    }).catch((error) => {console.log(error)}).then(() => {
        if (this.manifestlink) {
          this.getManifestData()
        } else {
          this.annoloop(false)
        }
    })
  },
  methods: {
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
    label: function(anno) {
      var label = anno.label ? anno.label : anno.resource && anno.resource.label ? anno.resource.label : undefined;
      return label;
    },
    fullImage: function(baseImageUrl, canvasRegion){
      var fullImage =  canvasRegion !== "full" ? baseImageUrl + '/full/1200,/0/default.jpg' : '';
      return fullImage;

    },
    getManifestData: function(){
      axios.get(this.manifestlink).then(response => {
        this.manifest = response.data;
        this.annoloop(true);
        if(this.manifestlink !== ''){
          this.rendered = true;
        }
      }).catch((error) => {console.log(error)})
    },
    annoloop: function(hasmanifest) {
      for (var i =0; i < this.anno.length; i++){
        var dictionary = this.getImageData(this.anno[i], this.annotation_json, i);
        var ondict = shared.on_structure(this.anno[i]);
        var canvasId = this.anno[i].target !== undefined ? this.anno[i].target : ondict.full ? ondict.full : ondict;
        canvasId = [].concat(canvasId);
        var size;
        if (this.manifestlink.indexOf('iiif/2.0') > -1){
          size = '1200,';
        } else {
          size = 'full';
        }
        if (hasmanifest) {
          var imagedata = this.getManifestCanvas(canvasId, this.anno[i], size)
          dictionary['image'] = dictionary['image'].concat(imagedata['image']);
          dictionary['fullImage'] = imagedata['fullImage'];
        } else {
          for (var cn = 0; cn < canvasId.length; cn++){
            var canvasItem = canvasId[cn]
            var canvasRegion = shared.canvasRegion(canvasItem);
            var image = `${canvasRegion['canvasId']}/${canvasRegion['canvasRegion']}/${size}/0/default.jpg`;
            dictionary['image'].push(image);
            dictionary['fullImage'] = this.fullImage(canvasRegion['canvasId'], canvasRegion['canvasRegion']);
            if (canvasRegion['canvasId']){
              this.rendered = true;
            }
          }
        }
        this.annotation_items.push(dictionary);
      }
    },
    getManifestCanvas: function(canvasId, anno, size){
      var images = [];
      var fullImage;
      for (var cn = 0; cn < canvasId.length; cn++){
        var canvasItem = canvasId[cn];
        for(var idx = 0; idx < this.manifest.sequences[0].canvases.length; idx++){
          var existing = this.manifest.sequences[0].canvases[idx];
          if(existing['@id'].replace("https", "http") === shared.canvasRegion(canvasItem)['canvasId'].replace("https", "http")){
            var canvas = existing;
          }
        }
        var ondict = shared.on_structure(anno);
        if (typeof ondict.selector !== 'undefined') {
          var mirador = ondict.selector.value ? ondict.selector.value : ondict.selector.default.value;
          mirador = mirador.split("=")[1];
        }
        var regionCanvas =  mirador !== undefined ? mirador : shared.canvasRegion(canvasItem)['canvasRegion'];
        var baseImageUrl;
        if (canvas === undefined) {
          baseImageUrl = canvasItem.split("#")[0];
        } else {
          baseImageUrl  = canvas.images[0].resource.service['@id']  ? canvas.images[0].resource.service['@id'] : canvas.images[0].resource['@id'];
        }
        images.push(`${baseImageUrl}/${regionCanvas}/${size}/0/default.jpg`);
        fullImage = this.fullImage(baseImageUrl, regionCanvas);
      }
      return {'fullImage': fullImage, 'image': images}
    },
    getImageData: function(anno, annotation_json, i){
      var dictionary = {'image':[]};
      if (this.settings.image_only !== true){
        dictionary['label'] = this.label(anno);
        dictionary['ocr'] = decodeURIComponent(escape(shared.ocr(anno)));
        dictionary['chars'] = shared.chars(anno)['textual_body'];
        var tags = shared.chars(anno)['tags'];
        dictionary['tags'] = tags.length > 0 ? '<div class="tagging">' + tags.join('</div><div class="tagging">') + '</div>' : "";
        dictionary['dataset'] = this.dataset(anno);
        dictionary['id'] = annotation_json.split("/").slice(-1).pop().replace(".json", "") + i;
        dictionary['altText'] = dictionary['ocr'] !== '' ? dictionary['ocr'] : dictionary['label'] !== undefined ? dictionary['label'] : `Image section of "${this.manifest['label']}"`;
      } else {
        dictionary['altText'] = `Image section of "${this.manifest['label']}"`;
        this.settings.view_larger = false;
      }
      return dictionary;
    },
    dataset: function(anno){
      var res = anno.body ? anno.body : anno.resource;
      var dataset_format = res['format'] && res['@type'] === 'dctypes:Dataset' ? res['format'] : '';
      var dataset_url = res['@id'] && res['@type'] === 'dctypes:Dataset' ? res['@id'] : '';
      return {'dataset_format':dataset_format, 'dataset_url':dataset_url};
    }
  },
  computed: {
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
