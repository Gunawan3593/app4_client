<template>
    <v-row
        align="center"
        justify="center"
    >
    <v-col
      cols="12"
      sm="12"
      md="4"
    >
        <v-card
            class="mx-auto"
            max-width="300"
            outlined
        >
            <v-list-item three-line>
            <v-list-item-content>
                <v-list-item-title class="headline mb-1">ORDER</v-list-item-title>
                <v-list-item-subtitle>Total Order This Month</v-list-item-subtitle>
                {{ 1000000 | currency }}
            </v-list-item-content>

            <v-list-item-avatar
                tile
                size="80"
                color="grey"
            ><v-icon x-large dark>mdi-cart</v-icon></v-list-item-avatar>
            </v-list-item>
        </v-card>
    </v-col>
    <v-col
      cols="12"
      sm="12"
      md="4"
    >
     <v-card
            class="mx-auto"
            max-width="300"
            outlined
        >
            <v-list-item three-line>
            <v-list-item-content>
                <v-list-item-title class="headline mb-1">SALES</v-list-item-title>
                <v-list-item-subtitle>Total Sales This Month</v-list-item-subtitle>
                {{ 500000 | currency }}
            </v-list-item-content>

            <v-list-item-avatar
                tile
                size="80"
                color="grey"
            ><v-icon x-large dark>mdi-shopping</v-icon></v-list-item-avatar>
            </v-list-item>
        </v-card>
    </v-col>
    <v-col
      cols="12"
      sm="12"
      md="4"
    >
        <v-card
            class="mx-auto"
            max-width="300"
            outlined
        >
            <v-list-item three-line>
            <v-list-item-content>
                <v-list-item-title class="headline mb-1">TOP PRODUCT</v-list-item-title>
                <v-list-item-subtitle>Top Product This Month</v-list-item-subtitle>
                Koka Kola : {{ 10000 | currency }}
            </v-list-item-content>

            <v-list-item-avatar
                tile
                size="80"
                color="grey"
            ><v-icon x-large dark>mdi-shopping-search</v-icon></v-list-item-avatar>
            </v-list-item>
        </v-card>
    </v-col>
    <v-col
      cols="12"
      sm="12"
      md="6"
    >
      <v-card
            class="mt-4 mx-auto"
        >
            <v-sheet
            class="v-sheet--offset mx-auto"
            color="light-blue"
            elevation="12"
            max-width="calc(100% - 32px)"
            >
            <v-sparkline
                :labels="hourLabels"
                :value="hourValue"
                color="white"
                line-width="1"
                padding="16"
                auto-draw
            ></v-sparkline>
            </v-sheet>

            <v-card-text class="pt-0">
            <div class="title font-weight-light mb-2">Today's Sales</div>
            <div class="subheading font-weight-light grey--text">Sales order every 3 hours</div>
            <v-divider class="my-2"></v-divider>
            <v-icon
                class="mr-2"
                small
            >
                mdi-clock
            </v-icon>
            <span class="caption grey--text font-weight-light">last order 26 minutes ago</span>
            </v-card-text>
        </v-card>
    </v-col>
    <v-col
      cols="12"
      sm="12"
      md="6"
    >
      <v-card
            class="mt-4 mx-auto"
        >
            <v-sheet
            class="v-sheet--offset mx-auto"
            color="cyan"
            elevation="12"
            max-width="calc(100% - 32px)"
            >
            <v-sparkline
                :labels="dayLabels"
                :value="dayValue"
                color="white"
                line-width="1"
                padding="16"
                auto-draw
            ></v-sparkline>
            </v-sheet>

            <v-card-text class="pt-0">
            <div class="title font-weight-light mb-2">Daily Sales</div>
            <div class="subheading font-weight-light grey--text">Sales order everyday</div>
            <v-divider class="my-2"></v-divider>
            <v-icon
                class="mr-2"
                small
            >
                mdi-clock
            </v-icon>
            <span class="caption grey--text font-weight-light">last order 26 minutes ago</span>
            </v-card-text>
        </v-card>
    </v-col>
    </v-row>
</template>

<script>
 export default {
    data: () => ({
      hourLabels: [
        '08:00',
        '11:00',
        '14:00',
        '17:00',
        '20:00',
        '23:00',
        '02:00',
        '05:00',
      ],
      hourValue: [
        100000,
        50000,
        30000,
        40000,
        80000,
        90000,
        40000,
        70000,
      ],
      dayLabels: [
        'Mon',
        'Tue',
        'Wed',
        'Thur',
        'Fri',
        'Sat',
        'Sun'
      ],
      dayValue: [
        100000,
        50000,
        30000,
        40000,
        80000,
        90000,
        40000
      ],
    }),
  }
</script>

<style>

</style>