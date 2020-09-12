import Vue from 'vue'
import App from './App.vue'
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';
import axios from 'axios';
import VueCurrencyFilter from 'vue-currency-filter';
import VCurrencyField from 'v-currency-field';
import { VTextField } from 'vuetify/lib';  //Globally import VTextField

Vue.use(require('vue-moment'));

Vue.component('v-text-field', VTextField);

Vue.config.productionTip = false

// Setting up default vue's http for API Call
Vue.$http = axios;
// Load the token from the localStorage
const token = localStorage.getItem("token");
// Is there is any token then we will simply append default axios authorization headers
if(token) {
    Vue.$http.defaults.headers.common['Authorization'] = token;
}

Vue.use(VueCurrencyFilter,
{
    symbol : 'Rp',
    thousandsSeparator: '.',
    fractionCount: 0,
    fractionSeparator: ',',
    symbolPosition: 'front',
    symbolSpacing: true
});

Vue.use(VCurrencyField, { 
	locale: 'pt-BR',
	decimalLength: 2,
	autoDecimalMode: true,
	min: null,
	max: null,
	defaultValue: 0
})

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
