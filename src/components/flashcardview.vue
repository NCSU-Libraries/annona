<template>
<div>
    <div>You have answered <b>{{correct.length}}</b> questions out of <b>{{this.compdata.annotation_items.length}}</b> correctly.</div>
    <div v-if="currentquestion" class="card-container" v-on:click="image = !image">
    <div class="answer" v-if="!image">
        <p>
        {{this.currentquestion.content.text}}
        </p>
        <div>
            <button v-on:click="nextItem(true)" class="next correct"><i class="fas fa-check"></i></button>
            <button v-on:click="nextItem(false)" class="next incorrect"><i class="fas fa-times"></i></button>
        </div>
    </div>
    <div v-else v-for="(image, index) in this.currentquestion.image" :key="index" style="height: 100%">
        <div class="image" v-html="image" style="height: 100%" ></div>
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
        image: true
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
        console.log(this.image)
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
.image > *{
    height: 100%;
}
.card-container  {
    height: 400px;
    outline: 2px solid black;
    display: flex;
    align-items: center;
    justify-content: center;
}

.answer > p {
    font-size: 2em;
    margin: 0px;
}
.next {
    background: none;
	border: none;
	padding: 0;
	font: inherit;
	cursor: pointer;
	outline: inherit;
    font-size: 2em;
    margin: 10px;
    width: 50px;
    height: 50px;
}

.incorrect{
    background: red;
    color: white;
}
.correct {
    background: green;
    color: white;
}
</style>