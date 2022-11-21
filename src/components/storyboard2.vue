<template>
<span>
    <span v-if="type && type == 'storyboard'">
        <storyboard :annotationurl="inputurl" v-bind:jsonannotation="jsondata" v-bind:manifesturl="manifesturl" v-bind:styling="styling" v-bind:ws="ws" v-bind:layers="layers"></storyboard>
    </span>
    <span v-else-if="type && type =='multistoryboard'">
      <multistoryboard :annotationurls="inputurl" v-bind:jsonannotation="jsondata" v-bind:manifesturl="manifesturl" v-bind:styling="styling" v-bind:ws="ws" v-bind:layers="layers" v-bind:images="images"></multistoryboard>
    </span>
    <span v-else-if="type && type =='rangestoryboard'">
        <rangestoryboard :rangeurl="inputurl" v-bind:json="jsondata" v-bind:manifesturl="manifesturl" v-bind:styling="styling" v-bind:ws="ws" v-bind:layers="layers"></rangestoryboard>
    </span>
</span>
</template>
<script>
import storyboard from './storyboard';
import multistoryboard from './multistoryboard.vue';
import rangestoryboard from './rangestoryboard.vue';
import shared from './shared.js';
import axios from 'axios';

export default {
  name: 'storyboard2',
  props: {
    'manifesturl':String,
    'annotationurl': String,
    'annotationlist': String,
    'jsonannotation': Object,
    'url': String,
    'json': Object,
    'styling': String,
    'ws': String,
    'layers': String,
    'images': String
  },
  components: {
    storyboard,
    multistoryboard,
    rangestoryboard
  },
  data: function() {
    return {
        'jsondata': [],
        'type': '',
        'inputurl': ''
    }
  },
  methods: {
    getType: function(jsondata) {
        var type = jsondata['type'] ? jsondata['type'] : jsondata['@type'];
        type = type ? type.toLowerCase() : type;
        if (type.indexOf('annotation') > -1) {
            this.type = 'storyboard'
        } else {
            this.type = 'rangestoryboard'
        }
        window.annonatype = this.type;
    }
  },
  created() {
    const annotationurl = this.json ? this.json : this.jsonannotation ? this.jsonannotation : this.url ? this.url : this.annotationurl ? this.annotationurl : this.annotationlist;
    this.inputurl = this.url ? this.url : this.annotationurl ? this.annotationurl : this.annotationlist;
    var isURL = shared.isURL(annotationurl, '');
    var vue = this;
    if (this.inputurl.split(';').length > 1){
        this.type = 'multistoryboard';
    } else if (isURL['isURL']){
        axios.get(`${annotationurl}?cb=${Date.now()}`).then(response => {
            vue.jsondata = response.data;
            vue.getType(response.data);
        }).catch((error) => {console.log(error)});
    } else {
        this.jsondata = this.json ? JSON.parse(this.json) : this.jsonannotation ? JSON.parse(this.jsonannotation): isURL['json'];
        this.getType(this.jsondata)
    }
  }
}
</script>
