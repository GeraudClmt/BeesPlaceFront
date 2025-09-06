<script setup>
import { ref } from "vue";
import NavBar from "@/components/NavBar.vue";
import beesPlacesRequests from "@/services/beesPlacesRequests";
import ProgressCircular from "@/components/ProgressCircular.vue";

const annoucementsList = ref();
const isLoading = ref(false);
const chargingMessage = ref("Chargement en cours...");

const fetchAnnoucements = async () => {
  isLoading.value = true;
  try {
    const response = await beesPlacesRequests.getAnnouncements();
    annoucementsList.value = response.data.announcements;

    chargingMessage.value = "Réception des données...";
  } catch (error) {
    chargingMessage.value = "Erreur réception des données";
  }
  setTimeout(() => {
    isLoading.value = false;
  }, 3000);
};

fetchAnnoucements();
</script>

<template>
  <v-app>
    <NavBar />
    <v-container>
      <v-row>
        <v-col
          cols="12"
          md="3"
          class="mb-5"
          v-for="announcement in annoucementsList"
          :key="announcement.id"
        >
          <v-card>
            <v-img
              :src="`http://192.168.1.200:8000/storage/${announcement.image_path}`"
              height="200"
              cover
            ></v-img>

            <v-card-title>{{ announcement.title }}</v-card-title>
            <v-card-subtitle>{{ announcement.departement }}</v-card-subtitle>
            <v-card-text>{{ announcement.description }}</v-card-text>

            <v-card-actions class="d-flex justify-space-between">
              <v-btn
                width="40%"
                class="btnSecondary"
                @click="editAnnouncement(announcement.id)"
              >
                Éditer
              </v-btn>
              <v-btn
                width="40%"
                class="btnPrimary"
                @click="deleteAnnouncement(announcement.id)"
              >
                Supprimer
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>

      <ProgressCircular
        :isLoading="isLoading"
        :chargingMessage="chargingMessage"
      />
    </v-container>
  </v-app>
</template>

<style scoped>
</style>