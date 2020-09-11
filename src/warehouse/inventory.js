import axios from 'axios';
import base from '../warehouse/base';
const apiPath = process.env.VUE_APP_API_PATH;

const state = {
    status : ''
}

const getters = {
    inventoryStatus: state => state.status
}

const actions = {
    // Check Stock
    async checkStock({ commit },data){
        try {
            commit('inventory_request');
            let res = await axios.get(apiPath+'/api/inventories/checkstock/'+data);
            if (res.data.success) {
                commit('inventory_success', res);
            }
            return res;
        }catch(err){
            commit('inventory_error',err);
        }
    },
    // Get data
    async getInventory({ commit }){
        try {
            commit('inventory_request');
            let res = await axios.get(apiPath+'/api/inventories/data');
            if (res.data.success) {
                commit('inventory_success', res);
            }
            return res;
        }catch(err){
            commit('inventory_error',err);
        }
    },
}

const mutations = {
    inventory_request(state){
        state.status = 'loading'
    },
    inventory_success(state, res){
        state.status = 'success'
        base.state.alert = {
            snackbar : true,
            color : 'success',
            msg : res.data.msg
        }
    },
    inventory_error(state, err){
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