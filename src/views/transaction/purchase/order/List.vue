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
                <v-toolbar-title>List Purchase Order</v-toolbar-title>
                <v-tooltip left>
                    <template v-slot:activator="{ on, attrs}">
                      <v-btn icon color="dee-orange" link to="/purchase/order/form" v-bind="attrs" v-on="on"><v-icon>mdi-plus</v-icon></v-btn>
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
export default {

}
</script>

<style>

</style>