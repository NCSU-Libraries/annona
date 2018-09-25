<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <iiifannotation annotationurl="https://raw.githubusercontent.com/tomcrane/iiif-collector/master/objects/paragraph.json"></iiifannotation>
    <iiifannotation annotationurl="testing.json"></iiifannotation>
    <iiifannotation annotationlist="https://tomcrane.github.io/iiif-collector/objects/longer-article-annos1.json" annotationurl="https://d.lib.ncsu.edu/collections/canvas/nubian-message-1995-04-01_0001#xywh=1703,3931,2342,160"/>

    <iiifannotation annotationlist="https://wellcomelibrary.org/iiif/b28047345/contentAsText/54" annotationurl="https://wellcomelibrary.org/iiif/b28047345/canvas/c54#xywh=97,370,1657,61" manifesturl="https://wellcomelibrary.org/iiif/b28047345/manifest"/>


    <iiifannotation annotationurl="http://dams.llgc.org.uk/iiif/3320640/canvas/3320641#xywh=747,1680,286,54" annotationlist="http://dams.llgc.org.uk/iiif/3320641/annotation/list/ART1.json" manifesturl="http://dams.llgc.org.uk/iiif/newspaper/issue/3320640/manifest.json"></iiifannotation>

  </div>
</template>

<script>
import iiifannotation from './components/iiifannotation.vue'

export default {
  name: 'app',
  components: {
    iiifannotation
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
