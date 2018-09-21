import Vue from 'vue';
import vueCustomElement from 'vue-custom-element'
Vue.use(vueCustomElement);

import iiifAnnotation from './components/iiifannotation.vue';
Vue.customElement('iiif-annotation', iiifAnnotation);
