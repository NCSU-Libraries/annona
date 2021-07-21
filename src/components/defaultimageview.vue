<template>
  <div>
    <button v-if="$parent.textoverlay" v-on:click="displayTextOverlay()" class="imageViewButton">
      <span v-html="textoverlaybutton"></span>
    </button>
    <div v-for="(item, index) in annotation_items" :key="item.id" :id="item.id" class="annotation_container" :class="[item.content ? item.content.itemclass : '']">
      <span v-for="image in item.image" :key="image">
      <span v-html="image" class="annoimage"></span>
      </span>
      <img v-if="item.fullImage && !settings.image_only && !settings.hide_viewlarger" v-bind:src="item.fullImage" style="display:none;" id="fullimage" v-bind:alt="manifest['label']" v-bind:style="[settings.imagesettings !== undefined ? settings.imagesettings : '']">
      <div class="beforecontent" v-html="item.before" v-if="item.before && !settings.image_only && !settings.hide_beforeafter">
      </div>
      <div id="content" v-if="item.rendered_content && item.rendered_content !== '' && settings.image_only !== true" v-html="item.rendered_content"></div>
      <div class="aftercontent" v-html="item.after" v-if="item.after && !settings.image_only && !settings.hide_beforeafter">
      </div>
      <leaflet v-if="item['content'] && item['content']['geometry']" :position="index" :annotation="item['content']" :parent="$parent"></leaflet>
      <div id="tags" v-if="!settings.hide_tags && item.tags">
        <div v-for="tag in item.tags" v-bind:key="tag.key" class="tags">
          <div class="countkey">
            {{tag.label}}
            <span class="tagscount" v-bind:style="[tag.color ? {background: tag.color }: {}]">
              <span v-if="!settings.hide_tagcount && annotation_items.length > 1 && tag.count">{{tag.count}}</span>
            </span>
          </div>
        </div>
      </div>
      <button v-on:click="toggle($event)" class="togglebutton" v-if="item.fullImage && item.fullImage !== '' && !settings.hide_viewlarger !== false">View Full Image</button>
      <div id="link_to_object" v-if="!settings.hide_fullobject && full_object && full_object !== '' && !settings.image_only && !settings.text_only">
        Full object: <a v-bind:href="full_object" target="_blank">{{manifest["label"]}}</a>
      </div>
    </div>
  </div>
</template>
<script>
import leaflet from './leaflet';
export default {
  name: 'defaultimageview',
  props: {
    'compdata': {type: Object, required: false}
  },
  components: {
    leaflet
  },
  data: function() {
    return {
      anno: '',
      manifest: '',
      settings: {},
      manifestlink: '',
      annotation_items: [],
      languages: [],
      fielddata: [],
      annotationid: '',
      full_object: '',
      textoverlayicon: '<i class="fas fa-align-justify"></i>',
      textoverlayofficon: `
      <span class="fa-stack">
        <i class="fas fa-align-justify fa-stack-1x"></i>
        <i class="fas fa-slash fa-stack-1x" style="color:Tomato"></i>
      </span>`,
      textoverlaybutton: ''
    }
  },
  created() {
    this.textoverlaybutton = this.textoverlayofficon;
    for (var key in this.compdata) {
      this[key] = this.compdata[key]
    }
    this.getFullObject();
  },
  methods: {
    //toggle hide/view full image
    toggle: function(event){
      var parent = event.target.parentElement;
      var fullImage = parent.querySelector("#fullimage");
      var change_html = event.srcElement !== undefined ?  event.srcElement : event.target;
      if (fullImage.style.display === 'none'){
        fullImage.style.display='inline-block';
        change_html.innerHTML = "Hide Full Image";
      } else {
        fullImage.style.display= 'none';
        change_html.innerHTML = "View Full Image";
      }
    },
    displayTextOverlay: function(){
      const textelements = document.getElementsByClassName('textOverlayText')
      for (var to=0; to<textelements.length; to++){
        if (textelements[to].style.display == 'none'){
          textelements[to].style.display = '';
          this.textoverlaybutton = this.textoverlayofficon;
        } else {
          textelements[to].style.display = 'none';
          this.textoverlaybutton = this.textoverlayicon;
        }
      }
    },
    getFullObject: function() {
      var manifest = this.compdata['manifest'];
      var keys = Object.keys(manifest);
      if (keys.indexOf("related") > -1){
        if (typeof manifest.related === 'string'){
          this.full_object = manifest.related;
        } else {
          this.full_object = manifest.related['@id'];
        }
      } else {
        this.full_object = keys.indexOf("seeAlso") > -1 ? manifest.seeAlso['@id'] : '';
      }
    }
  }
}
</script>

<style lang="scss">
@import '../iiif-annotation.scss'
</style>
