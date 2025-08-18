<script setup>
import {onMounted} from 'vue'
import NavBar from '@/components/NavBar.vue'

onMounted(() => {
    document.title = "BeesPlace"
})
</script>

<template>
    <v-app>
        <NavBar />
        <v-main>
            <v-container>
                <v-card class="mx-auto" max-width="400">
                    <v-card-title class="text-h5">
                        Bienvenu sur le site de BeesPlace
                    </v-card-title>
                </v-card>
            </v-container>
        </v-main>
    </v-app>
</template>

<style>
</style>