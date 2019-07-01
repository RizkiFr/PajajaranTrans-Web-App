<template>
    <v-container>
        <toolbar :title="title"></toolbar>
            <v-flex md6 offset-md3>
                <v-card flat>
                    <v-card-text>
                        <div class="title">{{kota.kota_asal}} <v-icon>arrow_forward</v-icon> {{kota.kota_tujuan}}</div>
                        <div class="caption" v-text="formatTanggal"></div>
                    </v-card-text>
                </v-card>
                <v-divider></v-divider>
                <v-card flat v-if="perjalanans==''">
                    <v-card-text>
                        <span class="subheading orange--text">Oppsss... perjalanan di tanggal ini sudah penuh. </span>
                        <router-link to="/" style="text-decoration: none;"><v-btn small class="success">Cari Jadwal Lain</v-btn></router-link>
                    </v-card-text>
                </v-card>
                <v-card v-else flat v-for="perjalanan in perjalanans" :key="perjalanan.id" @click="pesan(perjalanan.id)">
                    <v-card-text>
                        <v-layout>
                            <v-flex xs6>
                                <div class="subheading orange--text font-weight-medium">{{perjalanan.jam}}</div>
                                <div class="caption font-weight-medium">{{perjalanan.jenis_mobil}}</div>
                            </v-flex>
                            <v-flex xs6>
                                <div class="subheading font-weight-medium text-xs-right success--text">Rp. 120.000,-</div>
                                <div class="subheading font-weight-medium text-xs-right">Tersedia {{5 - perjalanan.jumlahPenumpang}} Kursi</div>
                            </v-flex>
                        </v-layout>
                    </v-card-text>
                    <v-divider></v-divider>
                </v-card>
            </v-flex>
            <loading :loading="loading"></loading>
    </v-container>
</template>

<script>
import moment from 'moment'
import axios from 'axios'
import loading from '@/components/Loading.vue'
import toolbar from '@/components/Toolbar.vue'

export default {
    name: 'perjalanan',
    components: {
        loading,
        toolbar
    },
    data(){
        return{
            title:['Jadwal','Perjalanan'],
            loading: true,
            perjalanans:[],
        }
    },
    methods:{
        async getList() {
            this.loading = true
            axios.get('https://domain.com/public/api/auth/perjalanan?tanggal='+this.$store.state.cari.tglBerangkat+'&kota_asal='+this.$store.state.cari.kota_asal+' &kota_tujuan='+this.$store.state.cari.kota_tujuan+'&jumlahPenumpang='+this.$store.state.cari.penumpang)
                .then((response) => {(this.perjalanans = response.data.data)
                this.loading = false
                })
                .catch(()=>{
                    this.$router.push({
                        path: '/login'
                    });
                });
            },
        pesan(id){
            this.$router.push({
                name: 'seat', params: { id: id}
            });
        }
    },
    computed: {
        kota(){
            return this.$store.state.cari
        },
        formatTanggal(){
        return this.$store.state.cari.tglBerangkat ? moment(this.$store.state.cari.tglBerangkat).locale('id').format('dddd, Do MMMM YYYY') : ''
        }
    },
    mounted(){
        this.getList()
        
        
    }
}
</script>
