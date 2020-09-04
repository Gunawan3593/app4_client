<template>
  <v-app id="inspire">
    <v-navigation-drawer
      v-model="drawer"
      :dark="true"
      src="https://demos.creative-tim.com/material-dashboard/assets/img/sidebar-1.jpg"
      app
    >
      <template v-slot:img="props">
        <v-img gradient="to bottom, rgba(0, 0, 0, .8), rgba(0, 0, 0, .8)" v-bind="props"></v-img>
      </template>
      <v-list nav dense>
        <v-list-item link to="/login" v-if="!isLoggedIn">
          <v-list-item-action>
            <v-icon>mdi-login</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Login</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link to="/register" v-if="!isLoggedIn">
          <v-list-item-action>
            <v-icon>mdi-account-plus</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Register</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link to="/">
          <v-list-item-action>
            <v-icon>mdi-home</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Home</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-group
          prepend-icon="mdi-folder-open"
          no-action
          color="white"
        >
        <template v-slot:activator>
          <v-list-item-title>Master</v-list-item-title>
        </template>
          <v-list-item link to="/category">
            <v-list-item-action>
              <v-icon>mdi-dresser</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>Category</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item link to="/product">
            <v-list-item-action>
              <v-icon>mdi-package</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>Product</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item link to="/supplier">
            <v-list-item-action>
              <v-icon>mdi-car-pickup</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>Supplier</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item link to="/customer">
            <v-list-item-action>
              <v-icon>mdi-account-group</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>Customer</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-group>
        <v-list-group
          prepend-icon="mdi-cart-arrow-down"
          no-action
          color="white"
        >
        <template v-slot:activator>
          <v-list-item-title>Purchasing</v-list-item-title>
        </template>
          <v-list-item link to="/purchase/order/list">
            <v-list-item-action>
              <v-icon>mdi-cart</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>Purchase Order</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item link to="/purchase/receipt/list">
            <v-list-item-action>
              <v-icon>mdi-forklift</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>Purchase Receipt</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item link to="purchase/invoice/list">
            <v-list-item-action>
              <v-icon>mdi-notebook</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>Purchase Invoice</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-group>
        <v-list-group
          prepend-icon="mdi-cart-arrow-up"
          no-action
          color="white"
        >
        <template v-slot:activator>
          <v-list-item-title>Sales</v-list-item-title>
        </template>
          <v-list-item link to="/salesorder">
            <v-list-item-action>
              <v-icon>mdi-shopping</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>Sales Order</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item link to="/salesdelivery">
            <v-list-item-action>
              <v-icon>mdi-truck-fast</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>Sales Delivery</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item link to="/salesinvoice">
            <v-list-item-action>
              <v-icon>mdi-notebook</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>Sales Invoice</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-group>
        <v-list-group
          prepend-icon="mdi-cog"
          no-action
          color="white"
        >
        <template v-slot:activator>
          <v-list-item-title>Settings</v-list-item-title>
        </template>
          <v-list-item link to="/profile" v-if="isLoggedIn">
            <v-list-item-action>
              <v-icon>mdi-account-star</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>Profile</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item link @click.prevent="logoutUser" v-if="isLoggedIn">
            <v-list-item-action>
              <v-icon>mdi-logout</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>Logout</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-group>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar
      app
      color="indigo"
      dark
    >
    <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>APP 4 DEMO</v-toolbar-title>
      <v-spacer></v-spacer>
      <div v-if="user != undefined">
        <div v-if="user.name !== undefined">
          Hello, {{ user.name }}
        </div>
      </div>
    </v-app-bar>
    <v-main>
      <v-container>
          <router-view :key="$route.fullPath"></router-view>
          <Alert :options="alert" />
      </v-container>
    </v-main>
    <v-footer
      color="indigo"
      app
    >
      <span class="white--text">&copy; {{ new Date().getFullYear() }} by Adi Gunawan</span>
    </v-footer>
  </v-app>
</template>

<script>
import Alert from '@/components/Alert.vue';
import { mapGetters, mapActions } from 'vuex';
export default {
  name: 'App',
  props: {

  },
  computed:{
    ...mapGetters(['user','isLoggedIn','alert'])
  },
  components: {
    Alert
  },
  created() {
    this.getProfile();
  },
  methods: {
      ...mapActions(['logout','getProfile']),
      logoutUser() {
          this.logout();
      }
  },
  data: () => ({
    drawer: null,
    users: {

    }
  }),
};
</script>

<style scoped>
</style>
