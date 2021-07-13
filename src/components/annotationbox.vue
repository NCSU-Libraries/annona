<template>
  <div v-bind:id="$parent.seadragonid + '_annotation'" class="annotation" v-bind:class="[$parent.booleanitems.isexcerpt ? 'excerpt' : 'fullcontent', $parent.textposition, $parent.settings.toolbarposition ? $parent.settings.toolbarposition + '_menu_annotation' : '', $parent.settings.hide_toolbar ? 'no_toolbar_annotation' : '']" v-show="$parent.shown" tabindex="0">
    <span v-if="!$parent.settings.hide_annocontrols && $parent.settings.hide_annocontrols !== true" id="annotation_controls">
      <button class="annocontrols_button" id="close_button" v-if="$parent.shortcuts['close']" v-on:click="$parent.close();" aria-label="close content box button">
        <i class="fas fa-times"></i>
      </button>
      <button v-if="$parent.shortcuts['hide']" id="hide_button" class="annocontrols_button"  v-on:click="$parent.sendMessage($parent.shortcuts['hide']['function']);" aria-label="collapse content box button">
        <span v-html="$parent.buttons.hide"></span>
      </button>
      <button id="playpause_button" class="annocontrols_button" v-on:click="$parent.sendMessage($parent.shortcuts['playpause']['function']);" v-if="$parent.settings.tts && $parent.shortcuts['playpause']" aria-label="play/pause text to speech button">
        <span v-html="$parent.buttons.playpause"></span>
      </button>
      <button id="tags_button" v-if="$parent.shortcuts['tags']" class="annocontrols_button" v-on:click="$parent.sendMessage($parent.shortcuts['tags']['function']);" aria-label="toggle tags button">
        <span v-html="$parent.buttons.tags"></span>
      </button>
      <button id="info_button" v-if="$parent.shortcuts['info']" class="annocontrols_button" v-on:click="$parent.sendMessage($parent.shortcuts['info']['function']);" aria-label="toggle info button">
        <span v-html="$parent.buttons.info"></span>
      </button>
      <button id="transcription_button" class="annocontrols_button" v-if="$parent.hastranscription && $parent.shortcuts['transcription']" v-on:click="$parent.sendMessage($parent.shortcuts['transcription']['function']);" aria-label="toggle transcription button">
        <span v-html="$parent.buttons.anno"></span>
      </button>
      <button v-if="$parent.shortcuts['prev']" id="previousButton" v-on:click="$parent.sendMessage($parent.shortcuts['prev']['function']);" v-bind:class="{ 'inactive' : $parent.prev_inactive }" class="annocontrols_button" aria-label="previous annotation button">
        <i class="fa fa-arrow-left"></i>
        <span class="toolbartext">Previous Annotation</span>
      </button>
      <button v-if="$parent.shortcuts['next']" id="nextButton" v-on:click="$parent.sendMessage($parent.shortcuts['next']['function']);" v-bind:class="{ 'inactive' : $parent.next_inactive }" class="annocontrols_button" aria-label="next annotation button">
        <i class="fa fa-arrow-right"></i>
        <span class="toolbartext">Next Annotation</span>
      </button>
      <span class="lang-icon" id="lang_button" v-if="$parent.languages.length > 0"><select aria-label="change language dropdown" class="lang_drop" v-on:change="$parent.sendMessage({'function': 'changeLang', 'args': $event });" v-html="$parent.languages.join('')"></select></span>
    </span>
    <div id="layers" v-if="$parent.shown == 'layer'" class="content">
      <div v-for="layer in $parent.layerslist" v-bind:key="layer.tile">
        <input type="checkbox" class="tagscheck" v-on:click="$parent.sendMessage({'function': 'setOpacity', 'args': layer });" v-model="layer.checked">
        <span v-html="layer.label"></span>
        <div class="slidecontainer">Opacity: <input v-on:change="$parent.sendMessage({'function': 'setOpacity', 'args': {'event': $event, 'layer': layer} })" type="range" min="0" max="100" v-bind:value="layer.opacity*100" class="slider"></div>
      </div>
    </div>
    <div id="shortcuts" v-if="$parent.shown == 'keyboard'" class="content">
      <p>There are multiple possible keyboard shortcuts for each button. 
        They are separated by an 'or'. 
        On Macs 'alt' is the 'option' key.
        </p>
      <table v-if="!$parent.booleanitems.isexcerpt">
      <tr>
        <th>Icon</th>
        <th>Keyboard shortcuts</th>
      </tr>
      <tr v-for="(value, key) in $parent.shortcuts" v-bind:id="key + '_tags'" v-bind:key="key" class="keyboard">
        <td>
          <span class="shortcuticon" v-html="value.icon + ' (' + value.label + ')'"></span>
        </td>
        <td><span v-for="(shortcut, index) in value.shortcut" v-bind:key="shortcut"><code>{{shortcut}}</code><span v-if="index != value.shortcut.length - 1"> or </span></span></td>
      </tr>
      </table>
    </div>
    <div id="tags" v-if="$parent.shown == 'tags'" class="content">
      <div v-for="(groupval, groupkey) in $parent.groupTagDict" v-bind:key="groupkey" class="tagslist">
        <div class="taggroup tags" v-if="groupkey" v-bind:id="groupkey + '_tags'">
          <input type="checkbox" class="tagscheck" v-on:click="$parent.sendMessage({'function': 'checksubgrouptags', 'args': groupkey });" v-model="groupval.checked">
          <div class="countkey">
            {{groupkey}}
            <span v-bind:style="'background: ' + groupval.color" class="tagscount">
              <span v-if="!$parent.settings.hide_tagcount">
                {{groupval.count}}
              </span>
            </span>
          </div>
        </div>
        <div v-bind:class="{ 'subtags' : groupkey }" class="tags" v-for="tagdict in groupval.tags" v-bind:id="tagdict.key + '_tags'" v-bind:key="tagdict.key" >
          <input type="checkbox" class="tagscheck" v-on:click="$parent.sendMessage({'function': 'hideshowalltags', 'args': tagdict.key });" v-model="tagdict.checked">
          <div class="countkey">
            {{tagdict.label}}
            <span v-bind:style="'background: ' + tagdict.color" class="tagscount">
              <span v-if="!$parent.settings.hide_tagcount">
                {{tagdict.count}}
              </span>
            </span>
          </div>
        </div>
      </div>
    </div>
    <div id="information" style="height: auto;" v-if="$parent.shown == 'info'" class="info content">
      <div class="imagetitle">
        <h1>{{$parent.imagetitle}}</h1>
      </div>
      <span v-if="!$parent.booleanitems.isexcerpt">
        <button class="infolink buttonlink" v-on:click="$parent.sendMessage({'function':'switchShown', 'args': 'additionalinfoshown'});" v-if="$parent.settings.additionalinfo">{{$parent.settings.additionalinfotitle}}</button>
        <div v-if="$parent.booleanitems.additionalinfoshown" v-html="$parent.settings.additionalinfo" class="imageinfo"></div>
        <button class="infolink buttonlink" v-on:click="$parent.sendMessage({'function':'switchShown', 'args': 'tocshown'});" v-if="$parent.basecompontent.range && $parent.basecompontent.toc.length > 1">{{$parent.basecompontent.toctitle}}</button>
        <div v-if="$parent.booleanitems.tocshown" class="tocinfo">
          <div v-for="(toc, index) in $parent.basecompontent.toc" v-bind:key="toc.position" v-bind:id="'data_' + toc.position">
            <div class="title">
              <button class="buttonlink" v-on:click="$parent.basecompontent.nextItemRange(toc.position);">
                <img v-bind:src="toc.thumbnail" v-if="toc.thumbnail" style="max-width: 30px;">{{index+1}}. {{toc.label}}
              </button>
            </div>
            <div class="additionaltext" v-html="toc.description" v-if="toc.description"></div>
          </div>
        </div>

        <button class="infolink buttonlink annoinfolink" v-on:click="$parent.sendMessage({'function':'switchShown', 'args': 'annoinfoshown'});" v-if="$parent.annoinfo.text">Annotation information</button>
        <div v-if="$parent.booleanitems.annoinfoshown" class="annoinfo">
          <span v-html="$parent.annoinfo.text"></span>
          <div class="annotationslist">
            <div v-for="annoinfo in $parent.annoinfo.annodata" v-bind:key="annoinfo.position" v-bind:id="'data_' + annoinfo.position">
              <div class="title"><button class="buttonlink" v-on:click="$parent.sendMessage({'function': 'next', 'args': annoinfo.position});">{{annoinfo.title}}</button></div>
              <div class="additionaltext" v-html="annoinfo.additionaltext"></div>
            </div>
          </div>
        </div>

        <button class="infolink buttonlink imageinfolink" v-if="$parent.imageinfo.text" v-on:click="$parent.sendMessage({'function':'switchShown', 'args': 'imageinfoshown'});">{{$parent.imageinfo.label}}</button>
        <div v-if="$parent.booleanitems.imageinfoshown" v-html="$parent.imageinfo.text" class="imageinfo"></div>
      </span>
    </div>
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
      <div v-for="(annotation, index) in $parent.annotations" v-bind:key="index">
        <div v-if="annotation.geometry" v-show="$parent.position == index" v-bind:id="'map' + index" style="height:180px" ></div>
      </div>
    </div>
  </div>
</template>
<script>
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
      if (this.$parent.settings.transcription || this.isscrollview){
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
    }
  }
}
</script>
