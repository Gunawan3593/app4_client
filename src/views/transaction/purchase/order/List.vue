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
          <v-toolbar-title>Purchase Order List</v-toolbar-title>
          <v-tooltip left color="blue">
              <template v-slot:activator="{ on, attrs}">
                <v-btn icon color="dee-orange" link to="/purchase/order/add" v-bind="attrs" v-on="on"><v-icon>mdi-plus-thick</v-icon></v-btn>
              </template>
              <span>Add New Transaction</span>
          </v-tooltip>
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
          <template v-slot:[`item.active`]="{ item }">
            <v-icon v-if="item.active" color="blue" dark>mdi-check-circle</v-icon>
            <v-icon v-if="!item.active" color="red" dark>mdi-minus-circle</v-icon>
          </template>
          <template v-slot:[`item.status`]="{ item }">
            <div class="d-flex justify-center">
              <v-chip
                v-if="item.status == 0"
                class="ma-1"
                color="primary"
              >
                Pending
              </v-chip>
              <v-chip
                v-if="item.status == 1"
                class="ma-1"
                color="orange"
                text-color="white"
              >
                Receiving
              </v-chip>
              <v-chip
                v-if="item.status == 2"
                class="ma-1"
                color="purple"
                text-color="white"
              >
                Closed
              </v-chip>
              <v-chip
                v-if="item.status == 3"
                class="ma-1"
                color="error"
              >
                Void
              </v-chip>
              <v-chip
                v-if="item.status == 4"
                class="ma-1"
                color="green"
                text-color="white"
              >
                Done
              </v-chip>
            </div>
          </template>
          <template v-slot:[`item.actions`]="{ item }">
            <div class="d-flex justify-center">
              <v-tooltip left>
                <template v-slot:activator="{ on, attrs}">
                  <v-icon
                    v-if="item.status == 0"
                    small
                    class="mr-2"
                    @click="editItem(item)"
                    v-bind="attrs" 
                    v-on="on"
                  >
                    mdi-pencil
                  </v-icon>
              </template>
                <span>Edit</span>
              </v-tooltip>
              <v-tooltip left>
                <template v-slot:activator="{ on, attrs}">
                  <v-icon
                    v-if="item.status == 2"
                    class="mr-2"
                    small
                    :loading="isLoading"
                    :disabled="isLoading"
                    @click="genInvoice(item)"
                    v-bind="attrs"
                    v-on="on"
                  >
                    mdi-file-move-outline
                  </v-icon>
                </template>
                <span>Generate Invoice</span>
              </v-tooltip>
              <v-tooltip left>
                <template v-slot:activator="{ on, attrs}">
                  <v-icon
                    small
                    @click="showItem(item)"
                    v-bind="attrs" 
                    v-on="on"
                  >
                    mdi-eye
                  </v-icon>
                </template>
                <span>Preview</span>
              </v-tooltip>
            </div>
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
      isLoading: false,
      headers: [
        {
          text: 'No.',
          align: 'start',
          sortable: false,
          value: 'no',
        },
        { text: 'Date.', value: 'transdate' },
        { text: 'Supplier', value: 'supplier.name' },
        { text: 'Status', value: 'status' },
        { text: 'Actions', value: 'actions', sortable: false }
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
    ...mapActions(['getPurchaseOrder','genPurchaseInvoice','getPoItem']),
    editItem(item) {
      this.$router.push({ path: '/purchase/order/edit/'+item._id, query: { page: this.page }});
    },
    async loadData(){
      let data = await this.getPurchaseOrder();
      if (data.data.success) {
        this.rows = data.data.data;
        this.rows.forEach(row => {
          row.transdate = this.getDateTime(row.transdate);
        });
      }
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
      this.$router.push({ path: '/purchase/order/show/'+item._id, query: { page: this.page }});
    },
    async genInvoice(item){
      this.isLoading = true;
      let items = await this.getItem(item._id);
      let data = {
        transdate: this.getDateTime(new Date()),
        supplier: item.supplier._id,
        order: item._id,
        notes: 'Generate Invoice Automatically.',
        user: this.user._id,
        items: items
      }
      this.genPurchaseInvoice(data).then(res => {
        if(res.data.success) {
            this.isLoading = false;
            this.loadData();
        }
      });
    },
    async getItem(id){
        let data = {
          order: id
        }
        let items = await this.getPoItem(data);
        let rspn = items.data.data;
        let response = [];
        rspn.forEach(item => {
          item = {
            name: item.product.name,
            product: item.product._id,
            order_item : item._id,
            order_qty: item.qty,
            rcv_qty: item.rcv_qty,
            qty: item.rcv_qty,
            cost: item.cost
          }
          response.push(item);
        });

        return response;
    },
  }
}
</script>

<style>

</style>