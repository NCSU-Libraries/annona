<template>
  <div class="iiifannotation" v-bind:id="annotationid + '_imageview'">
    <div v-for="item in annotation_items" :key="item.id" :id="item.id" class="annotation_container">
      <span v-for="image in item.image" :key="image">
      <span v-html="image" id="annoimage"></span>
      </span>
      <img v-if="item.fullImage && !settings.image_only && !settings.hide_viewlarger" v-bind:src="item.fullImage" style="display:none;" id="fullimage" v-bind:alt="manifest['label']" v-bind:style="[settings.imagesettings !== undefined ? settings.imagesettings : '']">
      <div id="content" v-if="item.rendered_content && item.rendered_content !== '' && settings.image_only !== true" v-html="item.rendered_content"></div>
      <div id="tags">
        <div v-if="!settings.hide_tags && item.tags" v-for="tag in item.tags" v-bind:key="tag" class="tags">
          <div class="countkey">
            {{tag}}
            <span class="tagscount" v-bind:style="[counts[tag] ? {background: counts[tag].color }: {}]">
              <span v-if="!settings.hide_tagcount && annotation_items.length > 1 && counts[tag]">{{counts[tag].count}}</span>
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
export default {
  name: 'defaultimageview',
  props: {
    'compdata': {type: Object, required: false}
  },
  data: function() {
    return {
      anno: '',
      manifest: '',
      settings: {},
      manifestlink: '',
      annotation_items: [],
      rendered: '',
      languages: [],
      counts: {},
      fielddata: [],
      annotationid: '',
      full_object: ''
    }
  },
  created() {
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
