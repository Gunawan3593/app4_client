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
                  <v-row>
                    <v-col cols="12" sm="12" md="4">
                        <v-text-field
                          label="No."
                          prepend-icon="mdi-numeric"
                          type="text"
                          v-model="description"
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
                    </v-col>
                  </v-row>
                </v-form>
                <v-row>
    <v-col cols="12" sm="6" md="4">
    <v-autocomplete
        v-model="itemid"
        :items="itemproduct"
        :loading="isLoading"
        :search-input.sync="search2"
        color="white"
        hide-no-data
        hide-selected
        item-text="Description"
        item-value="id"
        label="Product"
        placeholder="Select Product"
        prepend-icon="mdi-database-search"
        return-object
        @change="addrow()"
      ></v-autocomplete>
    </v-col>
    <v-col cols="12" sm="6" md="8">
      <p class="display-2 text-right" style="padding-right:10px;">Total : {{ getSubTotal | currency }}</p>
    </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" sm="12" md="12">
    <v-simple-table dense>
    <template v-slot:default>
      <thead>
        <tr>
          <th class="text-center d-none">ID</th>
          <th class="text-center">Name</th>
          <th class="text-center">Qty</th>
          <th class="text-center">Cost</th>
          <th class="text-center">Total</th>
          <th class="text-center">Action</th>
        </tr>
      </thead>
      <tbody>
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
          value=""
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
export default {
  data() {
    return {
      date: new Date().getFullYear() +'-'+ parseInt(new Date().getMonth()+1) +'-'+new Date().getDate(),
    }
  },
}
</script>

<style>

</style>