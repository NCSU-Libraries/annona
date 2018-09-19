import Vue from 'vue';
import wrap from '@vue/web-component-wrapper';
import iiifannotation from './components/iiifannotation.vue';
const CustomElement = wrap(Vue, iiifannotation);
window.customElements.define('iiif-annotation', CustomElement);
