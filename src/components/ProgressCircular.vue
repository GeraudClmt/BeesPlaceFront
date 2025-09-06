<script setup>
const { isLoading, chargingMessage } = defineProps({
  isLoading: Boolean,
  chargingMessage: String,
});
</script>

<template>
  <div class="backGroundProgress" v-if="isLoading">
    <v-progress-circular
      class="progressCircular"
      :size="70"
      :width="7"
      color="#5C4725"
      indeterminate
    ></v-progress-circular>
    <p class="progressCircularText">{{ chargingMessage }}</p>
  </div>
</template>


<style scoped>
.progressCircular {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}

.backGroundProgress {
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(255, 246, 228, 0.9);
  height: 100vh;
  width: 100vw;
}

.progressCircularText {
  position: absolute;
  left: 50%;
  top: 58%;
  transform: translate(-50%, 0%);
}
</style>