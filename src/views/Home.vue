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
                {{ total.order | currency }}
            </v-list-item-content>

            <v-list-item-avatar
                tile
                size="80"
                color="blue darken-1"
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
                {{ total.sales | currency }}
            </v-list-item-content>

            <v-list-item-avatar
                tile
                size="80"
                color="light-green"
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
                {{ top.product.name }} : {{ top.product.total | currency }}
            </v-list-item-content>

            <v-list-item-avatar
                tile
                size="80"
                color="orange lighten-1"
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
                :gradient="gradient"
                color="white"
                line-width="2"
                smooth="16"
                padding="16"
                height="100"
                auto-draw
            ></v-sparkline>
            </v-sheet>

            <v-card-text class="pt-0">
            <div class="title font-weight-light mb-2">Today's Sales</div>
            <div class="subheading font-weight-light grey--text">Sales counter every hour</div>
            <v-divider class="my-2"></v-divider>
            <v-icon
                class="mr-2"
                small
            >
                mdi-clock
            </v-icon>
            <span class="caption grey--text font-weight-light">Updated {{ sales.lastUpdated | moment('from') }}</span>
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
                :gradient="gradient"
                color="white"
                line-width="2"
                smooth="16"
                padding="16"
                height="100"
                auto-draw
            ></v-sparkline>
            </v-sheet>

            <v-card-text class="pt-0">
            <div class="title font-weight-light mb-2">Daily Sales</div>
            <div class="subheading font-weight-light grey--text">Sales counter by day of week</div>
            <v-divider class="my-2"></v-divider>
            <v-icon
                class="mr-2"
                small
            >
                mdi-clock
            </v-icon>
            <span class="caption grey--text font-weight-light">Updated {{ sales.lastUpdated | moment('from') }}</span>
            </v-card-text>
        </v-card>
    </v-col>
    </v-row>
</template>

<script>
import { mapActions  } from 'vuex';
 export default {
    data: () => ({
      gradient : ['#f72047', '#ffd200', '#1feaea'],
      total : {
          order : 0,
          sales : 0
      },
      top : {
          product : {}
      },
      sales : {
          lastUpdated : new Date()
      },
      hourLabels: [
        '00:00',
        '01:00',
        '02:00',
        '03:00',
        '04:00',
        '05:00',
        '06:00',
        '07:00',
        '08:00',
        '09:00',
        '10:00',
        '11:00',
        '12:00',
        '13:00',
        '14:00',
        '15:00',
        '16:00',
        '17:00',
        '18:00',
        '19:00',
        '20:00',
        '21:00',
        '22:00',
        '23:00',
      ],
      hourValue: [],
      dayLabels: [
        'Mon',
        'Tue',
        'Wed',
        'Thur',
        'Fri',
        'Sat',
        'Sun'
      ],
      dayValue: [],
    }),
    methods: {
        ...mapActions(['getSalesOrderByMonth','getSalesInvoiceByMonth','getTopSellProductByMonth','getSalesByTime','getSalesOtw','getLastUpdateSales']),
        getDateTime(date){
            const dates = new Date(date);
            const hours = dates.getHours().toString();
            const minutes = dates.getMinutes().toString();
            const seconds = dates.getSeconds().toString();
            let time = ('00'+hours).substring(hours.length) + ':' + ('00'+minutes).substring(minutes.length) + ':' + ('00'+seconds).substring(seconds.length);
            return dates.toISOString().slice(0,10) + ' ' + time;
        },
    },
    async mounted(){
        let res = await this.getSalesOrderByMonth(new Date());
        if (res.data.success){
            this.total.order = res.data.total;
        }
        res = await this.getSalesInvoiceByMonth(new Date());
        if (res.data.success){
            this.total.sales = res.data.total;
        }
        res = await this.getTopSellProductByMonth(new Date());
        if (res.data.success){
            this.top.product = res.data.product;
        }
        res = await this.getSalesByTime(new Date());
        if (res.data.success){
            let data = res.data.data;
            let hours = [0];
            for (var i=1;i<=23;i++){
                hours.push(i*100);
            }
            let date = new Date();
            let curHours = date.getHours().toString();
            let curMinutes = date.getMinutes().toString();
            let curTime = ('00'+curHours).substring(curHours.length) + '' + ('00'+curMinutes).substring(curMinutes.length)
            let time = 0;
            data.forEach(row => {
                time = parseInt(row._id);
                hours.forEach((hour,i) => {
                    if(hours[i] <= parseInt(curTime)) {
                        if (time >= hours[i]  && time < hours[i+1]) {
                            if(this.hourValue[i] == undefined) {
                                this.hourValue.push(0)
                            }
                            this.hourValue[i] += row.total;
                        }else{
                            if(this.hourValue[i] == undefined) {
                                this.hourValue.push(0)
                            }
                        }
                    }else{
                        return;
                    }
                })
            });
            res = await this.getSalesOtw(new Date());
            if (res.data.success){
                let data = res.data.data;
                let dow = [1,2,3,4,5,6,7,8];
                let date = new Date();
                let curDay = date.getDay();
                let day = 0;
                data.forEach(row=>{
                    day = row._id;
                    if(dow[0] <= curDay) {
                        if (day == dow[0]) {
                            if(this.dayValue[0] == undefined) {
                                this.dayValue.push(0)
                            }
                            this.dayValue[0] += row.total;
                        }else{
                            if(this.dayValue[0] == undefined) {
                                this.dayValue.push(0)
                            }
                        }
                    }else{
                        return;
                    }
                    if(dow[1] <= curDay) {
                        if (day == dow[1]) {
                            if(this.dayValue[1] == undefined) {
                                this.dayValue.push(0)
                            }
                            this.dayValue[1] += row.total;
                        }else{
                            if(this.dayValue[1] == undefined) {
                                this.dayValue.push(0)
                            }
                        }
                    }else{
                        return;
                    }
                    if(dow[2] <= curDay) {
                        if (day == dow[2]) {
                            if(this.dayValue[2] == undefined) {
                                this.dayValue.push(0)
                            }
                            this.dayValue[2] += row.total;
                        }else{
                            if(this.dayValue[2] == undefined) {
                                this.dayValue.push(0)
                            }
                        }
                    }else{
                        return;
                    }
                    if(dow[3] <= curDay) {
                        if (day == dow[3]) {
                            if(this.dayValue[3] == undefined) {
                                this.dayValue.push(0)
                            }
                            this.dayValue[3] += row.total;
                        }else{
                            if(this.dayValue[3] == undefined) {
                                this.dayValue.push(0)
                            }
                        }
                    }else{
                        return;
                    }
                    if(dow[4] <= curDay) {
                        if (day == dow[4]) {
                            if(this.dayValue[4] == undefined) {
                                this.dayValue.push(0)
                            }
                            this.dayValue[4] += row.total;
                        }else{
                            if(this.dayValue[4] == undefined) {
                                this.dayValue.push(0)
                            }
                        }
                    }else{
                        return;
                    }
                    if(dow[5] <= curDay) {
                        if (day == dow[5]) {
                            if(this.dayValue[5] == undefined) {
                                this.dayValue.push(0)
                            }
                            this.dayValue[5] += row.total;
                        }else{
                            if(this.dayValue[5] == undefined) {
                                this.dayValue.push(0)
                            }
                        }
                    }else{
                        return;
                    }
                    if(dow[6] <= curDay) {
                        if (day == dow[6]) {
                            if(this.dayValue[6] == undefined) {
                                this.dayValue.push(0)
                            }
                            this.dayValue[6] += row.total;
                        }else{
                            if(this.dayValue[6] == undefined) {
                                this.dayValue.push(0)
                            }
                        }
                    }else{
                        return;
                    }
                });
                res = await this.getLastUpdateSales();
                if(res.data.success){
                    this.sales.lastUpdated = res.data.date;
                }
            }
        }
    }
  }
</script>

<style>

</style>