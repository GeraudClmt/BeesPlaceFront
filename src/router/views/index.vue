<script setup>
import {onMounted} from 'vue'

onMounted(() => {
    document.title = "BeesPlace"
})
</script>

<template>
    <v-app>
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