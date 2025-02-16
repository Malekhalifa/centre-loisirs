<script setup>
import { ref, onMounted } from "vue";
import { ajouterActivite, obtenirActivites } from "../services/firebase";


const titre = ref("");
const typeActivite = ref("");
const cout = ref("");
const date = ref("");
const heure = ref("");
const descriptionCourte = ref("");
const description = ref("");
const image = ref("");
const lieu = ref("");
const equipement = ref("");
const saison = ref("");
const ageAutorise = ref("");
const tailleAutorisee = ref("");
const activites = ref([]);
const errorMsg = ref("");

const ajouter = async () => {
  if (
    !titre.value ||
    !typeActivite.value ||
    !cout.value ||
    !date.value ||
    !heure.value ||
    !descriptionCourte.value ||
    !description.value ||
    !image.value ||
    !lieu.value ||
    !equipement.value ||
    !saison.value ||
    !ageAutorise.value ||
    !tailleAutorisee.value
  ) {
    errorMsg.value = "Veuillez remplir tous les champs.";
    return;
  }
  try {
    await ajouterActivite(
      titre.value,
      typeActivite.value,
      cout.value,
      date.value,
      heure.value,
      descriptionCourte.value,
      description.value,
      image.value,
      lieu.value,
      equipement.value,
      saison.value,
      ageAutorise.value,
      tailleAutorisee.value
    );
    alert("Activité ajoutée avec succès !");
    titre.value = "";
    typeActivite.value = "";
    cout.value = "";
    date.value = "";
    heure.value = "";
    descriptionCourte.value = "";
    description.value = "";
    image.value = "";
    lieu.value = "";
    equipement.value = "";
    saison.value = "";
    ageAutorise.value = "";
    tailleAutorisee.value = "";
    errorMsg.value = "";
    chargerActivites();
  } catch (error) {
    console.error("Erreur lors de l'ajout :", error);
    errorMsg.value = "Une erreur est survenue lors de l'ajout.";
  }
};

const chargerActivites = async () => {
  try {
    activites.value = await obtenirActivites();
  } catch (error) {
    console.error("Erreur lors du chargement des activités :", error);
    errorMsg.value = "Impossible de charger les activités.";
  }
};

onMounted(chargerActivites);
</script>

<template>
  <div class="container">
    
    <form @submit.prevent="ajouter">
      <div v-if="errorMsg" class="error-message">{{ errorMsg }}</div>

      <div > 
    <h2>Gestion des Activités</h2>
  </div>

      <label>Titre</label>
      <input v-model="titre" type="text" required />

      <label>Type d'activité</label>
      <input v-model="typeActivite" type="text" required />

      <label>Coût (en $ par heure d'activité et par semaine)</label>
      <input v-model="cout" type="number" required />

      <label>Date</label>
      <input v-model="date" type="date"  />

      <label>Heure</label>
      <input v-model="heure" type="time"  />

      <label>Description courte</label>
      <input v-model="descriptionCourte" type="text" required />

      <label>Description</label>
      <textarea v-model="description" required></textarea>

      <label>Image (URL)</label>
      <input v-model="image" type="text" required />

      <label>Lieu</label>
      <input v-model="lieu" type="text" required />

      <label>Équipements</label>
      <input v-model="equipement" type="text" placeholder="Séparez par une virgule" />

      <label>Saison</label>
      <input v-model="saison" type="text" required />

      <label>Âge autorisé</label>
      <input v-model="ageAutorise" type="text" required />

      <label>Taille autorisée</label>
      <input v-model="tailleAutorisee" type="text" />

      <button type="submit">Ajouter l'activité</button>
    </form>
  </div>
</template>

<style>
.container {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: #f3f4f6;
  padding: 20px;
}

.form-container {
  background: white;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  width: 400px;
  max-width: 90%;
  text-align: center;
}

h2 {
  text-align: center;
  font-size: 2em;
  margin-bottom: 20px;
  font-weight: bold;
}


label {
  display: block;
  margin-top: 10px;
}

input, textarea {
  width: 100%;
  padding: 8px;
  margin-top: 5px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

textarea {
  resize: vertical;
  height: 100px;
}

button {
  width: 100%;
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  margin-top: 15px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}

.error-message {
  color: red;
  text-align: center;
  margin-bottom: 10px;
}
</style>
