import Vue from 'vue'
import vueCustomElement from 'vue-custom-element'
import storyboard from './components/storyboard.vue'
Vue.use(vueCustomElement);
Vue.customElement('iiif-storyboard', storyboard)