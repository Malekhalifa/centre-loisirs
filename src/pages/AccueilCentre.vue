<template>
  <div class="container">
    <div class="intro">
      <h1 class="title">Bienvenue au Centre de Loisirs</h1>
      <p class="subtitle">Découvrez et inscrivez-vous à nos activités !</p>
    </div>

    <div class="grid-container">
      <CarteActivite v-for="activite in activites" :key="activite.id" :activite="activite" />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { obtenirActivites } from "../services/firebase";
import CarteActivite from "../components/CarteActivite.vue";


const activites = ref([]);

const chargerActivites = async () => {
  activites.value = await obtenirActivites();
};

onMounted(chargerActivites);
</script>

<style scoped>
/* --- Conteneur principal --- */
.container {
  width: 100%;
  padding: 20px;
  text-align: center;
  background: linear-gradient(to bottom, #f8f9fa, #e9ecef); /* Dégradé clair */
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

/* --- Section d'introduction --- */
.intro {
  margin-bottom: 30px;
  padding: 20px;
}

.title {
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: 10px;
}

.subtitle {
  font-size: 1.2rem;
  color: #444;
}

/* --- Grille d'activités --- */
.grid-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  padding: 20px;
  justify-items: center; /* Centre les cartes */
  max-width: 1200px;
  width: 100%;
}

/* --- Responsivité --- */
@media (min-width: 1024px) {
  .grid-container {
    grid-template-columns: repeat(3, 1fr); /* 3 colonnes sur grand écran */
  }
}

@media (min-width: 768px) and (max-width: 1023px) {
  .grid-container {
    grid-template-columns: repeat(2, 1fr); /* 2 colonnes sur écran moyen */
  }
}

@media (max-width: 767px) {
  .grid-container {
    grid-template-columns: repeat(1, 1fr); /* 1 colonne sur petit écran */
  }
}
</style>