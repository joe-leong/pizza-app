import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
    // 设置属性
    state: {
        menuItems: {},
        currentUser: null,
        isLogin: false
    },
    // 获取属性状态
    getters: {
        getMenuItems: state => state.menuItems,
        currentUser:state => state.currentUser,
        isLogin:state => state.isLogin
    },
    // 更改属性状态
    mutations: {
        setMenuItems(state, data) {
            state.menuItems = data
        },
        removeMenuItems(state, data) {
            state.menuItems.forEach((item, index) => {
                if (item == data) {
                    state.menuItems.splice(index, 1)
                }
            });
        },
        addMenuItems(state, data) {
            state.menuItems.push(data)
        },
        userState(state,user){
            if(user){
                state.currentUser = user
                state.isLogin = true
            }else{
                state.currentUser = null
                state.isLogin = false
            }
        }
    },
    // 应用mutations
    actions: {
        setUser({commit},user){
            commit('userState',user)
        }
    }
})