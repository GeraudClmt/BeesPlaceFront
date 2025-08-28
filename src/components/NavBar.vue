<template>
  <v-container>
    <v-row>
      <v-col cols="4">
        <router-link to="/">
          <img src="@/assets/PNG/Logo.png" alt="logo" class="logo" />
        </router-link>
      </v-col>
      <v-col cols="4" class="d-flex justify-center align-end text-center">
        <p class="text-h6">Aider nos apiculteurs</p>
      </v-col>
      <v-col
        v-if="screenWidth < 600"
        cols="4"
        class="d-flex justify-end align-end"
      >
        <v-menu open-on-hover>
          <template v-slot:activator="{ props }">
            <v-btn v-bind="props" class="btnMenu">
              <img
                src="@/assets/SVG/Bouton_menu.svg"
                alt="menu"
                class="logoMenu"
              />
            </v-btn>
          </template>

          <v-list>
            <v-list-item
              v-for="(item, index) in routeList"
              :key="index"
              :value="index"
            >
              <v-list-item-title>
                <router-link :to="item.link" class="menuLink">
                  {{ item.title }}
                </router-link>
              </v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-col>
      <v-col v-else cols="4" class="d-flex align-end">
        <v-row class="d-flex justify-center align-end text-center">
          <v-col
            cols="4"
            class="pa-0"
            v-for="(item, index) in routeList"
            :key="index"
            :value="index"
          >
            <router-link class="menuLink" :to="item.link">
              {{ item.title }}
            </router-link>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <v-row class="d-flex justify-center">
      <hr class="horizontalLigne" />
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";

const routeList = [
  { title: "Connexion", link: "/login" },
  { title: "Cathalogue", link: "/" },
  { title: "Contact", link: "/" },
];

const screenWidth = ref(window.innerWidth);

function handleResize() {
  screenWidth.value = window.innerWidth;
}
onMounted(() => {
  window.addEventListener("resize", handleResize);
});
onUnmounted(() => {
  window.removeEventListener("resize", handleResize);
});
</script>

<style scoped>
.logo {
  width: 7em;
}

.logoMenu {
  width: 2.7em;
  height: 2.7em;
}

.btnMenu {
  background-color: rgba(0, 0, 0, 0);
  padding: 0;
  margin: 0;
  min-width: 2.7em;
  height: 2.7em;
}

.horizontalLigne {
  width: 95%;
  border: none;
  height: 3px;
  background-color: #5c4725;
  margin: auto;
}

.menuLink {
  text-decoration: none;
  color: black;
  padding: 0;
}

.menuLink:hover {
  text-decoration: underline;
}
</style>