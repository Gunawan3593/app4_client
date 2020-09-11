import axios from 'axios';
import base from '../warehouse/base';
const apiPath = process.env.VUE_APP_API_PATH;

const state = {
    status : ''
}

const getters = {
    supplierStatus: state => state.status
}

const actions = {
    // Get Data
    async getSupplier({ commit }){
        try {
            commit('supplier_request');
            let res = await axios.get(apiPath+'/api/suppliers');
            if (res.data.success) {
                commit('supplier_success', res);
            }
            return res;
        }catch(err){
            commit('supplier_error',err);
        }
    },
    // Add Data
    async addSupplier({ commit }, data) {
        try {
            commit('supplier_request');
            let res = await axios.post(apiPath+'/api/suppliers/add', data);
            if (res.data.success !== undefined) {
                commit('supplier_success', res);
            }
            return res;
        }catch(err){
            commit('supplier_error',err);
        }
    },
    // Update Data
    async updateSupplier({ commit }, data) {
        try {
            commit('supplier_request');
            let res = await axios.post(apiPath+'/api/suppliers/update', data);
            if (res.data.success !== undefined) {
                commit('supplier_success', res);
            }
            return res;
        }catch(err){
            commit('supplier_error',err);
        }
    },
    // Delete Data
    async deleteSupplier({ commit }, data) {
        try {
            commit('supplier_request');
            let res = await axios.post(apiPath+'/api/suppliers/delete', data);
            if (res.data.success !== undefined) {
                commit('supplier_success', res);
            }
            return res;
        }catch(err){
            commit('supplier_error',err);
        }
    }
}

const mutations = {
    supplier_request(state){
        state.status = 'loading'
    },
    supplier_success(state, res){
        state.status = 'success'
        base.state.alert = {
            snackbar : true,
            color : 'success',
            msg : res.data.msg
        }
    },
    supplier_error(state, err){
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