<script setup>
import { onMounted } from "vue";
import NavBar from "@/components/NavBar.vue";
import Footer from "@/components/Footer.vue";
import { useRouter } from "vue-router";

const router = new useRouter();
onMounted(() => {
  document.title = "BeesPlace";
});

const redirectToCatalog = () => {
  router.push("/catalog");
};
</script>

<template>
  <v-app>
    <NavBar />
    <v-main>
      <v-container>
        <v-row class="d-flex justify-center">
          <v-col cols="11">
            <h2 class="underline text-center">
              <img
                src="@/assets/SVG/Ruche.svg"
                alt="Image d'une Ruche"
                class="imgSubtitle"
              />
              Mettez votre terrain aux services des abeilles
            </h2>
          </v-col>
        </v-row>
        <v-row class="text-center d-flex justify-center">
          <v-col cols="10">
            <img
              class="firstLittleBee"
              src="@/assets/SVG/Petite_abeille.svg"
              alt="Image petite abeille"
            />
            <img
              class="secondeLittleBee"
              src="@/assets/SVG/Petite_abeille.svg"
              alt="Image petite abeille"
            />
            <p>
              Les abeilles jouent un rôle essentiel dans la pollinisation, mais
              elles disparaissent à un rythme alarmant.
            </p>
          </v-col>
        </v-row>
        <v-row class="mt-5">
          <img
            src="@/assets/Photos/Photo_fleurs.jpg"
            alt="Image de fleurs"
            class="imgFlowers"
          />
        </v-row>
        <v-row class="mt5 d-flex justify-center">
          <v-col cols="10">
            <p>
              Ce site est une passerelle entre les citoyens et les apiculteurs,
              il permet à chacun de mettre à disposition un terrain même modeste
              pour accueillir des ruches et soutenir la pollinisation locale.
            </p>
          </v-col>
        </v-row>
        <v-row class="d-flex justify-end mt-0">
          <v-col cols="8">
            <p>
              C'est une action simple, directe et concrète pour préserver la
              biodiversité.
            </p>
          </v-col>
          <v-col cols="3" class="pa-0 ma-0">
            <img
              class="imgPot"
              src="@/assets/SVG/Pot_de_fleurs.svg"
              alt="Image pot de fleurs"
            />
          </v-col>
        </v-row>
        <v-row class="d-flex justify-center">
          <v-col cols="10" class="text-center">
            <v-btn @click="redirectToCatalog" class="btnPrimary"
              >Trouver un apiculteur</v-btn
            >
          </v-col>
        </v-row>
        <v-row class="d-flex justify-center mt-16">
          <v-col cols="3" class="position-relative">
            <img
              class="firstBee"
              width="50em"
              src="@/assets/SVG/Logo_abeille.svg"
              alt="Image abeille"
            />
          </v-col>
          <v-col cols="6" class="text-center">
            <h2>Comment ça marche ?</h2>
          </v-col>
          <v-col cols="3">
            <img
              width="50em"
              src="@/assets/SVG/Logo_abeille.svg"
              alt="Image abeille"
            />
          </v-col>
        </v-row>
        <v-row class="d-flex justify-center">
          <v-col cols="11" md="6">
            <p>-Un apiculteur pose une annonce</p>
            <p>-Un particulier contact un apiculteur</p>
            <p>-Trouver un accord, financier ou troc</p>
            <p>-Laisser travailler les abeilles</p>
          </v-col>
        </v-row>
        <v-row class="d-flex justify-center">
          <v-col cols="11" md="6">
            <img
              class="imgBees"
              src="@/assets/Photos/Photo_ruche.jpg"
              alt="Image d'abeilles"
            />
          </v-col>
        </v-row>
        <v-row class="d-flex justify-center text-center">
          <v-col cols="10">
            <h2>Les avantages</h2>
          </v-col>
        </v-row>
        <v-row class="d-flex justify-center">
          <v-col cols="3" class="text-end">
            <img
              width="80"
              src="@/assets/SVG/Pot_de_miel.svg"
              alt="Image pot de miel"
            />
          </v-col>
          <v-col cols="9" md="4">
            <p class="underline">Pour les propriétaires de terrain :</p>
            <p>-Valoriser un espace inutilisé</p>
            <p>-Contribuer à la préservation de l'environnement</p>
          </v-col>
        </v-row>
        <v-row class="d-flex justify-center">
          <v-col cols="9" md="4">
            <p class="underline">Pour les apiculteurs :</p>
            <p>-Trouver un emplacement proche</p>
            <p>-Développer votre activité</p>
            <p>-Gagner du temps et sécuriser vos ruches</p>
          </v-col>
          <v-col cols="3">
            <img
              width="80"
              src="@/assets/SVG/Nid_abeilles.svg"
              alt="Image d'une ruche"
            />
          </v-col>
        </v-row>
        <v-row class="d-flex justify-center text-center mt-16">
          <v-col cols="10">
            <p class="fontPlayball">
              🐝Nous croyons à une apiculture durable, locale et
              respectueuse.<br />Chaque terain contribue à la survie des
              pollinisateurs.
            </p>
          </v-col>
        </v-row>
        <v-row class="d-flex justify-center">
          <v-col cols="10" class="text-center">
            <v-btn @click="redirectToCatalog" class="btnPrimary"
              >Trouver un apiculteur</v-btn
            >
          </v-col>
        </v-row>
      </v-container>
    </v-main>
    <Footer />
  </v-app>
</template>

<style>
.imgSubtitle {
  height: 1.5em;
  width: 1.5em;
}

.underline {
  text-decoration: underline;
}

.firstLittleBee {
  position: absolute;
  left: 83vw;
  top: 50vw;
  transform: rotate(60deg);
  width: 3em;
}

.secondeLittleBee {
  position: absolute;
  left: 6vw;
  top: 61vw;
  transform: rotate(-55deg);
  width: 3em;
}

.imgFlowers {
  object-fit: cover;
  width: 100%;
  height: 15vw;
}

.imgPot {
  vertical-align: text-top;
  width: 3em;
}

.firstBee {
  transform: scaleX(-1);
  position: absolute;
  left: 4em;
  top: -1em;
}

.imgBees {
  width: 100%;
  object-fit: cover;
  border: solid #5c4725 3px;
  border-radius: 15px;
}

@media (min-width: 500px) {
  .firstLittleBee {
    left: 85vw;
    top: 30vw;
  }

  .secondeLittleBee {
    left: 12vw;
    top: 32vw;
  }
}

@media (min-width: 800px) {
  .firstLittleBee {
    left: 85vw;
    top: 10vw;
  }

  .secondeLittleBee {
    left: 12vw;
    top: 14vw;
  }
}
</style>