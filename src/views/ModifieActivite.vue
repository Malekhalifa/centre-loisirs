<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { obtenirActiviteParId, modifierActivite } from "../services/firebase";

const route = useRoute();
const router = useRouter();
const id = route.params.id;

const titre = ref("");
const typeActivite = ref("");
const cout = ref(0);
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
const errorMsg = ref("");

const chargerActivite = async () => {
  try {
    const activite = await obtenirActiviteParId(id);
    console.log(activite);
    titre.value = activite.titre;
    typeActivite.value = activite.type_activite;
    cout.value = activite.cout;
    let dateObj;
    if (typeof activite.date === 'number') {
      dateObj = new Date(activite.date);
    } else if (typeof activite.date === 'string') {
      dateObj = new Date(activite.date);
    } else {
      dateObj = new Date(activite.date.seconds * 1000);
    }
    const month = String(dateObj.getMonth() + 1).padStart(2, '0');
    const day = String(dateObj.getDate()).padStart(2, '0');
    const year = dateObj.getFullYear();
    date.value = `${year}-${month}-${day}`;
    // date.value = activite.date;
    heure.value = activite.heure;
    descriptionCourte.value = activite.description_courte;
    description.value = activite.description;
    image.value = activite.image;
    lieu.value = activite.lieu;
    equipement.value = activite.equipement;
    saison.value = activite.saison;
    ageAutorise.value = activite.age_autorise;
    tailleAutorisee.value = activite.taille_autorisee;
  } catch (error) {
    console.error("Erreur lors du chargement de l'activité :", error);
    errorMsg.value = "Impossible de charger l'activité.";
  }
};
// *********** TODO: fix the unsupported properties ***********
const modifier = async () => {
  console.log(date.value)
  try {
    await modifierActivite(
      id,
    {
      titre: titre?.value,
      // type_activite: typeActivite?.value,
      // cout: cout?.value,
      date: date?.value ? new Date(date.value).setHours(0, 0, 0, 0) : null,
      // heure: heure?.value,
      // description_courte: descriptionCourte?.value,
      description: description?.value,
      image: image?.value,
      lieu: lieu?.value,
      equipement: equipement?.value,
      saison: saison?.value,
      age_autorise: ageAutorise?.value,
      taille_autorisee: tailleAutorisee?.value
    }
    );
    router.push("/tableauBordAdmin");
    errorMsg.value = "";
  } catch (error) {
    console.error("Erreur lors de la modification :", error);
    errorMsg.value = "Une erreur est survenue lors de la modification.";
  }
};

onMounted(chargerActivite);
</script>

<template>
  <div class="container">
    <form @submit.prevent="modifier">
      <div v-if="errorMsg" class="error-message">{{ errorMsg }}</div>

      <div>
        <h2>Modifier l'Activité</h2>
      </div>

      <label>Titre</label>
      <input v-model="titre" type="text"  />

      <label>Type d'activité</label>
      <input v-model="typeActivite" type="text"  />

      <label>Coût (en $ par heure d'activité et par semaine)</label>
      <input v-model="cout" type="number"  />

      <label>Date</label>
      <input v-model="date" type="date" />

      <label>Heure</label>
      <input v-model="heure" type="time" />

      <label>Description courte</label>
      <input v-model="descriptionCourte" type="text"  />

      <label>Description</label>
      <textarea v-model="description" ></textarea>

      <label>Image (URL)</label>
      <input v-model="image" type="text"  />

      <label>Lieu</label>
      <input v-model="lieu" type="text"  />

      <label>Équipements</label>
      <input v-model="equipement" type="text" placeholder="Séparez par une virgule" />

      <label>Saison</label>
      <input v-model="saison" type="text"  />

      <label>Âge autorisé</label>
      <input v-model="ageAutorise" type="text"  />

      <label>Taille autorisée</label>
      <input v-model="tailleAutorisee" type="text" />

      <button type="submit">Modifier l'activité</button>
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

input,
textarea {
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
