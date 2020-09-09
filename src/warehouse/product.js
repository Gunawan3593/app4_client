import axios from 'axios';
import base from '../warehouse/base';
const apiPath = process.env.VUE_APP_API_PATH;

const state = {
    status : ''
}

const getters = {
    productStatus: state => state.status
}

const actions = {
    // Get Data
    async getProduct({ commit }){
        try {
            commit('product_request');
            let res = await axios.get(apiPath+'/api/products');
            if (res.data.success) {
                commit('product_success', res);
            }
            return res;
        }catch(err){
            commit('product_error',err);
        }
    },
    // Add Data
    async addProduct({ commit }, data) {
        try {
            commit('product_request');
            let res = await axios.post(apiPath+'/api/products/add', data);
            if (res.data.success !== undefined) {
                commit('product_success', res);
            }
            return res;
        }catch(err){
            commit('product_error',err);
        }
    },
    // Update Data
    async updateProduct({ commit }, data) {
        try {
            commit('product_request');
            let res = await axios.post(apiPath+'/api/products/update', data);
            if (res.data.success !== undefined) {
                commit('product_success', res);
            }
            return res;
        }catch(err){
            commit('product_error',err);
        }
    },
    // Delete Data
    async deleteProduct({ commit }, data) {
        try {
            commit('product_request');
            let res = await axios.post(apiPath+'/api/products/delete', data);
            if (res.data.success !== undefined) {
                commit('product_success', res);
            }
            return res;
        }catch(err){
            commit('product_error',err);
        }
    }
}

const mutations = {
    product_request(state){
        state.status = 'loading'
    },
    product_success(state, res){
        state.status = 'success'
        base.state.alert = {
            snackbar : true,
            color : 'success',
            msg : res.data.msg
        }
    },
    product_error(state, err){
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