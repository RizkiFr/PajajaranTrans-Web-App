<template>
    <v-container>
        <toolbar :title="title"></toolbar>
            <v-flex md6 offset-md3>
                <v-card flat>
                </v-card>
                <v-divider></v-divider>
                <v-card flat v-if="perjalanans==''">
                    <v-card-text>
                        <span class="subheading orange--text">Anda belum pernah melakukan perjalanan </span>
                        <router-link to="/" style="text-decoration: none;"><v-btn small class="success">Cari Tiket</v-btn></router-link>
                    </v-card-text>
                </v-card>
                <v-card v-else flat v-for="perjalanan in perjalanans.slice().reverse()" :key="perjalanan.id">
                    <v-card-text>
                        <v-layout>
                            <v-flex xs6>
                                <div class="subheading font-weight-medium">{{perjalanan.kota_asal}} <v-icon small>arrow_forward</v-icon> {{perjalanan.kota_tujuan}}</div>
                                <div class="caption font-weight-medium">{{perjalanan.tanggal}} : {{perjalanan.jam}}</div>
                            </v-flex>
                            <v-flex xs6>
                                <div class="subheading font-weight-medium text-xs-right success--text">{{perjalanan.status}}</div>
                                <div v-show="perjalanan.status == 'pending'" class="subheading orange--text font-weight-medium text-xs-right" style="cursor: pointer;" @click="pay(perjalanan.snap_token)">Bayar</div>
                            </v-flex>
                        </v-layout>
                    </v-card-text>
                    <v-divider></v-divider>
                </v-card>
            </v-flex>
            <loading :loading="loading"></loading>

            <v-dialog width="500" v-model="b">
            <v-card>
                <v-card-title class="headline">{{dialog.judul}}</v-card-title>
                <v-card-text class="subheading">
                    <p>{{dialog.status}}</p>
                    </v-card-text>
                <v-divider></v-divider>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn small :class="dialog.type" @click="b=false">OK</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

    </v-container>
</template>

<script>
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
            dialog:{
                judul:null,
                status:null,
                type: 'success'
            },
            b: false
        }
    },
    methods:{
        async getList() {
            this.loading = true
            axios.get('https://domain.com/public/api/auth/penumpang/'+sessionStorage.getItem('id'))
                .then((response) => {(this.perjalanans = response.data.data)
                this.loading = false
                })
                .catch(()=>{
                    this.$router.push({
                        path: '/login'
                    });
                });
            },
            pay(val){
            // eslint-disable-next-line
            snap.pay(val, {
                onSuccess:(result)=>{
                    this.b = true
                    this.dialog.judul = 'Sukses';
                    this.dialog.status = 'Pembayaran anda berhasil di terima';
                    this.dialog.type = 'success'
                    console.log(result);},
                onPending:(result)=>{
                    this.b = true
                    this.dialog.judul = 'Pending';
                    this.dialog.status = 'Pembayaran anda sedang kami proses, mohoon menunggu';
                    this.dialog.type = 'success'
                    console.log(result);},
                onError:(result)=>{
                    this.b = true
                    this.dialog.judul = 'Gagal';
                    this.dialog.status = 'Pembayaran anda gagal di proses';
                    this.dialog.type = 'error'
                    console.log(result);},
                onClose:()=>{
                    this.b = true
                    this.dialog.judul = 'Menunda Pembayaran';
                    this.dialog.status = 'Silahkan lakukan pembayaran secepatnya';
                    this.dialog.type = 'success'
                }
            })
        }
    },
    mounted(){
        this.getList()
    }
}
</script>
