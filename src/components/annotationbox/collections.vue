<template>
  <ul class="tree-menu" v-bind:class="[{toplevel: depth == 0}, 'level-'+depth]" :data-label="label">
    <li>
    <div class="title" v-if="nodedata" v-bind:class="[active ? 'activecollection' : className ]">
        <button class="buttonlink" v-on:click="checkCollapse(nodedata);" :id="nodedata.id">
            <img v-bind:src="nodedata.thumbnail" v-if="nodedata.thumbnail" style="max-width: 30px;">
            <span v-if="nodedata.type == 'collection' && showChildren">
              <i class="fas fa-chevron-up collectionicon"></i>
            </span>
            <span v-else-if="nodedata.type == 'collection' && !showChildren">
              <i class="fas fa-chevron-down collectionicon"></i>
            </span>{{nodedata.label}}
            <span  v-if="nodedata.type != 'collection'">
              <i class="fas fa-arrow-right collectionicon"></i>
            </span>
        </button>
    </div>
    <div class="additionaltext" v-html="nodedata.description" v-if="nodedata && nodedata.description"></div>
    <collections v-for="(nodeitem, index) in nodesdata" v-bind:key="depth + '-' +index" v-show="showChildren || depth == 0"
        :nodes="nodeitem.manifests"
        :label="nodeitem.label"
        :node="nodeitem"
        :thumbnail="nodeitem.thumbnail"
        :parents="parents"
        :index="index"
        :depth="depth + 1"
      ></collections>   
    </li>
  </ul>
</template>
<script>
/* eslint-disable no-console */
  export default { 
    props: [ 'label', 'index', 'nodes', 'depth', 'id', 'node', 'description', 'parents', 'thumbnail'],
    data() {
      return {
        showChildren: false,
        currentcount: '',
        selected: false,
        nodedata: '',
        nodesdata: [],
        caretdirection: this.showChildren ? 'down' : 'up',
        parentDescription: '',
        parentTitle: '',
        active: false
      }
    },
    name: 'collections',
    watch: {
      "parents.annotationurl": function() {
        this.updateActive();
      }
    },
    mounted() {
      this.nodedata = this.node ? JSON.parse(JSON.stringify(this.node)) : '';
      this.nodesdata = this.nodes ? JSON.parse(JSON.stringify(this.nodes)) : [];
      this.updateActive();
    },
    computed: {
      className: function() {
        const index = this.$parent.index != undefined ? this.$parent.index + 1 + this.index : this.index;
        const classname = index%2 ? 'odd': 'even';
        return classname;
      }
    },
    methods: {
        updateActive: function() {
          if (this.nodedata.id == this.parents.annotationurl['manifest']) {
            this.active = true;
            var topparent = this.$parent;
            for (var i=this.depth; i>0; i--){
              topparent.showChildren = true;
              topparent = topparent.$parent;
            }
          }
        },
        checkCollapse: function(node) {
            if (!node['manifests']) {
              this.parents.updateCollectionManifest(node, false, this);
            }
            this.showChildren = !this.showChildren;
        }
    }
  }
</script>
<style>
.level-0, .level-1 {
    padding: 0;
}
</style>