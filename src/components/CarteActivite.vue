<template>
  <div class="card">
    <img :src="activite.image" alt="Image de l'activité" class="card-image" />
    <div class="card-content">
      <div v-if="activite">
        <h3 class="card-title">{{ activite.titre }}</h3>
        <!-- <p class="card-description-courte">"{{ activite.description_courte }}"</p> -->
        <div class="card-info-grid">
          <p><strong>Type:</strong> {{ activite.type_activite }}</p>
          <p><strong>Coût:</strong> <span class="highlight">{{ activite.cout }} $</span></p>
          <p><strong>Date:</strong> {{ formatDate(activite.date) }} - {{ activite.heure }}</p>
          <p><strong>Lieu:</strong> {{ activite.lieu }}</p>
        </div>
        <p class="card-description"><strong>Description:</strong> {{ activite.description }}</p>
        <ul class="card-details">
          <li><strong>Équipement :</strong> {{ activite.equipement ? activite.equipement.join(", ") : 'Aucun équipement' }}</li>
          <li><strong>Saison :</strong> {{ activite.saison }}</li>
          <li><strong>Âge autorisé :</strong> {{ activite.age_autorise }}</li>
          <li><strong>Taille autorisée :</strong> {{ activite.taille_autorisee }}</li>
        </ul>
        <button @click="ajouterAuPanier(activite)">
          {{ estDansPanier(activite.id) ? "Supprimer du panier" : "Ajouter au panier" }}
        </button>
      </div>
      <div v-else>
        <p>Chargement de l'activité...</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';
import { usePanierStore } from '../stores/panier';

const panierStore = usePanierStore();

const props = defineProps({
  activite: {
    type: Object,
    required: true
  }
});

const formatDate = (date) => {
  if (!date) {
    return 'Date invalide';
  }

  let formattedDate;

  if (date.seconds) {
    formattedDate = new Date(date.seconds * 1000);
  } else {
    formattedDate = new Date(date);
  }

  if (isNaN(formattedDate.getTime())) {
    return 'Date invalide';
  }

  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return formattedDate.toLocaleDateString('fr-FR', options);
};

const ajouterAuPanier = (activite) => {
  if (estDansPanier(activite.id)) {
    panierStore.supprimerActivite(activite.id);
  } else {
    panierStore.ajouterActivite(activite);
  }
};

const estDansPanier = (id) => {
  return panierStore.activites.some(a => a.id === id);
};
</script>

<style scoped>
.card {
  background: #ffffff;
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
  width: 100%;
  max-width: 350px;
  position: relative;
  padding-bottom: 36px;
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0px 6px 15px rgba(0, 0, 0, 0.2);
}

.card-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.card-content {
  padding: 15px;
  text-align: left;
}

.card-title {
  font-size: 1.4rem;
  font-weight: bold;
  margin-bottom: 10px;
}



.card-description-courte, .card-description {
  font-size: 1rem;
  color: #333;
  margin-top: 10px;
  margin-bottom: 10px;
}

.card-details {
  margin-top: 10px;
  font-size: 0.9rem;
  color: #555;
}

.card-details li {
  margin-bottom: 5px;
}

button {
  background-color: #007bff;
  color: white;
  padding: 8px 16px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  position: absolute;
  bottom: 15px;
  left: 50%;
  width: 90%;
  transform: translateX(-50%);
}

button:hover {
  background-color: #0056b3;
}

.highlight {
  color: #ff0000;
  font-weight: bold;
}
</style>
