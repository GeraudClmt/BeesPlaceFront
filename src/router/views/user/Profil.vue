<script setup>
import NavBar from "@/components/NavBar.vue";
import Footer from "@/components/Footer.vue";
import { ref, onMounted, watch } from "vue";
import { useUserStore } from "@/stores/useUserStore";
import beesPlacesRequests from "@/services/beesPlacesRequests";
import ProgressCircular from "@/components/ProgressCircular.vue";
import LogoAbeille from "@/assets/SVG/Logo_abeille.svg";
import UpdateAnnouncement from "@/components/UpdateAnnouncement.vue";

const userStore = useUserStore();
const tab = ref("profil");
const name = ref();
const mail = ref();
const isLoading = ref(true);
const chargingMessage = ref("Chargement en cours...");
const annoucementsList = ref();
const departementList = ref(['Drome', 'Ardeche']);
const dialog = ref(false);
const dialogMessage = ref();
const dialogTitle = ref();

const isDialogUpdateAnnouncement = ref(false);
const idUpdateAnnouncement = ref();

const inputTittle = ref();
const inputDepartment = ref();
const inputDescription = ref();
const inputFile = ref();


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
    }, 500);
  }
};

const fetchUserAnnoucements = async () => {
  isLoading.value = true;
  try {
    const response = await beesPlacesRequests.getUserAnnouncements(
      userStore.getToken
    );
    annoucementsList.value = response.data.annonces;

    chargingMessage.value = "Réception des données...";
  } catch (error) {
    chargingMessage.value = "Erreur réception des données";
  }
  setTimeout(() => {
    isLoading.value = false;
  }, 500);
};

const requestsCreateAnnouncement = async () => {
  try {
    const formData = new FormData()
    formData.append('title', inputTittle.value)
    formData.append('departement', inputDepartment.value)
    formData.append('description', inputDescription.value)
    formData.append('image_path', inputFile.value)

    const response = await beesPlacesRequests.createAnnouncement(userStore.getToken, formData)

    if (response.status == '200') {
      dialogTitle.value = "Succès"
      dialogMessage.value = response.data.message
      dialog.value = true

      inputTittle.value = ""
      inputDepartment.value = ""
      inputDescription.value = ""
      inputFile.value = ""

      tab.value = "annonces"
    }
  } catch (error) {
    dialogTitle.value = "Erreur"
    dialogMessage.value = error.response.data.message
    dialog.value = true
  }
}

const deleteAnnouncement = async (annoucementID) => {
  try {
    const formData = new FormData()
    formData.append('id', annoucementID)
    const response = await beesPlacesRequests.deleteAnnouncement(userStore.getToken, formData)

    if (response.status == '200') {
      dialogTitle.value = "Succès"
      dialogMessage.value = response.data.message
      dialog.value = true

      fetchUserAnnoucements()

      inputTittle.value = ""
      inputDepartment.value = ""
      inputDescription.value = ""
      inputFile.value = ""
    }
  } catch (error) {
    dialogTitle.value = "Erreur"
    dialogMessage.value = error.response.data.message
    dialog.value = true
  }
}

const updateAnnouncement = (id) => {
  isDialogUpdateAnnouncement.value = true
  idUpdateAnnouncement.value = id
}

const refreshAnnouncements = (message) => {
  isDialogUpdateAnnouncement.value = false
  dialog.value = true
  dialogTitle.value = "Succès"
  dialogMessage.value = message
  fetchUserAnnoucements()
}

onMounted(() => {
  fetchUserInfo();
});

watch(tab, (newTab) => {
  if (newTab === "annonces") {
    fetchUserAnnoucements();
  }
});
</script>

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
              <UpdateAnnouncement v-if="isDialogUpdateAnnouncement" @refreshAnnouncements="(message) => refreshAnnouncements(message)"
                @closeDialog="(event) => isDialogUpdateAnnouncement = event" :id=idUpdateAnnouncement
                :userToken="userStore.getToken" :departementList="departementList"
                :isDialogActivate="isDialogUpdateAnnouncement" />
              <v-row>
                <v-col cols="12" md="4" class="mb-5" v-for="annoucement in annoucementsList" :key="annoucement.id">
                  <v-card>
                    <v-img :src="`${annoucement.image_path}`" height="200" cover></v-img>

                    <v-card-title>{{ annoucement.title }}</v-card-title>
                    <v-card-subtitle>{{
                      annoucement.departement
                    }}</v-card-subtitle>
                    <v-card-text>{{ annoucement.description }}</v-card-text>

                    <v-card-actions class="d-flex justify-space-between">
                      <v-btn width="40%" class="btnSecondary" @click="updateAnnouncement(annoucement.id)"> Éditer
                      </v-btn>
                      <v-btn width="40%" class="btnPrimary" @click="deleteAnnouncement(annoucement.id)"> Supprimer
                      </v-btn>
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
              <v-form @submit.prevent="requestsCreateAnnouncement">
                <v-text-field v-model="inputTittle" :rules="formRules" label="Titre" required></v-text-field>
                <v-select v-model="inputDepartment" :items="departementList" :rules="[v => !!v || 'Item is required']"
                  label="Département" required></v-select>
                <v-text-field v-model="inputDescription" :rules="rules" label="Description" required></v-text-field>
                <v-file-input v-model="inputFile" label="Charger la photo" prepend-icon="mdi-camera"
                  variant="filled"></v-file-input>
                <v-btn class="mt-2 btnPrimary" type="submit" block>Créer l'annonce</v-btn>
              </v-form>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
      <v-dialog v-model="dialog" width="auto">
        <v-card width="400">
          <v-card-title>
            <v-row>
              <v-col cols="4">
                <v-img :src="LogoAbeille" max-width="40px" max-height="40px" class="rounded-lg" />
              </v-col>
              <v-col cols="8">
                <h3>{{ dialogTitle }}</h3>
              </v-col>
            </v-row>

          </v-card-title>
          <v-card-text>
            <p>{{ dialogMessage }}</p>
          </v-card-text>
          <v-card-action class="d-flex justify-center">
            <v-btn class="ma-4" text="Ok" @click="dialog = false"></v-btn>
          </v-card-action>
        </v-card>
      </v-dialog>
      <ProgressCircular :isLoading="isLoading" :chargingMessage="chargingMessage" />
    </v-container>
    <Footer />
  </v-app>
</template>



<style scoped>
.fullScreen {
  height: 100vh;
}
</style>
