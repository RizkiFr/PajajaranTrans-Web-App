<template>
    <v-dialog v-model="loading" persistent content content-class="centered-dialog">
        <v-container fill-height>
            <v-layout column justify-center align-center>
                <atom-spinner :size="100" color="white"/>
                    <div class="title mt-2">Loading...</div>
            </v-layout>
        </v-container>
    </v-dialog>
</template>

<script>
import { AtomSpinner } from 'epic-spinners'

export default {
    name: 'loading',
    components: {
        AtomSpinner
    },
    props: ['loading'],
    data(){
        return{
            
        }
    }
    
}
</script>

