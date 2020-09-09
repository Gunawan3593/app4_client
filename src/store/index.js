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
import purchaseinvoice from '../warehouse/purchaseinvoice';
import purchasereturn from '../warehouse/purchasereturn';
import salesorder from '../warehouse/salesorder';
import salesdelivery from '../warehouse/salesdelivery';
import inventory from '../warehouse/inventory';
import salesinvoice from '../warehouse/salesinvoice';
import salesreturn from '../warehouse/salesreturn';

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
    purchasereceipt,
    purchaseinvoice,
    purchasereturn,
    salesorder,
    salesdelivery,
    inventory,
    salesinvoice,
    salesreturn
  }
});

