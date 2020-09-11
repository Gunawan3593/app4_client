import axios from 'axios';
import base from '../warehouse/base';
const apiPath = process.env.VUE_APP_API_PATH;

const state = {
    status : ''
}

const getters = {
    purchaseReceiptStatus: state => state.status
}

const actions = {
    // Generate Code
    async getPrNo({ commit }){
        try {
            commit('purchaseReceipt_request');
            let res = await axios.get(apiPath+'/api/purchase/receipts/getcode');
            if (res.data.success) {
                commit('purchaseReceipt_success', res);
            }else{
                return commit('purchaseReceipt_error',res);
            }
            return res;
        }catch(err){
            commit('purchaseReceipt_Api_error',err);
        }
    },
    // Get Data
    async getPurchaseReceipt({ commit },id){
        let data = '';
        if(id != undefined) {
            data = '/'+id;
        }
        try {
            commit('purchaseReceipt_request');
            let res = await axios.get(apiPath+'/api/purchase/receipts/data'+data);
            if (res.data.success) {
                commit('purchaseReceipt_success', res);
            }else{
                return commit('purchaseReceipt_error',res);
            }
            return res;
        }catch(err){
            commit('purchaseReceipt_Api_error',err);
        }
    },
    // Get Items
    async getPrItem ({ commit }, data) {
        try {
            commit('purchaseReceipt_request');
            let res = await axios.post(apiPath+'/api/purchase/receipts/item', data);
            if (res.data.success !== undefined) {
                commit('purchaseReceipt_success', res);
            }else{
                return commit('purchaseReceipt_error',res);
            }
            return res;
        }catch(err){
            return commit('purchaseReceipt_Api_error',err);
        }
    },
    // Add Data
    async addPurchaseReceipt({ commit }, data) {
        try {
            commit('purchaseReceipt_request');
            let res = await axios.post(apiPath+'/api/purchase/receipts/add', data);
            if (res.data.success !== undefined) {
                commit('purchaseReceipt_success', res);
            }else{
                return commit('purchaseReceipt_error',res);
            }
            return res;
        }catch(err){
            return commit('purchaseReceipt_Api_error',err);
        }
    },
    // Update Data
    async updatePurchaseReceipt({ commit }, data) {
        try {
            commit('purchaseReceipt_request');
            let res = await axios.post(apiPath+'/api/purchase/receipts/update', data);
            if (res.data.success !== undefined) {
                commit('purchaseReceipt_success', res);
            }else{
                return commit('purchaseReceipt_error',res);
            }
            return res;
        }catch(err){
            commit('purchaseReceipt_Api_error',err);
        }
    },
    // Void Data
    async voidPurchaseReceipt({ commit }, data) {
        try {
            commit('purchaseReceipt_request');
            let res = await axios.post(apiPath+'/api/purchase/receipts/void', data);
            if (res.data.success !== undefined) {
                commit('purchaseReceipt_success', res);
            }else{
                return commit('purchaseReceipt_error',res);
            }
            return res;
        }catch(err){
            commit('purchaseReceipt_Api_error',err);
        }
    }
}

const mutations = {
    purchaseReceipt_request(state){
        state.status = 'loading'
    },
    purchaseReceipt_success(state, res){
        state.status = 'success'
        base.state.alert = {
            snackbar : true,
            color : 'success',
            msg : res.data.msg
        }
    },
    purchaseReceipt_error(state, res){
        state.status = 'error'
        base.state.alert = {
            snackbar : true,
            color : 'error',
            msg : res.data.msg
        }
    },
    purchaseReceipt_Api_error(state, err) {
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