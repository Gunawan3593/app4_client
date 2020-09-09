import axios from 'axios';
import base from '../warehouse/base';
const apiPath = process.env.VUE_APP_API_PATH;

const state = {
    status : ''
}

const getters = {
    salesOrderStatus: state => state.status
}

const actions = {
    // Generate Code
    async getSoNo({ commit }){
        try {
            commit('salesOrder_request');
            let res = await axios.get(apiPath+'/api/sales/orders/getcode');
            if (res.data.success) {
                commit('salesOrder_success', res);
            }else{
                return commit('salesOrder_error',res);
            }
            return res;
        }catch(err){
            commit('salesOrder_Api_error',err);
        }
    },
    // Get Data
    async getSalesOrder({ commit },id){
        let data = '';
        if(id != undefined) {
            data = '/'+id;
        }
        try {
            commit('salesOrder_request');
            let res = await axios.get(apiPath+'/api/sales/orders/data'+data);
            if (res.data.success) {
                commit('salesOrder_success', res);
            }else{
                return commit('salesOrder_error',res);
            }
            return res;
        }catch(err){
            commit('salesOrder_Api_error',err);
        }
    },
    // Get Data Order Receivable by customer
    async getSoDelivable({ commit },id){
        let data = '';
        if(id != undefined) {
            data = '/'+id;
        }
        try {
            commit('salesOrder_request');
            let res = await axios.get(apiPath+'/api/sales/orders/delivable'+data);
            if (res.data.success) {
                commit('salesOrder_success', res);
            }else{
                return commit('salesOrder_error',res);
            }
            return res;
        }catch(err){
            commit('salesOrder_Api_error',err);
        }
    },
    // Get Items
    async getSoItem ({ commit }, data) {
        try {
            commit('salesOrder_request');
            let res = await axios.post(apiPath+'/api/sales/orders/item', data);
            if (res.data.success !== undefined) {
                commit('salesOrder_success', res);
            }else{
                return commit('salesOrder_error',res);
            }
            return res;
        }catch(err){
            return commit('salesOrder_Api_error',err);
        }
    },
    // Add Data
    async addSalesOrder({ commit }, data) {
        try {
            commit('salesOrder_request');
            let res = await axios.post(apiPath+'/api/sales/orders/add', data);
            if (res.data.success !== undefined) {
                commit('salesOrder_success', res);
            }else{
                return commit('salesOrder_error',res);
            }
            return res;
        }catch(err){
            return commit('salesOrder_Api_error',err);
        }
    },
    // Update Data
    async updateSalesOrder({ commit }, data) {
        try {
            commit('salesOrder_request');
            let res = await axios.post(apiPath+'/api/sales/orders/update', data);
            if (res.data.success !== undefined) {
                commit('salesOrder_success', res);
            }else{
                return commit('salesOrder_error',res);
            }
            return res;
        }catch(err){
            commit('salesOrder_Api_error',err);
        }
    },
    // Void Data
    async voidSalesOrder({ commit }, data) {
        try {
            commit('salesOrder_request');
            let res = await axios.post(apiPath+'/api/sales/orders/void', data);
            if (res.data.success !== undefined) {
                commit('salesOrder_success', res);
            }else{
                return commit('salesOrder_error',res);
            }
            return res;
        }catch(err){
            commit('salesOrder_Api_error',err);
        }
    },
    // Close Data
    async closeSalesOrder({ commit }, data) {
        try {
            commit('salesOrder_request');
            let res = await axios.post(apiPath+'/api/sales/orders/close', data);
            if (res.data.success !== undefined) {
                commit('salesOrder_success', res);
            }else{
                return commit('salesOrder_error',res);
            }
            return res;
        }catch(err){
            commit('salesOrder_Api_error',err);
        }
    },
    // Open Order 
    async openSalesOrder({ commit }, data) {
        try {
            commit('salesOrder_request');
            let res = await axios.post(apiPath+'/api/sales/orders/open', data);
            if (res.data.success !== undefined) {
                commit('salesOrder_success', res);
            }else{
                return commit('salesOrder_error',res);
            }
            return res;
        }catch(err){
            commit('salesOrder_Api_error',err);
        }
    }
}

const mutations = {
    salesOrder_request(state){
        state.status = 'loading'
    },
    salesOrder_success(state, res){
        state.status = 'success'
        base.state.alert = {
            snackbar : true,
            color : 'success',
            msg : res.data.msg
        }
    },
    salesOrder_error(state, res){
        state.status = 'error'
        base.state.alert = {
            snackbar : true,
            color : 'error',
            msg : res.data.msg
        }
    },
    salesOrder_Api_error(state, err) {
        state.status = 'APi error'
        base.state.alert = {
            snackbar : true,
            color : 'error',
            msg : err.response.data.msg
        }
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}