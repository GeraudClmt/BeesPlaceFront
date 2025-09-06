<script setup>
import { useUserStore } from "@/stores/useUserStore";
import Footer from "@/components/Footer.vue";
import { ref } from "vue";
import beesPlacesRequests from "@/services/beesPlacesRequests";
import { useRouter } from "vue-router";
import ProgressCircular from "@/components/ProgressCircular.vue";

const router = useRouter();
const userStore = useUserStore();
const email = ref("");
const password = ref("");
const isLoading = ref(false);
const chargingMessage = ref("Chargement en cours...");

const rulesEmail = [
  (value) => !!value || "Required.",
  (value) => /.+@.+\..+/.test(value) || "Doit être un email valide",
];
const rulesPassword = [(value) => !!value || "Required."];

const connexion = () => {
  isLoading.value = true;
  chargingMessage.value = "Chargement en cours...";

  const fetchData = async () => {
    try {
      const response = await beesPlacesRequests.login(
        email.value,
        password.value
      );

      userStore.setToken(response.data.token);
      if (response.status === 200) {
        chargingMessage.value = "Connexion réussie";
        setTimeout(() => {
          router.push("/");
        }, 3000);
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.errors) {
        const errorsObj = error.response.data.errors;
        const firstField = Object.keys(errorsObj)[0];
        const messages = errorsObj[firstField];
        chargingMessage.value = Array.isArray(messages)
          ? messages[0]
          : messages;
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

  fetchData();
};

const pressEnter = () => {
  if (email.value.trim() && password.value.trim()) {
    connexion();
  }
};
</script>

<template>
  <v-app>
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
              <v-btn
                class="btnSecondary"
                @click="() => router.push('/register')"
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

      <ProgressCircular
        :isLoading="isLoading"
        :chargingMessage="chargingMessage"
      />
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

.fullScreen {
  height: 100vh;
}
</style>