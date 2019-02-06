<template>
  <div class="iiifannotation"  v-if="rendered != false">
    <div v-for="item in annotation_items" :key="item.id" :id="item.id">
    <span v-for="image in item.image" :key="image">
    <img v-bind:src="image" v-bind:alt="item.altText" id="annoimage" v-bind:style="[settings.imagesettings != undefined ? settings.imagesettings : '']">
    </span>
    <img v-bind:src="item.fullImage" style="display:none;" id="fullimage" v-bind:alt="manifest['label']" v-bind:style="[settings.imagesettings != undefined ? settings.imagesettings : '']">
    <figcaption v-show="item.label != undefined && settings.view_larger != false" v-html="item.label"></figcaption>
    <div v-bind:id="ocr" class="text" v-show="item.ocr != '' && settings.view_ocr != false" v-html="item.ocr"></div>
    <p v-show="item.dataset['dataset_format'] != ''"><b><a v-bind:href="item.dataset.dataset_url">Download dataset ({{item.dataset.dataset_format}})</a></b></p>
    <div v-html="item.chars"></div>
    <div v-html="item.tags"></div>
    <button v-on:click="toggle($event)" class="togglebutton" v-show="item.fullImage != '' && settings.view_larger != false">View Full Image</button>
    <div id="link_to_object" v-show="settings.view_full_object != false && full_object != ''">
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
      rendered: false
      }
  },
  created() {
    if (document.getElementById("config") != null){
      this.settings = JSON.parse(document.getElementById("config").innerHTML);
    }
    if (this.styling) {
      this.settings = JSON.parse(this.styling.replace(/'/g, '"'))
    }
    if (this.settings.height){
      var width = this.settings.width ? this.settings.width : 'auto';
      this.settings.imagesettings = {'height':this.settings.height, 'width':width}
    } else if (this.settings.width) {
      this.settings.imagesettings = {'width':this.settings.width}
    }
    var annotation_json = this.annotationlist ? this.annotationlist : this.annotationurl;
    axios.get(annotation_json).then(response => {
      var manifest_dict;
      if (this.annotationlist == undefined){
        this.anno = [].concat(response.data);
        var refCanvas = this.anno[0]['target'] ? this.anno[0]['target'] : this.on_structure(this.anno[0]);
        manifest_dict = Object.keys(refCanvas).indexOf("dcterms:isPartOf") > -1 ? refCanvas['dcterms:isPartOf'] : refCanvas['within'];
        this.manifestlink = manifest_dict['id'] ? manifest_dict['id'] : manifest_dict['@id'];
      } else {
          this.anno = response.data.resources ? response.data.resources : response.data;
          if (this.manifesturl == undefined){
            var on_dict = this.on_structure(this.anno[0]);
            manifest_dict = response.data['dcterms:isPartOf'] ? response.data['dcterms:isPartOf'] : on_dict.within ? on_dict.within : response.data['within']['within'];
            this.manifestlink = manifest_dict['id'] ? manifest_dict['id'] : manifest_dict['@id'];
          } else {
            this.manifestlink = this.manifesturl;
          }
      }
    }).catch((error) => {console.log(error)}).then(() => {
        axios.get(this.manifestlink).then(response => {
          this.manifest = response.data;
          for (var i =0; i < this.anno.length; i++){
            var dictionary = {'image':[]};
            dictionary['label'] = this.label(this.anno[i]);
            dictionary['ocr'] = decodeURIComponent(escape(this.ocr(this.anno[i])));
            var ondict = this.on_structure(this.anno[i])
            var canvasId = this.anno[i].target != undefined ? this.anno[i].target : ondict.full ? ondict.full : ondict;
            canvasId = [].concat(canvasId)
            for (var cn = 0; cn < canvasId.length; cn++){
              var canvasItem = canvasId[cn]
              for(var idx = 0; idx < this.manifest.sequences[0].canvases.length; idx++){
                var existing = this.manifest.sequences[0].canvases[idx];
                if(existing['@id'].replace("https", "http") == this.canvasRegion(canvasItem)['canvasId'].replace("https", "http")){
                  var canvas = existing
                }
              }
              if (typeof this.on_structure(this.anno[i]).selector != 'undefined') {
                var mirador = ondict.selector.value ? ondict.selector.value : ondict.selector.default.value;
                mirador = mirador.split("=")[1]
              }
              var regionCanvas =  mirador != undefined ? mirador : this.canvasRegion(canvasItem)['canvasRegion'];
              var baseImageUrl = canvas.images[0].resource.service['@id']  ? canvas.images[0].resource.service['@id'] : canvas.images[0].resource['@id'];
              var size;
              if (this.imagesize){
                size = this.imagesize;
              } else if (mirador) {
                size = "full";
              } else {
                size = "1200,";
              }
              dictionary['image'].push(baseImageUrl + '/' +  regionCanvas + "/" + size +"/0/default.jpg");
              dictionary['fullImage'] = this.fullImage(canvas, regionCanvas);
            }
            dictionary['chars'] = this.chars(this.anno[i])['textual_body'];
            dictionary['tags'] = this.chars(this.anno[i])['tags'];
            dictionary['dataset'] = this.dataset(this.anno[i]);
            dictionary['id'] = annotation_json.split("/").slice(-1).pop().replace(".json", "") + i;
            dictionary['altText'] = dictionary['ocr'] != '' ? dictionary['ocr'] : dictionary['label'] != undefined ? dictionary['label'] : `Image section of "${this.manifest['label']}"`;
            this.annotation_items.push(dictionary);
          }
          if(this.manifestlink != ''){
            this.rendered = true;
          }
      }).catch((error) => {console.log(error)})
    })
  },
  methods: {
    toggle: function(event){
      var parent = event.target.parentElement
      var fullImage = parent.querySelector("#fullimage");
      var change_html = event.srcElement != undefined ?  event.srcElement : event.target;
      if (fullImage.style.display == 'none'){
        fullImage.style.display='inline-block';
        change_html.innerHTML = "Hide Full Image";
      } else {
        fullImage.style.display= 'none';
        change_html.innerHTML = "View Full Image";
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
    label: function(anno) {
      var label = anno.label ? anno.label : anno.resource.label;
      return label;
    },
    ocr: function(anno){
      var res = anno.body ? anno.body : anno.resource;
      var chars = res['chars'] && res['@type'] == 'cnt:ContentAsText' ? res['chars'] : '';
      return unescape(encodeURIComponent(chars));
    },
    canvasRegion: function(canvasId){
      if (typeof canvasId != 'string'){
        canvasId = canvasId['id'] ? canvasId['id'] : canvasId['@id'];
      }
      if (canvasId.indexOf("#xywh") > -1){
        var canvasRegion = canvasId.split("#")[1].split("=")[1];
        canvasId = canvasId.split("#")[0];
      } else {
          canvasRegion = "full";
      }
      return {'canvasId':canvasId, 'canvasRegion':canvasRegion};
    },
    fullImage: function(canvas, canvasRegion){
      var src_link = canvas.images[0].resource.service['@id']  ? canvas.images[0].resource.service['@id'] : canvas.images[0].resource['@id'];
      var fullImage =  canvasRegion != "full" ? src_link + '/full/1200,/0/default.jpg' : '';
      return fullImage;

    },
    chars: function(anno) {
      var res = anno.body ? anno.body : anno.resource;
      var textual_body = '';
      var tags = '';
      res = [].concat(res);
      for (var i=0; i < res.length; i++){
        var res_data = res[i];
        var value;
        if (res_data['type'] == 'TextualBody' || res_data['@type'] ==  "dctypes:Text"){
          var purpose = res_data['purpose'] ? res_data['purpose'] : 'dctypes:text';
          value = res_data['value'] ? res_data['value'] : res_data['chars'];
          if (purpose == 'tagging'){
            tags += '<div class="' + purpose + '">' + value + '</div>';
          } else {
            textual_body += '<div class="' + purpose + '">' + value + '</div>';
          }
        } else if (res_data['@type'] == 'oa:Tag'){
          value = res_data['value'] ? res_data['value'] : res_data['chars'];
          tags += '<div class="tagging">' + value + '</div>';
        }
      }
      return {'textual_body':textual_body,'tags':tags}
    },
    dataset: function(anno){
      var res = anno.body ? anno.body : anno.resource;
      var dataset_format = res['format'] && res['@type'] == 'dctypes:Dataset' ? res['format'] : '';
      var dataset_url = res['@id'] && res['@type'] == 'dctypes:Dataset' ? res['@id'] : '';
      return {'dataset_format':dataset_format, 'dataset_url':dataset_url};
    }
  },
  computed: {
    full_object: function(){
      var link;
      var keys = Object.keys(this.manifest);
      if (keys.indexOf("related") > -1){
        if (typeof this.manifest.related == 'string'){
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
