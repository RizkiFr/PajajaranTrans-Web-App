<style>
input[type=checkbox] ~ label img {
        background-color: #BDBDBD;
    }
input[type=checkbox]:checked ~ label img {
        background-color: #4CAF50;
    }
</style>


<template>
    <v-container>
        <toolbar :title="title"></toolbar>
        <v-flex md6 offset-md3> 
            <v-card class="pa-3">
                <v-card-title class="title">Pilih Seat</v-card-title>
                <v-divider></v-divider>
                <v-layout class="my-3">    
                    <v-flex xs6 class="text-xs-right">
                        <div>
                            <input type="checkbox" id="cb1" v-model="seat" value="1" :disabled="seat.length >= penumpang && seat.indexOf('1') === -1" hidden>
                            <label  v-if="perjalanan.no_kursi1 == 0" for="cb1"><img :src="require('../assets/seat.svg')"></label>
                            <label v-else><img :src="require('../assets/seat1.svg')"></label>
                        </div>
                        <div>
                            <input type="checkbox" id="cb2" v-model="seat" value="2" :disabled="seat.length >= penumpang && seat.indexOf('2') === -1" hidden>
                            <label v-if="perjalanan.no_kursi2 == 0" for="cb2"><img :src="require('../assets/seat.svg')"></label>
                            <label v-else><img :src="require('../assets/seat1.svg')"></label>
                        </div>
                        <div>
                            <input type="checkbox" id="cb4" v-model="seat" value="4" :disabled="seat.length >= penumpang && seat.indexOf('4') === -1" hidden>
                            <label v-if="perjalanan.no_kursi4 == 0" for="cb4"><img :src="require('../assets/seat.svg')"></label>
                            <label v-else><img :src="require('../assets/seat1.svg')"></label>
                        </div>
                    </v-flex>
                    <v-flex xs6>
                        <div><label><img :src="require('../assets/seat3.svg')"></label></div>
                        <div>
                            <input type="checkbox" id="cb3" v-model="seat" value="3" :disabled="seat.length >= penumpang && seat.indexOf('3') === -1" hidden>
                            <label v-if="perjalanan.no_kursi3 == 0" for="cb3"><img :src="require('../assets/seat.svg')"></label>
                            <label v-else><img :src="require('../assets/seat1.svg')"></label>
                        </div>
                        <div>
                            <input type="checkbox" id="cb5" v-model="seat" value="5" :disabled="seat.length >= penumpang && seat.indexOf('5') === -1" hidden>
                            <label v-if="perjalanan.no_kursi5 == 0" for="cb5"><img :src="require('../assets/seat.svg')"></label>
                            <label v-else><img :src="require('../assets/seat1.svg')"></label>
                        </div>
                    </v-flex>
                </v-layout>
                <v-btn block class="success" @click="next()" :disabled="validate">Next</v-btn>
            </v-card>
        </v-flex>
        <loading :loading="loading"></loading>
    </v-container>
</template>

<script>
import axios from 'axios'
import loading from '@/components/Loading.vue'
import toolbar from '@/components/Toolbar.vue'

export default {
    name: 'seat',
    components: {
        loading,
        toolbar
    },
    data(){
        return{
            title: ['Pilih','Kursi'],
            validate: true,
            loading: false,
            id: this.$route.params.id,
            seat:[],
            perjalanan:{}
        }
    },
    watch:{
        seat: function(){
            if(this.seat.length == this.penumpang){
            this.validate = false
            }else{
                this.validate = true
            }
        }
    },
    methods:{
        async getList(){
            this.loading= true
            axios.get('https://api.pajajarantrans.co.id/public/api/auth/perjalanan/'+this.$route.params.id)
            .then((response)=>{
                this.perjalanan = response.data.data[0]
                this.loading = false
            })
        },
        next(){
            this.$router.push({
                name: 'pesan', params: {id: this.id, seat: this.seat}
            })
        }
    },
    computed:{
        penumpang(){
            return this.$store.state.cari.penumpang
        }
    },
    mounted(){
        this.getList()
        
    }
    
}
</script>

