import { createStore } from 'vuex'
import { UserModule } from './User'

const store = createStore({
    // state: {
    //     user: null
    // },

    // // Mutations are functions that effect the STATE
    // mutations: {
    //     SET_USER(state, user) {
    //         state.user = user
    //     }
    // },

    // // Actions are functions that you call throughout your app that call mutations
    // actions: {
    //     setUser({ commit }, user) {
    //         commit('SET_USER', user)
    //     }
    // },

    // Used to decentralize different stores in a larger app
    modules: {
        User: UserModule
    }
})

export default store