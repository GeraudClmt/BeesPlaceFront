<template>
  <v-app>
    <NavBar />
    <v-container class="flex-grow-1">
      <v-row class="d-flex justify-center">
        <v-col class="bgWhite elevation-5 pa-6" cols="11" md="11">
          <v-tabs v-model="tab" align-tabs="title">
            <v-tab text="Profil" value="profil"></v-tab>
            <v-tab text="Annonces" value="annonces"></v-tab>
            <v-tab text="Ajouter une annonce" value="addAnnonce"></v-tab>
          </v-tabs>

          <v-row class="mt-6" v-if="tab === 'profil'">
            <p class="mt-6" v-if="name == null || mail == null">
              Veuillez vous connecter
            </p>
            <v-col v-else>
              <h3>{{ name }}</h3>
              <h3>{{ mail }}</h3>
            </v-col>
          </v-row>

          <v-row class="mt-6" v-if="tab === 'annonces'">
            <p class="mt-6" v-if="name == null || mail == null">
              Veuillez vous connecter
            </p>
            <v-col v-else>
              <v-row>
                <v-col
                  cols="12"
                  md="4"
                  class="mb-5"
                  v-for="annoucement in annoucementsList"
                  :key="annoucement.id"
                >
                  <v-card>
                    <v-img
                      :src="`${annoucement.image_path}`"
                      height="200"
                      cover
                    ></v-img>

                    <v-card-title>{{ annoucement.title }}</v-card-title>
                    <v-card-subtitle>{{
                      annoucement.departement
                    }}</v-card-subtitle>
                    <v-card-text>{{ annoucement.description }}</v-card-text>

                    <v-card-actions class="d-flex justify-space-between">
                      <v-btn width="40%" class="btnSecondary"> Éditer </v-btn>
                      <v-btn width="40%" class="btnPrimary"> Supprimer </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
          <v-row class="mt-6 d-flex justify-center" v-if="tab === 'addAnnonce'">
            <p class="mt-6" v-if="name == null || mail == null">
              Veuillez vous connecter
            </p>
            <v-col v-else md="6">
              <v-form @submit.prevent>
                <v-text-field
                  v-model="firstName"
                  :rules="rules"
                  label="Titre"
                  required
                ></v-text-field>
                <v-select
                  v-model="select"
                  :items="departementList"
                  :rules="[v => !!v || 'Item is required']"
                  label="Département"
                  required
                ></v-select>
                <v-text-field
                  v-model="firstName"
                  :rules="rules"
                  label="Description"
                  required
                ></v-text-field>
                <v-file-input
                  label="Charger la photo"
                  prepend-icon="mdi-camera"
                  variant="filled"
                ></v-file-input>
                <v-btn class="mt-2 btnPrimary" type="submit" block>Créer l'annonce</v-btn>
              </v-form>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
      <ProgressCircular
        :isLoading="isLoading"
        :chargingMessage="chargingMessage"
      />
    </v-container>
    <Footer />
  </v-app>
</template>

<script setup>
import NavBar from "@/components/NavBar.vue";
import Footer from "@/components/Footer.vue";
import { ref, onMounted, watch } from "vue";
import { useUserStore } from "@/stores/useUserStore";
import beesPlacesRequests from "@/services/beesPlacesRequests";
import { useRouter } from "vue-router";
import ProgressCircular from "@/components/ProgressCircular.vue";

const userStore = useUserStore();
const tab = ref("profil");
const name = ref();
const mail = ref();
const isLoading = ref(true);
const chargingMessage = ref("Chargement en cours...");
const annoucementsList = ref();
const departementList = ref(['Drome', 'Ardeche']);

const fetchUserInfo = async () => {
  try {
    isLoading.value = true;
    const response = await beesPlacesRequests.getUserProfil(userStore.getToken);
    name.value = response.data.name;
    mail.value = response.data.email;
    if (response.status === 200) {
      chargingMessage.value = "Récupération des données réussie";
    }
  } catch (error) {
    if (error.response && error.response.data && error.response.data.errors) {
      const errorsObj = error.response.data.errors;
      const firstField = Object.keys(errorsObj)[0];
      const messages = errorsObj[firstField];
      chargingMessage.value = Array.isArray(messages) ? messages[0] : messages;
    } else if (error.response.data.message) {
      chargingMessage.value = error.response.data.message;
    } else {
      chargingMessage.value = "Une erreur inconnue est survenue";
    }
  } finally {
    setTimeout(() => {
      isLoading.value = false;
    }, 3000);
  }
};

const fetchUserAnnoucements = async () => {
  console.log("Fetching user announcements...");
  isLoading.value = true;
  try {
    const response = await beesPlacesRequests.getUserAnnouncements(
      userStore.getToken
    );
    console.log(response);
    annoucementsList.value = response.data.annonces;
    console.log(annoucementsList.value);

    chargingMessage.value = "Réception des données...";
  } catch (error) {
    console.log("Erreur", error);
    chargingMessage.value = "Erreur réception des données";
  }
  setTimeout(() => {
    isLoading.value = false;
  }, 3000);
};

onMounted(() => {
  fetchUserInfo();
});

watch(tab, (newTab) => {
  if (newTab === "annonces") {
    fetchUserAnnoucements();
  }
});
</script>

<style scoped>
.fullScreen {
  height: 100vh;
}
</style>

