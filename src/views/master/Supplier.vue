<template>
  <v-row
          align="center"
          justify="center"
        >
          <v-col
            cols="12"
            sm="8"
            md="5"
          >
            <v-card class="elevation-12">
              <v-toolbar
                color="primary"
                dark
                flat
              >
                <v-toolbar-title>Input Data Supplier</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-toolbar-title>
                    <v-tooltip left>
                    <template v-slot:activator="{ on, attrs}">
                      <v-btn icon color="dee-orange" @click="reset"  v-bind="attrs" v-on="on"><v-icon>mdi-restore</v-icon></v-btn>
                    </template>
                    <span>New Data</span>
                    </v-tooltip>
                    <v-tooltip left>
                    <template v-slot:activator="{ on, attrs}">
                      <v-btn icon color="dee-orange" :loading="isloading"  @click="submit" v-bind="attrs" v-on="on"><v-icon>mdi-content-save-move-outline</v-icon></v-btn>
                    </template>
                    <span>Save Data</span>
                    </v-tooltip>
                </v-toolbar-title>
              </v-toolbar>
              <v-card-text>
                <v-form>
                    <v-text-field
                    label="Name"
                    prepend-icon="mdi-account-tie"
                    type="text"
                    v-model="name"
                    :error-messages="nameErrors"
                    required
                    @input="$v.name.$touch()"
                    @blur="$v.name.$touch()"
                    ></v-text-field>

                  <v-text-field
                    label="Address"
                    prepend-icon="mdi-map-marker"
                    type="text"
                    v-model="address"
                    :error-messages="addressErrors"
                    required
                    @input="$v.address.$touch()"
                    @blur="$v.address.$touch()"
                  ></v-text-field>

                  <v-text-field
                    label="Contact Person"
                    prepend-icon="mdi-account"
                    type="text"
                    v-model="cpname"
                    :error-messages="cpnameErrors"
                    required
                    @input="$v.cpname.$touch()"
                    @blur="$v.cpname.$touch()"
                  ></v-text-field>

                  <v-text-field
                    label="Email"
                    prepend-icon="mdi-email"
                    type="text"
                    v-model="email"
                    :error-messages="emailErrors"
                    required
                    @input="$v.email.$touch()"
                    @blur="$v.email.$touch()"
                  ></v-text-field>

                  <v-text-field
                    label="Phone"
                    prepend-icon="mdi-phone"
                    type="text"
                    v-model="phone"
                    :error-messages="phoneErrors"
                    required
                    @input="$v.phone.$touch()"
                    @blur="$v.phone.$touch()"
                  ></v-text-field>

                  <v-switch v-model="active" class="ma-2" label="Active"></v-switch>
                </v-form>
              </v-card-text>
            </v-card>
          </v-col>
          <v-col
            cols="12"
            sm="8"
            md="7"
          >
            <v-card class="elevation-12">
              <v-toolbar
                color="primary"
                dark
                flat
              >
                <v-toolbar-title>List Data Supplier</v-toolbar-title>
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
                >
                <template v-slot:[`item.active`]="{ item }">
                  <v-icon v-if="item.active" color="blue" dark>mdi-check-circle</v-icon>
                  <v-icon v-if="!item.active" color="red" dark>mdi-minus-circle</v-icon>
                </template>
                <template v-slot:[`item.actions`]="{ item }">
                  <v-icon
                    small
                    class="mr-2"
                    @click="editItem(item)"
                  >
                    mdi-pencil
                  </v-icon>
                  <v-icon
                    small
                    @click="deleteItem(item)"
                  >
                    mdi-delete
                  </v-icon>
                </template>
                </v-data-table>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
</template>

<script>
import { validationMixin } from 'vuelidate'
import { required, email } from 'vuelidate/lib/validators'
import { mapActions, mapGetters } from 'vuex';
export default {
  mixins: [validationMixin],
  validations: {
    name: { required },
    address: { required },
    cpname: { required },
    email: { required, email },
    phone: { required },
    active: { required }
  },
  computed: {
      ...mapGetters(['user','suppliers']),
      test(){
        return this.suppliers;
      },
      nameErrors () {
        const errors = []
        if (!this.$v.name.$dirty) return errors
        !this.$v.name.required && errors.push('Name is required.')
        return errors
      },
      addressErrors () {
        const errors = []
        if (!this.$v.address.$dirty) return errors
        !this.$v.address.required && errors.push('Address is required.')
        return errors
      },
      cpnameErrors () {
        const errors = []
        if (!this.$v.cpname.$dirty) return errors
        !this.$v.cpname.required && errors.push('Contact Person is required.')
        return errors
      },
      emailErrors () {
        const errors = []
        if (!this.$v.email.$dirty) return errors
        !this.$v.email.email && errors.push('Example : JohnDue@gmail.com')
        !this.$v.email.required && errors.push('Email is required.')
        return errors
      },
      phoneErrors () {
        const errors = []
        if (!this.$v.phone.$dirty) return errors
        !this.$v.phone.required && errors.push('Password is required.')
        return errors
      }
  },
  data() {
    return {
      search: '',
      name: '',
      address: '',
      cpname: '',
      email: '',
      phone: '',
      active: true,
      isloading: false,
      headers: [
        {
          text: 'Name',
          align: 'start',
          sortable: false,
          value: 'name',
        },
        { text: 'Address', value: 'address' },
        { text: 'Phone', value: 'phone' },
        { text: 'Active', value: 'active' },
        { text: 'Actions', value: 'actions', sortable: false },
      ],
      rows: []
    }
  },
  async mounted(){
    let data = await this.getSupplier();
    if (data.data.success) {
      this.rows = data.data.data;
    }
  },
  created() {
    
  },
  methods: {
    ...mapActions(['getSupplier','addSupplier','updateSupplier','deleteSupplier']),
    addData() {
        let data = {
            name: this.name,
            address: this.address,
            cpname: this.cpname,
            email: this.email,
            phone: this.phone,
            active: this.active,
            user : this.user._id
        };
        this.isloading = true;
        this.addSupplier(data).then(res => {
            if(res.data.success) {
                this.rows.push(res.data.data);
                this.reset();
                this.isloading = false;
            }
        })
    },
    updateData() {
        let data = {
            id: this.id,
            name: this.name,
            address: this.address,
            cpname: this.cpname,
            email: this.email,
            phone: this.phone,
            active: this.active,
            user : this.user._id
        };
        this.isloading = true;
        this.updateSupplier(data).then(res => {
            if(res.data.success) {
                let response = res.data.data;
                let index = this.rows.findIndex(row => row._id === response._id);
                let row = this.rows[index];
                row.name =  response.name;
                row.address = response.address;
                row.cpname = response.cpname;
                row.email = response.email;
                row.phone = response.phone;
                row.active = response.active;
                this.reset();
                this.isloading = false;
            }
        })
    },
    editItem(item){
      this.id = item._id;
      this.name = item.name;
      this.address = item.address;
      this.cpname = item.cpname;
      this.email = item.email;
      this.phone = item.phone;
      this.active = item.active;
    },
    deleteItem(item) {
      let data = {
        id : item._id
      }
      this.deleteSupplier(data).then(res => {
          if(res.data.success){
            let index = this.rows.findIndex(row => row._id === item._id);
            this.rows.splice(index, 1);
          }
      })
    },
    submit () {
      this.$v.$touch();
      if(!this.$v.$error){
        if(this.id){
          this.updateData();
        }else{
          this.addData();
        }
      }
    },
    reset() {
      this.id = false;
      this.name = '';
      this.address = '';
      this.cpname = '';
      this.email = '';
      this.phone = '';
      this.active = true;
    }
  }
}
</script>

<style>

</style>