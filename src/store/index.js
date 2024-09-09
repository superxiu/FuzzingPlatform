import {createStore} from 'vuex';

const store = createStore({
    state: {
        user: null,
        accessToken: null,  // 添加 accessToken
        refreshToken: null, // 添加 refreshToken
        role: null          // 添加 role
    },
    mutations: {
        setUser(state, user) {
            state.user = user;
        },
        setAccessToken(state, token) {
            state.accessToken = token;
        },
        setRefreshToken(state, token) {
            state.refreshToken = token;
        },
        role(state, role) {
            state.role = role;
        }
    },
    actions: {
        login({commit}, user) {
            // 模拟用户登录
            commit('setUser', user);
        },
        logout({commit}) {
            commit('setUser', null);
            commit('setAccessToken', null); // 清除 accessToken
            commit('setRefreshToken', null); // 清除 refreshToken
            commit('role', null); // 清除 role
        }
    },
    getters: {
        isAdmin: (state) => state.user && state.role === 'admin',
        isAuthenticated: (state) => !!state.user
    }
});

export default store;
