<script setup>
import { useUserStore } from "@/stores/useUserStore";
import Footer from "@/components/Footer.vue";
import { ref } from "vue";
import beesPlacesRequests from "@/services/beesPlacesRequests";
import { useRouter } from "vue-router";

const router = useRouter();
const userStore = useUserStore();
const isLoading = ref(false);
const charginMessage = ref("Chargement en cours...");

const email = ref("");

const rulesEmail = [
  (value) => !!value || "Required",
  (value) => /.+@.+\..+/.test(value) || "Doit être un email valide",
];

const forgotPassword = () => {
  isLoading.value = true;
  charginMessage.value = "Chargement en cours...";

  const fetchData = async () => {
    try {
      const response = await beesPlacesRequests.forgot(email.value);

      userStore.setToken(response.data.token);
      if (response.status === 200) {
        charginMessage.value = "Email envoyé";
        setTimeout(() => {
          router.push("/");
        }, 500);
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.errors) {
        const errorsObj = error.response.data.errors;
        const firstField = Object.keys(errorsObj)[0];
        const messages = errorsObj[firstField];
        charginMessage.value = Array.isArray(messages) ? messages[0] : messages;
      } else if (error.response.data.message) {
        charginMessage.value = error.response.data.message;
      } else {
        charginMessage.value = "Une erreur inconnue est survenue";
      }
    } finally {
      setTimeout(() => {
        isLoading.value = false;
      }, 500);
    }
  };

  fetchData();
};

const pressEnter = () => {
  if (email.value.trim()) {
    forgotPassword();
  }
};
</script>

<template>
  <v-app >
    <v-container class="flex-grow-1">
      <v-row class="d-flex justify-center align-center text-center">
        <v-col>
          <router-link to="/">
            <img src="@/assets/SVG/Logo_titre.svg" alt="Image du logo" />
          </router-link>
        </v-col>
      </v-row>
      <v-row class="d-flex justify-center align-center text-center">
        <v-col class="bgWhite elevation-5 pa-6" cols="11" md="4">
          <v-row>
            <h1>Renvoie du mot de passe</h1>
          </v-row>
          <v-row>
            <v-col>
              <v-text-field
                v-model="email"
                :rules="rulesEmail"
                hide-details="auto"
                label="Email"
                class="inputLogin"
                @keyup.enter="pressEnter"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row class="shortPadding mt-10">
            <v-col cols="6" class="shortPadding">
              <v-btn class="btnSecondary" @click="() => router.push('/')"
                >Annuler</v-btn
              >
            </v-col>
            <v-col cols="6" class="shortPadding">
              <v-btn
                :disabled="!email ? true : false"
                class="btnPrimary"
                @click="forgotPassword"
              >
                Envoyer le mail
              </v-btn>
            </v-col>
          </v-row>
        </v-col>
      </v-row>

      <div class="backGroundProgress" v-if="isLoading">
        <v-progress-circular
          class="progressCircular"
          :size="70"
          :width="7"
          color="#5C4725"
          indeterminate
        ></v-progress-circular>
        <p class="progressCircularText">{{ charginMessage }}</p>
      </div>
    </v-container>
    <Footer />
  </v-app>
</template>

<style scooped>
.linkForgetPwd {
  text-decoration: underline;
  color: black;
}
.shortPadding {
  padding-left: 2px !important;
  padding-right: 2px !important;
}

.progressCircular {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.progressCircularText {
  position: absolute;
  left: 50%;
  top: 58%;
  transform: translate(-50%, 0%);
}

.backGroundProgress {
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(255, 246, 228, 0.9);
  height: 100vh;
  width: 100vw;
};

</style>