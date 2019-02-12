import Vue from 'vue'
import app from './iiiflibrary.vue'

if (process.env.NODE_ENV === 'development') {
  Vue.config.productionTip = false

  new Vue({
    render: h => h(app)
  }).$mount('#app')
}
import vueCustomElement from 'vue-custom-element'
import 'document-register-element/build/document-register-element';
import iiifAnnotation from './components/iiifannotation.vue';
import storyboard from './components/storyboard.vue'

Vue.use(vueCustomElement);
Vue.customElement('iiif-annotation', iiifAnnotation);
Vue.customElement('iiif-storyboard', storyboard)
