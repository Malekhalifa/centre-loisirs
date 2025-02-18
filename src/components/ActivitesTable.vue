<template>
  <div class="section">
    <div class="activities-header">
      <h2 class="section-title">Activities Management</h2>
      <router-link to="/AjoutActivite">
        <button class="add-button">Ajouter une Activité</button>
      </router-link>
    </div>
    <table class="activity-table">
      <thead>
        <tr>
          <th class="table-header">Titre</th>
          <th class="table-header">Type</th>
          <th class="table-header">Cout</th>
          <th class="table-header">Date</th>
          <th class="table-header">Description Courte</th>
          <th class="table-header">Lieu</th>
          <th class="table-header">Saison</th>
          <th class="table-header">Âge Autorisé</th>
          <th class="table-header">Taille Autorisée</th>
          <th class="table-header">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="activity in activities" :key="activity.id">
          <td class="table-cell">{{ activity.titre }}</td>
          <td class="table-cell">{{ activity.type_activite }}</td>
          <td class="table-cell">${{ activity.cout }}</td>
          <td class="table-cell">
            {{ formatDate(activity.date) }} - {{ activity.heure }}
          </td>
          <td class="table-cell">{{ activity.description_courte }}</td>
          <td class="table-cell">{{ activity.lieu }}</td>
          <td class="table-cell">{{ activity.saison }}</td>
          <td class="table-cell">{{ activity.age_autorise }}</td>
          <td class="table-cell">{{ activity.taille_autorisee }}</td>
          <td class="table-cell">
            <router-link
              :to="{ name: 'ModifieActivite', params: { id: activity.id } }"
            >
              <button class="edit-button">Edit</button>
            </router-link>
            <button
              @click="handleActiviteDelete(activity.id)"
              class="delete-button"
            >
              Delete
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { obtenirActivites, supprimerActivite } from "../services/firebase";

const activities = ref([]);
const errorMsg = ref("");

const loadActivities = async () => {
  try {
    activities.value = await obtenirActivites();
  } catch (error) {
    console.error("Error loading activities:", error);
    errorMsg.value = "Unable to load activities.";
  }
};

const formatDate = (date) => {
  if (!date) {
    return "Date invalide";
  }
  if (!date.seconds) {
    const formattedDate = new Date(date);
    if (isNaN(formattedDate.getTime())) {
      return "Date invalide";
    }
    const options = { year: "numeric", month: "long", day: "numeric" };
    return formattedDate.toLocaleDateString("fr-FR", options);
  }

  const formattedDate = new Date(date.seconds * 1000);

  if (isNaN(formattedDate.getTime())) {
    return "Date invalide";
  }

  const options = { year: "numeric", month: "long", day: "numeric" };
  return formattedDate.toLocaleDateString("fr-FR", options);
};

const handleActiviteDelete = async (id) => {
  try {
    await supprimerActivite(id);
    await loadActivities();
  } catch (error) {
    console.error("Error deleting activity:", error);
    errorMsg.value = "Unable to delete activity.";
  }
};

onMounted(loadActivities);
</script>

<style scoped>
.section {
  background-color: #ffffff;
  padding: 1rem;
  border-radius: 0.25rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
.section-title {
  font-size: 1.125rem;
  font-weight: bold;
  margin-bottom: 1rem;
}
.activities-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.activities-header h2 {
  margin-left: 40px;
}
.activity-table {
  width: 100%;
  max-width: 1280px;
  border-collapse: collapse;
  background-color: #ffffff;
}
.activity-table thead {
  max-width: 1280px;
}
.table-header {
  padding: 0.75rem;
  text-align: left;
  background-color: #edf2f7;
  border-bottom: 2px solid #e2e8f0;
}
.table-cell {
  border: 1px solid #e2e8f0;
  padding: 0.75rem;
}
.edit-button {
  background-color: #ecc94b;
  color: #ffffff;
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
  margin-right: 0.5rem;
}
.delete-button {
  background-color: #f56565;
  color: #ffffff;
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
}
</style>
