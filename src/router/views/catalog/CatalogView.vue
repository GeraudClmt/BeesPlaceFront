<script setup>
import { ref } from "vue";
import NavBarComponent from "@/components/NavBarComponent.vue";
import FooterComponent from "@/components/FooterComponent.vue";
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
  } catch {
    chargingMessage.value = "Erreur réception des données";
  }
  setTimeout(() => {
    isLoading.value = false;
  }, 500);
};

fetchAnnoucements();
</script>

<template>
  <v-app>
    <NavBarComponent />
    <v-container class="flex-grow-1">
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
              :src="announcement.image_path"
              height="200"
              cover
            ></v-img>

            <v-card-title>{{ announcement.title }}</v-card-title>
            <v-card-subtitle>{{ announcement.departement }}</v-card-subtitle>
            <v-card-text>{{ announcement.description }}</v-card-text>

            <v-card-actions class="d-flex justify-center">
              <v-btn
                width="40%"
                class="btnPrimary"
                @click="deleteAnnouncement(announcement.id)"
              >
                Contacter
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
    <FooterComponent />
  </v-app>
</template>

<style scoped>

</style>