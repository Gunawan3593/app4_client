import Router from 'vue-router';
import vue from 'vue';
import store from '../store';

const routes = [
    {
        path: '*',
        name: 'nofound',
        component: () => import('../views/Page404.vue'),
    },
    {
        path: '/',
        name: 'home',
        component: () => import('../views/Home.vue'),
    },
    {
        path: '/category',
        name: 'category',
        component: () => import('../views/master/Category.vue'),
        meta: {
          requiresAuth: true
        }
    },
    {
        path: '/product',
        name: 'product',
        component: () => import('../views/master/Product.vue'),
        meta: {
          requiresAuth: true
        }
    },
    {
        path: '/supplier',
        name: 'supplier',
        component: () => import('../views/master/Supplier.vue'),
        meta: {
          requiresAuth: true
        }
    },
    {
        path: '/customer',
        name: 'customer',
        component: () => import('../views/master/Customer.vue'),
        meta: {
          requiresAuth: true
        }
    },
    {
        path: '/purchase/order/list',
        name: 'polist',
        component: () => import('../views/transaction/purchase/order/List.vue'),
        meta: {
          requiresAuth: true
        }
    },
    {
        path: '/purchase/order/edit/:id',
        name: 'poedit',
        component: () => import('../views/transaction/purchase/order/Form.vue'),
        meta: {
          requiresAuth: true
        }
    },
    {
      path: '/purchase/order/add',
      name: 'ponew',
      component: () => import('../views/transaction/purchase/order/Form.vue'),
      meta: {
        requiresAuth: true
      }
    },
    {
        path: '/purchase/order/show/:id',
        name: 'poshow',
        component: () => import('../views/transaction/purchase/order/Show.vue'),
        meta: {
          requiresAuth: true
        }
    },
    {
        path: '/purchase/receipt/list',
        name: 'prlist',
        component: () => import('../views/transaction/purchase/receipt/List.vue'),
        meta: {
          requiresAuth: true
        }
    },
    {
        path: '/purchase/receipt/edit/:id',
        name: 'predit',
        component: () => import('../views/transaction/purchase/receipt/Form.vue'),
        meta: {
          requiresAuth: true
        }
    },
    {
      path: '/purchase/receipt/add',
      name: 'prnew',
      component: () => import('../views/transaction/purchase/receipt/Form.vue'),
      meta: {
        requiresAuth: true
      }
    },
    {
        path: '/purchase/receipt/show/:id',
        name: 'prshow',
        component: () => import('../views/transaction/purchase/receipt/Show.vue'),
        meta: {
          requiresAuth: true
        }
    },
    {
        path: '/purchase/invoice/list',
        name: 'pilist',
        component: () => import('../views/transaction/purchase/invoice/List.vue'),
        meta: {
          requiresAuth: true
        }
    },
    {
        path: '/purchase/invoice/show/:id',
        name: 'pishow',
        component: () => import('../views/transaction/purchase/invoice/Show.vue'),
        meta: {
          requiresAuth: true
        }
    },
    {
      path: '/purchase/return/list',
      name: 'rtlist',
      component: () => import('../views/transaction/purchase/return/List.vue'),
      meta: {
        requiresAuth: true
      }
    },
    {
        path: '/purchase/return/edit/:id',
        name: 'rtedit',
        component: () => import('../views/transaction/purchase/return/Form.vue'),
        meta: {
          requiresAuth: true
        }
    },
    {
      path: '/purchase/return/add',
      name: 'rtnew',
      component: () => import('../views/transaction/purchase/return/Form.vue'),
      meta: {
        requiresAuth: true
      }
    },
    {
        path: '/purchase/return/show/:id',
        name: 'rtshow',
        component: () => import('../views/transaction/purchase/return/Show.vue'),
        meta: {
          requiresAuth: true
        }
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('../views/Login.vue'),
        meta: {
            requiresGuest: true
        }
    },
    {
        path: '/register',
        name: 'register',
        component: () => import('../views/Register.vue'),
        meta: {
            requiresGuest: true
        }
    },
    {
        path: '/profile',
        name: 'profile',
        component: () => import('../views/Profile.vue'),
        meta: {
            requiresAuth: true
        }
    }
];

vue.use(Router);

const router = new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
});

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)){
      if(!store.getters.isLoggedIn) {
        //Redirect to the Login Page
        next('/login');
      }else{
        next();
      }
    }else if (to.matched.some(record => record.meta.requiresGuest)) {
      if(store.getters.isLoggedIn) {
        //Redirect to Profile
        next('/profile');
      }else{
        next();
      }
    }else{
      next();
    }
});

export default router;