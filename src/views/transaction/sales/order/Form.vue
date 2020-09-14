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
          <v-toolbar-title>Add Sales Order</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-title>
              <v-tooltip left>
              <template v-slot:activator="{ on, attrs}">
                <v-btn icon color="dee-orange" @click="Back()" v-bind="attrs" v-on="on"><v-icon>mdi-arrow-left-bold</v-icon></v-btn>
              </template>
              <span>Back to List</span>
              </v-tooltip>
              <v-tooltip left>
              <template v-slot:activator="{ on, attrs}">
                <v-btn icon color="dee-orange" link to="/sales/order/add"  v-bind="attrs" v-on="on"><v-icon>mdi-restore</v-icon></v-btn>
              </template>
              <span>New Data</span>
              </v-tooltip>
              <v-tooltip left>
              <template v-slot:activator="{ on, attrs}">
                <v-btn icon color="dee-orange" :loading="isLoading" :disabled="isLoading"  @click="submit" v-bind="attrs" v-on="on"><v-icon>mdi-content-save-move-outline</v-icon></v-btn>
              </template>
              <span>Save Data</span>
              </v-tooltip>
          </v-toolbar-title>
        </v-toolbar>
        <v-card-text>
          <v-form>
            <v-row>
              <v-col cols="12" sm="12" md="4">
                  <v-text-field
                    label="No."
                    prepend-icon="mdi-numeric"
                    type="text"
                    v-model="fields.no"
                    readonly
                  ></v-text-field>
              </v-col>
              <v-col cols="12" sm="12" md="4">
                <v-menu
                  v-model="menu"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  transition="scale-transition"
                  offset-y
                  min-width="290px"
                >
                  <template v-slot:activator="{ on }">
                    <v-text-field
                      v-model="date"
                      label="Date"
                      prepend-icon="mdi-calendar"
                      readonly
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker v-model="date" @input="menu = false"></v-date-picker>
                </v-menu>
              </v-col>
              <v-col cols="12" sm="12" md="4">
                <v-autocomplete
                    v-model="fields.customer"
                    :error-messages="customerErrors"
                    required
                    :items="customerItems"
                    hide-no-data
                    hide-selected
                    item-text="Description"
                    item-value="_id"
                    label="Customers"
                    placeholder="Start typing to Search"
                    prepend-icon="mdi-dresser"
                    :return-object="false"
                    @input="$v.fields.customer.$touch()"
                    @blur="$v.fields.customer.$touch()"
                ></v-autocomplete>
              </v-col>
            </v-row>
          </v-form>
          <v-row>
            <v-col cols="12" sm="6" md="4">
              <v-autocomplete
                  v-model="productSelected"
                  :items="productItems"
                  hide-no-data
                  hide-selected
                  item-text="Description"
                  label="Product"
                  placeholder="Select Product"
                  prepend-icon="mdi-database-search"
                  return-object
                  @change="addItem()"
                ></v-autocomplete>
            </v-col>
            <v-col cols="12" sm="6" md="8">
              <p class="display-2 text-right" style="padding-right:10px;">Total : {{ getSubtotal | currency }}</p>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" sm="12" md="12">
              <v-simple-table dense>
                <template fixed-header v-slot:default>
                  <thead>
                    <tr>
                      <th class="text-center">Name</th>
                      <th class="text-center" width="100px">Stock</th>
                      <th class="text-center" width="100px">Qty</th>
                      <th class="text-center" width="200px;">Price</th>
                      <th class="text-center" width="200px;">Total</th>
                      <th class="text-center" width="50px;">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="item in fields.items" :key="item.product">
                        <td>{{ item.name }}</td>
                        <td>{{ item.stock }}</td>
                        <td><v-currency-field :decimal-length="0" place-holder="Qty" v-model="item.qty" /></td>
                        <td class="text-right">{{ item.price | currency }}</td>
                        <td class="text-right">{{ item.qty * item.price | currency }}</td>
                        <td><v-icon
                              small
                              @click="deleteItem(item)"
                            >
                              mdi-delete
                            </v-icon>
                        </td>
                    </tr>
                  </tbody>
                </template>
              </v-simple-table>
            </v-col>
          </v-row>
          <v-row>
              <v-col cols="12" md="6">
                <v-textarea
                  prepend-icon="mdi-note-text-outline"
                  label="Notes"
                  v-model="fields.notes"
                  value="fields.notes"
                  rows="3"
                ></v-textarea>
              </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { validationMixin } from 'vuelidate'
import { required } from 'vuelidate/lib/validators'
import { mapActions, mapGetters } from 'vuex';
export default {
  mixins: [validationMixin],
  validations: {
    fields: {
      customer: { required }
    }
  },
  computed: {
    ...mapGetters(['user','salesOrderStatus']),
    customerErrors () {
      const errors = []
      if (!this.$v.fields.customer.$dirty) return errors
      !this.$v.fields.customer.required && errors.push('Customer is required.')
      return errors
    },
    customerItems () {
      return this.customers.map(customer => {
        const Description = customer.name
        return Object.assign({}, customer, { Description })
      })
    },
    productItems () {
      return this.products.map(product => {
        const Description = product.name
        return Object.assign({}, product, { Description })
      })
    },
    getSubtotal() {
      let items = this.fields.items;
      if (items.length == 0) return;
      let total = 0;
      for(var i=0;i<items.length;i++){
        total += items[i].qty * items[i].price;
      }
      return total;
    }
  },
  data() {
    return {
      fields : {
        id: false,
        no: '',
        transdate: '',
        customer: '',
        notes: '',
        user: '',
        items : []
      },
      date : '',
      customers: [],
      products: [],
      isLoading: false,
      menu: false,
      productSelected: '',
      page: ''
    }
  },
  async mounted(){
    let res = await this.getCustomer();
    let data = res.data.data;
    if(data) {
      this.customers = data;
    }
    res = await this.getProduct();
    data = res.data.data;
    if(data) {
      this.products = data;
    }
    let id = this.$route.params.id;
    if (id != undefined) {
      this.loadData(id);
    }else{
      this.reset();
    }
  },
  created(){
    let page = this.$route.query.page;
    this.page = page;
  },
  methods: {
    ...mapActions(['getSoNo','getCustomer','getProduct','addSalesOrder','getSoItem','updateSalesOrder','getSalesOrder','checkStock']),
    getDateTime(date){
      const dates = new Date(date);
      const hours = new Date().getHours().toString();
      const minutes = new Date().getMinutes().toString();
      const seconds = new Date().getSeconds().toString();
      let time = ('00'+hours).substring(hours.length) + ':' + ('00'+minutes).substring(minutes.length) + ':' + ('00'+seconds).substring(seconds.length);
      return new Date(dates.toISOString().slice(0,10) + ' ' + time);
    },
    async loadData(id) {
      let res = await this.getSalesOrder(id);
      if(res == undefined){
        return this.$router.push({ name: 'solist' });
      }
      let rspn = res.data.data;
      this.fields.id = id;
      this.fields.no = rspn.no;
      this.fields.notes = rspn.notes;
      this.fields.user = this.user._id;
      this.fields.customer = rspn.customer._id;
      this.getItem(id);
      this.fields.transdate = rspn.transdate;
      this.date = rspn.transdate.slice(0,10);
    },
    addData() {
        this.isLoading = true;
        this.addSalesOrder(this.fields).then(res => {
            if(res.data.success) {
                this.isLoading = false;
                this.$router.push('/sales/order/list');
            }
        })
    },
    updateData() {
        this.isLoading = true;
        this.updateSalesOrder(this.fields).then(res => {
            if(res.data.success) {
                this.isLoading = false;
                this.$router.push({ name : 'solist', params: { page : this.page }});
            }
        })
    },
    async reset(){
      let data = await this.getSoNo();
      this.fields.id = false;
      this.fields.no = data.data.code;
      this.date = new Date().toISOString().slice(0,10);
      this.fields.customer = '';
      this.fields.notes = '';
      this.fields.items = [];
      this.fields.user = this.user._id;
      this.fields.transdate = new Date();
    },
    async getItem(id){
        let data = {
          order: id
        }
        await this.getSoItem(data).then(res => {
            if(res.data.success) {
                let items = res.data.data;
                this.fields.items = [];
                items.forEach(item => {
                  item = {
                    name: item.product.name,
                    product: item.product._id,
                    price: item.price,
                    qty: item.qty,
                    stock: item.qty
                  }
                  this.fields.items.push(item);
                });
            }
        });
        let items = this.fields.items;
        items.forEach(item => {
          this.checkStock(item.product).then(res => {
            item.stock = res.data.qty;
          });
        });
    },
    addItem(){
      let data = this.productSelected;
      let index = this.fields.items.findIndex(item => item.product == data._id);
      if(index >= 0) {
        this.fields.items[index].qty += 1; 
      }else{
        let row = {
          product: data._id,
          name: data.name,
          qty: 1,
          price: data.price,
          stock: 0
        }
        this.checkStock(row.product).then(res => {
          row.stock = res.data.qty;
        });
        this.fields.items.push(row);
      }
      this.productSelected = {};
    },
    deleteItem(item) {
      let index = this.fields.items.findIndex(row => row.product === item.product);
      this.fields.items.splice(index, 1);
    },
    Back(){
        this.$router.push({ name: 'solist', params: { page : this.page }});
    },
    submit () {
      this.fields.transdate = this.getDateTime(this.date);
      this.$v.$touch();
      if(!this.$v.$error){
        if(this.fields.id){
          this.updateData();
        }else{
          this.addData();
        }
      }
    },
  }
}
</script>

<style>

</style>