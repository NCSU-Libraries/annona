import Vue from 'vue'
import vueCustomElement from 'vue-custom-element'
import searchapi from './components/searchapi.vue'

Vue.use(vueCustomElement);
Vue.customElement('iiif-searchapi', searchapi)