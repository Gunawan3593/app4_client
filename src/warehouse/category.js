import axios from 'axios';
import base from '../warehouse/base';
const apiPath = process.env.VUE_APP_API_PATH;

const state = {
    status : ''
}

const getters = {
    categoryStatus: state => state.status
}

const actions = {
    // Get Data
    async getCategory({ commit }){
        try {
            commit('category_request');
            let res = await axios.get(apiPath+'/api/categories');
            if (res.data.success) {
                commit('category_success', res);
            }
            return res;
        }catch(err){
            commit('category_error',err);
        }
    },
    // Add Data
    async addCategory({ commit }, data) {
        try {
            commit('category_request');
            let res = await axios.post(apiPath+'/api/categories/add', data);
            if (res.data.success !== undefined) {
                commit('category_success', res);
            }
            return res;
        }catch(err){
            commit('category_error',err);
        }
    },
    // Update Data
    async updateCategory({ commit }, data) {
        try {
            commit('category_request');
            let res = await axios.post(apiPath+'/api/categories/update', data);
            if (res.data.success !== undefined) {
                commit('category_success', res);
            }
            return res;
        }catch(err){
            commit('category_error',err);
        }
    },
    // Delete Data
    async deleteCategory({ commit }, data) {
        try {
            commit('category_request');
            let res = await axios.post(apiPath+'/api/categories/delete', data);
            if (res.data.success !== undefined) {
                commit('category_success', res);
            }
            return res;
        }catch(err){
            commit('category_error',err);
        }
    }
}

const mutations = {
    category_request(state){
        state.status = 'loading'
    },
    category_success(state, res){
        state.status = 'success'
        base.state.alert = {
            snackbar : true,
            color : 'success',
            msg : res.data.msg
        }
    },
    category_error(state, err){
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