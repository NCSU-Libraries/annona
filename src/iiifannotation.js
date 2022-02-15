import '@ungap/custom-elements'
import Vue from 'vue'
import vueCustomElement from 'vue-custom-element'
import iiifannotation from './components/iiifannotation.vue'

Vue.use(vueCustomElement);
Vue.customElement('iiif-annotation', iiifannotation)