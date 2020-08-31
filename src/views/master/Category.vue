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
                <v-toolbar-title>Input Data Category</v-toolbar-title>
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
                    label="Description"
                    prepend-icon="mdi-note-text-outline"
                    type="text"
                    v-model="description"
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
                <v-toolbar-title>List Data Category</v-toolbar-title>
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
import { required } from 'vuelidate/lib/validators'
import { mapActions, mapGetters } from 'vuex';
export default {
  mixins: [validationMixin],
  validations: {
    name: { required }
  },
  computed: {
      ...mapGetters(['user']),
      nameErrors () {
        const errors = []
        if (!this.$v.name.$dirty) return errors
        !this.$v.name.required && errors.push('Name is required.')
        return errors
      }
  },
  data() {
    return {
      search: '',
      name: '',
      description: '',
      active: true,
      isloading: false,
      headers: [
        {
          text: 'Name',
          align: 'start',
          sortable: false,
          value: 'name',
        },
        { text: 'Desciption', value: 'description' },
        { text: 'Active', value: 'active' },
        { text: 'Actions', value: 'actions', sortable: false },
      ],
      rows: []
    }
  },
  async mounted(){
    let data = await this.getCategory();
    if (data.data.success) {
      this.rows = data.data.data;
    }
  },
  created() {
    
  },
  methods: {
    ...mapActions(['getCategory','addCategory','updateCategory','deleteCategory']),
    addData() {
        let data = {
            name: this.name,
            description: this.description,
            active: this.active,
            user : this.user._id
        };
        this.isloading = true;
        this.addCategory(data).then(res => {
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
            active: this.active,
            user : this.user._id
        };
        this.isloading = true;
        this.updateCategory(data).then(res => {
            if(res.data.success) {
                let response = res.data.data;
                let index = this.rows.findIndex(row => row._id === response._id);
                let row = this.rows[index];
                row.name =  response.name;
                row.description = response.description;
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
      this.active = item.active;
    },
    deleteItem(item) {
      let data = {
        id : item._id
      }
      this.deleteCategory(data).then(res => {
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
      this.active = true;
    }
  }
}
</script>

<style>

</style>