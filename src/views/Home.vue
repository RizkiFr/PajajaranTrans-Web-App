<template>
  <v-container>
    <v-toolbar app dark prominent class="success">
      <v-toolbar-title class="headline text-uppercase">
        <span>Pajajaran</span>
        <span class="font-weight-light">Trans</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
            <v-menu>
                <template v-slot:activator="{ on }">
                    <v-btn icon v-on="on">
                        <v-icon>more_vert</v-icon>
                    </v-btn>
                </template>
                <v-list>
                    <v-list-tile @click="logout()">
                        <v-list-tile-title>
                            <v-icon>exit_to_app</v-icon>
                            <span class="ml-1">Logout</span>
                        </v-list-tile-title>
                    </v-list-tile>
                    <v-list-tile @click="$router.push({path:'/pesanan'})">
                        <v-list-tile-title>
                            <v-icon>view_list</v-icon>
                            <span class="ml-1">Pesanan</span>
                        </v-list-tile-title>
                    </v-list-tile>
                </v-list>
            </v-menu>
    </v-toolbar>

    <v-layout>
      <v-flex md6 offset-md3>
      <v-card>
        <v-img :src="require('../assets/Promo.png')" height="150"></v-img>
        <div class="pa-3">
          <v-card-title>
            <h2>Pesan Tiket</h2>
          </v-card-title>
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-select color="success" label="Kota Asal" v-model="cari.kota_asal" :items="kota" prepend-icon="place" :rules="[v => !!v || 'Bagian ini harus di isi!']" required></v-select>
            <v-select color="success" label="Kota Tujuan" v-model="cari.kota_tujuan" :items="kota" prepend-icon="navigation" :rules="[v => !!v || 'Bagian ini harus di isi!']" required></v-select>
            <v-menu v-model="menu" :close-on-content-click="false" full-width max-width="290">
              <template v-slot:activator="{ on }">
                <v-text-field clearable readonly label="Tanggal Berangkat" prepend-icon="date_range" v-on="on" :value="formatTanggal" :rules="[v => !!v || 'Bagian ini harus di isi!']" required>
                </v-text-field>
              </template>
              <v-date-picker color="orange" v-model="cari.tglBerangkat" @change="menu = false"></v-date-picker>
            </v-menu>
            <v-select v-model="cari.penumpang" color="success" label="Penumpang" :items="orang" prepend-icon="person" :rules="[v => !!v || 'Bagian ini harus di isi!']" required></v-select>
            <v-btn :disabled="!valid" block class="success" @click="cariPerjalanan()">Cari</v-btn>
          </v-form>
        </div>
      </v-card>
      </v-flex>
    </v-layout>
    <loading :loading="loading"></loading>
  </v-container>
</template>

<script>
import moment from 'moment'
import loading from '@/components/Loading.vue'

export default {
  name: 'home',
  components:{
    loading
  },
  data(){
    return{
      loading: false,
      valid: true,
      kota: ['Bandung', 'Bogor'],
      orang: [1,2,3,4,5],
      menu: false,
      cari:{
        tglBerangkat:null,
        kota_asal: null,
        kota_tujuan:null,
        penumpang:null
      }
    }
  },
  methods:{
    cariPerjalanan(){
      if (this.$refs.form.validate()) {
          this.snackbar = true
          this.$store.dispatch('cariPerjalanan', this.cari)
          this.$router.push({name:'perjalanan'});
    }},
    logout(){
      this.loading = true,
      this.axios.get('https://domain.com/public/api/auth/logout')
      // eslint-disable-next-line
      .then(response => {
        sessionStorage.clear();
        this.$router.push({path: '/login'});
      })
    },
  },

  computed: {
    formatTanggal(){
      return this.cari.tglBerangkat ? moment(this.cari.tglBerangkat).locale('id').format('dddd, Do MMMM YYYY') : ''
    }
  },
  mounted(){
    this.$store.dispatch('getProfile')
  }
}
</script>

<style>

  .v-dialog.centered-dialog{
    box-shadow: none;
    width: auto;
    color: whitesmoke;
    }
</style>