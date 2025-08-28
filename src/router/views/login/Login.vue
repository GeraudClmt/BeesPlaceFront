<script setup>
import { useUserStore } from "@/stores/useUserStore";
import Footer from "@/components/Footer.vue";
import { ref } from "vue";

const userStore = useUserStore();
const email = ref();
const password = ref();

const rulesEmail = [
  (value) => !!value || "Required.",
  (value) => (value && value.length >= 3) || "Min 3 characters",
  (value) => /.+@.+\..+/.test(value) || "Doit être un email valide",
];
const rulesPassword = [
  (value) => !!value || "Required.",
  (value) => (value && value.length >= 3) || "Min 8 characters",
];
</script>

<template>
  <v-container class="fullScreen">
    <v-row class="d-flex justify-center align-center text-center">
      <v-col>
        <router-link to="/">
          <img src="@/assets/SVG/Logo_titre.svg" alt="Image du logo" />
        </router-link>
      </v-col>
    </v-row>
    <v-row class="d-flex justify-center align-center text-center">
      <v-col class="bgWhite elevation-5 pa-6" cols="11" md="6">
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
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-text-field
              v-model="password"
              :rules="rulesPassword"
              hide-details="auto"
              label="Mot de passe"
              class="inputLogin"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <router-link class="linkForgetPwd ml-4" to="/">
            Mot de passe oublié ?
          </router-link>
        </v-row>
        <v-row class="shortPadding mt-10">
          <v-col cols="6" class="shortPadding">
            <v-btn class="btnSecondary">Créer un compte</v-btn>
          </v-col>
          <v-col cols="6" class="shortPadding">
            <v-btn class="btnPrimary">Se connecter</v-btn>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
  <Footer />
</template>

<style>
.linkForgetPwd {
  text-decoration: underline;
  color: black;
}
.shortPadding {
  padding-left: 2px !important;
  padding-right: 2px !important;
}

.fullScreen {
  height: 94vh;
}
</style>