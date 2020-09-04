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
<<<<<<< HEAD
        path: '/purchase/receipt/list',
        name: 'receiptlist',
        component: () => import('../views/transaction/purchase/receipt/List.vue'),
        meta: {
          requiresAuth: true
        }
    },
    {
        path: '/purchase/receipt/edit/:id',
        name: 'receiptedit',
        component: () => import('../views/transaction/purchase/receipt/Form.vue'),
        meta: {
          requiresAuth: true
        }
    },
    {
      path: '/purchase/receipt/add',
      name: 'receiptnew',
      component: () => import('../views/transaction/purchase/receipt/Form.vue'),
      meta: {
        requiresAuth: true
      }
    },
    {
        path: '/purchase/receipt/show/:id',
        name: 'receiptshow',
        component: () => import('../views/transaction/purchase/receipt/Show.vue'),
        meta: {
          requiresAuth: true
        }
    },
    {
=======
>>>>>>> 92ad035e3f4b433a254e6f8ccc33e3729d9305a1
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