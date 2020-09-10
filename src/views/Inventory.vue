<template>
  <v-row
    align="center"
    justify="center"
  >
    <v-col
      cols="12"
      sm="8"
      md="12"
    >
      <v-card class="elevation-12">
        <v-toolbar
          color="primary"
          dark
          flat
        >
          <v-toolbar-title>Inventory List</v-toolbar-title>
          <v-spacer></v-spacer>
            <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              label="Search"
              single-line
              hide-details
            ></v-text-field>
        </v-toolbar>
        <v-card-text>
          <v-data-table
              :headers="headers"
              :items="rows"
              :search="search"
              :page.sync = "page"
          >
          <template v-slot:[`item.cost`]="{ item }">
            {{ item.cost | currency }}
          </template>
          <template v-slot:[`item.price`]="{ item }">
            {{ item.price | currency }}
          </template>
          <template v-slot:[`item.stock`]="{ item }">
            {{ item.stock }} 
            <v-tooltip left color="error">
              <template v-slot:activator="{ on, attrs}">
                <v-icon color="error" v-if="item.stock < item.order" 
                  v-bind="attrs" 
                  v-on="on"
                >mdi-alert-circle</v-icon>
              </template>
              <span>Warning : Stock is not enough !<br> If you still do the delivery order, <br> Stock will have minus value</span>
            </v-tooltip>
          </template>
          </v-data-table>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
export default {
  data() {
    return {
      search: '',
      page: 1,
      headers: [
        {
          text: 'Name',
          align: 'start',
          sortable: false,
          value: 'name',
        },
        { text: 'Category', value: 'category.name' },
        { text: 'Cost', value: 'cost' },
        { text: 'Price', value: 'price' },
        { text: 'Stock', value: 'stock' },
        { text: 'Order', value: 'order' }
      ],
      rows: []
    }
  },
  computed: {
    ...mapGetters(['user']),
  },
  async mounted(){
    await this.loadData();
    let page = this.$route.params.page;
    if(page != undefined){
      this.page = parseInt(page);
    }
  },
  created(){
    
  },
  methods: {
    ...mapActions(['getProduct','getInventory','getSoDelivByProduct']),
    editItem(item) {
      this.$router.push({ path: '/purchase/invoice/edit/'+item._id, query: { page: this.page }});
    },
    async loadData(){
      let data = await this.getProduct();
      let products = [];
      let invetories = [];
      let orders = [];
      if (data.data.success) {
        products = data.data.data;
      }
      data = await this.getInventory();
      if (data.data.success) {
        invetories = data.data.data;
      }
      data = await this.getSoDelivByProduct();
      if (data.data.success) {
        orders = data.data.data;
      }
      products.forEach(product => {
        var inv = invetories.filter(inventory => inventory.product == product._id);
        var invQty = 0;
        if(inv[0] != undefined) invQty = inv[0].qty;
        var order = orders.filter(order => order._id == product._id);
        var orderQty = 0;
        if(order[0] != undefined) orderQty = order[0].qtyDelivable;
        var row = {
          name: product.name,
          category: product.category,
          cost: product.cost,
          price: product.price,
          stock: invQty, 
          order: orderQty 
        };
        this.rows.push(row);
      });
    },
    getDateTime(date){
      const dates = new Date(date);
      const hours = dates.getHours().toString();
      const minutes = dates.getMinutes().toString();
      const seconds = dates.getSeconds().toString();
      let time = ('00'+hours).substring(hours.length) + ':' + ('00'+minutes).substring(minutes.length) + ':' + ('00'+seconds).substring(seconds.length);
      return dates.toISOString().slice(0,10) + ' ' + time;
    },
    showItem(item){
      this.$router.push({ path: '/purchase/invoice/show/'+item._id, query: { page: this.page }});
    }
  }
}
</script>

<style>

</style>