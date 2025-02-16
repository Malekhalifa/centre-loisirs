<template>
  <div class="card">
    <img :src="activite.image" alt="Image de l'activité" class="card-image" />
    <div class="card-content">
      <div v-if="activite">
        <h3 class="card-title">{{ activite.titre }}</h3>
        <p class="card-type">{{ activite.type_activite }}</p>
        <p class="card-cout">{{ activite.cout }} $</p>
        <p class="card-date">{{ formatDate(activite.date) }}</p>
        <p class="card-heure">{{ activite.heure }}</p>
        <p class="card-lieu">{{ activite.lieu }}</p>
        <p class="card-description-courte">{{ activite.description_courte }}</p>
        <p class="card-description">{{ activite.description }}</p>
        <ul class="card-details">
          <li><strong>Équipement :</strong> {{ activite.equipement ? activite.equipement.join(", ") : 'Aucun équipement' }}</li>
          <li><strong>Saison :</strong> {{ activite.saison }}</li>
          <li><strong>Âge autorisé :</strong> {{ activite.age_autorise }}</li>
          <li><strong>Taille autorisée :</strong> {{ activite.taille_autorisee }}</li>
        </ul>
        <!-- Bouton dynamique -->
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
  if (!date || !date.seconds) {
    return 'Date invalide';
  }
  
  // Convert Firestore Timestamp to JavaScript Date
  const formattedDate = new Date(date.seconds * 1000); 

  // Ensure the date is valid
  if (isNaN(formattedDate.getTime())) {
    return 'Date invalide';
  }

  // Format the date
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return formattedDate.toLocaleDateString('fr-FR', options);
};


const ajouterAuPanier = (activite) => {
  if (estDansPanier(activite.id)) {
    panierStore.supprimerActivite(activite.id); // Supprime si déjà ajouté
  } else {
    panierStore.ajouterActivite(activite); // Ajoute au panier
  }

};

const estDansPanier = (id) => {
  return panierStore.activites.some(a => a.id === id); // Vérifie si l'activité est déjà dans le panier
};
</script>

<style scoped>
/* --- Cartes d'activités --- */
.card {
  background: #ffffff;
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
  width: 100%;
  max-width: 350px;
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0px 6px 15px rgba(0, 0, 0, 0.2);
}

/* --- Image de la carte --- */
.card-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

/* --- Contenu de la carte --- */
.card-content {
  padding: 15px;
  text-align: left;
}

.card-title {
  font-size: 1.4rem;
  font-weight: bold;
  margin-bottom: 5px;
}

.card-type {
  font-size: 1rem;
  color: #555;
  margin-bottom: 5px;
}

.card-cout {
  font-size: 1rem;
  color: #555;
  margin-bottom: 5px;
}

.card-date {
  font-size: 1rem;
  color: #555;
  margin-bottom: 5px;
}

.card-heure {
  font-size: 1rem;
  color: #555;
  margin-bottom: 5px;
}

.card-lieu {
  font-size: 0.9rem;
  color: #777;
  margin-bottom: 5px;
}

.card-description-courte {
  font-size: 1rem;
  color: #333;
  margin-top: 10px;
  margin-bottom: 5px;
}

.card-description {
  font-size: 1rem;
  color: #333;
  margin-top: 5px;
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
  background-color: #007bff; /* Couleur de votre choix */
  color: white;
  padding: 8px 16px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #0056b3; /* Couleur plus foncée au survol */
}
</style>