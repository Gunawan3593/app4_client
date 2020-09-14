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
          <v-toolbar-title>Add Purchase Return</v-toolbar-title>
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
                <v-btn icon color="dee-orange" link to="/purchase/return/add"  v-bind="attrs" v-on="on"><v-icon>mdi-restore</v-icon></v-btn>
              </template>
              <span>New Data</span>
              </v-tooltip>
              <v-tooltip left>
              <template v-slot:activator="{ on, attrs}">
                <v-btn icon color="dee-orange" :loading="isLoading" :disabled="isLoading" @click="submit" v-bind="attrs" v-on="on"><v-icon>mdi-content-save-move-outline</v-icon></v-btn>
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
                    @change="loadInvoice($event)"
                    @input="$v.fields.supplier.$touch()"
                    @blur="$v.fields.supplier.$touch()"
                ></v-autocomplete>
              </v-col>
            </v-row>
          </v-form>
          <v-row>
            <v-col cols="12" sm="6" md="4">
              <v-autocomplete
                    v-model="fields.invoice"
                    :error-messages="invoiceErrors"
                    required
                    :items="invoiceItems"
                    hide-no-data
                    hide-selected
                    item-text="Description"
                    item-value="_id"
                    label="Invoice"
                    placeholder="Start typing to Search"
                    prepend-icon="mdi-cart-outline"
                    :return-object="false"
                    @change="getInvoiceItem($event)"
                    @input="$v.fields.invoice.$touch()"
                    @blur="$v.fields.invoice.$touch()"
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
                      <th class="text-center" width="100px">Invoice</th>
                      <th class="text-center" width="100px">Qty</th>
                      <th class="text-center" width="200px;">Cost</th>
                      <th class="text-center" width="200px;">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(item,index) in fields.items" :key="item.product">
                      <td>{{ item.name }}</td>
                      <td>{{ item.invoice_qty }}</td>
                      <td><v-currency-field :decimal-length="0" place-holder="Qty" v-model="item.qty" @change="checkQty(index)" /></td>
                      <td class="text-right">{{ item.cost | currency }}</td>
                      <td class="text-right">{{ item.qty * item.cost | currency }}</td>
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
      supplier: { required },
      invoice: { required }
    }
  },
  computed: {
    ...mapGetters(['user','purchaseReturnStatus']),
    supplierErrors () {
      const errors = []
      if (!this.$v.fields.supplier.$dirty) return errors
      !this.$v.fields.supplier.required && errors.push('Supplier is required.')
      return errors
    },
    invoiceErrors () {
      const errors = []
      if (!this.$v.fields.invoice.$dirty) return errors
      !this.$v.fields.invoice.required && errors.push('Invoice is required.')
      return errors
    },
    supplierItems () {
      return this.suppliers.map(supplier => {
        const Description = supplier.name
        return Object.assign({}, supplier, { Description })
      })
    },
    invoiceItems () {
      return this.invoices.map(invoice => {
        const Description = invoice.no
        return Object.assign({}, invoice, { Description })
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
        invoice: '',
        supplier: '',
        notes: '',
        user: '',
        items : []
      },
      date : '',
      suppliers: [],
      invoices: [],
      products: [],
      isLoading: false,
      menu: false,
      page: ''
    }
  },
  async mounted(){
    let res = await this.getSupplier();
    let data = res.data.data;
    if(data) {
      this.suppliers = data;
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
    ...mapActions(['getRtNo','getSupplier','addPurchaseReturn','getPiItem','getRtItem','updatePurchaseReturn','getPurchaseReturn','getInvoiceReturnable']),
    getDateTime(date){
      const dates = new Date(date);
      const hours = new Date().getHours().toString();
      const minutes = new Date().getMinutes().toString();
      const seconds = new Date().getSeconds().toString();
      let time = ('00'+hours).substring(hours.length) + ':' + ('00'+minutes).substring(minutes.length) + ':' + ('00'+seconds).substring(seconds.length);
      return dates.toISOString().slice(0,10) + ' ' + time;
    },
    async loadData(id) {
      let res = await this.getPurchaseReturn(id);
      if(res == undefined){
        return this.$router.push({ name: 'rtlist' });
      }
      let rspn = res.data.data;
      this.fields.id = id;
      this.fields.no = rspn.no;
      this.invoices.push(rspn.invoice);
      this.fields.invoice = rspn.invoice._id;
      this.fields.notes = rspn.notes;
      this.fields.user = this.user._id;
      this.fields.supplier = rspn.supplier._id;
      this.getItem(id);
      this.fields.transdate = rspn.transdate;
      this.date = rspn.transdate.slice(0,10);
    },
    async loadInvoice(id){
      let res = await this.getInvoiceReturnable(id);
      let data = res.data.data;
      this.invoices = [];
      this.fields.items = [];
      if(data != undefined){
        data.forEach(invoice => {
          this.invoices.push(invoice);
        });
      }
    },
    addData() {
        this.isLoading = true;
        this.addPurchaseReturn(this.fields).then(res => {
            if(res.data.success) {
                this.isLoading = false;
                this.$router.push('/purchase/return/list');
            }
        })
    },
    updateData() {
        this.isLoading = true;
        this.updatePurchaseReturn(this.fields).then(res => {
            if(res.data.success) {
                this.isLoading = false;
                this.$router.push({ name : 'rtlist', params: { page : this.page }});
            }
        })
    },
    async reset(){
      let data = await this.getRtNo();
      this.fields.id = false;
      this.fields.no = data.data.code;
      this.date = new Date().toISOString().slice(0,10);
      this.fields.supplier = '';
      this.fields.notes = '';
      this.fields.items = [];
      this.fields.user = this.user._id;
      this.fields.transdate = new Date();
    },
    getItem(id){
      let data = {
        returns: id
      }
      this.getRtItem(data).then(res => {
          if(res.data.success) {
              let items = res.data.data;
              this.fields.items = [];
              items.forEach(item => {
                item = {
                  name: item.product.name,
                  invoice_item: item.invoice_item._id,
                  product: item.product._id,
                  cost: item.cost,
                  invoice_qty: item.qty + (item.invoice_item.qty - item.invoice_item.return_qty),
                  qty: item.qty
                }
                this.fields.items.push(item);
              });
          }
      });
    },
    getInvoiceItem(id){
      let data = {
        invoice: id
      }
      this.getPiItem(data).then(res => {
          if(res.data.success) {
              let items = res.data.data;
              this.fields.items = [];
              items.forEach(item => {
                if (item.qty - item.return_qty > 0) {
                  item = {
                    name: item.product.name,
                    invoice_item: item._id,
                    product: item.product._id,
                    cost: item.cost,
                    invoice_qty: item.qty - item.return_qty,
                    qty: 0
                  }
                  this.fields.items.push(item);
                }
              });
          }
      });
    },
    Back(){
        this.$router.push({ name: 'rtlist', params: { page : this.page }});
    },
    checkQty(index){
      let data = this.fields.items[index];
      if (data.qty > data.invoice_qty) {
        data.qty = data.invoice_qty;
      }
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