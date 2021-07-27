<template>
<span id="annotation_controls">
    <button class="annocontrols_button" id="close_button" v-if="parent.shortcuts['close']" v-on:click="parent.close();" aria-label="close content box button">
        <i class="fas fa-times"></i>
    </button>
    <button v-if="parent.shortcuts['hide']" id="hide_button" class="annocontrols_button"  v-on:click="parent.sendMessage(parent.shortcuts['hide']['function']);" aria-label="collapse content box button">
        <span v-html="parent.buttons.hide"></span>
    </button>
    <button id="playpause_button" class="annocontrols_button" v-on:click="parent.sendMessage(parent.shortcuts['playpause']['function']);" v-if="parent.settings.tts && parent.shortcuts['playpause']" aria-label="play/pause text to speech button">
        <span v-html="parent.buttons.playpause"></span>
    </button>
    <button id="tags_button" v-if="parent.shortcuts['tags']" class="annocontrols_button" v-on:click="parent.sendMessage(parent.shortcuts['tags']['function']);" aria-label="toggle tags button">
        <span v-html="parent.buttons.tags"></span>
    </button>
    <button id="info_button" v-if="parent.shortcuts['info']" class="annocontrols_button" v-on:click="parent.sendMessage(parent.shortcuts['info']['function']);" aria-label="toggle info button">
        <span v-html="parent.buttons.info"></span>
    </button>
    <button id="transcription_button" class="annocontrols_button" v-if="parent.hastranscription && parent.shortcuts['transcription']" v-on:click="parent.sendMessage(parent.shortcuts['transcription']['function']);" aria-label="toggle transcription button">
        <span v-html="parent.buttons.anno"></span>
    </button>
    <button v-if="parent.shortcuts['prev']" id="previousButton" v-on:click="parent.sendMessage(parent.shortcuts['prev']['function']);" v-bind:class="{ 'inactive' : parent.prev_inactive }" class="annocontrols_button" aria-label="previous annotation button">
        <i class="fa fa-arrow-left"></i>
        <span class="toolbartext">Previous Annotation</span>
    </button>
    <button v-if="parent.shortcuts['next']" id="nextButton" v-on:click="parent.sendMessage(parent.shortcuts['next']['function']);" v-bind:class="{ 'inactive' : parent.next_inactive }" class="annocontrols_button" aria-label="next annotation button">
        <i class="fa fa-arrow-right"></i>
        <span class="toolbartext">Next Annotation</span>
    </button>
    <span class="lang-icon" id="lang_button" v-if="parent.languages.length > 0">
        <select aria-label="change language dropdown" class="lang_drop" v-on:change="parent.sendMessage({'function': 'changeLang', 'args': $event });" v-html="parent.languages.join('')"></select>
    </span>
</span>
</template>
<script>

export default {
    props: ['parent']
}
</script>
