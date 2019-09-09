<template>
    <v-container>
        <toolbar :title="title"></toolbar>
        <v-flex md6 offset-md3>
            <v-card>
                <v-card-title class="success white--text title">Detail Pemesan</v-card-title>
                <v-form ref="form" v-model="valid">
                    <div class="pa-3">
                        <v-text-field color="success" label="Masukan Nama Lengkap" v-model="pemesans.nama" :rules="ruleNama"></v-text-field>
                        <v-text-field color="success" type="number" label="Masukan Nomor HP" :counter="12" v-model="pemesans.no_telp" :rules="ruleHP"></v-text-field>
                        <v-text-field color="success" label="Masukan Email" v-model="pemesans.email" :rules="ruleEmail"></v-text-field>
                        <v-text-field color="success" label="Pilih Alamat Penjemputan" readonly @click="jemput()" v-model="pemesans.alamat_jemput" :rules="ruleAlamat"></v-text-field>
                        <v-text-field color="success" label="Pilih Alamat Pengantaran" readonly @click="antar()" v-model="pemesans.alamat_antar" :rules="ruleAlamat"></v-text-field>
                    </div>
                </v-form>
                <v-card-title class="success white--text title">Detail Pesanan</v-card-title>
                <v-form>
                    <div class="pa-3">
                        <div class="body-1" v-text="formatTanggal">{{perjalanan.tanggal}}</div>
                        <div class="title">{{perjalanan.kota_asal}} <v-icon>arrow_forward</v-icon> {{perjalanan.kota_tujuan}}</div>
                        <v-layout>
                            <v-flex xs3>
                                <div class="font-weight-medium">Pukul</div>
                                <div class="font-weight-medium">No Kursi</div>
                            </v-flex>
                            <v-flex xs3>
                                <div class="font-weight-medium" v-text="': '+formatJam"></div>
                                <div class="font-weight-medium">: <span class="orange--text" v-for="a in seat.length" :key="a">{{seat[a-1]}}, </span></div>
                            </v-flex>
                            <v-flex xs3>
                                <div class="font-weight-medium">Tiket</div>
                                <div class="font-weight-medium">Surcharge</div>
                            </v-flex>
                            <v-flex xs3>
                                <div class="font-weight-medium">: Rp. {{harga}}</div>
                                <dir class="font-weight-medium">: Rp. {{surcharge}}</dir>
                            </v-flex>
                        </v-layout>
                        <v-divider></v-divider>
                        <v-layout>
                            <v-flex xs9>
                                <div class="font-weight-medium subheading">Jumlah</div>
                            </v-flex>
                            <v-flex xs3>
                                <div class="font-weight-medium orange--text">: Rp. {{pemesans.total_harga}}</div>
                            </v-flex>
                        </v-layout>
                        <br>

                        <v-btn block :loading="isLoading" :disabled="!valid" class="success" @click="pesan()">Pesan</v-btn>
                    </div>
                </v-form>
            </v-card>

        <v-dialog width="500" v-model="a">
            <v-card>
                <v-card-title class="headline">Berhasil</v-card-title>
                <v-card-text class="subheading">
                    <p>Pesanan anda berhasil di proses. Silahkan lanjutkan ke pembayaran</p>
                    </v-card-text>
                <v-divider></v-divider>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn small class="success" @click="pay()">Bayar</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

        <v-dialog width="500" v-model="b">
            <v-card>
                <v-card-title class="headline">{{dialog.judul}}</v-card-title>
                <v-card-text class="subheading">
                    <p>{{dialog.status}}</p>
                    </v-card-text>
                <v-divider></v-divider>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn small :class="dialog.type" @click="finisPayment()">OK</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <loading :loading="loading"></loading>
        </v-flex>
        <v-dialog v-model="getAlamat.dialog" fullscreen hide-overlay transition="dialog-bottom-transition" scrollable>
            <v-card>
                <v-toolbar card dark color="success">
                    <v-btn icon dark @click="getAlamat.dialog = false">
                    <v-icon>close</v-icon>
                    </v-btn>
                    <v-toolbar-title>Pilih Alamat</v-toolbar-title>
                    <v-spacer></v-spacer>
                </v-toolbar>
                <v-card-text>
                    <location-picker style="height: 420px;"
                    v-model="getAlamat.location">
                    </location-picker>
                    <br>
                    <v-card-actions>
                        <span class="title">Lat: {{getAlamat.location.lat}} Lng: {{getAlamat.location.lng}}</span>
                        <v-spacer></v-spacer>
                        <v-btn class="success" :class="getAlamat.action" v-show="getAlamat.action == 'jemput'" @click="setAlamat()">Pilih</v-btn>
                        <v-btn class="success" :class="getAlamat.action" v-show="getAlamat.action == 'antar'" @click="setAlamat()">Pilih</v-btn>
                    </v-card-actions>
                </v-card-text>
            </v-card>
        </v-dialog>
    </v-container>
</template>

<script>
import axios from 'axios'
import moment from 'moment'
import toolbar from '@/components/Toolbar.vue'
import loading from '@/components/Loading.vue'
import {LocationPicker} from 'vue2-location-picker'

export default {
    name: 'pesan',
    props: ['seat'],
    components: {
        toolbar,
        loading,
        LocationPicker
    },
    data(){
        return{
            pemesans: {
                perjalanan_id: this.$route.params.id,
                no_kursi: this.$route.params.seat,
                nama: this.$store.state.profile.name,
                no_telp: this.$store.state.profile.no_telp,
                email: this.$store.state.profile.email,
                layanan:'door to door',
                tambahan:'30000',
                alamat_jemput:'',
                alamat_antar:'',
                latitude_antar:'123',
                longitude_antar: '123',
                latitude_jemput: '123',
                longitude_jemput: '123',
                user_id: this.$store.state.profile.id,
                total_harga: this.harga + this.surcharge
            },
            loading :false,
            isLoading: false,
            a:false,
            b: false,
            getAlamat: {
                dialog: false,
                actions: '',
                location: {
                    lat: -6.914744,
                    lng: 107.609810
                },
            },
            dialog:{
                judul:null,
                status:null,
                type: 'success',
                path:''
            },
            snapToken: null,
            ruleNama: [
                v=>!!v || 'Nama harus di isi.'
            ],
            ruleHP:[
                v=>!!v || 'Nomor HP harus di isi',
                v=>(v && v.length <= 12) || 'Nomor HP tidak boleh lebih dari 12'
            ],
            ruleEmail:[
                v=>!!v || 'Email harus di isi',
                v=> /.+@.+/.test(v) || 'Email tidak valid' 
            ],
            ruleAlamat:[
                v=> !!v || 'Alamat harus di isi'
            ],
            valid: true,
            title: ['Detail', 'Penumpang'],
            i: this.penumpang,
            perjalanan: {},
            
        }
    },
    methods:{
        async pesan(){
        this.isLoading = true
        if (this.$refs.form.validate()) {
            this.snackbar = true
            axios.post('https://api.pajajarantrans.co.id/public/api/auth/order',this.pemesans)
                .then(response => {
                    this.snapToken = response.data.snapToken,
                    this.isLoading = false
                    this.a = true
                })
            .catch(error => {
                console.log(error.response)
                this.dialog.judul = 'Gagal'
                this.dialog.status = 'Pesanan anda gagal di proses, silahkan coba lagi'
                this.dialog.type = 'error'
                this.isLoading = false
                this.b = true
            })
        }},
        async getList(){
            axios.get('https://api.pajajarantrans.co.id/public/api/auth/perjalanan/'+this.$route.params.id)
            .then((response) => {
                (this.perjalanan = response.data.data[0])
                
            })
        },
        jemput(){
            this.getAlamat.dialog = true,
            this.getAlamat.action = 'jemput'
        },
        antar(){
            this.getAlamat.dialog = true,
            this.getAlamat.action = 'antar'
        },
        setAlamat(){
            // if(this.getAlamat.action == 'jemput'){
            //     this.pemesans.alamat_jemput = this.getAlamat.location.lat
            // }else{
            //     this.pemesans.alamat_antar = this.getAlamat.location.lat
            // }
            // this.getAlamat.dialog = false
            console.log(this.getAlamat)
        },
        pay(){
            this.a = false,
            // eslint-disable-next-line
            snap.pay(this.snapToken, {
                onSuccess:(result)=>{
                    this.b = true
                    this.dialog.judul = 'Sukses';
                    this.dialog.status = 'Pembayaran anda berhasil di terima';
                    this.dialog.type = 'success';
                    this.dialog.path = '/'
                    console.log(result);},
                onPending:(result)=>{
                    this.b = true
                    this.dialog.judul = 'Pending';
                    this.dialog.status = 'Pembayaran anda sedang kami proses, mohoon menunggu';
                    this.dialog.type = 'success';
                    this.dialog.path = '/'
                    console.log(result);},
                onError:(result)=>{
                    this.b = true
                    this.dialog.judul = 'Gagal';
                    this.dialog.status = 'Pembayaran anda gagal di proses';
                    this.dialog.type = 'error';
                    this.dialog.path = '/pesanan'
                    console.log(result);},
                onClose:()=>{
                    this.b = true
                    this.dialog.judul = 'Menunda Pembayaran';
                    this.dialog.status = 'Silahkan lakukan pembayaran secepatnya';
                    this.dialog.type = 'success';
                    this.dialog.path = '/pesanan'
                    
                }
            })
        },
        finisPayment(){
            this.$router.push({
                path: this.dialog.path
            });
        },
    },
    computed: {
        formatTanggal(){
            return this.perjalanan.tanggal ? moment(this.perjalanan.tanggal).locale('id').format('dddd, Do MMMM YYYY') : ''
        },
        formatJam(){
            return this.perjalanan.jam ? moment(this.perjalanan.jam, 'HH:mm:ss').format('HH:mm'): ''
        },
        harga(){
            return this.perjalanan.harga_tiket*this.seat.length
        },
        surcharge(){
            return 30000*this.seat.length
        }
    },
    watch:{
        harga: function(){
            this.pemesans.total_harga = this.harga + this.surcharge
        }
    },
    mounted(){
        this.getList()
    }
}
</script>
