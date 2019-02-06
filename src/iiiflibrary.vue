<template>
  <div id="iiiflibrary">
    <img alt="Vue logo" src="./assets/logo.png">
    <iiifannotation annotationurl="https://raw.githubusercontent.com/tomcrane/iiif-collector/master/objects/paragraph.json" styling="{'view_caption':false,'view_full_object':false,'view_ocr':false,'width':'300px', 'height': '200px'}"></iiifannotation>
    <iiifannotation annotationurl="https://raw.githubusercontent.com/tomcrane/iiif-collector/master/objects/paragraph.json"></iiifannotation>

  </div>
</template>

<script>
import iiifannotation from './components/iiifannotation.vue'
import storyboard from './components/storyboard.vue'

export default {
  name: 'iiiflibrary',
  components: {
    iiifannotation,
    storyboard
  }
}
</script>

<style>
#iiiflibrary {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
