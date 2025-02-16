<template>
  <div>
    <h2>Mes activités réservées</h2>
    <div class="grille-conteneur">
      <CarteActivite
        v-for="activite in panierStore.activites"
        :key="activite.id"
        :activite="activite"
        :afficher-bouton-supprimer="true"
        @supprimer="panierStore.supprimerActivite(activite.id)"
      />
    </div>
    <p>Nombre d'articles : {{ panierStore.totalItems }}</p>
    <p>Prix total : {{ panierStore.totalPrix }} $</p>
    
    <button @click="panierStore.viderPanier()">Vider le panier</button>
  </div>
</template>

<script setup>
import CarteActivite from '../components/CarteActivite.vue';
import { usePanierStore } from '../stores/panier';

const panierStore = usePanierStore();
</script>

<style scoped>
/* --- Conteneur principal --- */
.grille-conteneur {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  padding: 20px;
  max-width: 1200px;
  width: 100%;
}

/* --- Responsivité --- */
@media (min-width: 1024px) {
  .grille-conteneur {
    grid-template-columns: repeat(3, 1fr); /* 3 colonnes sur grand écran */
  }
}

@media (min-width: 768px) and (max-width: 1023px) {
  .grille-conteneur {
    grid-template-columns: repeat(2, 1fr); /* 2 colonnes sur écran moyen */
  }
}

@media (max-width: 767px) {
  .grille-conteneur {
    grid-template-columns: repeat(1, 1fr); /* 1 colonne sur petit écran */
  }
}

/* --- Bouton Ajouter --- */
.btn-ajouter {
  background-color: #007bff;
  color: white;
  padding: 8px 16px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.btn-ajouter:hover {
  background-color: #0056b3;
}

/* --- Bouton Supprimer --- */
.btn-supprimer {
  background-color: #ff4444;
  color: white;
  padding: 8px 16px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.btn-supprimer:hover {
  background-color: #cc0000;
}
</style>
