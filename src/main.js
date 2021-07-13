import Vue from 'vue';
import Buefy from 'buefy';
import VueToast from 'vue-toast-notification';
import Vuelidate from 'vuelidate';

import App from './App.vue';
import router from './router';
import store from './store';

import 'buefy/dist/buefy.css';
import 'vue-toast-notification/dist/theme-sugar.css';

Vue.use(Buefy);
Vue.use(VueToast, { position: 'top-right', duration: 3000 });
Vue.use(Vuelidate);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
