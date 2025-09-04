<script setup>
import { useUserStore } from "@/stores/useUserStore";
import Footer from "@/components/Footer.vue";
import { ref } from "vue";
import beesPlacesRequests from "@/services/beesPlacesRequests";
import { useRouter } from "vue-router";

const router = useRouter();
const userStore = useUserStore();
const email = ref("");
const password = ref("");
const isLoading = ref(false);
const charginMessage = ref("Chargement en cours...");

const rulesEmail = [
  (value) => !!value || "Required.",
  (value) => /.+@.+\..+/.test(value) || "Doit être un email valide",
];
const rulesPassword = [(value) => !!value || "Required."];

const connexion = () => {
  isLoading.value = true;
  charginMessage.value = "Chargement en cours...";

  const fetchData = async () => {
    try {
      const response = await beesPlacesRequests.login(
        email.value,
        password.value
      );

      userStore.setToken(response.data.token);
      if (response.status === 200) {
        charginMessage.value = "Connexion réussie";
        setTimeout(() => {
          router.push("/");
        }, 3000);
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
      }, 3000);
    }
  };

  fetchData();
};

const pressEnter = () => {
  if (email.value.trim() && password.value.trim()) {
    connexion();
  }
};
</script>

<template>
  <v-container class="fullScreen mb-8">
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
          <h1>Connexion</h1>
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
        <v-row>
          <v-col>
            <v-text-field
              v-model="password"
              type="password"
              :rules="rulesPassword"
              hide-details="auto"
              label="Mot de passe"
              class="inputLogin"
              @keyup.enter="pressEnter"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <router-link class="linkForgetPwd ml-4" to="/forgot">
            Mot de passe oublié ?
          </router-link>
        </v-row>
        <v-row class="shortPadding mt-10">
          <v-col cols="6" class="shortPadding">
            <v-btn class="btnSecondary" @click="() => router.push('/register')"
              >Créer un compte</v-btn
            >
          </v-col>
          <v-col cols="6" class="shortPadding">
            <v-btn
              :disabled="!email || !password ? true : false"
              class="btnPrimary"
              @click="connexion"
            >
              Se connecter
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

.fullScreen {
  height: 100vh;
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
}
</style>