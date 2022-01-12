<template>
  <span id="header_toolbar" v-if="!$parent.settings.hide_toolbar && $parent.shortcuts" v-bind:class="menuclass">
    <button v-bind:class="{ 'inactive' : (key == 'next' && $parent.next_inactive) || (key == 'prev' && $parent.prev_inactive) }" v-for="key in filteredButtons" :key="key" :id="key + 'Button'" v-on:click="$parent.sendMessage($parent.shortcuts[key]['function']);" class="toolbarButton">
      <span v-if="$parent.buttons[key]" v-html="$parent.buttons[key]"></span>
      <span v-else v-html="$parent.shortcuts[key]['icon']"></span>
      <span class="toolbartext">{{$parent.shortcuts[key].label}}</span>
    </button>
  </span>
</template>
<script>

export default {
  name: 'toolbar',
  props: ['parent'],
  data: function() {
    return {
      menuclass: 'default_menu',
      toolbarbuttons: ['autorun', 'reload', 'info', 'tags', 'overlay', 'textoverlay', 'layers', 'zoomin', 'zoomout', 'home', 'prev', 'next', 'keyboard', 'perpage', 'fullscreen'],
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
  computed: {
    filteredButtons: function() {
      return this.toolbarbuttons.filter(elem => this.$parent.shortcuts[elem])
    }
  },
  methods: {
    keydownListener: function(event) {
      var keycombo = event.code.replace('Key', '').replace('Digit', '').toLowerCase();
      var addon = event.altKey ? 'alt+' : event.shiftKey ? 'shift+' : event.metaKey ? 'cmd+' : ''
      keycombo = addon + keycombo;
      var keycombo2 = addon + event.key;
      keycombo = keycombo.replace("period", ".").replace("comma", ",")
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
