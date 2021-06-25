import "@babel/polyfill";
import 'document-register-element/build/document-register-element';

import Vue from 'vue'
import vueCustomElement from 'vue-custom-element'
import storyboard from './components/storyboard.vue'
Vue.use(vueCustomElement);
Vue.customElement('iiif-storyboard', storyboard)