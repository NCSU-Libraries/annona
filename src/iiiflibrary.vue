<template>
  <div id="app">
    <iiifannotation annotationurl="https://annonatatencsu.github.io/eng530/annotations/eng530-displayofheraldry-1-list.json"></iiifannotation>
    <rangestoryboard rangeurl="https://iiif.bodleian.ox.ac.uk/iiif/manifest/748a9d50-5a3a-440e-ab9d-567dd68b6abb.json" styling="overlaynext: true"></rangestoryboard> 
<!-- <multistoryboard annotationurls='https://dnoneill.github.io/annotate/annotations/04fbbb28-d5a7-4408-b7da-800c4e65eda3-list.json' images='https://dlcs.io/iiif-img/3/2/8034eb5b-9c90-4471-ad68-52124232ec0c/info.json'></multistoryboard>     <rangestoryboard rangeurl="http://localhost:4000/annona/webannotations/storyboardlist.json"></rangestoryboard> -->
    <!-- <storyboard annotationurl="http://127.0.0.1:4000/annona/webannotations/annotationslist.json"></storyboard> -->
    <!-- <storyboard annotationurl="https://dnoneill.github.io/annotate/annotations/cdm17272contentdmoclcorg-14057-list.json"></storyboard>  -->
    <!-- <multistoryboard annotationurls="https://dnoneill.github.io/annonatate/annotations/ids-38847172-canvas-38847172-list.json" manifesturl="https://dnoneill.github.io/annonatate/manifests/iiif.lib.harvard.edu/manifest.json" styling="toggleoverlay:true;"></multistoryboard> -->
    <!-- <rangestoryboard rangeurl="./testfiles/rangetest.json" styling="perpage:2; sortannos:vertical;"></rangestoryboard> -->
    <!-- <multistoryboard annotationurls="https://annonatatencsu.github.io/eng530/annotations/eng530-displayofheraldry-1-list.json;https://annonatatencsu.github.io/eng530/annotations/eng530-displayofheraldry-2-list.json;https://annonatatencsu.github.io/eng530/annotations/eng530-displayofheraldry-3-list.json;https://annonatatencsu.github.io/eng530/annotations/eng530-displayofheraldry-4-list.json;https://annonatatencsu.github.io/eng530/annotations/eng530-markhamsfarewelltohusbandry-1-list.json;https://annonatatencsu.github.io/eng530/annotations/eng530-markhamsfarewelltohusbandry-2-list.json;https://annonatatencsu.github.io/eng530/annotations/eng530-maryhawker-1-list.json;https://annonatatencsu.github.io/eng530/annotations/eng530-vellumnotarial-1-list.json;https://annonatatencsu.github.io/eng530/annotations/eng530-vellumnotarial-2-list.json;https://annonatatencsu.github.io/eng530/annotations/eng530-trinityapokalypse-1-list.json;https://annonatatencsu.github.io/eng530/annotations/eng530-trinityapokalypse-2-list.json;https://annonatatencsu.github.io/eng530/annotations/eng530-gratiandecretalsdepurgatio-1-list.json;https://annonatatencsu.github.io/eng530/annotations/eng530-gratiandecretalsdepurgatio-2-list.json" manifesturl="https://annonatatencsu.github.io/eng530/img/derivatives/iiif/displayofheraldry/manifest.json;https://annonatatencsu.github.io/eng530/img/derivatives/iiif/displayofheraldry/manifest.json;https://annonatatencsu.github.io/eng530/img/derivatives/iiif/displayofheraldry/manifest.json;https://annonatatencsu.github.io/eng530/img/derivatives/iiif/displayofheraldry/manifest.json;https://annonatatencsu.github.io/eng530/img/derivatives/iiif/markhamsfarewelltohusbandry/manifest.json;https://annonatatencsu.github.io/eng530/img/derivatives/iiif/markhamsfarewelltohusbandry/manifest.json;https://annonatatencsu.github.io/eng530/img/derivatives/iiif/maryhawker/manifest.json;https://annonatatencsu.github.io/eng530/img/derivatives/iiif/vellumnotarial/manifest.json;https://annonatatencsu.github.io/eng530/img/derivatives/iiif/vellumnotarial/manifest.json;https://annonatatencsu.github.io/eng530/img/derivatives/iiif/trinityapokalypse/manifest.json;https://annonatatencsu.github.io/eng530/img/derivatives/iiif/trinityapokalypse/manifest.json;https://annonatatencsu.github.io/eng530/img/derivatives/iiif/gratiandecretalsdepurgatio/manifest.json;https://annonatatencsu.github.io/eng530/img/derivatives/iiif/gratiandecretalsdepurgatio/manifest.json" styling="continousboard:true;toggleoverlay:true;fullpage:true;fit:fill"></multistoryboard> -->

    <!-- <storyboard annotationurl="./testfiles/cssnestedtags.json" styling="continousboard:true;toggleoverlay:true;"></storyboard> -->
  </div>
</template>

<script>
import iiifannotation from './components/iiifannotation.vue'
import storyboard from './components/storyboard.vue'
import rangestoryboard from './components/rangestoryboard.vue'
import multistoryboard from './components/multistoryboard.vue'

export default {
  name: 'app',
  components: {
    iiifannotation,
    storyboard,
    rangestoryboard,
    multistoryboard
  }
}
</script>
