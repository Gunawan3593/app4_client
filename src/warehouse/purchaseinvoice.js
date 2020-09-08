import axios from 'axios';
import base from '../warehouse/base';

const state = {
    status : ''
}

const getters = {
    purchaseIvoiceStatus: state => state.status
}

const actions = {
    // Generate Purchase Invoice
    async genPurchaseInvoice({ commit }, data){
        try {
            commit('purchaseInvoice_request');
            let res = await axios.post('http://localhost:5000/api/purchase/invoices/generate', data);
            if (res.data.success) {
                commit('purchaseInvoice_success', res);
            }else{
                return commit('purchaseInvoice_error',res);
            }
            return res;
        }catch(err){
            commit('purchaseInvoice_Api_error',err);
        }
    },
    // Get Data
    async getPurchaseInvoice({ commit },id){
        let data = '';
        if(id != undefined) {
            data = '/'+id;
        }
        try {
            commit('purchaseInvoice_request');
            let res = await axios.get('http://localhost:5000/api/purchase/invoices/data'+data);
            if (res.data.success) {
                commit('purchaseInvoice_success', res);
            }else{
                return commit('purchaseInvoice_error',res);
            }
            return res;
        }catch(err){
            commit('purchaseInvoice_Api_error',err);
        }
    },
    // Get Data Invoice Returnable by supplier
    async getInvoiceReturnable({ commit },id){
        let data = '';
        if(id != undefined) {
            data = '/'+id;
        }
        try {
            commit('purchaseInvoice_request');
            let res = await axios.get('http://localhost:5000/api/purchase/invoices/returnable'+data);
            if (res.data.success) {
                commit('purchaseInvoice_success', res);
            }else{
                return commit('purchaseInvoice_error',res);
            }
            return res;
        }catch(err){
            commit('purchaseInvoice_Api_error',err);
        }
    },
    // Get Items
    async getPiItem ({ commit }, data) {
        try {
            commit('purchaseInvoice_request');
            let res = await axios.post('http://localhost:5000/api/purchase/invoices/item', data);
            if (res.data.success !== undefined) {
                commit('purchaseInvoice_success', res);
            }else{
                return commit('purchaseInvoice_error',res);
            }
            return res;
        }catch(err){
            return commit('purchaseInvoice_Api_error',err);
        }
    },
    // Add Data
    async addPurchaseInvoice({ commit }, data) {
        try {
            commit('purchaseInvoice_request');
            let res = await axios.post('http://localhost:5000/api/purchase/invoices/add', data);
            if (res.data.success !== undefined) {
                commit('purchaseInvoice_success', res);
            }else{
                return commit('purchaseInvoice_error',res);
            }
            return res;
        }catch(err){
            return commit('purchaseInvoice_Api_error',err);
        }
    },
    // Update Data
    async updatePurchaseInvoice({ commit }, data) {
        try {
            commit('purchaseInvoice_request');
            let res = await axios.post('http://localhost:5000/api/purchase/invoices/update', data);
            if (res.data.success !== undefined) {
                commit('purchaseInvoice_success', res);
            }else{
                return commit('purchaseInvoice_error',res);
            }
            return res;
        }catch(err){
            commit('purchaseInvoice_Api_error',err);
        }
    },
    // Void Data
    async voidPurchaseInvoice({ commit }, data) {
        try {
            commit('purchaseInvoice_request');
            let res = await axios.post('http://localhost:5000/api/purchase/invoices/void', data);
            if (res.data.success !== undefined) {
                commit('purchaseInvoice_success', res);
            }else{
                return commit('purchaseInvoice_error',res);
            }
            return res;
        }catch(err){
            commit('purchaseInvoice_Api_error',err);
        }
    },
    // Close Data
    async closePurchaseInvoice({ commit }, data) {
        try {
            commit('purchaseInvoice_request');
            let res = await axios.post('http://localhost:5000/api/purchase/invoices/close', data);
            if (res.data.success !== undefined) {
                commit('purchaseInvoice_success', res);
            }else{
                return commit('purchaseInvoice_error',res);
            }
            return res;
        }catch(err){
            commit('purchaseInvoice_Api_error',err);
        }
    },
    // Open Order 
    async openPurchaseInvoice({ commit }, data) {
        try {
            commit('purchaseInvoice_request');
            let res = await axios.post('http://localhost:5000/api/purchase/invoices/open', data);
            if (res.data.success !== undefined) {
                commit('purchaseInvoice_success', res);
            }else{
                return commit('purchaseInvoice_error',res);
            }
            return res;
        }catch(err){
            commit('purchaseInvoice_Api_error',err);
        }
    }
}

const mutations = {
    purchaseInvoice_request(state){
        state.status = 'loading'
    },
    purchaseInvoice_success(state, res){
        state.status = 'success'
        base.state.alert = {
            snackbar : true,
            color : 'success',
            msg : res.data.msg
        }
    },
    purchaseInvoice_error(state, res){
        state.status = 'error'
        base.state.alert = {
            snackbar : true,
            color : 'error',
            msg : res.data.msg
        }
    },
    purchaseInvoice_Api_error(state, err) {
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