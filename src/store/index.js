import vue from 'vue';
import vuex from 'vuex';
import auth from '../warehouse/auth';
import base from '../warehouse/base';
import supplier from '../warehouse/supplier';
import customer from '../warehouse/customer';
import category from '../warehouse/category';
import product from '../warehouse/product';
import purchaseorder from '../warehouse/purchaseorder';
<<<<<<< HEAD
import purchasereceipt from '../warehouse/purchasereceipt';
=======
>>>>>>> 92ad035e3f4b433a254e6f8ccc33e3729d9305a1

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
<<<<<<< HEAD
    purchaseorder,
    purchasereceipt
=======
    purchaseorder
>>>>>>> 92ad035e3f4b433a254e6f8ccc33e3729d9305a1
  }
});

