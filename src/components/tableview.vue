<template>
  <div>
    <table>
      <tr>
        <th v-if="!settings.image_only && has_sections && !settings.text_only">Image Section</th>
        <th v-if="has_before && !settings.image_only && !settings.hide_beforeafter">Before content</th>
        <th v-if="!settings.image_only && !settings.text_only">Annotation Content</th>
        <th v-if="has_after && !settings.image_only && !settings.hide_beforeafter">After content</th>
        <th v-if="!settings.hide_tags && has_tags">Tags</th>
        <th v-if="!settings.image_only && !settings.text_only && !settings.hide_viewlarger">Full Image</th>
        <th v-if="!settings.hide_fullobject && full_object && full_object !== '' && !settings.image_only && !settings.text_only">Full Object</th>
      </tr>
      <tr v-for="item in annotation_items" :key="item.id" :id="item.id" class="annotation_container" v-bind:class="[item.content ? item.content.itemclass : '']">
        <td v-if="has_sections">
          <span v-for="image in item.image" :key="image">
            <span v-html="image" class="annoimage"></span>
          </span>
        </td>
        <td class="beforecontent" v-html="item.before" v-if="item.before && !settings.image_only && !settings.hide_beforeafter">
        </td>
        <td id="content" v-if="item.rendered_content && item.rendered_content !== '' && settings.image_only !== true" v-html="item.rendered_content"></td>
        <td class="aftercontent" v-html="item.after" v-if="item.after && !settings.image_only && !settings.hide_beforeafter">
        </td>
        <td id="tags" v-if="!settings.hide_tags && item.tags" >
          <div class="table_tags">
            {{item.tags.map(tag => tag.label).join(", ")}}
          </div>
        </td>
        <td v-if="item.fullImage && !settings.image_only && !settings.hide_viewlarger" >
          <img v-bind:src="item.fullImage" id="fullimage" v-bind:alt="manifest['label']" v-bind:style="[settings.imagesettings !== undefined ? settings.imagesettings : '']">
        </td>
        <td id="link_to_object" v-if="!settings.hide_fullobject && full_object && full_object !== '' && !settings.image_only && !settings.text_only">
          <a v-bind:href="full_object" target="_blank">{{manifest["label"]}}</a>
        </td>
      </tr>
    </table>
  </div>
</template>
<script>
export default {
  name: 'tableview',
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
      fielddata: [],
      annotationid: '',
      full_object: '',
      has_tags: '',
      has_sections: '',
      has_before: '',
      has_after: ''
    }
  },
  created() {
    for (var compkey in this.compdata) {
      this[compkey] = this.compdata[compkey]
    }
    var keys = {'tags': 'has_tags', 'image': 'has_sections', 'before': 'has_before', 'after': 'has_after'}
    for (var ai=0; ai<this.annotation_items.length; ai++){
      var item = this.annotation_items[ai];
      for (var key in keys){
        if (item[key] && item[key].length > 0) {
          this[keys[key]] = true;
        }
      }
    }
    this.getFullObject();
  },
  methods: {
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
