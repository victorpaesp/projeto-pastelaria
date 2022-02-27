import Vue from 'vue'
import App from './App.vue'
import VueKinesis from "vue-kinesis";
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

Vue.use(VueSweetalert2);
Vue.use(VueKinesis);

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
