<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { useUserStore } from "@/stores/useUserStore";

const userStore = useUserStore();
let routeList = [
  { title: "Annonces", link: "/catalog" },
  { title: "Contact", link: "/" },
  { title: "Connexion", link: "/login" },
];

if (userStore.getToken != null) {
  routeList[2] = { title: "Profil", link: "/profil" };
  routeList.push({ title: "Deconnexion", link: "/login" });
} else {
  routeList[2] = { title: "Connexion", link: "/login" };
}

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

const removeAccessToken = () => {
  userStore.removeToken();
  window.location.reload();
};
</script>

<template>
  <v-container>
    <v-row>
      <v-col >
        <router-link to="/">
          <img src="@/assets/PNG/Logo.png" alt="logo" class="logo" />
        </router-link>
      </v-col>
      <v-col cols="3" class="d-flex justify-center align-end text-center">
        <p class="text-h6">Aider nos apiculteurs</p>
      </v-col>
      <v-col
        v-if="screenWidth < 1000"
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
                <router-link
                  :to="item.link"
                  class="menuLink"
                  @click="
                    item.title === 'Deconnexion' ? removeAccessToken() : null
                  "
                >
                  {{ item.title }}
                </router-link>
              </v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-col>
      <v-col v-else class="d-flex align-end">
        <v-row class="d-flex justify-end align-end">
          <v-col
            class="pa-0"
            v-for="(item, index) in routeList"
            :key="index"
            :value="index"
          >
            <router-link
              class="menuLink"
              :to="item.link"
              @click="item.title === 'Deconnexion' ? removeAccessToken() : null"
            >
              {{ item.title }}
            </router-link>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <v-row no-gutters class="mt-4">
      <v-col cols="12" class="pe-0">
        <hr class="horizontalLigne" />
      </v-col>
    </v-row>
  </v-container>
</template>

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
  width: 100%;
  border: none;
  height: 3px;
  background-color: #5c4725;
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