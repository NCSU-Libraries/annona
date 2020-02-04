<template>
  <div class="iiifannotation" v-bind:id="annotationid + '_imageview'">
    <select v-if="languages.length > 0" class="lang_drop" v-on:change="changeLang($event)" v-html="languages.join('')"></select>
    <table>
      <tr>
        <th v-if="!settings.image_only && has_sections">Image Section</th>
        <th v-if="!settings.image_only && !settings.text_only">Annotation Content</th>
        <th v-if="!settings.hide_tags && has_tags">Tags</th>
        <th v-if="!settings.image_only && !settings.text_only">Full Images</th>
        <th v-if="!settings.hide_fullobject && full_object && full_object !== '' && !settings.image_only && !settings.text_only">Full Object</th>
      </tr>
      <tr v-for="item in annotation_items" :key="item.id" :id="item.id" class="annotation_container">
        <td v-for="image in item.image" :key="image">
          <span v-html="image" id="annoimage"></span>
        </td>
        <td id="content" v-if="item.rendered_content && item.rendered_content !== '' && settings.image_only !== true" v-html="item.rendered_content"></td>
        <td id="tags" v-if="!settings.hide_tags && item.tags" >
          <div class="table_tags">
            {{item.tags.join(", ")}}
          </div>
        </td>
        <td v-if="item.fullImage && !settings.image_only" >
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
      counts: {},
      fielddata: [],
      annotationid: '',
      full_object: '',
      has_tags: '',
      has_sections: ''
    }
  },
  created() {
    for (var key in this.compdata) {
      this[key] = this.compdata[key]
    }
    this.has_tags = this.annotation_items.map(elem => elem.tags && elem.tags.length > 0).indexOf(true) > -1;
    this.has_sections = this.annotation_items.map(elem => elem.image && elem.image.length > 0).indexOf(true) > -1;
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
