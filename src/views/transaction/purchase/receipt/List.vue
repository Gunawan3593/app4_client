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
          <v-toolbar-title>Purchase Receipt List</v-toolbar-title>
          <v-tooltip left color="blue">
              <template v-slot:activator="{ on, attrs}">
                <v-btn icon color="dee-orange" link to="/purchase/receipt/add" v-bind="attrs" v-on="on"><v-icon>mdi-plus-thick</v-icon></v-btn>
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
          <template v-slot:[`item.cost`]="{ item }">
            {{ item.cost | currency }}
          </template>
          <template v-slot:[`item.price`]="{ item }">
            {{ item.price | currency }}
          </template>
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
                color="green"
                text-color="white"
              >
                Done
              </v-chip>
              <v-chip
                v-if="item.status == 2"
                class="ma-1"
                color="error"
              >
                Void
              </v-chip>
            </div>
          </template>
          <template v-slot:[`item.actions`]="{ item }">
            <div class="d-flex justify-center">
              <v-icon
                v-if="item.status == 0"
                small
                class="mr-2"
                @click="editItem(item)"
              >
                mdi-pencil
              </v-icon>
              <v-icon
                small
                @click="showItem(item)"
              >
                mdi-eye
              </v-icon>
            </div>
          </template>
          </v-data-table>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { mapActions } from 'vuex';
export default {
  data() {
    return {
      search: '',
      page: 1,
      headers: [
        {
          text: 'No.',
          align: 'start',
          sortable: false,
          value: 'no',
        },
        {
          text: 'PO No.',
          align: 'start',
          sortable: false,
          value: 'order.no',
        },
        { text: 'Date.', value: 'transdate' },
        { text: 'Supplier', value: 'supplier.name' },
        { text: 'Status', value: 'status' },
        { text: 'Actions', value: 'actions', sortable: false }
      ],
      rows: []
    }
  },
  async mounted(){
    let data = await this.getPurchaseReceipt();
    if (data.data.success) {
      this.rows = data.data.data;
      this.rows.forEach(row => {
        row.transdate = this.getDateTime(row.transdate);
      });
    }
    let page = this.$route.params.page;
    if(page != undefined){
      this.page = parseInt(page);
    }
  },
  created(){
    
  },
  methods: {
    ...mapActions(['getPurchaseReceipt']),
    editItem(item) {
      this.$router.push({ path: '/purchase/receipt/edit/'+item._id, query: { page: this.page }});
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
      this.$router.push({ path: '/purchase/receipt/show/'+item._id, query: { page: this.page }});
    }
  }
}
</script>

<style>

</style>