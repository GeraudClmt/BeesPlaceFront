<script setup>
import { useUserStore } from "@/stores/useUserStore";

const userStore = useUserStore();
</script>

<template>
  <v-container>
    <v-row class="d-flex justify-center align-center text-center">
      <v-col>
        <img src="@/assets/SVG/Logo_titre.svg" alt="Image du logo" />
      </v-col>
    </v-row>
  </v-container>
</template>

<style>
</style>