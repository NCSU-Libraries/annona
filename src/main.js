import '@ungap/custom-elements'

import Vue from 'vue'
import app from './iiiflibrary.vue'

if (process.env.NODE_ENV === 'development') {
  Vue.config.productionTip = false

  new Vue({
    render: h => h(app)
  }).$mount('#app')
}

import vueCustomElement from 'vue-custom-element'
import iiifAnnotation from './components/iiifannotation.vue';
import storyboard2 from './components/storyboard2.vue'
import multistoryboard from './components/multistoryboard.vue'
import rangestoryboard from './components/rangestoryboard.vue'
import searchapi from './components/searchapi.vue'

Vue.use(vueCustomElement);
Vue.customElement('iiif-annotation', iiifAnnotation);
Vue.customElement('iiif-storyboard', storyboard2)
Vue.customElement('iiif-multistoryboard', multistoryboard)
Vue.customElement('iiif-rangestoryboard', rangestoryboard)
Vue.customElement('iiif-searchapi', searchapi)
