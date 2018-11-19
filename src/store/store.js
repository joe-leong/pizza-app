import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
    // 设置属性
    state:{
        menuItems:{}
    },
    // 获取属性状态
    getters:{

    },
    // 更改属性状态
    mutations:{
        setMenuItems(state,data){
            state.menuItems = data
        }
    },
    // 应用mutations
    actions:{

    }
})