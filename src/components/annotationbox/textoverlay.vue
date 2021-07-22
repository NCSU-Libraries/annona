<template>
<div id="textoverlay" class="content">
    <b>Text Overlay</b>
    <input v-bind:key="parent.booleanitems.istextoverlaytoggled" v-bind:id="parent.seadragonid + 'toggletextoverly'" class="toggletextoverlay" type="checkbox" v-bind:checked="parent.booleanitems.istextoverlaytoggled" v-on:change="parent.sendMessage({'function': 'createOverlay', 'args': 'textoverlay' })">
    <label v-bind:for="parent.seadragonid + 'toggletextoverly'" class="toggletextoverlaylabel">Toggle text overlay</label>
    <p>
    <label for="backgroundcolor">Background Color: </label>
    <input type="color" v-model="textoverlay.background" id="backgroundcolor">
    </p>
    <p>
    <label for="fontcolor">Font Color: </label>
    <input type="color" v-model="textoverlay.fontcolor" id="fontcolor">
    </p>
    <p class="slidecontainer">
    <label for="textoverlayopacity">Opacity:</label>
    <input id="textoverlayopacity" v-model="textoverlay.opacity" type="range" min="0" max="100" class="slider">
    </p>
</div>
</template>
<script>
export default {
    props: ['parent', 'textoverlay']
}
</script>
