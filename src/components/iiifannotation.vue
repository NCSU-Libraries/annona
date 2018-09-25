<template>
  <div class="iiifannotation">
    <img v-bind:src="image" id="annoimage">
    <img v-bind:src="fullImage" style="display:none;" v-bind:data-assoc-canvas="image" id="fullimage">
    <figcaption v-show="label != undefined && settings.view_larger != false" v-html="label"></figcaption>
    <div v-bind:id="ocr" class="text" v-show="ocr != '' && settings.view_ocr != false">{{ocr}}</div>
    <p v-show="dataset['dataset_format'] != ''"><b><a v-bind:href="dataset.dataset_url">Download dataset ({{dataset.dataset_format}})</a></b></p>
    <div v-html="chars"></div>
    <button v-on:click="toggle(image, $event)" class="togglebutton" v-show="fullImage != '' && settings.view_larger != false">View Full Image</button>
    <div id="link_to_object" v-show="settings.view_full_object != false">
      Full object: <a v-bind:href="full_object" target="_blank">{{manifest["label"]}}</a>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import 'document-register-element/build/document-register-element';

export default {
  name: 'iiifAnnotation',
  props: ['annotationurl','annotationlist', 'manifesturl'],
  data: function() {
    return {
      anno: '',
      manifest: '',
      showImage: false,
      image: '',
      canvas: '',
      manifestUrl: '',
      settings: {}
      }
  },
  created() {
    if (document.getElementById("config") != null){
      this.settings = JSON.parse(document.getElementById("config").innerHTML)
    }
    var annotation_json = this.annotationlist ? this.annotationlist : this.annotationurl
    axios.get(annotation_json)
    .then(response => {
      if (this.annotationlist == undefined){
        this.anno = response.data
        var refCanvas = this.anno['target'] ? this.anno['target'] : this.anno['on']
        var manifest = refCanvas['dcterms:isPartOf'] ? refCanvas['dcterms:isPartOf'] : refCanvas['within']
        this.manifestlink = manifest['id'] ? manifest['id'] : manifest['@id']
      } else {
        for (var i =0; i < response.data.resources.length; i++){
          if (response.data.resources[i]['on'] == this.annotationurl){
            this.anno = response.data.resources[i]
            if (this.manifesturl == undefined){
              var manifest = response.data['dcterms:isPartOf'] ? response.data['dcterms:isPartOf'] : response.data['within']['within']
              this.manifestlink = manifest['id'] ? manifest['id'] : manifest['@id']
            } else {
              this.manifestlink = this.manifesturl
            }
          }
        }
      }
    }).then(response => {
        axios.get(this.manifestlink).then(response => {
          this.manifest = response.data
          for(var idx = 0; idx < this.manifest.sequences[0].canvases.length; idx++){
            var existing = this.manifest.sequences[0].canvases[idx];
            if(existing['@id'] == this.canvasRegion['canvasId']){
                this.canvas = existing;
            }
          }
          var baseImageUrl = this.canvas.images[0].resource.service['@id']  ? this.canvas.images[0].resource.service['@id'] : this.canvas.images[0].resource['@id'];
          this.image = baseImageUrl + '/' +  this.canvasRegion['canvasRegion'] + "/1200,/0/default.jpg"
      })
    })
  },
  methods: {
    toggle: function(image_uri, event){
      var fullImage = this.$el.querySelector("img[data-assoc-canvas='"+ image_uri+"']");
      var change_html = event.srcElement != undefined ?  event.srcElement : event.target;
      if (fullImage.style.display == 'none'){
        fullImage.style.display='inline-block';
        change_html.innerHTML = "Hide Full Image"
      } else {
        fullImage.style.display= 'none';
        change_html.innerHTML = "View Full Image"
      }
    }
  },
  computed: {
    label: function() {
      var label = this.anno.label ? this.anno.label : this.anno.resource.label
      return label
    },
    chars: function() {
      var res = this.anno.body ? this.anno.body : this.anno.resource
      var textual_body = ''
      if (Array.isArray(res) == false){
        res = [res]
      }
      for (var i=0; i < res.length; i++){
        var res_data = res[i]
        if (res_data['type'] == 'TextualBody'){
          var purpose = res_data['purpose'] ? res_data['purpose'] : 'text';
          textual_body += '<div class="' + purpose + '">' + res_data['value'] + '</div></div>';
        }
      }
      return textual_body
    },
    ocr: function(){
      var res = this.anno.body ? this.anno.body : this.anno.resource
      var chars = res['chars'] && res['@type'] == 'cnt:ContentAsText' ? res['chars'] : '';
      return chars
    },
    fullImage: function(){
      var src_link = this.canvas.images[0].resource.service['@id']  ? this.canvas.images[0].resource.service['@id'] : this.canvas.images[0].resource['@id'];
      var fullImage =  this.canvasRegion['canvasRegion'] != "full" ? src_link + '/full/1200,/0/default.jpg' : '';
      return fullImage

    },
    full_object: function(){
      var keys = Object.keys(this.manifest)
      var link = keys.indexOf("related") > -1 ? this.manifest.related['@id'] : this.manifest.seeAlso['@id']
      return link
    },
    canvasRegion: function(){
      var canvasId = this.anno.target != undefined ? this.anno.target : this.anno.on;
      if (typeof canvasId != 'string'){
        canvasId = canvasId['id'] ? canvasId['id'] : canvasId['@id']
      }
      if (canvasId.indexOf("#xywh") > -1){
        var canvasRegion = canvasId.split("#")[1].split("=")[1]
        canvasId = canvasId.split("#")[0]
      } else {
          canvasRegion = "full"
      }
      return {'canvasId':canvasId, 'canvasRegion':canvasRegion}
    },
    dataset: function(){
      var res = this.anno.body ? this.anno.body : this.anno.resource
      var dataset_format = res['format'] && res['@type'] == 'dctypes:Dataset' ? res['format'] : '';
      var dataset_url = res['@id'] && res['@type'] == 'dctypes:Dataset' ? res['@id'] : '';
      return {'dataset_format':dataset_format, 'dataset_url':dataset_url}
    },
    canvasHash: function() {
      var id = this.anno.target.id
      var url = new URL(id)
      return url.hash
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
