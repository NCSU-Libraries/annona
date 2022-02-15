import '@ungap/custom-elements'
import Vue from 'vue'
import vueCustomElement from 'vue-custom-element'
import multistoryboard from './components/multistoryboard.vue'

Vue.use(vueCustomElement);
Vue.customElement('iiif-multistoryboard', multistoryboard)