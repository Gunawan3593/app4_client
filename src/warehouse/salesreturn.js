import axios from 'axios';
import base from '../warehouse/base';
const apiPath = process.env.VUE_APP_API_PATH;

const state = {
    status : ''
}

const getters = {
    salesReturnStatus: state => state.status
}

const actions = {
    // Generate Code
    async getSrNo({ commit }){
        try {
            commit('salesReturn_request');
            let res = await axios.get(apiPath+'/api/sales/returns/getcode');
            if (res.data.success) {
                commit('salesReturn_success', res);
            }else{
                return commit('salesReturn_error',res);
            }
            return res;
        }catch(err){
            commit('salesReturn_Api_error',err);
        }
    },
    // Get Data
    async getSalesReturn({ commit },id){
        let data = '';
        if(id != undefined) {
            data = '/'+id;
        }
        try {
            commit('salesReturn_request');
            let res = await axios.get(apiPath+'/api/sales/returns/data'+data);
            if (res.data.success) {
                commit('salesReturn_success', res);
            }else{
                return commit('salesReturn_error',res);
            }
            return res;
        }catch(err){
            commit('salesReturn_Api_error',err);
        }
    },
    // Get Items
    async getSrItem ({ commit }, data) {
        try {
            commit('salesReturn_request');
            let res = await axios.post(apiPath+'/api/sales/returns/item', data);
            if (res.data.success !== undefined) {
                commit('salesReturn_success', res);
            }else{
                return commit('salesReturn_error',res);
            }
            return res;
        }catch(err){
            return commit('salesReturn_Api_error',err);
        }
    },
    // Add Data
    async addSalesReturn({ commit }, data) {
        try {
            commit('salesReturn_request');
            let res = await axios.post(apiPath+'/api/sales/returns/add', data);
            if (res.data.success !== undefined) {
                commit('salesReturn_success', res);
            }else{
                return commit('salesReturn_error',res);
            }
            return res;
        }catch(err){
            return commit('salesReturn_Api_error',err);
        }
    },
    // Update Data
    async updateSalesReturn({ commit }, data) {
        try {
            commit('salesReturn_request');
            let res = await axios.post(apiPath+'/api/sales/returns/update', data);
            if (res.data.success !== undefined) {
                commit('salesReturn_success', res);
            }else{
                return commit('salesReturn_error',res);
            }
            return res;
        }catch(err){
            commit('salesReturn_Api_error',err);
        }
    },
    // Void Data
    async voidSalesReturn({ commit }, data) {
        try {
            commit('salesReturn_request');
            let res = await axios.post(apiPath+'/api/sales/returns/void', data);
            if (res.data.success !== undefined) {
                commit('salesReturn_success', res);
            }else{
                return commit('salesReturn_error',res);
            }
            return res;
        }catch(err){
            commit('salesReturn_Api_error',err);
        }
    },
    // Close Data
    async closeSalesReturn({ commit }, data) {
        try {
            commit('salesReturn_request');
            let res = await axios.post(apiPath+'/api/sales/returns/close', data);
            if (res.data.success !== undefined) {
                commit('salesReturn_success', res);
            }else{
                return commit('salesReturn_error',res);
            }
            return res;
        }catch(err){
            commit('salesReturn_Api_error',err);
        }
    },
    // Open Order 
    async openSalesReturn({ commit }, data) {
        try {
            commit('salesReturn_request');
            let res = await axios.post(apiPath+'/api/sales/returns/open', data);
            if (res.data.success !== undefined) {
                commit('salesReturn_success', res);
            }else{
                return commit('salesReturn_error',res);
            }
            return res;
        }catch(err){
            commit('salesReturn_Api_error',err);
        }
    }
}

const mutations = {
    salesReturn_request(state){
        state.status = 'loading'
    },
    salesReturn_success(state, res){
        state.status = 'success'
        base.state.alert = {
            snackbar : true,
            color : 'success',
            msg : res.data.msg
        }
    },
    salesReturn_error(state, res){
        state.status = 'error'
        base.state.alert = {
            snackbar : true,
            color : 'error',
            msg : res.data.msg
        }
    },
    salesReturn_Api_error(state, err) {
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