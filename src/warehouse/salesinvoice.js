import axios from 'axios';
import base from '../warehouse/base';
const apiPath = process.env.VUE_APP_API_PATH;

const state = {
    status : ''
}

const getters = {
    salesInvoiceStatus: state => state.status
}

const actions = {
    // Generate Sales Invoice
    async genSalesInvoice({ commit }, data){
        try {
            commit('salesInvoice_request');
            let res = await axios.post(apiPath+'/api/sales/invoices/generate', data);
            if (res.data.success) {
                commit('salesInvoice_success', res);
            }else{
                return commit('salesInvoice_error',res);
            }
            return res;
        }catch(err){
            commit('salesInvoice_Api_error',err);
        }
    },
    // Get Data
    async getSalesInvoice({ commit },id){
        let data = '';
        if(id != undefined) {
            data = '/'+id;
        }
        try {
            commit('salesInvoice_request');
            let res = await axios.get(apiPath+'/api/sales/invoices/data'+data);
            if (res.data.success) {
                commit('salesInvoice_success', res);
            }else{
                return commit('salesInvoice_error',res);
            }
            return res;
        }catch(err){
            commit('salesInvoice_Api_error',err);
        }
    },
    // Get Data Invoice Returnable by supplier
    async getSalesInvoiceReturnable({ commit },id){
        let data = '';
        if(id != undefined) {
            data = '/'+id;
        }
        try {
            commit('salesInvoice_request');
            let res = await axios.get(apiPath+'/api/sales/invoices/returnable'+data);
            if (res.data.success) {
                commit('salesInvoice_success', res);
            }else{
                return commit('salesInvoice_error',res);
            }
            return res;
        }catch(err){
            commit('salesInvoice_Api_error',err);
        }
    },
    // Get Items
    async getSiItem ({ commit }, data) {
        try {
            commit('salesInvoice_request');
            let res = await axios.post(apiPath+'/api/sales/invoices/item', data);
            if (res.data.success !== undefined) {
                commit('salesInvoice_success', res);
            }else{
                return commit('salesInvoice_error',res);
            }
            return res;
        }catch(err){
            return commit('salesInvoice_Api_error',err);
        }
    },
    // Add Data
    async addSalesInvoice({ commit }, data) {
        try {
            commit('salesInvoice_request');
            let res = await axios.post(apiPath+'/api/sales/invoices/add', data);
            if (res.data.success !== undefined) {
                commit('salesInvoice_success', res);
            }else{
                return commit('salesInvoice_error',res);
            }
            return res;
        }catch(err){
            return commit('salesInvoice_Api_error',err);
        }
    },
    // Update Data
    async updateSalesInvoice({ commit }, data) {
        try {
            commit('salesInvoice_request');
            let res = await axios.post(apiPath+'/api/sales/invoices/update', data);
            if (res.data.success !== undefined) {
                commit('salesInvoice_success', res);
            }else{
                return commit('salesInvoice_error',res);
            }
            return res;
        }catch(err){
            commit('salesInvoice_Api_error',err);
        }
    },
    // Void Data
    async voidSalesInvoice({ commit }, data) {
        try {
            commit('salesInvoice_request');
            let res = await axios.post(apiPath+'/api/sales/invoices/void', data);
            if (res.data.success !== undefined) {
                commit('salesInvoice_success', res);
            }else{
                return commit('salesInvoice_error',res);
            }
            return res;
        }catch(err){
            commit('salesInvoice_Api_error',err);
        }
    },
    // Close Data
    async closeSalesInvoice({ commit }, data) {
        try {
            commit('salesInvoice_request');
            let res = await axios.post(apiPath+'/api/sales/invoices/close', data);
            if (res.data.success !== undefined) {
                commit('salesInvoice_success', res);
            }else{
                return commit('salesInvoice_error',res);
            }
            return res;
        }catch(err){
            commit('salesInvoice_Api_error',err);
        }
    },
    // Open Order 
    async openSalesInvoice({ commit }, data) {
        try {
            commit('salesInvoice_request');
            let res = await axios.post(apiPath+'/api/sales/invoices/open', data);
            if (res.data.success !== undefined) {
                commit('salesInvoice_success', res);
            }else{
                return commit('salesInvoice_error',res);
            }
            return res;
        }catch(err){
            commit('salesInvoice_Api_error',err);
        }
    },
    // Get data sales by month and year
    async getSalesInvoiceByMonth({ commit }, data) {
        try {
            let date = new Date(data);
            let param = (date.getMonth()+1) +'/'+ date.getFullYear()
            commit('salesInvoice_request');
            let res = await axios.get(apiPath+'/api/sales/invoices/salesbymonth/'+param);
            if (res.data.success !== undefined) {
                commit('salesInvoice_success', res);
            }else{
                return commit('salesInvoice_error',res);
            }
            return res;
        }catch(err){
            commit('salesInvoice_Api_error',err);
        }
    },
    // Get top sell product by month and year
    async getTopSellProductByMonth({ commit }, data) {
        try {
            let date = new Date(data);
            let param = (date.getMonth()+1) +'/'+ date.getFullYear()
            commit('salesInvoice_request');
            let res = await axios.get(apiPath+'/api/sales/invoices/topsellproduct/'+param);
            if (res.data.success !== undefined) {
                commit('salesInvoice_success', res);
            }else{
                return commit('salesInvoice_error',res);
            }
            return res;
        }catch(err){
            commit('salesInvoice_Api_error',err);
        }
    },
    // Get sales by time with date
    async getSalesByTime({ commit }, data) {
        try {
            let date = new Date(data).toISOString().slice(0,10);
            commit('salesInvoice_request');
            let res = await axios.get(apiPath+'/api/sales/invoices/salesbytime/'+date);
            if (res.data.success !== undefined) {
                commit('salesInvoice_success', res);
            }else{
                return commit('salesInvoice_error',res);
            }
            return res;
        }catch(err){
            commit('salesInvoice_Api_error',err);
        }
    }

}

const mutations = {
    salesInvoice_request(state){
        state.status = 'loading'
    },
    salesInvoice_success(state, res){
        state.status = 'success'
        base.state.alert = {
            snackbar : true,
            color : 'success',
            msg : res.data.msg
        }
    },
    salesInvoice_error(state, res){
        state.status = 'error'
        base.state.alert = {
            snackbar : true,
            color : 'error',
            msg : res.data.msg
        }
    },
    salesInvoice_Api_error(state, err) {
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