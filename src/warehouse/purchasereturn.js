import axios from 'axios';
import base from '../warehouse/base';
import { publicPath } from '../../vue.config';

const state = {
    status : ''
}

const getters = {
    purchaseReturnStatus: state => state.status
}

const actions = {
    // Generate Code
    async getRtNo({ commit }){
        try {
            commit('purchaseReturn_request');
            let res = await axios.get(publicPath+'/api/purchase/returns/getcode');
            if (res.data.success) {
                commit('purchaseReturn_success', res);
            }else{
                return commit('purchaseReturn_error',res);
            }
            return res;
        }catch(err){
            commit('purchaseReturn_Api_error',err);
        }
    },
    // Get Data
    async getPurchaseReturn({ commit },id){
        let data = '';
        if(id != undefined) {
            data = '/'+id;
        }
        try {
            commit('purchaseReturn_request');
            let res = await axios.get(publicPath+'/api/purchase/returns/data'+data);
            if (res.data.success) {
                commit('purchaseReturn_success', res);
            }else{
                return commit('purchaseReturn_error',res);
            }
            return res;
        }catch(err){
            commit('purchaseReturn_Api_error',err);
        }
    },
    // Get Items
    async getRtItem ({ commit }, data) {
        try {
            commit('purchaseReturn_request');
            let res = await axios.post(publicPath+'/api/purchase/returns/item', data);
            if (res.data.success !== undefined) {
                commit('purchaseReturn_success', res);
            }else{
                return commit('purchaseReturn_error',res);
            }
            return res;
        }catch(err){
            return commit('purchaseReturn_Api_error',err);
        }
    },
    // Add Data
    async addPurchaseReturn({ commit }, data) {
        try {
            commit('purchaseReturn_request');
            let res = await axios.post(publicPath+'/api/purchase/returns/add', data);
            if (res.data.success !== undefined) {
                commit('purchaseReturn_success', res);
            }else{
                return commit('purchaseReturn_error',res);
            }
            return res;
        }catch(err){
            return commit('purchaseReturn_Api_error',err);
        }
    },
    // Update Data
    async updatePurchaseReturn({ commit }, data) {
        try {
            commit('purchaseReturn_request');
            let res = await axios.post(publicPath+'/api/purchase/returns/update', data);
            if (res.data.success !== undefined) {
                commit('purchaseReturn_success', res);
            }else{
                return commit('purchaseReturn_error',res);
            }
            return res;
        }catch(err){
            commit('purchaseReturn_Api_error',err);
        }
    },
    // Void Data
    async voidPurchaseReturn({ commit }, data) {
        try {
            commit('purchaseReturn_request');
            let res = await axios.post(publicPath+'/api/purchase/returns/void', data);
            if (res.data.success !== undefined) {
                commit('purchaseReturn_success', res);
            }else{
                return commit('purchaseReturn_error',res);
            }
            return res;
        }catch(err){
            commit('purchaseReturn_Api_error',err);
        }
    },
    // Close Data
    async closePurchaseReturn({ commit }, data) {
        try {
            commit('purchaseReturn_request');
            let res = await axios.post(publicPath+'/api/purchase/returns/close', data);
            if (res.data.success !== undefined) {
                commit('purchaseReturn_success', res);
            }else{
                return commit('purchaseReturn_error',res);
            }
            return res;
        }catch(err){
            commit('purchaseReturn_Api_error',err);
        }
    },
    // Open Order 
    async openPurchaseReturn({ commit }, data) {
        try {
            commit('purchaseReturn_request');
            let res = await axios.post(publicPath+'/api/purchase/returns/open', data);
            if (res.data.success !== undefined) {
                commit('purchaseReturn_success', res);
            }else{
                return commit('purchaseReturn_error',res);
            }
            return res;
        }catch(err){
            commit('purchaseReturn_Api_error',err);
        }
    }
}

const mutations = {
    purchaseReturn_request(state){
        state.status = 'loading'
    },
    purchaseReturn_success(state, res){
        state.status = 'success'
        base.state.alert = {
            snackbar : true,
            color : 'success',
            msg : res.data.msg
        }
    },
    purchaseReturn_error(state, res){
        state.status = 'error'
        base.state.alert = {
            snackbar : true,
            color : 'error',
            msg : res.data.msg
        }
    },
    purchaseReturn_Api_error(state, err) {
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