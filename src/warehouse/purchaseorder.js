import axios from 'axios';
import base from '../warehouse/base';
import { publicPath } from '../../vue.config';

const state = {
    status : ''
}

const getters = {
    purchaseOrderStatus: state => state.status
}

const actions = {
    // Generate Code
    async getPoNo({ commit }){
        try {
            commit('purchaseOrder_request');
            let res = await axios.get(publicPath+'/api/purchase/orders/getcode');
            if (res.data.success) {
                commit('purchaseOrder_success', res);
            }else{
                return commit('purchaseOrder_error',res);
            }
            return res;
        }catch(err){
            commit('purchaseOrder_Api_error',err);
        }
    },
    // Get Data
    async getPurchaseOrder({ commit },id){
        let data = '';
        if(id != undefined) {
            data = '/'+id;
        }
        try {
            commit('purchaseOrder_request');
            let res = await axios.get(publicPath+'/api/purchase/orders/data'+data);
            if (res.data.success) {
                commit('purchaseOrder_success', res);
            }else{
                return commit('purchaseOrder_error',res);
            }
            return res;
        }catch(err){
            commit('purchaseOrder_Api_error',err);
        }
    },
    // Get Data Order Receivable by supplier
    async getPOReceivable({ commit },id){
        let data = '';
        if(id != undefined) {
            data = '/'+id;
        }
        try {
            commit('purchaseOrder_request');
            let res = await axios.get(publicPath+'/api/purchase/orders/receivable'+data);
            if (res.data.success) {
                commit('purchaseOrder_success', res);
            }else{
                return commit('purchaseOrder_error',res);
            }
            return res;
        }catch(err){
            commit('purchaseOrder_Api_error',err);
        }
    },
    // Get Items
    async getPoItem ({ commit }, data) {
        try {
            commit('purchaseOrder_request');
            let res = await axios.post(publicPath+'/api/purchase/orders/item', data);
            if (res.data.success !== undefined) {
                commit('purchaseOrder_success', res);
            }else{
                return commit('purchaseOrder_error',res);
            }
            return res;
        }catch(err){
            return commit('purchaseOrder_Api_error',err);
        }
    },
    // Add Data
    async addPurchaseOrder({ commit }, data) {
        try {
            commit('purchaseOrder_request');
            let res = await axios.post(publicPath+'/api/purchase/orders/add', data);
            if (res.data.success !== undefined) {
                commit('purchaseOrder_success', res);
            }else{
                return commit('purchaseOrder_error',res);
            }
            return res;
        }catch(err){
            return commit('purchaseOrder_Api_error',err);
        }
    },
    // Update Data
    async updatePurchaseOrder({ commit }, data) {
        try {
            commit('purchaseOrder_request');
            let res = await axios.post(publicPath+'/api/purchase/orders/update', data);
            if (res.data.success !== undefined) {
                commit('purchaseOrder_success', res);
            }else{
                return commit('purchaseOrder_error',res);
            }
            return res;
        }catch(err){
            commit('purchaseOrder_Api_error',err);
        }
    },
    // Void Data
    async voidPurchaseOrder({ commit }, data) {
        try {
            commit('purchaseOrder_request');
            let res = await axios.post(publicPath+'/api/purchase/orders/void', data);
            if (res.data.success !== undefined) {
                commit('purchaseOrder_success', res);
            }else{
                return commit('purchaseOrder_error',res);
            }
            return res;
        }catch(err){
            commit('purchaseOrder_Api_error',err);
        }
    },
    // Close Data
    async closePurchaseOrder({ commit }, data) {
        try {
            commit('purchaseOrder_request');
            let res = await axios.post(publicPath+'/api/purchase/orders/close', data);
            if (res.data.success !== undefined) {
                commit('purchaseOrder_success', res);
            }else{
                return commit('purchaseOrder_error',res);
            }
            return res;
        }catch(err){
            commit('purchaseOrder_Api_error',err);
        }
    },
    // Open Order 
    async openPurchaseOrder({ commit }, data) {
        try {
            commit('purchaseOrder_request');
            let res = await axios.post(publicPath+'/api/purchase/orders/open', data);
            if (res.data.success !== undefined) {
                commit('purchaseOrder_success', res);
            }else{
                return commit('purchaseOrder_error',res);
            }
            return res;
        }catch(err){
            commit('purchaseOrder_Api_error',err);
        }
    }
}

const mutations = {
    purchaseOrder_request(state){
        state.status = 'loading'
    },
    purchaseOrder_success(state, res){
        state.status = 'success'
        base.state.alert = {
            snackbar : true,
            color : 'success',
            msg : res.data.msg
        }
    },
    purchaseOrder_error(state, res){
        state.status = 'error'
        base.state.alert = {
            snackbar : true,
            color : 'error',
            msg : res.data.msg
        }
    },
    purchaseOrder_Api_error(state, err) {
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