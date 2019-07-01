<template>
    <v-container>
        <loading :loading="loading"></loading>
        <v-toolbar app dark prominent class="success">
            <v-toolbar-title class="headline text-uppercase">
                <span>Pajajaran</span>
                <span class="font-weight-light">Trans</span>
            </v-toolbar-title>
            <v-spacer></v-spacer>
        </v-toolbar>

        <v-layout text-xs-center wrap>
            <v-flex md6 offset-md3 xs12>
                <v-card>
                    <!-- <v-card-title class="title success white--text">Login</v-card-title> -->
                    <v-card-text>
                        <v-img class="mb-3" contain :src="require('../assets/logo.svg')" height="200"></v-img>
                        <v-form ref="form" v-model="valid">
                            <v-text-field label="Nama Lengkap" v-model="user.name" :rules="namaRule" color="success"></v-text-field>
                            <v-text-field label="Nomor Hp" type="number" v-model="user.no_telp" :rules="noHPRule" counter="12" color="success"></v-text-field>
                            <v-text-field label="Email" type="email" color="success" v-model="user.email" :rules="emailRule"></v-text-field>
                            <v-text-field label="Password" color="success" v-model="user.password" :rules="passRule" counter :append-icon="show1 ? 'visibility' : 'visibility_off'" :type="show1 ? 'text' : 'password'" @click:append="show1 = !show1"></v-text-field>
                            <v-text-field label="Konfirmasi Password" color="success" v-model="user.password_confirmation" :rules="passRuleConfirm" counter :append-icon="show2 ? 'visibility' : 'visibility_off'" :type="show2 ? 'text' : 'password'" @click:append="show2 = !show2" @keyup.enter="daftar()"></v-text-field>
                            <v-checkbox v-model="setuju" :rules="setujuRule" label="Saya setuju dengan syarat dan ketentuan" color="orange"></v-checkbox>
                            <v-btn block :disabled="!valid" class="success" @click="daftar()">Daftar</v-btn>
                            <span>Sudah punya akun? <router-link to="/Login" class="success--text" style="text-decoration: none;">Login</router-link></span>
                        </v-form>
                    </v-card-text>
                </v-card>
            </v-flex>
        </v-layout>

        <v-dialog width="500" v-model="a">
            <v-card>
                <v-card-title class="headline">Gagal</v-card-title>
                <v-card-text class="subheading">
                    <p>Pendaftaran gagal, silahkan coba lagi</p>
                    </v-card-text>
                <v-divider></v-divider>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn small class="error" @click="a=false">OK</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <v-dialog width="500" v-model="b">
            <v-card>
                <v-card-title class="headline">Berhasil</v-card-title>
                <v-card-text class="subheading">
                    <p>Pendaftaran berhasil</p>
                    </v-card-text>
                <v-divider></v-divider>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn small class="success" @click="$router.push({ path: '/login'})">Login</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

    </v-container>
</template>

<script>
import axios from 'axios'
import loading from '@/components/Loading.vue'

export default {
    name: 'login',
    components:{
        loading
    },
    data(){
        return{
            show1 : false,
            show2: false,
            a: false,
            b: false,
            loading: false,
            valid: true,
            user:{
                name: '',
                no_telp: '',
                email: '',
                password: '',
                password_confirmation: '',
            },
            setuju: false,
            emailRule: [
                v=>!!v || 'Email harus di isi.',
                v=> /.+@.+/.test(v) || 'Email tidak valid.'
            ],
            passRule: [
                v=>(v && v.length >= 6) || 'Password harus lebih dari 6 karakter.'
            ],
            passRuleConfirm: [
                (v) => v == this.user.password || 'Password harus sama'
            ],
            noHPRule: [
                v=>!!v || 'Nomor HP harus di isi',
                v=>(v && v.length <= 12) || 'Nomor HP tidak boleh lebih dari 12'
            ],
            namaRule: [
                v=>!!v || 'Nama harus di isi.'
            ],
            setujuRule: [
                v=>!!v || 'Syarat dan ketentuan harus disetujui'
            ]
        }
    },
    methods:{
        async daftar() {
        if (this.$refs.form.validate()) {
          this.snackbar = true,
          this.loading = true,
          axios.post('https://domain.com/public/api/auth/signup?',this.user)
          // eslint-disable-next-line
          .then(response => {
              this.loading = false,
              this.b = true
              // eslint-disable-next-line
          }).catch(error =>{
              this.loading = false,
              this.a = true
          })
        }},
    }
}
</script>