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
                <v-toolbar-title>Input Data Product</v-toolbar-title>
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
                      <v-btn icon color="dee-orange" :loading="isLoading"  @click="submit" v-bind="attrs" v-on="on"><v-icon>mdi-content-save-move-outline</v-icon></v-btn>
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
                    label="Desciption"
                    prepend-icon="mdi-note-text-outline"
                    type="text"
                    v-model="description"
                  ></v-text-field>

                   <v-autocomplete
                      v-model="category"
                      :error-messages="categoryErrors"
                      required
                      :items="categoryItems"
                      :loading="isLoading"
                      :search-input.sync="searchCategory"
                      hide-no-data
                      hide-selected
                      item-text="Description"
                      item-value="_id"
                      label="Category"
                      placeholder="Start typing to Search"
                      prepend-icon="mdi-dresser"
                      :return-object="false"
                      @input="$v.category.$touch()"
                      @blur="$v.category.$touch()"
                  ></v-autocomplete>

                  <v-currency-field
                    prepend-icon="mdi-cash-100"  
                    label="Cost"
                    v-model="cost"
                  />

                  <v-currency-field
                    prepend-icon="mdi-cash-100"  
                    label="Price"
                    v-model="price"
                  />

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
                <v-toolbar-title>List Data Product</v-toolbar-title>
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
import { required } from 'vuelidate/lib/validators'
import { mapActions, mapGetters } from 'vuex';
export default {
  mixins: [validationMixin],
  validations: {
    name: { required },
    category: { required }
  },
  computed: {
      ...mapGetters(['user']),
      nameErrors () {
        const errors = []
        if (!this.$v.name.$dirty) return errors
        !this.$v.name.required && errors.push('Name is required.')
        return errors
      },
      categoryErrors () {
        const errors = []
        if (!this.$v.category.$dirty) return errors
        !this.$v.category.required && errors.push('Category is required.')
        return errors
      },
      categoryItems () {
        return this.categories.map(category => {
          const Description = category.name
          return Object.assign({}, category, { Description })
        })
      },
  },
  watch: {
    searchCategory () {
        // Items have already been loaded
        if (this.categories.length > 0) return;

        // Items have already been requested
        if (this.isLoading) return;

        this.isLoading = true;

        // Lazily load input items
        fetch('http://localhost:5000/api/categories')
          .then(res => res.json())
          .then(res => {
            const categories  = res.data;
            this.categories = categories;
          })
          .catch(err => {
            console.log(err)
          })
          .finally(() => (this.isLoading = false))
      },
  },
  data() {
    return {
      search: '',
      searchCategory: '',
      categories: [],
      name: '',
      description: '',
      category: '',
      cost: 0,
      price: 0,
      active: true,
      isLoading: false,
      headers: [
        {
          text: 'Name',
          align: 'start',
          sortable: false,
          value: 'name',
        },
        { text: 'Description', value: 'description' },
        { text: 'Cost', value: 'cost' },
        { text: 'Price', value: 'price' },
        { text: 'Active', value: 'active' },
        { text: 'Actions', value: 'actions', sortable: false },
      ],
      rows: []
    }
  },
  async mounted(){
    let data = await this.getProduct();
    if (data.data.success) {
      this.rows = data.data.data;
    }
  },
  created() {
    
  },
  methods: {
    ...mapActions(['getProduct','addProduct','updateProduct','deleteProduct']),
    addData() {
        let data = {
            name: this.name,
            description: this.description,
            category: this.category,
            cost: this.cost,
            price: this.price,
            active: this.active,
            user : this.user._id
        };
        this.isloading = true;
        this.addProduct(data).then(res => {
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
            description: this.description,
            category: this.category,
            cost: this.cost,
            price: this.price,
            active: this.active,
            user : this.user._id
        };
        this.isloading = true;
        this.updateProduct(data).then(res => {
            if(res.data.success) {
                let response = res.data.data;
                let index = this.rows.findIndex(row => row._id === response._id);
                let row = this.rows[index];
                row.name = response.name;
                row.description = response.description;
                row.category = response.category;
                row.cost = response.cost;
                row.price = response.price;
                row.active = response.active;
                this.reset();
                this.isloading = false;
            }
        })
    },
    editItem(item){
      this.id = item._id;
      this.name = item.name;
      this.description = item.description;
      this.category = item.category;
      this.cost = item.cost;
      this.price = item.price;
      this.active = item.active;
    },
    deleteItem(item) {
      let data = {
        id : item._id
      }
      this.deleteProduct(data).then(res => {
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
      this.description = '';
      this.category = '';
      this.cost = 0;
      this.price = 0;
      this.active = true;
    }
  }
}
</script>

<style>

</style>