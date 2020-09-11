import axios from 'axios';
import router from '../router';
import base from '../warehouse/base';
const apiPath = process.env.VUE_APP_API_PATH;

const state = {
    token: localStorage.getItem('token') || '',
    user: {},
    status: '',
    userExists: [],
    emailExists: []
};

const getters = {
    isLoggedIn: state => !!state.token,
    authState: state => state.status,
    user: state => state.user,
    userExists: state => state.userExists,
    emailExists: state => state.emailExists
};

const actions = {
    // Login User
    async login({
        commit
    }, user) {
        try{
            commit('auth_request');
            let res = await axios.post(apiPath+'/api/users/login', user);
            if (res.data.success) {
                const token = res.data.token;
                const user = res.data.user;
                // Store The Token into the localStorage
                localStorage.setItem('token', token);
                // Set the axios default
                axios.defaults.headers.common['Authorization'] = token;
                commit('auth_success', token, user);
            }
            return res;
        }catch(err){
            commit('auth_error',err);
        }
    },
    // Register User
    async register({
        commit
    }, userData) {
        try{
            commit('register_request');
            let res = await axios.post(apiPath+'/api/users/register', userData);
            if(res.data.success !== undefined) {
                commit('register_success',res);
            }
            return res;
        }catch(err){
            commit('register_error',err);
        }
    },
    // Get the user profile
    async getProfile({ commit }){
        commit('profile_request');
        let res = await axios.get(apiPath+'/api/users/profile');
        commit('user_profile', res.data.user);
        return res;
    },
    // Logout the user
    async logout({ commit }) {
        await localStorage.removeItem('token');
        commit('logout');
        delete axios.defaults.headers.common['Authorization'];
        router.push('/login');
        return;
    },
    // check username
    async checkUsername({ commit }, username) {
        // Check for the unique Username
        let res = await axios.post(apiPath+'/api/users/checkuser', username);
        commit('user_exists',res.data);
        return res;
    },
    // check email
    async checkUseremail({ commit }, email) {
        // Check for the unique Username
        let res = await axios.post(apiPath+'/api/users/checkemail', email);
        commit('email_exists',res.data);
        return res;
    },
    // check email
    async checkUpdemail({ commit }, email) {
        // Check for the unique Username
        let res = await axios.post(apiPath+'/api/users/checkupdemail', email);
        commit('email_exists',res.data);
        return res;
    },
    // Update User
    async updateUser({
        commit
    }, userData) {
        try{
            commit('update_request');
            let res = await axios.post(apiPath+'/api/users/updateuser', userData);
            if(res.data.success !== undefined) {
                commit('update_success',res);
            }
            return res;
        }catch(err){
            commit('update_error',err);
        }
    },
};

const mutations = {
    auth_request(state){
        state.status = 'loading'
    },
    auth_success(state, token, user){
        state.token = token,
        state.user = user,
        state.status = 'success'
    },
    auth_error(state, err) {
        base.state.alert = {
            snackbar : true,
            color : 'error',
            msg : err.response.data.msg
        }
    },
    register_request(state){
        state.status = 'loading'
    },
    register_success(state, res){
        base.state.alert = {
            snackbar : true,
            color : 'error',
            msg : res.data.msg
        }
    },
    register_error(state, err){
        base.state.alert = {
            snackbar : true,
            color : 'error',
            msg : err.response.data.msg
        }
    },
    logout(state){
        state.status = '',
        state.token =  '',
        state.user = ''
    },
    profile_request(state){
        state.status = 'loading'
    },
    user_profile(state, user){
        state.user = user
    },
    user_exists(state, response){
        state.userExists = response
    },
    email_exists(state, response){
        state.emailExists = response
    },
    update_request(state){
        state.status = 'loading'
    },
    update_success(state, res){
        state.status = 'success',
        base.state.alert = {
            snackbar : true,
            color : 'success',
            msg : res.data.msg
        }
    },
    update_error(state, err){
        base.state.alert = {
            snackbar : true,
            color : 'error',
            msg : err.response.data.msg
        }
    },
};

export default {
    state,
    getters,
    actions,
    mutations
}