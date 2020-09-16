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
          <v-toolbar-title>Add Purchase Order</v-toolbar-title>
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
                <v-btn icon color="dee-orange" link to="/purchase/order/add"  v-bind="attrs" v-on="on"><v-icon>mdi-restore</v-icon></v-btn>
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
                    v-model="fields.supplier"
                    :error-messages="supplierErrors"
                    required
                    :items="supplierItems"
                    hide-no-data
                    hide-selected
                    item-text="Description"
                    item-value="_id"
                    label="Supplier"
                    placeholder="Start typing to Search"
                    prepend-icon="mdi-dresser"
                    :return-object="false"
                    @input="$v.fields.supplier.$touch()"
                    @blur="$v.fields.supplier.$touch()"
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
                      <th class="text-center" width="100px">Qty</th>
                      <th class="text-center" width="200px;">Cost</th>
                      <th class="text-center" width="200px;">Total</th>
                      <th class="text-center" width="50px;">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="item in fields.items" :key="item.product">
                        <td>{{ item.name }}</td>
                        <td><v-currency-field :decimal-length="0" place-holder="Qty" v-model="item.qty" /></td>
                        <td class="text-right">{{ item.cost | currency }}</td>
                        <td class="text-right">{{ item.qty * item.cost | currency }}</td>
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
      supplier: { required }
    }
  },
  computed: {
    ...mapGetters(['user','purchaseOrderStatus']),
    supplierErrors () {
      const errors = []
      if (!this.$v.fields.supplier.$dirty) return errors
      !this.$v.fields.supplier.required && errors.push('Supplier is required.')
      return errors
    },
    supplierItems () {
      return this.suppliers.map(supplier => {
        const Description = supplier.name
        return Object.assign({}, supplier, { Description })
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
        total += items[i].qty * items[i].cost;
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
        supplier: '',
        notes: '',
        user: '',
        items : []
      },
      date : '',
      suppliers: [],
      products: [],
      isLoading: false,
      menu: false,
      productSelected: '',
      page: ''
    }
  },
  async mounted(){
    let res = await this.getSupplier();
    let data = res.data.data;
    if(data) {
      this.suppliers = data;
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
    ...mapActions(['getPoNo','getSupplier','getProduct','addPurchaseOrder','getPoItem','updatePurchaseOrder','getPurchaseOrder']),
    getDateTime(date){
      const dates = new Date(date);
      const hours = new Date().getHours().toString();
      const minutes = new Date().getMinutes().toString();
      const seconds = new Date().getSeconds().toString();
      let time = ('00'+hours).substring(hours.length) + ':' + ('00'+minutes).substring(minutes.length) + ':' + ('00'+seconds).substring(seconds.length);
      let strDate = this.getDate(dates);
      return new Date(strDate + ' ' + time);
    },
    getDate(date){
      const offset = date.getTimezoneOffset();
      date = new Date(date.getTime() - (offset*60*1000));
      return date.toISOString().split('T')[0];
    },
    async loadData(id) {
      let res = await this.getPurchaseOrder(id);
      if(res == undefined){
        return this.$router.push({ name: 'polist' });
      }
      let rspn = res.data.data;
      this.fields.id = id;
      this.fields.no = rspn.no;
      this.fields.notes = rspn.notes;
      this.fields.user = this.user._id;
      this.fields.supplier = rspn.supplier._id;
      this.getItem(id);
      this.fields.transdate = rspn.transdate;
      this.date = this.getDate(new Date(rspn.transdate));
    },
    addData() {
        this.isLoading = true;
        this.addPurchaseOrder(this.fields).then(res => {
            if(res.data.success) {
                this.isLoading = false;
                this.$router.push('/purchase/order/list');
            }
        })
    },
    updateData() {
        this.isLoading = true;
        this.updatePurchaseOrder(this.fields).then(res => {
            if(res.data.success) {
                this.isLoading = false;
                this.$router.push({ name : 'polist', params: { page : this.page }});
            }
        })
    },
    async reset(){
      let data = await this.getPoNo();
      this.fields.id = false;
      this.fields.no = data.data.code;
      this.date = this.getDate(new Date())
      this.fields.supplier = '';
      this.fields.notes = '';
      this.fields.items = [];
      this.fields.user = this.user._id;
      this.fields.transdate = new Date();
    },
    getItem(id){
        let data = {
          order: id
        }
        this.getPoItem(data).then(res => {
            if(res.data.success) {
                let items = res.data.data;
                this.fields.items = [];
                items.forEach(item => {
                  item = {
                    name: item.product.name,
                    product: item.product._id,
                    cost: item.cost,
                    qty: item.qty
                  }
                  this.fields.items.push(item);
                });
            }
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
          cost: data.cost
        }
        this.fields.items.push(row);
      }
      this.productSelected = {};
    },
    deleteItem(item) {
      let index = this.fields.items.findIndex(row => row.product === item.product);
      this.fields.items.splice(index, 1);
    },
    Back(){
        this.$router.push({ name: 'polist', params: { page : this.page }});
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