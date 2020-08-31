import vue from 'vue';
import vuex from 'vuex';
import auth from '../warehouse/auth';
import base from '../warehouse/base';
import supplier from '../warehouse/supplier';
import customer from '../warehouse/customer';
import category from '../warehouse/category';
import product from '../warehouse/product';

vue.use(vuex);

export default new vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    base,
    auth,
    supplier,
    customer,
    category,
    product
  }
});

