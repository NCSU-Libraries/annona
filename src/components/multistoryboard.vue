<template>
<div>
<storyboard annotationlist="https://dnoneill.github.io/annotate/annotations/4490-canvas-981394-list.json"></storyboard>
<storyboard annotationlist="https://dnoneill.github.io/annotate/annotations/ba-obj-5005-cons-overlay-list.json"></storyboard>
</div>
</template>
<script>
import storyboard from './storyboard'
export default {
    components: {
        storyboard
    },
    created() {
      console.log(storyboard)
      console.log()
    }
}
</script>
