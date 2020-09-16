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
            <apexchart type="line" :options="optChartTime" :series="srsChartTime"></apexchart>
            <v-card-text class="pt-0">
            <div class="title font-weight-light mb-2">Today's Sales</div>
            <div class="subheading font-weight-light grey--text">Sales last 8 hour counter</div>
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
            <apexchart type="line" :options="optChartWeek" :series="srsChartWeek"></apexchart>
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
    <v-col
      cols="12"
      sm="12"
      md="6"
    >
    
    </v-col>
    <v-col
      cols="12"
      sm="12"
      md="6"
    >
    
    </v-col>
    </v-row>
</template>

<script>
import { mapActions  } from 'vuex';

 export default {
    data: () => ({
      optChartTime: {},
      srsChartTime: [],
      optChartWeek: {},
      srsChartWeek: [],
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
      hourLabels: [],
      hourValue: [],
      dayLabels: [],
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
        async drawchartTime() {
            let res = await this.getSalesByTime(new Date());
            if (res.data.success){
                let data = res.data.data;
                let hours = [];
                let date = new Date();
                let curHours = date.getHours().toString();
                let curTime = parseInt(('00'+curHours).substring(curHours.length) + '00') + 100 ;
                let period = 800;
                let time = 0;
                let startTime = curTime - period;
                if (startTime < 0) {
                    let startLastday = 2300 + startTime;
                    for(let i=1;i<=((startTime*-1)/100);i++){
                        startLastday += 100;
                        hours.push(startLastday);
                    }
                    let yesterdate = new Date();
                    yesterdate.setDate(yesterdate.getDate()-1);
                    let rspn = await this.getSalesByTime(yesterdate);
                    if (rspn.data.success){
                        let lastData = rspn.data.data;
                        lastData.forEach(row => {
                            time = parseInt(row._id);
                            hours.forEach((hour,i) => {
                                if (time == hours[i]) {
                                    if(this.hourValue[i] == undefined) {
                                        this.hourValue.push(0)
                                    }
                                    this.hourValue[i] += row.total;
                                }else{
                                    if(this.hourValue[i] == undefined) {
                                        this.hourValue.push(0)
                                    }
                                }
                            })
                        });
                        if(lastData.length == 0){
                            for(let i=0;i<hours.length;i++){
                                this.hourValue.push(0)
                            }
                        }
                    }
                    let limit = (period/100)-hours.length;
                    for(let i=0;i<limit;i++){
                        hours.push(i*100);
                    }
                }else{
                    let startDay = startTime-100;
                    let limit = period / 100;
                    for(let i=0;i<limit;i++){
                        startDay += 100;
                        hours.push(startDay);
                    }
                }
                data.forEach(row => {
                    time = parseInt(row._id);
                    hours.forEach((hour,i) => {
                        if (time == hours[i]) {
                            if(this.hourValue[i] == undefined) {
                                this.hourValue.push(0)
                            }
                            this.hourValue[i] += row.total;
                        }else{
                            if(this.hourValue[i] == undefined) {
                                this.hourValue.push(0)
                            }
                        }
                    })
                });
                if(data.length == 0){
                    let limit = (period/100)-this.hourValue.length;
                    for(let i=0;i<limit;i++){
                        this.hourValue.push(0)
                    }
                }
                //redraw hour label 
                hours.forEach(row=>{
                    row = ('0000'+row.toString()).substring(row.toString().length);
                    row = row.substring(0,2) + ':' + row.substring(2);
                    this.hourLabels.push(row);
                });
            }
        },
        async drawchartWeek(){
            let res = await this.getSalesOtw(new Date());
            if (res.data.success){
                let data = res.data.data;
                let dows = [];
                let date = new Date();
                let curDay = date.getDay();
                let day = 0;
                let period = 7;
                let startDate = curDay - period;
                if(startDate < 0) {
                    for(let i=(period+startDate)+1;i<=period;i++){
                        dows.push(i);
                    }
                    let lastweek = new Date();
                    lastweek.setDate(lastweek.getDate()-7);
                    let rspn = await this.getSalesOtw(new Date());
                    if (rspn.data.success){
                        let lastData = rspn.data.data;
                        lastData.forEach(row => {
                            day = row._id;
                            dows.forEach((dow, i) => {
                                if (day == dow) {
                                    if(this.dayValue[i] == undefined) {
                                        this.dayValue.push(i)
                                    }
                                    this.dayValue[i] += row.total;
                                }else{
                                    if(this.dayValue[i] == undefined) {
                                        this.dayValue.push(i)
                                    }
                                }
                            });
                        });
                        if(lastData.length == 0){
                            for(let i=0;i<dows.length;i++){
                                this.dayValue.push(0)
                            }
                        }
                    }
                    let limit = period-dows.length;
                    for(let i=1;i<=limit;i++){
                        dows.push(i);
                    }
                }else{
                    for(let i=1;i<=period;i++){
                        dows.push(i);
                    }
                }
                data.forEach(row=>{
                    day = row._id;
                    dows.forEach((dow, i) => {
                        if (day == dow) {
                            if(this.dayValue[i] == undefined) {
                                this.dayValue.push(i)
                            }
                            this.dayValue[i] += row.total;
                        }else{
                            if(this.dayValue[i] == undefined) {
                                this.dayValue.push(i)
                            }
                        }
                    });
                });
                if(data.length == 0){
                    for(let i=this.dayValue.length;i<dows.length;i++){
                        this.dayValue.push(0)
                    }
                }
                //redraw hour label 
                dows.forEach(dow=>{
                    dow = this.getDayName(dow);
                    this.dayLabels.push(dow);
                });
            }
        },
        nFormatter: function (num, digits) {
            var si = [
                { value: 1, symbol: "" },
                { value: 1E3, symbol: "K" },
                { value: 1E6, symbol: "M" },
                { value: 1E9, symbol: "G" },
                { value: 1E12, symbol: "T" },
                { value: 1E15, symbol: "P" },
                { value: 1E18, symbol: "E" }
            ];
            var rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
            var i;
            for (i = si.length - 1; i > 0; i--) {
                if (Math.abs(num) >= si[i].value) {
                break;
                }
            }
            return (num / si[i].value).toFixed(digits).replace(rx, "$1") + si[i].symbol;
        },
        getDayName(day){
            let days = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];
            let dayname = days[day-1];
            return dayname;
        }
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
        res = await this.getLastUpdateSales();
        if(res.data.success){
            this.sales.lastUpdated = res.data.date;
        }
    },
    async created() {
        await this.drawchartTime();
        this.optChartTime = {
            xaxis: {
                categories : this.hourLabels
            },
            yaxis: {
                labels: {
                    formatter:(value) => { 
                        return this.nFormatter(value,0)
                    }
                }
            }
        }
        this.srsChartTime.push({
            name: 'Sales',
            data: this.hourValue
        });
        await this.drawchartWeek();
        this.optChartWeek = {
            xaxis: {
                categories : this.dayLabels
            },
            yaxis: {
                labels: {
                    formatter:(value) => { 
                        return this.nFormatter(value,0)
                    }
                }
            }
        }
        this.srsChartWeek.push({
            name: 'Sales',
            data: this.dayValue
        });
    }
  }
</script>

<style>
  .small {
    width: 500px;
    max-height: 80px;
  }
</style>