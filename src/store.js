import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
    state:{
        profile:{},
        cari:{},
        perjalanan:{}

    },
    mutations:{

    },
    actions:{
        getProfile( {state} ){
            axios.get('https://api.pajajarantrans.co.id/public/api/auth/user')
            .then((res)=>{
            sessionStorage.setItem('id', res.data.id)
            state.profile = res.data
            })
        },
        cariPerjalanan({state}, cari){
            state.cari = cari
        },
        perjalanan({state}, value){
            state.perjalanan = value
        }

    },
})