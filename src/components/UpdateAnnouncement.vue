<script setup>
import BeesPlacesRequests from "@/services/beesPlacesRequests";
import { ref, onMounted, watch } from "vue";

const props = defineProps({
  id: {
    type: Number,
    required: true,
  },
  userToken: {
    type: String,
    required: true,
  },
  departementList: {
    type: Array,
    required: true,
  },
  isDialogActivate: {
    type: Boolean,
    required: true,
  },
});

const emit = defineEmits(['closeDialog', 'refreshAnnouncements']);

const title = ref();
const department = ref();
const description = ref();
const inputFile = ref();
const imagePreview = ref();

const fetchAnnoucementById = async () => {
  try {
    const formData = new FormData();
    formData.append("id", props.id);
    const response = await BeesPlacesRequests.getAnnouncementsById(
      props.userToken,
      formData
    );

    if (response.status == "200") {
      title.value = response.data.title;
      department.value = response.data.department;
      description.value = response.data.description;
      inputFile.value = response.data.image_path;
    }
  } catch (error) {
    console.log(error);
  }
};

const sendUpdateAnnoucement = async () => {
  try {
    const formData = new FormData()
    formData.append('id', props.id)
    formData.append('title', title.value)
    formData.append('departement', department.value)
    formData.append('description', description.value)
    if(imagePreview.value){
      formData.append('image_path', inputFile.value)
    }

    const response = await BeesPlacesRequests.updateAnnouncement(props.userToken, formData)
    if(response.status == '200'){
      emit('refreshAnnouncements', response.data.message)
    }
  } catch (error) {
    console.log(error)
  }
}

onMounted(() => {
  fetchAnnoucementById();
});
watch(inputFile, (newFile) => {
  console.log(newFile)
  if (newFile && newFile instanceof File) {
    imagePreview.value = URL.createObjectURL(inputFile.value);
  }
})

const closeDialog = () => {
  emit('closeDialog', false);
}
</script>

<template>
  <v-container>
    <v-dialog v-model="props.isDialogActivate" width="auto">
      <v-card class="pa-5">
        <v-card-title>
          Modification de l'annonce
        </v-card-title>
        <v-form @submit.prevent="sendUpdateAnnoucement">
          <v-text-field v-model="title" label="Titre"></v-text-field>
          <v-select v-model="department" :items="props.departementList" label="Département"></v-select>
          <v-text-field v-model="description" label="Description"></v-text-field>
          <v-file-input v-model="inputFile" label="Charger la photo" prepend-icon="mdi-camera" variant="filled">
          </v-file-input>
          <v-row class="d-flex justify-center">
            <v-col cols="11" class="d-flex justify-center">
              <v-img :width="300" aspect-ratio="16/9" cover :src="imagePreview ? imagePreview : inputFile"></v-img>
            </v-col>
          </v-row>
          <v-card-actions class="d-flex justify-center">
            <v-col cols="6">
              <v-btn class="mt-2 btnSecondary" @click="closeDialog" block>Annuler</v-btn>
            </v-col>
            <v-col cols="6">
              <v-btn class="mt-2 btnPrimary" type="submit" block>Modifier</v-btn>
            </v-col>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<style scoped></style>