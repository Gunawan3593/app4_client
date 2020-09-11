<template>
  <v-row>
    <v-col cols="12" xs="12" md="12">
        <v-card
            class="mx-auto"
        >
            <v-card-text>
                <v-row>
                    <h2 class="ma-1">Sales Delivery Detail</h2>
                    <v-spacer></v-spacer>
                    <v-btn class="ma-1" v-if="status == 0" @click="voidData()" small color="error">Void</v-btn>
                    <v-btn class="ma-1" small color="primary" @click="Back()">Back</v-btn>
                </v-row>
            </v-card-text>
        </v-card>
    </v-col>
    <v-col cols="12" xs="12" md="6">
        <v-card
            class="mx-auto"
        >
            <v-card-text class="pa-0">
                <v-simple-table fixed-header dense>
                    <template v-slot:default>
                    <thead>
                        <tr>
                        <th class="text-left" width="100px"></th>
                        <th class="text-left" width="10px"></th>
                        <th class="text-left"></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>No.</td>
                            <td>:</td>
                            <td>{{ no }}</td>
                        </tr>
                        <tr>
                            <td>Date</td>
                            <td>:</td>
                            <td>{{ date }}</td>
                        </tr>
                        <tr>
                            <td>Supplier</td>
                            <td>:</td>
                            <td>{{ customer.name }}</td>
                        </tr>
                    </tbody>
                    </template>
                </v-simple-table>
            </v-card-text>
        </v-card>
    </v-col>
    <v-col cols="12" xs="12" md="6">
        <v-card
            class="mx-auto"
        >
            <v-card-text class="pa-0">
                <v-simple-table fixed-header dense> 
                    <template v-slot:default>
                    <thead>
                        <tr>
                        <th class="text-left" width="100px"></th>
                        <th class="text-left" width="10px"></th>
                        <th class="text-left"></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Notes</td>
                            <td>:</td>
                            <td>{{ notes }}</td>
                        </tr>
                        <tr>
                            <td>Status</td>
                            <td>:</td>
                            <td><v-chip
                                    v-if="status == 0"
                                    x-small
                                    class="ma-1"
                                    color="primary"
                                >
                                    Pending
                                </v-chip>
                                <v-chip
                                    v-if="status == 1"
                                    x-small
                                    class="ma-1"
                                    color="green"
                                    text-color="white"
                                >
                                    Done
                                </v-chip>
                                <v-chip
                                    v-if="status == 2"
                                    x-small
                                    class="ma-1"
                                    color="error"
                                >
                                    Void
                                </v-chip>
                            </td>
                        </tr>
                        <tr>
                            <td>Created by</td>
                            <td>:</td>
                            <td>{{ user.name }}</td>
                        </tr>
                    </tbody>
                    </template>
                </v-simple-table>
            </v-card-text>
        </v-card>
    </v-col>
    <v-col cols="12" xs="12" md="12">
        <v-card
            class="mx-auto"
        >
            <v-card-text class="pa-0">
                <v-simple-table fixed-header dense> 
                    <template v-slot:default>
                        <thead>
                            <tr>
                            <th class="text-center">Name</th>
                            <th class="text-center">Order</th>
                            <th class="text-center">Qty</th>
                            <th class="text-center">Price</th>
                            <th class="text-center">Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="item in items" :key="item.product">
                                <td>{{ item.name }}</td>
                                <td>{{ item.order_qty }}</td>
                                <td>{{ item.qty }}</td>
                                <td>{{ item.price | currency }}</td>
                                <td>{{ item.qty * item.price | currency }}</td>
                            </tr>
                            <tr>
                                <td class="text-center" colspan="4">Total</td>
                                <td>{{ getSubtotal | currency }}</td>
                            </tr>
                        </tbody>
                    </template>
                </v-simple-table>
            </v-card-text>
        </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { mapActions } from 'vuex';
export default {
    data(){
        return {
            id: '',
            no: '',
            date: '',
            customer: '',
            notes: '',
            status: '',
            user: '',
            items : [],
        }
    },
    methods: {
        ...mapActions(['getSalesDelivery','getSdItem','voidSalesDelivery']),
        getDateTime(date){
            const dates = new Date(date);
            const hours = dates.getHours().toString();
            const minutes = dates.getMinutes().toString();
            const seconds = dates.getSeconds().toString();
            let time = ('00'+hours).substring(hours.length) + ':' + ('00'+minutes).substring(minutes.length) + ':' + ('00'+seconds).substring(seconds.length);
            return dates.toISOString().slice(0,10) + ' ' + time;
        },
        getItem(id){
            let data = {
                delivery: id
            }
            this.getSdItem(data).then(res => {
                if(res.data.success) {
                    let items = res.data.data;
                    this.items = [];
                    items.forEach(item => {
                        item = {
                        name: item.product.name,
                        order_item: item.order_item._id,
                        product: item.product._id,
                        price: item.price,
                        order_qty: item.order_qty,
                        qty: item.qty
                        }
                        this.items.push(item);
                    });
                }
            });
        },
        async loadData(id) {
            let res = await this.getSalesDelivery(id);
            if (res != undefined) {
                let rspn = res.data.data;
                this.id = id;
                this.no = rspn.no;
                this.date = this.getDateTime(rspn.date);
                this.customer = rspn.customer;
                this.notes = rspn.notes;
                this.status = rspn.status;
                this.user = rspn.user;
                this.getItem(id);
            }
        },
        voidData(){
            let data = {
                id : this.id
            }
            this.voidSalesDelivery(data).then(res => {
                if(res.data.success){
                   this.loadData(this.id);
                }
            })
        },
        Back(){
            let page = this.$route.query.page;
            this.$router.push({ name: 'sdlist', params: { page : page }});
        }
    },
    created(){
        let id = this.$route.params.id;
        this.loadData(id);
    },
    computed: {
        getSubtotal() {
            let items = this.items;
            if (items.length == 0) return;
            let total = 0;
            for(var i=0;i<items.length;i++){
                total += items[i].qty * items[i].price;
            }
            return total;
        }
    }
}
</script>

<style scoped>
    table th + th { border-left:1px solid #dddddd; }
    table td + td { border-left:1px solid #dddddd; }
</style>