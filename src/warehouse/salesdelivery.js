import axios from 'axios';
import base from '../warehouse/base';
const apiPath = process.env.VUE_APP_API_PATH;

const state = {
    status : ''
}

const getters = {
    salesDeliveryStatus: state => state.status
}

const actions = {
    // Generate Code
    async getSdNo({ commit }){
        try {
            commit('salesDelivery_request');
            let res = await axios.get(apiPath+'/api/sales/deliveries/getcode');
            if (res.data.success) {
                commit('salesDelivery_success', res);
            }else{
                return commit('salesDelivery_error',res);
            }
            return res;
        }catch(err){
            commit('salesDelivery_Api_error',err);
        }
    },
    // Get Data
    async getSalesDelivery({ commit },id){
        let data = '';
        if(id != undefined) {
            data = '/'+id;
        }
        try {
            commit('salesDelivery_request');
            let res = await axios.get(apiPath+'/api/sales/deliveries/data'+data);
            if (res.data.success) {
                commit('salesDelivery_success', res);
            }else{
                return commit('salesDelivery_error',res);
            }
            return res;
        }catch(err){
            commit('salesDelivery_Api_error',err);
        }
    },
    // Get Items
    async getSdItem ({ commit }, data) {
        try {
            commit('salesDelivery_request');
            let res = await axios.post(apiPath+'/api/sales/deliveries/item', data);
            if (res.data.success !== undefined) {
                commit('salesDelivery_success', res);
            }else{
                return commit('salesDelivery_error',res);
            }
            return res;
        }catch(err){
            return commit('salesDelivery_Api_error',err);
        }
    },
    // Add Data
    async addSalesDelivery({ commit }, data) {
        try {
            commit('salesDelivery_request');
            let res = await axios.post(apiPath+'/api/sales/deliveries/add', data);
            if (res.data.success !== undefined) {
                commit('salesDelivery_success', res);
            }else{
                return commit('salesDelivery_error',res);
            }
            return res;
        }catch(err){
            return commit('salesDelivery_Api_error',err);
        }
    },
    // Update Data
    async updateSalesDelivery({ commit }, data) {
        try {
            commit('salesDelivery_request');
            let res = await axios.post(apiPath+'/api/sales/deliveries/update', data);
            if (res.data.success !== undefined) {
                commit('salesDelivery_success', res);
            }else{
                return commit('salesDelivery_error',res);
            }
            return res;
        }catch(err){
            commit('salesDelivery_Api_error',err);
        }
    },
    // Void Data
    async voidSalesDelivery({ commit }, data) {
        try {
            commit('salesDelivery_request');
            let res = await axios.post(apiPath+'/api/sales/deliveries/void', data);
            if (res.data.success !== undefined) {
                commit('salesDelivery_success', res);
            }else{
                return commit('salesDelivery_error',res);
            }
            return res;
        }catch(err){
            commit('salesDelivery_Api_error',err);
        }
    }
}

const mutations = {
    salesDelivery_request(state){
        state.status = 'loading'
    },
    salesDelivery_success(state, res){
        state.status = 'success'
        base.state.alert = {
            snackbar : true,
            color : 'success',
            msg : res.data.msg
        }
    },
    salesDelivery_error(state, res){
        state.status = 'error'
        base.state.alert = {
            snackbar : true,
            color : 'error',
            msg : res.data.msg
        }
    },
    salesDelivery_Api_error(state, err) {
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