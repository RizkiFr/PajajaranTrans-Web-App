<template>
    <v-toolbar app dark prominent class="success">
      <v-toolbar-title class="headline text-uppercase">
                <v-btn icon @click="back()">
                    <v-icon>arrow_back</v-icon>
                </v-btn>
        <span>{{title[0]}}</span>
        <span class="font-weight-light"> {{title[1]}}</span>
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
</template>

<script>

export default {
    name: 'toolbar',
    props: ['title'],
    methods:{
        logout(){
            this.loading = true,
            this.axios.get('https://domain.com/public/api/auth/logout')
            // eslint-disable-next-line
            .then(response => {
                sessionStorage.clear();
                this.$router.push({path: '/login'});
            })
        },
        back(){
            this.$router.go(-1)
        }
    }
}
</script>

