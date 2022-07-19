<template>
<span id="annotation_controls">
    <button v-bind:aria-label="parent.shortcuts[key]['label']" v-bind:class="{ 'inactive' : (key == 'next' && sendparent.next_inactive) || (key == 'prev' && sendparent.prev_inactive) }" v-for="key in filterButtons" :key="key" :id="key + '_button'" v-on:click="sendparent.sendMessage(parent.shortcuts[key]['function']);" class="annocontrols_button">
      <span v-if="parent.buttons[key]" v-html="parent.buttons[key]"></span>
      <span v-else v-html="parent.shortcuts[key]['icon']"></span>
    </button>
    <button id="transcription_button" class="annocontrols_button" v-if="parent.hastranscription && parent.shortcuts['transcription']" v-on:click="sendparent.sendMessage(parent.shortcuts['transcription']['function']);" aria-label="toggle transcription button">
        <span v-html="parent.buttons.anno"></span>
    </button>
    <span class="lang-icon" id="lang_button" v-if="parent.languages.length > 0">
        <select aria-label="change language dropdown" class="lang_drop" v-on:change="sendparent.sendMessage({'function': 'changeLang', 'args': $event });" v-html="parent.languages.join('')"></select>
    </span>
    <span class="lang-icon" id="lang_button" v-if="parent.basecompontent && parent.basecompontent.langs && parent.basecompontent.langs.length > 1 && parent.shown == 'info'">
        <select aria-label="change language dropdown" class="lang_drop" v-on:change="parent.sendMessage({'function': 'changeLang', 'args': $event });" v-html="parent.basecompontent.langs.join('')"></select>
    </span>
</span>
</template>
<script>

export default {
    props: ['parent'],
    data: function() {
        return {
            toolbarbuttons: ['close', 'hide', 'playpause', 'tags', 'info', 'prev', 'next'],
            sendparent: ''
        }
    },
    created() {
       this.sendparent = this.parent.$parent.multi ? this.parent.$parent : this.parent;
    },
    computed: {
        filterButtons: function() {
            return this.toolbarbuttons.filter(elem => this.parent.shortcuts && this.parent.shortcuts[elem])
        }
    }
}
</script>
