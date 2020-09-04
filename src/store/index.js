import vue from 'vue';
import vuex from 'vuex';
import auth from '../warehouse/auth';
import base from '../warehouse/base';
import supplier from '../warehouse/supplier';
import customer from '../warehouse/customer';
import category from '../warehouse/category';
import product from '../warehouse/product';
import purchaseorder from '../warehouse/purchaseorder';
import purchasereceipt from '../warehouse/purchasereceipt';

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
    product,
    purchaseorder,
    purchasereceipt
  }
});

