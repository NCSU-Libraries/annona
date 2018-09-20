<template>
  <div class="iiifannotation">
    <img v-bind:src="image">
    <img v-bind:src="fullImage" style="display:none;" v-bind:data-assoc-canvas="image">
    <figcaption v-show="label != undefined && settings.view_larger != false" v-html="label"></figcaption>
    <div v-bind:id="ocr" class="text" v-show="ocr != '' && settings.view_ocr != false">{{ocr}}</div>
    <p v-show="dataset['dataset_format'] != ''"><b><a v-bind:href="dataset.dataset_url">Download dataset ({{dataset.dataset_format}})</a></b></p>
    <div v-html="chars"></div>
    <button v-on:click="toggle(image, $event)" class="togglebutton" v-show="fullImage != '' && settings.view_larger != false">View Full Image</button>
    <div id="link_to_object" v-show="settings.view_full_object != false">
      Full object: <a v-bind:href="manifest.related['@id']" target="_blank">{{manifest["label"]}}</a>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'iiif-annotation',
  props: ['annotationurl'],
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
    axios.get(this.annotationurl)
    .then(response => {
      this.anno = response.data
      var refCanvas = this.anno['target'] ? this.anno['target'] : this.anno['on']
      var manifest = refCanvas['dcterms:isPartOf'] ? refCanvas['dcterms:isPartOf'] : refCanvas['within']
      this.manifestlink = manifest['id'] ? manifest['id'] : manifest['@id']
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
          this.image = baseImageUrl + '/' +  this.canvasRegion['canvasRegion'] + "/full/0/default.jpg"
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
      var fullImage =  this.canvasRegion['canvasRegion'] != "full" ? src_link + '/full/full/0/default.jpg' : '';
      return fullImage

    },
    canvasRegion: function(){
      var canvasId = this.anno.target != undefined ? this.anno.target : this.anno.on;
      canvasId = canvasId['id'] ? canvasId['id'] : canvasId['@id']
      var canvasRegion = canvasId.split("#")[1].split("=")[1]
      canvasId = canvasId.split("#")[0]
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

.iiifannotation img {
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
