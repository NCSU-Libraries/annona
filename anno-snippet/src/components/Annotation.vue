<template>
<div class="">
  <div class="">
    <textarea v-model="annoString" rows="30" cols="100"></textarea>
  </div>
  <img v-if="showImage" :src="image" alt="">
  <p>
    {{label}}
  </p>
  <p>
    {{description}}
  </p>
</div>
</template>

<script>
var anno = {
  "type": "Annotation",
  "@context": "http://www.w3.org/ns/anno.jsonld",
  "label": "The Bees",
  "body": {
    "value": "So many bees.",
    "type": "TextualBody",
    "purpose": "tagging",
    "format": "text/plain"
  },
  "target": {
    "id": "https://d.lib.ncsu.edu/collections/canvas/segIns_023#xywh=318,499,2891,3339",
    "type": "Canvas",
    "dcterms:isPartOf": {
      "id": "https://d.lib.ncsu.edu/collections/catalog/segIns_023/manifest",
      "type": "Manifest",
      "label": "Insectes. [patterns]"
    }
  },
  "motivation": {
    "id": "http://www.w3.org/ns/oa#tagging",
    "label": "tagging"
  },
  "generator": "/capture-models/generic/describing.json"
};

var manifestUrl = anno.target['dcterms:isPartOf'].id;
// console.log(manifestUrl)

export default {
  name: 'Annotation',
  data: function() {
    return {
      anno: anno,
      annoString: '',
      manifest: '',
      showImage: false
    }
  },
  computed: {
    label: function() {
      return this.anno.label
    },
    description: function() {
      return this.anno.body.value
    },
    canvas: function(){
      return this.manifest.sequences[0].canvases[0]
    },
    canvasHash: function() {
      // console.log(URL.parse(this.anno.target.id))
      var id = this.anno.target.id
      var url = new URL(id)
      return url.hash
    },
    canvasRegion: function(){
      var r = /xywh=((\d*),(\d*),(\d*),(\d*))/
      var matches = r.exec(this.canvasHash)
      return matches[1]
    },
    baseImageUrl: function(){
      return this.canvas.images[0].resource.service['@id'];
    },
    image: function() {
      return this.baseImageUrl + '/' +  this.canvasRegion + "/300,/0/default.jpg"
    }
  },
  created: function(){
    this.annoString = JSON.stringify(this.anno, null, '  ')
    this.axios.get(manifestUrl)
      .then((response) => {
        this.manifest = response.data
        this.showImage = true
      })
      .catch((error) => {
        console.log(error)
      })
  },
  watch: {
    annoString: function(newValue) {
      this.anno = JSON.parse(newValue)
    }
  }
}
</script>

<style lang="css">
</style>
