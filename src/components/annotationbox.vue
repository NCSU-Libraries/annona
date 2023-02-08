<template>
  <div v-bind:id="$parent.seadragonid + '_annotation'" class="annotation" v-bind:class="[$parent.booleanitems.isexcerpt ? 'excerpt' : 'fullcontent', $parent.textposition, $parent.settings.toolbarposition ? $parent.settings.toolbarposition + '_menu_annotation' : '', $parent.settings.hide_toolbar ? 'no_toolbar_annotation' : '']" v-show="$parent.shown && show" tabindex="0">
    <boxtoolbar v-if="!$parent.settings.hide_annocontrols && $parent.settings.hide_annocontrols !== true" :parent="$parent"></boxtoolbar>
    <div id="layers" v-if="$parent.shown == 'layers'" class="content">
      <div v-for="layer in $parent.layerslist" v-bind:key="layer.tile">
        <input type="checkbox" class="tagscheck" v-on:click="$parent.sendMessage({'function': 'setOpacity', 'args': layer });" v-model="layer.checked">
        <span v-html="layerLang(layer.label)"></span>
        <div class="slidecontainer">Opacity: <input v-on:change="$parent.sendMessage({'function': 'setOpacity', 'args': {'event': $event, 'layer': layer} })" type="range" min="0" max="100" v-bind:value="layer.opacity*100" class="slider"></div>
      </div>
    </div>
    <textoverlay v-if="$parent.shown == 'textoverlay'" :parent="$parent"></textoverlay>
    <shortcuts v-if="$parent.shown == 'keyboard'" :parent="$parent"></shortcuts>
    <tags v-if="$parent.shown == 'tags'" :parent="$parent"></tags>
    <info v-if="$parent.shown == 'info'" :parent="$parent"></info>
    <settings v-if="$parent.shown == 'settings'" :parent="$parent"></settings>
    <perpage v-if="$parent.shown == 'perpage' && show" :parent="$parent"></perpage>
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
          <leaflet v-if="annotation.geometry" v-bind:key="index" v-show="$parent.position == index && !$parent.booleanitems.isexcerpt" :parent="$parent" :position="index" :annotation="annotation"></leaflet>
        </div>
      </div>
    </div>
    <span v-for="updatevalue,updatekey in updated" v-bind:key="updatekey" v-bind:id="updatekey">
      <span v-if="$parent.settings[updatekey] && updatevalue" v-html="customCSS(updatekey)"></span>
    </span>
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
import perpage from './annotationbox/perpage.vue'
import settings from './annotationbox/settings.vue'
export default {
  name: 'annotationbox',
  data: function() {
    return {
      transcriptions: [],
      scrollitems: [],
      isscrollview: false,
      updatedto: '',
      show: true,
      updated: {'tagscolor': false, 'fontsize': false, 'overlaycolor': false, 'activecolor': false}
    }
  },
  components: {
    leaflet,
    boxtoolbar,
    textoverlay,
    shortcuts,
    tags,
    info,
    perpage,
    settings
  },
  watch: {
   '$parent.annotations': function(){
      this.scrollContent(this.$parent.annotations.length == 0);
    },
    '$parent.currentlang': function(){
      this.scrollContent(true);
    },
    '$parent.shown': function(newval) {
      const single = ['perpage', 'textoverlay', 'keyboard', 'info', 'settings']
      if (this.$parent.$parent && this.$parent.$parent.multi && single.indexOf(newval) > -1){
        this.show = this.$parent.$parent.boardchildren[0].seadragonid == this.$parent.seadragonid;
      } else {
        this.show = true;
      }
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
    this.scrollContent(this.$parent.annotations.length == 0);
  },
  created() {
    this.isscrollview = this.$parent.settings.annoview == 'scrollview';
    for (var ukey in this.updated) {
      if (this.$parent.settings[ukey]) {
        this.updated[ukey] = true;
      }
    }
  },
  methods: {
    scrollContent: function(reset=false) {
      if (this.$parent.settings.transcription || this.isscrollview || this.$parent.leaflet){
        if (reset){
          this.scrollitems = [];
          this.transcriptions = [];
        }
        for (var an=0; an<this.$parent.annotations.length; an++){
          const transcript = this.$parent.createAnnoContent(this.$parent.annotations[an]);
          var text = transcript['transcription'] ? transcript['transcription'] : transcript['anno'];
          this.transcriptions.push(text);
          this.scrollitems.push(transcript['anno']);
        }
      }
    },
    layerLang: function(lang) {
      var currentlang = this.$parent.currentlang;
      var isobj = lang.constructor.name == 'Object';
      var returnlang = lang;
      if (isobj){
        if (!currentlang || Object.keys(lang).indexOf(currentlang) == -1){
          returnlang = lang[Object.keys(lang)[0]];
        } else {
          returnlang = lang[currentlang];
        }
      }
      returnlang = Array.isArray(returnlang) ? returnlang.join(" | ") : returnlang;
      return returnlang;
    },
    customCSS:function(field) {
      return `<style type="text/css">`+ this[`custom${field}`]() + `</style>`;
    },
    customtagkey: function(tag, color) {
      return `#${this.cssID} #${tag}_tags .tagscount{
        background: ${color}!important;
      }
      `
    },
    customtagscolor: function() {
      var style = ''
      for (var tc in this.$parent.settings.tagscolor){
        const newcolor = this.$parent.settings.tagscolor[tc];
        style += this.customoverlaycolor(tc, newcolor)
        style += this.customtagkey(tc, newcolor);
      }
      return style;
    },
    customactivecolor: function() {
      return `#${this.cssID} .active > svg .svgactive {
        stroke: ${this.$parent.settings['activecolor']}!important;
      }
      #${this.cssID} .active.rect {
        outline-color: ${this.$parent.settings['activecolor']}!important;
      }
      #${this.cssID} .active.pin {
        -webkit-text-stroke: ${this.$parent.settings['activecolor']}!important;
      }
      #${this.cssID} .pin.overlay.active circle, rect {
        stroke: ${this.$parent.settings['activecolor']}!important;
      }
      `
    },
    customoverlaycolor: function(tag=false, customcolor=false) {
      const id = tag ? `#${this.cssID} .${tag}` : `#${this.cssID} `
      const color = customcolor ? customcolor : this.$parent.settings['overlaycolor'];
      return `${id}.overlay > svg > * {
        stroke: ${color}!important;
      } ${id}.rect {
        border-color: ${color}!important;
      } ${id}.pin {
        color: ${color}!important;
      }`
    },
    customfontsize: function() {
      const fontsize = this.$parent.settings.fontsize.length > 2 ? '' : 'px';
      return `#${this.cssID} .content, #${this.cssID} .content > *, #${this.cssID} .content > * > *{font-size: ${this.$parent.settings.fontsize}${fontsize}!important}`
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
    cssID: function() {
      return this.$parent.$parent && this.$parent.$parent.storyboardcontainerid ? this.$parent.$parent.storyboardcontainerid : this.$parent.seadragonid;
    },
    customStyle: function(){
      return `<style type="text/css">#${this.cssID} .textoverlay { fill: ${this.$parent.textoverlay.fontcolor};
      background: ${this.$parent.textoverlay.background};
      opacity: ${this.$parent.textoverlay.opacity/100};
      }
      #${this.cssID} .textoverlaywithpath {
        background: none;
      }
      #${this.cssID} .svgBackground { fill: ${this.$parent.textoverlay.background};
      opacity: ${this.$parent.textoverlay.opacity/100};
      }</style>
      `;
    }
  }
}
</script>
