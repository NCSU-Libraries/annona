<template>
  <div v-bind:id="$parent.seadragonid + '_annotation'" class="annotation" v-bind:class="[$parent.booleanitems.isexcerpt ? 'excerpt' : 'fullcontent', $parent.textposition, $parent.settings.toolbarposition ? $parent.settings.toolbarposition + '_menu_annotation' : '', $parent.settings.hide_toolbar ? 'no_toolbar_annotation' : '']" v-show="$parent.shown" tabindex="0">
    <boxtoolbar v-if="!$parent.settings.hide_annocontrols && $parent.settings.hide_annocontrols !== true"  :parent="$parent"></boxtoolbar>
    <div id="layers" v-if="$parent.shown == 'layer'" class="content">
      <div v-for="layer in $parent.layerslist" v-bind:key="layer.tile">
        <input type="checkbox" class="tagscheck" v-on:click="$parent.sendMessage({'function': 'setOpacity', 'args': layer });" v-model="layer.checked">
        <span v-html="layer.label"></span>
        <div class="slidecontainer">Opacity: <input v-on:change="$parent.sendMessage({'function': 'setOpacity', 'args': {'event': $event, 'layer': layer} })" type="range" min="0" max="100" v-bind:value="layer.opacity*100" class="slider"></div>
      </div>
    </div>
    <textoverlay v-if="$parent.shown == 'textoverlay'" :parent="$parent"></textoverlay>
    <shortcuts v-if="$parent.shown == 'keyboard'" :parent="$parent"></shortcuts>
    <tags v-if="$parent.shown == 'tags'" :parent="$parent"></tags>
    <info v-if="$parent.shown == 'info'" :parent="$parent"></info>
    <div id='transcription' v-if="$parent.shown == 'transcription'" class="content" v-bind:class="$parent.currentanno.itemclass">
      <span v-if="!$parent.booleanitems.isexcerpt && !$parent.settings.transcription && !isscrollview" v-html="$parent.annoContent['transcription']"></span>
      <button v-for="(item, index) in transcriptions" v-bind:key="index" v-else-if="(!$parent.booleanitems.isexcerpt && $parent.settings.transcription) || isscrollview" v-on:click="$parent.sendMessage({'function':'next', 'args': index});" class="buttonastext" v-bind:class="[index == $parent.position && $parent.settings.annoview != 'scrollview' ? 'activeword' : '', $parent.settings.annoview == 'scrollview' ? 'scrolltext' :  'ocrlink']">
        <div v-if="item" v-html="item" class="ocrtranscription" v-bind:id="'line' + index" :ref="index"></div>
      </button>
      <span v-html="$parent.$options.filters.truncate($parent.annoContent['transcription'], $parent.settings.truncate_length)" v-else-if="$parent.booleanitems.isexcerpt"></span>
    </div>
    <div id="annotation_text" v-show="$parent.shown == 'anno'" class="content" v-bind:class="$parent.currentanno.itemclass">
      <span v-html="$parent.annoContent['anno']" v-if="!$parent.booleanitems.isexcerpt && !isscrollview"></span>
      <span v-html="$parent.$options.filters.truncate($parent.annoContent['anno'], $parent.settings.truncate_length)" v-else-if="!isscrollview"></span>
      <button v-for="(item, index) in scrollitems" v-bind:key="index" v-else-if="!$parent.booleanitems.isexcerpt || isscrollview" v-on:click="$parent.sendMessage({'function':'next', 'args': index});" class="buttonastext scrolltext">
        <div v-if="item" v-html="item" class="scrollitem" v-bind:id="'line' + index" :ref="index"></div>
      </button>
      <div v-if="$parent.leaflet">
        <div v-for="(annotation, index) in $parent.annotations" v-bind:key="index">
          <leaflet v-if="annotation.geometry" v-bind:key="index" v-show="$parent.position == index" :parent="$parent" :position="index" :annotation="annotation"></leaflet>
        </div>
      </div>
    </div>
    <span v-if="$parent.shortcuts['textoverlay']" v-html="customStyle"></span>
  </div>
</template>
<script>
import leaflet from './leaflet'
import boxtoolbar from './annotationbox/boxtoolbar.vue'
import textoverlay from './annotationbox/textoverlay.vue'
import shortcuts from './annotationbox/shortcuts.vue'
import tags from './annotationbox/tags.vue'
import info from './annotationbox/info.vue'

export default {
  name: 'annotationbox',
  data: function() {
    return {
      transcriptions: [],
      scrollitems: [],
      isscrollview: false,
      updatedto: ''
    }
  },
  components: {
    leaflet,
    boxtoolbar,
    textoverlay,
    shortcuts,
    tags,
    info
  },
  watch: {
   '$parent.annotations': function(){
      this.scrollContent();
    },
    '$parent.currentlang': function(){
      this.scrollContent(true);
    },
    '$parent.position': function(newval) {
      if (this.updatedto.toString() != newval.toString() && this.$refs[newval]){
        this.$nextTick(() => {
          const valelem = this.$refs[newval][0];
          const yelem = valelem.offsetTop - this.padding/2;
          this.$el.scrollTo(0, yelem);
        })
      }
    }
  },
  mounted() {
    if (this.$parent.settings.annoview == 'scrollview'){
      this.$el.addEventListener('scroll', this.handleScroll);
    }
  },
  created() {
    this.isscrollview = this.$parent.settings.annoview == 'scrollview';
  },
  methods: {
    scrollContent: function(reset=false) {
      if (this.$parent.settings.transcription || this.isscrollview || this.$parent.leaflet){
        if (reset){
          this.scrollitems = [];
          this.transciptions = [];
        }
        for (var an=0; an<this.$parent.annotations.length; an++){
          const transcript = this.$parent.createAnnoContent(this.$parent.annotations[an]);
          var text = transcript['transcription'] ? transcript['transcription'] : transcript['anno'];
          this.transcriptions.push(text);
          this.scrollitems.push(transcript['anno']);
        }
      }
    },
    handleScroll: function() {
      if (this.$parent.shown == 'transcription' || this.$parent.shown == 'anno'){
        for (var key in this.$refs){
          const refitem = this.$refs[key][0];
          const top = refitem.offsetTop - this.padding;
          const bottom = top + refitem.offsetHeight + this.padding;
          const numb = parseInt(key);
          if (top <= this.$el.scrollTop && this.$el.scrollTop <= bottom){
            if (this.$parent.position != numb){
              if (this.$parent.$parent.multi) {
                this.$parent.$parent.sendMessage({'function': 'next', 'args': numb})
              } else {
                this.$parent.sendMessage({'function': 'next', 'args': numb})
              }
              this.updatedto = numb;
            }
          }
        }
      }
    }
  },
  computed: {
    padding: function(){
      return (this.$refs['1'][0].offsetTop - this.$refs['0'][0].offsetTop)/1.1;
    },
    customStyle: function(){
      return `<style type="text/css">#${this.$parent.seadragonid} .textoverlay { fill: ${this.$parent.textoverlay.fontcolor};
      background: ${this.$parent.textoverlay.background};
      opacity: ${this.$parent.textoverlay.opacity/100};
      }</style>`;
    }
  }
}
</script>
