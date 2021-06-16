<template>
    <span id="header_toolbar" v-if="!parentcomp.settings.hide_toolbar || (parentcomp.settings.hide_toolbar && !parentcomp.fullscreen)" v-bind:class="menuclass">
        <button v-if="parentcomp.shortcuts['autorun']" id="autoRunButton" v-on:click="parentcomp.sendMessage(parentcomp.shortcuts['autorun']['function']);" class="toolbarButton">
          <span v-html="parentcomp.buttons.autorunbutton"></span>
          <span class="toolbartext">Start/Stop Autorun</span>
        </button>
        <button v-on:click="parentcomp.sendMessage(parentcomp.shortcuts['info']['function']);" v-if="parentcomp.shortcuts['info']"  id="infoButton" class="toolbarButton">
          <span v-html="parentcomp.buttons.info"></span>
          <span class="toolbartext">View source image information</span>
        </button>
        <button v-on:click="parentcomp.sendMessage(parentcomp.shortcuts['tags']['function']);" id="tagsButton" v-if="parentcomp.shortcuts['tags']" class="toolbarButton">
          <span v-html="parentcomp.buttons.tags"></span>
          <span class="toolbartext">Toggle Tags</span>
        </button>
        <button v-if="parentcomp.shortcuts['overlay']" id="overlayButton" v-on:click="parentcomp.sendMessage(parentcomp.shortcuts['overlay']['function']);" class="toolbarButton">
          <span v-html="parentcomp.buttons.overlaybutton"></span>
          <span class="toolbartext">Toggle Overlays</span>
        </button>
        <button v-if="parentcomp.shortcuts['layers']" id="layerButton" v-on:click="parentcomp.sendMessage(parentcomp.shortcuts['layers']['function']);" class="toolbarButton">
          <span v-html="parentcomp.buttons.layer"></span>
          <span class="toolbartext">View layers</span>
        </button>
        <button v-if="parentcomp.shortcuts['zoomin']" v-on:click="parentcomp.sendMessage(parentcomp.shortcuts['zoomin']['function']);" id="zoomInButton" class="toolbarButton">
          <i class="fas fa-search-plus"></i>
          <span class="toolbartext">Zoom in</span>
        </button>
        <button v-if="parentcomp.shortcuts['zoomout']" v-on:click="parentcomp.sendMessage(parentcomp.shortcuts['zoomout']['function']);" id="zoomOutButton" class="toolbarButton">
          <i class="fas fa-search-minus"></i>
          <span class="toolbartext">Zoom out</span>
        </button>
        <button v-if="parentcomp.shortcuts['home']" v-on:click="parentcomp.sendMessage(parentcomp.shortcuts['home']['function'])" id="homeZoomButton" class="toolbarButton">
          <i class="fas fa-home"></i>
          <span class="toolbartext">View full image</span>
        </button>
        <button v-if="parentcomp.shortcuts['prev']" id="previousButton" v-on:click="parentcomp.sendMessage(parentcomp.shortcuts['prev']['function']);" v-bind:class="{ 'inactive' : parentcomp.prev_inactive }" class="toolbarButton">
          <i class="fa fa-arrow-left"></i>
          <span class="toolbartext">Previous Annotation</span>
        </button>
        <button v-if="parentcomp.shortcuts['next']" id="nextButton" v-on:click="parentcomp.sendMessage(parentcomp.shortcuts['next']['function']);" v-bind:class="{ 'inactive' : parentcomp.next_inactive }" class="toolbarButton">
          <i class="fa fa-arrow-right"></i>
          <span class="toolbartext">Next Annotation</span>
        </button>
        <button v-if="parentcomp.shortcuts['shortcut']" v-on:click="parentcomp.sendMessage(parentcomp.shortcuts['shortcut']['function']);"  id="keyboardShortcutsButton" class="toolbarButton">
          <span v-html="parentcomp.buttons.keyboard"></span>
          <span class="toolbartext">Toggle keyboard shortcuts</span>
        </button>
        <button v-if="parentcomp.shortcuts['fullscreen']" v-on:click="parentcomp.sendMessage(parentcomp.shortcuts['fullscreen']['function']);"  id="fullScreenButton" class="toolbarButton">
          <span v-if="!parentcomp.fullscreen" v-html="parentcomp.buttons.expand"></span>
          <span v-else v-html="parentcomp.buttons.compress"></span>
          <span class="toolbartext">Toggle fullscreen</span>
        </button>
      </span>
</template>
<script>

export default {
    name: 'toolbar',
    data: function() {
        return {
            menuclass: 'default_menu',
            parentcomp: ''
        }
    },
  mounted() {
      this.parentcomp.$el.addEventListener("keydown", this.keydownListener);
  },
  created() {
      this.parentcomp = this.$parent;
      var menuext = '_menu'
      if (this.parentcomp.multi) {
          menuext = '_multi' + menuext
          if (!this.parentcomp.settings.toolbarposition) {
              this.menuclass = 'top' +  menuext;
          }
      }
      if (this.parentcomp.settings.toolbarposition) {
          this.menuclass = parentcomp.settings.toolbarposition + menuext
      }
  },
  methods: {
    keydownListener: function(event) {
      var keycombo = event.code.replace('Key', '').toLowerCase();
      var addon = event.altKey ? 'alt+' : event.shiftKey ? 'shift+' : ''
      keycombo = addon + keycombo;
      const keydown = Object.values(this.parentcomp.shortcuts).filter(elem => elem.shortcut.indexOf(keycombo) > -1)
      if (keydown.length > 0){
        var shortcutdict = keydown[0];
        var funct = shortcutdict['function']
        if (shortcutdict['run']){
            if (this.parentcomp.$parent && this.parentcomp.$parent.range){
                 this.parentcomp.$parent[funct['function']](funct['args']);
            }
        } else {
            this.parentcomp.sendMessage(funct)
        }        
      }
    }
  }
}
</script>
