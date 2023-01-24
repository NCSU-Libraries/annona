<template>
<div id="textoverlay" class="content">
    <b>Text Overlay</b>
    <input v-bind:key="parent.booleanitems.istextoverlaytoggled" v-bind:id="parent.seadragonid + 'toggletextoverly'" class="toggletextoverlay" type="checkbox" v-bind:checked="parent.booleanitems.istextoverlaytoggled" v-on:change="sendparent.sendMessage({'function': 'createOverlay', 'args': 'textoverlay' })">
    <label v-bind:for="parent.seadragonid + 'toggletextoverly'" class="toggletextoverlaylabel">Toggle text overlay</label>
    <p>
    <label for="backgroundcolor">Background Color: </label>
    <input type="color" v-model="sendparent.textoverlay.background" id="backgroundcolor">
    </p>
    <p>
    <label for="fontcolor">Font Color: </label>
    <input type="color" v-model="sendparent.textoverlay.fontcolor" id="fontcolor">
    </p>
    <p class="slidecontainer">
    <label for="textoverlayopacity">Opacity:</label>
    <input id="textoverlayopacity" v-model="sendparent.textoverlay.opacity" type="range" min="0" max="100" class="slider">
    </p>
</div>
</template>
<script>
export default {
    props: ['parent'],
    name: 'textoverlay',
    data: function() {
        return {
            sendparent: ''
        }
    },
    watch: {
        'sendparent.textoverlay': {
            deep: true,
            handler: function(){
                const fields = ['background', 'fontcolor', 'opacity']
                for (var fi=0; fi<fields.length; fi++){
                    window.annonasettings[`textoverlay${fields[fi]}`] = this.sendparent.textoverlay[fields[fi]]
                }
            }
        }
    },
    created() {
       this.sendparent = this.parent.$parent && this.parent.$parent.multi ? this.parent.$parent : this.parent;
    }
}
</script>
