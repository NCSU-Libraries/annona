<template>
  <span id="header_toolbar" v-if="!$parent.settings.hide_toolbar" v-bind:class="menuclass">
    <button v-if="$parent.shortcuts['autorun']" id="autoRunButton" v-on:click="$parent.sendMessage($parent.shortcuts['autorun']['function']);" class="toolbarButton">
      <span v-html="$parent.buttons.autorun"></span>
      <span class="toolbartext">Start/Stop Autorun</span>
    </button>
    <button v-on:click="$parent.sendMessage($parent.shortcuts['info']['function']);" v-if="$parent.shortcuts['info']"  id="infoButton" class="toolbarButton">
      <span v-html="$parent.buttons.info"></span>
      <span class="toolbartext">View source image information</span>
    </button>
    <button v-on:click="$parent.sendMessage($parent.shortcuts['tags']['function']);" id="tagsButton" v-if="$parent.shortcuts['tags']" class="toolbarButton">
      <span v-html="$parent.buttons.tags"></span>
      <span class="toolbartext">Toggle Tags</span>
    </button>
    <button v-if="$parent.shortcuts['overlay']" id="overlayButton" v-on:click="$parent.sendMessage($parent.shortcuts['overlay']['function']);" class="toolbarButton">
      <span v-html="$parent.buttons.overlay"></span>
      <span class="toolbartext">Toggle Overlays</span>
    </button>
    <button v-if="$parent.shortcuts['textoverlay']" id="overlayButton" v-on:click="$parent.sendMessage($parent.shortcuts['textoverlay']['function']);" class="toolbarButton">
      <span v-html="$parent.buttons.textoverlay"></span>
      <span class="toolbartext">Toggle OCR Overlays</span>
    </button>
    <button v-if="$parent.shortcuts['layers']" id="layerButton" v-on:click="$parent.sendMessage($parent.shortcuts['layers']['function']);" class="toolbarButton">
      <span v-html="$parent.buttons.layer"></span>
      <span class="toolbartext">View layers</span>
    </button>
    <button v-if="$parent.shortcuts['zoomin']" v-on:click="$parent.sendMessage($parent.shortcuts['zoomin']['function']);" id="zoomInButton" class="toolbarButton">
      <i class="fas fa-search-plus"></i>
      <span class="toolbartext">Zoom in</span>
    </button>
    <button v-if="$parent.shortcuts['zoomout']" v-on:click="$parent.sendMessage($parent.shortcuts['zoomout']['function']);" id="zoomOutButton" class="toolbarButton">
      <i class="fas fa-search-minus"></i>
      <span class="toolbartext">Zoom out</span>
    </button>
    <button v-if="$parent.shortcuts['home']" v-on:click="$parent.sendMessage($parent.shortcuts['home']['function'])" id="homeZoomButton" class="toolbarButton">
      <i class="fas fa-home"></i>
      <span class="toolbartext">View full image</span>
    </button>
    <button v-if="$parent.shortcuts['prev']" id="previousButton" v-on:click="$parent.sendMessage($parent.shortcuts['prev']['function']);" v-bind:class="{ 'inactive' : $parent.prev_inactive }" class="toolbarButton">
      <i class="fa fa-arrow-left"></i>
      <span class="toolbartext">Previous Annotation</span>
    </button>
    <button v-if="$parent.shortcuts['next']" id="nextButton" v-on:click="$parent.sendMessage($parent.shortcuts['next']['function']);" v-bind:class="{ 'inactive' : $parent.next_inactive }" class="toolbarButton">
      <i class="fa fa-arrow-right"></i>
      <span class="toolbartext">Next Annotation</span>
    </button>
    <button v-if="$parent.shortcuts['shortcut']" v-on:click="$parent.sendMessage($parent.shortcuts['shortcut']['function']);"  id="keyboardShortcutsButton" class="toolbarButton">
      <span v-html="$parent.buttons.keyboard"></span>
      <span class="toolbartext">Toggle keyboard shortcuts</span>
    </button>
    <button v-if="$parent.shortcuts['fullscreen']" v-on:click="$parent.sendMessage($parent.shortcuts['fullscreen']['function']);"  id="fullScreenButton" class="toolbarButton">
      <span v-if="!$parent.fullscreen" v-html="$parent.buttons.expand"></span>
      <span v-else v-html="$parent.buttons.compress"></span>
      <span class="toolbartext">Toggle fullscreen</span>
    </button>
  </span>
</template>
<script>

export default {
  name: 'toolbar',
  data: function() {
    return {
      menuclass: 'default_menu'
    }
  },
  mounted() {
    this.$parent.$el.addEventListener("keydown", this.keydownListener);
  },
  created() {
    var menuext = '_menu'
    if (this.$parent.multi) {
      menuext = '_multi' + menuext
      if (!this.$parent.settings.toolbarposition) {
        this.menuclass = 'top' +  menuext;
      }
    }
    if (this.$parent.settings.toolbarposition) {
      this.menuclass = this.$parent.settings.toolbarposition + menuext;
    }
  },
  methods: {
    keydownListener: function(event) {
      var keycombo = event.code.replace('Key', '').replace('Digit', '').toLowerCase();
      var addon = event.altKey ? 'alt+' : event.shiftKey ? 'shift+' : event.metaKey ? 'cmd+' : ''
      keycombo = addon + keycombo;
      var keycombo2 = addon + event.key;
      const keydown = Object.values(this.$parent.shortcuts).filter(elem => elem.shortcut.indexOf(keycombo) > -1 || elem.shortcut.indexOf(keycombo2) > -1)
      if (keydown.length > 0){
        var shortcutdict = keydown[0];
        var funct = shortcutdict['function']
        if (shortcutdict['run']){
          if (this.$parent.$parent && this.$parent.$parent.range){
            this.$parent.$parent[funct['function']](funct['args']);
          }
        } else {
          this.$parent.sendMessage(funct)
        }        
      }
    }
  }
}
</script>
