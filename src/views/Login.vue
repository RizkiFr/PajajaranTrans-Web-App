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
                            <v-text-field type="email" label="Email" color="success" v-model="user.email" :rules="emailRule" prepend-icon="person"></v-text-field>
                            <v-text-field type="password" label="Password" color="success" v-model="user.password" :rules="passRule" prepend-icon="lock" @keyup.enter="login()"></v-text-field>
                            <v-checkbox v-model="user.remember_me" color="orange" label="Ingatkan saya"></v-checkbox>
                            <v-btn block :disabled="!valid" class="success" @click="login()">Login</v-btn>
                            <span>Belum punya akun? <router-link to="/register" class="success--text" style="text-decoration: none;">Daftar</router-link></span>
                        </v-form>
                    </v-card-text>
                </v-card>
            </v-flex>
        </v-layout>

        <v-dialog width="500" v-model="a">
            <v-card>
                <v-card-title class="headline error white--text">Gagal</v-card-title>
                <v-card-text class="subheading">
                    <p>Login gagal, silahkan coba lagi</p>
                    </v-card-text>
                <v-divider></v-divider>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn small class="error" @click="a=false">OK</v-btn>
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
            a: false,
            loading: false,
            valid: true,
            user:{
                email: '',
                password: '',
                remember_me: false
            },
            emailRule: [
                v=>!!v || 'Email harus di isi.',
                v=> /.+@.+/.test(v) || 'Email tidak valid.'
            ],
            passRule: [
                v=>(v && v.length >= 6) || 'Password harus lebih dari 6 karakter.'
            ]
        }
    },
    methods:{
        async login() {
        if (this.$refs.form.validate()) {
          this.snackbar = true,
          this.loading = true,
          axios.post('https://api.pajajarantrans.co.id/public/api/auth/login',this.user)
          .then(response => {
              sessionStorage.setItem('access_token', response.data.access_token);
              axios.defaults.headers.common['Authorization'] = 'Bearer '+sessionStorage.getItem('access_token');
              this.$router.push({ path: '/'})
              // eslint-disable-next-line
          }).catch(error =>{
              this.loading = false,
              this.a = true
          })
        }},
    }
}
</script>