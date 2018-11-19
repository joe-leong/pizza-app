import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
    // 设置属性
    state: {
        menuItems: {}
    },
    // 获取属性状态
    getters: {
        getMenuItems:state => state.menuItems 
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
        addMenuItems(state,data){
            state.menuItems.push(data)
        }
    },
    // 应用mutations
    actions: {

    }
})