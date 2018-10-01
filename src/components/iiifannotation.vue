<template>
  <div class="iiifannotation">
    <div v-for="item in annotation_items">
    <span v-for="image in item.image">
    <img v-bind:src="image" id="annoimage">
    </span>
    <img v-bind:src="item.fullImage" style="display:none;" v-bind:data-assoc-canvas="item.image" id="fullimage">
    <figcaption v-show="item.label != undefined && settings.view_larger != false" v-html="item.label"></figcaption>
    <div v-bind:id="ocr" class="text" v-show="item.ocr != '' && settings.view_ocr != false" v-html="item.ocr"></div>
    <p v-show="item.dataset['dataset_format'] != ''"><b><a v-bind:href="item.dataset.dataset_url">Download dataset ({{item.dataset.dataset_format}})</a></b></p>
    <div v-html="item.chars"></div>
    <button v-on:click="toggle(item.image, $event)" class="togglebutton" v-show="item.fullImage != '' && settings.view_larger != false">View Full Image</button>
    <div id="link_to_object" v-show="settings.view_full_object != false && full_object != ''">
      Full object: <a v-bind:href="full_object" target="_blank">{{manifest["label"]}}</a>
    </div>
    <div>
  </div>
  </div>
  </div>
</template>

<script>
import axios from 'axios';
import 'document-register-element/build/document-register-element';

export default {
  name: 'iiifannotation',
  props: ['annotationurl','annotationlist', 'manifesturl', 'imagesize'],
  data: function() {
    return {
      anno: '',
      manifest: '',
      settings: {},
      manifestlink: '',
      annotation_items: []
      }
  },
  created() {
    if (document.getElementById("config") != null){
      this.settings = JSON.parse(document.getElementById("config").innerHTML);
    }
    var annotation_json = this.annotationlist ? this.annotationlist : this.annotationurl;
    axios.get(annotation_json)
    .then(response => {
      if (this.annotationlist == undefined){
        this.anno = [].concat(response.data);
        var refCanvas = this.anno[0]['target'] ? this.anno[0]['target'] : this.anno[0]['on'];
        var manifest_dict = Object.keys(refCanvas).indexOf("dcterms:isPartOf") > -1 ? refCanvas['dcterms:isPartOf'] : refCanvas['within'];
        this.manifestlink = manifest_dict['id'] ? manifest_dict['id'] : manifest_dict['@id'];
      } else {
          this.anno = response.data.resources;
          if (this.manifesturl == undefined){
            var manifest_dict = response.data['dcterms:isPartOf'] ? response.data['dcterms:isPartOf'] : response.data.resources[0].on.within ? response.data.resources[0].on.within : response.data['within']['within'];
            this.manifestlink = manifest_dict['id'] ? manifest_dict['id'] : manifest_dict['@id'];
          } else {
            this.manifestlink = this.manifesturl;
          }
      }
    }).then(response => {
        axios.get(this.manifestlink).then(response => {
          this.manifest = response.data;
          for (var i =0; i < this.anno.length; i++){
            var dictionary = {'image':[]};
            dictionary['label'] = this.label(this.anno[i]);
            dictionary['ocr'] = decodeURIComponent(escape(this.ocr(this.anno[i])));
            var canvasId = this.anno[i].target != undefined ? this.anno[i].target : this.anno[i].on.full ? this.anno[i].on.full : this.anno[i].on;
            canvasId = [].concat(canvasId)
            for (var cn = 0; cn < canvasId.length; cn++){
              var canvasItem = canvasId[cn]
              for(var idx = 0; idx < this.manifest.sequences[0].canvases.length; idx++){
                var existing = this.manifest.sequences[0].canvases[idx];
                if(existing['@id'] == this.canvasRegion(canvasItem)['canvasId']){
                  var canvas = existing
                }
              }
              var mirador = typeof(this.anno[i].on.selector) != 'undefined' ? this.anno[i].on.selector.value.split("=")[1] : undefined;
              var regionCanvas =  mirador != undefined ? mirador : this.canvasRegion(canvasItem)['canvasRegion'];
              var baseImageUrl = canvas.images[0].resource.service['@id']  ? canvas.images[0].resource.service['@id'] : canvas.images[0].resource['@id'];
              if (this.imagesize){
                var size = this.imagesize;
              } else if (mirador) {
                var size = "full";
              } else {
                var size = "1200,";
              }
              dictionary['image'].push(baseImageUrl + '/' +  regionCanvas + "/" + size +"/0/default.jpg");
              dictionary['fullImage'] = this.fullImage(canvas, regionCanvas);
            }
            dictionary['chars'] = this.chars(this.anno[i]);
            dictionary['dataset'] = this.dataset(this.anno[i]);
            this.annotation_items.push(dictionary);
          }
      })
    })
  },
  methods: {
    toggle: function(image_uri, event){
      var fullImage = this.$el.querySelector("img[data-assoc-canvas='"+ image_uri+"']");
      var change_html = event.srcElement != undefined ?  event.srcElement : event.target;
      if (fullImage.style.display == 'none'){
        fullImage.style.display='inline-block';
        change_html.innerHTML = "Hide Full Image";
      } else {
        fullImage.style.display= 'none';
        change_html.innerHTML = "View Full Image";
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
      res = [].concat(res);
      for (var i=0; i < res.length; i++){
        var res_data = res[i];
        if (res_data['type'] == 'TextualBody' || res_data['@type'] ==  "dctypes:Text"){
          var purpose = res_data['purpose'] ? res_data['purpose'] : 'dctypes:text';
          var value = res_data['value'] ? res_data['value'] : res_data['chars'];
          textual_body += '<div class="' + purpose + '">' + value + '</div></div>';
        }
      }
      return textual_body
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
      var keys = Object.keys(this.manifest);
      var link = keys.indexOf("related") > -1 ? this.manifest.related['@id'] : keys.indexOf("seeAlso") > -1 ? this.manifest.seeAlso['@id'] : '';
      return link;
    }
  }
}
</script>

<style>

#fullimage {
  width: 49%
}

#annoimage {
  width: 49%
}

.togglebutton{
  margin: 0 auto;
  display: flex;
  justify-content: center;
  background-color: red;
  margin-top: .5em;
  margin-bottom: .5em;
  border: none;
  color: white;
  padding: 6px 7px;
  text-decoration: none;
  font-size: 12px;
  border-radius: 12px;
  cursor: pointer;
}

.iiifannotation {
  text-indent: 0;
  margin: 0.5em;
  padding: 0.5em;
  text-align: center
}

.toggle {
  width: 49%
}

.text {
  border: 3px solid green;
  padding: 10px;
  margin: 10px;
}

#link_to_object {
  font-weight: bold
}

figcaption {
  font-size: smaller;
  font-style: italic;
  font-weight: bold;
}

</style>
