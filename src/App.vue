<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <iiifannotation annotationurl="https://raw.githubusercontent.com/tomcrane/iiif-collector/master/objects/paragraph.json"/>
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
