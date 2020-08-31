import axios from 'axios';
import base from '../warehouse/base';

const state = {
    status : ''
}

const getters = {
    customerStatus: state => state.status
}

const actions = {
    // Get Data
    async getCustomer({ commit }){
        try {
            commit('customer_request');
            let res = await axios.get('http://localhost:5000/api/customers');
            if (res.data.success) {
                commit('customer_success', res);
            }
            return res;
        }catch(err){
            commit('customer_error',err);
        }
    },
    // Add Data
    async addCustomer({ commit }, data) {
        try {
            commit('customer_request');
            let res = await axios.post('http://localhost:5000/api/customers/add', data);
            if (res.data.success !== undefined) {
                commit('customer_success', res);
            }
            return res;
        }catch(err){
            commit('customer_error',err);
        }
    },
    // Update Data
    async updateCustomer({ commit }, data) {
        try {
            commit('customer_request');
            let res = await axios.post('http://localhost:5000/api/customers/update', data);
            if (res.data.success !== undefined) {
                commit('customer_success', res);
            }
            return res;
        }catch(err){
            commit('customer_error',err);
        }
    },
    // Delete Data
    async deleteCustomer({ commit }, data) {
        try {
            commit('customer_request');
            let res = await axios.post('http://localhost:5000/api/customers/delete', data);
            if (res.data.success !== undefined) {
                commit('customer_success', res);
            }
            return res;
        }catch(err){
            commit('customer_error',err);
        }
    }
}

const mutations = {
    customer_request(state){
        state.status = 'loading'
    },
    customer_success(state, res){
        state.status = 'success'
        base.state.alert = {
            snackbar : true,
            color : 'success',
            msg : res.data.msg
        }
    },
    customer_error(state, err){
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