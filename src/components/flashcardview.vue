<template>
<div class="flashcards">
    <div>You have answered <b>{{correct.length}}</b> questions out of <b>{{compdata.annotation_items.length}}</b> correctly.</div>
    <div v-if="currentquestion" class="card-container" v-on:click="image = !image">
    <div class="answer" v-if="!image">
        <p v-html="currentquestion.rendered_content"></p>
        <div>
            <button v-on:click="nextItem(true)" class="next correct"><i class="fas fa-check"></i></button>
            <button v-on:click="nextItem(false)" class="next incorrect"><i class="fas fa-times"></i></button>
        </div>
    </div>
    <div v-else-if="!compdata.settings.fullimage" v-for="(image, index) in this.currentquestion.image" :key="index" v-bind:style="'max-width:' + 99/currentquestion.image.length + '%'" style="height:auto;">
        <div class="image" v-html="image" style="height: 100%" ></div>
    </div>
    <div v-else-if="compdata.settings.fullimage">
        <div class="image" v-html="currentquestion.image[0]" style="height: 100%" ></div>
    </div>
    </div>
    <div v-else class="card-container">
        <p>You have answered all the flashcards correctly!</p>
        <button v-on:click="startOver()">Start Over</button>
    </div>

</div>
</template>
<script>
export default {
  name: 'flashcardview',
  props: {
    'compdata': {type: Object, required: false}
  },
  data: function() {
    return {
        correct: [],
        incorrect: [],
        image: true,
        currentquestion: '',
        later_load: {}
    }
  },
  watch: {
    currentquestion: function() {
        var vue = this;
        setTimeout(function(){
        var canvases = document.getElementsByTagName('canvas');
        for (var i=0; i<canvases.length; i++){
            var canvasdata = vue.compdata.later_load[canvases[i].id];
            if (vue.compdata.settings.fullimage){
              var ids = Object.keys(vue.compdata.later_load).filter(elem => elem.split('_img')[0] == canvases[i].id.split('_img')[0]);
              var paths = ids.map(elem => vue.compdata.later_load[elem][3]);
              vue.$parent.writecanvasfullimage(canvasdata[0], canvases[i].id, paths)
            } else {
              vue.$parent.writecanvas(canvasdata[0], canvasdata[1], canvasdata[2], canvasdata[3], canvasdata[4], canvasdata[5]);
            }
        }
        }, 1);
    }
  },
  created() {
    this.incorrect = JSON.parse(JSON.stringify(this.compdata.annotation_items));
    this.currentquestion = this.incorrect[0];
  },
  methods: {
    startOver: function() {
        this.incorrect = JSON.parse(JSON.stringify(this.compdata.annotation_items));
        this.currentquestion = this.incorrect[0];
        this.correct = [];
        this.image =true;
    },
    nextItem: function(iscorrect=false){
        this.incorrect.splice(0, 1)
        if (iscorrect) {
            this.correct.push(this.currentquestion)
        } else {
            this.incorrect.push(this.currentquestion)
        }
        this.currentquestion = this.incorrect[0]
    }
  }
}
</script>
<style>
canvas {
  width: auto;
  max-height: 400px;
}
</style>